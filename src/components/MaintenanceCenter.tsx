import React, { useState } from 'react';
import { 
  Wrench, ShieldCheck, Clock, CheckCircle2, AlertCircle, Smartphone, 
  Laptop, Tablet, Watch, Search, Calendar, MapPin, Send, Sparkles, Check,
  MessageSquare, PhoneCall, Info, PlusCircle
} from 'lucide-react';
import { RepairService, RepairTicket, Language, Currency, StoreBranch } from '../types';
import { mockRepairServices, mockStoreBranches } from '../data/mockData';

interface MaintenanceCenterProps {
  language: Language;
  currency: Currency;
  branches?: StoreBranch[];
  repairServices?: RepairService[];
  repairTickets?: RepairTicket[];
  onAddRepairTicket?: (ticket: RepairTicket) => void;
  storeWhatsApp?: string;
  onOpenAiAdvisor: () => void;
}

export const MaintenanceCenter: React.FC<MaintenanceCenterProps> = ({
  language,
  currency,
  branches,
  repairServices = mockRepairServices,
  repairTickets = [],
  onAddRepairTicket,
  storeWhatsApp = '201099887766',
  onOpenAiAdvisor
}) => {
  const isAr = language === 'ar';

  const [selectedDeviceType, setSelectedDeviceType] = useState<'iphone' | 'ipad' | 'mac' | 'watch'>('iphone');
  const [selectedService, setSelectedService] = useState<RepairService | null>(
    repairServices.find(s => s.deviceType === 'iphone') || repairServices[0] || null
  );
  const [isCustomServiceSelected, setIsCustomServiceSelected] = useState<boolean>(false);

  // Booking Form State
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingBranch, setBookingBranch] = useState('nasr-city');
  const [customDeviceModel, setCustomDeviceModel] = useState('');
  const [customIssueDesc, setCustomIssueDesc] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState<string | null>(null);

  // Ticket Lookup State
  const [searchTicketCode, setSearchTicketCode] = useState('');
  const [activeTicket, setActiveTicket] = useState<RepairTicket | null>(null);
  const [ticketSearchError, setTicketSearchError] = useState(false);

  const availableServices = repairServices.length > 0 ? repairServices : mockRepairServices;
  const filteredServices = availableServices.filter(s => s.deviceType === selectedDeviceType);

  const formatPrice = (egp: number) => {
    if (egp <= 0) return isAr ? 'حسب الفحص والتواصل' : 'Quote upon inspection';
    return currency === 'USD' ? `$${Math.round(egp / 48)}` : (isAr ? `${egp.toLocaleString()} ج.م` : `EGP ${egp.toLocaleString()}`);
  };

  const handleSelectService = (service: RepairService) => {
    setSelectedService(service);
    setIsCustomServiceSelected(false);
    setCustomDeviceModel(service.modelName);
    setCustomIssueDesc(service.issueNameAr);
  };

  const handleSelectCustomService = () => {
    setSelectedService(null);
    setIsCustomServiceSelected(true);
    const defaultDeviceName = selectedDeviceType === 'iphone' ? 'iPhone' : selectedDeviceType === 'mac' ? 'MacBook' : selectedDeviceType === 'ipad' ? 'iPad' : 'Apple Watch';
    setCustomDeviceModel(defaultDeviceName);
    setCustomIssueDesc('');
  };

  const handleBookRepair = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone) return;

    const ticketNum = `TRK-${Math.floor(10000 + Math.random() * 90000)}`;
    const finalModel = customDeviceModel || selectedService?.modelName || 'أجهزة أبل';
    const finalIssue = customIssueDesc || selectedService?.issueNameAr || 'طلب خدمة صيانة وفحص';
    const finalCost = selectedService?.estimatedPriceEgp || 0;

    const newTicket: RepairTicket = {
      ticketCode: ticketNum,
      customerName: bookingName,
      customerPhone: bookingPhone,
      deviceModel: finalModel,
      issueDescription: finalIssue,
      status: 'Received',
      statusAr: 'تم تسجيل الطلب بانتظار التواصل وتحديد التكلفة',
      estimatedCostEgp: finalCost,
      createdAt: new Date().toISOString().split('T')[0]
    };

    if (onAddRepairTicket) {
      onAddRepairTicket(newTicket);
    }

    setGeneratedTicket(ticketNum);
    setBookingSuccess(true);
  };

  const handleSearchTicket = () => {
    if (!searchTicketCode.trim()) return;

    const codeClean = searchTicketCode.trim().toUpperCase();

    // Check dynamic tickets first
    const foundInState = repairTickets.find(t => t.ticketCode.toUpperCase() === codeClean);
    if (foundInState) {
      setActiveTicket(foundInState);
      setTicketSearchError(false);
      return;
    }

    // Demo fallback ticket
    if (codeClean === 'TRK-88214' || codeClean.length > 3) {
      setActiveTicket({
        ticketCode: codeClean,
        customerName: 'أحمد محمود العبد',
        customerPhone: '010****5678',
        deviceModel: customDeviceModel || 'iPhone 15 Pro Max',
        issueDescription: customIssueDesc || 'استبدال شاشة أصلية أبل مع نقل خاصية TrueTone',
        status: 'Repairing',
        statusAr: 'جاري تركيب القطع الأصلية المعايرة',
        estimatedCostEgp: 11500,
        createdAt: new Date().toISOString().split('T')[0]
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
                      const first = availableServices.find(s => s.deviceType === d.id);
                      if (first) handleSelectService(first);
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
              <div className="flex justify-between items-center">
                <h4 className="font-extrabold text-sm text-slate-200 text-right">
                  {isAr ? '2. اختر الخدمة أو قطع الغيار المطلوبة:' : '2. Select Service or Repair:'}
                </h4>
                <span className="text-[11px] text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                  {filteredServices.length + 1} خيارات صيانة
                </span>
              </div>

              {filteredServices.map((service) => {
                const isSelected = !isCustomServiceSelected && selectedService?.id === service.id;

                return (
                  <div
                    key={service.id}
                    onClick={() => handleSelectService(service)}
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

                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300 pt-2 border-t border-slate-700/60">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-amber-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>المدة: {service.estimatedTimeMinutes} دقيقة</span>
                        </span>
                        <span className="flex items-center gap-1 text-emerald-400">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>الضمان: {service.warrantyMonths} أشهر</span>
                        </span>
                      </div>

                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black ${
                        isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                      }`}>
                        {isSelected ? 'تم الاختيار ✓' : 'تحديد الخدمة'}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Custom Service Option Card ("خدمة أخرى") */}
              <div
                onClick={handleSelectCustomService}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isCustomServiceSelected 
                    ? 'bg-gradient-to-r from-amber-950/90 via-slate-800 to-slate-800 border-amber-400 shadow-lg ring-2 ring-amber-400/60' 
                    : 'bg-slate-800/40 border-dashed border-amber-500/50 hover:bg-slate-800 hover:border-amber-400'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
                      <PlusCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-extrabold text-amber-300 text-sm block">
                        {isAr ? 'خدمة أخرى / عطل غير مدرج بالجدول' : 'Other Service / Custom Repair'}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {isAr ? 'حدد موديل جهازك ووصف العطل بنفسك' : 'Specify device model and issue yourself'}
                      </span>
                    </div>
                  </div>
                  <span className="font-extrabold text-[10px] text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
                    {isAr ? 'تحديد السعر بعد التواصل' : 'Quote on call'}
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                  {isAr 
                    ? 'إذا لم تجد عطل جهازك أو الموديل المطلوب بالتحديد في القائمة المتاحة أعلاه، اختر هذا الخيار واكتب التفاصيل في النموذج وسيتواصل معك المهندس فوراً لتحديد التكلفة والموعد.'
                    : 'Can\'t find your service or model in the list? Select this option and write your details below.'}
                </p>

                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300 pt-2 border-t border-slate-700/60">
                  <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isAr ? 'فحص وتحديد التكلفة مجاناً' : 'Free consultation'}</span>
                  </span>

                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-colors ${
                    isCustomServiceSelected ? 'bg-amber-500 text-slate-950' : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                  }`}>
                    {isCustomServiceSelected ? 'تم تحديد خدمة أخرى ✓' : 'اختيار خدمة أخرى'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Appointment Booking Card */}
          <div className="lg:col-span-5 bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl space-y-5">
            <div className="text-right border-b border-slate-700 pb-4">
              <h4 className="font-black text-lg text-white">
                {isAr ? '3. تأكيد الطلب وحجز موعد الصيانة' : '3. Book Repair Appointment'}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                {isAr ? 'سيتم التواصل معك فوراً من المهندس الفني لتأكيد التكلفة واستلام الجهاز' : 'Our tech engineer will contact you to confirm final cost'}
              </p>
            </div>

            {/* Explicit Cost Determination Notice */}
            <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-2xl flex items-start gap-3 text-xs text-amber-200">
              <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>💡 آلية تحديد التكلفة:</strong> فور إرسال الطلب، يتواصل معك أحد مهندسي الفحص المعتمدين لمراجعة العطل وتأكيد التكلفة النهائية ومدة الصيانة قبل البدء.
              </p>
            </div>

            {bookingSuccess ? (
              <div className="bg-emerald-950/80 border border-emerald-600 p-6 rounded-2xl text-center space-y-4 shadow-2xl">
                <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto animate-bounce" />
                <h5 className="font-black text-white text-lg">
                  {isAr ? 'تم استلام طلب الصيانة بنجاح!' : 'Repair Order Received!'}
                </h5>
                <p className="text-xs text-slate-200">
                  {isAr ? 'كود التذكرة الرقمية الخاص بك:' : 'Your digital ticket code:'}
                </p>
                <div className="bg-slate-900 py-3 px-4 rounded-xl font-mono font-black text-amber-300 text-2xl tracking-widest border border-amber-500/40 shadow-inner">
                  {generatedTicket}
                </div>

                <div className="bg-slate-900/90 p-3.5 rounded-xl text-right text-xs text-slate-300 space-y-1.5 border border-slate-800">
                  <p><strong>الموديل:</strong> {customDeviceModel || selectedService?.modelName}</p>
                  <p><strong>العطل المطلوب:</strong> {customIssueDesc || selectedService?.issueNameAr}</p>
                  <p className="text-emerald-400 font-bold"><strong>الحالة:</strong> بانتظار تواصل المهندس لتأكيد الموعد والتكلفة</p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {isAr ? 'سيتصل بك مهندس الصيانة المعتمد خلال دقائق للتنسيق واستلام الجهاز أو إرسال مندوب الشحن.' : 'Our repair technician will contact you within a few minutes.'}
                </p>

                <a
                  href={`https://wa.me/${storeWhatsApp}?text=${encodeURIComponent(
                    `السلام عليكم، قمت بحجز طلب صيانة رقم ${generatedTicket}\n` +
                    `الجهاز: ${customDeviceModel || selectedService?.modelName || 'أبل'}\n` +
                    `العطل: ${customIssueDesc || selectedService?.issueNameAr || 'فحص وصيانة'}\n` +
                    `الاسم: ${bookingName}\n` +
                    `الهاتف: ${bookingPhone}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>تواصل مع المهندس فوراً عبر الواتساب</span>
                </a>

                <button
                  onClick={() => {
                    setBookingSuccess(false);
                    setBookingName('');
                    setBookingPhone('');
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-5 py-2 rounded-xl border border-slate-700"
                >
                  {isAr ? 'حجز طلب صيانة آخر' : 'Submit Another Ticket'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookRepair} className="space-y-4">
                {/* Selected Service Card or Custom Service Banner */}
                {isCustomServiceSelected ? (
                  <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-900 p-4 rounded-2xl border border-amber-500/50 text-xs space-y-1.5 shadow-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-amber-300 font-black flex items-center gap-1.5 text-xs">
                        <PlusCircle className="w-4 h-4 text-amber-400" />
                        <span>{isAr ? 'طلب خدمة صيانة مخصصة (خدمة أخرى)' : 'Custom Repair Order'}</span>
                      </span>
                      <span className="text-emerald-400 font-bold bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800 text-[10px]">
                        {isAr ? 'تحديد التكلفة مجاناً' : 'Free Consultation'}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {isAr 
                        ? 'يرجى توضيح موديل جهازك ووصف العطل بالتفصيل بالأسفل ليتم التواصل معك فوراً وتحديد التكلفة بدقة.'
                        : 'Please specify your device model and problem description below.'}
                    </p>
                  </div>
                ) : selectedService ? (
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-700 text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-amber-400 font-bold">{selectedService.modelName}</span>
                      <span className="text-emerald-400 font-black">{formatPrice(selectedService.estimatedPriceEgp)}</span>
                    </div>
                    <p className="text-slate-200 font-semibold">{selectedService.issueNameAr}</p>
                  </div>
                ) : null}

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1 text-right">{isAr ? 'الاسم بالكامل: *' : 'Full Name: *'}</label>
                  <input
                    type="text"
                    required
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    placeholder={isAr ? 'مثال: أحمد محمود' : 'Full Name'}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 text-white text-xs rounded-xl p-3 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1 text-right">{isAr ? 'رقم الهاتف / الواتساب: *' : 'Phone Number: *'}</label>
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
                  <label className="text-xs font-bold text-slate-300 block mb-1 text-right">
                    {isCustomServiceSelected 
                      ? (isAr ? 'موديل الجهاز بالتحديد: *' : 'Specific Device Model: *') 
                      : (isAr ? 'موديل الجهاز (تأكيد أو تعديل):' : 'Device Model:')}
                  </label>
                  <input
                    type="text"
                    required={isCustomServiceSelected}
                    value={customDeviceModel}
                    onChange={(e) => setCustomDeviceModel(e.target.value)}
                    placeholder={isAr ? 'مثال: iPhone 14 Pro Max / MacBook Air M2' : 'e.g. iPhone 14 Pro Max'}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 text-amber-300 font-bold text-xs rounded-xl p-3 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1 text-right">
                    {isCustomServiceSelected 
                      ? (isAr ? 'وصف العطل أو الخدمة المطلوبة بنفسك: *' : 'Describe your custom repair request: *')
                      : (isAr ? 'تحديد الخدمة / وصف المشكلة والعطل:' : 'Service / Problem Description:')}
                  </label>
                  <textarea
                    rows={3}
                    required={isCustomServiceSelected}
                    value={customIssueDesc}
                    onChange={(e) => setCustomIssueDesc(e.target.value)}
                    placeholder={
                      isCustomServiceSelected 
                        ? (isAr ? 'مثال: الجهاز صدم في الماء، أو السماعة لا تعمل، أو تغيير سوكيت الشحن، أو معايرة الكاميرا...' : 'Describe problem in detail...')
                        : (isAr ? 'مثال: الشاشة مكسورة وتحتاج تغيير أصلية، البطارية ضعيفة 75%...' : 'Issue description...')
                    }
                    className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 text-white text-xs rounded-xl p-3 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1 text-right">{isAr ? 'الفرع الفني أو خيار الاستلام:' : 'Preferred Branch / Delivery:'}</label>
                  <select
                    value={bookingBranch}
                    onChange={(e) => setBookingBranch(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 text-white text-xs rounded-xl p-3 focus:outline-none font-semibold"
                  >
                    {(branches && branches.length > 0 ? branches : mockStoreBranches).map((b) => (
                      <option key={b.id} value={b.id}>
                        {isAr ? b.nameAr : b.name}
                      </option>
                    ))}
                    <option value="pickup">{isAr ? '🚚 طلب مندوب شحن لاستلام الجهاز من البيت' : 'Home Pickup Courier'}</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>{isAr ? 'إرسال طلب الصيانة وتأكيد التواصل' : 'Confirm Express Repair Booking'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
