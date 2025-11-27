
import React, { useState } from 'react';
import { 
  Users, Clock, DollarSign, Activity, Plus, FileText, 
  Syringe, ClipboardList, Settings2
} from 'lucide-react';
import ActionButton from '../../common/buttons/ActionButton';
import StatCard from '../../common/cards/StatCard';
import StatusBadge from '../../common/StatusBadge';
import DashboardCustomizer from '../DashboardCustomizer';

interface ClinicOverviewProps {
  setActiveTab: (tab: string) => void;
}

const ClinicOverview: React.FC<ClinicOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const defaultStats = [
    { id: 'stat_patients', title: "حالات اليوم", value: "24", sub: "مريض", icon: Users, color: "teal" as const },
    { id: 'stat_waiting', title: "في الانتظار", value: "3", sub: "الآن", icon: Clock, color: "yellow" as const },
    { id: 'stat_revenue', title: "إيراد العيادة", value: "12,500", sub: "اليوم", icon: DollarSign, color: "green" as const },
    { id: 'stat_ops', title: "عمليات", value: "2", sub: "مجدولة", icon: Activity, color: "red" as const },
  ];

  const defaultActions = [
    { id: 'act_book', label: "حجز كشف", icon: Plus, color: "bg-teal-600 text-white", onClick: () => setActiveTab('appointments') },
    { id: 'act_new_patient', label: "مريض جديد", icon: Users, color: "bg-white text-gray-700 border border-gray-200 hover:border-teal-600", onClick: () => setActiveTab('patients') },
    { id: 'act_rx', label: "روشتة جديدة", icon: FileText, color: "bg-white text-gray-700 border border-gray-200 hover:border-teal-600", onClick: () => setActiveTab('prescriptions') },
    { id: 'act_lab', label: "طلب تحليل", icon: Activity, color: "bg-white text-gray-700 border border-gray-200 hover:border-teal-600", onClick: () => setActiveTab('lab') },
    { id: 'act_vaccine', label: "تطعيم", icon: Syringe, color: "bg-white text-gray-700 border border-gray-200 hover:border-teal-600", onClick: () => setActiveTab('pharmacy') },
    { id: 'act_followup', label: "متابعة", icon: ClipboardList, color: "bg-white text-gray-700 border border-gray-200 hover:border-teal-600", onClick: () => setActiveTab('appointments') },
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
         {/* Waiting Room List */}
         <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-500" />
                    قائمة الانتظار (3)
                </h3>
                <div className="flex gap-2">
                   <span className="text-xs bg-teal-50 text-teal-800 px-2 py-1 rounded font-bold">متوسط الانتظار: 15 دقيقة</span>
                   <button 
                     onClick={() => setActiveTab('appointments')} 
                     className="text-xs font-bold text-teal-600 hover:bg-teal-50 px-2 py-1 rounded transition"
                   >
                     عرض الجدول
                   </button>
                </div>
            </div>
            <div className="space-y-3">
                <PatientRow name="منى زكي" type="كشف باطنة" time="10:30" status="current" />
                <PatientRow name="كريم عبد العزيز" type="متابعة" time="10:45" status="waiting" />
                <PatientRow name="أحمد حلمي" type="استشارة" time="11:00" status="waiting" />
            </div>
         </div>

         {/* Doctor Status */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">حالة الأطباء</h3>
            <div className="space-y-4">
               <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                     <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-sm">د. أحمد (باطنة)</h4>
                     <p className="text-xs text-green-700">مع مريض الآن</p>
                  </div>
               </div>
               <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 opacity-70">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                     <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-sm">د. سارة (أطفال)</h4>
                     <p className="text-xs text-gray-500">غير متاح</p>
                  </div>
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

const PatientRow = ({ name, type, time, status }: any) => (
    <div className={`flex items-center justify-between p-3 rounded-xl border transition
        ${status === 'current' ? 'bg-teal-50 border-teal-200 shadow-sm' : 'bg-white border-gray-100'}`}>
        <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                ${status === 'current' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {name.charAt(0)}
            </div>
            <div>
                <h4 className="font-bold text-sm text-gray-800">{name}</h4>
                <p className="text-xs text-gray-500">{type}</p>
            </div>
        </div>
        <div className="text-left">
            <StatusBadge status={status} />
            <p className="text-[10px] text-gray-400 mt-1">{time}</p>
        </div>
    </div>
);

export default ClinicOverview;
