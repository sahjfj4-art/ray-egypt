import React, { useState, useEffect } from 'react';
import { 
  Store, Plus, Search, Filter, Edit, Trash2, Eye, MapPin, Phone, Mail,
  Calendar, Star, TrendingUp, TrendingDown, Users, Package, DollarSign,
  CheckCircle, XCircle, AlertTriangle, BarChart3, Clock, Award, Shield,
  Settings, RefreshCw, Download, Upload, Image, FileText, Globe, UserCircle,
  Smartphone, Monitor, Menu, X
} from 'lucide-react';
import { rayPrices, rayColors } from '../../common/RayHelpers';
import { RAY_DESIGN_SYSTEM } from '../../common/DesignSystem';

interface Business {
  id: string;
  name: string;
  type: 'restaurant' | 'retail' | 'clinic' | 'gym' | 'services' | 'laundry' | 'clothing' | 'salon' | 'pharmacy' | 'contracting' | 'plumbing' | 'painting' | 'hardware' | 'electrical';
  owner: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  description: string;
  logo?: string;
  coverImage?: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  rating: number;
  reviews: number;
  employees: number;
  monthlyRevenue: number;
  totalOrders: number;
  joinDate: string;
  lastActive: string;
  subscription: 'basic' | 'premium' | 'enterprise';
  subscriptionExpiry: string;
  verified: boolean;
  featured: boolean;
  tags: string[];
  socialMedia?: {
    website?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    contact?: string;
  };
  workingHours: {
    [key: string]: { open: string; close: string; closed?: boolean };
  };
  services: string[];
  gallery: string[];
  documents: {
    commercialLicense: string;
    taxCard: string;
    permits?: string[];
  };
  notes?: string;
}

const initialBusinesses: Business[] = [
  {
    id: 'BIZ-001',
    name: 'مطعم الدار الذهبية',
    type: 'restaurant',
    owner: 'أحمد محمد السيد',
    email: 'ahmed@dar-aldahab.com',
    phone: '01234567890',
    address: '15 شارع الجامعة، وسط البلد',
    city: 'القاهرة',
    description: 'مطعم تقليدي يقدم أشهى المأكولات المصرية والأصيلة',
    logo: '🍽️',
    status: 'active',
    rating: 4.8,
    reviews: 342,
    employees: 12,
    monthlyRevenue: 85000,
    totalOrders: 1250,
    joinDate: '2024-01-15',
    lastActive: '2024-11-26',
    subscription: 'premium',
    subscriptionExpiry: '2025-01-15',
    verified: true,
    featured: true,
    tags: ['مطعم', 'مصري', 'تقليدي', 'عائلي'],
    socialMedia: {
      website: 'www.dar-aldahab.com',
      facebook: 'daraldahab',
      instagram: '@daraldahab_restaurant'
    },
    workingHours: {
      'السبت': { open: '08:00', close: '23:00' },
      'الأحد': { open: '08:00', close: '23:00' },
      'الإثنين': { open: '08:00', close: '23:00' },
      'الثلاثاء': { open: '08:00', close: '23:00' },
      'الأربعاء': { open: '08:00', close: '23:00' },
      'الخميس': { open: '08:00', close: '23:00' },
      'الجمعة': { open: '08:00', close: '23:00' }
    },
    services: ['توصيل', 'حجز طاولات', 'توصيل جماعي', 'مناسبات'],
    gallery: ['restaurant1.jpg', 'restaurant2.jpg', 'restaurant3.jpg'],
    documents: {
      commercialLicense: 'CL-001.pdf',
      taxCard: 'TC-001.pdf',
      permits: ['HEALTH-PERMIT.pdf', 'FOOD-LICENSE.pdf']
    }
  },
  {
    id: 'BIZ-002',
    name: 'مركز الرعاية الطبية',
    type: 'clinic',
    owner: 'د. فاطمة علي',
    email: 'info@alraayacare.com',
    phone: '01123456789',
    address: '25 شارع النيل',
    city: 'الرياض',
    description: 'مركز طبي متخصص يقدم خدمات الرعاية الصحية الشاملة',
    logo: '🏥',
    status: 'active',
    rating: 4.9,
    reviews: 256,
    employees: 8,
    monthlyRevenue: 120000,
    totalOrders: 890,
    joinDate: '2024-02-20',
    lastActive: '2024-11-25',
    subscription: 'premium',
    subscriptionExpiry: '2025-02-20',
    verified: true,
    featured: true,
    tags: ['طبي', 'صحي', 'استشارات', 'علاج'],
    socialMedia: {
      website: 'www.alraayacare.com'
    },
    workingHours: {
      'السبت': { open: '09:00', close: '21:00' },
      'الأحد': { open: '09:00', close: '21:00' },
      'الإثنين': { open: '09:00', close: '21:00' },
      'الثلاثاء': { open: '09:00', close: '21:00' },
      'الأربعاء': { open: '09:00', close: '21:00' },
      'الخميس': { open: '09:00', close: '21:00' },
      'الجمعة': { open: '', close: '', closed: true }
    },
    services: ['حجز مواعيد', 'استشارات', 'فحوصات', 'علاج'],
    gallery: ['clinic1.jpg', 'clinic2.jpg', 'clinic3.jpg'],
    documents: {
      commercialLicense: 'CL-003.pdf',
      taxCard: 'TC-003.pdf',
      permits: ['MEDICAL-LICENSE.pdf', 'HEALTH-PERMIT.pdf']
    },
    notes: 'بانتظار التحقق من الرخص الطبية'
  },
  {
    id: 'BIZ-003',
    name: 'متجر الأزياء العصري',
    type: 'retail',
    owner: 'سارة أحمد',
    email: 'sara@modernfashion.com',
    phone: '01098765432',
    address: '10 شارع الملك فهد',
    city: 'دبي',
    description: 'متجر أزياء حديث يقدم أحدث صيحات الموضة',
    logo: '👗',
    status: 'active',
    rating: 4.6,
    reviews: 189,
    employees: 6,
    monthlyRevenue: 65000,
    totalOrders: 780,
    joinDate: '2024-03-10',
    lastActive: '2024-11-24',
    subscription: 'basic',
    subscriptionExpiry: '2025-03-10',
    verified: true,
    featured: false,
    tags: ['أزياء', 'ملابس', 'موضة', 'نسائي'],
    socialMedia: {
      website: 'www.modernfashion.com',
      instagram: '@modernfashion_dubai'
    },
    workingHours: {
      'السبت': { open: '10:00', close: '22:00' },
      'الأحد': { open: '10:00', close: '22:00' },
      'الإثنين': { open: '10:00', close: '22:00' },
      'الثلاثاء': { open: '10:00', close: '22:00' },
      'الأربعاء': { open: '10:00', close: '22:00' },
      'الخميس': { open: '10:00', close: '22:00' },
      'الجمعة': { open: '12:00', close: '20:00' }
    },
    services: ['توصيل', 'استبدال', 'إرجاع', 'حجز'],
    gallery: ['fashion1.jpg', 'fashion2.jpg', 'fashion3.jpg'],
    documents: {
      commercialLicense: 'CL-002.pdf',
      taxCard: 'TC-002.pdf'
    }
  }
];

