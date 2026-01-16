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
  File
} from "lucide-react";

export default function RecordsClient({ initialData, initialStats }: { initialData: any[], initialStats: any }) {
  const [data, setData] = useState(initialData);
  const [view, setView] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8">
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
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-[#0EA5E9] rounded-lg hover:bg-[#0284c7]">
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
               <RecordCard key={record.id} record={record} view={view} />
           ))}
           {filteredData.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-500">
                  No records found.
              </div>
           )}
       </div>
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

function RecordCard({ record, view }: { record: any, view: string }) {
    // Infer icon from type
    let Icon = FileText;
    let iconBg = "bg-blue-600";
    if (record.type === 'image' || record.url.match(/\.(jpg|png|webp)$/i)) { Icon = ImageIcon; iconBg = "bg-green-600"; }
    if (record.type === 'video' || record.url.match(/\.(mp4|mov)$/i)) { Icon = Video; iconBg = "bg-red-600"; }
    
    // Mock data for UI if missing in DB
    const size = "2.5 MB"; // Mock
    const date = new Date(record.createdAt).toLocaleDateString();
    const author = "By Admin"; // Mock
    const category = "Reports"; // Mock or map from type

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
                   <p>{size}</p>
               </div>
               <div className="flex gap-2">
                   <button className="p-2 text-blue-600 bg-blue-50 rounded-lg"><Eye className="w-4 h-4" /></button>
                   <button className="p-2 text-gray-600 bg-gray-50 rounded-lg"><Download className="w-4 h-4" /></button>
                   <button className="p-2 text-red-600 bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
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
            <p className="text-xs text-gray-500 mb-4 h-8 overflow-hidden">{record.description || "Comprehensive annual report for FY 2023"}</p>

            <div className="flex justify-between items-center text-xs text-gray-500 mb-6 border-t border-gray-50 pt-4">
               <span>{date}</span>
               <span>{size}</span>
               <span>{author}</span>
            </div>

            <div className="flex gap-2">
                <button className="flex-1 py-2 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-blue-100">
                    <Eye className="w-3.5 h-3.5" /> View
                </button>
                 <button className="flex-1 py-2 bg-gray-50 text-gray-600 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100">
                    <Download className="w-3.5 h-3.5" /> Download
                </button>
                 <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    )
}
