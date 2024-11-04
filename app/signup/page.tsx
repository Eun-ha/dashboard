import SignUpForm from "@/ui/component/SignupForm";
import LevelupLogo from "@/ui/logo";

export default function Page() {
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
