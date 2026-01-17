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
  Trash2,
  X
} from "lucide-react";


import { createPartner, deletePartner } from "@/actions/ngo-features";
import { useRouter } from "next/navigation";

export default function CollaborationClient({ initialData, initialStats }: { initialData: any[], initialStats: any }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
      organizationName: "",
      type: "NGO",
      contactPerson: "",
      email: "",
      phone: "",
      location: "",
      description: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
          const result = await createPartner(formData);
          if (result.success) {
              setIsModalOpen(false);
              setFormData({ 
                  organizationName: "",
                  type: "NGO",
                  contactPerson: "",
                  email: "",
                  phone: "",
                  location: "",
                  description: ""
              });
              router.refresh();
              alert("Partner added successfully!");
          } else {
              alert("Failed: " + result.error);
          }
      } catch (err) {
          console.error(err);
      } finally {
          setIsSubmitting(false);
      }
  };

  const handleDelete = async (id: number) => {
      if(!confirm("Are you sure you want to delete this partner?")) return;
      try {
          const result = await deletePartner(id);
          if (result.success) {
              router.refresh();
              alert("Partner deleted successfully");
          } else {
              alert("Failed to delete: " + result.error);
          }
      } catch (err) {
          console.error(err);
          alert("An error occurred");
      }
  };


  return (
    <div className="p-8 space-y-8 relative">
      {/* Header */}
      <div className="flex justify-between items-start">
         <div>
          <h1 className="text-2xl font-bold text-gray-900">Collaboration & Partnerships</h1>
          <p className="text-gray-500">Build strategic alliances for greater impact</p>
        </div>
        <button 
           onClick={() => setIsModalOpen(true)}
           className="flex items-center gap-2 px-4 py-2 text-white bg-[#0EA5E9] rounded-lg hover:bg-[#0284c7]"
        >
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
               <PartnerCard 
                  key={partner.id} 
                  partner={partner} 
                  index={index} 
                  onDelete={() => handleDelete(partner.id)}
                  onView={() => setSelectedPartner(partner)}
               />
           ))}
           {data.length === 0 && (
               <div className="col-span-full py-12 text-center text-gray-500">
                   No partners found.
               </div>
           )}
       </div>

       {/* Add Partner Modal */}
       {isModalOpen && (
           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
               <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                   <div className="flex justify-between items-center mb-6">
                       <h2 className="text-xl font-bold text-gray-900">Add New Partner</h2>
                       <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                           <Plus className="w-6 h-6 rotate-45" />
                       </button>
                   </div>
                   <form onSubmit={handleSubmit} className="space-y-4">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name *</label>
                               <input required name="organizationName" value={formData.organizationName} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" placeholder="Enter organization name" />
                           </div>
                           <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                               <select name="type" value={formData.type} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none">
                                   <option value="NGO">NGO</option>
                                   <option value="Corporate">Corporate</option>
                                   <option value="Government">Government</option>
                                   <option value="Educational">Educational</option>
                               </select>
                           </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                               <input name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" placeholder="Contact person name" />
                           </div>
                           <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                               <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" placeholder="email@example.com" />
                           </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                               <input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" placeholder="+91 XXXXX XXXXX" />
                           </div>
                           <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                               <input name="location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" placeholder="City" />
                           </div>
                       </div>

                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                           <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" placeholder="Brief description of the partnership"></textarea>
                       </div>

                       <div className="flex gap-3 pt-4 border-t">
                           <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                           <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-[#0EA5E9] text-white rounded-lg hover:bg-[#0284c7] disabled:opacity-50">
                               {isSubmitting ? "Adding..." : "Add Partner"}
                           </button>
                       </div>
                   </form>
               </div>
           </div>
       )}

       {/* View Partner Modal */}
       {selectedPartner && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
               <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative">
                   <button 
                       onClick={() => setSelectedPartner(null)} 
                       className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                   >
                       <X className="w-5 h-5 text-gray-500" />
                   </button>
                   
                   <div className="mb-6 flex items-center gap-4">
                        <div className="w-16 h-16 bg-[#0f4c81] rounded-xl flex items-center justify-center text-white font-bold">
                             <Building2 className="w-8 h-8" />
                        </div>
                        <div>
                             <h2 className="text-xl font-bold text-gray-900">{selectedPartner.organizationName}</h2>
                             <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-semibold">{selectedPartner.type} Partner</span>
                        </div>
                   </div>

                   <p className="text-gray-600 mb-6">{selectedPartner.description || "No description provided."}</p>

                   <div className="space-y-4">
                       <div className="flex items-center gap-3">
                           <User className="w-5 h-5 text-gray-400" />
                           <div>
                               <p className="text-xs text-gray-500">Contact Person</p>
                               <p className="font-medium text-gray-900">{selectedPartner.contactPerson}</p>
                           </div>
                       </div>
                       <div className="flex items-center gap-3">
                           <Mail className="w-5 h-5 text-gray-400" />
                           <div>
                               <p className="text-xs text-gray-500">Email</p>
                               <p className="font-medium text-gray-900">{selectedPartner.email}</p>
                           </div>
                       </div>
                       <div className="flex items-center gap-3">
                           <MapPin className="w-5 h-5 text-gray-400" />
                           <div>
                               <p className="text-xs text-gray-500">Location</p>
                               <p className="font-medium text-gray-900">{selectedPartner.location}</p>
                           </div>
                       </div>
                   </div>

                   <div className="flex justify-end pt-6 mt-6 border-t border-gray-100">
                       <button onClick={() => setSelectedPartner(null)} className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                           Close
                       </button>
                   </div>
               </div>
           </div>
       )}
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

