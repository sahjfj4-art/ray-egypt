import React from 'react';
import { 
  ShoppingBag, Users, DollarSign, ShoppingCart, Star, 
  Package, Menu, LayoutDashboard, Store,
  ChefHat, Calendar, Home, Key, Car, Wrench,
  Stethoscope, Activity, Dumbbell, ClipboardList,
  Utensils, Clock, CheckCircle, Plus, FileText,
  Truck, Map, QrCode, CreditCard, Tag, 
  Briefcase, PenTool, Camera, ShieldCheck, HeartPulse,
  Syringe, Pill, School, GraduationCap, Video,
  Shirt, Droplets, Waves, Scissors, Ticket, Layers,
  Sparkles, Grid, LayoutGrid, BarChart3, HardHat, Warehouse, FileSpreadsheet,
  Settings, Bell, AlertCircle, Lightbulb, Zap, Calculator, Shield, TrendingUp, Leaf,
  Trophy, Baby, RefreshCw, XCircle, Heart, Database
} from 'lucide-react';

export type BusinessType = 'general' | 'restaurant' | 'retail' | 'realestate' | 'cars' | 'clinic' | 'gym' | 'services' | 'laundry' | 'clothing' | 'salon' | 'pharmacy' | 'contracting' | 'plumbing' | 'painting' | 'hardware' | 'electrical' | 'construction' | 'carwash' | 'logistics' | 'agriculture' | 'mobileLaundry' | 'subscriptions' | 'nursery' | 'academy' | 'medical' | 'legal' | 'consulting' | 'resorts' | 'cleaning' | 'maintenance' | 'delivery' | 'dryCleaning' | 'homeServices' | 'pos' | 'inventory' | 'salesAccounting' | 'workshop' | 'admin';

export interface DashboardConfig {
  type: BusinessType;
  title: string;
  themeColor: string;
  navItems: { id: string; label: string; icon: any }[];
  stats: { label: string; value: string; trend: number; icon: any }[];
  quickActions: { label: string; icon: any; action: string }[];
  tableHeaders: string[];
  data: any[];
}

