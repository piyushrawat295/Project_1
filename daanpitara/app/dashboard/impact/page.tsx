"use client";

import { FileText, Download, BarChart2, PieChart } from "lucide-react";

export default function ImpactPage() {
  const reports = [
    {
      id: 1,
      title: "Monthly Activity",
      description: "Click to generate",
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      action: "Generate Report",
    },
    {
      id: 2,
      title: "Project Impact",
      description: "Click to generate",
      icon: <BarChart2 className="w-6 h-6 text-blue-600" />,
      action: "Generate Report",
    },
    {
      id: 3,
      title: "CSR-ready Impact",
      description: "Click to generate",
      icon: <PieChart className="w-6 h-6 text-blue-600" />,
      action: "Generate Report",
    },
    {
      id: 4,
      title: "Annual Report",
      description: "Click to generate",
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      action: "Generate Report",
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Impact & Reports</h1>
          <p className="text-gray-500">Magic layer - replaces consultants</p>
        </div>
        <button className="flex items-center gap-2 bg-[#0F71A8] text-white px-4 py-2 rounded-lg hover:bg-[#0c5a86] transition-colors">
          <FileText className="w-4 h-4" />
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
              {report.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {report.title}
            </h3>
            <p className="text-gray-500 text-sm mb-4">{report.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
