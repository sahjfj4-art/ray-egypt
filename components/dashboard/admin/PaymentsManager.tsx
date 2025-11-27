import React, { useState } from 'react';
import { 
  CreditCard, Search, Filter, CheckCircle, XCircle, Eye, DollarSign,
  Calendar, Clock, User, Store, TrendingUp, Download, RefreshCw,
  AlertCircle, Smartphone, Monitor
} from 'lucide-react';
import { rayPrices } from '../../common/RayHelpers';

interface Payment {
  id: string;
  transactionId: string;
  businessName: string;
  amount: number;
  currency: string;
  method: 'card' | 'bank' | 'wallet' | 'cash';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  date: string;
  time: string;
  description: string;
  fee: number;
  net: number;
}

const initialPayments: Payment[] = [
  {
    id: 'PAY-001',
    transactionId: 'TXN-2024-11-26-001',
    businessName: 'مطعم الدار الذهبية',
    amount: 5000,
    currency: 'EGP',
    method: 'card',
    status: 'completed',
    date: '2024-11-26',
    time: '14:30',
    description: 'دفعة اشتراك شهري',
    fee: 150,
    net: 4850
  },
  {
    id: 'PAY-002',
    transactionId: 'TXN-2024-11-26-002',
    businessName: 'متجر الملابس الحديثة',
    amount: 3000,
    currency: 'EGP',
    method: 'bank',
    status: 'completed',
    date: '2024-11-26',
    time: '12:15',
    description: 'دفعة عمولة المبيعات',
    fee: 90,
    net: 2910
  },
  {
    id: 'PAY-003',
    transactionId: 'TXN-2024-11-26-003',
    businessName: 'عيادة الأسنان',
    amount: 2500,
    currency: 'EGP',
    method: 'card',
    status: 'pending',
    date: '2024-11-26',
    time: '10:45',
    description: 'دفعة خدمات إضافية',
    fee: 75,
    net: 2425
  },
  {
    id: 'PAY-004',
    transactionId: 'TXN-2024-11-25-001',
    businessName: 'صالون الجمال',
    amount: 1500,
    currency: 'EGP',
    method: 'wallet',
    status: 'failed',
    date: '2024-11-25',
    time: '16:20',
    description: 'محاولة دفع فاشلة',
    fee: 0,
    net: 0
  }
];

const PaymentsManager: React.FC = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedMethod, setSelectedMethod] = useState('all');

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus;
    const matchesMethod = selectedMethod === 'all' || payment.method === selectedMethod;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'refunded': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getMethodLabel = (method: string) => {
    switch(method) {
      case 'card': return 'بطاقة ائتمان';
      case 'bank': return 'تحويل بنكي';
      case 'wallet': return 'محفظة رقمية';
      case 'cash': return 'نقداً';
      default: return method;
    }
  };

  const stats = {
    total: payments.length,
    completed: payments.filter(p => p.status === 'completed').length,
    pending: payments.filter(p => p.status === 'pending').length,
    totalAmount: payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.net, 0)
  };

  return (
    <div className="w-full flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2 overflow-x-hidden">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm w-full">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="w-full lg:w-auto">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <CreditCard className="w-5 md:w-6 h-5 md:h-6 text-green-600" />
              إدارة الدفعات
            </h2>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">تتبع ومراقبة جميع المعاملات المالية</p>
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
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">مكتملة</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">قيد الانتظار</div>
          </div>
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{rayPrices.format(stats.totalAmount)}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">الإجمالي</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col gap-4 w-full overflow-x-hidden">
        <div className="flex-1 relative w-full">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="بحث عن دفعة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white text-sm md:text-base"
          />
        </div>

        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto w-full">
          {['all', 'completed', 'pending', 'failed', 'refunded'].map(status => (
            <button 
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-2 md:px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition whitespace-nowrap
                ${selectedStatus === status ? 'bg-white dark:bg-gray-600 text-blue-700 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
              `}
            >
              {status === 'all' ? 'كل الحالات' : status === 'completed' ? 'مكتملة' : status === 'pending' ? 'قيد الانتظار' : status === 'failed' ? 'فاشلة' : 'مسترجعة'}
            </button>
          ))}
        </div>

        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto w-full">
          {['all', 'card', 'bank', 'wallet', 'cash'].map(method => (
            <button 
              key={method}
              onClick={() => setSelectedMethod(method)}
              className={`px-2 md:px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition whitespace-nowrap
                ${selectedMethod === method ? 'bg-white dark:bg-gray-600 text-blue-700 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
              `}
            >
              {method === 'all' ? 'كل الطرق' : getMethodLabel(method)}
            </button>
          ))}
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden w-full">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-4 py-3 text-right text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300">المحل</th>
                <th className="px-4 py-3 text-right text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300">المبلغ</th>
                <th className="px-4 py-3 text-right text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300">الطريقة</th>
                <th className="px-4 py-3 text-right text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300">الحالة</th>
                <th className="px-4 py-3 text-right text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300">التاريخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <td className="px-4 py-3 text-xs md:text-sm text-gray-800 dark:text-gray-200">{payment.businessName}</td>
                  <td className="px-4 py-3 text-xs md:text-sm font-bold text-green-600 dark:text-green-400">{rayPrices.format(payment.amount)}</td>
                  <td className="px-4 py-3 text-xs md:text-sm text-gray-600 dark:text-gray-400">{getMethodLabel(payment.method)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(payment.status)}`}>
                      {payment.status === 'completed' ? 'مكتملة' : payment.status === 'pending' ? 'قيد الانتظار' : payment.status === 'failed' ? 'فاشلة' : 'مسترجعة'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs md:text-sm text-gray-600 dark:text-gray-400">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsManager;
