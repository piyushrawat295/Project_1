"use client";

import { Users, Globe, Smartphone, MessageSquare, HelpCircle, Settings } from "lucide-react";

export default function SettingsPage() {
  const settings = [
    {
      title: "User Roles",
      desc: "Manage team access and permissions",
      icon: <Users className="w-8 h-8 text-[#0F71A8]" />,
      action: "Manage Roles",
      primary: true
    },
    {
      title: "Language", 
      desc: "Switch interface language",
      icon: <Globe className="w-8 h-8 text-[#0F71A8]" />,
      component: (
          <select className="w-full mt-auto rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option>English</option>
              <option>Hindi</option>
              <option>Marathi</option>
          </select>
      )
    },
    {
      title: "Help Videos",
      desc: "Step-by-step tutorials",
      icon: <Smartphone className="w-8 h-8 text-[#0F71A8]" />,
      action: "Watch Videos",
      primary: true
    },
    {
      title: "Chat Support",
      desc: "Get instant help from our team",
      icon: <MessageSquare className="w-8 h-8 text-[#0F71A8]" />,
      action: "Start Chat",
      primary: true
    },
    {
      title: "Knowledge Base",
      desc: "Browse FAQs and guides",
      icon: <HelpCircle className="w-8 h-8 text-[#0F71A8]" />,
      action: "Browse",
      primary: true
    },
    {
      title: "General Settings",
      desc: "Notifications and preferences",
      icon: <Settings className="w-8 h-8 text-[#0F71A8]" />,
      action: "Configure",
      primary: true
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings & Help</h1>
        <p className="text-gray-500">Layman-friendly support</p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settings.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-start h-full">
                  <div className="mb-4">
                      {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-6">{item.desc}</p>
                  
                  {item.component ? (
                      item.component
                  ) : (
                      <button className={`mt-auto px-6 py-2 rounded-lg font-medium transition-colors ${
                          item.primary 
                            ? "bg-[#0F71A8] text-white hover:bg-[#0c5a86]" 
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}>
                          {item.action}
                      </button>
                  )}
              </div>
          ))}
      </div>
    </div>
  );
}
