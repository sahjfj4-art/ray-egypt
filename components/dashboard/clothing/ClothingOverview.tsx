
import React, { useState } from 'react';
import { 
  Shirt, Scissors, TrendingUp, Users, ShoppingBag, 
  Tag, RotateCcw, Printer, Search, AlertTriangle, Settings2 
} from 'lucide-react';
import ActionButton from '../../common/buttons/ActionButton';
import StatCard from '../../common/cards/StatCard';
import StatusBadge from '../../common/StatusBadge';
import DashboardCustomizer from '../DashboardCustomizer';

interface ClothingOverviewProps {
  setActiveTab: (tab: string) => void;
}

const ClothingOverview: React.FC<ClothingOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const defaultStats = [
    { id: 'stat_sales', title: "مبيعات اليوم", value: "12,400 ج", sub: "45 قطعة", icon: TrendingUp, color: "pink" as const },
    { id: 'stat_items', title: "قطع مباعة", value: "45", sub: "+10 عن أمس", icon: Shirt, color: "blue" as const },
    { id: 'stat_shortage', title: "نواقص المقاسات", value: "12", sub: "موديل", icon: Scissors, color: "red" as const },
    { id: 'stat_returns', title: "المرتجعات", value: "3", sub: "قطع", icon: RotateCcw, color: "orange" as const },
  ];

  const defaultActions = [
    { id: 'act_sale', label: "بيع جديد", icon: ShoppingBag, color: "bg-pink-600 text-white", onClick: () => setActiveTab('shop') },
    { id: 'act_add', label: "إضافة موديل", icon: Shirt, color: "bg-white text-gray-700 border border-gray-200 hover:border-pink-500", onClick: () => setActiveTab('products') },
    { id: 'act_stock', label: "جرد سريع", icon: Search, color: "bg-white text-gray-700 border border-gray-200 hover:border-pink-500", onClick: () => setActiveTab('inventory') },
    { id: 'act_barcode', label: "طباعة باركود", icon: Printer, color: "bg-white text-gray-700 border border-gray-200 hover:border-pink-500", onClick: () => setActiveTab('products') },
    { id: 'act_tag', label: "طباعة السعر", icon: Tag, color: "bg-white text-gray-700 border border-gray-200 hover:border-pink-500", onClick: () => setActiveTab('products') },
    { id: 'act_return', label: "مرتجع", icon: RotateCcw, color: "bg-white text-gray-700 border border-gray-200 hover:border-pink-500", onClick: () => setActiveTab('reports') },
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
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-pink-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-pink-500 transition"
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
         {/* Recent Sales */}
         <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-800">آخر المبيعات</h3>
                <button 
                  onClick={() => setActiveTab('reports')}
                  className="text-sm text-pink-600 font-bold hover:underline"
                >
                  عرض الكل
                </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="p-3 rounded-r-lg">رقم الفاتورة</th>
                    <th className="p-3">العميل</th>
                    <th className="p-3">القطع</th>
                    <th className="p-3">المبلغ</th>
                    <th className="p-3 rounded-l-lg">الوقت</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr onClick={() => setActiveTab('reports')} className="cursor-pointer hover:bg-gray-50 transition">
                    <td className="p-3 font-bold">#INV-2024</td>
                    <td className="p-3">عميل نقدي</td>
                    <td className="p-3">3</td>
                    <td className="p-3 font-bold text-gray-800">1,200 ج</td>
                    <td className="p-3 text-gray-500">منذ 5 د</td>
                  </tr>
                  <tr onClick={() => setActiveTab('reports')} className="cursor-pointer hover:bg-gray-50 transition">
                    <td className="p-3 font-bold">#INV-2023</td>
                    <td className="p-3">منى أحمد</td>
                    <td className="p-3">1</td>
                    <td className="p-3 font-bold text-gray-800">850 ج</td>
                    <td className="p-3 text-gray-500">منذ ساعة</td>
                  </tr>
                  <tr onClick={() => setActiveTab('reports')} className="cursor-pointer hover:bg-gray-50 transition">
                    <td className="p-3 font-bold">#INV-2022</td>
                    <td className="p-3">علي حسن</td>
                    <td className="p-3">2</td>
                    <td className="p-3 font-bold text-gray-800">900 ج</td>
                    <td className="p-3 text-gray-500">منذ ساعتين</td>
                  </tr>
                </tbody>
              </table>
            </div>
         </div>

         {/* Stock Alerts */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
               <AlertTriangle className="w-5 h-5 text-yellow-500" />
               نواقص المقاسات
            </h3>
            <div className="space-y-4">
               <div className="flex gap-3 items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                    <Shirt className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-sm text-gray-800">بنطلون جينز Slim</h4>
                     <p className="text-xs text-red-500 font-bold">مقاس 32 غير متوفر</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('inventory')}
                    className="text-xs bg-pink-50 text-pink-600 px-2 py-1 rounded font-bold hover:bg-pink-100 transition"
                  >
                    طلب
                  </button>
               </div>
               <div className="flex gap-3 items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                    <Shirt className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-sm text-gray-800">فستان صيفي</h4>
                     <p className="text-xs text-yellow-600 font-bold">مقاس M وشك النفاذ</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('inventory')}
                    className="text-xs bg-pink-50 text-pink-600 px-2 py-1 rounded font-bold hover:bg-pink-100 transition"
                  >
                    طلب
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

export default ClothingOverview;
