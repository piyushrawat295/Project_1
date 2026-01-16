"use client";

import { useState } from "react";
import { 
  Plus,
  Calendar,
  MapPin,
  Users
} from "lucide-react";

export default function EventsClient({ initialData, initialStats }: { initialData: any[], initialStats: any }) {
  const [data, setData] = useState(initialData);

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
         <div>
          <h1 className="text-2xl font-bold text-gray-900">Events & Activities</h1>
          <p className="text-gray-500">Manage your upcoming and past events</p>
        </div>
         <button className="flex items-center gap-2 px-4 py-2 text-white bg-[#0EA5E9] rounded-lg hover:bg-[#0284c7]">
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
                 <div className={`px-3 py-1 rounded-full text-xs font-medium ${event.status === 'upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                     {event.status}
                 </div>
             </div>
          ))}
          {data.length === 0 && <p className="text-gray-500 text-center py-8">No events found.</p>}
       </div>
    </div>
  );
}
