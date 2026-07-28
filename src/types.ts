export type Language = 'ar' | 'en';
export type Currency = 'EGP' | 'USD';

export type CategoryId = 
  | 'all'
  | 'iphones' 
  | 'ipads' 
  | 'macs' 
  | 'watches' 
  | 'audio' 
  | 'accessories' 
  | 'used' 
  | 'maintenance';

export type ProductCondition = 'New' | 'Like New (99%)' | 'Grade A+ (95%)' | 'Refurbished';

export interface ProductColor {
  name: string;
  nameAr: string;
  hex: string;
  image: string;
}

export interface StorageOption {
  size: string;
  priceModifierEgp: number;
}

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  category: CategoryId;
  subcategory?: string;
  priceEgp: number;
  originalPriceEgp?: number;
  rating: number;
  reviewsCount: number;
  isNewRelease?: boolean;
  isBestSeller?: boolean;
  isFlashDeal?: boolean;
  condition: ProductCondition;
  batteryHealth?: number; // e.g., 98 for used devices
  warranty: string;
  warrantyAr: string;
  description: string;
  descriptionAr: string;
  colors: ProductColor[];
  storageOptions?: StorageOption[];
  images: string[];
  specs: Record<string, string>;
  specsAr: Record<string, string>;
  inStock: boolean;
  stockCount: number;
  boxIncluded?: boolean;
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  selectedStorage?: StorageOption;
  quantity: number;
}

export interface RepairService {
  id: string;
  deviceType: 'iphone' | 'ipad' | 'mac' | 'watch';
  modelName: string;
  issueName: string;
  issueNameAr: string;
  estimatedPriceEgp: number;
  estimatedTimeMinutes: number;
  warrantyMonths: number;
  descriptionAr: string;
}

export interface RepairTicket {
  ticketCode: string;
  customerName: string;
  customerPhone: string;
  deviceModel: string;
  issueDescription: string;
  status: 'Received' | 'Diagnostic' | 'Repairing' | 'Testing' | 'Ready for Pickup';
  statusAr: string;
  estimatedCostEgp: number;
  createdAt: string;
}

export interface TradeInAssessment {
  deviceModel: string;
  storage: string;
  conditionGrade: 'Perfect' | 'Good' | 'Fair';
  batteryHealth: number;
  faceIdWorking: boolean;
  screenOriginal: boolean;
  estimatedValueEgp: number;
}

export interface TradeInModel {
  id: string;
  name: string;
  nameAr: string;
  baseValueEgp: number;
  category: 'iphone' | 'mac' | 'ipad' | 'watch';
}

export interface TradeInRequest {
  id: string;
  customerName: string;
  customerPhone: string;
  deviceModel: string;
  storage: string;
  conditionGrade: string;
  batteryHealth: number;
  estimatedValueEgp: number;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Completed' | 'Cancelled';
}

export interface HeroSlide {
  id: number;
  titleAr: string;
  subtitleAr: string;
  titleEn: string;
  subtitleEn: string;
  badgeAr: string;
  badgeEn: string;
  ctaAr: string;
  ctaEn: string;
  image: string;
  category?: string;
  action?: string;
  accentColor: string;
}

export interface StoreBranch {
  id: string;
  name: string;
  nameAr: string;
  city: string;
  cityAr: string;
  address: string;
  addressAr: string;
  phone: string;
  whatsapp: string;
  hours: string;
  hoursAr: string;
  mapUrl?: string;
}
