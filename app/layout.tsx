import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const headingFont = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.soykanpower.com"),
  title: {
    default: "Soykan Power | Elektrik Taahhüt, Endüstriyel Otomasyon & Enerji Sistemleri",
    template: "%s | Soykan Power Mühendislik",
  },
  description:
    "Elektrik taahhüt, AG/OG/YG şalt sistemleri, trafo merkezleri, PLC/SCADA endüstriyel otomasyon, tip testli pano imalatı ve çatı/arazi güneş enerjisi (GES) anahtar teslim mühendislik çözümleri.",
  keywords: [
    "Soykan Power",
    "Elektrik Taahhüt",
    "Endüstriyel Otomasyon",
    "PLC Programlama",
    "SCADA",
    "Trafo Merkezleri",
    "OG Hücre",
    "MCC Pano",
    "ADP Pano",
    "Güneş Enerjisi",
    "Çatı GES",
    "Enerji Verimliliği",
    "Mühendislik",
  ],
  authors: [{ name: "Soykan Power Mühendislik" }],
  creator: "Soykan Power",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.soykanpower.com",
    title: "Soykan Power | Endüstriyel Mühendislik & Otomasyon",
    description:
      "Elektrik taahhüt, endüstriyel otomasyon, trafo merkezleri ve güneş enerjisi santrallerinde uçtan uca anahtar teslim mühendislik çözümleri.",
    siteName: "Soykan Power",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soykan Power | Endüstriyel Mühendislik & Otomasyon",
    description:
      "Elektrik taahhüt, endüstriyel otomasyon, trafo merkezleri ve güneş enerjisi santrallerinde uçtan uca anahtar teslim mühendislik çözümleri.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${sansFont.variable} ${headingFont.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-slate-950 text-slate-100 flex flex-col min-h-screen selection:bg-amber-400 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
