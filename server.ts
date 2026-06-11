import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS, REVIEWS } from "./src/data/products.ts";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of Gemini API Client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.warn("GEMINI_API_KEY is not configured or left as default placeholder.");
    return null;
  }
  if (!aiInstance) {
    try {
      aiInstance = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    } catch (err) {
      console.error("Failed to initialize GoogleGenAI client:", err);
      return null;
    }
  }
  return aiInstance;
}

// -------------------------------------------------------------
// SECURE USER ENDPOINTS (REST/Gemini Proxy)
// -------------------------------------------------------------

// 1. AI Recommendation / Chat Assistant Endpoint
app.post("/api/chat", async (req, res) => {
  const { messages, userContext } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages body" });
  }

  const latestMessage = messages[messages.length - 1]?.text || "";

  // Formulate the product catalog overview for Gemini
  const catalogStr = PRODUCTS.map(p => 
    `- [ID: ${p.id}] "${p.name}" ($${p.price}) in ${p.category} (${p.subCategory}). Theme: ${p.theme}, Occasion: ${p.occasion}, Stock: ${p.stock} units. Desc: ${p.description}`
  ).join("\n");

  const systemInstruction = `You are the Elite AI Concierge for "Resin Aura", a premium luxury resin art brand that crafts exquisite handmade jewelry, home decor, customized gifts, and accessories.
Your tone is highly sophisticated, knowledgeable, and elegant. You speak with luxury service composure.
When suggesting items, recommend only the products listed in the provided catalog below and specify their complete names exactly as listed.
Always display product IDs in a clean format when relevant so the frontend can link or showcase them.

Our luxury products list:
${catalogStr}

Provide a helpful, beautifully phrased recommendation or response based on the conversation history and customer mood/context (${JSON.stringify(userContext || {})}).
If the customer wants a personalized product matching a specific vibe (such as wedding flower preservation, agates, ocean waves, or cosmic sparkles), guide them towards either existing catalog matches or custom designs.`;

  const ai = getGeminiClient();
  if (!ai) {
    // -------------------------------------------------------------
    // Intelligent Offline Fallback Engine (Robustness guaranteed)
    // -------------------------------------------------------------
    console.log("Using elegant rules-based offline recommendation engine.");
    const query = latestMessage.toLowerCase();
    let foundProducts = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.subCategory.toLowerCase().includes(query) ||
      p.theme.toLowerCase().includes(query) ||
      p.occasion.toLowerCase().includes(query) ||
      p.keywords.some(k => query.includes(k))
    );

    if (foundProducts.length === 0) {
      foundProducts = PRODUCTS.slice(0, 2); // Default fallback
    }

    let offlineResponse = "Welcome to Resin Aura! I would be delighted to assist you in discovering our curated artisanal creations. ";
    if (query.includes("wedding") || query.includes("vow") || query.includes("preserve") || query.includes("flower")) {
      offlineResponse += "For preserving your beautiful floral milestones, I highly recommend our premium 'Everlasting Wedding Vow Plaque' ($340). We embed actual petals inside thick freestanding eco-resin to create a glorious keepsake. Would you like to start a custom design order, or explore the botanical series?";
    } else if (query.includes("decor") || query.includes("clock") || query.includes("home") || query.includes("blue")) {
      offlineResponse += "To introduce elegant organic layers to your interior, our 'Shimmering Ocean Tide Geode Wall Clock' ($280) is an exquisite selection, blending authentic marine sand with custom 3D waves. We also have hexagonal emerald coasters. Shall I add one of these selections to your wishlist?";
    } else if (query.includes("jewelry") || query.includes("earring") || query.includes("pendant") || query.includes("ring")) {
      offlineResponse += "Our master jewelers hand-polish every single capsule. The 'Aura Gold Leaf Tear Drop Earrings' ($89) and our 'Botanical Rose Gold Pendant' ($120) contain real gilded petals and rose spikes. Truly marvelous wearable treasures.";
    } else {
      offlineResponse += `I have searched our premium collections for your custom requirement. Based on your prompt, you may adore our signature model, the ${foundProducts[0].name} ($${foundProducts[0].price}). It represents our classic visual craftsmanship. Shall I display this for you?`;
    }

    return res.json({
      text: offlineResponse,
      recommendedIds: foundProducts.map(p => p.id)
    });
  }

  try {
    // Convert messages array into structured Gemini format
    const contents = messages.map((m: any) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "I apologize, my creative flow encountered a brief ripple. How else can I guide your search for elegance?";

    // Extract product IDs that the model might have mentioned
    const mentionedIds = PRODUCTS.filter(p => 
      replyText.includes(p.id) || 
      replyText.toLowerCase().includes(p.name.toLowerCase())
    ).map(p => p.id);

    return res.json({
      text: replyText,
      recommendedIds: mentionedIds
    });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    return res.status(500).json({ error: error.message || "Failed to process AI chat" });
  }
});

