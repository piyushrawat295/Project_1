import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Anjali Mehra",
    role: "Program Coordinator",
    message:
      "Partnering with DaanPitara has made our outreach so much easier. Their team helped us present our work clearly, and we’ve seen a noticeable increase in people engaging with our initiatives. The support has been consistent and genuinely helpful.",
    rating: 4,
  },
  {
    name: "Anjali Mehra",
    role: "Program Coordinator",
    message:
      "DaanPitara helped us build trust with donors and communicate our impact transparently. Their platform made digital transformation simple for our NGO.",
    rating: 4,
  },
  {
    name: "Anjali Mehra",
    role: "Program Coordinator",
    message:
      "The onboarding experience was smooth and the support team was always responsive. We now reach more people and partners effectively.",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Testimonials
          </h2>
          <p className="text-gray-600 text-lg">
            What Our Clients Say About Us
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-md relative"
            >
              {/* Quote icon */}
              <span className="absolute top-4 right-6 text-6xl text-gray-200">
                “
              </span>

              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(item.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Message */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {item.message}
              </p>

              {/* User */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
