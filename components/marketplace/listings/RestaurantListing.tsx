
import React, { useState } from 'react';
import BookingModal from '../modals/BookingModal';
import { useTranslation } from '../../common/GlobalSettings';
import { Star, Clock, MapPin, Bike, Filter, Search } from 'lucide-react';

const restaurants = [
  { id: 1, name: 'مطعم النور', rating: 4.8, reviews: 340, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80', type: 'مشويات • شرقي', time: '30-45 دقيقة', delivery: 15, minOrder: 50, category: 'food' },
  { id: 2, name: 'بيتزا كينج', rating: 4.5, reviews: 120, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&q=80', type: 'بيتزا • إيطالي', time: '40-55 دقيقة', delivery: 20, minOrder: 80, category: 'food' },
  { id: 3, name: 'برجر ستيشن', rating: 4.9, reviews: 550, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80', type: 'برجر • وجبات سريعة', time: '25-35 دقيقة', delivery: 10, minOrder: 60, category: 'food' },
  { id: 4, name: 'سوشي هاوس', rating: 4.2, reviews: 85, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80', type: 'سوشي • آسيوي', time: '50-60 دقيقة', delivery: 25, minOrder: 150, category: 'food' },
  { id: 5, name: 'شاورما الريم', rating: 4.7, reviews: 210, image: 'https://images.unsplash.com/photo-1663234362390-2c34404b2931?w=500&q=80', type: 'شاورما • سوري', time: '20-30 دقيقة', delivery: 15, minOrder: 40, category: 'food' },
  { id: 6, name: 'وافل آند كريب', rating: 4.6, reviews: 180, image: 'https://images.unsplash.com/photo-1562515002-7c238ccfb847?w=500&q=80', type: 'حلويات', time: '35-45 دقيقة', delivery: 12, minOrder: 50, category: 'food' },
];

interface Props {
  onMerchantSelect: (merchant: any) => void;
  title?: string;
}

const RestaurantListing: React.FC<Props> = ({ onMerchantSelect, title = "المطاعم والكافيهات" }) => {
  const [selected, setSelected] = useState<any | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const t = useTranslation();

  const openBooking = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    setSelected(item);
    setIsBookingOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-ray-black">{title}</h2>
          <p className="text-gray-500 mt-1">اكتشف أفضل الأماكن القريبة منك</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
           <div className="relative flex-1 md:w-64">
             <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
             <input type="text" placeholder="بحث باسم المطعم..." className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 text-sm focus:outline-none focus:border-ray-blue" />
           </div>
           <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50">
             <Filter className="w-4 h-4" />
             فلتر
           </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onMerchantSelect(item)}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* Image */}
            <div className="h-48 overflow-hidden relative">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold shadow-sm">
                <Clock className="w-3 h-3 text-gray-500" />
                {item.time}
              </div>
              {item.delivery === 0 && (
                <div className="absolute bottom-3 right-3 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                  توصيل مجاني
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-ray-blue transition">{item.name}</h3>
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                  <span className="text-xs font-bold text-gray-800">{item.rating}</span>
                  <span className="text-[10px] text-gray-400">({item.reviews})</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mb-4">{item.type}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Bike className="w-3.5 h-3.5" />
                  <span>توصيل: {item.delivery === 0 ? 'مجاني' : `${item.delivery} ج`}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>المعادي</span>
                </div>
              </div>
              <div className="p-4 pt-0 flex justify-end">
                <button onClick={(e) => openBooking(e, item)} className="px-3 py-2 rounded-lg bg-ray-gold text-ray-blue font-bold text-sm hover:opacity-90">{t.book || 'احجز'}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selected && <BookingModal open={isBookingOpen} onClose={() => setIsBookingOpen(false)} listing={selected} />}
    </div>
  );
};

export default RestaurantListing;
