import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kidelivery Admin",
  description: "Admin board for Kidelivery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
