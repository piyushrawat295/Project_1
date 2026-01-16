"use client";

import { Globe, Share2, Edit, Eye } from "lucide-react";

export default function DigitalPresencePage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Digital Presence</h1>
          <p className="text-gray-500">Built-in marketing - no digital team needed</p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                <Eye className="w-4 h-4" />
                Preview
            </button>
            <button className="flex items-center gap-2 bg-[#0F71A8] text-white px-4 py-2 rounded-lg hover:bg-[#0c5a86] transition-colors">
                <Edit className="w-4 h-4" />
                Edit Content
            </button>
        </div>
      </div>

      {/* Public Profile Preview Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Public Profile Page</h2>
          
          <div className="bg-gray-50 rounded-xl h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-200">
              <Globe className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg mb-6">Your NGO&apos;s public profile is live!</p>
              <button className="flex items-center gap-2 bg-[#0F71A8] text-white px-6 py-2.5 rounded-lg hover:bg-[#0c5a86] transition-colors">
                  Share Link
              </button>
          </div>
      </div>

      {/* Shareable Content Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
              { title: "Social Media Posts", desc: "Auto-generated content ready to share" },
              { title: "Campaign Highlights", desc: "Auto-generated content ready to share" },
              { title: "Project Showcase", desc: "Auto-generated content ready to share" }
          ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-between h-48">
                  <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                  <button className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition-colors self-start">
                      <Share2 className="w-4 h-4" />
                      Share
                  </button>
              </div>
          ))}
      </div>
    </div>
  );
}
