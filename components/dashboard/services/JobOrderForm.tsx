
import React, { useState } from 'react';
import { X, Wrench, User, AlertCircle, Save, Sparkles, Loader2 } from 'lucide-react';
import { getGeminiResponse } from '../../../services/geminiService';

interface JobOrderFormProps {
  onClose: () => void;
  onSave: (job: any) => void;
  initialData?: any;
}

const JobOrderForm: React.FC<JobOrderFormProps> = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    client: '',
    device: '',
    issue: '',
    priority: 'normal',
    status: 'diagnosis',
    tech: '',
    diagnosisNotes: ''
  });
  const [isDiagnosing, setIsDiagnosing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const suggestDiagnosis = async () => {
    if (!formData.issue || !formData.device) return;
    setIsDiagnosing(true);
    try {
        const prompt = `أنا فني صيانة. لدي جهاز: ${formData.device}، والمشكلة هي: ${formData.issue}. اقترح خطوات التشخيص وأسباب العطل المحتملة في نقاط مختصرة.`;
        const diagnosis = await getGeminiResponse(prompt, 'merchant');
        setFormData(prev => ({ ...prev, diagnosisNotes: diagnosis }));
    } catch (e) {
        console.error(e);
    } finally {
        setIsDiagnosing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-blue-50">
          <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-blue-600" />
            {initialData ? 'تعديل أمر الشغل' : 'إنشاء أمر شغل جديد'}
          </h2>
          <button onClick={onClose} className="p-1.5 hover:bg-blue-100 rounded-full transition text-blue-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <form id="job-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">اسم العميل</label>
              <div className="relative">
                <User className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pr-10 pl-4 text-sm focus:border-blue-500 outline-none"
                  value={formData.client}
                  onChange={e => setFormData({...formData, client: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">الجهاز / المعدة</label>
              <input 
                type="text" 
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none"
                placeholder="مثال: تكييف شارب 1.5 حصان"
                value={formData.device}
                onChange={e => setFormData({...formData, device: e.target.value})}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">وصف العطل (شكوى العميل)</label>
              <textarea 
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:border-blue-500 outline-none h-20 resize-none"
                value={formData.issue}
                onChange={e => setFormData({...formData, issue: e.target.value})}
              ></textarea>
            </div>

            <div className="space-y-1">
               <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-gray-600">التشخيص المبدئي (للفني)</label>
                  <button 
                    type="button"
                    onClick={suggestDiagnosis}
                    disabled={!formData.issue || isDiagnosing}
                    className="text-[10px] bg-purple-50 text-purple-700 px-2 py-1 rounded font-bold flex items-center gap-1 hover:bg-purple-100 disabled:opacity-50"
                  >
                    {isDiagnosing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                    اقتراح تشخيص AI
                  </button>
               </div>
               <textarea 
                 className="w-full bg-white border border-gray-200 rounded-lg p-3 text-sm focus:border-blue-500 outline-none h-24 resize-none"
                 placeholder="اكتب ملاحظاتك الفنية هنا..."
                 value={formData.diagnosisNotes}
                 onChange={e => setFormData({...formData, diagnosisNotes: e.target.value})}
               ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">الأولوية</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none"
                  value={formData.priority}
                  onChange={e => setFormData({...formData, priority: e.target.value})}
                >
                  <option value="low">عادي</option>
                  <option value="normal">متوسط</option>
                  <option value="high">عاجل</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">تعيين فني</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none"
                  placeholder="اسم الفني"
                  value={formData.tech}
                  onChange={e => setFormData({...formData, tech: e.target.value})}
                />
              </div>
            </div>
          </form>
        </div>

        <div className="p-5 border-t border-gray-100 bg-white">
          <button 
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-md"
          >
            <Save className="w-4 h-4" />
            حفظ أمر الشغل
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobOrderForm;
    