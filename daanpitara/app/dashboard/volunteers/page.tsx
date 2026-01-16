import { getVolunteers } from "@/actions/ngo-features";
import VolunteersClient from "@/components/dashboard/VolunteersClient";

export default async function VolunteersPage() {
  const { data, stats, error } = await getVolunteers();

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return <VolunteersClient initialData={data || []} initialStats={stats} />;
}
