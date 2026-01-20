"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Services() {
  const [activeTab, setActiveTab] = useState("Empowering NGOs");

  // Data for each tab
  const allServices = {
    "Empowering NGOs": [
      {
        id: "onboarding",
        icon: "/HomeImages/1.svg",
        title: "Seamless Onboarding",
        description:
          "Start your journey with confidence. We make it easy for NGOs to get online, be seen, and start creating impact faster.",
      },
      {
        id: "verified",
        icon: "/HomeImages/2.svg",
        title: "Verified NGO Profiles",
        description:
          "Show the world who you are. Verified listings build trust and help donors connect with your story and mission.",
      },
      {
        id: "csr",
        icon: "/HomeImages/3.svg",
        title: "CSR Matchmaking",
        description:
          "Find partners who care like you. Connect with purpose-driven brands through India’s top CSR platform.",
      },
      {
        id: "mentorship",
        icon: "/HomeImages/4.svg",
        title: "Personalized NGO Mentorship",
        description:
          "Get one-on-one guidance from experts who understand your challenges. Together, we build confidence and clarity.",
      },
      {
        id: "compliance",
        icon: "/HomeImages/5.svg",
        title: "Compliance & DPR Guidance",
        description:
          "We handle the documentation so you can focus on what matters — your cause and community.",
      },
      {
        id: "network",
        icon: "/HomeImages/6.svg",
        title: "Mission Growth Network",
        description:
          "Join 1000+ NGOs in a growing ecosystem sharing knowledge, resources, and collective impact.",
      },
    ],
    "Digital & Funding Support": [
      {
        id: "branding",
        icon: "/HomeImages/2.svg",
        title: "Digital branding & Presence",
        description:
          "Build a strong digital identity that reflects your mission. We help NGOs create credible profiles that attract donors and long-term supporters.",
      },
      {
        id: "fundraising",
        icon: "/HomeImages/3.svg",
        title: "Online Fundraising Tools",
        description:
          "Launch campaigns with ease using smart fundraising tools. Everything is designed to help you raise funds transparently.",
      },
      {
        id: "csr-funding",
        icon: "/HomeImages/1.svg",
        title: "CSR Funding Access",
        description:
          "Unlock meaningful CSR opportunities tailored to your work. We connect NGOs with aligned corporates looking to create measurable social impact.",
      },
      {
        id: "storytelling",
        icon: "/HomeImages/4.svg",
        title: "Impact Storytelling",
        description:
          "Share your work through powerful stories and data. We help NGOs communicate impact clearly to build trust with donors and stakeholders.",
      },
      {
        id: "readiness",
        icon: "/HomeImages/5.svg",
        title: "Funding Readiness Support",
        description:
          "Prepare your organization for funding success. We guide NGOs on compliance and documentation to meet donor expectations.",
      },
      {
        id: "visibility",
        icon: "/HomeImages/6.svg",
        title: "Growth & Visibility Network",
        description:
          "Gain visibility across a growing ecosystem of partners. Be discovered by funders, collaborators, and supporters who believe in your cause.",
      },
    ],
    "Trust & Transparency": [
      {
        id: "info",
        icon: "/HomeImages/2.svg",
        title: "Verified NGO Information",
        description:
          "Every NGO profile is carefully reviewed and verified. This ensures donors and partners can trust the information they see and support with confidence.",
      },
      {
        id: "utilization",
        icon: "/HomeImages/3.svg",
        title: "Transparent Fund Utilization",
        description:
          "Track how funds are used with clear reporting and updates. We promote accountability so every contribution creates visible and measurable impact.",
      },
      {
        id: "reporting",
        icon: "/HomeImages/5.svg",
        title: "Impact Reporting & Updates",
        description:
          "Receive regular progress updates through structured impact reports. NGOs share outcomes, milestones, and stories that demonstrate real change.",
      },
      {
        id: "security",
        icon: "/HomeImages/4.svg",
        title: "Secure Data & Privacy",
        description:
          "Your data is protected with strong security practices. We ensure sensitive information remains safe maintaining transparency across the platform.",
      },
      {
        id: "doc-compliance",
        icon: "/HomeImages/6.svg",
        title: "Compliance & Documentation",
        description:
          "Access organized compliance records and documentation. We simplify regulatory processes while maintaining clarity for donors and stakeholders.",
      },
      {
        id: "communication",
        icon: "/HomeImages/1.svg",
        title: "Open Communication",
        description:
          "Stay connected through clear and open communication. NGOs, donors, and partners can collaborate with confidence and shared understanding.",
      },
    ],
  };

  const tabs = [
    "Empowering NGOs",
    "Digital & Funding Support",
    "Trust & Transparency",
  ];

  return (
    <section className="py-12">
      <div className="mx-auto max-w-[1264px] px-4">
        
        {/* Pills Navigation */}
        <div className="mb-10 w-full overflow-x-auto no-scrollbar pb-2">
          <div className="flex items-center min-w-max">
            {tabs.map((tab, index) => {
               const isActive = activeTab === tab;
               return (
                 <div key={tab} className="flex items-center">
                   <button
                     onClick={() => setActiveTab(tab)}
                     className={`px-6 py-2 text-sm font-medium transition-all duration-300 rounded-[4px] whitespace-nowrap ${
                       isActive
                         ? "bg-[#0F71A8] text-white shadow-md border border-[#0F71A8]"
                         : "bg-transparent text-[#666666] hover:text-[#0F71A8] border border-[#999999]"
                     } ${!isActive ? "mx-2" : ""}`}
                   >
                     {tab}
                   </button>
                   {/* Vertical Separator logic: Show only if current is NOT active AND next item exists AND next item is NOT active */}
 
                    {index < tabs.length - 1 && (
                      <span className="h-6 w-[1px] bg-gray-400 mx-2 hidden sm:block"></span>
                    )}
                 </div>
               );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-[#0F71A8] rounded-2xl px-6 md:px-[62px] py-[40px]"
        >
          {/* Heading */}
          <h2 className="text-center text-[30px] md:text-[36px] leading-[44px] font-medium text-white mb-2">
            {activeTab}
          </h2>

          <p className="text-center text-[#E6F4FC] text-[16px] leading-[24px] mb-[36px]">
            We walk alongside every NGO, turning purpose into measurable progress
          </p>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-[56px] place-items-center">
            {allServices[activeTab as keyof typeof allServices].map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="w-full max-w-[318px] h-auto min-h-[307px] bg-white rounded-lg p-[21px] flex flex-col"
              >
                {/* Icon */}
                <div className="w-[86px] h-[80px] flex items-center justify-center mb-4">
                  <Image
                    src={s.icon}
                    alt={s.title}
                    width={56}
                    height={56}
                  />
                </div>

                {/* Title */}
                <h3 className="text-[#0A0A0A] text-[20px] leading-[28px] font-medium mb-2">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-[#4C4B4B] text-[14px] leading-[20px]">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
