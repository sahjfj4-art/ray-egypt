import React, { useState } from 'react';
import { 
  Truck, Package, MapPin, Plus, Search, Filter, Edit, Trash2, Eye,
  Clock, CheckCircle, AlertTriangle, TrendingUp, TrendingDown, Navigation,
  Calendar, DollarSign, Box, User, Phone, Mail, BarChart3
} from 'lucide-react';
import { rayPrices, rayColors } from '../../common/RayHelpers';

interface Shipment {
  id: string;
  trackingNumber: string;
  customer: string;
  customerEmail: string;
  customerPhone: string;
  origin: string;
  destination: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'delayed' | 'cancelled';
  estimatedDelivery: string;
  actualDelivery?: string;
  cost: number;
  weight: number;
  carrier: string;
  priority: 'standard' | 'express' | 'overnight';
  items: number;
  dimensions?: string;
  insurance?: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

const initialShipments: Shipment[] = [
  { 
    id: 'SHP-001', 
    trackingNumber: 'TRK-2024-001', 
    customer: 'أحمد محمد', 
    customerEmail: 'ahmed@example.com',
    customerPhone: '01234567890',
    origin: 'القاهرة', 
    destination: 'الإسكندرية', 
    status: 'in_transit', 
    estimatedDelivery: '2024-11-28', 
    cost: 150, 
    weight: 2.5, 
    carrier: 'شركة الشحن السريع', 
    priority: 'standard',
    items: 3,
    dimensions: '30x20x15 سم',
    insurance: true,
    notes: 'شحنة هشة - تعامل بحذر',
    createdAt: '2024-11-25',
    updatedAt: '2024-11-26'
  },
  { 
    id: 'SHP-002', 
    trackingNumber: 'TRK-2024-002', 
    customer: 'سارة أحمد', 
    customerEmail: 'sarah@example.com',
    customerPhone: '01123456789',
    origin: 'القاهرة', 
    destination: 'الأقصر', 
    status: 'delayed', 
    estimatedDelivery: '2024-11-26', 
    actualDelivery: '2024-11-27',
    cost: 280, 
    weight: 5.2, 
    carrier: 'النقل الوطني', 
    priority: 'express',
    items: 8,
    dimensions: '50x40x30 سم',
    insurance: false,
    notes: 'تأخير بسبب الطقس',
    createdAt: '2024-11-24',
    updatedAt: '2024-11-26'
  },
  { 
    id: 'SHP-003', 
    trackingNumber: 'TRK-2024-003', 
    customer: 'محمد خالد', 
    customerEmail: 'mohammed@example.com',
    customerPhone: '01012345678',
    origin: 'الجيزة', 
    destination: 'الإسماعيلية', 
    status: 'delivered', 
    estimatedDelivery: '2024-11-25', 
    actualDelivery: '2024-11-25',
    cost: 95, 
    weight: 1.8, 
    carrier: 'شحن سريع', 
    priority: 'standard',
    items: 2,
    dimensions: '25x25x20 سم',
    insurance: true,
    notes: 'تم التسليم بنجاح',
    createdAt: '2024-11-24',
    updatedAt: '2024-11-25'
  },
  { 
    id: 'SHP-004', 
    trackingNumber: 'TRK-2024-004', 
    customer: 'فاطمة علي', 
    customerEmail: 'fatima@example.com',
    customerPhone: '01567890123',
    origin: 'المنصورة', 
    destination: 'أسوان', 
    status: 'pending', 
    estimatedDelivery: '2024-11-29', 
    cost: 420, 
    weight: 8.5, 
    carrier: 'النقل الوطني', 
    priority: 'overnight',
    items: 12,
    dimensions: '60x50x40 سم',
    insurance: true,
    notes: 'شحنة كبيرة - تحتاج إلى رفع',
    createdAt: '2024-11-26',
    updatedAt: '2024-11-26'
  },
  { 
    id: 'SHP-005', 
    trackingNumber: 'TRK-2024-005', 
    customer: 'عبدالله سالم', 
    customerEmail: 'abdullah@example.com',
    customerPhone: '01234567891',
    origin: 'القاهرة', 
    destination: 'السويس', 
    status: 'cancelled', 
    estimatedDelivery: '2024-11-27', 
    cost: 180, 
    weight: 3.2, 
    carrier: 'شركة الشحن السريع', 
    priority: 'express',
    items: 5,
    dimensions: '40x30x25 سم',
    insurance: false,
    notes: 'إلغاء من العميل',
    createdAt: '2024-11-25',
    updatedAt: '2024-11-26'
  }
];

const ShippingManager: React.FC<{ view?: string }> = ({ view = 'shipping' }) => {
  const [shipments, setShipments] = useState(initialShipments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCarrier, setSelectedCarrier] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const statuses = ['all', 'pending', 'in_transit', 'delivered', 'delayed', 'cancelled'];
  const carriers = ['all', 'شركة الشحن السريع', 'النقل الوطني', 'النقل المحلي'];

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || shipment.status === selectedStatus;
    const matchesCarrier = selectedCarrier === 'all' || shipment.carrier === selectedCarrier;
    return matchesSearch && matchesStatus && matchesCarrier;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'in_transit': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'delayed': return 'bg-red-100 text-red-700 border-red-200';
      case 'cancelled': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'pending': return 'في الانتظار';
      case 'in_transit': return 'قيد الشحن';
      case 'delivered': return 'تم التسليم';
      case 'delayed': return 'متأخرة';
      case 'cancelled': return 'ملغاة';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'standard': return 'bg-gray-100 text-gray-700';
      case 'express': return 'bg-blue-100 text-blue-700';
      case 'overnight': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch(priority) {
      case 'standard': return 'عادي';
      case 'express': return 'سريع';
      case 'overnight': return 'طاري';
      default: return priority;
    }
  };

