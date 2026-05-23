import React from "react";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { ViewType } from "../types";

interface HeaderProps {
  onMenuClick: () => void;
  onNavigate: (view: ViewType) => void;
  cartCount: number;
  onSearchClick: () => void;
}

export default function Header({ onMenuClick, onNavigate, cartCount, onSearchClick }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md dark:bg-surface-container-highest/90 border-b border-outline-variant/30 dark:border-outline-variant/10 shadow-sm flex justify-between items-center px-4 md:px-12 h-16 transition-all duration-300">
      <div className="flex items-center gap-4">
        <button
          id="menu-trigger"
          title="Open Menu"
          onClick={onMenuClick}
          className="text-primary hover:bg-surface-container-low transition-all duration-200 p-2 rounded-full hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1
          onClick={() => onNavigate("home")}
          className="text-2xl md:text-3xl font-serif italic text-primary dark:text-inverse-primary tracking-tight cursor-pointer hover:opacity-90 select-none"
        >
          Heritage Craft
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          title="Search Masterpieces"
          onClick={onSearchClick}
          className="text-primary hover:bg-surface-container-low transition-all duration-200 p-2 rounded-full hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Desktop Cart */}
        <button
          onClick={() => onNavigate("cart")}
          className="hidden md:flex items-center gap-2 px-4 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-all rounded-lg cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-primary" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-sm font-sans font-semibold">Cart</span>
        </button>

        {/* Mobile Cart Button inside Header */}
        <button
          onClick={() => onNavigate("cart")}
          className="md:hidden p-2 hover:bg-surface-container-low transition-all duration-200 rounded-full cursor-pointer relative"
          title="Shopping Cart"
        >
          <ShoppingBag className="w-5 h-5 text-primary" />
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
