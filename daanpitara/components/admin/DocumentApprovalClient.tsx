"use client";

import { useState } from "react";
import { Search, Filter, Download, Eye, CheckCircle, XCircle, Clock, FileText, AlertTriangle } from "lucide-react";
import { updateDocumentStatus } from "@/actions/admin";

export default function DocumentApprovalClient({ initialDocs }: { initialDocs: any[] }) {
  const [documents, setDocuments] = useState(initialDocs);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingId, setLoadingId] = useState<number | null>(null);

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

  const filteredDocs = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (doc.ngoName && doc.ngoName.toLowerCase().includes(searchQuery.toLowerCase()))
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
            placeholder="Search by document name or NGO..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 h-11 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none text-sm placeholder:text-gray-400 bg-white transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-5 h-11 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors bg-white btn-press">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      {/* Document Cards */}
      <div className="space-y-4">
        {filteredDocs.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-12 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50 text-gray-400">
             <FileText className="w-10 h-10 mb-3 opacity-40" />
             <p className="text-sm font-medium">No documents found</p>
             <p className="text-[11px] text-gray-300 mt-0.5">Try adjusting your search query</p>
         </div>
        ) : filteredDocs.map((doc) => {
          const isPending = doc.status === 'pending';
          const isApproved = doc.status === 'verified' || doc.status === 'approved';
          
          let statusClasses = "bg-amber-50 text-amber-700 border-amber-100";
          let StatusIcon = Clock;
          if (isApproved) {
              statusClasses = "bg-emerald-50 text-emerald-700 border-emerald-100";
              StatusIcon = CheckCircle;
          } else if (doc.status === 'missing' || doc.status === 'rejected') {
              statusClasses = "bg-red-50 text-red-700 border-red-100";
              StatusIcon = XCircle;
          }

          return (
          <div key={doc.id} className="bg-white rounded-2xl shadow-sm border border-gray-100/60 overflow-hidden card-hover">
            {/* Card Content */}
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-gray-900 truncate">{doc.name}</h3>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">🏢 {doc.ngoName || 'Unknown NGO'}</span>
                    <span className="text-gray-200">•</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 border border-blue-100">{doc.category || 'General'}</span>
                  </div>
                </div>
                <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full ${statusClasses} whitespace-nowrap capitalize flex items-center gap-1.5 border`}>
                  <StatusIcon className="w-3 h-3" /> {doc.status}
                </span>
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-6 mt-4 text-[11px] text-gray-400 flex-wrap">
                <span>📅 Submitted: <span className="text-gray-600 font-medium">{new Date(doc.createdAt).toISOString().split('T')[0]}</span></span>
                <span>📄 Type: <span className="text-gray-600 font-medium uppercase">{doc.type}</span></span>
                <span>⏰ Expiry: <span className="text-gray-600 font-medium">{doc.expiryDate ? new Date(doc.expiryDate).toISOString().split('T')[0] : 'Lifetime'}</span></span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-2.5 px-5 pb-5">
              <button 
                onClick={() => doc.id && window.open(`/api/documents/${doc.id}`, '_blank')}
                className="flex-1 flex items-center justify-center gap-2 bg-[#1572A1] text-white text-[13px] font-semibold h-10 rounded-xl hover:bg-[#125e87] transition-all duration-200 btn-press shadow-sm"
                disabled={!doc.id}
              >
                <Eye className="w-4 h-4" /> View Document
              </button>
              
              {isPending && (
                <>
                  <button 
                    onClick={() => handleStatusUpdate(doc.id, 'verified')}
                    disabled={loadingId === doc.id}
                    className="flex items-center gap-1.5 text-[13px] text-white bg-emerald-500 px-4 h-10 rounded-xl hover:bg-emerald-600 transition-all duration-200 font-semibold disabled:opacity-50 btn-press shadow-sm"
                  >
                    <CheckCircle className="w-4 h-4" /> {loadingId === doc.id ? "…" : "Approve"}
                  </button>
                  <button 
                    onClick={() => {
                        const reason = prompt("Enter rejection reason:");
                        if (reason) handleStatusUpdate(doc.id, 'rejected', reason);
                    }}
                    disabled={loadingId === doc.id}
                    className="flex items-center gap-1.5 text-[13px] text-white bg-red-500 px-4 h-10 rounded-xl hover:bg-red-600 transition-all duration-200 font-semibold disabled:opacity-50 btn-press shadow-sm"
                  >
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </>
              )}
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
                     disabled={!doc.id}
                     className="flex items-center gap-1.5 text-[13px] text-gray-600 border border-gray-200 px-4 h-10 rounded-xl hover:bg-gray-50 transition-all duration-200 disabled:opacity-40 btn-press"
                   >
                   <Download className="w-4 h-4" /> Download
                 </button>
            </div>
          </div>
        );
        })}
      </div>
    </div>
  );
}
