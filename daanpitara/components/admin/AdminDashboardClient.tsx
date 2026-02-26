"use client";

import { useState } from "react";
import { verifyNGO } from "@/actions/admin";
import { Eye, CheckCircle, Loader2 } from "lucide-react";

export default function AdminDashboardClient({ ngoId, isVerified }: { ngoId: number, isVerified: boolean }) {
    const [loading, setLoading] = useState(false);

    const handleVerify = async () => {
        setLoading(true);
        const res = await verifyNGO(ngoId);
        if (res?.error) {
            alert(res.error);
        }
        setLoading(false);
    }

    return (
        <div className="flex items-center gap-1.5">
            <button className="tooltip-wrap p-2 text-gray-400 hover:text-[#1572A1] hover:bg-blue-50 rounded-lg transition-all duration-150" data-tooltip="View Details">
                <Eye className="w-4 h-4" />
            </button>
            {!isVerified && (
                <button 
                  onClick={handleVerify}
                  disabled={loading}
                  className="text-[11px] font-semibold text-white bg-emerald-500 hover:bg-emerald-600 px-3 py-1.5 rounded-lg transition-all duration-200 disabled:opacity-50 btn-press shadow-sm flex items-center gap-1.5"
                >
                    {loading ? (
                        <><Loader2 className="w-3 h-3 animate-spin" /> Verifying…</>
                    ) : (
                        <><CheckCircle className="w-3 h-3" /> Verify</>
                    )}
                </button>
            )}
        </div>
    );
}
