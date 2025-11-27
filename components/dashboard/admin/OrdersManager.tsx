import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Plus, Search, Filter, Edit, Trash2, Eye, MapPin, Phone, Mail,
  Calendar, Clock, Star, TrendingUp, TrendingDown, Package, DollarSign,
  CheckCircle, XCircle, AlertTriangle, BarChart3, User, Store, Truck,
  RefreshCw, Download, Upload, Image, FileText, CreditCard, Receipt,
  ArrowUp, ArrowDown, Activity, Zap, Award, Shield, Settings,
  Smartphone, Monitor, Menu, X
} from 'lucide-react';
import { rayPrices, rayColors } from '../../common/RayHelpers';

interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  businessId: string;
  businessName: string;
  businessType: 'restaurant' | 'retail' | 'clinic' | 'gym' | 'services' | 'laundry' | 'clothing' | 'salon' | 'pharmacy' | 'contracting' | 'plumbing' | 'painting' | 'hardware' | 'electrical';
  businessEmail: string;
  businessPhone: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    category: string;
    image?: string;
    options?: string[];
  }[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  total: number;
  currency: string;
  paymentMethod: 'cash' | 'card' | 'digital' | 'wallet';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  orderStatus: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'refunded';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  type: 'delivery' | 'pickup' | 'dine_in' | 'service' | 'appointment';
  deliveryAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: { lat: number; lng: number };
  };
  pickupTime?: string;
  scheduledTime?: string;
  estimatedDeliveryTime?: string;
  actualDeliveryTime?: string;
  deliveryInstructions?: string;
  trackingNumber?: string;
  deliveryDriver?: {
    id: string;
    name: string;
    phone: string;
    rating: number;
    vehicle: string;
  };
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  preparedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
  refundAmount?: number;
  refundReason?: string;
  customerNotes?: string;
  businessNotes?: string;
  rating?: number;
  review?: string;
  tags: string[];
  source: 'app' | 'web' | 'phone' | 'walk_in';
  platform: 'ios' | 'android' | 'web' | 'pos';
  deviceInfo?: string;
  ipAddress?: string;
  promoCode?: string;
  loyaltyPointsEarned?: number;
  loyaltyPointsUsed?: number;
}

