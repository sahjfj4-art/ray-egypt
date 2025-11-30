// Page Categories
export const PAGE_CATEGORIES = {
  STATIC: ['privacy', 'terms', 'about'],
  INTERACTIVE: ['blog', 'faq', 'help', 'careers'],
  SYSTEMS: ['restaurant', 'retail', 'realestate', 'cars']
} as const;

// FAQ Categories
export const FAQ_CATEGORIES = [
  'عن المنصة',
  'البدء',
  'التسعير',
  'الدعم الفني',
  'حسابي',
  'الفواتير'
] as const;

// Help Categories
export const HELP_CATEGORIES = [
  { id: 'getting-started', title: 'البدء', color: 'bg-blue-500' },
  { id: 'systems', title: 'الأنظمة', color: 'bg-green-500' },
  { id: 'billing', title: 'الفواتير', color: 'bg-purple-500' },
  { id: 'technical', title: 'فني', color: 'bg-red-500' },
  { id: 'account', title: 'الحساب', color: 'bg-yellow-500' }
] as const;

// Blog Categories
export const BLOG_CATEGORIES = [
  'إدارة أعمال',
  'تقنية',
  'تسويق',
  'نصائح',
  'تحول رقمي'
] as const;

// Social Media Links
export const SOCIAL_LINKS = [
  { name: 'Facebook', icon: 'Facebook', url: '#' },
  { name: 'Twitter', icon: 'Twitter', url: '#' },
  { name: 'Instagram', icon: 'Instagram', url: '#' },
  { name: 'LinkedIn', icon: 'Linkedin', url: '#' }
] as const;

// Contact Information
export const CONTACT_INFO = {
  email: 'info@ray-egypt.com',
  phone: '+20 123 456 7890',
  address: 'القاهرة، مصر',
  workingHours: 'الأحد - الخميس: 9:00 ص - 6:00 م'
} as const;
