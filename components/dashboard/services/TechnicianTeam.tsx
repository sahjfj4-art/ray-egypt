
import React, { useState } from 'react';
import { 
  Users, MapPin, Phone, Wrench, CheckCircle, Clock, AlertCircle, Search, Star, Plus, X 
} from 'lucide-react';

interface Technician {
  id: string;
  name: string;
  role: string;
  status: 'available' | 'busy' | 'offline';
  currentJob?: string;
  location: string;
  phone: string;
  rating: number;
  skills: string[];
}

const initialTechs: Technician[] = [
  { id: 'T-01', name: 'م. حسن أحمد', role: 'فني تكييف', status: 'busy', currentJob: 'فندق الماسة - صيانة مركزية', location: 'مدينة نصر', phone: '010xxxxxxx', rating: 4.9, skills: ['تكييف مركزي', 'Split'] },
  { id: 'T-02', name: 'علي محمود', role: 'كهربائي', status: 'available', location: 'الورشة الرئيسية', phone: '012xxxxxxx', rating: 4.7, skills: ['تيار خفيف', 'تأسيس'] },
  { id: 'T-03', name: 'سيد كمال', role: 'سباك', status: 'busy', currentJob: 'فيلا 15 - تسريب مياه', location: 'التجمع الخامس', phone: '011xxxxxxx', rating: 4.5, skills: ['صحي', 'فلاتر'] },
  { id: 'T-04', name: 'خالد جمال', role: 'فني أجهزة', status: 'offline', location: '-', phone: '015xxxxxxx', rating: 4.8, skills: ['ثلاجات', 'غسالات'] },
];

const pendingJobs = [
  { id: 'J-201', title: 'صيانة ثلاجة عرض', location: 'مطعم البرنس', type: 'أجهزة' },
  { id: 'J-202', title: 'تركيب إنارة', location: 'كافيه بينوس', type: 'كهرباء' },
  { id: 'J-203', title: 'صيانة فلتر', location: 'منزل خاص', type: 'سباكة' },
];

const TechnicianTeam: React.FC = () => {
  const [techs, setTechs] = useState(initialTechs);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const handleAssignClick = (techId: string) => {
    setSelectedTech(techId);
    setIsAssignModalOpen(true);
  };

  const handleAssignJob = (jobTitle: string) => {
    setTechs(prev => prev.map(t => t.id === selectedTech ? { ...t, status: 'busy', currentJob: jobTitle } : t));
    setIsAssignModalOpen(false);
    setSelectedTech(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            فريق الفنيين
          </h2>
          <p className="text-sm text-gray-500">متابعة حالة ومواقع الفنيين لحظة بلحظة</p>
        </div>
        
        <div className="relative w-full md:w-64">
           <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
           <input 
             type="text" 
             placeholder="بحث عن فني..." 
             className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-blue-500"
           />
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600"><CheckCircle className="w-5 h-5" /></div>
            <div><p className="text-xs text-green-700 font-bold">متاح الآن</p><h3 className="text-xl font-black text-green-900">{techs.filter(t => t.status === 'available').length}</h3></div>
         </div>
         <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600"><Wrench className="w-5 h-5" /></div>
            <div><p className="text-xs text-orange-700 font-bold">في مهمة</p><h3 className="text-xl font-black text-orange-900">{techs.filter(t => t.status === 'busy').length}</h3></div>
         </div>
         <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500"><Clock className="w-5 h-5" /></div>
            <div><p className="text-xs text-gray-600 font-bold">خارج الخدمة</p><h3 className="text-xl font-black text-gray-800">{techs.filter(t => t.status === 'offline').length}</h3></div>
         </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
         {techs.map(tech => (
            <div key={tech.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden">
               <div className="p-5 flex gap-4">
                  <div className="relative">
                     <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center font-bold text-xl text-gray-600 border-2 border-white shadow-sm">
                        {tech.name.charAt(0)}
                     </div>
                     <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white 
                        ${tech.status === 'available' ? 'bg-green-500' : tech.status === 'busy' ? 'bg-orange-500' : 'bg-gray-400'}
                     `}></div>
                  </div>
                  <div className="flex-1">
                     <h3 className="font-bold text-gray-900">{tech.name}</h3>
                     <p className="text-sm text-blue-600 font-medium">{tech.role}</p>
                     <div className="flex items-center gap-1 mt-1 text-xs text-yellow-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="font-bold text-gray-600">{tech.rating}</span>
                     </div>
                  </div>
                  <button className="h-8 w-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition">
                     <Phone className="w-4 h-4" />
                  </button>
               </div>

               <div className="px-5 pb-4 space-y-3">
                  {tech.status === 'busy' && (
                     <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                        <p className="text-[10px] font-bold text-orange-700 mb-1">المهمة الحالية</p>
                        <p className="text-xs font-medium text-gray-800 flex items-center gap-2">
                           <Wrench className="w-3 h-3 text-orange-500" />
                           {tech.currentJob}
                        </p>
                     </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                     <MapPin className="w-3 h-3" />
                     <span>{tech.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-2 border-t border-gray-50">
                     {tech.skills.map(skill => (
                        <span key={skill} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-[10px] font-medium">
                           {skill}
                        </span>
                     ))}
                  </div>
               </div>
               
               <div className="bg-gray-50 p-3 flex justify-between items-center">
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                     tech.status === 'available' ? 'bg-green-100 text-green-700' : 
                     tech.status === 'busy' ? 'bg-orange-100 text-orange-700' : 'bg-gray-200 text-gray-600'
                  }`}>
                     {tech.status === 'available' ? 'متاح للعمل' : tech.status === 'busy' ? 'مشغول' : 'غير متاح'}
                  </span>
                  {tech.status === 'available' && (
                     <button 
                        onClick={() => handleAssignClick(tech.id)}
                        className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg shadow-sm transition"
                     >
                        تعيين مهمة
                     </button>
                  )}
               </div>
            </div>
         ))}
      </div>

      {/* Assignment Modal */}
      {isAssignModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
               <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                  <h3 className="font-bold text-gray-800">تعيين مهمة جديدة</h3>
                  <button onClick={() => setIsAssignModalOpen(false)} className="p-1 rounded-full hover:bg-gray-200"><X className="w-5 h-5 text-gray-500" /></button>
               </div>
               <div className="p-4">
                  <p className="text-sm text-gray-500 mb-4">اختر مهمة من القائمة لتعيينها للفني:</p>
                  <div className="space-y-2">
                     {pendingJobs.map(job => (
                        <button 
                           key={job.id}
                           onClick={() => handleAssignJob(job.title)}
                           className="w-full p-3 text-right border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition group"
                        >
                           <div className="flex justify-between items-start">
                              <h4 className="font-bold text-sm text-gray-800 group-hover:text-blue-800">{job.title}</h4>
                              <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600">{job.type}</span>
                           </div>
                           <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {job.location}
                           </p>
                        </button>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default TechnicianTeam;
