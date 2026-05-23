export interface Product {
  id: string;
  title: string;
  state: string;
  stateCode: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  img: string;
  detailsImages?: string[];
  rating: number;
  reviewsCount: number;
  isTrending?: boolean;
  isHandmade?: boolean;
  isLimited?: boolean;
  isBestSeller?: boolean;
  region: string;
  storyTitle?: string;
  storyParagraphs?: string[];
  artisanName?: string;
  artisanImage?: string;
  artisanQuote?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface StateItem {
  name: string;
  code: string;
  artForm: string;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  avatarLetter: string;
  avatarBg: string;
}

export interface OrderDetails {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  addressType: "Home" | "Work";
  paymentMethod: "UPI" | "Card" | "NetBanking";
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
}

export type ViewType = "home" | "detail" | "explore" | "cart" | "checkout" | "orderConfirmed";
