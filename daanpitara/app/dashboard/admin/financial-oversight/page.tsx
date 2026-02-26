"use client";

import { IndianRupee } from "lucide-react";

export default function FinancialOversightPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Financial Oversight</h2>
        <p className="text-sm text-gray-500 mt-1">Monitor financial transactions and fund flows</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-50 p-16 flex flex-col items-center justify-center text-center">
        <IndianRupee className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-bold text-gray-700">Financial Oversight Coming Soon</h3>
        <p className="text-sm text-gray-400 mt-2">Financial monitoring and oversight features will be available here</p>
      </div>
    </div>
  );
}
