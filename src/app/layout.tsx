import type { Metadata } from "next";
import localFont from "next/font/local";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const generalSans = localFont({
  src: [
    {
      path: "../../public/fonts/GeneralSans-Variable.woff2",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans-VariableItalic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

const clashDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/ClashDisplay-Variable.woff2",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

const ultra = localFont({
  src: [
    {
      path: "../../public/fonts/Ultra-Regular.ttf",
      style: "normal",
      weight: "400",
    },
  ],
  variable: "--font-ultra",
  display: "swap",
});

const inter = localFont({
  src: [
    {
      path: "../../public/fonts/Inter-Variable.woff2",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

const optimistic = localFont({
  src: [
    {
      path: "../../public/fonts/OptimisticVF.ttf",
      style: "normal",
    },
  ],
  variable: "--font-optimistic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Denzel Oduro",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${generalSans.variable} ${clashDisplay.variable} ${ultra.variable} ${inter.variable} ${optimistic.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
