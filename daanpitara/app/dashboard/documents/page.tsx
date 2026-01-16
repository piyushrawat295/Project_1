"use client";

import { useEffect, useState } from "react";
import { getRecords } from "@/actions/ngo-features";
import { Upload, Eye, Download, Bell, AlertTriangle, CheckCircle, FileText } from "lucide-react";
import { Document } from "@/lib/schema";

export default function DocumentsPage() {
  // Use 'any' for stats if types are not strictly exported or just define locally
  const [stats, setStats] = useState({
    verified: 0,
    expiring: 0,
    missing: 0,
    total: 0
  });
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data, stats, error } = await getRecords();
      if (data) {
        setDocuments(data);
        if (stats) setStats(stats as any);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  // Prepare mandatory list logic (Mocking missing ones for now if needed, or just relying on what's in DB)
  // For the UI, we'll just show what we have.

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents & Compliance</h1>
          <p className="text-gray-500">Safe locker - No more &quot;file kahaan hai?&quot;</p>
        </div>
        <button className="flex items-center gap-2 bg-[#0F71A8] text-white px-4 py-2 rounded-lg hover:bg-[#0c5a86] transition-colors">
          <Upload className="w-4 h-4" />
          Upload Document
        </button>
      </div>

      {/* Compliance Score Banner */}
      <div className="bg-[#0F5A80] rounded-xl p-6 text-white relative overflow-hidden">
         {/* Background pattern could go here */}
         <div className="flex justify-between items-center relative z-10">
             <div>
                 <h2 className="text-lg font-medium opacity-90">Compliance Score</h2>
                 <div className="mt-2 flex items-baseline gap-2">
                     <span className="text-5xl font-bold">75%</span>
                     <span className="text-sm opacity-80">Good</span>
                 </div>
             </div>
             <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center">
                 <CheckCircle className="w-10 h-10 text-green-500" />
             </div>
         </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Verified */}
        <div className="bg-green-50 border border-green-100 rounded-xl p-6">
           <div className="flex items-center gap-2 text-green-700 mb-2">
               <CheckCircle className="w-5 h-5" />
               <span className="font-medium">Verified</span>
           </div>
           <span className="text-3xl font-bold text-green-800">{stats.verified}</span>
        </div>

        {/* Expires Soon */}
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-6">
           <div className="flex items-center gap-2 text-orange-700 mb-2">
               <AlertTriangle className="w-5 h-5" />
               <span className="font-medium">Expires Soon</span>
           </div>
           <span className="text-3xl font-bold text-orange-800">{stats.expiring}</span>
        </div>

        {/* Missing */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-6">
           <div className="flex items-center gap-2 text-red-700 mb-2">
               <FileText className="w-5 h-5" />
               <span className="font-medium">Missing</span>
           </div>
           <span className="text-3xl font-bold text-red-800">{stats.missing}</span>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
              <thead className="bg-[#F9FAFB] text-gray-500 text-xs uppercase font-semibold">
                  <tr>
                      <th className="px-6 py-4">Document</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Expiry Date</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                  {loading ? (
                      <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">Loading documents...</td></tr>
                  ) : documents.length > 0 ? (
                      documents.map((doc: any) => (
                          <tr key={doc.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 font-medium text-gray-900">{doc.name}</td>
                              <td className="px-6 py-4">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                      ${doc.status?.toLowerCase() === 'verified' ? 'bg-green-100 text-green-800' : 
                                        doc.status?.toLowerCase() === 'missing' ? 'bg-red-100 text-red-800' :
                                        doc.status?.toLowerCase() === 'expiring' ? 'bg-orange-100 text-orange-800' :
                                        'bg-gray-100 text-gray-800'}`}>
                                      {doc.status || 'Pending'}
                                  </span>
                              </td>
                              <td className="px-6 py-4 text-gray-500">
                                  {doc.expiryDate ? new Date(doc.expiryDate).toLocaleDateString() : '-'}
                              </td>
                              <td className="px-6 py-4 text-right">
                                  <div className="flex items-center justify-end gap-3 text-gray-400">
                                      {/* Eye - View */}
                                      <button className="hover:text-blue-600 transition-colors" title="View">
                                          <Eye className="w-4 h-4" />
                                      </button>
                                      {/* Download */}
                                      {doc.url && (
                                          <a href={doc.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors" title="Download">
                                              <Download className="w-4 h-4" />
                                          </a>
                                      )}
                                      {/* Bell - Notify (if expiring) */}
                                      {doc.expiryDate && (
                                          <button className="hover:text-orange-500 transition-colors" title="Set Reminder">
                                              <Bell className="w-4 h-4" />
                                          </button>
                                      )}
                                  </div>
                              </td>
                          </tr>
                      ))
                  ) : (
                      <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No documents found. Upload one to get started.</td></tr>
                  )}
              </tbody>
          </table>
      </div>
    </div>
  );
}
