import Image from "next/image";

export default function Services() {
  const services = [
    {
      icon: "/HomeImages/1.svg",
      title: "Seamless Onboarding",
      description:
        "Start your journey with confidence. We make it easy for NGOs to get online, be seen, and start creating impact faster.",
    },
    {
      icon: "/HomeImages/2.svg",
      title: "Verified NGO Profiles",
      description:
        "Show the world who you are. Verified listings build trust and help donors connect with your story and mission.",
    },
    {
      icon: "/HomeImages/3.svg",
      title: "CSR Matchmaking",
      description:
        "Find partners who care like you. Connect with purpose-driven brands through India’s top CSR platform.",
    },
    {
      icon: "/HomeImages/4.svg",
      title: "Personalized NGO Mentorship",
      description:
        "Get one-on-one guidance from experts who understand your challenges. Together, we build confidence and clarity.",
    },
    {
      icon: "/HomeImages/5.svg",
      title: "Compliance & DPR Guidance",
      description:
        "We handle the documentation so you can focus on what matters — your cause and community.",
    },
    {
      icon: "/HomeImages/6.svg",
      title: "Mission Growth Network",
      description:
        "Join 1000+ NGOs in a growing ecosystem sharing knowledge, resources, and collective impact.",
    },
  ];

  return (
    <section className="py-12">
      <div className="mx-auto max-w-[1264px] bg-[#0F71A8] rounded-2xl px-[62px] py-[40px]">

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
            <div
              key={i}
              className="
                w-[318px]
                h-[307px]
                bg-white
                rounded-lg
                p-[21px]
                flex
                flex-col
              "
            >
              {/* Icon box (86x80) */}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
