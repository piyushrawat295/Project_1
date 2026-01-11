import { ArrowRight, BarChart, Check, Globe, Heart, Layout, Shield, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import TypewriterText from "@/components/animations/TypewriterText";
import FadeIn from "@/components/animations/FadeIn";

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <FadeIn>
      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 xl:px-[50px] lg:flex lg:items-center lg:justify-between lg:gap-12">
        {/* Left Content */}
        <div className="lg:w-1/2">
          <TypewriterText 
            text="Services That Empower NGOs to Grow Smarter"
            className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-[56px]"
          />
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Discover the tools and solutions that help nonprofits strengthen their digital presence, unlock meaningful CSR partnerships, streamline documentation, and build long-term donor trust — all within one unified platform designed to support sustainable growth. DaanPitara empowers organizations to operate efficiently and attract the right stakeholders with confidence.
          </p>
        </div>

        {/* Right Image Placeholder */}
        <div className="mt-10 lg:mt-0 lg:w-1/2">
          <div className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
             {/* Replace with actual image */}
             <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200">
                <img 
                    src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1974&auto=format&fit=crop" 
                    alt="Team collaboration" 
                    className="h-full w-full object-cover"
                />
             </div>
          </div>
        </div>

      </section>
      </FadeIn>

      {/* 2. Our Services Section */}
      <FadeIn delay={0.2}>
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-[50px]">
          <div className="rounded-[32px] bg-blue-50/50 px-6 py-16 sm:px-12 sm:py-20 shadow-sm">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Services</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Card 1 */}
              <ServiceCard 
                icon={<Layout className="h-8 w-8 text-blue-600" />}
                title="Digital Branding & Online Presence"
                description="Build a compelling digital identity that showcases your mission and attracts supporters."
                features={[
                  "Professional website and social presence",
                  "Brand storytelling and messaging",
                  "SEO optimization for discoverability",
                  "Digital marketing strategy"
                ]}
              />
              
              {/* Card 2 */}
              <ServiceCard 
                icon={<Heart className="h-8 w-8 text-blue-600" />}
                title="CSR Partnership Facilitation"
                description="Connect with corporate partners aligned with your mission for meaningful collaborations."
                features={[
                  "Curated CSR opportunity matching",
                  "Detailed CSR proposal support",
                  "Corporate outreach support",
                  "Relationship management tools"
                ]}
              />

              {/* Card 3 */}
              <ServiceCard 
                icon={<Users className="h-8 w-8 text-blue-600" />}
                title="Fundraising Tools & Donor Engagement"
                description="Streamline fundraising with tools that make giving easy, transparent, and impactful."
                features={[
                  "Donation processing integration",
                  "Donor management system",
                  "Campaign analytics & insights",
                  "Automated receipt generation"
                ]}
              />
            </div>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* 3. Why Choose DaanPitara Section */}
      <FadeIn delay={0.2}>
      <section className="py-12 sm:py-16">
         <div className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-[50px]">
           <div className="rounded-[32px] bg-[#A4C2D6] px-6 py-16 sm:px-12 sm:py-20 shadow-sm">
             <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Why Choose DaanPitara</h2>
             </div>
             
             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <FeatureCard 
                  icon={<Globe className="h-6 w-6 text-blue-600" />} 
                  title="Transparent Engagement" 
                  description="Every transaction and partnership is visible, verifiable, and built on trust." 
                />
                <FeatureCard 
                  icon={<Layout className="h-6 w-6 text-blue-600" />} 
                  title="CSR-Ready Documentation" 
                  description="Pre-built templates that meet corporate compliance requirements." 
                />
                <FeatureCard 
                  icon={<Shield className="h-6 w-6 text-blue-600" />} 
                  title="Trusted by NGOs" 
                  description="Over 1,000 verified nonprofits trust DaanPitara for their digital growth." 
                />
                <FeatureCard 
                  icon={<BarChart className="h-6 w-6 text-blue-600" />} 
                  title="Impact Visualization" 
                  description="Powerful analytics tools that showcase your real-world impact." 
                />
                <FeatureCard 
                  icon={<TrendingUp className="h-6 w-6 text-blue-600" />} 
                  title="Growth-Focused Tools" 
                  description="Scalable solutions designed to grow with your organization." 
                />
                <FeatureCard 
                  icon={<Shield className="h-6 w-6 text-blue-600" />} 
                  title="Secure & Verified Platform" 
                  description="Bank-grade security with multi-layer verification for all organizations." 
                />
             </div>
           </div>
         </div>
      </section>
      </FadeIn>
    </div>
  );
}

function ServiceCard({ icon, title, description, features }: { icon: React.ReactNode, title: string, description: string, features: string[] }) {
  return (
    <div className="flex flex-col rounded-xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md h-full">
      <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50">
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-bold text-gray-900">{title}</h3>
      <p className="mb-6 text-sm text-gray-600 leading-relaxed flex-grow">
        {description}
      </p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-gray-500">
            <Check className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link href="#" className="mt-auto inline-flex items-center text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
        Read More <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="flex flex-col rounded-xl bg-white p-8">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                {icon}
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
                {description}
            </p>
        </div>
    )
}
