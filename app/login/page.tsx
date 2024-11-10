import LoginForm from "@/ui/account/login-form";
import LevelupLogo from "@/ui/logo";

export default function Page() {
  return (
    <main className="flex">
      <div>
        <div>
          <LevelupLogo />
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
