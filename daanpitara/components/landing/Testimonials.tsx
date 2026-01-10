"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Anjali Mehra",
    role: "Program Coordinator",
    image: "/HomeImages/anjali.png",
    message:
      "Partnering with DaanPitara has made our outreach so much easier. Their team helped us present our work clearly, and we’ve seen a noticeable increase in people engaging with our initiatives. The support has been consistent and genuinely helpful.",
    rating: 4,
  },
  {
    name: "Anjali Mehra",
    role: "Program Coordinator",
    image: "/HomeImages/anjali.png",
    message:
      "Partnering with DaanPitara has made our outreach so much easier. Their team helped us present our work clearly, and we’ve seen a noticeable increase in people engaging with our initiatives. The support has been consistent and genuinely helpful.",
    rating: 4,
  },
  {
    name: "Anjali Mehra",
    role: "Program Coordinator",
    image: "/HomeImages/anjali.png",
    message:
      "Partnering with DaanPitara has made our outreach so much easier. Their team helped us present our work clearly, and we’ve seen a noticeable increase in people engaging with our initiatives. The support has been consistent and genuinely helpful.",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#FBFAF7] py-[56px]">
      <div className="max-w-[1264px] mx-auto px-4">

        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-[56px]"
        >
          <h2 className="text-[32px] font-semibold text-[#0A0A0A] mb-2">
            Testimonials
          </h2>
          <p className="text-[#6A7282]">
            What Our Client Say About Us
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col lg:flex-row gap-[56px] justify-center">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="
                relative
                bg-white
                w-full
                lg:w-[380px]
                rounded-[20px]
                border border-[#6A7282]/50
                px-[28px]
                py-[37px]
                shadow-[0_8px_10px_rgba(0,0,0,0.05)]
                flex
                flex-col
                gap-[10px]
              "
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(item.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#F5B301] text-[#F5B301]"
                  />
                ))}
              </div>

              {/* Quote Icon */}
              <img
                src="/HomeImages/Icon.svg"
                alt="Quote icon"
                className="absolute top-[28px] right-[28px] w-[64px] h-[64px] opacity-50"
              />

              {/* Message */}
              <p className="text-sm text-[#4C4B4B] leading-relaxed mt-6">
                {item.message}
              </p>

              {/* User */}
              <div className="flex items-center gap-3 mt-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-[#0A0A0A]">
                    {item.name}
                  </p>
                  <p className="text-xs text-[#6A7282]">
                    {item.role}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
