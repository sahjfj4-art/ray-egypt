import React, { useState } from 'react';
import { 
  FileText, BarChart3, PieChart, TrendingUp, Download, Filter, Calendar,
  DollarSign, Users, Package, Truck, ArrowUp, ArrowDown, Eye, Share2, Search, Clock, Star,
  Mail, Send, File, Database, Activity, Target, Zap, Award, AlertCircle
} from 'lucide-react';
import { rayPrices, rayColors } from '../../common/RayHelpers';

interface Report {
  id: string;
  name: string;
  description?: string;
  type: 'financial' | 'sales' | 'operations' | 'customers' | 'inventory' | 'shipping';
  period: string;
  generatedAt: string;
  generatedBy: string;
  status: 'ready' | 'generating' | 'scheduled' | 'failed';
  size: string;
  format: 'pdf' | 'excel' | 'csv';
  downloads: number;
  sharedWith?: string[];
  tags?: string[];
  keyMetrics: {
    label: string;
    value: string;
    trend: number;
    icon: any;
  }[];
}

const initialReports: Report[] = [
  {
    id: 'RPT-001',
    name: 'التقرير المالي الشهري',
    description: 'تحليل شامل للأداء المالي الشهري مع مقارنات وتوقعات',
    type: 'financial',
    period: 'نوفمبر 2024',
    generatedAt: '2024-11-26 10:30',
    generatedBy: 'أحمد محمد',
    status: 'ready',
    size: '2.4 MB',
    format: 'pdf',
    downloads: 47,
    sharedWith: ['admin@company.com', 'finance@company.com'],
    tags: ['شهري', 'مالي', 'مهم'],
    keyMetrics: [
      { label: 'إجمالي الإيرادات', value: '2.8M ج', trend: 18, icon: DollarSign },
      { label: 'نمو المبيعات', value: '+15%', trend: 15, icon: TrendingUp },
      { label: 'عدد العملاء', value: '1,245', trend: 8, icon: Users }
    ]
  },
  {
    id: 'RPT-002',
    name: 'تقرير المبيعات اليومي',
    description: 'ملخص المبيعات اليومية حسب الفئات والمناطق',
    type: 'sales',
    period: 'اليوم',
    generatedAt: '2024-11-26 09:00',
    generatedBy: 'النظام',
    status: 'ready',
    size: '856 KB',
    format: 'excel',
    downloads: 23,
    sharedWith: ['sales@company.com'],
    tags: ['يومي', 'مبيعات', 'تلقائي'],
    keyMetrics: [
      { label: 'المبيعات اليوم', value: '45.2K ج', trend: 12, icon: Package },
      { label: 'عدد الطلبات', value: '156', trend: -3, icon: FileText },
      { label: 'متوسط الطلب', value: '290 ج', trend: 8, icon: Target }
    ]
  },
  {
    id: 'RPT-003',
    name: 'تحليل العملاء',
    description: 'تقرير مفصل عن سلوك العملاء والرضا والاحتفاظ',
    type: 'customers',
    period: 'الأسبوع الماضي',
    generatedAt: '2024-11-25 16:45',
    generatedBy: 'سارة أحمد',
    status: 'ready',
    size: '1.2 MB',
    format: 'pdf',
    downloads: 31,
    sharedWith: ['marketing@company.com', 'support@company.com'],
    tags: ['عملاء', 'أسبوعي', 'تحليل'],
    keyMetrics: [
      { label: 'العملاء الجدد', value: '89', trend: 22, icon: Users },
      { label: 'معدل الرضا', value: '4.6/5', trend: 5, icon: Star },
      { label: 'نسبة الاحتفاظ', value: '78%', trend: -2, icon: Activity }
    ]
  },
  {
    id: 'RPT-004',
    name: 'حالة المخزون',
    description: 'تقرير المخزون الحالي والمنتجات منخفضة المخزون',
    type: 'inventory',
    period: 'الربع الحالي',
    generatedAt: '2024-11-26 08:15',
    generatedBy: 'محمد خالد',
    status: 'generating',
    size: '---',
    format: 'csv',
    downloads: 0,
    sharedWith: ['warehouse@company.com'],
    tags: ['مخزون', 'ربع سنوي', 'جاري'],
    keyMetrics: [
      { label: 'إجمالي المنتجات', value: '2,847', trend: 5, icon: Package },
      { label: 'منخفض المخزون', value: '23', trend: -15, icon: AlertCircle },
      { label: 'قيمة المخزون', value: '1.8M ج', trend: 8, icon: DollarSign }
    ]
  },
  {
    id: 'RPT-005',
    name: 'أداء الشحن',
    description: 'تحليل كفاءة عمليات الشحن والتوصيل',
    type: 'shipping',
    period: 'الشهر الماضي',
    generatedAt: '2024-11-20 14:30',
    generatedBy: 'فاطمة علي',
    status: 'ready',
    size: '3.1 MB',
    format: 'pdf',
    downloads: 18,
    sharedWith: ['logistics@company.com'],
    tags: ['شحن', 'شهري', 'لوجستيات'],
    keyMetrics: [
      { label: 'الشحنات المنجزة', value: '1,245', trend: 18, icon: Truck },
      { label: 'وقت التسليم', value: '2.3 يوم', trend: -12, icon: Clock },
      { label: 'التكلفة المتوسطة', value: '45 ج', trend: -5, icon: DollarSign }
    ]
  },
  {
    id: 'RPT-006',
    name: 'التقرير التشغيلي',
    description: 'نظرة عامة على أداء العمليات التشغيلية',
    type: 'operations',
    period: 'الأسبوع الحالي',
    generatedAt: '2024-11-24 11:20',
    generatedBy: 'عبدالله سالم',
    status: 'scheduled',
    size: '---',
    format: 'excel',
    downloads: 0,
    sharedWith: ['operations@company.com'],
    tags: ['تشغيلي', 'أسبوعي', 'مجدول'],
    keyMetrics: [
      { label: 'كفاءة العمليات', value: '87%', trend: 6, icon: Zap },
      { label: 'وقت الاستجابة', value: '1.2 ساعة', trend: -18, icon: Clock },
      { label: 'معدل الإنجاز', value: '92%', trend: 3, icon: Target }
    ]
  }
];

