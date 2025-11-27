
import React, { useState } from 'react';
import { 
  MapPin, Package, CreditCard, Settings, LogOut, Wallet, 
  ChevronLeft, Plus
} from 'lucide-react';
import WalletView from './WalletView';
import PaymentMethodsView from './PaymentMethodsView';
import UserSettingsView from './UserSettingsView';
import AddressForm from './AddressForm';

interface Props {
  onNavigate?: (view: string, params?: any) => void;
}

const UserProfileView: React.FC<Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('orders');
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);

  const handleLogout = () => {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        window.location.reload();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 text-center mb-6 transition-colors">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full mx-auto mb-4 overflow-hidden border-4 border-white dark:border-gray-600 shadow-lg ring-2 ring-ray-gold/20">
              <img src="https://ui-avatars.com/api/?name=Ahmed+Ali&background=FDB813&color=1A1A1A" alt="User" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-black text-ray-black dark:text-white">أحمد علي</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">عميل مميز (VIP)</p>
            <div 
              onClick={() => setActiveTab('wallet')}
              className="mt-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 flex items-center justify-between border border-blue-100 dark:border-blue-800 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/50 transition"
            >
               <div className="flex items-center gap-2 text-ray-blue dark:text-blue-400">
                 <Wallet className="w-5 h-5" />
                 <span className="text-sm font-bold">المحفظة</span>
               </div>
               <span className="text-xl font-black text-ray-blue dark:text-blue-300">450 ج.م</span>
            </div>
          </div>

          <nav className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
            {[
              { id: 'orders', label: 'طلباتي', icon: Package },
              { id: 'wallet', label: 'المحفظة', icon: Wallet },
              { id: 'addresses', label: 'العناوين', icon: MapPin },
              { id: 'payment', label: 'طرق الدفع', icon: CreditCard },
              { id: 'settings', label: 'إعدادات الحساب', icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsAddressFormOpen(false); }}
                className={`w-full flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-700 transition-colors ${
                  activeTab === item.id 
                    ? 'bg-ray-blue dark:bg-ray-gold text-white dark:text-black font-bold' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-ray-blue dark:hover:text-ray-gold'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-ray-gold dark:text-black' : ''}`} />
                  <span>{item.label}</span>
                </div>
                <ChevronLeft className={`w-4 h-4 ${activeTab === item.id ? 'text-white dark:text-black' : 'opacity-50'}`} />
              </button>
            ))}
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-4 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-bold"
            >
              <LogOut className="w-5 h-5" />
              <span>تسجيل الخروج</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-2xl font-bold text-ray-black dark:text-white mb-4">الطلبات الحالية والسابقة</h3>
              {[
                { id: '#ORD-9921', shop: 'مطعم النور', items: '2 برجر، 1 بطاطس', date: 'اليوم 2:30 م', total: '280 ج', status: 'active', step: 'جاري التوصيل' },
                { id: '#ORD-8810', shop: 'سوبر ماركت خير زمان', items: 'منتجات بقالة متنوعة', date: 'أمس', total: '1,250 ج', status: 'completed', step: 'تم التوصيل' },
                { id: '#ORD-7750', shop: 'ZARA', items: 'قميص، بنطلون', date: '20 نوفمبر', total: '3,400 ج', status: 'completed', step: 'تم التوصيل' },
              ].map((order) => (
                <div key={order.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition hover:shadow-md">
                   <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-lg text-ray-black dark:text-white">{order.shop}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'active' ? 'bg-blue-100 text-ray-blue dark:bg-blue-900/50 dark:text-blue-300' : 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'}`}>
                          {order.step}
                        </span>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{order.items}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{order.date} • {order.id}</p>
                   </div>
                   <div className="text-left">
                      <p className="text-xl font-black text-ray-black dark:text-white mb-2">{order.total}</p>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => onNavigate && onNavigate('order-tracking', { id: order.id })}
                          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                        >
                          تفاصيل
                        </button>
                        {order.status === 'completed' && 
                          <button className="px-4 py-2 bg-ray-blue text-white rounded-lg text-sm font-bold hover:bg-blue-800 transition shadow-sm">إعادة طلب</button>
                        }
                      </div>
                   </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'wallet' && <WalletView />}
          {activeTab === 'payment' && <PaymentMethodsView />}
          {activeTab === 'settings' && <UserSettingsView />}
          
          {activeTab === 'addresses' && (
             isAddressFormOpen ? (
                <AddressForm 
                  onSave={() => setIsAddressFormOpen(false)} 
                  onCancel={() => setIsAddressFormOpen(false)} 
                />
             ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
                  <div className="border-2 border-ray-blue dark:border-ray-gold bg-blue-50 dark:bg-gray-800 rounded-2xl p-6 relative shadow-sm">
                     <div className="absolute top-4 left-4 bg-ray-blue dark:bg-ray-gold text-white dark:text-black text-xs font-bold px-2 py-1 rounded">الافتراضي</div>
                     <h4 className="font-bold text-ray-black dark:text-white flex items-center gap-2 mb-2"><MapPin className="w-5 h-5 text-ray-gold" /> المنزل</h4>
                     <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 font-medium">شارع 9، المعادي، القاهرة<br/>الدور الثالث، شقة 5</p>
                     <div className="flex gap-3">
                        <button className="text-sm font-bold text-ray-blue dark:text-ray-gold hover:underline">تعديل</button>
                        <button className="text-sm font-bold text-red-600 dark:text-red-400 hover:underline">حذف</button>
                     </div>
                  </div>
                  <button 
                    onClick={() => setIsAddressFormOpen(true)}
                    className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-ray-gold hover:text-ray-gold transition h-full min-h-[180px] group"
                  >
                     <Plus className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                     <span className="font-bold">إضافة عنوان جديد</span>
                  </button>
                </div>
             )
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;
