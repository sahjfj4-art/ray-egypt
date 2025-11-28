export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  merchant: string;
  location: string;
}

export interface Order {
  id: string;
  customer: string;
  items: number;
  total: number;
  status: 'pending' | 'preparing' | 'delivering' | 'completed' | 'cancelled';
  time: string;
}

export interface MerchantStat {
  label: string;
  value: string;
  trend: number;
  icon: any;
}

export enum ViewState {
  MARKETPLACE = 'MARKETPLACE',
  DASHBOARD = 'DASHBOARD',
  POS = 'POS',
  FAQ = 'FAQ',
  BLOG = 'BLOG',
  HELP = 'HELP',
  PRIVACY_POLICY = 'PRIVACY_POLICY',
  TERMS = 'TERMS',
  USAGE_POLICY = 'USAGE_POLICY',
  CAREERS = 'CAREERS',
  PARTNERS = 'PARTNERS',
  DEVELOPMENT = 'DEVELOPMENT',
  JOIN_TEAM = 'JOIN_TEAM',
  TRAINING = 'TRAINING',
  MARKET = 'MARKET',
  REFUND_POLICY = 'REFUND_POLICY',
  // System pages
  RESTAURANT = 'RESTAURANT',
  RETAIL = 'RETAIL',
  CLOTHING = 'CLOTHING',
  POS_SYSTEM = 'POS_SYSTEM',
  INVENTORY = 'INVENTORY',
  LOGISTICS = 'LOGISTICS',
  MOBILE_LAUNDRY = 'MOBILE_LAUNDRY',
  HOME_SERVICES = 'HOME_SERVICES',
  DRY_CLEANING = 'DRY_CLEANING',
  DELIVERY = 'DELIVERY',
  MAINTENANCE = 'MAINTENANCE',
  CLEANING = 'CLEANING',
  SUBSCRIPTIONS = 'SUBSCRIPTIONS',
  SALON = 'SALON',
  NURSERY = 'NURSERY',
  ACADEMY = 'ACADEMY',
  LEGAL = 'LEGAL',
  RESORTS = 'RESORTS'
}
