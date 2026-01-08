import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#E6F4FC]">
      <div
        className="
          mx-auto
          w-full
          max-w-[1440px]
          px-4 sm:px-6 xl:px-[72px]
          pt-[34px]
          pb-[37px]
          flex
          flex-col
          gap-[48px] xl:gap-[63px]
        "
      >
        {/* TOP SECTION */}
        <div
          className="
            flex
            flex-col
            gap-10
            md:grid md:grid-cols-2
            xl:flex xl:flex-row xl:items-start xl:gap-[64px]
          "
        >
          {/* Brand */}
          <div className="flex flex-col gap-4 xl:w-[353px]">
            <div className="flex items-center gap-2">
              <img src="/Logo.png" className="h-10 w-10" />
              <h3 className="text-[20px] font-semibold text-black">
                DaanPitara
              </h3>
            </div>

            <p className="text-[16px] text-[#4C4B4B] leading-relaxed">
              Recognized as the best CSR fundraising platform,
              DaanPitara connects NGOs and corporates through seamless
              digital support, impactful campaigns, and transparent donor engagement.
            </p>

            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram, Youtube].map(
                (Icon, i) => (
                  <div
                    key={i}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 text-gray-600"
                  >
                    <Icon size={18} />
                  </div>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[16px] font-medium text-black">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-4 text-[#4C4B4B]">
              <li>Home</li>
              <li>About Us</li>
              <li>Fundraiser form</li>
              <li>FAQ’s</li>
              <li>Blogs</li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[16px] font-medium text-black">
              Get In Touch
            </h4>

            <div className="flex flex-col gap-5 text-[#4C4B4B] text-[16px]">
              <div className="flex gap-3">
                <MapPin size={18} />
                <p>
                  D38, Phase 1, Sector 57,
                  Sahibzada Ajit Singh Nagar,
                  Punjab 160055, India
                </p>
              </div>

              <div className="flex gap-3">
                <Phone size={18} />
                <p>9876577721</p>
              </div>

              <div className="flex gap-3">
                <Mail size={18} />
                <p>contact@daanpitara.com</p>
              </div>

              <div className="flex gap-3">
                <Clock size={18} />
                <p>Mon – Sat, 10 AM – 6 PM</p>
              </div>
            </div>
          </div>

          {/* Subscribe */}
          <div className="flex flex-col gap-6 xl:w-[396px]">
            <h4 className="text-black text-[20px] font-normal leading-[28px]">
              Subscribe Our Zheal Media to get the Latest!
            </h4>

            <div className="flex h-[48px] items-center rounded-md bg-[#9CA3AF] px-4">
              <input
                placeholder="Your email address"
                className="flex-1 bg-transparent text-white placeholder:text-white outline-none"
              />
              <button className="ml-3 h-[36px] rounded-md bg-blue-500 px-6 text-white">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div
          className="
            flex
            flex-col
            gap-4
            border-t border-gray-300
            pt-6
            text-[14px]
            text-gray-600
            md:flex-row
            md:items-center
            md:justify-between
            xl:pt-[63px]
          "
        >
          <p>© {new Date().getFullYear()} DaanPitara, All Right Reserved.</p>

          <div className="flex gap-6">
            <span>Terms & Conditions</span>
            <span>Privacy Policies</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
