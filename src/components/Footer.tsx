import React from 'react';
import { 
  MapPin, Phone, MessageSquare, Clock, ShieldCheck, CreditCard, 
  RefreshCw, Wrench, Heart, Send, Sparkles 
} from 'lucide-react';
import { Language, Currency, StoreBranch, SocialLinks } from '../types';
import { mockStoreBranches } from '../data/mockData';
import { SocialIcons } from './SocialIcons';

interface FooterProps {
  language: Language;
  currency: Currency;
  branches?: StoreBranch[];
  onOpenTradeIn: () => void;
  onOpenRepair: () => void;
  onOpenAdminAuth?: () => void;
  onSelectCategory?: (cat: any) => void;
  socialLinks?: SocialLinks;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  currency,
  branches,
  onOpenTradeIn,
  onOpenRepair,
  onOpenAdminAuth,
  onSelectCategory,
  socialLinks
}) => {
  const isAr = language === 'ar';

  return (
    <footer className="bg-black text-neutral-300 font-sans border-t border-neutral-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-right rtl:text-right">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-black shadow-md border border-neutral-200">
                <span className="font-extrabold text-lg tracking-tighter">SM</span>
              </div>
              <span className="font-black text-2xl text-white tracking-tight">
                SOLIMAN <span className="text-neutral-400">- MEGA SYSTEM</span>
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              {isAr
                ? 'المتجر المعتمد والأول للبيع والصيانة المباشرة لأجهزة أبل الحديثة والمستعملة بحالة الزيرو في مصر. نوفر أصلية المنتجات مع ضمان حقيقي وحاسبة استبدال فورية.'
                : 'Premier Apple store & certified repair hub in Egypt. Genuine products, 1-year guarantee & instant trade-in.'}
            </p>

            {/* Social Media Channels */}
            <div className="pt-1">
              <span className="text-[11px] font-bold text-white block mb-2">
                {isAr ? 'تابع صفحاتنا الرسمية والتحديثات:' : 'Follow Our Official Channels:'}
              </span>
              <SocialIcons socialLinks={socialLinks} size="lg" variant="footer" />
            </div>

            <div className="flex items-center gap-3 pt-1 text-xs font-bold">
              <a 
                href={socialLinks?.whatsappUrl || "https://wa.me/201012345678"} 
                target="_blank" 
                rel="noreferrer"
                className="bg-white hover:bg-neutral-200 text-black px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors font-black border border-neutral-300"
              >
                <MessageSquare className="w-4 h-4 text-black" />
                <span>{isAr ? 'تواصل واتساب مباشر' : 'WhatsApp Support'}</span>
              </a>

              <a 
                href="tel:01012345678" 
                className="bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors border border-neutral-700"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>01012345678</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-black text-sm text-white uppercase tracking-wider">
              {isAr ? 'الخدمات والأقسام السريعة' : 'Services & Quick Links'}
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300 font-semibold">
              <li>
                <button onClick={onOpenRepair} className="hover:text-white transition-colors flex items-center gap-1.5 text-right w-full">
                  <Wrench className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>{isAr ? 'حجز وتتبع كارت الصيانة الفورية' : 'Book Express Repair'}</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenTradeIn} className="hover:text-white transition-colors flex items-center gap-1.5 text-right w-full">
                  <RefreshCw className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>{isAr ? 'حاسبة تقييم وبدل جهازك القديم' : 'Trade-In Calculator'}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory && onSelectCategory('used')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-right w-full"
                >
                  <Sparkles className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>{isAr ? 'قسم الأجهزة المستعملة زيرو (بطارية 95%+)' : 'Pre-Owned Devices 99%'}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory && onSelectCategory('all')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-right w-full"
                >
                  <CreditCard className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>{isAr ? 'خطط وبرامج التقسيط الفوري (ValU)' : 'ValU Installment Plans'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Store Branches */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="font-black text-sm text-white uppercase tracking-wider">
              {isAr ? 'فروعنا وجمهورية الصيانة' : 'Store Branches'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {(branches && branches.length > 0 ? branches : mockStoreBranches).map((branch) => (
                <div key={branch.id} className="bg-neutral-900 p-3 rounded-xl border border-neutral-800 space-y-1">
                  <p className="font-extrabold text-white flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
                    <span>{isAr ? branch.nameAr : branch.name}</span>
                  </p>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">{isAr ? branch.addressAr : branch.address}</p>
                  <p className="text-neutral-300 font-mono text-[10px]">{branch.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Options Banner */}
        <div className="pt-6 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-neutral-300">{isAr ? 'شركاء التقسيط والدفع:' : 'Payment Partners:'}</span>
            {['ValU 0%', 'Souhoola', 'Sympl', 'CIB', 'NBE', 'Visa', 'Mastercard', 'Vodafone Cash', 'Cash on Delivery'].map((partner) => (
              <span key={partner} className="bg-neutral-900 px-2.5 py-1 rounded-md text-[10px] font-mono text-white border border-neutral-800">
                {partner}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 text-[11px] text-neutral-500">
            <span>
              © {new Date().getFullYear()} SOLIMAN - MEGA SYSTEM. {isAr ? 'جميع الحقوق محفوظة - متجر ومركز صيانة أبل المعتمد.' : 'All rights reserved.'}
            </span>
            {onOpenAdminAuth && (
              <button 
                onClick={onOpenAdminAuth}
                className="hover:text-white text-neutral-600 transition-colors flex items-center gap-1 opacity-60 hover:opacity-100"
                title={isAr ? 'دخول طاقم الإدارة' : 'Staff Portal'}
              >
                <ShieldCheck className="w-3 h-3" />
                <span className="text-[10px]">{isAr ? 'الإدارة' : 'Staff'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
