
import React, { useState } from 'react';
import { Search, Filter, Star, ArrowRight, SlidersHorizontal, Map, List } from 'lucide-react';
import SearchFilterModal from '../modals/SearchFilterModal';
import SmartMapSearch from '../widgets/SmartMapSearch';

// Mock Data for Search
const mockResults = [
  { id: 1, type: 'restaurant', name: 'مطعم النور', rating: 4.8, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400', subtitle: 'مشويات • المعادي', price: '$$' },
  { id: 2, type: 'product', name: 'ساعة Apple Watch', rating: 4.9, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400', subtitle: 'إلكترونيات • بي تك', price: '15,000 ج' },
  { id: 3, type: 'car', name: 'Kia Sportage 2024', rating: 'جديد', image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400', subtitle: 'أوتو ستار • التجمع', price: '1.8M ج' },
  { id: 4, type: 'realestate', name: 'شقة 180م للبيع', rating: 'مميز', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400', subtitle: 'حي اللوتس • التجمع الخامس', price: '3.5M ج' },
  { id: 5, type: 'restaurant', name: 'بيتزا كينج', rating: 4.5, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', subtitle: 'إيطالي • مدينة نصر', price: '$$' },
  { id: 6, type: 'product', name: 'حذاء Nike Air', rating: 4.7, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', subtitle: 'أزياء • Nike Store', price: '4,500 ج' },
];

interface Props {
  query?: string;
}

const SearchResultsView: React.FC<Props> = ({ query = '' }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState(query);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const filters = [
    { id: 'all', label: 'الكل' },
    { id: 'restaurant', label: 'مطاعم' },
    { id: 'product', label: 'منتجات' },
    { id: 'realestate', label: 'عقارات' },
    { id: 'car', label: 'سيارات' },
  ];

  const filteredResults = mockResults.filter(item => 
    (activeFilter === 'all' || item.type === activeFilter) &&
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFilterApply = (filters: any) => {
    console.log('Filters applied:', filters);
  };

  return (
    <div className="min-h-screen bg-gray-50 animate-in fade-in duration-300">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 px-4 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="ابحث عن أي شيء (مطاعم، منتجات، عقارات...)" 
                className="w-full bg-gray-100 border-transparent focus:bg-white border-2 focus:border-ray-blue rounded-2xl py-3 pr-12 pl-4 outline-none transition-all font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* View Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-xl shrink-0">
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-lg transition flex items-center gap-2 text-sm font-bold ${viewMode === 'list' ? 'bg-white shadow text-ray-blue' : 'text-gray-500 hover:text-gray-800'}`}
              >
                <List className="w-4 h-4" />
                قائمة
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`p-2.5 rounded-lg transition flex items-center gap-2 text-sm font-bold ${viewMode === 'map' ? 'bg-white shadow text-ray-blue' : 'text-gray-500 hover:text-gray-800'}`}
              >
                <Map className="w-4 h-4" />
                خريطة
              </button>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-1">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all
                  ${activeFilter === filter.id 
                    ? 'bg-ray-black text-white shadow-md transform scale-105' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-ray-blue'}
                `}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-ray-black">نتائج البحث ({filteredResults.length})</h2>
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 text-sm font-bold text-gray-600 bg-white px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            فلترة متقدمة
          </button>
        </div>

        {filteredResults.length > 0 ? (
          viewMode === 'map' ? (
            <SmartMapSearch results={filteredResults} onSelect={(item) => console.log(item)} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in slide-in-from-bottom-4">
              {filteredResults.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all group cursor-pointer h-full flex flex-col">
                  <div className="h-48 relative overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold shadow-sm text-ray-blue">
                      {item.type === 'restaurant' ? 'مطعم' : item.type === 'product' ? 'منتج' : item.type === 'car' ? 'سيارة' : 'عقار'}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-lg text-ray-black group-hover:text-ray-blue transition">{item.name}</h3>
                      <div className="flex items-center gap-1 text-xs font-bold bg-yellow-50 text-yellow-700 px-2 py-1 rounded-lg">
                        <Star className="w-3 h-3 fill-current" /> {item.rating}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-3 font-medium">{item.subtitle}</p>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-50 mt-auto">
                      <span className="font-black text-ray-black">{item.price}</span>
                      <button className="text-sm font-bold text-ray-blue flex items-center gap-1 hover:underline">
                        التفاصيل <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
              <Search className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-ray-black mb-2">لا توجد نتائج</h3>
            <p className="text-gray-500">جرب البحث بكلمات مختلفة أو تغيير الفلتر</p>
          </div>
        )}
      </div>

      <SearchFilterModal 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleFilterApply}
      />
    </div>
  );
};

export default SearchResultsView;
