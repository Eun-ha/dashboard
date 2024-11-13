import { sql } from "@vercel/postgres";
import { ProjectTable } from "@/types/definitions";
import { unstable_noStore as noStore } from "next/cache";

const PROJECTS_PER_PAGE = 6;

export async function fetchFilteredProjectsSimple(
  query: string,
  currentPage: number,
  email: string
) {
  noStore();

  const offset = (currentPage - 1) * PROJECTS_PER_PAGE;

  try {
    const projects = await sql<ProjectTable>`
      SELECT
        projects.id,
        projects.name,
        projects.website_url
      FROM projects
      WHERE
        projects.name ILIKE ${`%${query}%`} AND
        user_email = ${email}
      ORDER BY projects.name DESC
      LIMIT ${PROJECTS_PER_PAGE} OFFSET ${offset}
    `;
    return projects.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch project metrics.");
  }
}
