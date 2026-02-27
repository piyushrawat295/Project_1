import { getAdminDashboardData } from "@/actions/admin";
import { Building2, Users, FolderKanban, IndianRupee, TrendingUp, Star, Eye, ArrowUpRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

export default async function AdminDashboardPage() {
  const adminData = await getAdminDashboardData();

  if ('error' in adminData) {
      return (
          <div className="flex h-full w-full items-center justify-center min-h-[50vh]">
              <div className="flex flex-col items-center gap-4 text-gray-500">
                  <AlertCircle className="h-10 w-10 text-red-500" />
                  <p className="text-lg font-medium">{adminData.error}</p>
                 <Link href="/signin" className="text-blue-500 hover:underline text-sm">Return to Login</Link>
              </div>
          </div>
      );
  }

  const { stats, pendingActions, recentActivities, topNGOs, summaryCards } = adminData;

  const statIcons: Record<string, typeof Building2> = { ngos: Building2, users: Users, projects: FolderKanban, funds: IndianRupee };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Platform Overview</h2>
        <p className="text-sm text-gray-400 mt-1">Monitor and manage the entire DaanPitara ecosystem</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => {
          const IconComponent = statIcons[s.id] || Building2;
          return (
          <div key={s.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/60 card-hover group">
            <div className="flex items-start justify-between">
              <div className={`${s.color} p-2.5 rounded-xl shadow-sm group-hover:shadow-md transition-shadow`}>
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3" /> {s.change}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-4 font-medium">{s.label}</p>
            <p className="text-[28px] font-bold text-gray-900 mt-0.5 tracking-tight">{s.value}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{s.sub}</p>
          </div>
        );
        })}
      </div>

      {/* Pending Actions & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/60 p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Pending Actions</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">Items requiring your attention</p>
            </div>
            <Link href="/dashboard/admin/verifications" className="text-xs font-semibold text-white bg-[#1572A1] px-4 py-2 rounded-xl hover:bg-[#125e87] transition-colors btn-press shadow-sm">
              View All
            </Link>
          </div>
          <div className="space-y-3 flex-1">
            {pendingActions.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-40 border border-dashed border-gray-200 rounded-xl text-sm text-gray-400 bg-gray-50/50">
                   <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-2">✅</div>
                   No pending actions
               </div>
            ) : pendingActions.map((item) => (
              <div key={item.id} className="border border-gray-100/60 rounded-xl p-4 hover:bg-gray-50/40 transition-all duration-200 group">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide ${item.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                        {item.priority}
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium">{item.type}</span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-800">{item.title}</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">{item.desc}</p>
                    <p className="text-[10px] text-gray-300 mt-1.5">{item.time}</p>
                  </div>
                  <Link href={item.link} className="text-[11px] font-semibold text-[#1572A1] border border-[#1572A1]/30 px-3 py-1.5 rounded-lg hover:bg-[#1572A1] hover:text-white transition-all duration-200 whitespace-nowrap btn-press">
                    {item.action}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/60 p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">Latest platform updates</p>
            </div>
            <Link href="/dashboard/admin/reports" className="text-xs font-semibold text-[#1572A1] hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-4 flex-1">
             {recentActivities.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 border border-dashed border-gray-200 rounded-xl text-sm text-gray-400 bg-gray-50/50">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-2">📋</div>
                    No recent activities
                </div>
             ) : recentActivities.map((a) => (
              <div key={a.id} className="flex items-start gap-3 group">
                <div className={`w-2 h-2 rounded-full ${a.color} mt-2 flex-shrink-0 ring-2 ring-offset-1 ring-gray-100`} />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-800 group-hover:text-[#1572A1] transition-colors">{a.name}</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">{a.event}</p>
                  <p className="text-[10px] text-gray-300 mt-1">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing NGOs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/60 p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Registered NGOs Overview</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">Verified NGO partners</p>
          </div>
          <Link href="/dashboard/admin/ngo-management" className="text-xs font-semibold text-[#1572A1] hover:underline flex items-center gap-1">
            View All NGOs <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="overflow-x-auto rounded-xl">
          {topNGOs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 border border-dashed border-gray-200 rounded-xl bg-gray-50/50 text-gray-400">
                  <Building2 className="w-10 h-10 mb-3 opacity-40" />
                  <p className="text-sm font-medium">No verified NGOs found.</p>
                  <p className="text-[11px] text-gray-300 mt-0.5">NGOs will appear here after verification</p>
              </div>
          ) : (
          <table className="w-full text-left sticky-thead zebra-rows">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-[11px] font-semibold text-gray-400 uppercase py-3 pr-4 tracking-wide">NGO Name</th>
                <th className="text-[11px] font-semibold text-gray-400 uppercase py-3 px-4 tracking-wide">Status</th>
                <th className="text-[11px] font-semibold text-gray-400 uppercase py-3 px-4 tracking-wide">Projects</th>
                <th className="text-[11px] font-semibold text-gray-400 uppercase py-3 px-4 tracking-wide">Beneficiaries</th>
                <th className="text-[11px] font-semibold text-gray-400 uppercase py-3 px-4 tracking-wide">Funds Managed</th>
                <th className="text-[11px] font-semibold text-gray-400 uppercase py-3 px-4 tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {topNGOs.map((ngo) => (
                <tr key={ngo.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors duration-150">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${ngo.color} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm`}>
                        {ngo.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 line-clamp-1">{ngo.name}</p>
                        <p className="text-[11px] text-gray-400">{ngo.sub}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                     <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${ngo.sub === 'Verified NGO' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                         {ngo.sub === 'Verified NGO' ? '● Verified' : '○ Pending'}
                     </span>
                  </td>
                  <td className="py-4 px-4 text-sm font-semibold text-gray-700 tabular-nums">{ngo.projects}</td>
                  <td className="py-4 px-4 text-sm text-gray-500 tabular-nums">{ngo.beneficiaries}</td>
                  <td className="py-4 px-4 text-sm font-semibold text-gray-700 tabular-nums">{ngo.funds}</td>
                  <td className="py-4 px-4">
                    <AdminDashboardClient ngoId={ngo.id} isVerified={ngo.sub === 'Verified NGO'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {summaryCards.map((card, idx) => (
          <div key={idx} className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white relative overflow-hidden hover:scale-[1.02] transition-transform duration-200 shadow-sm`}>
            <div className="absolute top-4 right-4 opacity-20">
              <ArrowUpRight className="w-6 h-6" />
            </div>
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-xl mb-3 backdrop-blur-sm">
              {card.icon}
            </div>
            <p className="text-sm font-medium text-white/80">{card.label}</p>
            <p className="text-3xl font-bold mt-1 tracking-tight">{card.value}</p>
            <p className="text-[11px] text-white/50 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
