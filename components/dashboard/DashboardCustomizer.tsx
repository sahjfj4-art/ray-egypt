
import React from 'react';
import { X, Layout, Check, Eye, EyeOff } from 'lucide-react';

interface Item {
  id: string;
  label: string;
  category: 'stats' | 'actions';
}

interface DashboardCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Item[];
  visibleIds: string[];
  onToggle: (id: string) => void;
}

const DashboardCustomizer: React.FC<DashboardCustomizerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  visibleIds, 
  onToggle 
}) => {
  if (!isOpen) return null;

  const stats = items.filter(i => i.category === 'stats');
  const actions = items.filter(i => i.category === 'actions');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative z-10 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm text-ray-blue">
              <Layout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">تخصيص لوحة القيادة</h3>
              <p className="text-xs text-gray-500">اختر العناصر التي تريد عرضها</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Stats Section */}
          <section>
            <h4 className="text-sm font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
              الإحصائيات
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600 normal-case">{stats.length}</span>
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {stats.map(item => (
                <ToggleItem 
                  key={item.id} 
                  item={item} 
                  isChecked={visibleIds.includes(item.id)} 
                  onToggle={() => onToggle(item.id)} 
                />
              ))}
            </div>
          </section>

          {/* Actions Section */}
          <section>
            <h4 className="text-sm font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
              الإجراءات السريعة
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600 normal-case">{actions.length}</span>
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {actions.map(item => (
                <ToggleItem 
                  key={item.id} 
                  item={item} 
                  isChecked={visibleIds.includes(item.id)} 
                  onToggle={() => onToggle(item.id)} 
                />
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-ray-black text-white px-6 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            حفظ التغييرات
          </button>
        </div>
      </div>
    </div>
  );
};

const ToggleItem: React.FC<{ item: Item, isChecked: boolean, onToggle: () => void }> = ({ item, isChecked, onToggle }) => (
  <label className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer group
    ${isChecked ? 'bg-white border-ray-blue/30 shadow-sm' : 'bg-gray-50 border-transparent opacity-60 hover:opacity-80'}
  `}>
    <div className="flex items-center gap-3">
      <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors
        ${isChecked ? 'bg-ray-blue border-ray-blue text-white' : 'bg-white border-gray-300 text-transparent'}
      `}>
        <Check className="w-3 h-3" />
      </div>
      <span className={`text-sm font-bold ${isChecked ? 'text-gray-800' : 'text-gray-500'}`}>{item.label}</span>
    </div>
    <div className="text-gray-400">
      {isChecked ? <Eye className="w-4 h-4 text-ray-blue" /> : <EyeOff className="w-4 h-4" />}
    </div>
    <input type="checkbox" className="hidden" checked={isChecked} onChange={onToggle} />
  </label>
);

export default DashboardCustomizer;
