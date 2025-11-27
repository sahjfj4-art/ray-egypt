
import React, { useState } from 'react';
import { 
  Users, CreditCard, Clock, ShoppingBag, Plus, QrCode, Activity, Dumbbell, Settings2
} from 'lucide-react';
import ActionButton from '../../common/buttons/ActionButton';
import StatCard from '../../common/cards/StatCard';
import DashboardCustomizer from '../DashboardCustomizer';

interface GymOverviewProps {
  setActiveTab: (tab: string) => void;
}

const GymOverview: React.FC<GymOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const defaultStats = [
    { id: 'stat_attendance', title: "حضور اليوم", value: "145", sub: "عضو", icon: Users, color: "yellow" as const },
    { id: 'stat_new', title: "اشتراكات جديدة", value: "8", sub: "اليوم", icon: CreditCard, color: "green" as const },
    { id: 'stat_expiring', title: "تنتهي قريباً", value: "12", sub: "عضوية", icon: Clock, color: "red" as const },
    { id: 'stat_sales', title: "مبيعات المتجر", value: "3,200", sub: "جنيه", icon: ShoppingBag, color: "blue" as const },
  ];

  const defaultActions = [
    { id: 'act_new_member', label: "عضو جديد", icon: Plus, color: "bg-yellow-500 text-black", onClick: () => setActiveTab('members') },
    { id: 'act_renew', label: "تجديد اشتراك", icon: CreditCard, color: "bg-white text-gray-700 border border-gray-200 hover:border-yellow-500", onClick: () => setActiveTab('subscriptions') },
    { id: 'act_checkin', label: "تسجيل دخول", icon: QrCode, color: "bg-white text-gray-700 border border-gray-200 hover:border-yellow-500", onClick: () => setActiveTab('access') },
    { id: 'act_sell', label: "بيع منتج", icon: ShoppingBag, color: "bg-white text-gray-700 border border-gray-200 hover:border-yellow-500", onClick: () => setActiveTab('store') },
    { id: 'act_inbody', label: "قياس InBody", icon: Activity, color: "bg-white text-gray-700 border border-gray-200 hover:border-yellow-500", onClick: () => setActiveTab('members') },
    { id: 'act_class', label: "حجز كلاس", icon: Dumbbell, color: "bg-white text-gray-700 border border-gray-200 hover:border-yellow-500", onClick: () => setActiveTab('classes') },
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
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-yellow-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-yellow-500 transition"
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
         {/* Live Access Log */}
         <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-gray-500" />
                    سجل الدخول المباشر
                </h3>
                <div className="flex gap-2">
                   <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-bold">معدل الذروة: 65%</span>
                   <button 
                     onClick={() => setActiveTab('access')}
                     className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded font-bold hover:bg-yellow-100 transition"
                   >
                     عرض السجل
                   </button>
                </div>
            </div>
            <div className="space-y-3">
                <AccessRow name="عمرو دياب" plan="VIP سنوي" time="منذ دقيقة" status="valid" />
                <AccessRow name="تامر حسني" plan="شهري" time="منذ 5 دقائق" status="valid" />
                <AccessRow name="محمد رمضان" plan="3 شهور" time="منذ 12 دقيقة" status="expired" />
                <AccessRow name="شيرين" plan="حصص خاصة" time="منذ 20 دقيقة" status="valid" />
            </div>
         </div>

         {/* Class Capacity */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-lg text-gray-800">حصص اليوم</h3>
               <button 
                 onClick={() => setActiveTab('classes')}
                 className="text-xs font-bold text-yellow-600 hover:bg-yellow-50 px-2 py-1 rounded transition"
               >
                 الجدول الكامل
               </button>
            </div>
            <div className="space-y-4">
               <ClassCard title="Zumba" time="05:00 م" trainer="كابتن سارة" capacity={20} filled={15} />
               <ClassCard title="CrossFit" time="07:00 م" trainer="كابتن علي" capacity={12} filled={12} />
               <ClassCard title="Yoga" time="09:00 م" trainer="كابتن نورا" capacity={15} filled={8} />
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

const AccessRow = ({ name, plan, time, status }: any) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
        <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border
                ${status === 'valid' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                {status === 'valid' ? '✔' : '✕'}
            </div>
            <div>
                <h4 className="font-bold text-sm text-gray-800">{name}</h4>
                <p className="text-xs text-gray-500">{plan}</p>
            </div>
        </div>
        <div className="text-left">
            <span className="text-[10px] text-gray-400">{time}</span>
            {status === 'expired' && <p className="text-[10px] text-red-500 font-bold mt-1">منتهي</p>}
        </div>
    </div>
);

const ClassCard = ({ title, time, trainer, capacity, filled }: any) => {
    const percent = (filled / capacity) * 100;
    return (
        <div className="p-3 rounded-xl border border-gray-100 bg-gray-50">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h4 className="font-bold text-sm">{title}</h4>
                    <p className="text-xs text-gray-500">{trainer}</p>
                </div>
                <span className="text-xs font-bold bg-white px-2 py-1 rounded border">{time}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${percent >= 100 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${percent}%` }}></div>
                </div>
                <span className="text-[10px] text-gray-500">{filled}/{capacity}</span>
            </div>
        </div>
    );
};

export default GymOverview;
