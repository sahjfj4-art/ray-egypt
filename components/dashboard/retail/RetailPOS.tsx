
import React, { useState, useEffect, useRef } from 'react';
import { BusinessType } from '../config';
import POSProductGrid from '../pos/POSProductGrid';
import POSCartSidebar from '../pos/POSCartSidebar';
import { CheckCircle, Loader2, ShoppingCart, ChevronUp } from 'lucide-react';

const retailProducts = [
  { id: 101, name: 'لبن جهينة 1 لتر', price: 42, barcode: '123456', category: 'ألبان', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200' },
  { id: 102, name: 'شيبسي عائلي', price: 15, barcode: '123457', category: 'سناكس', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200' },
  { id: 103, name: 'أرز الضحى 1ك', price: 35, barcode: '123458', category: 'بقالة', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200' },
  { id: 104, name: 'زيت عباد الشمس', price: 65, barcode: '123459', category: 'بقالة', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200' },
  { id: 105, name: 'شاي العروسة', price: 15, barcode: '123460', category: 'مشروبات', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200' },
  { id: 106, name: 'مكرونة الملكة', price: 12, barcode: '123461', category: 'بقالة', image: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?w=200' },
  { id: 107, name: 'بيبسي 330مل', price: 10, barcode: '123462', category: 'مشروبات', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200' },
  { id: 108, name: 'جبنة فيتا 500جم', price: 75, barcode: '123463', category: 'ألبان', image: 'https://images.unsplash.com/photo-1624806992066-5ffcfcfca548?w=200' },
];

const pharmacyProducts = [
  { id: 201, name: 'Panadol Extra', price: 45, barcode: '200100', category: 'مسكنات', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200' },
  { id: 202, name: 'Augmentin 1g', price: 110, barcode: '200101', category: 'مضادات', image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=200' },
  { id: 203, name: 'Cataflam 50mg', price: 38, barcode: '200102', category: 'مسكنات', image: 'https://images.unsplash.com/photo-1628771065518-0d82f19ca8c2?w=200' },
  { id: 204, name: 'Concor 5mg', price: 55, barcode: '200103', category: 'ضغط', image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=200' },
  { id: 205, name: 'Vitamin C', price: 60, barcode: '200104', category: 'فيتامينات', image: 'https://images.unsplash.com/photo-1616671276445-169d9e382983?w=200' },
  { id: 206, name: 'Omega 3', price: 120, barcode: '200105', category: 'مكملات', image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=200' },
  { id: 207, name: 'Baby Diapers (M)', price: 350, barcode: '200106', category: 'أطفال', image: 'https://images.unsplash.com/photo-1559563362-c667ba5f5480?w=200' },
  { id: 208, name: 'Face Mask Box', price: 50, barcode: '200107', category: 'مستلزمات', image: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=200' },
];

interface RetailPOSProps {
  type?: BusinessType;
}

const RetailPOS: React.FC<RetailPOSProps> = ({ type = 'retail' }) => {
  const [cart, setCart] = useState<{product: any, qty: number}[]>([]);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const barcodeInputRef = useRef<HTMLInputElement>(null);

  const isPharmacy = type === 'pharmacy';
  const products = isPharmacy ? pharmacyProducts : retailProducts;
  const categories = isPharmacy 
    ? ['الكل', 'مسكنات', 'مضادات', 'ضغط', 'فيتامينات', 'مكملات', 'أطفال', 'مستلزمات'] 
    : ['الكل', 'بقالة', 'ألبان', 'سناكس', 'مشروبات', 'منظفات'];

  const themeColor = isPharmacy ? 'teal' : 'blue';
  const themeClasses = {
    bg: isPharmacy ? 'bg-teal-50 dark:bg-teal-900/20' : 'bg-blue-50 dark:bg-blue-900/20',
    border: isPharmacy ? 'border-teal-100 dark:border-teal-800' : 'border-blue-100 dark:border-blue-800',
    text: isPharmacy ? 'text-teal-600 dark:text-teal-400' : 'text-blue-600 dark:text-blue-400',
    btn: isPharmacy ? 'bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600' : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600',
    focus: isPharmacy ? 'focus:border-teal-500' : 'focus:border-blue-500',
    ring: isPharmacy ? 'focus:ring-teal-200 dark:focus:ring-teal-900' : 'focus:ring-blue-200 dark:focus:ring-blue-900'
  };

  useEffect(() => {
    if (barcodeInputRef.current) {
      barcodeInputRef.current.focus();
    }
  }, []);

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(p => p.product.id === product.id);
      if (existing) return prev.map(p => p.product.id === product.id ? {...p, qty: p.qty + 1} : p);
      return [...prev, { product, qty: 1 }];
    });
  };

  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const foundProduct = products.find(p => p.barcode === barcodeInput || p.id.toString() === barcodeInput);
    
    if (foundProduct) {
      addToCart(foundProduct);
      setBarcodeInput('');
    } else {
      alert('المنتج غير موجود');
      setBarcodeInput('');
    }
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(p => {
      if (p.product.id === id) return {...p, qty: Math.max(0, p.qty + delta)};
      return p;
    }).filter(p => p.qty > 0));
  };

  const clearCart = () => {
      if(window.confirm('هل أنت متأكد من إفراغ السلة؟')) {
          setCart([]);
          setIsMobileCartOpen(false);
      }
  };

  const handleCheckout = (method: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setCart([]);
      setIsMobileCartOpen(false);
      setTimeout(() => setIsSuccess(false), 2000);
    }, 1000);
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  const tax = subtotal * 0.14; // 14% VAT
  const total = subtotal + tax;
  const itemsCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] gap-6 animate-in fade-in relative">
      
      {/* Success Overlay */}
      {isSuccess && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-2xl animate-in fade-in">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl text-center border border-gray-100 dark:border-gray-700">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">تمت العملية بنجاح!</h3>
            <p className="text-gray-500 dark:text-gray-400">تم تسجيل البيع وإصدار الفاتورة.</p>
          </div>
        </div>
      )}

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-2xl animate-in fade-in">
          <div className="text-center">
            <Loader2 className={`w-12 h-12 animate-spin mx-auto mb-4 ${themeClasses.text}`} />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">جاري التنفيذ...</h3>
          </div>
        </div>
      )}

      <POSProductGrid 
        products={products}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        barcodeInput={barcodeInput}
        setBarcodeInput={setBarcodeInput}
        onBarcodeSubmit={handleBarcodeSubmit}
        addToCart={addToCart}
        isPharmacy={isPharmacy}
        themeClasses={themeClasses}
        themeColor={themeColor}
        barcodeInputRef={barcodeInputRef}
      />

      {/* Mobile Cart Floating Button */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
        <button 
          onClick={() => setIsMobileCartOpen(true)}
          className={`w-full py-4 rounded-xl shadow-xl flex items-center justify-between px-6 ${themeClasses.btn} text-white`}
        >
           <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                 <ShoppingCart className="w-6 h-6" />
              </div>
              <div className="text-right">
                 <p className="font-bold text-sm">{itemsCount} عناصر</p>
                 <p className="text-xs opacity-90">عرض الفاتورة</p>
              </div>
           </div>
           <div className="flex items-center gap-2">
              <span className="font-black text-xl">{total.toFixed(0)} ج.م</span>
              <ChevronUp className="w-5 h-5" />
           </div>
        </button>
      </div>

      {/* Mobile Cart Overlay */}
      {isMobileCartOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in" onClick={() => setIsMobileCartOpen(false)}>
           <div className="absolute bottom-0 left-0 right-0 h-[85vh] bg-white dark:bg-gray-900 rounded-t-3xl overflow-hidden animate-in slide-in-from-bottom-10" onClick={e => e.stopPropagation()}>
              <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mt-3 mb-1"></div>
              <POSCartSidebar 
                cart={cart}
                updateQty={updateQty}
                clearCart={clearCart}
                subtotal={subtotal}
                tax={tax}
                total={total}
                isPharmacy={isPharmacy}
                themeClasses={themeClasses}
                onCheckout={handleCheckout}
              />
           </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full">
        <POSCartSidebar 
          cart={cart}
          updateQty={updateQty}
          clearCart={clearCart}
          subtotal={subtotal}
          tax={tax}
          total={total}
          isPharmacy={isPharmacy}
          themeClasses={themeClasses}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
};

export default RetailPOS;
