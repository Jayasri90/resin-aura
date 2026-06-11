import React, { useState, useRef } from "react";
import { 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  Award, 
  Rotate3d, 
  PlayCircle, 
  TrendingDown, 
  Gift, 
  Truck, 
  Eye, 
  ShieldCheck,
  Star
} from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data/products";

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (p: Product, qty: number, options: { giftWrapping: boolean; customText?: string }) => void;
  onAddToWishlist: (p: Product) => void;
  isDarkMode: boolean;
  onViewProduct: (p: Product) => void;
}

export default function ProductDetails({
  product,
  onAddToCart,
  onAddToWishlist,
  isDarkMode,
  onViewProduct
}: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [viewMode, setViewMode] = useState<"standard" | "360deg" | "video">("standard");
  const [rotationAngle, setRotationAngle] = useState(30); // 360 viewer degree state slider
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({ transform: "scale(1)" });
  const [customText, setCustomText] = useState("");
  const [giftWrapping, setGiftWrapping] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Filter similar items based on same theme, or same category as similar products
  const related = PRODUCTS.filter(p => p.id !== product.id && (p.category === product.category || p.theme === product.theme)).slice(0, 3);

  // 360 degrees mouse dragging simulator
  const handleRotationSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRotationAngle(parseInt(e.target.value));
  };

  // Magnifying Zoom functionality on primary image
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transform: "scale(2)",
      transformOrigin: `${x}% ${y}%`
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ transform: "scale(1)", transformOrigin: "center" });
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity, { giftWrapping, customText });
    alert(`Added ${quantity}x "${product.name}" to your curated cart.`);
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 font-sans ${
      isDarkMode ? "text-stone-100" : "text-stone-900"
    }`}>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-16">
        
        {/* Left Column: Media Gallery */}
        <div className="space-y-4">
          
          {/* Main Visual Frame */}
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-stone-850/20 bg-stone-900 shadow-xl">
            {viewMode === "standard" && (
              <div 
                className="w-full h-full cursor-zoom-in overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <img 
                  src={selectedImage} 
                  alt={product.name} 
                  style={zoomStyle}
                  className="w-full h-full object-cover transition-transform duration-100"
                />
              </div>
            )}

            {/* 360 PRODUCT VIEW SIMULATOR */}
            {viewMode === "360deg" && (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 relative bg-stone-950">
                <div 
                  className="w-72 h-72 rounded-full overflow-hidden relative shadow-2xl border"
                  style={{
                    boxShadow: `0 0 ${rotationAngle / 3}px rgba(217, 119, 6, 0.45)`,
                    filter: `hue-rotate(${rotationAngle / 4}deg) brightness(${90 + (rotationAngle % 20)}%)`
                  }}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-all"
                  />
                  {/* Luxury dynamic glass overlay lines simulating reflective curves */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 transform rotate-12 translate-x-2 transition-transform duration-500 pointer-events-none" style={{ transform: `scale(1.2) translateX(${(rotationAngle - 50) * 1.5}px)` }} />
                </div>
                
                <div className="absolute bottom-5 left-4 right-4 text-center space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold block">
                    360° Reflective Angle Simulator
                  </span>
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={rotationAngle} 
                    onChange={handleRotationSlider}
                    className="w-full h-1 bg-stone-800 rounded-full appearance-none outline-none cursor-pointer accent-amber-500" 
                  />
                  <span className="text-[8px] text-stone-400 font-mono">Drag control to test gloss reflex and light coordinates</span>
                </div>
              </div>
            )}

            {/* VIDEO PREVIEW MODE */}
            {viewMode === "video" && (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-stone-950 text-center relative">
                <PlayCircle className="w-16 h-16 text-amber-400 animate-pulse mb-3" />
                <h4 className="text-sm font-sans tracking-widest uppercase font-semibold text-stone-100">Bespoke Diamond Grinding Video</h4>
                <p className="text-xs text-stone-400 max-w-xs mt-1 leading-relaxed">
                  Viewing pre-recorded master workflow showing hand-polished crystal finishing loops of the Aura selection.
                </p>
                <button 
                  onClick={() => setViewMode("standard")} 
                  className="mt-4 px-4 py-1.5 bg-stone-800 border border-stone-800 text-[10px] uppercase tracking-widest font-semibold hover:border-amber-500 transition-colors rounded-lg"
                >
                  Return to High-res Photos
                </button>
              </div>
            )}

            {/* Quick Badges inside Frame */}
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 bg-amber-500 text-stone-950 px-2.5 py-0.5 rounded text-[8px] uppercase tracking-widest font-bold font-sans shadow-md">
                Bestseller
              </span>
            )}

            <button 
              onClick={() => onAddToWishlist(product)}
              className="absolute top-4 right-4 bg-stone-900/60 p-2.5 rounded-full text-white backdrop-blur-sm shadow hover:scale-115 hover:text-amber-400 transition-all border border-white/10"
              title="Add to Wishlist Portfolio"
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>

          {/* Media Select Toggles */}
          <div className="flex justify-center space-x-3 pb-2.5">
            {[
              { id: "standard", label: "Media Gallery", icon: Eye },
              { id: "360deg", label: "Interactive 360°", icon: Rotate3d },
              { id: "video", label: "Artisanship Video", icon: PlayCircle }
            ].map((btn) => {
              const Icon = btn.icon;
              return (
                <button
                  key={btn.id}
                  onClick={() => setViewMode(btn.id as any)}
                  className={`px-3 py-1.5 rounded-xl border flex items-center space-x-1.5 text-[9px] uppercase tracking-wider font-semibold transition-all ${
                    viewMode === btn.id
                      ? "bg-amber-500 text-stone-950 border-amber-500 font-bold"
                      : "bg-surface text-stone-400 border-stone-800 hover:text-stone-200"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{btn.label}</span>
                </button>
              );
            })}
          </div>

          {/* Core Thumbnail loop */}
          <div className="grid grid-cols-3 gap-3">
            {product.images.map((img, i) => (
              <div 
                key={i}
                className={`aspect-square rounded-xl overflow-hidden border cursor-pointer transition-all ${
                  selectedImage === img && viewMode === "standard" ? "border-amber-500 scale-[1.02]" : "border-stone-800 opacity-70 hover:opacity-100"
                }`}
                onClick={() => { setSelectedImage(img); setViewMode("standard"); }}
              >
                <img src={img} alt="Thumbnail product image" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Descriptions & VIP Customizers */}
        <div className="flex flex-col justify-between space-y-6">
          
          {/* Header Description */}
          <div className="space-y-3 font-sans">
            <span className="text-[10px] text-amber-500 uppercase font-bold tracking-[0.3em] block">
              {product.category} • {product.subCategory}
            </span>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-stone-500 via-amber-200 to-amber-600 uppercase">
              {product.name}
            </h1>

            {/* Ratings and review row */}
            <div className="flex items-center space-x-3 py-1.5">
              <div className="flex space-x-0.5 text-amber-500 text-[11px]">
                {"★".repeat(Math.round(product.rating))}
              </div>
              <span className="text-xs text-stone-400 font-mono">
                {product.rating} / 5.0 ({product.reviewCount} customer testimonials)
              </span>
            </div>

            {/* Price section and dynamic stocking */}
            <div className="flex items-baseline space-x-4 border-b border-stone-850 pb-4">
              <span className="text-2xl font-mono tracking-tight text-amber-500">₹{product.price * quantity + (giftWrapping ? 1200 : 0)}</span>
              <span className="text-stone-400 line-through text-xs font-mono">₹{Math.round(product.price * 1.2)}</span>
              
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded ml-auto ${
                product.stock > 5 ? "bg-green-500/10 text-green-500" : "bg-rose-500/10 text-rose-500 animate-pulse"
              }`}>
                {product.stock > 5 ? "Luxury In Stock" : `Rare Piece Status - ${product.stock} left`}
              </span>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed font-light py-2">
              {product.description}
            </p>
          </div>

          {/* Technical Specs Checklist */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-surface border border-stone-850/50 text-[10px] tracking-wide text-stone-300">
            <div>
              <span className="text-stone-400 block mb-0.5">Vibe Theme</span>
              <span className="font-semibold text-amber-500">{product.theme}</span>
            </div>
            <div>
              <span className="text-stone-400 block mb-0.5">Master Materials</span>
              <span>{product.material}</span>
            </div>
            <div>
              <span className="text-stone-400 block mb-0.5">Precision Specs</span>
              <span>{product.dimensions}</span>
            </div>
            <div>
              <span className="text-stone-400 block mb-0.5">Shipping Status</span>
              <span className="text-green-500 font-semibold">Worldwide Insured</span>
            </div>
          </div>

          {/* VIP Custom Engraving Input */}
          <div className="space-y-2 border-t border-stone-850 pt-4">
            <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold block">
              Bespoke Engraving / Inscriptions (Optional)
            </span>
            <input 
              type="text" 
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="e.g. 'Sterling & Vance 2026' in liquid metal gold" 
              className={`w-full px-4 py-2 text-xs rounded-xl border focus:outline-none focus:border-amber-400 ${
                isDarkMode ? "bg-stone-950 border-stone-800 text-stone-100" : "bg-stone-50 border-stone-300 text-stone-900"
              }`}
            />
            <p className="text-[8px] text-stone-400">Our diamond cutter will handpaint this inscription in luxury liquid metal along the resin margin.</p>
          </div>

          {/* Premium Gift Wrapping Selector */}
          <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
            giftWrapping ? "border-amber-500 bg-amber-500/5 text-amber-400" : "bg-transparent border-stone-800 text-stone-300"
          }`}>
            <div className="flex items-center space-x-3">
              <Gift className="w-4 h-4 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold uppercase tracking-wide">Premium Velvet Linen Case</p>
                <p className="text-[9px] text-stone-450 leading-tight">Gift wrap option adds a handpainted custom dedication card (+ ₹1,200)</p>
              </div>
            </div>
            <input 
              type="checkbox" 
              checked={giftWrapping}
              onChange={() => setGiftWrapping(!giftWrapping)}
              className="w-4 h-4 accent-amber-500 cursor-pointer rounded"
            />
          </div>

          {/* Quantity selector and checkout button */}
          <div className="flex items-center space-x-4 pt-2">
            <div className="flex items-center border border-stone-800 rounded-xl overflow-hidden shrink-0">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3.5 py-2.5 bg-stone-900 text-stone-300 hover:text-white transition-colors"
                title="Decrease"
              >
                -
              </button>
              <span className="px-4 py-1.5 text-xs font-mono font-bold w-10 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3.5 py-2.5 bg-stone-900 text-stone-400 hover:text-white transition-colors"
                title="Increase"
              >
                +
              </button>
            </div>

            <button 
              onClick={handleAddToCartClick}
              className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl font-sans text-xs uppercase tracking-widest font-extrabold flex items-center justify-center space-x-2 shadow-lg transition-transform hover:scale-[1.02]"
              id="product-btn-add-to-cart"
            >
              <ShoppingBag className="w-4 h-4 text-stone-950" />
              <span>Curated Checkout Selection</span>
            </button>
          </div>

          {/* Estimated dispatch and security logs */}
          <div className="pt-2 flex justify-between text-[10px] text-stone-400 border-t border-stone-850/20 font-sans font-light">
            <span className="flex items-center space-x-1.5">
              <Truck className="w-3.5 h-3.5 text-stone-450" />
              <span>Insured dispatch in 2-3 business days</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
              <span>Secure Checkout & 1 Year Glass Polish Insurance</span>
            </span>
          </div>

        </div>

      </div>

      {/* Frequently bought together / Related portfolio lists */}
      {related.length > 0 && (
        <div className="border-t border-stone-850 pt-12 space-y-6">
          <div className="text-center md:text-left">
            <span className="text-[10px] text-amber-500 font-bold uppercase tracking-[0.34em]">Aesthetic Curation</span>
            <h3 className="text-sm sm:text-base uppercase tracking-widest font-bold mt-1">Frequently Bundled / Similar Masterpieces</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map(prod => (
              <div 
                key={prod.id}
                onClick={() => onViewProduct(prod)}
                className={`p-4 rounded-xl border group cursor-pointer transition-all ${
                  isDarkMode ? "bg-stone-950 border-stone-850 hover:bg-stone-900/40" : "bg-stone-50 border-stone-200 hover:bg-white"
                } hover:border-amber-500/25`}
              >
                <div className="aspect-video w-full rounded-lg overflow-hidden border border-stone-800 mb-3 relative">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-[11px] uppercase tracking-wider font-bold truncate group-hover:text-amber-500 transition-colors">
                    {prod.name}
                  </h4>
                  <p className="text-[10px] text-stone-400 font-sans truncate">{prod.theme} • {prod.category}</p>
                  <span className="text-[10px] font-mono font-semibold text-amber-500 block pt-1">₹{prod.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
