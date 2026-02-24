import { GlobeProvider } from "@/context/GlobeContext";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";
import RouteProgressBar from "@/components/layout/RouteProgressBar";
import localFont from 'next/font/local';
import { Suspense } from "react";

const satoshi = localFont({
  src: [
    { path: '../public/fonts/Satoshi-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/Satoshi-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/Satoshi-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-satoshi',
});

export const metadata = {
  title: "DaanPitara | Trusted NGO & CSR Platform",
  description: "Connecting NGOs, donors and CSR partners globally",
  icons: {
    icon: "/Logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${satoshi.variable} font-sans bg-white text-gray-900 antialiased overflow-x-hidden`}
      >
        <NextAuthProvider>
          <GlobeProvider>
            <Suspense fallback={null}>
              <RouteProgressBar />
            </Suspense>
            <Navbar />
            {children}
            <Footer />
          </GlobeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
