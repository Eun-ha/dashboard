import { auth } from "@/auth";
import LogoutForm from "@/ui/account/logout-form";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return null;
  }
  return (
    <main>
      <h2>대시보드</h2>
      <div>
        <p>이름: {session?.user?.name}</p>
      </div>
      <div>
        <p>이메일: {session?.user?.email}</p>
      </div>
      <LogoutForm />
    </main>
  );
}
