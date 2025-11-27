
import React, { useState } from 'react';
import { 
  Bell, Wrench, Users, DollarSign, Plus, Settings, CheckCircle, FileText, MapPin, Settings2 
} from 'lucide-react';
import ActionButton from '../../common/buttons/ActionButton';
import StatCard from '../../common/cards/StatCard';
import StatusBadge from '../../common/StatusBadge';
import DashboardCustomizer from '../DashboardCustomizer';

interface ServicesOverviewProps {
  setActiveTab: (tab: string) => void;
}

const ServicesOverview: React.FC<ServicesOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const defaultStats = [
    { id: 'stat_new_req', title: "طلبات جديدة", value: "15", sub: "اليوم", icon: Bell, color: "blue" as const },
    { id: 'stat_in_progress', title: "قيد التنفيذ", value: "7", sub: "مهمة", icon: Wrench, color: "orange" as const },
    { id: 'stat_techs', title: "فنيين متاحين", value: "3/10", sub: "الآن", icon: Users, color: "green" as const },
    { id: 'stat_revenue', title: "إيراد الأسبوع", value: "25,000", sub: "جنيه", icon: DollarSign, color: "purple" as const },
  ];

  const defaultActions = [
    { id: 'act_new_req', label: "طلب صيانة", icon: Plus, color: "bg-blue-700 text-white", onClick: () => setActiveTab('requests') },
    { id: 'act_assign', label: "تعيين فني", icon: Users, color: "bg-white text-gray-700 border border-gray-200 hover:border-blue-600", onClick: () => setActiveTab('technicians') },
    { id: 'act_parts', label: "صرف قطعة غيار", icon: Settings, color: "bg-white text-gray-700 border border-gray-200 hover:border-blue-600", onClick: () => setActiveTab('spare_parts') },
    { id: 'act_close', label: "إنهاء أمر شغل", icon: CheckCircle, color: "bg-white text-gray-700 border border-gray-200 hover:border-blue-600", onClick: () => setActiveTab('jobs') },
    { id: 'act_invoice', label: "إصدار فاتورة", icon: FileText, color: "bg-white text-gray-700 border border-gray-200 hover:border-blue-600", onClick: () => setActiveTab('invoices') },
    { id: 'act_track', label: "تتبع الفريق", icon: MapPin, color: "bg-white text-gray-700 border border-gray-200 hover:border-blue-600", onClick: () => setActiveTab('technicians') },
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
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-blue-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-blue-600 transition"
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
         {/* Active Jobs */}
         <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-800">المهام الجارية</h3>
                <button 
                  onClick={() => setActiveTab('jobs')}
                  className="text-sm text-blue-600 font-bold hover:underline"
                >
                  عرض الجدول
                </button>
            </div>
            <div className="space-y-3">
                <JobRow client="فندق الماسة" device="تكييف مركزي" issue="صيانة دورية" tech="م. حسن" status="in_progress" />
                <JobRow client="مطعم حضرموت" device="ثلاجة عرض" issue="لا تعمل" tech="لم يحدد" status="pending" />
                <JobRow client="فيلا 15" device="شبكة مياه" issue="تسريب" tech="فني محمد" status="completed" />
            </div>
         </div>

         {/* Technician Status */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">حالة الفنيين</h3>
            <div className="space-y-4">
               <TechCard name="م. حسن" status="busy" job="فندق الماسة" />
               <TechCard name="فني محمد" status="available" job="-" />
               <TechCard name="فني علي" status="busy" job="صيانة خارجية" />
               <TechCard name="م. خالد" status="offline" job="-" />
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

const JobRow = ({ client, device, issue, tech, status }: any) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
        <div>
            <h4 className="font-bold text-sm text-gray-800">{client}</h4>
            <p className="text-xs text-gray-500">{device} • {issue}</p>
        </div>
        <div className="text-left">
            <p className="text-xs font-bold text-gray-700 mb-1">{tech}</p>
            <StatusBadge status={status} />
        </div>
    </div>
);

const TechCard = ({ name, status, job }: any) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full 
                ${status === 'available' ? 'bg-green-500' : status === 'busy' ? 'bg-orange-500' : 'bg-gray-400'}`}>
            </div>
            <div>
                <h4 className="font-bold text-sm text-gray-800">{name}</h4>
                <p className="text-xs text-gray-400">{job}</p>
            </div>
        </div>
        {status === 'available' && <button className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold">تعيين</button>}
    </div>
);

export default ServicesOverview;
