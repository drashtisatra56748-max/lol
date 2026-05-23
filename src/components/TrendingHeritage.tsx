import React, { useState } from "react";
import { Filter, ArrowUpDown, ShoppingCart, Check, Percent } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS_DATA } from "../data";

interface TrendingHeritageProps {
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  activeStateFilter: string | null;
}

export default function TrendingHeritage({
  onProductClick,
  onAddToCart,
  activeStateFilter
}: TrendingHeritageProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"none" | "low-high" | "high-low" | "rating">("none");
  const [showFilters, setShowFilters] = useState(false);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Categories extracted dynamically
  const categories = ["All", "Decor", "Apparel", "Pottery", "Home Textile", "Crafts"];

  // Filter products based on state and category
  let filteredProducts = PRODUCTS_DATA.filter((product) => {
    const matchesState = activeStateFilter ? product.state === activeStateFilter : true;
    const matchesCategory = activeCategory === "All" ? true : product.category === activeCategory;
    return matchesState && matchesCategory;
  });

  // Sort products
  if (sortBy === "low-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "high-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  }

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1500);
  };

  return (
    <section className="px-4 md:px-12 mb-16 font-sans">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl md:text-3xl font-serif text-primary tracking-tight">
            {activeStateFilter ? `${activeStateFilter} Masterpieces` : "Trending Heritage"}
          </h3>
          <p className="text-xs md:text-sm text-on-surface-variant mt-1">
            {filteredProducts.length} items found {activeStateFilter ? `in ${activeStateFilter}` : ""}
          </p>
        </div>

        <div className="flex gap-2">
          {/* Quick Clear Filter */}
          {activeCategory !== "All" && (
            <button
              onClick={() => setActiveCategory("All")}
              className="text-xs bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 px-3 py-1.5 rounded-full cursor-pointer text-primary transition-all font-semibold"
            >
              Reset Category
            </button>
          )}

          {/* Toggle Category List Panel */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-full border border-outline hover:bg-surface-container-low transition-colors cursor-pointer group flex items-center justify-center ${
              showFilters ? "bg-primary text-white border-transparent" : "text-primary bg-transparent"
            }`}
            title="Filter Category"
          >
            <Filter className={`w-5 h-5 ${showFilters ? "text-white" : "text-primary"}`} />
          </button>

          {/* Cycle Sorting Mode */}
          <button
            onClick={() => {
              if (sortBy === "none") setSortBy("low-high");
              else if (sortBy === "low-high") setSortBy("high-low");
              else if (sortBy === "high-low") setSortBy("rating");
              else setSortBy("none");
            }}
            className="p-2 rounded-full border border-outline text-primary hover:bg-surface-container-low transition-colors cursor-pointer flex items-center justify-center gap-1 font-semibold"
            title="Sort Products"
          >
            <ArrowUpDown className="w-5 h-5" />
            <span className="text-xs hidden md:inline">
              {sortBy === "none" && "Popular"}
              {sortBy === "low-high" && "Price ↑"}
              {sortBy === "high-low" && "Price ↓"}
              {sortBy === "rating" && "Top Rated"}
            </span>
          </button>
        </div>
      </div>

      {/* Category selector strip */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-8 bg-surface-container-low/50 border border-outline-variant/20 p-3 rounded-2xl animate-fadeIn">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-sm"
                  : "bg-background text-on-surface-variant hover:text-primary hover:bg-surface-container-high border border-outline-variant/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div className="bg-surface-container-low border border-dashed border-outline-variant p-12 text-center rounded-2xl max-w-lg mx-auto">
          <p className="font-serif text-lg text-primary">No treasures found matching this criteria.</p>
          <p className="text-xs text-on-surface-variant mt-2 mb-6">
            Help sustain our weavers & potters by expanding your state filters.
          </p>
          <button
            onClick={() => {
              setActiveCategory("All");
              setSortBy("none");
            }}
            className="bg-primary text-white text-xs px-4 py-2 rounded-lg font-semibold hover:bg-primary-container transition-all cursor-pointer"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-gutter gap-y-12">
          {filteredProducts.map((product) => {
            const isAdded = addedProductId === product.id;
            return (
              <div
                key={product.id}
                onClick={() => onProductClick(product)}
                className="group cursor-pointer transform duration-300 hover:scale-[1.01]"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-surface-container-low border border-outline-variant/20 shadow-sm group-hover:shadow-md transition-all">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                    src={product.img}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                  />

                  {/* Badges */}
                  {product.isTrending && (
                    <span className="absolute top-3 left-3 bg-tertiary text-on-tertiary text-[9px] font-semibold px-2 py-0.5 rounded tracking-wider uppercase font-sans">
                      TRENDING
                    </span>
                  )}

                  {product.isLimited && (
                    <span className="absolute top-3 left-3 bg-primary-container text-on-primary-container text-[9px] font-semibold px-2 py-0.5 rounded tracking-wider uppercase font-sans">
                      LIMITED
                    </span>
                  )}

                  {product.isHandmade && (
                    <span className="absolute top-3 left-3 bg-secondary-container text-on-secondary-container text-[9px] font-semibold px-2 py-0.5 rounded tracking-wider uppercase font-sans">
                      HANDMADE
                    </span>
                  )}

                  {product.originalPrice && (
                    <span className="absolute top-3 right-3 bg-emerald-700 text-white text-[9px] font-semibold px-2 py-0.5 rounded tracking-wider uppercase font-sans flex items-center gap-1">
                      <Percent className="w-2.5 h-2.5" />
                      OFFER
                    </span>
                  )}

                  {/* Add to Cart quick floating button */}
                  <button
                    onClick={(e) => handleQuickAdd(e, product)}
                    className={`absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 cursor-pointer ${
                      isAdded
                        ? "bg-emerald-600 text-white scale-110"
                        : "bg-white/95 text-primary hover:bg-primary hover:text-white"
                    }`}
                    title="Add to Shopping Cart"
                  >
                    {isAdded ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                  </button>
                </div>

                <p className="text-[11px] font-semibold font-sans text-tertiary uppercase tracking-wider mb-1">
                  {product.state}
                </p>
                <div className="flex justify-between items-start gap-1">
                  <h4 className="text-sm md:text-base font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                    {product.title}
                  </h4>
                  <span className="text-xs text-primary bg-primary/5 px-2 py-0.5 rounded-full flex-shrink-0">
                    ★ {product.rating}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-primary font-bold text-sm md:text-base">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                  {product.originalPrice && (
                    <p className="text-on-surface-variant text-xs line-through opacity-70">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
