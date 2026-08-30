export interface BlogPostData {
  slug: string;
  category: string;
  coverImage: string;
  publishedAt: Date;

  // TR
  title: string;
  summary: string;
  content: string;
  metaTitle: string;
  metaDesc: string;

  // EN
  titleEn: string;
  summaryEn: string;
  contentEn: string;
  metaTitleEn: string;
  metaDescEn: string;

  // AR
  titleAr: string;
  summaryAr: string;
  contentAr: string;
  metaTitleAr: string;
  metaDescAr: string;

  // RU
  titleRu: string;
  summaryRu: string;
  contentRu: string;
  metaTitleRu: string;
  metaDescRu: string;
}

export const blogPostsData: BlogPostData[] = [
  {
    slug: "orta-gerilim-og-hucre-sistemleri-ve-secim-kriterleri",
    category: "OG & Dağıtım",
    coverImage: "/images/blog/og-hucre-sistemleri.jpg",
    publishedAt: new Date("2026-03-01"),
    title: "Orta Gerilim (OG) Hücre Sistemleri ve Seçim Kriterleri: Metal Clad, GIS ve RMU Karşılaştırması",
    summary: "Endüstriyel tesisler ve enerji dağıtım merkezlerinde güvenli anahtarlama sağlayan OG modüler hücrelerin teknik özellikleri, LSC servis sürekliliği sınıfları ve doğru hücre tipi seçim kriterleri.",
    content: `<h2>Orta Gerilim (OG) Hücre Sistemlerinin Önemi</h2><p>Modern sanayi tesislerinde, enerji sürekliliği ve operasyonel iş güvenliğinin temeli Orta Gerilim (OG) anahtarlama ve dağıtım merkezlerinde atılır. 1 kV ile 36 kV arasındaki gerilim seviyelerinde görev yapan OG modüler hücreler; trafo koruma, yük ayırma, kuplaj ve enerji ölçüm işlemlerini kontrollü ve emniyetli biçimde gerçekleştirir.</p><h3>1. OG Hücre Tipleri ve Yapısal Farklılıklar</h3><ul><li><strong>Metal Clad (Hava Yalıtımlı Çekmeceli Hücreler):</strong> Bölmeler arası metal perdelerle tam izolasyon sağlayan, çekmeceli kesici yapısıyla bakım kolaylığı sunan en yüksek güvenlikli hücrelerdir. IEC 62271-200 standardına göre LSC2B servis sürekliliğine sahiptir.</li><li><strong>Metal Enclosed (Modüler Hücreler):</strong> Kompakt yapılı, sabit veya çekmeceli ayırıcı/kesici kombinasyonlarıyla ekonomik ve güvenilir dağıtım sağlayan sistemlerdir.</li><li><strong>Gaz Yalıtımlı Hücreler (GIS - SF6 / Kuru Hava):</strong> Yüksek korozyon, nem, toz ve dar alan koşullarında gaz ortamında tam sızdırmaz anahtarlama sunar. Minimum bakım gereksinimiyle öne çıkar.</li><li><strong>Halka Şebeke Üniteleri (RMU):</strong> Dağıtım şebekelerinde ring besleme hatlarını yönetmek için optimize edilmiş kompakt gaz yalıtımlı ünitelerdir.</li></ul><h3>2. Servis Sürekliliği (LSC) ve Bölümlendirme (Partition Class)</h3><p>IEC standartları uyarınca hücre seçimi yapılırken LSC (Loss of Service Continuity) sınıfı kritik bir parametredir:</p><ul><li><strong>LSC1:</strong> Bakım anında tüm baranın enerjisinin kesilmesini gerektirir.</li><li><strong>LSC2A:</strong> Kablo bölmesinde çalışma yapılırken bara bölmesi enerjili kalabilir.</li><li><strong>LSC2B:</strong> Kablo veya kesici bölmesinde çalışma yapılırken hem bara hem de yan komşu hücreler enerjili kalabilir. Sanayi tesislerinde kesintisiz üretim için LSC2B tercih edilmelidir.</li></ul>`,
    metaTitle: "OG Hücre Sistemleri ve Seçim Kriterleri | Soykan Power",
    metaDesc: "Orta Gerilim (OG) hücre sistemleri, Metal Clad, GIS ve RMU çözümleri. LSC2A / LSC2B güvenlik sınıfları ve endüstriyel OG hücre seçimi teknik rehberi.",

    titleEn: "Medium Voltage (MV) Switchgear Systems & Selection Criteria: Metal-Clad, GIS, and RMU Comparison",
    summaryEn: "Technical evaluation of Medium Voltage modular switchgear ensuring safe switching in industrial plants, LSC service continuity classes, and criteria for optimal switchgear selection.",
    contentEn: `<h2>The Significance of Medium Voltage (MV) Switchgear Systems</h2><p>In modern industrial facilities, the foundation of power reliability and operational safety begins at Medium Voltage (MV) switching and distribution centers. Operating within 1 kV to 36 kV voltage ratings, MV modular switchgear performs transformer protection, load disconnecting, coupling, and metering safely and reliably.</p><h3>1. Switchgear Types and Structural Classifications</h3><ul><li><strong>Metal-Clad Switchgear (Air-Insulated Withdrawable):</strong> Provides complete metal partitioning between compartments, offering withdrawable circuit breakers for maximum maintenance safety and reliability conforming to LSC2B standard.</li><li><strong>Metal-Enclosed Modular Switchgear:</strong> Compact, cost-effective, and dependable distribution systems with fixed or disconnectable breakers.</li><li><li><strong>Gas-Insulated Switchgear (GIS):</strong> Sealed against harsh environmental contaminants such as moisture, chemical corrosion, and dust, ideal for confined spaces.</li><li><strong>Ring Main Units (RMU):</strong> Compact gas-insulated units optimized for urban distribution networks and secondary ring topologies.</li></ul>`,
    metaTitleEn: "Medium Voltage Switchgear Selection Guide | Soykan Power",
    metaDescEn: "Comprehensive guide to MV switchgear types, Metal Clad, GIS, and Ring Main Units (RMU). LSC2A/LSC2B safety classes and industrial engineering insights.",

    titleAr: "أنظمة الخلايا ذات الجهد المتوسط (MV) ومعايير الاختيار: مقارنة بين Metal Clad و GIS و RMU",
    summaryAr: "الخصائص الفنية لخلايا الجهد المتوسط المعيارية لضمان تحويل آمن للطاقة في المنشآت الصناعية ومراكز التوزيع ومعايير اختيار النوع المناسب.",
    contentAr: `<h2>أهمية أنظمة مفاتيح وخلايا الجهد المتوسط</h2><p>تعد خلايا الجهد المتوسط (1 ك.ف - 36 ك.ف) العمود الفقري لشبكات الطاقة في المصانع والمنشآت الكبرى، حيث تضمن حماية المحولات وتوزيع الأحمال بأعلى مستويات الأمان وفق معايير IEC العالمية.</p>`,
    metaTitleAr: "دليل اختيار خلايا الجهد المتوسط | سوكان باور",
    metaDescAr: "دليل شامل لأنظمة خلايا الجهد المتوسط (1-36 كيلوفولت) بما في ذلك خلايا Metal Clad و GIS و RMU ومعايير استمرارية الخدمة LSC2B.",

    titleRu: "Ячейки среднего напряжения (СН) и критерии выбора: сравнение Metal-Clad, КРУЭ (GIS) и RMU",
    summaryRu: "Технические характеристики комплектных распределительных устройств среднего напряжения (КРУ/КСО), классы непрерывности обслуживания LSC и критерии выбора для промышленных предприятий.",
    contentRu: `<h2>Значение ячеек среднего напряжения (СН) в промышленности</h2><p>В современных промышленных энергосистемах распределительные устройства 6–35 кВ являются ключевым звеном надежности и безопасности.</p>`,
    metaTitleRu: "Руководство по выбору ячеек СН | Soykan Power",
    metaDescRu: "Сравнение КРУ среднего напряжения: Metal-Clad, КРУЭ (GIS) и RMU. Классы безопасности LSC2A/LSC2B и инженерные рекомендации Soykan Power."
  },
  {
    slug: "endustriyel-tesislerde-plc-ve-scada-otomasyonu-ile-sifir-durus",
    category: "Otomasyon & PLC",
    coverImage: "/images/blog/plc-scada-otomasyon.jpg",
    publishedAt: new Date("2026-03-05"),
    title: "Endüstriyel Tesislerde PLC ve SCADA Otomasyonu ile Sıfır Duruş Stratejileri",
    summary: "Üretim hatlarında plansız duruşları önleyen yedekli (redundant) PLC mimarileri, ISA-18.2 alarm yönetimi ve kestirimci bakım entegrasyonlu SCADA sistemleri.",
    content: `<h2>Plansız Duruşların Sanayideki Maliyeti</h2><p>Modern üretim tesislerinde plansız duruşların saatlik maliyeti on binlerce doları bulabilmektedir. Süreç kontrolünde yapılan mimari hatalar, yetersiz alarm yönetimi ve yedeksiz kontrolörler üretim hatlarının kilitlenmesine neden olur.</p><h3>1. Yedekli (Redundant) PLC Mimarisi</h3><p>Kritik proseslerde tek bir kontrolörün arızalanması tüm tesisin durmasına yol açmamalıdır. Çift CPU'lu sıcak yedekli (Hot-Standby) PLC yapıları, milisaniyeler içerisinde ana kontrolörden yedek kontrolöre geçiş yaparak prosesin kesintisiz akmasını sağlar.</p>`,
    metaTitle: "PLC ve SCADA Otomasyonu ile Sıfır Duruş Stratejileri | Soykan Power",
    metaDesc: "Endüstriyel PLC programlama, yedekli CPU sistemleri, SCADA proses izleme ve Endüstri 4.0 haberleşme protokolleri ile kesintisiz üretim rehberi.",

    titleEn: "Zero-Downtime Strategies in Industrial Plants via PLC and SCADA Automation",
    summaryEn: "Redundant PLC architectures, ISA-18.2 compliant alarm management, and predictive maintenance integration to prevent unscheduled plant downtime.",
    contentEn: `<h2>The True Cost of Unplanned Industrial Downtime</h2><p>Unplanned downtime in heavy manufacturing can cost tens of thousands of dollars per hour. Strategic implementation of redundant PLC processors and structured SCADA supervisory systems eliminates single points of failure.</p>`,
    metaTitleEn: "Industrial PLC & SCADA Zero-Downtime Solutions | Soykan Power",
    metaDescEn: "Discover how redundant PLC controllers, intelligent SCADA interfaces, and Industry 4.0 data pipelines eliminate unscheduled factory shutdowns.",

    titleAr: "استراتيجيات التشغيل المتواصل وتفادي التوقفات في المصانع عبر أنظمة PLC و SCADA",
    summaryAr: "بنية أجهزة PLC المزدوجة (Redundant) وإدارة الإنذارات وفق معايير ISA-18.2 وأنظمة المراقبة التنبؤية لضمان كفاءة خطوط الإنتاج.",
    contentAr: `<h2>تكلفة التوقف غير المخطط له في خطوط الإنتاج</h2><p>يتطلب الحفاظ على إنتاجية المصانع بنية تحكم قوية تعتمد على معالجات PLC مزدوجة التكرار (Hot-Standby) وأنظمة SCADA متقدمة تتيح مراقبة كل تفاصيل العمليات لحظياً.</p>`,
    metaTitleAr: "حلول التحكم الصناعي PLC و SCADA لتفادي التوقفات | سوكان باور",
    metaDescAr: "كيف تضمن أنظمة التحكم الآلي المزدوجة وبرمجيات SCADA المتقدمة تشغيلاً مستمراً للمصانع دون أي توقف مفاجئ.",

    titleRu: "Стратегии безаварийной работы промышленных предприятий на базе PLC и SCADA систем",
    summaryRu: "Резервированная архитектура ПЛК, управление аварийными сигналами по ISA-18.2 и предиктивное обслуживание для предотвращения простоев.",
    contentRu: `<h2>Предотвращение незапланированных простоев производства</h2><p>Каждый час простоя технологической линии несет огромные финансовые потери. Применение архитектуры с горячим резервированием контроллеров (Hot-Standby) и интеллектуальных SCADA-систем гарантирует максимальную эксплуатационную готовность.</p>`,
    metaTitleRu: "Автоматизация PLC и SCADA: Стратегия непрерывной работы | Soykan Power",
    metaDescRu: "Инжиниринг АСУ ТП: горячее резервирование ПЛК, эргономичные SCADA-системы и сбор телеметрии для стабильного производства."
  },
  {
    slug: "fabrika-ve-tesislerde-trafo-merkezi-kurulum-standartlari",
    category: "Trafo & Enerji",
    coverImage: "/images/blog/trafo-merkezi-kurulumu.jpg",
    publishedAt: new Date("2026-03-08"),
    title: "Fabrika ve Tesislerde Trafo Merkezi Kurulum Standartları ve Bakım İpuçları",
    summary: "Kuru ve yağlı tip güç trafosu seçimi, monoblok beton köşk tasarımı, havalandırma hesapları, yangın güvenliği ve periyodik trafo testleri.",
    content: `<h2>Trafo Merkezlerinin Tesislerdeki Rolü</h2><p>Trafo merkezleri, yüksek veya orta gerilim şebekesinden alınan enerjiyi tesis içi tüketim gerilimine (400V / 230V) düşüren en kritik enerji düğüm noktasıdır.</p>`,
    metaTitle: "Trafo Merkezi Kurulum Standartları ve Bakım Rehberi | Soykan Power",
    metaDesc: "Sanayi tesisleri için trafo merkezi kurulumu, yağlı ve kuru tip trafo karşılaştırması, beton köşk montajı ve trafo test protokolleri.",

    titleEn: "Substation & Transformer Installation Standards and Maintenance Best Practices",
    summaryEn: "Cast-resin dry vs oil-immersed transformer selection, prefabricated concrete kiosk design, ventilation calculations, and preventive testing protocols.",
    contentEn: `<h2>The Vital Role of Transformer Substations</h2><p>Transformer substations step down incoming grid voltage to 400V industrial utilization levels. Engineering rigor in thermal sizing, protection relay coordination, and ventilation layout ensures operational safety and equipment longevity.</p>`,
    metaTitleEn: "Industrial Transformer Substation Standards | Soykan Power",
    metaDescEn: "Comprehensive technical guide to medium voltage transformer stations, dry vs oil transformers, and dielectric diagnostic testing protocols.",

    titleAr: "معايير تركيب محطات التحويل الكهربائية وإرشادات الصيانة الدورية",
    summaryAr: "مقارنة بين المحولات الجافة الزيتية، وتصميم الأكشاك الخرسانية، وحسابات التهوية واختبارات العزل الكهربائي الدوري.",
    contentAr: `<h2>معايير تصميم وإنشاء محطات المحولات</h2><p>تعتبر محطة المحول القلب النابض لأي منشأة صناعية، ويحدد الاختيار الصحيح بين المحولات الزيتية والمحولات الجافة ذات الراتنج المصبوب مستوى الأمان والكفاءة التشغيلية.</p>`,
    metaTitleAr: "دليل تركيب محطات المحولات وصيانتها | سوكان باور",
    metaDescAr: "أهم المعايير الهندسية لإنشاء محطات التحويل الكهربائية للمصانع والمنشآت الصناعية واختبارات فحص الزيت والعزل.",

    titleRu: "Стандарты проектирования трансформаторных подстанций и регламент ТО",
    summaryRu: "Сравнение сухих и масляных трансформаторов, расчет вентиляции бетонных БКТП, релейная защита и методы испытаний трансформаторного масла.",
    contentRu: `<h2>Надежность силовых трансформаторных подстанций</h2><p>Проектирование блочных комплектных трансформаторных подстанций (БКТП) требует точного расчета тепловыделения, правильного выбора защитных реле и регулярной диагностики изоляции.</p>`,
    metaTitleRu: "Проектирование и монтаж ТП и КТП | Soykan Power",
    metaDescRu: "Инженерное руководство по установке блочных трансформаторных подстанций (БКТП), выбору силовых трансформаторов и регламенту испытаний."
  },
  {
    slug: "endustriyel-cati-ges-kurulumunda-muhendislik-hesaplari",
    category: "Güneş Enerjisi",
    coverImage: "/images/blog/cati-ges-sistemleri.jpg",
    publishedAt: new Date("2026-03-11"),
    title: "Endüstriyel Çatı GES (Güneş Enerjisi) Kurulumunda Kritik Mühendislik Hesapları",
    summary: "Fabrika çatılarında statik yük analizi, rüzgar/kar yükü hesapları, gölgeleme simülasyonları, DC kablolama ve yangın güvenlik sistemleri.",
    content: `<h2>Fabrika Çatı GES Projelerinde Mühendisliğin Önemi</h2><p>Elektrik maliyetlerini düşürmek ve karbon ayak izini sıfırlamak isteyen sanayi kuruluşları için çatı üstü GES yatırımları en hızlı amorti eden enerji yatırımıdır.</p>`,
    metaTitle: "Çatı GES Kurulumunda Mühendislik Hesapları | Soykan Power",
    metaDesc: "Endüstriyel çatı tipi güneş enerjisi santrali (GES) mühendisliği, statik çatı analizi, PVSyst simülasyonu ve TEDAŞ onay süreçleri.",

    titleEn: "Critical Engineering Calculations for Industrial Rooftop Solar (PV) Systems",
    summaryEn: "Structural roof load verification, snow and wind analysis, 3D shading simulations in PVSyst, DC cable sizing, and rapid shutdown fire safety protocols.",
    contentEn: `<h2>Engineering Excellence in Industrial Rooftop PV</h2><p>Rooftop solar installations provide manufacturing plants with sustainable, low-cost electricity. Proper structural dead-load calculations, wind shear analysis, and advanced MPPT string inverter layouts ensure long-term ROI and facility safety.</p>`,
    metaTitleEn: "Industrial Rooftop Solar PV Engineering Guide | Soykan Power",
    metaDescEn: "Discover the vital engineering steps for commercial rooftop solar power plants: structural engineering, AFCI fire mitigation, and PVSyst optimization.",

    titleAr: "الحسابات الهندسية الأساسية لتركيب محطات الطاقة الشمسية على أسطح المصانع",
    summaryAr: "تحليل الأحمال الإنشائية لأسطح المصانع ومحاكاة الظلال PVSyst ومعايير الأمان ضد الحرائق وتوصيلات التيار المستمر DC.",
    contentAr: `<h2>أهمية الدقة الهندسية في مشاريع الطاقة الشمسية للأسطح</h2><p>تتطلب مشاريع الطاقة الشمسية للأسطح الصناعية دراسات إنشائية دقيقة لضمان تحمل الهيكل لأوزان الألواح والرياح، بالإضافة إلى منظومات حماية متطورة من القوس الكهربائي DC.</p>`,
    metaTitleAr: "دليل هندسة الطاقة الشمسية للأسطح الصناعية | سوكان باور",
    metaDescAr: "كل ما تحتاج معرفته عن الحسابات الإنشائية والكهربائية لتركيب أنظمة الطاقة الشمسية على أسطح المنشآت الصناعية.",

    titleRu: "Ключевые инженерные расчеты при монтаже кровельных солнечных электростанций (СЭС)",
    summaryRu: "Анализ статических нагрузок на кровлю, ветровые и снеговые нагрузки, 3D-моделирование затенения в PVSyst и системы пожаротушения СЭС.",
    contentRu: `<h2>Инженерный подход к проектированию промышленных СЭС</h2><p>Установка солнечных панелей на крышах производственных корпусов требует строгого расчета несущей способности ферм, подбора инверторов с защитой от дуги AFCI и профессионального моделирования в PVSyst.</p>`,
    metaTitleRu: "Инжиниринг кровельных СЭС для промышленных объектов | Soykan Power",
    metaDescRu: "Технический гид по установке промышленных солнечных электростанций на крышах: статика, кабельные расчеты и защита от DC-дуги."
  },
  {
    slug: "harmonik-filtreli-kompanzasyon-panolari-ve-reaktif-guc-yonetimi",
    category: "Pano & Enerji",
    coverImage: "/images/blog/kompanzasyon-panolari.jpg",
    publishedAt: new Date("2026-03-14"),
    title: "Harmonik Filtreli Kompanzasyon Panoları ve Reaktif Güç Cezalarını Sıfırlama Rehberi",
    summary: "Endüktif ve kapasitif reaktif sınır oranları, harmonik rezonans riski, tristörlü hızlı kompanzasyon ve aktif harmonik filtre (AHF) çözümleri.",
    content: `<h2>Reaktif Güç Cezaları ve Sanayideki Önemi</h2><p>EPDK mevzuatına göre kurulu gücü 50 kVA'nın üzerindeki ticari ve sanayi tesislerinde, endüktif reaktif enerjinin aktif enerjiye oranı %20'yi, kapasitif reaktif enerjinin oranı ise %15'i aştığında reaktif ceza faturaya yansıtılır.</p>`,
    metaTitle: "Kompanzasyon Panoları ve Reaktif Güç Yönetimi | Soykan Power",
    metaDesc: "Reaktif güç cezalarından kurtulma rehberi. Harmonik filtre reaktörleri, tristörlü dinamik kompanzasyon ve Aktif Harmonik Filtre (AHF) sistemleri.",

    titleEn: "Harmonic-Filtered Power Factor Correction & Reactive Penalty Elimination Guide",
    summaryEn: "Inductive and capacitive limits, harmonic resonance mitigation, thyristor fast-switching PFC, and Active Harmonic Filter (AHF) deployment.",
    contentEn: `<h2>Mitigating Reactive Power Penalties and Harmonic Distortion</h2><p>Non-linear industrial loads such as Variable Frequency Drives generate severe current harmonics. Installing detuned reactors (189Hz / 134Hz) prevents harmonic resonance, while thyristor-switched capacitor banks eliminate instantaneous reactive penalties.</p>`,
    metaTitleEn: "Power Factor Correction & Harmonic Filtering Guide | Soykan Power",
    metaDescEn: "Master industrial power factor correction: detuned reactors, thyristor rapid switching, and Active Harmonic Filters (AHF) for zero reactive penalties.",

    titleAr: "لوحات تحسين معامل القدرة وتصفية التوافقيات والتخلص من غرامات الطاقة غير الفعالة",
    summaryAr: "معايير تعويض القدرة غير الفعالة، مخاطر الرنين التوافقي، المفاتيح الثايرستورية فائقة السرعة وفلاتر التوافقيات النشطة AHF.",
    contentAr: `<h2>تحسين معامل القدرة في المنشآت الصناعية</h2><p>تؤدي الأحمال غير الخطية إلى تشوهات توافقية في شبكة المصنع، وتضمن لوحات تحسين معامل القدرة المزودة بفلاتر توافقية وثايرستورات استقرار الجهد وتفادي الغرامات المالية.</p>`,
    metaTitleAr: "لوحات تعويض القدرة غير الفعالة وفلاتر التوافقيات | سوكان باور",
    metaDescAr: "دليل شامل لتصميم لوحات تحسين معامل القدرة (PFC) وتجنب الغرامات المالية مع فلاتر التوافقيات الثايرستورية النشطة.",

    titleRu: "Установки компенсации реактивной мощности (УКРМ) с фильтрами гармоник",
    summaryRu: "Устранение штрафов за реактивную мощность, защита от гармонического резонанса, тиристорные УКРМФ и активные фильтры гармоник (АФГ).",
    contentRu: `<h2>Управление качеством электроэнергии и реактивной мощностью</h2><p>Работа частотных преобразователей и сварочных аппаратов искажает синусоиду тока. Применение дросселей расстройки и активных фильтров гармоник предотвращает аварии конденсаторов и снижает потери в кабелях.</p>`,
    metaTitleRu: "Компенсация реактивной мощности и фильтрация гармоник | Soykan Power",
    metaDescRu: "Руководство по выбору УКРМФ с антирезонансными дросселями, тиристорным переключением и активными фильтрами гармоник для промышленных сетей."
  },
  {
    slug: "anahtar-teslim-elektrik-taahhut-surecinde-muhendislik-adimlari",
    category: "Elektrik Taahhüt",
    coverImage: "/images/blog/elektrik-taahhut-sureci.jpg",
    publishedAt: new Date("2026-03-17"),
    title: "Anahtar Teslim Elektrik Taahhüt Sürecinde Mühendislik Adımları ve Şantiye Yönetimi",
    summary: "Konsept tasarımdan kabul sürecine kadar fabrika elektrifikasyonu: Projelendirme, malzeme şartnameleri, şantiye QA/QC denetimleri ve resmi kabul prosedürleri.",
    content: `<h2>Anahtar Teslim Elektrik Taahhüt Nedir?</h2><p>Anahtar teslim (EPC - Engineering, Procurement, Construction) elektrik taahhüt; bir endüstriyel tesisin veya ticari yapının tüm elektrifikasyon ihtiyacının tek bir mühendislik firması tarafından projelendirilmesi, malzeme tedariği, montajı, test ve resmi kabul süreçlerinin tamamlanmasıdır.</p>`,
    metaTitle: "Elektrik Taahhüt Süreci ve Mühendislik Adımları | Soykan Power",
    metaDesc: "Anahtar teslim elektrik taahhüt aşamaları: AG/OG projeleri, keşif özeti hazırlama, şantiye yönetimi, test ve devreye alma rehberi.",

    titleEn: "Engineering Milestones & Site Management in Turnkey Electrical Contracting",
    summaryEn: "From concept to commissioning: Electrical layout design, bill of quantities, QA/QC site supervision, and official grid acceptance protocols.",
    contentEn: `<h2>End-to-End Electrical Contracting Workflow</h2><p>Turnkey EPC contracting consolidates design, procurement, on-site installation, and regulatory commissioning under single-source accountability to guarantee timely project delivery within specifications.</p>`,
    metaTitleEn: "Turnkey Electrical EPC Contracting Guide | Soykan Power",
    metaDescEn: "Explore the comprehensive EPC electrical contracting workflow: design calculations, BIM clash detection, procurement standards, and commissioning.",

    titleAr: "المراحل الهندسية وإدارة المواقع في مشاريع المقاولات الكهربائية تسليم مفتاح",
    summaryAr: "من المخططات الأولية حتى الفحص والتشغيل: التصميم الهندسي وتوريد المعدات ومراقبة الجودة في المواقع الإنشائية.",
    contentAr: `<h2>إدارة وتنفيذ مشاريع المقاولات الكهربائية</h2><p>يشمل تنفيذ المشاريع الكهربائية تسليم مفتاح إعداد المخططات التنفيذية، وإجراء حسابات الهبوط في الجهد، وتوريد اللوحات والكابلات المعتمدة وإجراء الفحوصات الميدانية.</p>`,
    metaTitleAr: "دليل المقاولات الكهربائية تسليم مفتاح | سوكان باور",
    metaDescAr: "خطوات تنفيذ مشاريع المقاولات الكهربائية الصناعية الكبرى وفق أعلى معايير الجودة والسلامة المهنية.",

    titleRu: "Этапы инжиниринга и управление монтажом в электромонтажных проектах «под ключ»",
    summaryRu: "От концептуального проекта до сдачи в эксплуатацию: рабочая документация, спецификации оборудования, контроль качества (QA/QC) и ПНР.",
    contentRu: `<h2>Инжиниринг и электромонтаж промышленных объектов</h2><p>Реализация проектов «под ключ» включает подготовку рабочей документации, расчет селективности защит, прокладку кабельных трасс, сборку щитового оборудования и проведение пусконаладочных работ.</p>`,
    metaTitleRu: "Электромонтажные работы «под ключ» (EPC) | Soykan Power",
    metaDescRu: "Полный цикл проектирования и монтажа систем электроснабжения промышленных объектов: расчеты нагрузок, поставка оборудования и пусконаладка."
  },
  {
    slug: "sanayide-enerji-verimliligi-ve-iso-50001-yonetim-sistemleri",
    category: "Enerji Verimliliği",
    coverImage: "/images/blog/enerji-verimliligi.jpg",
    publishedAt: new Date("2026-03-20"),
    title: "Sanayide Enerji Verimliliği ve ISO 50001 Enerji Yönetim Sistemleri Altyapısı",
    summary: "Enerji etüdü, Class A enerji analizörleri ile alt ölçümleme, IE4/IE5 yüksek verimli motor dönüşümleri ve VAP hibe teşvikleri.",
    content: `<h2>Sanayide Enerji Maliyetlerini Azaltmanın Yolu: Verimlilik</h2><p>Endüstriyel işletmelerde elektrik faturaları toplam üretim maliyetlerinin %30 ila %60'ını oluşturabilir. Ölçülmeyen enerji yönetilemez prensibinden hareketle, dijital enerji izleme ve verimlilik projeleri yatırımları çok kısa sürede geri kazandırır.</p>`,
    metaTitle: "Sanayide Enerji Verimliliği ve ISO 50001 | Soykan Power",
    metaDesc: "Fabrikalarda elektrik tüketimini azaltma yolları: Alt sayaç izleme sistemleri, motor sürücü dönüşümleri ve ISO 50001 altyapı rehberi.",

    titleEn: "Industrial Energy Efficiency & ISO 50001 Energy Management Infrastructure",
    summaryEn: "Energy audits, Class-A sub-metering systems, IE4/IE5 premium motor retrofits, and government VAP subsidy grant optimization.",
    contentEn: `<h2>Maximizing Energy Efficiency in Manufacturing</h2><p>Implementing continuous IoT sub-metering across production lines enables precise kilowatt-hour tracking per manufactured unit, unlocking substantial operational cost reductions.</p>`,
    metaTitleEn: "Industrial Energy Efficiency & ISO 50001 Guide | Soykan Power",
    metaDescEn: "Comprehensive energy management strategies for factories: automated sub-metering, VFD pump optimizations, and ISO 50001 audit frameworks.",

    titleAr: "كفاءة الطاقة في القطاع الصناعي والبنية التحتية لنظام إدارة الطاقة ISO 50001",
    summaryAr: "تدقيق استهلاك الطاقة وعدادات القياس الذكية من الفئة A وتحويل المحركات إلى الفئات عالية الكفاءة IE4/IE5.",
    contentAr: `<h2>إدارة وترشيد استهلاك الطاقة في المصانع</h2><p>تساعد أنظمة المراقبة الذكية واختيار المحركات ذات الكفاءة الفائقة IE4 في خفض تكاليف الإنتاج بنسبة تصل إلى 30% مع تحقيق معايير ISO 50001 العالمية.</p>`,
    metaTitleAr: "كفاءة الطاقة الصناعية ومعايير ISO 50001 | سوكان باور",
    metaDescAr: "استراتيجيات خفض تكاليف الكهرباء في المصانع عبر أنظمة المراقبة الرقمية ومحركات التردد المتغير VFD.",

    titleRu: "Энергоэффективность на промышленных предприятиях и внедрение ISO 50001",
    summaryRu: "Энергетический аудит, технический учет электроэнергии (АСТУЭ), модернизация электродвигателей до класса IE4/IE5 и частотное регулирование.",
    contentRu: `<h2>Снижение энергопотребления на производстве</h2><p>Внедрение автоматизированных систем технического учета электроэнергии (АСТУЭ) и замена устаревших двигателей на энергоэффективные модели IE4 снижают себестоимость продукции.</p>`,
    metaTitleRu: "Промышленная энергоэффективность и ISO 50001 | Soykan Power",
    metaDescRu: "Практическое руководство по снижению энергозатрат на производстве: системы учета Class A, частотные преобразователи и энергоаудит."
  },
  {
    slug: "endustriyel-tesislerde-kablo-tasima-ve-yangin-dayanimli-kablolama",
    category: "Kablolama & Güvenlik",
    coverImage: "/images/blog/kablo-yonetimi.jpg",
    publishedAt: new Date("2026-03-23"),
    title: "Endüstriyel Tesislerde Kablo Taşıma ve Yangın Dayanımlı Kablolama Standartları",
    summary: "Kablo merdiveni ve tava seçimi, akım taşıma kapasitesi düşüm katsayıları, FE180/E90 yangına dayanıklı kablolar ve yangın geçiş yalıtımı.",
    content: `<h2>Kablo Taşıma Sistemlerinin Güvenlikteki Rolü</h2><p>Sanayi yapılarında binlerce metre güç ve sinyal kablosu taşınır. Düzensiz kablolama, aşırı ısınma, elektromanyetik parazit (EMI) ve yangın anında alevin diğer bölümlere sıçraması gibi ağır riskler barındırır.</p>`,
    metaTitle: "Kablo Taşıma ve Yangın Dayanımlı Kablolama Standartları | Soykan Power",
    metaDesc: "Kablo tavası montaj kuralları, kablo gruplama katsayıları, yangına dayanıklı kablo seçimi ve sızdırmazlık geçiş yastıkları rehberi.",

    titleEn: "Industrial Cable Management & Fire-Resistant Cabling Standards",
    summaryEn: "Cable tray/ladder selection, derating grouping factors, FE180/E90 fire survival cables, and certified firestop barrier penetration systems.",
    contentEn: `<h2>Ensuring Integrity in Cable Containment Systems</h2><p>Proper physical separation between power and instrumentation cabling prevents signal noise, while DIN 4102-12 certified E90 fire-rated routing keeps emergency life-safety systems powered during structural fires.</p>`,
    metaTitleEn: "Industrial Cable Trays & Fire-Resistant Cabling | Soykan Power",
    metaDescEn: "Engineering guidelines for industrial cable containment: electromagnetic separation, DIN 4102-12 E90 circuit integrity, and firestop seals.",

    titleAr: "معايير تمديد الكابلات وأنظمة الكابلات المقاومة للحرائق في المنشآت الصناعية",
    summaryAr: "اختيار حوامل الكابلات وسلالم الكابلات والكابلات المقاومة للهب FE180/E90 وعوازل منع انتشار الحريق.",
    contentAr: `<h2>معايير تمديد وحماية الكابلات في المشاريع الصناعية</h2><p>يتطلب نقل الطاقة والإشارات الحفاظ على مسافات العزل الكهرومغناطيسي واستخدام كابلات E90 المقاومة للحريق لضمان عمل مضخات ومراوح الطوارئ.</p>`,
    metaTitleAr: "أنظمة تمديد الكابلات والكابلات المقاومة للحريق | سوكان باور",
    metaDescAr: "دليل هندسي لاختيار مسارات الكابلات وتطبيق معايير العزل الصوتي والكهروحراري في المصانع.",

    titleRu: "Кабеленесущие системы и огнестойкие кабельные линии в промышленности",
    summaryRu: "Выбор кабельных лотков и лестниц, коэффициенты группировки, огнестойкие кабели с сохранением изоляции (FR) E90 и огнезащитные проходки.",
    contentRu: `<h2>Надежность кабельных трасс на промышленных объектах</h2><p>Качественный монтаж кабельных лотков с соблюдением электромагнитной совместимости и применение огнестойких линий E90 гарантируют работу систем пожаротушения в аварийных ситуациях.</p>`,
    metaTitleRu: "Огнестойкие кабельные линии и кабеленесущие системы | Soykan Power",
    metaDescRu: "Проектирование кабельных трасс: разделение силовых и сигнальных цепей, огнестойкость по ГОСТ/DIN 4102-12 и герметизация проходок."
  },
  {
    slug: "topraklama-paratoner-ve-yildirima-karsi-korunma-sistemleri",
    category: "Topraklama & İSG",
    coverImage: "/images/blog/topraklama-yildirimdan-korunma.jpg",
    publishedAt: new Date("2026-03-26"),
    title: "Topraklama, Paratoner ve Yıldırımdan Korunma Sistemlerinde Güvenlik Testleri",
    summary: "Temel topraklaması, eşpotansiyel baralama, Tip 1/2/3 parafudr seçimi, Faraday kafesi vs aktif paratoner ve topraklama geçiş direnci ölçümleri.",
    content: `<h2>Elektrik Tesislerinde Can ve Mal Güvenliğinin Temeli: Topraklama</h2><p>Elektriksel bir kaçak anında akımı güvenle toprağa iletemeyen tesisler, hem çalışanlar için ölümcül dokunma gerilimleri oluşturur hem de pahalı otomasyon kartlarının anında yanmasına sebep olur.</p>`,
    metaTitle: "Topraklama ve Yıldırımdan Korunma Sistemleri | Soykan Power",
    metaDesc: "Fabrika topraklama testleri, aktif paratoner montajı, parafudr aşırı gerilim koruması ve eşpotansiyel dengeleme mühendislik rehberi.",

    titleEn: "Grounding, Lightning Protection & Surge Arrestor Verification Protocols",
    summaryEn: "Foundation earthing grids, equipotential bonding, Type 1/2/3 surge protection device (SPD) selection, Faraday cage vs ESE terminals.",
    contentEn: `<h2>Foundation Earthing and Surge Suppression Protocols</h2><p>Combining an equipotential grounding ring with coordinated Class I+II Surge Protection Devices (SPDs) shields sensitive microprocessors from destructive transient overvoltages.</p>`,
    metaTitleEn: "Industrial Grounding & Lightning Protection Guide | Soykan Power",
    metaDescEn: "Technical insight into foundation grounding networks, equipotential bonding, Type 1/2/3 surge arrestors, and earth resistance testing.",

    titleAr: "أنظمة التأريض ومانعات الصواعق والحماية من الجهد الزائد في المنشآت الصناعية",
    summaryAr: "شبكات التأريض الأساسية، قضبان التساوي في الجهد، تفريغ الصواعق بنظام قفص فاراداي واختيار مانعات الصواعق SPD من الفئات 1 و 2 و 3.",
    contentAr: `<h2>الأمان الكهربائي وشبكات التأريض</h2><p>تشكل شبكة التأريض الصحيحة مع موانع الصواعق وتفريغ الجهد الزائد (SPD) خط الدفاع الأول لحماية الأرواح والأجهزة الإلكترونية الحساسة من الاحتراق.</p>`,
    metaTitleAr: "دليل أنظمة التأريض والحماية من الصواعق | سوكان باور",
    metaDescAr: "كل ما يتعلق بإنشاء شبكات التأريض المتطورة وحماية الدوائر الحساسة من التيارات العابرة والصواعق.",

    titleRu: "Системы заземления, молниезащиты и защиты от импульсных перенапряжений (УЗИП)",
    summaryRu: "Фундаментное заземление, выравнивание потенциалов, сетка Фарадея, активные молниеотводы и координация УЗИП классов 1, 2 и 3.",
    contentRu: `<h2>Комплексная молниезащита и защитное заземление</h2><p>Организация единого контура уравнивания потенциалов и трехступенчатой схемы УЗИП защищает дорогостоящие ПЛК и серверное оборудование от наведенных импульсов молнии.</p>`,
    metaTitleRu: "Промышленное заземление и молниезащита | Soykan Power",
    metaDescRu: "Инженерное руководство по проектированию контуров заземления, молниезащитной сетки по МЭК 62305 и выбору УЗИП для защиты автоматики."
  },
  {
    slug: "arazi-tipi-gunes-enerji-santrallerinde-zemin-etudu-ve-og-sebeke-baglantisi",
    category: "Güneş Enerjisi",
    coverImage: "/images/blog/arazi-ges-santrali.jpg",
    publishedAt: new Date("2026-03-29"),
    title: "Arazi Tipi Güneş Enerji Santrallerinde (GES) Zemin Etüdü ve OG Şebeke Bağlantısı",
    summary: "Megawatt ölçekli arazi GES projelerinde jeolojik zemin çekme testleri, çakma profil seçimi, trafo merkezleri, enerji nakil hatları ve SCADA bağlantısı.",
    content: `<h2>Arazi Tipi GES Projelerinde EPC Mühendisliği</h2><p>Arazi tipi Güneş Enerji Santralleri (Utility-Scale Solar PV), megavatlarca gücü ulusal iletim/dağıtım şebekesine aktaran devasa enerji altyapılarıdır.</p>`,
    metaTitle: "Arazi Tipi GES Kurulumu ve Şebeke Bağlantısı | Soykan Power",
    metaDesc: "Büyük ölçekli arazi tipi güneş enerji santralleri mühendisliği: Zemin etüdü, çakma kazık testleri, OG trafo merkezleri ve ENH şebeke entegrasyonu.",

    titleEn: "Ground-Mounted Utility Solar Farms: Geotechnical Testing & MV Grid Interconnection",
    summaryEn: "Geotechnical pull-out tests, driven steel pile foundations, substation kiosks, MV overhead transmission lines, and utility SCADA commissioning.",
    contentEn: `<h2>Engineering Utility-Scale Ground-Mounted Solar Parks</h2><p>Developing multi-megawatt solar parks demands rigorous soil pull-out mechanics, optimal string vs central inverter selection, and seamless 36kV medium-voltage grid substation tie-ins.</p>`,
    metaTitleEn: "Utility-Scale Ground Solar PV Engineering Guide | Soykan Power",
    metaDescEn: "Comprehensive guide to utility-scale solar farms: geotechnical soil testing, string vs central inverters, and medium-voltage grid interconnects.",

    titleAr: "محطات الطاقة الشمسية الحقلية (المقامة على الأراضي): الفحوصات الجيوتقنية والربط بشبكة الجهد المتوسط",
    summaryAr: "اختبارات شد التربة للأعمدة الفولاذية، اختيار المحولات والمحطات الفرعية، وخطوط نقل الطاقة 36 ك.ف وربط شبكات SCADA.",
    contentAr: `<h2>تنفيذ محطات الطاقة الشمسية الكبرى</h2><p>تتطلب محطات الطاقة الشمسية الحقلية دراسات جيوتقنية دقيقة للأرض واختياراً هندسياً مناسباً لنوع المحولات وخطوط نقل الجهد المتوسط لضمان أفضل عائد استثماري.</p>`,
    metaTitleAr: "هندسة محطات الطاقة الشمسية الحقلية الكبرى | سوكان باور",
    metaDescAr: "دليل شامل لتنفيذ محطات الطاقة الشمسية الحقلية ميغاوات وربطها بالشبكة الكهربائية العامة.",

    titleRu: "Наземные солнечные электростанции (СЭС): инженерно-геологические изыскания и подключение к СН",
    summaryRu: "Испытания грунта на выдергивание свай, выбор стринговых и центральных инверторов, подстанции 35 кВ и интеграция в SCADA сетевых компаний.",
    contentRu: `<h2>Строительство масштабных наземных солнечных парков</h2><p>Строительство СЭС мегаваттного класса требует геотехнических испытаний грунтов на выдергивание свай, строительства комплектных трансформаторных подстанций и линий электропередачи 35 кВ.</p>`,
    metaTitleRu: "Проектирование наземных СЭС большой мощности | Soykan Power",
    metaDescRu: "Инжиниринг мегаваттных солнечных электростанций: испытания грунтов, проектирование опорных конструкций и линий выдачи мощности 35 кВ."
  }
];
