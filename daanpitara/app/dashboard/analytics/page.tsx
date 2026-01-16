"use client";

import { useEffect, useState } from "react";
import { Users, IndianRupee, Briefcase, TrendingUp, Download } from "lucide-react";
import { getBeneficiaries, getProjects } from "@/actions/ngo-features";

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
      beneficiaries: "0",
      funds: "₹0",
      activeProjects: 0,
      growth: "+15%" // Mocked for now
  });

  useEffect(() => {
      async function loadStats() {
          const [benRes, projRes] = await Promise.all([
              getBeneficiaries(),
              getProjects()
          ]);
          
          let benCount = "0";
          let fundAmount = "0";
          let projCount = 0;

          if (benRes.stats) {
              benCount = benRes.stats.total.toLocaleString();
          }

          if (projRes.stats) {
             projCount = projRes.stats.active;
             // funds is total budget of all projects for now as a proxy
             fundAmount = (projRes.stats.totalBudget || 0).toLocaleString();
          }

          setStats(prev => ({
              ...prev,
              beneficiaries: benCount,
              funds: `₹${fundAmount}`,
              activeProjects: projCount
          }));
      }
      loadStats();
  }, []);

  const cards = [
    {
      title: "Beneficiaries Served",
      value: stats.beneficiaries,
      icon: <Users className="w-6 h-6 text-white" />,
      className: "bg-[#2D8EBB]" // Blue
    },
    {
      title: "Funds Utilized",
      value: stats.funds,
      icon: <IndianRupee className="w-6 h-6 text-white" />,
      className: "bg-[#2D8EBB]" // Same Blue
    },
    {
      title: "Active Projects",
      value: stats.activeProjects,
      icon: <Briefcase className="w-6 h-6 text-white" />,
      className: "bg-[#1E5C7B]" // Darker Blue
    },
    {
      title: "Growth Trend", 
      value: stats.growth,
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      className: "bg-[#154660]" // Even Darker Blue
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500">Simple language, no charts overload</p>
        </div>
        <button className="flex items-center gap-2 bg-[#0F71A8] text-white px-4 py-2 rounded-lg hover:bg-[#0c5a86] transition-colors">
          <Download className="w-4 h-4" />
          Download Summary
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {cards.map((card, i) => (
              <div key={i} className={`${card.className} rounded-xl p-6 text-white`}>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                      {card.icon}
                  </div>
                  <p className="text-sm opacity-90 mb-1">{card.title}</p>
                  <h3 className="text-3xl font-bold">{card.value}</h3>
              </div>
          ))}
      </div>

      {/* Monthly Trends - Placeholder */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 min-h-[400px]">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Monthly Trends</h2>
          
          <div className="bg-gray-50 rounded-xl h-[300px] flex items-center justify-center">
               <p className="text-gray-400">Chart visualization coming soon</p>
          </div>
      </div>
    </div>
  );
}
