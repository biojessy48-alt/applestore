import React, { useState } from 'react';
import { 
  X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight, 
  Check, CreditCard, ShieldCheck, Tag, Truck 
} from 'lucide-react';
import { CartItem, Language, Currency } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, colorName: string, storageSize: string | undefined, delta: number) => void;
  onRemoveItem: (id: string, colorName: string, storageSize: string | undefined) => void;
  language: Language;
  currency: Currency;
  onClearCart: () => void;
  onPlaceOrder?: (order: any) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  language,
  currency,
  onClearCart,
  onPlaceOrder
}) => {
  if (!isOpen) return null;

  const isAr = language === 'ar';

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [governorate, setGovernorate] = useState('cairo');
  const [isCheckoutStep, setIsCheckoutStep] = useState(false);

  // Customer Checkout Details
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custAddress, setCustAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'valu' | 'card' | 'vodafone'>('cod');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const shippingCostEgp = governorate === 'cairo' || governorate === 'giza' ? 100 : 180;

  const rawSubtotalEgp = cartItems.reduce((sum, item) => {
    const itemPrice = item.product.priceEgp + (item.selectedStorage?.priceModifierEgp || 0);
    return sum + itemPrice * item.quantity;
  }, 0);

  const discountEgp = Math.round((rawSubtotalEgp * discountPercent) / 100);
  const totalEgp = rawSubtotalEgp - discountEgp + (cartItems.length > 0 ? shippingCostEgp : 0);

  const formatPrice = (priceEgp: number) => {
    return currency === 'USD' ? `$${Math.round(priceEgp / 48)}` : (isAr ? `${priceEgp.toLocaleString()} ج.م` : `EGP ${priceEgp.toLocaleString()}`);
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'ITECH10') {
      setDiscountPercent(10);
    } else if (couponCode.trim().toUpperCase() === 'VIP20') {
      setDiscountPercent(20);
    } else {
      alert(isAr ? 'كود الخصم غير صحيح. جرب كود: ITECH10' : 'Invalid coupon code. Try ITECH10');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || !custPhone || !custAddress) return;

    const code = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(code);

    if (onPlaceOrder) {
      onPlaceOrder({
        id: `ord-${Date.now()}`,
        orderCode: code,
        customerName: custName,
        customerPhone: custPhone,
        customerAddress: custAddress,
        governorate,
        paymentMethod,
        totalEgp,
        itemsCount: cartItems.length,
        itemsSummary: cartItems.map(i => `${i.product.nameAr} (x${i.quantity})`).join(', '),
        status: 'Pending',
        createdAt: new Date().toISOString().split('T')[0]
      });
    }

    setOrderComplete(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end font-sans">
      <div className="w-full max-w-md bg-white text-slate-900 h-full flex flex-col justify-between shadow-2xl relative animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-800 rounded-xl text-amber-300">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">
                {isAr ? 'سلة المشتريات' : 'Shopping Cart'}
              </h3>
              <p className="text-[11px] text-emerald-300">
                {cartItems.length} {isAr ? 'منتجات مضافة' : 'Items'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-emerald-300 hover:text-white hover:bg-emerald-900 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {orderComplete ? (
            <div className="py-8 px-4 text-center space-y-4 my-auto">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h4 className="font-black text-xl text-slate-900">
                {isAr ? 'تم تسجيل طلبك بنجاح!' : 'Order Placed Successfully!'}
              </h4>
              <p className="text-xs text-slate-600">
                {isAr ? 'رقم الطلب الخاص بك هو:' : 'Your Order Number:'}
              </p>
              <div className="bg-slate-900 text-amber-300 py-3 rounded-2xl font-mono font-black text-lg tracking-widest border border-amber-500/40">
                {orderNumber}
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl text-xs text-slate-700 text-right space-y-1 border border-slate-200">
                <p><strong>{isAr ? 'الاسم:' : 'Name:'}</strong> {custName}</p>
                <p><strong>{isAr ? 'العنوان:' : 'Address:'}</strong> {custAddress}</p>
                <p><strong>{isAr ? 'المبلغ الإجمالي:' : 'Total:'}</strong> {formatPrice(totalEgp)}</p>
                <p><strong>{isAr ? 'طريقة الدفع:' : 'Payment:'}</strong> {paymentMethod.toUpperCase()}</p>
              </div>
              <p className="text-[11px] text-slate-500">
                {isAr ? 'سيتصل بك فريق الدعم لشحن الطلب ومعاينة الشحنة.' : 'Our team will contact you shortly.'}
              </p>
              <button
                onClick={() => {
                  onClearCart();
                  setOrderComplete(false);
                  setIsCheckoutStep(false);
                  onClose();
                }}
                className="w-full bg-emerald-900 text-white font-extrabold text-xs py-3 rounded-xl hover:bg-emerald-950 transition-colors"
              >
                {isAr ? 'العودة للمتجر' : 'Return to Shop'}
              </button>
            </div>
          ) : isCheckoutStep ? (
            <form onSubmit={handlePlaceOrder} className="space-y-4 text-right">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCheckoutStep(false)}
                  className="text-xs font-bold text-emerald-800 flex items-center gap-1"
                >
                  <ArrowRight className="w-4 h-4 rtl:rotate-0 rotate-180" />
                  <span>{isAr ? 'تعديل السلة' : 'Edit Cart'}</span>
                </button>
                <h4 className="font-extrabold text-sm text-slate-900">{isAr ? 'بيانات الشحن والدفع' : 'Shipping & Payment'}</h4>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">{isAr ? 'الاسم الكامل:' : 'Full Name:'}</label>
                <input
                  type="text"
                  required
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  placeholder={isAr ? 'الاسم الثلاثي' : 'Name'}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl p-2.5 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">{isAr ? 'رقم الهاتف:' : 'Phone Number:'}</label>
                <input
                  type="tel"
                  required
                  value={custPhone}
                  onChange={(e) => setCustPhone(e.target.value)}
                  placeholder="010XXXXXXXX"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl p-2.5 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">{isAr ? 'المحافظة:' : 'Governorate:'}</label>
                <select
                  value={governorate}
                  onChange={(e) => setGovernorate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl p-2.5 text-xs focus:outline-none font-semibold"
                >
                  <option value="cairo">القاهرة - شحن 100 ج.م (توصيل خلال 24 ساعة)</option>
                  <option value="giza">الجيزة - شحن 100 ج.م</option>
                  <option value="alex">الإسكندرية - شحن 180 ج.م</option>
                  <option value="mansoura">الدقهلية والمنصورة - شحن 180 ج.م</option>
                  <option value="other">باقي المحافظات - شحن 180 ج.م</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">{isAr ? 'عنوان التسليم بالتفصيل:' : 'Delivery Address:'}</label>
                <textarea
                  required
                  rows={2}
                  value={custAddress}
                  onChange={(e) => setCustAddress(e.target.value)}
                  placeholder={isAr ? 'الشارع، البناية، رقم الشقة...' : 'Street & Apartment details'}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl p-2.5 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">{isAr ? 'اختر طريقة الدفع:' : 'Payment Method:'}</label>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  {[
                    { id: 'cod', labelAr: '💵 الدفع عند الاستلام' },
                    { id: 'valu', labelAr: '⚡ تقسيط ValU 0%' },
                    { id: 'card', labelAr: '💳 كارت فيزا / ماستر' },
                    { id: 'vodafone', labelAr: '📱 فودافون كاش' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPaymentMethod(p.id as any)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        paymentMethod === p.id 
                          ? 'bg-emerald-950 text-amber-300 border-emerald-950 font-black shadow-sm' 
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {p.labelAr}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-950 text-white p-3.5 rounded-2xl space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span>{isAr ? 'إجمالي المنتجات:' : 'Subtotal:'}</span>
                  <span>{formatPrice(rawSubtotalEgp)}</span>
                </div>
                {discountEgp > 0 && (
                  <div className="flex justify-between text-amber-300">
                    <span>{isAr ? 'الخصم المطبق:' : 'Discount:'}</span>
                    <span>-{formatPrice(discountEgp)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{isAr ? 'مصاريف الشحن:' : 'Shipping:'}</span>
                  <span>{formatPrice(shippingCostEgp)}</span>
                </div>
                <div className="flex justify-between font-black text-sm text-amber-300 pt-2 border-t border-emerald-800">
                  <span>{isAr ? 'المبلغ الإجمالي المباشر:' : 'Total:'}</span>
                  <span>{formatPrice(totalEgp)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-900 hover:bg-emerald-950 text-amber-300 font-extrabold text-sm py-3.5 rounded-2xl shadow-lg transition-all"
              >
                {isAr ? 'تأكيد وشحن الطلب الآن' : 'Confirm Order'}
              </button>
            </form>
          ) : cartItems.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="font-extrabold text-slate-800 text-base">
                {isAr ? 'سلة المشتريات فارغة حالياً' : 'Your cart is empty'}
              </p>
              <p className="text-xs text-slate-500">
                {isAr ? 'تصفح أحدث أجهزة أبل وإكسسواراتها وأضف خياراتك' : 'Explore products and add items to your cart'}
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-6 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-amber-300 font-bold text-xs rounded-xl shadow-md transition-all inline-block"
              >
                {isAr ? 'تصفح أحدث أجهزة الكتالوج' : 'Browse Catalog'}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item, idx) => {
                const itemPrice = item.product.priceEgp + (item.selectedStorage?.priceModifierEgp || 0);

                return (
                  <div
                    key={`${item.product.id}-${item.selectedColor.name}-${item.selectedStorage?.size}-${idx}`}
                    className="flex gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 items-center"
                  >
                    <img
                      src={item.selectedColor.image || item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-contain bg-white rounded-xl border border-slate-200 p-1"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0 text-right">
                      <h4 className="font-bold text-xs text-slate-900 truncate">
                        {isAr ? item.product.nameAr : item.product.name}
                      </h4>

                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {isAr ? item.selectedColor.nameAr : item.selectedColor.name}
                        {item.selectedStorage ? ` | ${item.selectedStorage.size}` : ''}
                      </p>

                      <p className="font-black text-xs text-emerald-800 mt-1">
                        {formatPrice(itemPrice)}
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-1.5">
                      <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedColor.name, item.selectedStorage?.size, -1)}
                          className="px-2 py-1 hover:bg-slate-100 text-slate-700 font-bold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedColor.name, item.selectedStorage?.size, 1)}
                          className="px-2 py-1 hover:bg-slate-100 text-slate-700 font-bold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id, item.selectedColor.name, item.selectedStorage?.size)}
                        className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Coupon Input */}
              <div className="pt-3 border-t border-slate-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder={isAr ? 'كود الخصم (جرب: ITECH10)' : 'Coupon Code (ITECH10)'}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-slate-800"
                  >
                    {isAr ? 'تطبيق' : 'Apply'}
                  </button>
                </div>
                {discountPercent > 0 && (
                  <p className="text-[11px] text-emerald-700 font-bold mt-1 text-right">
                    {isAr ? `تم تطبيق خصم ${discountPercent}% بنجاح!` : `${discountPercent}% Discount applied!`}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Summary */}
        {!orderComplete && cartItems.length > 0 && !isCheckoutStep && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex justify-between">
                <span>{isAr ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                <span className="font-bold">{formatPrice(rawSubtotalEgp)}</span>
              </div>
              {discountEgp > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>{isAr ? 'الخصم المطبق:' : 'Discount:'}</span>
                  <span>-{formatPrice(discountEgp)}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsCheckoutStep(true)}
              className="w-full bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>{isAr ? 'الانتقال إلى إتمام الطلب' : 'Proceed to Checkout'}</span>
              <ArrowLeft className="w-4 h-4 rtl:rotate-0 rotate-180" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
