"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Services() {
  const services = [
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
  ];

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mx-auto max-w-[1264px] bg-[#0F71A8] rounded-2xl px-[62px] py-[40px]"
      >
        {/* Heading */}
        <h2 className="text-center text-[36px] leading-[44px] font-medium text-white mb-2">
          Empowering NGOs
        </h2>

        <p className="text-center text-[#E6F4FC] text-[16px] leading-[24px] mb-[36px]">
          We walk alongside every NGO, turning purpose into measurable progress
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[56px] place-items-center">
          {services.map((s, i) => (
            <motion.div
              key={s.id} // ✅ FIXED: stable unique key
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="w-[318px] h-[307px] bg-white rounded-lg p-[21px] flex flex-col"
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
    </section>
  );
}
