import { getCampaigns } from "@/actions/ngo-features";
import FundingClient from "@/components/dashboard/FundingClient";

export default async function FundingPage() {
  const { data, stats, error } = await getCampaigns();

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return <FundingClient initialData={data || []} initialStats={stats} />;
}
