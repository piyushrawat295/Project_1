"use client";

import Link from "next/link";
import { 
  Plus, 
  Users, 
  UploadCloud, 
  FileText, 
  MoreHorizontal, 
  Calendar, 
  ChevronRight, 
  Trophy,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Activity,
  Layers,
  IndianRupee,
  ChevronDown
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface DashboardClientProps {
  data: {
    ngo: any;
    userName: string;
    completion: {
      score: number;
      steps: any;
    };
    docStats: {
      total: number;
      verified: number;
      pending: number;
      missing: number;
    };
    stats: {
      healthScore: number;
      totalBeneficiaries: number;
      activeProjects: number;
      fundsUtilized: number;
    };
    projects: any[];
    events: any[];
    activities: any[];     // Keep for legacy if needed, or remove
    messages: any[];       // Keep for header badges if needed
    unreadCount: number;
  };
}

export default function DashboardClient({ data }: DashboardClientProps) {
  const { ngo, userName, docStats, stats, projects, events } = data;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
          <p className="text-gray-500">Your NGO overview at a glance</p>
        </div>
        {/* User profile dropdown etc is usually in TopHeader, so skipping specific header controls here unless needed */}
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* Card 1: Health Score (Blue) */}
        <div className="bg-[#3b82f6] rounded-2xl p-6 text-white relative overflow-hidden">
           <div className="flex items-start justify-between relative z-10">
              <div>
                 <p className="text-blue-100 text-sm font-medium flex items-center gap-2">
                    <Activity className="w-4 h-4" /> NGO Health Score
                 </p>
                 <h2 className="text-4xl font-bold mt-2">{stats.healthScore}</h2>
                 <p className="text-blue-100 text-sm mt-1">Good</p>
              </div>
           </div>
           {/* Decor/Chart placeholder */}
           <div className="absolute right-0 bottom-0 opacity-10">
              <Activity className="w-32 h-32 transform translate-x-8 translate-y-8" />
           </div>
        </div>

        {/* Card 2: Beneficiaries (Tealish) */}
        <div className="bg-[#0ea5e9] rounded-2xl p-6 text-white relative overflow-hidden">
           <div className="flex items-start justify-between relative z-10">
              <div>
                 <p className="text-sky-100 text-sm font-medium flex items-center gap-2">
                    <Users className="w-4 h-4" /> Total Beneficiaries
                 </p>
                 <h2 className="text-4xl font-bold mt-2">{stats.totalBeneficiaries.toLocaleString()}</h2>
              </div>
           </div>
           <div className="absolute right-0 bottom-0 opacity-10">
              <Users className="w-32 h-32 transform translate-x-8 translate-y-8" />
           </div>
        </div>

        {/* Card 3: Active Projects (Darker Blue) */}
        <div className="bg-[#0284c7] rounded-2xl p-6 text-white relative overflow-hidden">
           <div className="flex items-start justify-between relative z-10">
              <div>
                 <p className="text-sky-100 text-sm font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Active Projects
                 </p>
                 <h2 className="text-4xl font-bold mt-2">{stats.activeProjects}</h2>
              </div>
           </div>
           <div className="absolute right-0 bottom-0 opacity-10">
              <Layers className="w-32 h-32 transform translate-x-8 translate-y-8" />
           </div>
        </div>

        {/* Card 4: Funds Utilized (Darkest Blue) */}
        <div className="bg-[#0f172a] rounded-2xl p-6 text-white relative overflow-hidden">
           <div className="flex items-start justify-between relative z-10">
              <div>
                 <p className="text-slate-300 text-sm font-medium flex items-center gap-2">
                    <IndianRupee className="w-4 h-4" /> Funds Utilized
                 </p>
                 <h2 className="text-3xl font-bold mt-2">{formatCurrency(stats.fundsUtilized)}</h2>
              </div>
           </div>
           {/* Simple chart line SVG */}
           <svg className="absolute bottom-0 left-0 w-full h-16 text-slate-700 opacity-50" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0,20 L0,10 Q25,18 50,5 T100,10 L100,20 Z" fill="currentColor" />
           </svg>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <Link href="/dashboard/projects/new" className="flex items-center justify-center gap-2 bg-white border border-gray-200 p-4 rounded-xl text-blue-600 font-medium hover:bg-blue-50 transition-colors shadow-sm">
            <Plus className="w-5 h-5" /> Add New Project
         </Link>
         <Link href="/dashboard/beneficiaries" className="flex items-center justify-center gap-2 bg-white border border-gray-200 p-4 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm">
            <Users className="w-5 h-5 text-gray-400" /> Register Beneficiaries
         </Link>
         <Link href="/dashboard/documents" className="flex items-center justify-center gap-2 bg-white border border-gray-200 p-4 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm">
            <UploadCloud className="w-5 h-5 text-gray-400" /> Upload Documents
         </Link>
         <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 p-4 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm">
            <FileText className="w-5 h-5 text-gray-400" /> Generate Report
         </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         
         {/* Left Column (2/3) */}
         <div className="xl:col-span-2 space-y-8">
            
            {/* Ongoing Projects */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Ongoing Projects</h3>
                  <Link href="/dashboard/projects" className="text-sm text-blue-600 font-medium flex items-center gap-1">
                     Manage Projects <ChevronDown className="w-4 h-4" />
                  </Link>
               </div>
               
               <div className="space-y-4">
                  {projects.length > 0 ? projects.map((project, i) => (
                     <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-lg">
                              {/* Simple icon or first letter */}
                              {project.title.charAt(0)}
                           </div>
                           <h4 className="font-semibold text-gray-900">{project.title}</h4>
                        </div>
                        <div className="flex items-center gap-4">
                           <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                              project.status === 'active' ? 'bg-blue-100 text-blue-700' : 
                              project.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                           }`}>
                              {project.status === 'active' ? 'In Progress' : project.status}
                           </span>
                           <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                     </div>
                  )) : (
                     <div className="text-center py-8 text-gray-500">No active projects yet.</div>
                  )}
               </div>
            </div>

            {/* Beneficiary Overview */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
               <h3 className="text-lg font-bold text-gray-900 mb-6">Beneficiary Overview</h3>
               <div className="flex flex-col md:flex-row gap-8">
                  <div className="space-y-4 flex-1">
                     <div className="flex items-center gap-3 text-gray-700">
                        <Users className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold">{stats.totalBeneficiaries.toLocaleString()}</span> Total Registered
                     </div>
                     <div className="flex items-center gap-3 text-gray-700">
                        <span className="w-2 h-2 rounded-full bg-yellow-400 ml-1.5 mr-1.5"></span>
                        <span className="font-semibold">780</span> Children
                     </div>
                     <div className="flex items-center gap-3 text-gray-700">
                         <span className="w-2 h-2 rounded-full bg-orange-400 ml-1.5 mr-1.5"></span>
                        <span className="font-semibold">320</span> Women
                     </div>
                     <div className="flex items-center gap-3 text-gray-700">
                         <span className="w-2 h-2 rounded-full bg-green-400 ml-1.5 mr-1.5"></span>
                        <span className="font-semibold">150</span> Elderly
                     </div>
                     <Link href="/dashboard/beneficiaries" className="text-blue-600 font-medium text-sm mt-4 inline-block">
                        View All Beneficiaries
                     </Link>
                  </div>
                  <div className="w-full md:w-48 h-32 md:h-auto bg-gray-200 rounded-xl overflow-hidden relative">
                     <Image 
                        src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop" 
                        alt="Beneficiaries" 
                        fill
                        className="object-cover"
                     />
                  </div>
               </div>
            </div>

            {/* Impact Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Latest Impact Summary</h3>
                  <button className="text-sm text-blue-600 font-medium flex items-center gap-1">
                     View Report <ChevronDown className="w-4 h-4" />
                  </button>
               </div>
               <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
                     <p className="text-sm text-gray-800">
                        <span className="font-bold text-blue-700">Education Project:</span> 200 Students Improved in Learning Levels
                     </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
                     <p className="text-sm text-gray-800">
                        <span className="font-bold text-green-700">Health Camp:</span> 500 People Received Medical Aid
                     </p>
                  </div>
               </div>
            </div>

         </div>

         {/* Right Sidebar (1/3) */}
         <div className="space-y-8">
            
            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
               <h3 className="text-lg font-bold text-gray-900 mb-6">Upcoming Events</h3>
               <div className="space-y-6">
                  {events.length > 0 ? events.map((event, i) => (
                     <div key={i} className="flex items-start gap-4">
                        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                           <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                           <h4 className="text-sm font-bold text-gray-900">{event.title}</h4>
                           <p className="text-xs text-gray-500 mt-1">{formatDate(event.date)}</p>
                        </div>
                     </div>
                  )) : (
                     <p className="text-sm text-gray-500">No upcoming events scheduled.</p>
                  )}
                  
                  <div className="flex gap-2 mt-4">
                     <button className="flex-1 bg-[#0ea5e9] text-white py-2 rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors">
                        Add Event
                     </button>
                     <button className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        View Calendar
                     </button>
                  </div>
               </div>
            </div>

            {/* Documents & Compliance */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
               <h3 className="text-lg font-bold text-gray-900 mb-6">Documents & Compliance</h3>
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                     <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-medium text-gray-700">80G Certificate</span>
                     </div>
                     <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                     <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">CSR-1 Form</span>
                     </div>
                     <span className="text-[10px] bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded">Expires Soon!</span>
                  </div>

                   <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                     <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Audit Report</span>
                     </div>
                     <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>

                  <button className="w-full bg-[#0ea5e9] text-white py-3 rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors mt-2 flex items-center justify-center gap-2">
                     <UploadCloud className="w-4 h-4" /> Upload More Docs
                  </button>
               </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
               <h3 className="text-lg font-bold text-gray-900 mb-6">Our Achievements</h3>
               <div className="bg-yellow-50 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-yellow-500">
                     <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                     <h4 className="font-bold text-gray-900 text-sm">Best NGO Award 2023</h4>
                     <p className="text-xs text-gray-500">Winner</p>
                  </div>
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}
