import React from "react";
import { CheckCircle2, ShoppingBag, Heart, ArrowRight, Share2, Sparkles, MapPin } from "lucide-react";
import { CartItem, OrderDetails } from "../types";

interface OrderConfirmedViewProps {
  cartItems: CartItem[];
  orderDetails: OrderDetails;
  onContinueShopping: () => void;
}

export default function OrderConfirmedView({
  cartItems,
  orderDetails,
  onContinueShopping
}: OrderConfirmedViewProps) {
  // Generate random order ID
  const orderId = "HC-2026-" + Math.floor(100000 + Math.random() * 900000);

  // Derive target craft centers to display provenance dispatch info
  const centers = Array.from(new Set(cartItems.map((item) => item.product.region)));

  return (
    <main className="pt-28 pb-32 px-4 md:px-12 max-w-3xl mx-auto font-sans animate-fadeIn text-center">
      <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 pattern-overlay -mr-16 -mt-16 rotate-12 pointer-events-none"></div>

        {/* Success check ring */}
        <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md animate-pulse">
          <CheckCircle2 className="w-12 h-12 stroke-current" />
        </div>

        <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider font-sans select-none border border-emerald-200">
          Order Dispatched Successfully
        </span>

        <h2 className="font-serif text-3xl md:text-3.5xl text-primary mt-4 mb-2">
          Thank you for supporting handlooms, {orderDetails.fullName.split(" ")[0]}!
        </h2>
        <p className="text-on-surface-variant text-sm md:text-base max-w-md mx-auto leading-relaxed font-sans mb-8">
          Your order has been registered securely on our decentralized craft ledger. A summary has been routed to your email.
        </p>

        {/* Credentials ledger details card */}
        <div className="bg-white dark:bg-zinc-900 border border-outline-variant/30 rounded-2xl p-6 text-left space-y-4 mb-8 relative">
          <div className="flex justify-between items-center text-xs md:text-sm font-sans select-none border-b border-outline-variant/20 pb-3">
            <div>
              <p className="text-on-surface-variant uppercase tracking-wider text-[10px] font-bold">Receipt Reference</p>
              <p className="font-bold text-primary mt-0.5">{orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-on-surface-variant uppercase tracking-wider text-[10px] font-bold">Delivery Location</p>
              <p className="font-bold text-on-surface mt-0.5">{orderDetails.city}, {orderDetails.state}</p>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider select-none mb-3">
              Provenance Shipping Ledger ({cartItems.length} Masterpiece{cartItems.length > 1 ? "s" : ""})
            </h4>
            <div className="space-y-3 font-sans text-xs">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center gap-2">
                  <span className="font-bold text-on-surface truncate pr-4">
                    {item.product.title} <span className="opacity-60 text-xs">× {item.quantity}</span>
                  </span>
                  <span className="text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded font-mono text-[10px] shrink-0 font-bold border border-emerald-100">
                    Sustained Living Wage
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dispatch location highlights */}
          <div className="pt-3 border-t border-outline-variant/20 bg-surface-container-low/50 -mx-6 -mb-6 p-4 rounded-b-2xl flex flex-wrap gap-2 items-center text-xs">
            <span className="text-primary font-bold uppercase tracking-wider text-[9px] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              Craft Clusters Notified:
            </span>
            {centers.map((center, i) => (
              <span key={i} className="text-on-surface-variant font-semibold">
                {center}{i < centers.length - 1 ? " • " : ""}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons navigation */}
        <div className="flex flex-col md:flex-row gap-4 justify-center font-sans select-none">
          <button
            onClick={onContinueShopping}
            className="w-full md:w-auto bg-primary hover:bg-primary-container text-white px-8 py-3.5 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Continue Discovering Crafts
          </button>

          <button
            onClick={() => {
              // Share trigger simulation
              const text = `I just purchased beautifully authentic Indian masterworks from Heritage Craft! Order code: ${orderId}`;
              if (navigator.share) {
                navigator.share({ title: "Heritage Craft", text, url: window.location.href }).catch(() => {});
              } else {
                alert("Copied shareable reference: " + text);
              }
            }}
            className="w-full md:w-auto border border-outline hover:bg-surface-container-low px-8 py-3.5 rounded-xl font-semibold text-sm transition-all cursor-pointer text-primary flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share Masterpieces
          </button>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-2 items-center text-xs text-on-surface-variant font-sans select-none animate-bounce">
        <Sparkles className="w-4.5 h-4.5 text-primary text-yellow-600 fill-current" />
        <span className="font-semibold text-primary">Every purchase empowers a family unit. Thank you!</span>
      </div>
    </main>
  );
}
