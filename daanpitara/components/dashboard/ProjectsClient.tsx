"use client";

import { useState } from "react";
import { 
  Plus,
  Users,
  Target,
  Calendar,
  DollarSign,
  TrendingUp,
  Eye,
  Trash2,
  FileText,
  X 
} from "lucide-react";
import { motion } from "framer-motion";

import { createProject, deleteProject } from "@/actions/ngo-features";
import { useRouter } from "next/navigation";

export default function ProjectsClient({ initialData, initialStats }: { initialData: any[], initialStats: any }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
      title: "",
      startDate: "",
      endDate: "",
      sector: "Education",
      location: "",
      targetBeneficiaries: "",
      budget: "",
      fundingStatus: "Seeking funds"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
          const result = await createProject(formData);
          if (result.success) {
              setIsModalOpen(false);
              setFormData({  title: "", startDate: "", endDate: "", sector: "Education", location: "", targetBeneficiaries: "", budget: "", fundingStatus: "Seeking funds" });
              router.refresh();
              alert("Project created successfully!");
          } else {
              alert("Failed: " + result.error);
          }
      } catch (err) {
          console.error(err);
      } finally {
          setIsSubmitting(false);
      }
  };

  const handleDelete = async (id: number) => {
      if(!confirm("Are you sure you want to delete this project?")) return;
      try {
          const result = await deleteProject(id);
          if (result.success) {
              router.refresh();
              alert("Project deleted successfully");
          } else {
              alert("Failed to delete: " + result.error);
          }
      } catch (err) {
          console.error(err);
          alert("An error occurred");
      }
  };

  return (
    <div className="p-8 space-y-8 relative">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects & Programs</h1>
          <p className="text-gray-500">Core work - everything revolves around this</p>
        </div>
        <button 
           onClick={() => setIsModalOpen(true)}
           className="flex items-center gap-2 px-4 py-2 text-white bg-[#0EA5E9] rounded-lg hover:bg-[#0284c7]"
        >
          <Plus className="w-4 h-4" />
          Create New Project
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Projects" 
          value={initialStats.total} 
          subtitle="All Time"
          color="bg-[#0EA5E9]" 
        />
        <StatsCard 
          title="Active Projects" 
          value={initialStats.active} 
          subtitle="Currently Running"
          color="bg-[#0284c7]"
        />
        <StatsCard 
          title="Seeking Funding" 
          value={initialStats.seeking_funding} 
          subtitle="Open for Grants"
          color="bg-[#0369a1]"
        />
        <StatsCard 
           // Format budget
          title="Total Budget" 
          value={`₹${(initialStats.totalBudget / 100000).toFixed(1)}L`} 
           subtitle="Across all active"
          color="bg-[#1e293b]" // Dark blue/slate
        />
      </div>

       {/* Projects Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((project) => (
            <ProjectCard 
                key={project.id} 
                project={project} 
                onDelete={() => handleDelete(project.id)}
                onView={() => setSelectedProject(project)}
            />
          ))}
          {data.length === 0 && (
             <div className="col-span-2 text-center py-12 bg-white rounded-xl border border-gray-100 text-gray-500">
                No active projects found. Start by creating one!
             </div>
          )}
       </div>

       {/* Create New Project Modal */}
       {isModalOpen && (
           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
               <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                   <div className="flex justify-between items-center mb-6">
                       <h2 className="text-xl font-bold text-gray-900">Create New Project</h2>
                       <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                           <Plus className="w-6 h-6 rotate-45" />
                       </button>
                   </div>
                   <form onSubmit={handleSubmit} className="space-y-4">
                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
                           <input required name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" />
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                               <input required type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" />
                           </div>
                            <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                               <input required type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" />
                           </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1">Theme *</label>
                               <select name="sector" value={formData.sector} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none">
                                   <option value="Education">Education</option>
                                   <option value="Health">Health</option>
                                   <option value="Livelihood">Livelihood</option>
                                   <option value="Environment">Environment</option>
                               </select>
                           </div>
                            <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                               <input required name="location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" />
                           </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1">Target Beneficiaries</label>
                               <input type="number" name="targetBeneficiaries" value={formData.targetBeneficiaries} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" />
                           </div>
                            <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1">Budget (₹) *</label>
                               <input required type="number" name="budget" value={formData.budget} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" />
                           </div>
                       </div>

                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Funding Status</label>
                           <select name="fundingStatus" value={formData.fundingStatus} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none">
                               <option value="Seeking funds">Seeking funds</option>
                               <option value="Funded">Funded</option>
                               <option value="Partially Funded">Partially Funded</option>
                           </select>
                       </div>

                       <div className="flex gap-3 pt-4 border-t">
                           <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                           <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-[#0EA5E9] text-white rounded-lg hover:bg-[#0284c7] disabled:opacity-50">
                               {isSubmitting ? "Creating..." : "Create Project"}
                           </button>
                       </div>
                   </form>
               </div>
           </div>
       )}

       {/* View Project Modal */}
       {selectedProject && (
           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
               <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
                   <button 
                       onClick={() => setSelectedProject(null)} 
                       className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                   >
                       <X className="w-5 h-5 text-gray-500" />
                   </button>
                   
                   <div className="mb-6">
                       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedProject.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                           {selectedProject.status}
                       </span>
                       <h2 className="text-2xl font-bold text-gray-900 mt-2">{selectedProject.title}</h2>
                       <p className="text-gray-500">{selectedProject.sector}</p>
                   </div>

                   <div className="grid grid-cols-2 gap-6 mb-6">
                       <div>
                           <p className="text-sm text-gray-500 mb-1">Location</p>
                           <p className="font-medium">{selectedProject.location}</p>
                       </div>
                       <div>
                           <p className="text-sm text-gray-500 mb-1">Duration</p>
                           <p className="font-medium">
                               {new Date(selectedProject.startDate).toLocaleDateString()} - {selectedProject.endDate ? new Date(selectedProject.endDate).toLocaleDateString() : 'Ongoing'}
                           </p>
                       </div>
                       <div>
                           <p className="text-sm text-gray-500 mb-1">Target Beneficiaries</p>
                           <p className="font-medium">{selectedProject.beneficiariesTargeted}</p>
                       </div>
                       <div>
                           <p className="text-sm text-gray-500 mb-1">Total Budget</p>
                           <p className="font-medium">₹{selectedProject.totalBudget?.toLocaleString()}</p>
                       </div>
                        <div>
                           <p className="text-sm text-gray-500 mb-1">Raised Amount</p>
                           <p className="font-medium">₹{selectedProject.raisedAmount?.toLocaleString()}</p>
                       </div>
                   </div>

                   {/* Progress Bar in View Modal */}
                   <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                             <span className="text-gray-500">Funding Progress</span>
                             <span className="font-semibold">{Math.round((selectedProject.raisedAmount / selectedProject.totalBudget) * 100)}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                             <div className="h-full bg-blue-600 rounded-full" style={{ width: `${Math.min((selectedProject.raisedAmount / selectedProject.totalBudget) * 100, 100)}%` }} />
                        </div>
                   </div>

                   <div className="flex justify-end pt-6 border-t">
                       <button onClick={() => setSelectedProject(null)} className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                           Close
                       </button>
                   </div>
               </div>
           </div>
       )}

    </div>
  );
}

