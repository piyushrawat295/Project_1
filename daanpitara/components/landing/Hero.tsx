import { ChevronRight, Phone } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-[#FFFDF9]">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 xl:px-[72px] pt-[56px]">
        
        {/* Top */}
        <div className="flex flex-col xl:flex-row items-center gap-12 xl:gap-[50px]">
          
          {/* LEFT */}
          <div className="w-full xl:w-[659px]">
            <h1 className="text-black text-[28px] sm:text-[32px] xl:text-[40px] font-medium leading-normal mb-6">
              Trusted Digital Platform For NGOs & Fundraising
            </h1>

            <p className="text-[#4C4B4B] text-[16px] xl:text-[18px] leading-normal mb-10">
              DaanPitara empowers NGOs across the globe to embrace digital
              transformation, amplify their social impact, and attract meaningful
              CSR partnerships. Through powerful digital branding, smart
              fundraising tools, and transparent donor engagement systems, we
              help organizations build trust, raise sustainable funds, and
              create long-lasting change within their communities.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="flex h-[48px] items-center gap-[10px] rounded-lg bg-[#0F71A8] px-6 text-white">
                Explore Services
                <ChevronRight size={20} />
              </button>

              <button className="flex h-[48px] items-center gap-[10px] rounded-lg border border-[#0F71A8] px-6 text-[#0F71A8]">
                <Phone size={20} />
                Contact Us
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full max-w-[565px] h-[240px] sm:h-[300px] xl:h-[341px] rounded-xl bg-gray-300 flex items-center justify-center">
            🌍 Globe will come here
          </div>
        </div>

        {/* Pills */}
        <div className="mt-[56px] mb-[36px] flex flex-wrap gap-4 sm:gap-6">
          {[
            "Empowering NGOs",
            "Digital & Funding Support",
            "Trust & Transparency",
          ].map((item) => (
            <span
              key={item}
              className="rounded-lg border border-gray-300 px-6 py-3 text-[#4C4B4B]"
            >
              {item}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
