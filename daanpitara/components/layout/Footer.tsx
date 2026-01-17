"use client";

import { usePathname } from "next/navigation";


import Link from "next/link";
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
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/signin" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/verify-otp";
  const isDashboard = pathname?.startsWith('/dashboard');

  if (isAuthPage || isDashboard) return null;

  return (
    <footer className="w-full bg-[#0F2D3F] text-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 lg:px-[72px] lg:py-[60px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          {/* Column 1: Brand & Socials */}
          <div className="flex flex-col gap-6 lg:w-[350px]">
            {/* Logo */}
            {/* Logo */}
            <div className="relative flex h-auto w-40 items-center justify-start">
               <img
                  src="/FooterLogo.png"
                  alt="DaanPitara"
                  className="h-full w-full object-contain"
               />
            </div>

            <p className="text-[15px] leading-relaxed text-gray-300">
              Recognized as the best CSR fundraising platform, DaanPitara
              connects NGOs and corporates through seamless digital support,
              impactful campaigns, and transparent donor engagement.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram, Youtube].map(
                (Icon, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-500 hover:border-white hover:bg-white hover:text-[#0F2D3F] transition-all"
                  >
                    <Icon size={18} />
                  </Link>
                )
              )}
            </div>

            {/* Copyright Desktop */}
            <div className="mt-auto hidden pt-8 text-sm text-gray-400 lg:block">
              © {new Date().getFullYear()} DaanPitara, All Right Reserved.
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold">Quick Links</h4>
            <ul className="flex flex-col gap-4 text-[15px] text-gray-300">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">
                Fundraiser form
              </li>
              <li className="hover:text-white cursor-pointer">FAQ’s</li>
              <li className="hover:text-white cursor-pointer">Blogs</li>
            </ul>
          </div>

          {/* Column 3: Get In Touch */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold">Get In Touch</h4>
            <div className="flex flex-col gap-5 text-[15px] text-gray-300">
              <div className="flex gap-3">
                <MapPin size={20} className="shrink-0" />
                <p className="max-w-[200px]">
                  D38, Phase 1, Sector 57, Sahibzada Ajit Singh Nagar, Punjab
                  160055, India
                </p>
              </div>

              <div className="flex gap-3">
                <Phone size={20} className="shrink-0" />
                <p>9876577721</p>
              </div>

              <div className="flex gap-3">
                <Mail size={20} className="shrink-0" />
                <p>contact@daanpitara.com</p>
              </div>

              <div className="flex gap-3">
                <Clock size={20} className="shrink-0" />
                <p>Mon – Sat, 10 AM – 6 PM</p>
              </div>
            </div>
          </div>

          {/* Column 4: Subscribe */}
          <div className="flex flex-col gap-6 lg:w-[380px]">
            <h4 className="text-[17px] font-medium">
              Subscribe Our Zheal Media to get the Latest!
            </h4>

            <div className="relative flex w-full items-center rounded-lg bg-white p-1.5 backdrop-blur-sm">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-transparent px-3 text-gray-900 outline-none placeholder:text-gray-500"
              />
              <button className="rounded-md bg-[#005C9F] px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition">
                Subscribe
              </button>
            </div>

            {/* Legal Links Desktop */}
            <div className="mt-auto hidden pt-8 lg:flex justify-end gap-6 text-[13px] text-gray-400">
              <span className="hover:text-white cursor-pointer">
                Terms & Conditions
              </span>
              <span className="hover:text-white cursor-pointer">
                Privacy Policies
              </span>
              <span className="hover:text-white cursor-pointer">Cookies</span>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Section */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-gray-700 pt-8 text-center text-sm text-gray-400 lg:hidden">
          <div className="flex flex-wrap justify-center gap-4">
            <span>Terms & Conditions</span>
            <span>Privacy Policies</span>
            <span>Cookies</span>
          </div>
          <p>© {new Date().getFullYear()} DaanPitara, All Right Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
