
import React, { useState } from 'react';
import { 
  DollarSign, ChefHat, Utensils, Truck, Plus, Calendar, 
  Clock, Package, Printer, AlertCircle, CheckCircle, Settings2 
} from 'lucide-react';
import ActionButton from '../../common/buttons/ActionButton';
import StatCard from '../../common/cards/StatCard';
import StatusBadge from '../../common/StatusBadge';
import DashboardCustomizer from '../DashboardCustomizer';

interface RestaurantOverviewProps {
  setActiveTab: (tab: string) => void;
}

const RestaurantOverview: React.FC<RestaurantOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  
  const defaultStats = [
    { id: 'stat_sales', title: "مبيعات اليوم", value: "4,850 ج", sub: "120 طلب", icon: DollarSign, color: "orange" as const },
    { id: 'stat_kitchen', title: "طلبات المطبخ", value: "8", sub: "جاري التحضير", icon: ChefHat, color: "yellow" as const },
    { id: 'stat_tables', title: "الطاولات المشغولة", value: "6/15", sub: "40% إشغال", icon: Utensils, color: "blue" as const },
    { id: 'stat_delivery', title: "التوصيل", value: "4", sub: "جاري التوصيل", icon: Truck, color: "green" as const },
  ];

  const defaultActions = [
    { id: 'act_new_order', label: "طلب جديد", icon: Plus, color: "bg-orange-600 text-white", onClick: () => setActiveTab('pos') },
    { id: 'act_book_table', label: "حجز طاولة", icon: Calendar, color: "bg-white text-gray-700 border border-gray-200 hover:border-orange-500", onClick: () => setActiveTab('reservations') },
    { id: 'act_shift', label: "فتح/غلق الوردية", icon: Clock, color: "bg-white text-gray-700 border border-gray-200 hover:border-orange-500", onClick: () => setActiveTab('settings') },
    { id: 'act_expense', label: "تسجيل مصروف", icon: DollarSign, color: "bg-white text-gray-700 border border-gray-200 hover:border-orange-500", onClick: () => setActiveTab('reports') },
    { id: 'act_stock', label: "نواقص المطبخ", icon: Package, color: "bg-white text-gray-700 border border-gray-200 hover:border-orange-500", onClick: () => setActiveTab('inventory') },
    { id: 'act_report', label: "طباعة تقرير", icon: Printer, color: "bg-white text-gray-700 border border-gray-200 hover:border-orange-500", onClick: () => setActiveTab('reports') },
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
      
      <div className="flex justify-end mb-[-10px]">
        <button 
          onClick={() => setIsCustomizerOpen(true)}
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-orange-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-orange-500 transition"
        >
          <Settings2 className="w-3 h-3" />
          تخصيص
        </button>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {defaultStats.filter(s => visibleIds.includes(s.id)).map(stat => (
          <StatCard 
            key={stat.id}
            title={stat.title} 
            value={stat.value} 
            sub={stat.sub} 
            icon={stat.icon} 
            color={stat.color} 
          />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {defaultActions.filter(a => visibleIds.includes(a.id)).map(action => (
          <ActionButton 
            key={action.id}
            icon={action.icon} 
            label={action.label} 
            color={action.color} 
            onClick={action.onClick} 
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-gray-800">الطلبات النشطة</h3>
            <button 
              onClick={() => setActiveTab('orders')}
              className="text-sm text-orange-600 font-bold hover:underline"
            >
              عرض الكل
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50 text-gray-500 text-xs">
                <tr>
                  <th className="p-3 rounded-r-lg">رقم الطلب</th>
                  <th className="p-3">النوع</th>
                  <th className="p-3">العميل/الطاولة</th>
                  <th className="p-3">الوقت</th>
                  <th className="p-3">الحالة</th>
                  <th className="p-3 rounded-l-lg">المبلغ</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-50">
                  <td className="p-3 font-bold">#1054</td>
                  <td className="p-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">صالة</span></td>
                  <td className="p-3">T-05</td>
                  <td className="p-3 text-gray-500">منذ 12 د</td>
                  <td className="p-3"><StatusBadge status="preparing" /></td>
                  <td className="p-3 font-bold">450 ج</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="p-3 font-bold">#1055</td>
                  <td className="p-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">توصيل</span></td>
                  <td className="p-3">أحمد محمد</td>
                  <td className="p-3 text-gray-500">منذ 5 د</td>
                  <td className="p-3"><StatusBadge status="pending" /></td>
                  <td className="p-3 font-bold">120 ج</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="p-3 font-bold">#1056</td>
                  <td className="p-3"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">تيك أواي</span></td>
                  <td className="p-3">كابتن علي</td>
                  <td className="p-3 text-gray-500">منذ 2 د</td>
                  <td className="p-3"><StatusBadge status="pending" /></td>
                  <td className="p-3 font-bold">85 ج</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts & Kitchen Status */}
        <div className="space-y-6">
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  تنبيهات المطبخ
                </h3>
                <button 
                  onClick={() => setActiveTab('inventory')}
                  className="text-xs font-bold text-orange-600 hover:bg-orange-50 px-2 py-1 rounded transition"
                >
                  المخزون
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100">
                  <span className="text-sm font-medium text-red-800">برجر لحم</span>
                  <span className="text-xs bg-white px-2 py-1 rounded text-red-600 font-bold">باقي 3 قطع</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                  <span className="text-sm font-medium text-yellow-800">صوص جبنة</span>
                  <span className="text-xs bg-white px-2 py-1 rounded text-yellow-600 font-bold">ينفد قريباً</span>
                </div>
              </div>
           </div>

           <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-400 text-sm">كفاءة المطبخ</p>
                  <h3 className="text-2xl font-bold">94%</h3>
                </div>
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '94%'}}></div>
              </div>
              <p className="text-xs text-gray-400">متوسط وقت التحضير: 12 دقيقة</p>
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

export default RestaurantOverview;
