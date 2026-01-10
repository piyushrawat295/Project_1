import { GlobeProvider } from "@/context/GlobeContext";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { verifySession } from "@/lib/session";

export const metadata = {
  title: "DaanPitara | Trusted NGO & CSR Platform",
  description: "Connecting NGOs, donors and CSR partners globally",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();

  return (
    <html lang="en">
      <body
        className="bg-white text-gray-900 antialiased"
        style={{ fontFamily: "Satoshi, sans-serif" }}
      >
        <GlobeProvider>
          <Navbar session={session} />
          {children}
        </GlobeProvider>
      </body>
    </html>
  );
}
