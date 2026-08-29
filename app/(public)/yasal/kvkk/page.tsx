import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | Soykan Power Mühendislik",
  description: "6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında Aydınlatma Metni.",
};

export default function KvkkPage() {
  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      <div className="border-b border-slate-800 bg-slate-900/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Yasal Bilgilendirme</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            KVKK Aydınlatma Metni
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl">
            6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca kişisel verilerinizin işlenmesi ve korunması hakkında bilgilendirme.
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: "Yasal", href: "/yasal/kvkk" },
          { label: "KVKK Aydınlatma Metni" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 text-slate-300 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
            1. Veri Sorumlusunun Kimliği
          </h2>
          <p>
            Soykan Power (“Şirket”) olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında “Veri Sorumlusu” sıfatıyla, tarafımıza ilettiğiniz kişisel verilerinizi kanuni sınırlar içerisinde özenle işlemekte ve korumaktayız.
          </p>

          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
            2. Kişisel Verilerin İşlenme Amaçları
          </h2>
          <p>
            Web sitemiz üzerinden ilettiğiniz teklif talepleri, iletişim mesajları ve iş başvuruları kapsamında elde edilen kişisel verileriniz (ad, soyad, iletişim bilgileri, özgeçmiş, şirket unvanı ve talep detayları);
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
            <li>Mühendislik, teklif ve keşif süreçlerinin yürütülmesi,</li>
            <li>İletişim ve müşteri ilişkilerinin yönetimi,</li>
            <li>İnsan kaynakları süreçlerinin yürütülmesi ve aday değerlendirme,</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi,</li>
          </ul>
          <p>amaçlarıyla sınırlı olarak işlenmektedir.</p>

          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
            3. Kişisel Verilerin Aktarılması
          </h2>
          <p>
            Kişisel verileriniz; açık rızanız olmaksızın üçüncü şahıslara veya reklam amaçlı kuruluşlara aktarılmaz. Yalnızca yasal zorunluluklar gereği yetkili kamu kurum ve kuruluşları ile kanunen yetkili adli mercilerle paylaşılabilir.
          </p>

          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
            4. İlgili Kişinin Hakları (KVKK Madde 11)
          </h2>
          <p>
            KVKK’nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, düzeltilmesini veya silinmesini isteme haklarına sahipsiniz. Başvurularınızı info@soykanpower.com adresine iletebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
