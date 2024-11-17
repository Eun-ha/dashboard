//import Breadcrumbs from "@/ui/projects/breadcrumbs";
import { fetchProjectById } from "@/backend/project-data";
import EditProjectForm from "@/ui/projects/edit-form";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  let project;

  try {
    project = await fetchProjectById(id);
    if (!project) {
      notFound();
      return; // 프로젝트가 없으면 함수를 종료합니다.
    }
  } catch (error) {
    notFound();
    return; // 오류가 발생하면 함수를 종료합니다.
  }

  return (
    <main>
      <EditProjectForm project={project} />
    </main>
  );
}
