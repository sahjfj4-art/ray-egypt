import React from 'react';

// Page Navigation Types
export type PageView = 
  | 'home' 
  | 'about' 
  | 'systems' 
  | 'pricing' 
  | 'blog' 
  | 'help' 
  | 'faq' 
  | 'contact' 
  | 'privacy'
  | 'terms'
  | 'careers';

// Common Component Props
export interface BasePageProps {
  onPageNavigation?: (view: PageView) => void;
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  image: string;
}

// FAQ Types
export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

// Help Types
export interface HelpCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  articles: number;
  color: string;
}

export interface HelpArticle {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  difficulty: 'مبتدئ' | 'متوسط' | 'متقدم';
  readTime: string;
  hasVideo: boolean;
  hasDownload: boolean;
}

// Layout Types
export interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
  onPageNavigation?: (view: PageView) => void;
}
