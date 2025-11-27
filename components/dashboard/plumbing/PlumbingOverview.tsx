import React, { useState } from 'react';
import { 
  Wrench, Package, DollarSign, ShoppingCart, Plus, Truck, 
  FileText, Users, Settings2, AlertTriangle, 
  CheckCircle, Clock, TrendingUp, TrendingDown
} from 'lucide-react';
import ActionButton from '../../common/buttons/ActionButton';
import StatCard from '../../common/cards/StatCard';
import DashboardCustomizer from '../DashboardCustomizer';
import { rayPrices, rayColors } from '../../common/RayHelpers';

interface PlumbingOverviewProps {
  setActiveTab: (tab: string) => void;
}

const PlumbingOverview: React.FC<PlumbingOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const defaultStats = [
    { id: 'stat_sales', title: "مبيعات اليوم", value: rayPrices.format(12500), sub: "+15% من أمس", icon: DollarSign, color: "blue" as const, trend: 15 },
    { id: 'stat_products', title: "منتجات متاحة", value: "245", sub: "8 نواقص", icon: Package, color: "green" as const, trend: 5 },
    { id: 'stat_orders', title: "طلبات اليوم", value: "18", sub: "3 توصيل", icon: ShoppingCart, color: "orange" as const, trend: 12 },
    { id: 'stat_installations', title: "تركيبات مجدولة", value: "6", sub: "2 اليوم", icon: Wrench, color: "purple" as const, trend: 8 },
  ];

  const defaultActions = [
    { id: 'act_sale', label: "بيع جديد", icon: ShoppingCart, color: "bg-blue-600 text-white", onClick: () => setActiveTab('products') },
    { id: 'act_product', label: "إضافة منتج", icon: Package, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-blue-500", onClick: () => setActiveTab('products') },
    { id: 'act_supply', label: "طلب توريد", icon: Truck, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-blue-500", onClick: () => setActiveTab('suppliers') },
    { id: 'act_install', label: "جدولة تركيب", icon: Wrench, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-blue-500", onClick: () => setActiveTab('installations') },
    { id: 'act_stock', label: "فحص مخزون", icon: Package, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-blue-500", onClick: () => setActiveTab('inventory') },
    { id: 'act_invoice', label: "فاتورة عميل", icon: FileText, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-blue-500", onClick: () => setActiveTab('invoices') },
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
          className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-blue-600 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all active:scale-95"
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
                  className="text-sm text-blue-600 font-bold hover:underline hover:text-blue-700 transition-colors"
                >
                  عرض كل المبيعات
                </button>
            </div>
            <div className="space-y-4">
               <SaleRow name="مقاول محمد" items="8 قطع" total={2450} status="completed" />
               <SaleRow name="أحمد علي" items="3 قطع" total={850} status="pending" />
               <SaleRow name="شركة المباني" items="15 قطعة" total={5200} status="completed" />
               <SaleRow name="فني خالد" items="5 قطع" total={1200} status="processing" />
            </div>
         </div>

         {/* Stock Alerts */}
         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-all">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4 flex items-center gap-2">
               <AlertTriangle className="w-5 h-5 text-red-500" />
               نواقص المخزون
            </h3>
            <div className="space-y-4">
               <div className="flex gap-3 items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-300">
                    <Package className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-sm text-gray-800 dark:text-white">مواسير نحاس 1/2"</h4>
                     <p className="text-xs text-red-500 font-bold">متبقي: 5 قطع فقط</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('suppliers')}
                    className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-lg font-bold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition"
                  >
                    طلب توريد
                  </button>
               </div>
               <div className="flex gap-3 items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-300">
                    <Package className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-sm text-gray-800 dark:text-white">صواميل تسريب</h4>
                     <p className="text-xs text-yellow-600 dark:text-yellow-500 font-bold">متبقي: 12 قطعة</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('suppliers')}
                    className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-lg font-bold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition"
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

const SaleRow = ({ name, items, total, status }: any) => (
    <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition">
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

export default PlumbingOverview;
