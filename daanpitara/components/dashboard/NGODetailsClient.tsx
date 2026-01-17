"use client";

import { useState } from "react";
import { 
  Building2, 
  MapPin, 
  Target, 
  Users, 
  Plus, 
  Trash2, 
  Save, 
  Eye, 
} from "lucide-react";
import { saveNGODetails } from "@/actions/dashboard";
import { createTeamMember, createBoardMember, deleteTeamMember, deleteBoardMember } from "@/actions/ngo-features";
import { useRouter } from "next/navigation";

import LocationPickerMap from "@/components/map/LocationPickerMap";

interface NGODetailsClientProps {
  initialData: any;
}

export default function NGODetailsClient({ initialData }: NGODetailsClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    yearOfRegistration: initialData?.foundedYear || "",
    type: initialData?.type || "Trust",
    registrationNumber: initialData?.registrationNumber || "",
    panNumber: initialData?.panNumber || "",
    vision: initialData?.vision || "",
    mission: initialData?.mission || "",
    objectives: initialData?.objectives || "",
    focusAreas: (initialData?.focusAreas || ["Education", "Health"]) as string[],
    operationalState: initialData?.operationalStates?.[0] || "",
    operationalDistricts: initialData?.operationalDistricts?.join(", ") || "",
    lat: initialData?.lat || 0,
    lng: initialData?.lng || 0,
  });

  // Modal states
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  // Form states for modals
  const [teamForm, setTeamForm] = useState({ name: "", role: "", email: "", phone: "" });
  const [boardForm, setBoardForm] = useState({ name: "", role: "", email: "", phone: "" });
  const [isSubmittingModal, setIsSubmittingModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationSave = (lat: number, lng: number) => {
     setFormData(prev => ({ ...prev, lat, lng }));
     setIsMapModalOpen(false);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const result = await saveNGODetails({
        name: formData.name,
        foundedYear: formData.yearOfRegistration,
        type: formData.type,
        registrationNumber: formData.registrationNumber,
        panNumber: formData.panNumber,
        vision: formData.vision,
        mission: formData.mission,
        objectives: formData.objectives,
        focusAreas: formData.focusAreas,
        operationalStates: [formData.operationalState],
        operationalDistricts: formData.operationalDistricts.split(",").map((s: string) => s.trim()).filter(Boolean),
        lat: formData.lat,
        lng: formData.lng,
      });

      if (result.success) {
        alert("Profile saved successfully!");
        router.refresh();
      } else {
        alert("Failed to save profile: " + result.message);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleTeamSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmittingModal(true);
      try {
          const res = await createTeamMember(teamForm);
          if (res.success) {
              setIsTeamModalOpen(false);
              setTeamForm({ name: "", role: "", email: "", phone: "" });
              router.refresh();
          } else {
              alert("Error: " + res.error);
          }
      } catch (e) {
          console.error(e);
      } finally {
          setIsSubmittingModal(false);
      }
  };

  const handleBoardSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmittingModal(true);
      try {
          const res = await createBoardMember(boardForm);
          if (res.success) {
              setIsBoardModalOpen(false);
              setBoardForm({ name: "", role: "", email: "", phone: "" });
              router.refresh();
          } else {
              alert("Error: " + res.error);
          }
      } catch (e) {
          console.error(e);
      } finally {
          setIsSubmittingModal(false);
      }
  };

  const handleDeleteTeam = async (id: number) => {
      if(!confirm("Are you sure?")) return;
      try {
          const res = await deleteTeamMember(id);
          if(res.success) router.refresh();
          else alert("Failed to delete");
      } catch(e) { console.error(e); }
  };

  const handleDeleteBoard = async (id: number) => {
      if(!confirm("Are you sure?")) return;
      try {
          const res = await deleteBoardMember(id);
          if(res.success) router.refresh();
          else alert("Failed to delete");
      } catch(e) { console.error(e); }
  };

  return (
    <div className="space-y-8 relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">NGO Profile</h1>
           <p className="text-gray-500">Complete profile - used everywhere automatically</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              <Eye className="w-4 h-4" /> Preview Public Profile
           </button>
           <button 
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-[#0ea5e9] text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors disabled:opacity-50"
           >
              {loading ? "Saving..." : <><Save className="w-4 h-4" /> Save Changes</>}
           </button>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
         <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-500" /> Basic Information
         </h3>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">NGO Name *</label>
               <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Daan Seva Trust"
               />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Year of Registration *</label>
               <input 
                  type="text" 
                  name="yearOfRegistration"
                  value={formData.yearOfRegistration}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 2015"
               />
            </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
               <select 
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
               >
                  <option value="Trust">Trust</option>
                  <option value="Society">Society</option>
                  <option value="Section 8 Company">Section 8 Company</option>
               </select>
            </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
               <input 
                  type="text" 
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="REG/2015/12345"
               />
            </div>
             <div className="md:col-span-2">
               <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
               <input 
                  type="text" 
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-md"
                  placeholder="AhXPXXXXX"
               />
            </div>
         </div>

         <div className="space-y-4">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Vision</label>
               <textarea 
                  name="vision"
                  value={formData.vision}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Creating a society where every individual has access to basic needs..."
               />
            </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Mission</label>
               <textarea 
                  name="mission"
                  value={formData.mission}
                  onChange={handleChange}
                   rows={2}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Empowering underprivileged communities through education..."
               />
            </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Objectives</label>
               <textarea 
                  name="objectives"
                  value={formData.objectives}
                  onChange={handleChange}
                   rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Provide quality education... Deliver healthcare..."
               />
            </div>
         </div>
      </div>

       {/* Working Areas */}
       <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
         <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" /> Working Areas
         </h3>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Education", "Health", "Women Empowerment", "Child Welfare", "Livelihood", "Environment", "Elder Care", "Disability"].map((area) => (
               <label key={area} className="flex items-center gap-2 cursor-pointer">
                  <input 
                     type="checkbox" 
                     className="rounded text-blue-600 focus:ring-blue-500"
                     checked={formData.focusAreas.includes(area)}
                     onChange={(e) => {
                        if (e.target.checked) {
                           setFormData(prev => ({ ...prev, focusAreas: [...prev.focusAreas, area] }));
                        } else {
                           setFormData(prev => ({ ...prev, focusAreas: prev.focusAreas.filter(a => a !== area) }));
                        }
                     }}
                  />
                  <span className="text-sm text-gray-700">{area}</span>
               </label>
            ))}
         </div>
       </div>

       {/* Operational Geography */}
       <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
         <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500" /> Operational Geography
             </h3>
             <button
                 onClick={() => setIsMapModalOpen(true)}
                 className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
            >
                <MapPin className="w-4 h-4 text-blue-600" />
                {formData.lat && formData.lng ? "Update Location" : "Set Location on Map"}
            </button>
         </div>
         
         {formData.lat !== 0 && (
             <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-center gap-3">
                 <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                     <MapPin className="w-5 h-5" />
                 </div>
                 <div>
                     <p className="text-sm font-semibold text-blue-900">Location Set</p>
                     <p className="text-xs text-blue-700">Latitude: {formData.lat.toFixed(6)}, Longitude: {formData.lng.toFixed(6)}</p>
                 </div>
             </div>
         )}

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
               <input 
                  type="text" 
                  name="operationalState"
                   value={formData.operationalState}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Maharashtra"
               />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Districts (comma separated)</label>
               <input 
                  type="text" 
                  name="operationalDistricts"
                  value={formData.operationalDistricts}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Mumbai, Pune, Nashik"
               />
            </div>
         </div>
       </div>

       {/* Board Members */}
       <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
         <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
               <Users className="w-5 h-5 text-blue-500" /> Board Members
            </h3>
            <button 
                onClick={() => setIsBoardModalOpen(true)}
                className="flex items-center gap-1 text-sm bg-[#0ea5e9] text-white px-3 py-1.5 rounded-lg hover:bg-sky-600 transition-colors"
            >
               <Plus className="w-4 h-4" /> Add Board Member
            </button>
         </div>
         <div className="space-y-3">
            {initialData?.boardMembers?.map((member: any, i: number) => (
               <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                     <h4 className="font-bold text-gray-900 text-sm">{member.name}</h4>
                     <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                   <div className="text-xs text-gray-600 hidden md:block">
                     <p>{member.email}</p>
                  </div>
                   <div className="text-xs text-gray-600 hidden md:block">
                     <p>{member.phone}</p>
                  </div>
                  <button onClick={() => handleDeleteBoard(member.id)} className="text-red-500 hover:text-red-700">
                     <Trash2 className="w-4 h-4" />
                  </button>
               </div>
            ))}
             {(!initialData?.boardMembers || initialData.boardMembers.length === 0) && (
                <div className="text-center text-gray-500 text-sm py-4">No board members added yet.</div>
             )}
         </div>
       </div>

        {/* Team Members */}
       <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
         <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
               <Users className="w-5 h-5 text-blue-500" /> Team Members
            </h3>
            <button 
                onClick={() => setIsTeamModalOpen(true)}
                className="flex items-center gap-1 text-sm bg-[#0ea5e9] text-white px-3 py-1.5 rounded-lg hover:bg-sky-600 transition-colors"
            >
               <Plus className="w-4 h-4" /> Add Team Member
            </button>
         </div>
         <div className="space-y-3">
            {initialData?.teamMembers?.map((member: any, i: number) => (
               <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                     <h4 className="font-bold text-gray-900 text-sm">{member.name}</h4>
                     <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                   <div className="text-xs text-gray-600 hidden md:block">
                     <p>{member.email}</p>
                  </div>
                  <button onClick={() => handleDeleteTeam(member.id)} className="text-red-500 hover:text-red-700">
                     <Trash2 className="w-4 h-4" />
                  </button>
               </div>
            ))}
             {(!initialData?.teamMembers || initialData.teamMembers.length === 0) && (
                <div className="text-center text-gray-500 text-sm py-4">No team members added yet.</div>
             )}
         </div>
       </div>

       {/* Add Board Member Modal */}
       {isBoardModalOpen && (
           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
               <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
                   <h2 className="text-xl font-bold mb-4 text-gray-900">Add Board Member</h2>
                   <form onSubmit={handleBoardSubmit} className="space-y-4">
                       <div>
                           <label className="block text-sm font-medium mb-1 text-gray-700">Name *</label>
                           <input required value={boardForm.name} onChange={(e) => setBoardForm({...boardForm, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900" />
                       </div>
                       <div>
                           <label className="block text-sm font-medium mb-1 text-gray-700">Designation *</label>
                           <input required value={boardForm.role} onChange={(e) => setBoardForm({...boardForm, role: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900" />
                       </div>
                       <div>
                           <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                           <input type="email" value={boardForm.email} onChange={(e) => setBoardForm({...boardForm, email: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900" />
                       </div>
                       <div>
                           <label className="block text-sm font-medium mb-1 text-gray-700">Phone</label>
                           <input value={boardForm.phone} onChange={(e) => setBoardForm({...boardForm, phone: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900" />
                       </div>
                       <div className="flex gap-3 mt-6">
                           <button type="button" onClick={() => setIsBoardModalOpen(false)} className="flex-1 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                           <button type="submit" disabled={isSubmittingModal} className="flex-1 py-2 bg-[#0ea5e9] text-white rounded-lg hover:bg-sky-600 disabled:opacity-50">
                               {isSubmittingModal ? 'Adding...' : 'Add Member'}
                           </button>
                       </div>
                   </form>
               </div>
           </div>
       )}

       {/* Add Team Member Modal */}
       {isTeamModalOpen && (
           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
               <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
                   <h2 className="text-xl font-bold mb-4 text-gray-900">Add Team Member</h2>
                   <form onSubmit={handleTeamSubmit} className="space-y-4">
                       <div>
                           <label className="block text-sm font-medium mb-1 text-gray-700">Name *</label>
                           <input required value={teamForm.name} onChange={(e) => setTeamForm({...teamForm, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900" />
                       </div>
                       <div>
                           <label className="block text-sm font-medium mb-1 text-gray-700">Role *</label>
                           <input required value={teamForm.role} onChange={(e) => setTeamForm({...teamForm, role: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900" />
                       </div>
                       <div>
                           <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                           <input type="email" value={teamForm.email} onChange={(e) => setTeamForm({...teamForm, email: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900" />
                       </div>
                       <div>
                           <label className="block text-sm font-medium mb-1 text-gray-700">Phone</label>
                           <input value={teamForm.phone} onChange={(e) => setTeamForm({...teamForm, phone: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900" />
                       </div>
                       <div className="flex gap-3 mt-6">
                           <button type="button" onClick={() => setIsTeamModalOpen(false)} className="flex-1 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                           <button type="submit" disabled={isSubmittingModal} className="flex-1 py-2 bg-[#0ea5e9] text-white rounded-lg hover:bg-sky-600 disabled:opacity-50">
                               {isSubmittingModal ? 'Adding...' : 'Add Member'}
                           </button>
                       </div>
                   </form>
               </div>
           </div>
       )}

       {/* Map Modal */}
       {isMapModalOpen && (
           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
               <div className="bg-white rounded-3xl p-6 w-full max-w-3xl shadow-xl">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Set Operational Location</h2>
                    <p className="text-gray-500 mb-6">Click on the map to pin-point your NGO's main office or center of operations.</p>
                    
                    <LocationPickerMap 
                        initialLat={formData.lat}
                        initialLng={formData.lng}
                        onSave={handleLocationSave}
                        onCancel={() => setIsMapModalOpen(false)}
                    />
               </div>
           </div>
       )}

    </div>
  );
}
