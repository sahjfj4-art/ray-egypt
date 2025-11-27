import React, { useState } from 'react';
import { 
  Clock, Search, Filter, Eye, Download, AlertTriangle, CheckCircle,
  Info, User, Shield, Settings, Database, FileText, Calendar
} from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  userId: string;
  action: string;
  category: 'user' | 'system' | 'security' | 'data' | 'settings';
  description: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'warning' | 'error' | 'info';
  details?: any;
}

const initialLogs: AuditLog[] = [
  {
    id: 'LOG-001',
    timestamp: '2024-11-26 10:30:15',
    user: 'أحمد محمد',
    userId: 'USR-001',
    action: 'تسجيل الدخول',
    category: 'security',
    description: 'تم تسجيل الدخول بنجاح من عنوان IP: 192.168.1.100',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    status: 'success'
  },
  {
    id: 'LOG-002',
    timestamp: '2024-11-26 10:25:30',
    user: 'سارة أحمد',
    userId: 'USR-002',
    action: 'إنشاء تقرير',
    category: 'data',
    description: 'تم إنشاء التقرير المالي الشهري (RPT-001)',
    ipAddress: '192.168.1.105',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    status: 'success',
    details: {
      reportId: 'RPT-001',
      reportType: 'financial',
      period: 'نوفمبر 2024'
    }
  },
  {
    id: 'LOG-003',
    timestamp: '2024-11-26 10:15:45',
    user: 'النظام',
    userId: 'SYS-001',
    action: 'نسخ احتياطي تلقائي',
    category: 'system',
    description: 'تم إجراء نسخ احتياطي لقاعدة البيانات بنجاح',
    ipAddress: '127.0.0.1',
    userAgent: 'System Scheduler',
    status: 'success',
    details: {
      backupSize: '2.4 GB',
      backupPath: '/backups/db_20241126_101545.sql',
      duration: '45 ثانية'
    }
  },
  {
    id: 'LOG-004',
    timestamp: '2024-11-26 10:10:20',
    user: 'محمد خالد',
    userId: 'USR-003',
    action: 'محاولة دخول فاشلة',
    category: 'security',
    description: 'فشل محاولة الدخول - كلمة مرور غير صحيحة',
    ipAddress: '192.168.1.110',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0)',
    status: 'warning',
    details: {
      attempts: 3,
      reason: 'invalid_password',
      lockedUntil: '2024-11-26 10:40:20'
    }
  },
  {
    id: 'LOG-005',
    timestamp: '2024-11-26 09:55:10',
    user: 'مدير النظام',
    userId: 'USR-001',
    action: 'تعديل إعدادات',
    category: 'settings',
    description: 'تم تحديث إعدادات الأمان - فرض المصادقة الثنائية',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    status: 'info',
    details: {
      setting: 'force_2fa',
      oldValue: false,
      newValue: true
    }
  }
];

