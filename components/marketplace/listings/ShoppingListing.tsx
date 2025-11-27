import React, { useState } from 'react';
import BookingModal from '../modals/BookingModal';
import { useTranslation } from '../../common/GlobalSettings';
import { ShoppingBag, MapPin, Star, Tag, Filter, Search } from 'lucide-react';

const shops = [
  { id: 1, name: 'سوبر ماركت خير زمان', rating: 4.6, reviews: 850, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500', type: 'سوبر ماركت', location: 'المعادي', status: 'open' },
  { id: 2, name: 'H&M', rating: 4.8, reviews: 1200, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500', type: 'أزياء وموضة', location: 'كايرو فيستيفال', status: 'open' },
  { id: 3, name: 'بي تك (B.TECH)', rating: 4.5, reviews: 550, image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500', type: 'إلكترونيات', location: 'مدينة نصر', status: 'open' },
  { id: 4, name: 'ZARA', rating: 4.7, reviews: 2100, image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=500', type: 'ملابس', location: 'مول العرب', status: 'open' },
  { id: 5, name: 'مكتبة سمير وعلي', rating: 4.4, reviews: 320, image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=500', type: 'مكتبات', location: 'الدقي', status: 'closed' },
  { id: 6, name: 'زهور الربيع', rating: 4.9, reviews: 150, image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=500', type: 'هدايا وزهور', location: 'الزمالك', status: 'open' },
];

interface Props {
  onMerchantSelect: (merchant: any) => void;
}

const ShoppingListing: React.FC<Props> = ({ onMerchantSelect }) => {
  const [selected, setSelected] = useState<any | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const t = useTranslation();

  const openBooking = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    setSelected({ ...item, category: 'shopping' });
    setIsBookingOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-ray-black">التسوق والمحلات</h2>
          <p className="text-gray-500 mt-1">أفضل الماركات والمحلات التجارية حولك</p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="بحث عن محل أو منتج..." className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 text-sm focus:outline-none focus:border-ray-blue" />
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            فلتر
          </button>
        </div>
      </div>

      {/* Categories Pills */}
      <div className="flex gap-3 overflow-x-auto pb-6 mb-2 no-scrollbar">
        {['الكل', 'سوبر ماركت', 'ملابس', 'إلكترونيات', 'مكتبات', 'هدايا', 'أثاث'].map((cat, idx) => (
          <button key={idx} className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${idx === 0 ? 'bg-ray-black text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((item) => (
          <article
            key={item.id}
            onClick={() => onMerchantSelect({ ...item, category: 'shopping' })}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
          >
            <div className="h-48 relative overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold shadow-sm">
                <Tag className="w-3 h-3 text-blue-500" />
                {item.type}
              </div>
              <div className={`absolute bottom-3 right-3 px-2 py-1 rounded-lg text-xs font-bold shadow-sm ${item.status === 'open' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                {item.status === 'open' ? 'مفتوح الآن' : 'مغلق'}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-lg text-gray-900 mb-2">{item.name}</h3>
              
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100 shrink-0 mb-3 w-fit">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-xs font-bold text-gray-800">{item.rating}</span>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                <MapPin className="w-3.5 h-3.5" />
                {item.location}
              </div>
              
              <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                <span className="text-xs text-gray-400">{item.reviews} تقييم</span>
                <button onClick={(e) => openBooking(e, item)} className="px-3 py-1.5 rounded-lg bg-ray-gold text-ray-blue font-bold text-sm">{t.book || 'احجز'}</button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {selected && <BookingModal open={isBookingOpen} onClose={() => setIsBookingOpen(false)} listing={selected} />}
    </div>
  );
};

export default ShoppingListing;
