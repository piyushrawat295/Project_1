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

  const handleGenerateReport = () => {
      const headers = ["Metric", "Value"];
      const csvData = [
          ["Health Score", stats.healthScore],
          ["Total Beneficiaries", stats.totalBeneficiaries],
          ["Active Projects", stats.activeProjects],
          ["Funds Utilized", stats.fundsUtilized]
      ].map(row => row.join(","));

      const csvString = [headers.join(","), ...csvData].join("\n");
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `ngo_report_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
          <p className="text-gray-500">Your NGO overview at a glance</p>
        </div>
      </div>

      {/* Verification Status Banner */}
      {(!ngo.verified || docStats.pending > 0 || docStats.missing > 0) && (
        <div className="relative overflow-hidden bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl ${ngo.verified ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                {ngo.verified ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {ngo.verified ? "Profile Verified" : "Verification In Progress"} 
                  <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 uppercase tracking-wider">NGO ID: {ngo.registrationNumber || 'Pending'}</span>
                </h3>
                <p className="text-gray-500 mt-1 max-w-xl">
                  {ngo.verified 
                    ? "Great! Your NGO is fully verified. You can now access all fundraising and CSR features."
                    : `You have ${docStats.pending} documents under review and ${docStats.missing} documents missing. Complete your profile to unlock all features.`}
                </p>
                <div className="flex items-center gap-4 mt-4 text-sm font-medium">
                  <div className="flex items-center gap-1.5 text-green-600">
                    <CheckCircle2 className="w-4 h-4" /> {docStats.verified} Verified
                  </div>
                  <div className="flex items-center gap-1.5 text-orange-500">
                    <Clock className="w-4 h-4" /> {docStats.pending} Pending
                  </div>
                  <div className="flex items-center gap-1.5 text-red-500">
                    <AlertCircle className="w-4 h-4" /> {docStats.missing} Missing
                  </div>
                </div>
              </div>
            </div>
            
            {!ngo.verified && (
              <Link href="/onboarding">
                <button className="whitespace-nowrap px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all flex items-center gap-2">
                  Complete Verification <ChevronRight className="w-4 h-4" />
                </button>
              </Link>
            )}
          </div>
        </div>
      )}

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
         <button onClick={handleGenerateReport} className="flex items-center justify-center gap-2 bg-white border border-gray-200 p-4 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm btn-press">
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
                        <span className="font-semibold">{Math.floor(stats.totalBeneficiaries * 0.45).toLocaleString()}</span> Children
                     </div>
                     <div className="flex items-center gap-3 text-gray-700">
                         <span className="w-2 h-2 rounded-full bg-orange-400 ml-1.5 mr-1.5"></span>
                        <span className="font-semibold">{Math.floor(stats.totalBeneficiaries * 0.35).toLocaleString()}</span> Women
                     </div>
                     <div className="flex items-center gap-3 text-gray-700">
                         <span className="w-2 h-2 rounded-full bg-green-400 ml-1.5 mr-1.5"></span>
                        <span className="font-semibold">{Math.floor(stats.totalBeneficiaries * 0.20).toLocaleString()}</span> Elderly
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
                  <Link href="/dashboard/projects" className="text-sm text-blue-600 font-medium flex items-center gap-1 hover:underline">
                     View All Projects <ChevronRight className="w-4 h-4" />
                  </Link>
               </div>
               <div className="space-y-4">
                  {projects.length > 0 ? projects.slice(0, 2).map((project, idx) => (
                      <div key={idx} className={`${idx % 2 === 0 ? "bg-blue-50 border-blue-500" : "bg-green-50 border-green-500"} p-4 rounded-xl border-l-4`}>
                         <p className="text-sm text-gray-800">
                            <span className={`font-bold ${idx % 2 === 0 ? "text-blue-700" : "text-green-700"}`}>{project.title}:</span> {project.description?.substring(0, 80) || "Making a positive impact in the community."}...
                         </p>
                      </div>
                  )) : (
                      <div className="text-center py-4 text-gray-500">Add a project to see your impact summary.</div>
                  )}
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
                     <Link href="/dashboard/events/new" className="flex-1 text-center bg-[#0ea5e9] text-white py-2 rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors btn-press">
                        Add Event
                     </Link>
                     <Link href="/dashboard/events" className="flex-1 text-center border border-gray-200 text-gray-600 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors btn-press">
                        View Calendar
                     </Link>
                  </div>
               </div>
            </div>

            {/* Documents & Compliance */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
               <div className="flex justify-between items-center mb-6">
                   <h3 className="text-lg font-bold text-gray-900">Recent Documents</h3>
               </div>
               <div className="space-y-4">
                  {(data as any).recentDocuments?.length > 0 ? (data as any).recentDocuments.slice(0, 3).map((doc: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => window.open(`/api/documents/${doc.id}`, '_blank')}>
                         <div className="flex items-center gap-3">
                            {doc.status === 'verified' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : 
                             doc.status === 'pending' ? <Clock className="w-5 h-5 text-blue-500" /> : 
                             <AlertCircle className="w-5 h-5 text-red-500" />}
                            <span className="text-sm font-medium text-gray-700 truncate max-w-[150px]">{doc.name}</span>
                         </div>
                         <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                  )) : (
                      <div className="text-center py-4 text-xs text-gray-400">No documents uploaded yet.</div>
                  )}

                  <Link href="/dashboard/documents" className="w-full bg-[#0ea5e9] text-white py-3 rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors mt-2 flex items-center justify-center gap-2 btn-press shadow-sm">
                     <UploadCloud className="w-4 h-4" /> Go to Documents
                  </Link>
               </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
               <h3 className="text-lg font-bold text-gray-900 mb-6">Our Achievements</h3>
               
               {(data as any).achievements?.length > 0 ? (data as any).achievements.map((ach: any, i: number) => (
                   <div key={i} className="bg-yellow-50 rounded-xl p-4 flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-yellow-500 shrink-0">
                         <Trophy className="w-6 h-6" />
                      </div>
                      <div>
                         <h4 className="font-bold text-gray-900 text-sm">{ach.title}</h4>
                         <p className="text-xs text-gray-500">{ach.year || 'Winner'}</p>
                      </div>
                   </div>
               )) : (
                   <div className="text-center py-6 text-gray-400 text-sm">No awards registered yet.</div>
               )}
               <Link href="/dashboard/awards" className="text-xs text-blue-600 hover:underline mt-2 inline-block">Manage Awards</Link>
            </div>

         </div>
      </div>
    </div>
  );
}
