"use client";

import { useState } from "react";
import { 
  Plus,
  DollarSign,
  TrendingUp,
  Target
} from "lucide-react";


import { createDonation } from "@/actions/ngo-features";
import { useRouter } from "next/navigation";

export default function FundingClient({ initialData, initialStats, projects }: { initialData: any[], initialStats: any, projects: any[] }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
      donorName: "",
      amount: "",
      date: "",
      projectId: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
          const result = await createDonation(formData);
          if (result.success) {
              setIsModalOpen(false);
              setFormData({ 
                  donorName: "",
                  amount: "",
                  date: "",
                  projectId: ""
              });
              router.refresh();
              alert("Donation added successfully!");
          } else {
              alert("Failed: " + result.error);
          }
      } catch (err) {
          console.error(err);
      } finally {
          setIsSubmitting(false);
      }
  };

  return (
    <div className="p-8 space-y-8 relative">
      <div className="flex justify-between items-start">
         <div>
          <h1 className="text-2xl font-bold text-gray-900">Funding & Donations</h1>
          <p className="text-gray-500">Manage your fundraising campaigns</p>
        </div>
         <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <Plus className="w-4 h-4" />
              Create Campaign
            </button>
            <button 
               onClick={() => setIsModalOpen(true)}
               className="flex items-center gap-2 px-4 py-2 text-white bg-[#0EA5E9] rounded-lg hover:bg-[#0284c7]"
            >
              <Plus className="w-4 h-4" />
              Add Donation
            </button>
         </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FundingStatCard title="Total Campaigns" value={initialStats.total} icon={Target} color="bg-blue-500" />
          <FundingStatCard title="Active Campaigns" value={initialStats.active} icon={TrendingUp} color="bg-green-500" />
           <FundingStatCard title="Total Raised" value={`₹${initialStats.raised}`} icon={DollarSign} color="bg-purple-500" />
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((campaign) => (
             <div key={campaign.id} className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                 <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{campaign.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${campaign.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {campaign.status}
                    </span>
                 </div>
                 
                 <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Raised: ₹{campaign.raisedAmount}</span>
                        <span className="text-gray-900 font-medium">Goal: ₹{campaign.goalAmount}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                           className="h-full bg-blue-600 rounded-full" 
                           style={{ width: `${Math.min(((campaign.raisedAmount || 0) / campaign.goalAmount) * 100, 100)}%` }}
                        />
                    </div>
                 </div>
             </div>
          ))}
          {data.length === 0 && <p className="col-span-2 text-gray-500 text-center py-8">No campaigns found.</p>}
       </div>

       {/* Add Donation Modal */}
       {isModalOpen && (
           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
               <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                   <div className="flex justify-between items-center mb-6">
                       <h2 className="text-xl font-bold text-gray-900">Add Donation</h2>
                       <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                           <Plus className="w-6 h-6 rotate-45" />
                       </button>
                   </div>
                   <form onSubmit={handleSubmit} className="space-y-4">
                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Donor Name</label>
                           <input required name="donorName" value={formData.donorName} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" placeholder="Enter donor name" />
                       </div>
                       
                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                           <input required type="number" name="amount" value={formData.amount} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" placeholder="Enter amount" />
                       </div>

                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                           <input required type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" />
                       </div>

                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Select Project</label>
                           <select name="projectId" value={formData.projectId} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none">
                               <option value="">Select a Project</option>
                               {projects.map(project => (
                                   <option key={project.id} value={project.id}>{project.title}</option>
                               ))}
                           </select>
                       </div>

                       <div className="flex gap-3 pt-4 border-t">
                           <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                           <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-[#0EA5E9] text-white rounded-lg hover:bg-[#0284c7] disabled:opacity-50">
                               {isSubmitting ? "Adding..." : "Add"}
                           </button>
                       </div>
                   </form>
               </div>
           </div>
       )}
    </div>
  );
}

function FundingStatCard({ title, value, icon: Icon, color }: any) {
    return (
        <div className={`${color} text-white p-6 rounded-xl flex items-center justify-between`}>
            <div>
                <p className="text-white/80 text-sm font-medium">{title}</p>
                <h3 className="text-2xl font-bold mt-1">{value}</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
                <Icon className="w-6 h-6 text-white" />
            </div>
        </div>
    )
}
