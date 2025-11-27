
import React, { useState } from 'react';
import { 
  Wrench, Search, Plus, Clock, User, CheckCircle, 
  AlertCircle, DollarSign, Settings, Save, ChevronRight
} from 'lucide-react';
import StatusBadge from '../../common/StatusBadge';
import JobOrderForm from './JobOrderForm';

interface Job {
  id: string;
  client: string;
  device: string;
  issue: string;
  status: 'diagnosis' | 'parts' | 'repair' | 'qc' | 'completed';
  date: string;
  cost: number;
}

const initialJobs: Job[] = [
  { id: '#JOB-101', client: 'فندق الماسة', device: 'تكييف مركزي - وحدة 5', issue: 'تبريد ضعيف', status: 'diagnosis', date: '2025-11-22', cost: 0 },
  { id: '#JOB-102', client: 'مطعم البرنس', device: 'ثلاجة عرض', issue: 'توقف الموتور', status: 'parts', date: '2025-11-22', cost: 1500 },
  { id: '#JOB-103', client: 'أحمد علي', device: 'غسالة أطباق', issue: 'تسريب مياه', status: 'repair', date: '2025-11-21', cost: 450 },
  { id: '#JOB-104', client: 'شركة النيل', device: 'مولد كهرباء', issue: 'صيانة دورية', status: 'completed', date: '2025-11-20', cost: 2500 },
];

