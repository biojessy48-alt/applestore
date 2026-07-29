import React from 'react';
import { 
  Smartphone, Laptop, Tablet, Watch, Headphones, Cable, 
  Sparkles, Wrench, ArrowUpLeft, ChevronLeft, Tag, Shield, Zap, Grid
} from 'lucide-react';
import { CategoryId, Language, StoreCategory } from '../types';

interface CategoryGridProps {
  language: Language;
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  categories?: StoreCategory[];
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  language,
  selectedCategory,
  onSelectCategory,
  categories
}) => {
  const isAr = language === 'ar';

  const getCategoryIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Smartphone': return Smartphone;
      case 'Laptop': return Laptop;
      case 'Tablet': return Tablet;
      case 'Watch': return Watch;
      case 'Headphones': return Headphones;
      case 'Cable': return Cable;
      case 'Sparkles': return Sparkles;
      case 'Wrench': return Wrench;
      case 'Shield': return Shield;
      case 'Zap': return Zap;
      case 'Tag': return Tag;
      default: return Grid;
    }
  };

  const defaultCategoryItems = [
    {
      id: 'iphones' as CategoryId,
      nameAr: 'أجهزة آيفون',
      nameEn: 'iPhones',
      descAr: '16 Pro Max, 16, 15 Pro, 14',
      descEn: 'Latest flagship models',
      countAr: 'أحدث الموديلات متوفرة',
      countEn: 'Latest models available',
      icon: Smartphone,
      gradient: 'from-emerald-800 to-emerald-950',
      badgeAr: 'جديد ومستعمل',
      badgeEn: 'New & Used',
      bgImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 'macs' as CategoryId,
      nameAr: 'أجهزة ماك بوك',
      nameEn: 'MacBook & Mac',
      descAr: 'M3 Pro, M3 Max, M2 Air',
      descEn: 'Ultimate performance laptops',
      countAr: 'أجهزة احترافية',
      countEn: 'Pro laptops',
      icon: Laptop,
      gradient: 'from-slate-800 to-slate-950',
      badgeAr: 'ضمان سنة',
      badgeEn: '1 Year Warranty',
      bgImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 'ipads' as CategoryId,
      nameAr: 'أجهزة آيباد',
      nameEn: 'iPads',
      descAr: 'iPad Pro M4, Air M2, Mini',
      descEn: 'Ultra Retina OLED displays',
      countAr: 'للإنتاجية والتصميم',
      countEn: 'For productivity & art',
      icon: Tablet,
      gradient: 'from-emerald-900 to-teal-950',
      badgeAr: 'أنحف آيباد',
      badgeEn: 'Thinnest Ever',
      bgImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 'watches' as CategoryId,
      nameAr: 'ساعات أبل',
      nameEn: 'Apple Watch',
      descAr: 'Ultra 2, Series 10, SE',
      descEn: 'Advanced health & GPS tracking',
      countAr: 'ساعات أبل الذكية',
      countEn: 'Apple Smart Watches',
      icon: Watch,
      gradient: 'from-amber-900/80 to-slate-950',
      badgeAr: 'تيتانيوم 49 مم',
      badgeEn: 'Titanium 49mm',
      bgImage: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 'audio' as CategoryId,
      nameAr: 'إيربودز وصوتيات',
      nameEn: 'AirPods & Audio',
      descAr: 'AirPods Max USB-C, Pro 2',
      descEn: 'Active Noise Cancellation',
      countAr: 'عزل صوتي خيالي',
      countEn: 'ANC Studio quality',
      icon: Headphones,
      gradient: 'from-slate-900 to-emerald-950',
      badgeAr: 'عزل صوتي خيالي',
      badgeEn: 'ANC Studio',
      bgImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 'accessories' as CategoryId,
      nameAr: 'إكسسوارات أصلية',
      nameEn: 'Original Accessories',
      descAr: 'Anker, MagSafe, Spigen',
      descEn: 'Fast chargers & protection cases',
      countAr: 'منتجات أصلية 100%',
      countEn: '100% Original products',
      icon: Cable,
      gradient: 'from-emerald-950 to-slate-900',
      badgeAr: 'معتمد رسمياً',
      badgeEn: 'Certified',
      bgImage: 'https://images.unsplash.com/photo-1609592424074-25e2d192c733?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 'used' as CategoryId,
      nameAr: 'الأجهزة المستعملة والمجددة',
      nameEn: 'Certified Pre-Owned',
      descAr: 'بطارية 95%+ | بدون أخداد 99%',
      descEn: 'Original battery 95%+ | Clean 99%',
      countAr: 'فرز أول زيرو مع ضمان 6 أشهر',
      countEn: 'Grade A+ Clean',
      icon: Sparkles,
      gradient: 'from-amber-800 to-emerald-950',
      badgeAr: 'خصومات استثنائية 🔥',
      badgeEn: 'Special Deals',
      bgImage: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 'maintenance' as CategoryId,
      nameAr: 'مركز صيانة كليك أند فيكس',
      nameEn: 'Certified Repair Hub',
      descAr: 'شاشات أصلية، بطاريات، ليزر باغة',
      descEn: 'Screen, battery, laser back glass',
      countAr: 'إصلاح فوري في 30 دقيقة',
      countEn: '30-Min On-the-spot',
      icon: Wrench,
      gradient: 'from-emerald-700 to-slate-950',
      badgeAr: 'ضمان الصيانة 6 أشهر',
      badgeEn: '6 Months Repair Guarantee',
      bgImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=400&auto=format&fit=crop'
    }
  ];

  const categoryItems = (categories && categories.length > 0)
    ? categories.map(c => ({
        id: c.id,
        nameAr: c.nameAr,
        nameEn: c.nameEn,
        descAr: c.descriptionAr || c.nameAr,
        descEn: c.descriptionEn || c.nameEn,
        countAr: 'منتجات وأجهزة متاحة',
        countEn: 'Available items',
        icon: getCategoryIcon(c.iconName),
        gradient: 'from-slate-800 to-emerald-950',
        badgeAr: c.badgeAr || 'متوفر بالمتجر',
        badgeEn: c.badgeEn || 'In Store',
        bgImage: c.bgImage || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop'
      }))
    : defaultCategoryItems;

  return (
    <section className="py-10 px-4 bg-neutral-950 font-sans border-b border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="text-right rtl:text-right">
            <span className="text-xs font-black tracking-wider uppercase text-black bg-white px-3.5 py-1 rounded-full border border-neutral-200">
              {isAr ? 'تصنيفات متجر سليمان' : 'Category Explorer'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
              {isAr ? 'استكشف أقسام الأجهزة والخدمات' : 'Explore Device Categories'}
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1">
              {isAr 
                ? 'جميع منتجات أبل الأصلية والأجهزة المستعملة بحالة الزيرو مع مركز صيانة متطور' 
                : 'Genuine Apple products, certified pre-owned devices & repair center'}
            </p>
          </div>

          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs font-bold text-white hover:text-neutral-300 flex items-center gap-1.5 self-start md:self-auto bg-neutral-900 px-4 py-2.5 rounded-full border border-neutral-700 shadow-sm hover:border-white transition-all"
          >
            <span>{isAr ? 'عرض كافة المنتجات' : 'View All Products'}</span>
            <ChevronLeft className="w-4 h-4 rtl:rotate-0 rotate-180" />
          </button>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {categoryItems.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`relative overflow-hidden rounded-2xl p-4 sm:p-5 cursor-pointer transition-all duration-300 group shadow-sm border ${
                  isSelected 
                    ? 'ring-2 ring-white border-white scale-[1.02] bg-neutral-900' 
                    : 'border-neutral-800 hover:border-neutral-500 bg-neutral-900/90'
                }`}
              >
                {/* Background Subtle Image */}
                <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity">
                  <img src={cat.bgImage} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>

                <div className="relative z-10 flex flex-col h-full justify-between space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-xl bg-white text-black font-black shadow-md group-hover:scale-110 transition-transform border border-neutral-200">
                      <Icon className="w-5 h-5 text-black" />
                    </div>

                    <span className="text-[10px] font-black text-black bg-white border border-neutral-200 px-2 py-0.5 rounded-full">
                      {isAr ? cat.badgeAr : cat.badgeEn}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-white text-sm sm:text-base group-hover:text-neutral-300 transition-colors">
                      {isAr ? cat.nameAr : cat.nameEn}
                    </h3>
                    <p className="text-neutral-400 text-xs mt-0.5 line-clamp-1">
                      {isAr ? cat.descAr : cat.descEn}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px] font-bold text-neutral-400 group-hover:text-white transition-colors">
                    <span>{isAr ? cat.countAr : cat.countEn}</span>
                    <ArrowUpLeft className="w-3.5 h-3.5 text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
