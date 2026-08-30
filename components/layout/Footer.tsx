import React from "react";
import Link from "next/link";
import {
  Zap,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  Globe,
  BookOpen,
  Award,
  Sparkles,
} from "lucide-react";

interface FooterProps {
  siteSetting?: {
    companyName?: string | null;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    workingHours?: string | null;
    linkedinUrl?: string | null;
    instagramUrl?: string | null;
    twitterUrl?: string | null;
    facebookUrl?: string | null;
    footerText?: string | null;
  } | null;
}

export function Footer({ siteSetting }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/90 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & About */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-3 group inline-flex">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform">
                <Zap className="w-6 h-6 text-slate-950 fill-slate-950" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-wider text-white flex items-center">
                  SOYKAN<span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent ml-1">POWER</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-bold text-slate-400 -mt-1">
                  Mühendislik & Otomasyon
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {siteSetting?.footerText ||
                "Elektrik Taahhüt, Siemens & ABB Endüstriyel Otomasyon, Trafo Merkezleri, Tip Testli Form 4b Panolar ve Güneş Enerjisi (GES) alanlarında uluslararası standartlarda anahtar teslim EPC çözümler."}
            </p>

            {/* Quality & Safety Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>ISO 9001 / 14001 / 45001</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>IEC 61439 Form 4b</span>
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-2">
              {siteSetting?.linkedinUrl && (
                <a
                  href={siteSetting.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 0 0-1.66 1.64 1.65 1.65 0 0 0 1.66 1.65 1.65 1.65 0 0 0 1.65-1.65 1.64 1.64 0 0 0-1.65-1.64Z" />
                  </svg>
                </a>
              )}
              {siteSetting?.instagramUrl && (
                <a
                  href={siteSetting.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              )}
              {siteSetting?.twitterUrl && (
                <a
                  href={siteSetting.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}
              {siteSetting?.facebookUrl && (
                <a
                  href={siteSetting.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.704 0-1.438.109-1.78.463-.342.354-.42.923-.42 1.815v1.706h4.37l-.707 3.667h-3.663v7.98h-4.874Z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Faaliyet Alanları */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 border-l-2 border-amber-500 pl-3">
              Mühendislik & Hizmetler
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/hizmetler/ag-sistemleri" className="hover:text-amber-400 transition-colors flex items-center group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 mr-1 transition-colors" />
                  <span>Alçak Gerilim (AG) Sistemleri</span>
                </Link>
              </li>
              <li>
                <Link href="/hizmetler/og-sistemleri" className="hover:text-amber-400 transition-colors flex items-center group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 mr-1 transition-colors" />
                  <span>Orta Gerilim & Trafo Merkezleri</span>
                </Link>
              </li>
              <li>
                <Link href="/hizmetler/plc-otomasyon-sistemleri" className="hover:text-amber-400 transition-colors flex items-center group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 mr-1 transition-colors" />
                  <span>PLC & SCADA Otomasyon</span>
                </Link>
              </li>
              <li>
                <Link href="/hizmetler/mcc-motor-kontrol-panolari" className="hover:text-amber-400 transition-colors flex items-center group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 mr-1 transition-colors" />
                  <span>MCC & Tip Testli ADP Panoları</span>
                </Link>
              </li>
              <li>
                <Link href="/hizmetler/cati-ges-sistemleri" className="hover:text-amber-400 transition-colors flex items-center group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 mr-1 transition-colors" />
                  <span>Güneş Enerjisi Santralleri (GES)</span>
                </Link>
              </li>
              <li>
                <Link href="/bilgi-merkezi" className="hover:text-amber-400 transition-colors flex items-center font-bold text-amber-400/90 pt-1">
                  <BookOpen className="w-3.5 h-3.5 mr-1" />
                  <span>Teknik Bilgi Merkezi & Makaleler</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Hizmet Bölgeleri */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 border-l-2 border-amber-500 pl-3">
              Sanayi Havzaları
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/bolgeler/adana" className="hover:text-amber-400 transition-colors flex items-center group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 mr-1 transition-colors" />
                  <span>Adana (Merkez & AOSB)</span>
                </Link>
              </li>
              <li>
                <Link href="/bolgeler/mersin" className="hover:text-amber-400 transition-colors flex items-center group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 mr-1 transition-colors" />
                  <span>Mersin & Liman Bölgesi</span>
                </Link>
              </li>
              <li>
                <Link href="/bolgeler/gaziantep" className="hover:text-amber-400 transition-colors flex items-center group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 mr-1 transition-colors" />
                  <span>Gaziantep OSB</span>
                </Link>
              </li>
              <li>
                <Link href="/bolgeler/hatay" className="hover:text-amber-400 transition-colors flex items-center group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 mr-1 transition-colors" />
                  <span>Hatay & İskenderun Sanayi</span>
                </Link>
              </li>
              <li>
                <Link href="/bolgeler/antalya" className="hover:text-amber-400 transition-colors flex items-center group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 mr-1 transition-colors" />
                  <span>Antalya Ticaret & Oteller</span>
                </Link>
              </li>
              <li>
                <Link href="/bolgeler/kktc" className="hover:text-amber-400 transition-colors flex items-center group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 mr-1 transition-colors" />
                  <span>KKTC (Kuzey Kıbrıs)</span>
                </Link>
              </li>
              <li>
                <Link href="/bolgeler" className="text-amber-400 hover:underline transition-colors flex items-center text-xs font-bold pt-1">
                  <span>Tüm Sanayi Bölgeleri (9 Bölge) →</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: İletişim Bilgileri */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 border-l-2 border-amber-500 pl-3">
              Mühendislik İletişim
            </h4>
            <div className="space-y-3.5 text-sm text-slate-400">
              {siteSetting?.address && (
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                  <span>{siteSetting.address}</span>
                </div>
              )}
              {siteSetting?.phone && (
                <a
                  href={`tel:${siteSetting.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center space-x-3 text-slate-300 hover:text-amber-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-semibold">{siteSetting.phone}</span>
                </a>
              )}
              {siteSetting?.email && (
                <a
                  href={`mailto:${siteSetting.email}`}
                  className="flex items-center space-x-3 text-slate-300 hover:text-amber-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{siteSetting.email}</span>
                </a>
              )}
              {siteSetting?.workingHours && (
                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                  <span>{siteSetting.workingHours}</span>
                </div>
              )}

              <div className="pt-2">
                <Link
                  href="/teklif-al"
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-extrabold hover:bg-amber-400 shadow-md shadow-amber-500/20 transition-colors"
                >
                  <span>Projeniz İçin Teklif Alın</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal Links & Copyright */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <div>
            © {currentYear} Soykan Power Mühendislik & Otomasyon. Tüm hakları saklıdır.
          </div>
          <div className="flex flex-wrap items-center space-x-6">
            <Link href="/yasal/kvkk" className="hover:text-slate-300 transition-colors">
              KVKK Aydınlatma Metni
            </Link>
            <Link href="/yasal/gizlilik-politikasi" className="hover:text-slate-300 transition-colors">
              Gizlilik Politikası
            </Link>
            <Link href="/yasal/cerez-politikasi" className="hover:text-slate-300 transition-colors">
              Çerez Politikası
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
