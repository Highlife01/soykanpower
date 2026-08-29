export interface RegionData {
  slug: string;
  name: string;
  isHeadquarters: boolean;
  title: string;
  metaTitle: string;
  metaDesc: string;
  heroHeadline: string;
  heroSubheadline: string;
  shortDesc: string;
  industrialProfile: string;
  targetDistricts: string[];
  keyIndustries: string[];
  serviceCapabilities: {
    title: string;
    description: string;
    serviceSlug: string;
    icon: string;
  }[];
  engineeringProcess: {
    step: string;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedServices: string[]; // slugs
  relatedSectors: string[]; // slugs
}

export const REGIONS: RegionData[] = [
  {
    slug: "adana",
    name: "Adana",
    isHeadquarters: true,
    title: "Adana Elektrik Taahhüt, Endüstriyel Otomasyon & Mühendislik Çözümleri",
    metaTitle: "Adana Elektrik Taahhüt, Trafo, AG/OG & Otomasyon | Soykan Power",
    metaDesc: "Soykan Power; Adana merkezli olarak elektrik taahhüt, AG/OG sistemleri, trafo merkezleri, fabrika otomasyonu (PLC/SCADA), MCC panoları ve çatı GES mühendislik hizmetleri sunar.",
    heroHeadline: "Adana ve Çukurova Bölgesinde Güçlü Mühendislik & Elektrik Taahhüt",
    heroSubheadline: "Adana Hacı Sabancı OSB, Ceyhan Enerji İhtisas Bölgesi ve sanayi tesisleri için AG/OG elektrifikasyonu, trafo merkezleri, PLC/SCADA otomasyonu ve enerji çözümleri.",
    shortDesc: "Adana genelinde ve Adana Hacı Sabancı Organize Sanayi Bölgesi (AOSB) başta olmak üzere sanayi tesisleri, tarımsal sanayi, kimya ve tekstil fabrikaları için uçtan uca elektrik mühendisliği, orta gerilim hücre tesisleri, kompanzasyon ve otomasyon taahhüt hizmetleri sunuyoruz.",
    industrialProfile: "Adana; tekstil, kimya, gıda, plastik ve ambalaj sanayisinin yanı sıra Ceyhan Enerji İhtisas Endüstri Bölgesi ile Akdeniz'in en stratejik üretim merkezlerinden biridir. Bölgedeki yüksek kurulu güce sahip sanayi tesislerinde kesintisiz enerji arzı, harmonik filtreleme, reaktif güç kontrolü ve PLC/SCADA tabanlı proses otomasyonu kritik önem taşımaktadır.",
    targetDistricts: ["AOSB (Hacı Sabancı OSB)", "Ceyhan", "Seyhan", "Yüreğir", "Sarıçam", "Kozan", "Yumurtalık"],
    keyIndustries: ["Tekstil & Elyaf Sanayii", "Kimya & Plastik İmalatı", "Gıda & Tarımsal İşleme Tesisleri", "Ambalaj & Oluklu Mukavva", "Enerji Santralleri & Depolama"],
    serviceCapabilities: [
      {
        title: "Fabrika & Tesis Elektrik Taahhüt",
        description: "AOSB ve Adana sanayi tesislerinde kablo kanalları, busbar sistemleri, aydınlatma, topraklama ve paratoner tesisatı mühendisliği.",
        serviceSlug: "elektrik-taahhut-hizmetleri",
        icon: "Zap",
      },
      {
        title: "Orta Gerilim & Trafo Merkezleri",
        description: "34.5 kV hücre montajı, kuru ve yağlı tip dağıtım transformatörleri, TEİAŞ/Toroslar EDAŞ kabul ve işletme sorumluluğu.",
        serviceSlug: "og-sistemleri",
        icon: "Cpu",
      },
      {
        title: "Endüstriyel Otomasyon & PLC/SCADA",
        description: "Siemens S7-1500, TIA Portal, WinCC SCADA ve DCS mimarileriyle hat entegrasyonu, proses kontrolü ve veri toplama (IoT).",
        serviceSlug: "plc-otomasyon-sistemleri",
        icon: "Server",
      },
      {
        title: "MCC & ADP Pano İmalatı ve Montajı",
        description: "IEC 61439 Form 4b tip testli motor kontrol merkezleri, frekans konvertörlü sürücü panoları ve harmonik filtreli kompanzasyon.",
        serviceSlug: "mcc-motor-kontrol-panolari",
        icon: "Layers",
      },
      {
        title: "Çatı & Arazi GES Kurulumu",
        description: "Adana'nın yüksek güneşlenme potansiyeline uygun endüstriyel çatı GES projelendirme, statik hesap, çağrı mektubu ve anahtar teslim kurulum.",
        serviceSlug: "cati-ges-sistemleri",
        icon: "SunMedium",
      },
    ],
    engineeringProcess: [
      {
        step: "01",
        title: "Yerinde Saha Keşfi & Enerji Analizi",
        description: "Adana ve AOSB tesislerinde mevcut elektrik yükleri, trafo kapasitesi ve reaktif değerler yerinde ölçümlenir.",
      },
      {
        step: "02",
        title: "Teknik Projelendirme & Şartname Hazırlığı",
        description: "Toroslar EDAŞ ve yürürlükteki TSE/IEC standartlarına uygun AutoCAD/EPLAN projeleri çizilir.",
      },
      {
        step: "03",
        title: "Saha Uygulaması & Pano Entegrasyonu",
        description: "Uzman mühendis ve teknisyen kadrosu ile İSG kuralları çerçevesinde montaj ve kablolama tamamlanır.",
      },
      {
        step: "04",
        title: "Test, Devreye Alma & Kabul İşlemleri",
        description: "Yalıtım, röle koordinasyon, harmonik testleri yapılarak resmi kabul ve anahtar teslimi gerçekleştirilir.",
      },
    ],
    faqs: [
      {
        question: "Adana'da elektrik taahhüt ve trafo kurulumu için keşif yapıyor musunuz?",
        answer: "Evet, Adana genelinde ve Adana Hacı Sabancı OSB içerisindeki tüm sanayi tesisleri, depolar ve fabrikalar için mühendislik ekibimiz yerinde teknik keşif ve yük analizi yapmaktadır.",
      },
      {
        question: "Toroslar EDAŞ proje onay ve kabul süreçlerini yürütüyor musunuz?",
        answer: "Evet, OG bağlantı anlaşması, trafo merkezi projeleri, kabul dosyaları ve geçici/kesin kabul süreçleri yetkili elektrik mühendislerimizce uçtan uca takip edilmektedir.",
      },
      {
        question: "AOSB'deki fabrikalarda reaktif ceza sorununu nasıl çözüyorsunuz?",
        answer: "Tesisinizin harmonik spektrumunu ve yük profilini analiz ederek tristör anahtarlamalı dinamik kompanzasyon ve harmonik filtreli pano sistemleri kuruyor, reaktif ceza riskini sıfırlıyoruz.",
      },
      {
        question: "Adana fabrikaları için PLC ve SCADA revizyonu yapıyor musunuz?",
        answer: "Eski röleli sistemlerin veya eski nesil PLC'lerin modern Siemens, Schneider veya Omron PLC sistemlerine dönüştürülmesi ve SCADA izleme yazılımlarının kurulması hizmetini sunuyoruz.",
      },
      {
        question: "Adana'da endüstriyel çatı GES kurulum süreci nasıl işler?",
        answer: "Çatı statik uygunluk kontrolü, elektrik bağlantı kapasitesi analizi, Toroslar EDAŞ çağrı mektubu başvurusu, TEDAŞ proje onayı ve anahtar teslim GES kurulumunu gerçekleştiriyoruz.",
      },
    ],
    relatedServices: ["og-sistemleri", "trafo-merkezleri", "plc-otomasyon-sistemleri", "mcc-motor-kontrol-panolari", "cati-ges-sistemleri"],
    relatedSectors: ["tekstil-sanayii", "gida-ve-icecek-tesisleri", "kimya-ve-petrokimya", "agir-sanayi-ve-uretim"],
  },
  {
    slug: "mersin",
    name: "Mersin",
    isHeadquarters: false,
    title: "Mersin Elektrik Taahhüt, Liman & Endüstriyel Otomasyon Çözümleri",
    metaTitle: "Mersin Elektrik Taahhüt, Liman Elektrifikasyonu & OG Sistemleri | Soykan Power",
    metaDesc: "Mersin genelinde liman elektrifikasyonu, Tarsus OSB ve Mersin Serbest Bölge tesisleri için elektrik taahhüt, trafo, OG hücre, PLC/SCADA ve endüstriyel pano mühendisliği.",
    heroHeadline: "Mersin Sanayi, Liman ve Lojistik Tesislerinde Mühendislik Çözümleri",
    heroSubheadline: "Mersin Limanı, Tarsus OSB, Serbest Bölge ve Akdeniz sahil kuşağındaki endüstriyel tesisler için yüksek dayanımlı elektrik altyapısı ve otomasyon taahhüdü.",
    shortDesc: "Mersin ve Tarsus sanayi havzasında yer alan liman terminalleri, lojistik depolar, petrokimya tesisleri ve narenciye paketleme tesisleri için korozyona dayanıklı elektrik tesisatı, orta gerilim trafo merkezleri ve PLC otomasyon sistemleri uyguluyoruz.",
    industrialProfile: "Mersin; Türkiye'nin en büyük konteyner limanlarından birine, serbest bölgeye ve geniş bir lojistik/tarımsal işleme ağına ev sahipliği yapmaktadır. Deniz kıyısı ortamı nedeniyle yüksek korozyon dayanımlı paslanmaz/özel korumalı panolar, ex-proof elektrik tesisatı ve kesintisiz liman vinç otomasyonu kritik gereksinimlerdir.",
    targetDistricts: ["Mersin Uluslararası Limanı (MIP)", "Mersin Serbest Bölge (MESBAŞ)", "Tarsus OSB", "Akdeniz", "Toroslar", "Erdemli", "Silifke"],
    keyIndustries: ["Liman & Konteyner Terminal İşletmeciliği", "Lojistik & Soğuk Hava Depoculuğu", "Petrokimya & Akaryakıt Depolama", "Narenciye & Tarım Ürünleri İşleme", "Cam & Çimento Sanayii"],
    serviceCapabilities: [
      {
        title: "Liman & Vinç Elektrifikasyonu",
        description: "Kıyı vinçleri (STS/RTG), soğutmalı konteyner (reefer) besleme panoları ve liman sahası aydınlatma elektrifikasyonu.",
        serviceSlug: "elektrik-taahhut-hizmetleri",
        icon: "Ship",
      },
      {
        title: "Orta Gerilim & Dağıtım Merkezleri",
        description: "34.5 kV SF6 gazlı ve hava yalıtımlı modüler hücreler, ring şebeke çözümleri ve trafo merkezi kurulumu.",
        serviceSlug: "og-sistemleri",
        icon: "Cpu",
      },
      {
        title: "Soğuk Hava Deposu & Proses Otomasyonu",
        description: "Narenciye ve gıda depolarında PLC tabanlı sıcaklık, nem izleme, kompresör kademe kontrolü ve SCADA altyapısı.",
        serviceSlug: "plc-otomasyon-sistemleri",
        icon: "Server",
      },
      {
        title: "Korozyona Dayanıklı Pano Sistemleri",
        description: "Deniz tuzu ve neme dayanıklı IP65/IP66 paslanmaz çelik dağıtım ve kontrol panosu mühendisliği.",
        serviceSlug: "mcc-motor-kontrol-panolari",
        icon: "Shield",
      },
    ],
    engineeringProcess: [
      {
        step: "01",
        title: "Çevresel Koşul & Yük Analizi",
        description: "Mersin sahil şeridi korozyon faktörleri ve tesis pik güç talepleri yerinde ölçülür.",
      },
      {
        step: "02",
        title: "Standartlara Uygun Mühendislik Tasarımı",
        description: "Toroslar EDAŞ ve denizcilik/endüstriyel standartlarına tam uyumlu projeler hazırlanır.",
      },
      {
        step: "03",
        title: "Yüksek Dayanımlı Malzeme & Montaj",
        description: "IP sertifikalı, korozyon dayanımlı ekipmanlarla sahada montaj icra edilir.",
      },
      {
        step: "04",
        title: "Fonksiyon Testleri & Devreye Alma",
        description: "Yük altında testler ve otomasyon kalibrasyonları tamamlanarak devreye alınır.",
      },
    ],
    faqs: [
      {
        question: "Mersin Serbest Bölge ve Liman sahalarında elektrik taahhüt hizmeti veriyor musunuz?",
        answer: "Evet, liman işletmeleri, depo sahaları ve serbest bölge tesislerinde özel güvenlik ve liman çalışma izinlerine uygun olarak taahhüt hizmeti sağlamaktayız.",
      },
      {
        question: "Tarsus OSB'deki yeni fabrika yatırımlarında hangi hizmetleri sunuyorsunuz?",
        answer: "Tarsus OSB tesislerinde inşaat aşamasından itibaren anahtar teslim elektrik taahhüt, trafo merkezi kurulumu, ana dağıtım panoları ve makine otomasyonu hizmetleri veriyoruz.",
      },
      {
        question: "Kıyı ve neme maruz kalan panolarda hangi önlemleri alıyorsunuz?",
        answer: "Paslanmaz çelik (AISI 304/316) kabinler, özel poliüretan contalar, pano içi nem alıcı ısıtıcılar ve tropikalize edilmiş şalt malzemeler kullanıyoruz.",
      },
      {
        question: "Mersin'deki soğuk hava depolarında enerji izleme nasıl kurulur?",
        answer: "Enerji analizörleri ve PLC modülleri ile kompresörlerin enerji tüketimleri izlenir, SCADA ekranında anlık COP ve spesifik enerji tüketimi raporlanır.",
      },
    ],
    relatedServices: ["elektrik-taahhut-hizmetleri", "og-sistemleri", "plc-otomasyon-sistemleri", "mcc-motor-kontrol-panolari"],
    relatedSectors: ["lojistik-ve-depolama", "gida-ve-icecek-tesisleri", "kimya-ve-petrokimya"],
  },
  {
    slug: "gaziantep",
    name: "Gaziantep",
    isHeadquarters: false,
    title: "Gaziantep Elektrik Taahhüt, Fabrika Otomasyonu & OSB Mühendisliği",
    metaTitle: "Gaziantep Elektrik Taahhüt, Fabrika Otomasyonu, PLC & SCADA | Soykan Power",
    metaDesc: "Gaziantep OSB sanayi tesisleri için elektrik taahhüt, trafo merkezleri, makine ve hat otomasyonu, PLC/SCADA, enerji verimliliği ve harmonik filtreleme çözümleri.",
    heroHeadline: "Gaziantep Organize Sanayi Bölgesinde Yüksek Güç & Otomasyon Gücü",
    heroSubheadline: "Türkiye'nin en büyük organize sanayi bölgesi Gaziantep OSB'de tekstil, halı, plastik ve ambalaj fabrikalarına 7/24 endüstriyel elektrik mühendisliği desteği.",
    shortDesc: "Gaziantep OSB 1-5. bölgelerindeki büyük ölçekli imalat sanayii için yüksek güçlü OG trafo merkezleri, motor kontrol merkezleri (MCC), PLC/SCADA hat otomasyonu ve enerji kalitesi analizleri gerçekleştiriyoruz.",
    industrialProfile: "Gaziantep; makine halısı, nonwoven tekstil, plastik granül, ambalaj ve gıda üretiminde dünya lideri kümelenmelere sahiptir. Sürekli çalışan ekstrüder, dokuma ve hat makinelerinde mikro voltaj dalgalanmalarının önlenmesi ve yüksek motor adetlerinin MCC panolarıyla merkezi kontrolü esastır.",
    targetDistricts: ["Gaziantep OSB (1, 2, 3, 4, 5. Bölgeler)", "Şehitkamil", "Şahinbey", "Oğuzeli", "Nizip"],
    keyIndustries: ["Makine Halısı & İplik Sanayii", "Nonwoven & Teknik Tekstil", "Plastik & Polimer İmalatı", "Gıda & Bakliyat İşleme", "Metal & Makine İmalatı"],
    serviceCapabilities: [
      {
        title: "Fabrika Komple Elektrik Elektrifikasyonu",
        description: "Gaziantep OSB fabrikalarında trafo çıkışından makine beslemelerine kadar yüksek kesitli busbar ve kablo taşıma sistemleri.",
        serviceSlug: "elektrik-taahhut-hizmetleri",
        icon: "Zap",
      },
      {
        title: "Makine & Üretim Hattı Otomasyonu",
        description: "İplik büküm, ekstrüder, dokuma ve ambalaj hatlarında PLC programlama, servo sürücü senkronizasyonu ve HMI panelleri.",
        serviceSlug: "plc-otomasyon-sistemleri",
        icon: "Cpu",
      },
      {
        title: "Harmonik Filtreleme & Güç Kalitesi",
        description: "Sürücü yoğunluklu tesislerde aktif harmonik filtreler ve rezonans riskini önleyen şönt kapasitör sistemleri.",
        serviceSlug: "kompanzasyon-panolari",
        icon: "Activity",
      },
      {
        title: "Sanayi Çatı GES Projeleri",
        description: "Gaziantep sanayi binaları çatılarına yüksek verimli monokristal panel ve string inverterli GES entegrasyonu.",
        serviceSlug: "cati-ges-sistemleri",
        icon: "SunMedium",
      },
    ],
    engineeringProcess: [
      {
        step: "01",
        title: "Tesis Güç & Harmonik Analizi",
        description: "Gaziantep OSB fabrikasında enerji kalitesi kaydedici cihazlarla THD ve reaktif güç profili çıkarılır.",
      },
      {
        step: "02",
        title: "EPLAN Projelendirme & Mühendislik",
        description: "Üretim hattı gereksinimlerine göre panolar ve hat bağlantı şemaları tasarlanır.",
      },
      {
        step: "03",
        title: "Pano Üretimi & Saha Kurulumu",
        description: "Tip testli formlu panolar sahaya getirilerek minimum duruş süresiyle montajlanır.",
      },
      {
        step: "04",
        title: "Otomasyon Entegrasyonu & Devreye Alma",
        description: "PLC/SCADA yazılımları sahada test edilir, operatör eğitimleri verilerek teslim edilir.",
      },
    ],
    faqs: [
      {
        question: "Gaziantep OSB fabrikalarında üretim durmadan elektrik altyapı revizyonu yapabilir misiniz?",
        answer: "Evet, vardiya planlarına ve planlı bakım duruşlarına uygun mühendislik planlaması ile üretimi aksatmadan kademeli geçiş yapıyoruz.",
      },
      {
        question: "Plastik ve tekstil makinelerindeki sürücü kaynaklı harmonik problemlerini nasıl önlüyorsunuz?",
        answer: "Tesisinizde harmonik ölçümü yaparak THDv ve THDi değerlerini tespit ediyor; aktif harmonik filtreler (AHF) ve pasif LC filtrelerle IEEE 519 sınırlarına çekiyoruz.",
      },
      {
        question: "Gaziantep'te Toroslar EDAŞ veya OSB dağıtım şirketi süreçlerini yürütüyor musunuz?",
        answer: "Gaziantep OSB Müdürlüğü Elektrik İşletmesi ve EDAŞ ile ilgili tüm proje onayı, güç artırımı ve kabul süreçlerini mühendislerimiz yönetmektedir.",
      },
    ],
    relatedServices: ["elektrik-taahhut-hizmetleri", "plc-otomasyon-sistemleri", "og-sistemleri", "mcc-motor-kontrol-panolari"],
    relatedSectors: ["tekstil-sanayii", "agir-sanayi-ve-uretim", "gida-ve-icecek-tesisleri"],
  },
  {
    slug: "hatay",
    name: "Hatay",
    isHeadquarters: false,
    title: "Hatay Elektrik Taahhüt, Demir-Çelik & Ağır Sanayi Elektrifikasyonu",
    metaTitle: "Hatay Elektrik Taahhüt, Demir-Çelik & OG Trafo Merkezleri | Soykan Power",
    metaDesc: "Hatay, İskenderun ve Payas havzasındaki demir-çelik, haddehane, liman ve sanayi tesisleri için yüksek akımlı AG/OG elektrik taahhüt ve otomasyon mühendisliği.",
    heroHeadline: "Hatay & İskenderun Havzasında Ağır Sanayi Elektrik Çözümleri",
    heroSubheadline: "İskenderun, Payas ve Dörtyol demir-çelik tesisleri, haddehaneler ve limanlar için yüksek dayanımlı trafo merkezleri, kompanzasyon ve otomasyon sistemleri.",
    shortDesc: "Hatay ve İskenderun bölgesindeki demir-çelik fabrikaları, izabe tesisleri, liman terminalleri ve sanayi tesislerine yüksek akımlı şalt sistemleri, ark ocağı kompanzasyonları ve ağır sanayi otomasyonu sunuyoruz.",
    industrialProfile: "Hatay-İskenderun-Payas bölgesi Türkiye'nin en büyük yassı ve uzun çelik üretim merkezidir. Ağır sanayideki ani darbe yükleri, ark ocakları ve yüksek sıcaklık koşulları; özel tasarımlı trafo merkezleri, dinamik SVC/STATCOM kompanzasyon sistemleri ve sağlamlaştırılmış otomasyon mimarileri gerektirir.",
    targetDistricts: ["İskenderun", "Payas", "Dörtyol", "Antakya", "Kırıkhan", "Erzin"],
    keyIndustries: ["Demir & Çelik Sanayii", "Haddehaneler & Çelik Boru İmalatı", "Liman & Denizcilik Lojistiği", "Filtre İmalat Sanayii", "Tarımsal Sanayi"],
    serviceCapabilities: [
      {
        title: "Ağır Sanayi Yüksek Akım Elektrifikasyonu",
        description: "Yüksek amperajlı bara sistemleri, ark ocağı yardımcı elektrik tesisatı ve fırın besleme hatları.",
        serviceSlug: "elektrik-taahhut-hizmetleri",
        icon: "Zap",
      },
      {
        title: "OG Trafo Merkezleri & Hücre Tesisleri",
        description: "34.5 kV gaz yalıtımlı ve modüler hücreler, yüksek güçlü dökme reçineli ve yağlı trafo merkezleri.",
        serviceSlug: "og-sistemleri",
        icon: "Cpu",
      },
      {
        title: "Dinamik Kompanzasyon & Filtreleme",
        description: "Hızlı değişen darbe yüklerini milisaniye mertebesinde dengeleyen tristörlü kompanzasyon sistemleri.",
        serviceSlug: "kompanzasyon-panolari",
        icon: "Activity",
      },
      {
        title: "Haddehane & Vinç Otomasyonu",
        description: "Hadde yolları, uçan makas senkronizasyonu ve döküm vinçleri için ağır hizmet PLC/SCADA entegrasyonu.",
        serviceSlug: "plc-otomasyon-sistemleri",
        icon: "Server",
      },
    ],
    engineeringProcess: [
      {
        step: "01",
        title: "Termal & Elektriksel Ağır Yük Ölçümü",
        description: "İskenderun sahasında darbe yükleri ve termal stres faktörleri yerinde incelenir.",
      },
      {
        step: "02",
        title: "Ağır Hizmet Mühendislik Tasarımı",
        description: "Yüksek kısa devre dayanımlı şalt elemanları ve zırhlı kablolarla sistem projelendirilir.",
      },
      {
        step: "03",
        title: "Sertifikalı Ağır Sanayi Montajı",
        description: "İSG standartlarına sıkı sıkıya bağlı kalarak ağır sanayi ortamında montaj gerçekleştirilir.",
      },
      {
        step: "04",
        title: "Devreye Alma & Performans Testi",
        description: "Yüksek yük testleri yapılarak sistem işletmeye alınır.",
      },
    ],
    faqs: [
      {
        question: "İskenderun ve Payas demir-çelik tesislerinde yüksek sıcaklık ve toza karşı hangi çözümleri sunuyorsunuz?",
        answer: "IP66 sızdırmazlık sınıfına sahip, filtreli klima/hava soğutmalı özel ağır sanayi panoları ve silikon/zırhlı kablo altyapısı kullanıyoruz.",
      },
      {
        question: "Darbe yükleri ve gerilim çökmeleri için hangi kompanzasyon sistemini uyguluyorsunuz?",
        answer: "Milisaniye hızında reaktif güç kompanzasyonu sağlayan tristör anahtarlamalı dinamik kompanzasyon ve aktif filtre sistemleri kuruyoruz.",
      },
    ],
    relatedServices: ["elektrik-taahhut-hizmetleri", "og-sistemleri", "plc-otomasyon-sistemleri", "mcc-motor-kontrol-panolari"],
    relatedSectors: ["agir-sanayi-ve-uretim", "maden-ve-cimento-sanayii", "lojistik-ve-depolama"],
  },
  {
    slug: "osmaniye",
    name: "Osmaniye",
    isHeadquarters: false,
    title: "Osmaniye Elektrik Taahhüt, OSB Tesisleri & Endüstriyel Enerji Sistemleri",
    metaTitle: "Osmaniye Elektrik Taahhüt, OSB Fabrika Elektrifikasyonu & OG | Soykan Power",
    metaDesc: "Osmaniye OSB tesisleri ve sanayi yatırımları için elektrik taahhüt, 34.5 kV trafo merkezleri, PLC/SCADA otomasyonu, kompanzasyon ve çatı GES sistemleri.",
    heroHeadline: "Osmaniye Organize Sanayi Bölgesinde İleri Mühendislik Çözümleri",
    heroSubheadline: "Osmaniye OSB içerisindeki demir-çelik, boru-profil, tekstil ve gıda fabrikalarında yüksek güvenilirlikli elektrik altyapısı ve otomasyon taahhüt hizmetleri.",
    shortDesc: "Osmaniye OSB sanayi tesislerinde orta gerilim hücre sistemleri, dağıtım trafoları, ana dağıtım panoları ve SCADA tabanlı enerji izleme altyapılarını projelendirip devreye alıyoruz.",
    industrialProfile: "Osmaniye OSB; modern demir-çelik izabe ve haddeleme tesisleri, boru profil üretimi, tekstil ve gıda yatırımlarıyla Akdeniz bölgesinin hızla büyüyen sanayi üslerinden biridir. Yüksek güç tüketen tesislerde kesintisiz enerji sürekliliği ve enerji verimliliği en temel hedeftir.",
    targetDistricts: ["Osmaniye OSB (Toprakkale)", "Kadirli OSB", "Düziçi", "Bahçe", "Hasanbeyli"],
    keyIndustries: ["Demir & Çelik İmalatı", "Boru & Profil Sanayii", "Tekstil & İplik Tesisleri", "Fıstık & Tarım Ürünleri İşleme", "Biyokütle & GES Enerji Santralleri"],
    serviceCapabilities: [
      {
        title: "OSB Fabrika Elektrik Taahhüt",
        description: "Osmaniye OSB fabrika binalarında anahtar teslim elektrik tesisatı, busbar dağıtım ve aydınlatma otomasyonu.",
        serviceSlug: "elektrik-taahhut-hizmetleri",
        icon: "Zap",
      },
      {
        title: "OG Trafo & Dağıtım Merkezleri",
        description: "34.5 kV hücreler, dağıtım trafoları, röle koruma koordinasyonu ve Toroslar EDAŞ / OSB kabul işlemleri.",
        serviceSlug: "og-sistemleri",
        icon: "Cpu",
      },
      {
        title: "Enerji İzleme & SCADA Sistemleri",
        description: "Fabrika genelindeki tüm enerji sayaçlarının ve trafoların tek merkezden gerçek zamanlı izlenmesi ve raporlanması.",
        serviceSlug: "enerji-izleme-ve-scada",
        icon: "Activity",
      },
    ],
    engineeringProcess: [
      {
        step: "01",
        title: "Osmaniye OSB Saha Keşfi",
        description: "Tesisin şebeke bağlantı noktası ve güç gereksinimleri yerinde tespit edilir.",
      },
      {
        step: "02",
        title: "Mühendislik & Onay Süreçleri",
        description: "Proje hesapları tamamlanarak ilgili dağıtım kurumundan resmi onaylar alınır.",
      },
      {
        step: "03",
        title: "Anahtar Teslim Uygulama",
        description: "Kablolama, pano montajı ve trafo bağlantıları eksiksiz tamamlanır.",
      },
      {
        step: "04",
        title: "Devreye Alma & Sürekli Destek",
        description: "Sistem test edilip devreye alınarak periyodik bakım ve mühendislik desteği sağlanır.",
      },
    ],
    faqs: [
      {
        question: "Osmaniye OSB'de yeni kurulacak fabrika için trafo gücü hesabı yapıyor musunuz?",
        answer: "Evet, kurulu güç ve talep faktörlerini hesaplayarak optimum trafo kapasitesini belirliyor ve OSB onaylı projeleri hazırlıyoruz.",
      },
      {
        question: "Osmaniye'deki tesislerde periyodik trafo bakımı ve yağ testleri hizmetiniz var mı?",
        answer: "Evet, trafo izolasyon yağı delinme gerilimi testi, sargı yalıtım direnci ölçümleri ve hücre periyodik bakımlarını yapmaktayız.",
      },
    ],
    relatedServices: ["elektrik-taahhut-hizmetleri", "og-sistemleri", "mcc-motor-kontrol-panolari", "cati-ges-sistemleri"],
    relatedSectors: ["agir-sanayi-ve-uretim", "tekstil-sanayii", "gida-ve-icecek-tesisleri"],
  },
  {
    slug: "antalya",
    name: "Antalya",
    isHeadquarters: false,
    title: "Antalya Elektrik Taahhüt, Otel & Ticari Tesis Otomasyonu, Çatı GES",
    metaTitle: "Antalya Elektrik Taahhüt, Otel Otomasyonu & Çatı GES | Soykan Power",
    metaDesc: "Antalya genelinde 5 yıldızlı oteller, resort tesisler, AVM'ler, tarım seraları ve sanayi tesisleri için elektrik taahhüt, jeneratör senkronizasyonu, BMS otomasyonu ve GES.",
    heroHeadline: "Antalya Otel, Resort, Ticari Tesis & Çatı GES Mühendisliği",
    heroSubheadline: "Turizm tesisleri, kongre merkezleri, AVM'ler ve örtü altı tarım tesislerinde kesintisiz enerji, akıllı bina otomasyonu (BMS) ve çatı güneş enerjisi santralleri.",
    shortDesc: "Antalya sahil şeridindeki lüks resort oteller, kongre merkezleri ve Antalya OSB sanayi tesisleri için jeneratör senkronizasyon sistemleri, akıllı otomasyon, yangın algılama ve çatı GES sistemleri kuruyoruz.",
    industrialProfile: "Antalya; Türkiye'nin turizm başkenti olarak yüzlerce 5 yıldızlı resort tesise, büyük ölçekli ticari binalara ve modern sera tarımı tesislerine sahiptir. Misafir konforunu etkilemeyecek 0-kesinti enerji altyapısı, jeneratör-şebeke kuplajları, aydınlatma/iklimlendirme otomasyonu ve yüksek güneşlenme süresiyle çatı GES en önemli ihtiyaçlardır.",
    targetDistricts: ["Muratpaşa", "Konyaaltı", "Alanya", "Manavgat / Side", "Serik / Belek", "Kemer", "Antalya OSB (Döşemealtı)"],
    keyIndustries: ["Turizm & 5 Yıldızlı Resort Otelcilik", "Kongre & Fuar Merkezleri", "Ticari Binalar & AVM'ler", "Örtü Altı Tarım & Modern Sera Tesisleri", "Gıda İşleme & Soğuk Hava Depoculuğu"],
    serviceCapabilities: [
      {
        title: "Otel & Ticari Bina Elektrik Taahhüt",
        description: "Lüks otel ve ticari yapılarda busbar, aydınlatma armatürleri, acil durum aydınlatması, yangın algılama ve zayıf akım sistemleri.",
        serviceSlug: "elektrik-taahhut-hizmetleri",
        icon: "Building",
      },
      {
        title: "Jeneratör Senkronizasyon & Kesintisiz Enerji",
        description: "Çoklu dizel jeneratörlerin şebeke ile kesintisiz (bumpless) senkronizasyonu ve otomatik transfer sistemleri.",
        serviceSlug: "enerji-sistemleri",
        icon: "Zap",
      },
      {
        title: "Otel Çatı GES & Enerji Maliyeti Düşürme",
        description: "Otel ve sera çatılarına yüksek verimli güneş panelleri kurarak elektrik faturalarını %40-70 oranında düşüren GES sistemleri.",
        serviceSlug: "cati-ges-sistemleri",
        icon: "SunMedium",
      },
      {
        title: "BMS Bina Yönetim & İklimlendirme Otomasyonu",
        description: "Chiller, klima santralleri, fan coil ve aydınlatma gruplarının tek merkezden enerji tasarruflu kontrolü.",
        serviceSlug: "plc-otomasyon-sistemleri",
        icon: "Server",
      },
    ],
    engineeringProcess: [
      {
        step: "01",
        title: "Otel / Tesis Enerji Tüketim Analizi",
        description: "Sezon içi ve sezon dışı enerji tüketim profilleri incelenerek ihtiyaçlar belirlenir.",
      },
      {
        step: "02",
        title: "Estetik & Güvenlik Odaklı Tasarım",
        description: "Turizm mimarisine uygun, yangın yönetmeliklerine tam uyumlu projeler hazırlanır.",
      },
      {
        step: "03",
        title: "Sezon Dışı Hızlı Uygulama",
        description: "Otel yenileme (renovasyon) dönemlerinde hızlı ve titiz montaj tamamlanır.",
      },
      {
        step: "04",
        title: "Devreye Alma & Personel Eğitimi",
        description: "Tesis teknik müdürlerine ve personeline otomasyon eğitimi verilerek teslim edilir.",
      },
    ],
    faqs: [
      {
        question: "Antalya'da oteller için kış sezonunda renovasyon elektrik işlerini yapıyor musunuz?",
        answer: "Evet, otellerin sezon kapalılığı döneminde planlanan kısa süreli renovasyon ve elektrik altyapı yenilemelerini taahhüt edilen tarihte teslim ediyoruz.",
      },
      {
        question: "Otel çatısına kurulan GES şebekeyi besleyebilir mi?",
        answer: "Evet, yürürlükteki lisanssız elektrik üretim yönetmeliği (Madde 5.1.h) kapsamında tüketim fazlası enerji şebekeye satılabilmekte veya mahsuplaşılmaktadır.",
      },
      {
        question: "Jeneratör geçişlerinde otelde elektrik kesintisi engellenebilir mi?",
        answer: "Evet, jeneratör senkronizasyon panoları ve statik transfer anahtarları (STS) ile şebekeye geri dönüşlerde mikro kesinti dahi yaşanmadan yük aktarımı sağlıyoruz.",
      },
    ],
    relatedServices: ["elektrik-taahhut-hizmetleri", "cati-ges-sistemleri", "plc-otomasyon-sistemleri", "mcc-motor-kontrol-panolari"],
    relatedSectors: ["turizm-ve-otel-tesisleri", "ticari-ve-kamu-binalari", "gida-ve-icecek-tesisleri"],
  },
  {
    slug: "isparta",
    name: "Isparta",
    isHeadquarters: false,
    title: "Isparta Elektrik Taahhüt, Soğuk Hava Depoları & Tarımsal Endüstri Mühendisliği",
    metaTitle: "Isparta Elektrik Taahhüt, Soğuk Hava Deposu Otomasyonu & GES | Soykan Power",
    metaDesc: "Isparta genelinde soğuk hava depoları, meyve işleme fabrikaları, mermer ocakları ve Isparta OSB tesisleri için elektrik taahhüt, trafo ve otomasyon sistemleri.",
    heroHeadline: "Isparta Tarımsal Sanayi, Soğuk Depoculuk & Maden Elektrifikasyonu",
    heroSubheadline: "Elma ve meyve soğuk hava depoları, gül yağı distilasyon tesisleri, mermer işletmeleri ve Isparta OSB için güçlü elektrik ve otomasyon mühendisliği.",
    shortDesc: "Isparta ve çevresindeki büyük kapasiteli soğuk hava depoları, meyve suyu fabrikaları ve maden ocaklarında yüksek verimli kompanzasyon, trafo merkezleri ve PLC otomasyon sistemleri uyguluyoruz.",
    industrialProfile: "Isparta; Türkiye elma üretiminin kalbi ve gül/uçucu yağ sanayisinin merkezidir. Bölgedeki yüzlerce soğuk hava deposunun kompresör kademe kontrolü, nem yönetimi ve mermer/maden ocaklarındaki zorlu kırıcı-elek tesisatı uzman mühendislik gerektirir.",
    targetDistricts: ["Isparta OSB", "Eğirdir", "Yalvaç", "Gelendost", "Senirkent", "Keçiborlu", "Gönen"],
    keyIndustries: ["Soğuk Hava Depoculuğu & Meyve Paketleme", "Gül & Kozmetik Sanayii", "Mermer & Doğaltaş Madenciliği", "Çimento & Yapı Elemanları", "Tarımsal Güneş Enerjisi (GES)"],
    serviceCapabilities: [
      {
        title: "Soğuk Depo Elektrik & Otomasyonu",
        description: "Kompresör motor kontrol panoları, frekans konvertörleri, merkezi sıcaklık/nem SCADA takip sistemi.",
        serviceSlug: "plc-otomasyon-sistemleri",
        icon: "Server",
      },
      {
        title: "Maden & Mermer Ocağı Elektrifikasyonu",
        description: "Ağır hizmet kırma-eleme tesisleri besleme hatları, yumuşak yol vericiler (Softstarter) ve toz korumalı panolar.",
        serviceSlug: "elektrik-taahhut-hizmetleri",
        icon: "Zap",
      },
      {
        title: "Soğuk Hava Deposu Çatı GES",
        description: "Gündüz saatlerinde soğutma için en yüksek elektrik harcayan depolara doğrudan çatı GES entegrasyonu.",
        serviceSlug: "cati-ges-sistemleri",
        icon: "SunMedium",
      },
    ],
    engineeringProcess: [
      {
        step: "01",
        title: "Saha & Güç Tespiti",
        description: "Isparta tesislerinde kompresör ve motor güçleri yerinde analiz edilir.",
      },
      {
        step: "02",
        title: "Projelendirme & Akdeniz EDAŞ Başvuruları",
        description: "Trafo, pano ve GES projeleri çizilerek dağıtım şirketi onayları alınır.",
      },
      {
        step: "03",
        title: "Montaj & İzolasyon Kontrolleri",
        description: "Soğuk ve nemli ortam standartlarına uygun IP korumalı montaj yapılır.",
      },
      {
        step: "04",
        title: "Devreye Alma & Testler",
        description: "Sıcaklık set değerleri ve otomatik devreye giriş senaryoları test edilir.",
      },
    ],
    faqs: [
      {
        question: "Soğuk hava depolarında elektrik kesildiğinde kompresörleri jeneratörle nasıl devreye alıyorsunuz?",
        answer: "Yumuşak yol vericiler veya sürücüler ile kalkış akımlarını sınırlandırarak jeneratörün aşırı yüklenmesini önlüyor, kademeli devreye alma yazılımı uyguluyoruz.",
      },
      {
        question: "Soğuk hava deposu çatılarına kurulan GES amortisman süresi ne kadardır?",
        answer: "Isparta'nın güneşlenme verimi ve soğutma yükünün gündüz pik yapması sayesinde endüstriyel çatı GES yatırımları ortalama 3.5 - 4.5 yıl arasında kendini amorti etmektedir.",
      },
    ],
    relatedServices: ["elektrik-taahhut-hizmetleri", "plc-otomasyon-sistemleri", "cati-ges-sistemleri", "mcc-motor-kontrol-panolari"],
    relatedSectors: ["gida-ve-icecek-tesisleri", "lojistik-ve-depolama", "maden-ve-cimento-sanayii"],
  },
  {
    slug: "nigde",
    name: "Niğde",
    isHeadquarters: false,
    title: "Niğde Elektrik Taahhüt, Sanayi & Maden Elektrifikasyonu",
    metaTitle: "Niğde Elektrik Taahhüt, OSB Tesisleri & Maden Elektriği | Soykan Power",
    metaDesc: "Niğde OSB ve Bor Karma OSB fabrikaları, kalsit/maden tesisleri ve tarımsal sanayi için elektrik taahhüt, 34.5 kV trafo merkezleri, kompanzasyon ve GES.",
    heroHeadline: "Niğde Organize Sanayi & Maden Tesislerinde Mühendislik Çözümleri",
    heroSubheadline: "Niğde OSB, Bor Karma OSB ve kalsit/mikronize maden işletmelerinde ağır hizmet elektrik altyapısı, trafo merkezleri ve enerji verimliliği projeleri.",
    shortDesc: "Niğde genelinde kalsit mikronize tesisleri, patates/elma işleme tesisleri ve organize sanayi bölgesi fabrikalarında orta gerilim şalt tesisleri, kompanzasyon ve otomasyon mühendisliği sunuyoruz.",
    industrialProfile: "Niğde; dünyanın en kaliteli mikronize kalsit rezervlerine ve geniş bir tarımsal sanayi havzasına sahiptir. Değirmen motorları, bilyalı değirmenler, paketleme tesisleri ve OSB fabrikalarında yüksek güçlü elektrik beslemeleri ve toz korumalı otomasyon panoları esastır.",
    targetDistricts: ["Niğde OSB", "Bor Karma ve Deri İhtisas OSB", "Merkez", "Ulukışla", "Çiftlik", "Altunhisar"],
    keyIndustries: ["Mikronize Kalsit & Maden Sanayii", "Tarımsal Gıda İşleme & Soğuk Depoculuk", "Deri & Tekstil Sanayii", "Otomotiv Yan Sanayi & Döküm", "Güneş Enerjisi (Arazi ve Çatı GES)"],
    serviceCapabilities: [
      {
        title: "Kalsit & Maden Tesisi Elektrik Taahhüt",
        description: "Yüksek güçlü kırıcı, değirmen ve elevatör motorları için ağır sanayi MCC ve yumuşak yol verici panoları.",
        serviceSlug: "elektrik-taahhut-hizmetleri",
        icon: "Zap",
      },
      {
        title: "OG Hücre & Trafo Merkezleri",
        description: "34.5 kV trafo merkezleri, röle koordinasyonu, MEDAŞ proje onayı ve kabul süreçleri.",
        serviceSlug: "og-sistemleri",
        icon: "Cpu",
      },
      {
        title: "Endüstriyel Çatı & Arazi GES",
        description: "Niğde'nin yüksek güneş radyasyonundan maksimum fayda sağlayan endüstriyel GES santralleri.",
        serviceSlug: "cati-ges-sistemleri",
        icon: "SunMedium",
      },
    ],
    engineeringProcess: [
      {
        step: "01",
        title: "Niğde Saha Değerlendirmesi",
        description: "Değirmen motor güçleri ve toz ortamı koşulları yerinde incelenir.",
      },
      {
        step: "02",
        title: "MEDAŞ Proje & Hesaplamaları",
        description: "Kısa devre hesapları, kompanzasyon kademeleri ve onaylı projeler hazırlanır.",
      },
      {
        step: "03",
        title: "Toz Korumalı Montaj & Test",
        description: "IP55/IP65 filtreli panolarla montaj icra edilir.",
      },
      {
        step: "04",
        title: "Devreye Alma & Kabul",
        description: "MEDAŞ kabulü ve yük testleri yapılarak teslim edilir.",
      },
    ],
    faqs: [
      {
        question: "Kalsit tesislerindeki yoğun toza karşı panolarda ne tür koruma sağlıyorsunuz?",
        answer: "IP65 pozitif basınçlı filtreli kabinler, sızdırmaz rakor sistemleri ve korozif olmayan bara kaplamaları kullanıyoruz.",
      },
      {
        question: "MEDAŞ proje onay ve trafo kabul süreçlerini takip ediyor musunuz?",
        answer: "Evet, Niğde ve Bor bölgesindeki MEDAŞ trafo kabulü, işletme sorumluluğu ve röle testlerini uzman mühendislerimiz yürütmektedir.",
      },
    ],
    relatedServices: ["elektrik-taahhut-hizmetleri", "og-sistemleri", "mcc-motor-kontrol-panolari", "cati-ges-sistemleri"],
    relatedSectors: ["maden-ve-cimento-sanayii", "gida-ve-icecek-tesisleri", "agir-sanayi-ve-uretim"],
  },
  {
    slug: "kktc",
    name: "KKTC (Kuzey Kıbrıs)",
    isHeadquarters: false,
    title: "KKTC Elektrik Taahhüt, Otel Elektrifikasyonu, Otomasyon & GES Çözümleri",
    metaTitle: "KKTC Elektrik Taahhüt, Otel & Resort Otomasyonu, Güneş Enerjisi | Soykan Power",
    metaDesc: "Kuzey Kıbrıs Türk Cumhuriyeti genelinde lüks oteller, casino kompleksleri, üniversite kampüsleri ve ticari yapılar için elektrik taahhüt, trafo, otomasyon ve GES.",
    heroHeadline: "Kuzey Kıbrıs Türk Cumhuriyeti'nde İleri Mühendislik & Elektrik Taahhüt",
    heroSubheadline: "Girne, Gazimağusa ve Lefkoşa'daki 5 yıldızlı oteller, resortlar, üniversiteler ve ticari yapılarda kesintisiz enerji, akıllı otomasyon ve ada şebekesine uyumlu GES.",
    shortDesc: "KKTC genelindeki otel yatırımları, turizm kompleksleri, eğitim kampüsleri ve endüstriyel tesisler için ada elektrik şebekesi standartlarına (KIB-TEK) tam uyumlu elektrik taahhüt, jeneratör senkronizasyonu ve güneş enerjisi mühendisliği sunuyoruz.",
    industrialProfile: "KKTC; güçlü turizm ve üniversite sektörüne sahip bir ada ekonomisidir. Ada elektrik şebekesinde frekans ve gerilim kararlılığının sağlanması, yüksek kapasiteli dizel jeneratör kuplajları, akıllı otel otomasyonu ve yüksek güneş enerjisi potansiyeliyle çatı/arazi GES yatırımları en kritik alanlardır.",
    targetDistricts: ["Girne", "Lefkoşa", "Gazimağusa", "İskele / Bafra Turizm Bölgesi", "Güzelyurt", "Lefke"],
    keyIndustries: ["Lüks Turizm & 5 Yıldızlı Resort Oteller", "Casino & Eğlence Kompleksleri", "Üniversite Kampüsleri & Yurtlar", "Hafif Sanayi & Gıda İşleme", "Güneş Enerjisi Santralleri (GES)"],
    serviceCapabilities: [
      {
        title: "Otel & Casino Kompleks Elektrik Taahhüt",
        description: "5 yıldızlı otellerde ana dağıtım panoları, aydınlatma otomasyonu, ses-ışık sistemleri altyapısı ve kesintisiz UPS beslemeleri.",
        serviceSlug: "elektrik-taahhut-hizmetleri",
        icon: "Building",
      },
      {
        title: "KIB-TEK Uyumlu OG & Trafo Merkezleri",
        description: "Kuzey Kıbrıs Elektrik Kurumu (KIB-TEK) teknik şartnamelerine tam uyumlu 11 kV / 22 kV / 33 kV trafo ve hücre tesisleri.",
        serviceSlug: "og-sistemleri",
        icon: "Cpu",
      },
      {
        title: "Ada Şebekesine Uyumlu Güneş Enerjisi (GES)",
        description: "KKTC'nin yüksek güneşlenme süresinden faydalanan, şebeke koruma röleli ve sıfır basma (zero-export) kontrollü GES sistemleri.",
        serviceSlug: "cati-ges-sistemleri",
        icon: "SunMedium",
      },
      {
        title: "Jeneratör Senkronizasyonu & Güç Yönetimi",
        description: "Ada şartlarında kritik tesislerde kesintisiz enerji için çoklu jeneratör paralel çalışma ve yük atma (load shedding) otomasyonu.",
        serviceSlug: "enerji-sistemleri",
        icon: "Zap",
      },
    ],
    engineeringProcess: [
      {
        step: "01",
        title: "KKTC Ada Şebekesi & Tesis Analizi",
        description: "KIB-TEK şebeke parametreleri ve otel/kampüs yük profili detaylıca analiz edilir.",
      },
      {
        step: "02",
        title: "KIB-TEK Standartlarında Mühendislik",
        description: "Kıbrıs elektrik kurallarına uygun tek hat ve uygulama projeleri hazırlanır.",
      },
      {
        step: "03",
        title: "Lojistik & Sertifikalı Saha Montajı",
        description: "Türkiye'den sertifikalı ekipman sevkiyatı ve adada deneyimli mühendis ekibiyle montaj.",
      },
      {
        step: "04",
        title: "KIB-TEK Kabulü & Devreye Alma",
        description: "Resmi kabul testleri tamamlanarak sistem anahtar teslim devreye alınır.",
      },
    ],
    faqs: [
      {
        question: "KKTC'deki projelere Türkiye'den malzeme sevkiyatı ve mühendislik ekibi nasıl organize ediliyor?",
        answer: "Gerekli tüm tip testli panolar ve şalt malzemeleri deniz yoluyla KKTC gümrüğüne sevk edilir; yetkili mühendis ve montaj ekiplerimiz sahada bizzat uygulamayı yönetir.",
      },
      {
        question: "KIB-TEK trafo ve hücre standartları Türkiye'den farklı mıdır?",
        answer: "Evet, gerilim seviyeleri (11 kV, 22 kV), koruma rölesi şartnameleri ve kabul prosedürleri farklılık gösterir. Projelerimizi KIB-TEK standartlarına %100 uyumlu tasarlıyoruz.",
      },
      {
        question: "KKTC otellerinde elektrik faturasını düşürmek için GES kurulabilir mi?",
        answer: "Evet, KIB-TEK mevzuatına uygun olarak öztüketim amaçlı çatı GES sistemleri kuruyor, yüksek ada elektrik tarifelerine karşı işletme maliyetlerini ciddi oranda düşürüyoruz.",
      },
    ],
    relatedServices: ["elektrik-taahhut-hizmetleri", "cati-ges-sistemleri", "og-sistemleri", "plc-otomasyon-sistemleri"],
    relatedSectors: ["turizm-ve-otel-tesisleri", "ticari-ve-kamu-binalari", "saglik-ve-egitim-tesisleri"],
  },
];
