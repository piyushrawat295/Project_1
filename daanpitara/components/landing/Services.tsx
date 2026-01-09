import {
  Handshake,
  ShieldCheck,
  Globe,
  Users,
  FileText,
  TrendingUp,
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Handshake size={48} />,
      title: "Seamless Onboarding",
      description:
        "Start your journey with confidence. We make it easy for NGOs to get online, be seen, and start creating impact faster.",
    },
    {
      icon: <ShieldCheck size={48} />,
      title: "Verified NGO Profiles",
      description:
        "Show the world who you are. Verified listings build trust and help donors connect with your story and mission.",
    },
    {
      icon: <Globe size={48} />,
      title: "CSR Matchmaking",
      description:
        "Find partners who care like you. Connect with purpose-driven brands through India’s top CSR platform.",
    },
    {
      icon: <Users size={48} />,
      title: "Personalized NGO Mentorship",
      description:
        "Get one-on-one guidance from experts who understand your challenges. Together, we build confidence and clarity.",
    },
    {
      icon: <FileText size={48} />,
      title: "Compliance & DPR Guidance",
      description:
        "We handle the documentation so you can focus on what matters — your cause and community.",
    },
    {
      icon: <TrendingUp size={48} />,
      title: "Mission Growth Network",
      description:
        "Join 1000+ NGOs in a growing ecosystem sharing knowledge, resources, and collective impact.",
    },
  ];

  return (
     <section className="py-10 ">
      <div
        className="
          mx-auto
          w-full
          max-w-[1264px]
          px-4 sm:px-6 xl:px-[62px]
          py-[40px]
          bg-[#0F71A8]
          rounded-2xl
        "
      >
        {/* Heading */}
        <h2 className="text-center text-[28px] sm:text-[32px] xl:text-[36px] font-medium text-white mb-4">
          Empowering NGOs
        </h2>

        <p className="text-center text-[#E6F4FC] mb-[36px] text-[14px] sm:text-[16px]">
          We walk alongside every NGO, turning purpose into measurable progress
        </p>

        {/* Cards */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            gap-6
            xl:gap-[56px]
            place-items-center
          "
        >
          {services.map((s, i) => (
            <div
              key={i}
              className="
                flex
                w-full
                max-w-[318px]
                min-h-[307px]
                flex-col
                gap-5
                rounded-lg
                bg-white
                p-[21px]
              "
            >
              <div className="text-[#0F71A8]">{s.icon}</div>

              <h3 className="text-[16px] font-medium text-black">
                {s.title}
              </h3>

              <p className="text-[14px] text-[#4C4B4B] leading-normal">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
