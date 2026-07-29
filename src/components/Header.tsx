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
    <header className="sticky top-0 z-40 bg-neutral-950/95 backdrop-blur-md shadow-md border-b border-neutral-800 font-sans text-neutral-100">
      {/* Top Announcement Bar */}
      <div className="bg-black text-neutral-300 text-xs py-2 px-4 border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap scrollbar-none">
            <span className="flex items-center gap-1.5 text-black font-black bg-white px-2.5 py-0.5 rounded-full text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              {isAr ? 'عرض اليوم المميز' : 'Exclusive Deal'}
            </span>
            <span className="text-neutral-300 font-medium">
              {announcementText || (isAr 
                ? '🚚 شحن آمن وسريع لجميع المحافظات مع ضمان استبدال 14 يومًا' 
                : '🚚 Fast safe nationwide delivery with 14-day warranty')}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs">
            {/* Social Media Links */}
            <SocialIcons socialLinks={socialLinks} size="sm" variant="header" />

            {/* Currency Selector */}
            <div className="flex items-center gap-1 text-neutral-400 border-r border-neutral-800 pr-3 mr-1">
              <button 
                onClick={() => setCurrency('EGP')} 
                className={`px-1.5 py-0.5 rounded transition-colors ${currency === 'EGP' ? 'bg-white text-black font-extrabold' : 'hover:text-white'}`}
              >
                ج.م EGP
              </button>
              <span>/</span>
              <button 
                onClick={() => setCurrency('USD')} 
                className={`px-1.5 py-0.5 rounded transition-colors ${currency === 'USD' ? 'bg-white text-black font-extrabold' : 'hover:text-white'}`}
              >
                $ USD
              </button>
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(isAr ? 'en' : 'ar')}
              className="flex items-center gap-1 text-neutral-300 hover:text-white font-medium transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-neutral-400" />
              <span>{isAr ? 'English' : 'العربية'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-300 hover:bg-neutral-800 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <a href="#" onClick={(e) => { e.preventDefault(); setSelectedCategory('all'); }} className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-white text-black font-black flex items-center justify-center shadow-md group-hover:scale-105 transition-transform border border-neutral-200">
              <span className="font-black text-lg tracking-tighter">SM</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl text-white tracking-tight leading-none group-hover:text-neutral-300 transition-colors">
                SOLIMAN <span className="text-neutral-400">- MEGA SYSTEM</span>
              </span>
              <span className="text-[10px] text-neutral-400 font-medium tracking-wide">
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
              className="w-full bg-neutral-900 border border-neutral-700 focus:border-white focus:bg-black text-white text-sm rounded-full py-2.5 px-4 pr-10 focus:outline-none focus:ring-1 focus:ring-white transition-all placeholder:text-neutral-500"
            />
            <Search className={`w-5 h-5 absolute ${isAr ? 'left-3' : 'right-3'} text-neutral-400`} />
          </div>

          {/* Autocomplete Search Dropdown */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-700 overflow-hidden z-50">
              <div className="p-2 text-xs font-semibold text-neutral-400 bg-black border-b border-neutral-800">
                {isAr ? 'نتائج البحث السريعة' : 'Quick Search Results'}
              </div>
              <div className="divide-y divide-neutral-800">
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => onSelectProduct(product)}
                    className="w-full p-2.5 flex items-center gap-3 hover:bg-neutral-800 transition-colors text-right"
                  >
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-10 h-10 object-cover rounded-lg border border-neutral-700 bg-black"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">
                        {isAr ? product.nameAr : product.name}
                      </p>
                      <p className="text-[11px] text-neutral-300 font-bold">
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white text-xs font-bold shadow-sm hover:scale-105 transition-all"
            title={isAr ? 'مستشار أبل والصيانة الذكي' : 'AI Apple Assistant'}
          >
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
            <span className="hidden sm:inline">{isAr ? 'المستشار الذكي' : 'AI Advisor'}</span>
          </button>

          {/* Trade-in button */}
          <button
            onClick={onOpenTradeIn}
            className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-neutral-200 hover:text-white bg-neutral-900 hover:bg-neutral-800 px-3 py-2 rounded-full border border-neutral-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-neutral-300" />
            <span>{isAr ? 'بدّل جهازك' : 'Trade-In'}</span>
          </button>

          {/* Repair status tracker */}
          <button
            onClick={onOpenRepairTracker}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-neutral-200 hover:text-white bg-neutral-900 hover:bg-neutral-800 px-3 py-2 rounded-full border border-neutral-700 transition-colors"
          >
            <Wrench className="w-3.5 h-3.5 text-neutral-300" />
            <span>{isAr ? 'تتبع صيانة' : 'Repair Status'}</span>
          </button>

          {/* Wishlist */}
          <div className="relative">
            <button className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-full transition-colors">
              <Heart className="w-5 h-5" />
              {wishlistIds.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-white text-black font-black text-[10px] rounded-full flex items-center justify-center">
                  {wishlistIds.length}
                </span>
              )}
            </button>
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-white hover:bg-neutral-200 text-black px-3.5 py-2 rounded-full font-black text-xs shadow-md transition-all hover:scale-105 border border-neutral-300"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-black" />
              {totalCartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-black text-white font-black text-[10px] rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">{isAr ? 'السلة' : 'Cart'}</span>
          </button>
        </div>
      </div>

      {/* Main Categories Navigation Bar */}
      <nav className="bg-black text-neutral-300 border-t border-neutral-900 overflow-x-auto scrollbar-none">
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
                    ? 'bg-white text-black font-black shadow-sm'
                    : 'hover:bg-neutral-900 hover:text-white'
                }`}
              >
                {cat.id === 'used' && <span className="w-2 h-2 rounded-full bg-white animate-ping" />}
                {cat.id === 'maintenance' && <Wrench className="w-3.5 h-3.5 text-neutral-400" />}
                <span>{isAr ? cat.nameAr : cat.nameEn}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[110px] z-50 bg-black/95 text-white p-6 overflow-y-auto backdrop-blur-md">
          <div className="mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث هنا...' : 'Search products...'}
              className="w-full bg-neutral-900 text-white rounded-xl py-3 px-4 text-sm border border-neutral-700"
            />
          </div>

          <div className="space-y-2 mb-8">
            <p className="text-xs text-neutral-400 font-bold uppercase mb-2">الأقسام الرئيسية</p>
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-right py-3 px-4 rounded-xl flex justify-between items-center ${
                  selectedCategory === cat.id ? 'bg-white text-black font-black' : 'bg-neutral-900/80 text-white'
                }`}
              >
                <span>{isAr ? cat.nameAr : cat.nameEn}</span>
                <ArrowRight className="w-4 h-4 opacity-70" />
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-800 space-y-3">
            <button
              onClick={() => { onOpenTradeIn(); setMobileMenuOpen(false); }}
              className="w-full bg-neutral-800 hover:bg-neutral-700 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 border border-neutral-700"
            >
              <RefreshCw className="w-4 h-4 text-white" />
              <span>{isAr ? 'حاسبة بدل وتثمين جهازك' : 'Trade-in Estimator'}</span>
            </button>
            <button
              onClick={() => { onOpenRepairTracker(); setMobileMenuOpen(false); }}
              className="w-full bg-white hover:bg-neutral-200 text-black py-3 rounded-xl font-black flex justify-center items-center gap-2"
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
