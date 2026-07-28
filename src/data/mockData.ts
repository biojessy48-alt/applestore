import { Product, RepairService, StoreBranch } from '../types';

export const mockProducts: Product[] = [
  {
    id: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max 256GB - Desert Titanium',
    nameAr: 'آيفون 16 برو ماكس 256 جيجا - تيتانيوم صحراوي',
    category: 'iphones',
    subcategory: 'Pro Series',
    priceEgp: 68900,
    originalPriceEgp: 72000,
    rating: 4.9,
    reviewsCount: 142,
    isNewRelease: true,
    isBestSeller: true,
    condition: 'New',
    warranty: '1 Year Official Warranty',
    warrantyAr: 'ضمان سنة رسمية معتمدة',
    description: 'The ultimate iPhone featuring a grade 5 titanium design, Camera Control button, 4K 120 fps Dolby Vision recording, and the A18 Pro chip.',
    descriptionAr: 'قمة إبداع أبل بتصميم التيتانيوم من الدرجة الخامسة، زر التحكم بالكاميرا الجديد، تصوير 4K 120 إطار في الثانية، ومعالج A18 Pro الخارق.',
    colors: [
      { name: 'Desert Titanium', nameAr: 'تيتانيوم صحراوي', hex: '#C5A087', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop' },
      { name: 'Natural Titanium', nameAr: 'تيتانيوم طبيعي', hex: '#9E9A96', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop' },
      { name: 'White Titanium', nameAr: 'تيتانيوم أبيض', hex: '#E3E4E5', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop' },
      { name: 'Black Titanium', nameAr: 'تيتانيوم أسود', hex: '#2B2B2C', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1000&auto=format&fit=crop' },
    ],
    storageOptions: [
      { size: '256GB', priceModifierEgp: 0 },
      { size: '512GB', priceModifierEgp: 11000 },
      { size: '1TB', priceModifierEgp: 22000 },
    ],
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1000&auto=format&fit=crop'
    ],
    specs: {
      Display: '6.9-inch Super Retina XDR OLED 120Hz',
      Processor: 'Apple A18 Pro (3nm)',
      Camera: '48MP Main + 48MP Ultra Wide + 12MP 5x Telephoto',
      Battery: 'Up to 33 hours video playback',
      Weight: '227g'
    },
    specsAr: {
      'الشاشة': '6.9 بوصة Super Retina XDR OLED مع تردد 120Hz',
      'المعالج': 'Apple A18 Pro سداسي النواة (تكنولوجيا 3 نانو)',
      'الكاميرا': 'ثلاثية 48 ميجابكسل + 48 ميجابكسل واسعة جداً + 12 ميجابكسل زووم 5X',
      'البطارية': 'تصل إلى 33 ساعة تشغيل فيديو',
      'الوزن': '227 جرام'
    },
    inStock: true,
    stockCount: 18,
    boxIncluded: true
  },
  {
    id: 'iphone-15-pro-used-like-new',
    name: 'iPhone 15 Pro 128GB - Natural Titanium (Like New)',
    nameAr: 'آيفون 15 برو 128 جيجا - تيتانيوم طبيعي (مستعمل كأنه جديد)',
    category: 'used',
    subcategory: 'Used iPhones',
    priceEgp: 43500,
    originalPriceEgp: 54000,
    rating: 4.8,
    reviewsCount: 89,
    isBestSeller: true,
    isFlashDeal: true,
    condition: 'Like New (99%)',
    batteryHealth: 98,
    warranty: '6 Months iTech Guarantee',
    warrantyAr: 'ضمان 6 أشهر من آي تك ضد عيوب الصناعة',
    description: 'Certified Grade A+ pre-owned iPhone 15 Pro. Never opened, pristine screen and body, 98% original battery health.',
    descriptionAr: 'جهاز آيفون 15 برو مستعمل فرز أول زيرو. بدون أخداد نهائياً، بطارية أصلية 98%، لم يتم فتحه أو تغيير أي قطعة فيه إطلاقاً.',
    colors: [
      { name: 'Natural Titanium', nameAr: 'تيتانيوم طبيعي', hex: '#9E9A96', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop' },
      { name: 'Blue Titanium', nameAr: 'تيتانيوم أزرق', hex: '#2A3644', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop' },
    ],
    storageOptions: [
      { size: '128GB', priceModifierEgp: 0 },
      { size: '256GB', priceModifierEgp: 4500 },
    ],
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1000&auto=format&fit=crop'
    ],
    specs: {
      Display: '6.1-inch Super Retina XDR ProMotion',
      Processor: 'Apple A17 Pro chip',
      BatteryHealth: '98% Original',
      ConditionGrade: '99% Clean - No scratches',
    },
    specsAr: {
      'الشاشة': '6.1 بوصة Super Retina XDR مع ProMotion 120Hz',
      'المعالج': 'Apple A17 Pro الخارق',
      'نسبة البطارية': '98% بطارية أصلية شديدة التحمل',
      'حالة الجهاز': '99% نقي تماماً بدون أي خدش كالجديد',
      'العلبة': 'العلبة الأصلية متوفرة بالكامل'
    },
    inStock: true,
    stockCount: 5,
    boxIncluded: true
  },
  {
    id: 'macbook-pro-m3-pro',
    name: 'MacBook Pro 16" M3 Pro 18GB RAM / 512GB SSD - Space Black',
    nameAr: 'ماك بوك برو 16 بوصة M3 Pro رام 18 جيجا / 512SSD - أسود فضاء',
    category: 'macs',
    subcategory: 'MacBook Pro',
    priceEgp: 118000,
    originalPriceEgp: 125000,
    rating: 5.0,
    reviewsCount: 34,
    isNewRelease: true,
    condition: 'New',
    warranty: '1 Year Apple Official Warranty',
    warrantyAr: 'ضمان سنة حقيقي معتمد من أبل',
    description: 'Blazing-fast M3 Pro chip with 12-core CPU and 18-core GPU, Liquid Retina XDR display, up to 22 hours battery life.',
    descriptionAr: 'أداء ناري بفضل معالج M3 Pro مع 12 نواة معالجة و 18 نواة رسوميات، شاشة Liquid Retina XDR وبطارية تدوم حتى 22 ساعة.',
    colors: [
      { name: 'Space Black', nameAr: 'أسود فضاء', hex: '#212224', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop' },
      { name: 'Silver', nameAr: 'فضي كلاسيكي', hex: '#E2E3E5', image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop' }
    ],
    storageOptions: [
      { size: '512GB SSD', priceModifierEgp: 0 },
      { size: '1TB SSD', priceModifierEgp: 15000 }
    ],
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop'
    ],
    specs: {
      Chip: 'Apple M3 Pro 12-Core',
      RAM: '18GB Unified Memory',
      Storage: '512GB Superfast SSD',
      Screen: '16.2-inch Liquid Retina XDR (3024x1964)',
      Ports: 'SDXC, HDMI, 3x Thunderbolt 4, MagSafe 3'
    },
    specsAr: {
      'المعالج': 'Apple M3 Pro سداسي عشر النوى',
      'الذاكرة العشوائية': '18 جيجابايت ذاكرة موحدة',
      'التخزين': '512 جيجابايت SSD فائقة السرعة',
      'الشاشة': '16.2 بوصة Liquid Retina XDR بدقة فائقة',
      'المنافذ': 'SDXC, HDMI, 3x Thunderbolt 4, MagSafe 3'
    },
    inStock: true,
    stockCount: 8,
    boxIncluded: true
  },
  {
    id: 'ipad-pro-m4-13',
    name: 'iPad Pro 13" M4 OLED 256GB Wi-Fi - Space Black',
    nameAr: 'آيباد برو 13 بوصة M4 شاشة OLED - 256 جيجا أسود فضاء',
    category: 'ipads',
    subcategory: 'iPad Pro',
    priceEgp: 62500,
    originalPriceEgp: 66000,
    rating: 4.9,
    reviewsCount: 67,
    isNewRelease: true,
    condition: 'New',
    warranty: '1 Year Apple Official Warranty',
    warrantyAr: 'ضمان سنة معتمد من أبل',
    description: 'Ultra Retina XDR Tandem OLED display, impossible thin 5.1mm design, groundbreaking Apple M4 chip.',
    descriptionAr: 'أنحف أجهزة أبل على الإطلاق بسمك 5.1 ملليمتر، شاشة OLED ترادُفية خارقة للعادة مع شريحة M4 المذهلة.',
    colors: [
      { name: 'Space Black', nameAr: 'أسود فضاء', hex: '#212224', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop' },
      { name: 'Silver', nameAr: 'فضي ألمونيوم', hex: '#E2E3E5', image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=1000&auto=format&fit=crop' }
    ],
    storageOptions: [
      { size: '256GB', priceModifierEgp: 0 },
      { size: '512GB', priceModifierEgp: 10000 },
      { size: '1TB', priceModifierEgp: 22000 }
    ],
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=1000&auto=format&fit=crop'
    ],
    specs: {
      Display: '13-inch Ultra Retina XDR Tandem OLED',
      Chip: 'Apple M4 Chip (9-core CPU / 10-core GPU)',
      Thickness: '5.1 mm Ultra-thin',
      PencilSupport: 'Apple Pencil Pro & USB-C'
    },
    specsAr: {
      'الشاشة': '13 بوصة Ultra Retina XDR Tandem OLED',
      'المعالج': 'شريحة Apple M4 الجيل الجديد',
      'السمك': '5.1 مم (أنحف أجهزة أبل عبر التاريخ)',
      'دعم القلم': 'يدعم Apple Pencil Pro الجديد'
    },
    inStock: true,
    stockCount: 12,
    boxIncluded: true
  },
  {
    id: 'apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2 Titanium 49mm - Ocean Band',
    nameAr: 'ساعة أبل ألترا 2 تيتانيوم 49 مم - حزام أوشن الرياضي',
    category: 'watches',
    subcategory: 'Apple Watch Ultra',
    priceEgp: 41900,
    originalPriceEgp: 45000,
    rating: 4.9,
    reviewsCount: 95,
    isBestSeller: true,
    condition: 'New',
    warranty: '1 Year Warranty',
    warrantyAr: 'ضمان سنة حقيقي',
    description: 'Rugged titanium case, S9 SiP chip with Double Tap gesture, 3000 nits display brightness, precision dual-frequency GPS.',
    descriptionAr: 'هيكل تيتانيوم مقاوم للصدمات، شاشة بسطوع 3000 شمعة الخارق، إيماءة الضغط المزدوج Double Tap، ونظام GPS مزدوج التردد.',
    colors: [
      { name: 'Titanium Ocean', nameAr: 'تيتانيوم أوشن أزرق', hex: '#1C3A4D', image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=1000&auto=format&fit=crop' },
      { name: 'Titanium Trail Loop', nameAr: 'تيتانيوم برتقالي', hex: '#D9531E', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000&auto=format&fit=crop' }
    ],
    images: [
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000&auto=format&fit=crop'
    ],
    specs: {
      Case: '49mm Grade 5 Titanium',
      Brightness: '3000 nits Peak Brightness',
      Battery: 'Up to 36 hours (72 hours low power)',
      WaterResistance: '100m Water Resistant / EN13319 Dive Certified'
    },
    specsAr: {
      'الهيكل': 'تيتانيوم درجة 5 مقاس 49 مم',
      'السطوع': '3000 شمعة (أعلى سطوع في أي ساعة أبل)',
      'البطارية': 'تصل إلى 36 ساعة عمل متواصل (72 ساعة في وضع حفظ الطاقة)',
      'مقاومة الماء': '100 متر معتمدة للغوص الاحترافي'
    },
    inStock: true,
    stockCount: 10,
    boxIncluded: true
  },
  {
    id: 'airpods-max-usb-c',
    name: 'AirPods Max USB-C Active Noise Cancelling - Midnight',
    nameAr: 'سماعة أبل إيربودز ماكس USB-C العازلة للضوضاء - ميدنايت',
    category: 'audio',
    subcategory: 'AirPods Max',
    priceEgp: 29800,
    originalPriceEgp: 32000,
    rating: 4.8,
    reviewsCount: 53,
    isFlashDeal: true,
    condition: 'New',
    warranty: '1 Year Apple Official Warranty',
    warrantyAr: 'ضمان سنة معتمد من أبل',
    description: 'Updated with USB-C charging and fresh colors. Ultimate over-ear listening experience with Active Noise Cancellation and Spatial Audio.',
    descriptionAr: 'النسخة المحدثة بمأخذ شحن USB-C السريع وألوان عصرية. عزل ضوضاء إيجابي خرافي مع صوت مكاني Spatial Audio سينمائي.',
    colors: [
      { name: 'Midnight', nameAr: 'أسود كحل ليلي', hex: '#1C2530', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop' },
      { name: 'Starlight', nameAr: 'ستارلايت ذهبي', hex: '#ECE5D8', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop' }
    ],
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop'
    ],
    specs: {
      AudioTechnology: 'Apple-designed dynamic driver, ANC, Transparency Mode',
      Battery: 'Up to 20 hours listening time with ANC',
      Charging: 'USB-C fast charging (5 mins = 1.5 hrs playback)'
    },
    specsAr: {
      'تكنولوجيا الصوت': 'محرك ديناميكي مضخم من أبل، إلغاء الضوضاء، وضع الشفافية',
      'البطارية': 'تصل إلى 20 ساعة استماع متواصل',
      'الشحن': 'شحن سريع عبر منفذ USB-C (5 دقائق شحن تعطيك ساعة ونصف استماع)'
    },
    inStock: true,
    stockCount: 7,
    boxIncluded: true
  },
  {
    id: 'anker-maggo-10k-powerbank',
    name: 'Anker MagGo Qi2 10,000mAh Wireless Power Bank 15W',
    nameAr: 'باور بنك أنكر ماج جو Qi2 سعة 10,000 مللي أمبير بقوة 15 واط لاسلكي مع شاشة',
    category: 'accessories',
    subcategory: 'Chargers & Power',
    priceEgp: 3850,
    originalPriceEgp: 4500,
    rating: 4.9,
    reviewsCount: 112,
    isBestSeller: true,
    condition: 'New',
    warranty: '18 Months Anker Warranty',
    warrantyAr: 'ضمان 18 شهراً رسمياً من أنكر',
    description: 'Certified Qi2 15W MagSafe fast charging with smart display screen, kickstand, and USB-C 27W bidirectional fast charging.',
    descriptionAr: 'شاحن مغناطيسي ماج سيفQi2 بقوة 15 واط مع شاشة ذكية لعرض نسبة الشحن والوقت المتبقي، مع ستاند مدمج وشحن سلكي 27 واط.',
    colors: [
      { name: 'Black Titanium', nameAr: 'أسود مطفأ', hex: '#232323', image: 'https://images.unsplash.com/photo-1609592424074-25e2d192c733?q=80&w=1000&auto=format&fit=crop' },
      { name: 'Shell White', nameAr: 'أبيض صدفي', hex: '#F0F0F0', image: 'https://images.unsplash.com/photo-1609592424074-25e2d192c733?q=80&w=1000&auto=format&fit=crop' }
    ],
    images: [
      'https://images.unsplash.com/photo-1609592424074-25e2d192c733?q=80&w=1000&auto=format&fit=crop'
    ],
    specs: {
      Capacity: '10,000 mAh',
      WirelessOutput: 'Qi2 15W MagSafe Certified',
      Screen: 'Smart LED Display',
      Stand: 'Built-in Foldable Kickstand'
    },
    specsAr: {
      'السعة': '10,000 مللي أمبير تكفي لشحن الآيفون مرتين ونصف',
      'الشحن اللاسلكي': 'شحن مغناطيسي Qi2 معتمد بقوة 15 واط',
      'الشاشة': 'شاشة ملونة ذكية تعرض الوقت المتبقي ونسبة البطارية',
      'الميزات': 'حامل مدمج للرؤية الأفقية والعمودية'
    },
    inStock: true,
    stockCount: 25,
    boxIncluded: true
  },
  {
    id: 'macbook-air-m2-used',
    name: 'MacBook Air 13.6" M2 8GB / 256GB SSD - Midnight (Open Box)',
    nameAr: 'ماك بوك إير M2 13.6 بوصة 8/256GB - كحلي ميدنايت (أوبن بوكس كالجديد)',
    category: 'used',
    subcategory: 'Used Macs',
    priceEgp: 48900,
    originalPriceEgp: 58000,
    rating: 4.9,
    reviewsCount: 41,
    condition: 'Like New (99%)',
    batteryHealth: 99,
    warranty: '6 Months Guarantee',
    warrantyAr: 'ضمان 6 أشهر من آي تك',
    description: 'Certified Open Box unit with 3 battery charge cycles only! Flawless condition, original charger and box included.',
    descriptionAr: 'جهاز فتح صندوق أوبن بوكس بحالة الزيرو تماماً! 3 دورات شحن فقط للبطارية، بدون أي استخدام أو أثر، مع الشاحن الأصلي والعلبة.',
    colors: [
      { name: 'Midnight', nameAr: 'كحلي ليلي', hex: '#1C2530', image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop' }
    ],
    images: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop'
    ],
    specs: {
      BatteryCycles: '3 Cycles Only',
      BatteryHealth: '100% Capacity',
      CosmeticGrade: 'Grade A+ Open Box'
    },
    specsAr: {
      'عدد دورات الشحن': '3 دورات شحن فقط (Zero Use)',
      'صحة البطارية': '100% بكامل كفاءة المصنع',
      'الحالة الفنية': 'فتح صندوق أوريجينال أبل كأنه جديد تماماً'
    },
    inStock: true,
    stockCount: 3,
    boxIncluded: true
  }
];

export const mockRepairServices: RepairService[] = [
  {
    id: 'rep-iphone-screen-15pro',
    deviceType: 'iphone',
    modelName: 'iPhone 15 Pro / Pro Max',
    issueName: 'Original Screen Replacement (OLED Super Retina)',
    issueNameAr: 'تغيير شاشة أصلية أبل مع نقل الخاصية وبصمة الوجه TrueTone',
    estimatedPriceEgp: 11500,
    estimatedTimeMinutes: 45,
    warrantyMonths: 6,
    descriptionAr: 'تغيير شاشة أصلية بالكامل من أبل مع برمجة شريحة الشاشة لنقل خاصية TrueTone وتفعيل السطوع التلقائي دون ظهور أي رسالة غير معروفة.'
  },
  {
    id: 'rep-iphone-battery-14',
    deviceType: 'iphone',
    modelName: 'iPhone 14 / 14 Pro / 14 Pro Max',
    issueName: 'Original Battery Change with BMS Chip Swap (100% Health)',
    issueNameAr: 'تغيير بطارية أصلية أبل مع لحام شريحة BMS لنقل نسبة البطارية 100%',
    estimatedPriceEgp: 3800,
    estimatedTimeMinutes: 35,
    warrantyMonths: 6,
    descriptionAr: 'تغيير خلايا بطارية أصلية عالية الكثافة مع تعديل الكابل الأصلي لجعل نسبة البطارية تظهر 100% في إعدادات النظام بدون رسائل تحذيرية.'
  },
  {
    id: 'rep-iphone-backglass-laser',
    deviceType: 'iphone',
    modelName: 'iPhone 13 / 14 / 15 / 16 Series',
    issueName: 'Laser Back Glass Replacement (Without opening phone)',
    issueNameAr: 'تغيير الباغ الخفي بالليزر بدقة متناهية دون فك أجزاء الجهاز',
    estimatedPriceEgp: 2400,
    estimatedTimeMinutes: 60,
    warrantyMonths: 12,
    descriptionAr: 'إزالة الزجاج الخلفي المكسور بتقنية آلة الليزر الألمانية الحديثة مع كبس زجاج أصلي جديد بمقاومة الماء والأتربة.'
  },
  {
    id: 'rep-mac-display-m1-m2',
    deviceType: 'mac',
    modelName: 'MacBook Air / Pro M1 / M2 / M3',
    issueName: 'Original Liquid Retina Screen Assembly',
    issueNameAr: 'تغيير شاشة ماك بوك كاملة أصلية بسلاسة الإضاءة والتدرج',
    estimatedPriceEgp: 18500,
    estimatedTimeMinutes: 90,
    warrantyMonths: 6,
    descriptionAr: 'استبدال النصف العلوي أو الشاشة الداخلية لشاشات ماك بوك الأصلية مع معايرة كاميرا HD والحساسات الضوئية.'
  },
  {
    id: 'rep-ipad-glass-digitizer',
    deviceType: 'ipad',
    modelName: 'iPad Air / iPad Pro / iPad 9th/10th Gen',
    issueName: 'Touch Glass / Screen Refurbishing',
    issueNameAr: 'تغيير باغة التاتش الخارجي مع الحفاظ على الشاشة الداخلية الأصلية',
    estimatedPriceEgp: 2900,
    estimatedTimeMinutes: 50,
    warrantyMonths: 6,
    descriptionAr: 'كبس باغة أصلية للشاشة بالضغط التفريغي لمنع دخول الأتربة مع الحفاظ على الألوان وجودة العرض الأصلية للشاشة.'
  }
];

export const mockStoreBranches: StoreBranch[] = [
  {
    id: 'nasr-city',
    name: 'Nasr City Flagship Branch',
    nameAr: 'فرع مدينة نصر (الفرع الرئيسي ومركز الصيانة)',
    city: 'Cairo',
    cityAr: 'القاهرة',
    address: 'Abbas El Akkad St, In front of Momen, Nasr City, Cairo',
    addressAr: 'شارع عباس العقاد، أمام مؤمن - بجوار سيراميكا كليوباترا - مدينة نصر',
    phone: '01012345678',
    whatsapp: '201012345678',
    hours: '11:00 AM - 11:30 PM Daily',
    hoursAr: 'يومياً من 11:00 صباحاً حتى 11:30 مساءً'
  },
  {
    id: 'tagamoa-5',
    name: 'New Cairo Branch',
    nameAr: 'فرع التجمع الخامس (القطامية داون تاون)',
    city: 'New Cairo',
    cityAr: 'القاهرة الجديدة',
    address: 'Downtown Mall, Ground Floor, Gate 2, New Cairo',
    addressAr: 'مول داون تاون القطامية، الدور الأرضي، بوابة 2 - التجمع الخامس',
    phone: '01198765432',
    whatsapp: '201198765432',
    hours: '12:00 PM - 11:00 PM',
    hoursAr: 'يومياً من 12:00 ظهراً حتى 11:00 مساءً'
  },
  {
    id: 'alex-smouha',
    name: 'Alexandria Smouha Branch',
    nameAr: 'فرع الإسكندرية (سموحة)',
    city: 'Alexandria',
    cityAr: 'الإسكندرية',
    address: 'Victor Emanuel St, Opposite Smouha Club Gate 1, Alexandria',
    addressAr: 'شارع فيكتور عمانويل، أمام بوابة 1 نادي سموحة - الإسكندرية',
    phone: '01234567890',
    whatsapp: '201234567890',
    hours: '12:00 PM - 11:00 PM',
    hoursAr: 'يومياً من 12:00 ظهراً حتى 11:00 مساءً'
  }
];
