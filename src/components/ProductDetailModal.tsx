import React, { useState } from 'react';
import { 
  X, Star, ShieldCheck, BatteryCharging, ShoppingBag, Truck, 
  RefreshCw, Check, Sparkles, CreditCard, ChevronLeft, Box 
} from 'lucide-react';
import { Product, ProductColor, StorageOption, Language, Currency } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  language: Language;
  currency: Currency;
  onAddToCart: (product: Product, selectedColor: ProductColor, selectedStorage?: StorageOption) => void;
  onOpenTradeIn: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  language,
  currency,
  onAddToCart,
  onOpenTradeIn
}) => {
  if (!product) return null;

  const isAr = language === 'ar';

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | undefined>(
    product.storageOptions?.[0]
  );
  const [activeTab, setActiveTab] = useState<'specs' | 'installments' | 'warranty'>('specs');

  // Calculated price with storage modifier
  const finalPriceEgp = product.priceEgp + (selectedStorage?.priceModifierEgp || 0);

  const formatPrice = (priceEgp: number) => {
    return currency === 'USD' ? `$${Math.round(priceEgp / 48)}` : (isAr ? `${priceEgp.toLocaleString()} ج.م` : `EGP ${priceEgp.toLocaleString()}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 font-sans relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 p-6 sm:p-8 gap-8">
          {/* Left Column: Product Images Gallery */}
          <div className="md:col-span-5 space-y-4">
            <div className="aspect-square bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden p-6 flex items-center justify-center relative">
              <img
                src={selectedColor.image || product.images[0]}
                alt={isAr ? product.nameAr : product.name}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />

              {product.batteryHealth && (
                <div className="absolute top-3 right-3 bg-slate-900 text-emerald-400 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 border border-emerald-500/40">
                  <BatteryCharging className="w-4 h-4 text-emerald-400" />
                  <span>{product.batteryHealth}% {isAr ? 'بطارية أصلية' : 'Battery'}</span>
                </div>
              )}
            </div>

            {/* Color Swatches Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                {isAr ? `اللون المحدد: ${selectedColor.nameAr}` : `Selected Color: ${selectedColor.name}`}
              </label>
              <div className="flex items-center gap-2">
                {product.colors.map((col, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(col)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedColor.name === col.name ? 'border-emerald-600 scale-110 shadow-md' : 'border-slate-300'
                    }`}
                    style={{ backgroundColor: col.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Warranty & Box Badges */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{isAr ? product.warrantyAr : product.warranty}</span>
              </div>
              {product.boxIncluded && (
                <div className="flex items-center gap-2 text-slate-600 font-medium">
                  <Box className="w-4 h-4 text-amber-600" />
                  <span>{isAr ? 'يتضمن العلبة الأصلية والشاحن الأصلي' : 'Original Box Included'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Product Specs & Purchase Options */}
          <div className="md:col-span-7 space-y-6 text-right">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span className="font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                  {product.condition === 'New' ? (isAr ? 'جديد أصلية' : 'New') : (isAr ? 'مستعمل كأنه جديد 99%' : 'Pre-Owned')}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{product.rating}</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {isAr ? product.nameAr : product.name}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {isAr ? product.descriptionAr : product.description}
              </p>
            </div>

            {/* Storage Options Selection */}
            {product.storageOptions && (
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-800 block">
                  {isAr ? 'اختر مساحة التخزين:' : 'Select Storage Option:'}
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  {product.storageOptions.map((st) => (
                    <button
                      key={st.size}
                      onClick={() => setSelectedStorage(st)}
                      className={`p-3 rounded-xl border transition-all text-center ${
                        selectedStorage?.size === st.size 
                          ? 'bg-emerald-950 text-amber-300 border-emerald-950 font-black shadow-md' 
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{st.size}</span>
                      {st.priceModifierEgp > 0 && (
                        <span className="block text-[10px] font-normal text-emerald-400 mt-0.5">
                          +{formatPrice(st.priceModifierEgp)}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price Box */}
            <div className="bg-emerald-950 p-4 rounded-2xl text-white flex items-center justify-between">
              <div>
                <p className="text-[11px] text-emerald-300 font-medium">{isAr ? 'الإجمالي النهائـي:' : 'Total Price:'}</p>
                <p className="text-2xl font-black text-amber-300 tracking-tight">
                  {formatPrice(finalPriceEgp)}
                </p>
              </div>

              <div className="text-left text-xs text-slate-300">
                <p className="font-bold text-emerald-400">{isAr ? 'متوفر بالشحن الفوري' : 'In Stock'}</p>
                <p className="text-[10px]">{isAr ? 'أو التقسيط مع ValU' : 'Or ValU Installment'}</p>
              </div>
            </div>

            {/* Detail Tabs */}
            <div className="border-t border-slate-200 pt-4 space-y-3">
              <div className="flex gap-4 border-b border-slate-200 text-xs font-extrabold pb-2">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 border-b-2 transition-all ${activeTab === 'specs' ? 'border-emerald-700 text-emerald-900' : 'border-transparent text-slate-400'}`}
                >
                  {isAr ? 'المواصفات الفنية' : 'Tech Specs'}
                </button>
                <button
                  onClick={() => setActiveTab('installments')}
                  className={`pb-2 border-b-2 transition-all ${activeTab === 'installments' ? 'border-emerald-700 text-emerald-900' : 'border-transparent text-slate-400'}`}
                >
                  {isAr ? 'حاسبة خطط التقسيط' : 'Installments'}
                </button>
              </div>

              {activeTab === 'specs' && (
                <div className="space-y-1.5 text-xs">
                  {Object.entries(isAr ? product.specsAr : product.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between py-1 border-b border-slate-100">
                      <span className="font-bold text-slate-600">{key}</span>
                      <span className="text-slate-900 font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'installments' && (
                <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center">
                    <p className="font-bold text-slate-800">12 شهر مع ValU</p>
                    <p className="text-emerald-800 font-extrabold mt-1">{formatPrice(Math.round(finalPriceEgp / 12))}/شهر</p>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center">
                    <p className="font-bold text-slate-800">18 شهر بنك مصر</p>
                    <p className="text-emerald-800 font-extrabold mt-1">{formatPrice(Math.round(finalPriceEgp / 18))}/شهر</p>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center">
                    <p className="font-bold text-slate-800">24 شهر الأهلي</p>
                    <p className="text-emerald-800 font-extrabold mt-1">{formatPrice(Math.round(finalPriceEgp / 24))}/شهر</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  onAddToCart(product, selectedColor, selectedStorage);
                  onClose();
                }}
                className="flex-1 bg-gradient-to-r from-emerald-700 to-emerald-900 hover:from-emerald-600 hover:to-emerald-800 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5 text-amber-300" />
                <span>{isAr ? 'إضافة للسلّة والشراء' : 'Add to Cart & Checkout'}</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenTradeIn();
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-3.5 rounded-2xl border border-slate-300 flex items-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4 text-emerald-700" />
                <span>{isAr ? 'بدّل جهازك القديم' : 'Trade-In'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