export const dashboardConfigs: Record<BusinessType, DashboardConfig> = {
  contracting: {
    type: 'contracting',
    title: 'شركة التعمير للمقاولات',
    themeColor: 'orange',
    navItems: [
      { id: 'overview', label: 'مركز العمليات', icon: LayoutDashboard },
      { id: 'projects', label: 'المشاريع الجارية', icon: HardHat },
      { id: 'tenders', label: 'المناقصات والعروض', icon: FileSpreadsheet },
      { id: 'warehouse', label: 'المخازن والتوريد', icon: Warehouse },
      { id: 'labor', label: 'العمالة والمقاولين', icon: Users },
      { id: 'finance', label: 'المستخلصات والمالية', icon: DollarSign },
      { id: 'procurement', label: 'المشتريات', icon: Truck },
    ],
    stats: [
      { label: 'مشاريع نشطة', value: '5', trend: 0, icon: HardHat },
      { label: 'نسبة الإنجاز', value: '68%', trend: 5, icon: Activity },
      { label: 'قيمة المستخلصات', value: '2.4M', trend: 12, icon: DollarSign },
      { label: 'مواد في الموقع', value: '450k', trend: -2, icon: Package },
    ],
    quickActions: [
      { label: 'مشروع جديد', icon: Plus, action: 'new_project' },
      { label: 'طلب توريد', icon: Truck, action: 'supply_request' },
      { label: 'صرف خامات', icon: Warehouse, action: 'issue_material' },
      { label: 'إضافة مستخلص', icon: FileText, action: 'new_invoice' },
      { label: 'تسجيل عمالة', icon: Users, action: 'add_labor' },
    ],
    tableHeaders: ['المشروع', 'العميل', 'المرحلة الحالية', 'نسبة الإنجاز', 'تاريخ التسليم', 'الحالة'],
    data: [
      { id: 'PRJ-101', col1: 'أبراج العاصمة', col2: 'هيئة المجتمعات', col3: 'التشطيبات الداخلية', status: 'in_progress', time: '2025-12-30' },
      { id: 'PRJ-102', col1: 'فيلا د. خالد', col2: 'قطاع خاص', col3: 'تأسيس سباكة وكهرباء', status: 'active', time: '2025-06-15' },
      { id: 'PRJ-103', col1: 'مول الشروق', col2: 'مجموعة الفطيم', col3: 'صب الخرسانة', status: 'delayed', time: '2026-01-01' },
    ]
  },
  general: {
    type: 'general',
    title: 'مركز القيادة الموحد',
    themeColor: 'slate',
    navItems: [
      { id: 'overview', label: 'نظرة عامة', icon: LayoutGrid },
      { id: 'analytics', label: 'التحليلات المجمعة', icon: Activity },
      { id: 'users', label: 'المستخدمين والصلاحيات', icon: Users },
      { id: 'billing', label: 'الاشتراكات والفواتير', icon: CreditCard },
      { id: 'reports', label: 'التقارير المركزية', icon: BarChart3 },
    ],
    stats: [
      { label: 'إجمالي الإيرادات', value: '1.2M ج.م', trend: 15, icon: DollarSign },
      { label: 'الطلبات النشطة', value: '342', trend: 8, icon: ShoppingBag },
      { label: 'العملاء الجدد', value: '128', trend: 12, icon: Users },
      { label: 'الأنظمة النشطة', value: '11', trend: 0, icon: Store },
    ],
    quickActions: [],
    tableHeaders: [],
    data: []
  },
  restaurant: {
    type: 'restaurant',
    title: 'مطعم النور للمأكولات',
    themeColor: 'orange',
    navItems: [
      { id: 'overview', label: 'لوحة القيادة', icon: LayoutDashboard },
      { id: 'pos', label: 'كاشير الصالة', icon: DollarSign },
      { id: 'orders', label: 'إدارة الطلبات', icon: ShoppingBag },
      { id: 'kitchen', label: 'شاشة المطبخ (KDS)', icon: ChefHat },
      { id: 'menu', label: 'قائمة الطعام', icon: Menu },
      { id: 'tables', label: 'خريطة الطاولات', icon: Utensils },
      { id: 'reservations', label: 'دفتر الحجوزات', icon: Calendar },
      { id: 'delivery', label: 'فريق التوصيل', icon: Truck },
      { id: 'inventory', label: 'المخزون والمقادير', icon: Package },
    ],
    stats: [
      { label: 'مبيعات اليوم', value: '4,850 ج.م', trend: 15, icon: DollarSign },
      { label: 'الطلبات النشطة', value: '12', trend: 8, icon: ShoppingBag },
      { label: 'طاولات مشغولة', value: '8/15', trend: -2, icon: Utensils },
      { label: 'وقت التحضير', value: '18 دقيقة', trend: -5, icon: Clock },
    ],
    quickActions: [
      { label: 'طلب جديد', icon: Plus, action: 'new_order' },
      { label: 'حجز طاولة', icon: Calendar, action: 'book_table' },
      { label: 'إغلاق الوردية', icon: CheckCircle, action: 'close_shift' },
      { label: 'مصروفات', icon: DollarSign, action: 'expense' },
      { label: 'نواقص المطبخ', icon: Package, action: 'kitchen_stock' },
      { label: 'طباعة باركود', icon: QrCode, action: 'print_qr' },
    ],
    tableHeaders: ['رقم الطلب', 'نوع الطلب', 'العميل', 'المبلغ', 'الحالة', 'الوقت المنقضي'],
    data: [
      { id: '#1847', col1: 'توصيل', col2: 'محمد علي', col3: '230 ج', status: 'preparing', time: '12 دقيقة' },
      { id: '#1846', col1: 'صالة - T4', col2: 'عائلة سمير', col3: '540 ج', status: 'completed', time: '45 دقيقة' },
      { id: '#1845', col1: 'تيك أواي', col2: 'سارة أحمد', col3: '120 ج', status: 'ready', time: '20 دقيقة' },
      { id: '#1844', col1: 'توصيل', col2: 'كريم محمود', col3: '310 ج', status: 'delivering', time: '35 دقيقة' },
    ]
  },
  
  retail: {
    type: 'retail',
    title: 'سوبر ماركت البركة',
    themeColor: 'blue',
    navItems: [
      { id: 'overview', label: 'نظرة عامة', icon: LayoutDashboard },
      { id: 'pos', label: 'نقطة البيع (POS)', icon: ShoppingBag },
      { id: 'products', label: 'المنتجات والأسعار', icon: Tag },
      { id: 'inventory', label: 'المخزون والجرد', icon: ClipboardList },
      { id: 'suppliers', label: 'الموردين', icon: Truck },
      { id: 'customers', label: 'العملاء والديون', icon: Users },
      { id: 'reports', label: 'التقارير المالية', icon: FileText },
      { id: 'offers', label: 'العروض والخصومات', icon: Star },
    ],
    stats: [
      { label: 'إيراد اليوم', value: '15,200 ج', trend: 5, icon: DollarSign },
      { label: 'عدد الفواتير', value: '142', trend: 10, icon: FileText },
      { label: 'منتجات تنفذ', value: '8', trend: -2, icon: Package },
      { label: 'قيمة المخزون', value: '450k ج', trend: 0, icon: Store },
    ],
    quickActions: [
      { label: 'فاتورة بيع', icon: ShoppingBag, action: 'new_sale' },
      { label: 'فاتورة شراء', icon: Truck, action: 'purchase_order' },
      { label: 'إضافة منتج', icon: Package, action: 'add_product' },
      { label: 'جرد سريع', icon: QrCode, action: 'inventory_check' },
      { label: 'مرتجع', icon: CheckCircle, action: 'return' },
      { label: 'تسديد مورد', icon: DollarSign, action: 'pay_supplier' },
    ],
    tableHeaders: ['رقم الفاتورة', 'العميل', 'عدد الأصناف', 'الإجمالي', 'طريقة الدفع', 'الحالة'],
    data: [
      { id: '#INV-990', col1: 'عميل نقدي', col2: '5 قطع', col3: '150 ج', status: 'paid', time: 'منذ دقيقة' },
      { id: '#INV-989', col1: 'أحمد كمال', col2: '12 قطعة', col3: '1,200 ج', status: 'paid', time: 'منذ 10 د' },
      { id: '#INV-988', col1: 'سارة علي', col2: '3 قطع', col3: '85 ج', status: 'credit', time: 'منذ 15 د' },
      { id: '#INV-987', col1: 'محمود حسن', col2: '1 قطعة', col3: '20 ج', status: 'cancelled', time: 'منذ 30 د' },
    ]
  },

  realestate: {
    type: 'realestate',
    title: 'أملاك للتطوير العقاري',
    themeColor: 'green',
    navItems: [
      { id: 'overview', label: 'لوحة المعلومات', icon: LayoutDashboard },
      { id: 'properties', label: 'وحدات البيع', icon: Home },
      { id: 'rentals', label: 'وحدات الإيجار', icon: Key },
      { id: 'map', label: 'الخريطة العقارية', icon: Map },
      { id: 'leads', label: 'العملاء المحتملين', icon: Users },
      { id: 'showings', label: 'جدول المعاينات', icon: Calendar },
      { id: 'contracts', label: 'العقود والأقساط', icon: FileText },
      { id: 'marketing', label: 'الحملات الإعلانية', icon: Star },
    ],
    stats: [
      { label: 'المبيعات (Q3)', value: '3.2M ج.م', trend: 5, icon: DollarSign },
      { label: 'وحدات متاحة', value: '45', trend: -1, icon: Home },
      { label: 'معاينات اليوم', value: '8', trend: 12, icon: Users },
      { label: 'أقساط مستحقة', value: '120k ج', trend: 0, icon: FileText },
    ],
    quickActions: [
      { label: 'إضافة وحدة', icon: Home, action: 'add_property' },
      { label: 'عميل جديد', icon: Users, action: 'add_lead' },
      { label: 'حجز معاينة', icon: Calendar, action: 'schedule_viewing' },
      { label: 'إنشاء عقد', icon: FileText, action: 'create_contract' },
      { label: 'حاسبة أقساط', icon: DollarSign, action: 'calc' },
      { label: 'جولة 360', icon: Camera, action: 'tour_360' },
    ],
    tableHeaders: ['كود الوحدة', 'العنوان', 'النوع', 'السعر', 'العميل المهتم', 'حالة المعاينة'],
    data: [
      { id: 'APT-101', col1: 'التجمع الخامس - حي اللوتس', col2: 'شقة 180م', col3: '3.5M ج', status: 'scheduled', time: 'أحمد محمود' },
      { id: 'VIL-205', col1: 'الشيخ زايد - بيفرلي', col2: 'فيلا مستقلة', col3: '12M ج', status: 'completed', time: 'شركة الفرسان' },
      { id: 'SHP-003', col1: 'المعادي - شارع 9', col2: 'محل تجاري', col3: '45,000/ش', status: 'pending', time: 'د. سارة' },
      { id: 'LND-55', col1: 'العاصمة الإدارية', col2: 'أرض تجارية', col3: '8M ج', status: 'sold', time: 'مجموعة الصفا' },
    ]
  },

  cars: {
    type: 'cars',
    title: 'أوتو ستار للسيارات',
    themeColor: 'red',
    navItems: [
      { id: 'overview', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'inventory', label: 'معرض السيارات', icon: Car },
      { id: 'inspection', label: 'فحص فني', icon: ClipboardList },
      { id: 'test_drives', label: 'تجارب القيادة', icon: Key },
      { id: 'sales', label: 'المبيعات والفواتير', icon: DollarSign },
      { id: 'installments', label: 'نظام التقسيط', icon: FileText },
      { id: 'maintenance', label: 'مركز الصيانة', icon: Wrench },
      { id: 'insurance', label: 'التأمين والترخيص', icon: ShieldCheck },
    ],
    stats: [
      { label: 'سيارات مباعة', value: '12', trend: 20, icon: Car },
      { label: 'متاح في المعرض', value: '58', trend: 5, icon: Store },
      { label: 'طلبات تجربة', value: '6', trend: 15, icon: Key },
      { label: 'أقساط مستحقة', value: '150k ج.م', trend: 0, icon: DollarSign },
    ],
    quickActions: [
      { label: 'إضافة سيارة', icon: Car, action: 'add_car' },
      { label: 'حجز تجربة', icon: Key, action: 'book_test' },
      { label: 'حاسبة قسط', icon: DollarSign, action: 'calc_installment' },
      { label: 'عقد بيع', icon: FileText, action: 'sale_contract' },
      { label: 'أمر صيانة', icon: Wrench, action: 'service_order' },
      { label: 'تقييم استبدال', icon: CheckCircle, action: 'trade_in' },
    ],
    tableHeaders: ['الموديل', 'سنة الصنع', 'السعر', 'اللون', 'الحالة', 'ملاحظات'],
    data: [
      { id: 'Kia-Spt', col1: 'Kia Sportage', col2: '2024', col3: '1.8M ج', status: 'available', time: 'أحمر' },
      { id: 'Hyun-Tuc', col1: 'Hyundai Tucson', col2: '2025', col3: '2.1M ج', status: 'sold', time: 'أسود' },
      { id: 'Corolla', col1: 'Toyota Corolla', col2: '2023', col3: '1.3M ج', status: 'reserved', time: 'فضي - عربون' },
      { id: 'Merc-C180', col1: 'Mercedes C180', col2: '2024', col3: '3.5M ج', status: 'available', time: 'أبيض' },
    ]
  },

  clinic: {
    type: 'clinic',
    title: 'عيادات الشفاء التخصصية',
    themeColor: 'teal',
    navItems: [
      { id: 'overview', label: 'الاستقبال', icon: LayoutDashboard },
      { id: 'appointments', label: 'جدول المواعيد', icon: Calendar },
      { id: 'patients', label: 'ملفات المرضى', icon: Users },
      { id: 'prescriptions', label: 'الروشتات الطبية', icon: FileText },
      { id: 'lab', label: 'التحاليل والأشعة', icon: Activity },
      { id: 'pharmacy', label: 'صيدلية العيادة', icon: Pill },
      { id: 'finance', label: 'الحسابات والتأمين', icon: DollarSign },
    ],
    stats: [
      { label: 'حالات اليوم', value: '24', trend: 10, icon: Users },
      { label: 'في الانتظار', value: '3', trend: -5, icon: Clock },
      { label: 'إيراد العيادة', value: '12,500 ج', trend: 8, icon: DollarSign },
      { label: 'عمليات', value: '2', trend: 0, icon: HeartPulse },
    ],
    quickActions: [
      { label: 'حجز كشف', icon: Calendar, action: 'book_appointment' },
      { label: 'مريض جديد', icon: Users, action: 'add_patient' },
      { label: 'روشتة', icon: FileText, action: 'new_rx' },
      { label: 'طلب تحليل', icon: Activity, action: 'lab_request' },
      { label: 'متابعة', icon: Clock, action: 'follow_up' },
      { label: 'تطعيم', icon: Syringe, action: 'vaccine' },
    ],
    tableHeaders: ['رقم الملف', 'المريض', 'نوع الكشف', 'الطبيب', 'الحالة', 'الموعد'],
    data: [
      { id: '#PT-902', col1: 'منى زكي', col2: 'استشارة باطنة', col3: 'د. أحمد', status: 'waiting', time: '10:30 ص' },
      { id: '#PT-903', col1: 'كريم عبد العزيز', col2: 'كشف جديد', col3: 'د. سارة', status: 'in_progress', time: '11:00 ص' },
      { id: '#PT-904', col1: 'أحمد حلمي', col2: 'متابعة دورية', col3: 'د. أحمد', status: 'completed', time: '09:15 ص' },
      { id: '#PT-905', col1: 'ياسمين صبري', col2: 'جلدية', col3: 'د. نورهان', status: 'scheduled', time: '01:00 م' },
    ]
  },

  gym: {
    type: 'gym',
    title: 'باور جيم (Power Gym)',
    themeColor: 'yellow',
    navItems: [
      { id: 'overview', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'members', label: 'سجل الأعضاء', icon: Users },
      { id: 'access', label: 'الدخول والخروج', icon: QrCode },
      { id: 'classes', label: 'حصص التدريب', icon: Dumbbell },
      { id: 'trainers', label: 'المدربين', icon: Star },
      { id: 'subscriptions', label: 'الباقات والاشتراكات', icon: FileText },
      { id: 'diet', label: 'أنظمة التغذية', icon: Utensils },
      { id: 'store', label: 'متجر المكملات', icon: ShoppingBag },
    ],
    stats: [
      { label: 'حضور اليوم', value: '145', trend: 12, icon: Users },
      { label: 'اشتراكات جديدة', value: '8', trend: 25, icon: CreditCard },
      { label: 'اشتراكات تنتهي', value: '12', trend: -5, icon: Clock },
      { label: 'مبيعات المتجر', value: '3,200 ج', trend: 10, icon: DollarSign },
    ],
    quickActions: [
      { label: 'عضو جديد', icon: Plus, action: 'new_member' },
      { label: 'تجديد اشتراك', icon: CreditCard, action: 'renew_sub' },
      { label: 'تسجيل دخول', icon: QrCode, action: 'checkin' },
      { label: 'بيع منتج', icon: ShoppingBag, action: 'sell_item' },
      { label: 'قياس InBody', icon: Activity, action: 'inbody' },
      { label: 'حجز كلاس', icon: Dumbbell, action: 'book_class' },
    ],
    tableHeaders: ['رقم العضوية', 'العضو', 'الباقة', 'تاريخ الانتهاء', 'حالة الاشتراك', 'آخر حضور'],
    data: [
      { id: 'GM-101', col1: 'عمرو دياب', col2: 'سنوي VIP', col3: '01/01/2026', status: 'active', time: 'الآن' },
      { id: 'GM-102', col1: 'تامر حسني', col2: 'شهري', col3: '25/11/2025', status: 'expiring', time: 'أمس' },
      { id: 'GM-103', col1: 'محمد رمضان', col2: '3 شهور', col3: '10/10/2025', status: 'expired', time: 'منذ 3 أيام' },
      { id: 'GM-104', col1: 'شيرين', col2: 'حصص خاصة', col3: '15/12/2025', status: 'active', time: 'اليوم 10 ص' },
    ]
  },

  services: {
    type: 'services',
    title: 'تكنو فيكس للصيانة',
    themeColor: 'blue',
    navItems: [
      { id: 'overview', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'jobs', label: 'أوامر الشغل', icon: ClipboardList },
      { id: 'requests', label: 'الطلبات الواردة', icon: Wrench },
      { id: 'schedule', label: 'جدول الفنيين', icon: Calendar },
      { id: 'technicians', label: 'فريق العمل', icon: Users },
      { id: 'spare_parts', label: 'قطع الغيار', icon: Settings },
      { id: 'invoices', label: 'الفواتير والضمان', icon: FileText },
    ],
    stats: [
      { label: 'طلبات جديدة', value: '15', trend: 8, icon: Bell },
      { label: 'قيد التنفيذ', value: '7', trend: 0, icon: Wrench },
      { label: 'فنيين متاحين', value: '3/10', trend: -2, icon: Users },
      { label: 'إيراد الأسبوع', value: '25,000 ج', trend: 12, icon: DollarSign },
    ],
    quickActions: [
      { label: 'طلب صيانة', icon: Wrench, action: 'new_request' },
      { label: 'تعيين فني', icon: Users, action: 'assign_tech' },
      { label: 'صرف قطعة غيار', icon: Settings, action: 'issue_part' },
      { label: 'إنهاء أمر شغل', icon: CheckCircle, action: 'close_order' },
    ],
    tableHeaders: ['رقم الطلب', 'العميل', 'الجهاز', 'العطل', 'الحالة', 'الفني المسؤول'],
    data: [
      { id: '#SRV-551', col1: 'فندق الماسة', col2: 'تكييف مركزي', col3: 'صيانة دورية', status: 'in_progress', time: 'م. حسن' },
      { id: '#SRV-552', col1: 'مطعم حضرموت', col2: 'ثلاجة عرض', col3: 'لا تعمل', status: 'pending', time: 'لم يحدد' },
      { id: '#SRV-550', col1: 'فيلا 15', col2: 'شبكة مياه', col3: 'تسريب', status: 'completed', time: 'فني محمد' },
    ]
  },

  laundry: {
    type: 'laundry',
    title: 'مغسلة كلين أند واش',
    themeColor: 'teal',
    navItems: [
      { id: 'overview', label: 'لوحة التحكم', icon: LayoutDashboard },
      { id: 'received', label: 'الاستلام (Received)', icon: ShoppingBag },
      { id: 'processing', label: 'التشغيل (Washing)', icon: Waves },
      { id: 'ironing', label: 'الكي والتجهيز', icon: Shirt },
      { id: 'ready', label: 'جاهز للتسليم', icon: CheckCircle },
      { id: 'delivery', label: 'التوصيل', icon: Truck },
      { id: 'subscriptions', label: 'الاشتراكات', icon: Ticket },
    ],
    stats: [
      { label: 'قطع مستلمة', value: '150', trend: 10, icon: Shirt },
      { label: 'في الغسيل', value: '45', trend: 5, icon: Waves },
      { label: 'جاهز للتسليم', value: '32', trend: 0, icon: CheckCircle },
      { label: 'مبيعات اليوم', value: '3,500 ج', trend: 12, icon: DollarSign },
    ],
    quickActions: [
      { label: 'استلام ملابس', icon: ShoppingBag, action: 'receive' },
      { label: 'تسليم عميل', icon: CheckCircle, action: 'deliver' },
      { label: 'طلب مستعجل', icon: Clock, action: 'urgent' },
      { label: 'اشتراك جديد', icon: Ticket, action: 'new_sub' },
      { label: 'طباعة تاج', icon: Tag, action: 'print_tag' },
    ],
    tableHeaders: ['رقم الإيصال', 'العميل', 'عدد القطع', 'المرحلة', 'الموعد', 'الحالة'],
    data: [
      { id: '#LND-101', col1: 'أحمد محمد', col2: '5 قطع', col3: 'غسيل', status: 'in_progress', time: 'اليوم 5 م' },
      { id: '#LND-102', col1: 'فندق النيل', col2: '50 قطعة', col3: 'كي وتجهيز', status: 'preparing', time: 'غداً 10 ص' },
      { id: '#LND-103', col1: 'سارة علي', col2: 'فستان سهرة', col3: 'جاهز', status: 'ready', time: 'جاهز' },
    ]
  },

  clothing: {
    type: 'clothing',
    title: 'فاشون ستايل (Fashion Style)',
    themeColor: 'pink',
    navItems: [
      { id: 'overview', label: 'نظرة عامة', icon: LayoutDashboard },
      { id: 'shop', label: 'المتجر (POS)', icon: Store },
      { id: 'products', label: 'المنتجات', icon: Shirt },
      { id: 'inventory', label: 'المخزون', icon: Layers },
      { id: 'customers', label: 'العملاء', icon: Users },
      { id: 'reports', label: 'المبيعات', icon: FileText },
    ],
    stats: [
      { label: 'مبيعات اليوم', value: '12,400 ج', trend: 18, icon: DollarSign },
      { label: 'قطع مباعة', value: '45', trend: 10, icon: Shirt },
      { label: 'نواقص المقاسات', value: '12', trend: -5, icon: Scissors },
      { label: 'عملاء جدد', value: '8', trend: 2, icon: Users },
    ],
    quickActions: [
      { label: 'بيع جديد', icon: ShoppingBag, action: 'new_sale' },
      { label: 'إضافة موديل', icon: Shirt, action: 'add_product' },
      { label: 'جرد سريع', icon: QrCode, action: 'stock_check' },
      { label: 'طباعة باركود', icon: Tag, action: 'print_barcode' },
      { label: 'مرتجع', icon: CheckCircle, action: 'return' },
    ],
    tableHeaders: ['رقم الفاتورة', 'العميل', 'عدد القطع', 'الإجمالي', 'الحالة', 'التاريخ'],
    data: [
      { id: '#INV-2024', col1: 'عميل نقدي', col2: '3 قطع', col3: '1,200 ج', status: 'paid', time: 'منذ 5 د' },
      { id: '#INV-2023', col1: 'منى أحمد', col2: '1 فستان', col3: '850 ج', status: 'paid', time: 'منذ ساعة' },
      { id: '#INV-2022', col1: 'علي حسن', col2: '2 بنطلون', col3: '900 ج', status: 'pending', time: 'منذ ساعتين' },
    ]
  },

  salon: {
    type: 'salon',
    title: 'صالون اللوتس للتجميل',
    themeColor: 'pink',
    navItems: [
      { id: 'overview', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'appointments', label: 'المواعيد', icon: Calendar },
      { id: 'pos', label: 'كاشير وخدمات', icon: DollarSign },
      { id: 'customers', label: 'العميلات', icon: Users },
      { id: 'staff', label: 'فريق العمل', icon: Sparkles },
      { id: 'inventory', label: 'المخزون', icon: Package },
    ],
    stats: [
      { label: 'مواعيد اليوم', value: '18', trend: 5, icon: Calendar },
      { label: 'مبيعات الخدمات', value: '3,200 ج', trend: 12, icon: DollarSign },
      { label: 'عميلات جدد', value: '4', trend: 0, icon: Users },
      { label: 'منتجات مباعة', value: '12', trend: -5, icon: ShoppingBag },
    ],
    quickActions: [
      { label: 'حجز موعد', icon: Calendar, action: 'book_appt' },
      { label: 'فاتورة خدمة', icon: DollarSign, action: 'new_sale' },
      { label: 'عميلة جديدة', icon: Users, action: 'new_client' },
      { label: 'إضافة منتج', icon: Package, action: 'add_product' },
    ],
    tableHeaders: ['رقم الحجز', 'العميلة', 'الخدمة', 'الموظفة', 'الموعد', 'الحالة'],
    data: [
      { id: '#APT-881', col1: 'سارة أحمد', col2: 'قص وسيشوار', col3: 'م. نادين', status: 'confirmed', time: '10:00 ص' },
      { id: '#APT-882', col1: 'هبة محمود', col2: 'صبغة شعر', col3: 'م. ريهام', status: 'in_progress', time: '11:30 ص' },
      { id: '#APT-883', col1: 'منى زكي', col2: 'مانيكير وباديكير', col3: 'م. سها', status: 'waiting', time: '12:00 م' },
    ]
  },

  pharmacy: {
    type: 'pharmacy',
    title: 'صيدلية الشفاء',
    themeColor: 'teal',
    navItems: [
      { id: 'overview', label: 'نظرة عامة', icon: LayoutDashboard },
      { id: 'pos', label: 'الكاشير (POS)', icon: ShoppingBag },
      { id: 'products', label: 'الأدوية والمخزون', icon: Pill },
      { id: 'suppliers', label: 'الموردين', icon: Truck },
      { id: 'customers', label: 'العملاء', icon: Users },
      { id: 'reports', label: 'التقارير', icon: FileText },
    ],
    stats: [
      { label: 'مبيعات اليوم', value: '8,500 ج', trend: 8, icon: DollarSign },
      { label: 'روشتات مصروفة', value: '45', trend: 12, icon: FileText },
      { label: 'أدوية تنفذ', value: '12', trend: -2, icon: AlertCircle },
      { label: 'عملاء جدد', value: '15', trend: 5, icon: Users },
    ],
    quickActions: [
      { label: 'بيع جديد', icon: ShoppingBag, action: 'new_sale' },
      { label: 'صرف روشتة', icon: FileText, action: 'dispense_rx' },
      { label: 'طلب نواقص', icon: Truck, action: 'order_stock' },
      { label: 'البدائل', icon: Tag, action: 'search_alternatives' },
    ],
    tableHeaders: ['رقم الفاتورة', 'العميل', 'عدد الأصناف', 'الإجمالي', 'طريقة الدفع', 'الحالة'],
    data: [
      { id: '#PH-101', col1: 'عميل نقدي', col2: '3 أدوية', col3: '450 ج', status: 'paid', time: 'منذ 10 د' },
      { id: '#PH-102', col1: 'أحمد محمد', col2: '1 دواء', col3: '85 ج', status: 'paid', time: 'منذ 30 د' },
      { id: '#PH-103', col1: 'شركة التأمين', col2: 'روشتة كاملة', col3: '1,200 ج', status: 'credit', time: 'منذ ساعة' },
    ]
  },

  plumbing: {
    type: 'plumbing',
    title: 'محل المواسير الذهبية',
    themeColor: 'blue',
    navItems: [
      { id: 'overview', label: 'لوحة التحكم', icon: LayoutDashboard },
      { id: 'products', label: 'المنتجات', icon: Package },
      { id: 'inventory', label: 'المخزون', icon: ClipboardList },
      { id: 'suppliers', label: 'الموردين', icon: Truck },
      { id: 'customers', label: 'العملاء', icon: Users },
      { id: 'orders', label: 'الطلبات والتوصيل', icon: ShoppingBag },
      { id: 'invoices', label: 'الفواتير', icon: FileText },
      { id: 'installations', label: 'تركيبات', icon: Wrench },
    ],
    stats: [
      { label: 'مبيعات اليوم', value: '12,500 ج', trend: 15, icon: DollarSign },
      { label: 'منتجات متاحة', value: '245', trend: 5, icon: Package },
      { label: 'طلبات اليوم', value: '18', trend: 12, icon: ShoppingBag },
      { label: 'تركيبات مجدولة', value: '6', trend: 8, icon: Wrench },
    ],
    quickActions: [
      { label: 'بيع جديد', icon: ShoppingBag, action: 'new_sale' },
      { label: 'إضافة منتج', icon: Package, action: 'add_product' },
      { label: 'طلب توريد', icon: Truck, action: 'order_supply' },
      { label: 'جدولة تركيب', icon: Calendar, action: 'schedule_install' },
      { label: 'فحص مخزون', icon: ClipboardList, action: 'check_stock' },
      { label: 'فاتورة عميل', icon: FileText, action: 'new_invoice' },
    ],
    tableHeaders: ['رقم الفاتورة', 'العميل', 'عدد الأصناف', 'الإجمالي', 'الحالة', 'التاريخ'],
    data: [
      { id: '#PL-101', col1: 'مقاول محمد', col2: '8 قطع', col3: '2,450 ج', status: 'paid', time: 'منذ 5 د' },
      { id: '#PL-102', col1: 'أحمد علي', col2: '3 قطع', col3: '850 ج', status: 'credit', time: 'منذ ساعة' },
      { id: '#PL-103', col1: 'شركة المباني', col2: '15 قطعة', col3: '5,200 ج', status: 'paid', time: 'منذ ساعتين' },
    ]
  },

  painting: {
    type: 'painting',
    title: 'دهانات الألوان المميزة',
    themeColor: 'purple',
    navItems: [
      { id: 'overview', label: 'لوحة التحكم', icon: LayoutDashboard },
      { id: 'products', label: 'الدهانات والألوان', icon: Package },
      { id: 'colors', label: 'مزج الألوان', icon: Droplets },
      { id: 'inventory', label: 'المخزون', icon: ClipboardList },
      { id: 'suppliers', label: 'الموردين', icon: Truck },
      { id: 'customers', label: 'العملاء', icon: Users },
      { id: 'orders', label: 'الطلبات', icon: ShoppingBag },
      { id: 'projects', label: 'مشاريع دهان', icon: PenTool },
    ],
    stats: [
      { label: 'مبيعات اليوم', value: '8,200 ج', trend: 10, icon: DollarSign },
      { label: 'ألوان متاحة', value: '156', trend: 8, icon: Droplets },
      { label: 'طلبات اليوم', value: '12', trend: 15, icon: ShoppingBag },
      { label: 'مشاريع نشطة', value: '4', trend: 2, icon: PenTool },
    ],
    quickActions: [
      { label: 'بيع دهان', icon: ShoppingBag, action: 'new_sale' },
      { label: 'مزج لون جديد', icon: Droplets, action: 'mix_color' },
      { label: 'إضافة منتج', icon: Package, action: 'add_product' },
      { label: 'طلب مشروع', icon: PenTool, action: 'new_project' },
      { label: 'فحص مخزون', icon: ClipboardList, action: 'check_stock' },
      { label: 'حاسبة كميات', icon: Calculator, action: 'calc_quantities' },
    ],
    tableHeaders: ['رقم الفاتورة', 'العميل', 'عدد الأصناف', 'الإجمالي', 'الحالة', 'التاريخ'],
    data: [
      { id: '#PT-101', col1: 'مقاول سالم', col2: '5 دلاء', col3: '1,800 ج', status: 'paid', time: 'منذ 10 د' },
      { id: '#PT-102', col1: 'أحمد خالد', col2: '2 لون', col3: '650 ج', status: 'paid', time: 'منذ ساعة' },
      { id: '#PT-103', col1: 'شركة الديكور', col2: '10 دلاء', col3: '3,200 ج', status: 'credit', time: 'منذ ساعتين' },
    ]
  },

  hardware: {
    type: 'hardware',
    title: 'الأدوات والمعدات المتخصصة',
    themeColor: 'gray',
    navItems: [
      { id: 'overview', label: 'لوحة التحكم', icon: LayoutDashboard },
      { id: 'products', label: 'الأدوات والمعدات', icon: Package },
      { id: 'inventory', label: 'المخزون', icon: ClipboardList },
      { id: 'suppliers', label: 'الموردين', icon: Truck },
      { id: 'customers', label: 'العملاء', icon: Users },
      { id: 'rentals', label: 'التأجير', icon: Clock },
      { id: 'repairs', label: 'الصيانة', icon: Wrench },
      { id: 'services', label: 'خدمات', icon: Settings },
    ],
    stats: [
      { label: 'مبيعات اليوم', value: '15,600 ج', trend: 12, icon: DollarSign },
      { label: 'أدوات متاحة', value: '320', trend: 3, icon: Package },
      { label: 'تأجير نشط', value: '8', trend: 5, icon: Clock },
      { label: 'صيانات اليوم', value: '4', trend: -2, icon: Wrench },
    ],
    quickActions: [
      { label: 'بيع أداة', icon: ShoppingBag, action: 'new_sale' },
      { label: 'تأجير عدة', icon: Clock, action: 'rent_tool' },
      { label: 'إصلاح عدة', icon: Wrench, action: 'repair_tool' },
      { label: 'إضافة منتج', icon: Package, action: 'add_product' },
      { label: 'طلب قطعة غيار', icon: Truck, action: 'order_part' },
      { label: 'جدول صيانة', icon: Calendar, action: 'maintenance_schedule' },
    ],
    tableHeaders: ['رقم الفاتورة', 'العميل', 'عدد الأصناف', 'الإجمالي', 'الحالة', 'التاريخ'],
    data: [
      { id: '#HW-101', col1: 'مقاول عماد', col2: '4 أدوات', col3: '3,200 ج', status: 'paid', time: 'منذ 15 د' },
      { id: '#HW-102', col1: 'فني أحمد', col2: '1 أداة', col3: '450 ج', status: 'paid', time: 'منذ ساعة' },
      { id: '#HW-103', col1: 'شركة الصيانة', col2: '8 أدوات', col3: '2,800 ج', status: 'paid', time: 'منذ ساعتين' },
    ]
  },

  electrical: {
    type: 'electrical',
    title: 'محل الكهرباء والإضاءة',
    themeColor: 'yellow',
    navItems: [
      { id: 'overview', label: 'لوحة التحكم', icon: LayoutDashboard },
      { id: 'products', label: 'المنتجات الكهربائية', icon: Package },
      { id: 'inventory', label: 'المخزون', icon: ClipboardList },
      { id: 'suppliers', label: 'الموردين', icon: Truck },
      { id: 'customers', label: 'العملاء', icon: Users },
      { id: 'installations', label: 'التركيبات', icon: Wrench },
      { id: 'maintenance', label: 'الصيانة', icon: Settings },
      { id: 'lighting', label: 'أنظمة الإضاءة', icon: Lightbulb },
      { id: 'settings', label: 'الإعدادات', icon: Settings },
    ],
    stats: [
      { label: 'مبيعات اليوم', value: '9,800 ج.م', trend: 8, icon: DollarSign },
      { label: 'منتجات متاحة', value: '180', trend: 6, icon: Package },
      { label: 'تركيبات اليوم', value: '5', trend: 10, icon: Wrench },
      { label: 'صيانات مجدولة', value: '3', trend: 0, icon: Settings },
    ],
    quickActions: [
      { label: 'بيع منتج', icon: ShoppingCart, action: 'sell_product' },
      { label: 'جدولة تركيب', icon: Calendar, action: 'schedule_installation' },
      { label: 'طلب صيانة', icon: Settings, action: 'request_maintenance' },
      { label: 'إضافة منتج', icon: Package, action: 'add_product' },
      { label: 'تصميم إضاءة', icon: Lightbulb, action: 'design_lighting' },
      { label: 'فحص كهرباء', icon: Zap, action: 'electrical_check' },
    ],
    tableHeaders: ['رقم الفاتورة', 'العميل', 'عدد الأصناف', 'الإجمالي', 'الحالة', 'التاريخ'],
    data: [
      { id: '#EL-101', col1: 'مقاول رامي', col2: '6 قطع', col3: '2,100 ج', status: 'paid', time: 'منذ 20 د' },
      { id: '#EL-102', col1: 'أحمد سالم', col2: '3 قطع', col3: '750 ج', status: 'paid', time: 'منذ ساعة' },
      { id: '#EL-103', col1: 'شركة الإنشاءات', col2: '10 قطع', col3: '4,200 ج', status: 'credit', time: 'منذ ساعتين' },
    ]
  },
  construction: {
    type: 'construction',
    title: 'إدارة مشاريع البناء',
    themeColor: 'yellow',
    navItems: [
      { id: 'overview', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'projects', label: 'المشاريع', icon: HardHat },
      { id: 'materials', label: 'المواد والمستلزمات', icon: Package },
      { id: 'schedule', label: 'جدول العمال', icon: Calendar },
      { id: 'team', label: 'فريق العمل', icon: Users },
      { id: 'alerts', label: 'التنبيهات', icon: AlertCircle },
      { id: 'invoices', label: 'الفواتير والعقود', icon: FileText },
    ],
    stats: [
      { label: 'المشاريع النشطة', value: '12', trend: 2, icon: HardHat },
      { label: 'العمال', value: '48', trend: 5, icon: Users },
      { label: 'المواد المتوفرة', value: '156', trend: 8, icon: Package },
      { label: 'التنبيهات', value: '3', trend: -1, icon: AlertCircle },
    ],
    quickActions: [
      { label: 'مشروع جديد', icon: Plus, action: 'new_project' },
      { label: 'إضافة مواد', icon: Package, action: 'add_materials' },
      { label: 'جدولة عمال', icon: Calendar, action: 'schedule_workers' },
      { label: 'فاتورة جديدة', icon: FileText, action: 'new_invoice' },
    ],
    tableHeaders: ['المشروع', 'التقدم', 'العمال', 'المواد', 'الحالة'],
    data: [
      { id: 'PRJ-001', col1: 'مشروع سكني #1', col2: '65%', col3: '12', col4: '450 وحدة', status: 'in_progress' },
      { id: 'PRJ-002', col1: 'مشروع تجاري #2', col2: '45%', col3: '18', col4: '200 وحدة', status: 'active' },
      { id: 'PRJ-003', col1: 'مشروع إداري #3', col2: '80%', col3: '8', col4: '100 وحدة', status: 'in_progress' },
    ]
  },
  carwash: {
    type: 'carwash',
    title: 'محطة غسيل السيارات',
    themeColor: 'cyan',
    navItems: [
      { id: 'overview', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'bookings', label: 'الحجوزات', icon: Calendar },
      { id: 'services', label: 'الخدمات', icon: Zap },
      { id: 'staff', label: 'الموظفين', icon: Users },
      { id: 'orders', label: 'الطلبات', icon: ClipboardList },
      { id: 'loyalty', label: 'برنامج الولاء', icon: Star },
      { id: 'invoices', label: 'الفواتير', icon: FileText },
    ],
    stats: [
      { label: 'الحجوزات اليوم', value: '24', trend: 8, icon: Calendar },
      { label: 'الموظفين', value: '8', trend: 0, icon: Users },
      { label: 'الخدمات', value: '6', trend: 2, icon: Zap },
      { label: 'الإيرادات', value: '2,450 ج', trend: 12, icon: DollarSign },
    ],
    quickActions: [
      { label: 'حجز جديد', icon: Calendar, action: 'new_booking' },
      { label: 'إضافة خدمة', icon: Plus, action: 'add_service' },
      { label: 'تسجيل موظف', icon: Users, action: 'add_staff' },
      { label: 'فاتورة', icon: FileText, action: 'new_invoice' },
    ],
    tableHeaders: ['الحجز', 'السيارة', 'الخدمة', 'الوقت', 'الحالة'],
    data: [
      { id: 'BK-001', col1: 'سيارة #1', col2: 'غسيل كامل', col3: '10:00 صباحاً', status: 'confirmed' },
      { id: 'BK-002', col1: 'سيارة #2', col2: 'غسيل سريع', col3: '11:30 صباحاً', status: 'pending' },
      { id: 'BK-003', col1: 'سيارة #3', col2: 'تلميع', col3: '02:00 مساءً', status: 'confirmed' },
    ]
  },
  logistics: {
    type: 'logistics',
    title: 'إدارة الشحن واللوجستيات',
    themeColor: 'green',
    navItems: [
      { id: 'overview', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'shipments', label: 'الشحنات', icon: Package },
      { id: 'fleet', label: 'الأسطول', icon: Truck },
      { id: 'tracking', label: 'التتبع', icon: Map },
      { id: 'drivers', label: 'السائقين', icon: Users },
      { id: 'issues', label: 'المشاكل', icon: AlertCircle },
      { id: 'invoices', label: 'الفواتير', icon: FileText },
    ],
    stats: [
      { label: 'الشحنات النشطة', value: '156', trend: 12, icon: Package },
      { label: 'السيارات', value: '24', trend: 0, icon: Truck },
      { label: 'السائقين', value: '32', trend: 3, icon: Users },
      { label: 'التأخيرات', value: '2', trend: -1, icon: AlertCircle },
    ],
    quickActions: [
      { label: 'شحنة جديدة', icon: Package, action: 'new_shipment' },
      { label: 'تتبع شحنة', icon: Map, action: 'track_shipment' },
      { label: 'إضافة سائق', icon: Users, action: 'add_driver' },
      { label: 'تقرير', icon: FileText, action: 'generate_report' },
    ],
    tableHeaders: ['الشحنة', 'المصدر', 'الوجهة', 'الحالة', 'التقدم'],
    data: [
      { id: 'SHP-001', col1: 'القاهرة', col2: 'الإسكندرية', col3: 'قيد التوصيل', col4: '75%' },
      { id: 'SHP-002', col1: 'الجيزة', col2: 'الفيوم', col3: 'قيد التوصيل', col4: '45%' },
      { id: 'SHP-003', col1: 'القاهرة', col2: 'السويس', col3: 'في الطريق', col4: '60%' },
    ]
  },
  agriculture: {
    type: 'agriculture',
    title: 'إدارة المزارع والزراعة',
    themeColor: 'green',
    navItems: [
      { id: 'overview', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'crops', label: 'المحاصيل', icon: Leaf },
      { id: 'irrigation', label: 'الري', icon: Droplets },
      { id: 'productivity', label: 'الإنتاجية', icon: TrendingUp },
      { id: 'issues', label: 'المشاكل', icon: AlertCircle },
      { id: 'staff', label: 'الموظفين', icon: Users },
      { id: 'sales', label: 'المبيعات', icon: FileText },
    ],
    stats: [
      { label: 'المحاصيل النشطة', value: '8', trend: 2, icon: Leaf },
      { label: 'المساحة المزروعة', value: '45 فدان', trend: 5, icon: TrendingUp },
      { label: 'الري اليومي', value: '2,400 م³', trend: 8, icon: Droplets },
      { label: 'الإنتاجية', value: '85%', trend: 3, icon: CheckCircle },
    ],
    quickActions: [
      { label: 'محصول جديد', icon: Plus, action: 'new_crop' },
      { label: 'جدولة ري', icon: Droplets, action: 'schedule_irrigation' },
      { label: 'تقرير إنتاجية', icon: FileText, action: 'productivity_report' },
      { label: 'تسجيل عامل', icon: Users, action: 'add_staff' },
    ],
    tableHeaders: ['المحصول', 'الحالة', 'المساحة', 'التقدم', 'الحصاد المتوقع'],
    data: [
      { id: 'CRP-001', col1: 'القمح', col2: 'نمو', col3: '15 فدان', col4: '65%', status: 'growing' },
      { id: 'CRP-002', col1: 'الذرة', col2: 'حصاد قريب', col3: '20 فدان', col4: '90%', status: 'ready' },
      { id: 'CRP-003', col1: 'الطماطم', col2: 'إثمار', col3: '10 فدان', col4: '45%', status: 'fruiting' },
    ]
  },
  mobileLaundry: {
    type: 'mobileLaundry',
    title: 'إدارة الغسيل المتنقل',
    themeColor: 'purple',
    navItems: [
      { id: 'overview', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'bookings', label: 'الحجوزات', icon: Calendar },
      { id: 'delivery', label: 'الاستلام والتسليم', icon: Truck },
      { id: 'staff', label: 'الموظفين', icon: Users },
      { id: 'orders', label: 'الطلبات', icon: ClipboardList },
      { id: 'services', label: 'الخدمات', icon: Settings },
      { id: 'invoices', label: 'الفواتير', icon: FileText },
    ],
    stats: [
      { label: 'الحجوزات اليوم', value: '18', trend: 6, icon: Calendar },
      { label: 'الموظفين', value: '6', trend: 1, icon: Users },
      { label: 'الخدمات', value: '5', trend: 0, icon: Settings },
      { label: 'الإيرادات', value: '1,850 ج', trend: 10, icon: DollarSign },
    ],
    quickActions: [
      { label: 'حجز جديد', icon: Calendar, action: 'new_booking' },
      { label: 'استلام', icon: Truck, action: 'new_pickup' },
      { label: 'تسليم', icon: Truck, action: 'new_delivery' },
      { label: 'فاتورة', icon: FileText, action: 'new_invoice' },
    ],
    tableHeaders: ['الحجز', 'العميل', 'الخدمة', 'الحالة', 'الموعد'],
    data: [
      { id: 'BK-001', col1: 'أحمد محمد', col2: 'غسيل وكي', col3: 'قيد الاستلام', col4: '10:00 صباحاً' },
      { id: 'BK-002', col1: 'فاطمة علي', col2: 'غسيل فقط', col3: 'قيد المعالجة', col4: '02:00 مساءً' },
      { id: 'BK-003', col1: 'محمود سالم', col2: 'كي فقط', col3: 'جاهز للتسليم', col4: '04:00 مساءً' },
    ]
  },
  admin: {
    type: 'admin',
    title: 'مركز التحكم الإداري',
    themeColor: 'slate',
    navItems: [
      { id: 'overview', label: 'لوحة التحكم', icon: LayoutDashboard },
      { id: 'users', label: 'المستخدمين والصلاحيات', icon: Users },
      { id: 'roles', label: 'الأدوار والمجموعات', icon: Shield },
      { id: 'reports', label: 'التقارير المجمعة', icon: FileText },
      { id: 'analytics', label: 'التحليلات والإحصائيات', icon: BarChart3 },
      { id: 'performance', label: 'الأداء والمؤشرات', icon: TrendingUp },
      { id: 'shipping', label: 'إدارة الشحنات', icon: Truck },
      { id: 'delivery', label: 'التوصيل والتوزيع', icon: Map },
      { id: 'warehouses', label: 'المخازن والمستودعات', icon: Warehouse },
      { id: 'settings', label: 'إعدادات النظام', icon: Settings },
      { id: 'alerts', label: 'التنبيهات والإنذارات', icon: AlertCircle },
      { id: 'audit', label: 'سجل النشاطات', icon: Clock },
    ],
    stats: [
      { label: 'إجمالي المستخدمين', value: '1,245', trend: 12, icon: Users },
      { label: 'الأنشطة التجارية', value: '20', trend: 8, icon: Shield },
      { label: 'إجمالي الإيرادات', value: '2.8M ج', trend: 18, icon: DollarSign },
      { label: 'الشحنات النشطة', value: '156', trend: -5, icon: Truck },
    ],
    quickActions: [
      { label: 'إدارة المستخدمين', icon: Users, action: 'manage_users' },
      { label: 'التقارير المجمعة', icon: FileText, action: 'generate_reports' },
      { label: 'إدارة الشحنات', icon: Truck, action: 'manage_shipping' },
      { label: 'التوصيل والتوزيع', icon: Map, action: 'manage_delivery' },
      { label: 'إعدادات النظام', icon: Settings, action: 'system_settings' },
      { label: 'سجل النشاطات', icon: Clock, action: 'audit_logs' },
    ],
    tableHeaders: ['المعرف', 'النوع', 'الحالة', 'المستخدم', 'الوقت', 'الإجراءات'],
    data: [
      { id: 'LOG-001', col1: 'security', col2: 'success', col3: 'أحمد محمد', col4: '10:30', col5: 'عرض' },
      { id: 'LOG-002', col1: 'data', col2: 'success', col3: 'سارة أحمد', col4: '09:15', col5: 'عرض' },
      { id: 'LOG-003', col1: 'system', col2: 'info', col3: 'النظام', col4: '08:00', col5: 'عرض' },
    ]
  },
  
  // أنظمة الحجوزات الإضافية
  subscriptions: {
    type: 'subscriptions',
    title: 'لوحة تحكم إدارة الاشتراكات',
    themeColor: 'purple',
    navItems: [
      { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'subscriptions', label: 'الاشتراكات', icon: Calendar },
      { id: 'customers', label: 'العملاء', icon: Users },
      { id: 'billing', label: 'الفواتير', icon: FileText },
      { id: 'reports', label: 'التقارير', icon: BarChart3 },
      { id: 'settings', label: 'الإعدادات', icon: Settings },
    ],
    stats: [
      { label: 'إجمالي الاشتراكات', value: '1,234', trend: 12.5, icon: Users },
      { label: 'الإيرادات الشهرية', value: '45,678 ج.م', trend: 8.2, icon: DollarSign },
      { label: 'تجديدات اليوم', value: '89', trend: 15.3, icon: RefreshCw },
      { label: 'الإلغاءات', value: '12', trend: -3.1, icon: XCircle },
    ],
    quickActions: [
      { label: 'اشتراك جديد', icon: Plus, action: 'new_subscription' },
      { label: 'تجديد اشتراك', icon: RefreshCw, action: 'renew_subscription' },
      { label: 'إرسال فواتير', icon: FileText, action: 'send_invoices' },
      { label: 'تقارير الإيرادات', icon: BarChart3, action: 'revenue_reports' },
    ],
    tableHeaders: ['المعرف', 'العميل', 'النوع', 'الحالة', 'التجديد التالي', 'الإجراءات'],
    data: [
      { id: 'SUB-001', col1: 'أحمد محمد', col2: 'شهري', col3: 'نشط', col4: '2024-12-01', col5: 'عرض' },
      { id: 'SUB-002', col1: 'سارة أحمد', col2: 'سنوي', col3: 'نشط', col4: '2025-06-01', col5: 'عرض' },
      { id: 'SUB-003', col1: 'محمد علي', col2: 'شهري', col3: 'منتهي', col4: '2024-10-15', col5: 'عرض' },
    ]
  },
  
  nursery: {
    type: 'nursery',
    title: 'لوحة تحكم الحضانة',
    themeColor: 'pink',
    navItems: [
      { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'children', label: 'الأطفال', icon: Baby },
      { id: 'attendance', label: 'الحضور', icon: CheckCircle },
      { id: 'activities', label: 'الأنشطة', icon: Activity },
      { id: 'parents', label: 'الأهل', icon: Users },
      { id: 'reports', label: 'التقارير', icon: FileText },
    ],
    stats: [
      { label: 'إجمالي الأطفال', value: '89', trend: 5.2, icon: Baby },
      { label: 'الحضور اليوم', value: '76', trend: 2.1, icon: CheckCircle },
      { label: 'الأنشطة هذا الأسبوع', value: '12', trend: 8.7, icon: Activity },
      { label: 'المعلمون', value: '15', trend: 0, icon: Users },
    ],
    quickActions: [
      { label: 'تسجيل طفل جديد', icon: Plus, action: 'add_child' },
      { label: 'تسجيل الحضور', icon: CheckCircle, action: 'mark_attendance' },
      { label: 'جدولة نشاط', icon: Calendar, action: 'schedule_activity' },
      { label: 'إبلاغ الأهل', icon: Bell, action: 'notify_parents' },
    ],
    tableHeaders: ['اسم الطفل', 'العمر', 'الحالة', 'الحضور', 'ولي الأمر', 'الإجراءات'],
    data: [
      { id: 'CH-001', col1: 'أحمد محمد', col2: '4 سنوات', col3: 'نشط', col4: 'حاضر', col5: 'الأب', col6: 'عرض' },
      { id: 'CH-002', col1: 'مريم أحمد', col2: '3 سنوات', col3: 'نشط', col4: 'حاضر', col5: 'الأم', col6: 'عرض' },
      { id: 'CH-003', col1: 'علي خالد', col2: '5 سنوات', col3: 'نشط', col4: 'غائب', col5: 'الأب', col6: 'عرض' },
    ]
  },
  
  carWash: {
    type: 'carWash',
    title: 'لوحة تحكم مغسلة السيارات',
    themeColor: 'blue',
    navItems: [
      { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'bookings', label: 'الحجوزات', icon: Calendar },
      { id: 'services', label: 'الخدمات', icon: Car },
      { id: 'customers', label: 'العملاء', icon: Users },
      { id: 'employees', label: 'الموظفون', icon: Users },
      { id: 'reports', label: 'التقارير', icon: FileText },
    ],
    stats: [
      { label: 'الحجوزات اليوم', value: '45', trend: 12.3, icon: Calendar },
      { label: 'الإيرادات اليوم', value: '2,340 ج.م', trend: 8.7, icon: DollarSign },
      { label: 'الخدمات المنجزة', value: '38', trend: 5.2, icon: CheckCircle },
      { label: 'العملاء الجدد', value: '7', trend: 15.8, icon: Users },
    ],
    quickActions: [
      { label: 'حجز جديد', icon: Plus, action: 'new_booking' },
      { label: 'بدء خدمة', icon: Car, action: 'start_service' },
      { label: 'إضافة عميل', icon: Users, action: 'add_customer' },
      { label: 'تقرير اليوم', icon: FileText, action: 'daily_report' },
    ],
    tableHeaders: ['المعرف', 'العميل', 'السيارة', 'الخدمة', 'الحالة', 'الوقت', 'الإجراءات'],
    data: [
      { id: 'BW-001', col1: 'أحمد محمد', col2: 'بيجو 208', col3: 'غسيل كامل', col4: 'قيد التنفيذ', col5: '10:30', col6: 'عرض' },
      { id: 'BW-002', col1: 'سارة أحمد', col2: 'تويوتا يارس', col3: 'تنظيف داخلي', col4: 'مكتمل', col5: '09:15', col6: 'عرض' },
      { id: 'BW-003', col1: 'محمد علي', col2: 'هيونداي إلنترا', col3: 'واكس', col4: 'في الانتظار', col5: '11:00', col6: 'عرض' },
    ]
  },
  
  academy: {
    type: 'academy',
    title: 'لوحة تحكم الأكاديمية',
    themeColor: 'orange',
    navItems: [
      { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'members', label: 'الأعضاء', icon: Users },
      { id: 'trainers', label: 'المدربون', icon: Dumbbell },
      { id: 'schedule', label: 'الجدول', icon: Calendar },
      { id: 'competitions', label: 'المسابقات', icon: Trophy },
      { id: 'reports', label: 'التقارير', icon: FileText },
    ],
    stats: [
      { label: 'إجمالي الأعضاء', value: '234', trend: 8.4, icon: Users },
      { label: 'المدربون', value: '12', trend: 0, icon: Dumbbell },
      { label: 'حصص اليوم', value: '18', trend: 3.2, icon: Calendar },
      { label: 'المسابقات النشطة', value: '3', trend: 50.0, icon: Trophy },
    ],
    quickActions: [
      { label: 'تسجيل عضو جديد', icon: Plus, action: 'new_member' },
      { label: 'جدولة حصة', icon: Calendar, action: 'schedule_session' },
      { label: 'إنشاء مسابقة', icon: Trophy, action: 'create_competition' },
      { label: 'تقرير التقدم', icon: FileText, action: 'progress_report' },
    ],
    tableHeaders: ['العضو', 'النوع', 'المدرب', 'الحصة', 'الوقت', 'الحالة', 'الإجراءات'],
    data: [
      { id: 'MB-001', col1: 'أحمد محمد', col2: 'عضوية ذهبية', col3: 'خالد أحمد', col4: 'كرة قدم', col5: '16:00', col6: 'حاضر', col7: 'عرض' },
      { id: 'MB-002', col1: 'سارة أحمد', col2: 'عضوية فضية', col3: 'مريم علي', col4: 'يوغا', col5: '17:00', col6: 'حاضر', col7: 'عرض' },
      { id: 'MB-003', col1: 'محمد علي', col3: 'عضوية برونزية', col4: 'كمال أجسام', col5: '18:00', col6: 'غائب', col7: 'عرض' },
    ]
  },
  
  medical: {
    type: 'medical',
    title: 'لوحة تحكم المجمع الطبي',
    themeColor: 'red',
    navItems: [
      { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'doctors', label: 'الأطباء', icon: Stethoscope },
      { id: 'patients', label: 'المرضى', icon: Heart },
      { id: 'appointments', label: 'المواعيد', icon: Calendar },
      { id: 'pharmacy', label: 'الصيدلية', icon: Pill },
      { id: 'records', label: 'السجلات', icon: FileText },
    ],
    stats: [
      { label: 'الأطباء', value: '45', trend: 2.1, icon: Stethoscope },
      { label: 'المواعيد اليوم', value: '128', trend: 5.7, icon: Calendar },
      { label: 'المرضى النشطين', value: '3,456', trend: 8.3, icon: Heart },
      { label: 'الأدوية في المخزون', value: '892', trend: -2.4, icon: Pill },
    ],
    quickActions: [
      { label: 'موعد جديد', icon: Plus, action: 'new_appointment' },
      { label: 'تسجيل مريض', icon: Heart, action: 'register_patient' },
      { label: 'صرف دواء', icon: Pill, action: 'dispense_medication' },
      { label: 'تقرير طبي', icon: FileText, action: 'medical_report' },
    ],
    tableHeaders: ['المريض', 'الطبيب', 'العيادة', 'الموعد', 'الحالة', 'الإجراءات'],
    data: [
      { id: 'PT-001', col1: 'أحمد محمد', col2: 'د. خالد أحمد', col3: 'باطنة', col4: '10:30', col5: 'في الانتظار', col6: 'عرض' },
      { id: 'PT-002', col1: 'سارة أحمد', col2: 'د. مريم علي', col3: 'جلدية', col4: '11:00', col5: 'مكتمل', col6: 'عرض' },
      { id: 'PT-003', col1: 'محمد علي', col2: 'د. علي خالد', col3: 'عظام', col4: '14:00', col5: 'حجز', col6: 'عرض' },
    ]
  },
  
  legal: {
    type: 'legal',
    title: 'لوحة تحكم مكتب محاماة',
    themeColor: 'gray',
    navItems: [
      { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'cases', label: 'القضايا', icon: FileText },
      { id: 'clients', label: 'العملاء', icon: Users },
      { id: 'hearings', label: 'الجلسات', icon: Calendar },
      { id: 'documents', label: 'الوثائق', icon: FileText },
      { id: 'billing', label: 'الفواتير', icon: DollarSign },
    ],
    stats: [
      { label: 'القضايا النشطة', value: '67', trend: 4.2, icon: FileText },
      { label: 'العملاء', value: '234', trend: 7.8, icon: Users },
      { label: 'الجلسات هذا الشهر', value: '28', trend: 12.5, icon: Calendar },
      { label: 'الإيرادات الشهرية', value: '89,456 ج.م', trend: 9.3, icon: DollarSign },
    ],
    quickActions: [
      { label: 'قضية جديدة', icon: Plus, action: 'new_case' },
      { label: 'جدولة جلسة', icon: Calendar, action: 'schedule_hearing' },
      { label: 'إعداد عقد', icon: FileText, action: 'prepare_contract' },
      { label: 'فاتورة جديدة', icon: DollarSign, action: 'new_invoice' },
    ],
    tableHeaders: ['رقم القضية', 'العميل', 'النوع', 'المحامي', 'الحالة', 'الجلسة التالية', 'الإجراءات'],
    data: [
      { id: 'CS-001', col1: 'أحمد محمد', col2: 'مدني', col3: 'خالد أحمد', col4: 'نشط', col5: '2024-11-15', col6: 'عرض' },
      { id: 'CS-002', col1: 'سارة أحمد', col2: 'تجاري', col3: 'مريم علي', col4: 'نشط', col5: '2024-11-20', col6: 'عرض' },
      { id: 'CS-003', col1: 'محمد علي', col3: 'جنائي', col4: 'علي خالد', col5: 'مكتمل', col6: '2024-10-30', col7: 'عرض' },
    ]
  },
  
  consulting: {
    type: 'consulting',
    title: 'لوحة تحكم شركة استشارية',
    themeColor: 'indigo',
    navItems: [
      { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'projects', label: 'المشاريع', icon: Briefcase },
      { id: 'clients', label: 'العملاء', icon: Users },
      { id: 'team', label: 'الفريق', icon: Users },
      { id: 'reports', label: 'التقارير', icon: FileText },
      { id: 'billing', label: 'الفواتير', icon: DollarSign },
    ],
    stats: [
      { label: 'المشاريع النشطة', value: '23', trend: 6.7, icon: Briefcase },
      { label: 'العملاء', value: '89', trend: 4.2, icon: Users },
      { label: 'أعضاء الفريق', value: '34', trend: 8.9, icon: Users },
      { label: 'الإيرادات الشهرية', value: '234,567 ج.م', trend: 12.4, icon: DollarSign },
    ],
    quickActions: [
      { label: 'مشروع جديد', icon: Plus, action: 'new_project' },
      { label: 'تقرير المشروع', icon: FileText, action: 'project_report' },
      { label: 'فاتورة جديدة', icon: DollarSign, action: 'new_invoice' },
      { label: 'اجتماع فريق', icon: Users, action: 'team_meeting' },
    ],
    tableHeaders: ['المشروع', 'العميل', 'الفريق', 'الحالة', 'التسليم', 'الإجراءات'],
    data: [
      { id: 'PRJ-001', col1: 'أحمد محمد', col2: 'فريق A', col3: 'قيد التنفيذ', col4: '2024-12-15', col5: 'عرض' },
      { id: 'PRJ-002', col1: 'سارة أحمد', col2: 'فريق B', col3: 'قيد التنفيذ', col4: '2024-11-30', col5: 'عرض' },
      { id: 'PRJ-003', col1: 'محمد علي', col3: 'فريق C', col4: 'مكتمل', col5: '2024-10-20', col6: 'عرض' },
    ]
  },
  
  resorts: {
    type: 'resorts',
    title: 'لوحة تحكم المنتجع',
    themeColor: 'teal',
    navItems: [
      { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'units', label: 'الوحدات', icon: Home },
      { id: 'bookings', label: 'الحجوزات', icon: Calendar },
      { id: 'guests', label: 'النزلاء', icon: Users },
      { id: 'services', label: 'الخدمات', icon: Sparkles },
      { id: 'reports', label: 'التقارير', icon: FileText },
    ],
    stats: [
      { label: 'الوحدات الإجمالية', value: '45', trend: 0, icon: Home },
      { label: 'الوحدات المحجوزة', value: '38', trend: 5.2, icon: Calendar },
      { label: 'النزلاء الحاليين', value: '89', trend: 8.7, icon: Users },
      { label: 'الإشغال', value: '84%', trend: 2.1, icon: TrendingUp },
    ],
    quickActions: [
      { label: 'حجز جديد', icon: Plus, action: 'new_booking' },
      { label: 'تسجيل نزيل', icon: Users, action: 'check_in_guest' },
      { label: 'تنظيف وحدة', icon: Sparkles, action: 'clean_unit' },
      { label: 'تقرير الإشغال', icon: FileText, action: 'occupancy_report' },
    ],
    tableHeaders: ['الوحدة', 'النوع', 'النزيل', 'الحالة', 'المدة', 'الإجراءات'],
    data: [
      { id: 'UNT-001', col1: 'جناح فاخر', col2: 'أحمد محمد', col3: 'محجوز', col4: '3 أيام', col5: 'عرض' },
      { id: 'UNT-002', col1: 'غرفة مزدوجة', col2: 'سارة أحمد', col3: 'محجوز', col4: '2 أيام', col5: 'عرض' },
      { id: 'UNT-003', col1: 'شاليه', col3: 'متاح', col4: '-', col5: 'عرض' },
    ]
  },
  
  // أنظمة الخدمات الإضافية
  cleaning: {
    type: 'cleaning',
    title: 'لوحة تحكم شركة تنظيف',
    themeColor: 'green',
    navItems: [
      { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'teams', label: 'الفرق', icon: Users },
      { id: 'bookings', label: 'الحجوزات', icon: Calendar },
      { id: 'customers', label: 'العملاء', icon: Users },
      { id: 'materials', label: 'المواد', icon: Package },
      { id: 'reports', label: 'التقارير', icon: FileText },
    ],
    stats: [
      { label: 'الفرق النشطة', value: '12', trend: 3.2, icon: Users },
      { label: 'الحجوزات اليوم', value: '28', trend: 7.8, icon: Calendar },
      { label: 'العملاء', value: '156', trend: 5.4, icon: Users },
      { label: 'رضا العملاء', value: '4.8/5', trend: 0.1, icon: Star },
    ],
    quickActions: [
      { label: 'حجز جديد', icon: Plus, action: 'new_booking' },
      { label: 'توزيع فريق', icon: Users, action: 'assign_team' },
      { label: 'طلب مواد', icon: Package, action: 'request_materials' },
      { label: 'تقرير الجودة', icon: FileText, action: 'quality_report' },
    ],
    tableHeaders: ['الحجز', 'العميل', 'الفريق', 'الخدمة', 'الحالة', 'الوقت', 'الإجراءات'],
    data: [
      { id: 'BK-001', col1: 'أحمد محمد', col2: 'فريق A', col3: 'تنظيف كامل', col4: 'قيد التنفيذ', col5: '10:30', col6: 'عرض' },
      { id: 'BK-002', col1: 'سارة أحمد', col2: 'فريق B', col3: 'تنظيف نوافذ', col4: 'مكتمل', col5: '09:15', col6: 'عرض' },
      { id: 'BK-003', col1: 'محمد علي', col3: 'فريق C', col4: 'تنظيف سجاد', col5: 'في الانتظار', col6: '11:00', col7: 'عرض' },
    ]
  },
  
  maintenance: {
    type: 'maintenance',
    title: 'لوحة تحكم شركة صيانة',
    themeColor: 'orange',
    navItems: [
      { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'technicians', label: 'الفنيون', icon: Wrench },
      { id: 'jobs', label: 'الأعمال', icon: Briefcase },
      { id: 'parts', label: 'القطع الغيار', icon: Package },
      { id: 'customers', label: 'العملاء', icon: Users },
      { id: 'reports', label: 'التقارير', icon: FileText },
    ],
    stats: [
      { label: 'الفنيون', value: '18', trend: 2.1, icon: Wrench },
      { label: 'الأعمال اليوم', value: '34', trend: 8.7, icon: Briefcase },
      { label: 'القطع الغيار', value: '456', trend: -3.2, icon: Package },
      { label: 'العملاء', value: '234', trend: 5.4, icon: Users },
    ],
    quickActions: [
      { label: 'عمل جديد', icon: Plus, action: 'new_job' },
      { label: 'توزيع فني', icon: Wrench, action: 'assign_technician' },
      { label: 'طلب قطعة', icon: Package, action: 'request_part' },
      { label: 'تقرير الصيانة', icon: FileText, action: 'maintenance_report' },
    ],
    tableHeaders: ['العمل', 'العميل', 'الفني', 'الحالة', 'القطع', 'الوقت', 'الإجراءات'],
    data: [
      { id: 'JB-001', col1: 'أحمد محمد', col2: 'خالد أحمد', col3: 'قيد التنفيذ', col4: 'مروحة', col5: '10:30', col6: 'عرض' },
      { id: 'JB-002', col1: 'سارة أحمد', col2: 'مريم علي', col3: 'مكتمل', col4: 'مكيف', col5: '09:15', col6: 'عرض' },
      { id: 'JB-003', col1: 'محمد علي', col3: 'علي خالد', col4: 'في الانتظار', col5: 'ثلاجة', col6: '11:00', col7: 'عرض' },
    ]
  },
  
  delivery: {
    type: 'delivery',
    title: 'لوحة تحكم خدمة توصيل',
    themeColor: 'blue',
    navItems: [
      { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'orders', label: 'الطلبات', icon: Package },
      { id: 'drivers', label: 'المندوبون', icon: Truck },
      { id: 'routes', label: 'المسارات', icon: Map },
      { id: 'customers', label: 'العملاء', icon: Users },
      { id: 'reports', label: 'التقارير', icon: FileText },
    ],
    stats: [
      { label: 'الطلبات اليوم', value: '156', trend: 12.4, icon: Package },
      { label: 'المندوبون', value: '23', trend: 4.2, icon: Truck },
      { label: 'التوصيلات المكتملة', value: '134', trend: 8.7, icon: CheckCircle },
      { label: 'متوسط وقت التوصيل', value: '35 دقيقة', trend: -5.2, icon: Clock },
    ],
    quickActions: [
      { label: 'طلب جديد', icon: Plus, action: 'new_order' },
      { label: 'توزيع مندوب', icon: Truck, action: 'assign_driver' },
      { label: 'تحسين مسار', icon: Map, action: 'optimize_route' },
      { label: 'تتبع الطلبات', icon: Package, action: 'track_orders' },
    ],
    tableHeaders: ['الطلب', 'العميل', 'المندوب', 'الحالة', 'العنوان', 'الوقت', 'الإجراءات'],
    data: [
      { id: 'ORD-001', col1: 'أحمد محمد', col2: 'خالد أحمد', col3: 'قيد التوصيل', col4: 'القاهرة', col5: '10:30', col6: 'عرض' },
      { id: 'ORD-002', col1: 'سارة أحمد', col2: 'مريم علي', col3: 'مكتمل', col4: 'الجيزة', col5: '09:15', col6: 'عرض' },
      { id: 'ORD-003', col1: 'محمد علي', col3: 'علي خالد', col4: 'في الانتظار', col5: 'الإسكندرية', col6: '11:00', col7: 'عرض' },
    ]
  },
  
  dryCleaning: {
    type: 'dryCleaning',
    title: 'لوحة تحكم دراي كلين',
    themeColor: 'cyan',
    navItems: [
      { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'orders', label: 'الطلبات', icon: Package },
      { id: 'items', label: 'الملابس', icon: Shirt },
      { id: 'services', label: 'الخدمات', icon: Droplets },
      { id: 'customers', label: 'العملاء', icon: Users },
      { id: 'reports', label: 'التقارير', icon: FileText },
    ],
    stats: [
      { label: 'الطلبات اليوم', value: '89', trend: 7.8, icon: Package },
      { label: 'الملابس قيد المعالجة', value: '234', trend: 5.2, icon: Shirt },
      { label: 'الخدمات المنجزة', value: '156', trend: 8.9, icon: CheckCircle },
      { label: 'العملاء', value: '456', trend: 3.4, icon: Users },
    ],
    quickActions: [
      { label: 'استلام ملابس', icon: Plus, action: 'receive_items' },
      { label: 'بدء معالجة', icon: Droplets, action: 'start_processing' },
      { label: 'تسليم', icon: Package, action: 'deliver_items' },
      { label: 'تقرير الجودة', icon: FileText, action: 'quality_report' },
    ],
    tableHeaders: ['الطلب', 'العميل', 'الخدمة', 'الملابس', 'الحالة', 'التسليم', 'الإجراءات'],
    data: [
      { id: 'DRY-001', col1: 'أحمد محمد', col2: 'غسيل جاف', col3: '5 قطع', col4: 'قيد المعالجة', col5: 'غداً', col6: 'عرض' },
      { id: 'DRY-002', col1: 'سارة أحمد', col2: 'كي', col3: '3 قطع', col4: 'مكتمل', col5: 'اليوم', col6: 'عرض' },
      { id: 'DRY-003', col1: 'محمد علي', col3: 'غسيل وكي', col4: '8 قطع', col5: 'في الانتظار', col6: 'بعد غد', col7: 'عرض' },
    ]
  },
  
  homeServices: {
    type: 'homeServices',
    title: 'لوحة تحكم الخدمات المنزلية',
    themeColor: 'green',
    navItems: [
      { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'technicians', label: 'الفنيون', icon: Wrench },
      { id: 'services', label: 'الخدمات', icon: Home },
      { id: 'bookings', label: 'الحجوزات', icon: Calendar },
      { id: 'customers', label: 'العملاء', icon: Users },
      { id: 'reports', label: 'التقارير', icon: FileText },
    ],
    stats: [
      { label: 'الفنيون', value: '34', trend: 5.2, icon: Wrench },
      { label: 'الحجوزات اليوم', value: '67', trend: 8.7, icon: Calendar },
      { label: 'الخدمات المتاحة', value: '12', trend: 0, icon: Home },
      { label: 'العملاء', value: '234', trend: 6.4, icon: Users },
    ],
    quickActions: [
      { label: 'حجز خدمة', icon: Plus, action: 'book_service' },
      { label: 'توزيع فني', icon: Wrench, action: 'assign_technician' },
      { label: 'إضافة خدمة', icon: Home, action: 'add_service' },
      { label: 'تقرير الخدمة', icon: FileText, action: 'service_report' },
    ],
    tableHeaders: ['الحجز', 'العميل', 'الخدمة', 'الفني', 'الحالة', 'الوقت', 'الإجراءات'],
    data: [
      { id: 'HS-001', col1: 'أحمد محمد', col2: 'سباكة', col3: 'خالد أحمد', col4: 'قيد التنفيذ', col5: '10:30', col6: 'عرض' },
      { id: 'HS-002', col1: 'سارة أحمد', col2: 'كهرباء', col3: 'مريم علي', col4: 'مكتمل', col5: '09:15', col6: 'عرض' },
      { id: 'HS-003', col1: 'محمد علي', col3: 'تكييف', col4: 'علي خالد', col5: 'في الانتظار', col6: '11:00', col7: 'عرض' },
    ]
  },
  
  // أنظمة المبيعات الإضافية
  pos: {
    type: 'pos',
    title: 'لوحة تحكم نقاط البيع',
    themeColor: 'purple',
    navItems: [
      { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'sales', label: 'المبيعات', icon: ShoppingCart },
      { id: 'products', label: 'المنتجات', icon: Package },
      { id: 'inventory', label: 'المخزون', icon: Database },
      { id: 'customers', label: 'العملاء', icon: Users },
      { id: 'reports', label: 'التقارير', icon: FileText },
    ],
    stats: [
      { label: 'المبيعات اليوم', value: '12,345 ج.م', trend: 8.7, icon: ShoppingCart },
      { label: 'عدد الفواتير', value: '89', trend: 5.2, icon: FileText },
      { label: 'المنتجات', value: '456', trend: 2.1, icon: Package },
      { label: 'العملاء', value: '234', trend: 4.3, icon: Users },
    ],
    quickActions: [
      { label: 'بيع جديد', icon: ShoppingCart, action: 'new_sale' },
      { label: 'إضافة منتج', icon: Package, action: 'add_product' },
      { label: 'جرد المخزون', icon: Database, action: 'inventory_count' },
      { label: 'تقرير المبيعات', icon: FileText, action: 'sales_report' },
    ],
    tableHeaders: ['الفاتورة', 'العميل', 'المنتجات', 'الإجمالي', 'الوقت', 'الإجراءات'],
    data: [
      { id: 'INV-001', col1: 'أحمد محمد', col2: '5 منتجات', col3: '234 ج.م', col4: '10:30', col5: 'عرض' },
      { id: 'INV-002', col1: 'سارة أحمد', col2: '3 منتجات', col3: '156 ج.م', col4: '09:15', col5: 'عرض' },
      { id: 'INV-003', col1: 'محمد علي', col3: '8 منتجات', col4: '445 ج.م', col5: '11:00', col6: 'عرض' },
    ]
  },
  
  inventory: {
    type: 'inventory',
    title: 'لوحة تحكم المخزون',
    themeColor: 'blue',
    navItems: [
      { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'products', label: 'المنتجات', icon: Package },
      { id: 'stock', label: 'المخزون', icon: Database },
      { id: 'suppliers', label: 'الموردون', icon: Truck },
      { id: 'alerts', label: 'التنبيهات', icon: Bell },
      { id: 'reports', label: 'التقارير', icon: FileText },
    ],
    stats: [
      { label: 'المنتجات', value: '1,234', trend: 3.2, icon: Package },
      { label: 'المخزون المنخفض', value: '23', trend: -5.4, icon: AlertCircle },
      { label: 'الموردون', value: '45', trend: 2.1, icon: Truck },
      { label: 'قيمة المخزون', value: '234,567 ج.م', trend: 8.7, icon: DollarSign },
    ],
    quickActions: [
      { label: 'إضافة منتج', icon: Plus, action: 'add_product' },
      { label: 'طلب شراء', icon: Truck, action: 'purchase_order' },
      { label: 'جرد سريع', icon: Database, action: 'quick_count' },
      { label: 'تقرير المخزون', icon: FileText, action: 'inventory_report' },
    ],
    tableHeaders: ['المنتج', 'الرمز', 'المخزون', 'الحد الأدنى', 'الحالة', 'الآخر تعديل', 'الإجراءات'],
    data: [
      { id: 'PRD-001', col1: 'منتج A', col2: 'SKU-001', col3: '45', col4: '10', col5: 'متوفر', col6: '2024-11-10', col7: 'عرض' },
      { id: 'PRD-002', col1: 'منتج B', col2: 'SKU-002', col3: '8', col4: '10', col5: 'منخفض', col6: '2024-11-11', col7: 'عرض' },
      { id: 'PRD-003', col1: 'منتج C', col3: 'SKU-003', col4: '0', col5: 'نافد', col6: '2024-11-12', col7: 'عرض' },
    ]
  },
  
  salesAccounting: {
    type: 'salesAccounting',
    title: 'لوحة تحكم المبيعات والمحاسبة',
    themeColor: 'green',
    navItems: [
      { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'sales', label: 'المبيعات', icon: ShoppingCart },
      { id: 'invoices', label: 'الفواتير', icon: FileText },
      { id: 'debts', label: 'الديون', icon: DollarSign },
      { id: 'accounts', label: 'الحسابات', icon: CreditCard },
      { id: 'reports', label: 'التقارير', icon: FileText },
    ],
    stats: [
      { label: 'المبيعات الشهرية', value: '234,567 ج.م', trend: 12.4, icon: ShoppingCart },
      { label: 'الديون المستحقة', value: '45,678 ج.م', trend: -3.2, icon: DollarSign },
      { label: 'الفواتير غير المدفوعة', value: '23', trend: -8.7, icon: FileText },
      { label: 'صافي الربح', value: '67,890 ج.م', trend: 5.6, icon: TrendingUp },
    ],
    quickActions: [
      { label: 'فاتورة جديدة', icon: FileText, action: 'new_invoice' },
      { label: 'تسجيل دفعة', icon: CreditCard, action: 'record_payment' },
      { label: 'متابعة دين', icon: DollarSign, action: 'follow_debt' },
      { label: 'تقرير مالي', icon: FileText, action: 'financial_report' },
    ],
    tableHeaders: ['العميل', 'المبلغ', 'تاريخ الاستحقاق', 'الحالة', 'آخر متابعة', 'الإجراءات'],
    data: [
      { id: 'DBT-001', col1: 'أحمد محمد', col2: '2,340 ج.م', col3: '2024-11-15', col4: 'متأخر', col5: '2024-11-10', col6: 'عرض' },
      { id: 'DBT-002', col1: 'سارة أحمد', col2: '1,567 ج.م', col3: '2024-11-20', col4: 'قريب', col5: '2024-11-12', col7: 'عرض' },
      { id: 'DBT-003', col1: 'محمد علي', col3: '3,456 ج.م', col4: 'مسدد', col5: '2024-11-08', col6: 'عرض' },
    ]
  },
  
  // أنظمة المهن الإضافية
  workshop: {
    type: 'workshop',
    title: 'لوحة تحكم الورشة',
    themeColor: 'gray',
    navItems: [
      { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'production', label: 'الإنتاج', icon: Package },
      { id: 'materials', label: 'المواد الخام', icon: Package },
      { id: 'employees', label: 'الموظفون', icon: Users },
      { id: 'quality', label: 'الجودة', icon: Shield },
      { id: 'reports', label: 'التقارير', icon: FileText },
    ],
    stats: [
      { label: 'الإنتاج اليوم', value: '234 وحدة', trend: 8.7, icon: Package },
      { label: 'المواد الخام', value: '456 طن', trend: -2.1, icon: Package },
      { label: 'الموظفون', value: '67', trend: 3.4, icon: Users },
      { label: 'معدل الجودة', value: '98.5%', trend: 0.2, icon: Shield },
    ],
    quickActions: [
      { label: 'بدء إنتاج', icon: Package, action: 'start_production' },
      { label: 'طلب مواد', icon: Package, action: 'request_materials' },
      { label: 'فحص جودة', icon: Shield, action: 'quality_check' },
      { label: 'تقرير الإنتاج', icon: FileText, action: 'production_report' },
    ],
    tableHeaders: ['المنتج', 'الكمية', 'الحالة', 'الجودة', 'الموظف', 'الوقت', 'الإجراءات'],
    data: [
      { id: 'PRD-001', col1: 'منتج A', col2: '100 وحدة', col3: 'قيد الإنتاج', col4: 'جيد', col5: 'أحمد محمد', col6: '10:30', col7: 'عرض' },
      { id: 'PRD-002', col1: 'منتج B', col2: '50 وحدة', col3: 'مكتمل', col4: 'ممتاز', col5: 'سارة أحمد', col6: '09:15', col7: 'عرض' },
      { id: 'PRD-003', col1: 'منتج C', col3: '75 وحدة', col4: 'في الانتظار', col5: 'محمد علي', col6: '11:00', col7: 'عرض' },
    ]
  }
};