function PartnerCard({ partner, index, onDelete, onView }: { partner: any, index: number, onDelete: () => void, onView: () => void }) {
    // Determine status style
    const isPending = partner.status === 'submitted' || partner.status === 'pending';
    const statusBg = isPending ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700';
    const statusText = isPending ? 'Pending' : 'Active';
    
    const sinceDate = new Date(partner.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
    const contactName = partner.contactPerson || "N/A"; 
    const contactEmail = partner.email || "N/A"; 
    
    return (
        <div className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
             <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-[#0f4c81] rounded-lg flex items-center justify-center text-white font-bold">
                         <Building2 className="w-6 h-6" />
                     </div>
                     <div>
                         <h3 className="font-bold text-gray-900">{partner.organizationName}</h3>
                         <p className="text-xs text-gray-500">{partner.type || "Partner"}</p>
                     </div>
                 </div>
                 <div className="text-right">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${statusBg} block mb-1`}>
                          {statusText}
                      </span>
                 </div>
             </div>

             <p className="text-sm text-gray-600 mb-4 h-10 overflow-hidden">{partner.description || "Strategic partnership for social impact."}</p>

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
                     <span>{partner.location || "Location not specified"}</span>
                 </div>
             </div>

             <div className="flex justify-between items-center py-4 border-t border-gray-50 mb-4 px-4 bg-gray-50 rounded-lg">
                 <div className="text-center w-full">
                     <p className="font-bold text-gray-900">{sinceDate}</p>
                     <p className="text-xs text-gray-500">Partner Since</p>
                 </div>
             </div>

             <div className="flex gap-2">
                 <button 
                    onClick={onView}
                    className="flex-1 py-2 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-blue-100"
                 >
                     <Eye className="w-3.5 h-3.5" /> View
                 </button>
                  <button className="flex-1 py-2 bg-gray-50 text-gray-900 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100">
                     <MessageSquare className="w-3.5 h-3.5" /> Contact
                 </button>
                 <button 
                    onClick={onDelete}
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                 >
                     <Trash2 className="w-3.5 h-3.5" />
                 </button>
             </div>
        </div>
    );
}

