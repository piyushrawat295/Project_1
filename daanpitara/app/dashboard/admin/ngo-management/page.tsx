"use client";

import { Building2, Search, Filter, Eye, Pencil, MoreVertical, ChevronLeft, ChevronRight, Download } from "lucide-react";

const summaryStats = [
  { label: "Total NGOs", value: "247", color: "text-gray-900" },
  { label: "Verified", value: "234", color: "text-green-600" },
  { label: "Pending", value: "13", color: "text-amber-600" },
  { label: "Flagged", value: "7", color: "text-red-600" },
];

const ngos = [
  {
    initials: "DA", color: "bg-[#1572A1]", name: "Daan Seva Trust", reg: "80G/12A/NGO-2018-0012",
    email: "contact@daanseva.org", phone: "+91 98765 43210", location: "Mumbai, Maharashtra",
    status: "Verified", statusColor: "text-green-600 bg-green-50", score: 95,
    projects: 12, beneficiaries: "5,200", funds: "₹2.4Cr", lastActive: "2 hours ago",
  },
  {
    initials: "ED", color: "bg-green-600", name: "Education First", reg: "80G/12A/NGO-2019-0045",
    email: "info@educationfirst.org", phone: "+91 98765 43211", location: "Delhi, NCR",
    status: "Verified", statusColor: "text-green-600 bg-green-50", score: 92,
    projects: 8, beneficiaries: "3,800", funds: "₹1.8Cr", lastActive: "5 hours ago",
  },
  {
    initials: "HO", color: "bg-amber-500", name: "Hope Foundation", reg: "80G/12A/NGO-2023-0123",
    email: "contact@hopefoundation.org", phone: "+91 98765 43212", location: "Bangalore, Karnataka",
    status: "Pending", statusColor: "text-amber-600 bg-amber-50", score: null,
    projects: 0, beneficiaries: "0", funds: "₹0", lastActive: "2 hours ago",
  },
  {
    initials: "GR", color: "bg-red-500", name: "Green Earth Initiative", reg: "80G/12A/NGO-2021-0078",
    email: "info@greenearth.org", phone: "+91 98765 43213", location: "Pune, Maharashtra",
    status: "Flagged", statusColor: "text-red-600 bg-red-50", score: 65,
    projects: 5, beneficiaries: "1,200", funds: "₹45L", lastActive: "1 day ago",
  },
  {
    initials: "CH", color: "bg-purple-600", name: "Child Welfare Society", reg: "80G/12A/NGO-2020-0089",
    email: "contact@childwelfare.org", phone: "+91 98765 43214", location: "Kolkata, West Bengal",
    status: "Verified", statusColor: "text-green-600 bg-green-50", score: 88,
    projects: 10, beneficiaries: "4,500", funds: "₹2.1Cr", lastActive: "3 hours ago",
  },
];

export default function NGOManagementPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">NGO Management</h2>
          <p className="text-sm text-gray-500 mt-1">View and manage all registered NGOs</p>
        </div>
        <button className="flex items-center gap-2 bg-[#1572A1] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#125e87] transition-colors">
          <Download className="w-4 h-4" /> Export Data
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-50">
            <p className="text-xs text-gray-400">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by NGO name, registration number, or location..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none text-sm placeholder:text-gray-400 bg-white"
          />
        </div>
        <button className="flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors bg-white">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      {/* NGO Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-50 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-[11px] font-semibold text-[#1572A1] uppercase py-4 px-5">NGO Details</th>
              <th className="text-[11px] font-semibold text-[#1572A1] uppercase py-4 px-4">Status</th>
              <th className="text-[11px] font-semibold text-[#1572A1] uppercase py-4 px-4">Health Score</th>
              <th className="text-[11px] font-semibold text-[#1572A1] uppercase py-4 px-4">Projects</th>
              <th className="text-[11px] font-semibold text-[#1572A1] uppercase py-4 px-4">Beneficiaries</th>
              <th className="text-[11px] font-semibold text-[#1572A1] uppercase py-4 px-4">Funds</th>
              <th className="text-[11px] font-semibold text-[#1572A1] uppercase py-4 px-4">Last Active</th>
              <th className="text-[11px] font-semibold text-[#1572A1] uppercase py-4 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ngos.map((ngo, idx) => (
              <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${ngo.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                      {ngo.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1572A1]">{ngo.name}</p>
                      <p className="text-[11px] text-gray-400">{ngo.reg}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-[10px] text-gray-400">✉ {ngo.email}</span>
                        <span className="text-[10px] text-gray-400">📞 {ngo.phone}</span>
                      </div>
                      <p className="text-[10px] text-gray-400">{ngo.location}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ngo.statusColor} flex items-center gap-1 w-fit`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${ngo.status === 'Verified' ? 'bg-green-500' : ngo.status === 'Pending' ? 'bg-amber-500' : 'bg-red-500'}`} />
                    {ngo.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  {ngo.score !== null ? (
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${ngo.score >= 80 ? 'bg-green-500' : ngo.score >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${ngo.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{ngo.score}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">N/A</span>
                  )}
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">{ngo.projects}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{ngo.beneficiaries}</td>
                <td className="py-4 px-4 text-sm font-medium text-gray-700">{ngo.funds}</td>
                <td className="py-4 px-4 text-xs text-gray-500">{ngo.lastActive}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-50">
          <p className="text-xs text-gray-400">Showing 1 to 5 of 247 NGOs</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-xs text-gray-400 border border-gray-200 rounded-lg hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1.5 text-xs text-white bg-[#1572A1] rounded-lg font-semibold">1</button>
            <button className="px-3 py-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">2</button>
            <button className="px-3 py-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">3</button>
            <button className="px-3 py-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
