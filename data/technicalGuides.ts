export interface TechnicalGuideData {
  slug: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: string;
  metaTitle: string;
  metaDesc: string;
  tableOfContents: { id: string; title: string }[];
  contentHtml: string;
  quickAnswer: string;
  keyTakeaways: string[];
  faqs: { question: string; answer: string }[];
  relatedServiceSlug: string;
  relatedSectorSlug?: string;
  relatedRegionSlug?: string;
}

export const TECHNICAL_GUIDES: TechnicalGuideData[] = [
  {
    slug: "orta-gerilim-sistemi-nedir-og-hucre-ve-sebeke-baglantisi",
    title: "Orta Gerilim (OG) Sistemi Nedir? Şebeke Bağlantısı ve Hücre Seçimi Rehberi",
    summary: "1 kV ile 36 kV arasındaki orta gerilim elektrik şebekeleri, endüstriyel tesislerin şebeke bağlantı esasları, modüler hücre türleri ve TEİAŞ/EDAŞ kabul standartları hakkında kapsamlı mühendislik rehberi.",
    category: "OG & Trafo",
    readTime: "7 dk okuma",
    publishedAt: "2026-02-15",
    author: "Soykan Power Mühendislik Departmanı",
    metaTitle: "Orta Gerilim (OG) Sistemi Nedir? Şebeke & Hücre Rehberi | Soykan Power",
    metaDesc: "Orta gerilim (OG) nedir? 34.5 kV şebeke bağlantısı, gaz yalıtımlı ve modüler hücre türleri, trafo seçimi ve TEİAŞ/EDAŞ kabul standartları teknik rehberi.",
    quickAnswer: "Orta Gerilim (OG) sistemleri, anma gerilimi 1 kV (1000 Volt) ile 36 kV (36000 Volt) arasında olan elektrik iletim ve dağıtım sistemleridir. Sanayi tesisleri ve fabrikalar, yüksek güç taleplerini düşük akımla ve minimum enerji kaybıyla karşılamak için elektrik dağıtım şirketlerine (Toroslar EDAŞ, Akdeniz EDAŞ vb.) doğrudan 34.5 kV orta gerilim seviyesinden bağlanır.",
    keyTakeaways: [
      "Türkiye'de standart sanayi dağıtım gerilimi 34.5 kV (36 kV yalıtım seviyesi) olarak uygulanır.",
      "Modüler hücreler; Giriş-Çıkış (Yük Ayırıcılı), Kesicili Trafo Koruma ve Gerilim Ölçü hücreleri olarak gruplanır.",
      "Doğru röle koordinasyonu yapılmayan tesislerde arızalar şebeke kesintisine yol açar.",
      "OG tesislerinde Yüksek Gerilim İşletme Sorumluluğu yasal bir zorunluluktur.",
    ],
    tableOfContents: [
      { id: "og-nedir", title: "1. Orta Gerilim (OG) Nedir ve Neden Kullanılır?" },
      { id: "og-hucre-turleri", title: "2. OG Modüler Hücre Türleri ve Seçim Kriterleri" },
      { id: "sebeke-baglanti-asamalari", title: "3. Sanayi Tesislerinde OG Şebeke Bağlantı Aşamaları" },
      { id: "roley-koordinasyonu", title: "4. Koruma Röleleri ve Selektivite Koordinasyonu" },
      { id: "isletme-sorumlulugu", title: "5. OG Tesislerinde Yasal Yükümlülükler ve İşletme Sorumluluğu" },
    ],
    contentHtml: `
      <h2 id="og-nedir">1. Orta Gerilim (OG) Nedir ve Neden Kullanılır?</h2>
      <p>Elektrik enerjisinin iletimi ve dağıtımında gerilim seviyeleri; Alçak Gerilim (0-1 kV), Orta Gerilim (1-36 kV) ve Yüksek Gerilim (36 kV üstü) olarak sınıflandırılır. Kurulu gücü 400 kVA ve üzerinde olan fabrikalar, organize sanayi bölgesi (OSB) tesisleri ve büyük ticari yapılar enerjiyi doğrudan Alçak Gerilimden (400V) almak yerine Orta Gerilimden (34.5 kV) alırlar.</p>
      <p>Bunun temel mühendislik sebebi Joule kanunudur ($P = I^2 \\cdot R$). Gerilim yükseltildiğinde aynı gücü taşımak için gereken akım ($I$) düşer. Akımın düşmesi, kablo kesitlerinin küçülmesini, iletim kayıplarının azalmasını ve şebeke gerilim kararlılığının korunmasını sağlar.</p>

      <h2 id="og-hucre-turleri">2. OG Modüler Hücre Türleri ve Seçim Kriterleri</h2>
      <p>Orta gerilim şalt merkezlerinde enerjinin güvenli biçimde anahtarlanması, ölçülmesi ve korunması için IEC 62271-200 standardına uygun modüler hücreler kullanılır:</p>
      <ul>
        <li><strong>Yük Ayırıcılı Giriş / Çıkış Hücresi:</strong> Ring şebekelerde enerjinin giriş ve çıkışını sağlayan, yük altında açma-kapama yapabilen hücredir.</li>
        <li><strong>Vakumlu / SF6 Kesicili Trafo Koruma Hücresi:</strong> Güç transformatörünü aşırı akım, kısa devre ve termal aşırı yüklere karşı koruyan, sayısal koruma rölesi ve akım trafolarıyla donatılmış ana koruma hücresidir.</li>
        <li><strong>Gerilim Ölçü ve Sayaç Hücresi:</strong> Gerilim transformatörleri ve çift yönlü elektrik sayaçları ile tüketilen enerjinin faturalandırma ölçümünü yapan hücredir.</li>
        <li><strong>Kuplaj Hücresi:</strong> İki ayrı trafo veya fider kaynağını birbirine bağlayan ya da ayıran hücre tipidir.</li>
      </ul>

      <h2 id="sebeke-baglanti-asamalari">3. Sanayi Tesislerinde OG Şebeke Bağlantı Aşamaları</h2>
      <p>Yeni kurulacak bir endüstriyel tesisin orta gerilimden beslenebilmesi için aşağıdaki mühendislik adımları izlenir:</p>
      <ol>
        <li><strong>Bağlantı Görüşü ve Çağrı Mektubu Başvurusu:</strong> İlgili elektrik dağıtım şirketine (Toroslar EDAŞ, MEDAŞ, vb.) tesisin talep gücü ile başvurulur.</li>
        <li><strong>OG Projelendirme ve Onay:</strong> Kısa devre hesapları, bara kontrolü ve topraklama hesaplarını içeren proje çizilerek TEDAŞ onayına sunulur.</li>
        <li><strong>Saha Kurulumu ve Köşk İmalatı:</strong> Monoblok beton köşk veya bina içine hücreler ve dağıtım trafosu yerleştirilir.</li>
        <li><strong>Geçici ve Kesin Kabul:</strong> Dağıtım şirketi yetkilileri nezaretinde röle testleri ve izolasyon testleri yapılarak tesis enerjilendirilir.</li>
      </ol>

      <h2 id="roley-koordinasyonu">4. Koruma Röleleri ve Selektivite Koordinasyonu</h2>
      <p>Orta gerilim fiderlerinde oluşabilecek bir faz-toprak veya faz-faz kısa devresinin fabrikanın tamamını veya dağıtım şebekesini devre dışı bırakmaması için sayısal koruma rölelerinde <strong>selektivite koordinasyonu</strong> (zaman ve akım kademelendirmesi) yapılmalıdır. Tesis ana kesicisi, arıza anında dağıtım şirketi trafo merkezindeki fider kesicisinden önce açmalıdır.</p>

      <h2 id="isletme-sorumlulugu">5. OG Tesislerinde Yasal Yükümlülükler ve İşletme Sorumluluğu</h2>
      <p>Elektrik Kuvvetli Akım Tesisleri Yönetmeliği'ne göre kendi trafosu bulunan tüm özel işletmeler, EMO onaylı bir elektrik mühendisi ile <strong>Yüksek Gerilim İşletme Sorumluluğu Sözleşmesi</strong> imzalamak zorundadır. İşletme sorumlusu, manevraların güvenle yapılmasından, periyodik trafo yağ testlerinin yaptırılmasından ve İSG kurallarının denetlenmesinden sorumludur.</p>
    `,
    faqs: [
      {
        question: "Bir fabrika için trafo gücü nasıl belirlenir?",
        answer: "Fabrikadaki tüm motorların, aydınlatmanın ve yardımcı sistemlerin kurulu güçleri listelenir; eşzamanlılık (talep) faktörü uygulanarak kVA cinsinden trafo gücü hesaplanır.",
      },
      {
        question: "Hava yalıtımlı hücre ile gaz yalıtımlı hücre arasındaki fark nedir?",
        answer: "Hava yalıtımlı modüler hücreler daha ekonomik ve kolay müdahale edilebilirken; SF6 gaz yalıtımlı kompakt hücreler nemli, tozlu ve dar alanlarda yüksek güvenlik sağlar.",
      },
    ],
    relatedServiceSlug: "og-sistemleri",
    relatedSectorSlug: "agir-sanayi-ve-uretim",
    relatedRegionSlug: "adana",
  },
  {
    slug: "endustriyel-trafo-merkezi-kurulumu-standartlari",
    title: "Endüstriyel Trafo Merkezi Kurulum Aşamaları ve Standartları",
    summary: "Fabrikalarda kuru tip ve yağlı tip trafo seçimi, monoblok beton köşk montajı, havalandırma, yangın güvenliği ve topraklama standartları.",
    category: "OG & Trafo",
    readTime: "6 dk okuma",
    publishedAt: "2026-02-18",
    author: "Soykan Power Mühendislik Departmanı",
    metaTitle: "Trafo Merkezi Nasıl Kurulur? Kurulum Standartları | Soykan Power",
    metaDesc: "Endüstriyel trafo merkezi kurulum aşamaları, kuru ve yağlı tip trafo karşılaştırması, beton köşk havalandırması ve topraklama mühendisliği rehberi.",
    quickAnswer: "Endüstriyel trafo merkezi kurulumu; dağıtım şebekesinden gelen 34.5 kV yüksek enerjiyi tesisin kullanabileceği 400V alçak gerilime dönüştüren şalt binası veya monoblok beton köşk tesisidir. Kurulum; zemin etüdü, trafo seçimi, hücre montajı, topraklama ağı ve EDAŞ kabul süreçlerini kapsar.",
    keyTakeaways: [
      "Kapalı alanlarda ve insan yoğun tesislerde yangın riski nedeniyle dökme reçineli kuru tip trafolar tercih edilir.",
      "Trafo merkezlerinde işletme ve koruma topraklamaları mutlaka standartlara uygun ayrılmalı veya birleştirilmelidir.",
      "Trafo odasında doğal veya cebri havalandırma kapasitesi transformatörün tam yükteki ısı kaybını tahliye edebilmelidir.",
    ],
    tableOfContents: [
      { id: "trafo-turleri", title: "1. Kuru Tip vs Yağlı Tip Transformatör Seçimi" },
      { id: "kosk-ve-yerlesim", title: "2. Beton Köşk ve Bina Tipi Yerleşim Esasları" },
      { id: "topraklama-guvenligi", title: "3. Trafo Merkezi Topraklama ve Adım Gerilimi Güvenliği" },
      { id: "kabul-surecleri", title: "4. Test, Muayene ve Resmi Devreye Alma" },
    ],
    contentHtml: `
      <h2 id="trafo-turleri">1. Kuru Tip vs Yağlı Tip Transformatör Seçimi</h2>
      <p>Endüstriyel projelerde trafo tipi belirlenirken ortam koşulları ve yangın yükü belirleyicidir:</p>
      <ul>
        <li><strong>Dökme Reçineli Kuru Tip Trafolar:</strong> Yanıcı yağ içermez, çevre dostudur, neme karşı dayanıklıdır ve bina içinde kurulabilir. AVM, otel, hastane ve tekstil fabrikalarında zorunlu tercihtir.</li>
        <li><strong>Yağlı Tip Dağıtım Trafoları (Hermetik / Genleşme Depolu):</strong> Açık sahada ve beton köşk içinde ekonomik bir çözümdür. Aşırı yüklenme dayanımı yüksektir ancak yağ sızıntı tavası ve yangın koruma önlemleri gerektirir.</li>
      </ul>

      <h2 id="kosk-ve-yerlesim">2. Beton Köşk ve Bina Tipi Yerleşim Esasları</h2>
      <p>Trafo merkezleri monoblok beton köşklerde TEDAŞ MLZ şartnamelerine uygun olarak konumlandırılır. Transformatörün çalışma sıcaklığını korumak için köşk panjurlarından yeterli hava sirkülasyonu sağlanmalı, aşırı sıcak bölgelerde (Adana, Mersin, Antalya) termostat kontrollü cebri egzoz fanları kullanılmalıdır.</p>

      <h2 id="topraklama-guvenligi">3. Trafo Merkezi Topraklama ve Adım Gerilimi Güvenliği</h2>
      <p>Trafo merkezinde iki ana topraklama bulunur:</p>
      <ul>
        <li><strong>Koruma Topraklaması:</strong> Trafo gövdesi, hücre karkasları ve metal aksamın bağlandığı topraklama.</li>
        <li><strong>İşletme Topraklaması:</strong> Trafo yıldız noktasının (nötr) topraklandığı sistem.</li>
      </ul>
      <p>Topraklama yayılma direnci 1 Ohm'un altında olmalı, potansiyel sürüklenmesini ve tehlikeli adım gerilimlerini önlemek için trafo çevresine eşpotansiyel topraklama ringi tesis edilmelidir.</p>

      <h2 id="kabul-surecleri">4. Test, Muayene ve Resmi Devreye Alma</h2>
      <p>Kabul aşamasında sargı direnci, çevirme oranı, vektör grubu doğrulaması, izolasyon meger testleri ve koruma rölesi primer/sekonder enjeksiyon testleri eksiksiz yapılarak raporlanır.</p>
    `,
    faqs: [
      {
        question: "Trafo merkezi kurulumu ne kadar sürede tamamlanır?",
        answer: "Proje onayı alındıktan sonra köşk temeli, hücre montajı ve kablolama dahil inşaat süreci ortalama 15-25 iş günü sürer.",
      },
    ],
    relatedServiceSlug: "trafo-merkezleri",
    relatedSectorSlug: "agir-sanayi-ve-uretim",
  },
  {
    slug: "fabrikalarda-plc-ve-scada-otomasyonu-nasil-planlanir",
    title: "Fabrikalarda PLC ve SCADA Otomasyonu Nasıl Planlanır?",
    summary: "Üretim hatlarında duruş sürelerini azaltan, ürün kalitesini standartlaştıran ve Endüstri 4.0 veri toplamayı mümkün kılan PLC & SCADA mimarisi planlama rehberi.",
    category: "Otomasyon & SCADA",
    readTime: "8 dk okuma",
    publishedAt: "2026-02-20",
    author: "Soykan Power Otomasyon Mühendisliği",
    metaTitle: "Fabrika Otomasyonu Nasıl Planlanır? PLC & SCADA Rehberi | Soykan Power",
    metaDesc: "Fabrikalarda PLC ve SCADA otomasyonu planlama aşamaları, I/O listesi, endüstriyel haberleşme (Profinet/Modbus) ve SCADA ekran tasarımı rehberi.",
    quickAnswer: "Fabrika otomasyonu planlaması; sahadaki sensör ve aktüatörlerin I/O listesinin çıkarılması, uygun PLC donanımının belirlenmesi, kontrol algoritmalarının kodlanması ve operatörlerin hattı yönetebileceği merkezi SCADA arayüzünün tasarlanması sürecidir.",
    keyTakeaways: [
      "Doğru otomasyon projesi, gelecekteki genişlemeler için en az %20 yedek I/O kapasitesiyle tasarlanmalıdır.",
      "Profinet ve endüstriyel Ethernet, gürültülü fabrika ortamlarında en kararlı haberleşme protokolleridir.",
      "SCADA sistemleri yalnızca kontrol değil, aynı zamanda OEE, enerji tüketimi ve arıza kök neden analizi sunmalıdır.",
    ],
    tableOfContents: [
      { id: "otomasyon-mimarisi", title: "1. PLC ve SCADA Arasındaki Temel Farklar" },
      { id: "planlama-adimlari", title: "2. Adım Adım Otomasyon Projelendirme Aşamaları" },
      { id: "haberlesme-protokolleri", title: "3. Endüstriyel Haberleşme Altyapısı (Profinet, Modbus, OPC-UA)" },
      { id: "guvenlik-ve-yedekleme", title: "4. Fonksiyonel Güvenlik (Safety PLC) ve Veri Yedekleme" },
    ],
    contentHtml: `
      <h2 id="otomasyon-mimarisi">1. PLC ve SCADA Arasındaki Temel Farklar</h2>
      <p><strong>PLC (Programmable Logic Controller):</strong> Sahadaki sensörlerden gelen dijital ve analog sinyalleri milisaniyeler mertebesinde işleyen, motorları, vanaları ve sürücüleri doğrudan kontrol eden donanımsal endüstriyel bilgisayardır.</p>
      <p><strong>SCADA (Supervisory Control and Data Acquisition):</strong> PLC'lerden gelen tüm verileri görselleştiren, operatörlerin reçete girmesine, geçmişe dönük alarmları ve üretim grafiklerini incelemesine olanak tanıyan üst seviye izleme ve yönetim yazılımıdır.</p>

      <h2 id="planlama-adimlari">2. Adım Adım Otomasyon Projelendirme Aşamaları</h2>
      <ol>
        <li><strong>Fonksiyonel Tasarım Şartnamesi (FDS):</strong> Sistemin nasıl çalışacağı mekanik ve kimyasal proses parametreleriyle yazılı hale getirilir.</li>
        <li><strong>Giriş/Çıkış (I/O) Listesi:</strong> Dijital Giriş (DI), Dijital Çıkış (DO), Analog Giriş (AI) ve Analog Çıkış (AO) noktaları belirlenir.</li>
        <li><strong>Pano ve Donanım Seçimi:</strong> Siemens S7-1500, TIA Portal, Omron veya Schneider donanımları seçilerek EPLAN'da pano çizimleri yapılır.</li>
        <li><strong>PLC Yazılım Kodlaması:</strong> IEC 61131-3 standartlarında Ladder (LAD), Structured Text (ST) veya Function Block Diagram (FBD) ile kodlama yapılır.</li>
        <li><strong>SCADA / HMI Tasarımı:</strong> ISA 101 ergonomi standartlarına uygun kullanıcı dostu ekranlar hazırlanır.</li>
      </ol>

      <h2 id="haberlesme-protokolleri">3. Endüstriyel Haberleşme Altyapısı</h2>
      <p>Modern fabrikalarda Profinet RT/IRT, Ethernet/IP ve Modbus TCP protokolleri kullanılır. Üst kurumsal sistemlere (MES / ERP) veri aktarımı için güvenli <strong>OPC-UA</strong> standardı tercih edilir.</p>

      <h2 id="guvenlik-ve-yedekleme">4. Fonksiyonel Güvenlik (Safety PLC) ve Veri Yedekleme</h2>
      <p>Acil stop butonları, ışık bariyerleri ve emniyet kapıları için SIL 3 / PLe standartlarında Safety PLC modülleri kullanılmalı, insan can güvenliği yazılımsal arızalardan bağımsız güvenceye alınmalıdır.</p>
    `,
    faqs: [
      {
        question: "PLC ve SCADA kurulumunda üretim ne kadar süre durur?",
        answer: "Yeni hatlarda üretim duruşu olmaz. Mevcut hatların modernizasyonunda ise simülasyonlar önceden yapılarak sadece 1-3 günlük planlı bakım duruşunda geçiş tamamlanır.",
      },
    ],
    relatedServiceSlug: "plc-otomasyon-sistemleri",
    relatedSectorSlug: "makine-ve-ekipman-imalati",
  },
  {
    slug: "mcc-ve-adp-pano-sistemleri-muhendislik-standartlari",
    title: "MCC ve ADP Pano Sistemleri: Tip Testli Dağıtım Standartları (IEC 61439)",
    summary: "Motor kontrol merkezleri (MCC), ana dağıtım panoları (ADP), Formlama yapıları (Form 2b'den 4b'ye), iç ark dayanımı ve kısa devre testleri.",
    category: "Pano & Enerji",
    readTime: "6 dk okuma",
    publishedAt: "2026-02-22",
    author: "Soykan Power Pano Mühendisliği Departmanı",
    metaTitle: "MCC ve ADP Pano Standartları (IEC 61439) | Soykan Power",
    metaDesc: "Tip testli MCC ve ADP pano sistemleri, IEC 61439 standartları, Form 4b ayrımı, bara sıcaklık artış limitleri ve kompanzasyon pano mühendisliği.",
    quickAnswer: "MCC (Motor Control Center) ve ADP (Ana Dağıtım Panosu) sistemleri, fabrikaların tüm elektrik gücünü ve yüzlerce motorunu güvenle yöneten merkezi panolardır. IEC 61439-1/2 standardına göre tip testli olarak üretilen panolar, kısa devreye, sıcaklık artışına ve yangına karşı maksimum işletme güvenliği sağlar.",
    keyTakeaways: [
      "IEC 61439 standardı, eski tip tip-testli / kısmi tip-testli ayrımını kaldırarak tasarım doğrulaması zorunluluğu getirmiştir.",
      "Kritik tesislerde operatör güvenliği için Form 3b veya Form 4b çekmeceli (withdrawable) panolar tercih edilir.",
      "Doğru bara boyutlandırması, pano içi aşırı ısınmayı ve enerji kayıplarını engeller.",
    ],
    tableOfContents: [
      { id: "iec-61439-onemi", title: "1. IEC 61439 Standartlarının Önemi" },
      { id: "formlama-yapisi", title: "2. Pano İçi Bölümlendirme (Form 1'den Form 4b'ye)" },
      { id: "mcc-teknolojileri", title: "3. Sabit vs Çekmeceli MCC Panoları" },
      { id: "bakim-ve-termal-izleme", title: "4. Pano İçi Termal Kamera ve Online Sıcaklık İzleme" },
    ],
    contentHtml: `
      <h2 id="iec-61439-onemi">1. IEC 61439 Standartlarının Önemi</h2>
      <p>Alçak gerilim anahtarlama ve kontrol düzenekleri standardı olan IEC 61439, panoların nominal akımda sıcaklık artış sınırlarını, kısa devre dayanımını, izolasyon aralıklarını ve IP koruma derecesini akredite laboratuvar testleriyle doğrulamayı şart koşar.</p>

      <h2 id="formlama-yapisi">2. Pano İçi Bölümlendirme (Form 1'den Form 4b'ye)</h2>
      <p>Bölümlendirme, pano içindeki fonksiyonel birimlerin, baraların ve klemenslerin birbirinden metal veya yalıtkan perdelerle ayrılmasıdır:</p>
      <ul>
        <li><strong>Form 2b:</strong> Baralar ile fonksiyonel birimler ayrılmıştır.</li>
        <li><strong>Form 3b:</strong> Fonksiyonel birimler kendi aralarında ve baralardan ayrılmıştır.</li>
        <li><strong>Form 4b:</strong> Fonksiyonel birimler, baralar ve harici kablo bağlantı klemensleri tamamen birbirinden izole edilmiştir. Bir fiderde çalışma yapılırken diğer fiderler enerjili kalabilir.</li>
      </ul>

      <h2 id="mcc-teknolojileri">3. Sabit vs Çekmeceli MCC Panoları</h2>
      <p>Sürekli proses çalışan fabrikalarda (çimento, demir-çelik, cam, kimya) arızalanan bir motor sürücüsünü veya kontaktörü dakikalar içinde panoyu kapatmadan değiştirebilmek için <strong>çekmeceli tip MCC</strong> panoları tercih edilir.</p>
    `,
    faqs: [
      {
        question: "Form 4b pano neden tercih edilmelidir?",
        answer: "Bakım esnasında personelin canlı baralara temas riskini sıfıra indirdiği ve arızalı fiderin tüm panoyu durdurmadan değiştirilmesini sağladığı için tercih edilir.",
      },
    ],
    relatedServiceSlug: "mcc-motor-kontrol-panolari",
    relatedSectorSlug: "agir-sanayi-ve-uretim",
  },
  {
    slug: "sanayi-tesislerinde-cati-ges-kurulumu-fizibilite",
    title: "Sanayi Tesislerinde Çatı GES Kurulumu, Fizibilite ve Mahsuplaşma",
    summary: "Fabrika çatılarında güneş enerjisi santrali (GES) fizibilitesi, statik yük hesapları, Lisanssız Üretim Yönetmeliği 5.1.h maddesi, amortisman süresi ve TEDAŞ onay süreçleri.",
    category: "Güneş Enerjisi (GES)",
    readTime: "7 dk okuma",
    publishedAt: "2026-02-24",
    author: "Soykan Power GES Mühendislik Departmanı",
    metaTitle: "Fabrika Çatı GES Kurulumu & Fizibilite Rehberi | Soykan Power",
    metaDesc: "Sanayi tesislerinde çatı GES fizibilitesi nasıl yapılır? Statik hesap, 5.1.h çağrı mektubu, TEDAŞ proje onayı, aylık mahsuplaşma ve amortisman süresi.",
    quickAnswer: "Sanayi tesislerinde çatı GES kurulumu; fabrikanın çatı alanına fotovoltaik (PV) güneş panelleri kurularak tüketilen elektrik enerjisinin güneşten karşılanması ve ihtiyaç fazlası elektriğin aylık mahsuplaşma ile şebekeye satılması sistemidir. Yatırım amortisman süresi Akdeniz ve Güney bölgelerinde ortalama 3.2 - 4.2 yıldır.",
    keyTakeaways: [
      "Çatı GES yatırımlarında ilk adım, çatı makaslarının ve kaplamasının ilave panel ağırlığını taşıyabileceğinin statik raporla kanıtlanmasıdır.",
      "Lisanssız Elektrik Üretim Yönetmeliği Madde 5.1.h kapsamında sanayiciler sözleşme gücünün iki katına kadar GES kurabilmektedir.",
      "Optimum string inverter yerleşimi, gölgelenme kayıplarını minimize ederek üretim verimini %8-12 artırır.",
    ],
    tableOfContents: [
      { id: "ges-mevzuat", title: "1. Mevzuat ve İzin Süreçleri (5.1.h Çağrı Mektubu)" },
      { id: "statik-ve-cati", title: "2. Çatı Statik Uygunluğu ve Konstrüksiyon Seçimi" },
      { id: "ekipman-secimi", title: "3. Panel ve Inverter Teknolojileri Seçimi" },
      { id: "mahsuplasma-ve-fizibilite", title: "4. Aylık Mahsuplaşma ve Yatırım Getirisi (ROI)" },
    ],
    contentHtml: `
      <h2 id="ges-mevzuat">1. Mevzuat ve İzin Süreçleri (5.1.h Çağrı Mektubu)</h2>
      <p>Fabrikalar, kendi trafo güçleri oranında öztüketim amaçlı çatı GES kurmak için elektrik dağıtım şirketinden (Toroslar EDAŞ, MEDAŞ, Akdeniz EDAŞ vb.) <strong>Bağlantı Anlaşmasına Çağrı Mektubu</strong> alır. Çağrı mektubunun ardından TEDAŞ onaylı elektrik ve statik projeleri hazırlanır.</p>

      <h2 id="statik-ve-cati">2. Çatı Statik Uygunluğu ve Konstrüksiyon Seçimi</h2>
      <p>Sandviç panel, trapez sac veya betonarme çatılarda metrekareye binen yaklaşık 12-16 kg ilave yük için üniversite veya yetkili mühendis onaylı statik uygunluk raporu alınır. Çatı delinmeden özel kenet ve kelepçe sistemleriyle sızdırmazlık korunur.</p>

      <h2 id="ekipman-secimi">3. Panel ve Inverter Teknolojileri Seçimi</h2>
      <p>Endüstriyel GES projelerinde N-Type TOPCon veya HJT monokristal yüksek verimli güneş panelleri ve çoklu MPPT girişli IP66 korumalı string inverterler tercih edilir.</p>

      <h2 id="mahsuplasma-ve-fizibilite">4. Aylık Mahsuplaşma ve Yatırım Getirisi (ROI)</h2>
      <p>Üretilen enerji anlık olarak fabrikada tüketilir. Hafta sonu veya tatil günlerinde üretilen ihtiyaç fazlası enerji şebekeye verilerek ay sonunda fatura üzerinden mahsuplaşılır. Adana, Mersin, Antalya ve Gaziantep gibi yüksek radyasyonlu illerde sistem kendini çok kısa sürede amorti eder.</p>
    `,
    faqs: [
      {
        question: "Çatı GES için fabrikada trafo değişimi gerekir mi?",
        answer: "GES gücü mevcut trafo gücünü aşmıyorsa trafo değişimi gerekmez; sadece çift yönlü sayaç ve enversör koruma röleleri entegre edilir.",
      },
    ],
    relatedServiceSlug: "cati-ges-sistemleri",
    relatedSectorSlug: "enerji-ve-dogal-kaynaklar",
    relatedRegionSlug: "adana",
  },
  {
    slug: "kompanzasyon-sistemleri-reaktif-guc-cezalarini-onleme",
    title: "Kompanzasyon Sistemleri: Reaktif Güç Cezalarını Önleme ve Güç Kalitesi",
    summary: "Endüktif ve kapasitif reaktif ceza sınırları, harmonikli tesislerde tristör anahtarlamalı dinamik kompanzasyon ve rezonans riskini önleme rehberi.",
    category: "Pano & Enerji",
    readTime: "5 dk okuma",
    publishedAt: "2026-02-26",
    author: "Soykan Power Enerji Kalitesi Mühendisliği",
    metaTitle: "Kompanzasyon Nedir? Reaktif Ceza Nasıl Önlenir? | Soykan Power",
    metaDesc: "Reaktif güç kompanzasyonu nedir? Endüktif ve kapasitif ceza sınırları, tristörlü dinamik kompanzasyon, harmonik filtreli kondansatör seçimi rehberi.",
    quickAnswer: "Kompanzasyon, fabrikalardaki motor, trafo ve endüktif yüklerin şebekeden çektiği reaktif gücü kondansatör veya sürücülerle yerinde üreterek şebekeyi rahatlatma işlemidir. EPDK mevzuatına göre endüktif tüketimin %20'yi, kapasitif tüketimin %15'i aşması durumunda faturaya yüksek reaktif ceza yansır.",
    keyTakeaways: [
      "Endüktif sınır %20, Kapasitif sınır %15 olarak uygulanmaktadır.",
      "Harmonik içeren tesislerde klasik kontaktörlü kompanzasyon rezonansa girerek kondansatörleri patlatabilir.",
      "Hızlı yük değişimleri olan kaynak, pres ve vinç tesislerinde tristörlü (statik) kompanzasyon zorunludur.",
    ],
    tableOfContents: [
      { id: "reaktif-nedir", title: "1. Aktif, Reaktif Güç ve CosPhi Kavramı" },
      { id: "yasal-sinirlar", title: "2. EPDK Reaktif Ceza Sınırları" },
      { id: "dinamik-kompanzasyon", title: "3. Klasik vs Tristörlü Dinamik Kompanzasyon" },
      { id: "harmonik-ve-filtre", title: "4. Harmonik Filtre Reaktörlerinin Görevi" },
    ],
    contentHtml: `
      <h2 id="reaktif-nedir">1. Aktif, Reaktif Güç ve CosPhi Kavramı</h2>
      <p>Elektrik şebekesinde iş yapan güce <strong>Aktif Güç (kW)</strong>, manyetik alan oluşturan ancak iş yapmayan güce <strong>Reaktif Güç (kVAr)</strong> denir. Reaktif güç şebekeden çekildiğinde kabloları ısıtır, trafoları gereksiz yükler ve voltaj düşümüne yol açar.</p>

      <h2 id="yasal-sinirlar">2. EPDK Reaktif Ceza Sınırları</h2>
      <p>50 kVA üzeri sözleşme gücüne sahip tüm ticari ve sanayi abonelerinde:</p>
      <ul>
        <li><strong>Endüktif Reaktif / Aktif Oranı:</strong> Maksimum %20</li>
        <li><strong>Kapasitif Reaktif / Aktif Oranı:</strong> Maksimum %15</li>
      </ul>
      <p>Bu sınırların aşılması halinde tüketilen tüm reaktif enerji aktif enerji birim fiyatı üzerinden cezalı olarak faturalandırılır.</p>

      <h2 id="dinamik-kompanzasyon">3. Klasik vs Tristörlü Dinamik Kompanzasyon</h2>
      <p>Kontaktörlü sistemler kademe devreye sokmak için birkaç saniye bekler. Oysa punta kaynağı, lazer kesim, asansör ve vinç gibi yükler saniyede birkaç kez değişir. <strong>Tristör anahtarlamalı (SVG / STATCOM) sistemler</strong> 20 milisaniyede sıfır geçişte devreye girerek reaktif cezayı kesin olarak önler.</p>
    `,
    faqs: [
      {
        question: "Reaktif ceza geldiğinde ne yapmalıyım?",
        answer: "Mühendislik ekibimiz gelerek tesisinizde enerji analizörü ile 24 saatlik log alır, arızalı kondansatörleri veya rezonans sorununu tespit ederek kompanzasyon panonuzu revize eder.",
      },
    ],
    relatedServiceSlug: "kompanzasyon-panolari",
    relatedSectorSlug: "agir-sanayi-ve-uretim",
  },
  {
    slug: "endustriyel-tesislerde-harmonik-filtreleme-ve-guc-kalitesi",
    title: "Endüstriyel Tesislerde Harmonik Filtreleme ve Güç Kalitesi",
    summary: "Frekans sürücüleri, UPS ve ark ocaklarının şebekede yarattığı harmonik bozulmalar (THDv, THDi), aktif harmonik filtreler (AHF) ve IEEE 519 sınırları.",
    category: "Pano & Enerji",
    readTime: "6 dk okuma",
    publishedAt: "2026-02-27",
    author: "Soykan Power Enerji Kalitesi Departmanı",
    metaTitle: "Harmonik Filtreleme & Güç Kalitesi Rehberi | Soykan Power",
    metaDesc: "Endüstriyel tesislerde harmonik nedir? THD sınırları, aktif harmonik filtre (AHF) çalışma prensibi, trafo ve motor ısınmalarını önleme rehberi.",
    quickAnswer: "Harmonikler, endüstriyel tesislerdeki inverterler, sürücüler ve doğrultucular gibi doğrusal olmayan (non-linear) yüklerin 50 Hz sinüs dalga şeklini bozarak 150 Hz, 250 Hz, 350 Hz gibi katlarda oluşturduğu parazit akımlardır. Aktif harmonik filtreler (AHF), bu parazit akımları anında sönümleyerek temiz sinüs dalgası sağlar.",
    keyTakeaways: [
      "Harmonikler trafolarda aşırı ısınmaya, nötr iletkeninde aşırı akıma ve PLC/kart yanmalarına neden olur.",
      "IEEE 519 standardına göre gerilim harmonik bozulması (THDv) %5'in altında tutulmalıdır.",
      "Aktif Harmonik Filtreler (AHF), 50. harmoniğe kadar tüm akım harmoniklerini dinamik olarak filtreler.",
    ],
    tableOfContents: [
      { id: "harmonik-nedir", title: "1. Harmonik Nedir ve Hangi Cihazlar Üretir?" },
      { id: "zararlari", title: "2. Harmoniklerin Fabrika Ekipmanlarına Zararları" },
      { id: "filtreleme-yontemleri", title: "3. Pasif Filtre vs Aktif Harmonik Filtre (AHF)" },
      { id: "olcum-ve-cozum", title: "4. Harmonik Ölçümü ve Doğru Filtre Boyutlandırma" },
    ],
    contentHtml: `
      <h2 id="harmonik-nedir">1. Harmonik Nedir ve Hangi Cihazlar Üretir?</h2>
      <p>Modern fabrikalarda enerji verimliliği için yaygın olarak kullanılan frekans invertörleri (VFD), servo sürücüler, kaynak makineleri, LED sürücüleri ve kesintisiz güç kaynakları (UPS) şebekeden akımı kesikli çeker. Bu durum akım ve gerilim dalgasının şeklini bozarak harmonik kirliliğe yol açar.</p>

      <h2 id="zararlari">2. Harmoniklerin Fabrika Ekipmanlarına Zararları</h2>
      <ul>
        <li>Transformatörlerin aşırı ısınması ve nominal gücünün düşmesi (K-Faktörü gereksinimi).</li>
        <li>Elektrik motorlarında aşırı titreşim, rulman aşınması ve yalıtım delinmesi.</li>
        <li>Nötr hattında aşırı akım akması ve kablo yanma riskleri.</li>
        <li>Elektronik kartların, PLC modüllerinin ve hassas sensörlerin sebepsiz kilitlenmesi veya yanması.</li>
      </ul>

      <h2 id="filtreleme-yontemleri">3. Pasif Filtre vs Aktif Harmonik Filtre (AHF)</h2>
      <p>Pasif filtreler sadece belirli bir frekansa (örneğin 5. harmoniğe) ayarlanırken, <strong>Aktif Harmonik Filtreler (AHF)</strong> şebekedeki harmonik akımı anlık ölçüp ters fazda akım enjekte ederek tüm spektrumu (2. harmoniğin 50. harmoniğe kadar) sıfırlar.</p>
    `,
    faqs: [
      {
        question: "Fabrikamızda harmonik olup olmadığını nasıl anlarız?",
        answer: "Trafonuz nominal yükün altında olmasına rağmen aşırı ısınıyorsa, kondansatörler sık sık bozuluyorsa veya sürücüler aşırı gerilim arızasına geçiyorsa harmonik ölçümü yaptırmanız gerekir.",
      },
    ],
    relatedServiceSlug: "kompanzasyon-panolari",
    relatedSectorSlug: "agir-sanayi-ve-uretim",
  },
  {
    slug: "elektrik-taahhut-firmasi-secerken-dikkat-edilmesi-gerekenler",
    title: "Elektrik Taahhüt Firması Seçerken Dikkat Edilmesi Gereken 10 Kritik Kriter",
    summary: "Sanayi ve ticari bina projelerinde doğru elektrik taahhüt şirketi seçimi: Referans kontrolü, mühendislik yetkinliği, şartname uyumu ve İSG standartları.",
    category: "Standartlar & Mevzuat",
    readTime: "5 dk okuma",
    publishedAt: "2026-03-01",
    author: "Soykan Power Yönetim & Mühendislik Kurulu",
    metaTitle: "Elektrik Taahhüt Firması Seçim Rehberi (10 Kriter) | Soykan Power",
    metaDesc: "Elektrik taahhüt firması seçerken nelere dikkat edilmeli? Mühendislik kadrosu, referans projeler, tip testli malzeme kullanımı ve İSG standartları rehberi.",
    quickAnswer: "Doğru elektrik taahhüt firması seçimi; endüstriyel tesislerin yangın güvenliğini, kesintisiz üretimini ve enerji verimliliğini doğrudan belirler. Karar verirken yalnızca birim fiyat teklifine değil, firmanın mühendislik kadrosuna, tip testli malzeme kullanımına, EDAŞ kabul tecrübesine ve İSG sertifikasyonlarına bakılmalıdır.",
    keyTakeaways: [
      "En ucuz teklif genellikle eksik şartname, kalitesiz kablo veya kabul süreçlerinde gecikme demektir.",
      "Yüklenici firmanın EMO tescil belgesi ve mühendislik yetki belgeleri mutlaka sorgulanmalıdır.",
      "Geçici kabulden sonra garanti süresi ve periyodik servis desteği taahhüt edilmelidir.",
    ],
    tableOfContents: [
      { id: "onemli-kriterler", title: "1. Elektrik Taahhüt Şirketi Değerlendirme Kriterleri" },
      { id: "sozlesme-ve-garanti", title: "2. Sözleşmede Yer Alması Gereken Maddeler" },
      { id: "isg-ve-standartlar", title: "3. İş Sağlığı ve Güvenliği (İSG) Standartları" },
    ],
    contentHtml: `
      <h2 id="onemli-kriterler">1. Elektrik Taahhüt Şirketi Değerlendirme Kriterleri</h2>
      <ol>
        <li><strong>Yetkili Mühendislik Kadrosu:</strong> Şirket bünyesinde SMM belgeli elektrik ve otomasyon mühendislerinin bulunması.</li>
        <li><strong>Benzer Endüstriyel Referanslar:</strong> Tesisinizin sektörüne benzer (tekstil, demir-çelik, gıda, otel) tamamlanmış projeler.</li>
        <li><strong>Dağıtım Şirketi (EDAŞ) Tecrübesi:</strong> Bölgesel EDAŞ ve TEİAŞ kabul prosedürlerine hakimiyet.</li>
        <li><strong>Tip Testli ve Sertifikalı Malzeme Kullanımı:</strong> TSE, CE, IEC standartlarına sahip ürünlerin şartnameye uygun kullanımı.</li>
        <li><strong>İş Güvenliği (İSG) Kültürü:</strong> Yüksekte çalışma, EKAT belgesi ve risk analiz raporlarının eksiksizliği.</li>
      </ol>

      <h2 id="sozlesme-ve-garanti">2. Sözleşmede Yer Alması Gereken Maddeler</h2>
      <p>Taahhüt sözleşmesinde malzeme marka listesi (Vendor List), gecikme cezaları, geçici/kesin kabul şartları ve en az 2 yıllık işçilik ve malzeme garantisi açıkça tanımlanmalıdır.</p>
    `,
    faqs: [
      {
        question: "Soykan Power hangi garantileri sunmaktadır?",
        answer: "Soykan Power, tüm anahtar teslim taahhüt projelerinde 2 yıl malzeme ve işçilik garantisi ile 7/24 teknik servis ve bakım desteği taahhüt eder.",
      },
    ],
    relatedServiceSlug: "elektrik-taahhut-hizmetleri",
  },
];
