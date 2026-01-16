import { getCollaborations } from "@/actions/ngo-features";
import CollaborationClient from "@/components/dashboard/CollaborationClient";

export default async function CollaborationPage() {
  const { data, stats, error } = await getCollaborations();

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return <CollaborationClient initialData={data || []} initialStats={stats} />;
}
