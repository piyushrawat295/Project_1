import { ChevronRight } from "lucide-react";
import { blogs } from "@/data/landing";

export default function Blogs() {
  return (
    <section className="py-20 bg-blue-700">
      <div className="max-w-7xl mx-auto px-4 text-white">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">Latest Insights</h2>
          <p className="text-blue-100">
            Stay updated with the latest news and insights from DaanPitara
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white text-gray-900 rounded-xl overflow-hidden shadow-md"
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center text-5xl">
                📰
              </div>

              <div className="p-6">
                <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mb-4">
                  News
                </span>

                <h3 className="text-xl font-bold mb-3">
                  {blog.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{blog.date}</span>
                  <span>{blog.readTime}</span>
                </div>

                <button className="text-blue-600 flex items-center">
                  Learn more <ChevronRight className="ml-1 w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
