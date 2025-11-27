import React, { createContext, useContext, useState, useEffect } from 'react';
import { RAY_DESIGN_SYSTEM } from './DesignSystem';

interface GlobalSettings {
  currentLanguage: 'ar' | 'en';
  isDarkMode: boolean;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  isMobileMenuOpen: boolean;
  toggleLanguage: () => void;
  toggleDarkMode: () => void;
  toggleMobileMenu: () => void;
  setDeviceType: (type: 'mobile' | 'tablet' | 'desktop') => void;
}

const GlobalSettingsContext = createContext<GlobalSettings | undefined>(undefined);

export const useGlobalSettings = () => {
  const context = useContext(GlobalSettingsContext);
  if (!context) {
    throw new Error('useGlobalSettings must be used within a GlobalSettingsProvider');
  }
  return context;
};

// Safe version that doesn't throw errors
export const useGlobalSettingsSafe = () => {
  const context = useContext(GlobalSettingsContext);
  if (!context) {
    // Return default values instead of throwing error
    return {
      currentLanguage: 'ar' as const,
      isDarkMode: false,
      deviceType: 'desktop' as const,
      isMobileMenuOpen: false,
      toggleLanguage: () => {},
      toggleDarkMode: () => {},
      toggleMobileMenu: () => {},
      setDeviceType: () => {}
    };
  }
  return context;
};

