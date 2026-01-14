import { GlobeProvider } from "@/context/GlobeContext";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export const metadata = {
  title: "DaanPitara | Trusted NGO & CSR Platform",
  description: "Connecting NGOs, donors and CSR partners globally",
  icons: {
    icon: "/Logo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("Failed to fetch session:", error);
    // Continue without session - this forces a re-login if needed
  }

  return (
    <html lang="en">
      <body
        className="bg-white text-gray-900 antialiased"
        style={{ fontFamily: "Satoshi, sans-serif" }}
      >
        <GlobeProvider>
          <Navbar session={session} />
          {children}
          <Footer />
        </GlobeProvider>
      </body>
    </html>
  );
}
