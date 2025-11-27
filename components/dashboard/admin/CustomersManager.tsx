import React, { useState, useEffect } from 'react';
import { 
  Users, Plus, Search, Filter, Edit, Trash2, Eye, MapPin, Phone, Mail,
  Calendar, Star, TrendingUp, TrendingDown, Package, DollarSign, Clock,
  CheckCircle, XCircle, AlertTriangle, BarChart3, ShoppingCart, Heart,
  Award, Shield, Settings, RefreshCw, Download, Upload, Image, UserCircle,
  Smartphone, Monitor, Menu, X
} from 'lucide-react';
import { rayPrices, rayColors } from '../../common/RayHelpers';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  dateOfBirth?: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  city: string;
  country: string;
  registeredAt: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'suspended' | 'vip';
  verificationStatus: 'verified' | 'unverified' | 'pending';
  membershipTier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  favoriteCategories: string[];
  preferredPayment: 'cash' | 'card' | 'digital';
  loyaltyPoints: number;
  reviews: number;
  averageRating: number;
  wishlistItems: number;
  cartItems: number;
  communicationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
    promotions: boolean;
  };
  devices: string[];
  lastOrderDate?: string;
  favoriteStores: string[];
  tags: string[];
  notes?: string;
}

const initialCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'أحمد محمد السيد',
    email: 'ahmed.customer@example.com',
    phone: '01234567890',
    avatar: '👨‍💼',
    dateOfBirth: '1990-05-15',
    gender: 'male',
    address: '15 شارع النيل، وسط البلد',
    city: 'القاهرة',
    country: 'مصر',
    registeredAt: '2024-01-15',
    lastActive: '2024-11-26',
    status: 'vip',
    verificationStatus: 'verified',
    membershipTier: 'platinum',
    totalOrders: 156,
    totalSpent: 125000,
    averageOrderValue: 801,
    favoriteCategories: ['مطاعم', 'ملابس', 'إلكترونيات'],
    preferredPayment: 'card',
    loyaltyPoints: 8500,
    reviews: 23,
    averageRating: 4.8,
    wishlistItems: 12,
    cartItems: 3,
    communicationPreferences: {
      email: true,
      sms: true,
      push: true,
      promotions: true
    },
    devices: ['iOS', 'Web', 'Android'],
    lastOrderDate: '2024-11-25',
    favoriteStores: ['مطعم الدار الذهبية', 'ملابس الأناقة'],
    tags: ['عميل VIP', 'مخلص', 'نشط'],
    notes: 'أحد أفضل العملاء، يشتري بانتظام ويوصي التطبيق للآخرين'
  },
  {
    id: 'CUST-002',
    name: 'سارة أحمد خالد',
    email: 'sarah.customer@example.com',
    phone: '01123456789',
    avatar: '👩‍💼',
    dateOfBirth: '1985-08-22',
    gender: 'female',
    address: '32 شارع الملك فهد',
    city: 'الرياض',
    country: 'السعودية',
    registeredAt: '2024-02-20',
    lastActive: '2024-11-24',
    status: 'active',
    verificationStatus: 'verified',
    membershipTier: 'gold',
    totalOrders: 89,
    totalSpent: 45000,
    averageOrderValue: 506,
    favoriteCategories: ['ملابس', 'صالون', 'صيدلية'],
    preferredPayment: 'digital',
    loyaltyPoints: 3200,
    reviews: 15,
    averageRating: 4.5,
    wishlistItems: 8,
    cartItems: 2,
    communicationPreferences: {
      email: true,
      sms: false,
      push: true,
      promotions: false
    },
    devices: ['iOS', 'Web'],
    lastOrderDate: '2024-11-20',
    favoriteStores: ['ملابس الأناقة', 'صالون التجميل النجمي'],
    tags: ['عميلة ذهبية', 'مهتمة بالموضة'],
    notes: 'تهتم بالجودة العالية والخدمات المميزة'
  },
  {
    id: 'CUST-003',
    name: 'محمد خالد عمر',
    email: 'mohammed.customer@example.com',
    phone: '01012345678',
    avatar: '👨‍🔧',
    dateOfBirth: '1992-12-10',
    gender: 'male',
    address: '25 شارع التحرير',
    city: 'الجيزة',
    country: 'مصر',
    registeredAt: '2024-03-10',
    lastActive: '2024-11-26',
    status: 'active',
    verificationStatus: 'verified',
    membershipTier: 'silver',
    totalOrders: 67,
    totalSpent: 28000,
    averageOrderValue: 418,
    favoriteCategories: ['خدمات', 'إلكترونيات', 'أدوات'],
    preferredPayment: 'cash',
    loyaltyPoints: 1800,
    reviews: 8,
    averageRating: 4.2,
    wishlistItems: 5,
    cartItems: 1,
    communicationPreferences: {
      email: false,
      sms: true,
      push: true,
      promotions: true
    },
    devices: ['Android'],
    lastOrderDate: '2024-11-22',
    favoriteStores: ['خدمات السباكة المحترفة', 'الأدوات الهندسية'],
    tags: ['عميل منتظم', 'يخدم منزلياً'],
    notes: 'يطلب خدمات المنزل بانتظام'
  },
  {
    id: 'CUST-004',
    name: 'فاطمة علي حسن',
    email: 'fatima.customer@example.com',
    phone: '01567890123',
    avatar: '👩‍🦰',
    dateOfBirth: '1988-03-18',
    gender: 'female',
    address: '18 شارع الصناعة',
    city: 'الإسكندرية',
    country: 'مصر',
    registeredAt: '2024-04-05',
    lastActive: '2024-11-20',
    status: 'inactive',
    verificationStatus: 'unverified',
    membershipTier: 'bronze',
    totalOrders: 23,
    totalSpent: 8500,
    averageOrderValue: 370,
    favoriteCategories: ['مطاعم', 'صيدلية'],
    preferredPayment: 'cash',
    loyaltyPoints: 450,
    reviews: 3,
    averageRating: 3.8,
    wishlistItems: 2,
    cartItems: 0,
    communicationPreferences: {
      email: true,
      sms: false,
      push: false,
      promotions: false
    },
    devices: ['Web'],
    lastOrderDate: '2024-10-15',
    favoriteStores: ['مطعم الدار الذهبية', 'الصيدلية الصحية'],
    tags: ['عميلة جديدة', 'تحتاج تفعيل'],
    notes: 'تحتاج إلى تحفيز للعودة للشراء'
  },
  {
    id: 'CUST-005',
    name: 'عبدالله سالم محمد',
    email: 'abdullah.customer@example.com',
    phone: '01234567891',
    avatar: '👨‍⚕️',
    dateOfBirth: '1987-07-25',
    gender: 'male',
    address: '7 شارع الأمل',
    city: 'دبي',
    country: 'الإمارات',
    registeredAt: '2024-05-12',
    lastActive: '2024-11-25',
    status: 'active',
    verificationStatus: 'pending',
    membershipTier: 'silver',
    totalOrders: 45,
    totalSpent: 22000,
    averageOrderValue: 489,
    favoriteCategories: ['عيادة', 'مطاعم', 'إلكترونيات'],
    preferredPayment: 'card',
    loyaltyPoints: 1200,
    reviews: 12,
    averageRating: 4.6,
    wishlistItems: 6,
    cartItems: 2,
    communicationPreferences: {
      email: true,
      sms: true,
      push: true,
      promotions: true
    },
    devices: ['iOS', 'Android'],
    lastOrderDate: '2024-11-23',
    favoriteStores: ['عيادة الأمل الطبية', 'مطعم الدار الذهبية'],
    tags: ['عميل إماراتي', 'يهتم بالصحة'],
    notes: 'يبحث عن خدمات طبية عالية الجودة'
  },
  {
    id: 'CUST-006',
    name: 'نورا أحمد إبراهيم',
    email: 'nora.customer@example.com',
    phone: '01098765432',
    avatar: '👩‍🎨',
    dateOfBirth: '1995-11-30',
    gender: 'female',
    address: '45 شارع الثقافة',
    city: 'الدوحة',
    country: 'قطر',
    registeredAt: '2024-06-18',
    lastActive: '2024-11-26',
    status: 'active',
    verificationStatus: 'verified',
    membershipTier: 'gold',
    totalOrders: 112,
    totalSpent: 68000,
    averageOrderValue: 607,
    favoriteCategories: ['صالون', 'ملابس', 'مطاعم'],
    preferredPayment: 'digital',
    loyaltyPoints: 4100,
    reviews: 28,
    averageRating: 4.9,
    wishlistItems: 15,
    cartItems: 4,
    communicationPreferences: {
      email: true,
      sms: true,
      push: true,
      promotions: true
    },
    devices: ['iOS', 'Web', 'Android'],
    lastOrderDate: '2024-11-26',
    favoriteStores: ['صالون التجميل النجمي', 'ملابس الأناقة'],
    tags: ['عميلة ذهبية', 'نشطة جداً', 'تسوق منتظم'],
    notes: 'تسوق يومياً وتتفاعل مع جميع العروض'
  }
];

