import SignUpForm from "@/ui/component/signupForm";
import LevelupLogo from "@/ui/logo";

export default function SignupPage() {
  return (
    <main className="flex">
      <div>
        <div>
          <LevelupLogo />
        </div>
        <SignUpForm />
      </div>
    </main>
  );
}
