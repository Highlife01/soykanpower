import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Dynamic Regional SEO & GEO Database structure...");

  // 1. Countries
  const turkey = await prisma.country.upsert({
    where: { isoCode: "TR" },
    update: { name: "Türkiye", slug: "turkiye", active: true },
    create: { name: "Türkiye", slug: "turkiye", isoCode: "TR", active: true },
  });

  const kktc = await prisma.country.upsert({
    where: { isoCode: "NC" },
    update: { name: "Kuzey Kıbrıs Türk Cumhuriyeti", slug: "kktc", active: true },
    create: { name: "Kuzey Kıbrıs Türk Cumhuriyeti", slug: "kktc", isoCode: "NC", active: true },
  });

  // 2. SEO Templates
  const templates = [
    {
      templateType: "CITY",
      titlePattern: "{city} Elektrik Taahhüt, Enerji ve Otomasyon | Soykan Power",
      descPattern: "Soykan Power, {city} ve çevresinde endüstriyel elektrik taahhüt, OG hücre, trafo merkezi, PLC/SCADA otomasyonu ve GES çözümleri sunar.",
      h1Pattern: "{city} Elektrik Taahhüt & Mühendislik Hizmetleri",
    },
    {
      templateType: "CITY_SERVICE",
      titlePattern: "{city} {service} | Soykan Power Mühendislik",
      descPattern: "Soykan Power; {city} bölgesinde {service} alanında anahtar teslim mühendislik, kurulum, test ve devreye alma hizmetleri sunmaktadır.",
      h1Pattern: "{city} {service} Çözümleri ve Mühendislik",
    },
    {
      templateType: "CITY_SECTOR",
      titlePattern: "{city} {sector} Elektrik ve Otomasyon Çözümleri | Soykan Power",
      descPattern: "Soykan Power, {city} bölgesindeki {sector} tesislerine özel AG/OG elektrifikasyon, otomasyon ve enerji yönetimi sunar.",
      h1Pattern: "{city} {sector} Tesisleri İçin Mühendislik Çözümleri",
    },
    {
      templateType: "SERVICE",
      titlePattern: "{service} | Soykan Power Mühendislik",
      descPattern: "Soykan Power, endüstriyel standartlarda {service} hizmetleri sunar. Projelendirme, montaj, test ve devreye alma.",
      h1Pattern: "{service}",
    },
    {
      templateType: "BLOG",
      titlePattern: "{title} | Soykan Power Mühendislik Bülteni",
      descPattern: "{summary}",
      h1Pattern: "{title}",
    },
  ];

  for (const t of templates) {
    await prisma.seoTemplate.upsert({
      where: { templateType: t.templateType },
      update: t,
      create: t,
    });
  }

  // 3. Approved Service Regions
  const regionsData = [
    {
      name: "Adana",
      slug: "adana",
      countryId: turkey.id,
      regionType: "CITY",
      shortDescription: "Soykan Power ana mühendislik merkezi ve operasyon üssü. Adana Hacı Sabancı OSB ve tüm sanayi bölgelerinde tam kapsamlı hizmet.",
      description: "Soykan Power, Adana merkezli operasyon gücüyle Adana Hacı Sabancı Organize Sanayi Bölgesi (AOSB), Ceyhan Enerji İhtisas Endüstri Bölgesi ve tüm sanayi kuruluşlarına anahtar teslim elektrik taahhüt, OG hücre, trafo köşkleri, PLC/SCADA ve çatı GES mühendisliği sunmaktadır.",
      heroTitle: "Adana Elektrik Taahhüt, OG & Otomasyon Mühendisliği",
      heroDescription: "Merkez ofisimizden Adana sanayisine 7/24 kesintisiz yüksek mühendislik, hızlı saha mobilizasyonu ve tip testli elektrifikasyon çözümleri.",
      isServiceArea: true,
      isFeatured: true,
      isPublished: true,
      indexable: true,
      sortOrder: 1,
      status: "PUBLISHED",
      metaTitle: "Adana Elektrik Taahhüt, Trafo & Otomasyon Firması | Soykan Power",
      metaDesc: "Soykan Power; Adana'da elektrik taahhüt, OG hücre sistemleri, trafo merkezleri, PLC/SCADA otomasyonu ve GES projelerinde anahtar teslim mühendislik sunar.",
      districts: [
        { name: "Seyhan", slug: "seyhan", isPublished: true, indexable: true },
        { name: "Çukurova", slug: "cukurova", isPublished: true, indexable: true },
        { name: "Sarıçam (AOSB)", slug: "saricam", isPublished: true, indexable: true },
        { name: "Yüreğir", slug: "yuregir", isPublished: true, indexable: true },
        { name: "Ceyhan", slug: "ceyhan", isPublished: true, indexable: true },
      ],
      faqs: [
        {
          question: "Adana'da acil OG arıza ve trafo manevra desteği sağlıyor musunuz?",
          answer: "Evet, Soykan Power'ın operasyon merkezi Adana'da olduğu için Adana Hacı Sabancı OSB ve çevre sanayi sitelerine 7/24 acil teknik müdahale ve süpervizörlük desteği sağlanmaktadır.",
        },
        {
          question: "Adana'da çatı GES projeleri için TEDAŞ ve Toroslar EDAŞ süreçlerini siz mi yürütüyorsunuz?",
          answer: "Evet. Bağlantı anlaşması çağrı mektubu (BAÇM), statik çatı projesi onayı, TEDAŞ elektriksel kabul ve kesin kabul süreçleri uçtan uca yönetilmektedir.",
        },
      ],
    },
    {
      name: "Mersin",
      slug: "mersin",
      countryId: turkey.id,
      regionType: "CITY",
      shortDescription: "Mersin Limanı, Tarsus OSB ve lojistik merkezlerine yönelik endüstriyel elektrifikasyon ve otomasyon mühendisliği.",
      description: "Mersin Serbest Bölge, Tarsus OSB ve Akdeniz liman tesislerinde yüksek güvenlikli OG şebekeleri, liman vinç otomasyonları, soğuk hava deposu kompanzasyon sistemleri ve çatı GES kurulumları gerçekleştiriyoruz.",
      heroTitle: "Mersin Elektrik Taahhüt, Liman & Sanayi Otomasyonu",
      heroDescription: "Mersin ve Tarsus sanayisine özel korozyon dayanımlı OG hücreler, harmonik filtreli panolar ve akıllı otomasyon sistemleri.",
      isServiceArea: true,
      isFeatured: true,
      isPublished: true,
      indexable: true,
      sortOrder: 2,
      status: "PUBLISHED",
      metaTitle: "Mersin Elektrik Taahhüt ve Endüstriyel Otomasyon | Soykan Power",
      metaDesc: "Mersin ve Tarsus bölgesinde trafo merkezleri, OG hücre montajı, fabrika elektrifikasyonu, PLC otomasyon ve liman elektrik taahhüt hizmetleri.",
      districts: [
        { name: "Akdeniz", slug: "akdeniz", isPublished: true, indexable: true },
        { name: "Yenişehir", slug: "yenisehir", isPublished: true, indexable: true },
        { name: "Mezitli", slug: "mezitli", isPublished: true, indexable: true },
        { name: "Tarsus", slug: "tarsus", isPublished: true, indexable: true },
      ],
      faqs: [
        {
          question: "Mersin kıyı ve liman ortamında korozyona dayanıklı pano kullanıyor musunuz?",
          answer: "Evet. Tuzlu nem ve korozyon riski yüksek bölgelerde paslanmaz çelik muhafazalar, C4/C5 korozyon sınıflı boya ve IP65 sızdırmazlık standartlarına sahip panolar tercih edilmektedir.",
        },
      ],
    },
    {
      name: "Gaziantep",
      slug: "gaziantep",
      countryId: turkey.id,
      regionType: "CITY",
      shortDescription: "Gaziantep 1-5. OSB tesisleri, tekstil, makine ve gıda fabrikaları için yüksek kapasiteli elektrik ve PLC/SCADA altyapıları.",
      description: "Türkiye'nin en büyük organize sanayi bölgelerinden biri olan Gaziantep OSB'de tekstil, ambalaj, halı, plastik ve makine üreticilerine özel yüksek akım ADP panoları, tristörlü kompanzasyon ve kesintisiz proses otomasyonu sunuyoruz.",
      heroTitle: "Gaziantep Endüstriyel Elektrik, OG Trafo & SCADA Otomasyonu",
      heroDescription: "Gaziantep Organize Sanayi Bölgesi'ndeki fabrikalara sıfır duruş hedefli yedekli PLC, aktif harmonik filtreleme ve OG hücre çözümleri.",
      isServiceArea: true,
      isFeatured: true,
      isPublished: true,
      indexable: true,
      sortOrder: 3,
      status: "PUBLISHED",
      metaTitle: "Gaziantep Elektrik Taahhüt ve Fabrika Otomasyonu | Soykan Power",
      metaDesc: "Gaziantep OSB fabrikaları için OG trafo merkezleri, tip testli MCC/ADP panoları, PLC/SCADA yazılımları ve çatı GES EPC mühendisliği.",
      districts: [
        { name: "Şehitkamil (Başpınar OSB)", slug: "sehitkamil", isPublished: true, indexable: true },
        { name: "Şahinbey", slug: "sahinbey", isPublished: true, indexable: true },
        { name: "Nizip", slug: "nizip", isPublished: true, indexable: true },
      ],
      faqs: [
        {
          question: "Gaziantep tekstil fabrikalarında harmonik sorunlarını nasıl çözüyorsunuz?",
          answer: "Tekstil makinelerindeki sürücülerin oluşturduğu harmonikleri sahada Class A analizörlerle ölçüyor, p=%7 veya p=%14 harmonik reaktörlü tristörlü kompanzasyon veya Aktif Harmonik Filtre (AHF) uyguluyoruz.",
        },
      ],
    },
    {
      name: "Hatay",
      slug: "hatay",
      countryId: turkey.id,
      regionType: "CITY",
      shortDescription: "İskenderun demir-çelik sanayi, limanlar ve Antakya bölgesinde ağır sanayi elektrifikasyonu.",
      description: "İskenderun ve Payas ağır sanayi havzasında ark ocakları, haddehaneler, liman terminalleri ve yeniden yapılanma projelerine yönelik yüksek dayanımlı YG/OG şalt tesisleri, busbar sistemleri ve güçlü trafo merkezleri inşa ediyoruz.",
      heroTitle: "Hatay Ağır Sanayi Elektrik Taahhüt & OG Dağıtım",
      heroDescription: "İskenderun ve Hatay genelinde demir-çelik, liman ve endüstriyel tesisler için yüksek standartlı mühendislik ve elektrik altyapısı.",
      isServiceArea: true,
      isFeatured: false,
      isPublished: true,
      indexable: true,
      sortOrder: 4,
      status: "PUBLISHED",
      metaTitle: "Hatay & İskenderun Elektrik Taahhüt ve OG Sistemleri | Soykan Power",
      metaDesc: "Hatay ve İskenderun'da demir-çelik elektrifikasyonu, OG trafo kurulumu, liman elektrik sistemleri ve endüstriyel taahhüt hizmetleri.",
      districts: [
        { name: "İskenderun", slug: "iskenderun", isPublished: true, indexable: true },
        { name: "Antakya", slug: "antakya", isPublished: true, indexable: true },
        { name: "Dörtyol", slug: "dortyol", isPublished: true, indexable: true },
        { name: "Payas", slug: "payas", isPublished: true, indexable: true },
      ],
      faqs: [],
    },
    {
      name: "Osmaniye",
      slug: "osmaniye",
      countryId: turkey.id,
      regionType: "CITY",
      shortDescription: "Osmaniye OSB metal, boru ve yenilenebilir enerji tesisleri için OG şebeke ve otomasyon mühendisliği.",
      description: "Osmaniye Organize Sanayi Bölgesi ve çevre sanayi havzasında çelik işleme, yenilenebilir enerji santralleri ve imalat tesislerine anahtar teslim elektrik taahhüt ve çatı GES mühendisliği sunuyoruz.",
      heroTitle: "Osmaniye Elektrik Taahhüt & Endüstriyel Enerji Sistemleri",
      heroDescription: "Osmaniye OSB sanayi tesislerine özel trafo köşkleri, MCC motor kontrol merkezleri ve enerji nakil hatları.",
      isServiceArea: true,
      isFeatured: false,
      isPublished: true,
      indexable: true,
      sortOrder: 5,
      status: "PUBLISHED",
      metaTitle: "Osmaniye Elektrik Taahhüt ve Trafo Sistemleri | Soykan Power",
      metaDesc: "Osmaniye OSB fabrikaları için anahtar teslim elektrik taahhüt, OG hücre montajı, trafo merkezleri ve endüstriyel otomasyon.",
      districts: [
        { name: "Merkez", slug: "merkez", isPublished: true, indexable: true },
        { name: "Toprakkale (OOSB)", slug: "toprakkale", isPublished: true, indexable: true },
        { name: "Kadirli", slug: "kadirli", isPublished: true, indexable: true },
      ],
      faqs: [],
    },
    {
      name: "Niğde",
      slug: "nigde",
      countryId: turkey.id,
      regionType: "CITY",
      shortDescription: "Niğde OSB, Bor Karma OSB ve tarımsal sanayi tesislerine yönelik güneş enerjisi ve elektrifikasyon.",
      description: "Niğde ve Bor sanayi havzasında madencilik, gıda işleme ve soğuk hava tesislerine özel trafo merkezleri, kompanzasyon ve yüksek güneş ışınımı potansiyeline uygun arazi/çatı GES santralleri kuruyoruz.",
      heroTitle: "Niğde Elektrik Taahhüt, GES & Trafo Merkezleri",
      heroDescription: "Niğde sanayi ve tarımsal enerji tesisleri için yüksek verimli çatı/arazi GES ve endüstriyel elektrik altyapıları.",
      isServiceArea: true,
      isFeatured: false,
      isPublished: true,
      indexable: true,
      sortOrder: 6,
      status: "PUBLISHED",
      metaTitle: "Niğde Elektrik Taahhüt, Trafo ve GES Projeleri | Soykan Power",
      metaDesc: "Niğde ve Bor OSB sanayi tesislerinde elektrik taahhüt, trafo merkezi kurulumu, kompanzasyon ve güneş enerjisi EPC hizmetleri.",
      districts: [
        { name: "Merkez", slug: "merkez", isPublished: true, indexable: true },
        { name: "Bor", slug: "bor", isPublished: true, indexable: true },
      ],
      faqs: [],
    },
    {
      name: "Antalya",
      slug: "antalya",
      countryId: turkey.id,
      regionType: "CITY",
      shortDescription: "Antalya OSB, otel ve resort tesisleri, ticari yapılar ve tarımsal GES projeleri için mühendislik.",
      description: "Antalya genelinde 5 yıldızlı oteller, tatil köyleri, AVM'ler ve Antalya OSB fabrikalarına jeneratör senkronizasyon sistemleri, akıllı bina otomasyonu (BMS), trafo merkezleri ve yüksek verimli çatı GES çözümleri sağlıyoruz.",
      heroTitle: "Antalya Otel Elektrik Sistemleri, BMS Otomasyon & GES",
      heroDescription: "Turizm tesisleri ve sanayi yapıları için kesintisiz enerji omurgası, yangın algılama, akıllı BMS ve güneş enerjisi.",
      isServiceArea: true,
      isFeatured: true,
      isPublished: true,
      indexable: true,
      sortOrder: 7,
      status: "PUBLISHED",
      metaTitle: "Antalya Elektrik Taahhüt, Otel Elektrifikasyonu ve GES | Soykan Power",
      metaDesc: "Antalya'da otel elektrik taahhüdü, BMS bina otomasyonu, trafo merkezleri, jeneratör senkronizasyonu ve çatı GES santralleri.",
      districts: [
        { name: "Muratpaşa", slug: "muratpasa", isPublished: true, indexable: true },
        { name: "Kepez", slug: "kepez", isPublished: true, indexable: true },
        { name: "Alanya", slug: "alanya", isPublished: true, indexable: true },
        { name: "Manavgat", slug: "manavgat", isPublished: true, indexable: true },
        { name: "Döşemealtı (AOSB)", slug: "dosemealti", isPublished: true, indexable: true },
      ],
      faqs: [
        {
          question: "Antalya'da otel ve tatil köylerine özel elektrik taahhüt çözümleriniz nelerdir?",
          answer: "Otel projelerinde kesintisiz güç için jeneratör senkronizasyonu, medikal/mutfak özel panoları, DALI aydınlatma otomasyonu, EN 54 yangın algılama ve BMS entegrasyonu sunuyoruz.",
        },
      ],
    },
    {
      name: "Isparta",
      slug: "isparta",
      countryId: turkey.id,
      regionType: "CITY",
      shortDescription: "Isparta Süleyman Demirel OSB, madencilik, gıda ve yüksek ışınımlı GES santralleri elektrifikasyonu.",
      description: "Isparta ve Göller Bölgesi sanayi kuruluşlarına trafo bakım ve kurulumu, enerji nakil hatları, soğuk hava deposu otomasyonları ve yüksek getirili arazi/çatı GES santralleri inşa ediyoruz.",
      heroTitle: "Isparta Elektrik Taahhüt & Güneş Enerji Santralleri",
      heroDescription: "Isparta sanayi tesislerine modern AG/OG dağıtım, kompanzasyon ve anahtar teslim güneş enerjisi EPC mühendisliği.",
      isServiceArea: true,
      isFeatured: false,
      isPublished: true,
      indexable: true,
      sortOrder: 8,
      status: "PUBLISHED",
      metaTitle: "Isparta Elektrik Taahhüt, Trafo ve Güneş Enerjisi | Soykan Power",
      metaDesc: "Isparta OSB ve çevre ilçelerde elektrik taahhüt, trafo köşkleri, soğuk hava otomasyonu ve anahtar teslim GES santralleri.",
      districts: [
        { name: "Merkez", slug: "merkez", isPublished: true, indexable: true },
        { name: "Yalvaç", slug: "yalvac", isPublished: true, indexable: true },
        { name: "Eğirdir", slug: "egirdir", isPublished: true, indexable: true },
      ],
      faqs: [],
    },
    {
      name: "KKTC",
      slug: "kktc",
      countryId: kktc.id,
      regionType: "SPECIAL",
      shortDescription: "Kuzey Kıbrıs Türk Cumhuriyeti genelinde otel, üniversite, ticari yapılar ve güneş enerjisi projeleri.",
      description: "Lefkoşa, Girne ve Gazimağusa'daki prestijli oteller, üniversite kampüsleri, hastaneler ve ticari kompleksler için uluslararası standartlarda elektrik taahhüt, jeneratör/UPS yedekleme ve yüksek ada verimliliğinde GES EPC çözümleri sunuyoruz.",
      heroTitle: "KKTC Elektrik Taahhüt, Otel Sistemleri & Güneş Enerjisi",
      heroDescription: "Kuzey Kıbrıs'ta kesintisiz enerji altyapısı, trafo merkezleri, BMS akıllı bina ve ada koşullarına özel güneş enerjisi.",
      isServiceArea: true,
      isFeatured: true,
      isPublished: true,
      indexable: true,
      sortOrder: 9,
      status: "PUBLISHED",
      metaTitle: "KKTC Elektrik Taahhüt, Otel Elektrifikasyonu ve GES | Soykan Power",
      metaDesc: "Kuzey Kıbrıs Türk Cumhuriyeti (Lefkoşa, Girne, Mağusa) elektrik taahhüt projeleri, otel elektrik sistemleri ve güneş enerjisi santralleri.",
      districts: [
        { name: "Lefkoşa", slug: "lefkosa", isPublished: true, indexable: true },
        { name: "Girne", slug: "girne", isPublished: true, indexable: true },
        { name: "Gazimağusa", slug: "gazimagusa", isPublished: true, indexable: true },
        { name: "İskele", slug: "iskele", isPublished: true, indexable: true },
      ],
      faqs: [
        {
          question: "Kıbrıs'taki projelere Türkiye'den anahtar teslim mühendislik ve malzeme tedariği sağlıyor musunuz?",
          answer: "Evet. Tüm mühendislik, projelendirme, tip testli pano imalatı ve süpervizörlük ekiplerimiz KKTC Kıb-Tek mevzuatına uygun şekilde anahtar teslim yürütülmektedir.",
        },
      ],
    },
  ];

  // Fetch all services for relationships
  const allServices = await prisma.service.findMany();
  const serviceMap = new Map(allServices.map((s) => [s.slug, s.id]));

  for (const reg of regionsData) {
    const region = await prisma.region.upsert({
      where: { slug: reg.slug },
      update: {
        name: reg.name,
        countryId: reg.countryId,
        regionType: reg.regionType,
        shortDescription: reg.shortDescription,
        description: reg.description,
        heroTitle: reg.heroTitle,
        heroDescription: reg.heroDescription,
        isServiceArea: reg.isServiceArea,
        isFeatured: reg.isFeatured,
        isPublished: reg.isPublished,
        indexable: reg.indexable,
        sortOrder: reg.sortOrder,
        status: reg.status,
        metaTitle: reg.metaTitle,
        metaDesc: reg.metaDesc,
      },
      create: {
        name: reg.name,
        slug: reg.slug,
        countryId: reg.countryId,
        regionType: reg.regionType,
        shortDescription: reg.shortDescription,
        description: reg.description,
        heroTitle: reg.heroTitle,
        heroDescription: reg.heroDescription,
        isServiceArea: reg.isServiceArea,
        isFeatured: reg.isFeatured,
        isPublished: reg.isPublished,
        indexable: reg.indexable,
        sortOrder: reg.sortOrder,
        status: reg.status,
        metaTitle: reg.metaTitle,
        metaDesc: reg.metaDesc,
      },
    });

    // Districts
    for (const dist of reg.districts) {
      await prisma.district.upsert({
        where: {
          regionId_slug: {
            regionId: region.id,
            slug: dist.slug,
          },
        },
        update: {
          name: dist.name,
          isPublished: dist.isPublished,
          indexable: dist.indexable,
        },
        create: {
          regionId: region.id,
          name: dist.name,
          slug: dist.slug,
          isPublished: dist.isPublished,
          indexable: dist.indexable,
        },
      });
    }

    // FAQs
    for (const faq of reg.faqs) {
      await prisma.regionFaq.create({
        data: {
          regionId: region.id,
          question: faq.question,
          answer: faq.answer,
          published: true,
        },
      });
    }

    // Region Services (Many-to-Many dynamic relationships)
    // Connect core services for each region
    const coreServiceSlugs = [
      "elektrik-taahhut",
      "og-sistemleri",
      "trafo-merkezleri",
      "plc-otomasyon-sistemleri",
      "cati-ges-sistemleri",
      "kompanzasyon-panolari",
    ];

    for (const sSlug of coreServiceSlugs) {
      const sId = serviceMap.get(sSlug);
      if (sId) {
        await prisma.regionService.upsert({
          where: {
            regionId_serviceId: {
              regionId: region.id,
              serviceId: sId,
            },
          },
          update: {
            enabled: true,
            published: true,
            indexable: true,
            customTitle: `${reg.name} ${allServices.find((s) => s.id === sId)?.title}`,
            metaTitle: `${reg.name} ${allServices.find((s) => s.id === sId)?.title} | Soykan Power`,
            metaDesc: `Soykan Power, ${reg.name} bölgesinde ${allServices.find((s) => s.id === sId)?.title} alanında anahtar teslim mühendislik ve saha çözümleri sunar.`,
          },
          create: {
            regionId: region.id,
            serviceId: sId,
            enabled: true,
            published: true,
            indexable: true,
            customTitle: `${reg.name} ${allServices.find((s) => s.id === sId)?.title}`,
            metaTitle: `${reg.name} ${allServices.find((s) => s.id === sId)?.title} | Soykan Power`,
            metaDesc: `Soykan Power, ${reg.name} bölgesinde ${allServices.find((s) => s.id === sId)?.title} alanında anahtar teslim mühendislik ve saha çözümleri sunar.`,
          },
        });
      }
    }

    console.log(`✓ Region seeded: ${reg.name} (${reg.districts.length} districts)`);
  }

  console.log("Regional SEO & GEO Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
