import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryGrid } from './components/CategoryGrid';
import { ProductCatalog } from './components/ProductCatalog';
import { MaintenanceCenter } from './components/MaintenanceCenter';
import { TradeInCalculator } from './components/TradeInCalculator';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { AiAdvisorModal } from './components/AiAdvisorModal';
import { Footer } from './components/Footer';
import { AdminPanel, OrderItem } from './components/AdminPanel';
import { AdminAuthModal } from './components/AdminAuthModal';

import { 
  Product, RepairService, RepairTicket, CategoryId, Language, Currency, CartItem, ProductColor, StorageOption,
  TradeInModel, TradeInRequest, HeroSlide, StoreBranch, StoreCategory
} from './types';
import { mockProducts, mockRepairServices, mockStoreBranches, mockStoreCategories } from './data/mockData';

const initialTickets: RepairTicket[] = [
  {
    ticketCode: 'TRK-88214',
    customerName: 'محمود عبد السلام',
    customerPhone: '01011223344',
    deviceModel: 'iPhone 15 Pro Max',
    issueDescription: 'استبدال شاشة أصلية أبل مع برمجة شريحة TrueTone',
    status: 'Repairing',
    statusAr: 'تركيب القطع الأصلية بالفرع',
    estimatedCostEgp: 11500,
    createdAt: '2026-07-28'
  },
  {
    ticketCode: 'TRK-91042',
    customerName: 'سارة شريف',
    customerPhone: '01155667788',
    deviceModel: 'MacBook Pro M2 16"',
    issueDescription: 'تغيير شاشة أصلية كاملة وتنظيف التبريد',
    status: 'Testing',
    statusAr: 'اختبار الكفاءة والضمان',
    estimatedCostEgp: 18500,
    createdAt: '2026-07-27'
  }
];

const initialOrders: OrderItem[] = [
  {
    id: 'ord-101',
    orderCode: 'ORD-94821',
    customerName: 'أحمد زكي',
    customerPhone: '01098765432',
    customerAddress: 'برج الأطباء، شارع عباس العقاد، مدينة نصر',
    governorate: 'cairo',
    paymentMethod: 'cod',
    totalEgp: 69000,
    itemsCount: 1,
    itemsSummary: 'iPhone 16 Pro Max 256GB - Desert Titanium (x1)',
    status: 'Pending',
    createdAt: '2026-07-28'
  },
  {
    id: 'ord-102',
    orderCode: 'ORD-88123',
    customerName: 'مريم علي',
    customerPhone: '01234567890',
    customerAddress: 'مول داون تاون، التجمع الخامس',
    governorate: 'cairo',
    paymentMethod: 'valu',
    totalEgp: 43500,
    itemsCount: 1,
    itemsSummary: 'iPhone 15 Pro 128GB - Natural Titanium (x1)',
    status: 'Shipped',
    createdAt: '2026-07-27'
  }
];