const BusinessManager: React.FC = () => {

  const [businesses, setBusinesses] = useState(initialBusinesses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState<Business | null>(null);

  const types = ['all', 'restaurant', 'retail', 'clinic', 'gym', 'services', 'laundry', 'clothing', 'salon', 'pharmacy', 'contracting', 'plumbing', 'painting', 'hardware', 'electrical'];
  const statuses = ['all', 'active', 'inactive', 'suspended', 'pending'];
  const cities = ['all', 'القاهرة', 'الرياض', 'الجيزة', 'الإسكندرية', 'دبي'];

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || business.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || business.status === selectedStatus;
    const matchesCity = selectedCity === 'all' || business.city === selectedCity;
    return matchesSearch && matchesType && matchesStatus && matchesCity;
  });

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'restaurant': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'retail': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'clinic': return 'bg-green-100 text-green-700 border-green-200';
      case 'gym': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'services': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'laundry': return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      case 'clothing': return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'salon': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'pharmacy': return 'bg-red-100 text-red-700 border-red-200';
      case 'contracting': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'plumbing': return 'bg-teal-100 text-teal-700 border-teal-200';
      case 'painting': return 'bg-lime-100 text-lime-700 border-lime-200';
      case 'hardware': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'electrical': return 'bg-violet-100 text-violet-700 border-violet-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'restaurant': return 'مطعم';
      case 'retail': return 'متجر';
      case 'clinic': return 'عيادة';
      case 'gym': return 'نادي رياضي';
      case 'services': return 'خدمات';
      case 'laundry': return 'غسيل';
      case 'clothing': return 'ملابس';
      case 'salon': return 'صالون';
      case 'pharmacy': return 'صيدلية';
      case 'contracting': return 'مقاولات';
      case 'plumbing': return 'سباكة';
      case 'painting': return 'دهانات';
      case 'hardware': return 'أدوات';
      case 'electrical': return 'كهرباء';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'suspended': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'active': return 'نشط';
      case 'inactive': return 'غير نشط';
      case 'suspended': return 'موقوف';
      case 'pending': return 'في الانتظار';
      default: return status;
    }
  };

  const getSubscriptionColor = (subscription: string) => {
    switch(subscription) {
      case 'basic': return 'bg-gray-100 text-gray-700';
      case 'premium': return 'bg-blue-100 text-blue-700';
      case 'enterprise': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSubscriptionLabel = (subscription: string) => {
    switch(subscription) {
      case 'basic': return 'أساسي';
      case 'premium': return 'مميز';
      case 'enterprise': return 'مؤسسي';
      default: return subscription;
    }
  };

  const stats = {
    total: businesses.length,
    active: businesses.filter(b => b.status === 'active').length,
    pending: businesses.filter(b => b.status === 'pending').length,
    suspended: businesses.filter(b => b.status === 'suspended').length,
    verified: businesses.filter(b => b.verified).length,
    featured: businesses.filter(b => b.featured).length,
    totalRevenue: businesses.reduce((sum, b) => sum + b.monthlyRevenue, 0),
    totalOrders: businesses.reduce((sum, b) => sum + b.totalOrders, 0)
  };

  return (
    <div className="w-full flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2 overflow-x-hidden">
      {/* Header with Stats */}
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm w-full">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="w-full lg:w-auto">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Store className="w-5 md:w-6 h-5 md:h-6 text-blue-600" />
              إدارة المحلات والأنشطة
            </h2>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">عرض وإدارة جميع الأعمال التجارية المسجلة</p>
          </div>
          
          <div className="flex gap-2 w-full lg:w-auto">
            <button className="flex items-center gap-2 bg-green-600 text-white px-3 md:px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition-colors text-sm md:text-base flex-1 lg:flex-none justify-center">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">تصدير</span>
            </button>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-3 md:px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors text-sm md:text-base flex-1 lg:flex-none justify-center">
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">تحديث</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-6 w-full">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">إجمالي</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.active}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">نشط</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">في الانتظار</div>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.suspended}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">معلق</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col gap-4 w-full overflow-x-hidden">
        <div className="flex-1 relative w-full">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="بحث عن عمل..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white text-sm md:text-base"
          />
        </div>
        
        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto w-full">
           {types.map(type => (
             <button 
               key={type}
               onClick={() => setSelectedType(type)}
               className={`px-2 md:px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition whitespace-nowrap
                 ${selectedType === type ? 'bg-white dark:bg-gray-600 text-blue-700 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
               `}
             >
               {type === 'all' ? 'كل الأنواع' : getTypeLabel(type)}
             </button>
           ))}
        </div>

        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto w-full">
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
           {cities.map(city => (
             <button 
               key={city}
               onClick={() => setSelectedCity(city)}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap
                 ${selectedCity === city ? 'bg-white dark:bg-gray-600 text-blue-700 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
               `}
             >
               {city === 'all' ? 'كل المدن' : city}
             </button>
           ))}
        </div>
      </div>

      {/* Businesses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
        {filteredBusinesses.map((business) => (
          <div key={business.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 md:p-6 shadow-sm hover:shadow-md transition-all w-full">
            <div className="flex justify-between items-start mb-4 gap-2">
              <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                {business.logo && (
                  <span className="text-xl md:text-2xl flex-shrink-0">{business.logo}</span>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-sm md:text-lg text-gray-800 dark:text-white truncate">{business.name}</h3>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 truncate">{business.id}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-bold border whitespace-nowrap ${getTypeColor(business.type)}`}>
                  {getTypeLabel(business.type)}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-bold whitespace-nowrap ${getStatusColor(business.status)}`}>
                  {getStatusLabel(business.status)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <UserCircle className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{business.owner}</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{business.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{business.phone}</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{business.city}</span>
              </div>

              <div className="flex items-center gap-3">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{business.rating} ({business.reviews} تقييم)</span>
              </div>

              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{business.employees} موظف</span>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{rayPrices.format(business.monthlyRevenue)}</span>
              </div>

              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800 dark:text-gray-200">{business.totalOrders} طلب</span>
              </div>

              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-gray-400" />
                <span className={`px-2 py-1 rounded text-xs font-bold ${getSubscriptionColor(business.subscription)}`}>
                  {getSubscriptionLabel(business.subscription)}
                </span>
              </div>

              {business.verified && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 dark:text-green-400">موثق</span>
                </div>
              )}

              {business.featured && (
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-purple-600 dark:text-purple-400">مميز</span>
                </div>
              )}

              {business.notes && (
                <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-300">{business.notes}</p>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 w-full">
              <button 
                onClick={() => setShowDetailsModal(business)}
                className="flex-1 flex items-center justify-center gap-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-xs md:text-sm"
              >
                <Eye className="w-4 h-4" />
                <span className="font-bold hidden sm:inline">عرض</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 py-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-xs md:text-sm">
                <Edit className="w-4 h-4" />
                <span className="font-bold hidden sm:inline">تعديل</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-xs md:text-sm">
                <Trash2 className="w-4 h-4" />
                <span className="font-bold hidden sm:inline">حذف</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Business Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              إضافة عمل جديد
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">اسم العمل</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" placeholder="أدخل اسم العمل" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">نوع النشاط</label>
                <select className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white">
                  <option value="">اختر النوع</option>
                  {types.filter(t => t !== 'all').map(type => (
                    <option key={type} value={type}>{getTypeLabel(type)}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">اسم المالك</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" placeholder="أدخل اسم المالك" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" placeholder="أدخل البريد الإلكتروني" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">رقم الهاتف</label>
                <input type="tel" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" placeholder="أدخل رقم الهاتف" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">المدينة</label>
                <select className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white">
                  <option value="">اختر المدينة</option>
                  {cities.filter(c => c !== 'all').map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">العنوان</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" placeholder="أدخل العنوان الكامل" />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الوصف</label>
                <textarea className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" rows={3} placeholder="وصف النشاط التجاري"></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">نوع الاشتراك</label>
                <select className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white">
                  <option value="basic">أساسي</option>
                  <option value="premium">مميز</option>
                  <option value="enterprise">مؤسسي</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">عدد الموظفين</label>
                <input type="number" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" placeholder="عدد الموظفين" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الرخصة التجارية</label>
                <input type="file" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">البطاقة الضريبية</label>
                <input type="file" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" />
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
                إضافة عمل
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
              تفاصيل العمل: {showDetailsModal.name}
            </h3>
            
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">المعرف</label>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">النوع</label>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getTypeColor(showDetailsModal.type)}`}>
                    {getTypeLabel(showDetailsModal.type)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الحالة</label>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(showDetailsModal.status)}`}>
                    {getStatusLabel(showDetailsModal.status)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">المدينة</label>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.city}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الاشتراك</label>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${getSubscriptionColor(showDetailsModal.subscription)}`}>
                    {getSubscriptionLabel(showDetailsModal.subscription)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">تاريخ الانضمام</label>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.joinDate}</p>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">اسم المالك</label>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.owner}</p>
                </div>
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
              </div>
              
              {/* Performance Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    {showDetailsModal.rating}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{showDetailsModal.reviews} تقييم</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    {showDetailsModal.employees}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">موظف</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    {rayPrices.format(showDetailsModal.monthlyRevenue)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">إيرادات شهرية</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-2">
                    <Package className="w-5 h-5 text-purple-400" />
                    {showDetailsModal.totalOrders}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">إجمالي الطلبات</div>
                </div>
              </div>
              
              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الوصف</label>
                <p className="text-sm text-gray-800 dark:text-gray-200">{showDetailsModal.description}</p>
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
              
              {/* Social Media */}
              {showDetailsModal.socialMedia && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">وسائل التواصل الاجتماعي</label>
                  <div className="space-y-2">
                    {showDetailsModal.socialMedia.website && (
                      <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                        <Globe className="w-4 h-4" />
                        {showDetailsModal.socialMedia.website}
                      </div>
                    )}
                    {showDetailsModal.socialMedia.contact && (
                      <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                        <Phone className="w-4 h-4" />
                        {showDetailsModal.socialMedia.contact}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Working Hours */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">ساعات العمل</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Object.entries(showDetailsModal.workingHours).map(([day, hours]) => (
                    <div key={day} className="text-sm">
                      <span className="font-bold text-gray-700 dark:text-gray-300">{day}:</span>
                      {(hours as any).closed ? (
                        <span className="text-red-600 dark:text-red-400"> مغلق</span>
                      ) : (
                        <span className="text-gray-600 dark:text-gray-400"> {(hours as any).open} - {(hours as any).close}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Services */}
              {showDetailsModal.services.length > 0 && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الخدمات</label>
                  <div className="flex flex-wrap gap-2">
                    {showDetailsModal.services.map((service, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-xs">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Documents */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الوثائق</label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FileText className="w-4 h-4" />
                    الرخصة التجارية: {showDetailsModal.documents.commercialLicense}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FileText className="w-4 h-4" />
                    البطاقة الضريبية: {showDetailsModal.documents.taxCard}
                  </div>
                  {showDetailsModal.documents.permits && showDetailsModal.documents.permits.length > 0 && (
                    showDetailsModal.documents.permits.map((permit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <FileText className="w-4 h-4" />
                        تصريح: {permit}
                      </div>
                    ))
                  )}
                </div>
              </div>
              
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

export default BusinessManager;
