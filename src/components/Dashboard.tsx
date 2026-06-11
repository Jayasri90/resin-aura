import React, { useState } from "react";
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Award, 
  Tag, 
  Bell, 
  Settings, 
  Copy, 
  Check, 
  CheckSquare, 
  ArrowRight,
  Truck,
  Sparkles
} from "lucide-react";
import { Product, Coupon, Order, CustomOrder, RewardPoints } from "../types";
import { COUPONS } from "../data/products";

interface DashboardProps {
  wishlist: Product[];
  onRemoveFromWishlist: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  isDarkMode: boolean;
  onViewProduct: (p: Product) => void;
  customOrders: CustomOrder[];
}

export default function Dashboard({
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  isDarkMode,
  onViewProduct,
  customOrders
}: DashboardProps) {
  const [activeSection, setActiveSection] = useState<"overview" | "orders" | "wishlist" | "addresses" | "coupons" | "rewards">("overview");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  // Real-time notification lists for high-end luxury engagement
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Your custom bridal flower preservation request has been accepted by our master jeweler! Proceeding to design review shortly.", date: "Just now", unread: true },
    { id: 2, text: "High-gloss finishing completed on your Gilded Emerald Coasters. Proceeding to safe eco-packing.", date: "1 day ago", unread: false }
  ]);

  const [shippingAddress, setShippingAddress] = useState({
    name: "Aria Sterling",
    street: "847 Emerald Canopy Way",
    city: "Beverly Hills, CA 90210",
    phone: "+1 (310) 555-0192",
    country: "United States"
  });

  const rewardPoints: RewardPoints = {
    balance: 450,
    history: [
      { date: "2026-06-08", points: 280, reason: "First purchase: Ocean Tide Geode Wall Clock" },
      { date: "25-05-2026", points: 120, reason: "Affiliated profile registration reward" },
      { date: "15-05-2025", points: 50, reason: "Submitted high-resolution editorial photo of coasters" }
    ]
  };

  const orders: Order[] = [
    {
      id: "AURA-8349",
      date: "22026-06-10",
      items: [
        {
          productId: "decor-1",
          productName: "Shimmering Ocean Tide Geode Wall Clock",
          price: 280,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80"
        }
      ],
      total: 280,
      status: "Shipped",
      trackingNumber: "AURA-FEDEX-94829",
      shippingAddress: "847 Emerald Canopy Way, Beverly Hills, CA 90210"
    }
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 ${
      isDarkMode ? "text-stone-100" : "text-stone-900"
    }`}>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar navigation */}
        <div className={`p-5 rounded-2xl border ${
          isDarkMode ? "bg-stone-950 border-stone-850" : "bg-stone-50 border-stone-200"
        } h-fit space-y-6`}>
          <div className="flex items-center space-x-3.5 border-b border-stone-800/30 pb-4 h-12">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-rose-300 to-teal-400 p-[1.5px] flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center">
                <User className="w-4 h-4 text-amber-300" />
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold tracking-wide truncate">Aria Sterling</span>
              <span className="text-[10px] text-stone-400 font-mono">ID: VIP-9483A</span>
            </div>
          </div>

          <nav className="space-y-1.5 font-sans">
            {[
              { id: "overview", label: "Dashboard Overview", icon: User },
              { id: "orders", label: "My Orders & Preserves", icon: Package },
              { id: "wishlist", label: "My Art Wishlist", icon: Heart },
              { id: "addresses", label: "VIP Shipping Address", icon: MapPin },
              { id: "rewards", label: "Resin Aura Rewards", icon: Award },
              { id: "coupons", label: "Coupons & Discounts", icon: Tag }
            ].map(sec => {
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id as any)}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all ${
                    activeSection === sec.id
                      ? "bg-amber-500 text-stone-950 font-semibold shadow-md"
                      : "text-stone-400 hover:text-amber-500 hover:bg-stone-50/10"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Dynamic Section Contents */}
        <div className="lg:col-span-3 space-y-6">

          {/* 1. OVERVIEW */}
          {activeSection === "overview" && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-stone-850 pb-3">
                <h2 className="text-lg uppercase tracking-widest font-bold text-amber-500">Aura Lounge VIP Overview</h2>
                <p className="text-[10px] text-stone-400">Review your collection milestones and reward status</p>
              </div>

              {/* Rewards Summary Bar */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-xl border ${isDarkMode ? "bg-stone-950 border-stone-850" : "bg-stone-50 border-stone-200"}`}>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block pb-1">Affiliate Tier</span>
                  <span className="text-xl font-bold tracking-tight text-amber-500 flex items-center space-x-1">
                    <Sparkles className="w-4 h-4 text-amber-400 animate-pulse inline mr-1" />
                    <span>Gold Collector</span>
                  </span>
                  <p className="text-[10px] text-stone-400 mt-1">Unlock free express shipping on custom pieces</p>
                </div>

                <div className={`p-4 rounded-xl border ${isDarkMode ? "bg-stone-950 border-stone-850" : "bg-stone-50 border-stone-200"}`}>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block pb-1">Award Points</span>
                  <span className="text-xl font-bold tracking-tight font-mono">{rewardPoints.balance} pts</span>
                  <p className="text-[10px] text-stone-400 mt-1">Equates to <span className="font-bold text-amber-500">₹3,600</span> in loyalty credits</p>
                </div>

                <div className={`p-4 rounded-xl border ${isDarkMode ? "bg-stone-950 border-stone-850" : "bg-stone-50 border-stone-200"}`}>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block pb-1">Active Custom Design</span>
                  <span className="text-xl font-bold tracking-tight text-amber-500">
                    {customOrders.length > 0 ? `${customOrders.length} In-Flow` : "0 Custom Preserves"}
                  </span>
                  <p className="text-[10px] text-stone-400 mt-1">
                    {customOrders.length > 0 ? "Inspect progress draft below" : "Capture details on Custom Orders tab"}
                  </p>
                </div>
              </div>

              {/* Order Tracking micro timeline card */}
              <div className={`p-5 rounded-xl border border-amber-500/10 ${
                isDarkMode ? "bg-gradient-to-br from-stone-950 to-stone-900" : "bg-white"
              }`}>
                <div className="flex items-center justify-between pb-3.5 border-b border-stone-850 mb-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-amber-500 font-bold block">Active Order Progress</span>
                    <span className="text-xs font-semibold">Gilded Geode Large Wall Clock — #AURA-8349</span>
                  </div>
                  <span className="text-[10px] font-mono tracking-wide text-stone-400">Est. Delivery: June 15, 2026</span>
                </div>

                {/* Timeline graphics */}
                <div className="grid grid-cols-5 gap-2 relative mt-4">
                  {/* Progress Line bar */}
                  <div className="absolute top-3 left-9 right-9 h-0.5 bg-stone-800 -z-10 flex">
                    <div className="h-full bg-amber-500 w-3/4" />
                  </div>

                  {[
                    { step: "Order Approved", desc: "Design specified", done: true },
                    { step: "Resin Casted", desc: "Layers cured", done: true },
                    { step: "Diamond Polished", desc: "Organic bevel lines", done: true },
                    { step: "Courier Waybill", desc: "Departed hub", done: true },
                    { step: "At Gate", desc: "Beverly Hills", done: false }
                  ].map((tl, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        tl.done 
                          ? "bg-amber-500 text-stone-950 shadow-md" 
                          : "bg-stone-850 text-stone-500 border border-stone-800"
                      }`}>
                        {tl.done ? <Check className="w-3.5 h-3.5" /> : (i + 1)}
                      </div>
                      <span className="text-[9px] tracking-wide font-sans font-bold mt-1.5 block">{tl.step}</span>
                      <span className="text-[8px] text-stone-400 font-sans tracking-wide block truncate w-full">{tl.desc}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-6 pt-3 border-t border-stone-850/20">
                  <span className="text-[10px] text-stone-400 font-mono">TRACKING: FEDEX-94829375</span>
                  <button 
                    onClick={() => setActiveSection("orders")} 
                    className="text-[10px] text-amber-500 hover:underline uppercase tracking-widest font-semibold flex items-center space-x-1"
                  >
                    <span>Inspect tracking logs</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* VIP Notifications logs */}
              <div className="space-y-2.5">
                <span className="text-[11px] uppercase tracking-widest text-stone-400 font-bold block">Aesthetic notifications</span>
                {notifications.map(notif => (
                  <div key={notif.id} className={`p-3.5 rounded-xl border flex items-start space-x-3.5 ${
                    notif.unread
                      ? isDarkMode 
                        ? "bg-stone-900 border-stone-850/60 text-stone-150" 
                        : "bg-amber-500/5 border-amber-500/10 text-stone-900"
                      : isDarkMode 
                        ? "bg-stone-950/40 border-stone-900 text-stone-400" 
                        : "bg-white border-stone-200 text-stone-500"
                  }`}>
                    <Bell className={`w-4 h-4 mt-0.5 shrink-0 ${notif.unread ? "text-amber-500" : "text-stone-400"}`} />
                    <div className="flex-1 text-xs">
                      <p className="leading-relaxed font-sans font-light">{notif.text}</p>
                      <span className="text-[9px] font-sans text-stone-400 font-light block mt-1">{notif.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. ORDERS LIST */}
          {activeSection === "orders" && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-stone-850 pb-3">
                <h2 className="text-lg uppercase tracking-widest font-bold text-amber-500">Matrimonial & Catalog Orders</h2>
                <p className="text-[10px] text-stone-400">Review historical payments, delivery tracking, and custom milestones</p>
              </div>

              {/* Orders looping */}
              {orders.map((ord, idx) => (
                <div key={idx} className={`p-5 rounded-xl border ${
                  isDarkMode ? "bg-stone-950 border-stone-850" : "bg-stone-50 border-stone-200"
                } space-y-4`}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-stone-850 gap-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-4">
                      <span className="text-xs uppercase tracking-widest font-extrabold text-amber-500 font-mono">{ord.id}</span>
                      <span className="text-[10px] text-stone-400 leading-none">Placed on: {ord.date}</span>
                    </div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-green-500 bg-green-500/10 px-2.5 py-0.5 rounded">
                      Fulfillment: {ord.status}
                    </span>
                  </div>

                  {ord.items.map((item, i) => (
                    <div key={i} className="flex space-x-4">
                      <img src={item.image} alt={item.productName} className="w-16 h-16 object-cover rounded-lg border border-stone-800" />
                      <div className="flex-1 flex flex-col justify-between py-1.5">
                        <h4 className="text-xs tracking-wider uppercase font-semibold">{item.productName}</h4>
                        <div className="flex justify-between items-center text-[11px] text-stone-400">
                          <span>Qty: {item.quantity}</span>
                          <span className="font-mono font-bold text-stone-300">₹{item.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="pt-3 border-t border-stone-850/20 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] text-stone-400 gap-2">
                    <p className="font-sans font-light">Shipping Coordinates: <span className="text-stone-300 font-semibold">{ord.shippingAddress}</span></p>
                    <div className="flex items-center space-x-2.5 self-end sm:self-auto font-sans">
                      <span>Grand Total:</span>
                      <span className="text-xs font-bold font-mono text-amber-500">₹{ord.total}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Custom Preserves Row */}
              {customOrders.length > 0 ? (
                <div className="space-y-3 pt-2">
                  <span className="text-[11px] uppercase tracking-widest text-stone-400 font-bold block">VIP Custom Project Drafts</span>
                  {customOrders.map((cust) => (
                    <div key={cust.id} className="p-4 rounded-xl border border-amber-500/10 bg-amber-500/5 space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-stone-850">
                        <div>
                          <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">{cust.id}</span>
                          <h4 className="text-xs uppercase tracking-wider font-bold mt-0.5">Bespoke {cust.productType}</h4>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          {cust.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[11px] text-stone-300">
                        <div>
                          <span className="text-stone-450 block text-[9px] uppercase tracking-wider font-bold mb-0.5">Ethereal Vibe</span>
                          <span>{cust.theme}</span>
                        </div>
                        <div>
                          <span className="text-stone-450 block text-[9px] uppercase tracking-wider font-bold mb-0.5">Eco Tones</span>
                          <span>{cust.colors.join(", ")}</span>
                        </div>
                        <div>
                          <span className="text-stone-450 block text-[9px] uppercase tracking-wider font-bold mb-0.5">Embedded Elements</span>
                          <span className="truncate block">{cust.elements.join(", ")}</span>
                        </div>
                        <div>
                          <span className="text-stone-450 block text-[9px] uppercase tracking-wider font-bold mb-0.5">Estimated Cost</span>
                          <span className="font-mono text-xs font-semibold text-amber-500">₹{cust.price}</span>
                        </div>
                      </div>

                      {cust.status === "Pending Review" && (
                        <div className="p-3 rounded-lg bg-stone-900 border border-stone-800 text-[10px] leading-relaxed text-stone-400">
                          🛎️ Our artisanal designer is curating a photorealistic visual mockup. We will notify your dashboard for final consent prior to diamond pouring.
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center border border-dashed border-stone-800 rounded-xl space-y-4">
                  <p className="text-xs text-stone-400">You haven't initiated custom flower preserves or signature name desks yet.</p>
                  <button className="text-xs px-4 py-2 bg-amber-500 text-stone-950 rounded-xl font-bold uppercase tracking-wider shadow">
                    Create Custom Design Order
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 3. WISHLIST */}
          {activeSection === "wishlist" && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-stone-850 pb-3">
                <h2 className="text-lg uppercase tracking-widest font-bold text-amber-500">My Art Wishlist</h2>
                <p className="text-[10px] text-stone-400">Curate and monitor availability of premium creations</p>
              </div>

              {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {wishlist.map(prod => (
                    <div 
                      key={prod.id} 
                      className={`p-4 rounded-xl border flex space-x-4 ${
                        isDarkMode ? "bg-stone-950 border-stone-850" : "bg-stone-50 border-stone-200"
                      } hover:border-amber-500/25 transition-colors`}
                    >
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        className="w-20 h-20 object-cover rounded-xl border border-stone-800 cursor-pointer"
                        onClick={() => onViewProduct(prod)}
                      />
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h4 
                            className="text-xs uppercase tracking-wider font-bold cursor-pointer hover:text-amber-500 transition-colors truncate"
                            onClick={() => onViewProduct(prod)}
                          >
                            {prod.name}
                          </h4>
                          <span className="text-[10px] text-stone-450 font-mono tracking-widest font-light block mt-0.5">₹{prod.price}</span>
                        </div>

                        <div className="flex space-x-2 pt-2">
                          <button 
                            onClick={() => onAddToCart(prod)}
                            className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 text-[10px] rounded-lg tracking-wider uppercase font-semibold"
                          >
                            Add To Cart
                          </button>
                          <button 
                            onClick={() => onRemoveFromWishlist(prod)}
                            className="text-[10px] text-rose-500 hover:underline hover:text-rose-400 bg-stone-900/40 border border-stone-800 px-3 py-1 rounded-lg block uppercase tracking-wider"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center border border-dashed border-stone-800 rounded-xl space-y-2">
                  <Heart className="w-8 h-8 text-stone-800 mx-auto" />
                  <p className="text-xs text-stone-400">No items bookmarked in your VIP portfolio. Explore our collections and add products!</p>
                </div>
              )}
            </div>
          )}

          {/* 4. ADDRESSES */}
          {activeSection === "addresses" && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-stone-850 pb-3">
                <h2 className="text-lg uppercase tracking-widest font-bold text-amber-500">VIP Shipping Coordinates</h2>
                <p className="text-[10px] text-stone-400">Configure default locations for secure insured delivery</p>
              </div>

              <div className={`p-5 rounded-xl border ${isDarkMode ? "bg-stone-950 border-stone-850" : "bg-stone-50 border-stone-200"} max-w-md space-y-4`}>
                <div className="flex justify-between items-center pb-2 border-b border-stone-850">
                  <span className="text-xs uppercase tracking-widest font-bold text-amber-500">Primary Residence</span>
                  <span className="text-[9px] font-sans text-green-500 bg-green-500/10 px-2 py-0.5 rounded font-bold uppercase">Default</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <p className="font-bold text-stone-300">{shippingAddress.name}</p>
                  <p>{shippingAddress.street}</p>
                  <p>{shippingAddress.city}</p>
                  <p>{shippingAddress.country}</p>
                  <p className="text-stone-400 font-light mt-1.5 font-mono">TEL: {shippingAddress.phone}</p>
                </div>

                <div className="pt-2 flex justify-start space-x-2">
                  <button 
                    onClick={() => alert("Address editing dialog simulated.")}
                    className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 text-[10px] uppercase tracking-wider rounded-lg"
                  >
                    Edit Address Details
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 5. REWARDS */}
          {activeSection === "rewards" && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-stone-850 pb-3">
                <h2 className="text-lg uppercase tracking-widest font-bold text-amber-500">Resin Aura Rewards</h2>
                <p className="text-[10px] text-stone-400">Earn beautiful reward points on every single purchase</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Rewards history log */}
                <div className={`p-5 rounded-xl border ${isDarkMode ? "bg-stone-950 border-stone-850" : "bg-stone-50 border-stone-200"}`}>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-500 block mb-3 h-5">Point History Ledger</span>
                  <div className="space-y-3">
                    {rewardPoints.history.map((hist, i) => (
                      <div key={i} className="flex justify-between items-start text-xs pb-2.5 border-b border-stone-850">
                        <div>
                          <p className="font-sans font-medium text-stone-300">{hist.reason}</p>
                          <span className="text-[9px] text-stone-400 block mt-0.5">{hist.date}</span>
                        </div>
                        <span className="font-mono text-green-500 font-bold shrink-0">+{hist.points} pts</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rewards details */}
                <div className={`p-5 rounded-xl border border-amber-500/10 bg-amber-500/5 space-y-4`}>
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-amber-500 animate-bounce" />
                    <h3 className="text-xs uppercase tracking-widest font-bold">VIP Points Policy</h3>
                  </div>
                  <p className="text-xs leading-relaxed font-sans font-light text-stone-300">
                    Our loyalty catalog rewards prestigious art collectors with exclusive value. You earn exactly <span className="font-bold text-amber-500">1 Aura Point</span> for every ₹10 spent. Points automatically accumulate in your dashboard and can be compiled into digital checkout codes at any custom billing interval.
                  </p>
                  <p className="text-xs leading-relaxed font-sans font-light text-stone-300">
                    Your current score: <span className="font-mono font-bold text-amber-500 text-sm">{rewardPoints.balance} points</span>.
                  </p>
                  <button 
                    onClick={() => alert("Success! Redeemed 400 points into standard ₹3,200 voucher code: AURAREWARD3200.")}
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs rounded-xl uppercase font-bold tracking-widest block font-sans"
                  >
                    Redeem Points Into Custom Voucher
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 6. COUPONS */}
          {activeSection === "coupons" && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-stone-850 pb-3">
                <h2 className="text-lg uppercase tracking-widest font-bold text-amber-500">Coupons & Exclusive Vouchers</h2>
                <p className="text-[10px] text-stone-400">Unlock hand-allocated discount credits</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {COUPONS.map((coupon, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border border-dashed relative overflow-hidden flex flex-col justify-between ${
                    isDarkMode ? "bg-stone-950 border-stone-800" : "bg-stone-50 border-stone-300"
                  }`}>
                    <div className="space-y-1.5 pr-20">
                      <div className="text-xs uppercase font-extrabold tracking-widest text-amber-500 font-mono">
                        {coupon.code}
                      </div>
                      <p className="text-xs text-stone-300 font-sans font-light leading-relaxed">
                        {coupon.description}
                      </p>
                      <span className="text-[8px] font-mono tracking-wider bg-stone-900 text-stone-400 px-1.5 py-0.5 rounded font-bold uppercase block w-fit">
                        Expires: {coupon.expiry}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopyCode(coupon.code)}
                      className="absolute right-4 top-4 bg-amber-500 hover:bg-amber-400 hover:scale-105 p-2 rounded-xl transition-all shadow text-stone-950"
                      title="Copy Coupon Code"
                    >
                      {copiedCode === coupon.code ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