const AuditLogs: React.FC = () => {
  const [logs, setLogs] = useState(initialLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [showDetailsModal, setShowDetailsModal] = useState<AuditLog | null>(null);

  const categories = ['all', 'user', 'system', 'security', 'data', 'settings'];
  const statuses = ['all', 'success', 'warning', 'error', 'info'];
  const dates = ['all', 'اليوم', 'الأمس', 'آخر 7 أيام', 'آخر 30 يوم'];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || log.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || log.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'user': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'system': return 'bg-green-100 text-green-700 border-green-200';
      case 'security': return 'bg-red-100 text-red-700 border-red-200';
      case 'data': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'settings': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'user': return 'مستخدم';
      case 'system': return 'نظام';
      case 'security': return 'أمان';
      case 'data': return 'بيانات';
      case 'settings': return 'إعدادات';
      default: return category;
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'info': return <Info className="w-4 h-4 text-blue-500" />;
      default: return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const stats = {
    total: logs.length,
    success: logs.filter(l => l.status === 'success').length,
    warning: logs.filter(l => l.status === 'warning').length,
    error: logs.filter(l => l.status === 'error').length,
    security: logs.filter(l => l.category === 'security').length,
    today: logs.filter(l => l.timestamp.startsWith('2024-11-26')).length
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header with Stats */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Clock className="w-6 h-6 text-orange-600" />
              سجل النشاطات
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">سجل كافة الأنشطة والعمليات في النظام</p>
          </div>
          
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-700 transition-colors">
              <Download className="w-4 h-4" />
              تصدير السجل
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">إجمالي</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.success}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">نجح</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.warning}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">تحذير</div>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.error}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">خطأ</div>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.security}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">أمان</div>
          </div>
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.today}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">اليوم</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="بحث في سجل النشاطات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>
        
        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto max-w-full">
           {categories.map(category => (
             <button 
               key={category}
               onClick={() => setSelectedCategory(category)}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap
                 ${selectedCategory === category ? 'bg-white dark:bg-gray-600 text-orange-700 dark:text-orange-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
               `}
             >
               {category === 'all' ? 'كل الفئات' : getCategoryLabel(category)}
             </button>
           ))}
        </div>

        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto max-w-full">
           {statuses.map(status => (
             <button 
               key={status}
               onClick={() => setSelectedStatus(status)}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap
                 ${selectedStatus === status ? 'bg-white dark:bg-gray-600 text-orange-700 dark:text-orange-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
               `}
             >
               {status === 'all' ? 'كل الحالات' : status}
             </button>
           ))}
        </div>

        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto max-w-full">
           {dates.map(date => (
             <button 
               key={date}
               onClick={() => setSelectedDate(date)}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap
                 ${selectedDate === date ? 'bg-white dark:bg-gray-600 text-orange-700 dark:text-orange-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
               `}
             >
               {date === 'all' ? 'كل الفترات' : date}
             </button>
           ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">الوقت</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">المستخدم</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">الإجراء</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">الفئة</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">الوصف</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">IP</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{log.timestamp}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{log.user}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{log.userId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">{log.action}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getCategoryColor(log.category)}`}>
                      {getCategoryLabel(log.category)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(log.status)}
                      <span className="text-sm text-gray-900 dark:text-white">{log.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate" title={log.description}>
                      {log.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{log.ipAddress}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setShowDetailsModal(log)}
                        className="p-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-100 dark:hover:bg-blue-900/40 transition"
                      >
                        <Eye className="w-4 h-4" />
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
      {filteredLogs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
          <Clock className="w-12 h-12 mb-4 text-gray-300 dark:text-gray-600" />
          <p className="font-bold">لا توجد سجلات</p>
          <p className="text-sm">لم يتم العثور على سجلات تطابق البحث</p>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">تفاصيل السجل</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">المعرف</label>
                  <p className="font-bold text-gray-800 dark:text-white">{showDetailsModal.id}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">الوقت</label>
                  <p className="font-bold text-gray-800 dark:text-white">{showDetailsModal.timestamp}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">المستخدم</label>
                  <p className="font-bold text-gray-800 dark:text-white">{showDetailsModal.user}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">الإجراء</label>
                  <p className="font-bold text-gray-800 dark:text-white">{showDetailsModal.action}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">الوصف</label>
                <p className="text-gray-800 dark:text-white mt-1">{showDetailsModal.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">عنوان IP</label>
                  <p className="font-bold text-gray-800 dark:text-white">{showDetailsModal.ipAddress}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">المتصفح</label>
                  <p className="text-sm text-gray-800 dark:text-white truncate" title={showDetailsModal.userAgent}>
                    {showDetailsModal.userAgent}
                  </p>
                </div>
              </div>
              
              {showDetailsModal.details && (
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">تفاصيل إضافية</label>
                  <pre className="mt-1 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs text-gray-800 dark:text-gray-200 overflow-x-auto">
                    {JSON.stringify(showDetailsModal.details, null, 2)}
                  </pre>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button 
                onClick={() => setShowDetailsModal(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700 transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditLogs;
