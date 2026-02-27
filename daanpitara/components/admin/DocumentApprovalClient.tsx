"use client";

import React, { useState } from "react";
import { Search, Filter, Download, Eye, CheckCircle, XCircle, Clock, FileText, ChevronDown, ChevronUp, AlertTriangle, ShieldCheck } from "lucide-react";
import { updateDocumentStatus } from "@/actions/admin";

export default function DocumentApprovalClient({ initialDocs }: { initialDocs: any[] }) {
  const [documents, setDocuments] = useState(initialDocs);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const [expandedNgoId, setExpandedNgoId] = useState<number | null>(null);

  const pendingCount = documents.filter(d => d.status === 'pending').length;
  const approvedCount = documents.filter(d => d.status === 'verified' || d.status === 'approved').length;
  const rejectedCount = documents.filter(d => d.status === 'missing' || d.status === 'rejected').length;
  const totalCount = documents.length;

  const summaryStats = [
    { icon: Clock, label: "Pending Reviews", value: pendingCount.toString(), sub: "Needs attention", color: "bg-blue-500" },
    { icon: CheckCircle, label: "Approved Docs", value: approvedCount.toString(), sub: "Total verified", color: "bg-emerald-500" },
    { icon: XCircle, label: "Rejected Docs", value: rejectedCount.toString(), sub: "Requires action", color: "bg-red-500" },
    { icon: FileText, label: "Total Processed", value: totalCount.toString(), sub: "Platform wide", color: "bg-purple-500" },
  ];

  const handleStatusUpdate = async (docId: number, status: string, reason?: string) => {
      setLoadingId(docId);
      const res = await updateDocumentStatus(docId, status, reason);
      if (res?.success) {
          setDocuments(documents.map(d => d.id === docId ? { ...d, status } : d));
      } else {
          alert(res?.error || "Failed to update document.");
      }
      setLoadingId(null);
  };

  // Group documents by NGO
  const groupedDocs = documents.reduce((acc, doc) => {
      const ngoId = doc.ngoId || 0; // fallback if ngoId somehow missing
      if (!acc[ngoId]) {
          acc[ngoId] = {
              id: ngoId,
              name: doc.ngoName || 'Unknown NGO',
              documents: []
          };
      }
      acc[ngoId].documents.push(doc);
      return acc;
  }, {} as Record<number, { id: number, name: string, documents: any[] }>);

  // Filter grouped NGOs by search
  const filteredNGOs = Object.values(groupedDocs).filter((ngo: any) => 
    ngo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Document Approval</h2>
        <p className="text-sm text-gray-400 mt-1">Review and approve NGO documents and compliance reports</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/60 card-hover group">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3 group-hover:shadow-md transition-shadow`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-[28px] font-bold text-gray-900 tabular-nums tracking-tight">{s.value}</p>
            <p className="text-[11px] text-gray-400 mt-0.5 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search NGOs..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 h-11 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none text-sm placeholder:text-gray-400 bg-white transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-5 h-11 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors bg-white btn-press">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      {/* NGO Group Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px] border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-[11px] font-semibold text-gray-400 uppercase py-4 px-5 tracking-wide w-10"></th>
                <th className="text-[11px] font-semibold text-gray-400 uppercase py-4 px-5 tracking-wide">NGO Name</th>
                <th className="text-[11px] font-semibold text-gray-400 uppercase py-4 px-4 tracking-wide text-center">Total Docs</th>
                <th className="text-[11px] font-semibold text-gray-400 uppercase py-4 px-4 tracking-wide text-center">Pending Review</th>
                <th className="text-[11px] font-semibold text-gray-400 uppercase py-4 px-4 tracking-wide text-center">Approved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredNGOs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12">
                   <div className="flex flex-col items-center justify-center text-gray-400">
                     <FileText className="w-10 h-10 mb-3 opacity-40" />
                     <p className="text-sm font-medium">No NGOs found</p>
                     <p className="text-[11px] text-gray-300 mt-0.5">Try adjusting your search query</p>
                   </div>
                 </td>
               </tr>
              ) : filteredNGOs.map((ngo: any) => {
                const totalDocs = ngo.documents.length;
                const pendingDocs = ngo.documents.filter((d: any) => d.status === 'pending').length;
                const approvedDocs = ngo.documents.filter((d: any) => d.status === 'verified' || d.status === 'approved').length;
                const isExpanded = expandedNgoId === ngo.id;

                return (
                  <React.Fragment key={ngo.id}>
                    {/* NGO Row */}
                    <tr 
                      className={`hover:bg-blue-50/30 transition-colors duration-150 cursor-pointer ${isExpanded ? 'bg-blue-50/10' : ''}`}
                      onClick={() => setExpandedNgoId(isExpanded ? null : ngo.id)}
                    >
                      <td className="py-4 px-5 text-gray-400">
                         {isExpanded ? <ChevronUp className="w-5 h-5 text-blue-500" /> : <ChevronDown className="w-5 h-5" />}
                      </td>
                      <td className="py-4 px-5">
                          <p className="text-sm font-bold text-gray-800">{ngo.name}</p>
                      </td>
                      <td className="py-4 px-4 text-center">
                          <span className="text-sm font-semibold text-gray-700">{totalDocs}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                          {pendingDocs > 0 ? (
                             <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">
                               <Clock className="w-3.5 h-3.5" /> {pendingDocs}
                             </span>
                          ) : (
                             <span className="text-sm text-gray-400">-</span>
                          )}
                      </td>
                      <td className="py-4 px-4 text-center">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${approvedDocs > 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-gray-50 text-gray-500'}`}>
                             {approvedDocs > 0 && <CheckCircle className="w-3.5 h-3.5" />} {approvedDocs}
                          </span>
                      </td>
                    </tr>

                    {/* Expanded Nested Table */}
                    {isExpanded && (
                      <tr>
                        <td colSpan={5} className="p-0 border-b-2 border-blue-100">
                          <div className="bg-gray-50/60 p-6 shadow-inner pb-8">
                             <div className="flex items-center gap-2 mb-4">
                               <FileText className="w-5 h-5 text-blue-600" />
                               <h4 className="text-sm font-bold text-gray-800">Documents for {ngo.name}</h4>
                             </div>
                             
                             <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Document Details</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Submission</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {ngo.documents.map((doc: any) => (
                                                <tr key={doc.id} className="hover:bg-[#F8FAFC]/80 transition-all group">
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm border transition-transform
                                                              ${(doc.status === 'verified' || doc.status === 'approved') ? 'bg-green-50 text-green-600 border-green-100' : 
                                                              doc.status === 'pending' ? 'bg-blue-50 text-blue-500 border-blue-100' : 'bg-red-50 text-red-500 border-red-100'}`}>
                                                                {doc.name.toLowerCase().includes('certificate') ? <ShieldCheck className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                                                            </div>
                                                            <div className="space-y-1">
                                                                <div className="font-extrabold text-[#1A1A1A] text-sm tracking-tight">{doc.name}</div>
                                                                <div className="flex items-center gap-2">
                                                                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-100 px-2 py-0.5 rounded">ID: {doc.id.toString().padStart(4, '0')}</span>
                                                                  <span className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter">{doc.type || 'Upload'}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <StatusBadge status={doc.status} />
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <div className="text-sm font-bold text-gray-800">
                                                            {new Date(doc.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            {/* Standard Actions */}
                                                            <button 
                                                              onClick={() => doc.id && window.open(`/api/documents/${doc.id}`, '_blank')}
                                                              title="View Document"
                                                              className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors border border-gray-100 bg-white shadow-sm"
                                                            >
                                                               <Eye className="w-4 h-4" />
                                                            </button>
                                                            <button 
                                                              onClick={() => {
                                                                  if (!doc.id) return;
                                                                  const link = document.createElement('a');
                                                                  link.href = `/api/documents/${doc.id}`;
                                                                  link.download = doc.name;
                                                                  document.body.appendChild(link);
                                                                  link.click();
                                                                  document.body.removeChild(link);
                                                              }}
                                                              title="Download Document"
                                                              className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors border border-gray-100 bg-white shadow-sm"
                                                            >
                                                               <Download className="w-4 h-4" />
                                                            </button>

                                                            {/* Admin Actions */}
                                                            {doc.status === 'pending' && (
                                                              <>
                                                                <div className="w-px h-6 bg-gray-200 mx-1"></div>
                                                                <button 
                                                                  onClick={() => handleStatusUpdate(doc.id, 'verified')}
                                                                  disabled={loadingId === doc.id}
                                                                  title="Approve"
                                                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors shadow-sm disabled:opacity-50"
                                                                >
                                                                  <CheckCircle className="w-3.5 h-3.5" /> {loadingId === doc.id ? "…" : "Approve"}
                                                                </button>
                                                                <button 
                                                                  onClick={() => {
                                                                      const reason = prompt("Enter rejection reason:");
                                                                      if (reason) handleStatusUpdate(doc.id, 'rejected', reason);
                                                                  }}
                                                                  disabled={loadingId === doc.id}
                                                                  title="Reject"
                                                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-sm disabled:opacity-50"
                                                                >
                                                                  <XCircle className="w-3.5 h-3.5" /> Reject
                                                                </button>
                                                              </>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                             </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Reused exact badge style from User Dashboard
function StatusBadge({ status }: { status: string }) {
    const s = status?.toLowerCase() || 'pending';
    // Remap 'verified' and 'approved' to same green style for admin uniformity
    const effectiveStatus = (s === 'approved' || s === 'verified') ? 'verified' : s;
    
    const configs: any = {
        verified: "bg-green-100 text-green-700 border-green-200",
        missing: "bg-red-100 text-red-700 border-red-200",
        rejected: "bg-red-100 text-red-700 border-red-200",
        expiring: "bg-orange-100 text-orange-700 border-orange-200",
        pending: "bg-blue-100 text-blue-700 border-blue-200"
    };

    return (
        <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${configs[effectiveStatus] || configs.pending}`}>
            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${effectiveStatus === 'verified' ? 'bg-green-500' : (effectiveStatus === 'missing' || effectiveStatus === 'rejected') ? 'bg-red-500' : 'bg-current animate-pulse'}`}></span>
            {effectiveStatus}
        </div>
    );
}
