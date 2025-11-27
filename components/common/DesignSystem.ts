// 🎯 نظام التصميم الموحد لتطبيق راي (Ray)
interface RayDesignSystem {
  // 1. لوحة الألوان الأساسية - ثابتة لكل المنصة
  colors: {
    // اللون الأساسي - أزرق رأي
    primary: {
      50: string;
      100: string; 
      200: string;
      300: string;
      400: string;
      500: string; // اللون الرئيسي
      600: string;
      700: string;
      800: string;
      900: string;
    };
    
    // اللون الثانوي - ذهبي رأي
    secondary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string; // اللون الذهبي الرئيسي
      600: string;
      700: string;
      800: string;
      900: string;
    };
    
    // الألوان المحايدة
    neutral: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    
    // ألوان الحالات
    success: {
      50: string;
      500: string;
      600: string;
    };
    error: {
      50: string;
      500: string;
      600: string;
    };
    warning: {
      50: string;
      500: string;
      600: string;
    };
    info: {
      50: string;
      500: string;
      600: string;
    }
  };

  // 💰 العملة - الجنيه المصري فقط
  currency: {
    code: string;
    symbol: string;
    symbolArabic: string;
    locale: string;
    format: (amount: number) => string;
  };

  // 🎯 الفئات الأساسية - ثابتة
  categories: {
    food: {
      id: string;
      name: string;
      icon: string;
      color: string;
      order: number;
    };
    shopping: {
      id: string; 
      name: string;
      icon: string;
      color: string;
      order: number;
    };
    services: {
      id: string;
      name: string;
      icon: string;
      color: string;
      order: number;
    };
    health: {
      id: string;
      name: string;
      icon: string;
      color: string;
      order: number;
    };
    beauty: {
      id: string;
      name: string;
      icon: string;
      color: string;
      order: number;
    };
    education: {
      id: string;
      name: string;
      icon: string;
      color: string;
      order: number;
    };
    entertainment: {
      id: string;
      name: string;
      icon: string;
      color: string;
      order: number;
    };
    realestate: {
      id: string;
      name: string;
      icon: string;
      color: string;
      order: number;
    };
    cars: {
      id: string;
      name: string;
      icon: string;
      color: string;
      order: number;
    }
  };

  // 🏪 أنواع الأعمال - ثابتة
  businessTypes: {
    restaurant: {
      id: string;
      name: string;
      nameArabic: string;
      icon: string;
      color: string;
      features: string[];
    };
    retail: {
      id: string;
      name: string;
      nameArabic: string;
      icon: string;
      color: string;
      features: string[];
    };
    pharmacy: {
      id: string;
      name: string;
      nameArabic: string;
      icon: string;
      color: string;
      features: string[];
    };
    clinic: {
      id: string;
      name: string;
      nameArabic: string;
      icon: string;
      color: string;
      features: string[];
    };
    gym: {
      id: string;
      name: string;
      nameArabic: string;
      icon: string;
      color: string;
      features: string[];
    };
    salon: {
      id: string;
      name: string;
      nameArabic: string;
      icon: string;
      color: string;
      features: string[];
    };
    realestate: {
      id: string;
      name: string;
      nameArabic: string;
      icon: string;
      color: string;
      features: string[];
    };
    cars: {
      id: string;
      name: string;
      nameArabic: string;
      icon: string;
      color: string;
      features: string[];
    };
    services: {
      id: string;
      name: string;
      nameArabic: string;
      icon: string;
      color: string;
      features: string[];
    };
    laundry: {
      id: string;
      name: string;
      nameArabic: string;
      icon: string;
      color: string;
      features: string[];
    };
    clothing: {
      id: string;
      name: string;
      nameArabic: string;
      icon: string;
      color: string;
      features: string[];
    };
    contracting: {
      id: string;
      name: string;
      nameArabic: string;
      icon: string;
      color: string;
      features: string[];
    };
    plumbing: {
      id: string;
      name: string;
      nameArabic: string;
      icon: string;
      color: string;
      features: string[];
    };
    painting: {
      id: string;
      name: string;
      nameArabic: string;
      icon: string;
      color: string;
      features: string[];
    };
    hardware: {
      id: string;
      name: string;
      nameArabic: string;
      icon: string;
      color: string;
      features: string[];
    };
    electrical: {
      id: string;
      name: string;
      nameArabic: string;
      icon: string;
      color: string;
      features: string[];
    };
  };

  // 🎨 أيقونات النظام - ثابتة
  icons: {
    primary: string;
    secondary: string;
    successIcon: string;
    errorIcon: string;
    warningIcon: string;
    infoIcon: string;
    user: string;
    business: string;
    order: string;
    delivery: string;
    payment: string;
    map: string;
    phone: string;
    email: string;
    website: string;
    social: string;
    star: string;
    heart: string;
    cart: string;
    search: string;
    filter: string;
    edit: string;
    deleteIcon: string;
    add: string;
    menu: string;
    close: string;
    arrow: string;
    check: string;
    x: string;
    plus: string;
    minus: string;
    settings: string;
    logout: string;
    login: string;
    dashboard: string;
    analytics: string;
    reports: string;
    notifications: string;
    calendar: string;
    clock: string;
    location: string;
    camera: string;
    image: string;
    document: string;
    download: string;
    upload: string;
    share: string;
    copy: string;
    print: string;
    refresh: string;
    sync: string;
    backup: string;
    security: string;
    lock: string;
    unlock: string;
    key: string;
    shield: string;
    eye: string;
    eyeOff: string;
    help: string;
    support: string;
    contact: string;
    about: string;
    terms: string;
    privacy: string;
    faq: string;
    tutorial: string;
    guide: string;
    tips: string;
    news: string;
    updates: string;
    maintenance: string;
    status: string;
    online: string;
    offline: string;
    busy: string;
    away: string;
    available: string;
    unavailable: string;
    active: string;
    inactive: string;
    pending: string;
    completed: string;
    cancelled: string;
    refunded: string;
    paid: string;
    unpaid: string;
    overdue: string;
    scheduled: string;
    ongoing: string;
    paused: string;
    stopped: string;
    started: string;
    finished: string;
    failed: string;
    successStatus: string;
    warningStatus: string;
    errorStatus: string;
    infoStatus: string;
    loading: string;
    processing: string;
    uploading: string;
    downloading: string;
    syncing: string;
    connecting: string;
    connected: string;
    disconnected: string;
    reconnecting: string;
    timeout: string;
    retry: string;
    skip: string;
    next: string;
    previous: string;
    first: string;
    last: string;
    home: string;
    back: string;
    forward: string;
    up: string;
    down: string;
    left: string;
    right: string;
    expand: string;
    collapse: string;
    maximize: string;
    minimize: string;
    fullscreen: string;
    exitFullscreen: string;
    zoomIn: string;
    zoomOut: string;
    reset: string;
    clear: string;
    save: string;
    submit: string;
    cancel: string;
    confirm: string;
    approve: string;
    reject: string;
    accept: string;
    decline: string;
    agree: string;
    disagree: string;
    like: string;
    dislike: string;
    favorite: string;
    unfavorite: string;
    bookmark: string;
    unbookmark: string;
    tag: string;
    untag: string;
    follow: string;
    unfollow: string;
    subscribe: string;
    unsubscribe: string;
    join: string;
    leave: string;
    invite: string;
    remove: string;
    block: string;
    unblock: string;
    report: string;
    flag: string;
    unflag: string;
    archive: string;
    unarchive: string;
    removeAction: string;
    restore: string;
    trash: string;
    recycle: string;
    empty: string;
    full: string;
    half: string;
    quarter: string;
    threeQuarters: string;
    oneThird: string;
    twoThirds: string;
    oneFifth: string;
    twoFifths: string;
    threeFifths: string;
    fourFifths: string;
    oneSixth: string;
    fiveSixths: string;
    oneEighth: string;
    threeEighths: string;
    fiveEighths: string;
    sevenEighths: string;
    oneTenth: string;
    threeTenths: string;
    sevenTenths: string;
    nineTenths: string;
    zero: string;
    one: string;
    two: string;
    three: string;
    four: string;
    five: string;
    six: string;
    seven: string;
    eight: string;
    nine: string;
    ten: string;
    eleven: string;
    twelve: string;
    thirteen: string;
    fourteen: string;
    fifteen: string;
    sixteen: string;
    seventeen: string;
    eighteen: string;
    nineteen: string;
    twenty: string;
    thirty: string;
    forty: string;
    fifty: string;
    sixty: string;
    seventy: string;
    eighty: string;
    ninety: string;
    hundred: string;
    thousand: string;
    million: string;
    billion: string;
    trillion: string;
    infinity: string;
    piSymbol: string;
    alpha: string;
    beta: string;
    gamma: string;
    delta: string;
    epsilon: string;
    zeta: string;
    eta: string;
    theta: string;
    iota: string;
    kappa: string;
    lambda: string;
    mu: string;
    nu: string;
    xi: string;
    omicron: string;
    piLetter: string;
    rho: string;
    sigma: string;
    tau: string;
    upsilon: string;
    phi: string;
    chi: string;
    psi: string;
    omega: string;
  };

  // 📏 المسافات الموحدة - ثابتة
  spacing: {
    xs: string;    // 0.25rem = 4px
    sm: string;    // 0.5rem = 8px
    md: string;    // 1rem = 16px
    lg: string;    // 1.5rem = 24px
    xl: string;    // 2rem = 32px
    '2xl': string; // 3rem = 48px
    '3xl': string; // 4rem = 64px
    '4xl': string; // 6rem = 96px
    '5xl': string; // 8rem = 128px
  };

  // 🔄 زوايا الحواف - ثابتة
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    full: string;
  };

  // 🌑 الظلال الموحدة - ثابتة
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    inner: string;
    none: string;
    ray: string;
  };

  // 🎯 الإعدادات الموحدة - ثابتة
  USE_PRIMARY_COLOR_ONLY: boolean;
  USE_SECONDARY_COLOR_ONLY: boolean;
  USE_NEUTRAL_COLORS_ONLY: boolean;
  USE_STATUS_COLORS_ONLY: boolean;
  USE_STANDARD_SPACING_ONLY: boolean;
  USE_STANDARD_BORDER_RADIUS_ONLY: boolean;
  USE_STANDARD_SHADOWS_ONLY: boolean;

  // 📱 إعدادات إضافية
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  
  typography: {
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
    };
    fontWeight: {
      light: string;
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
      extrabold: string;
    };
    fontFamily: {
      arabic: string[];
      english: string[];
    };
  };

  // 📱 إعدادات التصميم المتجاوب
  RESPONSIVE: {
    // نقاط التوقف القياسية
    breakpoints: {
      sm: string;    // mobile
      md: string;    // tablet
      lg: string;    // laptop
      xl: string;    // desktop
      '2xl': string; // large desktop
    };
    
    // الحاويات المتجاوبة
    containers: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
    
    // المسافات المتجاوبة
    spacing: {
      responsive: boolean;
      mobile: {
        xs: string;
        sm: string; 
        md: string;
        lg: string;
        xl: string;
      };
      tablet: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
      desktop: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
    };
  };

  // 🌍 إعدادات اللغات والتدويل
  LOCALIZATION: {
    // اللغات المدعومة
    supportedLanguages: string[];
    
    // اللغة الافتراضية
    defaultLanguage: string;
    
    // اتجاه النص حسب اللغة
    textDirection: {
      ar: string;
      en: string;
    };
    
    // الخطوط حسب اللغة
    fonts: {
      ar: {
        primary: string;
        secondary: string;
        monospace: string;
      };
      en: {
        primary: string;
        secondary: string; 
        monospace: string;
      };
    };
    
    // محاذاة النص حسب اللغة
    textAlign: {
      ar: string;
      en: string;
    };
    
    // Flexbox اتجاه حسب اللغة
    flexDirection: {
      ar: string;
      en: string;
    };
  };

  // 🌙 إعدادات الوضع الليلي
  DARK_MODE: {
    // تفعيل الوضع الليلي
    enabled: boolean;
    
    // الوضع الافتراضي
    defaultMode: string;
    
    // ألوان الوضع الليلي
    colors: {
      background: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
      surface: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
      text: {
        primary: string;
        secondary: string;
        tertiary: string;
        inverse: string;
      };
      border: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
      shadow: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
    };
    
    // ظلال الوضع الليلي
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      inner: string;
    };
  };

  // 🎯 إعدادات المكونات المتجاوبة
  COMPONENTS: {
    // الأزرار المتجاوبة
    button: {
      sizes: {
        mobile: {
          sm: string;
          md: string;
          lg: string;
        };
        tablet: {
          sm: string;
          md: string;
          lg: string;
        };
        desktop: {
          sm: string;
          md: string;
          lg: string;
        };
      };
      padding: {
        mobile: {
          sm: string;
          md: string;
          lg: string;
        };
        tablet: {
          sm: string;
          md: string;
          lg: string;
        };
        desktop: {
          sm: string;
          md: string;
          lg: string;
        };
      };
      borderRadius: {
        mobile: string;
        tablet: string;
        desktop: string;
      };
    };
    
    // البطاقات المتجاوبة
    card: {
      padding: {
        mobile: {
          sm: string;
          md: string;
          lg: string;
        };
        tablet: {
          sm: string;
          md: string;
          lg: string;
        };
        desktop: {
          sm: string;
          md: string;
          lg: string;
        };
      };
      margin: {
        mobile: {
          sm: string;
          md: string;
          lg: string;
        };
        tablet: {
          sm: string;
          md: string;
          lg: string;
        };
        desktop: {
          sm: string;
          md: string;
          lg: string;
        };
      };
      borderRadius: {
        mobile: string;
        tablet: string;
        desktop: string;
      };
    };
    
    // النماذج المتجاوبة
    form: {
      input: {
        height: {
          mobile: string;
          tablet: string;
          desktop: string;
        };
        padding: {
          mobile: string;
          tablet: string;
          desktop: string;
        };
        fontSize: {
          mobile: string;
          tablet: string;
          desktop: string;
        };
      };
      label: {
        fontSize: {
          mobile: string;
          tablet: string;
          desktop: string;
        };
        marginBottom: {
          mobile: string;
          tablet: string;
          desktop: string;
        };
      };
    };
  };

  // 📱 إعدادات الموبايل الخاصة
  MOBILE: {
    // تحسين اللمس
    touchOptimization: {
      minTouchTarget: string;    // 44px
      recommendedTouchTarget: string; // 48px
      spacing: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
    };
    
    // الشريط الجانبي للموبايل
    sidebar: {
      width: string;             // 100%
      overlay: boolean;
      animation: string;
      position: string;
      zIndex: number;
    };
    
    // التنقل السفلي للموبايل
    bottomNavigation: {
      height: string;
      position: string;
      zIndex: number;
      backdrop: boolean;
    };
    
    // القائمة المنسدلة للموبايل
    collapsibleMenu: {
      animation: string;
      duration: string;
      easing: string;
    };
    
    // تصميم متجاوب للتنقل
    navigation: {
      mobile: {
        layout: string;          // bottom navigation
        hamburger: boolean;
        overlay: boolean;
      };
      tablet: {
        layout: string;          // sidebar
        collapsible: boolean;
      };
      desktop: {
        layout: string;          // horizontal
        sidebar: boolean;
      };
    };
  };
}

