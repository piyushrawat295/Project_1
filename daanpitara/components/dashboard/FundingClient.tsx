"use client";

import { useState } from "react";
import { 
  Plus,
  DollarSign,
  TrendingUp,
  Target
} from "lucide-react";

export default function FundingClient({ initialData, initialStats }: { initialData: any[], initialStats: any }) {
  const [data, setData] = useState(initialData);

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
         <div>
          <h1 className="text-2xl font-bold text-gray-900">Funding & Donations</h1>
          <p className="text-gray-500">Manage your fundraising campaigns</p>
        </div>
         <button className="flex items-center gap-2 px-4 py-2 text-white bg-[#0EA5E9] rounded-lg hover:bg-[#0284c7]">
            <Plus className="w-4 h-4" />
            Create Campaign
          </button>
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
