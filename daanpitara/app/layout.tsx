import { GlobeProvider } from "@/context/GlobeContext";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";

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
    <html lang="en">
      <body
        className="bg-white text-gray-900 antialiased"
        style={{ fontFamily: "Satoshi, sans-serif" }}
      >
        <NextAuthProvider>
          <GlobeProvider>
            <Navbar />
            {children}
            <Footer />
          </GlobeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
