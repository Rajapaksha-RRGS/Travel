import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trip IT — Sigiriya, Aukana & Habarana Safari",
  description:
    "Discover the cultural heart of Sri Lanka: the iconic Sigiriya Lion Rock, the 5th-century Aukana Buddha colossus, and herds of wild elephants in Habarana.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#111315] text-[#F1F5F9]">
        {children}
      </body>
    </html>
  );
}
