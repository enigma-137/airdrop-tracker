import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import '@radix-ui/themes/styles.css';
import { Theme, ThemePanel } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airdrop Tracker",
  description: "Track your airdrop farming projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Theme accentColor="crimson">
          <Navbar />
          <main className="p-8">
            {children}
          </main>
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  );
}
