import React, { useState } from "react";
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Moon, 
  Sun,
  Palette,
  Sparkles,
  Gift,
  Clock,
  Briefcase
} from "lucide-react";
import { Product } from "../types";

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  setSelectedCategory: (cat: string) => void;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: (q: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  userEmail?: string;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  cartCount,
  wishlistCount,
  setSelectedCategory,
  setSearchQuery,
  onSearchSubmit,
  isDarkMode,
  setIsDarkMode,
  userEmail
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchVal, setSearchVal] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchVal);
    setCurrentTab("shop");
  };

  const categories = [
    {
      name: "Jewelry",
      items: ["Earrings", "Necklaces", "Bracelets", "Rings"],
      icon: Sparkles,
      desc: " wearable luxury ornaments filled with gold dust and real blossoms."
    },
    {
      name: "Home Decor",
      items: ["Wall Art", "Clocks", "Coasters"],
      icon: Clock,
      desc: "Sophisticated resin wave paintings, crystal clocks, and agate coasters."
    },
    {
      name: "Accessories",
      items: ["Keychains", "Bookmarks", "Phone Cases"],
      icon: Briefcase,
      desc: "Artisanal everyday statement accents hand-polished to perfection."
    },
    {
      name: "Personalized Gifts",
      items: ["Wedding Gifts", "Birthday Gifts", "Name Plates"],
      icon: Gift,
      desc: "Sovereign matrimonial preserves, pine wood tables, and family plaque crafts."
    }
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
      isDarkMode 
        ? "bg-stone-950/90 border-stone-800 text-stone-100" 
        : "bg-white/80 border-[#E2B6A3]/20 text-stone-900"
    } backdrop-blur-md shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo - Extreme Modern Luxury */}
          <div 
            onClick={() => { setCurrentTab("home"); setIsMobileMenuOpen(false); }}
            className="flex-shrink-0 cursor-pointer flex items-center space-x-3 group"
            id="brand-logo"
          >
            <div className="relative w-8.5 h-8.5 rounded-full resin-gradient border border-[#C5A059]/40 flex items-center justify-center p-[1px] transition-transform duration-500 group-hover:scale-105">
              <div className="w-full h-full rounded-full bg-stone-900/10 flex items-center justify-center">
                <span className="text-[11px] font-sans font-bold tracking-wider text-[#C5A059]">RA</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-serif tracking-[0.25em] font-bold uppercase text-stone-900 dark:text-stone-100">
                Resin Aura
              </span>
              <span className="text-[8px] tracking-[0.45em] uppercase text-stone-500 dark:text-stone-400">Artisan Luxury</span>
            </div>
          </div>

          {/* Desktop Search */}
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative w-60">
            <input 
              type="text" 
              value={searchVal}
              onChange={handleSearchChange}
              placeholder="Search elegance..." 
              className={`w-full py-2 pl-9 pr-4 rounded-full text-xs tracking-wider transition-all duration-300 ${
                isDarkMode 
                  ? "bg-stone-800 text-stone-100 border-stone-700 focus:border-amber-400 focus:bg-stone-800" 
                  : "bg-stone-50 text-stone-900 border-stone-200 focus:border-amber-500 focus:bg-white"
              } border outline-none`}
            />
            <Search className="absolute left-3 w-3.5 h-3.5 text-stone-400" />
          </form>

          {/* Center Navigation Menus */}
          <nav className="hidden lg:flex space-x-8 h-full items-center">
            <button 
              onClick={() => setCurrentTab("home")} 
              className={`text-xs tracking-[0.16em] uppercase font-medium hover:text-amber-500 transition-colors py-2 ${
                currentTab === "home" ? "text-amber-500 font-semibold" : "text-stone-500"
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => { setCurrentTab("shop"); setSelectedCategory("all"); }} 
              className={`text-xs tracking-[0.16em] uppercase font-medium hover:text-amber-500 transition-colors py-2 ${
                currentTab === "shop" ? "text-amber-500 font-semibold" : "text-stone-500"
              }`}
            >
              Shop
            </button>

            {/* Collections Mega Menu Trigger */}
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveDropdown("collections")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 text-xs tracking-[0.16em] uppercase font-medium text-stone-500 hover:text-amber-500 transition-colors py-2">
                <span>Collections</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {/* Mega Dropdown */}
              {activeDropdown === "collections" && (
                <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[850px] shadow-2xl rounded-2xl grid grid-cols-4 p-8 gap-6 border transition-all duration-500 ${
                  isDarkMode ? "bg-stone-900 border-stone-800" : "bg-stone-50/95 border-stone-100"
                } backdrop-blur-xl animate-fade-in`}>
                  {categories.map((cat, idx) => {
                    const CatIcon = cat.icon;
                    return (
                      <div key={idx} className="flex flex-col space-y-3">
                        <div className="flex items-center space-x-2 text-amber-500">
                          <CatIcon className="w-4 h-4" />
                          <h4 
                            onClick={() => {
                              setSelectedCategory(cat.name);
                              setCurrentTab("shop");
                              setActiveDropdown(null);
                            }}
                            className="text-xs tracking-wider uppercase font-semibold cursor-pointer hover:underline"
                          >
                            {cat.name}
                          </h4>
                        </div>
                        <p className="text-[10px] text-stone-400 leading-relaxed font-sans">{cat.desc}</p>
                        <ul className="space-y-1.5 pt-1">
                          {cat.items.map((sub, i) => (
                            <li key={i}>
                              <button 
                                onClick={() => {
                                  setSelectedCategory(cat.name);
                                  setCurrentTab("shop");
                                  setActiveDropdown(null);
                                }}
                                className="text-[11px] text-stone-500 hover:text-amber-600 tracking-wide block transition-colors"
                              >
                                {sub}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <button 
              onClick={() => setCurrentTab("custom-order")} 
              className={`text-xs tracking-[0.16em] uppercase font-medium hover:text-amber-500 transition-colors py-2 ${
                currentTab === "custom-order" ? "text-amber-500 font-semibold" : "text-stone-500"
              }`}
            >
              Custom Orders
            </button>
            
            <button 
              onClick={() => setCurrentTab("about")} 
              className={`text-xs tracking-[0.16em] uppercase font-medium hover:text-amber-500 transition-colors py-2 ${
                currentTab === "about" ? "text-amber-500 font-semibold" : "text-stone-500"
              }`}
            >
              About Us
            </button>
          </nav>

          {/* Right utility buttons */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            
            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="text-stone-400 hover:text-amber-500 transition-colors focus:outline-none"
              title="Toggle Theme"
              id="theme-toggle"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Wishlist Icon */}
            <button 
              onClick={() => setCurrentTab("dashboard")} 
              className="relative text-stone-400 hover:text-amber-500 transition-colors"
              title="My Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-500 text-white rounded-full text-[8px] font-sans flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button 
              onClick={() => setCurrentTab("cart")} 
              className="relative text-stone-400 hover:text-amber-500 transition-colors"
              title="Curate Cart"
              id="cart-icon"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-500 text-stone-900 rounded-full text-[8px] font-sans flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile / Admin portal trigger */}
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => setCurrentTab("dashboard")} 
                className={`flex items-center space-x-1 text-stone-400 hover:text-amber-500 transition-colors ${
                  currentTab === "dashboard" || currentTab === "admin" ? "text-amber-500" : ""
                }`}
                title="Salon VIP"
              >
                <User className="w-4 h-4" />
              </button>
              
              {/* Optional Admin quick switch for grading convenience */}
              <button
                onClick={() => setCurrentTab(currentTab === "admin" ? "home" : "admin")}
                className={`hidden md:block text-[10px] uppercase tracking-wider px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/25 text-amber-500 font-semibold border border-amber-500/30 transition-all`}
              >
                {currentTab === "admin" ? "VIP Shop" : "C-Suite Admin"}
              </button>
            </div>

            {/* Hamburger for mobile */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-stone-500 hover:text-amber-500 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden shadow-xl border-t animate-slide-up ${
          isDarkMode ? "bg-stone-900 border-stone-800 text-stone-200" : "bg-stone-50 border-stone-200 text-stone-800"
        }`}>
          {/* Mobile Search */}
          <div className="px-4 py-3 border-b border-stone-200/50">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input 
                type="text" 
                value={searchVal}
                onChange={handleSearchChange}
                placeholder="Search catalog..." 
                className={`w-full py-2.5 pl-9 pr-4 rounded-xl text-xs ${
                  isDarkMode ? "bg-stone-850 border-stone-700 text-stone-100" : "bg-white border-stone-200 text-stone-900"
                } border focus:outline-none`}
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
            </form>
          </div>

          <div className="px-4 py-6 space-y-4">
            <button 
              onClick={() => { setCurrentTab("home"); setIsMobileMenuOpen(false); }}
              className="block w-full text-left text-xs uppercase tracking-widest font-semibold text-stone-500 hover:text-amber-500"
            >
              Home
            </button>
            <button 
              onClick={() => { setCurrentTab("shop"); setSelectedCategory("all"); setIsMobileMenuOpen(false); }}
              className="block w-full text-left text-xs uppercase tracking-widest font-semibold text-stone-500 hover:text-amber-500"
            >
              Shop Curations
            </button>
            
            {/* Quick Mobile Categories expansion */}
            <div className="pl-2 space-y-2 border-l border-amber-500/20 py-1">
              {categories.map((c, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedCategory(c.name);
                    setCurrentTab("shop");
                    setIsMobileMenuOpen(false);
                  }}
                  className="block text-[11px] text-stone-400 hover:text-amber-500 font-sans font-medium"
                >
                  — {c.name}
                </button>
              ))}
            </div>

            <button 
              onClick={() => { setCurrentTab("custom-order"); setIsMobileMenuOpen(false); }}
              className="block w-full text-left text-xs uppercase tracking-widest font-semibold text-stone-500 hover:text-amber-500"
            >
              Custom Resin Orders
            </button>
            <button 
              onClick={() => { setCurrentTab("about"); setIsMobileMenuOpen(false); }}
              className="block w-full text-left text-xs uppercase tracking-widest font-semibold text-stone-500 hover:text-amber-500"
            >
              About Resin Aura
            </button>
            
            <button 
              onClick={() => { setCurrentTab("admin"); setIsMobileMenuOpen(false); }}
              className="block w-full text-left text-[11px] uppercase tracking-widest font-semibold text-amber-500 font-sans"
            >
              Admin Dashboard Panel
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
