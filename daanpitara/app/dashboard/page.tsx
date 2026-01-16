"use client";

import Link from "next/link";
import { 
  CheckCircle2, 
  AlertCircle, 
  UploadCloud, 
  FileText, 
  HandHeart, 
  Megaphone, 
  ArrowRight, 
  Clock, 
  TrendingUp,
  Eye,
  Users,
  MoreHorizontal,
  FileIcon,
  MessageSquare
} from "lucide-react";
import Image from "next/image";

export default function Dashboard() {

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT COLUMN (2/3) */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Profile Completion Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Circle Graph */}
              <div className="relative w-36 h-36 flex-shrink-0">
                 <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke="#EFF6FF"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke="#2563EB"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={376.99}
                    strokeDashoffset={376.99 - (376.99 * 60) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold text-blue-600">60%</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 w-full space-y-4">
                 <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Profile Completion</h3>
                      <p className="text-sm text-gray-500">3 of 5 steps completed</p>
                    </div>
                    <button className="bg-[#1e40af] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors flex items-center gap-2">
                       Complete Profile <ArrowRight className="w-4 h-4" />
                    </button>
                 </div>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                       <CheckCircle2 className="w-5 h-5 text-green-500" /> Basic Information
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                       <CheckCircle2 className="w-5 h-5 text-green-500" /> NGO Details
                    </div>
                     <div className="flex items-center gap-2 text-sm text-gray-600">
                       <CheckCircle2 className="w-5 h-5 text-green-500" /> Contact Information
                    </div>
                     <div className="flex items-center gap-2 text-sm text-gray-600">
                       <Clock className="w-5 h-5 text-yellow-500" /> Document Upload
                    </div>
                     <div className="flex items-center gap-2 text-sm text-gray-600 opacity-50">
                       <Clock className="w-5 h-5 text-yellow-500" /> Verification Complete
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Card 1 */}
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group cursor-pointer">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                     <UploadCloud className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">Upload New Document</h4>
                  <p className="text-sm text-gray-500 mb-4">Add verification documents</p>
                  <span className="text-sm text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </span>
               </div>
               
                {/* Card 2 */}
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group cursor-pointer">
                  <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg shadow-cyan-200 group-hover:scale-110 transition-transform">
                     <HandHeart className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">Explore CSR Opportunities</h4>
                  <p className="text-sm text-gray-500 mb-4">Find corporate partners</p>
                  <span className="text-sm text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </span>
               </div>

                {/* Card 3 */}
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group cursor-pointer">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                     <FileText className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">Submit Proposal</h4>
                  <p className="text-sm text-gray-500 mb-4">Create project proposals</p>
                   <span className="text-sm text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </span>
               </div>

                {/* Card 4 */}
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group cursor-pointer">
                  <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg shadow-cyan-200 group-hover:scale-110 transition-transform">
                     <TrendingUp className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">Start Fundraising</h4>
                  <p className="text-sm text-gray-500 mb-4">Launch a new campaign</p>
                   <span className="text-sm text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </span>
               </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
               {[
                 { title: "Document Verified", desc: "Your 80G Certificate has been verified", time: "2 hours ago", icon: CheckCircle2, color: "text-green-500 bg-green-50" },
                 { title: "New Message", desc: "Message from TechCorp CSR Team", time: "5 hours ago", icon: MessageSquare, color: "text-blue-500 bg-blue-50" },
                 { title: "CSR Opportunity Match", desc: "New opportunity matches your profile", time: "1 day ago", icon: HandHeart, color: "text-purple-500 bg-purple-50" },
                 { title: "Profile Updated", desc: "Organization details updated", time: "2 days ago", icon: Users, color: "text-orange-500 bg-orange-50" },
                  { title: "Document Uploaded", desc: "Registration Certificate uploaded", time: "3 days ago", icon: FileText, color: "text-indigo-500 bg-indigo-50" },
               ].map((item, i) => (
                 <div key={i} className="flex gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${item.color}`}>
                       <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                       <h5 className="text-sm font-bold text-gray-900">{item.title}</h5>
                       <p className="text-sm text-gray-500">{item.desc}</p>
                       <span className="text-xs text-gray-400 mt-1 block">{item.time}</span>
                    </div>
                 </div>
               ))}
               <button className="w-full py-3 border border-gray-200 rounded-xl text-gray-500 text-sm font-medium hover:bg-gray-50 transition-colors">
                  View All Activity
               </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (1/3) */}
        <div className="space-y-6">
          
           {/* Documents Card */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                       <div className="bg-blue-500 p-1.5 rounded-lg">
                          <FileIcon className="w-4 h-4 text-white" />
                       </div>
                       Documents
                    </h3>
                    <p className="text-xs text-gray-500 ml-9">6 total uploaded</p>
                 </div>
              </div>
              
              <div className="space-y-3">
                 <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700 text-sm font-medium">
                       <CheckCircle2 className="w-4 h-4" /> Verified
                    </div>
                    <span className="font-bold text-green-700">4</span>
                 </div>
                 <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2 text-yellow-700 text-sm font-medium">
                       <Clock className="w-4 h-4" /> Pending
                    </div>
                    <span className="font-bold text-yellow-700">2</span>
                 </div>
                 <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-2 text-red-700 text-sm font-medium">
                       <AlertCircle className="w-4 h-4" /> Missing
                    </div>
                    <span className="font-bold text-red-700">1</span>
                 </div>
              </div>

              <div className="mt-6 space-y-3">
                 <button className="w-full py-2.5 bg-[#3b82f6] hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <UploadCloud className="w-4 h-4" /> Upload Document
                 </button>
                 <button className="w-full py-2.5 border border-blue-200 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium transition-colors">
                    View All
                 </button>
              </div>
           </div>

           {/* Messages Card */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <div className="bg-blue-500 p-1.5 rounded-lg">
                       <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    Messages
                 </h3>
                 <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">2 new</span>
              </div>

              <div className="space-y-4">
                 {[
                    { name: "TechCorp CSR", msg: "Interested in partnership...", time: "2h ago", img: "https://ui-avatars.com/api/?name=TC&background=0D8ABC&color=fff" },
                    { name: "DaanPitara Team", msg: "Your verification is complete!", time: "1d ago", img: "/Logo.png" },
                    { name: "Global Foundation", msg: "Thank you for your proposal...", time: "2d ago", img: "https://ui-avatars.com/api/?name=GF&background=random" }
                 ].map((msg, i) => (
                    <div key={i} className="flex gap-3 items-start pb-4 border-b border-gray-50 last:border-none last:pb-0">
                       <Image src={msg.img} width={32} height={32} alt={msg.name} className="rounded-lg object-cover bg-gray-100" />
                       <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-0.5">
                             <h5 className="text-xs font-bold text-gray-900 truncate">{msg.name}</h5>
                             <span className="text-[10px] text-gray-400">{msg.time}</span>
                          </div>
                          <p className="text-xs text-gray-600 truncate">{msg.msg}</p>
                       </div>
                    </div>
                 ))}
              </div>
              
              <button className="w-full mt-6 py-2.5 border border-blue-200 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium transition-colors">
                  View All
              </button>
           </div>

           {/* Quick Insights */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
               <h3 className="font-bold text-gray-900 mb-4">Quick Insights</h3>
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-blue-500 rounded-lg text-white">
                            <Users className="w-4 h-4" />
                         </div>
                         <div>
                            <p className="text-[10px] text-gray-500 uppercase font-semibold">Engagement</p>
                            <p className="text-lg font-bold text-gray-900">1.2K</p>
                         </div>
                      </div>
                      <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded">+12%</span>
                  </div>

                   <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-cyan-500 rounded-lg text-white">
                            <Eye className="w-4 h-4" />
                         </div>
                         <div>
                            <p className="text-[10px] text-gray-500 uppercase font-semibold">Profile Views</p>
                            <p className="text-lg font-bold text-gray-900">456</p>
                         </div>
                      </div>
                      <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded">+24%</span>
                  </div>

                   <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-blue-500 rounded-lg text-white">
                            <Megaphone className="w-4 h-4" />
                         </div>
                         <div>
                            <p className="text-[10px] text-gray-500 uppercase font-semibold">Campaigns</p>
                            <p className="text-lg font-bold text-gray-900">8</p>
                         </div>
                      </div>
                      <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded">+2</span>
                  </div>

                   <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-blue-600 rounded-lg text-white">
                            <TrendingUp className="w-4 h-4" />
                         </div>
                         <div>
                            <p className="text-[10px] text-gray-500 uppercase font-semibold">Growth</p>
                            <p className="text-lg font-bold text-gray-900">18%</p>
                         </div>
                      </div>
                      <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded">+5%</span>
                  </div>
               </div>
               
               <button className="w-full mt-6 py-2.5 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
                  View Detailed Analytics
               </button>
           </div>

        </div>
      </div>
    </div>
  );
}
