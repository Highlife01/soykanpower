"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap,
  ChevronDown,
  Menu,
  X,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Shield,
  Layers,
  Cpu,
  Sun,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  categories?: {
    id: string;
    title: string;
    slug: string;
    services: { id: string; title: string; slug: string }[];
  }[];
  siteSetting?: {
    phone?: string | null;
    email?: string | null;
    workingHours?: string | null;
  } | null;
}

export function Header({ categories = [], siteSetting }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const corporateLinks = [
    { title: "Hakkımızda", href: "/kurumsal/hakkimizda", desc: "Mühendislik vizyonumuz ve kurumsal yapımız" },
    { title: "Misyon & Vizyon", href: "/kurumsal/misyon-vizyon", desc: "Geleceğe yön veren mühendislik ilkelerimiz" },
    { title: "Değerlerimiz", href: "/kurumsal/degerlerimiz", desc: "Dürüstlük, teknik mükemmeliyet ve güven" },
    { title: "Kalite Politikamız", href: "/kurumsal/kalite-politikasi", desc: "Uluslararası kalite ve üretim standartları" },
    { title: "İSG Politikamız", href: "/kurumsal/isg-politikasi", desc: "Sıfır iş kazası ve saha güvenliği ilkeleri" },
    { title: "Çevre Politikamız", href: "/kurumsal/cevre-politikasi", desc: "Sürdürülebilir enerji ve yeşil mühendislik" },
    { title: "Belgeler & Sertifikalar", href: "/kurumsal/belgeler-ve-sertifikalar", desc: "Kalite, güvenlik ve yetki belgelerimiz" },
    { title: "İnsan Kaynakları", href: "/kurumsal/insan-kaynaklari", desc: "Yetkin mühendislik ekibimiz ve kariyer vizyonu" },
  ];

  const sectorLinks = [
    { title: "Demir & Çelik", href: "/sektorler/demir-celik" },
    { title: "Makine & İmalat", href: "/sektorler/makine-imalat" },
    { title: "Tekstil Sanayi", href: "/sektorler/tekstil" },
    { title: "Kablo Sanayi", href: "/sektorler/kablo-sanayi" },
    { title: "Gıda & İçecek", href: "/sektorler/gida-sanayi" },
    { title: "Otomotiv", href: "/sektorler/otomotiv" },
    { title: "Su & Atıksu Arıtma", href: "/sektorler/su-ve-atiksu-aritma" },
    { title: "Kamu & Altyapı", href: "/sektorler/kamu-altyapi" },
    { title: "Sağlık & Hastane", href: "/sektorler/saglik-ve-hastane" },
    { title: "Eğitim Kurumları", href: "/sektorler/egitim-kurumlari" },
    { title: "Lojistik & Antrepo", href: "/sektorler/lojistik-ve-antrepo" },
    { title: "Ağır Endüstri & Fabrikalar", href: "/sektorler/agir-endustri-ve-fabrikalar" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-slate-950/95 backdrop-blur-md shadow-xl border-b border-slate-800/80 py-2.5"
          : "bg-gradient-to-b from-slate-950/95 via-slate-950/80 to-transparent py-4"
      )}
    >
      {/* Top Bar - Desktop */}
      {!isScrolled && (
        <div className="hidden lg:block border-b border-slate-800/60 pb-2 mb-2 text-xs text-slate-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center space-x-6">
              {siteSetting?.workingHours && (
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>{siteSetting.workingHours}</span>
                </div>
              )}
              {siteSetting?.phone && (
                <div className="flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <span>{siteSetting.phone}</span>
                </div>
              )}
              {siteSetting?.email && (
                <div className="flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-500" />
                  <span>{siteSetting.email}</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Endüstriyel Mühendislik & Taahhüt
              </span>
              <div className="flex items-center space-x-2 pl-2 border-l border-slate-800 text-slate-400">
                <span className="font-semibold text-amber-400">TR</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer" title="English language support">
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform">
              <Zap className="w-6 h-6 text-slate-950 fill-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-wider text-white flex items-center">
                SOYKAN<span className="text-amber-400 ml-1">POWER</span>
              </span>
              <span className="text-[9px] tracking-widest uppercase font-semibold text-slate-400 -mt-1">
                Mühendislik & Otomasyon
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Kurumsal Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("kurumsal")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={cn(
                  "flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                  pathname.startsWith("/kurumsal")
                    ? "text-amber-400"
                    : "text-slate-200 hover:text-white hover:bg-slate-800/40"
                )}
              >
                <span>Kurumsal</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {activeDropdown === "kurumsal" && (
                <div className="absolute top-full left-0 w-80 pt-2 z-50">
                  <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-xl shadow-2xl p-2 grid gap-1">
                    {corporateLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="p-2.5 rounded-lg hover:bg-slate-800/80 transition-colors group"
                      >
                        <div className="text-sm font-semibold text-slate-200 group-hover:text-amber-400">
                          {link.title}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                          {link.desc}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Hizmetler Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("hizmetler")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/hizmetler"
                className={cn(
                  "flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                  pathname.startsWith("/hizmetler")
                    ? "text-amber-400"
                    : "text-slate-200 hover:text-white hover:bg-slate-800/40"
                )}
              >
                <span>Hizmetler</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </Link>

              {activeDropdown === "hizmetler" && (
                <div className="absolute top-full -left-20 w-[680px] pt-2 z-50">
                  <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-xl shadow-2xl p-5">
                    <div className="grid grid-cols-2 gap-4">
                      {categories.length > 0 ? (
                        categories.slice(0, 4).map((cat) => (
                          <div key={cat.id} className="space-y-2">
                            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-1.5">
                              <span>{cat.title}</span>
                            </div>
                            <div className="space-y-1">
                              {cat.services.slice(0, 4).map((srv) => (
                                <Link
                                  key={srv.id}
                                  href={`/hizmetler/${srv.slug}`}
                                  className="block text-xs text-slate-300 hover:text-white hover:translate-x-1 transition-all py-1"
                                >
                                  {srv.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="space-y-2">
                            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-1">
                              Elektrik Taahhüt & Mühendislik
                            </div>
                            <Link href="/hizmetler/ag-sistemleri" className="block text-xs text-slate-300 hover:text-white py-1">AG Sistemleri</Link>
                            <Link href="/hizmetler/og-sistemleri" className="block text-xs text-slate-300 hover:text-white py-1">OG Sistemleri</Link>
                            <Link href="/hizmetler/trafo-merkezleri" className="block text-xs text-slate-300 hover:text-white py-1">Trafo Merkezleri</Link>
                          </div>
                          <div className="space-y-2">
                            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-1">
                              Endüstriyel Otomasyon & SCADA
                            </div>
                            <Link href="/hizmetler/plc-otomasyon-sistemleri" className="block text-xs text-slate-300 hover:text-white py-1">PLC Sistemleri</Link>
                            <Link href="/hizmetler/scada-sistemleri" className="block text-xs text-slate-300 hover:text-white py-1">SCADA & Proses İzleme</Link>
                            <Link href="/hizmetler/endustri-4-0-ve-iot" className="block text-xs text-slate-300 hover:text-white py-1">Endüstri 4.0 & IoT</Link>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                      <span className="text-slate-400">Projelendirmeden devreye almaya anahtar teslim çözümler</span>
                      <Link
                        href="/hizmetler"
                        className="text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1"
                      >
                        <span>Tüm Hizmetleri İncele</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sektörler Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("sektorler")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/sektorler"
                className={cn(
                  "flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                  pathname.startsWith("/sektorler")
                    ? "text-amber-400"
                    : "text-slate-200 hover:text-white hover:bg-slate-800/40"
                )}
              >
                <span>Sektörler</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </Link>

              {activeDropdown === "sektorler" && (
                <div className="absolute top-full -left-10 w-[500px] pt-2 z-50">
                  <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-xl shadow-2xl p-4">
                    <div className="grid grid-cols-2 gap-2">
                      {sectorLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition-colors"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Projeler */}
            <Link
              href="/projeler"
              className={cn(
                "px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                pathname.startsWith("/projeler")
                  ? "text-amber-400"
                  : "text-slate-200 hover:text-white hover:bg-slate-800/40"
              )}
            >
              Projeler
            </Link>

            {/* Referanslar */}
            <Link
              href="/#referanslar"
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800/40 transition-colors rounded-lg"
            >
              Referanslar
            </Link>

            {/* Haberler */}
            <Link
              href="/haberler"
              className={cn(
                "px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                pathname.startsWith("/haberler")
                  ? "text-amber-400"
                  : "text-slate-200 hover:text-white hover:bg-slate-800/40"
              )}
            >
              Haberler
            </Link>

            {/* Kariyer */}
            <Link
              href="/kariyer"
              className={cn(
                "px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                pathname.startsWith("/kariyer")
                  ? "text-amber-400"
                  : "text-slate-200 hover:text-white hover:bg-slate-800/40"
              )}
            >
              Kariyer
            </Link>

            {/* İletişim */}
            <Link
              href="/iletisim"
              className={cn(
                "px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                pathname === "/iletisim"
                  ? "text-amber-400"
                  : "text-slate-200 hover:text-white hover:bg-slate-800/40"
              )}
            >
              İletişim
            </Link>
          </nav>

          {/* Right CTA - TEKLİF AL */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              href="/teklif-al"
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all overflow-hidden group"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>TEKLİF AL</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-amber-400 focus:outline-none"
            aria-label="Menüyü Aç"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-amber-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-slate-950/98 backdrop-blur-2xl z-50 overflow-y-auto p-6 flex flex-col justify-between border-t border-slate-800">
          <div className="space-y-4">
            <Link
              href="/teklif-al"
              className="w-full flex items-center justify-center py-3.5 text-center font-bold text-slate-950 bg-amber-400 rounded-xl shadow-lg shadow-amber-400/20"
            >
              TEKLİF AL
            </Link>

            <div className="divide-y divide-slate-800 text-slate-200">
              <Link href="/" className="block py-3 font-semibold text-base">
                Ana Sayfa
              </Link>
              <div className="py-2">
                <span className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Kurumsal
                </span>
                <div className="grid grid-cols-2 gap-2 text-sm pl-2">
                  {corporateLinks.map((item) => (
                    <Link key={item.href} href={item.href} className="text-slate-300 py-1">
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
              <Link href="/hizmetler" className="block py-3 font-semibold text-base">
                Hizmetler
              </Link>
              <Link href="/sektorler" className="block py-3 font-semibold text-base">
                Sektörler
              </Link>
              <Link href="/projeler" className="block py-3 font-semibold text-base">
                Projeler
              </Link>
              <Link href="/#referanslar" className="block py-3 font-semibold text-base">
                Referanslar
              </Link>
              <Link href="/haberler" className="block py-3 font-semibold text-base">
                Haberler
              </Link>
              <Link href="/kariyer" className="block py-3 font-semibold text-base">
                Kariyer
              </Link>
              <Link href="/iletisim" className="block py-3 font-semibold text-base">
                İletişim
              </Link>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 text-xs text-slate-400 space-y-2">
            {siteSetting?.phone && <div>Tel: {siteSetting.phone}</div>}
            {siteSetting?.email && <div>E-posta: {siteSetting.email}</div>}
          </div>
        </div>
      )}
    </header>
  );
}
