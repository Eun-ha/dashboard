import { performLogout } from "@/backend/account-actions";
import { useRouter } from "next/navigation";

export default function DeleteAccount({ deleteEmail }) {
  const router = useRouter();

  const handleDeleteAccount = async () => {
    if (
      window.confirm("계정을 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.")
    ) {
      const response = await deleteUser(deleteEmail);
      if (response.message === "Deleted User.") {
        console.info(response.message);
        await performLogout();
        router.push("/login");
      } else {
        console.error(response.message);
      }
    }
  };

  return <button onClick={handleDeleteAccount}>계정삭제</button>;
}
