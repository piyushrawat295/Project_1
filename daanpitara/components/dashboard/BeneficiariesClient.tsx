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

import { createBeneficiary } from "@/actions/ngo-features";
import { useRouter } from "next/navigation";

export default function BeneficiariesClient({ initialData, initialStats, projects }: { initialData: any[], initialStats: any, projects: any[] }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    category: "",
    projectId: "",
    location: "",
    phone: "",
    notes: ""
  });

  const filteredData = data.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
       const result = await createBeneficiary(formData);
       if (result.success) {
           setIsModalOpen(false);
           setFormData({ name: "", age: "", gender: "", category: "", projectId: "", location: "", phone: "", notes: "" });
           router.refresh(); // Refresh to update list
           // Ideally we should also update local state 'data' optimistically or re-fetch, but refresh works for server components
           alert("Beneficiary added successfully!");
       } else {
           alert("Failed: " + result.error);
       }
    } catch (err) {
        console.error(err);
        alert("An error occurred.");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 space-y-8 relative">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Beneficiaries</h1>
          <p className="text-gray-500">Digital register - no more paper or Excel</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsBulkUploadOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Upload className="w-4 h-4" />
            Bulk Upload
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Download Report
          </button>
          <button 
             onClick={() => setIsModalOpen(true)}
             className="flex items-center gap-2 px-4 py-2 text-white bg-[#0EA5E9] rounded-lg hover:bg-[#0284c7]"
          >
            <Plus className="w-4 h-4" />
            Add Beneficiary
          </button>
        </div>
      </div>

      {/* Stats Cards and Filter/Search sections code remains same... Reuse existing from original file here or ensure they are present */}
      {/* For brevity of replace tool, I am assuming this block replaces the main content up to result map. 
          But wait, the replace tool replaces CONTIGUOUS block. I should be careful not to delete sections I want to keep.
          I will rewrite the whole component body to be safe or use multiple chunks if I can pinpoint lines exactly.
          Since I need to wrap everything in `relative` for modal and add modal HTML at end, I better rewrite the return statement.
       */}
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Beneficiaries" 
          value={initialStats?.total || 0} 
          icon={Users}
          color="bg-[#0EA5E9]" 
        />
        <StatsCard 
          title="Children" 
          value={initialStats?.children || 0} 
          icon={Baby}
          color="bg-[#0284c7]"
        />
        <StatsCard 
          title="Women" 
          value={initialStats?.women || 0} 
          icon={User}
          color="bg-[#0369a1]" 
        />
        <StatsCard 
          title="Elderly" 
          value={initialStats?.elderly || 0} 
          icon={Activity}
          color="bg-[#075985]" 
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

      {/* Add Beneficiary Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
           <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold text-gray-900">Add New Beneficiary</h2>
                 <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                    <Plus className="w-6 h-6 rotate-45" />
                 </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                       <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                       <input required type="number" name="age" value={formData.age} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                       <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none">
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                       </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                       <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none">
                          <option value="">Select Category</option>
                          <option value="Child">Child</option>
                          <option value="Women">Women</option>
                          <option value="Elderly">Elderly</option>
                          <option value="Other">Individual</option>
                       </select>
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Link to Project</label>
                    <select name="projectId" value={formData.projectId} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none">
                       <option value="">Select a Project</option>
                       {projects.map(p => (
                          <option key={p.id} value={p.id}>{p.title}</option>
                       ))}
                    </select>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                       <input name="location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                       <input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" />
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={3} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none"></textarea>
                 </div>

                 <div className="flex gap-3 pt-4 border-t">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-[#0EA5E9] text-white rounded-lg hover:bg-[#0284c7] disabled:opacity-50">
                       {isSubmitting ? "Adding..." : "Add Beneficiary"}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {/* Bulk Upload Modal */}
      {isBulkUploadOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md text-center">
                  <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Bulk Upload</h2>
                      <button onClick={() => setIsBulkUploadOpen(false)} className="text-gray-500 hover:text-gray-700">
                          <Plus className="w-6 h-6 rotate-45" />
                      </button>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 mb-6 flex flex-col items-center justify-center">
                      <Upload className="w-12 h-12 text-gray-400 mb-4" />
                      <p className="text-gray-600 mb-4">Upload an Excel file with beneficiary data</p>
                      <button className="px-6 py-2 bg-[#0EA5E9] text-white rounded-lg hover:bg-[#0284c7]">
                          Choose File
                      </button>
                      <p className="text-xs text-gray-400 mt-4">Supported format: .xlsx, .xls</p>
                  </div>
              </div>
          </div>
      )}
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
