"use client";

import { useState } from "react";
import { 
  Search, 
  Upload, 
  Folder, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  List, 
  Grid,
  Eye,
  Download,
  Trash2,
  File,
  Plus,
  X
} from "lucide-react";


import { createRecord, deleteRecord } from "@/actions/ngo-features";
import { useRouter } from "next/navigation";

export default function RecordsClient({ initialData, initialStats }: { initialData: any[], initialStats: any }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [view, setView] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
      title: "",
      type: "Records",
      category: "Reports",
      description: "",
      url: "" 
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
          const result = await createRecord(formData);
          if (result.success) {
              setIsModalOpen(false);
              setFormData({ 
                  title: "",
                  type: "Records",
                  category: "Reports",
                  description: "",
                  url: ""
              });
              router.refresh();
              alert("Record uploaded successfully!");
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
      if(!confirm("Are you sure you want to delete this record?")) return;
      try {
          const result = await deleteRecord(id);
          if (result.success) {
              router.refresh();
              alert("Record deleted successfully");
          } else {
              alert("Failed to delete: " + result.error);
          }
      } catch (err) {
          console.error(err);
          alert("An error occurred");
      }
  };


  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8 relative">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Records & Documents</h1>
          <p className="text-gray-500">Centralized digital repository</p>
        </div>
        <div className="flex gap-2">
           <div className="flex bg-white border border-gray-200 rounded-lg p-1">
              <button 
                onClick={() => setView('grid')}
                className={`p-2 rounded ${view === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                  <Grid className="w-4 h-4" />
              </button>
               <button 
                onClick={() => setView('list')}
                className={`p-2 rounded ${view === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                  <List className="w-4 h-4" />
              </button>
           </div>
          <button 
             onClick={() => setIsModalOpen(true)}
             className="flex items-center gap-2 px-4 py-2 text-white bg-[#0EA5E9] rounded-lg hover:bg-[#0284c7]"
          >
            <Upload className="w-4 h-4" />
            Upload Record
          </button>
        </div>
      </div>

       {/* Stats Cards */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Records" 
          value={initialStats.total} 
          icon={Folder}
          color="bg-[#0EA5E9]" 
        />
        <StatsCard 
          title="Documents" 
          value={initialStats.documents} 
          icon={FileText}
          color="bg-[#0284c7]"
        />
        <StatsCard 
          title="Images" 
          value={initialStats.images} 
          icon={ImageIcon}
          color="bg-[#0369a1]"
        />
        <StatsCard 
          title="Videos" 
          value={initialStats.videos} 
          icon={Video}
          color="bg-[#075985]"
        />
      </div>

       {/* Filters */}
       <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search records..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-white text-gray-600 min-w-[150px]"
        >
          <option value="All">Category</option>
          <option value="Report">Reports</option>
          <option value="Project">Projects</option>
          <option value="Event">Events</option>
        </select>
      </div>

       {/* Records Grid */}
       <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'}`}>
           {filteredData.map((record) => (
               <RecordCard 
                  key={record.id} 
                  record={record} 
                  view={view} 
                  onDelete={() => handleDelete(record.id)}
                  onView={() => setSelectedRecord(record)}
               />
           ))}
           {filteredData.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-500">
                  No records found.
              </div>
           )}
       </div>

       {/* Upload Record Modal */}
       {isModalOpen && (
           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
               <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
                   <div className="flex justify-between items-center mb-6">
                       <h2 className="text-xl font-bold text-gray-900">Upload New Record</h2>
                       <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                           <Plus className="w-6 h-6 rotate-45" />
                       </button>
                   </div>
                   <form onSubmit={handleSubmit} className="space-y-4">
                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                           <input required name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" placeholder="Enter record title" />
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                               <select name="type" value={formData.type} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none">
                                   <option value="Records">Records</option>
                                   <option value="Invoices">Invoices</option>
                                   <option value="Media">Media</option>
                               </select>
                           </div>
                           <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                               <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none">
                                   <option value="Reports">Reports</option>
                                   <option value="Projects">Projects</option>
                                   <option value="Events">Events</option>
                                   <option value="Finance">Finance</option>
                               </select>
                           </div>
                       </div>

                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                           <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0EA5E9] outline-none" placeholder="Brief description of the record"></textarea>
                       </div>

                       <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 mb-6 flex flex-col items-center justify-center cursor-not-allowed bg-gray-50">
                            {/* Mock Upload Field */}
                            <Upload className="w-10 h-10 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Click to upload (Mock)</p>
                            <p className="text-xs text-gray-400 mt-1">PDF, DOC, JPG, PNG (Max 100MB)</p>
                       </div>

                       <div className="flex gap-3 pt-4 border-t">
                           <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                           <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-[#0EA5E9] text-white rounded-lg hover:bg-[#0284c7] disabled:opacity-50">
                               {isSubmitting ? "Uploading..." : "Upload Record"}
                           </button>
                       </div>
                   </form>
               </div>
           </div>
       )}

       {/* View Record Modal */}
       {selectedRecord && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
               <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative">
                   <button 
                       onClick={() => setSelectedRecord(null)} 
                       className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                   >
                       <X className="w-5 h-5 text-gray-500" />
                   </button>
                   
                   <div className="mb-6 flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                             <FileText className="w-6 h-6" />
                        </div>
                        <div>
                             <h2 className="text-xl font-bold text-gray-900">{selectedRecord.name}</h2>
                             <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-semibold">{selectedRecord.category || "General"}</span>
                        </div>
                   </div>

                   <div className="space-y-4 mb-8">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Description</p>
                            <p className="text-gray-900">{selectedRecord.description || "No description provided."}</p>
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Date</p>
                                <p className="font-medium text-gray-900">{new Date(selectedRecord.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Size</p>
                                <p className="font-medium text-gray-900">2.5 MB (Mock)</p>
                            </div>
                        </div>
                   </div>

                   <div className="flex gap-3 border-t border-gray-100 pt-6">
                       <button className="flex-1 py-2.5 bg-[#0EA5E9] text-white rounded-xl font-medium hover:bg-[#0284c7] flex items-center justify-center gap-2">
                           <Download className="w-4 h-4" />
                           Download
                       </button>
                       <button onClick={() => setSelectedRecord(null)} className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50">
                           Close
                       </button>
                   </div>
               </div>
           </div>
       )}
    </div>
  );
}

function StatsCard({ title, value, icon: Icon, color }: any) {
  return (
    <div className={`${color} text-white rounded-xl p-6 relative overflow-hidden flex items-center justify-between`}>
      <div className="relative z-10">
         <Icon className="w-8 h-8 mb-3 opacity-80" />
         <p className="text-blue-100 text-sm font-medium mb-1">{title}</p>
      </div>
       <div className="bg-white/20 w-12 h-12 rounded-lg backdrop-blur-sm flex items-center justify-center">
         <span className="text-2xl font-bold">{value}</span>
      </div>
    </div>
  );
}

function RecordCard({ record, view, onDelete, onView }: { record: any, view: string, onDelete: () => void, onView: () => void }) {
    // Infer icon from type
    let Icon = FileText;
    let iconBg = "bg-blue-600";
    if (record.type === 'image' || record.url?.match(/\.(jpg|png|webp)$/i)) { Icon = ImageIcon; iconBg = "bg-green-600"; }
    if (record.type === 'video' || record.url?.match(/\.(mp4|mov)$/i)) { Icon = Video; iconBg = "bg-red-600"; }
    
    // Format data
    const date = new Date(record.createdAt).toLocaleDateString();
    const category = record.category || "Reports"; 

    if (view === 'list') {
       return (
            <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
               <div className={`w-12 h-12 rounded-lg ${iconBg} bg-opacity-10 flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${iconBg.replace('bg-', 'text-')}`} />
               </div>
               <div className="flex-1 min-w-0">
                   <h3 className="font-bold text-gray-900 truncate">{record.name}</h3>
                   <p className="text-xs text-gray-500">{record.description || "No description"}</p>
               </div>
               <div className="text-right text-sm text-gray-500">
                   <p>{date}</p>
               </div>
               <div className="flex gap-2">
                   <button onClick={onView} className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"><Eye className="w-4 h-4" /></button>
                   <a href={record.url} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 flex items-center justify-center"><Download className="w-4 h-4" /></a>
                   <button onClick={onDelete} className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
               </div>
            </div>
       )
    }

    return (
        <div className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-lg ${iconBg} bg-opacity-10 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${iconBg.replace('bg-', 'text-')}`} />
                </div>
                <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded">{category}</span>
            </div>

            <h3 className="font-bold text-gray-900 mb-1 truncate" title={record.name}>{record.name}</h3>
            <p className="text-xs text-gray-500 mb-4 h-8 overflow-hidden">{record.description || "Comprehensive annual report"}</p>

            <div className="flex justify-between items-center text-xs text-gray-500 mb-6 border-t border-gray-50 pt-4">
               <span>{date}</span>
            </div>

            <div className="flex gap-2">
                <button onClick={onView} className="flex-1 py-2 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-blue-100">
                    <Eye className="w-3.5 h-3.5" /> View
                </button>
                 <a href={record.url} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 bg-gray-50 text-gray-600 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100">
                    <Download className="w-3.5 h-3.5" /> Download
                </a>
                 <button onClick={onDelete} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    )
}