const initialOrders: Order[] = [
  {
    id: 'ORD-001',
    orderNumber: 'ORD-2024-001',
    customerId: 'CUST-001',
    customerName: 'أحمد محمد السيد',
    customerEmail: 'ahmed.customer@example.com',
    customerPhone: '01234567890',
    businessId: 'BIZ-001',
    businessName: 'مطعم الدار الذهبية',
    businessType: 'restaurant',
    businessEmail: 'ahmed@dar-aldahab.com',
    businessPhone: '01234567890',
    items: [
      { id: '1', name: 'كبسة بالدجاج', quantity: 2, price: 85, category: 'أطباق رئيسية' },
      { id: '2', name: 'سلطة عربية', quantity: 1, price: 25, category: 'مقبلات' },
      { id: '3', name: 'عصير مانجو', quantity: 2, price: 15, category: 'مشروبات' }
    ],
    subtotal: 210,
    tax: 21,
    deliveryFee: 15,
    discount: 10,
    total: 236,
    currency: 'ج',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    priority: 'normal',
    type: 'delivery',
    deliveryAddress: {
      street: '15 شارع الجامعة، وسط البلد',
      city: 'القاهرة',
      state: 'القاهرة',
      zipCode: '11511',
      coordinates: { lat: 30.0444, lng: 31.2357 }
    },
    estimatedDeliveryTime: '2024-11-26 13:30',
    actualDeliveryTime: '2024-11-26 13:25',
    deliveryInstructions: 'الرجاء التوصيل عند الباب الرئيسي',
    trackingNumber: 'TRK-001',
    deliveryDriver: {
      id: 'DRV-001',
      name: 'محمد سالم',
      phone: '01012345678',
      rating: 4.8,
      vehicle: 'دراجة نارية'
    },
    createdAt: '2024-11-26 12:15',
    updatedAt: '2024-11-26 13:25',
    confirmedAt: '2024-11-26 12:20',
    preparedAt: '2024-11-26 13:00',
    deliveredAt: '2024-11-26 13:25',
    customerNotes: 'الرجاء عدم إضافة البصل',
    businessNotes: 'العميل من العملاء المميزين',
    rating: 5,
    review: 'خدمة ممتازة وطعام لذيذ',
    tags: ['عميل VIP', 'توصيل سريع'],
    source: 'app',
    platform: 'ios',
    promoCode: 'SAVE10',
    loyaltyPointsEarned: 24,
    loyaltyPointsUsed: 0
  },
  {
    id: 'ORD-002',
    orderNumber: 'ORD-2024-002',
    customerId: 'CUST-002',
    customerName: 'سارة أحمد خالد',
    customerEmail: 'sarah.customer@example.com',
    customerPhone: '01123456789',
    businessId: 'BIZ-002',
    businessName: 'ملابس الأناقة',
    businessType: 'clothing',
    businessEmail: 'sarah@elegance-fashion.com',
    businessPhone: '01123456789',
    items: [
      { id: '1', name: 'فستان نسائي أزرق', quantity: 1, price: 450, category: 'فساتين', options: ['المقاس: M', 'اللون: أزرق'] },
      { id: '2', name: 'حقيبة يد جلدية', quantity: 1, price: 280, category: 'إكسسوارات' },
      { id: '3', name: 'حذاء نسائي كعب عالي', quantity: 1, price: 320, category: 'أحذية', options: ['المقاس: 38'] }
    ],
    subtotal: 1050,
    tax: 105,
    deliveryFee: 20,
    discount: 50,
    total: 1125,
    currency: 'ج',
    paymentMethod: 'digital',
    paymentStatus: 'paid',
    orderStatus: 'out_for_delivery',
    priority: 'normal',
    type: 'delivery',
    deliveryAddress: {
      street: '32 شارع الملك فهد',
      city: 'الرياض',
      state: 'الرياض',
      zipCode: '12345'
    },
    estimatedDeliveryTime: '2024-11-26 18:00',
    trackingNumber: 'TRK-002',
    deliveryDriver: {
      id: 'DRV-002',
      name: 'علي حسن',
      phone: '01567890123',
      rating: 4.6,
      vehicle: 'سيارة'
    },
    createdAt: '2024-11-26 15:30',
    updatedAt: '2024-11-26 16:45',
    confirmedAt: '2024-11-26 15:45',
    preparedAt: '2024-11-26 16:30',
    customerNotes: 'الرجاء التغليف جيداً',
    tags: ['ملابس', 'سيدات'],
    source: 'web',
    platform: 'web',
    loyaltyPointsEarned: 112,
    loyaltyPointsUsed: 0
  },
  {
    id: 'ORD-003',
    orderNumber: 'ORD-2024-003',
    customerId: 'CUST-003',
    customerName: 'محمد خالد عمر',
    customerEmail: 'mohammed.customer@example.com',
    customerPhone: '01012345678',
    businessId: 'BIZ-003',
    businessName: 'عيادة الأمل الطبية',
    businessType: 'clinic',
    businessEmail: 'info@amal-clinic.com',
    businessPhone: '01012345678',
    items: [
      { id: '1', name: 'استشارة طبية عامة', quantity: 1, price: 250, category: 'استشارات' },
      { id: '2', name: 'فحص دم شامل', quantity: 1, price: 180, category: 'فحوصات' }
    ],
    subtotal: 430,
    tax: 43,
    deliveryFee: 0,
    discount: 0,
    total: 473,
    currency: 'ج',
    paymentMethod: 'cash',
    paymentStatus: 'paid',
    orderStatus: 'confirmed',
    priority: 'high',
    type: 'appointment',
    scheduledTime: '2024-11-27 10:00',
    createdAt: '2024-11-26 09:00',
    updatedAt: '2024-11-26 09:30',
    confirmedAt: '2024-11-26 09:30',
    customerNotes: 'أعاني من آلام في المعدة',
    businessNotes: 'الحالة تتطلب متابعة',
    tags: ['طبي', 'استشارة'],
    source: 'phone',
    platform: 'web',
    loyaltyPointsEarned: 47,
    loyaltyPointsUsed: 0
  },
  {
    id: 'ORD-004',
    orderNumber: 'ORD-2024-004',
    customerId: 'CUST-004',
    customerName: 'فاطمة علي حسن',
    customerEmail: 'fatima.customer@example.com',
    customerPhone: '01567890123',
    businessId: 'BIZ-004',
    businessName: 'خدمات السباكة المحترفة',
    businessType: 'plumbing',
    businessEmail: 'info@pro-plumbing.com',
    businessPhone: '01567890123',
    items: [
      { id: '1', name: 'إصلاح تسريب مياه', quantity: 1, price: 350, category: 'إصلاحات طارئة' },
      { id: '2', name: 'تغيير مواسير', quantity: 2, price: 150, category: 'تركيبات' }
    ],
    subtotal: 650,
    tax: 65,
    deliveryFee: 50,
    discount: 0,
    total: 765,
    currency: 'ج',
    paymentMethod: 'cash',
    paymentStatus: 'pending',
    orderStatus: 'pending',
    priority: 'urgent',
    type: 'service',
    deliveryAddress: {
      street: '18 شارع الصناعة',
      city: 'الإسكندرية',
      state: 'الإسكندرية',
      zipCode: '21500'
    },
    estimatedDeliveryTime: '2024-11-26 14:00',
    deliveryInstructions: 'الطوارئ - تسريب كبير',
    createdAt: '2024-11-26 11:45',
    updatedAt: '2024-11-26 11:45',
    customerNotes: 'طوارئ - مياه تتسرب بكثرة',
    businessNotes: 'حالة طارئة تتطلب تدخل سريع',
    tags: ['طوارئ', 'سباكة'],
    source: 'phone',
    platform: 'web',
    loyaltyPointsEarned: 76,
    loyaltyPointsUsed: 0
  },
  {
    id: 'ORD-005',
    orderNumber: 'ORD-2024-005',
    customerId: 'CUST-005',
    customerName: 'عبدالله سالم محمد',
    customerEmail: 'abdullah.customer@example.com',
    customerPhone: '01234567891',
    businessId: 'BIZ-005',
    businessName: 'صالون التجميل النجمي',
    businessType: 'salon',
    businessEmail: 'info@star-salon.com',
    businessPhone: '01234567891',
    items: [
      { id: '1', name: 'قص شعر رجالي', quantity: 1, price: 80, category: 'قص شعر' },
      { id: '2', name: 'حلاقة ذقن', quantity: 1, price: 40, category: 'حلاقة' },
      { id: '3', name: 'عناية بالوجه', quantity: 1, price: 120, category: 'عناية' }
    ],
    subtotal: 240,
    tax: 24,
    deliveryFee: 0,
    discount: 20,
    total: 244,
    currency: 'ج',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    orderStatus: 'cancelled',
    priority: 'normal',
    type: 'appointment',
    scheduledTime: '2024-11-26 15:00',
    createdAt: '2024-11-26 10:00',
    updatedAt: '2024-11-26 14:30',
    cancelledAt: '2024-11-26 14:30',
    cancelReason: 'إلغاء من العميل',
    refundAmount: 244,
    refundReason: 'إلغاء الحجز',
    customerNotes: 'ظروف طارئة',
    businessNotes: 'تم الإلغاء برضى العميل',
    tags: ['إلغاء', 'استرداد'],
    source: 'app',
    platform: 'android',
    loyaltyPointsEarned: 0,
    loyaltyPointsUsed: 0
  },
  {
    id: 'ORD-006',
    orderNumber: 'ORD-2024-006',
    customerId: 'CUST-006',
    customerName: 'نورا أحمد إبراهيم',
    customerEmail: 'nora.customer@example.com',
    customerPhone: '01098765432',
    businessId: 'BIZ-002',
    businessName: 'ملابس الأناقة',
    businessType: 'clothing',
    businessEmail: 'sarah@elegance-fashion.com',
    businessPhone: '01123456789',
    items: [
      { id: '1', name: 'بلوزة صيفية', quantity: 3, price: 120, category: 'بلوزات', options: ['المقاس: S', 'اللون: أبيض'] },
      { id: '2', name: 'بنطال نسائي', quantity: 2, price: 180, category: 'بنطلونات', options: ['المقاس: M', 'اللون: أسود'] },
      { id: '3', name: 'وشاح حريري', quantity: 1, price: 95, category: 'إكسسوارات' }
    ],
    subtotal: 735,
    tax: 73,
    deliveryFee: 15,
    discount: 35,
    total: 788,
    currency: 'ج',
    paymentMethod: 'digital',
    paymentStatus: 'paid',
    orderStatus: 'preparing',
    priority: 'normal',
    type: 'delivery',
    deliveryAddress: {
      street: '45 شارع الثقافة',
      city: 'الدوحة',
      state: 'الدوحة',
      zipCode: '12345'
    },
    estimatedDeliveryTime: '2024-11-27 16:00',
    createdAt: '2024-11-26 16:20',
    updatedAt: '2024-11-26 16:45',
    confirmedAt: '2024-11-26 16:35',
    customerNotes: 'الرجاء التوصيل في المساء',
    businessNotes: 'الطلب قيد التجهيز',
    tags: ['ملابس نسائية', 'توصيل'],
    source: 'app',
    platform: 'ios',
    promoCode: 'SUMMER20',
    loyaltyPointsEarned: 79,
    loyaltyPointsUsed: 0
  }
];

