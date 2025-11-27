// نظام الأنشطة الموحد - تعريفات وتصنيفات

export type ActivityGroupType = 
  | 'food' 
  | 'services' 
  | 'retail' 
  | 'health' 
  | 'realestate' 
  | 'automotive' 
  | 'entertainment';

export interface Activity {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  color: string;
  groupId: ActivityGroupType;
  features: string[];
  dashboardComponent: string;
  listingComponent: string;
  description?: string;
}

export interface ActivityGroupData {
  nameAr: string;
  nameEn: string;
  icon: string;
  color: string;
  description: string;
}

// ========== ACTIVITY DEFINITIONS ==========

export const ACTIVITIES: Record<string, Activity> = {
  // FOOD GROUP
  restaurant: {
    id: 'restaurant',
    nameAr: 'مطعم',
    nameEn: 'Restaurant',
    icon: 'UtensilsCrossed',
    color: 'red-600',
    groupId: 'food',
    features: ['Menu Management', 'Order Tracking', 'Delivery Integration', 'Reservations'],
    dashboardComponent: 'FoodDashboard',
    listingComponent: 'FoodListing',
  },
  cafe: {
    id: 'cafe',
    nameAr: 'كافيه',
    nameEn: 'Cafe',
    icon: 'Coffee',
    color: 'amber-700',
    groupId: 'food',
    features: ['Menu Management', 'Order Tracking', 'Table Management'],
    dashboardComponent: 'FoodDashboard',
    listingComponent: 'FoodListing',
  },
  bakery: {
    id: 'bakery',
    nameAr: 'مخبزة',
    nameEn: 'Bakery',
    icon: 'Croissant',
    color: 'yellow-600',
    groupId: 'food',
    features: ['Recipe Management', 'Order Tracking', 'Delivery'],
    dashboardComponent: 'FoodDashboard',
    listingComponent: 'FoodListing',
  },

  // SERVICES GROUP
  plumbing: {
    id: 'plumbing',
    nameAr: 'سباكة',
    nameEn: 'Plumbing',
    icon: 'Wrench',
    color: 'blue-600',
    groupId: 'services',
    features: ['Service Scheduling', 'Quote Generator', 'Team Management', 'Inventory'],
    dashboardComponent: 'ServicesDashboard',
    listingComponent: 'ServicesListing',
  },
  electrical: {
    id: 'electrical',
    nameAr: 'كهرباء',
    nameEn: 'Electrical',
    icon: 'Zap',
    color: 'yellow-500',
    groupId: 'services',
    features: ['Service Scheduling', 'Quote Generator', 'Safety Compliance'],
    dashboardComponent: 'ServicesDashboard',
    listingComponent: 'ServicesListing',
  },
  carpentry: {
    id: 'carpentry',
    nameAr: 'نجارة',
    nameEn: 'Carpentry',
    icon: 'Hammer2',
    color: 'amber-700',
    groupId: 'services',
    features: ['Project Management', 'Design Portfolio', 'Material Tracking'],
    dashboardComponent: 'ServicesDashboard',
    listingComponent: 'ServicesListing',
  },
  cleaning: {
    id: 'cleaning',
    nameAr: 'تنظيف',
    nameEn: 'Cleaning',
    icon: 'Sparkles',
    color: 'cyan-500',
    groupId: 'services',
    features: ['Schedule Management', 'Team Coordination', 'Service Types'],
    dashboardComponent: 'ServicesDashboard',
    listingComponent: 'ServicesListing',
  },
  painting: {
    id: 'painting',
    nameAr: 'دهانات وخدمات',
    nameEn: 'Painting Services',
    icon: 'Palette',
    color: 'purple-600',
    groupId: 'services',
    features: ['Color Matching', 'Project Quotes', 'Material Inventory', 'Portfolio'],
    dashboardComponent: 'ServicesDashboard',
    listingComponent: 'ServicesListing',
  },
  construction: {
    id: 'construction',
    nameAr: 'مقاولات',
    nameEn: 'Construction',
    icon: 'Building2',
    color: 'orange-600',
    groupId: 'services',
    features: ['Project Management', 'Budget Tracking', 'Team Scheduling', 'Timeline'],
    dashboardComponent: 'ServicesDashboard',
    listingComponent: 'ServicesListing',
  },

  // RETAIL GROUP
  clothing: {
    id: 'clothing',
    nameAr: 'ملابس',
    nameEn: 'Clothing',
    icon: 'Shirt',
    color: 'pink-600',
    groupId: 'retail',
    features: ['Product Catalog', 'Size/Color Variants', 'Inventory', 'Sales Analytics'],
    dashboardComponent: 'RetailDashboard',
    listingComponent: 'ShoppingListing',
  },
  electronics: {
    id: 'electronics',
    nameAr: 'إلكترونيات',
    nameEn: 'Electronics',
    icon: 'Monitor',
    color: 'blue-700',
    groupId: 'retail',
    features: ['Product Specs', 'Warranty Management', 'Stock Tracking'],
    dashboardComponent: 'RetailDashboard',
    listingComponent: 'ShoppingListing',
  },
  supermarket: {
    id: 'supermarket',
    nameAr: 'سوبر ماركت',
    nameEn: 'Supermarket',
    icon: 'ShoppingCart',
    color: 'green-600',
    groupId: 'retail',
    features: ['Product Categories', 'Inventory', 'Promotions', 'Stock Alerts'],
    dashboardComponent: 'RetailDashboard',
    listingComponent: 'ShoppingListing',
  },
  books: {
    id: 'books',
    nameAr: 'مكتبة',
    nameEn: 'Bookstore',
    icon: 'BookOpen',
    color: 'amber-700',
    groupId: 'retail',
    features: ['Book Catalog', 'ISBN Management', 'Author Tracking'],
    dashboardComponent: 'RetailDashboard',
    listingComponent: 'ShoppingListing',
  },
  gifts: {
    id: 'gifts',
    nameAr: 'هدايا وزهور',
    nameEn: 'Gifts & Flowers',
    icon: 'Gift',
    color: 'red-500',
    groupId: 'retail',
    features: ['Custom Orders', 'Seasonal Items', 'Delivery Scheduling'],
    dashboardComponent: 'RetailDashboard',
    listingComponent: 'ShoppingListing',
  },
  hardware: {
    id: 'hardware',
    nameAr: 'محلات أدوات صحية',
    nameEn: 'Hardware & Tools',
    icon: 'Wrench',
    color: 'gray-700',
    groupId: 'retail',
    features: ['Product Categories', 'Barcode Management', 'Supplier Tracking', 'Bulk Orders'],
    dashboardComponent: 'RetailDashboard',
    listingComponent: 'ShoppingListing',
  },

  // HEALTH GROUP
  clinic: {
    id: 'clinic',
    nameAr: 'عيادة',
    nameEn: 'Clinic',
    icon: 'Stethoscope',
    color: 'teal-600',
    groupId: 'health',
    features: ['Appointment Booking', 'Doctor Schedule', 'Patient Records', 'Prescription Mgmt'],
    dashboardComponent: 'HealthDashboard',
    listingComponent: 'HealthBeautyListing',
  },
  pharmacy: {
    id: 'pharmacy',
    nameAr: 'صيدلية',
    nameEn: 'Pharmacy',
    icon: 'Pill',
    color: 'green-700',
    groupId: 'health',
    features: ['Inventory Management', 'Prescription Processing', 'Stock Tracking'],
    dashboardComponent: 'HealthDashboard',
    listingComponent: 'HealthBeautyListing',
  },
  lab: {
    id: 'lab',
    nameAr: 'معمل تحاليل',
    nameEn: 'Lab',
    icon: 'Beaker',
    color: 'indigo-600',
    groupId: 'health',
    features: ['Test Management', 'Appointment Booking', 'Result Delivery'],
    dashboardComponent: 'HealthDashboard',
    listingComponent: 'HealthBeautyListing',
  },
  salon: {
    id: 'salon',
    nameAr: 'صالون تجميل',
    nameEn: 'Salon',
    icon: 'Scissors',
    color: 'pink-500',
    groupId: 'health',
    features: ['Service Booking', 'Staff Schedule', 'Service Packages', 'Reviews'],
    dashboardComponent: 'HealthDashboard',
    listingComponent: 'HealthBeautyListing',
  },
  gym: {
    id: 'gym',
    nameAr: 'جيم / نادي رياضي',
    nameEn: 'Gym',
    icon: 'Dumbbell',
    color: 'red-600',
    groupId: 'health',
    features: ['Membership Management', 'Class Scheduling', 'Trainer Tracking'],
    dashboardComponent: 'HealthDashboard',
    listingComponent: 'HealthBeautyListing',
  },
  spa: {
    id: 'spa',
    nameAr: 'منتجع صحي',
    nameEn: 'Spa',
    icon: 'Droplet',
    color: 'purple-500',
    groupId: 'health',
    features: ['Service Booking', 'Package Management', 'Therapist Schedule'],
    dashboardComponent: 'HealthDashboard',
    listingComponent: 'HealthBeautyListing',
  },

  // REAL ESTATE GROUP
  realestate: {
    id: 'realestate',
    nameAr: 'عقارات',
    nameEn: 'Real Estate',
    icon: 'Building2',
    color: 'green-600',
    groupId: 'realestate',
    features: ['Property Listing', 'Virtual Tour', 'Document Management', 'CRM'],
    dashboardComponent: 'RealEstateDashboard',
    listingComponent: 'RealEstateListing',
  },

  // AUTOMOTIVE GROUP
  dealership: {
    id: 'dealership',
    nameAr: 'معرض سيارات',
    nameEn: 'Dealership',
    icon: 'Car',
    color: 'red-600',
    groupId: 'automotive',
    features: ['Vehicle Inventory', 'Pricing', 'Test Drive Booking', 'Financing'],
    dashboardComponent: 'AutomotiveDashboard',
    listingComponent: 'CarListing',
  },
  carwash: {
    id: 'carwash',
    nameAr: 'مغسلة سيارات',
    nameEn: 'Car Wash',
    icon: 'Droplet',
    color: 'blue-500',
    groupId: 'automotive',
    features: ['Service Booking', 'Package Management', 'Queue Management', 'Loyalty Program'],
    dashboardComponent: 'AutomotiveDashboard',
    listingComponent: 'CarListing',
  },
  maintenance: {
    id: 'maintenance',
    nameAr: 'صيانة سيارات',
    nameEn: 'Maintenance',
    icon: 'Wrench',
    color: 'gray-600',
    groupId: 'automotive',
    features: ['Service Booking', 'Parts Inventory', 'Mechanic Schedule'],
    dashboardComponent: 'AutomotiveDashboard',
    listingComponent: 'CarListing',
  },
  rental: {
    id: 'rental',
    nameAr: 'تأجير سيارات',
    nameEn: 'Car Rental',
    icon: 'Key',
    color: 'orange-600',
    groupId: 'automotive',
    features: ['Fleet Management', 'Booking System', 'Payment Processing', 'Insurance'],
    dashboardComponent: 'AutomotiveDashboard',
    listingComponent: 'CarListing',
  },

  // ENTERTAINMENT GROUP
  cinema: {
    id: 'cinema',
    nameAr: 'سينما',
    nameEn: 'Cinema',
    icon: 'Film',
    color: 'purple-600',
    groupId: 'entertainment',
    features: ['Movie Schedule', 'Seat Booking', 'Ticket Pricing', 'Show Management'],
    dashboardComponent: 'EntertainmentDashboard',
    listingComponent: 'EventListing',
  },
  themepark: {
    id: 'themepark',
    nameAr: 'ملاهي',
    nameEn: 'Theme Park',
    icon: 'Zap',
    color: 'pink-600',
    groupId: 'entertainment',
    features: ['Ticket Management', 'Attraction Scheduling', 'Queue Tracking'],
    dashboardComponent: 'EntertainmentDashboard',
    listingComponent: 'EventListing',
  },
  training: {
    id: 'training',
    nameAr: 'مركز تدريب',
    nameEn: 'Training Center',
    icon: 'GraduationCap',
    color: 'indigo-600',
    groupId: 'entertainment',
    features: ['Course Management', 'Student Enrollment', 'Certificate Tracking'],
    dashboardComponent: 'EntertainmentDashboard',
    listingComponent: 'EventListing',
  },
  event: {
    id: 'event',
    nameAr: 'فعاليات',
    nameEn: 'Events',
    icon: 'Ticket',
    color: 'yellow-600',
    groupId: 'entertainment',
    features: ['Event Planning', 'Ticket Sales', 'Attendee Tracking', 'Sponsorship'],
    dashboardComponent: 'EntertainmentDashboard',
    listingComponent: 'EventListing',
  },
};

