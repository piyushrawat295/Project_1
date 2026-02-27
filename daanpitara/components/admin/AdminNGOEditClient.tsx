"use client";

import { useState } from "react";
import { updateAdminNGODetails } from "@/actions/admin";
import { ArrowLeft, Save, Building2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNGOEditClient({ ngo }: { ngo: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: ngo.name || "",
        registrationNumber: ngo.registrationNumber || "",
        panNumber: ngo.panNumber || "",
        headquarters: ngo.headquarters || "",
        status: ngo.status || "Pending",
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const res = await updateAdminNGODetails(ngo.id, formData);
        if (res.success) {
            router.push(`/dashboard/admin/ngo-management/${ngo.id}`);
            router.refresh();
        } else {
            alert(res.error || "Failed to update NGO details.");
        }
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href={`/dashboard/admin/ngo-management/${ngo.id}`} className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors tooltip-wrap" data-tooltip="Back to NGO Details">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit NGO</h1>
                        <p className="text-sm text-gray-500 mt-1">Make direct administrative changes to {ngo.name}</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/60 transition-all hover:shadow-md">
                <h3 className="text-[15px] font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#1572A1]" /> Administrative Edit Form
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5 text-[13px] uppercase tracking-wide">NGO Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 h-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all placeholder:text-gray-400 bg-gray-50/50 hover:bg-white focus:bg-white"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5 text-[13px] uppercase tracking-wide">Verification Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-4 h-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all bg-gray-50/50 hover:bg-white focus:bg-white"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Verified">Verified</option>
                            <option value="Flagged">Flagged</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5 text-[13px] uppercase tracking-wide">Registration Number</label>
                        <input
                            type="text"
                            name="registrationNumber"
                            value={formData.registrationNumber}
                            onChange={handleChange}
                            className="w-full px-4 h-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all placeholder:text-gray-400 bg-gray-50/50 hover:bg-white focus:bg-white"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5 text-[13px] uppercase tracking-wide">PAN Number</label>
                        <input
                            type="text"
                            name="panNumber"
                            value={formData.panNumber}
                            onChange={handleChange}
                            className="w-full px-4 h-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all placeholder:text-gray-400 bg-gray-50/50 hover:bg-white focus:bg-white"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5 text-[13px] uppercase tracking-wide">Headquarters (City/Location)</label>
                        <input
                            type="text"
                            name="headquarters"
                            value={formData.headquarters}
                            onChange={handleChange}
                            className="w-full px-4 h-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all placeholder:text-gray-400 bg-gray-50/50 hover:bg-white focus:bg-white"
                        />
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                    <Link href={`/dashboard/admin/ngo-management/${ngo.id}`} className="px-5 h-11 flex items-center justify-center font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors btn-press">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 h-11 flex items-center justify-center gap-2 font-semibold text-white bg-[#1572A1] rounded-xl hover:bg-[#125e87] transition-colors btn-press disabled:opacity-50 shadow-sm"
                    >
                        {loading ? "Updating..." : <><Save className="w-4 h-4" /> Save Changes</>}
                    </button>
                </div>
            </form>

            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100/60 mt-6 flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-amber-500 mt-0.5" />
                <div>
                     <h4 className="text-sm font-bold text-amber-900">Admin Editing Notice</h4>
                     <p className="text-[13px] text-amber-700 mt-1">As an administrator, you are only allowed to modify core verification details like Registration Numbers or PAN numbers. Ensure any manual changes comply with compliance and verification guidelines. This data will be instantly updated in the system.</p>
                </div>
            </div>
        </div>
    );
}
