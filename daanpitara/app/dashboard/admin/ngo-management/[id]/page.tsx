import { getAdminNGOById } from "@/actions/admin";
import { Building2, MapPin, Target, Users, AlertCircle, ArrowLeft, Phone, BadgeCheck, FileText } from "lucide-react";
import Link from "next/link";

export default async function AdminNGOViewPage({ params }: { params: { id: string } }) {
    const ngoId = parseInt(params.id);
    const result = await getAdminNGOById(ngoId);

    if (result.error || !result.name) {
        return (
            <div className="flex h-full w-full items-center justify-center min-h-[50vh]">
                <div className="flex flex-col items-center gap-4 text-gray-500">
                    <AlertCircle className="h-10 w-10 text-red-500" />
                    <p className="text-lg font-medium">{result.error || 'NGO Not Found'}</p>
                   <Link href="/dashboard/admin/ngo-management" className="text-blue-500 hover:underline">Return to Management</Link>
                </div>
            </div>
        );
    }

    const { name, type, panNumber, registrationNumber, foundedYear, headquarters, vision, mission, objectives, focusAreas, operationalStates, operationalDistricts, teamMembers, boardMembers, email, phone, status } = result;

    return (
        <div className="space-y-6 max-w-6xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <Link href="/dashboard/admin/ngo-management" className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors tooltip-wrap" data-tooltip="Back to List">
                       <ArrowLeft className="w-5 h-5 text-gray-600" />
                   </Link>
                   <div>
                      <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
                      <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                         <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{status}</span>
                         <span>• Registered in {foundedYear || 'Unknown'}</span>
                         <span>• {type}</span>
                      </div>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link href={`/dashboard/admin/ngo-management/${ngoId}/edit`} className="bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-xl text-sm hover:bg-gray-200 transition-colors btn-press">
                        Edit NGO Details
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/60 transition-all hover:shadow-md">
                       <h3 className="text-[15px] font-bold text-gray-900 mb-5 flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-[#1572A1]" /> Basic Information
                       </h3>
                       <div className="grid grid-cols-2 gap-y-5 gap-x-4 text-sm">
                           <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                               <p className="text-[11px] text-gray-400 uppercase tracking-wide font-semibold mb-1">Registration No.</p>
                               <p className="font-medium text-gray-900">{registrationNumber || 'N/A'}</p>
                           </div>
                           <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                               <p className="text-[11px] text-gray-400 uppercase tracking-wide font-semibold mb-1">PAN Number</p>
                               <p className="font-medium text-gray-900">{panNumber || 'N/A'}</p>
                           </div>
                           <div className="col-span-2 mt-2">
                               <p className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5"><Target className="w-3.5 h-3.5"/> Vision</p>
                               <p className="text-gray-700 bg-blue-50/50 p-4 rounded-xl leading-relaxed">{vision || 'Not specified'}</p>
                           </div>
                           <div className="col-span-2">
                               <p className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5"><BadgeCheck className="w-3.5 h-3.5"/> Mission</p>
                               <p className="text-gray-700 bg-emerald-50/50 p-4 rounded-xl leading-relaxed">{mission || 'Not specified'}</p>
                           </div>
                           <div className="col-span-2">
                               <p className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5"/> Objectives</p>
                               <p className="text-gray-700 bg-amber-50/50 p-4 rounded-xl leading-relaxed">{objectives || 'Not specified'}</p>
                           </div>
                       </div>
                    </div>

                    {/* Geography & Focus */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/60 transition-all hover:shadow-md">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                               <h3 className="text-[15px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-[#1572A1]" /> Operational Geography
                               </h3>
                               <div className="space-y-4 text-sm">
                                   <div>
                                       <p className="text-xs text-gray-400 font-medium mb-1">Headquarters</p>
                                       <p className="font-semibold text-gray-800">{headquarters || 'N/A'}</p>
                                   </div>
                                   <div>
                                       <p className="text-xs text-gray-400 font-medium mb-1">States</p>
                                       <p className="font-medium text-gray-700">{operationalStates?.join(", ") || 'N/A'}</p>
                                   </div>
                                   <div>
                                       <p className="text-xs text-gray-400 font-medium mb-1">Districts</p>
                                       <div className="flex flex-wrap gap-1.5 mt-1.5">
                                           {operationalDistricts && operationalDistricts.length > 0 ? operationalDistricts.map((d: string, i: number) => (
                                               <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-[11px] font-medium">{d}</span>
                                           )) : <span className="text-gray-500">N/A</span>}
                                       </div>
                                   </div>
                               </div>
                            </div>
                            <div>
                               <h3 className="text-[15px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                                  <Target className="w-4 h-4 text-[#1572A1]" /> Focus Areas
                               </h3>
                               <div className="flex flex-wrap gap-2">
                                   {focusAreas && focusAreas.length > 0 ? focusAreas.map((area: string, i: number) => (
                                       <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold border border-blue-100 shadow-sm">{area}</span>
                                   )) : <span className="text-gray-500 text-sm">No focus areas specified</span>}
                               </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Content */}
                <div className="space-y-6">
                     <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/60 transition-all hover:shadow-md">
                       <h3 className="text-[15px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-[#1572A1]" /> Contact & Owner
                       </h3>
                       <div className="space-y-4 text-sm bg-gray-50 rounded-xl p-4 border border-gray-100">
                           <div>
                               <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 mb-1">Email</p>
                               <p className="font-medium text-gray-900 break-all">{email}</p>
                           </div>
                           <div>
                               <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 mb-1">Phone</p>
                               <p className="font-medium text-gray-900">{phone}</p>
                           </div>
                       </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/60 transition-all hover:shadow-md">
                       <h3 className="text-[15px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#1572A1]" /> Board Members ({boardMembers?.length || 0})
                       </h3>
                       <div className="space-y-3">
                           {boardMembers && boardMembers.length > 0 ? boardMembers.map((m: any, i: number) => (
                               <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                                   <p className="font-semibold text-gray-900 text-sm">{m.name}</p>
                                   <p className="text-xs text-gray-500 mt-0.5">{m.role}</p>
                               </div>
                           )) : (
                               <p className="text-sm text-gray-500 text-center py-4">No board members listed.</p>
                           )}
                       </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/60 transition-all hover:shadow-md">
                       <h3 className="text-[15px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#1572A1]" /> Team Members ({teamMembers?.length || 0})
                       </h3>
                       <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                           {teamMembers && teamMembers.length > 0 ? teamMembers.map((m: any, i: number) => (
                               <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                                   <div>
                                       <p className="font-semibold text-gray-900 text-sm">{m.name}</p>
                                       <p className="text-xs text-gray-500 mt-0.5">{m.role}</p>
                                   </div>
                               </div>
                           )) : (
                               <p className="text-sm text-gray-500 text-center py-4">No team members listed.</p>
                           )}
                       </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
