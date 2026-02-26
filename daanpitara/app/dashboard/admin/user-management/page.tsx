"use client";

import { Users } from "lucide-react";

export default function UserManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <p className="text-sm text-gray-500 mt-1">Manage all platform users and access controls</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-50 p-16 flex flex-col items-center justify-center text-center">
        <div className="text-gray-300 mb-4">
          <Users className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-xl font-bold text-gray-700">User Management Coming Soon</h3>
        <p className="text-sm text-gray-400 mt-2">User administration features will be available here</p>
      </div>
    </div>
  );
}
