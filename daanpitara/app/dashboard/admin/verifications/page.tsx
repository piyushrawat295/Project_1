"use client";

import { CheckCircle2 } from "lucide-react";

export default function VerificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Verifications & Approvals</h2>
        <p className="text-sm text-gray-500 mt-1">Manage NGO verification workflows and approvals</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-50 p-16 flex flex-col items-center justify-center text-center">
        <CheckCircle2 className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-bold text-gray-700">Verifications & Approvals Coming Soon</h3>
        <p className="text-sm text-gray-400 mt-2">Verification and approval workflows will be available here</p>
      </div>
    </div>
  );
}