const OrdersManager: React.FC = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [showDetailsModal, setShowDetailsModal] = useState<Order | null>(null);

  const statuses = ['all', 'pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled', 'refunded'];
  const types = ['all', 'delivery', 'pickup', 'dine_in', 'service', 'appointment'];
  const payments = ['all', 'cash', 'card', 'digital', 'wallet'];
  const priorities = ['all', 'low', 'normal', 'high', 'urgent'];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.orderStatus === selectedStatus;
    const matchesType = selectedType === 'all' || order.type === selectedType;
    const matchesPayment = selectedPayment === 'all' || order.paymentMethod === selectedPayment;
    const matchesPriority = selectedPriority === 'all' || order.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesType && matchesPayment && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'preparing': return 'bg-purple-100 text-purple-700';
      case 'ready': return 'bg-indigo-100 text-indigo-700';
      case 'out_for_delivery': return 'bg-orange-100 text-orange-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'refunded': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'pending': return 'في الانتظار';
      case 'confirmed': return 'مؤكد';
      case 'preparing': return 'قيد التحضير';
      case 'ready': return 'جاهز';
      case 'out_for_delivery': return 'قيد التوصيل';
      case 'delivered': return 'تم التوصيل';
      case 'cancelled': return 'ملغي';
      case 'refunded': return 'مسترد';
      default: return status;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'delivery': return 'bg-blue-100 text-blue-700';
      case 'pickup': return 'bg-green-100 text-green-700';
      case 'dine_in': return 'bg-orange-100 text-orange-700';
      case 'service': return 'bg-purple-100 text-purple-700';
      case 'appointment': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'delivery': return 'توصيل';
      case 'pickup': return 'استلام';
      case 'dine_in': return 'تناول في المطعم';
      case 'service': return 'خدمة';
      case 'appointment': return 'موعد';
      default: return type;
    }
  };

  const getPaymentColor = (payment: string) => {
    switch(payment) {
      case 'cash': return 'bg-green-100 text-green-700';
      case 'card': return 'bg-blue-100 text-blue-700';
      case 'digital': return 'bg-purple-100 text-purple-700';
      case 'wallet': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentLabel = (payment: string) => {
    switch(payment) {
      case 'cash': return 'نقدي';
      case 'card': return 'بطاقة';
      case 'digital': return 'رقمي';
      case 'wallet': return 'محفظة';
      default: return payment;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'low': return 'bg-gray-100 text-gray-700';
      case 'normal': return 'bg-blue-100 text-blue-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'urgent': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch(priority) {
      case 'low': return 'منخفض';
      case 'normal': return 'عادي';
      case 'high': return 'عالي';
      case 'urgent': return 'عاجل';
      default: return priority;
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.orderStatus === 'pending').length,
    confirmed: orders.filter(o => o.orderStatus === 'confirmed').length,
    preparing: orders.filter(o => o.orderStatus === 'preparing').length,
    delivered: orders.filter(o => o.orderStatus === 'delivered').length,
    cancelled: orders.filter(o => o.orderStatus === 'cancelled').length,
    totalRevenue: orders.filter(o => o.paymentStatus === 'paid').reduce((sum, o) => sum + o.total, 0),
    urgent: orders.filter(o => o.priority === 'urgent').length
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header with Stats */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
              إدارة الطلبات المجمعة
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">عرض جميع طلبات المنصة من所有 الأعمال</p>
          </div>
          
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition-colors">
              <Download className="w-4 h-4" />
              تصدير
            </button>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">
              <RefreshCw className="w-4 h-4" />
              تحديث
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-8 gap-4 mt-6">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">إجمالي</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">في الانتظار</div>
          </div>
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.confirmed}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">مؤكدة</div>
          </div>
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.preparing}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">قيد التحضير</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.delivered}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">تم التوصيل</div>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.cancelled}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">ملغية</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{rayPrices.format(stats.totalRevenue)}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">الإيرادات</div>
          </div>
          <div className="text-center p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.urgent}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">عاجلة</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="بحث عن طلب..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>
        
        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto max-w-full">
           {statuses.map(status => (
             <button 
               key={status}
               onClick={() => setSelectedStatus(status)}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap
                 ${selectedStatus === status ? 'bg-white dark:bg-gray-600 text-blue-700 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
               `}
             >
               {status === 'all' ? 'كل الحالات' : getStatusLabel(status)}
             </button>
           ))}
        </div>

        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto max-w-full">
           {types.map(type => (
             <button 
               key={type}
               onClick={() => setSelectedType(type)}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap
                 ${selectedType === type ? 'bg-white dark:bg-gray-600 text-blue-700 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
               `}
             >
               {type === 'all' ? 'كل الأنواع' : getTypeLabel(type)}
             </button>
           ))}
        </div>

        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto max-w-full">
           {payments.map(payment => (
             <button 
               key={payment}
               onClick={() => setSelectedPayment(payment)}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap
                 ${selectedPayment === payment ? 'bg-white dark:bg-gray-600 text-blue-700 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
               `}
             >
               {payment === 'all' ? 'كل الدفعات' : getPaymentLabel(payment)}
             </button>
           ))}
        </div>

        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto max-w-full">
           {priorities.map(priority => (
             <button 
               key={priority}
               onClick={() => setSelectedPriority(priority)}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap
                 ${selectedPriority === priority ? 'bg-white dark:bg-gray-600 text-blue-700 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
               `}
             >
               {priority === 'all' ? 'كل الأولويات' : getPriorityLabel(priority)}
             </button>
           ))}
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{order.orderNumber}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{order.id}</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.orderStatus)}`}>
                  {getStatusLabel(order.orderStatus)}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-bold ${getPriorityColor(order.priority)}`}>
                  {getPriorityLabel(order.priority)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{order.customerName}</span>
              </div>

              <div className="flex items-center gap-3">
                <Store className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{order.businessName}</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{order.customerEmail}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{order.customerPhone}</span>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{order.createdAt}</span>
              </div>

              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{order.items.length} منتج</span>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{rayPrices.format(order.total)}</span>
              </div>

              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 text-gray-400" />
                <span className={`px-2 py-1 rounded text-xs font-bold ${getPaymentColor(order.paymentMethod)}`}>
                  {getPaymentLabel(order.paymentMethod)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-gray-400" />
                <span className={`px-2 py-1 rounded text-xs font-bold ${getTypeColor(order.type)}`}>
                  {getTypeLabel(order.type)}
                </span>
              </div>

              {order.deliveryDriver && (
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-800 dark:text-gray-200">سائق: {order.deliveryDriver.name}</span>
                </div>
              )}

              {order.rating && (
                <div className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-800 dark:text-gray-200">{order.rating} ⭐</span>
                </div>
              )}

              {order.promoCode && (
                <div className="flex items-center gap-3">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-600 dark:text-purple-400">كود: {order.promoCode}</span>
                </div>
              )}

              {order.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {order.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button 
                onClick={() => setShowDetailsModal(order)}
                className="flex-1 flex items-center justify-center gap-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm font-bold">عرض</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 py-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <Edit className="w-4 h-4" />
                <span className="text-sm font-bold">تعديل</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              تفاصيل الطلب: {showDetailsModal.orderNumber}
            </h3>
            
            <div className="space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">رقم الطلب</label>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.orderNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الحالة</label>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(showDetailsModal.orderStatus)}`}>
                    {getStatusLabel(showDetailsModal.orderStatus)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">النوع</label>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${getTypeColor(showDetailsModal.type)}`}>
                    {getTypeLabel(showDetailsModal.type)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الأولوية</label>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${getPriorityColor(showDetailsModal.priority)}`}>
                    {getPriorityLabel(showDetailsModal.priority)}
                  </span>
                </div>
              </div>
              
              {/* Customer & Business Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white mb-3">معلومات العميل</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.customerEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.customerPhone}</span>
                    </div>
                    {showDetailsModal.deliveryAddress && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.deliveryAddress.street}, {showDetailsModal.deliveryAddress.city}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white mb-3">معلومات العمل</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Store className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.businessName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.businessEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.businessPhone}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Items */}
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white mb-3">تفاصيل الطلب</h4>
                <div className="space-y-2">
                  {showDetailsModal.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="text-sm font-bold text-gray-800 dark:text-white">{item.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.category} - الكمية: {item.quantity}</p>
                        {item.options && (
                          <p className="text-xs text-blue-600 dark:text-blue-400">{item.options.join(', ')}</p>
                        )}
                      </div>
                      <span className="text-sm font-bold text-gray-800 dark:text-white">{rayPrices.format(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Pricing */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الإجمالي الفرعي</label>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{rayPrices.format(showDetailsModal.subtotal)}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الضريبة</label>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{rayPrices.format(showDetailsModal.tax)}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">رسوم التوصيل</label>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{rayPrices.format(showDetailsModal.deliveryFee)}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الخصم</label>
                  <p className="text-sm text-red-600 dark:text-red-400">-{rayPrices.format(showDetailsModal.discount)}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الإجمالي</label>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">{rayPrices.format(showDetailsModal.total)}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">طريقة الدفع</label>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${getPaymentColor(showDetailsModal.paymentMethod)}`}>
                    {getPaymentLabel(showDetailsModal.paymentMethod)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">حالة الدفع</label>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    showDetailsModal.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 
                    showDetailsModal.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {showDetailsModal.paymentStatus === 'paid' ? 'مدفوع' : 
                     showDetailsModal.paymentStatus === 'pending' ? 'في الانتظار' : 'فشل'}
                  </span>
                </div>
              </div>
              
              {/* Timeline */}
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white mb-3">الجدول الزمني</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">إنشاء:</span>
                    <span className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.createdAt}</span>
                  </div>
                  {showDetailsModal.confirmedAt && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">تأكيد:</span>
                      <span className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.confirmedAt}</span>
                    </div>
                  )}
                  {showDetailsModal.preparedAt && (
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">تحضير:</span>
                      <span className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.preparedAt}</span>
                    </div>
                  )}
                  {showDetailsModal.deliveredAt && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">توصيل:</span>
                      <span className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.deliveredAt}</span>
                    </div>
                  )}
                  {showDetailsModal.cancelledAt && (
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">إلغاء:</span>
                      <span className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.cancelledAt}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Delivery Info */}
              {showDetailsModal.deliveryDriver && (
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white mb-3">معلومات التوصيل</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-800 dark:text-gray-200">السائق: {showDetailsModal.deliveryDriver.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.deliveryDriver.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-gray-800 dark:text-gray-200">التقييم: {showDetailsModal.deliveryDriver.rating}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-800 dark:text-gray-200">المركبة: {showDetailsModal.deliveryDriver.vehicle}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {showDetailsModal.trackingNumber && (
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-800 dark:text-gray-200">رقم التتبع: {showDetailsModal.trackingNumber}</span>
                        </div>
                      )}
                      {showDetailsModal.estimatedDeliveryTime && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-800 dark:text-gray-200">التوصيل المتوقع: {showDetailsModal.estimatedDeliveryTime}</span>
                        </div>
                      )}
                      {showDetailsModal.actualDeliveryTime && (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-gray-800 dark:text-gray-200">التوصيل الفعلي: {showDetailsModal.actualDeliveryTime}</span>
                        </div>
                      )}
                      {showDetailsModal.deliveryInstructions && (
                        <div className="flex items-start gap-2">
                          <FileText className="w-4 h-4 text-gray-400 mt-1" />
                          <span className="text-sm text-gray-800 dark:text-gray-200">تعليمات: {showDetailsModal.deliveryInstructions}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Notes */}
              {(showDetailsModal.customerNotes || showDetailsModal.businessNotes) && (
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white mb-3">ملاحظات</h4>
                  <div className="space-y-2">
                    {showDetailsModal.customerNotes && (
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm font-bold text-blue-700 dark:text-blue-400 mb-1">ملاحظات العميل:</p>
                        <p className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.customerNotes}</p>
                      </div>
                    )}
                    {showDetailsModal.businessNotes && (
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <p className="text-sm font-bold text-green-700 dark:text-green-400 mb-1">ملاحظات العمل:</p>
                        <p className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.businessNotes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Review */}
              {showDetailsModal.rating && (
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white mb-3">تقييم العميل</h4>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{showDetailsModal.rating} ⭐</span>
                    </div>
                    {showDetailsModal.review && (
                      <p className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.review}</p>
                    )}
                  </div>
                </div>
              )}
              
              {/* Tags */}
              {showDetailsModal.tags.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white mb-3">الوسوم</h4>
                  <div className="flex flex-wrap gap-2">
                    {showDetailsModal.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2 mt-6">
              <button 
                onClick={() => setShowDetailsModal(null)}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                إغلاق
              </button>
              <button className="flex-1 bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition-colors">
                تعديل
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManager;
