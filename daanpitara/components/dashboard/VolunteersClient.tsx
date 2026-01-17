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

import { createVolunteer } from "@/actions/ngo-features";
import { useRouter } from "next/navigation";

export default function VolunteersClient({ initialData, initialStats }: { initialData: any[], initialStats: any }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<any>(null);
  const [formData, setFormData] = useState({
     name: "",
     email: "",
     phone: "",
     location: "",
     skills: "",
     availability: "Weekends"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
       const result = await createVolunteer(formData);
       if (result.success) {
           setIsModalOpen(false);
           setFormData({ name: "", email: "", phone: "", location: "", skills: "", availability: "Weekends" });
           router.refresh(); 
           alert("Volunteer registered successfully!");
       } else {
           alert("Failed: " + result.error);
       }
    } catch (err) {
        console.error(err);
        alert("An error occurred.");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 space-y-8 relative">
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
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-white bg-[#0EA5E9] rounded-lg hover:bg-[#0284c7]"
          >
            <Plus className="w-4 h-4" />
            Register Volunteer
          </button>
        </div>
      </div>

       {/* Stats Cards */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Volunteers" 
          value={initialStats?.total || 0} 
          icon={Users}
          color="bg-[#0EA5E9]" 
        />
        <StatsCard 
          title="Active Volunteers" 
          value={initialStats?.active || 0} 
          icon={CheckCircle2}
          color="bg-[#0284c7]"
        />
        <StatsCard 
          title="Pending Approval" 
          value={initialStats?.pending || 0} 
          icon={Clock}
          color="bg-[#0369a1]"
        />
        <StatsCard 
          title="Total Hours" 
          value={initialStats?.totalHours || 0} 
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
             <VolunteerCard 
                key={volunteer.id || index} 
                volunteer={volunteer} 
                index={index} 
                onView={() => setSelectedVolunteer(volunteer)} 
             />
         ))}
         {data.length === 0 && (
            <div className="col-span-3 text-center py-12 text-gray-500">
               No volunteers found.
            </div>
         )}
      </div>

      {/* Register Volunteer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
           <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold text-gray-900">Register New Volunteer</h2>
                 <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                    <Plus className="w-6 h-6 rotate-45" />
                 </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                       <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" placeholder="Enter full name" />
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                    <input name="skills" value={formData.skills} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" placeholder="Teaching, Event Management, IT Support" />
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                    <select name="availability" value={formData.availability} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none">
                       <option value="Weekends">Weekends</option>
                       <option value="Weekdays">Weekdays</option>
                       <option value="Anytime">Anytime</option>
                    </select>
                 </div>

                 <div className="flex gap-3 pt-4 border-t">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-[#0EA5E9] text-white rounded-lg hover:bg-[#0284c7] disabled:opacity-50">
                       {isSubmitting ? "Registering..." : "Register Volunteer"}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {/* Volunteer Details Modal */}
      {selectedVolunteer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
                  <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Volunteer Details</h2>
                      <button onClick={() => setSelectedVolunteer(null)} className="text-gray-500 hover:text-gray-700">
                          <Plus className="w-6 h-6 rotate-45" />
                      </button>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-[#075985] rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                          {selectedVolunteer.name?.charAt(0)}
                      </div>
                      <div>
                          <h3 className="text-xl font-bold text-gray-900">{selectedVolunteer.name}</h3>
                          <div className="flex items-center gap-3 mt-1">
                              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
                                  {selectedVolunteer.status || 'Active'}
                              </span>
                              <div className="flex items-center gap-1 text-yellow-500 text-sm">
                                  <Star className="w-4 h-4 fill-current" />
                                  <span>4.8</span>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                          <p className="text-sm text-gray-500 mb-1">Email</p>
                          <p className="font-medium text-gray-900 truncate">{selectedVolunteer.email}</p>
                      </div>
                       <div>
                          <p className="text-sm text-gray-500 mb-1">Phone</p>
                          <p className="font-medium text-gray-900">{selectedVolunteer.phone || 'N/A'}</p>
                      </div>
                       <div>
                          <p className="text-sm text-gray-500 mb-1">Location</p>
                          <p className="font-medium text-gray-900">{selectedVolunteer.location || 'N/A'}</p>
                      </div>
                       <div>
                          <p className="text-sm text-gray-500 mb-1">Availability</p>
                          <p className="font-medium text-gray-900">{selectedVolunteer.availability || 'Weekends'}</p>
                      </div>
                       <div>
                          <p className="text-sm text-gray-500 mb-1">Hours Contributed</p>
                          <p className="font-medium text-gray-900">120 hours</p>
                      </div>
                       <div>
                          <p className="text-sm text-gray-500 mb-1">Join Date</p>
                          <p className="font-medium text-gray-900">{new Date(selectedVolunteer.createdAt).toLocaleDateString()}</p>
                      </div>
                  </div>

                  <div className="mb-6">
                      <p className="text-sm text-gray-500 mb-2">Skills</p>
                      <div className="flex gap-2 flex-wrap">
                          {selectedVolunteer.skills?.split(',').map((skill: string) => (
                              <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                                  {skill.trim()}
                              </span>
                          ))}
                          {!selectedVolunteer.skills && <span className="text-gray-400 text-sm">No skills listed</span>}
                      </div>
                  </div>

                  <button 
                      onClick={() => setSelectedVolunteer(null)}
                      className="w-full py-3 bg-[#0EA5E9] text-white rounded-xl font-medium hover:bg-[#0284c7]"
                  >
                      Close
                  </button>
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
      <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
         <span className="text-2xl font-bold">{value}</span>
      </div>
    </div>
  );
}

function VolunteerCard({ volunteer, index, onView }: { volunteer: any, index: number, onView: () => void }) {
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
                <button 
                  onClick={onView}
                  className="flex-1 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center justify-center gap-2"
                >
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
