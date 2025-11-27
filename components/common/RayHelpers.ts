// 🛠️ دوال مساعدة لمنصة "راي" - دوال ستحتاجها دائماً
import { RAY_DESIGN_SYSTEM } from './DesignSystem';

// 🎨 دوال الألوان
export const rayColors = {
  // الحصول على اللون الأساسي
  primary: (shade: number = 500) => RAY_DESIGN_SYSTEM.colors.primary[shade as keyof typeof RAY_DESIGN_SYSTEM.colors.primary],
  
  // الحصول على اللون الثانوي  
  secondary: (shade: number = 500) => RAY_DESIGN_SYSTEM.colors.secondary[shade as keyof typeof RAY_DESIGN_SYSTEM.colors.secondary],
  
  // الحصول على لون محايد
  neutral: (shade: number = 500) => RAY_DESIGN_SYSTEM.colors.neutral[shade as keyof typeof RAY_DESIGN_SYSTEM.colors.neutral],
  
  // الحصول على لون الحالة
  success: (shade: number = 500) => RAY_DESIGN_SYSTEM.colors.success[shade as keyof typeof RAY_DESIGN_SYSTEM.colors.success],
  error: (shade: number = 500) => RAY_DESIGN_SYSTEM.colors.error[shade as keyof typeof RAY_DESIGN_SYSTEM.colors.error],
  warning: (shade: number = 500) => RAY_DESIGN_SYSTEM.colors.warning[shade as keyof typeof RAY_DESIGN_SYSTEM.colors.warning],
  info: (shade: number = 500) => RAY_DESIGN_SYSTEM.colors.info[shade as keyof typeof RAY_DESIGN_SYSTEM.colors.info],
  
  // تدرج لوني
  gradient: (from: string, to: string, direction: string = 'to right') => 
    `linear-gradient(${direction}, ${from}, ${to})`,
  
  // تدرج رأي الرسمي
  rayGradient: () => rayColors.gradient(rayColors.primary(500), rayColors.secondary(500))
};

// 💰 دوال الأسعار
export const rayPrices = {
  // تنسيق السعر
  format: (amount: number): string => `${amount.toLocaleString('ar-EG')} ج.م`,
  
  // تنسيق السعر مع العملة
  formatWithCurrency: (amount: number): string => `${amount.toLocaleString('ar-EG')} ج.م`,
  
  // تحويل نص إلى سعر
  parsePrice: (text: string): number => {
    const match = text.match(/[\d,]+/);
    return match ? parseInt(match[0].replace(/,/g, '')) : 0;
  },
  
  // التحقق من السعر الصحيح
  isValidPrice: (text: string): boolean => {
    return text.includes('ج.م') || text.includes('جنيه');
  },
  
  // حساب الضريبة (14% في مصر)
  calculateTax: (amount: number, taxRate: number = 0.14): number => amount * taxRate,
  
  // السعر الإجمالي مع الضريبة
  totalWithTax: (amount: number, taxRate: number = 0.14): number => amount + (amount * taxRate),
  
  // تنسيق السعر الإجمالي
  formatTotal: (amount: number, taxRate: number = 0.14): string => {
    const total = rayPrices.totalWithTax(amount, taxRate);
    return rayPrices.format(total);
  }
};

// 🏪 دوال الفئات
export const rayCategories = {
  // الحصول على جميع الفئات
  getAll: () => Object.values(RAY_DESIGN_SYSTEM.categories),
  
  // الحصول على فئة محددة
  get: (categoryId: string) => RAY_DESIGN_SYSTEM.categories[categoryId as keyof typeof RAY_DESIGN_SYSTEM.categories],
  
  // الحصول على فئة بالترتيب
  getByOrder: (order: number) => rayCategories.getAll().find(cat => cat.order === order),
  
  // الحصول على لون الفئة
  getColor: (categoryId: string): string => {
    const category = rayCategories.get(categoryId);
    return category?.color || 'gray';
  },
  
  // الحصول على أيقونة الفئة
  getIcon: (categoryId: string): string => {
    const category = rayCategories.get(categoryId);
    return category?.icon || '📦';
  },
  
  // الحصول على اسم الفئة
  getName: (categoryId: string): string => {
    const category = rayCategories.get(categoryId);
    return category?.name || 'غير معروف';
  },
  
  // البحث عن فئة
  search: (query: string) => rayCategories.getAll().filter(cat => 
    cat.name.includes(query) || cat.id.includes(query)
  )
};

