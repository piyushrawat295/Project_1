import { getCampaigns, getProjects } from "@/actions/ngo-features";
import FundingClient from "@/components/dashboard/FundingClient";

export default async function FundingPage() {
  const { data: campaigns, stats, error: campaignError } = await getCampaigns();
  const { data: projects, error: projectError } = await getProjects();

  if (campaignError || projectError) {
    return <div className="p-8 text-red-500">Error loading data</div>;
  }

  return <FundingClient initialData={campaigns || []} initialStats={stats} projects={projects || []} />;
}
