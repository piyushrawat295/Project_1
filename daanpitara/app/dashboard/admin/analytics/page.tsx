"use client";

import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics & Insights</h2>
        <p className="text-sm text-gray-500 mt-1">Platform-wide analytics and performance insights</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-50 p-16 flex flex-col items-center justify-center text-center">
        <BarChart3 className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-bold text-gray-700">Analytics & Insights Coming Soon</h3>
        <p className="text-sm text-gray-400 mt-2">Advanced analytics and platform insights will be available here</p>
      </div>
    </div>
  );
}
