import { getBeneficiaries } from "@/actions/ngo-features";
import BeneficiariesClient from "@/components/dashboard/BeneficiariesClient";

export default async function BeneficiariesPage() {
  const { data, stats, error } = await getBeneficiaries();

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return <BeneficiariesClient initialData={data || []} initialStats={stats} />;
}
