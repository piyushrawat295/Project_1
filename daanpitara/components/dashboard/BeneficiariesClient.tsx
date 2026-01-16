"use client";

import { useEffect, useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Plus, 
  Eye, 
  Trash2,
  Baby,
  User,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";

export default function BeneficiariesClient({ initialData, initialStats }: { initialData: any[], initialStats: any }) {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredData = data.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Beneficiaries</h1>
          <p className="text-gray-500">Digital register - no more paper or Excel</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <Upload className="w-4 h-4" />
            Bulk Upload
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Download Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-[#0EA5E9] rounded-lg hover:bg-[#0284c7]">
            <Plus className="w-4 h-4" />
            Add Beneficiary
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Beneficiaries" 
          value={initialStats.total} 
          icon={Users}
          color="bg-[#0EA5E9]" // Blue
        />
        <StatsCard 
          title="Children" 
          value={initialStats.children} 
          icon={Baby}
          color="bg-[#0284c7]" // Darker Blue
        />
        <StatsCard 
          title="Women" 
          value={initialStats.women} 
          icon={User}
          color="bg-[#0369a1]" // Even darker blue per image roughly
        />
        <StatsCard 
          title="Elderly" 
          value={initialStats.elderly} 
          icon={Activity}
          color="bg-[#075985]" // Darkest blue
        />
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search beneficiaries..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-white text-gray-600 min-w-[150px]"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">Category</option>
          <option value="Child">Children</option>
          <option value="Women">Women</option>
          <option value="Elderly">Elderly</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Age/Gender</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Project</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Registered</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.age} / {item.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <CategoryBadge category={item.category} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.project || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(item.registeredAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                       <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  No beneficiaries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon, color }: any) {
  return (
    <div className={`${color} text-white rounded-xl p-6 relative overflow-hidden`}>
      <div className="relative z-10">
        <p className="text-blue-100 text-sm font-medium mb-2">{title}</p>
        <h3 className="text-4xl font-bold">{value}</h3>
      </div>
      <Icon className="absolute right-4 bottom-4 w-20 h-20 text-white opacity-10" />
    </div>
  );
}

function CategoryBadge({ category }: { category: string }) {
  const styles: Record<string, string> = {
    'Child': 'bg-blue-100 text-blue-800',
    'Women': 'bg-purple-100 text-purple-800', // Assuming women purple? Image shows light blue actually.
    // Image shows: Child -> Blueish, Women -> Blueish, Elederly -> Blueish. All seem consistent light blue.
    'Elderly': 'bg-blue-100 text-blue-800',
    'Other': 'bg-gray-100 text-gray-800'
  };
  
  // Actually image shows customized colors:
  // Child: Blue-100
  // Women: Blue-100
  // Elderly: Blue-100
  // I will just use blue uniformly as per image.
  
  return (
    <span className="px-3 py-1 bg-blue-100 text-[#0EA5E9] text-xs font-medium rounded-full">
      {category}
    </span>
  );
}
