import React, { useState } from 'react';
import { 
  Zap, Package, DollarSign, ShoppingCart, Plus, Truck, 
  FileText, Users, Settings2, AlertTriangle, 
  CheckCircle, Clock, TrendingUp, TrendingDown, Wrench, Lightbulb, Calendar
} from 'lucide-react';
import ActionButton from '../../common/buttons/ActionButton';
import StatCard from '../../common/cards/StatCard';
import DashboardCustomizer from '../DashboardCustomizer';
import { rayPrices, rayColors } from '../../common/RayHelpers';

interface ElectricalOverviewProps {
  setActiveTab: (tab: string) => void;
}

const ElectricalOverview: React.FC<ElectricalOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const defaultStats = [
    { id: 'stat_sales', title: "مبيعات اليوم", value: rayPrices.format(9800), sub: "+8% من أمس", icon: DollarSign, color: "yellow" as const, trend: 8 },
    { id: 'stat_products', title: "منتجات متاحة", value: "180", sub: "6 نواقص", icon: Package, color: "blue" as const, trend: 6 },
    { id: 'stat_installations', title: "تركيبات اليوم", value: "5", sub: "+2 من أمس", icon: Wrench, color: "orange" as const, trend: 10 },
    { id: 'stat_maintenance', title: "صيانات مجدولة", value: "3", sub: "1 مستعجل", icon: Settings2, color: "green" as const, trend: 0 },
  ];

  const defaultActions = [
    { id: 'act_sale', label: "بيع منتج", icon: ShoppingCart, color: "bg-yellow-600 text-white", onClick: () => setActiveTab('products') },
    { id: 'act_install', label: "جدولة تركيب", icon: Calendar, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-yellow-500", onClick: () => setActiveTab('installations') },
    { id: 'act_maintenance', label: "طلب صيانة", icon: Settings2, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-yellow-500", onClick: () => setActiveTab('maintenance') },
    { id: 'act_product', label: "إضافة منتج", icon: Package, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-yellow-500", onClick: () => setActiveTab('products') },
    { id: 'act_lighting', label: "تصميم إضاءة", icon: Lightbulb, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-yellow-500", onClick: () => setActiveTab('lighting') },
    { id: 'act_check', label: "فحص كهرباء", icon: Zap, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-yellow-500", onClick: () => setActiveTab('maintenance') },
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
          className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-yellow-600 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 hover:border-yellow-500 transition-all active:scale-95"
        >
          <Settings2 className="w-3 h-3" />
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
         {/* Recent Sales */}
         <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-all">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">آخر المبيعات والتركيبات</h3>
                <button 
                  onClick={() => setActiveTab('products')}
                  className="text-sm text-yellow-600 font-bold hover:underline hover:text-yellow-700 transition-colors"
                >
                  عرض الكل
                </button>
            </div>
            <div className="space-y-4">
               <SaleRow name="مقاول رامي" items="6 قطع" total={2100} type="sale" status="completed" />
               <SaleRow name="أحمد سالم" items="3 قطع" total={750} type="installation" status="scheduled" />
               <SaleRow name="شركة الإنشاءات" items="10 قطع" total={4200} type="sale" status="completed" />
               <SaleRow name="فني محمود" items="موتور كهرباء" total={1200} type="maintenance" status="processing" />
            </div>
         </div>

         {/* Electrical Alerts */}
         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-all">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4 flex items-center gap-2">
               <AlertTriangle className="w-5 h-5 text-red-500" />
               تنبيهات كهربائية
            </h3>
            <div className="space-y-4">
               <div className="flex gap-3 items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-300">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-sm text-gray-800 dark:text-white">أسلاك نحاس 4مم</h4>
                     <p className="text-xs text-red-500 font-bold">متبقي: 2 لفة فقط</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('suppliers')}
                    className="text-xs bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 px-3 py-1.5 rounded-lg font-bold hover:bg-yellow-100 dark:hover:bg-yellow-900/40 transition"
                  >
                    طلب توريد
                  </button>
               </div>
               <div className="flex gap-3 items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-300">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-sm text-gray-800 dark:text-white">لمبات LED 50W</h4>
                     <p className="text-xs text-yellow-600 dark:text-yellow-500 font-bold">متبقي: 15 قطعة</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('suppliers')}
                    className="text-xs bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 px-3 py-1.5 rounded-lg font-bold hover:bg-yellow-100 dark:hover:bg-yellow-900/40 transition"
                  >
                    طلب توريد
                  </button>
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

const SaleRow = ({ name, items, total, type, status }: any) => (
    <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-yellow-200 dark:hover:border-yellow-800 transition">
       <div className={`w-2 h-12 rounded-full ${
         type === 'sale' ? 'bg-yellow-500' : 
         type === 'installation' ? 'bg-blue-500' : 'bg-purple-500'
       }`}></div>
       <div className="flex-1">
          <div className="flex justify-between mb-1">
             <h4 className="font-bold text-sm text-gray-900 dark:text-white">{name}</h4>
             <span className={`text-xs font-bold ${
               status === 'completed' ? 'text-green-500' : 
               status === 'scheduled' ? 'text-blue-500' : 'text-yellow-500'
             }`}>
                {status === 'completed' ? 'مكتمل' : status === 'scheduled' ? 'مجدول' : 'قيد المعالجة'}
             </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{items}</p>
       </div>
       <div className="text-left">
          <span className="font-bold text-sm text-gray-700 dark:text-gray-300 block">{rayPrices.format(total)}</span>
          <span className="text-xs text-gray-400">
            {type === 'sale' ? 'بيع' : type === 'installation' ? 'تركيب' : 'صيانة'}
          </span>
       </div>
    </div>
);

export default ElectricalOverview;
