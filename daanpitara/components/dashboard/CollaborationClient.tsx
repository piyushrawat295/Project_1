"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  Handshake, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  Building2,
  Mail, 
  User, 
  MapPin, 
  Star,
  Eye,
  MessageSquare,
  Trash2
} from "lucide-react";

export default function CollaborationClient({ initialData, initialStats }: { initialData: any[], initialStats: any }) {
  const [data, setData] = useState(initialData);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
         <div>
          <h1 className="text-2xl font-bold text-gray-900">Collaboration & Partnerships</h1>
          <p className="text-gray-500">Build strategic alliances for greater impact</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-white bg-[#0EA5E9] rounded-lg hover:bg-[#0284c7]">
          <Plus className="w-4 h-4" />
          Add Partner
        </button>
      </div>

       {/* Stats Cards */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Partners" 
          value={initialStats.total} 
          icon={Handshake}
          color="bg-[#0EA5E9]" 
        />
        <StatsCard 
          title="Active Partnerships" 
          value={initialStats.active} 
          icon={CheckCircle2}
          color="bg-[#0284c7]"
        />
        <StatsCard 
          title="Pending Approval" 
          value={initialStats.pending} 
          icon={Clock}
          color="bg-[#0369a1]"
        />
        <StatsCard 
          title="Joint Projects" 
          value={initialStats.jointProjs} 
          icon={TrendingUp}
          color="bg-[#075985]"
        />
      </div>

       {/* Filters */}
       <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search partners..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
          />
        </div>
        <select 
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-white text-gray-600 min-w-[150px]"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

       {/* Collaborative Partners Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {data.map((partner, index) => (
               <PartnerCard key={partner.id} partner={partner} index={index} />
           ))}
           {data.length === 0 && (
               <div className="col-span-full py-12 text-center text-gray-500">
                   No partners found.
               </div>
           )}
       </div>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon, color }: any) {
  return (
    <div className={`${color} text-white rounded-xl p-6 relative overflow-hidden flex items-center justify-between`}>
      <div className="relative z-10">
         <Icon className="w-8 h-8 mb-3 opacity-80" />
         <p className="text-blue-100 text-sm font-medium mb-1">{title}</p>
      </div>
       <div className="bg-white/20 w-12 h-12 rounded-lg backdrop-blur-sm flex items-center justify-center">
         <span className="text-2xl font-bold">{value}</span>
      </div>
    </div>
  );
}

function PartnerCard({ partner, index }: { partner: any, index: number }) {
    // Determine status style
    const isPending = partner.status === 'submitted' || partner.status === 'pending';
    const statusBg = isPending ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700';
    const statusText = isPending ? 'Pending' : 'Active';
    
    // Mock data based on provided fields or defaults
    const rating = (4.5 + (index % 5) * 0.1).toFixed(1);
    const projectsCount = 2 + (index % 3);
    const sinceDate = new Date(partner.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
    const contactName = "Contact Person"; // Mock
    const contactEmail = "contact@partner.org"; // Mock
    
    return (
        <div className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
             <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-[#0f4c81] rounded-lg flex items-center justify-center text-white font-bold">
                         <Building2 className="w-6 h-6" />
                     </div>
                     <div>
                         <h3 className="font-bold text-gray-900">{partner.companyName}</h3>
                         <p className="text-xs text-gray-500">{partner.sector || "Partner"}</p>
                     </div>
                 </div>
                 <div className="text-right">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${statusBg} block mb-1`}>
                          {statusText}
                      </span>
                      <div className="flex items-center justify-end gap-1 text-xs text-yellow-500">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{rating}</span>
                      </div>
                 </div>
             </div>

             <p className="text-sm text-gray-600 mb-4 h-10 overflow-hidden">{partner.description || partner.opportunityTitle || "Strategic partnership for social impact."}</p>

             <div className="space-y-2 mb-6">
                 <div className="flex items-center gap-2 text-sm text-gray-500">
                     <User className="w-4 h-4" />
                     <span>{contactName}</span>
                 </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                     <Mail className="w-4 h-4" />
                     <span>{contactEmail}</span>
                 </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                     <MapPin className="w-4 h-4" />
                     <span>{partner.location || "Location"}</span>
                 </div>
             </div>

             <div className="flex justify-between items-center py-4 border-t border-gray-50 mb-4 px-4 bg-gray-50 rounded-lg">
                 <div className="text-center">
                     <p className="font-bold text-gray-900">{projectsCount}</p>
                     <p className="text-xs text-gray-500">Projects</p>
                 </div>
                 <div className="w-px h-8 bg-gray-200"></div>
                 <div className="text-center">
                     <p className="font-bold text-gray-900">{sinceDate}</p>
                     <p className="text-xs text-gray-500">Since</p>
                 </div>
             </div>

             <div className="flex gap-2">
                 <button className="flex-1 py-2 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-blue-100">
                     <Eye className="w-3.5 h-3.5" /> View
                 </button>
                  <button className="flex-1 py-2 bg-gray-50 text-gray-900 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100">
                     <MessageSquare className="w-3.5 h-3.5" /> Contact
                 </button>
                 <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                     <Trash2 className="w-3.5 h-3.5" />
                 </button>
             </div>
        </div>
    );
}
