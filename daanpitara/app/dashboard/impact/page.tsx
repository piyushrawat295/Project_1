"use client";


import { useState } from "react";
import { FileText, Download, BarChart2, PieChart, X } from "lucide-react";

export default function ImpactPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState("Monthly Activity Report");

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

  const handleGenerate = () => {
    setIsModalOpen(false);
    alert(`Generating ${selectedReportType}... (This is a mock action)`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Impact & Reports</h1>
          <p className="text-gray-500">Magic layer - replaces consultants</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#0F71A8] text-white px-4 py-2 rounded-lg hover:bg-[#0c5a86] transition-colors"
        >
          <FileText className="w-4 h-4" />
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            onClick={() => {
                setSelectedReportType(report.title + " Report");
                setIsModalOpen(true);
            }}
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

      {/* Generate Report Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Generate Report</h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <select 
                            value={selectedReportType} 
                            onChange={(e) => setSelectedReportType(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none bg-white"
                        >
                            <option>Monthly Activity Report</option>
                            <option>Project Impact Report</option>
                            <option>CSR-ready Impact Report</option>
                            <option>Annual Report</option>
                            <option>Financial Report</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4 border-t mt-6">
                        <button onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button onClick={handleGenerate} className="flex-1 px-4 py-2 bg-[#0EA5E9] text-white rounded-lg hover:bg-[#0284c7]">
                            Generate PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
