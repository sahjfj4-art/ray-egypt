
import React, { useState } from 'react';
import { 
  Truck, Search, Plus, Phone, FileText, DollarSign, 
  MoreVertical, Package, Calendar, AlertCircle, CheckCircle, Edit
} from 'lucide-react';
import SupplierForm from './SupplierForm';

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  balance: number;
  lastDelivery: string;
  status: 'active' | 'inactive';
  category: string;
}

const initialSuppliers: Supplier[] = [
  { id: 'S-101', name: 'شركة جهينة للصناعات الغذائية', contactPerson: 'أ. ماجد', phone: '010xxxxxxx', balance: 15000, lastDelivery: '2025-11-20', status: 'active', category: 'ألبان وعصائر' },
  { id: 'S-102', name: 'المتحدة للأدوية', contactPerson: 'د. سمير', phone: '012xxxxxxx', balance: 45000, lastDelivery: '2025-11-18', status: 'active', category: 'أدوية' },
  { id: 'S-103', name: 'تجار الجملة للمنظفات', contactPerson: 'الحاج سيد', phone: '011xxxxxxx', balance: 2400, lastDelivery: '2025-11-15', status: 'inactive', category: 'منظفات' },
  { id: 'S-104', name: 'إيديتا للصناعات', contactPerson: 'م. كريم', phone: '015xxxxxxx', balance: 8500, lastDelivery: '2025-11-22', status: 'active', category: 'سناكس' },
];

const SupplierManager: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<any>(null);

  const filteredSuppliers = suppliers.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.category.includes(searchTerm)
  );

  const activeSupplierData = suppliers.find(s => s.id === selectedSupplier);

  const handleAdd = () => {
    setEditingSupplier(null);
    setIsFormOpen(true);
  };

  const handleEdit = (supplier: any) => {
    setEditingSupplier(supplier);
    setIsFormOpen(true);
  };

  const handleSave = (data: any) => {
    if (editingSupplier) {
      setSuppliers(prev => prev.map(s => s.id === editingSupplier.id ? { ...s, ...data } : s));
    } else {
      const newSupplier = {
        id: `S-${Date.now()}`,
        balance: 0,
        lastDelivery: '-',
        ...data
      };
      setSuppliers([...suppliers, newSupplier]);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Suppliers List */}
      <div className={`${selectedSupplier ? 'hidden lg:flex' : 'flex'} flex-col flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden`}>
         <div className="p-4 border-b border-gray-100">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Truck className="w-6 h-6 text-blue-600" />
                  الموردين
               </h2>
               <button 
                 onClick={handleAdd}
                 className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition shadow-md"
               >
                  <Plus className="w-5 h-5" />
               </button>
            </div>
            <div className="relative">
               <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
               <input 
                 type="text" 
                 placeholder="بحث عن مورد..." 
                 className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-blue-500 transition"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
         </div>

         <div className="flex-1 overflow-y-auto">
            {filteredSuppliers.map(supplier => (
               <div 
                 key={supplier.id} 
                 onClick={() => setSelectedSupplier(supplier.id)}
                 className={`p-4 border-b border-gray-50 cursor-pointer transition hover:bg-blue-50/50 flex items-center gap-4
                   ${selectedSupplier === supplier.id ? 'bg-blue-50 border-blue-100' : ''}
                 `}
               >
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-lg shrink-0 border border-gray-200">
                     {supplier.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-start mb-1">
                        <h4 className={`font-bold text-sm truncate ${selectedSupplier === supplier.id ? 'text-blue-900' : 'text-gray-800'}`}>{supplier.name}</h4>
                        {supplier.status === 'active' && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
                     </div>
                     <p className="text-xs text-gray-500 mb-1">{supplier.category}</p>
                     <p className="text-xs font-bold text-red-500">مستحق: {supplier.balance.toLocaleString()} ج</p>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Supplier Details */}
      <div className={`${selectedSupplier ? 'flex' : 'hidden lg:flex'} flex-[2] bg-white rounded-2xl border border-gray-100 shadow-sm flex-col overflow-hidden`}>
         {activeSupplierData ? (
            <>
               {/* Header */}
               <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4">
                     <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center font-black text-3xl text-blue-600 shadow-sm border border-blue-100">
                        {activeSupplierData.name.charAt(0)}
                     </div>
                     <div>
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                          {activeSupplierData.name}
                          <button onClick={() => handleEdit(activeSupplierData)} className="text-gray-400 hover:text-blue-600 transition">
                            <Edit className="w-4 h-4" />
                          </button>
                        </h2>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                           <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-gray-200"><Phone className="w-3 h-3" /> {activeSupplierData.phone}</span>
                           <span className="flex items-center gap-1"><Package className="w-3 h-3" /> {activeSupplierData.category}</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                     <button onClick={() => setSelectedSupplier(null)} className="lg:hidden p-2 bg-white border border-gray-200 rounded-lg text-gray-600">رجوع</button>
                     <button className="flex-1 md:flex-none px-4 py-2 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition shadow-sm">سداد دفعة</button>
                     <button className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition shadow-sm flex items-center gap-2 justify-center">
                        <Plus className="w-4 h-4" /> طلبية جديدة
                     </button>
                  </div>
               </div>

               {/* Financial Summary */}
               <div className="grid grid-cols-3 gap-4 p-6 border-b border-gray-100">
                  <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-center">
                     <p className="text-xs text-red-600 font-bold mb-1 flex items-center justify-center gap-1"><DollarSign className="w-3 h-3" /> الرصيد المستحق</p>
                     <p className="text-2xl font-black text-red-900">{activeSupplierData.balance.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-center">
                     <p className="text-xs text-gray-600 font-bold mb-1 flex items-center justify-center gap-1"><Calendar className="w-3 h-3" /> آخر توريد</p>
                     <p className="text-lg font-bold text-gray-900">{activeSupplierData.lastDelivery}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
                     <p className="text-xs text-blue-600 font-bold mb-1">مسؤول الاتصال</p>
                     <p className="text-lg font-bold text-blue-900">{activeSupplierData.contactPerson}</p>
                  </div>
               </div>

               {/* Recent Orders */}
               <div className="flex-1 overflow-y-auto p-6">
                  <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                     <FileText className="w-5 h-5 text-gray-500" />
                     سجل الطلبيات
                  </h3>
                  <div className="space-y-3">
                     {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition group">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition">
                                 <Package className="w-5 h-5" />
                              </div>
                              <div>
                                 <h4 className="font-bold text-gray-800 text-sm">طلبية توريد #{2020 + i}</h4>
                                 <p className="text-xs text-gray-500">20 نوفمبر 2025 • 15 صنف</p>
                              </div>
                           </div>
                           <div className="text-left">
                              <span className="block font-bold text-gray-900 mb-1">12,500 ج</span>
                              {i === 1 ? (
                                <span className="text-[10px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-bold flex items-center gap-1 justify-end"><AlertCircle className="w-3 h-3" /> آجلة</span>
                              ) : (
                                <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded font-bold flex items-center gap-1 justify-end"><CheckCircle className="w-3 h-3" /> مدفوعة</span>
                              )}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </>
         ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
               <Truck className="w-24 h-24 mb-4 opacity-20" />
               <p className="text-lg font-medium">اختر مورداً لعرض التفاصيل</p>
            </div>
         )}
      </div>

      {isFormOpen && (
        <SupplierForm 
          onClose={() => setIsFormOpen(false)} 
          onSave={handleSave} 
          initialData={editingSupplier} 
        />
      )}
    </div>
  );
};

export default SupplierManager;