// 🏢 دوال أنواع الأعمال
export const rayBusinessTypes = {
  // الحصول على جميع أنواع الأعمال
  getAll: () => Object.values(RAY_DESIGN_SYSTEM.businessTypes),
  
  // الحصول على نوع عمل محدد
  get: (typeId: string) => RAY_DESIGN_SYSTEM.businessTypes[typeId as keyof typeof RAY_DESIGN_SYSTEM.businessTypes],
  
  // الحصول على لون نوع العمل
  getColor: (typeId: string): string => {
    const type = rayBusinessTypes.get(typeId);
    return type?.color || 'blue';
  },
  
  // الحصول على أيقونة نوع العمل
  getIcon: (typeId: string): string => {
    const type = rayBusinessTypes.get(typeId);
    return type?.icon || '🏢';
  },
  
  // الحصول على اسم نوع العمل
  getName: (typeId: string, arabic: boolean = true): string => {
    const type = rayBusinessTypes.get(typeId);
    return arabic ? (type?.nameArabic || type?.name) : (type?.name || 'Unknown');
  },
  
  // الحصول على ميزات نوع العمل
  getFeatures: (typeId: string): string[] => {
    const type = rayBusinessTypes.get(typeId);
    return type?.features || [];
  },
  
  // البحث عن نوع عمل
  search: (query: string) => rayBusinessTypes.getAll().filter(type => 
    type.name.includes(query) || type.nameArabic.includes(query) || type.id.includes(query)
  )
};

// 📐 دوال المسافات
export const raySpacing = {
  // الحصول على مسافة
  get: (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'): string => {
    return RAY_DESIGN_SYSTEM.spacing[size];
  },
  
  // مسافة صغيرة جداً
  xs: () => raySpacing.get('xs'),
  
  // مسافة صغيرة
  sm: () => raySpacing.get('sm'),
  
  // مسافة متوسطة
  md: () => raySpacing.get('md'),
  
  // مسافة كبيرة
  lg: () => raySpacing.get('lg'),
  
  // مسافة كبيرة جداً
  xl: () => raySpacing.get('xl'),
  
  // مسافة عملاقة
  '2xl': () => raySpacing.get('2xl'),
  '3xl': () => raySpacing.get('3xl'),
  '4xl': () => raySpacing.get('4xl'),
  '5xl': () => raySpacing.get('5xl')
};

// 🔘 دوال الزوايا
export const rayBorderRadius = {
  // الحصول على زاوية
  get: (size: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'): string => {
    return RAY_DESIGN_SYSTEM.borderRadius[size];
  },
  
  // بدون زوايا
  none: () => rayBorderRadius.get('none'),
  
  // زوايا صغيرة
  sm: () => rayBorderRadius.get('sm'),
  
  // زوايا أساسية
  base: () => rayBorderRadius.get('base'),
  
  // زوايا متوسطة
  md: () => rayBorderRadius.get('md'),
  
  // زوايا كبيرة
  lg: () => rayBorderRadius.get('lg'),
  
  // زوايا كبيرة جداً
  xl: () => rayBorderRadius.get('xl'),
  
  // زوايا عملاقة
  '2xl': () => rayBorderRadius.get('2xl'),
  
  // زوايا دائرية
  '3xl': () => rayBorderRadius.get('3xl'),
  full: () => rayBorderRadius.get('full')
};

