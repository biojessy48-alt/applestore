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
    <div id="trade-in-section" className="py-12 px-4 bg-black text-white font-sans border-b border-neutral-800">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-black text-black bg-white px-4 py-1.5 rounded-full shadow-md">
            <RefreshCw className="w-3.5 h-3.5 text-black" />
            <span>{isAr ? 'حاسبة بدل وتثمين جهازك القديم' : 'Instant Trade-In Calculator'}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            {isAr ? 'بدّل جهازك المستعمل وأحضر الجديد اليوم بأعلى تقييم سوقي' : 'Trade-In Your Device at Top Market Value'}
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm">
            {isAr 
              ? 'قيم جهازك القديم الآن واحصل على كاش فوري أو بدله بأحدث آيفون مع دفع الفارق بسهولة' 
              : 'Evaluate your device now & get direct cash payout or trade towards a new iPhone'}
          </p>
        </div>

        {/* Interactive Estimator Form */}
        <div className="bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-neutral-800 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Controls Form */}
          <div className="md:col-span-7 space-y-5 text-right">
            {/* Model Selector */}
            <div>
              <label className="text-xs font-extrabold text-white block mb-1.5">
                {isAr ? '1. اختر موديل جهازك الحالي:' : '1. Select Current Model:'}
              </label>
              <select
                value={selectedModelId}
                onChange={(e) => setSelectedModelId(e.target.value)}
                className="w-full bg-black border border-neutral-800 focus:border-white text-white text-xs font-bold rounded-xl p-3 focus:outline-none"
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
              <label className="text-xs font-extrabold text-white block mb-1.5">
                {isAr ? '2. المساحة التخزينية:' : '2. Storage Capacity:'}
              </label>
              <div className="grid grid-cols-4 gap-2 text-xs font-bold">
                {['128GB', '256GB', '512GB', '1TB'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStorage(st)}
                    className={`py-2 rounded-xl border transition-all ${
                      selectedStorage === st 
                        ? 'bg-white text-black border-white shadow-md font-black' 
                        : 'bg-black border-neutral-800 text-neutral-300 hover:bg-neutral-800'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Physical Condition Grade */}
            <div>
              <label className="text-xs font-extrabold text-white block mb-1.5">
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
                        ? 'bg-white text-black border-white shadow-md font-black' 
                        : 'bg-black border-neutral-800 text-neutral-300 hover:bg-neutral-800'
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
                <span className="text-white">{isAr ? '4. نسبة صحة البطارية الأصلية:' : '4. Battery Health %:'}</span>
                <span className="text-white font-mono text-sm">{batteryHealth}%</span>
              </div>
              <input
                type="range"
                min={70}
                max={100}
                value={batteryHealth}
                onChange={(e) => setBatteryHealth(Number(e.target.value))}
                className="w-full accent-white h-2 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Functional Checks */}
            <div className="space-y-2 pt-1 border-t border-neutral-800">
              <p className="text-xs font-extrabold text-white">{isAr ? '5. الملحقات والمواصفات المرفقة:' : '5. Verification Checklist:'}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-bold text-neutral-300">
                <label className="flex items-center gap-2 bg-black p-2.5 rounded-xl border border-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={faceIdWorking}
                    onChange={(e) => setFaceIdWorking(e.target.checked)}
                    className="accent-white w-4 h-4 rounded"
                  />
                  <span>{isAr ? 'بصمة الوجه تعمل' : 'Face ID Works'}</span>
                </label>

                <label className="flex items-center gap-2 bg-black p-2.5 rounded-xl border border-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={screenOriginal}
                    onChange={(e) => setScreenOriginal(e.target.checked)}
                    className="accent-white w-4 h-4 rounded"
                  />
                  <span>{isAr ? 'الشاشة أصلية' : 'Original Screen'}</span>
                </label>

                <label className="flex items-center gap-2 bg-black p-2.5 rounded-xl border border-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasBox}
                    onChange={(e) => setHasBox(e.target.checked)}
                    className="accent-white w-4 h-4 rounded"
                  />
                  <span>{isAr ? 'العلبة الأصلية' : 'Original Box'}</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Estimated Result Payout Card */}
          <div className="md:col-span-5 bg-black p-6 rounded-2xl border border-neutral-800 flex flex-col justify-between text-center space-y-6">
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase text-black bg-white px-3 py-1 rounded-full shadow-md">
                {isAr ? 'القيمة التقديرية المضمونة' : 'Guaranteed Valuation'}
              </span>

              <p className="text-xs text-neutral-400">
                {isAr ? 'قيمة الاستبدال الفوري لجهازك هي:' : 'Estimated Trade-In Value:'}
              </p>

              <div className="py-3 bg-neutral-900 rounded-2xl border border-neutral-700 shadow-inner">
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {formatPrice(estimatedValEgp)}
                </span>
              </div>

              <div className="text-xs text-neutral-300 space-y-1.5 pt-2 text-right">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>{isAr ? 'استلام المبلغ كاش فوراً بالفرع' : 'Instant Cash Payout'}</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>{isAr ? 'أو خصمه مباشرة من سعر جهازك الجديد' : 'Direct Upgrade Discount'}</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
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
                    className="w-full bg-neutral-900 border border-neutral-800 text-white text-xs p-2.5 rounded-xl focus:outline-none focus:border-white"
                  />
                  <input
                    type="tel"
                    required
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    placeholder={isAr ? 'رقم المحمول للتواصل' : 'Mobile Number'}
                    className="w-full bg-neutral-900 border border-neutral-800 text-white text-xs p-2.5 rounded-xl focus:outline-none focus:border-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white hover:bg-neutral-200 text-black font-black text-xs py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>{isAr ? 'تأكيد وحجز موعد البدل بالفرع' : 'Book Branch Trade-In Slot'}</span>
                </button>
              </form>
            ) : (
              <div className="p-4 bg-neutral-900 text-white text-xs font-bold rounded-2xl border border-neutral-700 space-y-1.5 text-center">
                <Check className="w-6 h-6 text-white mx-auto" />
                <p className="font-extrabold text-white text-sm">{isAr ? 'تم تسجيل طلب التبديل بنجاح!' : 'Trade-In Request Received!'}</p>
                <p className="text-[11px] text-neutral-300">
                  {isAr ? 'سيقوم مسؤول بدل الأجهزة بالاتصال بك فوراً لتحديد أقرب فرع واستلام كاش.' : 'Our team will contact you shortly.'}
                </p>
              </div>
            )}

            <button
              onClick={onOpenCatalog}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs py-2.5 rounded-xl border border-neutral-800 transition-colors"
            >
              {isAr ? 'تصفح الأجهزة الجديدة المتاحة للبدل' : 'Browse New Devices to Upgrade'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
