"use client";

import { useState } from "react";
import LocationPicker from "@/components/dashboard/LocationPicker";
import { Building2, Save } from "lucide-react";

import { saveNGODetails } from "@/actions/dashboard";

interface NGODetailsClientProps {
  initialData: {
    name: string;
    registrationNumber: string;
    foundedYear: string;
    teamSize: string;
    headquarters: string;
    description: string;
    focusAreas: string[];
    lat: number;
    lng: number;
  } | null;
}

export default function NGODetailsClient({ initialData }: NGODetailsClientProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Use initialData or defaults
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    registrationNumber: initialData?.registrationNumber || "",
    foundedYear: initialData?.foundedYear || "",
    teamSize: initialData?.teamSize || "",
    headquarters: initialData?.headquarters || "",
    description: initialData?.description || "",
    focusAreas: initialData?.focusAreas || [] as string[],
    lat: initialData?.lat || 20.5937,
    lng: initialData?.lng || 78.9629,
  });

  // Mock Focus Areas
  const allFocusAreas = [
    "Environmental Conservation",
    "Community Development",
    "Education",
    "Healthcare",
    "Women Empowerment",
    "Child Welfare",
    "Disaster Relief",
    "Animal Welfare"
  ];

  const handleFocusAreaToggle = (area: string) => {
    setFormData(prev => {
      // Ensure focusAreas is an array before filtering/spreading
      const areas = Array.isArray(prev.focusAreas) ? prev.focusAreas : [];
      
      if (areas.includes(area)) {
        return { ...prev, focusAreas: areas.filter(a => a !== area) };
      } else {
        return { ...prev, focusAreas: [...areas, area] };
      }
    });
  };

  const handleLocationChange = (loc: { lat: number; lng: number }) => {
    setFormData(prev => ({ ...prev, lat: loc.lat, lng: loc.lng }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = await saveNGODetails({
      name: formData.name,
      registrationNumber: formData.registrationNumber,
      foundedYear: formData.foundedYear,
      teamSize: formData.teamSize,
      headquarters: formData.headquarters,
      description: formData.description,
      focusAreas: formData.focusAreas,
      lat: formData.lat,
      lng: formData.lng,
    });
    
    setIsSubmitting(false);

    if (result.success) {
      alert("NGO details saved successfully!");
    } else {
      alert(result.message || "Failed to save details");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">NGO Organization Details</h2>
        <p className="text-gray-500">Tell us about your organization to get verified.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Basic Info Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
          <h3 className="text-lg font-bold text-gray-800 border-b border-gray-50 pb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">NGO Name *</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Green Earth Foundation"
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
             <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Registration Number</label>
              <input 
                type="text" 
                placeholder="e.g. 1234/5678"
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                value={formData.registrationNumber}
                onChange={e => setFormData({...formData, registrationNumber: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Year Founded</label>
              <input 
                type="text" 
                placeholder="YYYY"
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                value={formData.foundedYear}
                onChange={e => setFormData({...formData, foundedYear: e.target.value})}
              />
            </div>

             <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Team Size</label>
              <select 
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                value={formData.teamSize}
                onChange={e => setFormData({...formData, teamSize: e.target.value})}
              >
                <option value="">Select size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="200+">200+ employees</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Headquarters Location (City, State)</label>
            <input 
              type="text" 
              placeholder="e.g. New Delhi, Delhi"
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
              value={formData.headquarters}
              onChange={e => setFormData({...formData, headquarters: e.target.value})}
            />
          </div>
        </div>

        {/* Location & Impact */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
           <h3 className="text-lg font-bold text-gray-800 border-b border-gray-50 pb-4 flex items-center gap-2">
            <Save className="w-5 h-5 text-green-600" />
            Location & Impact
          </h3>
          
          {/* Map */}
          <LocationPicker 
            value={{ lat: formData.lat, lng: formData.lng }}
            onLocationChange={handleLocationChange} 
          />

          {/* Focus Areas */}
          <div className="space-y-3">
             <label className="text-sm font-medium text-gray-700 block">Focus Areas</label>
             <div className="flex flex-wrap gap-2">
               {allFocusAreas.map(area => (
                 <button
                   key={area}
                   type="button"
                   onClick={() => handleFocusAreaToggle(area)}
                   className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border
                     ${formData.focusAreas.includes(area)
                       ? "bg-blue-600 text-white border-blue-600 shadow-md transform scale-105"
                       : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                     }
                   `}
                 >
                   {area}
                 </button>
               ))}
             </div>
          </div>
           
           <div className="space-y-2">
             <label className="text-sm font-medium text-gray-700">Mission & Impact Summary</label>
             <textarea 
               className="w-full h-32 p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none resize-none"
               placeholder="Briefly describe your NGO's mission and key achievements..."
               value={formData.description}
               onChange={e => setFormData({...formData, description: e.target.value})}
             />
           </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
           <button 
             type="button"
             className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
           >
             Cancel
           </button>
           <button 
             type="submit"
             disabled={isSubmitting}
             className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-2 disabled:opacity-70"
           >
             <Save className="w-4 h-4" />
             {isSubmitting ? "Saving..." : "Save NGO Details"}
           </button>
        </div>

      </form>
    </div>
  );
}
