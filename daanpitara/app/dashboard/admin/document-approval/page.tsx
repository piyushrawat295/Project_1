"use client";

import { Search, Filter, Download, Eye, CheckCircle, XCircle, Clock, FileText, AlertTriangle } from "lucide-react";

const summaryStats = [
  { icon: Clock, label: "Pending Reviews", value: "47", sub: "10 new today", color: "bg-blue-500" },
  { icon: CheckCircle, label: "Approved Today", value: "23", sub: "+6 vs yesterday", color: "bg-green-500" },
  { icon: XCircle, label: "Rejected Today", value: "5", sub: "With feedback", color: "bg-red-500" },
  { icon: FileText, label: "Total Processed", value: "1,247", sub: "This month", color: "bg-purple-500" },
];

const documents = [
  {
    title: "80G Registration Certificate",
    priority: "High", priorityColor: "bg-red-100 text-red-700",
    ngo: "Hope Foundation", category: "Compliance", categoryColor: "bg-blue-100 text-blue-700",
    status: "Pending", statusColor: "bg-amber-100 text-amber-700",
    submittedBy: "Rajesh Kumar", submittedDate: "20 Jan 2026",
    fileType: "PDF (2.4 MB)", expiryDate: "31 Dec 2026", priorityLevel: "High",
    showActions: true, rejectionReason: null,
  },
  {
    title: "Annual Audit Report",
    priority: "High", priorityColor: "bg-red-100 text-red-700",
    ngo: "Daan Seva Trust", category: "Financial", categoryColor: "bg-green-100 text-green-700",
    status: "Pending", statusColor: "bg-amber-100 text-amber-700",
    submittedBy: "Priya Sharma", submittedDate: "20 Jan 2026",
    fileType: "PDF (5.8 MB)", expiryDate: "N/A", priorityLevel: "High",
    showActions: true, rejectionReason: null,
  },
  {
    title: "Project Completion Report",
    priority: "Medium", priorityColor: "bg-yellow-100 text-yellow-700",
    ngo: "Education First", category: "Project", categoryColor: "bg-purple-100 text-purple-700",
    status: "Pending", statusColor: "bg-amber-100 text-amber-700",
    submittedBy: "Amit Patel", submittedDate: "19 Jan 2026",
    fileType: "PDF (3.2 MB)", expiryDate: "N/A", priorityLevel: "Medium",
    showActions: true, rejectionReason: null,
  },
  {
    title: "FCRA Certificate",
    priority: "High", priorityColor: "bg-red-100 text-red-700",
    ngo: "Health Care Foundation", category: "Compliance", categoryColor: "bg-blue-100 text-blue-700",
    status: "Under Review", statusColor: "bg-blue-100 text-blue-700",
    submittedBy: "Sneha Desai", submittedDate: "19 Jan 2026",
    fileType: "PDF (1.9 MB)", expiryDate: "15 Jan 2027", priorityLevel: "High",
    showActions: false, rejectionReason: null,
  },
  {
    title: "Monthly Compliance Report",
    priority: "Medium", priorityColor: "bg-yellow-100 text-yellow-700",
    ngo: "Green Earth Initiative", category: "Compliance", categoryColor: "bg-blue-100 text-blue-700",
    status: "Pending", statusColor: "bg-amber-100 text-amber-700",
    submittedBy: "Vikram Singh", submittedDate: "18 Jan 2026",
    fileType: "PDF (4.1 MB)", expiryDate: "N/A", priorityLevel: "Medium",
    showActions: false, rejectionReason: null,
  },
  {
    title: "12A Registration",
    priority: "High", priorityColor: "bg-red-100 text-red-700",
    ngo: "Child Welfare Society", category: "Compliance", categoryColor: "bg-blue-100 text-blue-700",
    status: "Approved", statusColor: "bg-green-100 text-green-700",
    submittedBy: "Anjali Mehta", submittedDate: "18 Jan 2026",
    fileType: "PDF (2.7 MB)", expiryDate: "Perpetual", priorityLevel: "High",
    showActions: false, rejectionReason: null,
  },
  {
    title: "Beneficiary Impact Report",
    priority: "Low", priorityColor: "bg-gray-100 text-gray-600",
    ngo: "Women Empowerment Trust", category: "Impact", categoryColor: "bg-orange-100 text-orange-700",
    status: "Rejected", statusColor: "bg-red-100 text-red-700",
    submittedBy: "Kavita Reddy", submittedDate: "17 Jan 2026",
    fileType: "PDF (6.5 MB)", expiryDate: "N/A", priorityLevel: "Low",
    showActions: false, rejectionReason: "Incomplete beneficiary data - missing 40% records",
  },
];

export default function DocumentApprovalPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Document Approval</h2>
        <p className="text-sm text-gray-500 mt-1">Review and approve NGO documents and compliance reports</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-50">
            <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by document name, NGO, or type..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none text-sm placeholder:text-gray-400 bg-white"
          />
        </div>
        <button className="flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors bg-white">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      {/* Document Cards */}
      <div className="space-y-4">
        {documents.map((doc, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden">
            {/* Card Header */}
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-gray-900">{doc.title}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${doc.priorityColor}`}>{doc.priority}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">🏢 {doc.ngo}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${doc.categoryColor}`}>{doc.category}</span>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${doc.statusColor} whitespace-nowrap`}>
                  {doc.status === 'Pending' ? '⏳' : doc.status === 'Approved' ? '✅' : doc.status === 'Under Review' ? '🔍' : '❌'} {doc.status}
                </span>
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-6 mt-4 text-xs text-gray-400 flex-wrap">
                <span>👤 Submitted By: <span className="text-gray-600 font-medium">{doc.submittedBy}</span></span>
                <span>📅 Submitted Date: <span className="text-gray-600 font-medium">{doc.submittedDate}</span></span>
                <span>📄 File Type: <span className="text-gray-600 font-medium">{doc.fileType}</span></span>
                <span>⏰ Expiry Date: <span className="text-gray-600 font-medium">{doc.expiryDate}</span></span>
                <span>🔺 Priority: <span className="text-gray-600 font-medium">{doc.priorityLevel}</span></span>
              </div>

              {/* Rejection Reason */}
              {doc.rejectionReason && (
                <div className="mt-3 flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
                  <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-red-700">Rejection Reason:</p>
                    <p className="text-xs text-red-600 mt-0.5">{doc.rejectionReason}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-3 px-5 pb-5">
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#1572A1] text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-[#125e87] transition-colors">
                <Eye className="w-4 h-4" /> View Document
              </button>
              {doc.showActions ? (
                <>
                  <button className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4" /> Download
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-white bg-green-500 px-4 py-2.5 rounded-lg hover:bg-green-600 transition-colors font-semibold">
                    <CheckCircle className="w-4 h-4" /> Approve
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-white bg-red-500 px-4 py-2.5 rounded-lg hover:bg-red-600 transition-colors font-semibold">
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </>
              ) : (
                <button className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" /> Download
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
