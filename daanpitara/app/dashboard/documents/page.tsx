"use client";

import { useEffect, useState } from "react";
import { getRecords } from "@/actions/ngo-features";
import { 
  Eye, 
  Download, 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  ArrowRight,
  ShieldCheck,
  Search
} from "lucide-react";
import Link from "next/link";

export default function DocumentsPage() {
  const [stats, setStats] = useState({
    verified: 0,
    expiring: 0,
    missing: 0,
    total: 0
  });
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const loadData = async () => {
      setLoading(true);
      const { data, stats: dbStats } = await getRecords();
      if (data) {
        setDocuments(data);
        if (dbStats) setStats(dbStats as any);
      }
      setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredDocs = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-8 max-w-[1600px] mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Documents & Compliance</h1>
          <p className="text-gray-500 font-medium tracking-wide">Securely manage your organization&apos;s legal documents</p>
        </div>
        
        <Link href="/onboarding">
          <button className="flex items-center gap-2 bg-gradient-to-r from-[#0F71A8] to-[#26A9E0] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-200 transition-all group">
            <ShieldCheck className="w-5 h-5" />
            Verify New Documents
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#0F5A80] rounded-2xl p-6 text-white md:col-span-1 shadow-lg shadow-blue-50 relative overflow-hidden group">
          <div className="relative z-10 space-y-4">
             <h2 className="text-sm font-bold uppercase tracking-widest opacity-80">Compliance Status</h2>
             <div className="flex items-baseline gap-2">
                 <span className="text-5xl font-black">75%</span>
                 <span className="text-sm font-bold bg-white/20 px-2 py-0.5 rounded-md">VERY GOOD</span>
             </div>
             <p className="text-xs opacity-70 font-medium">Your profile is highly trusted by donors.</p>
          </div>
          <CheckCircle className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:col-span-3">
          <StatCard 
            label="Verified" 
            value={stats.verified} 
            icon={CheckCircle} 
            color="green" 
          />
          <StatCard 
            label="Expiring Soon" 
            value={stats.expiring} 
            icon={AlertTriangle} 
            color="orange" 
          />
          <StatCard 
            label="Missing" 
            value={stats.missing} 
            icon={FileText} 
            color="red" 
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
          {/* Table Toolbar */}
          <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/30">
             <div className="relative w-full sm:w-96 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search documents by name..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none transition-all placeholder:text-gray-400 text-sm font-medium"
                />
             </div>
             
             <div className="flex items-center gap-4 text-sm font-bold text-gray-500">
                <span>Total: {documents.length}</span>
                <span className="w-px h-4 bg-gray-200"></span>
                <span className="text-blue-600">Active Filters: None</span>
             </div>
          </div>

          <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                  <thead>
                      <tr className="border-b border-gray-50">
                          <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest">Document Details</th>
                          <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest">Status/Trust</th>
                          <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest">Validity</th>
                          <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                      {loading ? (
                          <tr><td colSpan={4} className="px-8 py-20 text-center text-gray-500 font-medium">Loading compliance records...</td></tr>
                      ) : filteredDocs.length > 0 ? (
                        filteredDocs.map((doc: any) => (
                              <tr key={doc.id} className="hover:bg-[#F8FAFC]/80 transition-all group border-b border-gray-50/50">
                                  <td className="px-8 py-7">
                                      <div className="flex items-center gap-5">
                                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border transition-transform group-hover:scale-105
                                            ${doc.status?.toLowerCase() === 'verified' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-blue-50 text-blue-500 border-blue-100'}`}>
                                              {doc.name.toLowerCase().includes('certificate') ? <ShieldCheck className="w-7 h-7" /> : <FileText className="w-7 h-7" />}
                                          </div>
                                          <div className="space-y-1">
                                              <div className="font-extrabold text-[#1A1A1A] text-[16px] tracking-tight">{doc.name}</div>
                                              <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-100 px-2 py-0.5 rounded">ID: {doc.id.toString().padStart(4, '0')}</span>
                                                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter">Official Copy</span>
                                              </div>
                                          </div>
                                      </div>
                                  </td>
                                  <td className="px-8 py-7">
                                      <StatusBadge status={doc.status} />
                                  </td>
                                  <td className="px-8 py-7">
                                      <div className="flex flex-col gap-1.5">
                                          <div className="text-[15px] font-bold text-gray-800">
                                              {doc.expiryDate ? new Date(doc.expiryDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Lifetime Validity'}
                                          </div>
                                          <div className="flex items-center gap-1.5">
                                            <div className={`w-2 h-2 rounded-full ${doc.expiryDate ? 'bg-orange-400' : 'bg-green-400'}`}></div>
                                            <div className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                                                {doc.expiryDate ? 'Action Required Soon' : 'Permanent Record'}
                                            </div>
                                          </div>
                                      </div>
                                  </td>
                                  <td className="px-8 py-6 text-right">
                                      <div className="flex items-center justify-end gap-2">
                                          <ActionButton 
                                            icon={Eye} 
                                            label="View" 
                                            onClick={() => doc.url && window.open(doc.url, '_blank')}
                                          />
                                          <ActionButton 
                                            icon={Download} 
                                            label="Download" 
                                            secondary 
                                            onClick={() => {
                                              if (!doc.url) return;
                                              const link = document.createElement('a');
                                              link.href = doc.url;
                                              link.download = doc.name;
                                              document.body.appendChild(link);
                                              link.click();
                                              document.body.removeChild(link);
                                            }}
                                          />
                                          <ActionButton icon={Bell} label="Remind" variant="orange" />
                                      </div>
                                  </td>
                              </tr>
                          ))
                      ) : (
                          <tr>
                            <td colSpan={4} className="px-8 py-24 text-center">
                                <FileText className="w-16 h-16 text-gray-100 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 mb-1">No documents found</h3>
                                <p className="text-gray-400 max-w-xs mx-auto text-sm">You haven&apos;t uploaded any documents matching your search criteria.</p>
                            </td>
                          </tr>
                      )}
                  </tbody>
              </table>
          </div>
          
          {/* Footer Info */}
          <div className="p-6 bg-gray-50/50 border-t border-gray-50 flex items-center gap-4">
             <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <ShieldCheck size={16} />
             </div>
             <p className="text-xs text-gray-500 font-medium">
                DaanPitara uses bank-grade encryption to protect your data. All uploaded documents are strictly used for verification purposes only.
             </p>
          </div>
      </div>
    </div>
  );
}

// --- Sub-components ---

function StatCard({ label, value, icon: Icon, color }: any) {
    const colors: any = {
        green: "bg-green-50 text-green-700 border-green-100 icon-bg-green-100",
        orange: "bg-orange-50 text-orange-700 border-orange-100 icon-bg-orange-100",
        red: "bg-red-50 text-red-700 border-red-100 icon-bg-red-100"
    };

    return (
        <div className={`p-6 rounded-2xl border ${colors[color]} flex flex-col justify-between hover:shadow-md transition-shadow`}>
            <div className="flex justify-between items-start">
               <div className={`p-2.5 rounded-xl bg-white shadow-sm`}>
                  <Icon className="w-5 h-5" />
               </div>
               <span className="text-4xl font-black">{value}</span>
            </div>
            <div className="mt-4 text-xs font-black uppercase tracking-widest opacity-70">{label}</div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const s = status?.toLowerCase() || 'pending';
    const configs: any = {
        verified: "bg-green-100 text-green-700 border-green-200",
        missing: "bg-red-100 text-red-700 border-red-200",
        expiring: "bg-orange-100 text-orange-700 border-orange-200",
        pending: "bg-blue-100 text-blue-700 border-blue-200"
    };

    return (
        <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${configs[s] || configs.pending}`}>
            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${s === 'verified' ? 'bg-green-500' : s === 'missing' ? 'bg-red-500' : 'bg-current animate-pulse'}`}></span>
            {s}
        </div>
    );
}

function ActionButton({ icon: Icon, label, secondary, variant, onClick }: any) {
    const getVariant = () => {
        if (variant === 'orange') return "text-orange-400 hover:text-orange-600 hover:bg-orange-50";
        if (secondary) return "text-gray-400 hover:text-blue-600 hover:bg-blue-50";
        return "text-gray-400 hover:text-blue-600 hover:bg-blue-50";
    };

    return (
        <button 
            onClick={onClick}
            className={`p-2.5 rounded-xl transition-all ${getVariant()} group/btn relative active:scale-95 shadow-sm hover:shadow-md bg-white border border-gray-50`} 
            title={label}
        >
            <Icon className="w-5 h-5" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-bold z-20">
                {label}
            </span>
        </button>
    );
}