// 2. AI Advanced Semantic Search
app.post("/api/ai-search", async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.json({ items: PRODUCTS });
  }

  const catalogStr = PRODUCTS.map(p => 
    `ID: ${p.id} | Name: ${p.name} | Category: ${p.category} | Theme: ${p.theme} | Price: $${p.price} | Desc: ${p.description} | Keywords: ${p.keywords.join(", ")}`
  ).join("\n");

  const prompt = `You are a high-end luxury semantic search assistant matching resin artifacts to users.
The user is searching for: "${query}"

Our luxury product collection:
${catalogStr}

Select and return ONLY a JSON array of the top matching product IDs, ordered by relevance. If there are no good matches, return empty array [].
Your entire output response must be ONLY a valid JSON array of product IDs, e.g. ["jewel-1", "decor-1"]. No extra text, markdown formatting blocks, or dialogue.`;

  const ai = getGeminiClient();
  if (!ai) {
    // Elegant fuzzy client-side search fallback
    const qLower = query.toLowerCase();
    const matches = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(qLower) ||
      p.description.toLowerCase().includes(qLower) ||
      p.theme.toLowerCase().includes(qLower) ||
      p.keywords.some(k => qLower.includes(k)) ||
      p.category.toLowerCase().includes(qLower) ||
      p.subCategory.toLowerCase().includes(qLower) ||
      p.occasion.toLowerCase().includes(qLower) ||
      p.material.toLowerCase().includes(qLower)
    );
    return res.json({ products: matches, isAIPowered: false });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    let resultText = (response.text || "[]").trim();
    // Safely parse JSON
    let matchedIds: string[] = [];
    try {
      matchedIds = JSON.parse(resultText);
    } catch {
      // In case markdown block was returned
      const match = resultText.match(/\[.*\]/s);
      if (match) {
        matchedIds = JSON.parse(match[0]);
      }
    }

    const filtered = PRODUCTS.filter(p => matchedIds.includes(p.id));
    // Keep order of matched IDs
    const ordered = matchedIds
      .map(id => filtered.find(p => p.id === id))
      .filter((p): p is typeof PRODUCTS[0] => !!p);

    // If search didn't get any AI leads, fallback to basic matches
    const finalProducts = ordered.length > 0 ? ordered : PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

    return res.json({ products: finalProducts, isAIPowered: true });
  } catch (err) {
    console.error("AI Search Error:", err);
    // Graceful fallback
    const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    return res.json({ products: matches, isAIPowered: false });
  }
});

// 3. AI Personalized Homepage Customizer
app.post("/api/personalized-home", async (req, res) => {
  const { mood, notes } = req.body;
  if (!mood) {
    return res.status(400).json({ error: "Mood selection is required" });
  }

  const prompt = `We are designing a highly elegant, personalized homepage layout for our customer who selected the luxury mood: "${mood}".
Note from customer: "${notes || 'None'}"

Generate the following parameters in JSON format:
1. "headline" (A premium e-commerce headline matching that specific theme, maximum 8 words)
2. "subheading" (A luxurious short descriptive sub-sentence)
3. "accentColor" (A matching elegant hex color for subtle accents - keep it extremely high contrast on light bg like deep navy, forest green, warm burgundy, rose-gold rose #C39B9B, cosmic indigo #4a3b72)
4. "themeAesthetic" (A description of the theme, e.g., "Gilded Agates & Shimmering Waters")
5. "matchedProductIds" (Array of 3 product IDs from our catalog: jewel-1, jewel-2, jewel-3, jewel-4, decor-1, decor-2, decor-3, acc-1, acc-2, gift-1, gift-2, gift-3 that best fit this aesthetic)

Catalog context:
${PRODUCTS.map(p => `ID: ${p.id}, Name: ${p.name}, Theme: ${p.theme}, Desc: ${p.description}`).join("\n")}

Response format must be strictly a valid JSON object ONLY, conforming to the structure above. No chat preamble or markdown markup.`;

  const ai = getGeminiClient();
  if (!ai) {
    // Beautiful preset variations based on selected mood
    let responseObj = {
      headline: "Artisanal Resin Crafted For Absolute Luxury",
      subheading: "Injecting sophisticated glass-like reflections and natural elements into your personal collection.",
      accentColor: "#DFB052", // Luxurious Gold
      themeAesthetic: "Gilded Liquid Elegance",
      matchedProductIds: ["decor-1", "decor-2", "jewel-1"]
    };

    if (mood === "Ocean Calm") {
      responseObj = {
        headline: "Deep Oceanic Textures Captured In Time",
        subheading: "Immerse yourself in handpainted frothy turquoise tides and pure marine sand masterworks.",
        accentColor: "#0F766E", // Aquatic Teal
        themeAesthetic: "Crashing Turquoise Waves",
        matchedProductIds: ["decor-1", "decor-2", "acc-2"]
      };
    } else if (mood === "Floral Romance") {
      responseObj = {
        headline: "Ethereal Botanicals Suspended In Brilliance",
        subheading: "Cherishing nature's fragile beauty forever with dried wildwood floral preserves and rose-gold linings.",
        accentColor: "#D946EF", // Magical Fuchsia
        themeAesthetic: "Timeless Botanical Gardens",
        matchedProductIds: ["jewel-2", "acc-1", "gift-1"]
      };
    } else if (mood === "Cosmic Shimmer") {
      responseObj = {
        headline: "Deep Celestial Space In Clear Resins",
        subheading: "Enchanting bands and statement pieces loaded with real cosmic holo dust and starry dark pigments.",
        accentColor: "#6366F1", // Midnight Indigo
        themeAesthetic: "Galactic Quartz Horizons",
        matchedProductIds: ["jewel-3", "acc-2", "decor-2"]
      };
    }

    return res.json({ data: responseObj, isAIPowered: false });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ data: parsed, isAIPowered: true });
  } catch (err) {
    console.error("Personalized Home Error:", err);
    return res.status(500).json({ error: "Failed to query personalization" });
  }
});