function StatsCard({ title, value, subtitle, color }: any) {
  return (
    <div className={`${color} text-white rounded-xl p-6 relative overflow-hidden flex flex-col justify-between h-[140px]`}>
       <div>
         <p className="text-blue-100 text-sm font-medium mb-1">{title}</p>
         <h3 className="text-4xl font-bold">{value}</h3>
       </div>
       <p className="text-xs text-blue-200 mt-2 opacity-80">{subtitle}</p>
    </div>
  );
}

function ProjectCard({ project, onDelete, onView }: { project: any, onDelete: () => void, onView: () => void }) {
  const percentRaised = project.totalBudget > 0 ? (project.raisedAmount / project.totalBudget) * 100 : 0;
  
  // Status pill color
  let statusColor = "bg-blue-100 text-blue-700";
  let statusText = project.status;
  // User image shows "Funded" and "Seeking Funding" pills.
  // DB status: active, completed, seeking_funding.
  if (project.status === 'seeking_funding') { statusColor = "bg-red-100 text-red-700"; statusText="Seeking Funding"; }
  if (project.status === 'active' && percentRaised < 100) { statusColor = "bg-yellow-100 text-yellow-700"; statusText="Partially Funded"; }
  if (project.status === 'active' && percentRaised >= 100) { statusColor = "bg-green-100 text-green-700"; statusText="Funded"; }

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">{project.title}</h3>
          <p className="text-sm text-gray-500">{project.sector} • {project.location}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
           {statusText}
        </span>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500">Progress</span>
          <span className="font-semibold text-gray-900">{Math.round(percentRaised)}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
             className="h-full bg-[#0052cc] rounded-full" 
             style={{ width: `${Math.min(percentRaised, 100)}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Beneficiaries</p>
            <p className="text-sm font-semibold text-gray-900">{project.beneficiariesTargeted || 0}</p>
          </div>
        </div>
         <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Budget</p>
            <p className="text-sm font-semibold text-gray-900">₹{(project.totalBudget / 1000).toFixed(1)}K</p>
          </div>
        </div>
         <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Duration</p>
            <p className="text-sm font-semibold text-gray-900">
               {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>

      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
        <button 
            onClick={onView}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          View Details
        </button>
         <button 
            onClick={onDelete}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>
    </div>
  );
}
