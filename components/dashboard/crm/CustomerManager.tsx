
import React, { useState } from 'react';
import { 
  Search, Plus, User, Phone, Mail, MapPin, 
  ShoppingBag, Star, History, ChevronDown, 
  MessageCircle, MoreHorizontal, X, Save, PieChart, Trophy, AlertCircle
} from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  totalSpent: number;
  ordersCount: number;
  lastOrder: string;
  rating: number;
  tags: string[];
  status: 'active' | 'inactive' | 'vip';
}

const initialCustomers: Customer[] = [
  { id: 'C-101', name: 'أحمد محمد علي', phone: '01098765432', email: 'ahmed@example.com', address: 'المعادي، القاهرة', totalSpent: 15400, ordersCount: 12, lastOrder: '2025-11-20', rating: 5, tags: ['VIP', 'مشتري دائم'], status: 'vip' },
  { id: 'C-102', name: 'سارة محمود', phone: '01234567890', email: 'sara@example.com', address: 'مدينة نصر', totalSpent: 2300, ordersCount: 3, lastOrder: '2025-11-18', rating: 4, tags: ['جديد'], status: 'active' },
  { id: 'C-103', name: 'شركة النور للمقاولات', phone: '0223344556', email: 'contact@alnoor.com', address: 'التجمع الخامس', totalSpent: 85000, ordersCount: 5, lastOrder: '2025-10-15', rating: 5, tags: ['شركات', 'B2B'], status: 'vip' },
  { id: 'C-104', name: 'كريم حسن', phone: '01122334455', email: 'karem@example.com', address: 'الشيخ زايد', totalSpent: 0, ordersCount: 0, lastOrder: '-', rating: 0, tags: ['مسجل حديثاً'], status: 'inactive' },
  { id: 'C-105', name: 'منى زكي', phone: '01555667788', email: 'mona@example.com', address: 'المهندسين', totalSpent: 4500, ordersCount: 8, lastOrder: '2025-11-22', rating: 4.5, tags: [], status: 'active' },
];

