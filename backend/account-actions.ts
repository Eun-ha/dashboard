"use server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { User } from "@/types/definitions";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";

const EmailSchema = z.string().email({ message: "Invalid email address." });
const PasswordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long." });
const NameSchema = z.string().min(1, { message: "Name cannot be empty." });

export async function signUp(
  prevState: string | undefined,
  formData: FormData
) {
  const emailValidation = EmailSchema.safeParse(formData.get("email"));
  const passwordValidation = PasswordSchema.safeParse(formData.get("password"));
  const nameValidation = NameSchema.safeParse(formData.get("name"));

  if (!emailValidation.success) {
    return emailValidation.error.message;
  }
  if (!passwordValidation.success) {
    return passwordValidation.error.message;
  }
  if (!nameValidation.success) {
    return nameValidation.error.message;
  }

  const email = emailValidation.data;
  const password = passwordValidation.data;
  const name = nameValidation.data;
  const id = uuidv4();

  try {
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existingUser.rowCount !== 0) {
      return "Email already exists.";
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
      INSERT INTO users (name, email, password, id)
      VALUES (${name}, ${email}, ${hashedPassword}, ${id})
    `;
  } catch (error) {
    console.log(error);
    return "Failed to create user.";
  }

  revalidatePath("/login");
  redirect(`/login?signup=success&email=${email}`);
}

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong";
      }
    }
    throw error;
  }
}
