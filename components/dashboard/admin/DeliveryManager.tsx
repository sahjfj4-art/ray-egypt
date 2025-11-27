import React, { useState } from 'react';
import { 
  MapPin, Truck, Clock, CheckCircle, AlertTriangle, Plus, Search, Filter,
  Navigation, Phone, User, Package, DollarSign, Calendar, Mail, Star,
  MessageSquare, Route, Map, BarChart3, Users
} from 'lucide-react';
import { rayPrices, rayColors } from '../../common/RayHelpers';

interface Delivery {
  id: string;
  orderId: string;
  customer: string;
  customerEmail: string;
  phone: string;
  address: string;
  driver: string;
  driverPhone: string;
  driverRating?: number;
  status: 'assigned' | 'picked_up' | 'in_transit' | 'delivered' | 'failed' | 'cancelled';
  estimatedTime: string;
  actualTime?: string;
  distance: number;
  cost: number;
  paymentStatus: 'paid' | 'pending' | 'cod';
  items: number;
  vehicleType: 'motorcycle' | 'car' | 'van' | 'truck';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  notes?: string;
  createdAt: string;
  updatedAt: string;
  customerLocation?: {
    lat: number;
    lng: number;
  };
}

const initialDeliveries: Delivery[] = [
  {
    id: 'DEL-001',
    orderId: 'ORD-2024-001',
    customer: 'أحمد محمد',
    customerEmail: 'ahmed@example.com',
    phone: '01234567890',
    address: '15 شارع النيل، القاهرة',
    driver: 'محمود أحمد',
    driverPhone: '01098765432',
    driverRating: 4.8,
    status: 'in_transit',
    estimatedTime: '02:30 م',
    distance: 8.5,
    cost: 45,
    paymentStatus: 'paid',
    items: 5,
    vehicleType: 'motorcycle',
    priority: 'normal',
    notes: 'العميل يطلب التوصيل للدور الثاني',
    createdAt: '2024-11-26 10:00',
    updatedAt: '2024-11-26 11:30',
    customerLocation: { lat: 30.0444, lng: 31.2357 }
  },
  {
    id: 'DEL-002',
    orderId: 'ORD-2024-002',
    customer: 'سارة أحمد',
    customerEmail: 'sarah@example.com',
    phone: '01123456789',
    address: '32 شارع الجامعة، الجيزة',
    driver: 'خالد علي',
    driverPhone: '01287654321',
    driverRating: 4.5,
    status: 'delivered',
    estimatedTime: '01:45 م',
    actualTime: '01:40 م',
    distance: 12.3,
    cost: 65,
    paymentStatus: 'cod',
    items: 8,
    vehicleType: 'car',
    priority: 'normal',
    notes: 'تم التسليم بنجاح - العميل راضي',
    createdAt: '2024-11-26 09:00',
    updatedAt: '2024-11-26 13:40',
    customerLocation: { lat: 30.0131, lng: 31.2089 }
  },
  {
    id: 'DEL-003',
    orderId: 'ORD-2024-003',
    customer: 'محمد خالد',
    customerEmail: 'mohammed@example.com',
    phone: '01012345678',
    address: '7 شارع الحرية، الإسكندرية',
    driver: 'عمر حسن',
    driverPhone: '01543210987',
    driverRating: 4.9,
    status: 'assigned',
    estimatedTime: '03:15 م',
    distance: 15.7,
    cost: 85,
    paymentStatus: 'paid',
    items: 12,
    vehicleType: 'van',
    priority: 'high',
    notes: 'شحنة كبيرة - تحتاج مساعدة في التحميل',
    createdAt: '2024-11-26 11:00',
    updatedAt: '2024-11-26 11:15',
    customerLocation: { lat: 31.2001, lng: 29.9187 }
  },
  {
    id: 'DEL-004',
    orderId: 'ORD-2024-004',
    customer: 'فاطمة علي',
    customerEmail: 'fatima@example.com',
    phone: '01567890123',
    address: '25 شارع الملك فهد، الرياض',
    driver: 'ياسر محمود',
    driverPhone: '01123456789',
    driverRating: 4.2,
    status: 'failed',
    estimatedTime: '04:00 م',
    distance: 22.1,
    cost: 120,
    paymentStatus: 'pending',
    items: 6,
    vehicleType: 'car',
    priority: 'normal',
    notes: 'فشل التسليم - العميل غير متواجد',
    createdAt: '2024-11-26 08:00',
    updatedAt: '2024-11-26 16:30',
    customerLocation: { lat: 24.7136, lng: 46.6753 }
  },
  {
    id: 'DEL-005',
    orderId: 'ORD-2024-005',
    customer: 'عبدالله سالم',
    customerEmail: 'abdullah@example.com',
    phone: '01234567891',
    address: '18 شارع الأمل، دبي',
    driver: 'سالم محمد',
    driverPhone: '0501234567',
    driverRating: 4.7,
    status: 'picked_up',
    estimatedTime: '05:30 م',
    distance: 18.9,
    cost: 95,
    paymentStatus: 'paid',
    items: 9,
    vehicleType: 'truck',
    priority: 'urgent',
    notes: 'شحنة مستعجلة - توصيل خلال ساعتين',
    createdAt: '2024-11-26 12:00',
    updatedAt: '2024-11-26 14:00',
    customerLocation: { lat: 25.2048, lng: 55.2708 }
  }
];

