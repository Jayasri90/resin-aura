import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  Heart, 
  ShoppingBag, 
  Trash2, 
  Gift, 
  Truck, 
  Compass, 
  Star, 
  Palette, 
  Layers, 
  CheckCircle,
  HelpCircle,
  Clock,
  ShieldCheck,
  Instagram,
  Mail,
  Send,
  Loader2,
  BookOpen,
  MapPin,
  RefreshCw,
  Sliders,
  User,
  Home
} from "lucide-react";

import Navbar from "./components/Navbar";
import AIAssistant from "./components/AIAssistant";
import AdminPanel from "./components/AdminPanel";
import Dashboard from "./components/Dashboard";
import ProductDetails from "./components/ProductDetails";
import ShopPageView from "./components/ShopPageView";

import { Product, CartItem, CustomOrder, Coupon } from "./types";
import { PRODUCTS, REVIEWS, COUPONS } from "./data/products";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [customOrders, setCustomOrders] = useState<CustomOrder[]>([
    {
      id: "AURA-CUST-902",
      productType: "Insured Geode Wall Clock",
      colors: ["Midnight Blue", "Turquoise", "Gold"],
      theme: "Ocean Waves & Gold Swirls",
      elements: ["Quartz crystal points", "24k Gold flakes", "Ocean sand"],
      customText: "Vance Family - Est. 2026",
      status: "Pending Review",
      price: 22400,
      createdAt: "2026-06-11"
    }
  ]);

  // Personalized Homepage variables matching /api/personalized-home
  const [isPersonalizing, setIsPersonalizing] = useState(false);
  const [personalizationMood, setPersonalizationMood] = useState("Standard");
  const [personalizationNote, setPersonalizationNote] = useState("");
  const [homeHeadline, setHomeHeadline] = useState("Handcrafted Resin Art Designed To Tell Your Story");
  const [homeSubheading, setHomeSubheading] = useState("Unique custom geode clocks, personalized initial keychains, automatic watches, and custom ocean wave art hand-finished with luxury gold elements.");
  const [accentColor, setAccentColor] = useState("#C5A059"); // Clean Minimalism gold preset
  const [themeAesthetic, setThemeAesthetic] = useState("Standard Luxury Edition");
  const [personalizedRecs, setPersonalizedRecs] = useState<Product[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Cart slide-out controls
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Customer order creator state
  const [customProductType, setCustomProductType] = useState("Shimmering Geode Wall Clock");
  const [customVibe, setCustomVibe] = useState("Ocean Calm");
  const [customInscriptions, setCustomInscriptions] = useState("");
  const [customSelectedColors, setCustomSelectedColors] = useState<string[]>(["Midnight Blue", "Gold"]);
  const [customSelectedElements, setCustomSelectedElements] = useState<string[]>(["24k Gold Flakes", "Quartz Crystals"]);
  const [uploadedImageStub, setUploadedImageStub] = useState<string | null>(null);

  // Newsletter states
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribedMessage, setSubscribedMessage] = useState(false);

  // Apply default localized recommendations for personalized home
  useEffect(() => {
    // Populate with 3 bestseller defaults
    setPersonalizedRecs(PRODUCTS.filter(p => p.isBestSeller).slice(0, 3));
  }, []);

  // Sync state or body dark mode classes
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      root.style.backgroundColor = "#181615";
    } else {
      root.classList.remove("dark");
      root.style.backgroundColor = "#F5F2ED";
    }
  }, [isDarkMode]);

  // AI Personalized Homepage Core Integrator
  const handlePersonalizeHomeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPersonalizing(true);
    try {
      const res = await fetch("/api/personalized-home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          mood: personalizationMood, 
          notes: personalizationNote 
        })
      });

      if (!res.ok) throw new Error("API personalization failed");
      const result = await res.json();
      
      const pData = result.data;
      setHomeHeadline(pData.headline || "Artesian Splendor Built For Your Milestones");
      setHomeSubheading(pData.subheading || "Capture your story inside transparent mineral layers and hand-polished crystal resins.");
      setAccentColor(pData.accentColor || "#d97706");
      setThemeAesthetic(pData.themeAesthetic || "Premium Artisanal");
      
      if (pData.matchedProductIds && Array.isArray(pData.matchedProductIds)) {
        const matchedList = PRODUCTS.filter(p => pData.matchedProductIds.includes(p.id));
        setPersonalizedRecs(matchedList.length > 0 ? matchedList : PRODUCTS.slice(0, 3));
      }
    } catch (err) {
      console.warn("Personalized homepage API unreachable. Conducting on-the-fly local theme curation solver.", err);
      // Hardcoded local custom solver
      if (personalizationMood === "Ocean Calm") {
        setHomeHeadline("Deep Ocean Swirls Suspended In Crystalline Depth");
        setHomeSubheading("Introducing aquatic serenity with multi-layered turquoise shoreline geode wall arts.");
        setAccentColor("#0f766e");
        setThemeAesthetic("Marine Agate Currents");
        setPersonalizedRecs([PRODUCTS[4], PRODUCTS[5], PRODUCTS[12]]);
      } else if (personalizationMood === "Floral Romance" || personalizationMood === "Gold Swirl & Wood") {
        setHomeHeadline("Solid Live-Edge Walnut Poured With Gold Swirl Fluids");
        setHomeSubheading("Experience premium executive office clocks and heavy name plates styled with dense luxury resin rivers.");
        setAccentColor("#C5A059");
        setThemeAesthetic("Gold Swirl & Wood Panel");
        setPersonalizedRecs([PRODUCTS[0], PRODUCTS[10], PRODUCTS[11]]);
      } else if (personalizationMood === "Cosmic Shimmer") {
        setHomeHeadline("Capturing Stars & Galactic Dust Layers In Art");
        setHomeSubheading("Bold designs swirled with indigo shadows, holo sparkles, and sterling silver leaf chips.");
        setAccentColor("#6366f1");
        setThemeAesthetic("Aurora Void Shimmer");
        setPersonalizedRecs([PRODUCTS[2], PRODUCTS[8], PRODUCTS[5]]);
      } else {
        // Reset default
        setHomeHeadline("Handcrafted Resin Art Designed To Tell Your Story");
        setHomeSubheading("Unique custom geode clocks, personalized initial keychains, automatic watches, and custom ocean wave art hand-finished with luxury gold elements.");
        setAccentColor("#C5A059");
        setThemeAesthetic("Standard Luxury Edition");
        setPersonalizedRecs(PRODUCTS.filter(p => p.isBestSeller).slice(0, 3));
      }
    } finally {
      setIsPersonalizing(false);
    }
  };

  // Add to Cart Core logic
  const handleAddToCart = (product: Product, qty: number = 1, options?: { giftWrapping: boolean; customText?: string }) => {
    setCart(prev => {
      const exists = prev.find(item => item.product.id === product.id && item.giftWrapping === !!options?.giftWrapping && item.customText === options?.customText);
      if (exists) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + qty } : item);
      }
      return [...prev, {
        product,
        quantity: qty,
        giftWrapping: options?.giftWrapping || false,
        customText: options?.customText || ""
      }];
    });
  };

  // Remove cart items
  const handleRemoveCartItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  // Add/Remove Wishlist
  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        alert(`Removed "${product.name}" from your selection backlog.`);
        return prev.filter(p => p.id !== product.id);
      } else {
        alert(`Added "${product.name}" to your wishlist. Access details inside your VIP lounge tab.`);
        return [...prev, product];
      }
    });
  };

  // Custom order submission builder
  const handleCustomOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: CustomOrder = {
      id: `AURA-CUST-${Math.floor(100 + Math.random() * 900)}`,
      productType: customProductType,
      colors: customSelectedColors,
      theme: customVibe,
      elements: customSelectedElements,
      customText: customInscriptions || undefined,
      customImage: uploadedImageStub || undefined,
      status: "Pending Review",
      price: customProductType.includes("Clock") ? 23200 : customProductType.includes("Plaque") ? 27200 : 9600,
      createdAt: new Date().toISOString().split("T")[0]
    };

    setCustomOrders(prev => [newOrder, ...prev]);
    alert(`Success! Bespoke preserve specification registered with reference ${newOrder.id}. Relocating yours details to user Dashboard overview.`);
    setCurrentTab("dashboard");
  };

  // Handle uploader image stub simulation
  const handleImgStubUploader = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedImageStub(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Standard checkout mockup
  const handleCheckoutMock = () => {
    alert("Casting checkout secure corridor. Proceeding via Razorpay & Google Pay integrations...\n\nYour luxury order has been registered! Standard shipping logs dispatched via custom tracker.");
    setCart([]);
    setIsCartOpen(false);
    setCurrentTab("dashboard");
  };

  const handleSearchSubmit = (q: string) => {
    setSearchQuery(q);
    setCurrentTab("shop");
  };

  const selectProductDetail = (p: Product) => {
    setSelectedProduct(p);
    setCurrentTab("product-detail");
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price + (item.giftWrapping ? 15 : 0)) * item.quantity, 0);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-all duration-300 ${
      isDarkMode ? "bg-stone-900 text-stone-100" : "bg-stone-50 text-stone-900"
    }`}>
      
      {/* Dynamic Navigation Bar Component */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab}
        cartCount={cart.reduce((s, c) => s + c.quantity, 0)}
        wishlistCount={wishlist.length}
        setSelectedCategory={setSelectedCategory}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Slide-Out Cart Canvas Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end animate-fade-in bg-black/60 backdrop-blur-xs">
          <div className={`w-[400px] max-w-full h-full flex flex-col justify-between p-6 ${
            isDarkMode ? "bg-stone-950 text-stone-100 border-l border-stone-850" : "bg-white text-stone-900 border-l border-stone-200"
          } shadow-2xl animate-slide-left`}>
            
            <div className="space-y-6 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between pb-3.5 border-b border-stone-850">
                <span className="text-sm font-bold uppercase tracking-widest text-amber-500 flex items-center space-x-1.5 font-sans">
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>Curate Bag</span>
                </span>
                <button onClick={() => setIsCartOpen(false)} className="text-stone-400 hover:text-white uppercase tracking-widest text-[9px] font-semibold">
                  Dismiss
                </button>
              </div>

              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item, i) => (
                    <div key={i} className="flex gap-4 p-3 rounded-xl border border-stone-850 bg-stone-900/10">
                      <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg border border-stone-800" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs uppercase font-bold tracking-wider truncate">{item.product.name}</h4>
                        <div className="text-[10px] text-stone-400 space-y-0.5 mt-1 font-sans">
                          <p>Quantity: <span className="text-stone-250 font-bold">{item.quantity}</span></p>
                          {item.giftWrapping && <p className="text-amber-500 font-semibold flex items-center gap-1">✦ Premium Velvet Box Included</p>}
                          {item.customText && <p className="italic text-stone-300">Inscription: "{item.customText}"</p>}
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <span className="font-mono text-xs text-amber-500 font-bold">₹{(item.product.price + (item.giftWrapping ? 1200 : 0)) * item.quantity}</span>
                          <button 
                            onClick={() => handleRemoveCartItem(item.product.id)}
                            className="text-stone-450 hover:text-rose-500"
                            title="Purge selection"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-16 text-center border border-dashed border-stone-850 rounded-xl space-y-2 font-sans">
                  <ShoppingBag className="w-8 h-8 text-stone-700 mx-auto" />
                  <p className="text-xs text-stone-400">Your bag is absolutely clear. Discover and match items!</p>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-stone-850 pt-4 space-y-4 font-sans bg-transparent">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Atelier Subtotal</span>
                  <span className="font-mono font-bold">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between text-xs text-green-500">
                  <span>Carbon-neutral global shipping</span>
                  <span className="font-mono uppercase font-bold text-[10px]">Complimentary</span>
                </div>
                <div className="border-t border-stone-850 pt-3 flex justify-between font-bold text-sm">
                  <span>Acquisition Capital</span>
                  <span className="font-mono text-amber-500 font-bold">₹{cartSubtotal}</span>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-2">
                  <button 
                    onClick={handleCheckoutMock}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <span>Secure Checkout Insured</span>
                  </button>
                  <p className="text-center text-[9px] text-stone-400 font-light">
                    Direct integration with standard payment channels (Razorpay, UPI, PhonePe, credit logs).
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Floating Cart Launcher Button when cart contains items */}
      {cart.length > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-24 right-6 z-50 bg-amber-500 text-stone-950 p-4 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center justify-center border border-amber-400"
          title="Open Curate Cart"
          id="floating-cart-btn"
        >
          <ShoppingBag className="w-5 h-5 shrink-0" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-stone-900 border border-amber-500 text-amber-400 text-[10px] rounded-full flex items-center justify-center font-bold">
            {cart.reduce((s, i) => s + i.quantity, 0)}
          </span>
        </button>
      )}

      {/* -------------------------------------------------------------
          TAB ROUTING ENGINE VIEWS
         ------------------------------------------------------------- */}
      <main className="flex-grow">
        
        {/* HOMEPAGE VIEW */}
        {currentTab === "home" && (
          <div className="space-y-16 py-0 animate-fade-in">
            
            {/* Section 0: Aesthetic Personalizer Bar (Extremely Luxury Custom AI Integration) */}
            <div className={`p-4 border-b ${
              isDarkMode ? "bg-stone-950 border-stone-850/60" : "bg-stone-100/60 border-stone-250"
            } text-xs font-sans`}>
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <Palette className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: "12s" }} />
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-amber-400 block">Personalize Your Aura Vibe</span>
                    <span className="text-stone-400">Tell Gemini your home aesthetic. Watch the homepage customize in real-time.</span>
                  </div>
                </div>

                <form onSubmit={handlePersonalizeHomeSubmit} className="flex flex-wrap items-center gap-2">
                  <select
                    value={personalizationMood}
                    onChange={(e) => setPersonalizationMood(e.target.value)}
                    className={`py-1 px-2 text-xs rounded border outline-none font-medium text-left ${
                      isDarkMode ? "bg-stone-900 border-stone-800 text-amber-400" : "bg-white border-stone-300 text-stone-700"
                    }`}
                  >
                    <option value="Standard">Standard Luxury</option>
                    <option value="Ocean Calm">Ocean Calm</option>
                    <option value="Gold Swirl & Wood">Gold Swirl & Wood</option>
                    <option value="Cosmic Shimmer">Cosmic Shimmer</option>
                  </select>

                  <input 
                    type="text"
                    value={personalizationNote}
                    onChange={(e) => setPersonalizationNote(e.target.value)}
                    placeholder="Custom notes (e.g. 'marbled emerald agates and gold leaf border')" 
                    className={`py-1 px-3 text-[11px] rounded border outline-none w-52 md:w-80 font-sans ${
                      isDarkMode ? "bg-stone-900 border-stone-800 text-stone-100" : "bg-white border-stone-300 text-stone-900"
                    }`}
                  />

                  <button
                    type="submit"
                    disabled={isPersonalizing}
                    className="px-3.5 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold uppercase tracking-wider text-[10px] rounded flex items-center space-x-1 shadow"
                    id="btn-personalize-submit"
                  >
                    {isPersonalizing ? <Loader2 className="w-3 h-3 animate-spin" /> : <span>Apply Vibe</span>}
                  </button>
                </form>
              </div>
            </div>

            {/* Section 1: Hero Banner */}
            <div className="relative border-b border-stone-850/10 min-h-[500px] md:min-h-[620px] flex items-center">
              
              {/* Background Art design matching dynamic colors */}
              <div className="absolute inset-0 -z-20 overflow-hidden">
                <div 
                  className="absolute inset-x-0 top-[-10rem] h-[50rem] opacity-30 blur-3xl rounded-full" 
                  style={{
                    background: `radial-gradient(ellipse at center, ${accentColor} 0%, rgba(28,25,23,0) 70%)`
                  }}
                />
                
                {/* Extra fine grain layer mimicking resin bubbles and gold flakes */}
                <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Left Text */}
                <div className="space-y-6 text-left animate-slide-right">
                  <div className="flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                    <span className="text-[10px] tracking-[0.35em] uppercase text-stone-400 font-mono font-bold">
                      Aesthetic Theme: {themeAesthetic}
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-serif tracking-tight leading-tight uppercase">
                    {homeHeadline}
                  </h1>

                  <p className="text-sm leading-relaxed text-stone-300 font-sans font-light max-w-xl">
                    {homeSubheading}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2.5">
                    <button 
                      onClick={() => { setCurrentTab("shop"); setSelectedCategory("all"); }}
                      className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-sans font-extrabold text-xs tracking-widest uppercase rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
                      id="hero-btn-shop"
                    >
                      Shop Curated Collection
                    </button>
                    <button 
                      onClick={() => setCurrentTab("custom-order")}
                      className={`px-6 py-3 border rounded-xl font-sans text-xs tracking-widest uppercase hover:border-amber-500 transition-colors ${
                        isDarkMode ? "bg-stone-950 border-stone-850 hover:bg-stone-900" : "bg-white border-stone-300"
                      }`}
                      id="hero-btn-custom"
                    >
                      Create Custom Order
                    </button>
                  </div>
                </div>

                {/* Right: Splendid Floating Interactive Resin block graphic */}
                <div className="hidden lg:flex items-center justify-center animate-float relative">
                  {/* Outer halo */}
                  <div className="absolute w-[440px] h-[440px] rounded-full filter blur-2xl opacity-10 animate-pulse-subtle" style={{ backgroundColor: accentColor }} />
                  
                  {/* Floating Resin Art Capsule visual */}
                  <div className="relative w-96 h-96 rounded-2xl overflow-hidden shadow-2xl skew-y-2 hover:skew-y-0 transition-transform duration-700 border border-white/10 group">
                    <img 
                      src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" 
                      alt="Stunning Custom Geode resin masterwork" 
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent flex flex-col justify-end p-6">
                      <span className="text-[9px] uppercase tracking-widest text-amber-500 font-extrabold block">Artifact Preview</span>
                      <h4 className="text-xs uppercase tracking-wider font-extrabold text-white mt-1">Shimmering Ocean Tide Geode Wall Art</h4>
                      <p className="text-[10px] text-stone-300 font-sans font-light mt-0.5 leading-snug">Preserving organic sands and frothy fluid sea tide waves.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Section 2: Featured Collections Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="text-center md:text-left">
                <span className="text-[10px] tracking-[0.3em] uppercase text-amber-500 font-bold block mb-1">
                  Atelier Curation
                </span>
                <h2 className="text-lg uppercase tracking-widest font-bold">Featured Resin Specialties</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {["Jewelry", "Home Decor", "Accessories", "Personalized Gifts"].map((col, i) => {
                    const recImages = [
                      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80",
                      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
                      "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=400&q=80",
                      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=400&q=80"
                    ];
                    return (
                    <div 
                      key={i} 
                      onClick={() => { setSelectedCategory(col); setCurrentTab("shop"); }}
                      className="relative aspect-square rounded-2xl overflow-hidden border border-stone-850/20 group cursor-pointer shadow-md hover:shadow-xl hover:scale-[1.015] transition-all duration-300"
                    >
                      <img src={recImages[i]} alt={col} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-stone-950/45 group-hover:bg-stone-950/60 transition-colors flex flex-col justify-end p-5">
                        <span className="text-[9px] uppercase tracking-widest text-amber-550 font-bold font-mono text-amber-400">Curate Category</span>
                        <h3 className="text-xs uppercase tracking-wider font-extrabold text-white mt-1">{col}</h3>
                      </div>
                    </div>
                  ); })}
              </div>
            </div>

            {/* Section 3: Best Sellers Curation Slider */}
            <div className={`p-4 ${isDarkMode ? "bg-stone-900/50" : "bg-stone-100/30"} py-12`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="text-left">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-amber-500 font-bold block mb-1">
                      Highest Acclamation
                    </span>
                    <h2 className="text-lg uppercase tracking-widest font-bold">Resin Aura Best Sellers</h2>
                  </div>
                  
                  <button 
                    onClick={() => { setSelectedCategory("all"); setCurrentTab("shop"); }}
                    className="text-xs text-amber-500 font-semibold uppercase tracking-widest hover:underline flex items-center space-x-1 font-sans shrink-0"
                  >
                    <span>View full collections</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Cards slider */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                  {PRODUCTS.filter(p => p.isBestSeller).map((prod) => (
                    <div 
                      key={prod.id}
                      className={`p-4 rounded-xl border flex flex-col justify-between ${
                        isDarkMode ? "bg-stone-950 border-stone-850/60" : "bg-white border-stone-200"
                      } group hover:border-amber-500/25 transition-colors shadow relative`}
                    >
                      <div className="aspect-square w-full rounded-lg overflow-hidden bg-stone-900 border mb-3 overflow-hidden cursor-pointer" onClick={() => selectProductDetail(prod)}>
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      
                      <div className="space-y-1.5 font-sans flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[8px] text-amber-500 uppercase font-bold tracking-widest font-mono">{prod.category}</span>
                          <h4 onClick={() => selectProductDetail(prod)} className="text-[11px] uppercase tracking-wider font-extrabold text-stone-200 hover:text-amber-500 transition-colors pt-0.5 truncate block cursor-pointer">
                            {prod.name}
                          </h4>
                          <div className="flex items-center space-x-1 mt-0.5">
                            <span className="text-amber-500 text-[9px]">★</span>
                            <span className="text-[10px] text-stone-400 font-mono">{prod.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-stone-850/15 mt-2">
                          <span className="text-xs font-mono font-bold text-amber-500">₹{prod.price}</span>
                          <div className="flex space-x-1 shrink-0">
                            <button 
                              onClick={() => handleToggleWishlist(prod)} 
                              className="p-1 rounded bg-stone-900 text-stone-400 hover:text-rose-500 border border-stone-850"
                              title="Add to wishlist"
                            >
                              <Heart className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => { handleAddToCart(prod); alert(`Added "${prod.name}" successfully!`); }} 
                              className="bg-amber-500 text-stone-900 p-1 rounded hover:bg-amber-400"
                              title="Add to cart"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Section 4: Personalization recommendations display from local/API model */}
            {personalizedRecs.length > 0 && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="text-center md:text-left">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-amber-500 font-extrabold block mb-1">
                    Matched For You
                  </span>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <h2 className="text-lg uppercase tracking-widest font-bold">Personalized Swirl Collection Curation</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {personalizedRecs.map(prod => (
                    <div 
                      key={prod.id} 
                      onClick={() => selectProductDetail(prod)}
                      className={`p-4 rounded-xl border flex space-x-4 ${
                        isDarkMode ? "bg-stone-950 border-stone-850" : "bg-white border-stone-250"
                      } hover:border-amber-500/30 cursor-pointer transition-colors`}
                    >
                      <img src={prod.image} alt={prod.name} className="w-16 h-16 object-cover rounded-xl border shrink-0" />
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-1.5 font-sans">
                        <div>
                          <h4 className="text-[11px] uppercase tracking-wider font-extrabold truncate text-stone-200">{prod.name}</h4>
                          <p className="text-[9px] text-stone-400 mt-0.5 truncate">{prod.theme} • {prod.occasion}</p>
                        </div>
                        <span className="text-xs font-mono text-amber-500 font-semibold">₹{prod.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 5: Custom Resin Experience process */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-stone-850/15">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Left Side: Step Process steps */}
                <div className="space-y-6 text-left">
                  <div className="space-y-2">
                    <span className="text-[10px] text-amber-500 font-bold uppercase tracking-[0.3em]">Insured bespoke preserves</span>
                    <h2 className="text-xl sm:text-2xl font-light tracking-wide uppercase">Crystalline Milestone preservation</h2>
                  </div>

                  <p className="text-xs text-stone-400 font-sans tracking-wide leading-relaxed">
                    Capture deep glossy geode swirls, custom metallic initial outlines, or heavy leather-bound clock settings hand-polished inside our vacuum chambers.
                  </p>

                  <div className="space-y-3 pt-2 font-sans font-light">
                    {[
                      { step: "Step 01", title: "Select Dimension & Shape", desc: "Choose wall mount clocks, agate coasters, or custom pocket keychains" },
                      { step: "Step 02", title: "Specify Custom Details", desc: "Choose color balances, solid name letters, copper fractions, or quartz points" },
                      { step: "Step 03", title: "Consent 3D Visual Proof", desc: "Our artisan models correct color layout balances of gold flakes and elements" },
                      { step: "Step 04", title: "Caster Grinding & Insured delivery", desc: "Hand-poured, slow-cured for zero microbubbles, fully encased in premium timber boxes" }
                    ].map((st, idx) => (
                      <div key={idx} className="flex gap-4 p-3 rounded-xl border border-stone-850 bg-stone-900/10">
                        <span className="font-mono text-xs font-bold text-amber-500 mt-0.5 shrink-0">{st.step}</span>
                        <div>
                          <h4 className="text-xs uppercase font-bold tracking-wider">{st.title}</h4>
                          <p className="text-[10px] text-stone-400 leading-tight mt-0.5">{st.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setCurrentTab("custom-order")}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:scale-[1.01] text-stone-950 font-sans font-extrabold text-[11px] uppercase tracking-widest rounded-xl shadow border border-amber-400"
                    id="btn-trigger-custom-order"
                  >
                    Start Custom Design Draft
                  </button>
                </div>

                {/* Right Side: Photo previews */}
                <div className="grid grid-cols-2 gap-4">
                  <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80" alt="Ocean tide block" className="rounded-xl object-cover h-44 w-full border border-stone-800" />
                  <img src="https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?auto=format&fit=crop&w=400&q=80" alt="Mixed resin pigment" className="rounded-xl object-cover h-44 w-full border border-stone-800 pt-3" />
                  <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80" alt="Bracelet detail" className="rounded-xl object-cover h-44 w-full border border-stone-800" />
                  <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80" alt="Coasters detail" className="rounded-xl object-cover h-44 w-full border border-stone-800 pt-3" />
                </div>

              </div>
            </div>

            {/* Section 6: Why Choose Us (Icon Cards) */}
            <div className={`p-4 ${isDarkMode ? "bg-stone-950" : "bg-stone-100/50"} py-12`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                
                <div className="text-center">
                  <span className="text-[10px] text-amber-500 font-extrabold tracking-[0.35em] block mb-1">Elite Artistry Commitment</span>
                  <h3 className="text-lg uppercase tracking-widest font-extrabold">Professional Standard of Resin Aura</h3>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 font-sans">
                  {[
                    { title: "Pure Eco-Resins", icon: ShieldCheck, desc: "Sourced non-toxic, anti-yellowing solvent crystalline materials" },
                    { title: "Zero Micro-Bubbles", icon: Sparkles, desc: "Vacuum chamber processing ensures mirror-like clarity" },
                    { title: "Worldwide Insured", icon: Truck, desc: "Linen storage packages protected from scratch impact" },
                    { title: "Agate Edge Gilding", icon: Palette, desc: "Edges gilded with fine 24k gold liquid metallic lining" },
                    { title: "Diamond Grinding", icon: Layers, desc: "Hand sand-washed using up to 12 precise stages of grid limits" },
                    { title: "Custom Engraving", icon: Gift, desc: "Pristine wooden name plates and gifts" }
                  ].map((ic, i) => {
                    const LeafIcon = ic.icon;
                    return (
                      <div key={i} className="text-center space-y-2 flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center">
                          <LeafIcon className="w-4 h-4 text-amber-500 animate-pulse" />
                        </div>
                        <h4 className="text-[11px] uppercase tracking-wider font-extrabold text-stone-200">{ic.title}</h4>
                        <p className="text-[9px] text-stone-400 font-light leading-snug">{ic.desc}</p>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

            {/* Section 7: Verified Reviews Carousel */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="text-center">
                <span className="text-[10px] text-amber-500 font-bold uppercase tracking-[0.35em] block">Collector Testimonials</span>
                <h3 className="text-lg uppercase tracking-widest font-extrabold mt-1">Verified Patron Acclaims</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {REVIEWS.map((rev, idx) => (
                  <div key={idx} className={`p-5 rounded-2xl border ${
                    isDarkMode ? "bg-stone-950 border-stone-850" : "bg-white border-stone-200"
                  } space-y-3 relative`}>
                    <div className="flex space-x-1 text-amber-500 text-[11px]">
                      {"★".repeat(rev.rating)}
                    </div>
                    <p className="text-xs leading-relaxed text-stone-300 font-sans font-light italic">
                      "{rev.comment}"
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-stone-850/15">
                      <div>
                        <span className="text-xs font-bold block">{rev.userName}</span>
                        <span className="text-[9px] font-mono text-stone-400 bg-amber-500/10 text-amber-500 px-1.5 py-0.2 rounded font-extrabold uppercase mt-1 inline-block">
                          Insured Buyer
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-400 font-mono italic">{rev.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 8: Instagram Masonry Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="text-center py-2">
                <Instagram className="w-5 h-5 text-amber-400 mx-auto" />
                <h3 className="text-base uppercase tracking-widest font-bold mt-1.5">Social Curator Gallery</h3>
                <span className="text-[10px] text-stone-400 font-mono tracking-wide">Mention @ResinAuraLuxe forever in bloom</span>
              </div>

              {/* Instagram grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
                  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80",
                  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
                  "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=400&q=80"
                ].map((igPic, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden relative group border border-stone-850/30 shadow-md">
                    <img src={igPic} alt="Instagram shared photo" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-stone-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <span className="text-[10px] text-white tracking-widest font-bold flex items-center gap-1">
                        <Instagram className="w-3.5 h-3.5" />
                        <span>VIEW FEED</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 9: Luxury Newsletter Block */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`p-8 sm:p-12 rounded-3xl border text-center ${
                isDarkMode ? "bg-stone-950 border-stone-850/60" : "bg-white border-stone-300"
              } bg-gradient-to-tr from-stone-950 via-stone-900 to-stone-950 relative overflow-hidden shadow-2xl`}>
                
                <span className="text-[10px] tracking-[0.35em] text-amber-500 font-extrabold uppercase animate-pulse">VIP Register</span>
                <h3 className="text-xl sm:text-2xl font-light tracking-wide uppercase mt-1">Unlock Artisian Perks</h3>
                <p className="text-xs text-stone-300 leading-relaxed font-sans font-light max-w-md mx-auto pt-2.5">
                  Subscribe to the elite Resin Aura Salon list to receive early private booking releases for limited artisan clocks and an immediate <span className="text-amber-500 font-semibold">10% discount voucher</span>.
                </p>

                <form 
                  onSubmit={(e) => { e.preventDefault(); if (newsletterEmail.trim()) setSubscribedMessage(true); }}
                  className="mt-6 flex flex-col sm:flex-row max-w-md mx-auto gap-2 items-center"
                >
                  <input 
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Provide your luxury coordinates (email)..." 
                    className={`w-full text-xs py-3 px-4 rounded-xl outline-none border focus:border-amber-400 font-sans ${
                      isDarkMode ? "bg-stone-900 border-stone-800 text-stone-100" : "bg-stone-50 border-stone-250 text-stone-900"
                    }`}
                    required
                  />
                  <button 
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 transition-colors text-stone-950 text-xs uppercase tracking-widest font-extrabold rounded-xl shrink-0 border border-amber-400"
                    id="newsletter-subscribe-btn"
                  >
                    Register Coordinates
                  </button>
                </form>

                {subscribedMessage && (
                  <p className="text-xs text-green-500 font-sans font-medium mt-4">
                    ✓ Welcome to the Aura Salon list! Copied your welcome discount code: <span className="font-mono font-bold bg-green-500/15 px-2 py-0.5 rounded ml-1">WELCOME10</span>. Check your VIP inbox for details.
                  </p>
                )}
              </div>
            </div>

          </div>
        )}

        {/* CUSTOM ORDERS PAGE CREATOR */}
        {currentTab === "custom-order" && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-8 font-sans">
            <div className="text-center space-y-1.5">
              <span className="text-[10px] text-amber-500 font-bold uppercase tracking-[0.3em] block animate-pulse">Design Custom preserve</span>
              <h1 className="text-2xl sm:text-3xl font-light tracking-wide uppercase">Bespoke Resin Art Commission</h1>
              <p className="text-xs text-stone-400 max-w-md mx-auto font-sans leading-relaxed">
                Draft your direct physical preserve specifications below, and our elite master artist will review elements in real-time.
              </p>
            </div>

            <form onSubmit={handleCustomOrderSubmit} className={`p-6 sm:p-8 rounded-2xl border ${
              isDarkMode ? "bg-stone-950 border-stone-850" : "bg-white border-stone-200"
            } space-y-6 shadow-xl`}>
              
              {/* Product type selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider font-extrabold text-stone-400 block">Preserve Base Medium</label>
                  <select
                    value={customProductType}
                    onChange={(e) => setCustomProductType(e.target.value)}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs border focus:border-amber-450 outline-none ${
                      isDarkMode ? "bg-stone-900 border-stone-800 text-stone-200" : "bg-stone-50 border-stone-250 text-stone-850"
                    }`}
                  >
                    <option value="Bespoke Midnight River Walnut Clock">Bespoke Midnight River Walnut Clock (10in x 10in - ₹19,200)</option>
                    <option value="Agate Style Hexagonal Coasters Set">Set of 4 Hexagonal Agate Coasters (₹8,800)</option>
                    <option value="Shimmering Geode Wall Clock">Shimmering Geode Wall Clock (16in - ₹22,400)</option>
                    <option value="Gilded Desk Pine Nameplate">Custom River Edge Solid Pine Desk Nameplate (₹14,400)</option>
                    <option value="Aura Ocean Wave Custom Keychain Suite">Aura Ocean Wave Custom Keychain Suite (₹3,920)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider font-extrabold text-stone-400 block">Aesthetic Vibe Preset</label>
                  <select
                    value={customVibe}
                    onChange={(e) => setCustomVibe(e.target.value)}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs border focus:border-amber-500 outline-none ${
                      isDarkMode ? "bg-stone-900 border-stone-800 text-stone-200" : "bg-stone-50 border-stone-250 text-stone-850"
                    }`}
                  >
                    <option value="Gold Swirl & Wood">Gold Swirl & Wood (Black walnut, solid gold leaf fluid waves)</option>
                    <option value="Ocean Calm">Ocean Waves (Aquatic teals, real sand, frothy shore textures)</option>
                    <option value="Cosmic Shimmer">Cosmic Shimmer (Holographic deep space, dark indigo shadow)</option>
                    <option value="Emerald Swirl">Gilded Agate Swirls (Emerald veins, deep liquid pearl background)</option>
                  </select>
                </div>
              </div>

              {/* Multi-Select Color checkboxes */}
              <div className="space-y-2.5 border-t border-stone-850/20 pt-4">
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-stone-400 block">Eco Color Palette (Select multiple)</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {["Clear", "Blush Pink", "Turquoise Blue", "Quartz White", "Emerald Green", "Cosmic Indigo", "Gold leaf Swirl", "Silver leaf Swirl"].map((col) => {
                    const hasSelected = customSelectedColors.includes(col);
                    return (
                      <button
                        type="button"
                        key={col}
                        onClick={() => {
                          setCustomSelectedColors(prev => 
                            hasSelected ? prev.filter(c => c !== col) : [...prev, col]
                          );
                        }}
                        className={`py-2 px-3 rounded-xl border text-[11px] font-sans tracking-wide transition-all ${
                          hasSelected 
                            ? "bg-amber-500/10 border-amber-500 text-amber-550 font-bold" 
                            : "bg-surface border-stone-800 text-stone-400 hover:text-stone-300"
                        }`}
                      >
                        {col}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Embedded Elements checkboxes */}
              <div className="space-y-2.5 border-t border-stone-850/20 pt-4">
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-stone-400 block">Embedded Element Materials (Select multiple)</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {["Copper Shreds", "Obsidian Powder", "24k Gold Flakes", "Iridescent Glitter", "Quartz Crystals", "Oceanic Sand", "Seashells", "Charred Pine Edge"].map((elem) => {
                    const checkedValue = customSelectedElements.includes(elem);
                    return (
                      <button
                        type="button"
                        key={elem}
                        onClick={() => {
                          setCustomSelectedElements(prev => 
                            checkedValue ? prev.filter(e => e !== elem) : [...prev, elem]
                          );
                        }}
                        className={`py-2 px-3 rounded-xl border text-[11px] font-sans tracking-wide transition-all ${
                          checkedValue 
                            ? "bg-amber-500/10 border-amber-500 text-amber-550 font-bold" 
                            : "bg-surface border-stone-800 text-stone-400 hover:text-stone-300"
                        }`}
                      >
                        {elem}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Handpainted custom calligraphy text */}
              <div className="space-y-2 border-t border-stone-850/20 pt-4">
                <label className="text-[11px] uppercase tracking-wider font-extrabold text-stone-400 block">
                  Official Inscriptions calligraphies notes (Optional)
                </label>
                <input 
                  type="text"
                  value={customInscriptions}
                  onChange={(e) => setCustomInscriptions(e.target.value)}
                  placeholder="e.g. 'Evelyn & Julian Vance - Married on 2026-06-11' in script cursive" 
                  className={`w-full px-4 py-2.5 text-xs rounded-xl focus:outline-none border focus:border-amber-400 ${
                    isDarkMode ? "bg-stone-900 border-stone-800 text-stone-100" : "bg-stone-50 border-stone-250 text-stone-900"
                  }`}
                />
                <p className="text-[9px] text-stone-400 leading-tight">These characters will be permanently sealed inside the third layer of fluid resin pour.</p>
              </div>

              {/* Mock photo uploader */}
              <div className="space-y-2 border-t border-stone-850/20 pt-4">
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-stone-400 block">Upload Design references or flower photos</span>
                <div className={`p-6 rounded-xl border border-dashed border-stone-800/80 text-center ${
                  isDarkMode ? "bg-stone-900/30" : "bg-stone-50"
                }`}>
                  <input 
                    type="file" 
                    onChange={handleImgStubUploader} 
                    className="text-xs text-stone-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-stone-800 file:text-xs file:bg-stone-900 file:text-amber-500 cursor-pointer w-full"
                  />
                  {uploadedImageStub && (
                    <div className="mt-3">
                      <img src={uploadedImageStub} alt="Uploaded proof stub" className="w-16 h-16 object-cover rounded-xl mx-auto border" />
                    </div>
                  )}
                </div>
              </div>

              {/* Dispatch summary warning */}
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 text-xs text-stone-300 leading-relaxed font-sans font-light">
                ⚠️ <span className="font-bold text-amber-400">Insured Commission Capacity alert</span>: Due to slow manual vacuum de-bubbling curing process, our studio handles only 15 master clocks and custom sets per calendar month. Review and approve the final photographic design proof within 48 hours in your Dashboard lounge under "VIP Custom Project Drafts" row.
              </div>

              {/* Submit bespoke commission slot CTA */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-semibold uppercase tracking-widest rounded-xl transition-all shadow-lg border border-amber-400"
                id="custom-order-submit-btn"
              >
                Submit Custom Specification Order Draft
              </button>

            </form>
          </div>
        )}

        {/* SHOP PAGE PORTFOLIO VIEW */}
        {currentTab === "shop" && (
          <ShopPageView 
            products={PRODUCTS}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onAddToWishlist={handleToggleWishlist}
            onViewProduct={selectProductDetail}
            isDarkMode={isDarkMode}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {/* SHOPPING CART PAGE VIEW FOR FULL DESKTOP ACQUISITIONS */}
        {currentTab === "cart" && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-8 font-sans animate-fade-in">
            <div className="text-center space-y-1.5">
              <span className="text-[10px] text-amber-500 font-bold uppercase tracking-[0.3em] block animate-pulse">Standard Insured Bag</span>
              <h1 className="text-2xl sm:text-3xl font-light tracking-wide uppercase">Your Collection Portfolio</h1>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">Review and process acquisition capitals for selected resin designs.</p>
            </div>

            <div className={`p-6 rounded-2xl border ${
              isDarkMode ? "bg-stone-950 border-stone-850" : "bg-white border-stone-200"
            } space-y-6 shadow-xl`}>
              {cart.length > 0 ? (
                <div className="space-y-6">
                  <div className="divide-y divide-stone-800/10">
                    {cart.map((item, i) => (
                      <div key={i} className="flex gap-4 py-4 first:pt-0 last:pb-0 items-center">
                        <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-xl border border-stone-800" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm uppercase font-bold tracking-wider">{item.product.name}</h4>
                          <span className="text-[10px] text-amber-500 font-mono tracking-widest block mt-0.5">₹{item.product.price}</span>
                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-400 mt-2 font-light">
                            <span>Quantity: <strong>{item.quantity}</strong></span>
                            {item.giftWrapping && <span className="text-amber-550 font-semibold">• ✦ Velvet Protection Case</span>}
                            {item.customText && <span className="italic">• Inscription: "{item.customText}"</span>}
                          </div>
                        </div>
                        <div className="text-right pl-4">
                          <span className="font-mono text-xs font-bold text-amber-500 block">₹{(item.product.price + (item.giftWrapping ? 1200 : 0)) * item.quantity}</span>
                          <button 
                            onClick={() => handleRemoveCartItem(item.product.id)}
                            className="text-stone-450 hover:text-rose-500 mt-2 p-1.5 rounded hover:bg-stone-900"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-stone-850 pt-6 space-y-4 font-sans bg-transparent">
                    <div className="flex justify-between text-xs">
                      <span className="text-stone-400">Atelier Subtotal</span>
                      <span className="font-mono text-stone-300 font-bold">₹{cartSubtotal}</span>
                    </div>
                    <div className="flex justify-between text-xs text-green-500">
                      <span>Carbon-neutral global insured delivery</span>
                      <span className="font-mono uppercase font-bold text-[10px]">Complimentary</span>
                    </div>
                    <div className="border-t border-stone-850/30 pt-4 flex justify-between font-bold text-sm">
                      <span>Grand Total Acquisition Capital</span>
                      <span className="font-mono text-amber-500 font-bold text-lg">₹{cartSubtotal}</span>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <button 
                        onClick={() => { setCurrentTab("shop"); setSelectedCategory("all"); }}
                        className={`px-6 py-3 border rounded-xl text-xs tracking-widest uppercase transition-colors font-semibold ${
                          isDarkMode ? "bg-stone-900 border-stone-800 text-stone-200 hover:bg-stone-800" : "bg-white border-stone-250 text-stone-800"
                        }`}
                      >
                        Continue Selecting
                      </button>
                      <button 
                        onClick={handleCheckoutMock}
                        className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold uppercase tracking-widest text-xs rounded-xl shadow-lg border border-amber-405 border-amber-400"
                      >
                        Proceed To Payment
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-16 text-center space-y-4">
                  <ShoppingBag className="w-12 h-12 text-stone-600 mx-auto" />
                  <p className="text-xs text-stone-400">Your shopping bag is completely empty. Explore coordinates to add our masterfully cased watches or geode wall clocks!</p>
                  <button 
                    onClick={() => { setCurrentTab("shop"); setSelectedCategory("all"); }}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold uppercase tracking-wider text-xs rounded-xl shadow"
                  >
                    View Collections
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PRODUCT DETAILS VIEW */}
        {currentTab === "product-detail" && selectedProduct && (
          <ProductDetails 
            product={selectedProduct}
            onAddToCart={(p, q, opt) => handleAddToCart(p, q, opt)}
            onAddToWishlist={handleToggleWishlist}
            isDarkMode={isDarkMode}
            onViewProduct={selectProductDetail}
          />
        )}

        {/* CUSTOMER DASHBOARD */}
        {currentTab === "dashboard" && (
          <Dashboard 
            wishlist={wishlist}
            onRemoveFromWishlist={handleToggleWishlist}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            isDarkMode={isDarkMode}
            onViewProduct={selectProductDetail}
            customOrders={customOrders}
          />
        )}

        {/* BOARDROOM EXECUTIVE ADMIN PANEL */}
        {currentTab === "admin" && (
          <AdminPanel isDarkMode={isDarkMode} />
        )}

        {/* ABOUT / RESIN ATELIER BLOG VIEWS */}
        {currentTab === "about" && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12 font-sans text-left leading-relaxed">
            
            {/* Header */}
            <div className="text-center space-y-1.5">
              <span className="text-[10px] text-amber-505 font-bold uppercase tracking-[0.3em] block text-amber-500 animate-pulse">Our Heritage</span>
              <h1 className="text-2xl sm:text-3xl font-light tracking-wide uppercase">The Story of Resin Aura</h1>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">Hand-casting deep dimensional reflections of your precious memories.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80" alt="Resin studio sand" className="rounded-2xl border" />
            <div className="space-y-4">
                <h3 className="text-base uppercase tracking-widest font-extrabold text-amber-500">Artisanal Precision Core</h3>
                <p className="text-xs text-stone-300 font-light">
                  Resin Aura was established in 2024 with a singular noble vision: to merge the modern magnificence of vacuum-grade polymers with noble textures. Every geode clock, heavy steel chronometer watch or wood-embedded river desk begins with meticulously handpicked components designed cleanly to preserve absolute color density.
                </p>
                <p className="text-xs text-stone-300 font-light">
                  By using only pristine, non-toxic eco-epoxies and solid 24k gold leaf lining, we produce mirror-like masterpieces with infinite visual depth. Our jewelry, home decor, and custom presentation gifts contain zero micro-bubbles, verified by our rigorous vacuum and diamond polishing loops.
                </p>
              </div>
            </div>

            {/* Simulated blog posts segment */}
            <div className="border-t border-stone-850 pt-10 space-y-6">
              <h3 className="text-xs uppercase tracking-widest font-bold text-center">Atelier Craft Blog</h3>
              
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Preserving Infinite Metallic Currents", desc: "Understanding the scientific multi-stage curing process in vacuum chambers that solidifies deep copper and gold leaf veins forever.", date: "June 05, 2026" },
                  { title: "agates edge hand painting curves", desc: "A guide to liquid metal gold pigments, and how they cling gracefully to raw hexagonal epoxy borders.", date: "May 28, 2026" },
                  { title: "Mastering Ocean wave layers", desc: "How heat guns, white pigment powders, and physical quartz gem clusters unite to emulate actual crashing marine sand shore foam.", date: "May 10, 2026" }
                ].map((post, i) => (
                  <div key={i} className="p-5 rounded-xl border border-stone-850 bg-stone-900/10 space-y-2">
                    <span className="text-[9px] text-amber-500/90 tracking-wider font-mono uppercase text-amber-400">{post.date}</span>
                    <h4 className="text-xs uppercase font-extrabold text-stone-100">{post.title}</h4>
                    <p className="text-[10px] text-stone-400 leading-snug">{post.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Official contact Coordinates */}
            <div className="border-t border-stone-850 pt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">VIP Studio Location</span>
                <p className="text-xs font-light text-stone-300">Resin Aura Atelier & Gallery<br />847 Rodeo Dr, Beverly Hills, CA 90210</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Concierge Liaison</span>
                <p className="text-xs font-light text-stone-300">Email: concierge@resinaura.luxe<br />Tel: +1 (310) 555-0192</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Insured Delivery</span>
                <p className="text-xs font-light text-stone-300">Carbon-neutral global dispatch standard packaging included on every custom purchase.</p>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Floating AI chat concierge assistant */}
      <AIAssistant 
        onViewProduct={selectProductDetail}
        isDarkMode={isDarkMode}
      />

      {/* Luxury Footer bar */}
      <footer className={`border-t font-sans py-12 pb-24 md:pb-32 ${
        isDarkMode ? "bg-stone-950 border-stone-850/60 text-stone-400" : "bg-stone-100 border-stone-250 text-stone-600"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo brand and dispatch details */}
          <div className="space-y-3 font-sans text-left">
            <span className="text-sm font-sans tracking-[0.25em] font-bold text-white uppercase block">Resin Aura</span>
            <p className="text-[11px] text-stone-400 leading-relaxed font-light">
              Premium handmade resin jewelry, luxury geode wall decor, and custom sentimental preserving masterworks. Finished with 24k gold dust in Beverly Hills, CA.
            </p>
            <div className="flex space-x-3 text-stone-450 hover:text-amber-500 pt-1">
              <Compass className="w-4 h-4 cursor-pointer hover:text-amber-400" />
              <Layers className="w-4 h-4 cursor-pointer hover:text-amber-400" />
              <Star className="w-4 h-4 cursor-pointer hover:text-amber-400" />
            </div>
          </div>

          <div className="text-left font-sans">
            <h4 className="text-[10px] uppercase tracking-widest font-extrabold text-stone-300 mb-3 block">Artisanal Collections</h4>
            <ul className="space-y-1.5 text-xs font-light">
              <li><button onClick={() => { setSelectedCategory("Jewelry"); setCurrentTab("shop"); }} className="hover:text-amber-450 transition-colors">Wearable Jewelry Series</button></li>
              <li><button onClick={() => { setSelectedCategory("Home Decor"); setCurrentTab("shop"); }} className="hover:text-amber-450 transition-colors">Ocean Shore Wall Art & Clocks</button></li>
              <li><button onClick={() => { setSelectedCategory("Accessories"); setCurrentTab("shop"); }} className="hover:text-amber-450 transition-colors">Smart Watches & Keychains</button></li>
              <li><button onClick={() => { setSelectedCategory("Personalized Gifts"); setCurrentTab("shop"); }} className="hover:text-amber-450 transition-colors">Custom Resin River Plates</button></li>
            </ul>
          </div>

          <div className="text-left font-sans">
            <h4 className="text-[10px] uppercase tracking-widest font-extrabold text-stone-300 mb-3 block">Artisanship Support</h4>
            <ul className="space-y-1.5 text-xs font-light">
              <li><button onClick={() => setCurrentTab("about")} className="hover:text-amber-450 transition-colors">The Heritage Blog</button></li>
              <li><button onClick={() => setCurrentTab("custom-order")} className="hover:text-amber-450 transition-colors">Booking Preserves Slots</button></li>
              <li><button onClick={() => alert("Simulated VIP Tracking dashboard coordinates.")} className="hover:text-amber-450 transition-colors">Insured Shipping Transit</button></li>
              <li><button onClick={() => alert("Warranty limits: 1 year complete polish guarantee on geode wall art.")} className="hover:text-amber-450 transition-colors">Curing Quality Guard</button></li>
            </ul>
          </div>

          <div className="text-left font-sans space-y-3">
            <h4 className="text-[10px] uppercase tracking-widest font-extrabold text-stone-300 block">Atelier Security</h4>
            <p className="text-[11px] leading-relaxed font-light">
              Official checkout protected with standard encryption protocols. Proudly handpainted in solid walnut and pine woods.
            </p>
            <div className="flex gap-2 items-center text-[10px] font-semibold text-green-500 bg-green-500/10 px-2 py-0.5 rounded w-fit uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Compliant Curing Standard</span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-4 border-t border-stone-850/15 text-center text-[10px] font-sans font-light">
          © {new Date().getFullYear()} Resin Aura Luxe Inc. Handcrafted with non-toxic crystalline matrices in Beverly Hills. All rights preserved globally.
        </div>
      </footer>

      {/* -------------------------------------------------------------
          STICKY BOTTOM NAVIGATION BAR (VIP DOCK)
         ------------------------------------------------------------- */}
      <div className="fixed bottom-6 inset-x-0 z-40 flex justify-center pointer-events-none px-4">
        <nav className={`pointer-events-auto backdrop-blur-md shadow-2xl rounded-2xl border px-5 py-3 transition-all duration-300 flex items-center justify-between sm:justify-center gap-3 sm:gap-7 w-full max-w-lg ${
          isDarkMode 
            ? "bg-stone-950/85 border-stone-850 text-stone-200" 
            : "bg-white/90 border-stone-250 text-stone-900 shadow-xl"
        }`} id="bottom-vip-navigation">
          
          {[
            { id: "home", label: "Home", icon: Compass },
            { id: "shop", label: "Shop", icon: Layers },
            { id: "custom-order", label: "Custom", icon: Sparkles },
            { id: "dashboard", label: "Portal", icon: User },
            { id: "cart", label: "Cart", icon: ShoppingBag, badge: cart.reduce((s, i) => s + i.quantity, 0) }
          ].map(tab => {
            const IconComponent = tab.icon;
            const isActive = currentTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setCurrentTab(tab.id);
                  setIsCartOpen(false);
                }}
                className={`relative flex flex-col items-center justify-center py-1 px-3 sm:px-4 rounded-xl transition-all duration-200 hover:scale-[1.04] ${
                  isActive 
                    ? "text-amber-500 font-semibold scale-102" 
                    : "text-stone-450 hover:text-amber-400"
                }`}
                title={tab.label}
              >
                <div className="relative">
                  <IconComponent className="w-5 h-5" />
                  {tab.badge && tab.badge > 0 ? (
                    <span className="absolute -top-1.5 -right-2 bg-amber-500 text-stone-950 text-[8px] font-sans font-bold px-1 rounded-full min-w-3.5 h-3.5 flex items-center justify-center border border-stone-900 animate-pulse">
                      {tab.badge}
                    </span>
                  ) : null}
                </div>
                <span className="text-[10px] tracking-wide mt-1 select-none font-medium sm:block hidden">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

    </div>
  );
}
