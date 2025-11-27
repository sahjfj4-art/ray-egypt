
import React, { useState } from 'react';
import { 
  Search, Plus, Filter, Edit2, Trash2, AlertTriangle, 
  Image as ImageIcon, Check, MoreVertical, Box, ClipboardList, Save, X,
  TrendingDown, ShoppingCart, ArrowRight, History, ArrowUp, ArrowDown
} from 'lucide-react';
import ProductForm from './ProductForm';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  image: string;
  sku: string;
  status: 'active' | 'inactive';
  dailySales?: number; // Simulated for smart reorder
}

interface StockLog {
  id: string;
  product: string;
  type: 'in' | 'out' | 'adjustment';
  qty: number;
  date: string;
  user: string;
  note?: string;
}

const initialProducts: Product[] = [
  { id: 'P1', name: 'تيشيرت قطن بيزيك', category: 'ملابس رجالي', price: 250, stock: 45, minStock: 10, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200', sku: 'SH-001', status: 'active', dailySales: 5 },
  { id: 'P2', name: 'بنطلون جينز سليم', category: 'بنطلونات', price: 550, stock: 8, minStock: 15, image: 'https://images.unsplash.com/photo-1542272617-08f086302542?w=200', sku: 'JN-202', status: 'active', dailySales: 3 },
  { id: 'P3', name: 'حذاء رياضي', category: 'أحذية', price: 850, stock: 12, minStock: 5, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200', sku: 'SH-909', status: 'active', dailySales: 2 },
  { id: 'P4', name: 'جاكيت شتوي', category: 'ملابس شتوي', price: 1200, stock: 0, minStock: 5, image: 'https://images.unsplash.com/photo-1551028919-33f54764fa5d?w=200', sku: 'JK-101', status: 'inactive', dailySales: 1 },
];

const stockHistory: StockLog[] = [
  { id: 'L1', product: 'تيشيرت قطن بيزيك', type: 'out', qty: 2, date: '2025-11-22 10:30', user: 'سارة علي', note: 'بيع فاتورة #1020' },
  { id: 'L2', product: 'بنطلون جينز', type: 'in', qty: 20, date: '2025-11-21 09:00', user: 'أحمد محمد', note: 'توريد مخزن' },
  { id: 'L3', product: 'حذاء رياضي', type: 'adjustment', qty: -1, date: '2025-11-20 14:00', user: 'أحمد محمد', note: 'تالف' },
];

const ProductManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'reorder' | 'history'>('all');
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  
  // Stocktake State
  const [isStocktakeMode, setIsStocktakeMode] = useState(false);
  const [stockAdjustments, setStockAdjustments] = useState<Record<string, number>>({});

  // Filter to show only 'Jeans' (جينز)
  const filteredProducts = products.filter(p => 
    p.name?.includes('جينز') && (
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.sku?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Smart Reorder Logic
  const reorderItems = products.filter(p => p.stock <= p.minStock).map(p => ({
      ...p,
      daysLeft: p.dailySales ? Math.floor(p.stock / p.dailySales) : 0,
      suggestedOrder: p.minStock * 2 - p.stock // Simple formula
  }));

  const handleAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleSave = (productData: any) => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p));
    } else {
      const newProduct = {
        id: `P-${Date.now()}`,
        ...productData,
        image: productData.image || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200',
        dailySales: 0
      };
      setProducts([newProduct, ...products]);
    }
    setIsFormOpen(false);
  };

  const toggleStocktake = () => {
    if (isStocktakeMode) {
        setStockAdjustments({});
        setIsStocktakeMode(false);
    } else {
        const initial: Record<string, number> = {};
        products.forEach(p => initial[p.id] = p.stock);
        setStockAdjustments(initial);
        setIsStocktakeMode(true);
    }
  };

  const saveStocktake = () => {
      setProducts(prev => prev.map(p => ({
          ...p,
          stock: stockAdjustments[p.id] !== undefined ? stockAdjustments[p.id] : p.stock
      })));
      setIsStocktakeMode(false);
      setStockAdjustments({});
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Box className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            {isStocktakeMode ? 'عملية جرد المخزون' : 'إدارة المنتجات والمخزون'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{isStocktakeMode ? 'قم بإدخال الكميات الفعلية للمطابقة' : 'إضافة وتعديل ومتابعة حركة الأصناف'}</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto items-stretch xl:items-center">
           {!isStocktakeMode && (
             <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-xl overflow-x-auto">
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap ${activeTab === 'all' ? 'bg-white dark:bg-gray-600 text-blue-700 dark:text-blue-300 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}`}
                >
                  الكل
                </button>
                <button 
                  onClick={() => setActiveTab('reorder')}
                  className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${activeTab === 'reorder' ? 'bg-white dark:bg-gray-600 text-orange-600 dark:text-orange-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}`}
                >
                  <TrendingDown className="w-4 h-4" />
                  إعادة الطلب
                  {reorderItems.length > 0 && <span className="bg-red-500 text-white text-[10px] px-1.5 rounded-full">{reorderItems.length}</span>}
                </button>
                <button 
                  onClick={() => setActiveTab('history')}
                  className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${activeTab === 'history' ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}`}
                >
                  <History className="w-4 h-4" />
                  السجل
                </button>
             </div>
           )}
           
           {!isStocktakeMode && activeTab === 'all' && (
             <div className="relative flex-1 md:w-64">
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="بحث..." 
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-blue-500 dark:text-white"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
               />
             </div>
           )}
           
           {isStocktakeMode ? (
             <div className="flex gap-2">
                <button onClick={toggleStocktake} className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition">إلغاء</button>
                <button onClick={saveStocktake} className="flex-1 bg-green-600 text-white px-6 py-2 rounded-xl font-bold shadow-md flex items-center justify-center gap-2 hover:bg-green-700 transition">
                    <Save className="w-4 h-4" /> اعتماد الجرد
                </button>
             </div>
           ) : (
             activeTab === 'all' && (
               <div className="flex gap-2">
                 <button onClick={toggleStocktake} className="bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800 px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition whitespace-nowrap flex-1 justify-center md:flex-none">
                    <ClipboardList className="w-4 h-4" /> جرد
                 </button>
                 <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold shadow-md flex items-center gap-2 hover:bg-blue-700 transition whitespace-nowrap flex-1 justify-center md:flex-none">
                    <Plus className="w-4 h-4" /> منتج جديد
                 </button>
               </div>
             )
           )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-4">
        {activeTab === 'reorder' ? (
            <div className="space-y-6">
                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 rounded-2xl p-6 flex items-center gap-4">
                    <div className="p-3 bg-white dark:bg-orange-800 rounded-full text-orange-600 dark:text-orange-200 shadow-sm"><AlertTriangle className="w-8 h-8" /></div>
                    <div>
                        <h3 className="text-lg font-bold text-orange-900 dark:text-orange-100">تحليل المخزون الذكي</h3>
                        <p className="text-sm text-orange-800 dark:text-orange-200">يوجد {reorderItems.length} أصناف وصلت لحد الطلب. النظام يقترح الكميات بناءً على معدل البيع اليومي.</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 text-xs font-bold">
                                <tr>
                                    <th className="p-4 whitespace-nowrap">المنتج</th>
                                    <th className="p-4 whitespace-nowrap">الرصيد الحالي</th>
                                    <th className="p-4 whitespace-nowrap">معدل البيع</th>
                                    <th className="p-4 whitespace-nowrap">المدة المتبقية</th>
                                    <th className="p-4 whitespace-nowrap">اقتراح الطلب</th>
                                    <th className="p-4 whitespace-nowrap">إجراء</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
                                {reorderItems.map(item => (
                                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="p-4 font-bold text-gray-800 dark:text-white flex items-center gap-3 min-w-[200px]">
                                            <img src={item.image} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                                            {item.name}
                                        </td>
                                        <td className="p-4 text-red-600 font-bold">{item.stock}</td>
                                        <td className="p-4 dark:text-gray-300">{item.dailySales} / يوم</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${item.daysLeft <= 2 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {item.daysLeft === 0 ? 'نفذت' : `${item.daysLeft} أيام`}
                                            </span>
                                        </td>
                                        <td className="p-4 font-bold text-blue-600 dark:text-blue-400">+{item.suggestedOrder}</td>
                                        <td className="p-4">
                                            <button className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-1">
                                                <ShoppingCart className="w-3 h-3" /> إضافة للطلبية
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {reorderItems.length === 0 && (
                        <div className="p-12 text-center text-gray-400">
                            <Check className="w-12 h-12 mx-auto mb-2 text-green-500" />
                            <p className="text-green-600 font-bold">المخزون في حالة جيدة!</p>
                        </div>
                    )}
                </div>
            </div>
        ) : activeTab === 'history' ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right">
                        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 text-xs font-bold">
                            <tr>
                                <th className="p-4 whitespace-nowrap">المنتج</th>
                                <th className="p-4 whitespace-nowrap">نوع الحركة</th>
                                <th className="p-4 whitespace-nowrap">الكمية</th>
                                <th className="p-4 whitespace-nowrap">التاريخ</th>
                                <th className="p-4 whitespace-nowrap">المستخدم</th>
                                <th className="p-4 whitespace-nowrap">ملاحظات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
                            {stockHistory.map(log => (
                                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="p-4 font-bold text-gray-800 dark:text-white min-w-[150px]">{log.product}</td>
                                    <td className="p-4">
                                        <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded w-fit
                                            ${log.type === 'in' ? 'bg-green-100 text-green-700' : 
                                            log.type === 'out' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}
                                        `}>
                                            {log.type === 'in' ? <ArrowUp className="w-3 h-3" /> : log.type === 'out' ? <ArrowDown className="w-3 h-3" /> : <Edit2 className="w-3 h-3" />}
                                            {log.type === 'in' ? 'وارد' : log.type === 'out' ? 'صادر' : 'تسويه'}
                                        </span>
                                    </td>
                                    <td className="p-4 font-mono font-bold dark:text-gray-200">{log.qty > 0 ? `+${log.qty}` : log.qty}</td>
                                    <td className="p-4 text-gray-500 dark:text-gray-400 dir-ltr text-right whitespace-nowrap">{log.date}</td>
                                    <td className="p-4 text-gray-700 dark:text-gray-300">{log.user}</td>
                                    <td className="p-4 text-gray-500 dark:text-gray-400 text-xs">{log.note}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        ) : isStocktakeMode ? (
            // Stocktake Grid
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-right">
                        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 text-sm font-bold border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="p-4 whitespace-nowrap">المنتج</th>
                                <th className="p-4 whitespace-nowrap">الرصيد الحالي (النظام)</th>
                                <th className="p-4 w-40 whitespace-nowrap">العد الفعلي</th>
                                <th className="p-4 whitespace-nowrap">الفرق</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {products.map(product => {
                                const actual = stockAdjustments[product.id] ?? product.stock;
                                const diff = actual - product.stock;
                                return (
                                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="p-4 font-bold text-gray-800 dark:text-white min-w-[150px]">{product.name}</td>
                                        <td className="p-4 text-gray-600 dark:text-gray-300">{product.stock}</td>
                                        <td className="p-4">
                                            <input 
                                                type="number" 
                                                className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg p-2 font-bold text-center focus:border-blue-500 outline-none dark:text-white"
                                                value={actual}
                                                onChange={(e) => setStockAdjustments({...stockAdjustments, [product.id]: Number(e.target.value)})}
                                            />
                                        </td>
                                        <td className={`p-4 font-bold ${diff < 0 ? 'text-red-500' : diff > 0 ? 'text-green-500' : 'text-gray-400'}`}>
                                            {diff > 0 ? `+${diff}` : diff}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        ) : (
            // Standard Grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
                <div key={product.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition overflow-hidden group relative">
                    <div className="aspect-square bg-gray-50 dark:bg-gray-700 relative">
                        <img src={product.image} className="w-full h-full object-cover" />
                        <div className="absolute top-3 right-3 flex gap-2">
                            {product.stock <= product.minStock && (
                                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                {product.stock === 0 ? 'نفد المخزون' : 'مخزون منخفض'}
                                </span>
                            )}
                        </div>
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition backdrop-blur-[2px]">
                            <button onClick={() => handleEdit(product)} className="bg-white p-2 rounded-full hover:text-blue-600 transition"><Edit2 className="w-4 h-4" /></button>
                            <button className="bg-white p-2 rounded-full hover:text-red-600 transition"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </div>
                    
                    <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-bold text-gray-800 dark:text-white line-clamp-1" title={product.name}>{product.name}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><MoreVertical className="w-4 h-4" /></button>
                        </div>
                        
                        <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-50 dark:border-gray-700">
                            <div>
                                <p className="text-xs text-gray-400 font-bold mb-0.5">السعر</p>
                                <p className="text-lg font-black text-blue-700 dark:text-blue-400">{product.price} <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">ج.م</span></p>
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-gray-400 font-bold mb-0.5">المخزون</p>
                                <p className={`text-sm font-bold ${product.stock > product.minStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {product.stock} قطعة
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            
            <button 
                onClick={handleAdd}
                className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition min-h-[300px]"
            >
                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 group-hover:bg-white dark:group-hover:bg-gray-600 shadow-sm">
                    <ImageIcon className="w-8 h-8" />
                </div>
                <span className="font-bold">إضافة منتج سريع</span>
            </button>
            </div>
        )}
      </div>

      {isFormOpen && (
        <ProductForm 
          onClose={() => setIsFormOpen(false)} 
          onSave={handleSave} 
          initialData={editingProduct} 
        />
      )}
    </div>
  );
};

export default ProductManager;
