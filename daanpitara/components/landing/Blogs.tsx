export default function Blogs() {
  return (
    <section className="py-12">
      <div className="max-w-[1260px] mx-auto bg-[#0F71A8] rounded-2xl px-6 md:px-10 py-14">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-white text-[32px] leading-[40px] font-bold">
            Latest Insights
          </h2>
          <p className="text-blue-100 mt-2 text-[14px] leading-[22px]">
            Stay updated with the latest news and insights from DaanPitara
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-10 max-w-[1100px] mx-auto">

          {/* LEFT */}
          <div className="flex flex-col gap-8 flex-1">

            {[1, 2].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-[21px] flex gap-6 shadow-sm"
              >
                {/* Image */}
                <div className="w-[288px] h-[224px] rounded-[14px] overflow-hidden relative shrink-0">
                  <img
                    src="/HomeImages/blog.jpg"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 left-4 bg-blue-50 px-4 py-1.5 rounded-full text-[#155DFC] text-[12px] leading-[18px]">
                    News
                  </span>
                </div>

                {/* Text */}
                <div className="flex flex-col justify-between h-[224px] w-full">

                  {/* Title + desc */}
                  <div className="flex flex-col gap-3 max-w-[352px]">
                    <h3 className="text-[#0A0A0A] text-[20px] leading-[28px] font-medium">
                      {i === 0
                        ? "Digital Evolution of CSR in India: How DaanPitara Powers Social Impact."
                        : "How DaanPitara Can Leverage AI to Create a Greater Social Impact"}
                    </h3>

                    <p className="text-[#4C4B4B] text-[16px] leading-[24px]">
                      {i === 0
                        ? "The landscape of Corporate Social Responsibility (CSR) in India is undergoing a massive transformation."
                        : "Artificial intelligence has evolved from a technological advancement into a powerful instrument for solving real-world challenges."}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between max-w-[352px]">

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-[#6A7282] text-[14px] leading-[19px]">
                      <div className="flex items-center gap-1.5">
                        <img src="/icons/calendar.svg" className="w-4 h-4" />
                        <span>Nov 5, 2025</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <img src="/icons/clock.svg" className="w-4 h-4" />
                        <span>5 min read</span>
                      </div>
                    </div>

                    {/* Button */}
                    <button className="flex items-center gap-2 bg-[#36B2F1]/60 px-4 py-2 rounded-lg text-white text-[12px] leading-[24px] shadow-sm">
                      Learn more
                      <img src="/icons/arrow-right.svg" className="w-4 h-4" />
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — Highlights */}
          <div className="bg-white rounded-xl p-6 w-full lg:w-[360px] shadow-sm">
            <h3 className="text-[24px] leading-[32px] font-bold mb-6">
              Highlights
            </h3>

            <div className="flex flex-col gap-6 text-[14px] leading-[20px]">
              {[
                "How DaanPitara Can Leverage AI to Create a Greater Social Impact",
                "The Digital Transformation of CSR in India: How DaanPitara is Empowering Corporate Social Responsibility",
                "A Day in the Life of an NGO Volunteer: Creating Real Change with DaanPitara",
              ].map((text, i) => (
                <div key={i} className="max-w-[236px]">
                  <span className="text-[#155DFC] text-[12px] leading-[18px]">
                    News
                  </span>
                  <p className="mt-1 text-[#0A0A0A]">
                    {text}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-2 text-[#4C4B4B] text-[12px]">
                    Read More
                    <img src="/icons/arrow-right.svg" className="w-3.5 h-3.5" />
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