// 🛠️ أدوات مساعدة لنظام التصميم
export const rayUtils = {
  // الحصول على الألوان
  getColor: (colorPath: string) => {
    const paths = colorPath.split('.');
    let result: any = RAY_DESIGN_SYSTEM.colors;
    for (const path of paths) {
      result = result[path];
    }
    return result;
  },
  
  // الحصول على نقاط التوقف
  breakpoints: {
    sm: '640px',
    md: '768px', 
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  
  // الحصول على الأحجام
  typography: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    },
    fontFamily: {
      arabic: ['Cairo', 'Tahoma', 'Arial', 'sans-serif'],
      english: ['Inter', 'system-ui', 'sans-serif']
    }
  },
  
  // تنسيق الأسعار
  formatPrice: (price: number) => {
    return `${price.toLocaleString('ar-EG')} ج.م`;
  }
};

// 📋 قواعد التصميم
export const RAY_DESIGN_RULES = {
  // قواعد الألوان
  colors: {
    primaryOnly: false,
    secondaryOnly: false,
    neutralOnly: false,
    statusColorsOnly: false
  },
  
  // قواعد المسافات
  spacing: {
    standardOnly: true
  },
  
  // قواعد الحواف
  borderRadius: {
    standardOnly: true
  },
  
  // قواعد الظلال
  shadows: {
    standardOnly: true
  }
};