const CustomerManager: React.FC = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'segments'>('list');

  // New customer form state
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm)
  );

  const activeCustomerData = customers.find(c => c.id === selectedCustomer);

  // Segmentation Logic
  const segments = {
      vip: customers.filter(c => c.status === 'vip').length,
      active: customers.filter(c => c.status === 'active').length,
      inactive: customers.filter(c => c.status === 'inactive').length,
      total: customers.length
  };

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const customer: Customer = {
      id: `C-${Date.now()}`,
      ...newCustomer,
      totalSpent: 0,
      ordersCount: 0,
      lastOrder: '-',
      rating: 0,
      tags: ['جديد'],
      status: 'active'
    };
    setCustomers([customer, ...customers]);
    setIsAddModalOpen(false);
    setNewCustomer({ name: '', phone: '', email: '', address: '' });
    setSelectedCustomer(customer.id);
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2 relative">
      {/* Header & View Toggle */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
         <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
               <User className="w-6 h-6 text-purple-600" />
               إدارة العملاء (CRM)
            </h2>
            <p className="text-sm text-gray-500">قاعدة بيانات العملاء وسجل التعاملات</p>
         </div>
         <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
            <button 
               onClick={() => setViewMode('list')} 
               className={`px-4 py-2 rounded-lg text-sm font-bold transition ${viewMode === 'list' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
               القائمة
            </button>
            <button 
               onClick={() => setViewMode('segments')} 
               className={`px-4 py-2 rounded-lg text-sm font-bold transition ${viewMode === 'segments' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
               تحليل الشرائح
            </button>
         </div>
      </div>

      {viewMode === 'segments' ? (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-purple-600 mb-4 shadow-sm">
                  <Trophy className="w-8 h-8" />
               </div>
               <h3 className="text-lg font-bold text-purple-900">كبار العملاء (VIP)</h3>
               <p className="text-3xl font-black text-purple-800 my-2">{segments.vip}</p>
               <p className="text-sm text-purple-700">يمثلون 20% من الإيرادات</p>
               <button className="mt-4 w-full py-2 bg-white text-purple-700 rounded-xl font-bold text-sm hover:bg-purple-100">إرسال عرض خاص</button>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 mb-4 shadow-sm">
                  <ShoppingBag className="w-8 h-8" />
               </div>
               <h3 className="text-lg font-bold text-blue-900">العملاء النشطين</h3>
               <p className="text-3xl font-black text-blue-800 my-2">{segments.active}</p>
               <p className="text-sm text-blue-700">قاموا بالشراء آخر 30 يوم</p>
               <button className="mt-4 w-full py-2 bg-white text-blue-700 rounded-xl font-bold text-sm hover:bg-blue-100">متابعة النشاط</button>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-500 mb-4 shadow-sm">
                  <AlertCircle className="w-8 h-8" />
               </div>
               <h3 className="text-lg font-bold text-gray-800">عملاء خاملين</h3>
               <p className="text-3xl font-black text-gray-700 my-2">{segments.inactive}</p>
               <p className="text-sm text-gray-500">لم يشتروا منذ 3 أشهر</p>
               <button className="mt-4 w-full py-2 bg-white text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200">حملة استعادة</button>
            </div>
         </div>
      ) : (
         <div className="flex flex-col lg:flex-row gap-6 flex-1 h-[calc(100vh-200px)]">
            {/* List */}
            <div className={`${selectedCustomer ? 'hidden lg:flex' : 'flex'} flex-col flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden`}>
               <div className="p-4 border-b border-gray-100">
                  <div className="relative mb-4">
                     <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
                     <input 
                        type="text" 
                        placeholder="بحث بالاسم أو الهاتف..." 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-purple-500 transition"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                     />
                  </div>
                  <button 
                     onClick={() => setIsAddModalOpen(true)}
                     className="w-full bg-purple-600 text-white py-2 rounded-xl font-bold text-sm hover:bg-purple-700 transition flex items-center justify-center gap-2"
                  >
                     <Plus className="w-4 h-4" />
                     عميل جديد
                  </button>
               </div>

               <div className="flex-1 overflow-y-auto">
                  {filteredCustomers.map(customer => (
                     <div 
                        key={customer.id} 
                        onClick={() => setSelectedCustomer(customer.id)}
                        className={`p-4 border-b border-gray-50 cursor-pointer transition hover:bg-gray-50 flex items-center gap-4
                           ${selectedCustomer === customer.id ? 'bg-purple-50 border-purple-100' : ''}
                        `}
                     >
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-sm shrink-0 border border-gray-200">
                           {customer.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="flex justify-between items-start">
                              <h4 className={`font-bold text-sm truncate ${selectedCustomer === customer.id ? 'text-purple-900' : 'text-gray-800'}`}>{customer.name}</h4>
                              <span className="text-[10px] text-gray-400">{customer.lastOrder}</span>
                           </div>
                           <p className="text-xs text-gray-500 truncate dir-ltr text-right">{customer.phone}</p>
                           <div className="flex gap-1 mt-1">
                              {customer.status === 'vip' && <span className="text-[10px] bg-yellow-100 text-yellow-800 px-1.5 rounded font-bold">VIP</span>}
                              {customer.tags.map(tag => <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 rounded">{tag}</span>)}
                           </div>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-300 transform -rotate-90 ${selectedCustomer === customer.id ? 'text-purple-500' : ''}`} />
                     </div>
                  ))}
               </div>
            </div>

            {/* Details */}
            <div className={`${selectedCustomer ? 'flex' : 'hidden lg:flex'} flex-[2] bg-white rounded-2xl border border-gray-100 shadow-sm flex-col overflow-hidden relative`}>
               {activeCustomerData ? (
                  <>
                     {/* Header */}
                     <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-start">
                        <div className="flex items-center gap-4">
                           <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center font-black text-2xl text-purple-600 shadow-sm border border-purple-100">
                              {activeCustomerData.name.charAt(0)}
                           </div>
                           <div>
                              <h2 className="text-2xl font-bold text-gray-900">{activeCustomerData.name}</h2>
                              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                 <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {activeCustomerData.address}</span>
                                 <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                 <span className="text-yellow-500 font-bold flex items-center gap-1"><Star className="w-3 h-3 fill-current" /> {activeCustomerData.rating}</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex gap-2">
                           <button onClick={() => setSelectedCustomer(null)} className="lg:hidden p-2 bg-white border border-gray-200 rounded-lg text-gray-600">رجوع</button>
                           <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-purple-600 hover:border-purple-200 transition"><MessageCircle className="w-5 h-5" /></button>
                           <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-purple-600 hover:border-purple-200 transition"><MoreHorizontal className="w-5 h-5" /></button>
                        </div>
                     </div>

                     {/* Stats Cards */}
                     <div className="grid grid-cols-3 gap-4 p-6 border-b border-gray-100">
                        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-center">
                           <p className="text-xs text-purple-600 font-bold mb-1">إجمالي المشتريات</p>
                           <p className="text-xl font-black text-purple-900">{activeCustomerData.totalSpent.toLocaleString()} <span className="text-xs">ج.م</span></p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
                           <p className="text-xs text-blue-600 font-bold mb-1">عدد الطلبات</p>
                           <p className="text-xl font-black text-blue-900">{activeCustomerData.ordersCount}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
                           <p className="text-xs text-green-600 font-bold mb-1">نقاط الولاء</p>
                           <p className="text-xl font-black text-green-900">{(activeCustomerData.totalSpent * 0.05).toFixed(0)}</p>
                        </div>
                     </div>

                     {/* Tabs / Content */}
                     <div className="flex-1 overflow-y-auto p-6">
                        <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                           <History className="w-5 h-5 text-gray-500" />
                           سجل النشاط
                        </h3>
                        <div className="space-y-4">
                           {/* Mock Timeline */}
                           {[1, 2, 3].map((_, i) => (
                              <div key={i} className="flex gap-4 relative">
                                 {/* Vertical Line */}
                                 <div className="absolute top-0 right-[19px] h-full w-0.5 bg-gray-100 -z-10"></div>
                                 
                                 <div className="w-10 h-10 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center shrink-0 z-10">
                                    <ShoppingBag className="w-4 h-4 text-gray-400" />
                                 </div>
                                 <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-100">
                                    <div className="flex justify-between items-start mb-2">
                                       <h4 className="font-bold text-sm text-gray-800">طلب جديد #{9920 - i}</h4>
                                       <span className="text-xs text-gray-400">20 نوفمبر 2025</span>
                                    </div>
                                    <p className="text-xs text-gray-600 mb-2">شراء منتجات بقيمة 1,200 ج.م</p>
                                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">مكتمل</span>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* Contact Info */}
                     <div className="p-6 bg-gray-50 border-t border-gray-100">
                        <div className="grid grid-cols-2 gap-4">
                           <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200">
                              <Phone className="w-5 h-5 text-gray-400" />
                              <div>
                                 <p className="text-xs text-gray-500">رقم الهاتف</p>
                                 <p className="font-bold text-sm text-gray-800 dir-ltr">{activeCustomerData.phone}</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200">
                              <Mail className="w-5 h-5 text-gray-400" />
                              <div>
                                 <p className="text-xs text-gray-500">البريد الإلكتروني</p>
                                 <p className="font-bold text-sm text-gray-800 truncate max-w-[150px]">{activeCustomerData.email}</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </>
               ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
                     <User className="w-24 h-24 mb-4 opacity-20" />
                     <p className="text-lg font-medium">اختر عميلاً لعرض التفاصيل</p>
                  </div>
               )}
            </div>
         </div>
      )}

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm animate-in fade-in">
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                 <h3 className="font-bold text-gray-800">إضافة عميل جديد</h3>
                 <button onClick={() => setIsAddModalOpen(false)} className="p-1 hover:bg-gray-200 rounded-full"><X className="w-5 h-5 text-gray-500" /></button>
              </div>
              <form onSubmit={handleAddCustomer} className="p-6 space-y-4">
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600">الاسم بالكامل</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-purple-500 outline-none"
                      value={newCustomer.name}
                      onChange={e => setNewCustomer({...newCustomer, name: e.target.value})}
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600">رقم الهاتف</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-purple-500 outline-none"
                      value={newCustomer.phone}
                      onChange={e => setNewCustomer({...newCustomer, phone: e.target.value})}
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600">البريد الإلكتروني</label>
                    <input 
                      type="email" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-purple-500 outline-none"
                      value={newCustomer.email}
                      onChange={e => setNewCustomer({...newCustomer, email: e.target.value})}
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600">العنوان</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-purple-500 outline-none"
                      value={newCustomer.address}
                      onChange={e => setNewCustomer({...newCustomer, address: e.target.value})}
                    />
                 </div>
                 
                 <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition flex items-center justify-center gap-2 mt-4">
                    <Save className="w-4 h-4" />
                    حفظ العميل
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManager;
