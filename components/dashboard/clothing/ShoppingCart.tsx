
import React from 'react';
import { ShoppingBag, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { ClothingItem } from './ProductGrid';

export interface CartItem {
  product: ClothingItem;
  size: string;
  color: string;
  qty: number;
  uniqueId: string; // combination of id+size+color
}

interface Props {
  cart: CartItem[];
  updateQty: (uniqueId: string, delta: number) => void;
  removeFromCart: (uniqueId: string) => void;
  onCheckout: () => void;
}

const ShoppingCart: React.FC<Props> = ({ cart, updateQty, removeFromCart, onCheckout }) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  const tax = subtotal * 0.14;
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col h-full overflow-hidden">
      <div className="p-5 bg-gray-900 text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-pink-500" />
          <h2 className="font-bold text-lg">سلة المشتريات</h2>
        </div>
        <span className="bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {cart.reduce((acc, item) => acc + item.qty, 0)} قطع
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
            <ShoppingBag className="w-16 h-16 mb-4" />
            <p>السلة فارغة</p>
            <p className="text-xs mt-1">أضف منتجات من المعرض</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map(item => (
              <div key={item.uniqueId} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-start gap-3 animate-in slide-in-from-right-2">
                <img src={item.product.image} alt={item.product.name} className="w-14 h-16 rounded-lg object-cover bg-gray-100" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-gray-800 truncate">{item.product.name}</h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <span className="bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">{item.size}</span>
                    <span className="w-3 h-3 rounded-full border border-gray-200" style={{ backgroundColor: item.color }}></span>
                  </div>
                  <p className="text-pink-600 font-bold text-sm mt-1">{item.product.price * item.qty} ج</p>
                </div>
                <div className="flex flex-col items-end justify-between self-stretch">
                  <button 
                    onClick={() => removeFromCart(item.uniqueId)}
                    className="text-gray-300 hover:text-red-500 transition p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
                    <button onClick={() => updateQty(item.uniqueId, -1)} className="w-5 h-5 flex items-center justify-center hover:bg-white rounded transition"><Minus className="w-3 h-3" /></button>
                    <span className="w-4 text-center text-xs font-bold">{item.qty}</span>
                    <button onClick={() => updateQty(item.uniqueId, 1)} className="w-5 h-5 flex items-center justify-center hover:bg-white rounded transition"><Plus className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-5 bg-white border-t border-gray-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-10">
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>المجموع الفرعي</span>
            <span>{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>الضريبة (14%)</span>
            <span>{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-black text-gray-900 pt-2 border-t border-dashed border-gray-200">
            <span>الإجمالي</span>
            <span>{total.toFixed(2)} ج.م</span>
          </div>
        </div>
        
        <button 
          onClick={onCheckout}
          disabled={cart.length === 0}
          className="w-full py-3 bg-pink-600 text-white rounded-xl font-bold hover:bg-pink-700 transition shadow-lg shadow-pink-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CreditCard className="w-5 h-5" />
          إتمام الدفع
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
