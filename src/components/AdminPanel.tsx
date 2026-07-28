import React, { useState } from 'react';
import { 
  LayoutDashboard, ShoppingBag, Wrench, RefreshCw, Settings, Plus, 
  Trash2, Edit, Check, Search, AlertCircle, ArrowLeft, ShieldCheck, 
  DollarSign, Package, Users, Truck, Clock, Sparkles, X, ChevronDown, 
  BarChart3, Store, Eye, Tag, Phone, MapPin, Save, Image as ImageIcon, Send, Grid
} from 'lucide-react';
import { 
  Product, RepairService, RepairTicket, Language, Currency, CategoryId, ProductCondition,
  TradeInModel, TradeInRequest, HeroSlide, StoreBranch, StoreCategory
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
  onDeleteRepairService?: (id: string) => void;
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
  // Store Branches Management
  storeBranches: StoreBranch[];
  onAddStoreBranch: (branch: StoreBranch) => void;
  onUpdateStoreBranch: (branch: StoreBranch) => void;
  onDeleteStoreBranch: (id: string) => void;
  // Store Categories Management
  storeCategories: StoreCategory[];
  onAddStoreCategory: (category: StoreCategory) => void;
  onUpdateStoreCategory: (category: StoreCategory) => void;
  onDeleteStoreCategory: (id: string) => void;
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
  onDeleteRepairService,
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
  storeBranches,
  onAddStoreBranch,
  onUpdateStoreBranch,
  onDeleteStoreBranch,
  storeCategories,
  onAddStoreCategory,
  onUpdateStoreCategory,
  onDeleteStoreCategory,
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
    'analytics' | 'categories' | 'trade-in' | 'products' | 'orders' | 'repairs' | 'repair-services' | 'hero' | 'branches' | 'settings'
  >('categories');

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

  // Edit Service Price & Full Repair Service Modal
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<RepairService | null>(null);
  const [rsDeviceType, setRsDeviceType] = useState<'iphone' | 'ipad' | 'mac' | 'watch'>('iphone');
  const [rsModelName, setRsModelName] = useState('');
  const [rsIssueNameAr, setRsIssueNameAr] = useState('');
  const [rsIssueNameEn, setRsIssueNameEn] = useState('');
  const [rsPriceEgp, setRsPriceEgp] = useState<number>(2500);
  const [rsTimeMinutes, setRsTimeMinutes] = useState<number>(45);
  const [rsWarrantyMonths, setRsWarrantyMonths] = useState<number>(6);
  const [rsDescriptionAr, setRsDescriptionAr] = useState('');
  const [rsFilterDeviceType, setRsFilterDeviceType] = useState<string>('all');
  const [rsSearchQuery, setRsSearchQuery] = useState<string>('');

  const openServiceForm = (serviceToEdit?: RepairService) => {
    if (serviceToEdit) {
      setEditingService(serviceToEdit);
      setRsDeviceType(serviceToEdit.deviceType);
      setRsModelName(serviceToEdit.modelName);
      setRsIssueNameAr(serviceToEdit.issueNameAr);
      setRsIssueNameEn(serviceToEdit.issueName || serviceToEdit.issueNameAr);
      setRsPriceEgp(serviceToEdit.estimatedPriceEgp);
      setRsTimeMinutes(serviceToEdit.estimatedTimeMinutes || 45);
      setRsWarrantyMonths(serviceToEdit.warrantyMonths || 6);
      setRsDescriptionAr(serviceToEdit.descriptionAr || '');
    } else {
      setEditingService(null);
      setRsDeviceType('iphone');
      setRsModelName('');
      setRsIssueNameAr('');
      setRsIssueNameEn('');
      setRsPriceEgp(2500);
      setRsTimeMinutes(45);
      setRsWarrantyMonths(6);
      setRsDescriptionAr('');
    }
    setIsServiceModalOpen(true);
  };

  const handleSaveRepairService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsModelName.trim() || !rsIssueNameAr.trim()) return;

    if (editingService) {
      onUpdateRepairService({
        ...editingService,
        deviceType: rsDeviceType,
        modelName: rsModelName.trim(),
        issueNameAr: rsIssueNameAr.trim(),
        issueName: rsIssueNameEn.trim() || rsIssueNameAr.trim(),
        estimatedPriceEgp: Number(rsPriceEgp),
        estimatedTimeMinutes: Number(rsTimeMinutes),
        warrantyMonths: Number(rsWarrantyMonths),
        descriptionAr: rsDescriptionAr.trim() || `خدمة ${rsIssueNameAr} بقطع غيار أصلية ضمان ${rsWarrantyMonths} أشهر.`
      });
    } else {
      const newService: RepairService = {
        id: `rep-${Date.now()}`,
        deviceType: rsDeviceType,
        modelName: rsModelName.trim(),
        issueNameAr: rsIssueNameAr.trim(),
        issueName: rsIssueNameEn.trim() || rsIssueNameAr.trim(),
        estimatedPriceEgp: Number(rsPriceEgp),
        estimatedTimeMinutes: Number(rsTimeMinutes),
        warrantyMonths: Number(rsWarrantyMonths),
        descriptionAr: rsDescriptionAr.trim() || `خدمة ${rsIssueNameAr} بقطع غيار أصلية ضمان ${rsWarrantyMonths} أشهر.`
      };
      onAddRepairService(newService);
    }
    setIsServiceModalOpen(false);
  };

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

  // Branch Modal State
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<StoreBranch | null>(null);
  const [bNameAr, setBNameAr] = useState('');
  const [bNameEn, setBNameEn] = useState('');
  const [bCityAr, setBCityAr] = useState('');
  const [bCityEn, setBCityEn] = useState('');
  const [bAddressAr, setBAddressAr] = useState('');
  const [bAddressEn, setBAddressEn] = useState('');
  const [bPhone, setBPhone] = useState('');
  const [bWhatsapp, setBWhatsapp] = useState('');
  const [bHoursAr, setBHoursAr] = useState('');
  const [bHoursEn, setBHoursEn] = useState('');

  const openBranchForm = (branchToEdit?: StoreBranch) => {
    if (branchToEdit) {
      setEditingBranch(branchToEdit);
      setBNameAr(branchToEdit.nameAr);
      setBNameEn(branchToEdit.name);
      setBCityAr(branchToEdit.cityAr);
      setBCityEn(branchToEdit.city);
      setBAddressAr(branchToEdit.addressAr);
      setBAddressEn(branchToEdit.address);
      setBPhone(branchToEdit.phone);
      setBWhatsapp(branchToEdit.whatsapp);
      setBHoursAr(branchToEdit.hoursAr);
      setBHoursEn(branchToEdit.hours);
    } else {
      setEditingBranch(null);
      setBNameAr('');
      setBNameEn('');
      setBCityAr('القاهرة');
      setBCityEn('Cairo');
      setBAddressAr('');
      setBAddressEn('');
      setBPhone('01012345678');
      setBWhatsapp('201012345678');
      setBHoursAr('يومياً من 11:00 صباحاً حتى 11:00 مساءً');
      setBHoursEn('11:00 AM - 11:00 PM Daily');
    }
    setIsBranchModalOpen(true);
  };

  const handleSaveBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bNameAr || !bAddressAr || !bPhone) return;

    if (editingBranch) {
      onUpdateStoreBranch({
        ...editingBranch,
        nameAr: bNameAr,
        name: bNameEn || bNameAr,
        cityAr: bCityAr || 'القاهرة',
        city: bCityEn || 'Cairo',
        addressAr: bAddressAr,
        address: bAddressEn || bAddressAr,
        phone: bPhone,
        whatsapp: bWhatsapp || bPhone,
        hoursAr: bHoursAr || 'يومياً من 11:00 صباحاً حتى 11:00 مساءً',
        hours: bHoursEn || '11:00 AM - 11:00 PM'
      });
    } else {
      const newBranch: StoreBranch = {
        id: `branch-${Date.now()}`,
        nameAr: bNameAr,
        name: bNameEn || bNameAr,
        cityAr: bCityAr || 'القاهرة',
        city: bCityEn || 'Cairo',
        addressAr: bAddressAr,
        address: bAddressEn || bAddressAr,
        phone: bPhone,
        whatsapp: bWhatsapp || bPhone,
        hoursAr: bHoursAr || 'يومياً من 11:00 صباحاً حتى 11:00 مساءً',
        hours: bHoursEn || '11:00 AM - 11:00 PM'
      };
      onAddStoreBranch(newBranch);
    }
    setIsBranchModalOpen(false);
  };

  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<StoreCategory | null>(null);
  const [catId, setCatId] = useState('');
  const [catNameAr, setCatNameAr] = useState('');
  const [catNameEn, setCatNameEn] = useState('');
  const [catDescAr, setCatDescAr] = useState('');
  const [catBadgeAr, setCatBadgeAr] = useState('');
  const [catBgImage, setCatBgImage] = useState('');
  const [catIconName, setCatIconName] = useState('Grid');

  const openCategoryForm = (categoryToEdit?: StoreCategory) => {
    if (categoryToEdit) {
      setEditingCategory(categoryToEdit);
      setCatId(categoryToEdit.id);
      setCatNameAr(categoryToEdit.nameAr);
      setCatNameEn(categoryToEdit.nameEn);
      setCatDescAr(categoryToEdit.descriptionAr || '');
      setCatBadgeAr(categoryToEdit.badgeAr || '');
      setCatBgImage(categoryToEdit.bgImage || '');
      setCatIconName(categoryToEdit.iconName || 'Grid');
    } else {
      setEditingCategory(null);
      setCatId('');
      setCatNameAr('');
      setCatNameEn('');
      setCatDescAr('');
      setCatBadgeAr('');
      setCatBgImage('');
      setCatIconName('Grid');
    }
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catNameAr.trim()) return;

    const finalId = editingCategory 
      ? editingCategory.id 
      : (catId.trim().toLowerCase().replace(/\s+/g, '-') || `cat-${Date.now()}`);

    const categoryData: StoreCategory = {
      id: finalId,
      nameAr: catNameAr.trim(),
      nameEn: catNameEn.trim() || catNameAr.trim(),
      descriptionAr: catDescAr.trim(),
      descriptionEn: catDescAr.trim(),
      badgeAr: catBadgeAr.trim(),
      badgeEn: catBadgeAr.trim(),
      bgImage: catBgImage.trim() || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop',
      iconName: catIconName
    };

    if (editingCategory) {
      onUpdateStoreCategory(categoryData);
    } else {
      onAddStoreCategory(categoryData);
    }
    setIsCategoryModalOpen(false);
  };

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
            { id: 'categories', labelAr: `أقسام الموقع (${storeCategories.length})`, icon: Grid },
            { id: 'trade-in', labelAr: `قسم البدل والتثمين (${tradeInModels.length})`, icon: RefreshCw, badge: newTradeInCount },
            { id: 'products', labelAr: `الأجهزة والمنتجات (${products.length})`, icon: Package },
            { id: 'orders', labelAr: `طلبات الشراء (${orders.length})`, icon: ShoppingBag, badge: pendingOrdersCount },
            { id: 'repairs', labelAr: `تذاكر الصيانة (${repairTickets.length})`, icon: Wrench },
            { id: 'repair-services', labelAr: 'أسعار الصيانة والقطع', icon: DollarSign },
            { id: 'hero', labelAr: `العروض والبذرات (${heroSlides.length})`, icon: ImageIcon },
            { id: 'branches', labelAr: `إدارة الفروع (${storeBranches.length})`, icon: MapPin },
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

        {/* TAB 0: WEBSITE CATEGORIES CONTROL */}
        {activeTab === 'categories' && (
          <div className="space-y-8">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-6 rounded-3xl border border-emerald-500/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-amber-400 font-extrabold text-xs bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 mb-2 inline-block">
                  التحكم المباشر في هيكل وأقسام المتجر
                </span>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Grid className="w-6 h-6 text-amber-400" />
                  <span>إدارة أقسام وتصنيفات الموقع (Categories Control)</span>
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  يمكنك هنا إضافة أقسام جديدة للموقع، تعديل مسميات وصور الأقسام الحالية، أو حذف الأقسام غير المرغوبة بسهولة.
                </p>
              </div>

              <button
                onClick={() => openCategoryForm()}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-5 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة قسم جديد للموقع</span>
              </button>
            </div>

            {/* Categories Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {storeCategories.map((cat) => (
                <div 
                  key={cat.id} 
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-5 flex flex-col justify-between space-y-4 hover:border-amber-500/50 transition-all group relative"
                >
                  <div className="relative h-28 rounded-xl overflow-hidden bg-slate-800">
                    <img 
                      src={cat.bgImage} 
                      alt={cat.nameAr} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80" 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <div className="absolute bottom-2 right-2 left-2 flex justify-between items-end">
                      <span className="bg-amber-500/90 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md">
                        {cat.badgeAr || 'قسم فعال'}
                      </span>
                      <span className="text-[10px] text-slate-300 font-mono bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                        {cat.id}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-white text-base text-right flex items-center justify-between">
                      <span>{cat.nameAr}</span>
                    </h3>
                    <p className="text-slate-400 text-xs text-right mt-0.5 font-mono">
                      {cat.nameEn}
                    </p>
                    {cat.descriptionAr && (
                      <p className="text-slate-400 text-[11px] text-right mt-2 line-clamp-2 bg-slate-950/50 p-2 rounded-lg border border-slate-800/80">
                        {cat.descriptionAr}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => openCategoryForm(cat)}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>تعديل</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`هل أنت تأكد من رغبتك في حذف قسم "${cat.nameAr}"؟`)) {
                          onDeleteStoreCategory(cat.id);
                        }
                      }}
                      className="bg-rose-900/40 hover:bg-rose-600 text-rose-300 hover:text-white p-2 rounded-xl transition-colors"
                      title="حذف القسم"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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

        {/* TAB 5: REPAIR SERVICES PRICING & MANAGEMENT */}
        {activeTab === 'repair-services' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 p-6 rounded-3xl border border-emerald-500/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-amber-400 font-extrabold text-xs bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 mb-2 inline-block">
                  كتالوج خدمات وأعطال الصيانة وقطع الغيار
                </span>
                <h2 className="text-xl font-black text-white">إضافة وتعديل خدمات الصيانة وأسعار القطع والضمان</h2>
                <p className="text-xs text-slate-300 mt-1">
                  يمكنك إضافة أنواع صيانة جديدة لموديلات أبل المختلفة (آيفون، ماك، آيباد، أبل ووتش) وتحديد التكلفة التقديرية ومدة الصيانة والضمان التي تظهر للعملاء.
                </p>
              </div>

              <button
                onClick={() => openServiceForm()}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-5 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة خدمة صيانة جديدة</span>
              </button>
            </div>

            {/* Filter & Search Bar for Repair Services */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {[
                  { id: 'all', label: 'جميع الأجهزة' },
                  { id: 'iphone', label: 'آيفون iPhone' },
                  { id: 'ipad', label: 'آيباد iPad' },
                  { id: 'mac', label: 'ماك بوك Mac' },
                  { id: 'watch', label: 'ساعة أبل Watch' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setRsFilterDeviceType(type.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-colors ${
                      rsFilterDeviceType === type.id
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[220px]">
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={rsSearchQuery}
                  onChange={(e) => setRsSearchQuery(e.target.value)}
                  placeholder="بحث عن موديل أو عطل..."
                  className="w-full bg-slate-950 border border-slate-800 pr-9 pl-3 py-1.5 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Repair Services Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {repairServices
                .filter((s) => rsFilterDeviceType === 'all' || s.deviceType === rsFilterDeviceType)
                .filter((s) => !rsSearchQuery || s.modelName.toLowerCase().includes(rsSearchQuery.toLowerCase()) || s.issueNameAr.includes(rsSearchQuery))
                .map((service) => (
                  <div key={service.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-emerald-500/50 transition-colors flex flex-col justify-between shadow-xl">
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-wider bg-slate-800 text-amber-300 px-2.5 py-1 rounded-full border border-slate-700">
                            {service.deviceType}
                          </span>
                          <span className="font-black text-amber-300 text-sm">{service.modelName}</span>
                        </div>
                        <span className="font-black text-emerald-400 text-base">{formatPrice(service.estimatedPriceEgp)}</span>
                      </div>

                      <p className="font-extrabold text-xs text-white">{service.issueNameAr}</p>
                      <p className="text-slate-400 text-[11px] leading-relaxed">{service.descriptionAr}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                        <span className="flex items-center gap-1 text-amber-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>المدة: {service.estimatedTimeMinutes} دقيقة</span>
                        </span>
                        <span className="flex items-center gap-1 text-emerald-400">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>الضمان: {service.warrantyMonths} أشهر</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openServiceForm(service)}
                          className="bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>تعديل</span>
                        </button>
                        {onDeleteRepairService && (
                          <button
                            onClick={() => onDeleteRepairService(service.id)}
                            className="bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/50 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>حذف</span>
                          </button>
                        )}
                      </div>
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

        {/* TAB 8: STORE BRANCHES MANAGEMENT */}
        {activeTab === 'branches' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 p-6 rounded-3xl border border-emerald-500/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-amber-400 font-extrabold text-xs bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 mb-2 inline-block">
                  إدارة فروع وسلسلة ومراكز صيانة SOLIMAN - MEGA SYSTEM
                </span>
                <h2 className="text-xl font-black text-white">إضافة، تعديل، وحذف فروع المتجر وأرقام التواصل والعناوين</h2>
                <p className="text-xs text-slate-300 mt-1">
                  يمكنك التحكم الكامل بعناوين الفروع، أرقام الهاتف، ساعات العمل، والتفاصيل التي تظهر للعملاء في أسفل الموقع وقسم حجز الصيانة.
                </p>
              </div>

              <button
                onClick={() => openBranchForm()}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-5 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة فرع جديد</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {storeBranches.map((branch) => (
                <div key={branch.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-emerald-500/50 transition-colors relative flex flex-col justify-between shadow-xl">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-white">{branch.nameAr}</h4>
                          <p className="text-[11px] text-slate-400 font-medium">{branch.name}</p>
                        </div>
                      </div>
                      <span className="bg-slate-800 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-700 shrink-0">
                        {branch.cityAr}
                      </span>
                    </div>

                    <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 space-y-2.5 text-xs">
                      <div className="flex items-start gap-2 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{branch.addressAr}</span>
                      </div>
                      <div className="flex items-center justify-between text-emerald-400 font-mono font-bold pt-1 border-t border-slate-800/60">
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{branch.phone}</span>
                        </div>
                        {branch.whatsapp && (
                          <span className="text-[10px] bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800/50">
                            واتساب: {branch.whatsapp}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{branch.hoursAr}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                    <button
                      onClick={() => openBranchForm(branch)}
                      className="bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>تعديل</span>
                    </button>
                    <button
                      onClick={() => onDeleteStoreBranch(branch.id)}
                      className="bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/50 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>حذف</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: SETTINGS & STORE CONTACTS */}
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
                    {storeCategories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nameAr} ({c.id})
                      </option>
                    ))}
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

      {/* MODAL: ADD / EDIT STORE BRANCH */}
      {isBranchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 text-white rounded-3xl max-w-lg w-full p-6 space-y-5 border border-slate-700 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsBranchModalOpen(false)}
              className="absolute top-4 left-4 p-2 bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-base text-amber-300">
                  {editingBranch ? 'تعديل بيانات الفرع' : 'إضافة فرع جديد للشبكة'}
                </h3>
                <p className="text-xs text-slate-400">أدخل تفاصيل العنوان وأرقام التواصل التي ستظهر للعملاء</p>
              </div>
            </div>

            <form onSubmit={handleSaveBranch} className="space-y-4 text-xs text-right">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">اسم الفرع (بالعربية): *</label>
                  <input
                    type="text"
                    required
                    value={bNameAr}
                    onChange={(e) => setBNameAr(e.target.value)}
                    placeholder="فرع الشيخ زايد (مول العرب)"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">اسم الفرع (بالإنجليزية):</label>
                  <input
                    type="text"
                    value={bNameEn}
                    onChange={(e) => setBNameEn(e.target.value)}
                    placeholder="Sheikh Zayed Branch"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">المحافظة / المدينة (بالعربية):</label>
                  <input
                    type="text"
                    required
                    value={bCityAr}
                    onChange={(e) => setBCityAr(e.target.value)}
                    placeholder="الجيزة"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">City (In English):</label>
                  <input
                    type="text"
                    value={bCityEn}
                    onChange={(e) => setBCityEn(e.target.value)}
                    placeholder="Giza"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">العنوان التفصيلي (بالعربية): *</label>
                <textarea
                  rows={2}
                  required
                  value={bAddressAr}
                  onChange={(e) => setBAddressAr(e.target.value)}
                  placeholder="شارع المحور المركزي، أمام بوابة 2 مول العرب..."
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Address Details (In English):</label>
                <textarea
                  rows={2}
                  value={bAddressEn}
                  onChange={(e) => setBAddressEn(e.target.value)}
                  placeholder="Central Axis St, Opposite Mall of Arabia Gate 2..."
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">رقم الهاتف للاتصال المباشر: *</label>
                  <input
                    type="tel"
                    required
                    value={bPhone}
                    onChange={(e) => setBPhone(e.target.value)}
                    placeholder="010XXXXXXXX"
                    className="w-full bg-slate-950 border border-slate-700 text-emerald-400 font-mono font-bold rounded-xl p-3 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">رقم الواتساب للفرع:</label>
                  <input
                    type="tel"
                    value={bWhatsapp}
                    onChange={(e) => setBWhatsapp(e.target.value)}
                    placeholder="2010XXXXXXXX"
                    className="w-full bg-slate-950 border border-slate-700 text-emerald-400 font-mono font-bold rounded-xl p-3 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">ساعات العمل (بالعربية):</label>
                  <input
                    type="text"
                    value={bHoursAr}
                    onChange={(e) => setBHoursAr(e.target.value)}
                    placeholder="يومياً من 11:00 صباحاً حتى 11:00 مساءً"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Working Hours (In English):</label>
                  <input
                    type="text"
                    value={bHoursEn}
                    onChange={(e) => setBHoursEn(e.target.value)}
                    placeholder="11:00 AM - 11:00 PM Daily"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{editingBranch ? 'حفظ تعديلات الفرع' : 'إضافة الفرع فوراً للموقع'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT REPAIR SERVICE */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 text-white rounded-3xl max-w-lg w-full p-6 space-y-5 border border-slate-700 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsServiceModalOpen(false)}
              className="absolute top-4 left-4 p-2 bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-base text-amber-300">
                  {editingService ? 'تعديل خدمة صيانة' : 'إضافة خدمة صيانة جديدة'}
                </h3>
                <p className="text-xs text-slate-400">أدخل تفاصيل نوع الجهاز والعطل والسعر التقديري والضمان</p>
              </div>
            </div>

            <form onSubmit={handleSaveRepairService} className="space-y-4 text-xs text-right">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">نوع الجهاز: *</label>
                  <select
                    value={rsDeviceType}
                    onChange={(e) => setRsDeviceType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 text-white font-bold rounded-xl p-3 focus:outline-none focus:border-amber-400"
                  >
                    <option value="iphone">آيفون (iPhone)</option>
                    <option value="ipad">آيباد (iPad)</option>
                    <option value="mac">ماك بوك (MacBook)</option>
                    <option value="watch">ساعة أبل (Apple Watch)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">اسم الموديل: *</label>
                  <input
                    type="text"
                    required
                    value={rsModelName}
                    onChange={(e) => setRsModelName(e.target.value)}
                    placeholder="مثال: iPhone 15 Pro Max"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">اسم العطل / الخدمة (بالعربية): *</label>
                  <input
                    type="text"
                    required
                    value={rsIssueNameAr}
                    onChange={(e) => setRsIssueNameAr(e.target.value)}
                    placeholder="مثال: تغيير شاشة أصلية مع TrueTone"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">اسم العطل (بالإنجليزية):</label>
                  <input
                    type="text"
                    value={rsIssueNameEn}
                    onChange={(e) => setRsIssueNameEn(e.target.value)}
                    placeholder="e.g. Original Screen Replacement"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">التكلفة التقديرية (ج.م):</label>
                  <input
                    type="number"
                    required
                    value={rsPriceEgp}
                    onChange={(e) => setRsPriceEgp(Number(e.target.value))}
                    placeholder="2500"
                    className="w-full bg-slate-950 border border-slate-700 text-emerald-400 font-bold rounded-xl p-3 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">مدة الصيانة (بالدقائق):</label>
                  <input
                    type="number"
                    required
                    value={rsTimeMinutes}
                    onChange={(e) => setRsTimeMinutes(Number(e.target.value))}
                    placeholder="45"
                    className="w-full bg-slate-950 border border-slate-700 text-amber-300 font-bold rounded-xl p-3 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">مدة الضمان (بالأشهر):</label>
                  <input
                    type="number"
                    required
                    value={rsWarrantyMonths}
                    onChange={(e) => setRsWarrantyMonths(Number(e.target.value))}
                    placeholder="6"
                    className="w-full bg-slate-950 border border-slate-700 text-white font-bold rounded-xl p-3 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">تفاصيل الخدمة والقطع المستخدمة:</label>
                <textarea
                  rows={2}
                  value={rsDescriptionAr}
                  onChange={(e) => setRsDescriptionAr(e.target.value)}
                  placeholder="استبدال شاشة جديدة أصلية مع معايرة الألوان ونقل خاصية TrueTone وضمان معتمد..."
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{editingService ? 'حفظ تعديلات الخدمة' : 'إضافة الخدمة فوراً للموقع'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT CATEGORY */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 border border-slate-700 relative shadow-2xl my-8">
            <button
              onClick={() => setIsCategoryModalOpen(false)}
              className="absolute top-4 left-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-black text-lg text-amber-300 flex items-center gap-2">
              <Grid className="w-5 h-5 text-amber-400" />
              <span>{editingCategory ? 'تعديل بيانات القسم' : 'إضافة قسم جديد للموقع'}</span>
            </h3>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs text-right">
              {!editingCategory && (
                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    معرف / كود القسم (Category ID / Slug): *
                  </label>
                  <input
                    type="text"
                    required
                    value={catId}
                    onChange={(e) => setCatId(e.target.value)}
                    placeholder="مثال: gaming, chargers, cameras"
                    className="w-full bg-slate-950 border border-slate-700 text-amber-300 font-mono font-bold rounded-xl p-3 focus:outline-none focus:border-amber-400"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">استخدم حروف إنجليزية صغيرة بدون مسافات (مثال: gaming, audio, accessories)</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">اسم القسم باللغة العربية: *</label>
                  <input
                    type="text"
                    required
                    value={catNameAr}
                    onChange={(e) => setCatNameAr(e.target.value)}
                    placeholder="مثال: أجهزة جيمنج وبلايستيشن"
                    className="w-full bg-slate-950 border border-slate-700 text-white font-bold rounded-xl p-3 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">اسم القسم بالإنجليزية:</label>
                  <input
                    type="text"
                    value={catNameEn}
                    onChange={(e) => setCatNameEn(e.target.value)}
                    placeholder="Gaming & Consoles"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">وصف مختصر للقسم:</label>
                <input
                  type="text"
                  value={catDescAr}
                  onChange={(e) => setCatDescAr(e.target.value)}
                  placeholder="أحدث أجهزة الألعاب وأيد التحكم الأصلية مع ضمان"
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">وسم المميزات (Badge):</label>
                  <input
                    type="text"
                    value={catBadgeAr}
                    onChange={(e) => setCatBadgeAr(e.target.value)}
                    placeholder="جديد وحصري / خصم 10%"
                    className="w-full bg-slate-950 border border-slate-700 text-amber-300 font-bold rounded-xl p-3 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">أيقونة القسم:</label>
                  <select
                    value={catIconName}
                    onChange={(e) => setCatIconName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 font-bold focus:outline-none"
                  >
                    <option value="Smartphone">Smartphone (هاتف)</option>
                    <option value="Laptop">Laptop (ماك / لابتوب)</option>
                    <option value="Tablet">Tablet (آيباد / تابلت)</option>
                    <option value="Watch">Watch (ساعة)</option>
                    <option value="Headphones">Headphones (سماعة)</option>
                    <option value="Cable">Cable (شاحن / كابل)</option>
                    <option value="Sparkles">Sparkles (مستعمل / زيرو)</option>
                    <option value="Wrench">Wrench (صيانة)</option>
                    <option value="Shield">Shield (حماية)</option>
                    <option value="Zap">Zap (شحن سريع)</option>
                    <option value="Tag">Tag (عرض)</option>
                    <option value="Grid">Grid (عام)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">رابط الصورة التوضيحية للقسم (Image URL):</label>
                <input
                  type="text"
                  value={catBgImage}
                  onChange={(e) => setCatBgImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-950 border border-slate-700 text-slate-300 font-mono text-[11px] rounded-xl p-3 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition-all"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ القسم</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