export const GlobalSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<'ar' | 'en'>('ar');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // تحديد نوع الجهاز
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // تطبيق الوضع الليلي
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // تطبيق اتجاه النص حسب اللغة
  useEffect(() => {
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'ar' ? 'en' : 'ar');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const value: GlobalSettings = {
    currentLanguage,
    isDarkMode,
    deviceType,
    isMobileMenuOpen,
    toggleLanguage,
    toggleDarkMode,
    toggleMobileMenu,
    setDeviceType
  };

  return (
    <GlobalSettingsContext.Provider value={value}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};

// الترجمات الموحدة
export const translations = {
  ar: {
    // عام
    loading: 'جاري التحميل...',
    search: 'بحث...',
    filter: 'فلترة',
    add: 'إضافة',
    edit: 'تعديل',
    delete: 'حذف',
    view: 'عرض',
    save: 'حفظ',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    back: 'رجوع',
    next: 'التالي',
    previous: 'السابق',
    close: 'إغلاق',
    actions: 'الإجراءات',
    status: 'الحالة',
    date: 'التاريخ',
    time: 'الوقت',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    address: 'العنوان',
    city: 'المدينة',
    country: 'الدولة',
    
    // لوحة التحكم
    title: 'لوحة التحكم الإدارية',
    subtitle: 'إدارة شاملة للمنصة والعمليات',
    adminControl: 'مركز التحكم الإداري',
    platformManagement: 'إدارة المنصة والعمليات',
    logout: 'خروج',
    dashboard: 'لوحة التحكم',
    businesses: 'المحلات والأنشطة',
    customers: 'العملاء الموحد',
    orders: 'الطلبات المجمعة',
    approvals: 'الموافقات والطلبات',
    users: 'المستخدمين والصلاحيات',
    roles: 'الأدوار والمجموعات',
    reports: 'التقارير المجمعة',
    analytics: 'التحليلات والإحصائيات',
    performance: 'الأداء والمؤشرات',
    shipping: 'إدارة الشحنات',
    delivery: 'التوصيل والتوزيع',
    warehouses: 'المخازن والمستودعات',
    settings: 'إعدادات النظام',
    alerts: 'التنبيهات والإنذارات',
    audit: 'سجل النشاطات',
    systemNormal: 'النظام يعمل بشكل طبيعي',
    changeLanguage: 'تغيير اللغة',
    
    // الحالات
    active: 'نشط',
    inactive: 'غير نشط',
    pending: 'في الانتظار',
    suspended: 'موقوف',
    completed: 'مكتمل',
    cancelled: 'ملغي',
    refunded: 'مسترد',
    
    // أنواع الأعمال
    restaurant: 'مطعم',
    retail: 'متجر',
    clinic: 'عيادة',
    gym: 'نادي رياضي',
    services: 'خدمات',
    laundry: 'غسيل',
    clothing: 'ملابس',
    salon: 'صالون',
    pharmacy: 'صيدلية',
    contracting: 'مقاولات',
    plumbing: 'سباكة',
    painting: 'دهانات',
    hardware: 'أدوات',
    electrical: 'كهرباء',
    
    // مستويات العضوية
    bronze: 'برونزي',
    silver: 'فضي',
    gold: 'ذهبي',
    platinum: 'بلاتيني',
    diamond: 'ماسي',
    
    // الاشتراكات
    basic: 'أساسي',
    premium: 'مميز',
    enterprise: 'مؤسسي',
    
    // الجنس
    male: 'ذكر',
    female: 'أنثى',
    other: 'آخر',
    
    // طرق الدفع
    cash: 'نقدي',
    card: 'بطاقة',
    digital: 'رقمي',
    
    // الجهاز
    mobile: 'موبايل',
    tablet: 'تابلت',
    desktop: 'كمبيوتر',
    
    // الوضع الليلي
    light: 'نهاري',
    dark: 'ليلي',
    
    // رسائل
    noDataFound: 'لا توجد بيانات',
    book: 'احجز',
    bookNow: 'احجز الآن',
    bookingSuccess: 'تم حجزك بنجاح',
    bookingError: 'فشل الحجز. حاول مرة أخرى',
    bookingDate: 'تاريخ الحجز',
    selectDate: 'اختر التاريخ',
    guests: 'عدد الأشخاص',
    confirmDelete: 'هل أنت متأكد من الحذف؟',
    deleteSuccess: 'تم الحذف بنجاح',
    saveSuccess: 'تم الحفظ بنجاح',
    error: 'حدث خطأ',
    success: 'نجح',
    warning: 'تحذير',
    info: 'معلومات'
  },
  en: {
    // عام
    loading: 'Loading...',
    search: 'Search...',
    filter: 'Filter',
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
    actions: 'Actions',
    status: 'Status',
    date: 'Date',
    time: 'Time',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    city: 'City',
    country: 'Country',
    
    // لوحة التحكم
    title: 'Admin Dashboard',
    subtitle: 'Comprehensive Platform & Operations Management',
    adminControl: 'Admin Control Center',
    platformManagement: 'Platform & Operations Management',
    logout: 'Logout',
    dashboard: 'Dashboard',
    businesses: 'Businesses',
    customers: 'Customers',
    orders: 'Orders',
    approvals: 'Approvals',
    users: 'Users & Permissions',
    roles: 'Roles & Groups',
    reports: 'Reports',
    analytics: 'Analytics',
    performance: 'Performance',
    shipping: 'Shipping',
    delivery: 'Delivery',
    warehouses: 'Warehouses',
    settings: 'System Settings',
    alerts: 'Alerts',
    audit: 'Activity Log',
    systemNormal: 'System Normal',
    changeLanguage: 'Change Language',
    
    // الحالات
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    suspended: 'Suspended',
    completed: 'Completed',
    cancelled: 'Cancelled',
    refunded: 'Refunded',
    
    // أنواع الأعمال
    restaurant: 'Restaurant',
    retail: 'Retail',
    clinic: 'Clinic',
    gym: 'Gym',
    services: 'Services',
    laundry: 'Laundry',
    clothing: 'Clothing',
    salon: 'Salon',
    pharmacy: 'Pharmacy',
    contracting: 'Contracting',
    plumbing: 'Plumbing',
    painting: 'Painting',
    hardware: 'Hardware',
    electrical: 'Electrical',
    
    // مستويات العضوية
    bronze: 'Bronze',
    silver: 'Silver',
    gold: 'Gold',
    platinum: 'Platinum',
    diamond: 'Diamond',
    
    // الاشتراكات
    basic: 'Basic',
    premium: 'Premium',
    enterprise: 'Enterprise',
    
    // الجنس
    male: 'Male',
    female: 'Female',
    other: 'Other',
    
    // طرق الدفع
    cash: 'Cash',
    card: 'Card',
    digital: 'Digital',
    
    // الجهاز
    mobile: 'Mobile',
    tablet: 'Tablet',
    desktop: 'Desktop',
    
    // الوضع الليلي
    light: 'Light',
    dark: 'Dark',
    
    // رسائل
    noDataFound: 'No data found',
    book: 'Book',
    bookNow: 'Book Now',
    bookingSuccess: 'Booking successful',
    bookingError: 'Booking failed. Try again',
    bookingDate: 'Booking date',
    selectDate: 'Select date',
    guests: 'Guests',
    confirmDelete: 'Are you sure you want to delete?',
    deleteSuccess: 'Deleted successfully',
    saveSuccess: 'Saved successfully',
    error: 'An error occurred',
    success: 'Success',
    warning: 'Warning',
    info: 'Information'
  }
};

// دالة للحصول على الترجمة
export const useTranslation = () => {
  try {
    const { currentLanguage } = useGlobalSettingsSafe();
    return translations[currentLanguage];
  } catch (error) {
    // Fallback to Arabic if GlobalSettingsProvider is not available
    return translations.ar;
  }
};

// دالة للتحقق من نوع الجهاز
export const useResponsive = () => {
  try {
    const { deviceType } = useGlobalSettingsSafe();
    
    return {
      isMobile: deviceType === 'mobile',
      isTablet: deviceType === 'tablet',
      isDesktop: deviceType === 'desktop',
      deviceType
    };
  } catch (error) {
    // Fallback to desktop if GlobalSettingsProvider is not available
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      deviceType: 'desktop'
    };
  }
};