// ========== ACTIVITY GROUPS ==========

export const ACTIVITY_GROUPS: Record<ActivityGroupType, ActivityGroupData> = {
  food: {
    nameAr: 'الغذاء والمشروبات',
    nameEn: 'Food & Beverage',
    icon: 'UtensilsCrossed',
    color: 'red-600',
    description: 'مطاعم، كافيهات، مخابز',
  },
  services: {
    nameAr: 'الخدمات',
    nameEn: 'Services',
    icon: 'Wrench',
    color: 'blue-600',
    description: 'سباكة، كهرباء، دهانات، مقاولات، وغيرها',
  },
  retail: {
    nameAr: 'التجارة والتسوق',
    nameEn: 'Retail & Shopping',
    icon: 'ShoppingBag',
    color: 'green-600',
    description: 'ملابس، إلكترونيات، محلات أدوات',
  },
  health: {
    nameAr: 'الصحة والجمال',
    nameEn: 'Health & Beauty',
    icon: 'Heart',
    color: 'pink-600',
    description: 'عيادات، صالونات، جيم، صيدليات',
  },
  realestate: {
    nameAr: 'العقارات',
    nameEn: 'Real Estate',
    icon: 'Building2',
    color: 'emerald-600',
    description: 'عقارات للبيع والإيجار',
  },
  automotive: {
    nameAr: 'السيارات',
    nameEn: 'Automotive',
    icon: 'Car',
    color: 'orange-600',
    description: 'معارض، صيانة، مغاسل، تأجير',
  },
  entertainment: {
    nameAr: 'الترفيه والتعليم',
    nameEn: 'Entertainment & Education',
    icon: 'Film',
    color: 'purple-600',
    description: 'سينما، ملاهي، مراكز تدريب، فعاليات',
  },
};

// ========== HELPER FUNCTIONS ==========

export const getActivityGroup = (activityId: string) => {
  const activity = ACTIVITIES[activityId];
  return activity ? ACTIVITY_GROUPS[activity.groupId] : null;
};

export const getActivitiesByGroup = (groupId: ActivityGroupType) => {
  return Object.values(ACTIVITIES).filter(a => a.groupId === groupId);
};

export const getAllActivityGroups = () => {
  return Object.entries(ACTIVITY_GROUPS).map(([id, data]) => ({
    id: id as ActivityGroupType,
    ...data,
  }));
};

export const searchActivities = (query: string, lang: 'ar' | 'en' = 'ar') => {
  const searchKey = lang === 'ar' ? 'nameAr' : 'nameEn';
  return Object.values(ACTIVITIES).filter(a => 
    a[searchKey as keyof Activity]?.toString().toLowerCase().includes(query.toLowerCase())
  );
};
