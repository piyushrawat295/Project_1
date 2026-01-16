import { getRecords } from "@/actions/ngo-features";
import RecordsClient from "@/components/dashboard/RecordsClient";

export default async function RecordsPage() {
  const { data, stats, error } = await getRecords();

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return <RecordsClient initialData={data || []} initialStats={stats} />;
}
