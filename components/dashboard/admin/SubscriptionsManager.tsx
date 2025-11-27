import React, { useState } from 'react';
import { 
  Zap, Search, Filter, CheckCircle, XCircle, Eye, DollarSign,
  Calendar, Clock, User, Store, TrendingUp, Download, RefreshCw,
  AlertCircle, Smartphone, Monitor, Trash2, Edit
} from 'lucide-react';
import { rayPrices } from '../../common/RayHelpers';

interface Subscription {
  id: string;
  businessName: string;
  plan: 'basic' | 'premium' | 'enterprise';
  status: 'active' | 'expired' | 'cancelled' | 'paused';
  startDate: string;
  endDate: string;
  price: number;
  features: string[];
  maxUsers: number;
  currentUsers: number;
  autoRenew: boolean;
}

const initialSubscriptions: Subscription[] = [
  {
    id: 'SUB-001',
    businessName: 'مطعم الدار الذهبية',
    plan: 'premium',
    status: 'active',
    startDate: '2024-11-01',
    endDate: '2024-12-01',
    price: 5000,
    features: ['POS System', 'Delivery Integration', 'Analytics', 'Support 24/7'],
    maxUsers: 10,
    currentUsers: 7,
    autoRenew: true
  },
  {
    id: 'SUB-002',
    businessName: 'متجر الملابس الحديثة',
    plan: 'basic',
    status: 'active',
    startDate: '2024-10-15',
    endDate: '2024-11-15',
    price: 2000,
    features: ['Basic POS', 'Inventory', 'Reports'],
    maxUsers: 3,
    currentUsers: 2,
    autoRenew: true
  },
  {
    id: 'SUB-003',
    businessName: 'عيادة الأسنان',
    plan: 'enterprise',
    status: 'active',
    startDate: '2024-09-01',
    endDate: '2025-09-01',
    price: 15000,
    features: ['Full Suite', 'Custom Integration', 'Dedicated Support', 'API Access', 'White Label'],
    maxUsers: 50,
    currentUsers: 15,
    autoRenew: true
  },
  {
    id: 'SUB-004',
    businessName: 'صالون الجمال',
    plan: 'premium',
    status: 'expired',
    startDate: '2024-10-01',
    endDate: '2024-11-01',
    price: 5000,
    features: ['POS System', 'Delivery Integration', 'Analytics', 'Support 24/7'],
    maxUsers: 10,
    currentUsers: 5,
    autoRenew: false
  }
];

const SubscriptionsManager: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.businessName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = selectedPlan === 'all' || sub.plan === selectedPlan;
    const matchesStatus = selectedStatus === 'all' || sub.status === selectedStatus;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const getPlanColor = (plan: string) => {
    switch(plan) {
      case 'basic': return 'bg-blue-100 text-blue-700';
      case 'premium': return 'bg-purple-100 text-purple-700';
      case 'enterprise': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'expired': return 'bg-red-100 text-red-700';
      case 'cancelled': return 'bg-gray-100 text-gray-700';
      case 'paused': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPlanLabel = (plan: string) => {
    switch(plan) {
      case 'basic': return 'أساسي';
      case 'premium': return 'مميز';
      case 'enterprise': return 'مؤسسي';
      default: return plan;
    }
  };

  const stats = {
    total: subscriptions.length,
    active: subscriptions.filter(s => s.status === 'active').length,
    expired: subscriptions.filter(s => s.status === 'expired').length,
    revenue: subscriptions.filter(s => s.status === 'active').reduce((sum, s) => sum + s.price, 0)
  };

  return (
    <div className="w-full flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2 overflow-x-hidden">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm w-full">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="w-full lg:w-auto">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Zap className="w-5 md:w-6 h-5 md:h-6 text-yellow-600" />
              الاشتراكات والخطط
            </h2>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">إدارة اشتراكات المحلات والخطط</p>
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

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-6 w-full">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">إجمالي</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.active}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">نشطة</div>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.expired}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">منتهية</div>
          </div>
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{rayPrices.format(stats.revenue)}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">الإيراد</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col gap-4 w-full overflow-x-hidden">
        <div className="flex-1 relative w-full">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="بحث عن اشتراك..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white text-sm md:text-base"
          />
        </div>

        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto w-full">
          {['all', 'basic', 'premium', 'enterprise'].map(plan => (
            <button 
              key={plan}
              onClick={() => setSelectedPlan(plan)}
              className={`px-2 md:px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition whitespace-nowrap
                ${selectedPlan === plan ? 'bg-white dark:bg-gray-600 text-blue-700 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
              `}
            >
              {plan === 'all' ? 'كل الخطط' : getPlanLabel(plan)}
            </button>
          ))}
        </div>

        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto w-full">
          {['all', 'active', 'expired', 'cancelled', 'paused'].map(status => (
            <button 
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-2 md:px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition whitespace-nowrap
                ${selectedStatus === status ? 'bg-white dark:bg-gray-600 text-blue-700 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
              `}
            >
              {status === 'all' ? 'كل الحالات' : status === 'active' ? 'نشطة' : status === 'expired' ? 'منتهية' : status === 'cancelled' ? 'ملغاة' : 'موقوفة'}
            </button>
          ))}
        </div>
      </div>

      {/* Subscriptions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
        {filteredSubscriptions.map((subscription) => (
          <div key={subscription.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 md:p-6 shadow-sm hover:shadow-md transition-all w-full">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm md:text-lg text-gray-800 dark:text-white truncate">{subscription.businessName}</h3>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 truncate">{subscription.id}</p>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${getPlanColor(subscription.plan)}`}>
                  {getPlanLabel(subscription.plan)}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-bold whitespace-nowrap ${getStatusColor(subscription.status)}`}>
                  {subscription.status === 'active' ? 'نشطة' : subscription.status === 'expired' ? 'منتهية' : subscription.status === 'cancelled' ? 'ملغاة' : 'موقوفة'}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">السعر الشهري</span>
                <span className="font-bold text-green-600 dark:text-green-400">{rayPrices.format(subscription.price)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">المستخدمون</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{subscription.currentUsers}/{subscription.maxUsers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">تاريخ الانتهاء</span>
                <span className="text-xs md:text-sm text-gray-800 dark:text-gray-200">{subscription.endDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">التجديد التلقائي</span>
                <span className={`text-xs font-bold ${subscription.autoRenew ? 'text-green-600' : 'text-red-600'}`}>
                  {subscription.autoRenew ? 'مفعل' : 'معطل'}
                </span>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 w-full">
              <button className="flex-1 flex items-center justify-center gap-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-xs md:text-sm">
                <Edit className="w-4 h-4" />
                <span className="hidden sm:inline">تعديل</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-xs md:text-sm">
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">حذف</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsManager;
