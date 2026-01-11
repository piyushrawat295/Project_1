import { ArrowRight, BarChart, Check, Eye, Globe, Heart, Layout, Lightbulb, MapPin, Shield, Target, TrendingUp, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TypewriterText from "@/components/animations/TypewriterText";
import Testimonials from "@/components/landing/Testimonials";
import FadeIn from "@/components/animations/FadeIn";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <FadeIn>
      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 xl:px-[50px] lg:flex lg:items-center lg:justify-between lg:gap-12">
        <div className="lg:w-1/2">
          <TypewriterText 
            text="Empowering NGOs Through Digital Innovation & Transparency"
            className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-[56px] mb-6"
          />
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            At DaanPitara, we connect nonprofits and purpose-driven brands across the world to foster strategic CSR partnerships, accelerate funding, and deepen donor trust. With tools for storytelling, online fundraising, streamlined documentation, and transparent engagement.
          </p>
        </div>
        <div className="mt-10 lg:mt-0 lg:w-1/2">
           <div className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
              <img 
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2074&auto=format&fit=crop" 
                  alt="Team collaboration" 
                  className="h-full w-full object-cover"
              />
           </div>
        </div>
      </section>
      </FadeIn>

      {/* 2. Our Story Section */}
      <FadeIn delay={0.2}>
      <section className="py-16 sm:py-24 bg-[#FFFDF9]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-[72px]">
           <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Left Image Visual (Matching Landing Page Style) */}
              <div className="lg:w-1/2 flex justify-center">
                 <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden shadow-lg border-4 border-white">
                    <img 
                        src="/Photo3.png" 
                        alt="Our Story" 
                        className="w-full h-full object-cover"
                    />
                 </div>
              </div>

              {/* Right Content */}
              <div className="lg:w-1/2">
                 <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-gray-900 mb-6">Our Story</h2>
                 <p className="text-gray-600 mb-6 leading-relaxed">
                    Founded with a belief that every act of kindness deserves to be seen and supported, DaanPitara connects NGOs, donors, and CSR partners through technology and trust.
                 </p>
                 <p className="text-gray-600 mb-10 leading-relaxed">
                    What started as a small initiative in India has now grown into a global networking areas, helping changemakers raise funds, build credibility, and grow their impact online.
                 </p>
                 
                 {/* Stats Grid */}
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                    <StatBox icon={<Users className="text-blue-600" />} value="1000+" label="NGO's Connected" />
                    <StatBox icon={<MapPin className="text-green-600" />} value="50+" label="Cities Reached" />
                    <StatBox icon={<Heart className="text-red-500" />} value="10K+" label="Lives Impacted" />
                    <StatBox icon={<Target className="text-purple-600" />} value="500+" label="CSR Partnerships" />
                 </div>

                 <Link href="/signin" className="inline-flex items-center justify-center rounded-lg border border-blue-600 px-8 py-3 text-base font-semibold text-blue-600 transition-colors hover:bg-blue-50">
                    Join Our Mission <ArrowRight className="ml-2 h-5 w-5" />
                 </Link>
              </div>
           </div>
        </div>
      </section>
      </FadeIn>

      {/* 3. Why Choose DaanPitara (Reusable) */}
      <FadeIn delay={0.2}>
      <section className="py-12 sm:py-16">
         <div className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-[50px]">
           <div className="rounded-[32px] bg-[#A4C2D6] px-6 py-16 sm:px-12 sm:py-20 shadow-sm">
             <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Why Choose DaanPitara</h2>
             </div>
             
             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <FeatureCard icon="/About/Vector (4).svg" title="Transparent Engagement" description="Every transaction and partnership is visible, verifiable, and built on trust." />
                <FeatureCard icon="/About/folderss.png" title="CSR-Ready Documentation" description="Pre-built templates that meet corporate compliance requirements." />
                <FeatureCard icon="/About/Vector (2).svg" title="Trusted by NGOs" description="Over 1,000 verified nonprofits trust DaanPitara for their digital growth." />
                <FeatureCard icon="/About/Vector (3).svg" title="Impact Visualization" description="Powerful analytics tools that showcase your real-world impact." />
                <FeatureCard icon="/About/Vector (8).svg" title="Growth-Focused Tools" description="Scalable solutions designed to grow with your organization." />
                <FeatureCard icon="/About/Vector (5).svg" title="Secure & Verified Platform" description="Bank-grade security with multi-layer verification for all organizations." />
             </div>
           </div>
         </div>
      </section>
      </FadeIn>

      {/* 4. Mission & Vision */}
      <FadeIn delay={0.2}>
      <section className="py-16 sm:py-24 bg-[#FBFAF7]">
         <div className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-[50px]">
            <div className="grid md:grid-cols-2 gap-8">
               <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
                  <div className="h-14 w-14 rounded-lg bg-blue-50 flex items-center justify-center mb-6">
                     <img src="/About/arrow.png" alt="Mission" className="h-8 w-8 object-contain" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed">To empower NGOs through digital transformation and transparent donor engagement.</p>
               </div>
               <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
                  <div className="h-14 w-14 rounded-lg bg-blue-50 flex items-center justify-center mb-6">
                     <img src="/About/eye.png" alt="Vision" className="h-8 w-8 object-contain" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-600 leading-relaxed">A world where every cause — big or small — gets the opportunity and support it deserves.</p>
               </div>
            </div>
         </div>
      </section>
      </FadeIn>

      {/* 5. Core Values */}
      <FadeIn delay={0.2}>
      <section className="py-16 sm:py-24">
         <div className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-[50px]">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Core Values</h2>
               <p className="mt-4 text-gray-600">The principles that guide everything we do</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
               <ValueCard icon="/About/Vector (4).svg" label="Transparency" />
               <ValueCard icon="/About/Vector (5).svg" label="Trust" />
               <ValueCard icon="/About/Vector (6).svg" label="Impact" />
               <ValueCard icon="/About/Vector (7).svg" label="Empowerment" />
               <ValueCard icon="/About/Group.svg" label="Collaboration" />
            </div>
         </div>
      </section>
      </FadeIn>

      {/* 6. How We Help */}
      <FadeIn delay={0.2}>
      <section className="py-16 sm:py-24 bg-white">
         <div className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-[50px]">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  How We Help You <span className="text-blue-600">Create Impact</span>
               </h2>
               <p className="mt-4 text-gray-600">Comprehensive solutions designed to empower NGOs and enable meaningful CSR partnerships</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               <HelpCard 
                  icon="/About/Laptop.png"
                  title="Digital Branding & Online Presence"
                  description="Build a compelling digital identity that attracts supporters and showcases your impact."
               />
               <HelpCard 
                  icon="/About/HandShake.png"
                  title="CSR Partnerships & Corporate Outreach"
                  description="Connect with corporate partners aligned with your mission for meaningful collaborations."
               />
               <HelpCard 
                  icon="/About/Vector (3).svg"
                  title="NGO Growth Analytics"
                  description="Track your performance with data-driven insights and actionable metrics."
               />
            </div>
         </div>
      </section>
      </FadeIn>

      {/* 7. Testimonials */}
      <FadeIn delay={0.2}>
        <Testimonials />
      </FadeIn>
    </div>
  );
}

// Sub-components

function StatBox({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) {
    return (
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
            <div className="mx-auto h-10 w-10 flex items-center justify-center bg-gray-50 rounded-full mb-3">
                {icon}
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
        </div>
    )
}

function FeatureCard({ icon, title, description }: { icon: string, title: string, description: string }) {
    return (
        <div className="flex flex-col rounded-xl bg-white p-8">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                <img src={icon} alt={title} className="h-6 w-6 object-contain" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
                {description}
            </p>
        </div>
    )
}

function ValueCard({ icon, label }: { icon: string, label: string }) {
   return (
      <div className="flex flex-col items-center justify-center w-[160px] h-[160px] bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
         <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
            <img src={icon} alt={label} className="h-6 w-6 object-contain" />
         </div>
         <p className="font-semibold text-gray-900">{label}</p>
      </div>
   )
}

function HelpCard({ icon, title, description }: { icon: string, title: string, description: string }) {
   return (
      <div className="p-8 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
         <div className="h-14 w-14 rounded-lg bg-blue-50 flex items-center justify-center mb-6">
            <img src={icon} alt={title} className="h-8 w-8 object-contain" />
         </div>
         <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
         <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
   )
}
