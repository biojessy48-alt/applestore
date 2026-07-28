import React from 'react';
import { 
  MapPin, Phone, MessageSquare, Clock, ShieldCheck, CreditCard, 
  RefreshCw, Wrench, Heart, Send, Sparkles 
} from 'lucide-react';
import { Language, Currency } from '../types';
import { mockStoreBranches } from '../data/mockData';

interface FooterProps {
  language: Language;
  currency: Currency;
  onOpenTradeIn: () => void;
  onOpenRepair: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  currency,
  onOpenTradeIn,
  onOpenRepair
}) => {
  const isAr = language === 'ar';

  return (
    <footer className="bg-slate-950 text-slate-300 font-sans border-t border-emerald-900/40 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-right rtl:text-right">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 via-emerald-800 to-emerald-950 flex items-center justify-center text-amber-300 shadow-md">
                <span className="font-extrabold text-lg tracking-tighter">SM</span>
              </div>
              <span className="font-black text-2xl text-white tracking-tight">
                SOLIMAN <span className="text-emerald-500">- MEGA SYSTEM</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {isAr
                ? 'المتجر المعتمد والأول للبيع والصيانة المباشرة لأجهزة أبل الحديثة والمستعملة بحالة الزيرو في مصر. نوفر أصلية المنتجات مع ضمان حقيقي وحاسبة استبدال فورية.'
                : 'Premier Apple store & certified repair hub in Egypt. Genuine products, 1-year guarantee & instant trade-in.'}
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs font-bold">
              <a 
                href="https://wa.me/201012345678" 
                target="_blank" 
                rel="noreferrer"
                className="bg-emerald-800 hover:bg-emerald-700 text-amber-300 px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{isAr ? 'تواصل واتساب مباشر' : 'WhatsApp Support'}</span>
              </a>

              <a 
                href="tel:01012345678" 
                className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>01012345678</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-black text-sm text-white uppercase text-amber-400">
              {isAr ? 'الخدمات والأقسام السريعة' : 'Services & Quick Links'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-semibold">
              <li>
                <button onClick={onOpenRepair} className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isAr ? 'حجز وتتبع كارت الصيانة الفورية' : 'Book Express Repair'}</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenTradeIn} className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isAr ? 'حاسبة تقييم وبدل جهازك القديم' : 'Trade-In Calculator'}</span>
                </button>
              </li>
              <li>
                <a href="#maintenance-hub" className="hover:text-amber-300 transition-colors">
                  {isAr ? 'قسم الأجهزة المستعملة زيرو (بطارية 95%+)' : 'Pre-Owned Devices 99%'}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-300 transition-colors">
                  {isAr ? 'خطط وبرامج التقسيط الفوري (ValU)' : 'ValU Installment Plans'}
                </a>
              </li>
            </ul>
          </div>

          {/* Store Branches */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="font-black text-sm text-white uppercase text-amber-400">
              {isAr ? 'فروعنا وجمهورية الصيانة' : 'Store Branches'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {mockStoreBranches.map((branch) => (
                <div key={branch.id} className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                  <p className="font-extrabold text-amber-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{isAr ? branch.nameAr : branch.name}</span>
                  </p>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{isAr ? branch.addressAr : branch.address}</p>
                  <p className="text-emerald-400 font-mono text-[10px]">{branch.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Options Banner */}
        <div className="pt-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-300">{isAr ? 'شركاء التقسيط والدفع:' : 'Payment Partners:'}</span>
            {['ValU 0%', 'Souhoola', 'Sympl', 'CIB', 'NBE', 'Visa', 'Mastercard', 'Vodafone Cash', 'Cash on Delivery'].map((partner) => (
              <span key={partner} className="bg-slate-900 px-2.5 py-1 rounded-md text-[10px] font-mono text-emerald-400 border border-slate-800">
                {partner}
              </span>
            ))}
          </div>

          <p className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} SOLIMAN - MEGA SYSTEM. {isAr ? 'جميع الحقوق محفوظة - متجر ومركز صيانة أبل المعتمد.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};