  const stats = {
    total: shipments.length,
    pending: shipments.filter(s => s.status === 'pending').length,
    inTransit: shipments.filter(s => s.status === 'in_transit').length,
    delivered: shipments.filter(s => s.status === 'delivered').length,
    delayed: shipments.filter(s => s.status === 'delayed').length,
    totalRevenue: shipments.reduce((sum, s) => sum + s.cost, 0)
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header with Stats */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Truck className="w-6 h-6 text-blue-600" />
              إدارة الشحنات
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">تتبع وإدارة جميع الشحنات</p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              شحنة جديدة
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">إجمالي</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">في الانتظار</div>
          </div>
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.inTransit}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">قيد الشحن</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.delivered}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">تم التسليم</div>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.delayed}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">متأخرة</div>
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
            placeholder="بحث عن شحنة..."
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
               {status === 'all' ? 'الكل' : getStatusLabel(status)}
             </button>
           ))}
        </div>

        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto max-w-full">
           {carriers.map(carrier => (
             <button 
               key={carrier}
               onClick={() => setSelectedCarrier(carrier)}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap
                 ${selectedCarrier === carrier ? 'bg-white dark:bg-gray-600 text-blue-700 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
               `}
             >
               {carrier === 'all' ? 'كل الناقلين' : carrier}
             </button>
           ))}
        </div>
      </div>

      {/* Shipments Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">رقم التتبع</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">العميل</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">المسار</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">الأولوية</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">التسليم المتوقع</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">التكلفة</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredShipments.map((shipment) => (
                <tr key={shipment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">{shipment.trackingNumber}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{shipment.items} قطعة</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{shipment.customer}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{shipment.weight} كجم</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{shipment.origin}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {shipment.destination}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(shipment.status)}`}>
                      {getStatusLabel(shipment.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getPriorityColor(shipment.priority)}`}>
                      {getPriorityLabel(shipment.priority)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{shipment.estimatedDelivery}</div>
                    {shipment.actualDelivery && (
                      <div className="text-xs text-green-600 dark:text-green-400">تم: {shipment.actualDelivery}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">{rayPrices.format(shipment.cost)}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{shipment.carrier}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">
                    <div className="flex gap-2">
                      <button className="p-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-100 dark:hover:bg-blue-900/40 transition">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredShipments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
          <Truck className="w-12 h-12 mb-4 text-gray-300 dark:text-gray-600" />
          <p className="font-bold">لا توجد شحنات</p>
          <p className="text-sm">لم يتم العثور على شحنات تطابق البحث</p>
        </div>
      )}
    </div>
  );
};

export default ShippingManager;
