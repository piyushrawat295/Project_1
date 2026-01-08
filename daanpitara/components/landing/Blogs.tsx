import { ChevronRight } from "lucide-react";

export default function Blogs() {
  return (
    <section className="bg-[#0F71A8] py-16 md:py-20">
      <div className="max-w-[1262px] mx-auto px-4 text-white flex flex-col gap-12">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Latest Insights
          </h2>
          <p className="text-blue-100 text-sm md:text-base">
            Stay updated with the latest news and insights from DaanPitara
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-14 items-stretch">

          {/* LEFT – Blog Cards */}
          <div className="flex flex-col gap-8 flex-1">

            {/* Blog Card 1 */}
            <div className="bg-white text-gray-900 rounded-xl p-6 flex flex-col md:flex-row gap-6 shadow-sm">
              <img
                src="/images/blog-1.jpg"
                alt="CSR in India"
                className="w-full md:w-[200px] h-[160px] object-cover rounded-lg"
              />

              <div className="flex flex-col justify-between">
                <div>
                  <span className="inline-block bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full mb-3">
                    News
                  </span>

                  <h3 className="text-lg font-semibold mb-2">
                    Digital Evolution of CSR in India: How DaanPitara Powers Social Impact.
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    The landscape of Corporate Social Responsibility (CSR) in India
                    is undergoing a massive transformation.
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Nov 5, 2025 • 5 min read</span>
                  <button className="flex items-center text-blue-600 font-medium">
                    Learn more <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Blog Card 2 */}
            <div className="bg-white text-gray-900 rounded-xl p-6 flex flex-col md:flex-row gap-6 shadow-sm">
              <img
                src="/images/blog-2.jpg"
                alt="AI Social Impact"
                className="w-full md:w-[200px] h-[160px] object-cover rounded-lg"
              />

              <div className="flex flex-col justify-between">
                <div>
                  <span className="inline-block bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full mb-3">
                    News
                  </span>

                  <h3 className="text-lg font-semibold mb-2">
                    How DaanPitara Can Leverage AI to Create a Greater Social Impact
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    Artificial intelligence has evolved from a technological
                    advancement into a powerful instrument for solving real-world challenges.
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Nov 5, 2025 • 6 min read</span>
                  <button className="flex items-center text-blue-600 font-medium">
                    Learn more <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT – Highlights */}
          <div className="bg-white rounded-xl p-6 text-gray-900 w-full lg:w-[360px] flex flex-col gap-6">
            <h3 className="text-2xl font-bold">Highlights</h3>

            <div className="flex flex-col gap-6 text-sm">

              <div>
                <span className="text-blue-600 text-xs font-medium">News</span>
                <p className="mt-1">
                  How DaanPitara Can Leverage AI to Create a Greater Social Impact
                </p>
                <button className="flex items-center text-blue-600 mt-2 text-xs">
                  Read More <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              <div>
                <span className="text-blue-600 text-xs font-medium">News</span>
                <p className="mt-1">
                  The Digital Transformation of CSR in India: How DaanPitara is
                  Empowering Corporate Social Responsibility
                </p>
                <button className="flex items-center text-blue-600 mt-2 text-xs">
                  Read More <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              <div>
                <span className="text-blue-600 text-xs font-medium">News</span>
                <p className="mt-1">
                  A Day in the Life of an NGO Volunteer: Creating Real Change
                  with DaanPitara
                </p>
                <button className="flex items-center text-blue-600 mt-2 text-xs">
                  Read More <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
