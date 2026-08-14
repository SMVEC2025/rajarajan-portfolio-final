import type { Metadata } from "next";
import localFont from "next/font/local";
import { Josefin_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/app/components/SmoothScrollProvider";

/* Josefin Sans — full weight range 100–700, matching the Google Fonts import */
const josefinSans = Josefin_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-josefin-var",
  display: "swap",
});

/* DM Mono — clock / data captions */
const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-mono-var",
  display: "swap",
});

const trajanPro = localFont({
  src: [
    { path: "./fonts/TrajanPro-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/TrajanPro-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-trajan-var",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rajarajan Dhanasekaran — Treasurer, Pro Chancellor & CEO",
  description:
    "I build institutions — and the technology that runs them. Treasurer of SMV Group & MSSE Trust, Pro Chancellor of Takshashila University, CEO of Bloombyte EdTech ERP.",
  keywords: [
    "Rajarajan Dhanasekaran",
    "SMV Trust",
    "MSSE Trust",
    "Takshashila University",
    "Bloombyte",
    "EdTech",
    "Institutional Leadership",
    "Pro Chancellor",
    "Treasurer",
  ],
  openGraph: {
    title: "Rajarajan Dhanasekaran",
    description:
      "Treasurer · SMV Group & MSSE Trust. Pro Chancellor · Takshashila University. CEO · Bloombyte EdTech.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${josefinSans.variable} ${dmMono.variable} ${trajanPro.variable}`}
    >
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
