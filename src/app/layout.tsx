import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppStateProvider } from "@/lib/app-state";
import { MotionProvider } from "@/components/motion-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orbit — Instagram Profile Intelligence",
  description:
    "Connect your Instagram profile and explore visitor activity, engagement patterns and profile insights from one private dashboard. Prototype — not affiliated with Instagram or Meta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-text-primary">
        <MotionProvider>
          <AppStateProvider>{children}</AppStateProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
