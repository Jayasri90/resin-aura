import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { ChatMessage, Product } from "../types";
import { PRODUCTS } from "../data/products";

interface AIAssistantProps {
  onViewProduct: (product: Product) => void;
  isDarkMode: boolean;
}

export default function AIAssistant({ onViewProduct, isDarkMode }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "Greetings, collector. Welcome to the Resin Aura Sanctuary. I am your elite AI Art Concierge. Allow me to guide you through our crystalline preserved botanicals, custom geode clocks, or help draft your bespoke custom order. What captures your imagination today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const predefinedPrompts = [
    "Preserve wedding flowers",
    "Show luxury wall clocks",
    "Gold leaf earrings catalog",
    "How does custom order work?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;
    
    const userMsg: ChatMessage = {
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            sender: m.sender,
            text: m.text
          }))
        })
      });

      if (!response.ok) {
        throw new Error("Server response failed");
      }

      const data = await response.json();
      
      // Match recommended products by parsing mentionedIds or names
      let matchedItems: Product[] = [];
      if (data.recommendedIds && Array.isArray(data.recommendedIds)) {
        matchedItems = PRODUCTS.filter(p => data.recommendedIds.includes(p.id));
      }

      const botMsg: ChatMessage = {
        sender: "bot",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedProducts: matchedItems.length > 0 ? matchedItems : undefined
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.warn("AI Assistant failed to contact server API. Initiating ultra-fast local heuristic chat solver.", error);
      
      // Perform elite local matching fallback
      const query = textToSend.toLowerCase();
      let matchedItems: Product[] = [];
      let reply = "";

      if (query.includes("wedding") || query.includes("pancake") || query.includes("vow") || query.includes("bouquet") || query.includes("preserve")) {
        const p = PRODUCTS.find(prod => prod.id === "gift-1");
        if (p) matchedItems.push(p);
        reply = "Preserving bridal milestones is our primary signature craft! For high-end flower preservation, our wedding artisans curate the 'Everlasting Wedding Vow Plaque' ($340) inside heavy transparent Archival Block. This seals your memories with high-gloss liquid glass safely. You could initiate your order in the Custom Orders tab!";
      } else if (query.includes("clock") || query.includes("wall") || query.includes("ocean") || query.includes("tide")) {
        const p = PRODUCTS.find(prod => prod.id === "decor-1");
        if (p) matchedItems.push(p);
        reply = "Our ocean masterpieces utilize physical quartz gems, authentic shore sands, and structural layered blue resin tide-banks. The 'Shimmering Ocean Tide Geode Wall Clock' ($280) is an incredible premium layout for high-end dining rooms. I have linked the clock directly below for your preview.";
      } else if (query.includes("earring") || query.includes("jewelry") || query.includes("pendant")) {
        const p1 = PRODUCTS.find(p => p.id === "jewel-1");
        const p2 = PRODUCTS.find(p => p.id === "jewel-2");
        if (p1) matchedItems.push(p1);
        if (p2) matchedItems.push(p2);
        reply = "We craft beautiful luxury wearables filled with pure 24k gold leaf particles and preserved chamomile blossoms, hand-ground down to fine microscopic finish. The 'Aura Gold Leaf Tear Drop Earrings' ($89) is an extraordinary best-seller.";
      } else if (query.includes("custom") || query.includes("order") || query.includes("step") || query.includes("how")) {
        reply = "Our luxury bespoke process is fully seamless: 1. You specify your curated product and dimension, 2. Upload reference imagery and aesthetic styles, 3. Review a modern visual 3D design proof, and 4. Receive your custom hand-finished artwork delivered globally in premium eco-boxes. Shall we begin custom design?";
      } else {
        // Fallback random luxury match
        const p = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
        matchedItems.push(p);
        reply = `To spark your imagination, allow me to recommend our ${p.name} ($${p.price}) in the ${p.category} collection. Crafted with professional grade crystalline epoxies and precious sparkles. Is there a specific centerpiece dimension or occasion you are searching for?`;
      }

      const botMsg: ChatMessage = {
        sender: "bot",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedProducts: matchedItems
      };
      
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Sparkle Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-rose-400 to-teal-500 text-stone-900 shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none"
          title="Consult AI Resin Concierge"
          id="ai-toggle-btn"
        >
          {/* Animated Glow Border */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400 via-rose-400 to-teal-500 opacity-75 blur group-hover:opacity-100 transition-opacity" />
          <div className="relative w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-amber-200 animate-pulse" />
          </div>
          {/* Tiny notification dot */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 border border-stone-900 text-[8px] text-white font-sans font-bold justify-center items-center">AI</span>
          </span>
        </button>
      )}

      {/* Luxury Chat Window */}
      {isOpen && (
        <div className={`w-[360px] sm:w-[410px] h-[550px] shadow-2xl rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden ${
          isDarkMode 
            ? "bg-stone-950/95 border-stone-800 text-stone-100" 
            : "bg-white/95 border-stone-200 text-stone-900"
        } backdrop-blur-xl animate-scale-up`}>
          
          {/* Elegant Header */}
          <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 px-4 py-4 flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 via-rose-300 to-teal-400 p-[1.5px] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-[0.2em] font-sans font-bold text-amber-400">Resin Aura Concierge</span>
                <span className="text-[9px] text-stone-400 tracking-wider">AI Master Jeweler & Decor Advisor - Active</span>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-white transition-colors p-1 rounded-full hover:bg-stone-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Conversation Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans bg-stone-50/5">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-amber-500 text-stone-950 rounded-tr-none font-medium shadow-md"
                    : isDarkMode
                      ? "bg-stone-900 text-stone-100 border border-stone-800 rounded-tl-none font-normal"
                      : "bg-stone-100 text-stone-900 rounded-tl-none font-normal border border-stone-200"
                }`}>
                  <p>{msg.text}</p>
                  
                  {/* Recommended Products UI */}
                  {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t border-stone-700/30 space-y-2">
                      <span className="text-[9px] uppercase tracking-widest text-amber-500 font-bold block mb-1">
                        Curated Suggestions
                      </span>
                      {msg.recommendedProducts.map(prod => (
                        <div 
                          key={prod.id}
                          className={`flex items-center space-x-3.5 p-2 rounded-xl border transition-all hover:scale-[1.02] cursor-pointer ${
                            isDarkMode 
                              ? "bg-stone-950 hover:bg-stone-850 border-stone-800" 
                              : "bg-white hover:bg-stone-50 border-stone-205"
                          }`}
                          onClick={() => {
                            onViewProduct(prod);
                            setIsOpen(false);
                          }}
                        >
                          <img 
                            src={prod.image} 
                            alt={prod.name} 
                            className="w-10 h-10 object-cover rounded-lg border border-stone-700/20"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[10px] font-semibold tracking-wide truncate text-amber-500">
                              {prod.name}
                            </h4>
                            <p className="text-[9px] text-stone-400 font-mono">${prod.price} • {prod.category}</p>
                          </div>
                          <ArrowRight className="w-3 h-3 text-stone-400" />
                        </div>
                      ))}
                    </div>
                  )}

                  <span className="text-[8px] text-stone-400 block text-right mt-1.5 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className={`rounded-xl px-4 py-2.5 flex items-center space-x-2 text-[10px] text-stone-400 border ${
                  isDarkMode ? "bg-stone-900 border-stone-800" : "bg-stone-100 border-stone-200"
                }`}>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  <span>Casting ideas into resin...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Preset Helper Prompts */}
          {messages.length === 1 && (
            <div className="px-4 py-2 space-y-2 border-t border-stone-800/10">
              <span className="text-[9px] uppercase tracking-wider text-stone-400 block mb-1">Inquire About</span>
              <div className="grid grid-cols-2 gap-1.5 pb-2">
                {predefinedPrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(p)}
                    className={`p-2 rounded-xl text-left text-[10px] truncate border hover:border-amber-400 transition-all ${
                      isDarkMode 
                        ? "bg-stone-900/50 border-stone-850 hover:bg-stone-850 text-stone-300" 
                        : "bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer Input Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText); }}
            className={`p-3.5 border-t flex items-center space-x-2 ${
              isDarkMode ? "bg-stone-950 border-stone-900" : "bg-stone-100/50 border-stone-200"
            }`}
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Inquire about custom sizes, jewelry, shapes..."
              className={`flex-1 px-4 py-2 text-xs rounded-xl border focus:outline-none transition-colors ${
                isDarkMode 
                  ? "bg-stone-900 border-stone-800 hover:border-stone-700 focus:border-amber-400 text-stone-100" 
                  : "bg-white border-stone-250 focus:border-amber-500 text-stone-900"
              }`}
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 p-2.5 rounded-xl transition-all shadow-md flex items-center justify-center shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
