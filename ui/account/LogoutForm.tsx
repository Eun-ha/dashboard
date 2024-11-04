import { signOut } from "@/auth";
import { Button } from "../component/Button";

export default function LogoutForm() {
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button>로그아웃</Button>
      </form>
    </div>
  );
}
