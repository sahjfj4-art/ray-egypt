
import React from 'react';
import { MapPin, Clock, User, AlertCircle, CheckCircle, Wrench, MoreHorizontal, Phone } from 'lucide-react';

const requests = [
  { id: 101, client: 'فندق الماسة', title: 'صيانة تكييف مركزي', address: 'مدينة نصر, القاهرة', status: 'pending', priority: 'high', date: '2025-11-22', time: '10:00 AM' },
  { id: 102, client: 'مطعم البرنس', title: 'إصلاح ثلاجة عرض', address: 'إمbaba, الجيزة', status: 'pending', priority: 'medium', date: '2025-11-22', time: '01:00 PM' },
  { id: 103, client: 'فيلا د. أحمد', title: 'تأسيس سباكة حمام', address: 'التجمع الخامس', status: 'in_progress', priority: 'medium', date: '2025-11-21', time: '09:00 AM', tech: 'م. حسن' },
  { id: 104, client: 'شركة النيل', title: 'صيانة شبكة كهرباء', address: 'القرية الذكية', status: 'in_progress', priority: 'high', date: '2025-11-21', time: '11:30 AM', tech: 'فني علي' },
  { id: 105, client: 'أستاذ محمد', title: 'تركيب فلاتر مياه', address: 'المعادي', status: 'completed', priority: 'low', date: '2025-11-20', time: '04:00 PM', tech: 'فني محمد' },
];

const ServiceRequestsView: React.FC = () => {
  const pending = requests.filter(r => r.status === 'pending');
  const inProgress = requests.filter(r => r.status === 'in_progress');
  const completed = requests.filter(r => r.status === 'completed');

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-800">إدارة الطلبات</h2>
          <p className="text-sm text-gray-500">متابعة طلبات الصيانة وحالة الفنيين</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-blue-100">توزيع تلقائي</button>
           <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-200">طلب جديد +</button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-2">
        <div className="flex gap-6 min-w-[1000px] h-full">
          {/* Pending Column */}
          <div className="flex-1 flex flex-col bg-gray-50 rounded-2xl p-4 border border-gray-100">
             <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-700 flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                   طلبات جديدة
                </h3>
                <span className="bg-white px-2 py-1 rounded-lg text-xs font-bold text-gray-500 border border-gray-200">{pending.length}</span>
             </div>
             <div className="space-y-3 overflow-y-auto pr-1">
                {pending.map(req => <RequestCard key={req.id} req={req} color="orange" />)}
             </div>
          </div>

          {/* In Progress Column */}
          <div className="flex-1 flex flex-col bg-blue-50/50 rounded-2xl p-4 border border-blue-100">
             <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-blue-800 flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                   جاري التنفيذ
                </h3>
                <span className="bg-white px-2 py-1 rounded-lg text-xs font-bold text-blue-600 border border-blue-100">{inProgress.length}</span>
             </div>
             <div className="space-y-3 overflow-y-auto pr-1">
                {inProgress.map(req => <RequestCard key={req.id} req={req} color="blue" showTech />)}
             </div>
          </div>

          {/* Completed Column */}
          <div className="flex-1 flex flex-col bg-green-50/50 rounded-2xl p-4 border border-green-100">
             <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-green-800 flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
                   مكتملة
                </h3>
                <span className="bg-white px-2 py-1 rounded-lg text-xs font-bold text-green-600 border border-green-100">{completed.length}</span>
             </div>
             <div className="space-y-3 overflow-y-auto pr-1">
                {completed.map(req => <RequestCard key={req.id} req={req} color="green" showTech completed />)}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RequestCard = ({ req, color, showTech, completed }: any) => {
  const priorityColors: any = {
     high: 'bg-red-100 text-red-700',
     medium: 'bg-yellow-100 text-yellow-700',
     low: 'bg-gray-100 text-gray-700'
  };
  
  const borderColors: any = {
     orange: 'hover:border-orange-400',
     blue: 'hover:border-blue-400',
     green: 'hover:border-green-400'
  };

  return (
    <div className={`bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer transition-all hover:shadow-md ${borderColors[color]}`}>
       <div className="flex justify-between items-start mb-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${priorityColors[req.priority]}`}>
             {req.priority === 'high' ? 'عاجل' : req.priority === 'medium' ? 'متوسط' : 'عادي'}
          </span>
          <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-4 h-4" /></button>
       </div>
       <h4 className="font-bold text-gray-800 text-sm mb-1">{req.title}</h4>
       <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
          <User className="w-3 h-3" /> {req.client}
       </p>
       
       <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg mb-2">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">{req.address}</span>
       </div>

       {showTech && (
          <div className="flex items-center gap-2 mb-2">
             <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 border border-white shadow-sm">
                {req.tech?.charAt(0)}
             </div>
             <span className="text-xs font-bold text-gray-700">{req.tech}</span>
          </div>
       )}

       <div className="flex justify-between items-center pt-2 border-t border-gray-50 mt-2">
          <span className="text-[10px] text-gray-400 flex items-center gap-1">
             <Clock className="w-3 h-3" /> {req.time}
          </span>
          <div className="flex gap-2">
             <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500"><Phone className="w-3 h-3" /></button>
             {!completed && <button className="p-1.5 hover:bg-blue-50 rounded text-blue-600 font-bold text-xs">تفاصيل</button>}
          </div>
       </div>
    </div>
  );
};

export default ServiceRequestsView;
