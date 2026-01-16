"use client";

import { Construction } from "lucide-react";

export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
      <div className="bg-blue-50 p-4 rounded-full mb-6">
        <Construction className="w-12 h-12 text-blue-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-500 max-w-md">
        This feature is currently under development. We are working hard to bring this to you soon!
      </p>
    </div>
  );
}
