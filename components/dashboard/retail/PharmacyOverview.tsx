
import React, { useState } from 'react';
import { 
  Pill, FileText, AlertCircle, DollarSign, Plus, 
  ShoppingBag, Truck, Search, Tag, Settings2
} from 'lucide-react';
import ActionButton from '../../common/buttons/ActionButton';
import StatCard from '../../common/cards/StatCard';
import DashboardCustomizer from '../DashboardCustomizer';

interface PharmacyOverviewProps {
  setActiveTab: (tab: string) => void;
}

const PharmacyOverview: React.FC<PharmacyOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const defaultStats = [
    { id: 'stat_sales', title: "مبيعات اليوم", value: "8,500 ج", sub: "120 عملية", icon: DollarSign, color: "teal" as const },
    { id: 'stat_rx', title: "روشتات مصروفة", value: "45", sub: "روشتة", icon: FileText, color: "blue" as const },
    { id: 'stat_expiry', title: "تنتهي قريباً", value: "12", sub: "صنف", icon: AlertCircle, color: "red" as const },
    { id: 'stat_stock', title: "النواقص", value: "8", sub: "أدوية هامة", icon: Pill, color: "orange" as const },
  ];

  const defaultActions = [
    { id: 'act_sale', label: "بيع جديد", icon: ShoppingBag, color: "bg-teal-600 text-white", onClick: () => setActiveTab('pos') },
    { id: 'act_rx', label: "صرف روشتة", icon: FileText, color: "bg-white text-gray-700 border border-gray-200 hover:border-teal-600", onClick: () => setActiveTab('pos') },
    { id: 'act_order', label: "طلب نواقص", icon: Truck, color: "bg-white text-gray-700 border border-gray-200 hover:border-teal-600", onClick: () => setActiveTab('suppliers') },
    { id: 'act_alt', label: "البدائل", icon: Search, color: "bg-white text-gray-700 border border-gray-200 hover:border-teal-600", onClick: () => setActiveTab('products') },
    { id: 'act_add', label: "إضافة دواء", icon: Plus, color: "bg-white text-gray-700 border border-gray-200 hover:border-teal-600", onClick: () => setActiveTab('products') },
    { id: 'act_offer', label: "عرض جديد", icon: Tag, color: "bg-white text-gray-700 border border-gray-200 hover:border-teal-600", onClick: () => setActiveTab('marketing') },
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
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-teal-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-teal-600 transition"
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
         {/* Expiry Alerts */}
         <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    تنبيهات الصلاحية
                </h3>
                <span className="text-xs bg-red-50 text-red-800 px-2 py-1 rounded font-bold">3 أصناف حرجة</span>
            </div>
            <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 shadow-sm">
                         <Pill className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="font-bold text-sm text-gray-800">Panadol Extra</h4>
                         <p className="text-xs text-red-600">ينتهي في: 15/12/2025</p>
                      </div>
                   </div>
                   <button 
                     onClick={() => setActiveTab('suppliers')}
                     className="text-xs font-bold text-red-700 border border-red-200 px-3 py-1 rounded bg-white hover:bg-red-50 transition"
                   >
                     مرتجع
                   </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-yellow-600 shadow-sm">
                         <Pill className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="font-bold text-sm text-gray-800">Augmentin 1g</h4>
                         <p className="text-xs text-yellow-700">ينتهي في: 01/01/2026</p>
                      </div>
                   </div>
                   <button 
                     onClick={() => setActiveTab('marketing')}
                     className="text-xs font-bold text-yellow-700 border border-yellow-200 px-3 py-1 rounded bg-white hover:bg-yellow-50 transition"
                   >
                     خصم
                   </button>
                </div>
            </div>
         </div>

         {/* Sales Chart Placeholder / Top Items */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">الأكثر مبيعاً</h3>
            <div className="space-y-4">
               <ItemRow name="Congestal" count="150 علبة" />
               <ItemRow name="Panadol Cold+Flu" count="120 علبة" />
               <ItemRow name="Vitamin C" count="95 علبة" />
               <ItemRow name="Masks" count="80 علبة" />
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

const ItemRow = ({ name, count }: any) => (
    <div className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0 last:pb-0">
        <span className="text-sm font-medium text-gray-700">{name}</span>
        <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded">{count}</span>
    </div>
);

export default PharmacyOverview;
