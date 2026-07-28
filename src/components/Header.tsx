import React, { useState } from 'react';
import { 
  Search, ShoppingBag, Heart, Wrench, RefreshCw, User, 
  MapPin, Phone, Globe, ChevronDown, Menu, X, Check, ArrowRight,
  Clock, ShieldCheck, Sparkles
} from 'lucide-react';
import { CategoryId, Currency, Language, CartItem, Product, StoreCategory, SocialLinks } from '../types';
import { SocialIcons } from './SocialIcons';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  selectedCategory: CategoryId;
  setSelectedCategory: (cat: CategoryId) => void;
  cartItems: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  wishlistIds: string[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onOpenRepairTracker: () => void;
  onOpenTradeIn: () => void;
  onOpenAiAdvisor: () => void;
  onOpenAdminPanel: () => void;
  announcementText?: string;
  storeCategories?: StoreCategory[];
  socialLinks?: SocialLinks;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  currency,
  setCurrency,
  selectedCategory,
  setSelectedCategory,
  cartItems,
  setIsCartOpen,
  wishlistIds,
  searchQuery,
  setSearchQuery,
  products,
  onSelectProduct,
  onOpenRepairTracker,
  onOpenTradeIn,
  onOpenAiAdvisor,
  onOpenAdminPanel,
  announcementText,
  storeCategories,
  socialLinks
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const searchResults = searchQuery.trim() 
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.nameAr.includes(searchQuery) ||
        p.category.includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const defaultCategories: StoreCategory[] = [
    { id: 'iphones', nameAr: 'آيفون', nameEn: 'iPhones' },
    { id: 'macs', nameAr: 'ماك بوك', nameEn: 'Macs' },
    { id: 'ipads', nameAr: 'آيباد', nameEn: 'iPads' },
    { id: 'watches', nameAr: 'ساعات أبل', nameEn: 'Apple Watch' },
    { id: 'audio', nameAr: 'سماعات وآوديو', nameEn: 'AirPods & Audio' },
    { id: 'accessories', nameAr: 'إكسسوارات أصلية', nameEn: 'Accessories' },
    { id: 'used', nameAr: 'المستعمل والمجدد (زيرو)', nameEn: 'Used & Open Box' },
    { id: 'maintenance', nameAr: 'مركز الصيانة المعتمد', nameEn: 'Repair Services' },
  ];

  const activeStoreCategories = storeCategories && storeCategories.length > 0 ? storeCategories : defaultCategories;

  const navCategories = [
    { id: 'all', nameEn: 'All Catalog', nameAr: 'جميع الأقسام' },
    ...activeStoreCategories
  ];

  const isAr = language === 'ar';

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-emerald-900/10 font-sans">
      {/* Top Announcement Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-800/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap scrollbar-none">
            <span className="flex items-center gap-1.5 text-amber-300 font-semibold bg-emerald-900/60 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              {isAr ? 'عروض الصيف الأخيرة' : 'Summer Mega Deals'}
            </span>
            <span className="text-emerald-200/90 font-medium">
              {announcementText || (isAr 
                ? '🚚 شحن آمن وسريع لجميع المحافظات مع ضمان استبدال 14 يومًا' 
                : '🚚 Fast safe nationwide delivery with 14-day warranty')}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs">
            {/* Social Media Links */}
            <SocialIcons socialLinks={socialLinks} size="sm" variant="header" />

            {/* Currency Selector */}
            <div className="flex items-center gap-1 text-emerald-300/80 border-r border-emerald-800/80 pr-3 mr-1">
              <button 
                onClick={() => setCurrency('EGP')} 
                className={`px-1.5 py-0.5 rounded ${currency === 'EGP' ? 'bg-emerald-800 text-amber-300 font-bold' : 'hover:text-white'}`}
              >
                ج.م EGP
              </button>
              <span>/</span>
              <button 
                onClick={() => setCurrency('USD')} 
                className={`px-1.5 py-0.5 rounded ${currency === 'USD' ? 'bg-emerald-800 text-amber-300 font-bold' : 'hover:text-white'}`}
              >
                $ USD
              </button>
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(isAr ? 'en' : 'ar')}
              className="flex items-center gap-1 text-emerald-200 hover:text-amber-300 font-medium transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isAr ? 'English' : 'العربية'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
        {/* Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <a href="#" onClick={(e) => { e.preventDefault(); setSelectedCategory('all'); }} className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 via-emerald-800 to-emerald-950 flex items-center justify-center text-amber-300 shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-lg tracking-tighter">SM</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl text-slate-900 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                SOLIMAN <span className="text-emerald-600">- MEGA SYSTEM</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                {isAr ? 'متجر ومركز صيانة أبل المعتمد' : 'Apple Store & Repair Hub'}
              </span>
            </div>
          </a>
        </div>

        {/* Live Search Bar */}
        <div className="relative flex-1 max-w-xl hidden md:block">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              placeholder={isAr ? 'ابحث عن جهاز آيفون، ماك، قطع صيانة، إكسسوارات...' : 'Search iPhones, Macs, screen repairs, accessories...'}
              className="w-full bg-slate-100/80 border border-slate-200 focus:border-emerald-600 focus:bg-white text-slate-900 text-sm rounded-full py-2.5 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-slate-400"
            />
            <Search className={`w-5 h-5 absolute ${isAr ? 'left-3' : 'right-3'} text-slate-400`} />
          </div>

          {/* Autocomplete Search Dropdown */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden z-50">
              <div className="p-2 text-xs font-semibold text-slate-400 bg-slate-50 border-b border-slate-100">
                {isAr ? 'نتائج البحث السريعة' : 'Quick Search Results'}
              </div>
              <div className="divide-y divide-slate-100">
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => onSelectProduct(product)}
                    className="w-full p-2.5 flex items-center gap-3 hover:bg-emerald-50/60 transition-colors text-right"
                  >
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-10 h-10 object-cover rounded-lg border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">
                        {isAr ? product.nameAr : product.name}
                      </p>
                      <p className="text-[11px] text-emerald-700 font-semibold">
                        {currency === 'EGP' ? `${product.priceEgp.toLocaleString()} ج.م` : `$${Math.round(product.priceEgp / 48)}`}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* AI Advisor Button */}
          <button
            onClick={onOpenAiAdvisor}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-bold shadow-sm hover:shadow-emerald-700/20 hover:scale-105 transition-all"
            title={isAr ? 'مستشار أبل والصيانة الذكي' : 'AI Apple Assistant'}
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="hidden sm:inline">{isAr ? 'مستشار آي تك الذكي' : 'AI Advisor'}</span>
          </button>

          {/* Trade-in button */}
          <button
            onClick={onOpenTradeIn}
            className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 px-3 py-2 rounded-full border border-slate-200 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isAr ? 'بدّل جهازك' : 'Trade-In'}</span>
          </button>

          {/* Repair status tracker */}
          <button
            onClick={onOpenRepairTracker}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 px-3 py-2 rounded-full border border-slate-200 transition-colors"
          >
            <Wrench className="w-3.5 h-3.5 text-amber-600" />
            <span>{isAr ? 'تتبع صيانة' : 'Repair Status'}</span>
          </button>

          {/* Wishlist */}
          <div className="relative">
            <button className="p-2 text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-full transition-colors">
              <Heart className="w-5 h-5" />
              {wishlistIds.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-amber-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center">
                  {wishlistIds.length}
                </span>
              )}
            </button>
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-emerald-900 hover:bg-emerald-950 text-white px-3.5 py-2 rounded-full font-bold text-xs shadow-md shadow-emerald-900/15 transition-all hover:scale-105"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              {totalCartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-amber-500 text-emerald-950 font-black text-[10px] rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">{isAr ? 'السلة' : 'Cart'}</span>
          </button>
        </div>
      </div>

      {/* Main Categories Navigation Bar */}
      <nav className="bg-slate-900 text-slate-200 border-t border-slate-800 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-start md:justify-between gap-1 text-xs sm:text-sm font-semibold py-1">
          {navCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`whitespace-nowrap px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-emerald-600 text-white font-bold shadow-sm shadow-emerald-900/50'
                    : 'hover:bg-slate-800 hover:text-amber-300'
                }`}
              >
                {cat.id === 'used' && <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />}
                {cat.id === 'maintenance' && <Wrench className="w-3.5 h-3.5 text-amber-400" />}
                <span>{isAr ? cat.nameAr : cat.nameEn}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[110px] z-50 bg-slate-900/95 text-white p-6 overflow-y-auto backdrop-blur-md">
          <div className="mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث هنا...' : 'Search products...'}
              className="w-full bg-slate-800 text-white rounded-xl py-3 px-4 text-sm border border-slate-700"
            />
          </div>

          <div className="space-y-2 mb-8">
            <p className="text-xs text-slate-400 font-bold uppercase mb-2">الأقسام الرئيسية</p>
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-right py-3 px-4 rounded-xl flex justify-between items-center ${
                  selectedCategory === cat.id ? 'bg-emerald-600 font-bold' : 'bg-slate-800/60'
                }`}
              >
                <span>{isAr ? cat.nameAr : cat.nameEn}</span>
                <ArrowRight className="w-4 h-4 opacity-70" />
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <button
              onClick={() => { onOpenTradeIn(); setMobileMenuOpen(false); }}
              className="w-full bg-emerald-800 hover:bg-emerald-700 py-3 rounded-xl font-bold flex justify-center items-center gap-2"
            >
              <RefreshCw className="w-4 h-4 text-amber-300" />
              <span>{isAr ? 'حاسبة بدل وتثمين جهازك' : 'Trade-in Estimator'}</span>
            </button>
            <button
              onClick={() => { onOpenRepairTracker(); setMobileMenuOpen(false); }}
              className="w-full bg-amber-600 hover:bg-amber-500 text-slate-950 py-3 rounded-xl font-bold flex justify-center items-center gap-2"
            >
              <Wrench className="w-4 h-4" />
              <span>{isAr ? 'حجز وتتبع الصيانة' : 'Book Repair & Track'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
