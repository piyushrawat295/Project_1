"use client";

import { useState } from "react";
import { Search, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex h-[106px] w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 xl:px-[50px]">
        
        {/* LEFT */}
        <div className="flex items-center gap-6 xl:gap-[93px]">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/Logo.png"
              alt="DaanPitara"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="font-semibold text-[16px] leading-none">
                DaanPitara
              </p>
              <p className="text-[12px] text-gray-500">
                Your compassion our code
              </p>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden xl:flex h-[48px] w-[437px] items-center gap-4 rounded-lg border border-[#99A1AF] bg-[#F9FAFB] px-4">
            <Search className="h-5 w-5 text-[#99A1AF]" />

            <input
              className="flex-1 bg-transparent text-[16px] text-[#99A1AF] outline-none placeholder:text-[#99A1AF]"
              placeholder="Search your organization or nearby"
            />

            <button className="flex h-[36px] w-[100px] items-center justify-center rounded-md border border-[#99A1AF] bg-white text-[16px] text-[#99A1AF]">
              Search
            </button>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-8 text-[16px] text-gray-700">
          <a className="hover:text-blue-600">Home</a>
          <a className="hover:text-blue-600">Services</a>
          <a className="hover:text-blue-600">Contact Us</a>
          <a className="hover:text-blue-600">Blogs</a>
          <a className="hover:text-blue-600">About Us</a>

          <button className="rounded-md border border-blue-500 px-5 py-2 text-blue-500 hover:bg-blue-50">
            Sign In
          </button>
        </nav>

        {/* Hamburger (BLACK) */}
        <button
          className="xl:hidden text-black"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="xl:hidden border-t bg-white px-6 py-6 space-y-6">
          
          {/* Mobile Search */}
          <div className="flex h-[48px] items-center gap-3 rounded-lg border border-[#99A1AF] bg-[#F9FAFB] px-4">
            <Search className="h-5 w-5 text-[#99A1AF]" />
            <input
              className="flex-1 bg-transparent text-[16px] outline-none placeholder:text-[#99A1AF]"
              placeholder="Search your organization or nearby"
            />
          </div>

          {/* Links */}
          <nav className="space-y-4 text-[16px] text-gray-700">
            <a className="block">Home</a>
            <a className="block">Services</a>
            <a className="block">Contact Us</a>
            <a className="block">Blogs</a>
            <a className="block">About Us</a>
          </nav>

          <button className="w-full rounded-md border border-blue-500 px-5 py-2 text-blue-500">
            Sign In
          </button>
        </div>
      )}
    </header>
  );
}
