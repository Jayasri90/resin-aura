import React, { useState, useMemo } from "react";
import { 
  SlidersHorizontal, 
  Search, 
  LayoutGrid, 
  Heart, 
  ShoppingBag, 
  Star, 
  Sparkles,
  RefreshCw,
  Sliders,
  HelpCircle
} from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data/products";

interface ShopPageViewProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  onAddToWishlist: (p: Product) => void;
  onViewProduct: (p: Product) => void;
  isDarkMode: boolean;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export default function ShopPageView({
  products,
  onAddToCart,
  onAddToWishlist,
  onViewProduct,
  isDarkMode,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery
}: ShopPageViewProps) {
  const [selectedPrice, setSelectedPrice] = useState<string>("all");
  const [selectedTheme, setSelectedTheme] = useState<string>("all");
  const [selectedOccasion, setSelectedOccasion] = useState<string>("all");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");

  const [aiIsDesigning, setAiIsDesigning] = useState(false);
  const [aiMatchingNotice, setAiMatchingNotice] = useState<string | null>(null);
  const [aiSearchQuery, setAiSearchQuery] = useState("");
  const [aiMatchedProducts, setAiMatchedProducts] = useState<Product[] | null>(null);

  // Extract list of all unique values for filter drop-boxes
  const themes = ["Floral Romance", "Ocean Waves", "Cosmic Shimmer", "Beige Aesthetics", "Gold Swirl & Wood", "Opal Geode", "Gold Elegance"];
  const occasions = ["Wedding", "Birthday", "Housewarming", "Mother's Day", "Valentine's Day", "Promotion"];
  const colors = ["Gold", "Silver", "Blue", "Emerald", "Pink", "Yellow", "Purple", "Ivory", "Clear"];

  // Intelligent AI semantic search trigger
  const triggerAiSemanticSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiSearchQuery.trim()) {
      setAiMatchedProducts(null);
      setAiMatchingNotice(null);
      return;
    }
    setAiIsDesigning(true);
    try {
      const response = await fetch("/api/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: aiSearchQuery })
      });
      if (response.ok) {
        const data = await response.json();
        setAiMatchedProducts(data.products);
        setAiMatchingNotice(`Gemini localized ${data.products.length} luxury crafts matching: "${aiSearchQuery}"`);
      } else {
        throw new Error("Local fallback required");
      }
    } catch {
      // Local fallback
      const q = aiSearchQuery.toLowerCase();
      const localMatches = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.theme.toLowerCase().includes(q) ||
        p.keywords.some(k => q.includes(k))
      );
      setAiMatchedProducts(localMatches);
      setAiMatchingNotice(`Artisanal engine matched ${localMatches.length} items for: "${aiSearchQuery}"`);
    } finally {
      setAiIsDesigning(false);
    }
  };

  const clearAiSemanticSearch = () => {
    setAiSearchQuery("");
    setAiMatchedProducts(null);
    setAiMatchingNotice(null);
  };

  // Memoized product list filters evaluation
  const filteredProducts = useMemo(() => {
    // If AI Semantic search is active, start from AI selection, otherwise start from full catalog PRODUCTS
    let baseList = aiMatchedProducts !== null ? aiMatchedProducts : PRODUCTS;

    // Filter by standard search bar query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      baseList = baseList.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.keywords.some(k => k.toLowerCase().includes(q))
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== "all") {
      baseList = baseList.filter(p => p.category === selectedCategory);
    }

    // Filter by dynamic Price structures
    if (selectedPrice !== "all") {
      if (selectedPrice === "under-50") {
        baseList = baseList.filter(p => p.price < 4000);
      } else if (selectedPrice === "50-150") {
        baseList = baseList.filter(p => p.price >= 4000 && p.price <= 12000);
      } else if (selectedPrice === "150-300") {
        baseList = baseList.filter(p => p.price > 12000 && p.price <= 24000);
      } else if (selectedPrice === "over-300") {
        baseList = baseList.filter(p => p.price > 24000);
      }
    }

    // Filter by occasion
    if (selectedOccasion !== "all") {
      baseList = baseList.filter(p => p.occasion === selectedOccasion);
    }

    // Filter by Theme
    if (selectedTheme !== "all") {
      baseList = baseList.filter(p => p.theme === selectedTheme);
    }

    // Filter by Color match
    if (selectedColor !== "all") {
      baseList = baseList.filter(p => p.colors.includes(selectedColor));
    }

    // Sort evaluation
    const sorted = [...baseList];
    if (sortBy === "price-low-high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high-low") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popular") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "newest") {
      sorted.sort((a, b) => b.reviewCount - a.reviewCount); // review count proxy for engagement
    } else if (sortBy === "best-selling") {
      sorted.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return sorted;
  }, [selectedCategory, searchQuery, selectedPrice, selectedTheme, selectedOccasion, selectedColor, sortBy, aiMatchedProducts]);

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 font-sans ${
      isDarkMode ? "text-stone-100" : "text-stone-900"
    }`}>
      
      {/* Search Header Banner & AI Semantic Search */}
      <div className="text-center max-w-3xl mx-auto space-y-6 pb-12 border-b border-stone-850/20">
        <span className="text-[10px] text-amber-500 font-bold uppercase tracking-[0.35em] block animate-pulse">
          Curated Atelier
        </span>
        <h1 className="text-2xl sm:text-3xl font-light tracking-wide uppercase">
          Artisanal Resin Collections
        </h1>
        <p className="text-xs text-stone-400 font-sans tracking-wide max-w-lg mx-auto">
          Every singular capsule is hand-crafted with non-toxic, crystal-clear epoxies, physical quartz fragments, and authentic organic flowers.
        </p>

        {/* AI Semantic Search Box */}
        <div className={`p-4 rounded-2xl border ${
          isDarkMode ? "bg-stone-950 border-stone-850/60" : "bg-stone-100/50 border-stone-250"
        } relative overflow-hidden text-left shadow-lg`}>
          <div className="flex items-center space-x-2 pb-2 h-7">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-amber-400">Gemini Neural Art Finder</span>
          </div>
          
          <form onSubmit={triggerAiSemanticSearch} className="flex relative items-center gap-2">
            <input 
              type="text"
              value={aiSearchQuery}
              onChange={(e) => setAiSearchQuery(e.target.value)}
              placeholder="e.g. 'something pink under ₹12,000 to preserve romantic occasions' or 'ocean wave clocks'" 
              className={`flex-1 text-xs py-2.5 pl-4 pr-10 rounded-xl outline-none border focus:border-amber-400 font-sans ${
                isDarkMode ? "bg-stone-900 border-stone-800 text-stone-100" : "bg-white border-stone-300 text-stone-900"
              }`}
            />
            
            <button
              type="submit"
              disabled={aiIsDesigning}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 text-xs rounded-xl font-bold uppercase tracking-wider flex items-center space-x-1 border border-amber-400 shadow shrink-0"
              id="btn-ai-search-submit"
            >
              {aiIsDesigning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <span>Search Vibe</span>}
            </button>
          </form>
          <p className="text-[9px] text-stone-400 mt-1.5 font-sans leading-relaxed">
            Unlike simple filters, our Gemini model interprets abstract palettes, feelings, gifts types or custom dimensions to retrieve matches.
          </p>

          {/* AI Notice Indicator */}
          {aiMatchingNotice && (
            <div className="mt-3 flex items-center justify-between text-xs bg-amber-500/10 text-amber-400 px-3 py-1.5 rounded-lg border border-amber-500/20 font-sans">
              <span>{aiMatchingNotice}</span>
              <button onClick={clearAiSemanticSearch} className="font-bold underline text-[10px] uppercase tracking-wider">
                Clear Semantic Filter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid: Filters + Grid list */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-10">
        
        {/* Advanced Filters Drawer Panel */}
        <div className="space-y-6 lg:sticky lg:top-28 h-fit">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-stone-850 h-8">
            <SlidersHorizontal className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs uppercase tracking-widest font-bold">Refine Portfolio</h3>
          </div>

          {/* Standard Categories Selector */}
          <div className="space-y-2">
            <span className="text-[9px] uppercase tracking-wider text-stone-400 font-extrabold">By Category</span>
            <div className="flex flex-col space-y-1.5">
              {["all", "Jewelry", "Home Decor", "Accessories", "Personalized Gifts"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs text-left py-1 px-2.5 rounded-lg tracking-wide transition-colors ${
                    selectedCategory === cat
                      ? "bg-amber-500/10 text-amber-500 font-semibold"
                      : "text-stone-400 hover:text-amber-500 hover:bg-stone-50/10"
                  }`}
                >
                  {cat === "all" ? "All Masterpieces" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2 border-t border-stone-850/20 pt-4">
            <span className="text-[9px] uppercase tracking-wider text-stone-400 font-extrabold">Price Limits</span>
            <div className="flex flex-col space-y-1.5">
              {[
                { id: "all", label: "Show All Prices" },
                { id: "under-50", label: "Under ₹4,000" },
                { id: "50-150", label: "Between ₹4,000 - ₹12,000" },
                { id: "150-300", label: "Between ₹12,000 - ₹24,000" },
                { id: "over-300", label: "Prestige Tier ₹24,000+" }
              ].map((pRange) => (
                <button
                  key={pRange.id}
                  onClick={() => setSelectedPrice(pRange.id)}
                  className={`text-xs text-left py-1 px-2.5 rounded-lg tracking-wide transition-colors ${
                    selectedPrice === pRange.id
                      ? "bg-amber-500/10 text-amber-500 font-semibold"
                      : "text-stone-400 hover:text-amber-500 hover:bg-stone-50/10"
                  }`}
                >
                  {pRange.label}
                </button>
              ))}
            </div>
          </div>

          {/* Occasions Selector */}
          <div className="space-y-2 border-t border-stone-850/20 pt-4">
            <span className="text-[9px] uppercase tracking-wider text-stone-400 font-extrabold">Collector's Occasion</span>
            <select
              value={selectedOccasion}
              onChange={(e) => setSelectedOccasion(e.target.value)}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-sans border focus:border-amber-400 outline-none ${
                isDarkMode ? "bg-stone-900 border-stone-800 text-stone-200" : "bg-white border-stone-200 text-stone-800"
              }`}
            >
              <option value="all">Any Celebration</option>
              {occasions.map((occ, i) => (
                <option key={i} value={occ}>{occ}</option>
              ))}
            </select>
          </div>

          {/* Aesthetic Theme Swirls */}
          <div className="space-y-2 border-t border-stone-850/20 pt-4">
            <span className="text-[9px] uppercase tracking-wider text-stone-400 font-extrabold">Aura Swirl Vibe</span>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-sans border focus:border-amber-400 outline-none ${
                isDarkMode ? "bg-stone-900 border-stone-800 text-stone-200" : "bg-white border-stone-200 text-stone-800"
              }`}
            >
              <option value="all">Any Swirl Palette</option>
              {themes.map((theme, i) => (
                <option key={i} value={theme}>{theme}</option>
              ))}
            </select>
          </div>

          {/* Color Flake Accent */}
          <div className="space-y-2 border-t border-stone-850/20 pt-4">
            <span className="text-[9px] uppercase tracking-wider text-stone-400 font-extrabold">Infused Color Accents</span>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-sans border focus:border-amber-400 outline-none ${
                isDarkMode ? "bg-stone-900 border-stone-800 text-stone-200" : "bg-white border-stone-200 text-stone-800"
              }`}
            >
              <option value="all">Any Pigments / Flakes</option>
              {colors.map((col, i) => (
                <option key={i} value={col}>{col}</option>
              ))}
            </select>
          </div>

          {/* Reset Filters CTA */}
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSelectedPrice("all");
              setSelectedOccasion("all");
              setSelectedColor("all");
              setSelectedTheme("all");
              setSortBy("popular");
              clearAiSemanticSearch();
              setSearchQuery("");
            }}
            className="w-full py-2.5 border border-dashed border-stone-800 hover:border-amber-500 rounded-xl text-xs uppercase tracking-widest text-stone-400 hover:text-amber-500 transition-colors block font-semibold text-center font-sans"
          >
            Purge All Direct Filters
          </button>
        </div>

        {/* 3-Column Catalog Grid List */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Top Sort controllers bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-sans border-b border-stone-850 pb-4 h-auto sm:h-10">
            <span className="text-xs text-stone-400">
              Disclosed <span className="font-mono font-bold text-stone-200">{filteredProducts.length}</span> luxury masterworks in global collection
            </span>

            <div className="flex items-center space-x-2.5 text-xs text-left self-end sm:self-auto">
              <span className="text-stone-400">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`py-1 px-2.5 rounded-lg text-xs tracking-wider outline-none border focus:border-amber-400 ${
                  isDarkMode ? "bg-stone-900 border-stone-800 text-stone-200" : "bg-white border-stone-200 text-stone-850"
                }`}
              >
                <option value="popular">Prestige (Ratings)</option>
                <option value="newest">Volume (Reviews)</option>
                <option value="best-selling">Bestsellers Index</option>
                <option value="price-low-high">Value Low to High</option>
                <option value="price-high-low">Value High to Low</option>
              </select>
            </div>
          </div>

          {/* Products Multi grids looping */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <div 
                  key={prod.id}
                  className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                    isDarkMode ? "bg-stone-950 border-stone-850/60" : "bg-stone-50 border-stone-200/80"
                  } hover:scale-[1.015] hover:border-amber-500/25 relative shadow-md hover:shadow-xl`}
                >
                  {/* Photo cover area */}
                  <div 
                    className="aspect-[4/3] w-full overflow-hidden bg-stone-900 relative cursor-pointer border-b border-stone-800/30"
                    onClick={() => onViewProduct(prod)}
                  >
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Hover detail inspection view panel */}
                    <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="bg-stone-950/80 text-amber-400 px-3 py-1.5 rounded-lg text-[9px] uppercase tracking-widest font-bold border border-amber-400/20 backdrop-blur-md">
                        Inspect Craftsmanship
                      </span>
                    </div>

                    {/* Quick bestseller badge overlay */}
                    {prod.isBestSeller && (
                      <span className="absolute top-3 left-3 bg-amber-500 text-stone-950 px-2 py-0.5 rounded text-[8px] uppercase tracking-widest font-extrabold shadow-sm">
                        Best Seller
                      </span>
                    )}

                    {/* Quick themed tag */}
                    <span className="absolute bottom-3 left-3 bg-stone-900/70 text-stone-300 px-2.5 py-0.5 rounded text-[9px] tracking-wide backdrop-blur-sm border border-stone-800/40">
                      {prod.theme}
                    </span>
                  </div>

                  {/* Pricing and specs */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3 font-sans">
                    <div>
                      <span className="text-[8px] text-amber-500 uppercase font-bold tracking-widest block">
                        {prod.category} • {prod.subCategory}
                      </span>
                      <h4 
                        onClick={() => onViewProduct(prod)}
                        className="text-[12px] uppercase tracking-wide font-bold leading-snug cursor-pointer hover:text-amber-500 transition-colors pt-0.5 line-clamp-1"
                      >
                        {prod.name}
                      </h4>

                      {/* Ratings */}
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex space-x-0.5 text-amber-500 text-[9px]">
                          {"★".repeat(Math.round(prod.rating))}
                        </div>
                        <span className="text-[9px] text-stone-400 font-mono">({prod.reviewCount})</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-stone-850/15">
                      <span className="text-xs font-mono font-bold text-amber-500">₹{prod.price}</span>
                      
                      <div className="flex space-x-1.5">
                        <button
                          onClick={() => onAddToWishlist(prod)}
                          className="p-1.5 rounded bg-stone-900/60 border border-stone-850 hover:border-rose-500 text-stone-300 hover:text-rose-500 transition-all cursor-pointer"
                          title="Wishlist"
                        >
                          <Heart className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => { onAddToCart(prod); alert(`Added "${prod.name}" to card catalog successfully!`); }}
                          className="bg-amber-500 hover:bg-amber-400 p-1.5 rounded text-stone-950 transition-transform cursor-pointer"
                          title="Add Selection"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-16 text-center border border-dashed border-stone-850 rounded-2xl space-y-3 font-sans">
              <Sliders className="w-8 h-8 text-stone-700 mx-auto" />
              <p className="text-xs text-stone-400 font-light">
                No items matching those specific luxury filters list. Try resetting parameters.
              </p>
              <button 
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedPrice("all");
                  setSelectedOccasion("all");
                  setSelectedColor("all");
                  setSelectedTheme("all");
                  setSearchQuery("");
                  clearAiSemanticSearch();
                }} 
                className="mt-2 text-xs px-4 py-1.5 bg-amber-500 text-stone-950 rounded-xl font-bold uppercase tracking-wider"
              >
                Clear All Filter Conditions
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
