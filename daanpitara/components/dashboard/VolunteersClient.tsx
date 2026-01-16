"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  Download, 
  Users, 
  Clock, 
  CheckCircle2, 
  Star,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Eye,
  Trash2,
  Check
} from "lucide-react";

export default function VolunteersClient({ initialData, initialStats }: { initialData: any[], initialStats: any }) {
  const [data, setData] = useState(initialData);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Volunteer Registration</h1>
          <p className="text-gray-500">Manage your volunteer community</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export Data
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-[#0EA5E9] rounded-lg hover:bg-[#0284c7]">
            <Plus className="w-4 h-4" />
            Register Volunteer
          </button>
        </div>
      </div>

       {/* Stats Cards */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Volunteers" 
          value={initialStats.total} 
          icon={Users}
          color="bg-[#0EA5E9]" 
        />
        <StatsCard 
          title="Active Volunteers" 
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
          title="Total Hours" 
          value={initialStats.totalHours} 
          icon={Star}
          color="bg-[#075985]" // Darkest blue/slate
        />
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search volunteers by name..."
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

      {/* Volunteer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {data.map((volunteer, index) => (
             <VolunteerCard key={volunteer.id || index} volunteer={volunteer} index={index} />
         ))}
         {data.length === 0 && (
            <div className="col-span-3 text-center py-12 text-gray-500">
               No volunteers found.
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
      <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
         <span className="text-2xl font-bold">{value}</span>
      </div>
    </div>
  );
}

function VolunteerCard({ volunteer, index }: { volunteer: any, index: number }) {
    // Mocking missing data for UI correctness as per user request
    const status = index % 3 === 0 ? "Active" : index % 3 === 1 ? "Pending" : "Active"; 
    const isPending = status === "Pending";
    const rating = (4 + (index % 10) / 10).toFixed(1);
    const location = "Mumbai"; // Mock
    const joined = new Date(volunteer.createdAt).toLocaleDateString("en-US", { month: 'short', year: 'numeric' });
    const hours = 10 + (index * 5);
    
    // Fallbacks
    const name = volunteer.name || "Unknown Volunteer";
    const email = volunteer.email || "no-email@example.com";
    const phone = volunteer.phone || "+91 98765 43210";
    
    return (
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
               <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg ${index % 2 === 0 ? 'bg-[#0f4c81]' : 'bg-[#0EA5E9]'}`}>
                      {name.charAt(0)}
                  </div>
                  <div>
                      <h3 className="font-bold text-gray-900">{name}</h3>
                      <div className="flex items-center gap-1 text-yellow-500 text-xs">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{rating}</span>
                      </div>
                  </div>
               </div>
               <span className={`px-3 py-1 rounded-full text-xs font-medium ${isPending ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                   {status}
               </span>
            </div>

            <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{email}</span>
                </div>
                 <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Phone className="w-4 h-4" />
                    <span>{phone}</span>
                </div>
                 <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{location}</span>
                </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>Weekends</span> {/* Availability Mock */}
                </div>
            </div>

            <div className="flex gap-2 flex-wrap mb-6">
                {["Teaching", "Event Management", "IT Support"].slice(0, 2 + (index % 2)).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-50 mb-4">
                 <div className="text-center">
                     <p className="text-xl font-bold text-gray-900">{hours}</p>
                     <p className="text-xs text-gray-400">Hours</p>
                 </div>
                 <div className="bg-gray-100 w-px h-8"></div>
                  <div className="text-center">
                     <p className="text-sm font-bold text-gray-900">{joined}</p>
                     <p className="text-xs text-gray-400">Joined</p>
                 </div>
            </div>

            <div className="flex gap-2">
                <button className="flex-1 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    View
                </button>
                 {isPending ? (
                      <button className="flex-1 py-2 text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-lg flex items-center justify-center gap-2">
                        <Check className="w-4 h-4" />
                        Approve
                    </button>
                 ) : (
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                    </button>
                 )}
            </div>
        </div>
    )
}
