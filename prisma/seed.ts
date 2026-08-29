import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Soykan Power database...");

  // 1. Admin User
  const passwordHash = await bcrypt.hash("Admin2026!Soykan", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@soykanpower.com" },
    update: {
      password: passwordHash,
    },
    create: {
      email: "admin@soykanpower.com",
      password: passwordHash,
      name: "Soykan Power Yönetici",
      role: "ADMIN",
    },
  });
  console.log("Admin user created/updated:", admin.email);

  // 2. Site Settings
  await prisma.siteSetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      companyName: "Soykan Power Elektrik Mühendislik & Otomasyon",
      phone: "+90 (850) 000 00 00",
      email: "info@soykanpower.com",
      address: "Endüstri ve Teknoloji Bölgesi, Mühendislik Merkezi",
      workingHours: "Hafta İçi: 08:30 - 18:00 | Cumartesi: 09:00 - 13:00",
      linkedinUrl: "https://linkedin.com",
      instagramUrl: "https://instagram.com",
      twitterUrl: "https://x.com",
      facebookUrl: "https://facebook.com",
      footerText: "Elektrik Taahhüt, Endüstriyel Otomasyon, Enerji Sistemleri ve Güneş Enerjisi alanlarında projelendirmeden devreye almaya kadar uçtan uca yüksek mühendislik çözümleri sunar.",
      aboutSummary: "Soykan Power; elektrik taahhüt, endüstriyel otomasyon, enerji dağıtım ve güneş enerjisi sistemlerinde uluslararası standartlara uygun, güvenilir, verimli ve anahtar teslim mühendislik çözümleri üretmektedir.",
    },
  });

  // 3. Service Categories and Services
  const categoriesData = [
    {
      title: "Elektrik Taahhüt & Mühendislik",
      slug: "elektrik-taahhut-ve-muhendislik",
      description: "AG, OG, YG şebeke altyapıları, trafo merkezleri, enerji nakil hatları ve anahtar teslim elektrifikasyon mühendisliği.",
      order: 1,
      services: [
        {
          title: "Alçak Gerilim (AG) Sistemleri",
          slug: "ag-sistemleri",
          shortDesc: "Endüstriyel tesisler ve ticari binalar için güvenli, standartlara uygun AG dağıtım, kablolama ve pano altyapıları.",
          content: `Alçak gerilim (AG) sistemleri, modern sanayi tesisleri ve kurumsal yapıların kesintisiz enerji omurgasını oluşturur. Soykan Power olarak; tesis içi ana ve tali dağıtım hatları, busbar enerji iletim sistemleri, kablo taşıma güzergahları ve son kullanıcı besleme noktalarını IEC standartlarına tam uyumlu projelendirip devreye alıyoruz.
          
Mühendislik ekibimiz; yük analizi, gerilim düşümü hesapları, kısa devre dayanım hesapları ve seçicilik koordinasyonunu titizlikle gerçekleştirerek maksimum operasyonel güvenlik ve minimum enerji kaybı sağlar.`,
          features: JSON.stringify([
            "IEC 61439 standartlarına uygun ana ve tali dağıtım",
            "Busbar sistemleri ve esnek enerji dağıtım güzergahları",
            "Kısa devre, gerilim düşümü ve harmonik hesaplamaları",
            "Kablo kanalı, tava ve merdiven sistemleri montajı",
            "Acil durum ve UPS besleme hatları entegrasyonu",
          ]),
          iconName: "Zap",
          order: 1,
        },
        {
          title: "Orta Gerilim (OG) Sistemleri",
          slug: "og-sistemleri",
          shortDesc: "OG hücre montajları, kablo başlıkları, ring şebeke çözümleri ve anahtarlama sistemleri mühendisliği.",
          content: `Orta Gerilim (OG) şebekelerinde yüksek güvenlik, işletme esnekliği ve kesintisiz enerji sürekliliği esastır. 1kV ile 36kV arasındaki tüm OG altyapılarında; metal clad, metal enclosed ve gaz yalıtımlı (GIS) modüler hücrelerin montajı, primer/sekonder testleri ve devreye alınması uzman mühendis kadromuz tarafından yürütülmektedir.
          
Kablo başlığı uygulamaları, röle koordinasyonu, selektivite ayarları ve manevra planları ulusal şebeke yönetmeliklerine ve uluslararası normlara uygun olarak teslim edilir.`,
          features: JSON.stringify([
            "1kV - 36kV modüler ve gaz yalıtımlı (GIS) hücre montajı",
            "Kuru ve yağlı tip trafo bağlantı ve testleri",
            "OG XLPE kablo montajı ve ısı büzüşmeli / soğuk büzüşmeli başlıklar",
            "Dijital koruma rölesi konfigürasyonu ve testleri",
            "OG manevra ve işletme güvenliği danışmanlığı",
          ]),
          iconName: "Cpu",
          order: 2,
        },
        {
          title: "Yüksek Gerilim (YG) Sistemleri",
          slug: "yg-sistemleri",
          shortDesc: "YG şalt sahaları, iletim hatları arayüzleri ve yüksek gerilim trafo merkezleri altyapı mühendisliği.",
          content: `Yüksek Gerilim tesisleri; ileri seviye mühendislik hesapları, özel güvenlik protokolleri ve yüksek disiplinli saha yönetimi gerektirir. Soykan Power; YG şalt sahası yerleşim projeleri, topraklama ağları hesaplamaları, parafudr ve kesici-ayırıcı gruplarının saha montaj ve testlerinde yetkin mühendislik hizmeti sunar.`,
          features: JSON.stringify([
            "YG şalt sahası tasarımı ve elektromekanik montajı",
            "Primer ve sekonder koruma sistemleri",
            "Adım ve dokunma gerilimi güvenlik hesaplamaları",
            "Kesici, ayırıcı, akım-gerilim trafosu testleri",
          ]),
          iconName: "Activity",
          order: 3,
        },
        {
          title: "Anahtar Teslim Elektrik Taahhüt",
          slug: "elektrik-taahhut",
          shortDesc: "Endüstriyel tesisler, fabrikalar ve büyük ölçekli yapılar için projelendirmeden devreye almaya uçtan uca taahhüt.",
          content: `Komple fabrika elektrifikasyonu, altyapı tesisleri ve kurumsal kampüslerde; projelendirme, malzeme tedariği, montaj, süpervizörlük, test ve kabul süreçlerini tek elden yönetiyoruz. Güçlü tedarik zincirimiz ve deneyimli saha kadromuzla zamanında, bütçesinde ve sıfır iş kazası hedefiyle projeleri hayata geçiriyoruz.`,
          features: JSON.stringify([
            "Ruhsat, uygulama ve as-built projelerin hazırlanması",
            "Şantiye yönetimi, süpervizörlük ve iş güvenliği denetimi",
            "Kalite güvence ve kalite kontrol (QA/QC) süreçleri",
            "Dağıtım şirketi ve resmi kurum kabul süreçlerinin takibi",
          ]),
          iconName: "Building2",
          order: 4,
        },
        {
          title: "Trafo Merkezleri & Dağıtım Binaları",
          slug: "trafo-merkezleri",
          shortDesc: "Kuru ve yağlı tip trafo köşkleri, monoblok beton köşkler ve modüler dağıtım merkezleri kurulumu.",
          content: `Trafo merkezleri; sanayi tesislerinin kesintisiz güç kaynağıdır. Soykan Power; beton köşk, sac köşk ve bina içi trafo merkezlerinde güç trafosu seçimi, havalandırma hesapları, yangın koruma önlemleri, bara bağlantıları ve yağ tutma çukuru detaylarına kadar eksiksiz kurulum ve devreye alma sağlar.`,
          features: JSON.stringify([
            "Hermetik / genleşme depolu yağlı trafolar ve dökme reçineli kuru trafolar",
            "Monoblok beton ve prefabrik trafo köşk montajı",
            "Trafo koruma röleleri, Buchholz ve termik koruma bağlantıları",
            "İzolasyon direnci, oran ve kayıp açısı (Tan Delta) testleri",
          ]),
          iconName: "ShieldCheck",
          order: 5,
        },
        {
          title: "OG Hücre Sistemleri",
          slug: "og-hucre-sistemleri",
          shortDesc: "Giriş-çıkış, kesicili trafo koruma, kuplaj ve gerilim ölçü hücreleri entegrasyonu.",
          content: `İç ortam ve dış ortam OG şalt tesislerinde güvenilir anahtarlama elemanları. Kesicili koruma hücreleri, yük ayırıcılı giriş hücreleri, akım-gerilim ölçü modülleri ve kuplaj hücrelerinin montaj, kilit mekanizmaları (interlock) ve SCADA haberleşme altyapısını entegre ediyoruz.`,
          features: JSON.stringify([
            "LSC2A ve LSC2B servis sürekliliği sınıflarında hücre montajı",
            "Mekanik ve elektriksel interlock güvenlik kilitleri",
            "SF6 gaz basınç izleme ve ark koruma sistemleri",
            "Haberleşmeli motor mekanizmalı uzaktan kumanda altyapısı",
          ]),
          iconName: "Layers",
          order: 6,
        },
        {
          title: "Enerji Nakil Hatları (ENH)",
          slug: "enerji-nakil-hatlari",
          shortDesc: "Havai hat, yer altı kablolu iletim güzergahları ve direk montaj mühendisliği.",
          content: `Üretim tesisleri ve sanayi bölgelerine şebekeden enerji aktarımı sağlayan ENH güzergahlarının etüt, kamulaştırma mühendisliği, pilon/direk montajı, iletken çekimi ve yer altı kablolu iletim projelerini gerçekleştiriyoruz.`,
          features: JSON.stringify([
            "36kV seviyesine kadar havai hat ve yer altı kablo projeleri",
            "Demir direk, beton direk ve travers montajları",
            "Hat sonu ve branşman direği parafudr korumaları",
            "Hat güzergahı topografik etüt ve as-built dokümantasyonu",
          ]),
          iconName: "Navigation",
          order: 7,
        },
        {
          title: "Endüstriyel Tesis & Fabrika Elektrifikasyonu",
          slug: "endustriyel-tesis-elektrifikasyonu",
          shortDesc: "Ağır sanayi, makine hatları, aydınlatma, motor besleme ve acil güç altyapıları.",
          content: `Üretim hatlarının güvenli ve verimli çalışması için motor kontrol merkezleri, kompanzasyon üniteleri, aydınlatma otomasyonu, acil durdurma hatları ve topraklama ağlarının komple tesis içi elektrifikasyonunu gerçekleştiriyoruz.`,
          features: JSON.stringify([
            "Fabrika ana enerji dağıtım omurgası",
            "Makine ve proses besleme kablolaması",
            "Endüstriyel LED aydınlatma ve aydınlatma otomasyonu",
            "DALI, KNX ve SCADA entegreli saha kontrolleri",
          ]),
          iconName: "Factory",
          order: 8,
        },
        {
          title: "Topraklama, Paratoner ve Yıldırımdan Korunma",
          slug: "topraklama-ve-yildirimdan-korunma",
          shortDesc: "Faraday kafesi, erken akış uyarımlı aktif paratoner ve eşpotansiyel topraklama ağları.",
          content: `Tesis güvenliğini doğrudan etkileyen topraklama ağları, temel topraklaması, ring hatları ve yıldırımdan korunma sistemlerinin tasarım, ölçüm ve raporlamalarını ulusal yönetmeliklere uygun yürütüyoruz.`,
          features: JSON.stringify([
            "Eşpotansiyel baralama ve temel topraklaması",
            "Aktif paratoner ve Faraday kafesi tasarımı",
            "Tip 1, Tip 2 ve Tip 3 aşırı gerilim koruma (parafudr) entegrasyonu",
            "Topraklama yayılma direnci ölçümü ve kalibrasyonlu raporlama",
          ]),
          iconName: "ShieldAlert",
          order: 9,
        },
      ],
    },
    {
      title: "Zayıf Akım Sistemleri",
      slug: "zayif-akim-sistemleri",
      description: "IP CCTV, adresli yangın algılama, kartlı geçiş, yapısal kablolama ve akıllı bina teknolojileri.",
      order: 2,
      services: [
        {
          title: "CCTV ve Video İzleme Sistemleri",
          slug: "cctv-guvenlik-sistemleri",
          shortDesc: "Endüstriyel IP kameralar, termal kameralar, plaka tanıma ve video analiz altyapısı.",
          content: `Tesis içi ve çevre güvenlik gereksinimlerine yönelik yüksek çözünürlüklü IP kamera sistemleri, termal izleme, sınır ihlali algılama ve merkezi VMS kayıt yazılımlarının entegrasyonunu yapıyoruz.`,
          features: JSON.stringify([
            "4K ve yüksek çözünürlüklü IP güvenlik kameraları",
            "Ex-Proof ve korozyona dayanıklı endüstriyel muhafazalar",
            "Yapay zeka tabanlı video analiz ve plaka tanıma",
            "Yedekli depolama (SAN/NAS) ve merkezi izleme odaları",
          ]),
          iconName: "Camera",
          order: 1,
        },
        {
          title: "Yangın Algılama ve İhbar Sistemleri",
          slug: "yangin-algilama-sistemleri",
          shortDesc: "EN 54 standartlarına tam uyumlu akıllı adresli yangın algılama ve söndürme kontrol panelleri.",
          content: `Endüstriyel risk analizine dayalı olarak duman, ısı, alev ve optik ışın (beam) tipi dedektörlerle donatılmış, havalandırma/duman tahliye sistemleri ile entegre çalışan akıllı yangın otomasyonu.`,
          features: JSON.stringify([
            "EN 54 uyumlu akıllı adresli santral mimarisi",
            "Hava örneklemeli (aspirating) erken uyarı sistemleri",
            "Sprinkler, gazlı söndürme ve duman tahliye damper entegrasyonu",
            "Acil anons sistemiyle otomatik tahliye senaryoları",
          ]),
          iconName: "Flame",
          order: 2,
        },
        {
          title: "Kartlı Geçiş ve Giriş Kontrol Sistemleri",
          slug: "kartli-gecis-sistemleri",
          shortDesc: "Turnike sistemleri, biyometrik geçiş, bariyerler ve yetkilendirme yazılımları.",
          content: `Personel devam kontrol (PDKS), ziyaretçi yönetimi, RFID/biyometrik okuyucular, elektromanyetik kilitler ve turnike gruplarının merkezi güvenlik yazılımlarıyla entegrasyonu.`,
          features: JSON.stringify([
            "RFID, parmak izi ve yüz tanıma terminalleri",
            "Anti-passback ve bölge bazlı yetkilendirme mimarisi",
            "Yangın anında otomatik kapı kilit tahliye senaryoları",
            "Merkezi veri tabanı ve ERP/İK yazılım entegrasyonu",
          ]),
          iconName: "Lock",
          order: 3,
        },
        {
          title: "Network ve Yapısal Data Altyapısı",
          slug: "network-ve-data-altyapisi",
          shortDesc: "Cat6A/Cat7 kablolama, fiber optik omurga, endüstriyel switchler ve sunucu kabinetleri.",
          content: `Fabrika ve ofis ağlarının güvenli ve yüksek hızlı veri aktarımı için yapısal kablolama, fiber optik füzyon sonlandırma, OT/IT ağ ayrıştırma ve endüstriyel Ethernet switch konfigürasyonları.`,
          features: JSON.stringify([
            "Cat6, Cat6A, Cat7 ve OM3/OM4/OS2 fiber optik kablolama",
            "Fiber optik OTDR test ve sertifikasyon raporlaması",
            "Endüstriyel Layer-2/Layer-3 yönetilebilir switch mimarisi",
            "Server rack kabinet montajı ve yapılandırılmış kablo yönetimi",
          ]),
          iconName: "Network",
          order: 4,
        },
        {
          title: "Acil Anons ve Seslendirme Sistemleri",
          slug: "anons-ve-seslendirme-sistemleri",
          shortDesc: "EN 54-16 sertifikalı çok bölgeli acil durum anonsu ve fon müziği altyapısı.",
          content: `Fabrika sahaları, lojistik depolar ve kamu binalarında yangın ve acil durumlarda net ve anlaşılır tahliye mesajları ileten, yedekli amplifikatör ve hat kontrol modüllerine sahip anons altyapısı.`,
          features: JSON.stringify([
            "EN 54-16 sertifikalı merkezi anons matris üniteleri",
            "Gürültülü üretim alanlarına uygun horn/kolon tipi hoparlörler",
            "Hoparlör hat empedans izleme ve yedek amplifikatör otomatik devreye girme",
            "Bölgesel ve genel ses yayını yönetimi",
          ]),
          iconName: "Volume2",
          order: 5,
        },
        {
          title: "Akıllı Bina ve Entegre Bina Otomasyonu (BMS)",
          slug: "akilli-bina-sistemleri",
          shortDesc: "HVAC kontrolü, aydınlatma, enerji sayaçları ve mekanik sistemlerin tek merkezden yönetimi.",
          content: `Bina Yönetim Sistemleri (BMS) ile ısıtma, soğutma, havalandırma, aydınlatma, su ve enerji parametrelerini BACnet, Modbus ve KNX protokolleri üzerinden tek bir çatı altında izleyip optimize ediyoruz.`,
          features: JSON.stringify([
            "BACnet IP, Modbus RTU/TCP ve KNX entegrasyonu",
            "Enerji tüketim optimizasyonu ve zaman programlama",
            "Mekanik arıza anında otomatik alarm ve eskalasyon",
            "Web tabanlı uzaktan erişim ve kullanıcı dostu grafik arayüz",
          ]),
          iconName: "Home",
          order: 6,
        },
      ],
    },
    {
      title: "Endüstriyel Otomasyon",
      slug: "endustriyel-otomasyon",
      description: "PLC, SCADA, DCS, HMI, Endüstri 4.0, IoT ve kestirimci bakım ile üretim hatlarının akıllı dönüşümü.",
      order: 3,
      services: [
        {
          title: "PLC Sistemleri ve Programlama",
          slug: "plc-otomasyon-sistemleri",
          shortDesc: "Siemens, Schneider, ABB, Rockwell PLC mimarileri ile güvenilir, modüler ve yüksek hızlı proses kontrolü.",
          content: `Soykan Power; karmaşık üretim süreçleri, konveyör hatları, kimyasal reaktörler ve paketleme makineleri için IEC 61131-3 standartlarında (LAD, FBD, SCL, STL) PLC yazılımları geliştirir. Yedekli (redundant) CPU yapıları ve fail-safe (SIL2 / SIL3) güvenlik mimarileri ile sıfır duruş hedefi sunar.`,
          features: JSON.stringify([
            "Siemens S7-1200 / S7-1500 / TIA Portal uzmanlığı",
            "Schneider Modicon, Rockwell Allen-Bradley, ABB PLC mimarileri",
            "Fail-Safe (Safety) PLC ve emniyet fonksiyon blokları (SIL 2 / SIL 3)",
            "Modüler, nesne yönelimli ve dokümante edilmiş temiz yazılım yapısı",
          ]),
          iconName: "Cpu",
          order: 1,
        },
        {
          title: "SCADA Sistemleri ve Proses İzleme",
          slug: "scada-sistemleri",
          shortDesc: "WinCC, Ignition, Wonderware ile gerçek zamanlı veri toplama, trend analizi ve gelişmiş alarm yönetimi.",
          content: `Tüm fabrikanın veya dağıtık tesislerin tek bir kontrol odasından grafiksel olarak izlenmesi, dinamik proses akış şemaları, reçete yönetimi, tarihsel veri tabanı kaydı ve ISA-18.2 standartlarına uygun alarm eskalasyon sistemleri geliştiriyoruz.`,
          features: JSON.stringify([
            "Siemens WinCC / WinCC OA, Inductive Automation Ignition, Wonderware",
            "SQL tabanlı tarihsel veri kaydı (Historian) ve raporlama modülleri",
            "ISA-101 ergonomik HMI/SCADA grafik tasarım prensipleri",
            "Mobil ve web tabanlı güvenli uzaktan izleme arayüzleri",
          ]),
          iconName: "Monitor",
          order: 2,
        },
        {
          title: "HMI Operatör Paneli Çözümleri",
          slug: "hmi-panel-cozumleri",
          shortDesc: "Ergonomik, dokunmatik, çoklu dil destekli ve operatör dostu makine arayüz tasarımları.",
          content: `Saha operatörlerinin makineleri hızlı, hatasız ve sezgisel yönetebilmesi için parametre ayarları, arıza kılavuzları, reçete seçimi ve bakım uyarıları içeren özel HMI ekranları tasarlıyoruz.`,
          features: JSON.stringify([
            "Siemens Comfort / Unified Paneller, Weintek, Pro-face, Beijer",
            "Animasyonlu proses diyagramları ve dinamik pop-up pencereleri",
            "Kullanıcı yetkilendirme ve audit trail (işlem kayıt) altyapısı",
            "PDF kılavuz ve devre şeması görüntüleyici entegrasyonu",
          ]),
          iconName: "Tablet",
          order: 3,
        },
        {
          title: "DCS Dağıtılmış Kontrol Sistemleri",
          slug: "dcs-kontrol-sistemleri",
          shortDesc: "Kimya, çimento, kağıt ve enerji santralleri için büyük ölçekli kesintisiz dağıtık proses kontrolü.",
          content: `Sürekli proses endüstrileri için yüksek I/O kapasiteli, tam yedekli kontrolör, güç kaynağı ve haberleşme omurgasına sahip DCS sistemlerinin projelendirilmesi ve devreye alınması.`,
          features: JSON.stringify([
            "Yüksek kullanılabilirlik (High Availability) ve hot-swap modül yapısı",
            "Merkezi mühendislik istasyonu ve entegre kütüphane standardı",
            "Gelişmiş proses kontrolü (APC) ve regülasyon döngüleri (PID)",
            "Genişletilebilir saha veriyolu (Profibus PA, Foundation Fieldbus, HART)",
          ]),
          iconName: "Sliders",
          order: 4,
        },
        {
          title: "Proses ve Makine Otomasyonu",
          slug: "proses-ve-makine-otomasyonu",
          shortDesc: "Servo sürücüler, hareket kontrolü (Motion Control) ve hassas senkronizasyon mühendisliği.",
          content: `Döner tablalar, sarıcı-çözücü üniteleri, robotik besleme sistemleri ve çok eksenli hareket kontrolü gerektiren özel üretim makinelerinin yazılım ve donanım entegrasyonu.`,
          features: JSON.stringify([
            "Servo motor, enkoder ve invertör hassas hız-pozisyon kontrolü",
            "Elektronik kam (Camming) ve senkron eksen koordinasyonu",
            "Tork kontrolü ve gergi (tension) denetim algoritmaları",
            "CE standartlarına uygun güvenlik ve acil durdurma devreleri",
          ]),
          iconName: "Cog",
          order: 5,
        },
        {
          title: "Endüstri 4.0 ve Endüstriyel IoT",
          slug: "endustri-4-0-ve-iot",
          shortDesc: "OPC UA, MQTT protokolleri ile bulut/sunucu veri köprüleri, OEE hesaplama ve dijital ikiz altyapısı.",
          content: `Sahadaki sensör ve makinelerden gerçek zamanlı operasyonel veri (OT) toplayarak IT sistemlerine, bulut platformlarına veya fabrika içi sunuculara aktaran siber-fiziksel sistemler kuruyoruz.`,
          features: JSON.stringify([
            "OPC-UA, MQTT, REST API ve Node-RED veri köprüleri",
            "Gerçek zamanlı Genel Ekipman Verimliliği (OEE) analitiği",
            "Enerji tüketimi ile üretim adetlerinin korelasyonu",
            "Siber güvenlik standartlarına (IEC 62443) uyumlu edge gateway'ler",
          ]),
          iconName: "Globe",
          order: 6,
        },
        {
          title: "Kestirimci Bakım ve Endüstriyel Veri Toplama",
          slug: "kestirimci-bakim-ve-veri-toplama",
          shortDesc: "Vibrasyon, sıcaklık ve akım harmonik analizleri ile plansız duruşları önceden tespit eden sistemler.",
          content: `Kritik motorlar, pompalar, redüktörler ve kompresörlere yerleştirilen kablosuz/kablolu sensörler vasıtasıyla rulman aşınmaları, mekanik balanssızlıklar ve elektriksel anormallikler önceden tespit edilir.`,
          features: JSON.stringify([
            "FFT spektrum analizi ve ivme/hız vibrasyon izleme",
            "Sıcaklık trendleri ve termal anomali algılama",
            "Makine öğrenimi destekli arıza tahmin algoritmaları",
            "Bakım ekipleri için otomatik SMS ve e-posta uyarı mekanizmaları",
          ]),
          iconName: "TrendingUp",
          order: 7,
        },
        {
          title: "ERP / SAP Üretim Hattı Entegrasyonu",
          slug: "erp-sap-otomasyon-entegrasyonu",
          shortDesc: "İş emirlerinin PLC/SCADA seviyesine aktarılması ve gerçek hammadde-üretim verilerinin ERP'ye iletilmesi.",
          content: `Otomasyon katmanı ile kurumsal iş yazılımları (SAP, IFS, Logo vb.) arasında çift yönlü veri akışı sağlayarak kâğıtsız fabrika ve tam izlenebilirlik oluşturuyoruz.`,
          features: JSON.stringify([
            "İş emri bazlı otomatik reçete yükleme",
            "Üretilen miktar, fire ve duruş kodlarının anlık ERP kaydı",
            "Barkod, QR ve RFID ile ürün izlenebilirlik takip sistemleri",
            "Veri tabanı ara tabloları veya doğrudan API köprüleri",
          ]),
          iconName: "Database",
          order: 8,
        },
      ],
    },
    {
      title: "Enerji Sistemleri & Pano Çözümleri",
      slug: "enerji-sistemleri",
      description: "Tip testli MCC, ADP, kompanzasyon ve otomasyon panoları; enerji kalitesi analizi ve verimlilik mühendisliği.",
      order: 4,
      services: [
        {
          title: "MCC Motor Kontrol Panoları",
          slug: "mcc-motor-kontrol-panolari",
          shortDesc: "Çekmeceli ve sabit tip, Form 4b izolasyonlu, haberleşmeli motor kumanda merkezleri.",
          content: `Ağır sanayi, çimento, kimya ve su arıtma tesislerinde motorların güvenle beslenmesi ve kontrol edilmesi için IEC 61439-2 standartlarına tam uyumlu, tip testli MCC panoları imal ve entegre ediyoruz.`,
          features: JSON.stringify([
            "Form 2b'den Form 4b'ye kadar dahili bölümlendirme sınıfları",
            "Çekmeceli (Withdrawable) ve sabit tip modüler kaset yapıları",
            "Yumuşak yol verici (Soft Starter) ve Frekans İnvertörü (VFD) entegrasyonu",
            "Profibus / Profinet / Modbus haberleşmeli akıllı motor koruma röleleri",
          ]),
          iconName: "Server",
          order: 1,
        },
        {
          title: "ADP Ana Dağıtım Panoları",
          slug: "adp-ana-dagitim-panolari",
          shortDesc: "6300A'e kadar tip testli, yüksek kısa devre dayanımlı ana enerji dağıtım panoları.",
          content: `Tesis giriş enerjisini güvenle karşılayan, jeneratör ve şebeke transferlerini otomatik yöneten, açık tip şalterler ve kompakt şalter grupları ile donatılmış yüksek kapasiteli ana dağıtım merkezleri.`,
          features: JSON.stringify([
            "6300A anma akımına ve 100kA kısa devre dayanımına kadar tip testli tasarım",
            "Otomatik şebeke - jeneratör transfer (ATS / ATS) senkronizasyon sistemleri",
            "Haberleşmeli akıllı şalterler ile uzaktan açma/kapama ve akım takibi",
            "Bakır bara tasarımı, sıcaklık izleme ve ark koruma sistemleri",
          ]),
          iconName: "Power",
          order: 2,
        },
        {
          title: "Harmonik Filtreli Kompanzasyon Panoları",
          slug: "kompanzasyon-panolari",
          shortDesc: "Endüktif ve kapasitif ceza riskini sıfırlayan, tristörlü ve harmonik reaktörlü kompanzasyon.",
          content: `Endüstriyel tesislerde non-lineer yüklerin (invertörler, kaynak makineleri, LED sürücüler) yarattığı harmonik kirliliği sönümleyen, hızlı değişken yüklerde tristörlü anahtarlama ile anlık reaktif güç kompanzasyonu sağlayan sistemler.`,
          features: JSON.stringify([
            "189 Hz, 134 Hz veya özel rezonans frekanslı harmonik filtre reaktörleri",
            "Hızlı yükler için tristör anahtarlamalı (dinamik) kompanzasyon kademeleri",
            "Aktif Harmonik Filtre (AHF) ve Statik VAr Kompanzatör (SVG) çözümleri",
            "Reaktif ceza alarmı ve bulut üzerinden günlük cos(phi) takibi",
          ]),
          iconName: "Activity",
          order: 3,
        },
        {
          title: "Otomasyon ve PLC Kumanda Panoları",
          slug: "otomasyon-panolari",
          shortDesc: "Temiz sinyal dağıtımı, EMC koruması ve yüksek kaliteli etiketleme ile PLC kumanda panoları.",
          content: `PLC, I/O modülleri, sinyal dönüştürücüler, güvenlik röleleri ve 24VDC yedekli güç kaynakları barındıran, EPLAN ortamında tasarlanmış, profesyonel kablaj ve etiketlemeye sahip panolar.`,
          features: JSON.stringify([
            "EPLAN Pro Panel 3D ortamında tasarım ve termal hesaplama",
            "EMC korumalı ekranlama baraları ve izolasyon bariyerleri",
            "Klemens numaralandırma ve lazer markalama etiketleme standardı",
            "Fabrika kabul testleri (FAT) ve nokta-nokta (point-to-point) sinyal doğrulaması",
          ]),
          iconName: "Cpu",
          order: 4,
        },
        {
          title: "Enerji İzleme ve Enerji Kalitesi Yönetimi",
          slug: "enerji-izleme-ve-kalite-yonetimi",
          shortDesc: "Class A enerji analizörleri, harmonik haritalama, gerilim düşümü/sıçraması kaydı ve izleme yazılımları.",
          content: `Fabrika genelindeki tüm enerji hatlarını Class A hassasiyetindeki analizörlerle donatarak THD-V, THD-I, dengesizlik, flicker, transient ve enerji tüketimlerini merkezi enerji yönetim yazılımı ile kayıt altına alıyoruz.`,
          features: JSON.stringify([
            "IEC 61000-4-30 Class A uyumlu enerji kalite kaydedicileri",
            "Gerilim çökmesi (Sag) ve yükselmesi (Swell) dalga formu analizi",
            "Tesis bazlı ISO 50001 Enerji Yönetim Sistemi altyapı hazırlığı",
            "Bölüm ve ürün bazlı spesifik elektrik tüketim raporlaması",
          ]),
          iconName: "BarChart3",
          order: 5,
        },
        {
          title: "Güç Analizi ve Enerji Verimliliği Danışmanlığı",
          slug: "guc-analizi-ve-enerji-verimliligi",
          shortDesc: "Saha ölçümleri ile reaktif/harmonik optimizasyonu, verimsiz motor tespiti ve tasarruf projeleri.",
          content: `Tesis sahasına bağlanan taşınabilir kalibrasyonlu analizörlerle yapılan ölçümler neticesinde elektriksel kayıplar tespit edilir; amortisman süresi hesaplanmış yatırım raporları sunulur.`,
          features: JSON.stringify([
            "Saha enerji denetimi (Energy Audit) ve detaylı mühendislik raporu",
            "Yüksek verimli motor (IE4 / IE5) ve sürücü dönüşüm fizibiliteleri",
            "Trafo ve hat kayıplarının simülasyon modelleri ile tespiti",
            "VAP (Verimlilik Artırıcı Proje) teşvik danışmanlığı altyapısı",
          ]),
          iconName: "Zap",
          order: 6,
        },
      ],
    },
    {
      title: "Güneş Enerjisi (GES)",
      slug: "gunes-enerjisi",
      description: "Çatı ve arazi tipi güneş enerji santrallerinde mühendislik, fizibilite, çağrı mektubu ve anahtar teslim EPC.",
      order: 5,
      services: [
        {
          title: "Endüstriyel Çatı GES Sistemleri",
          slug: "cati-ges-sistemleri",
          shortDesc: "Fabrika ve ticari çatı tiplerine özel statik hesaplı, yüksek verimli güneş enerji santralleri.",
          content: `Sanayi tesislerinin kendi elektrik ihtiyacını yerinde üretmesi için çatı statik analizi, optimum panel yerleşimi, gölgeleme simülasyonları ve yüksek verimli dizi (string) inverter mimarisi ile anahtar teslim GES kurulumu.`,
          features: JSON.stringify([
            "Çatı tipine uygun sızdırmazlık garantili alüminyum konstrüksiyon montajı",
            "Tier-1 sınıfı yüksek verimli monokristal panel teknolojisi",
            "Gelişmiş MPPT takipli endüstriyel string inverter entegrasyonu",
            "Çatı yangın güvenliği, DC ark koruması ve acil hızlı kapatma (Rapid Shutdown)",
          ]),
          iconName: "Sun",
          order: 1,
        },
        {
          title: "Arazi Tipi Güneş Enerji Santralleri",
          slug: "arazi-ges-santralleri",
          shortDesc: "Geniş arazilerde zemin etüdü, çakma profil altyapısı, OG trafo merkezleri ve santral kurulumu.",
          content: `Yüksek kapasiteli arazi GES projelerinde zemin mekaniği testleri, topoğrafik haritalama, tek/çift eksenli takip (tracker) veya sabit açılı montaj sistemleri ve OG şebeke bağlantı noktasına kadar anahtar teslim EPC çözümü.`,
          features: JSON.stringify([
            "Zemin çekme ve korozyon testleri, çakma veya beton temel çözümleri",
            "Merkezi veya dizi inverterli santral mimarisi",
            "Saha OG dağıtım trafo merkezleri ve enerji nakil hattı bağlantısı",
            "Çevre güvenlik kameraları, meteorolojik istasyon ve tel çit altyapısı",
          ]),
          iconName: "Maximize2",
          order: 2,
        },
        {
          title: "GES Fizibilite, Projelendirme ve Çağrı Mektubu Süreçleri",
          slug: "ges-fizibilite-ve-projelendirme",
          shortDesc: "Lisanssız elektrik üretim başvuruları, TEDAŞ/TEİAŞ proje onayları ve yatırım geri dönüş analizleri.",
          content: `GES yatırımının her aşamasında; dağıtım şirketinden Bağlantı Anlaşmasına Çağrı Mektubu (BAÇM) alınması, statik ve elektriksel TEDAŞ onay projelerinin hazırlanması, PVSyst üretim simülasyonları ve finansal nakit akış modellerinin oluşturulması.`,
          features: JSON.stringify([
            "PVSyst / HelioScope ile 3D gölgeleme ve yıllık üretim simülasyonu",
            "Bağlantı Anlaşmasına Çağrı Mektubu (BAÇM) teknik başvuru dosyası",
            "TEDAŞ / Dağıtım Şirketi onaylı elektriksel ve statik uygulama projeleri",
            "İç kârlılık oranı (IRR) ve amortisman süresi yatırım fizibilite raporları",
          ]),
          iconName: "FileText",
          order: 3,
        },
        {
          title: "GES SCADA, İzleme, Test ve Devreye Alma",
          slug: "ges-izleme-ve-devreye-alma",
          shortDesc: "Inverter, piranometre, dize izleme, I-V eğrisi ölçümleri ve resmi kabul süreçleri.",
          content: `Kurulumu tamamlanan GES tesislerinde IEC 62446 standartlarına uygun polarite, süreklilik, izolasyon direnci, I-V eğri testi ve termal drone incelemelerinin yapılması; SCADA izleme sisteminin devreye alınarak resmi TEDAŞ kabulünün tamamlanması.`,
          features: JSON.stringify([
            "IEC 62446 uyumlu I-V eğrisi (I-V Curve) ve izolasyon testleri",
            "Termal drone ile panel sıcak nokta (Hot-Spot) denetimleri",
            "Meteoroloji sensörleri (Işınım, ortam ve panel sıcaklığı, rüzgar) entegrasyonu",
            "Performans Oranı (PR) anlık takibi ve bulut SCADA portalı",
          ]),
          iconName: "CheckCircle2",
          order: 4,
        },
        {
          title: "GES Periyodik Bakım, Temizlik ve İşletme (O&M)",
          slug: "ges-periyodik-bakim-isletme",
          shortDesc: "Robotik panel yıkama, termal görüntüleme, inverter bakımı ve 7/24 uzaktan santral izleme.",
          content: `Santralin 25+ yıllık ekonomik ömrü boyunca maksimum üretimde kalmasını sağlamak üzere planlı periyodik mekanik/elektriksel bakımlar, saf su ile robotik panel temizliği ve acil arıza müdahale hizmetleri sunuyoruz.`,
          features: JSON.stringify([
            "Saf su ve döner fırçalı robotik çatı/arazi panel yıkama",
            "Periyodik cıvata tork kontrolleri ve kablo bağlantı muayeneleri",
            "Trafo yağı dielektrik testleri ve OG hücre bakımları",
            "7/24 uzaktan alarm izleme ve garantili sahaya müdahale süreleri",
          ]),
          iconName: "Wrench",
          order: 5,
        },
      ],
    },
  ];

  for (const cat of categoriesData) {
    const createdCat = await prisma.serviceCategory.upsert({
      where: { slug: cat.slug },
      update: {
        title: cat.title,
        description: cat.description,
        order: cat.order,
      },
      create: {
        title: cat.title,
        slug: cat.slug,
        description: cat.description,
        order: cat.order,
      },
    });

    for (const s of cat.services) {
      await prisma.service.upsert({
        where: { slug: s.slug },
        update: {
          title: s.title,
          shortDesc: s.shortDesc,
          content: s.content,
          features: s.features,
          iconName: s.iconName,
          order: s.order,
          categoryId: createdCat.id,
          metaTitle: `${s.title} | Soykan Power Mühendislik`,
          metaDesc: s.shortDesc,
        },
        create: {
          title: s.title,
          slug: s.slug,
          shortDesc: s.shortDesc,
          content: s.content,
          features: s.features,
          iconName: s.iconName,
          order: s.order,
          categoryId: createdCat.id,
          metaTitle: `${s.title} | Soykan Power Mühendislik`,
          metaDesc: s.shortDesc,
        },
      });
    }
  }
  console.log("Services and categories seeded.");

  // 4. Sectors
  const sectorsData = [
    {
      title: "Demir & Çelik Sanayi",
      slug: "demir-celik",
      shortDesc: "Ağır ark ocakları, haddehane otomasyonları, harmonik filtreleme ve yüksek akım dağıtım sistemleri.",
      content: `Demir ve çelik tesisleri; aşırı dinamik elektriksel yükler, yoğun harmonik bozulmalar ve zorlu ortam şartlarına sahiptir. Soykan Power olarak ark ocağı beslemeleri, hadde hatları senkronizasyonu, kompanzasyon ve yüksek sıcaklığa dayanıklı elektrifikasyon çözümleri sunuyoruz.`,
      solutions: JSON.stringify([
        "Haddehane çok eksenli hız senkronizasyon sistemleri",
        "Dinamik tristörlü kompanzasyon ve aktif harmonik filtreleme",
        "Ark ocağı trafoları sekonder kablolama ve bara altyapıları",
        "Yüksek sıcaklığa dayanıklı sensör ve kablo taşıma sistemleri",
      ]),
      iconName: "Shield",
      order: 1,
    },
    {
      title: "Makine ve İmalat Sanayi",
      slug: "makine-imalat",
      shortDesc: "OEM makine üreticileri için özel pano imalatı, PLC/HMI yazılımları ve hareket kontrolü.",
      content: `Seri veya özel makine üreten sanayi firmalarına; CE normlarına uygun elektrik panoları, kompakt PLC sistemleri, servo motor tahrikleri ve kullanıcı dostu operatör arayüzleri geliştiriyoruz.`,
      solutions: JSON.stringify([
        "Özel makine otomasyon yazılımları (Siemens, Beckhoff vb.)",
        "Kompakt ve estetik makine gövde panoları",
        "Emniyet PLC (Safety) ve ışık bariyeri entegrasyonları",
        "Uzak servis ve VPN modem bağlantı altyapıları",
      ]),
      iconName: "Cog",
      order: 2,
    },
    {
      title: "Tekstil Sanayi",
      slug: "tekstil",
      shortDesc: "İplik, dokuma, boyahane proses otomasyonu, enerji verimliliği ve nem korumalı elektrifikasyon.",
      content: `Tekstil tesislerinde ram makineleri, boya mutfakları ve iplik eğirme hatları için kesintisiz hız kontrolü, buhar-sıcaklık proses regülasyonu ve yüksek verimli motor sürücü dönüşümleri uyguluyoruz.`,
      solutions: JSON.stringify([
        "Boyahane reçete ve dozajlama SCADA sistemleri",
        "Nem ve toza dayanıklı IP65 elektrik panoları",
        "Hava kanalları ve kompresör dairesi enerji optimizasyonu",
        "Kumaş gergi ve kenar kontrol hareket kontrol çözümleri",
      ]),
      iconName: "Layers",
      order: 3,
    },
    {
      title: "Kablo Üretim Tesisleri",
      slug: "kablo-sanayi",
      shortDesc: "Ekstrüder hatları, büküm makineleri, hat senkronizasyonu ve kalite kontrol veri toplama.",
      content: `Kablo imalat hatlarında yüksek hat hızı stabilitesi, çap ölçüm geri beslemeleri ve otomatik sarıcı kontrolü ile sıfır toleranslı üretim ortamı sağlıyoruz.`,
      solutions: JSON.stringify([
        "Ekstrüder sıcaklık bölge kontrolü ve vida devir senkronizasyonu",
        "Çift kafalı otomatik bobin sarıcı gergi kontrolü",
        "Kıvılcım test cihazı (Spark Tester) arıza anı kayıt entegrasyonu",
        "Hat verimlilik (OEE) ve fire takip sistemleri",
      ]),
      iconName: "Activity",
      order: 4,
    },
    {
      title: "Gıda ve İçecek Sanayi",
      slug: "gida-sanayi",
      shortDesc: "Paslanmaz hijyenik panolar, CIP yıkama otomasyonu, dolum-paketleme ve soğuk hava izleme.",
      content: `Gıda güvenliği standartlarına (HACCP, FDA) uygun paslanmaz çelik dağıtım ve kontrol panoları, CIP (Clean-in-Place) sistemleri, pastörizasyon kontrolü ve merkezi sıcaklık izleme altyapıları kuruyoruz.`,
      solutions: JSON.stringify([
        "AISI 304/316 paslanmaz çelik hijyenik kumanda panoları",
        "Otomatik CIP yıkama proses yazılımları",
        "Soğuk hava depoları sıcaklık-nem loglama ve alarm sistemleri",
        "Dolum, etiketleme ve kolileme hatları otomasyonu",
      ]),
      iconName: "Apple",
      order: 5,
    },
    {
      title: "Otomotiv ve Yan Sanayi",
      slug: "otomotiv",
      shortDesc: "Robotlu montaj hatları, pres besleme, punta kaynak trafoları ve ERP izlenebilirlik.",
      content: `Otomotiv ana ve yan sanayi tesislerinde yüksek hız, mutlak güvenlik ve milisaniyelik parça izlenebilirliği gerektiren montaj ve boyahane hatlarının elektrifikasyonunu sağlıyoruz.`,
      solutions: JSON.stringify([
        "Robotik hücreler ve fikstür emniyet devreleri",
        "Profinet ve EtherCAT tabanlı yüksek hızlı haberleşme",
        "Pres hatları otomatik sac besleme ve senkronizasyon",
        "Parça barkod/RFID okuma ve ERP kalite onay entegrasyonu",
      ]),
      iconName: "Car",
      order: 6,
    },
    {
      title: "Su, Atıksu ve Arıtma Tesisleri",
      slug: "su-ve-atiksu-aritma",
      shortDesc: "Pompa istasyonları, debi/basınç regülasyonu, SCADA uzaktan telemetri ve MCC panoları.",
      content: `İçme suyu arıtma, kentsel ve endüstriyel atıksu tesislerinde blower, çamur pompası, ızgara otomasyonu ve uzak terfi merkezlerinin telsiz/GSM telemetri ile SCADA kontrolü.`,
      solutions: JSON.stringify([
        "Fark basınç ve debi kontrollü pompa inverter sürüş sistemleri",
        "Çözünmüş oksijen, pH, bulanıklık ve iletkenlik PID proses kontrolü",
        "GSM / Radyo modem tabanlı uzak terfi istasyonu SCADA entegrasyonu",
        "Yedekli PLC ve jeneratör senkronizasyonlu MCC panoları",
      ]),
      iconName: "Droplets",
      order: 7,
    },
    {
      title: "Kamu ve Altyapı Tesisleri",
      slug: "kamu-altyapi",
      shortDesc: "Hizmet binaları, tünel elektrifikasyonu, arıtma ve şehir şebekesi enerji altyapıları.",
      content: `Şartnamelere tam uyumlu malzeme kalitesi, resmi kabul süreçleri ve yüksek işletme güvenliği ile kamu kampüsleri ve kentsel altyapı projelerinin anahtar teslim elektrik taahhüdü.`,
      solutions: JSON.stringify([
        "Bayındırlık ve Çevre Bakanlığı teknik şartnamelerine uyum",
        "Tünel aydınlatma, jetfan ve yangın kaçış otomasyonları",
        "Orta gerilim trafo merkezleri ve enerji nakil hatları",
        "Merkezi acil aydınlatma ve bina kontrol sistemleri",
      ]),
      iconName: "Landmark",
      order: 8,
    },
    {
      title: "Sağlık Tesisleri ve Hastaneler",
      slug: "saglik-ve-hastane",
      shortDesc: "İzole güç sistemleri (IT sistemleri), ameliyathane panoları ve kesintisiz UPS altyapısı.",
      content: `Hastaneler ve tıp merkezlerinde hasta güvenliği için ameliyathane ve yoğun bakım ünitelerinde medikal izole güç panoları, dinamik jeneratör transferi ve yangın güvenlik sistemleri.`,
      solutions: JSON.stringify([
        "IEC 60364-7-710 uyumlu medikal izole güç (IT) panoları",
        "Yalıtım hata tespit cihazları ve ameliyathane dokunmatik kontrol panelleri",
        "0.5 saniyede devreye giren jeneratör ve statik UPS transfer sistemleri",
        "Hemşire çağrı ve akıllı bina yönetim entegrasyonu",
      ]),
      iconName: "HeartPulse",
      order: 9,
    },
    {
      title: "Eğitim Kurumları ve Üniversiteler",
      slug: "egitim-kurumlari",
      shortDesc: "Kampüs içi OG ring şebekeleri, laboratuvar enerji masaları, data omurgası ve aydınlatma.",
      content: `Geniş üniversite kampüslerinde trafo merkezleri arası ring kablolama, derslik ve amfi aydınlatma otomasyonları, yüksek hızlı fiber omurga ve acil tahliye sistemleri.`,
      solutions: JSON.stringify([
        "Kampüs geneli OG ring dağıtımı ve otomatik transfer",
        "Laboratuvar hassas enerji ve acil durdurma masaları",
        "Yangın algılama ve acil durum seslendirme altyapısı",
        "DALI aydınlatma kontrolü ile enerji tasarrufu",
      ]),
      iconName: "GraduationCap",
      order: 10,
    },
    {
      title: "Lojistik ve Depolama Tesisleri",
      slug: "lojistik-ve-antrepo",
      shortDesc: "Yüksek tavan aydınlatması, otomatik depo (AS/RS) sistemleri ve yangın algılama.",
      content: `Büyük ölçekli lojistik merkezlerinde yüksek tavan LED aydınlatma otomasyonu, otomatik konveyör ve mekik (shuttle) hatları beslemeleri, hava örneklemeli erken yangın algılama sistemleri.`,
      solutions: JSON.stringify([
        "DALI / DSI busbarlı koridor aydınlatma ve hareket sensörü optimizasyonu",
        "AS/RS otomatik istifleme vinçleri enerji iletim busbarları",
        "Erken uyarı ışın tipi (beam) ve aspirasyonlu yangın dedektörleri",
        "Yükleme rampaları ve hızlı sarmal kapı kumanda panoları",
      ]),
      iconName: "Truck",
      order: 11,
    },
    {
      title: "Enerji Üretim ve Dağıtım Santralleri",
      slug: "enerji-uretim-dagitim",
      shortDesc: "HES, RES, Biyogaz santralleri OG/YG şalt tesisleri, senkronizasyon ve SCADA.",
      content: `Yenilenebilir enerji santrallerinde jeneratör koruma ve senkronizasyon panoları, step-up trafo merkezleri, TEİAŞ haberleşme ve RTU panolarının anahtar teslim kurulumu.`,
      solutions: JSON.stringify([
        "Jeneratör senkronizasyon ve hız regülasyon panoları",
        "IEC 60870-5-104 / IEC 61850 protokolleri ile TEİAŞ RTU sistemleri",
        "Santral yardımcı servis (AC/DC) dağıtım panoları ve akü redresör grupları",
        "Primer ve sekonder koruma röleleri konfigürasyonu",
      ]),
      iconName: "BatteryCharging",
      order: 12,
    },
    {
      title: "İnşaat ve Karma Yaşam Projeleri",
      slug: "insaat-ve-karma-projeler",
      shortDesc: "AVM, rezidans, otel ve karma projelerde ana dağıtım, zayıf akım ve enerji otomasyonu.",
      content: `Kompleks çok amaçlı binalarda trafo merkezleri, jeneratör grupları, sayaç otomasyonu, interkom, CCTV ve yangın tahliye sistemlerinin entegre mühendisliği.`,
      solutions: JSON.stringify([
        "Sayaç panoları ve uzaktan otomatik faturalandırma (AMR)",
        "Merkezi jeneratör senkronizasyonu ve dinamik yük atma sistemleri",
        "Entegre BMS bina otomasyonu ve enerji analizi",
        "IP interkom ve akıllı daire otomasyon altyapısı",
      ]),
      iconName: "Building",
      order: 13,
    },
    {
      title: "Ağır Endüstri ve Fabrikalar",
      slug: "agir-endustri-ve-fabrikalar",
      shortDesc: "Çimento, kağıt, kimya ve maden tesislerinde 7/24 kesintisiz güç ve proses kontrolü.",
      content: `Zorlu toz, nem, titreşim ve kimyasal buhar ortamlarında çalışan ağır sanayi kuruluşları için sağlamlaştırılmış elektriksel donanım, MCC panoları ve DCS kontrol sistemleri.`,
      solutions: JSON.stringify([
        "Form 4b bölümlendirmeli tip testli MCC motor kontrol panoları",
        "Ex-Proof aydınlatma, buat ve kumanda butonları",
        "Kestirimci bakım için vibrasyon ve sıcaklık izleme ağları",
        "Yüksek gerilim şalt tesisleri periyodik test ve bakımı",
      ]),
      iconName: "HardHat",
      order: 14,
    },
  ];

  for (const s of sectorsData) {
    await prisma.sector.upsert({
      where: { slug: s.slug },
      update: {
        title: s.title,
        shortDesc: s.shortDesc,
        content: s.content,
        solutions: s.solutions,
        iconName: s.iconName,
        order: s.order,
        metaTitle: `${s.title} Çözümleri | Soykan Power Mühendislik`,
        metaDesc: s.shortDesc,
      },
      create: {
        title: s.title,
        slug: s.slug,
        shortDesc: s.shortDesc,
        content: s.content,
        solutions: s.solutions,
        iconName: s.iconName,
        order: s.order,
        metaTitle: `${s.title} Çözümleri | Soykan Power Mühendislik`,
        metaDesc: s.shortDesc,
      },
    });
  }
  console.log("Sectors seeded.");

  console.log("Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
