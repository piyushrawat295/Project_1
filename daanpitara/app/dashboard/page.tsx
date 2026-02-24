import { getDashboardData } from "@/actions/dashboard";
import DashboardClient from "@/components/dashboard/DashboardClient";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const dashboardData = await getDashboardData();

  if (!dashboardData) {
    redirect("/signin");
  }

  // ALLOW ADMINS to bypass the onboarding wall
  const isAdmin = dashboardData.userRole === 'admin';

  if (!isAdmin) {
    // If No NGO Profile OR No Documents Uploaded, redirect to Onboarding
    const noProfile = dashboardData.error === "No NGO profile found";
    const noDocs = dashboardData.docStats && dashboardData.docStats.total === 0;

    if (noProfile || noDocs) {
      redirect("/onboarding");
    }
  }

  if (dashboardData.error) {
     return (
        <div className="p-8 text-center">
           <h2 className="text-2xl font-bold mb-4 text-red-600">Error Loading Dashboard</h2>
           <p className="mb-6">{dashboardData.error}</p>
        </div>
     );
  }

  return <DashboardClient data={JSON.parse(JSON.stringify(dashboardData))} />;
}
