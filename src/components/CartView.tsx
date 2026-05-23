import React, { useState } from "react";
import { Trash2, HelpCircle, ShieldAlert, Truck, Sparkles, Tag, ArrowRight } from "lucide-react";
import { CartItem, Product } from "../types";
import { PRODUCTS_DATA } from "../data";

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: (appliedPromoCode: string | null, appliedDiscount: number) => void;
}

export default function CartView({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}: CartViewProps) {
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoDiscountPct, setPromoDiscountPct] = useState(0);

  // Financial constants
  const shippingFee = cartItems.length > 0 ? 250 : 0;
  const artisanalTaxRate = 0.028; // ~2.8% tax margin

  // Compute subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Promo code validation
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoInput.trim().toUpperCase();

    if (cleanCode === "HERITAGE10") {
      setAppliedPromo("HERITAGE10");
      setPromoDiscountPct(0.10);
      setPromoError(null);
    } else if (cleanCode === "HERITAGE15" || cleanCode === "CRAFT15") {
      setAppliedPromo(cleanCode);
      setPromoDiscountPct(0.15);
      setPromoError(null);
    } else if (cleanCode === "ARTISAN20") {
      setAppliedPromo("ARTISAN20");
      setPromoDiscountPct(0.20);
      setPromoError(null);
    } else {
      setPromoError("Invalid code. Try using 'HERITAGE10' or 'HERITAGE15'!");
      setAppliedPromo(null);
      setPromoDiscountPct(0);
    }
    setPromoInput("");
  };

  const discountAmount = subtotal * promoDiscountPct;
  const artisanalTaxFees = Math.round((subtotal - discountAmount) * artisanalTaxRate);
  const grossFinalPrice = Math.max(0, subtotal - discountAmount + shippingFee + artisanalTaxFees);

  const handleProceed = () => {
    onProceedToCheckout(appliedPromo, discountAmount);
  };

  if (cartItems.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 md:px-12 mt-28 mb-32 text-center py-16 animate-fadeIn font-sans">
        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
          <ShoppingBagPlaceholder opacity={0.8} />
        </div>
        <h2 className="text-3xl font-serif text-primary">Your Shopping Bag is Empty</h2>
        <p className="text-on-surface-variant text-sm md:text-base mt-2 max-w-md mx-auto leading-relaxed">
          The looms of Maheshwar and pottery studios of Jaipur are waiting to decorate your home block.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-8 bg-primary hover:bg-primary-container text-white px-8 py-3 rounded-xl text-sm font-sans font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
        >
          EXPLORE CATALOGUE
        </button>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-32 px-4 md:px-12 max-w-7xl mx-auto pattern-bg min-h-screen animate-fadeIn font-sans select-none">
      <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8">
        
        {/* Shopping Cart List Column */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-1">
            <h2 className="font-serif text-3xl md:text-4xl text-on-surface font-medium">Your Shopping Bag</h2>
            <p className="text-on-surface-variant text-sm md:text-base font-sans">
              You have {cartItems.length} artisanal item{cartItems.length > 1 ? "s" : ""} ready for checkout.
            </p>
          </div>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 md:gap-6 p-4 md:p-6 bg-surface-bright rounded-2xl border border-outline-variant/40 shadow-sm transition-all hover:shadow-md animate-slideUp"
              >
                {/* Thumb */}
                <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-surface-container overflow-hidden rounded-xl border border-outline-variant/10">
                  <img
                    className="w-full h-full object-cover select-none"
                    src={item.product.img}
                    alt={item.product.title}
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Info and changers */}
                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-tertiary font-sans font-semibold text-xs uppercase tracking-wider block mb-1">
                        {item.product.state}
                      </span>
                      <h3 className="font-serif text-lg md:text-xl text-on-surface leading-tight font-medium">
                        {item.product.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-on-surface-variant hover:text-error transition-all p-1.5 rounded-full hover:bg-error/5 cursor-pointer"
                      title="Delete item"
                    >
                      <Trash2 className="w-4 h-5" />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-outline rounded-lg bg-surface-container-lowest overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="px-3 py-1 hover:bg-surface-variant transition-colors font-bold text-sm cursor-pointer"
                        title="Decrease"
                      >
                        -
                      </button>
                      <span className="px-3.5 py-1 font-bold text-sm text-on-surface select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-surface-variant transition-colors font-bold text-sm cursor-pointer"
                        title="Increase"
                      >
                        +
                      </button>
                    </div>

                    {/* Price tally */}
                    <div className="text-right">
                      <span className="font-sans font-bold text-primary text-base md:text-lg">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                      {item.quantity > 1 && (
                        <p className="text-[10px] text-on-surface-variant">
                          ₹{item.product.price.toLocaleString("en-IN")} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Promo code accordion form */}
          <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
            <h4 className="text-xs font-sans font-bold text-on-surface uppercase tracking-wider mb-2 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-primary" />
              Promotion & Coupons
            </h4>
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Enter HERITAGE10 or HERITAGE15..."
                className="bg-white dark:bg-zinc-900 border border-outline-variant/65 rounded-lg px-3 py-2 text-xs md:text-sm outline-none flex-grow"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-container text-white px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
              >
                Apply Coupon
              </button>
            </form>
            {promoError && (
              <p className="text-red-600 text-xs mt-1.5 font-semibold">
                ⚠️ {promoError}
              </p>
            )}
            {appliedPromo && (
              <div className="flex items-center justify-between text-emerald-700 bg-emerald-50 border border-emerald-200/50 p-2 rounded-lg text-xs mt-2 font-semibold">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-4.5 h-4.5 text-emerald-600" />
                  Promo Applied: '{appliedPromo}' ({(promoDiscountPct * 100)}% off first buy!)
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setAppliedPromo(null);
                    setPromoDiscountPct(0);
                  }}
                  className="text-[10px] text-red-600 underline hover:text-red-800"
                >
                  Clear Coupon
                </button>
              </div>
            )}
            <p className="text-[10px] text-on-surface-variant mt-2 tracking-wide uppercase opacity-70">
              💡 Hint: Enter "HERITAGE15" inside Coupon box for 15% discount on checkout.
            </p>
          </div>
        </div>

        {/* Sidebar Order Summary panel */}
        <div className="lg:col-span-4 mt-12 lg:mt-0">
          <div className="sticky top-24 p-6 md:p-8 bg-surface-container-low rounded-2xl border border-outline-variant/20 shadow-lg">
            <h2 className="font-serif text-xl md:text-2xl mb-6 text-on-surface font-medium border-b border-outline-variant/20 pb-3">
              Summary
            </h2>
            <div className="space-y-4 mb-6 font-sans text-sm">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span className="font-semibold text-on-surface">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              {promoDiscountPct > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount ({(promoDiscountPct * 100)}%)</span>
                  <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="flex justify-between text-on-surface-variant">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-on-surface">
                  ₹{shippingFee.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between text-on-surface-variant">
                <span className="flex items-center gap-1">
                  Artisanal Tax (2.8%)
                  <HelpCircle className="w-3.5 h-3.5 opacity-60" title="Supports Indian artisan pensions" />
                </span>
                <span className="font-semibold text-on-surface">
                  ₹{artisanalTaxFees.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="h-px bg-outline-variant/30 my-4" />

              <div className="flex justify-between text-on-surface font-bold text-lg md:text-xl items-baseline">
                <span>Total</span>
                <span className="text-primary font-serif">
                  ₹{grossFinalPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <button
              onClick={handleProceed}
              className="w-full bg-primary hover:bg-primary-container text-on-primary py-4 rounded-xl font-sans font-semibold tracking-wider text-xs md:text-sm uppercase shadow-md active:scale-95 transition-all flex justify-center items-center gap-2 cursor-pointer"
            >
              PROCEED TO CHECKOUT
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-[10px] text-on-surface-variant uppercase tracking-widest mt-4 leading-relaxed font-semibold">
              Handcrafted products may take 5-7 days for delivery
            </p>

            <div className="mt-8 pt-8 border-t border-outline-variant/30 flex flex-col gap-4 font-sans text-xs">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-secondary flex-shrink-0" />
                <div>
                  <p className="font-bold text-on-surface">Secure Transaction Protection</p>
                  <p className="text-on-surface-variant">
                    Protected by 256-bit bank-grade encryption algorithms
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-secondary flex-shrink-0" />
                <div>
                  <p className="font-bold text-on-surface">Insured Transit Shipping</p>
                  <p className="text-on-surface-variant">
                    Every parcel is insured against regional transit damage or loss
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Inline decorative mini cart svg placeholder
function ShoppingBagPlaceholder(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="32"
      height="32"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
