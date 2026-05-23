/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Sparkles, Map, Heart, Search, X, ShieldAlert, Award, Package2, HelpCircle } from "lucide-react";
import { Product, CartItem, OrderDetails, ViewType } from "./types";
import { PRODUCTS_DATA } from "./data";
import { AnimatePresence } from "motion/react";

// Subcomponents
import Header from "./components/Header";
import NavigationDrawer from "./components/NavigationDrawer";
import HeroBanner from "./components/HeroBanner";
import StateBrowse from "./components/StateBrowse";
import TrendingHeritage from "./components/TrendingHeritage";
import ProductDetailsView from "./components/ProductDetailsView";
import CartView from "./components/CartView";
import CheckoutView from "./components/CheckoutView";
import OrderConfirmedView from "./components/OrderConfirmedView";
import AICraftAssistant from "./components/AICraftAssistant";
import StateDirectoryView from "./components/StateDirectoryView";

export default function App() {
  // Navigation & Views
  const [activeView, setActiveView] = useState<ViewType>("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Search Panels State
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  // Cart Management
  // Initialise cart with the exact items seen in the shopping cart screenshot to verify visual equivalence
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    // Populate cart with default items for high-fidelity interactive testing
    const defaultProduct1 = PRODUCTS_DATA.find((p) => p.id === "ikat-cotton-throw") || PRODUCTS_DATA[1];
    const defaultProduct2 = PRODUCTS_DATA.find((p) => p.id === "terracotta-vase") || PRODUCTS_DATA[2];

    setCart([
      { product: defaultProduct1, quantity: 1 },
      { product: defaultProduct2, quantity: 1 }
    ]);
  }, []);

  // Checkout codes & records
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [finalOrderDetails, setFinalOrderDetails] = useState<OrderDetails | null>(null);

  // Helper popup modals for drawer option clicks
  const [infoModalContent, setInfoModalContent] = useState<{ title: string; text: string } | null>(null);

  // Update dynamic search listings
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const cleanQ = searchQuery.toLowerCase();
    const results = PRODUCTS_DATA.filter(
      (p) =>
        p.title.toLowerCase().includes(cleanQ) ||
        p.state.toLowerCase().includes(cleanQ) ||
        p.category.toLowerCase().includes(cleanQ)
    );
    setSearchResults(results);
  }, [searchQuery]);

  // Cart actions
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, qty: number) => {
    setCart((prev) => prev.map((item) => (item.product.id === productId ? { ...item, quantity: qty } : item)));
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleProceedToCheckout = (promoCode: string | null, discount: number) => {
    setAppliedPromo(promoCode);
    setPromoDiscount(discount);
    setActiveView("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCheckoutSuccess = (details: OrderDetails) => {
    setFinalOrderDetails(details);
    setActiveView("orderConfirmed");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearOrderConfirmed = () => {
    setCart([]);
    setAppliedPromo(null);
    setPromoDiscount(0);
    setFinalOrderDetails(null);
    setSelectedState(null);
    setSelectedProduct(null);
    setActiveView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Inspect suggested product from AI
  const handleAISuggestedProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveView("detail");
  };

  // Handle slide select navigation options
  const handleSelectStateFromSlide = (val: string | null) => {
    if (val === "all_directory") {
      setActiveView("explore");
    } else {
      setSelectedState(val);
      setActiveView("home");
    }
  };

  // Drawer options modal triggers
  const handleSelectDrawerOption = (option: string) => {
    if (option === "heritage") {
      setInfoModalContent({
        title: "Our Generational Heritage",
        text: "Heritage Craft bridges ancient Indian craftsmanship with modern digital ecosystems. Every single piece is physically hand-painted, hand-loomed, or clay-thrown in rural clusters. By procuring through our verified network, over 85% of values flow directly back to master artisans and spinners, safeguarding these timelines."
      });
    } else if (option === "stories") {
      setInfoModalContent({
        title: "Artisan Living Narratives",
        text: "From Smt. Dulari Devi's meticulous double-lined Madhubani paints to the antique Bastar wire-wraps crafted by lost-wax master alloyers, our directory details the biography of each craftsperson. We issue digital authenticity ledger logs on checkout."
      });
    } else if (option === "states") {
      setActiveView("explore");
    } else if (option === "sustainability") {
      setInfoModalContent({
        title: "Decarbonised & Green Sourcing",
        text: "Sustainability represents our core principle. We reject plastic packaging completely, utilizing organic hand-spun cotton wrappers, sugarcane paper boxes, and direct river-clay protectors. All vegetable pigments are organically grown on local household micro-farms."
      });
    } else if (option === "help") {
      setInfoModalContent({
        title: "Heritage Craft Support Desk",
        text: "Need assistance with your handcrafted order? Connect with our dedicated support agents via support@heritagecraft.in or call our craft cluster hotline. Direct transit insurances are bundled automatically on all items."
      });
    }
  };

  // Calculated variables
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary/20 relative flex flex-col">
      {/* Search overlay panel */}
      <AnimatePresence>
        {showSearchPanel && (
          <div className="fixed inset-0 bg-black/60 z-[150] backdrop-blur-sm flex justify-center items-start pt-10 px-4">
            <div className="bg-white dark:bg-zinc-900 border border-outline-variant/30 w-full max-w-2xl rounded-2xl shadow-2xl p-6 font-sans">
              <div className="flex justify-between items-center border-b border-outline-variant/20 pb-3 mb-4">
                <div className="flex items-center gap-2 text-primary">
                  <Search className="w-5 h-5" />
                  <span className="font-serif italic text-lg">Search Masterpieces</span>
                </div>
                <button
                  onClick={() => {
                    setShowSearchPanel(false);
                    setSearchQuery("");
                  }}
                  className="bg-surface-container hover:bg-neutral-200 text-primary p-1 rounded-full cursor-pointer"
                  title="Close Search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <input
                autoFocus
                type="text"
                placeholder="Search by state, craft type (e.g., pottery, wood, silk)..."
                className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 outline-none text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* Suggestions results loop */}
              <div className="mt-4 max-h-72 overflow-y-auto custom-scrollbar space-y-2">
                {searchQuery.trim() && searchResults.length === 0 && (
                  <p className="text-xs text-on-surface-variant italic py-4 text-center">
                    No masterpieces found matching your keyword.
                  </p>
                )}
                {searchResults.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedProduct(p);
                      setShowSearchPanel(false);
                      setSearchQuery("");
                      setActiveView("detail");
                    }}
                    className="flex items-center gap-3 p-2 hover:bg-primary/5 rounded-xl cursor-pointer border border-transparent hover:border-primary/10 transition-colors"
                  >
                    <img src={p.img} alt={p.title} className="w-10 h-10 rounded object-cover" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-on-surface truncate">{p.title}</p>
                      <p className="text-[10px] text-on-surface-variant font-mono uppercase">
                        {p.state} • {p.category}
                      </p>
                    </div>
                    <span className="ml-auto font-sans text-xs text-primary font-bold">
                      ₹{p.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic educational information dialog popup */}
      <AnimatePresence>
        {infoModalContent && (
          <div className="fixed inset-0 bg-black/60 z-[200] backdrop-blur-sm flex justify-center items-center px-4">
            <div className="bg-background border border-outline-variant/30 w-full max-w-md rounded-2xl shadow-2xl p-6 md:p-8 font-sans">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-serif text-2xl text-primary">{infoModalContent.title}</h3>
                <button
                  onClick={() => setInfoModalContent(null)}
                  className="bg-surface-container hover:bg-neutral-200 text-primary p-1 rounded-full cursor-pointer"
                  title="Close popup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed text-left">
                {infoModalContent.text}
              </p>
              <button
                onClick={() => setInfoModalContent(null)}
                className="w-full mt-6 bg-primary text-white py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Accept & Proceed
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Header element */}
      <Header
        onMenuClick={() => setDrawerOpen(true)}
        onNavigate={(v) => {
          setActiveView(v);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        cartCount={cartItemsCount}
        onSearchClick={() => setShowSearchPanel(true)}
      />

      {/* Drawer overlay */}
      <NavigationDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSelectOption={handleSelectDrawerOption}
      />

      {/* Primary view render triggers */}
      <div className="flex-grow pt-16">
        {activeView === "home" && (
          <>
            {/* Carousel Banner Block */}
            <HeroBanner />

            {/* Slider list */}
            <StateBrowse selectedState={selectedState} onSelectState={handleSelectStateFromSlide} />

            {/* Product lists */}
            <TrendingHeritage
              onProductClick={(p) => {
                setSelectedProduct(p);
                setActiveView("detail");
              }}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              activeStateFilter={selectedState}
            />

            {/* Curated Saffron palette highlights seen in mockup */}
            <section className="bg-tertiary-container text-on-tertiary-container py-16 px-4 md:px-12 mb-12 relative overflow-hidden rounded-2xl select-none mx-4 md:mx-12 font-sans shadow-inner border border-outline-variant/10">
              <div className="absolute top-0 right-0 w-64 h-64 mandala-overlay opacity-10 -rotate-45 pointer-events-none"></div>
              <div className="max-w-3xl relative z-10 space-y-4">
                <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-sans font-bold tracking-widest px-3 py-1 rounded">
                  PALETTE SPECIFICATION
                </span>
                <h3 className="text-3xl md:text-4.5xl font-serif text-tertiary-fixed leading-tight">
                  The Saffron Collection
                </h3>
                <p className="text-sm md:text-lg opacity-90 leading-relaxed font-sans max-w-2xl">
                  Embrace the vibrant energy of Indian festivals with our curated collection of handloom textiles and ceramic vessels in shades of sacred turmeric, marigold, and brick saffron.
                </p>
                <button
                  onClick={() => {
                    setSelectedState(null);
                    window.scrollTo({ top: 800, behavior: "smooth" });
                  }}
                  className="bg-tertiary-fixed hover:bg-tertiary-fixed/90 text-on-tertiary-fixed px-6 py-2.5 rounded-lg text-xs font-sans font-semibold hover:brightness-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-transparent"
                >
                  EXPLORE THE VIBRANCE
                </button>
              </div>
            </section>
          </>
        )}

        {activeView === "detail" && selectedProduct && (
          <ProductDetailsView
            product={selectedProduct}
            onBack={() => {
              setActiveView("home");
              setSelectedProduct(null);
            }}
            onAddToCart={handleAddToCart}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {activeView === "cart" && (
          <CartView
            cartItems={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            onProceedToCheckout={handleProceedToCheckout}
          />
        )}

        {activeView === "checkout" && (
          <CheckoutView
            cartItems={cart}
            appliedPromo={appliedPromo}
            promoDiscount={promoDiscount}
            onBack={() => setActiveView("cart")}
            onCompleteCheckout={handleCheckoutSuccess}
          />
        )}

        {activeView === "orderConfirmed" && finalOrderDetails && (
          <OrderConfirmedView
            cartItems={cart}
            orderDetails={finalOrderDetails}
            onContinueShopping={handleClearOrderConfirmed}
          />
        )}

        {activeView === "explore" && (
          <StateDirectoryView
            onBack={() => setActiveView("home")}
            onSelectState={(stateName) => {
              setSelectedState(stateName);
              setActiveView("home");
            }}
          />
        )}
      </div>

      {/* Desktop & Mobile bottom informational block */}
      <footer className="py-12 bg-surface-container-low border-t border-outline-variant/20 px-4 md:px-12 font-sans select-none hidden md:block">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="font-serif text-primary italic text-2xl">Heritage Craft</h3>
            <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed">
              Empowering master artisans across rural Bharat by delivering authentic hand-woven, hand-cast, or clay-fired treasures directly to modern doorways.
            </p>
          </div>
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-on-surface mb-4">
              The Collective
            </h4>
            <ul className="space-y-2 text-xs md:text-sm text-on-surface-variant">
              <li>
                <button onClick={() => handleSelectDrawerOption("heritage")} className="hover:text-primary cursor-pointer text-left">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => handleSelectDrawerOption("sustainability")} className="hover:text-primary cursor-pointer text-left">
                  Sustainability Initiative
                </button>
              </li>
              <li>
                <button onClick={() => handleSelectDrawerOption("stories")} className="hover:text-primary cursor-pointer text-left">
                  Artisan Bios
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-on-surface mb-4">
              Support Services
            </h4>
            <ul className="space-y-2 text-xs md:text-sm text-on-surface-variant">
              <li>
                <button onClick={() => handleSelectDrawerOption("help")} className="hover:text-primary cursor-pointer text-left">
                  Shipping Inquiries
                </button>
              </li>
              <li>
                <button onClick={() => handleSelectDrawerOption("help")} className="hover:text-primary cursor-pointer text-left">
                  Bespoke Insurance
                </button>
              </li>
              <li>
                <button onClick={() => handleSelectDrawerOption("help")} className="hover:text-primary cursor-pointer text-left">
                  Return Policies
                </button>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-on-surface mb-4">
              Sustainable Integrity
            </h4>
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-1.5 opacity-80" title="100% Cotton wrapping">
                <Package2 className="w-5 h-5 text-primary" />
                <span className="text-[9px] uppercase tracking-wide text-on-surface-variant font-bold">BIO-WRAP</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 opacity-80" title="Direct livelihood pensions">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-[9px] uppercase tracking-wide text-on-surface-variant font-bold">FAIR-WAGE</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Interactive Educational Helper widget */}
      <AICraftAssistant onSuggestProduct={handleAISuggestedProduct} />

      {/* Bottom Navigation Bar for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-[70] bg-surface/95 backdrop-blur-md dark:bg-zinc-950/95 border-t border-outline-variant/30 select-none flex justify-around items-center py-2.5 pb-safe rounded-t-2xl shadow-lg">
        <button
          onClick={() => {
            setSelectedState(null);
            setSelectedProduct(null);
            setActiveView("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer w-16 transition-all ${
            activeView === "home" ? "text-primary scale-105 font-bold" : "text-on-surface-variant/70 hover:text-primary"
          }`}
        >
          <HomeIcon className="w-5 h-5" />
          <span className="text-[9px] font-sans font-semibold tracking-wide uppercase">Home</span>
        </button>

        <button
          onClick={() => {
            setActiveView("explore");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer w-16 transition-all ${
            activeView === "explore" ? "text-primary scale-105 font-bold" : "text-on-surface-variant/70 hover:text-primary"
          }`}
        >
          <MapIcon className="w-5 h-5" />
          <span className="text-[9px] font-sans font-semibold tracking-wide uppercase">Explore</span>
        </button>

        <button
          onClick={() => {
            setActiveView("cart");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer w-16 transition-all relative ${
            activeView === "cart" ? "text-primary scale-105 font-bold" : "text-on-surface-variant/70 hover:text-primary"
          }`}
        >
          <svg
            className="w-5 h-5 stroke-current"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {cartItemsCount > 0 && (
            <span className="absolute -top-1 right-2 bg-primary text-white text-[9px] font-sans font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
              {cartItemsCount}
            </span>
          )}
          <span className="text-[9px] font-sans font-semibold tracking-wide uppercase">Cart</span>
        </button>

        <button
          onClick={() => {
            // Trigger quick heritage history modal
            handleSelectDrawerOption("heritage");
          }}
          className="flex flex-col items-center justify-center gap-1 cursor-pointer w-16 text-on-surface-variant/70 hover:text-primary text-xs"
        >
          <Award className="w-5 h-5 text-primary" />
          <span className="text-[9px] font-sans font-bold tracking-wide uppercase text-primary">Provenance</span>
        </button>
      </nav>
    </div>
  );
}

// Minimal vector navigations
function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function MapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  );
}
