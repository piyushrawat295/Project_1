"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit2, 
  ShieldCheck, 
  BadgeCheck 
} from "lucide-react";
import { updateUserProfile } from "@/actions/dashboard";
import { useState } from "react";

// Define props for initial data
interface ProfileClientProps {
  initialData: {
    phone: string | null;
    location: string | null;
    bio: string | null;
    designation?: string;
  };
}

export default function ProfileClient({ initialData }: ProfileClientProps) {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Use initialData for state
  const [formData, setFormData] = useState({
    phone: initialData.phone || "",
    location: initialData.location || "",
    bio: initialData.bio || "",
  });

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateUserProfile({
      phone: formData.phone,
      location: formData.location,
      bio: formData.bio
    });
    setIsSaving(false);
    
    if (result.success) {
      setIsEditing(false);
    } else {
      alert("Failed to save profile");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
        <p className="text-gray-500">Manage your personal details and account settings.</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-start gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
          >
            <Edit2 className="w-4 h-4" />
            {isEditing ? "Cancel Edit" : "Edit Profile"}
          </button>
        </div>

        <div className="relative">
          <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
             <Image
                src={session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name}&background=random`}
                alt="Profile"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
          </div>
          <div className="absolute -bottom-3 -right-3 bg-green-500 text-white p-1.5 rounded-full border-4 border-white shadow-sm" title="Verified User">
            <BadgeCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="flex-1 space-y-2 pt-2">
          <h3 className="text-2xl font-bold text-gray-800">{session?.user?.name}</h3>
          <p className="text-gray-500 font-medium">NGO Administrator</p>
          
          <div className="flex flex-wrap gap-2 mt-4">
             <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-100">
               <ShieldCheck className="w-3.5 h-3.5" />
               Verified Profile
             </span>
             <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
               NGO Admin
             </span>
          </div>
        </div>
      </div>

      {/* Contact & Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Contact Info */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full flex flex-col">
          <h4 className="text-lg font-bold text-gray-800 mb-6 pb-4 border-b border-gray-50">Contact Information</h4>
          
          <div className="space-y-6 flex-1">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Email Address</p>
                <p className="text-gray-700 font-medium">{session?.user?.email}</p>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Synced from Google (Read-only)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
               <div className="p-2.5 bg-green-50 text-green-600 rounded-xl flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Phone Number</p>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91-XXXXXXXXXX"
                    className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                  />
                ) : (
                  <p className="text-gray-700 font-medium">{formData.phone || "Not Set"}</p>
                )}
              </div>
            </div>

             <div className="flex items-start gap-4">
               <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Location</p>
                 {isEditing ? (
                  <input 
                    type="text" 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="City, State"
                    className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                  />
                ) : (
                  <p className="text-gray-700 font-medium">{formData.location || "Not Set"}</p>
                )}
              </div>
            </div>

             <div className="flex items-start gap-4">
               <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl flex-shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Member Since</p>
                <p className="text-gray-700 font-medium">January 2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* About Me */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full flex flex-col">
          <h4 className="text-lg font-bold text-gray-800 mb-6 pb-4 border-b border-gray-50">About Me</h4>
          <div className="flex-1">
             {isEditing ? (
                <textarea 
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full h-full min-h-[200px] p-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all resize-none text-gray-700 leading-relaxed"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-600 leading-relaxed text-sm">
                  {formData.bio || "No bio added yet."}
                </p>
              )}
          </div>
          
           {isEditing && (
            <div className="mt-8 pt-6 border-t border-gray-50 flex justify-end">
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 disabled:opacity-70"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
