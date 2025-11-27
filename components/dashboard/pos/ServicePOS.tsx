
import React, { useState } from 'react';
import { 
  Search, Plus, Minus, Trash2, CreditCard, Banknote, 
  Scissors, Pill, Dumbbell, ShoppingBag, Tag, User, CheckCircle, Loader2, ChevronUp
} from 'lucide-react';
import { BusinessType } from '../config';

interface Item {
  id: number;
  name: string;
  price: number;
  type: 'service' | 'product';
  category: string;
  image?: string;
}

const salonData: Item[] = [
  { id: 1, name: 'قص شعر', price: 150, type: 'service', category: 'شعر' },
  { id: 2, name: 'صبغة شعر', price: 800, type: 'service', category: 'شعر' },
  { id: 3, name: 'مانيكير وباديكير', price: 250, type: 'service', category: 'أظافر' },
  { id: 4, name: 'شامبو لوريال', price: 320, type: 'product', category: 'منتجات', image: 'https://images.unsplash.com/photo-1585232561307-3f83b718a441?w=200' },
  { id: 5, name: 'سيروم شعر', price: 450, type: 'product', category: 'منتجات', image: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?w=200' },
];

const clinicData: Item[] = [
  { id: 1, name: 'كشف استشاري', price: 450, type: 'service', category: 'كشف' },
  { id: 2, name: 'كشف مستعجل', price: 600, type: 'service', category: 'كشف' },
  { id: 3, name: 'إعادة كشف', price: 150, type: 'service', category: 'متابعة' },
  { id: 4, name: 'تحليل سكر', price: 50, type: 'service', category: 'معمل' },
  { id: 5, name: 'فيتامين سي', price: 90, type: 'product', category: 'صيدلية', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200' },
];

const gymData: Item[] = [
  { id: 1, name: 'اشتراك شهري', price: 500, type: 'service', category: 'عضوية' },
  { id: 2, name: 'اشتراك 3 شهور', price: 1200, type: 'service', category: 'عضوية' },
  { id: 3, name: 'جلسة PT', price: 200, type: 'service', category: 'تدريب' },
  { id: 4, name: 'واي بروتين', price: 2200, type: 'product', category: 'مكملات', image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=200' },
  { id: 5, name: 'مشروب طاقة', price: 45, type: 'product', category: 'مشروبات', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200' },
];

interface ServicePOSProps {
  type: BusinessType;
}

const ServicePOS: React.FC<ServicePOSProps> = ({ type }) => {
  const [activeTab, setActiveTab] = useState<'services' | 'products'>('services');
  const [cart, setCart] = useState<{item: Item, qty: number}[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);

  let items: Item[] = [];
  let themeColor = 'blue';
  
  if (type === 'salon') { items = salonData; themeColor = 'pink'; }
  else if (type === 'clinic') { items = clinicData; themeColor = 'teal'; }
  else if (type === 'gym') { items = gymData; themeColor = 'yellow'; }

  const filteredItems = items.filter(i => 
    i.type === (activeTab === 'services' ? 'service' : 'product') &&
    i.name.includes(searchTerm)
  );

  const addToCart = (item: Item) => {
    setCart(prev => {
      const existing = prev.find(x => x.item.id === item.id);
      if (existing) return prev.map(x => x.item.id === item.id ? {...x, qty: x.qty + 1} : x);
      return [...prev, { item, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(x => {
      if (x.item.id === id) return {...x, qty: Math.max(0, x.qty + delta)};
      return x;
    }).filter(x => x.qty > 0));
  };

  const handleCheckout = (method: string) => {
    if (cart.length === 0) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setCart([]);
      setSelectedCustomer('');
      setIsMobileCartOpen(false);
      setTimeout(() => setIsSuccess(false), 2000);
    }, 1000);
  };

  const total = cart.reduce((sum, x) => sum + (x.item.price * x.qty), 0);
  const itemsCount = cart.reduce((sum, x) => sum + x.qty, 0);

  const CartPanel = () => (
    <div className="flex flex-col h-full">
        <div className="p-5 border-b border-gray-100 bg-gray-50 rounded-t-2xl">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-2 mb-2">
               <User className="w-5 h-5 text-gray-400" />
               <input 
                 type="text" 
                 placeholder="اسم العميل (اختياري)" 
                 className="flex-1 text-sm outline-none"
                 value={selectedCustomer}
                 onChange={e => setSelectedCustomer(e.target.value)}
               />
            </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                  <Tag className="w-12 h-12 mb-3" />
                  <p>السلة فارغة</p>
               </div>
            ) : (
               cart.map(({item, qty}) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                     <div>
                        <h4 className="font-bold text-sm text-gray-800">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.price} ج</p>
                     </div>
                     <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                        <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded bg-white shadow-sm flex items-center justify-center hover:text-red-500"><Minus className="w-3 h-3" /></button>
                        <span className="font-bold text-sm w-4 text-center">{qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded bg-white shadow-sm flex items-center justify-center hover:text-green-500"><Plus className="w-3 h-3" /></button>
                     </div>
                  </div>
               ))
            )}
        </div>

        <div className="p-5 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            <div className="flex justify-between items-center mb-4">
               <span className="text-gray-600 font-bold">الإجمالي</span>
               <span className="text-2xl font-black text-gray-900">{total} <span className="text-sm text-gray-500">ج.م</span></span>
            </div>
            <div className="grid grid-cols-2 gap-3">
               <button 
                 onClick={() => handleCheckout('cash')}
                 disabled={cart.length === 0}
                 className="py-3 bg-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  <Banknote className="w-5 h-5" /> كاش
               </button>
               <button 
                 onClick={() => handleCheckout('card')}
                 disabled={cart.length === 0}
                 className="py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  <CreditCard className="w-5 h-5" /> فيزا
               </button>
            </div>
        </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] gap-6 animate-in fade-in relative">
      
      {/* Success Overlay */}
      {isSuccess && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl animate-in fade-in">
          <div className="bg-white p-8 rounded-3xl shadow-2xl text-center border border-gray-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">تم الدفع بنجاح!</h3>
            <p className="text-gray-500">تم تسجيل الخدمة وإصدار الإيصال.</p>
          </div>
        </div>
      )}

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl animate-in fade-in">
          <div className="text-center">
            <Loader2 className={`w-12 h-12 animate-spin mx-auto mb-4 text-${themeColor}-600`} />
            <h3 className="text-xl font-bold text-gray-800">جاري التنفيذ...</h3>
          </div>
        </div>
      )}

      {/* Catalog */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6 flex flex-col overflow-hidden">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
           <div className="flex p-1 bg-gray-100 rounded-xl w-full md:w-auto">
              <button 
                onClick={() => setActiveTab('services')}
                className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2 ${activeTab === 'services' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
              >
                {type === 'salon' ? <Scissors className="w-4 h-4" /> : type === 'gym' ? <Dumbbell className="w-4 h-4" /> : <Pill className="w-4 h-4" />}
                الخدمات
              </button>
              <button 
                onClick={() => setActiveTab('products')}
                className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2 ${activeTab === 'products' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
              >
                <ShoppingBag className="w-4 h-4" />
                المنتجات
              </button>
           </div>
           <div className="relative w-full md:w-64">
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="بحث..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-gray-400"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
           </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto pr-1 pb-4">
           {filteredItems.map(item => (
             <div 
               key={item.id}
               onClick={() => addToCart(item)}
               className={`cursor-pointer group p-4 rounded-2xl border transition-all hover:shadow-md flex flex-col items-center text-center
                 ${activeTab === 'services' ? 'bg-gray-50 border-gray-100 hover:border-blue-200' : 'bg-white border-gray-200'}
               `}
             >
                {item.image ? (
                  <img src={item.image} className="w-24 h-24 object-cover rounded-xl mb-3 shadow-sm group-hover:scale-105 transition" />
                ) : (
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 text-white font-bold text-xl shadow-sm
                    ${activeTab === 'services' ? `bg-${themeColor}-500` : 'bg-gray-600'}
                  `}>
                    {item.name.charAt(0)}
                  </div>
                )}
                <h4 className="font-bold text-gray-800 text-sm line-clamp-2 mb-1">{item.name}</h4>
                <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                <span className={`font-black ${activeTab === 'services' ? `text-${themeColor}-600` : 'text-gray-900'}`}>
                  {item.price} ج
                </span>
             </div>
           ))}
        </div>
      </div>

      {/* Mobile Cart Button */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
        <button 
          onClick={() => setIsMobileCartOpen(true)}
          className="w-full py-4 rounded-xl shadow-xl flex items-center justify-between px-6 bg-gray-900 text-white"
        >
           <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                 <ShoppingBag className="w-6 h-6" />
              </div>
              <div className="text-right">
                 <p className="font-bold text-sm">{itemsCount} عناصر</p>
                 <p className="text-xs opacity-90">عرض الفاتورة</p>
              </div>
           </div>
           <div className="flex items-center gap-2">
              <span className="font-black text-xl">{total} ج.م</span>
              <ChevronUp className="w-5 h-5" />
           </div>
        </button>
      </div>

      {/* Mobile Cart Overlay */}
      {isMobileCartOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in" onClick={() => setIsMobileCartOpen(false)}>
           <div className="absolute bottom-0 left-0 right-0 h-[85vh] bg-white rounded-t-3xl overflow-hidden animate-in slide-in-from-bottom-10" onClick={e => e.stopPropagation()}>
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-1"></div>
              <CartPanel />
           </div>
        </div>
      )}

      {/* Desktop Cart */}
      <div className="hidden lg:block w-[400px] bg-white rounded-2xl shadow-xl border border-gray-100 h-full">
         <CartPanel />
      </div>
    </div>
  );
};

export default ServicePOS;
