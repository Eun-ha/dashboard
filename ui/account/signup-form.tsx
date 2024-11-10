"use client";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { signUp } from "@/backend/account-actions";
import { Button } from "./Button";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, dispatch] = useFormState(signUp, undefined);

  useEffect(() => {
    if (password !== confirmPassword && confirmPassword !== "") {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  }, [password, confirmPassword]);

  return (
    <form action={dispatch}>
      <div>
        <h1>회원가입</h1>
        <div className="w-full">
          <label htmlFor="name">이름</label>
          <div>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <label htmlFor="email">이메일</label>
          <div>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label htmlFor="password">비밀번호</label>
          <div>
            <input
              type="text"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <div>
            <input
              type="text"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {passwordError && <div>{passwordError}</div>}
        </div>
        <SignUpButton />
        {errorMessage && (
          <>
            <p>{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
}

function SignUpButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full mt-4" aria-disabled={pending}>
      회원가입
    </Button>
  );
}
