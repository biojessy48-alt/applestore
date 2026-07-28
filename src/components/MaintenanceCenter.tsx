import React, { useState } from 'react';
import { 
  Wrench, ShieldCheck, Clock, CheckCircle2, AlertCircle, Smartphone, 
  Laptop, Tablet, Watch, Search, Calendar, MapPin, Send, Sparkles, Check 
} from 'lucide-react';
import { RepairService, RepairTicket, Language, Currency } from '../types';
import { mockRepairServices } from '../data/mockData';

interface MaintenanceCenterProps {
  language: Language;
  currency: Currency;
  onOpenAiAdvisor: () => void;
}

export const MaintenanceCenter: React.FC<MaintenanceCenterProps> = ({
  language,
  currency,
  onOpenAiAdvisor
}) => {
  const isAr = language === 'ar';

  const [selectedDeviceType, setSelectedDeviceType] = useState<'iphone' | 'ipad' | 'mac' | 'watch'>('iphone');
  const [selectedService, setSelectedService] = useState<RepairService | null>(mockRepairServices[0]);

  // Booking Form State
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingBranch, setBookingBranch] = useState('nasr-city');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState<string | null>(null);

  // Ticket Lookup State
  const [searchTicketCode, setSearchTicketCode] = useState('');
  const [activeTicket, setActiveTicket] = useState<RepairTicket | null>(null);
  const [ticketSearchError, setTicketSearchError] = useState(false);

  const filteredServices = mockRepairServices.filter(s => s.deviceType === selectedDeviceType);

  const formatPrice = (egp: number) => {
    return currency === 'USD' ? `$${Math.round(egp / 48)}` : `${egp.toLocaleString()} ج.م`;
  };

  const handleBookRepair = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone) return;

    const ticketNum = `TRK-${Math.floor(10000 + Math.random() * 90000)}`;
    setGeneratedTicket(ticketNum);
    setBookingSuccess(true);
  };

  const handleSearchTicket = () => {
    if (!searchTicketCode.trim()) return;

    // Demo Ticket
    if (searchTicketCode.trim().toUpperCase() === 'TRK-88214' || searchTicketCode.length > 3) {
      setActiveTicket({
        ticketCode: searchTicketCode.trim().toUpperCase(),
        customerName: 'أحمد محمود العبد',
        customerPhone: '010****5678',
        deviceModel: 'iPhone 15 Pro Max',
        issueDescription: 'استبدال شاشة أصلية أبل مع نقل خاصية TrueTone',
        status: 'Repairing',
        statusAr: 'جاري تركيب القطع الأصلية المعايرة',
        estimatedCostEgp: 11500,
        createdAt: '2026-07-27'
      });
      setTicketSearchError(false);
    } else {
      setTicketSearchError(true);
      setActiveTicket(null);
    }
  };

  return (
    <div id="maintenance-hub" className="py-12 px-4 bg-slate-900 text-slate-100 font-sans border-y border-emerald-900/30">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-black text-amber-300 bg-emerald-900/80 px-4 py-1.5 rounded-full border border-amber-500/30">
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAr ? 'مركز الصيانة المعتمد لأجهزة أبل' : 'Certified Apple Service Center'}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            {isAr ? 'صيانة فورية أمامك في 30 دقيقة مع ضمان 6 أشهر' : '30-Minute Express Apple Repair'}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            {isAr 
              ? 'نستخدم قطع غيار أصلية 100% مع أحدث أجهزة الليزر وكبس الشاشات بدون رسائل تحذيرية' 
              : 'Original parts, precision laser back glass tool & calibrated battery BMS swap'}
          </p>

          <button
            onClick={onOpenAiAdvisor}
            className="mt-2 text-xs font-extrabold text-amber-300 hover:text-white bg-emerald-800/60 hover:bg-emerald-700 px-4 py-2 rounded-full border border-amber-400/40 transition-all inline-flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isAr ? 'استشر المساعد الذكي عن عطل جهازك' : 'Diagnose with AI Assistant'}</span>
          </button>
        </div>

        {/* Section 1: Ticket Search Bar */}
        <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700 max-w-3xl mx-auto shadow-lg">
          <h4 className="font-bold text-sm text-slate-200 mb-3 text-right flex items-center justify-between">
            <span>{isAr ? 'تتبع حالة كارت الصيانة الخاص بجهازك' : 'Track Repair Ticket Status'}</span>
            <span className="text-[11px] text-amber-400 font-normal">{isAr ? 'رمز تجريبي: TRK-88214' : 'Try Code: TRK-88214'}</span>
          </h4>

          <div className="flex gap-2">
            <input
              type="text"
              value={searchTicketCode}
              onChange={(e) => setSearchTicketCode(e.target.value)}
              placeholder={isAr ? 'أدخل إيصال الصيانة (مثال: TRK-88214)' : 'Enter ticket code (e.g. TRK-88214)'}
              className="flex-1 bg-slate-900 border border-slate-700 focus:border-amber-400 text-white text-sm rounded-xl py-2.5 px-4 focus:outline-none"
            />
            <button
              onClick={handleSearchTicket}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-6 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              <span>{isAr ? 'استعلام' : 'Track'}</span>
            </button>
          </div>

          {ticketSearchError && (
            <p className="text-xs text-rose-400 font-semibold mt-2 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{isAr ? 'رمز الإيصال غير صحيح، جرب استخدام TRK-88214' : 'Ticket code not found, try TRK-88214'}</span>
            </p>
          )}

          {/* Ticket Live Stepper Display */}
          {activeTicket && (
            <div className="mt-5 pt-5 border-t border-slate-700/80 space-y-4">
              <div className="flex justify-between items-start text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-700">
                <div>
                  <p className="font-extrabold text-amber-300 text-sm">{activeTicket.ticketCode} - {activeTicket.deviceModel}</p>
                  <p className="text-slate-300 mt-0.5">{activeTicket.issueDescription}</p>
                </div>
                <div className="text-left">
                  <p className="text-emerald-400 font-extrabold">{formatPrice(activeTicket.estimatedCostEgp)}</p>
                  <p className="text-slate-400 text-[10px]">{activeTicket.createdAt}</p>
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="grid grid-cols-5 gap-1 text-center text-[11px] font-bold">
                {[
                  { step: 'Received', labelAr: 'تم الاستلام' },
                  { step: 'Diagnostic', labelAr: 'فحص مهندسي' },
                  { step: 'Repairing', labelAr: 'تركيب قطع أصلية' },
                  { step: 'Testing', labelAr: 'اختبار كفاءة' },
                  { step: 'Ready for Pickup', labelAr: 'جاهز للتسليم' },
                ].map((st, idx) => {
                  const isCurrent = activeTicket.status === st.step;
                  const isPassed = idx <= 2; // Demo passed step

                  return (
                    <div key={st.step} className="space-y-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs font-black ${
                        isCurrent 
                          ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/30' 
                          : isPassed 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-slate-700 text-slate-400'
                      }`}>
                        {isPassed && !isCurrent ? <Check className="w-4 h-4" /> : idx + 1}
                      </div>
                      <p className={isCurrent ? 'text-amber-300 font-extrabold' : 'text-slate-400'}>{st.labelAr}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Interactive Service Estimator & Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Device & Repair Picker */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-extrabold text-lg text-white text-right">
              {isAr ? '1. اختر نوع الجهاز المطلوب صيانته:' : '1. Select Device Type:'}
            </h3>

            {/* Device Type Selector */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { id: 'iphone', labelAr: 'آيفون', icon: Smartphone },
                { id: 'ipad', labelAr: 'آيباد', icon: Tablet },
                { id: 'mac', labelAr: 'ماك بوك', icon: Laptop },
                { id: 'watch', labelAr: 'ساعة أبل', icon: Watch },
              ].map((d) => {
                const Icon = d.icon;
                const isSelected = selectedDeviceType === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => {
                      setSelectedDeviceType(d.id as any);
                      const first = mockRepairServices.find(s => s.deviceType === d.id);
                      if (first) setSelectedService(first);
                    }}
                    className={`p-3.5 rounded-2xl border text-center transition-all font-extrabold text-xs flex flex-col items-center gap-2 ${
                      isSelected 
                        ? 'bg-gradient-to-br from-emerald-600 to-emerald-800 border-amber-400 text-white shadow-lg shadow-emerald-900/50' 
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${isSelected ? 'text-amber-300' : 'text-slate-400'}`} />
                    <span>{d.labelAr}</span>
                  </button>
                );
              })}
            </div>

            {/* Repair Services List */}
            <div className="space-y-3 pt-2">
              <h4 className="font-extrabold text-sm text-slate-200 text-right">
                {isAr ? '2. اختر الخدمة أو قطع الغيار المطلوبة:' : '2. Select Service or Repair:'}
              </h4>

              {filteredServices.length === 0 ? (
                <div className="p-6 bg-slate-800/60 rounded-xl text-center text-xs text-slate-400">
                  {isAr ? 'تواصل معنا لمعاينة هذا الموديل المخصص' : 'Contact us for custom repair quote'}
                </div>
              ) : (
                filteredServices.map((service) => {
                  const isSelected = selectedService?.id === service.id;

                  return (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-slate-800 border-emerald-500 shadow-md ring-1 ring-emerald-500' 
                          : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-black text-amber-300 text-sm">{service.modelName}</span>
                        <span className="font-extrabold text-emerald-400 text-base">{formatPrice(service.estimatedPriceEgp)}</span>
                      </div>
                      <p className="font-bold text-xs text-slate-200 mb-2">{service.issueNameAr}</p>
                      <p className="text-[11px] text-slate-400 leading-relaxed mb-3">{service.descriptionAr}</p>

                      <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-300 pt-2 border-t border-slate-700/60">
                        <span className="flex items-center gap-1 text-amber-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>المدة: {service.estimatedTimeMinutes} دقيقة</span>
                        </span>
                        <span className="flex items-center gap-1 text-emerald-400">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>الضمان: {service.warrantyMonths} أشهر</span>
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Appointment Booking Card */}
          <div className="lg:col-span-5 bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl space-y-5">
            <div className="text-right border-b border-slate-700 pb-4">
              <h4 className="font-black text-lg text-white">
                {isAr ? '3. احجز موعد صيانة أو شحن الجهاز' : '3. Book Repair Appointment'}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                {isAr ? 'تأكيد فوري للخدمة واستلام إيصال الفحص الرقمي' : 'Get instant booking confirmation'}
              </p>
            </div>

            {bookingSuccess ? (
              <div className="bg-emerald-950/80 border border-emerald-600 p-6 rounded-2xl text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h5 className="font-extrabold text-white text-base">
                  {isAr ? 'تم تأكيد طلب الصيانة بنجاح!' : 'Repair Appointment Confirmed!'}
                </h5>
                <p className="text-xs text-slate-200">
                  {isAr ? 'كود الصيانة الخاص بك هو:' : 'Your ticket code:'}
                </p>
                <div className="bg-slate-900 py-3 px-4 rounded-xl font-mono font-black text-amber-300 text-lg tracking-widest border border-amber-500/40">
                  {generatedTicket}
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {isAr ? 'يتواصل معك مهندس الصيانة خلال 15 دقيقة لتأكيد الموعد واستلام الجهاز.' : 'Our tech team will contact you shortly.'}
                </p>
                <button
                  onClick={() => setBookingSuccess(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-5 py-2 rounded-xl"
                >
                  {isAr ? 'حجز موعد آخر' : 'Book Another'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookRepair} className="space-y-4">
                {selectedService && (
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-700 text-xs space-y-1">
                    <p className="text-amber-400 font-bold">{selectedService.modelName}</p>
                    <p className="text-slate-200 font-semibold">{selectedService.issueNameAr}</p>
                    <p className="text-emerald-400 font-black text-sm">{formatPrice(selectedService.estimatedPriceEgp)}</p>
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1 text-right">{isAr ? 'الاسم بالكامل:' : 'Full Name:'}</label>
                  <input
                    type="text"
                    required
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    placeholder={isAr ? 'مثال: محمد علي' : 'Full Name'}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 text-white text-xs rounded-xl p-3 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1 text-right">{isAr ? 'رقم المحمول / واتساب:' : 'Phone Number:'}</label>
                  <input
                    type="tel"
                    required
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                    placeholder="010XXXXXXXX"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 text-white text-xs rounded-xl p-3 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1 text-right">{isAr ? 'الفرع أو خيار الاستلام:' : 'Preferred Branch / Pickup:'}</label>
                  <select
                    value={bookingBranch}
                    onChange={(e) => setBookingBranch(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 text-white text-xs rounded-xl p-3 focus:outline-none font-semibold"
                  >
                    <option value="nasr-city">{isAr ? 'فرع مدينة نصر (الرئيسي)' : 'Nasr City Branch'}</option>
                    <option value="tagamoa">{isAr ? 'فرع التجمع الخامس (القطامية)' : 'New Cairo Branch'}</option>
                    <option value="alex">{isAr ? 'فرع الإسكندرية (سموحة)' : 'Alexandria Branch'}</option>
                    <option value="pickup">{isAr ? '🚚 طلب مندوب شحن لاستلام الجهاز من البيت' : 'Home Pickup Courier'}</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>{isAr ? 'تأكيد حجز الصيانة الفورية' : 'Confirm Express Repair Booking'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
