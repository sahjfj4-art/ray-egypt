
import React, { useState, useEffect } from 'react';
import { 
  Phone, MessageSquare, ShoppingBag, ChevronRight, Info, MapPin, Clock
} from 'lucide-react';
import MerchantHero from '../merchant/MerchantHero';
import MerchantOrdering from '../merchant/MerchantOrdering';
import MerchantCart from '../merchant/MerchantCart';
import MerchantBooking from '../merchant/MerchantBooking';
import MerchantShowcase from '../merchant/MerchantShowcase';
import MerchantReviews from '../merchant/MerchantReviews';

interface MerchantProps {
  merchant: any;
  onBack: () => void;
}

const MerchantPublicView: React.FC<MerchantProps> = ({ merchant, onBack }) => {
  // Determine Mode
  const isBooking = ['clinic', 'beauty', 'health', 'gym', 'salon'].includes(merchant.category);
  const isShowcase = ['realestate', 'cars'].includes(merchant.category);
  const isOrdering = ['food', 'shopping', 'services'].includes(merchant.category) || !merchant.category;

  // Set default tab based on mode
  const [activeTab, setActiveTab] = useState(isBooking ? 'main' : isShowcase ? 'showcase' : 'menu');
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  // Ordering State
  const [cart, setCart] = useState<{id: number, name: string, price: number, qty: number, image: string}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);

  // Mock Data
  const staffList = [
    { id: 1, name: 'د. أحمد علي', role: 'استشاري', image: 'https://ui-avatars.com/api/?name=Ahmed+Ali&background=0D8ABC&color=fff' },
    { id: 2, name: 'د. سارة حسن', role: 'أخصائي', image: 'https://ui-avatars.com/api/?name=Sara+Hassan&background=F472B6&color=fff' },
    { id: 3, name: 'د. محمد كريم', role: 'أخصائي', image: 'https://ui-avatars.com/api/?name=Mohamed+Karim&background=10B981&color=fff' },
  ];

  const servicesList = [
    { id: 1, name: 'كشف استشاري', price: 450, duration: '30 دقيقة', desc: 'فحص شامل مع استشاري متخصص' },
    { id: 2, name: 'كشف مستعجل', price: 600, duration: '15 دقيقة', desc: 'أولوية الدخول بدون انتظار' },
    { id: 3, name: 'استشارة متابعة', price: 200, duration: '20 دقيقة', desc: 'للمراجعة خلال أسبوعين' },
    { id: 4, name: 'جلسة علاجية', price: 350, duration: '45 دقيقة', desc: 'جلسة علاج طبيعي أو تأهيل' },
  ];

  const menuItems = [
    { id: 1, name: 'وجبة ميكس جريل', price: 220, category: 'وجبات', desc: '3 قطع كفتة، 2 قطعة كباب، ربع فرخة مشوية، أرز بسمتي', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400', popular: true },
    { id: 2, name: 'ساندوتش برجر كلاسيك', price: 85, category: 'سندوتشات', desc: 'قطعة برجر 200 جرام مع صوص الجبنة والخس', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
    { id: 3, name: 'بيتزا سوبر سوبريم', price: 150, category: 'وجبات', desc: 'سوسيس، بيف، مشروم، فلفل، زيتون', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', popular: true },
    { id: 4, name: 'باستا ألفريدو', price: 110, category: 'وجبات', desc: 'مكرونة بنا مع صوص الكريمة والمشروم والدجاج', img: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=400' },
    { id: 5, name: 'سلطة سيزر', price: 65, category: 'مقبلات', desc: 'خس، دجاج مشوي، توست محمص، صوص سيزر', img: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400' },
    { id: 6, name: 'كولا بارد', price: 25, category: 'مشروبات', desc: '330 مل', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400' },
  ];

  const categories = ['الكل', 'وجبات', 'سندوتشات', 'مقبلات', 'مشروبات'];
  
  const galleryImages = [
    merchant.image,
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
    'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  ];

  const handleShare = () => {
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  // Cart Logic
  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if(existing) return prev.map(i => i.id === item.id ? {...i, qty: i.qty + 1} : i);
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1, image: item.img }];
    });
    // On mobile, we might want to auto-open or show a toast. For now, the floating button appears.
  };

  const updateCartQty = (id: number, delta: number) => {
    setCart(prev => prev.map(i => {
      if(i.id === id) return {...i, qty: Math.max(0, i.qty + delta)};
      return i;
    }).filter(i => i.qty > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleCheckout = () => {
    setIsOrderProcessing(true);
    setTimeout(() => {
      setIsOrderProcessing(false);
      setIsOrderSuccess(true);
      setCart([]);
    }, 2000);
  };

  const handleCall = () => {
    window.location.href = "tel:19999";
  };

  const handleWhatsApp = () => {
    // In a real app, this would be the merchant's number
    window.open("https://wa.me/201000000000", "_blank");
  };

  // Generate Tabs based on type
  const getTabs = () => {
    if (isBooking) return [{ id: 'main', label: 'الحجز' }, { id: 'reviews', label: 'التقييمات' }, { id: 'about', label: 'عن المكان' }];
    if (isShowcase) return [{ id: 'showcase', label: merchant.category === 'realestate' ? 'الوحدات' : 'السيارات' }, { id: 'reviews', label: 'التقييمات' }, { id: 'about', label: 'عن الشركة' }];
    return [{ id: 'menu', label: 'المنيو' }, { id: 'reviews', label: 'التقييمات' }, { id: 'about', label: 'المعلومات' }];
  };

  const tabs = getTabs();

  return (
    <div className="min-h-screen bg-gray-50 pb-20 animate-in fade-in duration-300">
      
      <MerchantHero 
        merchant={merchant} 
        onBack={onBack}
        isFavorite={isFavorite}
        toggleFavorite={() => setIsFavorite(!isFavorite)}
        handleShare={handleShare}
        showShareToast={showShareToast}
      />

      {/* Tabs Navigation */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex max-w-4xl mx-auto overflow-x-auto no-scrollbar px-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[80px] py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap
                ${activeTab === tab.id ? 'border-ray-blue text-ray-blue' : 'border-transparent text-gray-500 hover:text-gray-800'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        {activeTab === 'main' && isBooking && (
           <MerchantBooking staffList={staffList} servicesList={servicesList} />
        )}
        
        {activeTab === 'showcase' && isShowcase && (
           <MerchantShowcase galleryImages={galleryImages} merchantType={merchant.category} />
        )}
        
        {activeTab === 'menu' && isOrdering && (
           <MerchantOrdering categories={categories} menuItems={menuItems} addToCart={addToCart} />
        )}

        {activeTab === 'reviews' && <MerchantReviews />}

        {activeTab === 'about' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Info className="w-5 h-5 text-gray-400" /> عن {merchant.name}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                نحن نسعى دائماً لتقديم أفضل تجربة لعملائنا من خلال جودة لا تضاهى وخدمة متميزة. تأسسنا عام 2015 وهدفنا الأول هو رضاكم.
              </p>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm text-gray-900">العنوان</p>
                    <p className="text-xs text-gray-500">شارع 9، المعادي، القاهرة</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm text-gray-900">ساعات العمل</p>
                    <p className="text-xs text-gray-500">يومياً من 10:00 ص - 12:00 ص</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {isShowcase ? (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3 z-40 shadow-lg md:static md:shadow-none md:border-0 md:bg-transparent md:p-0 md:mt-8 max-w-4xl mx-auto">
          <button onClick={handleCall} className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 flex items-center justify-center gap-2 transition active:scale-95">
            <Phone className="w-5 h-5" /> اتصال
          </button>
          <button onClick={handleWhatsApp} className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-200 flex items-center justify-center gap-2 transition active:scale-95">
            <MessageSquare className="w-5 h-5" /> واتساب
          </button>
        </div>
      ) : isOrdering && cart.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-auto md:w-[600px] md:left-1/2 md:-translate-x-1/2 mx-auto z-50 animate-in slide-in-from-bottom-4 fade-in">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-ray-black text-white p-4 rounded-2xl shadow-2xl flex justify-between items-center hover:bg-gray-900 transition transform hover:-translate-y-1 border border-gray-700 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white text-ray-black rounded-xl flex items-center justify-center font-black border border-gray-200 relative group-hover:scale-110 transition">
                {cart.reduce((a, b) => a + b.qty, 0)}
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center border-2 border-ray-black">!</span>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 font-bold mb-0.5">المجموع</p>
                <p className="font-bold text-xl leading-none text-white">{cartTotal} <span className="text-sm text-ray-gold">ج.م</span></p>
              </div>
            </div>
            <div className="flex items-center gap-2 font-bold text-ray-black bg-ray-gold px-6 py-3 rounded-xl hover:bg-yellow-400 transition">
              عرض السلة <ChevronRight className="w-5 h-5 rtl:rotate-180" />
            </div>
          </button>
        </div>
      )}

      <MerchantCart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        updateCartQty={updateCartQty}
        isOrderProcessing={isOrderProcessing}
        isOrderSuccess={isOrderSuccess}
        onCheckout={handleCheckout}
        onCloseSuccess={() => { setIsOrderSuccess(false); setIsCartOpen(false); }}
      />
    </div>
  );
};

export default MerchantPublicView;
