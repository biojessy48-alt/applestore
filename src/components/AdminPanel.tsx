import React, { useState } from 'react';
import { 
  LayoutDashboard, ShoppingBag, Wrench, RefreshCw, Settings, Plus, 
  Trash2, Edit, Check, Search, AlertCircle, ArrowLeft, ShieldCheck, 
  DollarSign, Package, Users, Truck, Clock, Sparkles, X, ChevronDown, 
  BarChart3, Store, Eye, Tag, Phone, MapPin, Save, Image as ImageIcon, Send
} from 'lucide-react';
import { 
  Product, RepairService, RepairTicket, Language, Currency, CategoryId, ProductCondition,
  TradeInModel, TradeInRequest, HeroSlide
} from '../types';

export interface OrderItem {
  id: string;
  orderCode: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  governorate: string;
  paymentMethod: string;
  totalEgp: number;
  itemsCount: number;
  itemsSummary: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
}

interface AdminPanelProps {
  language: Language;
  currency: Currency;
  // Products CRUD
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  // Repair Services Pricing CRUD
  repairServices: RepairService[];
  onUpdateRepairService: (service: RepairService) => void;
  onAddRepairService: (service: RepairService) => void;
  // Repair Tickets Tracking CRUD
  repairTickets: RepairTicket[];
  onAddRepairTicket: (ticket: RepairTicket) => void;
  onUpdateRepairTicketStatus: (ticketCode: string, newStatus: RepairTicket['status']) => void;
  // Orders CRUD
  orders: OrderItem[];
  onUpdateOrderStatus: (orderCode: string, newStatus: OrderItem['status']) => void;
  // Trade-In Section Management
  tradeInModels: TradeInModel[];
  onAddTradeInModel: (model: TradeInModel) => void;
  onUpdateTradeInModel: (model: TradeInModel) => void;
  onDeleteTradeInModel: (id: string) => void;
  tradeInRequests: TradeInRequest[];
  onUpdateTradeInRequestStatus: (id: string, status: TradeInRequest['status']) => void;
  // Hero Banners Management
  heroSlides: HeroSlide[];
  onAddHeroSlide: (slide: HeroSlide) => void;
  onDeleteHeroSlide: (id: number) => void;
  // General Store Settings
  announcementText: string;
  setAnnouncementText: (text: string) => void;
  storePhone: string;
  setStorePhone: (text: string) => void;
  storeWhatsApp: string;
  setStoreWhatsApp: (text: string) => void;
  onBackToStore: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  language,
  currency,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  repairServices,
  onUpdateRepairService,
  onAddRepairService,
  repairTickets,
  onAddRepairTicket,
  onUpdateRepairTicketStatus,
  orders,
  onUpdateOrderStatus,
  tradeInModels,
  onAddTradeInModel,
  onUpdateTradeInModel,
  onDeleteTradeInModel,
  tradeInRequests,
  onUpdateTradeInRequestStatus,
  heroSlides,
  onAddHeroSlide,
  onDeleteHeroSlide,
  announcementText,
  setAnnouncementText,
  storePhone,
  setStorePhone,
  storeWhatsApp,
  setStoreWhatsApp,
  onBackToStore
}) => {
  const isAr = language === 'ar';

  const [activeTab, setActiveTab] = useState<
    'analytics' | 'trade-in' | 'products' | 'orders' | 'repairs' | 'repair-services' | 'hero' | 'settings'
  >('trade-in');

  // Search & Filter state for products
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');

  // Product Modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Fields for Product
  const [pNameAr, setPNameAr] = useState('');
  const [pNameEn, setPNameEn] = useState('');
  const [pCategory, setPCategory] = useState<CategoryId>('iphones');
  const [pPriceEgp, setPPriceEgp] = useState<number>(35000);
  const [pOriginalPriceEgp, setPOriginalPriceEgp] = useState<number>(38000);
  const [pCondition, setPCondition] = useState<ProductCondition>('New');
  const [pBatteryHealth, setPBatteryHealth] = useState<number>(100);
  const [pWarrantyAr, setPWarrantyAr] = useState('ضمان سنة معتمد');
  const [pStockCount, setPStockCount] = useState<number>(10);
  const [pDescriptionAr, setPDescriptionAr] = useState('');
  const [pImageUrl, setPImageUrl] = useState('');

  // Ticket Add Modal
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [tCustomerName, setTCustomerName] = useState('');
  const [tCustomerPhone, setTCustomerPhone] = useState('');
  const [tDeviceModel, setTDeviceModel] = useState('iPhone 15 Pro Max');
  const [tIssueDesc, setTIssueDesc] = useState('');
  const [tEstimatedCost, setTEstimatedCost] = useState<number>(4500);

  // Edit Service Price Modal
  const [editingService, setEditingService] = useState<RepairService | null>(null);
  const [sPriceEgp, setSPriceEgp] = useState<number>(0);

  // TradeIn Model Modal
  const [isTradeInModelModalOpen, setIsTradeInModelModalOpen] = useState(false);
  const [editingTradeInModel, setEditingTradeInModel] = useState<TradeInModel | null>(null);
  const [tmNameAr, setTmNameAr] = useState('');
  const [tmNameEn, setTmNameEn] = useState('');
  const [tmBaseValEgp, setTmBaseValEgp] = useState<number>(25000);
  const [tmCategory, setTmCategory] = useState<'iphone' | 'mac' | 'ipad' | 'watch'>('iphone');

  // Hero Slide Modal
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [hsTitleAr, setHsTitleAr] = useState('');
  const [hsSubtitleAr, setHsSubtitleAr] = useState('');
  const [hsBadgeAr, setHsBadgeAr] = useState('عرض جديد حصري');
  const [hsCtaAr, setHsCtaAr] = useState('تسوق الآن');
  const [hsImageUrl, setHsImageUrl] = useState('');

  const formatPrice = (egp: number) => {
    return currency === 'USD' ? `$${Math.round(egp / 48)}` : `${egp.toLocaleString()} ج.م`;
  };

  // Open product modal for Add or Edit
  const openProductForm = (productToEdit?: Product) => {
    if (productToEdit) {
      setEditingProduct(productToEdit);
      setPNameAr(productToEdit.nameAr);
      setPNameEn(productToEdit.name);
      setPCategory(productToEdit.category);
      setPPriceEgp(productToEdit.priceEgp);
      setPOriginalPriceEgp(productToEdit.originalPriceEgp || productToEdit.priceEgp);
      setPCondition(productToEdit.condition);
      setPBatteryHealth(productToEdit.batteryHealth || 100);
      setPWarrantyAr(productToEdit.warrantyAr);
      setPStockCount(productToEdit.stockCount);
      setPDescriptionAr(productToEdit.descriptionAr);
      setPImageUrl(productToEdit.images[0] || '');
    } else {
      setEditingProduct(null);
      setPNameAr('');
      setPNameEn('');
      setPCategory('iphones');
      setPPriceEgp(35000);
      setPOriginalPriceEgp(38000);
      setPCondition('New');
      setPBatteryHealth(100);
      setPWarrantyAr('ضمان سنة معتمد');
      setPStockCount(10);
      setPDescriptionAr('');
      setPImageUrl('https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop');
    }
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pNameAr) return;

    const savedProduct: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      name: pNameEn || pNameAr,
      nameAr: pNameAr,
      category: pCategory,
      priceEgp: Number(pPriceEgp),
      originalPriceEgp: pOriginalPriceEgp ? Number(pOriginalPriceEgp) : undefined,
      rating: editingProduct ? editingProduct.rating : 4.9,
      reviewsCount: editingProduct ? editingProduct.reviewsCount : 12,
      condition: pCondition,
      batteryHealth: pCondition === 'New' ? undefined : Number(pBatteryHealth),
      warranty: 'Official Guarantee',
      warrantyAr: pWarrantyAr,
      description: pDescriptionAr,
      descriptionAr: pDescriptionAr,
      colors: editingProduct ? editingProduct.colors : [
        { name: 'Default Color', nameAr: 'اللون الرئيسي', hex: '#212224', image: pImageUrl }
      ],
      storageOptions: editingProduct ? editingProduct.storageOptions : [
        { size: '128GB', priceModifierEgp: 0 },
        { size: '256GB', priceModifierEgp: 4000 }
      ],
      images: [pImageUrl || 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop'],
      specs: editingProduct ? editingProduct.specs : { Screen: 'Retina OLED Display' },
      specsAr: editingProduct ? editingProduct.specsAr : { 'الشاشة': 'شاشة OLED أصلية فائقة الوضوح' },
      inStock: pStockCount > 0,
      stockCount: Number(pStockCount),
      boxIncluded: true
    };

    if (editingProduct) {
      onUpdateProduct(savedProduct);
    } else {
      onAddProduct(savedProduct);
    }

    setIsProductModalOpen(false);
  };

  const handleSaveTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tCustomerName || !tCustomerPhone) return;

    const ticketCode = `TRK-${Math.floor(10000 + Math.random() * 90000)}`;
    const newTicket: RepairTicket = {
      ticketCode,
      customerName: tCustomerName,
      customerPhone: tCustomerPhone,
      deviceModel: tDeviceModel,
      issueDescription: tIssueDesc || 'صيانة وفحص شامليين بالفرع',
      status: 'Received',
      statusAr: 'تم الاستلام بمركز الصيانة',
      estimatedCostEgp: Number(tEstimatedCost),
      createdAt: new Date().toISOString().split('T')[0]
    };

    onAddRepairTicket(newTicket);
    setIsTicketModalOpen(false);
    setTCustomerName('');
    setTCustomerPhone('');
    setTIssueDesc('');
  };

  const handleSaveServicePrice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    onUpdateRepairService({
      ...editingService,
      estimatedPriceEgp: Number(sPriceEgp)
    });
    setEditingService(null);
  };

  // Save TradeIn Model
  const openTradeInModelForm = (model?: TradeInModel) => {
    if (model) {
      setEditingTradeInModel(model);
      setTmNameAr(model.nameAr);
      setTmNameEn(model.name);
      setTmBaseValEgp(model.baseValueEgp);
      setTmCategory(model.category);
    } else {
      setEditingTradeInModel(null);
      setTmNameAr('');
      setTmNameEn('');
      setTmBaseValEgp(25000);
      setTmCategory('iphone');
    }
    setIsTradeInModelModalOpen(true);
  };

  const handleSaveTradeInModel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tmNameAr) return;

    const model: TradeInModel = {
      id: editingTradeInModel ? editingTradeInModel.id : `tm-${Date.now()}`,
      name: tmNameEn || tmNameAr,
      nameAr: tmNameAr,
      baseValueEgp: Number(tmBaseValEgp),
      category: tmCategory
    };

    if (editingTradeInModel) {
      onUpdateTradeInModel(model);
    } else {
      onAddTradeInModel(model);
    }

    setIsTradeInModelModalOpen(false);
  };

  // Save Hero Slide
  const handleSaveHeroSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hsTitleAr) return;

    const newSlide: HeroSlide = {
      id: Date.now(),
      titleAr: hsTitleAr,
      subtitleAr: hsSubtitleAr,
      titleEn: hsTitleAr,
      subtitleEn: hsSubtitleAr,
      badgeAr: hsBadgeAr,
      badgeEn: hsBadgeAr,
      ctaAr: hsCtaAr,
      ctaEn: hsCtaAr,
      image: hsImageUrl || 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200&auto=format&fit=crop',
      category: 'iphones',
      accentColor: 'from-amber-600/20 to-emerald-950'
    };

    onAddHeroSlide(newSlide);
    setIsHeroModalOpen(false);
    setHsTitleAr('');
    setHsSubtitleAr('');
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.nameAr.includes(productSearch) || p.name.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = productCategoryFilter === 'all' || p.category === productCategoryFilter;
    return matchesSearch && matchesCat;
  });

  // Calculate totals
  const totalRevenueEgp = orders.reduce((sum, o) => sum + o.totalEgp, 0) + 245000;
  const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length;
  const newTradeInCount = tradeInRequests.filter(r => r.status === 'New').length;
  const totalInStockCount = products.reduce((sum, p) => sum + p.stockCount, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Admin Navigation Header */}
      <header className="bg-slate-900 border-b border-emerald-900/50 sticky top-0 z-40 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-black text-lg text-white flex items-center gap-2">
                <span>{isAr ? 'لوحة التحكم الشاملة لإدارة متجر SOLIMAN - MEGA SYSTEM' : 'SOLIMAN - MEGA SYSTEM Master Admin Dashboard'}</span>
                <span className="bg-emerald-900 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-500/30">
                  FULL CONTROL
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">
                {isAr ? 'تحكم كامل بقسم البدل والتثمين، الأجهزة، الأسعار، الطلبات وكروت الصيانة' : 'Full inventory, Trade-In valuations, pricing & orders control'}
              </p>
            </div>
          </div>

          <button
            onClick={onBackToStore}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Store className="w-4 h-4 text-amber-300" />
            <span>{isAr ? 'العودة للمتجر الرئيسي' : 'Back to Main Store'}</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-3 text-xs sm:text-sm font-bold">
          {[
            { id: 'trade-in', labelAr: `قسم البدل والتثمين (${tradeInModels.length})`, icon: RefreshCw, badge: newTradeInCount },
            { id: 'products', labelAr: `الأجهزة والمنتجات (${products.length})`, icon: Package },
            { id: 'orders', labelAr: `طلبات الشراء (${orders.length})`, icon: ShoppingBag, badge: pendingOrdersCount },
            { id: 'repairs', labelAr: `تذاكر الصيانة (${repairTickets.length})`, icon: Wrench },
            { id: 'repair-services', labelAr: 'أسعار الصيانة والقطع', icon: DollarSign },
            { id: 'hero', labelAr: `العروض والبذرات (${heroSlides.length})`, icon: ImageIcon },
            { id: 'analytics', labelAr: 'الإحصائيات المالية', icon: BarChart3 },
            { id: 'settings', labelAr: 'الإعدادات والتواصل', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive 
                    ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20' 
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.labelAr}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="bg-rose-500 text-white text-[10px] px-2 py-0.2 rounded-full font-black">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: TRADE-IN & VALUATION CONTROL */}
        {activeTab === 'trade-in' && (
          <div className="space-y-8">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 p-6 rounded-3xl border border-emerald-500/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-amber-400 font-extrabold text-xs bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 mb-2 inline-block">
                  التحكم المباشر في حاسبة البدل والتثمين
                </span>
                <h2 className="text-xl font-black text-white">قسم "بدّل جهازك المستعمل وأحضر الجديد اليوم بأعلى تقييم سوقي"</h2>
                <p className="text-xs text-slate-300 mt-1">
                  يمكنك هنا تعديل القيمة الأساسية لكل موديل، إضافة موديلات جديدة، ومتابعة طلبات حجز موعد البدل المقدمة من العملاء.
                </p>
              </div>

              <button
                onClick={() => openTradeInModelForm()}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-5 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة موديل جهاز جديد للبدل</span>
              </button>
            </div>

            {/* Section A: Incoming Customer Trade-In Requests */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-extrabold text-amber-300 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>طلبات حجز موعد البدل المسجلة أونلاين ({tradeInRequests.length})</span>
                </span>
                <span className="text-xs text-slate-400">الطلبات الجديدة: {newTradeInCount}</span>
              </div>

              {tradeInRequests.length === 0 ? (
                <div className="bg-slate-900 p-8 text-center rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-400">
                  <RefreshCw className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="font-extrabold text-white text-sm">لا توجد طلبات بدل جديدة حالياً</p>
                  <p>عندما يقوم أي عميل بتثمين جهازه وحجز موعد ستظهر كافة بياناته ورقم تليفونه هنا فوراً.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tradeInRequests.map((req) => (
                    <div key={req.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3 relative">
                      <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                        <div>
                          <p className="font-black text-white text-sm">{req.customerName}</p>
                          <a href={`tel:${req.customerPhone}`} className="text-emerald-400 font-mono text-xs hover:underline flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3" />
                            <span>{req.customerPhone}</span>
                          </a>
                        </div>

                        <div className="text-left">
                          <span className="font-mono font-black text-amber-300 text-lg">{formatPrice(req.estimatedValueEgp)}</span>
                          <p className="text-[10px] text-slate-400">تقييم تثمين البدل</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                        <div>
                          <span className="text-slate-400 block text-[10px]">الجهاز المستعمل:</span>
                          <span className="font-bold text-white">{req.deviceModel} ({req.storage})</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">الحالة والبطارية:</span>
                          <span className="font-bold text-emerald-400">{req.conditionGrade} | {req.batteryHealth}%</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-xs">
                        <span className="text-slate-500 text-[10px]">{req.createdAt}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 text-[11px]">الحالة:</span>
                          <select
                            value={req.status}
                            onChange={(e) => onUpdateTradeInRequestStatus(req.id, e.target.value as any)}
                            className="bg-slate-950 border border-slate-700 text-amber-300 font-extrabold text-xs rounded-xl p-1.5 focus:outline-none"
                          >
                            <option value="New">🔴 جديد (New)</option>
                            <option value="Contacted">📞 تم الاتصال بالعميل</option>
                            <option value="Completed">✅ تم البدل بالفرع</option>
                            <option value="Cancelled">❌ ملغي</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Section B: Trade-In Base Models & Valuation Rates */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-extrabold text-amber-300 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <span>أسعار البدل الأساسية المعتمدة بالحاسبة ({tradeInModels.length} موديل)</span>
                <span className="text-xs text-slate-400">تعديل أي سعر ينعكس فوراً في حاسبة العميل بالمتجر</span>
              </div>

              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-extrabold uppercase">
                      <tr>
                        <th className="p-3.5">موديل الجهاز بالمتجر</th>
                        <th className="p-3.5">الفئة</th>
                        <th className="p-3.5">السعر الأساسي للتثمين (EGP)</th>
                        <th className="p-3.5 text-center">التحكم والتعديل</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 font-semibold">
                      {tradeInModels.map((model) => (
                        <tr key={model.id} className="hover:bg-slate-800/50 transition-colors">
                          <td className="p-3.5">
                            <p className="font-extrabold text-white">{model.nameAr}</p>
                            <p className="text-[11px] text-slate-400">{model.name}</p>
                          </td>

                          <td className="p-3.5">
                            <span className="bg-slate-800 text-emerald-400 px-2.5 py-1 rounded-lg text-[11px] font-bold border border-slate-700">
                              {model.category.toUpperCase()}
                            </span>
                          </td>

                          <td className="p-3.5 font-black text-amber-300 text-sm">
                            {formatPrice(model.baseValueEgp)}
                          </td>

                          <td className="p-3.5 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => openTradeInModelForm(model)}
                                className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl transition-colors border border-slate-700"
                                title="تعديل السعر الأساسي"
                              >
                                <Edit className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => {
                                  if (confirm(`حذف الموديل "${model.nameAr}" من حاسبة البدل؟`)) {
                                    onDeleteTradeInModel(model.id);
                                  }
                                }}
                                className="p-2 bg-slate-800 hover:bg-rose-950 text-rose-400 rounded-xl transition-colors border border-slate-700"
                                title="حذف الموديل"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-80">
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="ابحث باسم الجهاز..."
                    className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl py-2.5 px-3 pr-8 focus:outline-none focus:border-amber-400"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>

                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-2.5 font-bold focus:outline-none"
                >
                  <option value="all">جميع الأقسام</option>
                  <option value="iphones">آيفون (iPhones)</option>
                  <option value="macs">ماك بوك (Macs)</option>
                  <option value="ipads">آيباد (iPads)</option>
                  <option value="watches">ساعات (Watches)</option>
                  <option value="audio">آوديو (Audio)</option>
                  <option value="accessories">إكسسوارات</option>
                  <option value="used">الأجهزة المستعملة</option>
                </select>
              </div>

              <button
                onClick={() => openProductForm()}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 w-full sm:w-auto justify-center"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة منتج أو جهاز جديد</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-extrabold uppercase">
                    <tr>
                      <th className="p-3.5">الجهاز</th>
                      <th className="p-3.5">القسم</th>
                      <th className="p-3.5">السعر الرئيسي</th>
                      <th className="p-3.5">الحالة / البطارية</th>
                      <th className="p-3.5">الكمية بالمخزن</th>
                      <th className="p-3.5 text-center">التحكم والعمليات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-semibold">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3.5 flex items-center gap-3">
                          <img
                            src={product.images[0]}
                            alt={product.nameAr}
                            className="w-12 h-12 object-contain bg-slate-950 p-1 rounded-xl border border-slate-700"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="font-extrabold text-white text-xs">{product.nameAr}</p>
                            <p className="text-[11px] text-slate-400">{product.name}</p>
                          </div>
                        </td>

                        <td className="p-3.5">
                          <span className="bg-slate-800 text-emerald-400 px-2.5 py-1 rounded-lg text-[11px] font-bold border border-slate-700">
                            {product.category.toUpperCase()}
                          </span>
                        </td>

                        <td className="p-3.5 font-black text-amber-300 text-sm">
                          {formatPrice(product.priceEgp)}
                        </td>

                        <td className="p-3.5">
                          <p className="text-white font-bold">{product.condition}</p>
                          {product.batteryHealth && (
                            <p className="text-[10px] text-emerald-400">بطارية {product.batteryHealth}%</p>
                          )}
                        </td>

                        <td className="p-3.5">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            product.stockCount > 0 ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400'
                          }`}>
                            {product.stockCount} قطعة
                          </span>
                        </td>

                        <td className="p-3.5 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => openProductForm(product)}
                              className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl transition-colors border border-slate-700"
                              title="تعديل الجهاز"
                            >
                              <Edit className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`هل أنت تأكد من حذف الجهاز "${product.nameAr}"؟`)) {
                                  onDeleteProduct(product.id);
                                }
                              }}
                              className="p-2 bg-slate-800 hover:bg-rose-950 text-rose-400 rounded-xl transition-colors border border-slate-700"
                              title="حذف الجهاز"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex justify-between items-center text-xs font-bold text-slate-300">
              <span>إدارة طلبات الشراء المسجلة عبر السلة والتوصيل للمحافظات</span>
              <span>إجمالي الطلبات: {orders.length}</span>
            </div>

            {orders.length === 0 ? (
              <div className="bg-slate-900 p-12 text-center rounded-2xl border border-slate-800 space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="font-extrabold text-white text-base">لا توجد طلبات شراء مسجلة حالياً</p>
                <p className="text-xs text-slate-400">سيتم إدراج أي طلب شراء جديد يقوم العميل بطلبه من المتجر هنا فوراً</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.orderCode} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-3">
                      <div>
                        <span className="font-mono font-black text-amber-400 text-sm bg-slate-950 px-3 py-1 rounded-lg border border-amber-500/30">
                          {order.orderCode}
                        </span>
                        <span className="text-slate-400 text-xs mr-3">{order.createdAt}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-300 font-bold">تحديث الحالة:</span>
                        <select
                          value={order.status}
                          onChange={(e) => onUpdateOrderStatus(order.orderCode, e.target.value as any)}
                          className="bg-slate-950 border border-slate-700 text-xs font-black rounded-xl p-2 text-amber-300 focus:outline-none"
                        >
                          <option value="Pending">🕒 قيد المراجعة (Pending)</option>
                          <option value="Shipped">🚚 تم الشحن مع المندوب (Shipped)</option>
                          <option value="Delivered">✅ تم التسليم بنجاح (Delivered)</option>
                          <option value="Cancelled">❌ ملغي (Cancelled)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <p className="text-slate-400 font-bold mb-1">بيانات العميل:</p>
                        <p className="font-extrabold text-white">{order.customerName}</p>
                        <a href={`tel:${order.customerPhone}`} className="text-emerald-400 font-mono mt-0.5 inline-block hover:underline">
                          {order.customerPhone}
                        </a>
                      </div>

                      <div>
                        <p className="text-slate-400 font-bold mb-1">عنوان التسليم وشحن المحافظة:</p>
                        <p className="text-slate-200">{order.customerAddress}</p>
                        <p className="text-amber-300 font-bold mt-0.5">طريقة الدفع: {order.paymentMethod.toUpperCase()}</p>
                      </div>

                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-left">
                        <p className="text-slate-400 font-bold">المبلغ الإجمالي:</p>
                        <p className="text-xl font-black text-emerald-400">{formatPrice(order.totalEgp)}</p>
                        <p className="text-[11px] text-slate-300 mt-1">{order.itemsSummary}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: REPAIR TICKETS MANAGEMENT */}
        {activeTab === 'repairs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div>
                <h3 className="font-extrabold text-white text-sm">إدارة كروت وتذاكر الصيانة بالفرع</h3>
                <p className="text-xs text-slate-400">تتبع وحدث حالة أجهزة العملاء ليتمكنوا من معرفتها أونلاين</p>
              </div>

              <button
                onClick={() => setIsTicketModalOpen(true)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>إنشاء تذكرة صيانة جديدة</span>
              </button>
            </div>

            <div className="space-y-4">
              {repairTickets.map((ticket) => (
                <div key={ticket.ticketCode} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-black text-amber-300 text-sm bg-slate-950 px-3 py-1 rounded-lg border border-amber-500/30">
                        {ticket.ticketCode}
                      </span>
                      <span className="font-black text-white text-sm">{ticket.deviceModel}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-300 font-bold">مرحلة الصيانة الحالية:</span>
                      <select
                        value={ticket.status}
                        onChange={(e) => onUpdateRepairTicketStatus(ticket.ticketCode, e.target.value as any)}
                        className="bg-slate-950 border border-slate-700 text-xs font-black rounded-xl p-2 text-emerald-400 focus:outline-none"
                      >
                        <option value="Received">1. تم الاستلام بالفرع (Received)</option>
                        <option value="Diagnostic">2. فحص مهندسي (Diagnostic)</option>
                        <option value="Repairing">3. تركيب القطع الأصلية (Repairing)</option>
                        <option value="Testing">4. اختبار الكفاءة والجودة (Testing)</option>
                        <option value="Ready for Pickup">5. جاهز للتسليم للعميل (Ready for Pickup)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <p className="text-slate-400 font-bold">بيانات العميل:</p>
                      <p className="font-extrabold text-white">{ticket.customerName}</p>
                      <a href={`tel:${ticket.customerPhone}`} className="text-emerald-400 font-mono hover:underline">{ticket.customerPhone}</a>
                    </div>

                    <div>
                      <p className="text-slate-400 font-bold">وصف العطل والخدمة المطلوبة:</p>
                      <p className="text-slate-200">{ticket.issueDescription}</p>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-left">
                      <p className="text-slate-400 font-bold">التكلفة التقديرية:</p>
                      <p className="text-xl font-black text-emerald-400">{formatPrice(ticket.estimatedCostEgp)}</p>
                      <p className="text-[10px] text-slate-400">{ticket.createdAt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: REPAIR SERVICES PRICING */}
        {activeTab === 'repair-services' && (
          <div className="space-y-6">
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex justify-between items-center text-xs font-bold text-slate-300">
              <span>تعديل قائمة أسعار تغيير الشاشات والبطاريات والباغة الأصلية</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repairServices.map((service) => (
                <div key={service.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="font-black text-amber-300 text-sm">{service.modelName}</span>
                    <span className="font-black text-emerald-400 text-lg">{formatPrice(service.estimatedPriceEgp)}</span>
                  </div>

                  <p className="font-extrabold text-xs text-white">{service.issueNameAr}</p>
                  <p className="text-slate-400 text-xs leading-relaxed">{service.descriptionAr}</p>

                  <div className="flex justify-between items-center pt-3 border-t border-slate-800 text-xs">
                    <span className="text-slate-400">الضمان: {service.warrantyMonths} أشهر | المدة: {service.estimatedTimeMinutes} دقيقة</span>
                    <button
                      onClick={() => {
                        setEditingService(service);
                        setSPriceEgp(service.estimatedPriceEgp);
                      }}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-1.5 rounded-xl text-xs flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>تعديل السعر</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: HERO BANNERS MANAGEMENT */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div>
                <h3 className="font-extrabold text-white text-sm">إدارة شلايدر والعروض الرئيسية بالصفحة الأولى</h3>
                <p className="text-xs text-slate-400">إضافة أو حذف بنرات العروض الترويجية المصورة</p>
              </div>

              <button
                onClick={() => setIsHeroModalOpen(true)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة بنر عرض جديد</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {heroSlides.map((slide) => (
                <div key={slide.id} className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden space-y-4 p-5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-44 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative">
                      <img src={slide.image} alt={slide.titleAr} className="w-full h-full object-cover" />
                      <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-black text-[10px] px-3 py-1 rounded-full shadow">
                        {slide.badgeAr}
                      </span>
                    </div>

                    <h4 className="font-black text-white text-base">{slide.titleAr}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{slide.subtitleAr}</p>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                    <span className="text-emerald-400 text-xs font-bold">{slide.ctaAr}</span>
                    <button
                      onClick={() => onDeleteHeroSlide(slide.id)}
                      className="p-2 bg-slate-800 hover:bg-rose-950 text-rose-400 rounded-xl transition-colors"
                      title="حذف البنر"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-slate-400 text-xs font-bold">
                  <span>إجمالي المبيعات التقديرية</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-2xl font-black text-emerald-400 tracking-tight">{formatPrice(totalRevenueEgp)}</p>
                <p className="text-[10px] text-slate-400">تراكمي المبيعات الحية والأونلاين</p>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-slate-400 text-xs font-bold">
                  <span>طلبات الشراء الحالية</span>
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-2xl font-black text-amber-300 tracking-tight">{orders.length} طلب</p>
                <p className="text-[10px] text-rose-400 font-bold">{pendingOrdersCount} طلبات بانتظار الشحن</p>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-slate-400 text-xs font-bold">
                  <span>الأجهزة المتوفرة بالمخزون</span>
                  <Package className="w-4 h-4 text-teal-400" />
                </div>
                <p className="text-2xl font-black text-white tracking-tight">{totalInStockCount} قطعة</p>
                <p className="text-[10px] text-emerald-400">موزعة على {products.length} موديل مختلف</p>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-slate-400 text-xs font-bold">
                  <span>تذاكر الصيانة بالفرع</span>
                  <Wrench className="w-4 h-4 text-amber-500" />
                </div>
                <p className="text-2xl font-black text-amber-400 tracking-tight">{repairTickets.length} تذكرة</p>
                <p className="text-[10px] text-slate-400">قيد الفحص والتركيب المباشر</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: SETTINGS & STORE CONTACTS */}
        {activeTab === 'settings' && (
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6 max-w-3xl">
            <h3 className="font-black text-lg text-white">إعدادات المتجر وشريط العروض وأرقام التواصل</h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1.5">نص الشريط الإعلاني العلوي للمتجر:</label>
                <input
                  type="text"
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-bold block mb-1.5">رقم خدمة العملاء المباشر:</label>
                  <input
                    type="text"
                    value={storePhone}
                    onChange={(e) => setStorePhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1.5">رقم الواتساب الرسمي (WhatsApp):</label>
                  <input
                    type="text"
                    value={storeWhatsApp}
                    onChange={(e) => setStoreWhatsApp(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="p-4 bg-emerald-950/80 rounded-2xl border border-emerald-500/30 text-emerald-200 leading-relaxed">
                <p className="font-bold mb-1">💡 ملحوظة التحكم:</p>
                <p>أي تعديل تقوم به في الأجهزة، أسعار البدل، أو العروض ينعكس مباشرة فوراً في تجربة تصفح العميل بالفرع والموقع.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: ADD / EDIT TRADE-IN MODEL */}
      {isTradeInModelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 text-white rounded-3xl max-w-md w-full p-6 space-y-5 border border-slate-700 relative shadow-2xl">
            <button
              onClick={() => setIsTradeInModelModalOpen(false)}
              className="absolute top-4 left-4 p-2 bg-slate-800 text-slate-400 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-black text-base text-amber-300">
              {editingTradeInModel ? 'تعديل موديل البدل' : 'إضافة موديل جديد لحاسبة البدل والتثمين'}
            </h3>

            <form onSubmit={handleSaveTradeInModel} className="space-y-4 text-xs text-right">
              <div>
                <label className="font-bold text-slate-300 block mb-1">اسم الجهاز بالعربية:</label>
                <input
                  type="text"
                  required
                  value={tmNameAr}
                  onChange={(e) => setTmNameAr(e.target.value)}
                  placeholder="آيفون 16 برو ماكس"
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">اسم الجهاز بالإنجليزية:</label>
                <input
                  type="text"
                  value={tmNameEn}
                  onChange={(e) => setTmNameEn(e.target.value)}
                  placeholder="iPhone 16 Pro Max"
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">السعر الأساسي للتثمين (ج.م):</label>
                <input
                  type="number"
                  required
                  value={tmBaseValEgp}
                  onChange={(e) => setTmBaseValEgp(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 text-amber-300 font-bold text-base rounded-xl p-3 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">الفئة:</label>
                <select
                  value={tmCategory}
                  onChange={(e) => setTmCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 font-bold focus:outline-none"
                >
                  <option value="iphone">آيفون (iPhone)</option>
                  <option value="mac">ماك بوك (MacBook)</option>
                  <option value="ipad">آيباد (iPad)</option>
                  <option value="watch">ساعة أبل (Apple Watch)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm py-3 rounded-xl transition-all shadow-lg"
              >
                {editingTradeInModel ? 'حفظ تعديل الموديل' : 'إضافة الموديل فوراً للحاسبة'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD HERO SLIDE */}
      {isHeroModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 text-white rounded-3xl max-w-lg w-full p-6 space-y-5 border border-slate-700 relative shadow-2xl">
            <button
              onClick={() => setIsHeroModalOpen(false)}
              className="absolute top-4 left-4 p-2 bg-slate-800 text-slate-400 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-black text-base text-amber-300">إضافة بنر عرض ترويجي جديد</h3>

            <form onSubmit={handleSaveHeroSlide} className="space-y-3 text-xs text-right">
              <div>
                <label className="font-bold text-slate-300 block mb-1">العنوان الرئيسي:</label>
                <input
                  type="text"
                  required
                  value={hsTitleAr}
                  onChange={(e) => setHsTitleAr(e.target.value)}
                  placeholder="خصومات الصيف على أجهزة الآيفون"
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">الوصف الفرعي:</label>
                <input
                  type="text"
                  value={hsSubtitleAr}
                  onChange={(e) => setHsSubtitleAr(e.target.value)}
                  placeholder="وفر حتى 5000 ج.م عند الشراء بالتقسيط..."
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">شارة العرض (Badge):</label>
                  <input
                    type="text"
                    value={hsBadgeAr}
                    onChange={(e) => setHsBadgeAr(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">نص الزر (CTA):</label>
                  <input
                    type="text"
                    value={hsCtaAr}
                    onChange={(e) => setHsCtaAr(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">رابط الصورة (Image URL):</label>
                <input
                  type="url"
                  value={hsImageUrl}
                  onChange={(e) => setHsImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs py-3 rounded-xl transition-all shadow-lg"
              >
                حفظ وإدراج البنر
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT PRODUCT */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 border border-slate-700 relative shadow-2xl my-8">
            <button
              onClick={() => setIsProductModalOpen(false)}
              className="absolute top-4 left-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-black text-lg text-amber-300">
              {editingProduct ? 'تعديل بيانات الجهاز' : 'إضافة جهاز أو منتج جديد للمتجر'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs text-right">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">اسم الجهاز بالعربية:</label>
                  <input
                    type="text"
                    required
                    value={pNameAr}
                    onChange={(e) => setPNameAr(e.target.value)}
                    placeholder="مثال: آيفون 16 برو ماكس 256 جيجا"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">اسم الجهاز بالإنجليزية:</label>
                  <input
                    type="text"
                    value={pNameEn}
                    onChange={(e) => setPNameEn(e.target.value)}
                    placeholder="iPhone 16 Pro Max 256GB"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">القسم:</label>
                  <select
                    value={pCategory}
                    onChange={(e) => setPCategory(e.target.value as CategoryId)}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 font-bold focus:outline-none"
                  >
                    <option value="iphones">آيفون (iPhones)</option>
                    <option value="macs">ماك بوك (Macs)</option>
                    <option value="ipads">آيباد (iPads)</option>
                    <option value="watches">ساعات (Watches)</option>
                    <option value="audio">آوديو (Audio)</option>
                    <option value="accessories">إكسسوارات</option>
                    <option value="used">الأجهزة المستعملة (Used)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">السعر المباشر (ج.م):</label>
                  <input
                    type="number"
                    required
                    value={pPriceEgp}
                    onChange={(e) => setPPriceEgp(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 text-amber-300 font-bold rounded-xl p-3 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">السعر قبل الخصم (ج.م):</label>
                  <input
                    type="number"
                    value={pOriginalPriceEgp}
                    onChange={(e) => setPOriginalPriceEgp(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-300 font-bold rounded-xl p-3 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">حالة الجهاز:</label>
                  <select
                    value={pCondition}
                    onChange={(e) => setPCondition(e.target.value as ProductCondition)}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 font-bold focus:outline-none"
                  >
                    <option value="New">جديد بالعلبة الأصلي</option>
                    <option value="Like New (99%)">مستعمل كأنه جديد 99%</option>
                    <option value="Grade A+ (95%)">فرز أول أوريجينال 95%</option>
                    <option value="Refurbished">مجدد معتمد</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">نسبة البطارية (إن وجد):</label>
                  <input
                    type="number"
                    min={80}
                    max={100}
                    value={pBatteryHealth}
                    onChange={(e) => setPBatteryHealth(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 text-emerald-400 font-bold rounded-xl p-3 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">الكمية بالمخزن:</label>
                  <input
                    type="number"
                    value={pStockCount}
                    onChange={(e) => setPStockCount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 text-white font-bold rounded-xl p-3 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">رابط صورة الجهاز (URL Image):</label>
                <input
                  type="url"
                  value={pImageUrl}
                  onChange={(e) => setPImageUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">الوصف والمواصفات المرفقة:</label>
                <textarea
                  rows={2}
                  value={pDescriptionAr}
                  onChange={(e) => setPDescriptionAr(e.target.value)}
                  placeholder="وصف إبداعي للجهاز ومكونات العلبة..."
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm py-3.5 rounded-xl shadow-lg transition-all"
              >
                {editingProduct ? 'حفظ التعديلات' : 'إضافة الجهاز فوراً للمتجر'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD REPAIR TICKET */}
      {isTicketModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 text-white rounded-3xl max-w-md w-full p-6 space-y-5 border border-slate-700 relative shadow-2xl">
            <button
              onClick={() => setIsTicketModalOpen(false)}
              className="absolute top-4 left-4 p-2 bg-slate-800 text-slate-400 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-black text-base text-amber-300">إنشاء كارت صيانة جديد لعميل الفرع</h3>

            <form onSubmit={handleSaveTicket} className="space-y-3 text-xs text-right">
              <div>
                <label className="font-bold text-slate-300 block mb-1">اسم العميل:</label>
                <input
                  type="text"
                  required
                  value={tCustomerName}
                  onChange={(e) => setTCustomerName(e.target.value)}
                  placeholder="أحمد محمود"
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">رقم المحمول:</label>
                <input
                  type="tel"
                  required
                  value={tCustomerPhone}
                  onChange={(e) => setTCustomerPhone(e.target.value)}
                  placeholder="010XXXXXXXX"
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">موديل الجهاز:</label>
                <input
                  type="text"
                  required
                  value={tDeviceModel}
                  onChange={(e) => setTDeviceModel(e.target.value)}
                  placeholder="iPhone 15 Pro Max"
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">العطل الملاحظ والتكلفة:</label>
                <textarea
                  rows={2}
                  value={tIssueDesc}
                  onChange={(e) => setTIssueDesc(e.target.value)}
                  placeholder="استبدال شاشة أصلية مع نقل خاصية TrueTone..."
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">التكلفة التقديرية (ج.م):</label>
                <input
                  type="number"
                  value={tEstimatedCost}
                  onChange={(e) => setTEstimatedCost(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 text-amber-300 font-bold rounded-xl p-3 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-3 rounded-xl transition-all"
              >
                تأكيد وطباعة الكارت الرقمي
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT SERVICE PRICE */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 text-white rounded-3xl max-w-sm w-full p-6 space-y-4 border border-slate-700 relative shadow-2xl">
            <button
              onClick={() => setEditingService(null)}
              className="absolute top-4 left-4 p-2 bg-slate-800 text-slate-400 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-black text-sm text-amber-300">تعديل سعر خدمة الصيانة</h3>
            <p className="text-xs text-slate-300">{editingService.modelName} - {editingService.issueNameAr}</p>

            <form onSubmit={handleSaveServicePrice} className="space-y-3 text-xs text-right">
              <div>
                <label className="font-bold text-slate-300 block mb-1">السعر الجديد (ج.م):</label>
                <input
                  type="number"
                  required
                  value={sPriceEgp}
                  onChange={(e) => setSPriceEgp(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 text-emerald-400 font-black text-lg rounded-xl p-3 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs py-3 rounded-xl transition-all"
              >
                تحديث السعر فوراً
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
