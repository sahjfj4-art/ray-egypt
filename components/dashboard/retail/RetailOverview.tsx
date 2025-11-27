
import React, { useState } from 'react';
import { 
  ShoppingCart, Wallet, Store, Users, TrendingUp, Truck, 
  QrCode, ArrowDownLeft, Tag, RefreshCw, AlertTriangle, Settings2 
} from 'lucide-react';
import ActionButton from '../../common/buttons/ActionButton';
import StatCard from '../../common/cards/StatCard';
import DashboardCustomizer from '../DashboardCustomizer';

interface RetailOverviewProps {
  setActiveTab: (tab: string) => void;
}

const RetailOverview: React.FC<RetailOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const defaultStats = [
    { id: 'stat_sales', title: "إجمالي المبيعات", value: "15,200 ج", sub: "142 فاتورة اليوم", icon: Wallet, color: "blue" as const },
    { id: 'stat_inventory', title: "المخزون", value: "2,450", sub: "8 منتجات ناقصة", icon: Store, color: "purple" as const },
    { id: 'stat_customers', title: "العملاء الجدد", value: "12", sub: "+5 عن أمس", icon: Users, color: "green" as const },
    { id: 'stat_profit', title: "الأرباح التقريبية", value: "3,800 ج", sub: "هامش 25%", icon: TrendingUp, color: "emerald" as const },
  ];

  const defaultActions = [
    { id: 'act_pos', label: "بيع سريع", icon: ShoppingCart, color: "bg-blue-600 text-white", onClick: () => setActiveTab('pos') },
    { id: 'act_order', label: "طلب بضاعة", icon: Truck, color: "bg-white text-gray-700 border border-gray-200 hover:border-blue-500", onClick: () => setActiveTab('suppliers') },
    { id: 'act_scan', label: "جرد بالباركود", icon: QrCode, color: "bg-white text-gray-700 border border-gray-200 hover:border-blue-500", onClick: () => setActiveTab('inventory') },
    { id: 'act_return', label: "تسجيل مرتجع", icon: ArrowDownLeft, color: "bg-white text-gray-700 border border-gray-200 hover:border-blue-500", onClick: () => setActiveTab('reports') },
    { id: 'act_add_product', label: "إضافة منتج", icon: Tag, color: "bg-white text-gray-700 border border-gray-200 hover:border-blue-500", onClick: () => setActiveTab('products') },
    { id: 'act_update_price', label: "تحديث أسعار", icon: RefreshCw, color: "bg-white text-gray-700 border border-gray-200 hover:border-blue-500", onClick: () => setActiveTab('products') },
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
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-blue-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-blue-500 transition"
        >
          <Settings2 className="w-3 h-3" />
          تخصيص
        </button>
      </div>

      {/* Retail Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
        {/* Latest Invoices */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-gray-800">أحدث الفواتير</h3>
            <button 
              onClick={() => setActiveTab('reports')}
              className="text-sm text-blue-600 font-bold hover:underline"
            >
              السجل الكامل
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50 text-gray-500 text-xs">
                <tr>
                  <th className="p-3 rounded-r-lg">الفاتورة</th>
                  <th className="p-3">العميل</th>
                  <th className="p-3">الأصناف</th>
                  <th className="p-3">الدفع</th>
                  <th className="p-3 rounded-l-lg">الإجمالي</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-50">
                  <td className="p-3 font-bold">#9012</td>
                  <td className="p-3">عميل نقدي</td>
                  <td className="p-3">5</td>
                  <td className="p-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">كاش</span></td>
                  <td className="p-3 font-bold">150 ج</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="p-3 font-bold">#9011</td>
                  <td className="p-3">محمد علي</td>
                  <td className="p-3">12</td>
                  <td className="p-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">فيزا</span></td>
                  <td className="p-3 font-bold">420 ج</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="p-3 font-bold">#9010</td>
                  <td className="p-3">سوبر ماركت الأمل</td>
                  <td className="p-3">50</td>
                  <td className="p-3"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">آجل</span></td>
                  <td className="p-3 font-bold">1,200 ج</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Alerts */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
           <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
             <AlertTriangle className="w-5 h-5 text-yellow-500" />
             نواقص المخزون
           </h3>
           <div className="space-y-4">
             <div className="flex gap-3">
               <img src="https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100" className="w-12 h-12 rounded-lg bg-gray-100 object-cover" />
               <div>
                 <h4 className="font-bold text-sm text-gray-800">لبن جهينة 1 لتر</h4>
                 <p className="text-xs text-red-500 font-bold">متبقي 3 قطع فقط</p>
               </div>
               <button 
                 onClick={() => setActiveTab('suppliers')} 
                 className="mr-auto text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-lg font-bold hover:bg-blue-100"
               >
                 طلب
               </button>
             </div>
             <div className="flex gap-3">
               <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100" className="w-12 h-12 rounded-lg bg-gray-100 object-cover" />
               <div>
                 <h4 className="font-bold text-sm text-gray-800">أرز الضحى 1ك</h4>
                 <p className="text-xs text-yellow-600 font-bold">متبقي 10 قطع</p>
               </div>
               <button 
                 onClick={() => setActiveTab('suppliers')} 
                 className="mr-auto text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-lg font-bold hover:bg-blue-100"
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

export default RetailOverview;
