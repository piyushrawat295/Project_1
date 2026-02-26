"use client";

import { Settings } from "lucide-react";

export default function PlatformSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Platform Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Configure platform-wide settings and preferences</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-50 p-16 flex flex-col items-center justify-center text-center">
        <Settings className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-bold text-gray-700">Platform Settings Coming Soon</h3>
        <p className="text-sm text-gray-400 mt-2">Platform configuration and settings will be available here</p>
      </div>
    </div>
  );
}
