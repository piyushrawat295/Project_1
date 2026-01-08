import "./globals.css";

export const metadata = {
  title: "DaanPitara | Trusted NGO & CSR Platform",
  description: "Connecting NGOs, donors and CSR partners globally",
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
        {children}
      </body>
    </html>
  );
}
