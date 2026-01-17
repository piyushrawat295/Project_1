import { getDashboardData } from "@/actions/dashboard";
import DashboardClient from "@/components/dashboard/DashboardClient";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const dashboardData = await getDashboardData();

  if (!dashboardData) {
    redirect("/auth/sign-in");
  }

  if (dashboardData.error) {
     return (
        <div className="p-8 text-center">
           <h2 className="text-2xl font-bold mb-4 text-red-600">Error Loading Dashboard</h2>
           <p className="mb-6">{dashboardData.error}</p>
           {dashboardData.error.includes("No NGO profile") && (
             <Link href="/dashboard/ngo-profile" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Create Profile</Link>
           )}
        </div>
     );
  }

  return <DashboardClient data={JSON.parse(JSON.stringify(dashboardData))} />;
}
