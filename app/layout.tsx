import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Kidelivery Admin",
  description: "Admin board for Kidelivery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <ClerkProvider>
        <html lang="fr">
          <body>{children}</body>
        </html>
      </ClerkProvider>
    </Providers>
  );
}
