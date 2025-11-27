import React, { useState } from 'react';
import { 
  Droplets, Package, DollarSign, ShoppingCart, Plus, Truck, 
  FileText, Users, Settings2, AlertTriangle, 
  CheckCircle, Clock, TrendingUp, TrendingDown, PenTool
} from 'lucide-react';
import ActionButton from '../../common/buttons/ActionButton';
import StatCard from '../../common/cards/StatCard';
import DashboardCustomizer from '../DashboardCustomizer';
import { rayPrices, rayColors } from '../../common/RayHelpers';

interface PaintingOverviewProps {
  setActiveTab: (tab: string) => void;
}

const PaintingOverview: React.FC<PaintingOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const defaultStats = [
    { id: 'stat_sales', title: "مبيعات اليوم", value: rayPrices.format(8200), sub: "+10% من أمس", icon: DollarSign, color: "purple" as const, trend: 10 },
    { id: 'stat_colors', title: "ألوان متاحة", value: "156", sub: "8 ألوان جديدة", icon: Droplets, color: "blue" as const, trend: 8 },
    { id: 'stat_orders', title: "طلبات اليوم", value: "12", sub: "3 مشاريع", icon: ShoppingCart, color: "orange" as const, trend: 15 },
    { id: 'stat_projects', title: "مشاريع نشطة", value: "4", sub: "2 تسليم هذا الأسبوع", icon: PenTool, color: "green" as const, trend: 2 },
  ];

  const defaultActions = [
    { id: 'act_sale', label: "بيع دهان", icon: ShoppingCart, color: "bg-purple-600 text-white", onClick: () => setActiveTab('products') },
    { id: 'act_color', label: "مزج لون جديد", icon: Droplets, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-purple-500", onClick: () => setActiveTab('colors') },
    { id: 'act_product', label: "إضافة منتج", icon: Package, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-purple-500", onClick: () => setActiveTab('products') },
    { id: 'act_project', label: "طلب مشروع", icon: PenTool, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-purple-500", onClick: () => setActiveTab('projects') },
    { id: 'act_stock', label: "فحص مخزون", icon: Package, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-purple-500", onClick: () => setActiveTab('inventory') },
    { id: 'act_calc', label: "حاسبة كميات", icon: FileText, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-purple-500", onClick: () => setActiveTab('products') },
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
          className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-purple-600 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 hover:border-purple-500 transition-all active:scale-95"
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
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">آخر المبيعات</h3>
                <button 
                  onClick={() => setActiveTab('orders')}
                  className="text-sm text-purple-600 font-bold hover:underline hover:text-purple-700 transition-colors"
                >
                  عرض كل المبيعات
                </button>
            </div>
            <div className="space-y-4">
               <SaleRow name="مقاول سالم" items="5 دلاء" total={1800} status="completed" />
               <SaleRow name="أحمد خالد" items="2 لون" total={650} status="pending" />
               <SaleRow name="شركة الديكور" items="10 دلاء" total={3200} status="completed" />
               <SaleRow name="فني محمود" items="3 عبوات" total={950} status="processing" />
            </div>
         </div>

         {/* Color Mixing Alerts */}
         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-all">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4 flex items-center gap-2">
               <AlertTriangle className="w-5 h-5 text-red-500" />
               نواقص الألوان
            </h3>
            <div className="space-y-4">
               <div className="flex gap-3 items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-300">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-sm text-gray-800 dark:text-white">لون أزرق سماوي</h4>
                     <p className="text-xs text-red-500 font-bold">متبقي: 3 دلاء فقط</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('colors')}
                    className="text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-3 py-1.5 rounded-lg font-bold hover:bg-purple-100 dark:hover:bg-purple-900/40 transition"
                  >
                    مزج لون
                  </button>
               </div>
               <div className="flex gap-3 items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-300">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-sm text-gray-800 dark:text-white">بيج فاتح</h4>
                     <p className="text-xs text-yellow-600 dark:text-yellow-500 font-bold">متبقي: 8 دلاء</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('colors')}
                    className="text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-3 py-1.5 rounded-lg font-bold hover:bg-purple-100 dark:hover:bg-purple-900/40 transition"
                  >
                    مزج لون
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

const SaleRow = ({ name, items, total, status }: any) => (
    <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800 transition">
       <div className={`w-2 h-12 rounded-full ${
         status === 'completed' ? 'bg-green-500' : 
         status === 'processing' ? 'bg-blue-500' : 'bg-yellow-500'
       }`}></div>
       <div className="flex-1">
          <div className="flex justify-between mb-1">
             <h4 className="font-bold text-sm text-gray-900 dark:text-white">{name}</h4>
             <span className={`text-xs font-bold ${
               status === 'completed' ? 'text-green-500' : 
               status === 'processing' ? 'text-blue-500' : 'text-yellow-500'
             }`}>
                {status === 'completed' ? 'مكتمل' : status === 'processing' ? 'قيد المعالجة' : 'في الانتظار'}
             </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{items}</p>
       </div>
       <span className="font-bold text-sm text-gray-700 dark:text-gray-300">{rayPrices.format(total)}</span>
    </div>
);

export default PaintingOverview;