export const colorClasses: Record<string, any> = {
  slate: { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', btn: 'bg-slate-800 hover:bg-slate-900', lightBtn: 'bg-slate-100 text-slate-800' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', btn: 'bg-orange-600 hover:bg-orange-700', lightBtn: 'bg-orange-100 text-orange-700' },
  blue: { bg: 'bg-blue-50', text: 'text-ray-blue', border: 'border-blue-200', btn: 'bg-ray-blue hover:bg-blue-900', lightBtn: 'bg-blue-100 text-blue-800' },
  green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', btn: 'bg-green-600 hover:bg-green-700', lightBtn: 'bg-green-100 text-green-700' },
  red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', btn: 'bg-red-600 hover:bg-red-700', lightBtn: 'bg-red-100 text-red-700' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', btn: 'bg-teal-600 hover:bg-teal-700', lightBtn: 'bg-teal-100 text-teal-700' },
  yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200', btn: 'bg-yellow-600 hover:bg-yellow-700', lightBtn: 'bg-yellow-100 text-yellow-800' },
  cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200', btn: 'bg-cyan-600 hover:bg-cyan-700', lightBtn: 'bg-cyan-100 text-cyan-700' },
  pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200', btn: 'bg-pink-600 hover:bg-pink-700', lightBtn: 'bg-pink-100 text-pink-700' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', btn: 'bg-purple-600 hover:bg-purple-700', lightBtn: 'bg-purple-100 text-purple-700' },
};