const initialTradeInModels: TradeInModel[] = [
  { id: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max', nameAr: 'آيفون 15 برو ماكس', baseValueEgp: 45000, category: 'iphone' },
  { id: 'iphone-15-pro', name: 'iPhone 15 Pro', nameAr: 'آيفون 15 برو', baseValueEgp: 38000, category: 'iphone' },
  { id: 'iphone-15', name: 'iPhone 15', nameAr: 'آيفون 15 العادي', baseValueEgp: 28000, category: 'iphone' },
  { id: 'iphone-14-pro-max', name: 'iPhone 14 Pro Max', nameAr: 'آيفون 14 برو ماكس', baseValueEgp: 34000, category: 'iphone' },
  { id: 'iphone-14-pro', name: 'iPhone 14 Pro', nameAr: 'آيفون 14 برو', baseValueEgp: 29000, category: 'iphone' },
  { id: 'iphone-14', name: 'iPhone 14', nameAr: 'آيفون 14', baseValueEgp: 22000, category: 'iphone' },
  { id: 'iphone-13-pro-max', name: 'iPhone 13 Pro Max', nameAr: 'آيفون 13 برو ماكس', baseValueEgp: 27000, category: 'iphone' },
  { id: 'iphone-13', name: 'iPhone 13', nameAr: 'آيفون 13', baseValueEgp: 18500, category: 'iphone' },
  { id: 'iphone-12-pro', name: 'iPhone 12 Pro', nameAr: 'آيفون 12 برو', baseValueEgp: 17000, category: 'iphone' },
  { id: 'macbook-air-m1', name: 'MacBook Air M1', nameAr: 'ماك بوك إير M1', baseValueEgp: 24000, category: 'mac' },
  { id: 'ipad-pro-m1', name: 'iPad Pro M1', nameAr: 'آيباد برو M1', baseValueEgp: 21000, category: 'ipad' },
];

const initialTradeInRequests: TradeInRequest[] = [
  {
    id: 'trd-101',
    customerName: 'طارق الألفي',
    customerPhone: '01012345678',
    deviceModel: 'آيفون 14 برو ماكس',
    storage: '256GB',
    conditionGrade: 'كالجديد 99%',
    batteryHealth: 89,
    estimatedValueEgp: 36500,
    createdAt: '2026-07-28',
    status: 'New'
  },
  {
    id: 'trd-102',
    customerName: 'رانيا فهمي',
    customerPhone: '01122334455',
    deviceModel: 'آيفون 13 برو',
    storage: '128GB',
    conditionGrade: 'جيد جداً',
    batteryHealth: 84,
    estimatedValueEgp: 23000,
    createdAt: '2026-07-27',
    status: 'Contacted'
  }
];

export default function App() {
  const [language, setLanguage] = useState<Language>('ar');
  const [currency, setCurrency] = useState<Currency>('EGP');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Admin Dashboard State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);

  // Check URL query string or keyboard shortcut for admin access
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('admin') === 'true' || urlParams.get('admin') === '1') {
        setIsAdminAuthOpen(true);
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+A shortcut to open admin login
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminAuthOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Persistent State Engine using LocalStorage
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('soliman_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return mockProducts;
  });

  const [repairServices, setRepairServices] = useState<RepairService[]>(() => {
    try {
      const saved = localStorage.getItem('soliman_repair_services');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return mockRepairServices;
  });

  const [repairTickets, setRepairTickets] = useState<RepairTicket[]>(() => {
    try {
      const saved = localStorage.getItem('soliman_repair_tickets');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialTickets;
  });

  const [orders, setOrders] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('soliman_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialOrders;
  });
  
  // Trade-In Section State
  const [tradeInModels, setTradeInModels] = useState<TradeInModel[]>(() => {
    try {
      const saved = localStorage.getItem('soliman_trade_in_models');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialTradeInModels;
  });

  const [tradeInRequests, setTradeInRequests] = useState<TradeInRequest[]>(() => {
    try {
      const saved = localStorage.getItem('soliman_trade_in_requests');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialTradeInRequests;
  });

  // Hero Banner Slides State
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);

  // Store Branches State
  const [storeBranches, setStoreBranches] = useState<StoreBranch[]>(() => {
    try {
      const saved = localStorage.getItem('soliman_branches');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return mockStoreBranches;
  });

  // Store Categories State
  const [storeCategories, setStoreCategories] = useState<StoreCategory[]>(() => {
    try {
      const saved = localStorage.getItem('soliman_categories');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return mockStoreCategories;
  });

  // Sync to localStorage
  useEffect(() => {
    try { localStorage.setItem('soliman_products', JSON.stringify(products)); } catch (e) {}
  }, [products]);

  useEffect(() => {
    try { localStorage.setItem('soliman_repair_services', JSON.stringify(repairServices)); } catch (e) {}
  }, [repairServices]);

  useEffect(() => {
    try { localStorage.setItem('soliman_repair_tickets', JSON.stringify(repairTickets)); } catch (e) {}
  }, [repairTickets]);

  useEffect(() => {
    try { localStorage.setItem('soliman_orders', JSON.stringify(orders)); } catch (e) {}
  }, [orders]);

  useEffect(() => {
    try { localStorage.setItem('soliman_trade_in_models', JSON.stringify(tradeInModels)); } catch (e) {}
  }, [tradeInModels]);

  useEffect(() => {
    try { localStorage.setItem('soliman_trade_in_requests', JSON.stringify(tradeInRequests)); } catch (e) {}
  }, [tradeInRequests]);

  useEffect(() => {
    try { localStorage.setItem('soliman_branches', JSON.stringify(storeBranches)); } catch (e) {}
  }, [storeBranches]);

  useEffect(() => {
    try { localStorage.setItem('soliman_categories', JSON.stringify(storeCategories)); } catch (e) {}
  }, [storeCategories]);

  const handleAddStoreCategory = (newCat: StoreCategory) => {
    setStoreCategories((prev) => [newCat, ...prev]);
  };

  const handleUpdateStoreCategory = (updatedCat: StoreCategory) => {
    setStoreCategories((prev) => prev.map((c) => (c.id === updatedCat.id ? updatedCat : c)));
  };

  const handleDeleteStoreCategory = (catId: string) => {
    setStoreCategories((prev) => prev.filter((c) => c.id !== catId));
  };

  // Settings & Store Contacts
  const [announcementText, setAnnouncementText] = useState('🚚 شحن آمن وسريع لجميع المحافظات مع ضمان استبدال 14 يومًا');
  const [storePhone, setStorePhone] = useState('19088');
  const [storeWhatsApp, setStoreWhatsApp] = useState('201099887766');

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist State
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  // Selected Product Detail Modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // AI Advisor Modal
  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState(false);

  // Set RTL or LTR document direction
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Product CRUD
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  // Repair Services CRUD
  const handleUpdateRepairService = (updatedService: RepairService) => {
    setRepairServices((prev) => prev.map((s) => (s.id === updatedService.id ? updatedService : s)));
  };

  const handleAddRepairService = (newService: RepairService) => {
    setRepairServices((prev) => [...prev, newService]);
  };

  const handleDeleteRepairService = (id: string) => {
    setRepairServices((prev) => prev.filter((s) => s.id !== id));
  };

  // Repair Tickets CRUD
  const handleAddRepairTicket = (newTicket: RepairTicket) => {
    setRepairTickets((prev) => [newTicket, ...prev]);
  };

  const handleUpdateRepairTicketStatus = (ticketCode: string, newStatus: RepairTicket['status']) => {
    setRepairTickets((prev) =>
      prev.map((t) => {
        if (t.ticketCode === ticketCode) {
          return {
            ...t,
            status: newStatus,
            statusAr:
              newStatus === 'Received' ? 'تم الاستلام بالفرع' :
              newStatus === 'Diagnostic' ? 'فحص مهندسي معتمد' :
              newStatus === 'Repairing' ? 'جاري تركيب القطع الأصلية' :
              newStatus === 'Testing' ? 'اختبار الكفاءة والضمان' : 'جاهز للتسليم للعميل'
          };
        }
        return t;
      })
    );
  };

  // Trade-In Models CRUD
  const handleAddTradeInModel = (newModel: TradeInModel) => {
    setTradeInModels((prev) => [newModel, ...prev]);
  };

  const handleUpdateTradeInModel = (updatedModel: TradeInModel) => {
    setTradeInModels((prev) => prev.map((m) => (m.id === updatedModel.id ? updatedModel : m)));
  };

  const handleDeleteTradeInModel = (id: string) => {
    setTradeInModels((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAddTradeInRequest = (req: TradeInRequest) => {
    setTradeInRequests((prev) => [req, ...prev]);
  };

  const handleUpdateTradeInRequestStatus = (id: string, status: TradeInRequest['status']) => {
    setTradeInRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  // Hero Slides CRUD
  const handleAddHeroSlide = (slide: HeroSlide) => {
    setHeroSlides((prev) => [...prev, slide]);
  };

  const handleDeleteHeroSlide = (id: number) => {
    setHeroSlides((prev) => prev.filter((s) => s.id !== id));
  };

  // Store Branches CRUD
  const handleAddStoreBranch = (branch: StoreBranch) => {
    setStoreBranches((prev) => [...prev, branch]);
  };

  const handleUpdateStoreBranch = (branch: StoreBranch) => {
    setStoreBranches((prev) => prev.map((b) => (b.id === branch.id ? branch : b)));
  };

  const handleDeleteStoreBranch = (id: string) => {
    setStoreBranches((prev) => prev.filter((b) => b.id !== id));
  };

  // Orders CRUD
  const handleUpdateOrderStatus = (orderCode: string, newStatus: OrderItem['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderCode === orderCode ? { ...o, status: newStatus } : o))
    );
  };

  const handlePlaceOrder = (newOrder: OrderItem) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  // Cart handlers
  const handleAddToCart = (
    product: Product,
    selectedColor: ProductColor,
    selectedStorage?: StorageOption
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor.name === selectedColor.name &&
          item.selectedStorage?.size === selectedStorage?.size
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += 1;
        return next;
      } else {
        return [
          ...prev,
          {
            product,
            selectedColor,
            selectedStorage,
            quantity: 1,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (
    id: string,
    colorName: string,
    storageSize: string | undefined,
    delta: number
  ) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (
            item.product.id === id &&
            item.selectedColor.name === colorName &&
            item.selectedStorage?.size === storageSize
          ) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (
    id: string,
    colorName: string,
    storageSize: string | undefined
  ) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === id &&
            item.selectedColor.name === colorName &&
            item.selectedStorage?.size === storageSize
          )
      )
    );
  };

  const handleToggleWishlist = (id: string) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const scrollToSection = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (cat: CategoryId) => {
    setSelectedCategory(cat);
    if (cat === 'maintenance') {
      scrollToSection('maintenance-hub');
    } else if (cat === 'used') {
      scrollToSection('trade-in-section');
    } else {
      scrollToSection('catalog-section');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans selection:bg-emerald-600 selection:text-white">
      {/* If Admin Dashboard View is Active */}
      {isAdminOpen ? (
        <AdminPanel
          language={language}
          currency={currency}
          products={products}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          repairServices={repairServices}
          onUpdateRepairService={handleUpdateRepairService}
          onAddRepairService={handleAddRepairService}
          onDeleteRepairService={handleDeleteRepairService}
          repairTickets={repairTickets}
          onAddRepairTicket={handleAddRepairTicket}
          onUpdateRepairTicketStatus={handleUpdateRepairTicketStatus}
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          tradeInModels={tradeInModels}
          onAddTradeInModel={handleAddTradeInModel}
          onUpdateTradeInModel={handleUpdateTradeInModel}
          onDeleteTradeInModel={handleDeleteTradeInModel}
          tradeInRequests={tradeInRequests}
          onUpdateTradeInRequestStatus={handleUpdateTradeInRequestStatus}
          heroSlides={heroSlides}
          onAddHeroSlide={handleAddHeroSlide}
          onDeleteHeroSlide={handleDeleteHeroSlide}
          storeBranches={storeBranches}
          onAddStoreBranch={handleAddStoreBranch}
          onUpdateStoreBranch={handleUpdateStoreBranch}
          onDeleteStoreBranch={handleDeleteStoreBranch}
          storeCategories={storeCategories}
          onAddStoreCategory={handleAddStoreCategory}
          onUpdateStoreCategory={handleUpdateStoreCategory}
          onDeleteStoreCategory={handleDeleteStoreCategory}
          announcementText={announcementText}
          setAnnouncementText={setAnnouncementText}
          storePhone={storePhone}
          setStorePhone={setStorePhone}
          storeWhatsApp={storeWhatsApp}
          setStoreWhatsApp={setStoreWhatsApp}
          onBackToStore={() => setIsAdminOpen(false)}
        />
      ) : (
        <>
          {/* Sticky Main Header */}
          <Header
            language={language}
            setLanguage={setLanguage}
            currency={currency}
            setCurrency={setCurrency}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleSelectCategory}
            cartItems={cartItems}
            setIsCartOpen={setIsCartOpen}
            wishlistIds={wishlistIds}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            products={products}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenRepairTracker={() => scrollToSection('maintenance-hub')}
            onOpenTradeIn={() => scrollToSection('trade-in-section')}
            onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
            onOpenAdminPanel={() => setIsAdminAuthOpen(true)}
            announcementText={announcementText}
            storeCategories={storeCategories}
          />

          {/* Main Content Body */}
          <main>
            {/* Hero Carousel */}
            <HeroBanner
              language={language}
              currency={currency}
              slides={heroSlides}
              onSelectCategory={handleSelectCategory}
              onOpenTradeIn={() => scrollToSection('trade-in-section')}
              onOpenRepair={() => scrollToSection('maintenance-hub')}
            />

            {/* Visual Category Grid */}
            <CategoryGrid
              language={language}
              selectedCategory={selectedCategory}
              categories={storeCategories}
              onSelectCategory={handleSelectCategory}
            />

            {/* Filterable Product Catalog */}
            <ProductCatalog
              products={products}
              selectedCategory={selectedCategory}
              setSelectedCategory={handleSelectCategory}
              language={language}
              currency={currency}
              searchQuery={searchQuery}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={handleAddToCart}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
            />

            {/* Certified Maintenance & Repair Hub */}
            <MaintenanceCenter
              language={language}
              currency={currency}
              branches={storeBranches}
              repairServices={repairServices}
              repairTickets={repairTickets}
              onAddRepairTicket={handleAddRepairTicket}
              storeWhatsApp={storeWhatsApp}
              onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
            />

            {/* Trade-In & Sell Calculator */}
            <TradeInCalculator
              language={language}
              currency={currency}
              tradeInModels={tradeInModels}
              onSubmitTradeInRequest={handleAddTradeInRequest}
              onOpenCatalog={() => handleSelectCategory('all')}
            />
          </main>

          {/* Footer */}
          <Footer
            language={language}
            currency={currency}
            branches={storeBranches}
            onOpenTradeIn={() => scrollToSection('trade-in-section')}
            onOpenRepair={() => scrollToSection('maintenance-hub')}
            onOpenAdminAuth={() => setIsAdminAuthOpen(true)}
            onSelectCategory={handleSelectCategory}
          />

          {/* Product Detail Modal */}
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            language={language}
            currency={currency}
            onAddToCart={handleAddToCart}
            onOpenTradeIn={() => scrollToSection('trade-in-section')}
          />

          {/* Shopping Cart Drawer */}
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            language={language}
            currency={currency}
            onClearCart={() => setCartItems([])}
            onPlaceOrder={handlePlaceOrder}
          />

          {/* AI Advisor Modal */}
          <AiAdvisorModal
            isOpen={isAiAdvisorOpen}
            onClose={() => setIsAiAdvisorOpen(false)}
            language={language}
          />

          {/* Admin Authentication Modal */}
          <AdminAuthModal
            isOpen={isAdminAuthOpen}
            onClose={() => setIsAdminAuthOpen(false)}
            onAuthenticated={() => {
              setIsAdminAuthOpen(false);
              setIsAdminOpen(true);
            }}
            language={language}
          />
        </>
      )}
    </div>
  );
}
