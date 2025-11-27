
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface MerchantOrderingProps {
  categories: string[];
  menuItems: any[];
  addToCart: (item: any) => void;
}

const MerchantOrdering: React.FC<MerchantOrderingProps> = ({ categories, menuItems, addToCart }) => {
  const [activeCategory, setActiveCategory] = useState('الكل');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4">
      {/* Sticky Categories */}
      <div className="sticky top-[135px] z-20 bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur py-3 -mx-4 px-4 mb-2 border-b border-gray-200/50 dark:border-gray-800/50 transition-colors">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition shadow-sm border
                ${activeCategory === cat 
                  ? 'bg-ray-black dark:bg-white text-white dark:text-ray-black border-ray-black dark:border-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-24">
        {menuItems.filter(i => activeCategory === 'الكل' || i.category === activeCategory).map((item) => (
          <div 
            key={item.id} 
            onClick={() => addToCart(item)}
            className="group bg-white dark:bg-gray-800 p-3 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex gap-4 hover:border-ray-blue/30 dark:hover:border-ray-gold/30 hover:shadow-md transition cursor-pointer"
          >
            <div className="w-28 h-28 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden shrink-0 relative">
              <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt={item.name} />
              {item.popular && (
                <span className="absolute top-1.5 right-1.5 bg-ray-gold text-ray-black text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">مميز</span>
              )}
            </div>
            <div className="flex-1 flex flex-col py-1">
              <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1 text-base group-hover:text-ray-blue dark:group-hover:text-ray-gold transition">{item.name}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-auto mt-1 leading-relaxed">{item.desc}</p>
              <div className="flex justify-between items-end mt-3">
                <span className="font-black text-gray-900 dark:text-white text-lg">{item.price} <span className="text-xs font-normal text-gray-500 dark:text-gray-400">ج.م</span></span>
                <button className="bg-gray-100 dark:bg-gray-700 hover:bg-ray-blue dark:hover:bg-ray-gold hover:text-white dark:hover:text-ray-black text-gray-700 dark:text-gray-300 w-8 h-8 rounded-full flex items-center justify-center transition shadow-sm transform active:scale-90">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MerchantOrdering;