const CustomersManager: React.FC = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedVerification, setSelectedVerification] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState<Customer | null>(null);

  const statuses = ['all', 'active', 'inactive', 'suspended', 'vip'];
  const tiers = ['all', 'bronze', 'silver', 'gold', 'platinum', 'diamond'];
  const cities = ['all', 'القاهرة', 'الرياض', 'الجيزة', 'الإسكندرية', 'دبي', 'الدوحة'];
  const verifications = ['all', 'verified', 'unverified', 'pending'];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
    const matchesTier = selectedTier === 'all' || customer.membershipTier === selectedTier;
    const matchesCity = selectedCity === 'all' || customer.city === selectedCity;
    const matchesVerification = selectedVerification === 'all' || customer.verificationStatus === selectedVerification;
    return matchesSearch && matchesStatus && matchesTier && matchesCity && matchesVerification;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'suspended': return 'bg-red-100 text-red-700';
      case 'vip': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'active': return 'نشط';
      case 'inactive': return 'غير نشط';
      case 'suspended': return 'موقوف';
      case 'vip': return 'VIP';
      default: return status;
    }
  };

  const getTierColor = (tier: string) => {
    switch(tier) {
      case 'bronze': return 'bg-orange-100 text-orange-700';
      case 'silver': return 'bg-gray-100 text-gray-700';
      case 'gold': return 'bg-yellow-100 text-yellow-700';
      case 'platinum': return 'bg-blue-100 text-blue-700';
      case 'diamond': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTierLabel = (tier: string) => {
    switch(tier) {
      case 'bronze': return 'برونزي';
      case 'silver': return 'فضي';
      case 'gold': return 'ذهبي';
      case 'platinum': return 'بلاتيني';
      case 'diamond': return 'ماسي';
      default: return tier;
    }
  };

  const getVerificationColor = (verification: string) => {
    switch(verification) {
      case 'verified': return 'bg-green-100 text-green-700';
      case 'unverified': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getVerificationLabel = (verification: string) => {
    switch(verification) {
      case 'verified': return 'موثق';
      case 'unverified': return 'غير موثق';
      case 'pending': return 'في الانتظار';
      default: return verification;
    }
  };

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    vip: customers.filter(c => c.status === 'vip').length,
    inactive: customers.filter(c => c.status === 'inactive').length,
    verified: customers.filter(c => c.verificationStatus === 'verified').length,
    totalSpent: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    totalOrders: customers.reduce((sum, c) => sum + c.totalOrders, 0),
    averageRating: customers.reduce((sum, c) => sum + c.averageRating, 0) / customers.length
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header with Stats */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-600" />
              إدارة العملاء الموحدة
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">عرض وإدارة جميع عملاء المنصة</p>
          </div>
          
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition-colors">
              <Download className="w-4 h-4" />
              تصدير
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              إضافة عميل
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-8 gap-4 mt-6">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">إجمالي</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.active}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">نشطون</div>
          </div>
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.vip}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">VIP</div>
          </div>
          <div className="text-center p-3 bg-gray-100 dark:bg-gray-600 rounded-lg">
            <div className="text-2xl font-bold text-gray-600 dark:text-gray-300">{stats.inactive}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">غير نشطون</div>
          </div>
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.verified}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">موثقون</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{rayPrices.format(stats.totalSpent)}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">إجمالي الإنفاق</div>
          </div>
          <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.totalOrders}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">إجمالي الطلبات</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.averageRating.toFixed(1)}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">متوسط التقييم</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="بحث عن عميل..."
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
           {tiers.map(tier => (
             <button 
               key={tier}
               onClick={() => setSelectedTier(tier)}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap
                 ${selectedTier === tier ? 'bg-white dark:bg-gray-600 text-blue-700 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
               `}
             >
               {tier === 'all' ? 'كل المستويات' : getTierLabel(tier)}
             </button>
           ))}
        </div>

        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto max-w-full">
           {verifications.map(verification => (
             <button 
               key={verification}
               onClick={() => setSelectedVerification(verification)}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap
                 ${selectedVerification === verification ? 'bg-white dark:bg-gray-600 text-blue-700 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
               `}
             >
               {verification === 'all' ? 'كل التوثيقات' : getVerificationLabel(verification)}
             </button>
           ))}
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                {customer.avatar && (
                  <span className="text-2xl">{customer.avatar}</span>
                )}
                <div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">{customer.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{customer.id}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(customer.status)}`}>
                  {getStatusLabel(customer.status)}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-bold ${getTierColor(customer.membershipTier)}`}>
                  {getTierLabel(customer.membershipTier)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{customer.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{customer.phone}</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{customer.city}</span>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{customer.registeredAt}</span>
              </div>

              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{customer.totalOrders} طلب</span>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{rayPrices.format(customer.totalSpent)}</span>
              </div>

              <div className="flex items-center gap-3">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{customer.averageRating} ({customer.reviews} تقييم)</span>
              </div>

              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{customer.loyaltyPoints} نقطة</span>
              </div>

              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-gray-400" />
                <span className={`px-2 py-1 rounded text-xs font-bold ${getVerificationColor(customer.verificationStatus)}`}>
                  {getVerificationLabel(customer.verificationStatus)}
                </span>
              </div>

              {customer.cartItems > 0 && (
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-600 dark:text-blue-400">{customer.cartItems} في السلة</span>
                </div>
              )}

              {customer.notes && (
                <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-300">{customer.notes}</p>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button 
                onClick={() => setShowDetailsModal(customer)}
                className="flex-1 flex items-center justify-center gap-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm font-bold">عرض</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 py-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <Edit className="w-4 h-4" />
                <span className="text-sm font-bold">تعديل</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                <Trash2 className="w-4 h-4" />
                <span className="text-sm font-bold">حذف</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              إضافة عميل جديد
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الاسم الكامل</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" placeholder="أدخل الاسم" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" placeholder="email@example.com" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">رقم الهاتف</label>
                <input type="tel" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" placeholder="01xxxxxxxxx" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">تاريخ الميلاد</label>
                <input type="date" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الجنس</label>
                <select className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white">
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                  <option value="other">آخر</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">المدينة</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" placeholder="المدينة" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الدولة</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" placeholder="الدولة" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">مستوى العضوية</label>
                <select className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white">
                  <option value="bronze">برونزي</option>
                  <option value="silver">فضي</option>
                  <option value="gold">ذهبي</option>
                  <option value="platinum">بلاتيني</option>
                  <option value="diamond">ماسي</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">العنوان</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" placeholder="أدخل العنوان الكامل" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">طريقة الدفع المفضلة</label>
                <select className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white">
                  <option value="cash">نقدي</option>
                  <option value="card">بطاقة</option>
                  <option value="digital">رقمي</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">نقاط الولاء</label>
                <input type="number" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" placeholder="0" />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">ملاحظات</label>
                <textarea className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" rows={3} placeholder="ملاحظات إضافية"></textarea>
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                إلغاء
              </button>
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                إضافة عميل
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              تفاصيل العميل: {showDetailsModal.name}
            </h3>
            
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">المعرف</label>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الحالة</label>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(showDetailsModal.status)}`}>
                    {getStatusLabel(showDetailsModal.status)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">المستوى</label>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${getTierColor(showDetailsModal.membershipTier)}`}>
                    {getTierLabel(showDetailsModal.membershipTier)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">التوثيق</label>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${getVerificationColor(showDetailsModal.verificationStatus)}`}>
                    {getVerificationLabel(showDetailsModal.verificationStatus)}
                  </span>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">رقم الهاتف</label>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">العنوان</label>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.address}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">المدينة</label>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.city}, {showDetailsModal.country}</p>
                </div>
              </div>
              
              {/* Performance Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-2">
                    <Package className="w-5 h-5 text-blue-400" />
                    {showDetailsModal.totalOrders}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">إجمالي الطلبات</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    {rayPrices.format(showDetailsModal.totalSpent)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">إجمالي الإنفاق</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    {showDetailsModal.averageRating}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">متوسط التقييم</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-2">
                    <Heart className="w-5 h-5 text-red-400" />
                    {showDetailsModal.loyaltyPoints}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">نقاط الولاء</div>
                </div>
              </div>
              
              {/* Preferences */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الفئات المفضلة</label>
                  <div className="flex flex-wrap gap-2">
                    {showDetailsModal.favoriteCategories.map((category, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-xs">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">طريقة الدفع المفضلة</label>
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    {showDetailsModal.preferredPayment === 'cash' ? 'نقدي' : 
                     showDetailsModal.preferredPayment === 'card' ? 'بطاقة' : 'رقمي'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الأجهزة المستخدمة</label>
                  <div className="flex flex-wrap gap-2">
                    {showDetailsModal.devices.map((device, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                        {device}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">المتاجر المفضلة</label>
                  <div className="flex flex-wrap gap-2">
                    {showDetailsModal.favoriteStores.map((store, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-full text-xs">
                        {store}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Communication Preferences */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">تفضيلات التواصل</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={showDetailsModal.communicationPreferences.email} readOnly className="w-4 h-4" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">البريد الإلكتروني</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={showDetailsModal.communicationPreferences.sms} readOnly className="w-4 h-4" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">الرسائل النصية</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={showDetailsModal.communicationPreferences.push} readOnly className="w-4 h-4" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">الإشعارات</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={showDetailsModal.communicationPreferences.promotions} readOnly className="w-4 h-4" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">العروض الترويجية</span>
                  </div>
                </div>
              </div>
              
              {/* Tags */}
              {showDetailsModal.tags.length > 0 && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الوسوم</label>
                  <div className="flex flex-wrap gap-2">
                    {showDetailsModal.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Notes */}
              {showDetailsModal.notes && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">ملاحظات</label>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.notes}</p>
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

export default CustomersManager;
