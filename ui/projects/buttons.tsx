import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreateProject() {
  return (
    <Link
      href="/dashboard/projects/create"
      className="flex items-center h-10 px-4 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">프로젝트 생성</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}
