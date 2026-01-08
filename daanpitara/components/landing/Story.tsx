import { ChevronRight } from "lucide-react";

export default function Story() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div
        className="
          mx-auto
          w-full
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
          <div
            className="
              flex
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-blue-400
              to-green-400
              text-5xl
              sm:text-6xl
              w-[200px] h-[200px]
              sm:w-[240px] sm:h-[240px]
              lg:w-[260px] lg:h-[260px]
            "
          >
            🌍
          </div>

          {/* Badge */}
          <div
            className="
              absolute
              -bottom-4
              sm:bottom-0
              bg-white
              px-6
              py-3
              rounded-lg
              shadow-md
              text-center
            "
          >
            <p className="font-semibold text-gray-900 leading-tight">
              Let us<br />help you
            </p>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="text-center lg:text-left">
          <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-medium text-gray-900 mb-6">
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
            scale their social impact.
          </p>

          <div className="flex justify-center lg:justify-start">
            <button
              className="
                flex
                items-center
                gap-2
                h-[48px]
                px-8
                border
                border-blue-600
                text-blue-600
                rounded-lg
                hover:bg-blue-50
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
