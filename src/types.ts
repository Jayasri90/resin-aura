export interface Product {
  id: string;
  name: string;
  category: "Jewelry" | "Accessories" | "Home Decor" | "Personalized Gifts";
  subCategory: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  colors: string[];
  keywords: string[];
  stock: number;
  theme: string;
  occasion: string;
  material: string;
  dimensions: string;
  isBestSeller?: boolean;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  productName: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  giftWrapping?: boolean;
  customText?: string;
}

export interface CustomOrder {
  id: string;
  productType: string;
  colors: string[];
  theme: string;
  elements: string[]; // gold leaf, flower petals, glitter, sea shells etc
  customText?: string;
  customImage?: string; // base64 or placeholder
  status: "Draft" | "Pending Review" | "Preview Approved" | "In Production" | "Shipped" | "Delivered";
  price: number;
  createdAt: string;
}

export interface Order {
  id: string;
  date: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  total: number;
  status: "Placed" | "Processing" | "Shipped" | "Delivered";
  trackingNumber?: string;
  shippingAddress: string;
}

export interface RewardPoints {
  balance: number;
  history: {
    date: string;
    points: number;
    reason: string;
  }[];
}

export interface Coupon {
  code: string;
  discount: number; // percentage
  expiry: string;
  minSpend: number;
  description: string;
}

export interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  recommendedProducts?: Product[];
}