// 🎯 نظام التصميم الموحد لتطبيق راي (Ray)
export const RAY_DESIGN_SYSTEM: RayDesignSystem = {
  // 1. لوحة الألوان الأساسية - ثابتة لكل المنصة
  colors: {
    // اللون الأساسي - أزرق رأي
    primary: {
      50: '#eff6ff',
      100: '#dbeafe', 
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // اللون الرئيسي
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    
    // اللون الثانوي - ذهبي رأي
    secondary: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b', // اللون الذهبي الرئيسي
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    
    // الألوان المحايدة
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    
    // ألوان الحالات
    success: {
      50: '#f0fdf4',
      500: '#22c55e',
      600: '#16a34a',
    },
    error: {
      50: '#fef2f2',
      500: '#ef4444',
      600: '#dc2626',
    },
    warning: {
      50: '#fffbeb',
      500: '#f59e0b',
      600: '#d97706',
    },
    info: {
      50: '#eff6ff',
      500: '#3b82f6',
      600: '#2563eb',
    }
  },

  // 💰 العملة - الجنيه المصري فقط
  currency: {
    code: 'EGP',
    symbol: 'ج.م',
    symbolArabic: 'جنيه',
    locale: 'ar-EG',
    format: (amount: number) => `${amount.toLocaleString('ar-EG')} ج.م`
  },

  // 🎯 الفئات الأساسية - ثابتة
  categories: {
    food: {
      id: 'food',
      name: 'مطاعم وكافيهات',
      icon: '🍽️',
      color: 'orange',
      order: 1
    },
    shopping: {
      id: 'shopping', 
      name: 'تسوق ومولات',
      icon: '🛍️',
      color: 'pink',
      order: 2
    },
    services: {
      id: 'services',
      name: 'خدمات عامة',
      icon: '🔧',
      color: 'blue',
      order: 3
    },
    health: {
      id: 'health',
      name: 'صحة وعيادات',
      icon: '🏥',
      color: 'red',
      order: 4
    },
    beauty: {
      id: 'beauty',
      name: 'جمال وتجميل',
      icon: '💄',
      color: 'purple',
      order: 5
    },
    education: {
      id: 'education',
      name: 'تعليم وتدريب',
      icon: '📚',
      color: 'indigo',
      order: 6
    },
    entertainment: {
      id: 'entertainment',
      name: 'ترفيه وأنشطة',
      icon: '🎮',
      color: 'yellow',
      order: 7
    },
    realestate: {
      id: 'realestate',
      name: 'عقارات',
      icon: '🏠',
      color: 'green',
      order: 8
    },
    cars: {
      id: 'cars',
      name: 'سيارات',
      icon: '🚗',
      color: 'gray',
      order: 9
    }
  },

  // 🏪 أنواع الأعمال - ثابتة
  businessTypes: {
    restaurant: {
      id: 'restaurant',
      name: 'مطعم',
      nameArabic: 'مطعم',
      icon: '🍽️',
      color: 'orange',
      features: ['قائمة طعام', 'حجز طاولات', 'توصيل', 'دفع أونلاين']
    },
    retail: {
      id: 'retail',
      name: 'متجر',
      nameArabic: 'متجر تجزئة',
      icon: '🛍️',
      color: 'blue',
      features: ['منتجات', 'عروض', 'توصيل', 'نقاط بيع']
    },
    pharmacy: {
      id: 'pharmacy',
      name: 'صيدلية',
      nameArabic: 'صيدلية',
      icon: '💊',
      color: 'red',
      features: ['أدوية', 'وصفات طبية', 'استشارة', 'توصيل']
    },
    clinic: {
      id: 'clinic',
      name: 'عيادة',
      nameArabic: 'عيادة طبية',
      icon: '🏥',
      color: 'green',
      features: ['حجز مواعيد', 'سجلات طبية', 'استشارات', 'فواتير']
    },
    gym: {
      id: 'gym',
      name: 'نادي رياضي',
      nameArabic: 'نادي رياضي',
      icon: '💪',
      color: 'purple',
      features: ['اشتراكات', 'جداول تدريب', 'مدربين', 'متابعة']
    },
    salon: {
      id: 'salon',
      name: 'صالون',
      nameArabic: 'صالون تجميل',
      icon: '💇',
      color: 'pink',
      features: ['حجز مواعيد', 'خدمات', 'عروض', 'بطاقات ولاء']
    },
    realestate: {
      id: 'realestate',
      name: 'عقارات',
      nameArabic: 'شركة عقارية',
      icon: '🏠',
      color: 'teal',
      features: ['وحدات', 'إعلانات', 'مواعيد عرض', 'عقود']
    },
    cars: {
      id: 'cars',
      name: 'سيارات',
      nameArabic: 'معرض سيارات',
      icon: '🚗',
      color: 'gray',
      features: ['سيارات', 'خدمات', 'حجز اختبار', 'تمويل']
    },
    services: {
      id: 'services',
      name: 'خدمات',
      nameArabic: 'خدمات عامة',
      icon: '🔧',
      color: 'blue',
      features: ['استشارات', 'حجز مواعيد', 'توصيل', 'دفع أونلاين']
    },
    laundry: {
      id: 'laundry',
      name: 'غسيل',
      nameArabic: 'خدمة غسيل',
      icon: '👕',
      color: 'cyan',
      features: ['استلام وتوصيل', 'غسيل', 'كي', 'صيانة']
    },
    clothing: {
      id: 'clothing',
      name: 'ملابس',
      nameArabic: 'متجر ملابس',
      icon: '👔',
      color: 'pink',
      features: ['ملابس', 'أحذية', 'إكسسوارات', 'عروض']
    },
    contracting: {
      id: 'contracting',
      name: 'مقاولات',
      nameArabic: 'شركة مقاولات',
      icon: '🏗️',
      color: 'gray',
      features: ['بناء', 'تصميم', 'إشراف', 'صيانة']
    },
    plumbing: {
      id: 'plumbing',
      name: 'سباكة',
      nameArabic: 'خدمات سباكة',
      icon: '🔧',
      color: 'teal',
      features: ['تركيبات', 'صيانة', 'طوارئ', 'استشارات']
    },
    painting: {
      id: 'painting',
      name: 'دهانات',
      nameArabic: 'خدمات دهانات',
      icon: '🎨',
      color: 'lime',
      features: ['دهان', 'تصميم', 'ترميم', 'استشارات']
    },
    hardware: {
      id: 'hardware',
      name: 'أدوات',
      nameArabic: 'متجر أدوات',
      icon: '🔨',
      color: 'amber',
      features: ['أدوات', 'معدات', 'لوازم', 'توصيل']
    },
    electrical: {
      id: 'electrical',
      name: 'كهرباء',
      nameArabic: 'خدمات كهربائية',
      icon: '⚡',
      color: 'violet',
      features: ['تركيبات', 'صيانة', 'طوارئ', 'استشارات']
    }
  },

  // 🎨 أيقونات النظام - ثابتة
  icons: {
    primary: '🎯',
    secondary: '⭐',
    successIcon: '✅',
    errorIcon: '❌',
    warningIcon: '⚠️',
    infoIcon: 'ℹ️',
    user: '👤',
    business: '🏪',
    order: '📦',
    delivery: '🚚',
    payment: '💳',
    map: '🗺️',
    phone: '📞',
    email: '📧',
    website: '🌐',
    social: '📱',
    star: '⭐',
    heart: '❤️',
    cart: '🛒',
    search: '🔍',
    filter: '🔽',
    edit: '✏️',
    deleteIcon: '🗑️',
    add: '➕',
    menu: '☰',
    close: '✕',
    arrow: '➡️',
    check: '✓',
    x: '✗',
    plus: '+',
    minus: '-',
    settings: '⚙️',
    logout: '🚪',
    login: '🔑',
    dashboard: '📊',
    analytics: '📈',
    reports: '📋',
    notifications: '🔔',
    calendar: '📅',
    clock: '⏰',
    location: '📍',
    camera: '📷',
    image: '🖼️',
    document: '📄',
    download: '⬇️',
    upload: '⬆️',
    share: '🔗',
    copy: '📋',
    print: '🖨️',
    refresh: '🔄',
    sync: '🔄',
    backup: '💾',
    security: '🔒',
    lock: '🔒',
    unlock: '🔓',
    key: '🔑',
    shield: '🛡️',
    eye: '👁️',
    eyeOff: '🙈',
    help: '❓',
    support: '💬',
    contact: '📞',
    about: 'ℹ️',
    terms: '📜',
    privacy: '🔐',
    faq: '❓',
    tutorial: '📚',
    guide: '📖',
    tips: '💡',
    news: '📰',
    updates: '🔄',
    maintenance: '🔧',
    status: '📊',
    online: '🟢',
    offline: '🔴',
    busy: '🟡',
    away: '🟠',
    available: '✅',
    unavailable: '❌',
    active: '🟢',
    inactive: '🔴',
    pending: '🟡',
    completed: '✅',
    cancelled: '❌',
    refunded: '💰',
    paid: '💳',
    unpaid: '❌',
    overdue: '⏰',
    scheduled: '📅',
    ongoing: '🔄',
    paused: '⏸️',
    stopped: '⏹️',
    started: '▶️',
    finished: '✅',
    failed: '❌',
    successStatus: '✅',
    warningStatus: '⚠️',
    errorStatus: '❌',
    infoStatus: 'ℹ️',
    loading: '⏳',
    processing: '⚙️',
    uploading: '⬆️',
    downloading: '⬇️',
    syncing: '🔄',
    connecting: '🔗',
    connected: '✅',
    disconnected: '❌',
    reconnecting: '🔄',
    timeout: '⏰',
    retry: '🔄',
    skip: '⏭️',
    next: '➡️',
    previous: '⬅️',
    first: '⏮️',
    last: '⏭️',
    home: '🏠',
    back: '⬅️',
    forward: '➡️',
    up: '⬆️',
    down: '⬇️',
    left: '⬅️',
    right: '➡️',
    expand: '🔍',
    collapse: '📉',
    maximize: '🔍',
    minimize: '📉',
    fullscreen: '🖥️',
    exitFullscreen: '📱',
    zoomIn: '🔍',
    zoomOut: '🔍',
    reset: '🔄',
    clear: '🗑️',
    save: '💾',
    submit: '✅',
    cancel: '❌',
    confirm: '✅',
    approve: '✅',
    reject: '❌',
    accept: '✅',
    decline: '❌',
    agree: '✅',
    disagree: '❌',
    like: '👍',
    dislike: '👎',
    favorite: '⭐',
    unfavorite: '☆',
    bookmark: '🔖',
    unbookmark: '📄',
    tag: '🏷️',
    untag: '🏷️',
    follow: '👥',
    unfollow: '👤',
    subscribe: '📧',
    unsubscribe: '📧',
    join: '👥',
    leave: '👤',
    invite: '📧',
    remove: '🗑️',
    block: '🚫',
    unblock: '✅',
    report: '🚩',
    flag: '🚩',
    unflag: '🏳️',
    archive: '📦',
    unarchive: '📂',
    removeAction: '🗑️',
    restore: '♻️',
    trash: '🗑️',
    recycle: '♻️',
    empty: '📭',
    full: '📦',
    half: '📦',
    quarter: '📦',
    threeQuarters: '📦',
    oneThird: '📦',
    twoThirds: '📦',
    oneFifth: '📦',
    twoFifths: '📦',
    threeFifths: '📦',
    fourFifths: '📦',
    oneSixth: '📦',
    fiveSixths: '📦',
    oneEighth: '📦',
    threeEighths: '📦',
    fiveEighths: '📦',
    sevenEighths: '📦',
    oneTenth: '📦',
    threeTenths: '📦',
    sevenTenths: '📦',
    nineTenths: '📦',
    zero: '0',
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
    ten: '10',
    eleven: '11',
    twelve: '12',
    thirteen: '13',
    fourteen: '14',
    fifteen: '15',
    sixteen: '16',
    seventeen: '17',
    eighteen: '18',
    nineteen: '19',
    twenty: '20',
    thirty: '30',
    forty: '40',
    fifty: '50',
    sixty: '60',
    seventy: '70',
    eighty: '80',
    ninety: '90',
    hundred: '100',
    thousand: '1000',
    million: '1000000',
    billion: '1000000000',
    trillion: '1000000000000',
    infinity: '∞',
    piSymbol: 'π',
    alpha: 'α',
    beta: 'β',
    gamma: 'γ',
    delta: 'δ',
    epsilon: 'ε',
    zeta: 'ζ',
    eta: 'η',
    theta: 'θ',
    iota: 'ι',
    kappa: 'κ',
    lambda: 'λ',
    mu: 'μ',
    nu: 'ν',
    xi: 'ξ',
    omicron: 'ο',
    piLetter: 'π',
    rho: 'ρ',
    sigma: 'σ',
    tau: 'τ',
    upsilon: 'υ',
    phi: 'φ',
    chi: 'χ',
    psi: 'ψ',
    omega: 'ω'
  },

  // 📏 المسافات الموحدة - ثابتة
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
    '4xl': '6rem',    // 96px
    '5xl': '8rem'     // 128px
  },

  // 🔄 زوايا الحواف - ثابتة
  borderRadius: {
    none: '0',
    sm: '0.125rem',    // 2px
    md: '0.375rem',    // 6px
    lg: '0.5rem',      // 8px
    xl: '0.75rem',     // 12px
    '2xl': '1rem',     // 16px
    '3xl': '1.5rem',   // 24px
    full: '9999px'
  },

  // 🌑 الظلال الموحدة - ثابتة
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: 'none',
    ray: '0 4px 20px rgba(59, 130, 246, 0.15)'
  },

  // 🎯 الإعدادات الموحدة - ثابتة
  USE_PRIMARY_COLOR_ONLY: false,
  USE_SECONDARY_COLOR_ONLY: false,
  USE_NEUTRAL_COLORS_ONLY: false,
  USE_STATUS_COLORS_ONLY: false,
  USE_STANDARD_SPACING_ONLY: true,
  USE_STANDARD_BORDER_RADIUS_ONLY: true,
  USE_STANDARD_SHADOWS_ONLY: true,

  // 📱 إعدادات إضافية
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  
  typography: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    },
    fontFamily: {
      arabic: ['Cairo', 'Tahoma', 'Arial', 'sans-serif'],
      english: ['Inter', 'system-ui', 'sans-serif']
    }
  },

  // 📱 إعدادات التصميم المتجاوب
  RESPONSIVE: {
    // نقاط التوقف القياسية
    breakpoints: {
      sm: '640px',    // mobile
      md: '768px',    // tablet
      lg: '1024px',   // laptop
      xl: '1280px',   // desktop
      '2xl': '1536px' // large desktop
    },
    
    // الحاويات المتجاوبة
    containers: {
      sm: '100%',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    
    // المسافات المتجاوبة
    spacing: {
      responsive: true,
      mobile: {
        xs: '0.25rem',
        sm: '0.5rem', 
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem'
      },
      tablet: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem'
      },
      desktop: {
        xs: '0.75rem',
        sm: '1.5rem',
        md: '2rem',
        lg: '3rem',
        xl: '4rem'
      }
    }
  },

  // 🌍 إعدادات اللغات والتدويل
  LOCALIZATION: {
    // اللغات المدعومة
    supportedLanguages: ['ar', 'en'],
    
    // اللغة الافتراضية
    defaultLanguage: 'ar',
    
    // اتجاه النص حسب اللغة
    textDirection: {
      ar: 'rtl',
      en: 'ltr'
    },
    
    // الخطوط حسب اللغة
    fonts: {
      ar: {
        primary: 'Cairo, Tahoma, Arial, sans-serif',
        secondary: 'Helvetica, Arial, sans-serif',
        monospace: 'Courier New, monospace'
      },
      en: {
        primary: 'Inter, system-ui, sans-serif',
        secondary: 'Helvetica, Arial, sans-serif', 
        monospace: 'Courier New, monospace'
      }
    },
    
    // محاذاة النص حسب اللغة
    textAlign: {
      ar: 'right',
      en: 'left'
    },
    
    // Flexbox اتجاه حسب اللغة
    flexDirection: {
      ar: 'row-reverse',
      en: 'row'
    }
  },

  // 🌙 إعدادات الوضع الليلي
  DARK_MODE: {
    // تفعيل الوضع الليلي
    enabled: true,
    
    // الوضع الافتراضي
    defaultMode: 'light',
    
    // ألوان الوضع الليلي
    colors: {
      background: {
        primary: '#1a1a1a',
        secondary: '#2d2d2d',
        tertiary: '#404040'
      },
      surface: {
        primary: '#2d2d2d',
        secondary: '#404040',
        tertiary: '#525252'
      },
      text: {
        primary: '#ffffff',
        secondary: '#e5e5e5',
        tertiary: '#a3a3a3',
        inverse: '#1a1a1a'
      },
      border: {
        primary: '#404040',
        secondary: '#525252',
        tertiary: '#737373'
      },
      shadow: {
        primary: 'rgba(0, 0, 0, 0.3)',
        secondary: 'rgba(0, 0, 0, 0.2)',
        tertiary: 'rgba(0, 0, 0, 0.1)'
      }
    },
    
    // ظلال الوضع الليلي
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.4)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.3)'
    }
  },

  // 🎯 إعدادات المكونات المتجاوبة
  COMPONENTS: {
    // الأزرار المتجاوبة
    button: {
      sizes: {
        mobile: {
          sm: '1.5rem',    // 24px
          md: '2rem',      // 32px
          lg: '2.5rem'     // 40px
        },
        tablet: {
          sm: '1.75rem',   // 28px
          md: '2.25rem',   // 36px
          lg: '2.75rem'    // 44px
        },
        desktop: {
          sm: '2rem',      // 32px
          md: '2.5rem',    // 40px
          lg: '3rem'       // 48px
        }
      },
      padding: {
        mobile: {
          sm: '0.5rem 1rem',
          md: '0.75rem 1.5rem',
          lg: '1rem 2rem'
        },
        tablet: {
          sm: '0.75rem 1.25rem',
          md: '1rem 1.75rem',
          lg: '1.25rem 2.25rem'
        },
        desktop: {
          sm: '1rem 1.5rem',
          md: '1.25rem 2rem',
          lg: '1.5rem 2.5rem'
        }
      },
      borderRadius: {
        mobile: '0.375rem',   // 6px
        tablet: '0.5rem',     // 8px
        desktop: '0.75rem'    // 12px
      }
    },
    
    // البطاقات المتجاوبة
    card: {
      padding: {
        mobile: {
          sm: '1rem',
          md: '1.25rem',
          lg: '1.5rem'
        },
        tablet: {
          sm: '1.25rem',
          md: '1.5rem',
          lg: '1.75rem'
        },
        desktop: {
          sm: '1.5rem',
          md: '1.75rem',
          lg: '2rem'
        }
      },
      margin: {
        mobile: {
          sm: '0.5rem',
          md: '0.75rem',
          lg: '1rem'
        },
        tablet: {
          sm: '0.75rem',
          md: '1rem',
          lg: '1.25rem'
        },
        desktop: {
          sm: '1rem',
          md: '1.25rem',
          lg: '1.5rem'
        }
      },
      borderRadius: {
        mobile: '0.75rem',   // 12px
        tablet: '1rem',      // 16px
        desktop: '1.25rem'   // 20px
      }
    },
    
    // النماذج المتجاوبة
    form: {
      input: {
        height: {
          mobile: '2.5rem',   // 40px
          tablet: '2.75rem',  // 44px
          desktop: '3rem'     // 48px
        },
        padding: {
          mobile: '0.5rem 1rem',
          tablet: '0.75rem 1.25rem',
          desktop: '1rem 1.5rem'
        },
        fontSize: {
          mobile: '0.875rem', // 14px
          tablet: '1rem',     // 16px
          desktop: '1.125rem' // 18px
        }
      },
      label: {
        fontSize: {
          mobile: '0.875rem', // 14px
          tablet: '1rem',     // 16px
          desktop: '1.125rem' // 18px
        },
        marginBottom: {
          mobile: '0.5rem',
          tablet: '0.75rem',
          desktop: '1rem'
        }
      }
    }
  },

  // 📱 إعدادات الموبايل الخاصة
  MOBILE: {
    // تحسين اللمس
    touchOptimization: {
      minTouchTarget: '2.75rem',    // 44px
      recommendedTouchTarget: '3rem', // 48px
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem'
      }
    },
    
    // الشريط الجانبي للموبايل
    sidebar: {
      width: '100%',             // 100%
      overlay: true,
      animation: 'slide-in',
      position: 'fixed',
      zIndex: 50
    },
    
    // التنقل السفلي للموبايل
    bottomNavigation: {
      height: '4rem',
      position: 'fixed',
      zIndex: 40,
      backdrop: true
    },
    
    // القائمة المنسدلة للموبايل
    collapsibleMenu: {
      animation: 'slide-down',
      duration: '300ms',
      easing: 'ease-in-out'
    },
    
    // تصميم متجاوب للتنقل
    navigation: {
      mobile: {
        layout: 'bottom navigation',  // bottom navigation
        hamburger: true,
        overlay: true
      },
      tablet: {
        layout: 'sidebar',            // sidebar
        collapsible: true
      },
      desktop: {
        layout: 'horizontal',         // horizontal
        sidebar: true
      }
    }
  }
};

export default RAY_DESIGN_SYSTEM;
