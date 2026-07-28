import React, { useState } from 'react';
import { 
  RefreshCw, CheckCircle2, Send, Phone, User, Check, Sparkles 
} from 'lucide-react';
import { Language, Currency, TradeInModel, TradeInRequest } from '../types';

interface TradeInCalculatorProps {
  language: Language;
  currency: Currency;
  tradeInModels: TradeInModel[];
  onSubmitTradeInRequest?: (req: TradeInRequest) => void;
  onOpenCatalog: () => void;
}

export const TradeInCalculator: React.FC<TradeInCalculatorProps> = ({
  language,
  currency,
  tradeInModels,
  onSubmitTradeInRequest,
  onOpenCatalog
}) => {
  const isAr = language === 'ar';

  const defaultModelId = tradeInModels[0]?.id || 'iphone-15-pro-max';
  const [selectedModelId, setSelectedModelId] = useState(defaultModelId);
  const [selectedStorage, setSelectedStorage] = useState('256GB');
  const [conditionGrade, setConditionGrade] = useState<'clean' | 'good' | 'fair'>('clean');
  const [batteryHealth, setBatteryHealth] = useState<number>(88);
  const [faceIdWorking, setFaceIdWorking] = useState(true);
  const [screenOriginal, setScreenOriginal] = useState(true);
  const [hasBox, setHasBox] = useState(true);

  // Form Booking Modal/State
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Find model base value
  const selectedModelObj = tradeInModels.find(m => m.id === selectedModelId) || tradeInModels[0];

  const calculateEstimateEgp = () => {
    let base = selectedModelObj ? selectedModelObj.baseValueEgp : 35000;

    // Storage modifier
    if (selectedStorage === '256GB') base += 2500;
    if (selectedStorage === '512GB') base += 5500;
    if (selectedStorage === '1TB') base += 9000;

    // Condition modifier
    if (conditionGrade === 'good') base *= 0.88;
    if (conditionGrade === 'fair') base *= 0.75;

    // Battery health modifier
    if (batteryHealth < 80) base -= 2000;

    // Features penalties
    if (!faceIdWorking) base -= 3500;
    if (!screenOriginal) base -= 4000;
    if (hasBox) base += 1000;

    return Math.max(2000, Math.round(base));
  };

  const estimatedValEgp = calculateEstimateEgp();

  const formatPrice = (egp: number) => {
    return currency === 'USD' ? `$${Math.round(egp / 48)}` : (isAr ? `${egp.toLocaleString()} ج.م` : `EGP ${egp.toLocaleString()}`);
  };

  const handleBookTradeIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || !custPhone) return;

    const request: TradeInRequest = {
      id: `trd-${Date.now()}`,
      customerName: custName,
      customerPhone: custPhone,
      deviceModel: selectedModelObj ? selectedModelObj.nameAr : 'آيفون',
      storage: selectedStorage,
      conditionGrade: conditionGrade === 'clean' ? 'كالجديد 99%' : conditionGrade === 'good' ? 'جيد جداً' : 'متوسط',
      batteryHealth,
      estimatedValueEgp: estimatedValEgp,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'New'
    };

    if (onSubmitTradeInRequest) {
      onSubmitTradeInRequest(request);
    }

    setSubmitted(true);
  };

  return (
    <div id="trade-in-section" className="py-12 px-4 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white font-sans border-b border-emerald-900/30">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-black text-amber-300 bg-emerald-900/90 px-4 py-1.5 rounded-full border border-amber-500/30">
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAr ? 'حاسبة بدل وتثمين جهازك القديم' : 'Instant Trade-In Calculator'}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            {isAr ? 'بدّل جهازك المستعمل وأحضر الجديد اليوم بأعلى تقييم سوقي' : 'Trade-In Your Device at Top Market Value'}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            {isAr 
              ? 'قيم جهازك القديم الآن واحصل على كاش فوري أو بدله بأحدث آيفون مع دفع الفارق بسهولة' 
              : 'Evaluate your device now & get direct cash payout or trade towards a new iPhone'}
          </p>
        </div>

        {/* Interactive Estimator Form */}
        <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-2xl backdrop-blur-md grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Controls Form */}
          <div className="md:col-span-7 space-y-5 text-right">
            {/* Model Selector */}
            <div>
              <label className="text-xs font-extrabold text-amber-300 block mb-1.5">
                {isAr ? '1. اختر موديل جهازك الحالي:' : '1. Select Current Model:'}
              </label>
              <select
                value={selectedModelId}
                onChange={(e) => setSelectedModelId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 focus:border-amber-400 text-white text-xs font-bold rounded-xl p-3 focus:outline-none"
              >
                {tradeInModels.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nameAr} ({m.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Storage Size */}
            <div>
              <label className="text-xs font-extrabold text-amber-300 block mb-1.5">
                {isAr ? '2. المساحة التخزينية:' : '2. Storage Capacity:'}
              </label>
              <div className="grid grid-cols-4 gap-2 text-xs font-bold">
                {['128GB', '256GB', '512GB', '1TB'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStorage(st)}
                    className={`py-2 rounded-xl border transition-all ${
                      selectedStorage === st 
                        ? 'bg-emerald-600 text-white border-amber-300 shadow-md font-black' 
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Physical Condition Grade */}
            <div>
              <label className="text-xs font-extrabold text-amber-300 block mb-1.5">
                {isAr ? '3. حالة الهيكل والشاشة الخارجي:' : '3. Physical Condition Grade:'}
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                {[
                  { id: 'clean', labelAr: 'كالجديد 99%' },
                  { id: 'good', labelAr: 'جيد جداً' },
                  { id: 'fair', labelAr: 'خدوش ظاهرة' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setConditionGrade(c.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      conditionGrade === c.id 
                        ? 'bg-emerald-600 text-white border-amber-300 shadow-md font-black' 
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {c.labelAr}
                  </button>
                ))}
              </div>
            </div>

            {/* Battery Health Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-extrabold mb-1">
                <span className="text-amber-300">{isAr ? '4. نسبة صحة البطارية الأصلية:' : '4. Battery Health %:'}</span>
                <span className="text-emerald-400 font-mono text-sm">{batteryHealth}%</span>
              </div>
              <input
                type="range"
                min={70}
                max={100}
                value={batteryHealth}
                onChange={(e) => setBatteryHealth(Number(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Functional Checks */}
            <div className="space-y-2 pt-1 border-t border-slate-800">
              <p className="text-xs font-extrabold text-amber-300">{isAr ? '5. الملحقات والمواصفات المرفقة:' : '5. Verification Checklist:'}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-bold text-slate-300">
                <label className="flex items-center gap-2 bg-slate-800 p-2.5 rounded-xl border border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={faceIdWorking}
                    onChange={(e) => setFaceIdWorking(e.target.checked)}
                    className="accent-emerald-500 w-4 h-4 rounded"
                  />
                  <span>{isAr ? 'بصمة الوجه تعمل' : 'Face ID Works'}</span>
                </label>

                <label className="flex items-center gap-2 bg-slate-800 p-2.5 rounded-xl border border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={screenOriginal}
                    onChange={(e) => setScreenOriginal(e.target.checked)}
                    className="accent-emerald-500 w-4 h-4 rounded"
                  />
                  <span>{isAr ? 'الشاشة أصلية' : 'Original Screen'}</span>
                </label>

                <label className="flex items-center gap-2 bg-slate-800 p-2.5 rounded-xl border border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasBox}
                    onChange={(e) => setHasBox(e.target.checked)}
                    className="accent-emerald-500 w-4 h-4 rounded"
                  />
                  <span>{isAr ? 'العلبة الأصلية' : 'Original Box'}</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Estimated Result Payout Card */}
          <div className="md:col-span-5 bg-gradient-to-br from-slate-950 to-emerald-950 p-6 rounded-2xl border border-emerald-500/40 flex flex-col justify-between text-center space-y-6">
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                {isAr ? 'القيمة التقديرية المضمونة' : 'Guaranteed Valuation'}
              </span>

              <p className="text-xs text-slate-400">
                {isAr ? 'قيمة الاستبدال الفوري لجهازك هي:' : 'Estimated Trade-In Value:'}
              </p>

              <div className="py-3 bg-slate-900/90 rounded-2xl border border-amber-400/40 shadow-inner">
                <span className="text-3xl sm:text-4xl font-black text-amber-300 tracking-tight">
                  {formatPrice(estimatedValEgp)}
                </span>
              </div>

              <div className="text-xs text-slate-300 space-y-1.5 pt-2 text-right">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{isAr ? 'استلام المبلغ كاش فوراً بالفرع' : 'Instant Cash Payout'}</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{isAr ? 'أو خصمه مباشرة من سعر جهازك الجديد' : 'Direct Upgrade Discount'}</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{isAr ? 'فحص كامل مجاني في أقل من 10 دقائق' : 'Free 10-min Tech Inspection'}</span>
                </p>
              </div>
            </div>

            {/* Booking Form */}
            {!submitted ? (
              <form onSubmit={handleBookTradeIn} className="space-y-2 text-right">
                <div className="space-y-1.5">
                  <input
                    type="text"
                    required
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    placeholder={isAr ? 'الاسم بالكامل' : 'Full Name'}
                    className="w-full bg-slate-900 border border-slate-700 text-white text-xs p-2.5 rounded-xl focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="tel"
                    required
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    placeholder={isAr ? 'رقم المحمول للتواصل' : 'Mobile Number'}
                    className="w-full bg-slate-900 border border-slate-700 text-white text-xs p-2.5 rounded-xl focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isAr ? 'تأكيد وحجز موعد البدل بالفرع' : 'Book Branch Trade-In Slot'}</span>
                </button>
              </form>
            ) : (
              <div className="p-4 bg-emerald-900/90 text-amber-200 text-xs font-bold rounded-2xl border border-emerald-500 space-y-1.5 text-center">
                <Check className="w-6 h-6 text-amber-300 mx-auto" />
                <p className="font-extrabold text-white text-sm">{isAr ? 'تم تسجيل طلب التبديل بنجاح!' : 'Trade-In Request Received!'}</p>
                <p className="text-[11px] text-emerald-200">
                  {isAr ? 'سيقوم مسؤول بدل الأجهزة بالاتصال بك فوراً لتحديد أقرب فرع واستلام كاش.' : 'Our team will contact you shortly.'}
                </p>
              </div>
            )}

            <button
              onClick={onOpenCatalog}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2.5 rounded-xl border border-slate-700 transition-colors"
            >
              {isAr ? 'تصفح الأجهزة الجديدة المتاحة للبدل' : 'Browse New Devices to Upgrade'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
