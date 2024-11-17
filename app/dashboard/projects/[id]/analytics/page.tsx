import Breadcrumbs from "@/ui/projects/breadcrumbs";

export default function Page({ params }: { params: { id: string } }) {
  const project_name = params.id;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "프로젝트", href: "/dashboard/projects" },
          {
            label: `[${project_name}] 대시보드`,
            href: `/dashboard/projects/${project_name}/analytics`,
            active: true,
          },
        ]}
      />
    </main>
  );
}