const DeliveryManager: React.FC = () => {
  const [deliveries, setDeliveries] = useState(initialDeliveries);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDriver, setSelectedDriver] = useState('all');
  const [showMapModal, setShowMapModal] = useState(false);

  const statuses = ['all', 'assigned', 'picked_up', 'in_transit', 'delivered', 'failed'];
  const drivers = ['all', 'محمود أحمد', 'خالد علي', 'عمر حسن', 'سالم محمد'];

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || delivery.status === selectedStatus;
    const matchesDriver = selectedDriver === 'all' || delivery.driver === selectedDriver;
    return matchesSearch && matchesStatus && matchesDriver;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'assigned': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'picked_up': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'in_transit': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'failed': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'assigned': return 'تم التكليف';
      case 'picked_up': return 'تم الاستلام';
      case 'in_transit': return 'قيد التوصيل';
      case 'delivered': return 'تم التوصيل';
      case 'failed': return 'فشل التوصيل';
      default: return status;
    }
  };

  const getPaymentColor = (status: string) => {
    switch(status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cod': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentLabel = (status: string) => {
    switch(status) {
      case 'paid': return 'مدفوع';
      case 'pending': return 'معلق';
      case 'cod': return 'الدفع عند الاستلام';
      default: return status;
    }
  };

  const stats = {
    total: deliveries.length,
    assigned: deliveries.filter(d => d.status === 'assigned').length,
    inTransit: deliveries.filter(d => d.status === 'in_transit').length,
    delivered: deliveries.filter(d => d.status === 'delivered').length,
    failed: deliveries.filter(d => d.status === 'failed').length,
    totalRevenue: deliveries.filter(d => d.paymentStatus === 'paid').reduce((sum, d) => sum + d.cost, 0)
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header with Stats */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <MapPin className="w-6 h-6 text-green-600" />
              إدارة التوصيل والتوزيع
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">تتبع وتنسيق عمليات التوصيل</p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setShowMapModal(true)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition-colors"
            >
              <Navigation className="w-4 h-4" />
              خريطة التوصيل
            </button>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              تكليف جديد
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">إجمالي</div>
          </div>
          <div className="text-center p-3 bg-gray-100 dark:bg-gray-600 rounded-lg">
            <div className="text-2xl font-bold text-gray-600 dark:text-gray-300">{stats.assigned}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">مكلف</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.inTransit}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">قيد التوصيل</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.delivered}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">تم التوصيل</div>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.failed}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">فشل</div>
          </div>
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{rayPrices.format(stats.totalRevenue)}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">الإيرادات</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="بحث عن عملية توصيل..."
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
                 ${selectedStatus === status ? 'bg-white dark:bg-gray-600 text-green-700 dark:text-green-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
               `}
             >
               {status === 'all' ? 'الكل' : getStatusLabel(status)}
             </button>
           ))}
        </div>

        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto max-w-full">
           {drivers.map(driver => (
             <button 
               key={driver}
               onClick={() => setSelectedDriver(driver)}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap
                 ${selectedDriver === driver ? 'bg-white dark:bg-gray-600 text-green-700 dark:text-green-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
               `}
             >
               {driver === 'all' ? 'كل السائقين' : driver}
             </button>
           ))}
        </div>
      </div>

      {/* Deliveries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeliveries.map((delivery) => (
          <div key={delivery.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{delivery.orderId}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{delivery.customer}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(delivery.status)}`}>
                {getStatusLabel(delivery.status)}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-800 dark:text-white">{delivery.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-800 dark:text-white">{delivery.driver}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {delivery.driverPhone}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">الوقت المتوقع</p>
                    <p className="text-sm font-bold text-gray-800 dark:text-white">{delivery.estimatedTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">المسافة</p>
                    <p className="text-sm font-bold text-gray-800 dark:text-white">{delivery.distance} كم</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                <div>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${getPaymentColor(delivery.paymentStatus)}`}>
                    {getPaymentLabel(delivery.paymentStatus)}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{delivery.items} قطعة</p>
                </div>
                <div className="text-left">
                  <p className="text-lg font-black text-gray-800 dark:text-white">{rayPrices.format(delivery.cost)}</p>
                </div>
              </div>

              {delivery.notes && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                  <p className="text-xs text-yellow-700 dark:text-yellow-400">
                    <AlertTriangle className="w-3 h-3 inline ml-1" />
                    {delivery.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 py-2 rounded-lg font-bold text-sm hover:bg-green-100 dark:hover:bg-green-900/40 transition">
                <Navigation className="w-4 h-4" />
                تتبع
              </button>
              <button className="p-2 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDeliveries.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
          <MapPin className="w-12 h-12 mb-4 text-gray-300 dark:text-gray-600" />
          <p className="font-bold">لا توجد عمليات توصيل</p>
          <p className="text-sm">لم يتم العثور على عمليات توصيل تطابق البحث</p>
        </div>
      )}
    </div>
  );
};

export default DeliveryManager;
