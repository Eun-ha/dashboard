import LoginForm from "@/ui/account/login-form";
import LevelupLogo from "@/ui/logo";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="flex">
      <div>
        <div>
          <LevelupLogo />
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
