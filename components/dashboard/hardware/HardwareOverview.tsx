import React, { useState } from 'react';
import { 
  Wrench, Package, DollarSign, ShoppingCart, Plus, Truck, 
  FileText, Users, Settings2, AlertTriangle, 
  CheckCircle, Clock, TrendingUp, TrendingDown, Clock as RentalIcon
} from 'lucide-react';
import ActionButton from '../../common/buttons/ActionButton';
import StatCard from '../../common/cards/StatCard';
import DashboardCustomizer from '../DashboardCustomizer';
import { rayPrices, rayColors } from '../../common/RayHelpers';

interface HardwareOverviewProps {
  setActiveTab: (tab: string) => void;
}

const HardwareOverview: React.FC<HardwareOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const defaultStats = [
    { id: 'stat_sales', title: "مبيعات اليوم", value: rayPrices.format(15600), sub: "+12% من أمس", icon: DollarSign, color: "gray" as const, trend: 12 },
    { id: 'stat_tools', title: "أدوات متاحة", value: "320", sub: "5 نواقص", icon: Package, color: "blue" as const, trend: 3 },
    { id: 'stat_rentals', title: "تأجير نشط", value: "8", sub: "2 مستعجلة", icon: RentalIcon, color: "orange" as const, trend: 5 },
    { id: 'stat_repairs', title: "صيانات اليوم", value: "4", sub: "-2 من أمس", icon: Wrench, color: "green" as const, trend: -2 },
  ];

  const defaultActions = [
    { id: 'act_sale', label: "بيع أداة", icon: ShoppingCart, color: "bg-gray-600 text-white", onClick: () => setActiveTab('products') },
    { id: 'act_rental', label: "تأجير عدة", icon: RentalIcon, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-gray-500", onClick: () => setActiveTab('rentals') },
    { id: 'act_repair', label: "إصلاح عدة", icon: Wrench, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-gray-500", onClick: () => setActiveTab('repairs') },
    { id: 'act_product', label: "إضافة منتج", icon: Package, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-gray-500", onClick: () => setActiveTab('products') },
    { id: 'act_part', label: "طلب قطعة غيار", icon: Truck, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-gray-500", onClick: () => setActiveTab('suppliers') },
    { id: 'act_maintenance', label: "جدول صيانة", icon: FileText, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-gray-500", onClick: () => setActiveTab('services') },
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
          className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-gray-600 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 hover:border-gray-500 transition-all active:scale-95"
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
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">آخر المبيعات والتأجير</h3>
                <button 
                  onClick={() => setActiveTab('products')}
                  className="text-sm text-gray-600 font-bold hover:underline hover:text-gray-700 transition-colors"
                >
                  عرض الكل
                </button>
            </div>
            <div className="space-y-4">
               <SaleRow name="مقاول عماد" items="4 أدوات" total={3200} type="sale" status="completed" />
               <SaleRow name="فني أحمد" items="مثقاب" total={450} type="rental" status="active" />
               <SaleRow name="شركة الصيانة" items="8 أدوات" total={2800} type="sale" status="completed" />
               <SaleRow name="مقاول رامي" items="منشار" total={650} type="repair" status="processing" />
            </div>
         </div>

         {/* Tool Status */}
         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-all">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4 flex items-center gap-2">
               <AlertTriangle className="w-5 h-5 text-red-500" />
               حالة الأدوات
            </h3>
            <div className="space-y-4">
               <div className="flex gap-3 items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-300">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-sm text-gray-800 dark:text-white">مثقاب بوش الأزرق</h4>
                     <p className="text-xs text-red-500 font-bold">تحت الصيانة</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('repairs')}
                    className="text-xs bg-gray-50 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-lg font-bold hover:bg-gray-100 dark:hover:bg-gray-900/40 transition"
                  >
                    إصلاح
                  </button>
               </div>
               <div className="flex gap-3 items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-300">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-sm text-gray-800 dark:text-white">منشار كهربائي</h4>
                     <p className="text-xs text-yellow-600 dark:text-yellow-500 font-bold">مستأجر - يعود غداً</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('rentals')}
                    className="text-xs bg-gray-50 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-lg font-bold hover:bg-gray-100 dark:hover:bg-gray-900/40 transition"
                  >
                    التأجير
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
    <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition">
       <div className={`w-2 h-12 rounded-full ${
         type === 'sale' ? 'bg-blue-500' : 
         type === 'rental' ? 'bg-orange-500' : 'bg-purple-500'
       }`}></div>
       <div className="flex-1">
          <div className="flex justify-between mb-1">
             <h4 className="font-bold text-sm text-gray-900 dark:text-white">{name}</h4>
             <span className={`text-xs font-bold ${
               status === 'completed' ? 'text-green-500' : 
               status === 'active' ? 'text-blue-500' : 'text-yellow-500'
             }`}>
                {status === 'completed' ? 'مكتمل' : status === 'active' ? 'نشط' : 'قيد المعالجة'}
             </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{items}</p>
       </div>
       <div className="text-left">
          <span className="font-bold text-sm text-gray-700 dark:text-gray-300 block">{rayPrices.format(total)}</span>
          <span className="text-xs text-gray-400">
            {type === 'sale' ? 'بيع' : type === 'rental' ? 'تأجير' : 'إصلاح'}
          </span>
       </div>
    </div>
);

export default HardwareOverview;
