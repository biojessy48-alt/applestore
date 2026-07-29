import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Zap, RefreshCw, Truck, ChevronLeft, ChevronRight, 
  Sparkles, Award, CreditCard, Wrench, CheckCircle2 
} from 'lucide-react';
import { Language, Currency, HeroSlide } from '../types';

interface HeroBannerProps {
  language: Language;
  currency: Currency;
  slides?: HeroSlide[];
  onSelectCategory: (cat: any) => void;
  onOpenTradeIn: () => void;
  onOpenRepair: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  language,
  currency,
  slides: customSlides,
  onSelectCategory,
  onOpenTradeIn,
  onOpenRepair
}) => {
  const isAr = language === 'ar';
  const [currentSlide, setCurrentSlide] = useState(0);

  const defaultSlides: HeroSlide[] = [
    {
      id: 1,
      titleAr: 'سلسلة iPhone 16 Pro Max الفاخرة',
      subtitleAr: 'هيكل التيتانيوم الصحراوي | زر التحكم بالكاميرا المبتكر | شريحة A18 Pro الخارقة',
      titleEn: 'iPhone 16 Pro Max Titanium Series',
      subtitleEn: 'Desert Titanium | Innovative Camera Control | Apple A18 Pro Chip',
      badgeAr: 'وصل حديثاً بأقوى خصم',
      badgeEn: 'New Release Offer',
      ctaAr: 'تسوق الآن بالتقسيط',
      ctaEn: 'Shop Now',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200&auto=format&fit=crop',
      category: 'iphones',
      accentColor: 'from-amber-600/20 to-emerald-950'
    },
    {
      id: 2,
      titleAr: 'مركز صيانة أبل المعتمد - كليك أند فيكس',
      subtitleAr: 'تغيير شاشات وبطاريات أصلية 100% أمام عينيك في 30 دقيقة مع ضمان سنة كاملة',
      titleEn: 'Certified Apple Repair Center',
      subtitleEn: '100% Genuine screen & battery replacement in 30 minutes with 1-Year warranty',
      badgeAr: 'صيانة فورية مضمونة',
      badgeEn: 'Instant Express Repair',
      ctaAr: 'احجز صيانة جهازك',
      ctaEn: 'Book Repair Slot',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
      action: 'repair',
      accentColor: 'from-emerald-800/30 to-slate-950'
    },
    {
      id: 3,
      titleAr: 'قسم الأجهزة المستعملة والمجددة (فرز أول 99%)',
      subtitleAr: 'بطاريات أصلية 95%+ بدون أخداد | فحص 40 نقطة تقنية | ضمان 6 أشهر مع العلبة',
      titleEn: 'Certified Pre-Owned & Refurbished (99% Clean)',
      subtitleEn: 'Original batteries 95%+ | 40-Point tech inspection | 6 Months iTech Warranty',
      badgeAr: 'وفر حتى 35% من السعر',
      badgeEn: 'Save up to 35%',
      ctaAr: 'استكشف أجهزة الزيرو',
      ctaEn: 'Explore Used Deals',
      image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1200&auto=format&fit=crop',
      category: 'used',
      accentColor: 'from-amber-700/20 to-slate-900'
    }
  ];

  const slides = (customSlides && customSlides.length > 0) ? customSlides : defaultSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="relative bg-neutral-950 text-white overflow-hidden font-sans border-b border-neutral-800">
      {/* Subtle Background Radial Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-800/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neutral-900/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Slider */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[380px]">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-5 text-right rtl:text-right">
            <div className="inline-flex items-center gap-2 bg-white text-black border border-neutral-200 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-black animate-spin" />
              <span>{isAr ? slide.badgeAr : slide.badgeEn}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              {isAr ? slide.titleAr : slide.titleEn}
            </h1>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              {isAr ? slide.subtitleAr : slide.subtitleEn}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  if (slide.action === 'repair') {
                    onOpenRepair();
                  } else {
                    onSelectCategory(slide.category || 'all');
                  }
                }}
                className="bg-white hover:bg-neutral-200 text-black font-black text-sm px-7 py-3.5 rounded-full shadow-lg hover:scale-105 transition-all flex items-center gap-2 border border-neutral-300"
              >
                <span>{isAr ? slide.ctaAr : slide.ctaEn}</span>
                <ChevronLeft className="w-4 h-4 rtl:rotate-0 rotate-180" />
              </button>

              <button
                onClick={onOpenTradeIn}
                className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm px-6 py-3.5 rounded-full border border-neutral-700 hover:border-white transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4 text-neutral-300" />
                <span>{isAr ? 'حاسبة بدل جهازك القديم' : 'Trade-In Calculator'}</span>
              </button>
            </div>
          </div>

          {/* Banner Hero Image */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 group bg-black">
              <img
                src={slide.image}
                alt={isAr ? slide.titleAr : slide.titleEn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-neutral-900/90 backdrop-blur-md p-3 rounded-xl border border-neutral-700 flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span className="font-bold">{isAr ? 'ضمان سليمان المعتمد' : 'Soliman Warranty'}</span>
                </div>
                <span className="text-neutral-300 font-semibold">{isAr ? 'قطع أصلية 100%' : '100% Genuine'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx ? 'w-8 bg-white' : 'w-2 bg-neutral-800 hover:bg-neutral-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trust Badges Strip */}
      <div className="bg-black border-t border-neutral-800 py-4 px-4 text-neutral-200">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2.5 p-2 bg-neutral-900 rounded-xl border border-neutral-800">
            <ShieldCheck className="w-5 h-5 text-white shrink-0" />
            <div className="text-right rtl:text-right">
              <p className="font-bold text-xs text-white">{isAr ? 'ضمان أبل وحماية معتمدة' : 'Official Warranty'}</p>
              <p className="text-[11px] text-neutral-400">{isAr ? 'ضمان شامل حتى سنة كاملة' : 'Up to 1 year full guarantee'}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2.5 p-2 bg-neutral-900 rounded-xl border border-neutral-800">
            <Wrench className="w-5 h-5 text-white shrink-0" />
            <div className="text-right rtl:text-right">
              <p className="font-bold text-xs text-white">{isAr ? 'صيانة فورية في 30 دقيقة' : '30-Min Express Repair'}</p>
              <p className="text-[11px] text-neutral-400">{isAr ? 'أمام عينيك بقطع أصلية' : 'Genuine parts on the spot'}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2.5 p-2 bg-neutral-900 rounded-xl border border-neutral-800">
            <RefreshCw className="w-5 h-5 text-white shrink-0" />
            <div className="text-right rtl:text-right">
              <p className="font-bold text-xs text-white">{isAr ? 'استبدال أعلى تقييم سوقي' : 'Best Trade-In Value'}</p>
              <p className="text-[11px] text-neutral-400">{isAr ? 'تثمين فوري لجهازك القديم' : 'Instant evaluation & upgrade'}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2.5 p-2 bg-neutral-900 rounded-xl border border-neutral-800">
            <CreditCard className="w-5 h-5 text-white shrink-0" />
            <div className="text-right rtl:text-right">
              <p className="font-bold text-xs text-white">{isAr ? 'تقسيط حتى 36 شهر' : '0% Interest Installments'}</p>
              <p className="text-[11px] text-neutral-400">{isAr ? 'ValU، سهولة، وبنوك مصر' : 'ValU, Souhoola & Cards'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
