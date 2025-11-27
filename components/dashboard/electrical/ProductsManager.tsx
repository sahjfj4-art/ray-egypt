import React, { useState } from 'react';
import { 
  Zap, Plus, Search, Filter, Edit, Trash2, Eye,
  ShoppingCart, TrendingUp, TrendingDown, AlertCircle, Lightbulb, Wrench
} from 'lucide-react';
import { rayPrices, rayColors } from '../../common/RayHelpers';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  unit: string;
  supplier: string;
  status: 'active' | 'low_stock' | 'out_of_stock' | 'warranty';
  lastSale?: string;
  warrantyPeriod?: string;
  voltage?: string;
}

const initialProducts: Product[] = [
  { id: 'EL-001', name: 'أسلاك نحاس 4مم', category: 'أسلاك', price: 120, stock: 2, minStock: 10, unit: 'لفة', supplier: 'شركة الأسلاك المصرية', status: 'low_stock', lastSale: 'منذ 3 ساعات', voltage: '220V' },
  { id: 'EL-002', name: 'لمبة LED 50W', category: 'إضاءة', price: 85, stock: 15, minStock: 20, unit: 'قطعة', supplier: 'شركة الإضاءة الحديثة', status: 'low_stock', lastSale: 'منذ ساعة', warrantyPeriod: 'سنتان' },
  { id: 'EL-003', name: 'مفتاح كهرباء 2 بول', category: 'مفاتيح', price: 25, stock: 45, minStock: 15, unit: 'قطعة', supplier: 'شركة المفاتيح المتقدمة', status: 'active', lastSale: 'منذ يومين', voltage: '220V' },
  { id: 'EL-004', name: 'موتور كهرباء 1 حصان', category: 'محركات', price: 850, stock: 4, minStock: 3, unit: 'قطعة', supplier: 'المحركات الكهربائية المتحدة', status: 'active', lastSale: 'منذ يوم', voltage: '380V', warrantyPeriod: 'سنة' },
  { id: 'EL-005', name: 'قاطع كهرباء 32 أمبير', category: 'قواطع', price: 120, stock: 8, minStock: 10, unit: 'قطعة', supplier: 'شركة القواطع المصرية', status: 'active', lastSale: 'منذ 4 ساعات', voltage: '220V' },
  { id: 'EL-006', name: 'لوحة تحكم تكييف', category: 'تحكم', price: 450, stock: 0, minStock: 5, unit: 'قطعة', supplier: 'أنظمة التحكم المتقدمة', status: 'out_of_stock', lastSale: 'منذ أسبوع', warrantyPeriod: 'سنتان' },
];

const ProductsManager: React.FC<{ businessType: string }> = ({ businessType }) => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = ['all', 'أسلاك', 'إضاءة', 'مفاتيح', 'محركات', 'قواطع', 'تحكم'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'low_stock': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'out_of_stock': return 'bg-red-100 text-red-700 border-red-200';
      case 'warranty': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'active': return 'متاح';
      case 'low_stock': return 'مخزون منخفض';
      case 'out_of_stock': return 'نفذ المخزون';
      case 'warranty': return 'تحت الضمان';
      default: return status;
    }
  };

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) return { color: 'text-red-500', icon: AlertCircle };
    if (stock <= minStock) return { color: 'text-yellow-500', icon: TrendingDown };
    return { color: 'text-green-500', icon: TrendingUp };
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-600" />
            إدارة المنتجات الكهربائية
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">المنتجات الكهربائية والإضاءة والمعدات</p>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-yellow-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            منتج جديد
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="بحث عن منتج..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>
        
        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto max-w-full">
           {categories.map(cat => (
             <button 
               key={cat}
               onClick={() => setSelectedCategory(cat)}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap
                 ${selectedCategory === cat ? 'bg-white dark:bg-gray-600 text-yellow-700 dark:text-yellow-400 shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'}
               `}
             >
               {cat === 'all' ? 'الكل' : cat}
             </button>
           ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => {
          const stockStatus = getStockStatus(product.stock, product.minStock);
          const StatusIcon = stockStatus.icon;
          
          return (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{product.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(product.status)}`}>
                  {getStatusLabel(product.status)}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">السعر</span>
                  <span className="text-lg font-black text-gray-800 dark:text-white">{rayPrices.format(product.price)}</span>
                </div>
                
                {product.warrantyPeriod && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">الضمان</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{product.warrantyPeriod}</span>
                  </div>
                )}
                
                {product.voltage && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">الجهد</span>
                    <span className="font-bold text-yellow-600 dark:text-yellow-400">{product.voltage}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">المخزون</span>
                  <div className="flex items-center gap-2">
                    <StatusIcon className={`w-4 h-4 ${stockStatus.color}`} />
                    <span className="font-bold text-gray-800 dark:text-white">{product.stock} {product.unit}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">الحد الأدنى</span>
                  <span className="font-bold text-gray-600 dark:text-gray-300">{product.minStock} {product.unit}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">المورد</span>
                  <span className="font-bold text-gray-600 dark:text-gray-300 text-sm">{product.supplier}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 py-2 rounded-lg font-bold text-sm hover:bg-yellow-100 dark:hover:bg-yellow-900/40 transition">
                  <ShoppingCart className="w-4 h-4" />
                  بيع
                </button>
                {product.category === 'إضاءة' && (
                  <button className="flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-2 rounded-lg font-bold text-sm hover:bg-blue-100 dark:hover:bg-blue-900/40 transition">
                    <Lightbulb className="w-4 h-4" />
                    تصميم
                  </button>
                )}
                <button className="p-2 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
          <Zap className="w-12 h-12 mb-4 text-gray-300 dark:text-gray-600" />
          <p className="font-bold">لا توجد منتجات</p>
          <p className="text-sm">لم يتم العثور على منتجات تطابق البحث</p>
        </div>
      )}
    </div>
  );
};

export default ProductsManager;
