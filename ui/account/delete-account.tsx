"use client";
import { deleteUser, performLogout } from "@/backend/account-actions";
import { useRouter } from "next/navigation";

export default function DeleteAccount({
  deleteEmail,
}: {
  deleteEmail: string;
}) {
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

  return (
    <button
      className="px-4 py-2 mt-4 text-white bg-red-600 rounded-md"
      onClick={handleDeleteAccount}
    >
      계정삭제
    </button>
  );
}