const ReportsManager: React.FC<{ view?: string }> = ({ view = 'reports' }) => {
  const [reports, setReports] = useState(initialReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const types = ['all', 'financial', 'sales', 'operations', 'customers', 'inventory', 'shipping'];
  const periods = ['all', 'اليوم', 'الأسبوع', 'الشهر', 'السنة'];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.generatedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || report.type === selectedType;
    const matchesPeriod = selectedPeriod === 'all' || report.period === selectedPeriod;
    return matchesSearch && matchesType && matchesPeriod;
  });

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'financial': return 'bg-green-100 text-green-700 border-green-200';
      case 'sales': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'operations': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'customers': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'inventory': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'shipping': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'financial': return 'مالي';
      case 'sales': return 'مبيعات';
      case 'operations': return 'عمليات';
      case 'customers': return 'عملاء';
      case 'inventory': return 'مخزون';
      case 'shipping': return 'شحن';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'ready': return 'bg-green-100 text-green-700';
      case 'generating': return 'bg-yellow-100 text-yellow-700';
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'ready': return 'جاهز';
      case 'generating': return 'قيد الإنشاء';
      case 'scheduled': return 'مجدول';
      default: return status;
    }
  };

  const stats = {
    total: reports.length,
    ready: reports.filter(r => r.status === 'ready').length,
    generating: reports.filter(r => r.status === 'generating').length,
    financial: reports.filter(r => r.type === 'financial').length,
    sales: reports.filter(r => r.type === 'sales').length,
    operations: reports.filter(r => r.type === 'operations').length
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header with Stats */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-purple-600" />
              {view === 'analytics' ? 'التحليلات والإحصائيات' : view === 'performance' ? 'الأداء والمؤشرات' : 'التقارير المجمعة'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {view === 'analytics' ? 'تحليلات متقدمة للبيانات والاتجاهات' : view === 'performance' ? 'مؤشرات الأداء الرئيسية KPIs' : 'جميع التقارير المولدة والجاهزة'}
            </p>
          </div>
          
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-purple-700 transition-colors">
              <BarChart3 className="w-4 h-4" />
              تقرير جديد
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">إجمالي التقارير</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.ready}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">جاهزة</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.generating}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">قيد الإنشاء</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.financial}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">مالية</div>
          </div>
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.sales}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">مبيعات</div>
          </div>
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.operations}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">عمليات</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="بحث عن تقرير..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>
        
        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto max-w-full">
           {types.map(type => (
             <button 
               key={type}
               onClick={() => setSelectedType(type)}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap
                 ${selectedType === type ? 'bg-white dark:bg-gray-600 text-purple-700 dark:text-purple-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
               `}
             >
               {type === 'all' ? 'كل الأنواع' : getTypeLabel(type)}
             </button>
           ))}
        </div>

        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto max-w-full">
           {periods.map(period => (
             <button 
               key={period}
               onClick={() => setSelectedPeriod(period)}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap
                 ${selectedPeriod === period ? 'bg-white dark:bg-gray-600 text-purple-700 dark:text-purple-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
               `}
             >
               {period === 'all' ? 'كل الفترات' : period}
             </button>
           ))}
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{report.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{report.id}</p>
              </div>
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getTypeColor(report.type)}`}>
                  {getTypeLabel(report.type)}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(report.status)}`}>
                  {getStatusLabel(report.status)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">الفترة</span>
                <span className="text-sm font-bold text-gray-800 dark:text-white">{report.period}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">الإنشاء</span>
                <span className="text-sm font-bold text-gray-800 dark:text-white">{report.generatedAt}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">بواسطة</span>
                <span className="text-sm font-bold text-gray-800 dark:text-white">{report.generatedBy}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">الحجم</span>
                <span className="text-sm font-bold text-gray-800 dark:text-white">{report.size}</span>
              </div>

              {/* Key Metrics */}
              <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm font-bold text-gray-800 dark:text-white mb-2">المؤشرات الرئيسية:</p>
                <div className="space-y-2">
                  {report.keyMetrics.map((metric, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <metric.icon className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{metric.label}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-gray-800 dark:text-white">{metric.value}</span>
                        {metric.trend !== 0 && (
                          <span className={`text-xs font-bold flex items-center gap-1 ${
                            metric.trend > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {metric.trend > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                            {Math.abs(metric.trend)}%
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex gap-2">
              {report.status === 'ready' && (
                <>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 py-2 rounded-lg font-bold text-sm hover:bg-purple-100 dark:hover:bg-purple-900/40 transition">
                    <Download className="w-4 h-4" />
                    تحميل
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-2 rounded-lg font-bold text-sm hover:bg-blue-100 dark:hover:bg-blue-900/40 transition">
                    <Eye className="w-4 h-4" />
                    عرض
                  </button>
                </>
              )}
              {report.status === 'generating' && (
                <div className="flex-1 flex items-center justify-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 py-2 rounded-lg font-bold text-sm">
                  <div className="w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
                  جاري الإنشاء...
                </div>
              )}
              <button className="p-2 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
          <FileText className="w-12 h-12 mb-4 text-gray-300 dark:text-gray-600" />
          <p className="font-bold">لا توجد تقارير</p>
          <p className="text-sm">لم يتم العثور على تقارير تطابق البحث</p>
        </div>
      )}
    </div>
  );
};

export default ReportsManager;