// 🌟 دوال الظلال
export const rayShadows = {
  // الحصول على ظل
  get: (size: 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | 'ray'): string => {
    return RAY_DESIGN_SYSTEM.shadows[size];
  },
  
  // ظل صغير
  sm: () => rayShadows.get('sm'),
  
  // ظل أساسي
  base: () => rayShadows.get('base'),
  
  // ظل متوسط
  md: () => rayShadows.get('md'),
  
  // ظل كبير
  lg: () => rayShadows.get('lg'),
  
  // ظل كبير جداً
  xl: () => rayShadows.get('xl'),
  
  // ظل عملاق
  '2xl': () => rayShadows.get('2xl'),
  
  // ظل رأي الخاص
  ray: () => rayShadows.get('ray')
};

// 📱 دوال نقاط التوقف
export const rayBreakpoints = {
  // الحصول على نقطة توقف
  get: (size: 'sm' | 'md' | 'lg' | 'xl' | '2xl'): string => {
    return RAY_DESIGN_SYSTEM.breakpoints[size];
  },
  
  // شاشات صغيرة
  sm: () => rayBreakpoints.get('sm'),
  
  // شاشات متوسطة
  md: () => rayBreakpoints.get('md'),
  
  // شاشات كبيرة
  lg: () => rayBreakpoints.get('lg'),
  
  // شاشات كبيرة جداً
  xl: () => rayBreakpoints.get('xl'),
  
  // شاشات عملاقة
  '2xl': () => rayBreakpoints.get('2xl'),
  
  // التحقق من حجم الشاشة
  isMobile: () => window.innerWidth < 768,
  isTablet: () => window.innerWidth >= 768 && window.innerWidth < 1024,
  isDesktop: () => window.innerWidth >= 1024
};

// 🎯 دوال الطباعة
export const rayTypography = {
  // الحصول على حجم خط
  fontSize: (size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl') => {
    return RAY_DESIGN_SYSTEM.typography.fontSize[size];
  },
  
  // الحصول على وزن خط
  fontWeight: (weight: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black') => {
    return RAY_DESIGN_SYSTEM.typography.fontWeight[weight];
  },
  
  // الحصول على خط عربي
  arabicFont: () => RAY_DESIGN_SYSTEM.typography.fontFamily.arabic.join(', '),
  
  // الحصول على خط إنجليزي
  englishFont: () => RAY_DESIGN_SYSTEM.typography.fontFamily.english.join(', ')
};

// 🔧 دوال عامة
export const rayGeneralUtils = {
  // إنشاء ID فريد
  generateId: (prefix: string = 'ray'): string => {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },
  
  // تأخير التنفيذ
  delay: (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms)),
  
  // نسخ نص
  copyToClipboard: async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  },
  
  // تنزيل ملف
  downloadFile: (data: string, filename: string, type: string = 'text/plain'): void => {
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },
  
  // التحقق من البريد الإلكتروني
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  // التحقق من رقم الهاتف المصري
  isValidEgyptianPhone: (phone: string): boolean => {
    const phoneRegex = /^01[0-2,5]\d{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },
  
  // تنسيق التاريخ بالعربية
  formatDateArabic: (date: Date): string => {
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },
  
  // تنسيق الوقت بالعربية
  formatTimeArabic: (date: Date): string => {
    return date.toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};

// 📊 دوال الإحصائيات
export const rayStats = {
  // حساب النسبة المئوية
  percentage: (value: number, total: number): number => {
    return total === 0 ? 0 : (value / total) * 100;
  },
  
  // حساب المتوسط
  average: (numbers: number[]): number => {
    return numbers.length === 0 ? 0 : numbers.reduce((a, b) => a + b, 0) / numbers.length;
  },
  
  // حساب المجموع
  sum: (numbers: number[]): number => {
    return numbers.reduce((a, b) => a + b, 0);
  },
  
  // إيجاد القيمة القصوى
  max: (numbers: number[]): number => {
    return Math.max(...numbers);
  },
  
  // إيجاد القيمة الدنيا
  min: (numbers: number[]): number => {
    return Math.min(...numbers);
  },
  
  // تنسيق الأرقام الكبيرة
  formatLargeNumber: (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }
};

export default {
  rayColors,
  rayPrices,
  rayCategories,
  rayBusinessTypes,
  raySpacing,
  rayBorderRadius,
  rayShadows,
  rayBreakpoints,
  rayTypography,
  rayGeneralUtils,
  rayStats
};
