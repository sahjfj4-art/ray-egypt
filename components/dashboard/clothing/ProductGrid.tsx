
import React, { useState } from 'react';
import { Search, Filter, ShoppingBag, Plus } from 'lucide-react';

export interface ClothingItem {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  sizes: string[];
  colors: string[];
  category: string;
}

interface Props {
  addToCart: (item: ClothingItem, size: string, color: string) => void;
}

const clothingItems: ClothingItem[] = [
  { id: 1, name: 'تيشيرت قطن بيزيك', price: 250, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', brand: 'Zara', sizes: ['S', 'M', 'L', 'XL'], colors: ['white', 'black', 'navy'], category: 'تيشيرت' },
  { id: 2, name: 'بنطلون جينز سليم', price: 550, image: 'https://images.unsplash.com/photo-1542272617-08f086302542?w=400', brand: 'Levis', sizes: ['30', '32', '34', '36'], colors: ['blue', 'black'], category: 'بنطلون' },
  { id: 3, name: 'قميص كاجوال كاروهات', price: 400, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400', brand: 'H&M', sizes: ['M', 'L', 'XL'], colors: ['red', 'blue'], category: 'قميص' },
  { id: 4, name: 'فستان صيفي مشجر', price: 650, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400', brand: 'Mango', sizes: ['S', 'M', 'L'], colors: ['pink', 'yellow'], category: 'فستان' },
  { id: 5, name: 'جاكيت بومبر', price: 850, image: 'https://images.unsplash.com/photo-1551028919-33f54764fa5d?w=400', brand: 'Pull&Bear', sizes: ['M', 'L', 'XL'], colors: ['green', 'black'], category: 'جاكيت' },
  { id: 6, name: 'سويت شيرت هودي', price: 450, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400', brand: 'Nike', sizes: ['S', 'M', 'L', 'XL'], colors: ['gray', 'black'], category: 'سويت شيرت' },
];

const ProductGrid: React.FC<Props> = ({ addToCart }) => {
  const [filterBrand, setFilterBrand] = useState<string>('All');
  const [filterSize, setFilterSize] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Selection state for each card (temporary selection before adding to cart)
  const [selectedOptions, setSelectedOptions] = useState<Record<number, {size: string, color: string}>>({});

  const handleOptionSelect = (id: number, type: 'size' | 'color', value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [id]: { ...prev[id], [type]: value }
    }));
  };

  const filteredItems = clothingItems.filter(item => {
    const matchBrand = filterBrand === 'All' || item.brand === filterBrand;
    const matchSize = filterSize === 'All' || item.sizes.includes(filterSize);
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchBrand && matchSize && matchSearch;
  });

  const brands = ['All', ...Array.from(new Set(clothingItems.map(i => i.brand)))];
  const allSizes = ['All', 'S', 'M', 'L', 'XL', '30', '32', '34', '36'];

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
      {/* Filters Header */}
      <div className="p-4 bg-white border-b border-gray-200 space-y-3">
        <div className="relative">
          <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="بحث عن موديل..." 
            className="w-full bg-gray-100 rounded-xl py-2 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg shrink-0">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-bold text-gray-600">فلتر:</span>
          </div>
          <select 
            className="bg-white border border-gray-200 rounded-lg px-3 py-1 text-sm outline-none focus:border-pink-500"
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
          >
            <option value="All">كل الماركات</option>
            {brands.filter(b => b !== 'All').map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <select 
            className="bg-white border border-gray-200 rounded-lg px-3 py-1 text-sm outline-none focus:border-pink-500"
            value={filterSize}
            onChange={(e) => setFilterSize(e.target.value)}
          >
            <option value="All">كل المقاسات</option>
            {allSizes.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map(item => {
            const currentSelection = selectedOptions[item.id] || { size: item.sizes[0], color: item.colors[0] };
            
            return (
              <div key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col group">
                <div className="aspect-[4/5] relative bg-gray-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">
                    {item.brand}
                  </span>
                </div>
                
                <div className="p-3 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{item.name}</h4>
                    <span className="font-black text-pink-600 text-sm">{item.price} ج</span>
                  </div>
                  
                  {/* Selection Controls */}
                  <div className="mt-auto space-y-2">
                    <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
                      {item.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => handleOptionSelect(item.id, 'size', size)}
                          className={`w-7 h-7 rounded-md text-[10px] font-bold border flex items-center justify-center transition
                            ${currentSelection.size === size ? 'bg-pink-600 text-white border-pink-600' : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300'}
                          `}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {item.colors.map(color => (
                          <button
                            key={color}
                            onClick={() => handleOptionSelect(item.id, 'color', color)}
                            className={`w-5 h-5 rounded-full border-2 transition shadow-sm
                              ${currentSelection.color === color ? 'border-pink-600 scale-110' : 'border-transparent hover:scale-110'}
                            `}
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                      <button 
                        onClick={() => addToCart(item, currentSelection.size, currentSelection.color)}
                        className="bg-black text-white p-2 rounded-lg hover:bg-pink-600 transition shadow-lg active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
