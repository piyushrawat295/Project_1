import { caseStudies } from "@/data/landing";

export default function CaseStudies() {
  return (
    <section className="py-20 bg-blue-100">
      <div className="max-w-7xl mx-auto px-4">
        
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Our Case Studies
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition"
            >
              <div className="text-5xl text-center mb-4">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {item.title}
              </h3>

              <p className="text-gray-600 text-center leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
