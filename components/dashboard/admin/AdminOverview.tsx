import React, { useState } from 'react';
import { 
  Shield, Users, FileText, Truck, MapPin, DollarSign, 
  Settings, AlertTriangle, TrendingUp, TrendingDown, Clock,
  Package, BarChart3, PieChart, CheckCircle, Activity, Store,
  ShoppingCart, CreditCard, Zap, Gift, Bell
} from 'lucide-react';
import ActionButton from '../../common/buttons/ActionButton';
import StatCard from '../../common/cards/StatCard';
import DashboardCustomizer from '../DashboardCustomizer';
import { rayPrices, rayColors } from '../../common/RayHelpers';

interface AdminOverviewProps {
  setActiveTab: (tab: string) => void;
}

const AdminOverview: React.FC<AdminOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const defaultStats = [
    { id: 'stat_users', title: "إجمالي المستخدمين", value: "1,245", sub: "+85 هذا الشهر", icon: Users, color: "blue" as const, trend: 12 },
    { id: 'stat_businesses', title: "الأنشطة التجارية", value: "20", sub: "4 جديدة", icon: Shield, color: "green" as const, trend: 8 },
    { id: 'stat_revenue', title: "إجمالي الإيرادات", value: "2.8M ج", sub: "+18% نمو", icon: DollarSign, color: "yellow" as const, trend: 18 },
    { id: 'stat_shipments', title: "الشحنات النشطة", value: "156", sub: "12 تأخير", icon: Truck, color: "orange" as const, trend: -5 },
  ];

  const defaultActions = [
    // الأولويات العالية
    { id: 'act_pending', label: "المحلات الجديدة", icon: Store, color: "bg-red-600 text-white animate-pulse", onClick: () => setActiveTab('pending-businesses'), badge: "4" },
    { id: 'act_approvals', label: "الموافقات المعلقة", icon: CheckCircle, color: "bg-orange-600 text-white", onClick: () => setActiveTab('approvals'), badge: "8" },
    { id: 'act_payments', label: "إدارة الدفعات", icon: CreditCard, color: "bg-green-600 text-white", onClick: () => setActiveTab('payments') },
    { id: 'act_subscriptions', label: "الاشتراكات", icon: Zap, color: "bg-blue-600 text-white", onClick: () => setActiveTab('subscriptions') },
    
    // الإدارة
    { id: 'act_users', label: "إدارة المستخدمين", icon: Users, color: "bg-purple-600 text-white", onClick: () => setActiveTab('users') },
    { id: 'act_promotions', label: "العروض والخصومات", icon: Gift, color: "bg-pink-600 text-white", onClick: () => setActiveTab('promotions') },
    
    // التقارير والعمليات
    { id: 'act_reports', label: "التقارير المجمعة", icon: FileText, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-blue-500", onClick: () => setActiveTab('reports') },
    { id: 'act_shipping', label: "إدارة الشحنات", icon: Truck, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-blue-500", onClick: () => setActiveTab('shipping') },
    { id: 'act_delivery', label: "التوصيل والتوزيع", icon: MapPin, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-blue-500", onClick: () => setActiveTab('delivery') },
    { id: 'act_alerts', label: "التنبيهات", icon: Bell, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-red-500", onClick: () => setActiveTab('alerts') },
    { id: 'act_settings', label: "إعدادات النظام", icon: Settings, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-blue-500", onClick: () => setActiveTab('settings') },
    { id: 'act_audit', label: "سجل النشاطات", icon: Clock, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-blue-500", onClick: () => setActiveTab('audit') },
  ];

  const [visibleIds, setVisibleIds] = useState<string[]>([
    ...defaultStats.map(s => s.id),
    ...defaultActions.map(a => a.id)
  ]);

  const handleToggle = (id: string) => {
    setVisibleIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const customizerItems = [
    ...defaultStats.map(s => ({ id: s.id, label: s.title, category: 'stats' as const })),
    ...defaultActions.map(a => ({ id: a.id, label: a.label, category: 'actions' as const }))
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      
      <div className="flex justify-end mb-2">
        <button 
          onClick={() => setIsCustomizerOpen(true)}
          className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-red-600 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 hover:border-red-500 transition-all active:scale-95"
        >
          <Settings className="w-3 h-3" />
          تخصيص
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {defaultStats.filter(s => visibleIds.includes(s.id)).map(stat => (
           <StatCard 
             key={stat.id}
             title={stat.title} 
             value={stat.value} 
             sub={stat.sub} 
             icon={stat.icon} 
             color={stat.color} 
             trend={stat.trend}
           />
         ))}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {defaultActions.filter(a => visibleIds.includes(a.id)).map(action => (
          <div key={action.id} className="relative">
            <ActionButton 
              icon={action.icon} 
              label={action.label} 
              color={action.color} 
              onClick={action.onClick} 
            />
            {action.badge && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                {action.badge}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Recent Activities */}
         <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-all">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">آخر النشاطات الإدارية</h3>
                <button 
                  onClick={() => setActiveTab('audit')}
                  className="text-sm text-red-600 font-bold hover:underline hover:text-red-700 transition-colors"
                >
                  عرض السجل الكامل
                </button>
            </div>
            <div className="space-y-4">
               <ActivityRow user="أحمد محمد" action="إضافة مستخدم جديد" time="منذ 5 دقائق" status="success" />
               <ActivityRow user="مدير النظام" action="تحديث إعدادات الشحن" time="منذ 15 دقيقة" status="info" />
               <ActivityRow user="سارة أحمد" action="إنشاء تقرير شهري" time="منذ ساعة" status="success" />
               <ActivityRow user="مدير التوصيل" action="تغيير حالة شحنة" time="منذ ساعتين" status="warning" />
            </div>
         </div>

         {/* System Alerts */}
         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-all">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4 flex items-center gap-2">
               <AlertTriangle className="w-5 h-5 text-red-500" />
               تنبيهات النظام
            </h3>
            <div className="space-y-4">
               <div className="flex gap-3 items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center text-red-600 dark:text-red-400">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-sm text-gray-800 dark:text-white">شحنات متأخرة</h4>
                     <p className="text-xs text-red-500 font-bold">12 شحنة تحتاج متابعة</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('shipping')}
                    className="text-xs bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-lg font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition"
                  >
                    عرض
                  </button>
               </div>
               <div className="flex gap-3 items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                    <Package className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-sm text-gray-800 dark:text-white">مخزون منخفض</h4>
                     <p className="text-xs text-yellow-600 dark:text-yellow-500 font-bold">8 منتجات تحتاج إعادة تعبئة</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('warehouses')}
                    className="text-xs bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 px-3 py-1.5 rounded-lg font-bold hover:bg-yellow-100 dark:hover:bg-yellow-900/40 transition"
                  >
                    عرض
                  </button>
               </div>
            </div>
         </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white">نمو المستخدمين</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">هذا الشهر</span>
              <span className="font-bold text-green-600">+85</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">الشهر الماضي</span>
              <span className="font-bold text-gray-600 dark:text-gray-300">+62</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white">حالة الشحنات</h3>
            <Truck className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">قيد التوصيل</span>
              <span className="font-bold text-blue-600">144</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">متأخرة</span>
              <span className="font-bold text-red-600">12</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white">صحة النظام</h3>
            <Activity className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">وقت التشغيل</span>
              <span className="font-bold text-green-600">99.9%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">استخدام الخادم</span>
              <span className="font-bold text-yellow-600">67%</span>
            </div>
          </div>
        </div>
      </div>

      <DashboardCustomizer 
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        items={customizerItems}
        visibleIds={visibleIds}
        onToggle={handleToggle}
      />
    </div>
  );
};

const ActivityRow = ({ user, action, time, status }: any) => (
    <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-800 transition">
       <div className={`w-2 h-12 rounded-full ${
         status === 'success' ? 'bg-green-500' : 
         status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
       }`}></div>
       <div className="flex-1">
          <div className="flex justify-between mb-1">
             <h4 className="font-bold text-sm text-gray-900 dark:text-white">{user}</h4>
             <span className="text-xs text-gray-500">{time}</span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">{action}</p>
       </div>
    </div>
);

export default AdminOverview;
