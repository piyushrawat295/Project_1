import { getProjects } from "@/actions/ngo-features";
import ProjectsClient from "@/components/dashboard/ProjectsClient";

export default async function ProjectsPage() {
  const { data, stats, error } = await getProjects();

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return <ProjectsClient initialData={data || []} initialStats={stats} />;
}
