import { ChevronRight } from "lucide-react";

export default function Story() {
  return (
    <section className="bg-[#FFFDF9] py-16 ">
      <div
        className="
          mx-auto
          max-w-[1440px]
          px-4 sm:px-6 xl:px-[72px]
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-12
          items-center
        "
      >
        {/* LEFT VISUAL */}
        <div className="relative flex justify-center">
          {/* Main Circle */}
          <div
            className="
              flex
              items-center
              justify-center
              overflow-hidden
              w-[200px] h-[200px]
              sm:w-[240px] sm:h-[240px]
              lg:w-[260px] lg:h-[260px]
            "
          >
            <img
              src="/Photo3.png" // replace with your figma image
              alt="Helping NGOs"
              className="w-full h-full object-cover"
            />
          </div>

          
        </div>

        {/* RIGHT CONTENT */}
        <div className="text-center lg:text-left">
          <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-medium text-black mb-6">
            Our Story
          </h2>

          <p className="text-[#4C4B4B] mb-4 leading-relaxed">
            Founded with a belief that every act of kindness deserves to be seen
            and supported, DaanPitara connects NGOs, donors, and CSR partners
            through technology and trust.
          </p>

          <p className="text-[#4C4B4B] mb-8 leading-relaxed">
            What started as a small initiative in India has grown into a global
            platform, helping changemakers raise funds, build credibility, and
            grow their impact online.
          </p>

          <div className="flex justify-center lg:justify-start">
            <button
              className="
                flex
                items-center
                gap-2
                h-[48px]
                px-8
                rounded-lg
                border
                border-[#0F71A8]
                text-[#0F71A8]
                hover:bg-blue-50
                transition
              "
            >
              Join Our Mission
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
