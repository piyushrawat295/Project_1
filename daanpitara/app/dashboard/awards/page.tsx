"use client";

import { useEffect, useState } from "react";
import { getAwards, createAward } from "@/actions/awards";
import { Plus, Award as AwardIcon, X } from "lucide-react";
import { Award } from "@/lib/schema";

export default function AwardsPage() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const { data } = await getAwards();
      if (data) setAwards(data);
      setLoading(false);
    }
    loadData();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const res = await createAward(formData);
      if (res.success) {
          setIsModalOpen(false);
          // Reload local state to reflect change - ideally we'd just push to state but re-fetch ensures consistency
          const { data } = await getAwards();
          if (data) setAwards(data);
      } else {
          alert('Failed to add award');
      }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Awards & Recognition</h1>
          <p className="text-gray-500">Trust accelerator - showcase your achievements</p>
        </div>
        <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#0F71A8] text-white px-4 py-2 rounded-lg hover:bg-[#0c5a86] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Award
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
            <p className="text-gray-500 col-span-3 text-center py-10">Loading awards...</p>
        ) : awards.length > 0 ? (
             awards.map((award) => (
                <div key={award.id} className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="w-10 h-10 mb-4 text-[#F5B301]">
                        <AwardIcon className="w-full h-full stroke-[1.5]" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{award.title}</h3>
                    <p className="text-gray-500 text-sm mb-2">{award.year}</p>
                    {award.description && (
                        <p className="text-gray-600 text-sm">{award.description}</p>
                    )}
                </div>
             ))
        ) : (
             <div className="col-span-3 text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                 <p className="text-gray-500">No awards added yet. Showcase your recognition!</p>
             </div>
        )}
      </div>

      {/* Add Award Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
            <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
                <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Award</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Award Title</label>
                    <input name="title" required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Best NGO 2023" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                    <input name="year" required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 2023" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                    <textarea name="description" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Brief details about the recognition..." />
                </div>
                
                <button type="submit" className="w-full bg-[#0F71A8] text-white py-2.5 rounded-lg font-medium hover:bg-[#0c5a86] transition-colors">
                    Save Award
                </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