// دالة للتصميم المتجاوب
export const useResponsiveClasses = () => {
  try {
    const { deviceType } = useGlobalSettingsSafe();
    
    return {
      container: deviceType === 'mobile' ? 'px-4' : deviceType === 'tablet' ? 'px-6' : 'px-8',
      grid: deviceType === 'mobile' ? 'grid-cols-1' : deviceType === 'tablet' ? 'grid-cols-2' : 'grid-cols-3',
      text: deviceType === 'mobile' ? 'text-sm' : deviceType === 'tablet' ? 'text-base' : 'text-lg',
      button: deviceType === 'mobile' ? 'px-3 py-2 text-sm' : deviceType === 'tablet' ? 'px-4 py-3 text-base' : 'px-6 py-4 text-lg',
      card: deviceType === 'mobile' ? 'p-3' : deviceType === 'tablet' ? 'p-4' : 'p-6'
    };
  } catch (error) {
    // Fallback to desktop classes if GlobalSettingsProvider is not available
    return {
      container: 'px-8',
      grid: 'grid-cols-3',
      text: 'text-lg',
      button: 'px-6 py-4 text-lg',
      card: 'p-6'
    };
  }
};

// دالة للألوان الديناميكية
export const useThemeColors = () => {
  try {
    const { isDarkMode } = useGlobalSettingsSafe();
    
    return {
      background: isDarkMode ? 'bg-gray-900' : 'bg-white',
      surface: isDarkMode ? 'bg-gray-800' : 'bg-gray-50',
      text: isDarkMode ? 'text-white' : 'text-gray-900',
      textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
      border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
      hover: isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
      primary: 'bg-red-600 hover:bg-red-700',
      success: 'bg-green-600 hover:bg-green-700',
      warning: 'bg-yellow-600 hover:bg-yellow-700',
      error: 'bg-red-600 hover:bg-red-700'
    };
  } catch (error) {
    // Fallback to light mode if GlobalSettingsProvider is not available
    return {
      background: 'bg-white',
      surface: 'bg-gray-50',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200',
      hover: 'hover:bg-gray-100',
      primary: 'bg-red-600 hover:bg-red-700',
      success: 'bg-green-600 hover:bg-green-700',
      warning: 'bg-yellow-600 hover:bg-yellow-700',
      error: 'bg-red-600 hover:bg-red-700'
    };
  }
};