// 4. AI Customer Insights Dashboard Generator
app.get("/api/customer-insights", async (req, res) => {
  const reviewsContext = REVIEWS.map(r => `- User: ${r.userName} | Rating: ${r.rating}/5 | Product: ${r.productName} | Comment: ${r.comment}`).join("\n");

  const prompt = `Review our customers' luxury reviews catalog and output professional administrative insights inside a clean JSON schema:
1. "satisfactionPercentage" (A total customer happiness score from 0 to 100 based on the feedback quality)
2. "totalSentiment" (A one-word status, e.g. "Outstanding" or "Excellent")
3. "trendingThemes" (Array of 3 trending themes customers are raving about based on the feedback)
4. "areasForImprovement" (Array of 2 operational tips to elevate custom experiences further)
5. "executiveSummary" (A majestic paragraph summarizing our brand status, customer devotion, and visual presence)

Review log:
${reviewsContext}

Output MUST be strictly a valid JSON object ONLY. No markdown wrapper blocks.`;

  const ai = getGeminiClient();
  if (!ai) {
    // High-quality hardcoded response fallback when server-side AI is offline or key missing
    const offlineInsights = {
      satisfactionPercentage: 98,
      totalSentiment: "Extremely Loyal",
      trendingThemes: ["Superb Multi-layered Ocean Tides", "Flawless Botanical Flower Preservation", "Agate Edges Handpainted with Liquid Metal"],
      areasForImprovement: ["Speeding up 3D custom mockups preview", "Adding more sustainable shipping carrier options"],
      executiveSummary: "Customers express extreme delight with Resin Aura's artisanal precision, particularly highlighting the layered depth of our Ocean Tide clock and the sentimental value of our wedding bouquet keepsakes. Our brand maintains an outstanding luxury image with continuous 5.0-star reviews."
    };
    return res.json({ insights: offlineInsights, isAIPowered: false });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ insights: parsed, isAIPowered: true });
  } catch (err) {
    console.error("Insights Generation Error:", err);
    const offlineInsights = {
      satisfactionPercentage: 98,
      totalSentiment: "Extremely Loyal",
      trendingThemes: ["Superb Multi-layered Ocean Tides", "Flawless Botanical Flower Preservation", "Agate Edges Handpainted with Liquid Metal"],
      areasForImprovement: ["Speeding up 3D custom mockups preview", "Adding more sustainable shipping carrier options"],
      executiveSummary: "Customers express extreme delight with Resin Aura's artisanal precision, particularly highlighting the layered depth of our Ocean Tide clock and the sentimental value of our wedding bouquet keepsakes."
    };
    return res.json({ insights: offlineInsights, isAIPowered: false });
  }
});

// -------------------------------------------------------------
// VITE OR STATIC MIDDLEWARE SERVING & START APPLET CONTAINER
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Resin Aura Fullstack Engine listening on http://localhost:${PORT}`);
  });
}

startServer();

