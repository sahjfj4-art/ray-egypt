
import React, { useState } from 'react';
import { ShoppingBag, Trash2, Plus, Minus, ChevronLeft, ShieldCheck, Store } from 'lucide-react';

interface CartViewProps {
  onNavigate?: (view: string) => void;
}

const CartView: React.FC<CartViewProps> = ({ onNavigate }) => {
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
                  <p className="text-sm text-gray-500 flex items-center gap-1 font-medium"><Store className="w-3 h-3" /> {item.shop}</p>
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
            <button 
              onClick={() => onNavigate && onNavigate('checkout')}
              className="w-full bg-ray-gold text-ray-black py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-yellow-400 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
            >
              إتمام الشراء
              <ChevronLeft className="w-5 h-5" />
            </button>
            <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1 font-medium">
              <ShieldCheck className="w-3 h-3" /> مدفوعات آمنة ومحمية
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;
