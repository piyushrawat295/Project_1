import { ChevronDown, Clock, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-white pb-16">
      {/* 1. Hero Section */}
      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 xl:px-[50px] lg:flex lg:items-center lg:justify-between lg:gap-12">
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-[56px] mb-6">
            Get in Touch with the DaanPitara Team
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            We're here to listen, support, and collaborate with changemakers like you. Whether you're an NGO looking for digital growth, a CSR partner seeking impactful collaborations, or a donor eager to make a difference — the DaanPitara team is just a message away.
          </p>
          <a href="#contact-form" className="inline-flex items-center justify-center rounded-lg border border-blue-600 px-8 py-3 text-base font-semibold text-blue-600 transition-colors hover:bg-blue-50">
            <Phone className="mr-2 h-5 w-5" />
            Contact Us
          </a>
        </div>
        <div className="mt-10 lg:mt-0 lg:w-1/2">
             <div className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
                <img 
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop" 
                    alt="Contact support team" 
                    className="h-full w-full object-cover"
                />
             </div>
        </div>
      </section>

      {/* 2. Main Content: Form & Info */}
      <div id="contact-form" className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-[50px] mt-14 grid gap-[100px] lg:grid-cols-2">
        
        {/* Left: Contact Form */}
        <div className="rounded-2xl bg-[#E8EDF2] px-8 py-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
          <p className="text-gray-600 mb-10">Fill out the form below and our team will get back to you within 24 hours.</p>

          <form className="space-y-[26px]">
             <div className="grid gap-[26px] sm:grid-cols-2">
                <div>
                   <label htmlFor="fullname" className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                   <input type="text" id="fullname" placeholder="Enter Your Name" className="w-full rounded-lg border-none bg-[#E2E8F0]/50 p-3 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                   <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                   <input type="email" id="email" placeholder="Enter Your Email" className="w-full rounded-lg border-none bg-[#E2E8F0]/50 p-3 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500" />
                </div>
             </div>

             <div className="grid gap-[26px] sm:grid-cols-2">
                <div>
                   <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
                   <input type="tel" id="phone" placeholder="Enter Your Phone" className="w-full rounded-lg border-none bg-[#E2E8F0]/50 p-3 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                   <label htmlFor="company" className="block text-sm font-semibold text-gray-900 mb-2">Company</label>
                   <input type="text" id="company" placeholder="Enter Company Name" className="w-full rounded-lg border-none bg-[#E2E8F0]/50 p-3 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500" />
                </div>
             </div>

             <div>
                <label htmlFor="enquiry" className="block text-sm font-semibold text-gray-900 mb-2">Enquiry Type</label>
                 <div className="relative">
                    <select id="enquiry" className="w-full appearance-none rounded-lg border-none bg-[#E2E8F0]/50 p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 cursor-pointer">
                        <option>Select an enquiry type</option>
                        <option>General Support</option>
                        <option>Partnership</option>
                        <option>Feedback</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-500 pointer-events-none" />
                 </div>
             </div>

             <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">Enter Your Message Here</label>
                <textarea id="message" rows={4} placeholder="Type text" className="w-full rounded-lg border-none bg-[#E2E8F0]/50 p-3 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
             </div>

             <button type="submit" className="w-full rounded-lg border border-gray-300 bg-transparent py-3 text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:border-gray-400">
                Send Message
             </button>
          </form>
        </div>

        {/* Right: Contact Info */}
        <div className="self-center">
           <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
           <div className="space-y-5">
              <ContactInfoItem 
                icon={Phone}
                title="Phone"
                details="+91 9341857008"
              />
              <ContactInfoItem 
                icon={Mail}
                title="Email"
                details="info@gmail.com"
              />
              <ContactInfoItem 
                icon={MapPin}
                title="Location"
                details={<>D38, Phase 1, Sector 57, Mohali,<br/>Punjab 160055, India</>}
              />
              <ContactInfoItem 
                icon={Clock}
                title="Working hours"
                details="Mon - Sat, 10 AM - 6 PM"
              />
           </div>
        </div>

      </div>
    </div>
  );
}

function ContactInfoItem({ icon: Icon, title, details }: { icon: any, title: string, details: React.ReactNode }) {
    return (
      <div className="flex items-center gap-6 rounded-xl bg-blue-50/50 p-6">
         <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#3B82F6] text-white shadow-sm">
            <Icon className="h-7 w-7" />
         </div>
         <div>
           <p className="font-bold text-gray-900 text-lg">{title}</p>
           <p className="text-gray-600 text-base mt-1">{details}</p>
         </div>
      </div>
    )
}
