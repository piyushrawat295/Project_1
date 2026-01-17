"use client";

import { useState } from "react";
import { 
  Plus,
  Calendar,
  MapPin,
  Users,
  Eye,
  Trash2,
  X
} from "lucide-react";

import { createEvent, deleteEvent } from "@/actions/ngo-features";
import { useRouter } from "next/navigation";

export default function EventsClient({ initialData, initialStats }: { initialData: any[], initialStats: any }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
      name: "",
      date: "",
      location: "",
      expectedBeneficiaries: "",
      description: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
          const result = await createEvent(formData);
          if (result.success) {
              setIsModalOpen(false);
              setFormData({ name: "", date: "", location: "", expectedBeneficiaries: "", description: "" });
              router.refresh();
              alert("Event added successfully!");
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
      if(!confirm("Are you sure you want to delete this event?")) return;
      try {
          const result = await deleteEvent(id);
          if (result.success) {
              router.refresh();
              alert("Event deleted successfully");
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
      <div className="flex justify-between items-start">
         <div>
          <h1 className="text-2xl font-bold text-gray-900">Events & Activities</h1>
          <p className="text-gray-500">Manage your upcoming and past events</p>
        </div>
         <button 
           onClick={() => setIsModalOpen(true)}
           className="flex items-center gap-2 px-4 py-2 text-white bg-[#0EA5E9] rounded-lg hover:bg-[#0284c7]"
         >
            <Plus className="w-4 h-4" />
            Create Event
          </button>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
             <h3 className="text-lg font-bold text-gray-900">{initialStats.total}</h3>
             <p className="text-gray-500 text-sm">Total Events</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
             <h3 className="text-lg font-bold text-blue-600">{initialStats.upcoming}</h3>
             <p className="text-gray-500 text-sm">Upcoming</p>
          </div>
           <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
             <h3 className="text-lg font-bold text-green-600">{initialStats.completed}</h3>
             <p className="text-gray-500 text-sm">Completed</p>
          </div>
       </div>

       <div className="grid grid-cols-1 gap-4">
          {data.map((event) => (
             <div key={event.id} className="bg-white p-6 rounded-xl border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow">
                 <div>
                    <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                    <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(event.date).toLocaleDateString()}
                        </div>
                         <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.location || "Online"}
                        </div>
                         <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {event.beneficiariesCount} Attendees
                        </div>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                     <div className={`px-3 py-1 rounded-full text-xs font-medium ${event.status === 'upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                         {event.status}
                     </div>
                     <div className="flex gap-2">
                        <button 
                            onClick={() => setSelectedEvent(event)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => handleDelete(event.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                     </div>
                 </div>
             </div>
          ))}
          {data.length === 0 && <p className="text-gray-500 text-center py-8">No events found.</p>}
       </div>

       {/* Add Event Modal */}
       {isModalOpen && (
           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
               <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
                   <div className="flex justify-between items-center mb-6">
                       <h2 className="text-xl font-bold text-gray-900">Add New Event</h2>
                       <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                           <Plus className="w-6 h-6 rotate-45" />
                       </button>
                   </div>
                   <form onSubmit={handleSubmit} className="space-y-4">
                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                           <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" />
                       </div>
                       
                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                           <input required type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" />
                       </div>

                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                           <input name="location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" />
                       </div>

                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Expected Beneficiaries</label>
                           <input type="number" name="expectedBeneficiaries" value={formData.expectedBeneficiaries} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" />
                       </div>

                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                           <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none"></textarea>
                       </div>

                       <div className="flex gap-3 pt-4 border-t">
                           <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                           <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-[#0EA5E9] text-white rounded-lg hover:bg-[#0284c7] disabled:opacity-50">
                               {isSubmitting ? "Adding..." : "Add Event"}
                           </button>
                       </div>
                   </form>
               </div>
           </div>
       )}

       {/* View Event Modal */}
       {selectedEvent && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
               <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative">
                   <button 
                       onClick={() => setSelectedEvent(null)} 
                       className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                   >
                       <X className="w-5 h-5 text-gray-500" />
                   </button>
                   
                   <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h2>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${selectedEvent.status === 'upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                            {selectedEvent.status}
                        </span>
                   </div>

                   <p className="text-gray-600 mb-6">{selectedEvent.description || "No description provided."}</p>

                   <div className="space-y-4">
                       <div className="flex items-center gap-3">
                           <Calendar className="w-5 h-5 text-gray-400" />
                           <div>
                               <p className="text-xs text-gray-500">Date</p>
                               <p className="font-medium text-gray-900">{new Date(selectedEvent.date).toLocaleDateString()}</p>
                           </div>
                       </div>
                       <div className="flex items-center gap-3">
                           <MapPin className="w-5 h-5 text-gray-400" />
                           <div>
                               <p className="text-xs text-gray-500">Location</p>
                               <p className="font-medium text-gray-900">{selectedEvent.location || "Online"}</p>
                           </div>
                       </div>
                       <div className="flex items-center gap-3">
                           <Users className="w-5 h-5 text-gray-400" />
                           <div>
                               <p className="text-xs text-gray-500">Expected Attendees</p>
                               <p className="font-medium text-gray-900">{selectedEvent.beneficiariesCount}</p>
                           </div>
                       </div>
                   </div>

                   <div className="flex justify-end pt-6 mt-6 border-t border-gray-100">
                       <button onClick={() => setSelectedEvent(null)} className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                           Close
                       </button>
                   </div>
               </div>
           </div>
       )}
    </div>
  );
}
