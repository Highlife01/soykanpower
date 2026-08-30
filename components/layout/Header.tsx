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
  MapPin,
  BookOpen,
  Sparkles,
  Server,
  Wrench,
  Factory,
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
      setIsScrolled(window.scrollY > 15);
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
    { title: "Hakkımızda", href: "/kurumsal/hakkimizda", desc: "Mühendislik vizyonumuz, yetkin kadromuz ve kurumsal yapımız" },
    { title: "Misyon & Vizyon", href: "/kurumsal/misyon-vizyon", desc: "Geleceğe yön veren mühendislik ilkelerimiz" },
    { title: "Değerlerimiz", href: "/kurumsal/degerlerimiz", desc: "Dürüstlük, teknik mükemmeliyet ve güven" },
    { title: "Kalite Politikamız", href: "/kurumsal/kalite-politikasi", desc: "Uluslararası kalite ve üretim standartları" },
    { title: "İSG Politikamız", href: "/kurumsal/isg-politikasi", desc: "Sıfır iş kazası ve saha güvenliği ilkeleri" },
    { title: "Çevre Politikamız", href: "/kurumsal/cevre-politikasi", desc: "Sürdürülebilir enerji ve yeşil mühendislik" },
    { title: "Belgeler & Sertifikalar", href: "/kurumsal/belgeler-ve-sertifikalar", desc: "ISO, TSE ve IEC yetki belgelerimiz" },
    { title: "İnsan Kaynakları", href: "/kurumsal/insan-kaynaklari", desc: "Yetkin mühendislik ekibimiz ve kariyer vizyonu" },
  ];

  const sectorLinks = [
    { title: "Demir & Çelik", href: "/sektorler/demir-celik", tag: "Ağır Şartlar" },
    { title: "Makine & İmalat", href: "/sektorler/makine-imalat", tag: "PLC & Senkron" },
    { title: "Tekstil Sanayi", href: "/sektorler/tekstil", tag: "Kesintisiz Güç" },
    { title: "Kablo Sanayi", href: "/sektorler/kablo-sanayi", tag: "Ekstrüzyon" },
    { title: "Gıda & İçecek", href: "/sektorler/gida-sanayi", tag: "Hijyenik Pano" },
    { title: "Otomotiv", href: "/sektorler/otomotiv", tag: "Robotik Hatlar" },
    { title: "Su & Atıksu Arıtma", href: "/sektorler/su-ve-atiksu-aritma", tag: "Telemetri" },
    { title: "Kamu & Altyapı", href: "/sektorler/kamu-altyapi", tag: "AG/OG Şalt" },
    { title: "Sağlık & Hastane", href: "/sektorler/saglik-ve-hastane", tag: "İzole Güç" },
    { title: "Eğitim Kurumları", href: "/sektorler/egitim-kurumlari", tag: "Güvenlik & Enerji" },
    { title: "Lojistik & Antrepo", href: "/sektorler/lojistik-ve-antrepo", tag: "Aydınlatma & Otomasyon" },
    { title: "Ağır Endüstri", href: "/sektorler/agir-endustri-ve-fabrikalar", tag: "Trafo & SCADA" },
  ];

  const regionLinks = [
    { title: "Adana (Merkez)", href: "/bolgeler/adana", hub: "Genel Merkez" },
    { title: "Mersin & Liman", href: "/bolgeler/mersin", hub: "Liman & Serbest Bölge" },
    { title: "Gaziantep OSB", href: "/bolgeler/gaziantep", hub: "OSB Bölgesi" },
    { title: "Hatay & İskenderun", href: "/bolgeler/hatay", hub: "Ağır Sanayi" },
    { title: "Osmaniye OSB", href: "/bolgeler/osmaniye", hub: "Demir Çelik" },
    { title: "Antalya & Oteller", href: "/bolgeler/antalya", hub: "Turizm & Ticaret" },
    { title: "Isparta & Depo", href: "/bolgeler/isparta", hub: "Soğuk Hava" },
    { title: "Niğde & Maden", href: "/bolgeler/nigde", hub: "Maden Tesisleri" },
    { title: "KKTC (Kuzey Kıbrıs)", href: "/bolgeler/kktc", hub: "Ada Projeleri" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-slate-950/90 backdrop-blur-xl shadow-2xl border-b border-amber-500/15 py-2.5"
          : "bg-gradient-to-b from-slate-950/98 via-slate-950/85 to-transparent py-3.5"
      )}
    >
      {/* Top Bar - Desktop */}
      {!isScrolled && (
        <div className="hidden lg:block border-b border-slate-800/50 pb-2 mb-2 text-xs text-slate-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] uppercase tracking-wider text-slate-300">
                  7/24 Saha & Mühendislik Hizmeti
                </span>
              </div>
              {siteSetting?.phone && (
                <a
                  href={`tel:${siteSetting.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center space-x-1.5 hover:text-amber-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-semibold text-slate-200">{siteSetting.phone}</span>
                </a>
              )}
              {siteSetting?.email && (
                <a
                  href={`mailto:${siteSetting.email}`}
                  className="flex items-center space-x-1.5 hover:text-amber-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-500" />
                  <span>{siteSetting.email}</span>
                </a>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/25">
                <Sparkles className="w-3 h-3 mr-1" />
                <span>EPC Mühendislik & Otomasyon</span>
              </span>
              <div className="flex items-center space-x-2 pl-2 border-l border-slate-800 text-slate-400">
                <span className="font-bold text-amber-400 text-xs">TR</span>
                <span className="text-slate-700">|</span>
                <span className="text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer" title="English">
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
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:scale-105 group-hover:shadow-amber-500/40 transition-all duration-300">
                <Zap className="w-6 h-6 text-slate-950 fill-slate-950" />
              </div>
              <div className="absolute -inset-0.5 bg-amber-400/30 rounded-xl blur-sm -z-10 group-hover:opacity-100 opacity-50 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-wider text-white flex items-center">
                SOYKAN<span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent ml-1">POWER</span>
              </span>
              <span className="text-[9px] tracking-widest uppercase font-bold text-slate-400 -mt-1 group-hover:text-slate-300 transition-colors">
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
                  "flex items-center space-x-1 px-3.5 py-2 text-sm font-medium transition-all rounded-lg",
                  pathname.startsWith("/kurumsal")
                    ? "text-amber-400 bg-slate-900/80"
                    : "text-slate-200 hover:text-white hover:bg-slate-900/60"
                )}
              >
                <span>Kurumsal</span>
                <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-200", activeDropdown === "kurumsal" && "rotate-180 text-amber-400")} />
              </button>

              {activeDropdown === "kurumsal" && (
                <div className="absolute top-full left-0 w-84 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="glass-panel-dark rounded-2xl shadow-2xl p-2.5 grid gap-1 border border-slate-800/90">
                    {corporateLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="p-2.5 rounded-xl hover:bg-slate-800/80 transition-all group/item"
                      >
                        <div className="text-xs font-bold text-slate-200 group-hover/item:text-amber-400 flex items-center justify-between">
                          <span>{link.title}</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all text-amber-400" />
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
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
                  "flex items-center space-x-1 px-3.5 py-2 text-sm font-medium transition-all rounded-lg",
                  pathname.startsWith("/hizmetler")
                    ? "text-amber-400 bg-slate-900/80"
                    : "text-slate-200 hover:text-white hover:bg-slate-900/60"
                )}
              >
                <span>Hizmetler</span>
                <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-200", activeDropdown === "hizmetler" && "rotate-180 text-amber-400")} />
              </Link>

              {activeDropdown === "hizmetler" && (
                <div className="absolute top-full -left-28 w-[720px] pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="glass-panel-dark rounded-2xl shadow-2xl p-6 border border-slate-800/90">
                    <div className="grid grid-cols-2 gap-6">
                      {categories.length > 0 ? (
                        categories.slice(0, 4).map((cat) => (
                          <div key={cat.id} className="space-y-2">
                            <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-amber-400 border-b border-slate-800/80 pb-2">
                              <Zap className="w-3.5 h-3.5 text-amber-400" />
                              <span>{cat.title}</span>
                            </div>
                            <div className="space-y-1 pt-1">
                              {cat.services.slice(0, 4).map((srv) => (
                                <Link
                                  key={srv.id}
                                  href={`/hizmetler/${srv.slug}`}
                                  className="block text-xs text-slate-300 hover:text-amber-300 hover:translate-x-1 transition-all py-1 font-medium"
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
                            <div className="text-xs font-black uppercase tracking-wider text-amber-400 border-b border-slate-800/80 pb-2 flex items-center space-x-2">
                              <Zap className="w-3.5 h-3.5" />
                              <span>Elektrik Taahhüt & Mühendislik</span>
                            </div>
                            <Link href="/hizmetler/ag-sistemleri" className="block text-xs text-slate-300 hover:text-amber-300 py-1">AG Sistemleri & Altyapı</Link>
                            <Link href="/hizmetler/og-sistemleri" className="block text-xs text-slate-300 hover:text-amber-300 py-1">OG Hücre & Şalt Tesisleri</Link>
                            <Link href="/hizmetler/trafo-merkezleri" className="block text-xs text-slate-300 hover:text-amber-300 py-1">Trafo Merkezleri Kurulumu</Link>
                          </div>
                          <div className="space-y-2">
                            <div className="text-xs font-black uppercase tracking-wider text-amber-400 border-b border-slate-800/80 pb-2 flex items-center space-x-2">
                              <Cpu className="w-3.5 h-3.5" />
                              <span>Endüstriyel Otomasyon & SCADA</span>
                            </div>
                            <Link href="/hizmetler/plc-otomasyon-sistemleri" className="block text-xs text-slate-300 hover:text-amber-300 py-1">Siemens & ABB PLC Sistemleri</Link>
                            <Link href="/hizmetler/scada-sistemleri" className="block text-xs text-slate-300 hover:text-amber-300 py-1">WinCC & SCADA Mimarisi</Link>
                            <Link href="/hizmetler/endustri-4-0-ve-iot" className="block text-xs text-slate-300 hover:text-amber-300 py-1">Endüstri 4.0 & IoT Telemetri</Link>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="mt-5 pt-3 border-t border-slate-800/80 flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium">Uluslararası IEC & TSE Standartlarında Projelendirme</span>
                      <Link
                        href="/hizmetler"
                        className="text-amber-400 hover:text-amber-300 font-bold flex items-center space-x-1 group"
                      >
                        <span>Tüm Mühendislik Hizmetleri</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
                  "flex items-center space-x-1 px-3.5 py-2 text-sm font-medium transition-all rounded-lg",
                  pathname.startsWith("/sektorler")
                    ? "text-amber-400 bg-slate-900/80"
                    : "text-slate-200 hover:text-white hover:bg-slate-900/60"
                )}
              >
                <span>Sektörler</span>
                <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-200", activeDropdown === "sektorler" && "rotate-180 text-amber-400")} />
              </Link>

              {activeDropdown === "sektorler" && (
                <div className="absolute top-full -left-16 w-[560px] pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="glass-panel-dark rounded-2xl shadow-2xl p-5 border border-slate-800/90">
                    <div className="text-xs font-black text-amber-400 uppercase tracking-wider mb-3 pb-2 border-b border-slate-800 flex items-center space-x-2">
                      <Factory className="w-3.5 h-3.5" />
                      <span>Sektörel Mühendislik Çözümleri</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {sectorLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="p-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all flex items-center justify-between group"
                        >
                          <span className="font-semibold group-hover:text-amber-400">{item.title}</span>
                          <span className="text-[10px] text-slate-500 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">{item.tag}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bölgeler Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("bolgeler")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/bolgeler"
                className={cn(
                  "flex items-center space-x-1 px-3.5 py-2 text-sm font-medium transition-all rounded-lg",
                  pathname.startsWith("/bolgeler")
                    ? "text-amber-400 bg-slate-900/80"
                    : "text-slate-200 hover:text-white hover:bg-slate-900/60"
                )}
              >
                <span>Bölgeler</span>
                <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-200", activeDropdown === "bolgeler" && "rotate-180 text-amber-400")} />
              </Link>

              {activeDropdown === "bolgeler" && (
                <div className="absolute top-full -left-16 w-[480px] pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="glass-panel-dark rounded-2xl shadow-2xl p-5 border border-slate-800/90">
                    <div className="text-xs font-black text-amber-400 uppercase tracking-wider mb-3 pb-2 border-b border-slate-800 flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Hizmet Verdiğimiz Sanayi Havzaları</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {regionLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="p-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all flex items-center justify-between group"
                        >
                          <span className="font-semibold group-hover:text-amber-400">{item.title}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{item.hub}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-800 text-right">
                      <Link href="/bolgeler" className="text-xs text-amber-400 hover:underline font-bold">
                        Tüm Sanayi Bölgeleri (9 Bölge) →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Projeler */}
            <Link
              href="/projeler"
              className={cn(
                "px-3.5 py-2 text-sm font-medium transition-all rounded-lg",
                pathname.startsWith("/projeler")
                  ? "text-amber-400 bg-slate-900/80"
                  : "text-slate-200 hover:text-white hover:bg-slate-900/60"
              )}
            >
              Projeler
            </Link>

            {/* Bilgi Merkezi */}
            <Link
              href="/bilgi-merkezi"
              className={cn(
                "px-3.5 py-2 text-sm font-medium transition-all rounded-lg flex items-center space-x-1.5",
                pathname.startsWith("/bilgi-merkezi")
                  ? "text-amber-400 bg-slate-900/80"
                  : "text-slate-200 hover:text-white hover:bg-slate-900/60"
              )}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Bilgi Merkezi</span>
            </Link>

            {/* İletişim */}
            <Link
              href="/iletisim"
              className={cn(
                "px-3.5 py-2 text-sm font-medium transition-all rounded-lg",
                pathname === "/iletisim"
                  ? "text-amber-400 bg-slate-900/80"
                  : "text-slate-200 hover:text-white hover:bg-slate-900/60"
              )}
            >
              İletişim
            </Link>
          </nav>

          {/* Right CTA - TEKLİF AL */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              href="/teklif-al"
              className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all overflow-hidden group animate-shimmer"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>TEKLİF AL</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 hover:text-amber-400 focus:outline-none transition-colors"
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
              className="w-full flex items-center justify-center py-3.5 text-center font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl shadow-lg shadow-amber-400/20"
            >
              <span>TEKLİF AL (HIZLI MÜHENDİSLİK TALEBİ)</span>
            </Link>

            <div className="divide-y divide-slate-800/80 text-slate-200">
              <Link href="/" className="block py-3 font-semibold text-base">
                Ana Sayfa
              </Link>
              <div className="py-2">
                <span className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Kurumsal
                </span>
                <div className="grid grid-cols-2 gap-2 text-sm pl-2">
                  {corporateLinks.map((item) => (
                    <Link key={item.href} href={item.href} className="text-slate-300 py-1 hover:text-amber-400">
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
              <Link href="/hizmetler" className="block py-3 font-semibold text-base hover:text-amber-400">
                Hizmetler
              </Link>
              <Link href="/sektorler" className="block py-3 font-semibold text-base hover:text-amber-400">
                Sektörler
              </Link>
              <div className="py-2">
                <span className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Hizmet Bölgeleri
                </span>
                <div className="grid grid-cols-2 gap-2 text-sm pl-2">
                  {regionLinks.map((item) => (
                    <Link key={item.href} href={item.href} className="text-slate-300 py-1 hover:text-amber-400">
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
              <Link href="/projeler" className="block py-3 font-semibold text-base hover:text-amber-400">
                Projeler
              </Link>
              <Link href="/bilgi-merkezi" className="block py-3 font-semibold text-base text-amber-400">
                Teknik Bilgi Merkezi
              </Link>
              <Link href="/haberler" className="block py-3 font-semibold text-base hover:text-amber-400">
                Haberler
              </Link>
              <Link href="/kariyer" className="block py-3 font-semibold text-base hover:text-amber-400">
                Kariyer
              </Link>
              <Link href="/iletisim" className="block py-3 font-semibold text-base hover:text-amber-400">
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
