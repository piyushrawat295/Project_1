"use client";

import { useState } from "react";
import { Search, Filter, Eye, Pencil, Trash2, Download, X, AlertTriangle, Building2 } from "lucide-react";
import { deleteNGO, verifyNGO } from "@/actions/admin";
import Link from "next/link";

export default function NGOManagementClient({ initialNgos }: { initialNgos: any[] }) {
  const [ngos, setNgos] = useState(initialNgos);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: number | null; name: string }>({ open: false, id: null, name: "" });

  const totalCount = ngos.length;
  const verifiedCount = ngos.filter(n => n.status === "Verified").length;
  const pendingCount = ngos.filter(n => n.status === "Pending").length;
  const flaggedCount = ngos.filter(n => n.status === "Flagged").length;

  const summaryStats = [
    { label: "Total NGOs", value: totalCount.toString(), color: "text-gray-900", bg: "bg-blue-50", accent: "text-blue-600" },
    { label: "Verified", value: verifiedCount.toString(), color: "text-emerald-600", bg: "bg-emerald-50", accent: "text-emerald-600" },
    { label: "Pending", value: pendingCount.toString(), color: "text-amber-600", bg: "bg-amber-50", accent: "text-amber-600" },
    { label: "Flagged", value: flaggedCount.toString(), color: "text-red-600", bg: "bg-red-50", accent: "text-red-600" },
  ];

  const filteredNgos = ngos.filter(n => 
      n.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      n.reg.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async () => {
      if (!deleteModal.id) return;
      setLoadingId(deleteModal.id);
      const res = await deleteNGO(deleteModal.id);
      if (res?.success) {
          setNgos(ngos.filter(n => n.id !== deleteModal.id));
      } else {
          alert(res?.error || "Error deleting NGO");
      }
      setLoadingId(null);
      setDeleteModal({ open: false, id: null, name: "" });
  };

  const handleVerify = async (id: number) => {
      setLoadingId(id);
      const res = await verifyNGO(id);
      if (res?.success) {
          setNgos(ngos.map(n => n.id === id ? { ...n, status: "Verified", score: 85 } : n));
      } else {
          alert(res?.error || "Error verifying NGO");
      }
      setLoadingId(null);
  };

    const handleExport = () => {
        const headers = ["ID", "Name", "Registration", "Location", "Status", "Projects", "Funds", "Last Active"];
        const csvData = filteredNgos.map(ngo => [
            ngo.id,
            `"${ngo.name}"`,
            `"${ngo.reg}"`,
            `"${ngo.location}"`,
            ngo.status,
            ngo.projects,
            `"${ngo.funds}"`,
            `"${ngo.lastActive}"`
        ].join(","));

        const csvString = [headers.join(","), ...csvData].join("\n");
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `ngo_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

  return (
    <>
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">NGO Management</h2>
          <p className="text-sm text-gray-400 mt-1">View and manage all registered NGOs</p>
        </div>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 bg-[#1572A1] text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl hover:bg-[#125e87] transition-all duration-200 btn-press shadow-sm"
        >
          <Download className="w-4 h-4" /> Export Data
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/60 card-hover">
            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">{s.label}</p>
            <p className={`text-[28px] font-bold mt-1.5 ${s.color} tabular-nums tracking-tight`}>{s.value}</p>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 h-11 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none text-sm placeholder:text-gray-400 bg-white transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-5 h-11 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors bg-white btn-press">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      {/* NGO Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/60 overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[900px] sticky-thead zebra-rows">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-[11px] font-semibold text-gray-400 uppercase py-4 px-5 tracking-wide">NGO Details</th>
              <th className="text-[11px] font-semibold text-gray-400 uppercase py-4 px-4 tracking-wide">Status</th>
              <th className="text-[11px] font-semibold text-gray-400 uppercase py-4 px-4 tracking-wide">Health Score</th>
              <th className="text-[11px] font-semibold text-gray-400 uppercase py-4 px-4 tracking-wide">Projects</th>
              <th className="text-[11px] font-semibold text-gray-400 uppercase py-4 px-4 tracking-wide">Beneficiaries</th>
              <th className="text-[11px] font-semibold text-gray-400 uppercase py-4 px-4 tracking-wide">Funds</th>
              <th className="text-[11px] font-semibold text-gray-400 uppercase py-4 px-4 tracking-wide">Last Active</th>
              <th className="text-[11px] font-semibold text-gray-400 uppercase py-4 px-4 tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNgos.map((ngo) => (
              <tr key={ngo.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors duration-150">
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${ngo.color || 'bg-blue-500'} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm`}>
                      {ngo.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{ngo.name}</p>
                      <p className="text-[11px] text-gray-400 truncate">{ngo.reg}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{ngo.location}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  {ngo.status === "Pending" ? (
                    <button 
                        disabled={loadingId === ngo.id}
                        onClick={() => handleVerify(ngo.id)}
                        className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors disabled:opacity-50 flex items-center gap-1.5"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        {loadingId === ngo.id ? "Verifying…" : "Verify"}
                    </button>
                  ) : (
                    <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 w-fit ${ngo.status === 'Verified' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${ngo.status === 'Verified' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      {ngo.status}
                    </span>
                  )}
                </td>
                <td className="py-4 px-4">
                  {ngo.score ? (
                    <div className="flex items-center gap-2">
                       <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${ngo.score >= 80 ? 'bg-emerald-500' : ngo.score >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${ngo.score}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-700 tabular-nums">{ngo.score}</span>
                    </div>
                  ) : (
                    <span className="text-[11px] text-gray-300">—</span>
                  )}
                </td>
                <td className="py-4 px-4 text-sm font-semibold text-gray-700 tabular-nums">{ngo.projects}</td>
                <td className="py-4 px-4 text-sm text-gray-500 tabular-nums">{ngo.beneficiaries}</td>
                <td className="py-4 px-4 text-sm font-semibold text-gray-700 tabular-nums">{ngo.funds}</td>
                <td className="py-4 px-4 text-[11px] text-gray-400">{ngo.lastActive}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1">
                    <Link href={`/dashboard/admin/ngo-management/${ngo.id}`} className="tooltip-wrap p-2 text-gray-400 hover:text-[#1572A1] hover:bg-blue-50 rounded-lg transition-all duration-150 inline-flex" data-tooltip="View details">
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link href={`/dashboard/admin/ngo-management/${ngo.id}/edit`} className="tooltip-wrap p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-150 inline-flex" data-tooltip="Edit">
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button 
                        onClick={() => setDeleteModal({ open: true, id: ngo.id, name: ngo.name })}
                        disabled={loadingId === ngo.id}
                        className="tooltip-wrap p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-150 disabled:opacity-50" 
                        data-tooltip="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredNgos.length === 0 && (
                <tr>
                    <td colSpan={8} className="py-12 text-center">
                        <div className="flex flex-col items-center text-gray-400">
                            <Building2 className="w-8 h-8 mb-2 opacity-40" />
                            <p className="text-sm font-medium">No NGOs found matching &ldquo;{searchQuery}&rdquo;</p>
                        </div>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100/60">
          <p className="text-[11px] text-gray-400">Showing 1 to {filteredNgos.length} of {totalCount} NGOs</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-[11px] text-gray-400 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40" disabled>Previous</button>
            <button className="px-3 py-1.5 text-[11px] text-white bg-[#1572A1] rounded-lg font-semibold shadow-sm">1</button>
            <button className="px-3 py-1.5 text-[11px] text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>

    {/* Delete Confirmation Modal */}
    {deleteModal.open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-dropdown-in">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">Delete NGO</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Are you sure you want to permanently delete <strong className="text-gray-700">{deleteModal.name}</strong>? This action cannot be undone.
                        </p>
                    </div>
                    <button onClick={() => setDeleteModal({ open: false, id: null, name: "" })} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex items-center gap-3 mt-6 justify-end">
                    <button 
                        onClick={() => setDeleteModal({ open: false, id: null, name: "" })}
                        className="px-4 h-10 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors btn-press"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleDelete}
                        disabled={loadingId === deleteModal.id}
                        className="px-4 h-10 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors btn-press disabled:opacity-50 shadow-sm flex items-center gap-2"
                    >
                        <Trash2 className="w-4 h-4" />
                        {loadingId === deleteModal.id ? "Deleting…" : "Delete NGO"}
                    </button>
                </div>
            </div>
        </div>
    )}
    </>
  );
}
