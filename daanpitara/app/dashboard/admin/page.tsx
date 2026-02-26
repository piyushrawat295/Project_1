"use client";

import { Building2, Users, FolderKanban, IndianRupee, TrendingUp, Star, Eye, ArrowUpRight } from "lucide-react";

// Dummy data
const stats = [
  { icon: Building2, label: "Total NGOs", value: "247", sub: "This month", change: "+12", color: "bg-blue-500" },
  { icon: Users, label: "Active Users", value: "12,458", sub: "Across platform", change: "+1,247", color: "bg-teal-500" },
  { icon: FolderKanban, label: "Active Projects", value: "892", sub: "Currently running", change: "+45", color: "bg-orange-500" },
  { icon: IndianRupee, label: "Total Funds", value: "₹52.4Cr", sub: "Lifetime", change: "+₹8.2Cr", color: "bg-purple-500" },
];

const pendingActions = [
  { priority: "high", type: "NGO Verification", title: "Hope Foundation", desc: "New NGO registration pending verification", time: "2 hours ago", action: "Verify Now" },
  { priority: "medium", type: "Document Review", title: "Project Compliance Report", desc: "Monthly report from Daan Seva Trust", time: "5 hours ago", action: "Review" },
  { priority: "high", type: "Financial Alert", title: "Transaction Anomaly", desc: "Unusual fund transfer pattern detected", time: "1 day ago", action: "Investigate" },
  { priority: "medium", type: "User Support", title: "NGO Access Issue", desc: "Care India unable to access dashboard", time: "1 day ago", action: "Resolve" },
];

const recentActivities = [
  { name: "Daan Seva Trust", event: "Submitted monthly compliance report", time: "10 min ago", color: "bg-red-500" },
  { name: "Education First", event: "Created new project: Rural Literacy Drive", time: "1 hour ago", color: "bg-blue-500" },
  { name: "Health Care Foundation", event: "Received donation of ₹5,00,000", time: "2 hours ago", color: "bg-green-500" },
  { name: "Green Earth Initiative", event: "Document verification failed", time: "3 hours ago", color: "bg-yellow-500" },
];

const topNGOs = [
  { initials: "DA", name: "Daan Seva Trust", sub: "Verified NGO", score: 95, projects: 12, beneficiaries: "5,200", funds: "₹2.4Cr", rating: 4.9, color: "bg-[#1572A1]" },
  { initials: "ED", name: "Education First", sub: "Verified NGO", score: 92, projects: 8, beneficiaries: "3,800", funds: "₹1.8Cr", rating: 4.8, color: "bg-green-600" },
  { initials: "HC", name: "Health Care Foundation", sub: "Verified NGO", score: 90, projects: 15, beneficiaries: "7,100", funds: "₹3.2Cr", rating: 4.7, color: "bg-teal-600" },
  { initials: "CH", name: "Child Welfare Society", sub: "Verified NGO", score: 88, projects: 10, beneficiaries: "4,500", funds: "₹2.1Cr", rating: 4.6, color: "bg-amber-600" },
];

const summaryCards = [
  { icon: "✓", label: "Verified NGOs", value: "234", sub: "95% of total registered", color: "from-green-500 to-emerald-600" },
  { icon: "⏱", label: "Pending Verifications", value: "13", sub: "Requires immediate attention", color: "from-amber-500 to-yellow-600" },
  { icon: "!", label: "Flagged Issues", value: "7", sub: "2 critical, 5 moderate", color: "from-red-500 to-rose-600" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Platform Overview */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Platform Overview</h2>
        <p className="text-sm text-gray-500 mt-1">Monitor and manage the entire DaanPitara ecosystem</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className={`${s.color} p-2.5 rounded-lg`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3" /> {s.change}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-3">{s.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">{s.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Pending Actions & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-50 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Pending Actions</h3>
              <p className="text-xs text-gray-400 mt-0.5">Items requiring your attention</p>
            </div>
            <button className="text-xs font-semibold text-white bg-[#1572A1] px-4 py-1.5 rounded-lg hover:bg-[#125e87] transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {pendingActions.map((item, idx) => (
              <div key={idx} className="border border-gray-50 rounded-lg p-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {item.priority}
                      </span>
                      <span className="text-xs text-gray-400">{item.type}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-gray-800">{item.title}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                    <p className="text-[10px] text-gray-300 mt-1">{item.time}</p>
                  </div>
                  <button className="text-xs font-semibold text-[#1572A1] border border-[#1572A1] px-3 py-1.5 rounded-lg hover:bg-[#1572A1] hover:text-white transition-colors whitespace-nowrap">
                    {item.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-50 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Recent Activities</h3>
              <p className="text-xs text-gray-400 mt-0.5">Latest platform updates</p>
            </div>
            <button className="text-xs font-semibold text-[#1572A1] hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-5">
            {recentActivities.map((a, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${a.color} mt-1.5 flex-shrink-0`} />
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">{a.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{a.event}</p>
                  <p className="text-[10px] text-gray-300 mt-1">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing NGOs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-50 p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Top Performing NGOs</h3>
            <p className="text-xs text-gray-400 mt-0.5">Based on health score and impact</p>
          </div>
          <button className="text-xs font-semibold text-[#1572A1] hover:underline flex items-center gap-1">
            View All NGOs <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-[11px] font-semibold text-gray-400 uppercase py-3 pr-4">NGO Name</th>
                <th className="text-[11px] font-semibold text-gray-400 uppercase py-3 px-4">Health Score</th>
                <th className="text-[11px] font-semibold text-gray-400 uppercase py-3 px-4">Projects</th>
                <th className="text-[11px] font-semibold text-gray-400 uppercase py-3 px-4">Beneficiaries</th>
                <th className="text-[11px] font-semibold text-gray-400 uppercase py-3 px-4">Funds Managed</th>
                <th className="text-[11px] font-semibold text-gray-400 uppercase py-3 px-4">Rating</th>
                <th className="text-[11px] font-semibold text-gray-400 uppercase py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {topNGOs.map((ngo, idx) => (
                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${ngo.color} flex items-center justify-center text-white text-xs font-bold`}>
                        {ngo.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{ngo.name}</p>
                        <p className="text-[11px] text-gray-400">{ngo.sub}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${ngo.score}%` }} />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{ngo.score}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{ngo.projects}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{ngo.beneficiaries}</td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-700">{ngo.funds}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-medium text-gray-700">{ngo.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-xs font-semibold text-[#1572A1] hover:underline">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {summaryCards.map((card, idx) => (
          <div key={idx} className={`bg-gradient-to-br ${card.color} rounded-xl p-6 text-white relative overflow-hidden hover:scale-[1.02] transition-transform`}>
            <div className="absolute top-4 right-4 opacity-30">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl mb-3">
              {card.icon}
            </div>
            <p className="text-sm font-semibold text-white/80">{card.label}</p>
            <p className="text-3xl font-bold mt-1">{card.value}</p>
            <p className="text-xs text-white/60 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
