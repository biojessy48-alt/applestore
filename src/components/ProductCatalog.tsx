import React, { useState, useMemo } from 'react';
import { 
  Filter, Check, Star, Heart, ShoppingBag, Eye, BatteryCharging, 
  ShieldCheck, Zap, ArrowUpDown, ChevronDown, CheckCircle2 
} from 'lucide-react';
import { Product, CategoryId, Language, Currency } from '../types';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: CategoryId;
  setSelectedCategory: (cat: CategoryId) => void;
  language: Language;
  currency: Currency;
  searchQuery: string;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, color: any, storage?: any) => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  setSelectedCategory,
  language,
  currency,
  searchQuery,
  onSelectProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist
}) => {
  const isAr = language === 'ar';

  const [conditionFilter, setConditionFilter] = useState<string>('all');
  const [minBattery, setMinBattery] = useState<number>(0);
  const [selectedStorage, setSelectedStorage] = useState<string>('all');
  const [maxPriceEgp, setMaxPriceEgp] = useState<number>(150000);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'rating'>('newest');

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query) || p.nameAr.includes(query);
        const matchCat = p.category.includes(query);
        if (!matchName && !matchCat) return false;
      }

      // Condition filter
      if (conditionFilter !== 'all') {
        if (conditionFilter === 'New' && p.condition !== 'New') return false;
        if (conditionFilter === 'Used' && p.condition === 'New') return false;
      }

      // Battery Health filter
      if (minBattery > 0) {
        if (!p.batteryHealth || p.batteryHealth < minBattery) return false;
      }

      // Storage filter
      if (selectedStorage !== 'all') {
        const hasStorage = p.storageOptions?.some(s => s.size.includes(selectedStorage));
        if (!hasStorage && !p.name.includes(selectedStorage)) return false;
      }

      // Price filter
      if (p.priceEgp > maxPriceEgp) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceEgp - b.priceEgp;
      if (sortBy === 'price-desc') return b.priceEgp - a.priceEgp;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [products, selectedCategory, searchQuery, conditionFilter, minBattery, selectedStorage, maxPriceEgp, sortBy]);

  const formatPrice = (priceEgp: number) => {
    if (currency === 'USD') {
      return `$${Math.round(priceEgp / 48)}`;
    }
    return isAr ? `${priceEgp.toLocaleString()} ج.م` : `EGP ${priceEgp.toLocaleString()}`;
  };

  const getMonthlyInstallment = (priceEgp: number) => {
    // 12 months estimate with ValU
    const monthly = Math.round(priceEgp / 12);
    if (currency === 'USD') {
      return `$${Math.round(monthly / 48)}/mo`;
    }
    return isAr ? `${monthly.toLocaleString()} ج.م/شهر` : `EGP ${monthly.toLocaleString()}/mo`;
  };

  return (
    <section id="catalog-section" className="py-12 px-4 bg-neutral-900 font-sans min-h-[600px] text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto">
        {/* Top Control Header */}
        <div className="bg-neutral-950 p-4 sm:p-5 rounded-2xl shadow-sm border border-neutral-800 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white text-black font-black rounded-xl border border-neutral-200">
              <Filter className="w-5 h-5 text-black" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">
                {isAr ? 'كتالوج المنتجات والأجهزة المتاحة' : 'Products & Device Catalog'}
              </h3>
              <p className="text-xs text-neutral-400 font-semibold">
                {isAr 
                  ? `تم العثور على ${filteredProducts.length} جهاز متوفر بالشحن الفوري` 
                  : `Found ${filteredProducts.length} devices available`}
              </p>
            </div>
          </div>

          {/* Sorting Dropdown & Quick Filter Tags */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Condition Toggle */}
            <div className="flex items-center bg-black p-1 rounded-xl text-xs font-bold text-neutral-300 border border-neutral-800">
              <button
                onClick={() => setConditionFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${conditionFilter === 'all' ? 'bg-white text-black font-black' : 'hover:text-white'}`}
              >
                {isAr ? 'الكل' : 'All'}
              </button>
              <button
                onClick={() => setConditionFilter('New')}
                className={`px-3 py-1.5 rounded-lg transition-all ${conditionFilter === 'New' ? 'bg-white text-black font-black' : 'hover:text-white'}`}
              >
                {isAr ? 'جديد أصلية' : 'Brand New'}
              </button>
              <button
                onClick={() => setConditionFilter('Used')}
                className={`px-3 py-1.5 rounded-lg transition-all ${conditionFilter === 'Used' ? 'bg-white text-black font-black' : 'hover:text-white'}`}
              >
                {isAr ? 'مستعمل كأنه جديد 99%' : 'Pre-Owned 99%'}
              </button>
            </div>

            {/* Sorting Select */}
            <div className="flex items-center gap-1.5 text-xs text-neutral-300 bg-black px-3 py-1.5 rounded-xl border border-neutral-800 font-semibold">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
              <span>{isAr ? 'ترتيب:' : 'Sort:'}</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent font-black text-white focus:outline-none cursor-pointer"
              >
                <option value="newest" className="bg-neutral-900 text-white">{isAr ? 'الأحدث أولاً' : 'Newest'}</option>
                <option value="price-asc" className="bg-neutral-900 text-white">{isAr ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
                <option value="price-desc" className="bg-neutral-900 text-white">{isAr ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
                <option value="rating" className="bg-neutral-900 text-white">{isAr ? 'الأعلى تقييماً' : 'Highest Rated'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Bar + Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar Filters */}
          <div className="lg:col-span-3 space-y-5">
            <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 shadow-sm space-y-6">
              <h4 className="font-extrabold text-white text-sm pb-2 border-b border-neutral-800 flex items-center justify-between">
                <span>{isAr ? 'تصفية وتقييم خياراتك' : 'Filter Options'}</span>
                <button 
                  onClick={() => {
                    setConditionFilter('all');
                    setMinBattery(0);
                    setSelectedStorage('all');
                    setMaxPriceEgp(150000);
                  }}
                  className="text-[11px] text-neutral-400 hover:text-white underline font-bold"
                >
                  {isAr ? 'إعادة ضبط' : 'Reset'}
                </button>
              </h4>

              {/* Price Range Slider */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-300 flex justify-between">
                  <span>{isAr ? 'الحد الأقصى للسعر:' : 'Max Price:'}</span>
                  <span className="text-white font-black">{formatPrice(maxPriceEgp)}</span>
                </label>
                <input
                  type="range"
                  min={2000}
                  max={150000}
                  step={2000}
                  value={maxPriceEgp}
                  onChange={(e) => setMaxPriceEgp(Number(e.target.value))}
                  className="w-full accent-white h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Storage Capacity Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-300">{isAr ? 'سعة التخزين:' : 'Storage Capacity:'}</label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['all', '128GB', '256GB', '512GB', '1TB'].map((cap) => (
                    <button
                      key={cap}
                      onClick={() => setSelectedStorage(cap)}
                      className={`py-1.5 px-2 rounded-lg font-bold border text-center transition-colors ${
                        selectedStorage === cap
                          ? 'bg-white text-black font-black border-white'
                          : 'bg-black border-neutral-800 text-neutral-300 hover:bg-neutral-800'
                      }`}
                    >
                      {cap === 'all' ? (isAr ? 'الكل' : 'All') : cap}
                    </button>
                  ))}
                </div>
              </div>

              {/* Battery Health Filter for Pre-owned devices */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-300 flex items-center gap-1">
                  <BatteryCharging className="w-3.5 h-3.5 text-white" />
                  <span>{isAr ? 'أدنى نسبة بطارية أصلية (للمستعمل):' : 'Min Battery Health:'}</span>
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                  {[0, 90, 95].map((bat) => (
                    <button
                      key={bat}
                      onClick={() => setMinBattery(bat)}
                      className={`py-1.5 rounded-lg border text-center transition-colors ${
                        minBattery === bat
                          ? 'bg-white text-black font-black border-white'
                          : 'bg-black border-neutral-800 text-neutral-300 hover:bg-neutral-800'
                      }`}
                    >
                      {bat === 0 ? (isAr ? 'أي نسبة' : 'Any') : `${bat}%+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ValU Installment Promo Banner */}
            <div className="bg-black p-5 rounded-2xl text-white border border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-white font-extrabold text-xs">
                <Zap className="w-4 h-4 text-white" />
                <span>{isAr ? 'برنامج التقسيط الفوري ValU' : 'ValU Installment'}</span>
              </div>
              <h5 className="font-black text-sm text-white">
                {isAr ? 'اشتري آيفونك الحين وقسّط على 12-36 شهر بدون مقدم' : 'Buy now & pay up to 36 months'}
              </h5>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {isAr ? 'تقسيط معتمد من ValU وسهولة وبنوك مصر (الأهلي، مصر، CIB)' : 'Approved with ValU, Souhoola, Sympl, CIB & NBE'}
              </p>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-neutral-950 rounded-2xl p-12 text-center border border-neutral-800 space-y-4">
                <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mx-auto text-neutral-500">
                  <Filter className="w-8 h-8" />
                </div>
                <h4 className="font-extrabold text-white text-lg">
                  {isAr ? 'لم نجد أجهزة تطابق الفلاتر المختارة' : 'No matching products found'}
                </h4>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  {isAr ? 'جرب تغيير خيارات التصفية أو إلغاء تحديد نطاق السعر والبطارية' : 'Try adjusting your filters or search query'}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setConditionFilter('all');
                    setMinBattery(0);
                    setSelectedStorage('all');
                    setMaxPriceEgp(150000);
                  }}
                  className="bg-white text-black text-xs font-black px-6 py-2.5 rounded-full hover:bg-neutral-200 transition-colors"
                >
                  {isAr ? 'إظهار كافة المنتجات' : 'Show All Products'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlistIds.includes(product.id);
                  const activeColor = product.colors[0];

                  return (
                    <div
                      key={product.id}
                      className="bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden hover:shadow-2xl hover:border-neutral-500 transition-all duration-300 flex flex-col justify-between group"
                    >
                      {/* Product Header / Badges */}
                      <div className="relative aspect-[4/3] bg-black overflow-hidden flex items-center justify-center p-4">
                        <img
                          src={product.images[0]}
                          alt={isAr ? product.nameAr : product.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />

                        {/* Condition & Battery Badges */}
                        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end z-10">
                          {product.condition === 'New' ? (
                            <span className="bg-white text-black text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm border border-neutral-200">
                              {isAr ? 'جديد بتغليف أبل' : 'Brand New'}
                            </span>
                          ) : (
                            <span className="bg-neutral-800 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm border border-neutral-700">
                              {isAr ? 'مستعمل كأنه جديد 99%' : 'Pre-Owned 99%'}
                            </span>
                          )}

                          {product.batteryHealth && (
                            <span className="bg-black/90 backdrop-blur-md text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 border border-neutral-700">
                              <BatteryCharging className="w-3 h-3 text-white" />
                              <span>{product.batteryHealth}% {isAr ? 'بطارية أصلية' : 'Battery'}</span>
                            </span>
                          )}
                        </div>

                        {/* Wishlist Button */}
                        <button
                          onClick={() => onToggleWishlist(product.id)}
                          className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-md transition-colors z-10 ${
                            isWishlisted 
                              ? 'bg-rose-600 text-white' 
                              : 'bg-black/70 hover:bg-black text-neutral-300'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                        </button>

                        {/* Quick View Hover Button */}
                        <button
                          onClick={() => onSelectProduct(product)}
                          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-white text-black text-xs font-black px-4 py-2 rounded-full backdrop-blur-md shadow-lg transition-all flex items-center gap-1.5 border border-neutral-200"
                        >
                          <Eye className="w-3.5 h-3.5 text-black" />
                          <span>{isAr ? 'تفاصيل ومعاينة' : 'Quick Details'}</span>
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Rating & Category Tag */}
                          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                            <span className="font-semibold text-neutral-300 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                              {product.subcategory || product.category}
                            </span>
                            <div className="flex items-center gap-1 text-white font-bold">
                              <Star className="w-3.5 h-3.5 fill-current text-white" />
                              <span>{product.rating}</span>
                              <span className="text-neutral-500 font-normal">({product.reviewsCount})</span>
                            </div>
                          </div>

                          <h3 
                            onClick={() => onSelectProduct(product)}
                            className="font-bold text-white text-sm sm:text-base hover:text-neutral-300 transition-colors line-clamp-2 cursor-pointer leading-snug"
                          >
                            {isAr ? product.nameAr : product.name}
                          </h3>

                          {/* Color Swatch Dots */}
                          <div className="flex items-center gap-1.5 mt-2">
                            <span className="text-[11px] text-neutral-400 font-medium">{isAr ? 'الألوان:' : 'Colors:'}</span>
                            <div className="flex items-center gap-1">
                              {product.colors.map((col, idx) => (
                                <span
                                  key={idx}
                                  className="w-3.5 h-3.5 rounded-full border border-neutral-700 shadow-xs"
                                  style={{ backgroundColor: col.hex }}
                                  title={isAr ? col.nameAr : col.name}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Price & Installment */}
                        <div className="pt-2 border-t border-neutral-800 space-y-1">
                          <div className="flex items-baseline justify-between">
                            <span className="text-lg font-black text-white">
                              {formatPrice(product.priceEgp)}
                            </span>
                            {product.originalPriceEgp && (
                              <span className="text-xs text-neutral-500 line-through">
                                {formatPrice(product.originalPriceEgp)}
                              </span>
                            )}
                          </div>

                          {/* Monthly Installment Pill */}
                          <div className="text-[11px] text-neutral-300 bg-neutral-900 p-1.5 rounded-lg flex items-center justify-between font-semibold border border-neutral-800">
                            <span className="text-neutral-400">{isAr ? 'تقسيط تبدأ من:' : 'Installment:'}</span>
                            <span className="text-white font-black">{getMonthlyInstallment(product.priceEgp)}</span>
                          </div>

                          {/* Add to Cart Button */}
                          <button
                            onClick={() => onAddToCart(product, activeColor, product.storageOptions?.[0])}
                            className="w-full mt-2 bg-white hover:bg-neutral-200 text-black font-black text-xs py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 border border-neutral-300"
                          >
                            <ShoppingBag className="w-4 h-4 text-black" />
                            <span>{isAr ? 'أضف للسلة' : 'Add to Cart'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