const JobOrderManager: React.FC = () => {
  const [jobs, setJobs] = useState(initialJobs);
  const [selectedJob, setSelectedJob] = useState<string | null>(initialJobs[0].id);
  const [diagnosis, setDiagnosis] = useState('');
  const [parts, setParts] = useState<{name: string, price: number}[]>([]);
  const [laborCost, setLaborCost] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const activeJob = jobs.find(j => j.id === selectedJob);

  const updateStatus = (newStatus: Job['status']) => {
    if (activeJob) {
      setJobs(jobs.map(j => j.id === activeJob.id ? { ...j, status: newStatus } : j));
    }
  };

  const addPart = () => {
    setParts([...parts, { name: 'قطعة غيار جديدة', price: 0 }]);
  };

  const updatePart = (index: number, field: 'name' | 'price', value: string | number) => {
    const newParts = [...parts];
    newParts[index] = { ...newParts[index], [field]: value };
    setParts(newParts);
  };

  const totalCost = parts.reduce((sum, p) => sum + p.price, 0) + laborCost;

  const handleCreateJob = (jobData: any) => {
    const newJob: Job = {
      id: `#JOB-${Date.now().toString().slice(-4)}`,
      cost: 0,
      date: new Date().toISOString().split('T')[0],
      ...jobData
    };
    setJobs([newJob, ...jobs]);
    setSelectedJob(newJob.id);
    setIsFormOpen(false);
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Wrench className="w-6 h-6 text-blue-600" />
            إدارة أوامر الشغل
          </h2>
          <p className="text-sm text-gray-500">متابعة مراحل الإصلاح والصيانة</p>
        </div>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold shadow-md flex items-center gap-2 hover:bg-blue-700 transition"
        >
           <Plus className="w-4 h-4" />
           أمر شغل جديد
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-220px)]">
         {/* Jobs List */}
         <div className="w-full lg:w-80 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-100">
               <div className="relative">
                  <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="بحث..." className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-blue-500" />
               </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
               {jobs.map(job => (
                  <div 
                    key={job.id}
                    onClick={() => setSelectedJob(job.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all hover:shadow-sm
                      ${selectedJob === job.id ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100 hover:border-blue-100'}
                    `}
                  >
                     <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-sm text-gray-900">{job.id}</span>
                        <span className="text-[10px] text-gray-400">{job.date}</span>
                     </div>
                     <h4 className="text-sm font-bold text-gray-700 mb-1">{job.client}</h4>
                     <p className="text-xs text-gray-500 mb-2">{job.device}</p>
                     <div className="flex justify-between items-center">
                        <StatusBadge status={job.status === 'completed' ? 'completed' : job.status === 'diagnosis' ? 'waiting' : 'in_progress'} label={job.status} />
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Active Job Detail */}
         {activeJob ? (
            <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
               {/* Detail Header */}
               <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50">
                  <div>
                     <h2 className="text-2xl font-black text-gray-900 mb-1">{activeJob.id}</h2>
                     <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><User className="w-4 h-4" /> {activeJob.client}</span>
                        <span className="flex items-center gap-1"><Settings className="w-4 h-4" /> {activeJob.device}</span>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     {['diagnosis', 'parts', 'repair', 'qc', 'completed'].map((step, idx) => (
                        <div key={step} className={`flex flex-col items-center gap-1 ${activeJob.status === step ? 'opacity-100' : 'opacity-40'}`}>
                           <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 
                              ${activeJob.status === step ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-300 text-gray-500'}
                           `}>
                              {idx + 1}
                           </div>
                           <span className="text-[10px] font-bold uppercase">{step}</span>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  {/* Workflow Actions */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <h3 className="font-bold text-gray-800 border-r-4 border-blue-600 pr-2">التشخيص والإصلاح</h3>
                        <div className="space-y-2">
                           <label className="text-sm font-bold text-gray-600">وصف العطل (فني)</label>
                           <textarea 
                             className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:border-blue-500 outline-none h-32"
                             placeholder="اكتب تفاصيل التشخيص..."
                             value={diagnosis}
                             onChange={e => setDiagnosis(e.target.value)}
                           ></textarea>
                        </div>
                        
                        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 flex items-start gap-3">
                           <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                           <div>
                              <h4 className="font-bold text-sm text-yellow-800">ملاحظة العميل</h4>
                              <p className="text-xs text-yellow-700 mt-1">{activeJob.issue}</p>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div className="flex justify-between items-center">
                           <h3 className="font-bold text-gray-800 border-r-4 border-blue-600 pr-2">قطع الغيار والتكلفة</h3>
                           <button onClick={addPart} className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg hover:bg-blue-100">
                              + إضافة قطعة
                           </button>
                        </div>
                        
                        <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                           <table className="w-full text-sm">
                              <thead className="bg-gray-100 text-gray-500">
                                 <tr>
                                    <th className="p-3 text-right">البند</th>
                                    <th className="p-3 text-left w-32">السعر</th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                 {parts.map((part, idx) => (
                                    <tr key={idx}>
                                       <td className="p-2">
                                          <input 
                                            type="text" 
                                            value={part.name} 
                                            onChange={e => updatePart(idx, 'name', e.target.value)}
                                            className="w-full bg-transparent outline-none" 
                                          />
                                       </td>
                                       <td className="p-2">
                                          <input 
                                            type="number" 
                                            value={part.price} 
                                            onChange={e => updatePart(idx, 'price', Number(e.target.value))}
                                            className="w-full bg-transparent outline-none text-left font-bold" 
                                          />
                                       </td>
                                    </tr>
                                 ))}
                                 <tr>
                                    <td className="p-3 font-bold text-gray-600">المصنعية (Labor)</td>
                                    <td className="p-3">
                                       <input 
                                          type="number" 
                                          value={laborCost} 
                                          onChange={e => setLaborCost(Number(e.target.value))}
                                          className="w-full bg-white border border-gray-200 rounded px-2 py-1 text-left font-bold" 
                                       />
                                    </td>
                                 </tr>
                              </tbody>
                              <tfoot className="bg-gray-100 font-bold border-t border-gray-200">
                                 <tr>
                                    <td className="p-3">الإجمالي</td>
                                    <td className="p-3 text-left text-blue-600 text-lg">{totalCost} ج.م</td>
                                 </tr>
                              </tfoot>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Footer Actions */}
               <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                     <span className="text-sm text-gray-500">تغيير الحالة:</span>
                     <select 
                        className="bg-white border border-gray-200 rounded-lg p-2 text-sm font-bold outline-none"
                        value={activeJob.status}
                        onChange={(e) => updateStatus(e.target.value as any)}
                     >
                        <option value="diagnosis">تشخيص</option>
                        <option value="parts">انتظار قطع غيار</option>
                        <option value="repair">إصلاح</option>
                        <option value="qc">فحص جودة</option>
                        <option value="completed">مكتمل</option>
                     </select>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition flex items-center gap-2">
                     <Save className="w-4 h-4" />
                     حفظ التحديثات
                  </button>
               </div>
            </div>
         ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-2xl border border-gray-200 border-dashed">
               <p className="text-gray-400 font-medium">اختر أمر شغل لعرض التفاصيل</p>
            </div>
         )}
      </div>

      {isFormOpen && (
        <JobOrderForm 
          onClose={() => setIsFormOpen(false)} 
          onSave={handleCreateJob} 
        />
      )}
    </div>
  );
};

export default JobOrderManager;
