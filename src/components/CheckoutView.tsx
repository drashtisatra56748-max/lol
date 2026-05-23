import React, { useState } from "react";
import { ArrowLeft, Lock, ShieldCheck, MapPin, CreditCard, Landmark, ArrowRight, ShieldAlert, Award, PackageCheck } from "lucide-react";
import { CartItem, OrderDetails, Product } from "../types";

interface CheckoutViewProps {
  cartItems: CartItem[];
  appliedPromo: string | null;
  promoDiscount: number;
  onBack: () => void;
  onCompleteCheckout: (details: OrderDetails) => void;
}

export default function CheckoutView({
  cartItems,
  appliedPromo,
  promoDiscount,
  onBack,
  onCompleteCheckout
}: CheckoutViewProps) {
  // Stepper state
  const [activeStep, setActiveStep] = useState<"shipping" | "payment">("shipping");

  // Shipping Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("Maharashtra");
  const [pincode, setPincode] = useState("");
  const [addressType, setAddressType] = useState<"Home" | "Work">("Home");

  // Error validations
  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "Card" | "NetBanking">("Card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});

  // Billing computation
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const finalDiscount = promoDiscount;
  const shippingFee = 0; // Free Shipping
  const gstRate = 0.12; // 12% GST
  const gstTaxes = Math.round((subtotal - finalDiscount) * gstRate);
  const totalDue = subtotal - finalDiscount + shippingFee + gstTaxes;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!fullName) errors.fullName = "Full Name is required";
    if (!phone || phone.length < 8) errors.phone = "Provide a valid phone number";
    if (!street) errors.street = "Street address is required";
    if (!city) errors.city = "City is required";
    if (!pincode || pincode.length < 5) errors.pincode = "Enter a valid postal code";

    if (Object.keys(errors).length > 0) {
      setShippingErrors(errors);
      // scroll to errors
      window.scrollTo({ top: 120, behavior: "smooth" });
    } else {
      setShippingErrors({});
      setActiveStep("payment");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "Card") {
      const errors: Record<string, string> = {};
      if (cardNumber.replace(/\s/g, "").length < 12) errors.cardNumber = "Enter a valid 12-16 digit card number";
      if (!expiry || !expiry.includes("/")) errors.expiry = "Use format MM/YY";
      if (cvv.length < 3) errors.cvv = "CVV must be 3-4 digits";

      if (Object.keys(errors).length > 0) {
        setPaymentErrors(errors);
        return;
      }
    }

    setPaymentErrors({});
    onCompleteCheckout({
      fullName,
      phone,
      street,
      city,
      state: stateName,
      pincode,
      addressType,
      paymentMethod,
      cardNumber,
      expiry,
      cvv
    });
  };

  return (
    <main className="pt-24 pb-stack-lg px-4 md:px-12 max-w-7xl mx-auto font-sans animate-fadeIn">
      
      {/* Top action details row */}
      <div className="flex justify-between items-center mb-8 border-b border-outline-variant/20 pb-4 select-none">
        <button
          onClick={() => {
            if (activeStep === "payment") {
              setActiveStep("shipping");
            } else {
              onBack();
            }
          }}
          className="flex items-center gap-2 text-primary hover:text-primary-container transition-colors font-sans font-semibold text-sm cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{activeStep === "payment" ? "Back to Shipping" : "Back to Bag"}</span>
        </button>

        <div className="flex items-center gap-2 text-primary">
          <span className="hidden md:block text-xs uppercase font-semibold tracking-wider text-on-surface-variant">
            Secure checkout gateway
          </span>
          <Lock className="w-4 h-4" />
        </div>
      </div>

      {/* Grid wrapper */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8">
        
        {/* Checkout Main Column */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Steps Progress Stepper slider */}
          <div className="relative flex justify-between items-center max-w-xl mx-auto mb-10 select-none px-4">
            <div className="absolute inset-x-8 top-[18px] h-0.5 bg-neutral-200 dark:bg-zinc-700 pointer-events-none" />
            <div
              className={`absolute left-8 top-[18px] h-0.5 bg-primary transition-all duration-300 pointer-events-none`}
              style={{ width: activeStep === "payment" ? "90%" : "0%" }}
            />

            {/* Step 1: Shipping */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm text-sm font-bold transition-all ${
                  activeStep === "shipping" || activeStep === "payment"
                    ? "bg-primary text-white"
                    : "bg-surface-container text-on-surface-variant border border-outline-variant"
                }`}
              >
                1
              </div>
              <span className={`text-xs font-semibold ${activeStep === "shipping" ? "text-primary" : "text-on-surface-variant"}`}>
                Shipping
              </span>
            </div>

            {/* Step 2: Payment */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm text-sm font-bold transition-all ${
                  activeStep === "payment"
                    ? "bg-primary text-white"
                    : "bg-surface-container-high text-on-surface-variant border border-outline-variant"
                }`}
              >
                2
              </div>
              <span className={`text-xs font-semibold ${activeStep === "payment" ? "text-primary" : "text-on-surface-variant"}`}>
                Payment
              </span>
            </div>

            {/* Step 3: Confirm */}
            <div className="relative z-10 flex flex-col items-center gap-2 opacity-60">
              <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant border border-outline-variant flex items-center justify-center text-sm font-bold">
                ✓
              </div>
              <span className="text-xs font-semibold text-on-surface-variant">Confirm</span>
            </div>
          </div>

          {/* Conditional Forms rendering */}
          {activeStep === "shipping" ? (
            <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden animate-slideUp">
              <div className="absolute top-0 right-0 w-32 h-32 pattern-overlay -mr-16 -mt-16 rotate-12 pointer-events-none"></div>
              <h2 className="font-serif text-2xl text-primary mb-2">Shipping Address</h2>
              <p className="text-sm text-on-surface-variant mb-6">
                Where should we deliver your handcrafted treasures?
              </p>

              <form onSubmit={handleNextStep} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-on-surface">Full Name</label>
                    <input
                      required
                      type="text"
                      className="bg-surface-container-low border border-outline-variant rounded-lg p-3 outline-none text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                      placeholder="e.g. Aarav Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    {shippingErrors.fullName && (
                      <span className="text-red-600 text-[11px] font-semibold">{shippingErrors.fullName}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-on-surface">Phone Number</label>
                    <input
                      required
                      type="tel"
                      className="bg-surface-container-low border border-outline-variant rounded-lg p-3 outline-none text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {shippingErrors.phone && (
                      <span className="text-red-600 text-[11px] font-semibold">{shippingErrors.phone}</span>
                    )}
                  </div>

                  <div className="md:col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-on-surface">Street Address</label>
                    <input
                      required
                      type="text"
                      className="bg-surface-container-low border border-outline-variant rounded-lg p-3 outline-none text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                      placeholder="Building, Lane, Flat No, Area"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                    {shippingErrors.street && (
                      <span className="text-red-600 text-[11px] font-semibold">{shippingErrors.street}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-on-surface">City</label>
                    <input
                      required
                      type="text"
                      className="bg-surface-container-low border border-outline-variant rounded-lg p-3 outline-none text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                      placeholder="Mumbai"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    {shippingErrors.city && (
                      <span className="text-red-600 text-[11px] font-semibold">{shippingErrors.city}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-on-surface">State</label>
                    <select
                      className="bg-surface-container-low border border-outline-variant rounded-lg p-3 outline-none text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                    >
                      <option>Maharashtra</option>
                      <option>Rajasthan</option>
                      <option>Karnataka</option>
                      <option>West Bengal</option>
                      <option>Bihar</option>
                      <option>Odisha</option>
                      <option>Telangana</option>
                      <option>Chhattisgarh</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-on-surface">Pincode</label>
                    <input
                      required
                      type="text"
                      maxLength={6}
                      className="bg-surface-container-low border border-outline-variant rounded-lg p-3 outline-none text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                      placeholder="400001"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                    />
                    {shippingErrors.pincode && (
                      <span className="text-red-600 text-[11px] font-semibold">{shippingErrors.pincode}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5 select-none md:col-span-2">
                    <label className="text-xs font-semibold text-on-surface">Address Type</label>
                    <div className="flex gap-4 mt-1">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="addr-type"
                          checked={addressType === "Home"}
                          onChange={() => setAddressType("Home")}
                          className="text-primary focus:ring-primary h-4.5 w-4.5"
                        />
                        <span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors">
                          Home
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="addr-type"
                          checked={addressType === "Work"}
                          onChange={() => setAddressType("Work")}
                          className="text-primary focus:ring-primary h-4.5 w-4.5"
                        />
                        <span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors">
                          Work
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-container text-white py-3.5 rounded-xl font-sans font-semibold tracking-wider text-xs uppercase shadow-sm active:scale-95 transition-all flex justify-center items-center gap-2 cursor-pointer mt-6"
                >
                  Proceed to Payment Selection
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </section>
          ) : (
            <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 md:p-8 shadow-sm animate-slideUp">
              <h2 className="font-serif text-2xl text-primary mb-2">Payment Method</h2>
              <p className="text-sm text-on-surface-variant mb-6">
                Select your preferred secure payment gateway options
              </p>

              <form onSubmit={handleCompleteOrder} className="space-y-4">
                
                {/* UPI Accordion Item */}
                <div
                  onClick={() => setPaymentMethod("UPI")}
                  className={`p-4 border rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === "UPI"
                      ? "border-primary bg-primary-fixed/5 ring-1 ring-primary"
                      : "border-outline-variant hover:bg-surface-container-low"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-secondary-fixed rounded-lg text-secondary">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold text-sm text-on-surface">UPI Payments</h4>
                      <p className="text-[11px] text-on-surface-variant">PhonePe, Google Pay, BHIM, Paytm</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="pay-method"
                    checked={paymentMethod === "UPI"}
                    onChange={() => setPaymentMethod("UPI")}
                    className="text-primary focus:ring-primary h-5 w-5"
                  />
                </div>

                {/* Card Accordion Item */}
                <div
                  className={`border rounded-xl transition-all overflow-hidden ${
                    paymentMethod === "Card"
                      ? "border-primary-container bg-primary-fixed/10 ring-2 ring-primary-container"
                      : "border-outline-variant"
                  }`}
                >
                  <div
                    onClick={() => setPaymentMethod("Card")}
                    className="p-4 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-primary-container/10 rounded-lg text-primary">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-sans font-semibold text-sm text-on-surface">Credit / Debit Card</h4>
                        <p className="text-[11px] text-on-surface-variant">Visa, Mastercard, RuPay, AMEX</p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="pay-method"
                      checked={paymentMethod === "Card"}
                      onChange={() => setPaymentMethod("Card")}
                      className="text-primary focus:ring-primary h-5 w-5"
                    />
                  </div>

                  {paymentMethod === "Card" && (
                    <div className="p-4 border-t border-outline-variant/30 grid grid-cols-2 gap-4 animate-slideDown bg-white dark:bg-zinc-900/50">
                      <div className="col-span-2 flex flex-col gap-1">
                        <input
                          type="text"
                          required
                          maxLength={19}
                          placeholder="Card Number (XXXX XXXX XXXX XXXX)"
                          className="bg-background border border-outline-variant rounded-lg p-3 outline-none text-sm transition-all focus:ring-2 focus:ring-primary-container"
                          value={cardNumber}
                          onChange={(e) => {
                            // auto space formatting
                            const v = e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
                            setCardNumber(v);
                          }}
                        />
                        {paymentErrors.cardNumber && (
                          <span className="text-red-700 text-[10px] font-semibold">{paymentErrors.cardNumber}</span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1">
                        <input
                          type="text"
                          required
                          maxLength={5}
                          placeholder="MM/YY"
                          className="bg-background border border-outline-variant rounded-lg p-3 outline-none text-sm transition-all focus:ring-2 focus:ring-primary-container"
                          value={expiry}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, "");
                            if (v.length >= 2) {
                              setExpiry(v.slice(0, 2) + "/" + v.slice(2, 4));
                            } else {
                              setExpiry(v);
                            }
                          }}
                        />
                        {paymentErrors.expiry && (
                          <span className="text-red-700 text-[10px] font-semibold">{paymentErrors.expiry}</span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1">
                        <input
                          type="password"
                          required
                          maxLength={3}
                          placeholder="CVV"
                          className="bg-background border border-outline-variant rounded-lg p-3 outline-none text-sm transition-all focus:ring-2 focus:ring-primary-container"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                        />
                        {paymentErrors.cvv && (
                          <span className="text-red-700 text-[10px] font-semibold">{paymentErrors.cvv}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Net Banking Item */}
                <div
                  onClick={() => setPaymentMethod("NetBanking")}
                  className={`p-4 border rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === "NetBanking"
                      ? "border-primary bg-primary-fixed/5 ring-1 ring-primary"
                      : "border-outline-variant hover:bg-surface-container-low"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-tertiary-fixed rounded-lg text-tertiary">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold text-sm text-on-surface">Net Banking</h4>
                      <p className="text-[11px] text-on-surface-variant">All prominent state and national banks</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="pay-method"
                    checked={paymentMethod === "NetBanking"}
                    onChange={() => setPaymentMethod("NetBanking")}
                    className="text-primary focus:ring-primary h-5 w-5"
                  />
                </div>

                {/* AES Secure bar */}
                <div className="mt-6 flex items-center gap-3 p-3 bg-surface-container rounded-lg border border-outline-variant/30 select-none">
                  <ShieldCheck className="w-5 h-5 text-secondary fill-current opacity-70" />
                  <p className="text-[11px] text-on-surface-variant font-medium leading-relaxed">
                    Your secure transaction is authenticated with 256-bit seamless AES military-grade standard algorithms.
                  </p>
                </div>

                {/* Validation and Submit buttons */}
                <div className="flex gap-4 pt-6 select-none">
                  <button
                    type="button"
                    onClick={() => setActiveStep("shipping")}
                    className="w-1/3 bg-surface-container hover:bg-neutral-200 text-on-surface py-3.5 rounded-xl font-sans font-semibold text-xs tracking-wide uppercase transition-all cursor-pointer"
                  >
                    Go Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-primary hover:bg-primary-container text-white py-3.5 rounded-xl font-sans font-semibold tracking-wider text-xs uppercase shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer font-bold"
                  >
                    Complete Order
                  </button>
                </div>
              </form>
            </section>
          )}
        </div>

        {/* Sidebar Order Summary Panel */}
        <div className="lg:col-span-4 mt-12 lg:mt-0 select-none">
          <aside className="sticky top-24 space-y-6">
            <div className="bg-surface-container-high rounded-3xl p-6 border border-outline-variant/20 shadow-md">
              <h3 className="font-serif text-xl md:text-2xl text-primary mb-6 border-b border-outline-variant/20 pb-3">
                Order Summary
              </h3>

              {/* Grid scroll elements */}
              <div className="max-h-60 overflow-y-auto custom-scrollbar pr-2 mb-6 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-4 animate-fadeIn">
                    <img
                      className="w-14 h-14 object-cover rounded-lg border border-outline-variant/30 flex-shrink-0"
                      src={item.product.img}
                      alt={item.product.title}
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-sans font-bold text-xs text-on-surface truncate">
                        {item.product.title}
                      </h5>
                      <span className="text-[10px] text-on-surface-variant font-mono">
                        Qty: {item.quantity} • Origin: {item.product.state}
                      </span>
                      <p className="text-xs font-bold text-primary mt-0.5">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <hr className="border-outline-variant/20 my-4" />

              <div className="space-y-3 text-sm font-sans">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span>
                  <span className="font-semibold text-on-surface">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount Coupon ({appliedPromo})</span>
                    <span>-₹{finalDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="flex justify-between text-on-surface-variant">
                  <span>Shipping Fee</span>
                  <span className="font-bold text-emerald-700">FREE</span>
                </div>

                <div className="flex justify-between text-on-surface-variant">
                  <span>Regional GST (12%)</span>
                  <span className="font-semibold text-on-surface">
                    ₹{gstTaxes.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="pt-4 border-t border-primary/20 flex justify-between items-end">
                  <span className="font-serif font-semibold text-primary text-base">Total Due</span>
                  <div className="text-right">
                    <span className="block text-xl font-bold text-primary font-serif">
                      ₹{totalDue.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-on-surface-variant mt-0.5 block opacity-70">
                      Inclusive of all taxes
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges bottom block */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low border border-outline-variant/20 p-4 rounded-xl flex flex-col items-center text-center gap-1.5 hover:bg-white transition-colors duration-200">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-[9px] font-sans font-semibold uppercase tracking-wider text-on-surface-variant">
                  Authentic Crafts
                </span>
              </div>
              <div className="bg-surface-container-low border border-outline-variant/20 p-4 rounded-xl flex flex-col items-center text-center gap-1.5 hover:bg-white transition-colors duration-200">
                <PackageCheck className="w-5 h-5 text-primary" />
                <span className="text-[9px] font-sans font-semibold uppercase tracking-wider text-on-surface-variant">
                  Eco-Safe Packing
                </span>
              </div>
            </div>
          </aside>
        </div>

      </div>
    </main>
  );
}
