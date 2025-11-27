
import React, { useState } from 'react';
import { 
  User, MapPin, Package, CreditCard, Settings, LogOut, Wallet, 
  ChevronLeft, Star, Trash2, Plus, Minus, ShoppingBag, Heart, 
  Bell, CheckCircle, AlertCircle, Car, Home, Utensils, ArrowRight
} from 'lucide-react';

interface ViewProps {
  onNavigate?: (view: string, params?: any) => void;
}

// --- 1. User Profile View ---
export const UserProfileView: React.FC<ViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center mb-6">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 overflow-hidden border-4 border-white shadow-lg ring-2 ring-ray-gold/20">
              <img src="https://ui-avatars.com/api/?name=Ahmed+Ali&background=FDB813&color=1A1A1A" alt="User" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-black text-ray-black">أحمد علي</h2>
            <p className="text-gray-500 text-sm font-medium">عميل مميز (VIP)</p>
            <div className="mt-6 bg-blue-50 rounded-xl p-4 flex items-center justify-between border border-blue-100">
               <div className="flex items-center gap-2 text-ray-blue">
                 <Wallet className="w-5 h-5" />
                 <span className="text-sm font-bold">المحفظة</span>
               </div>
               <span className="text-xl font-black text-ray-blue">450 ج.م</span>
            </div>
          </div>

          <nav className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {[
              { id: 'orders', label: 'طلباتي', icon: Package },
              { id: 'addresses', label: 'العناوين', icon: MapPin },
              { id: 'payment', label: 'طرق الدفع', icon: CreditCard },
              { id: 'settings', label: 'إعدادات الحساب', icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-4 border-b border-gray-50 transition-colors ${
                  activeTab === item.id 
                    ? 'bg-ray-blue text-white font-bold' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-ray-blue'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-ray-gold' : ''}`} />
                  <span>{item.label}</span>
                </div>
                <ChevronLeft className={`w-4 h-4 ${activeTab === item.id ? 'text-white' : 'opacity-50'}`} />
              </button>
            ))}
            <button className="w-full flex items-center gap-3 p-4 text-red-500 hover:bg-red-50 transition-colors font-bold">
              <LogOut className="w-5 h-5" />
              <span>تسجيل الخروج</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-ray-black mb-4">الطلبات الحالية والسابقة</h3>
              {[
                { id: '#ORD-9921', shop: 'مطعم النور', items: '2 برجر، 1 بطاطس', date: 'اليوم 2:30 م', total: '280 ج', status: 'active', step: 'جاري التوصيل' },
                { id: '#ORD-8810', shop: 'سوبر ماركت خير زمان', items: 'منتجات بقالة متنوعة', date: 'أمس', total: '1,250 ج', status: 'completed', step: 'تم التوصيل' },
                { id: '#ORD-7750', shop: 'ZARA', items: 'قميص، بنطلون', date: '20 نوفمبر', total: '3,400 ج', status: 'completed', step: 'تم التوصيل' },
              ].map((order) => (
                <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition hover:shadow-md">
                   <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-lg text-ray-black">{order.shop}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'active' ? 'bg-blue-100 text-ray-blue' : 'bg-green-100 text-green-700'}`}>
                          {order.step}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm mb-1">{order.items}</p>
                      <p className="text-xs text-gray-400">{order.date} • {order.id}</p>
                   </div>
                   <div className="text-left">
                      <p className="text-xl font-black text-ray-black mb-2">{order.total}</p>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => onNavigate && onNavigate('order-tracking', { id: order.id })}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-200 transition"
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
          
          {activeTab === 'addresses' && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-ray-blue bg-blue-50 rounded-2xl p-6 relative shadow-sm">
                   <div className="absolute top-4 left-4 bg-ray-blue text-white text-xs font-bold px-2 py-1 rounded">الافتراضي</div>
                   <h4 className="font-bold text-ray-black flex items-center gap-2 mb-2"><MapPin className="w-5 h-5 text-ray-gold" /> المنزل</h4>
                   <p className="text-gray-600 text-sm leading-relaxed mb-4 font-medium">شارع 9، المعادي، القاهرة<br/>الدور الثالث، شقة 5</p>
                   <div className="flex gap-3">
                      <button className="text-sm font-bold text-ray-blue hover:underline">تعديل</button>
                      <button className="text-sm font-bold text-red-600 hover:underline">حذف</button>
                   </div>
                </div>
                <button className="border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-ray-gold hover:text-ray-gold transition h-full min-h-[180px] group">
                   <Plus className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                   <span className="font-bold">إضافة عنوان جديد</span>
                </button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- 2. Cart View ---
export const CartView: React.FC<ViewProps> = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'برجر كلاسيك', price: 120, qty: 2, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200', shop: 'مطعم النور' },
    { id: 2, name: 'بيتزا مارجريتا', price: 150, qty: 1, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200', shop: 'مطعم النور' },
    { id: 3, name: 'تيشيرت قطن أبيض', price: 350, qty: 1, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200', shop: 'H&M' },
  ]);

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shipping = 25;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-ray-black mb-2">سلة المشتريات فارغة</h2>
        <p className="text-gray-500 mb-8 font-medium">لم تقم بإضافة أي منتجات للسلة بعد.</p>
        <button className="bg-ray-gold text-ray-black px-8 py-3 rounded-xl font-bold hover:scale-105 transition shadow-lg shadow-yellow-200">تصفح العروض</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4">
      <h2 className="text-3xl font-black text-ray-black mb-8 flex items-center gap-3">
        <ShoppingBag className="w-8 h-8 text-ray-blue" />
        سلة المشتريات <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">3 منتجات</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4 hover:shadow-md transition">
              <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-ray-black text-lg">{item.name}</h3>
                    <button onClick={() => setItems(prev => prev.filter(i => i.id !== item.id))} className="text-gray-400 hover:text-red-500 transition">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-1 font-medium"><StoreIcon className="w-3 h-3" /> {item.shop}</p>
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                    <button onClick={() => setItems(prev => prev.map(i => i.id === item.id ? {...i, qty: Math.max(1, i.qty-1)} : i))} className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm hover:text-ray-blue transition"><Minus className="w-3 h-3" /></button>
                    <span className="font-bold text-sm w-4 text-center text-ray-black">{item.qty}</span>
                    <button onClick={() => setItems(prev => prev.map(i => i.id === item.id ? {...i, qty: i.qty+1} : i))} className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm hover:text-ray-blue transition"><Plus className="w-3 h-3" /></button>
                  </div>
                  <p className="font-black text-lg text-ray-blue">{item.price * item.qty} ج.م</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg sticky top-24">
            <h3 className="font-bold text-lg mb-4 text-ray-black">ملخص الطلب</h3>
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
              <div className="flex justify-between text-gray-600 font-medium">
                <span>المجموع الفرعي</span>
                <span>{subtotal} ج.م</span>
              </div>
              <div className="flex justify-between text-gray-600 font-medium">
                <span>مصاريف التوصيل</span>
                <span>{shipping} ج.م</span>
              </div>
              <div className="flex justify-between text-green-600 text-sm font-bold">
                <span>خصم (RAY10)</span>
                <span>-0 ج.م</span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="font-black text-xl text-ray-black">الإجمالي</span>
              <span className="font-black text-2xl text-ray-blue">{total} ج.م</span>
            </div>
            <button className="w-full bg-ray-gold text-ray-black py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-yellow-400 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
              إتمام الشراء
              <ChevronLeft className="w-5 h-5" />
            </button>
            <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1 font-medium">
              <ShieldCheckIcon className="w-3 h-3" /> مدفوعات آمنة ومحمية
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. Favorites View ---
export const FavoritesView: React.FC<ViewProps> = () => {
  const items = [
    { id: 1, type: 'food', name: 'مطعم النور', location: 'المعادي', rating: 4.8, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400' },
    { id: 2, type: 'car', name: 'Mercedes C180', location: 'أوتو ستار', rating: 'جديد', image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400' },
    { id: 3, type: 'realestate', name: 'فيلا بالتجمع', location: 'حي اللوتس', rating: 'للبيع', image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400' },
    { id: 4, type: 'product', name: 'ساعة Apple Watch', location: 'بي تك', rating: 4.9, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4">
      <h2 className="text-3xl font-black text-ray-black mb-8 flex items-center gap-2">
        <Heart className="w-8 h-8 text-red-500 fill-current" />
        المفضلة
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="h-48 relative">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <button className="absolute top-3 right-3 p-2 bg-white rounded-full text-red-500 hover:bg-red-50 transition shadow-sm">
                <Trash2 className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1 font-bold">
                {item.type === 'food' ? <Utensils className="w-3 h-3" /> : item.type === 'car' ? <Car className="w-3 h-3" /> : item.type === 'realestate' ? <Home className="w-3 h-3" /> : <Package className="w-3 h-3" />}
                {item.type === 'food' ? 'مطعم' : item.type === 'car' ? 'سيارة' : item.type === 'realestate' ? 'عقار' : 'منتج'}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-ray-black mb-1 text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 mb-3 font-medium">
                <MapPin className="w-3 h-3" /> {item.location}
              </p>
              <button className="w-full py-2 bg-gray-50 text-gray-700 rounded-lg font-bold text-sm hover:bg-ray-blue hover:text-white transition">
                عرض التفاصيل
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 4. Notifications View ---
export const NotificationsView: React.FC<ViewProps> = () => {
  const notifications = [
    { id: 1, type: 'order', title: 'تم استلام طلبك بنجاح', desc: 'جاري تحضير طلبك من مطعم النور. الوقت المتوقع 30 دقيقة.', time: 'منذ 5 دقائق', unread: true },
    { id: 2, type: 'promo', title: 'خصم 50% على الكاجوال!', desc: 'استخدم كود RAY50 واحصل على خصم فوري على جميع الملابس.', time: 'منذ ساعتين', unread: true },
    { id: 3, type: 'system', title: 'تحديث سياسة الخصوصية', desc: 'قمنا بتحديث سياسة الخصوصية وشروط الاستخدام.', time: 'أمس', unread: false },
    { id: 4, type: 'order', title: 'تم توصيل الطلب #8810', desc: 'نتمنى أن تكون تجربتك معنا مميزة. قيم تجربتك الآن.', time: 'أمس', unread: false },
  ];

  const getIcon = (type: string) => {
    switch(type) {
      case 'order': return <Package className="w-6 h-6 text-ray-blue" />;
      case 'promo': return <Star className="w-6 h-6 text-ray-gold" />;
      case 'system': return <AlertCircle className="w-6 h-6 text-gray-600" />;
      default: return <Bell className="w-6 h-6 text-gray-600" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-ray-black flex items-center gap-2">
          <Bell className="w-8 h-8 text-ray-blue" />
          الإشعارات
        </h2>
        <button className="text-sm font-bold text-ray-blue hover:underline">تحديد الكل كمقروء</button>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <div key={notif.id} className={`flex gap-4 p-5 rounded-2xl border transition-all cursor-pointer hover:shadow-md ${notif.unread ? 'bg-blue-50/50 border-blue-100' : 'bg-white border-gray-100'}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${notif.unread ? 'bg-white shadow-sm' : 'bg-gray-100'}`}>
              {getIcon(notif.type)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className={`text-lg ${notif.unread ? 'font-black text-ray-black' : 'font-bold text-gray-700'}`}>{notif.title}</h4>
                <span className="text-xs font-bold text-gray-400">{notif.time}</span>
              </div>
              <p className="text-gray-600 leading-relaxed font-medium">{notif.desc}</p>
            </div>
            {notif.unread && <div className="w-3 h-3 bg-ray-blue rounded-full mt-2"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper Icons
const StoreIcon = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg>;
const ShieldCheckIcon = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>;
