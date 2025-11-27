
import React, { useState } from 'react';
import BookingModal from '../modals/BookingModal';
import { useTranslation } from '../../common/GlobalSettings';
import { Car, MapPin, Search, Filter, Star, ShieldCheck, Phone } from 'lucide-react';

const dealerships = [
  { id: 1, title: 'أوتو ستار', type: 'وكيل معتمد', location: 'التجمع الخامس', activeListings: 58, rating: 4.9, image: 'https://images.unsplash.com/photo-1562519819-016930ada31b?w=600', category: 'cars' },
  { id: 2, title: 'معرض الحمد', type: 'سيارات مستعملة', location: 'مدينة نصر', activeListings: 32, rating: 4.6, image: 'https://images.unsplash.com/photo-1605218427368-d8c809687e9e?w=600', category: 'cars' },
  { id: 3, title: 'الغلبان أوتو', type: 'موزع معتمد', location: 'المهندسين', activeListings: 120, rating: 4.8, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600', category: 'cars' },
  { id: 4, title: 'أوتو سمير ريان', type: 'موزع معتمد', location: 'مدينة نصر', activeListings: 200, rating: 4.7, image: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=600', category: 'cars' },
  { id: 5, title: '4x4 Motors', type: 'سيارات الدفع الرباعي', location: 'مصر الجديدة', activeListings: 15, rating: 4.9, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600', category: 'cars' },
  { id: 6, title: 'كسر زيرو كارز', type: 'مستعمل بحالة الزيرو', location: 'المعادي', activeListings: 45, rating: 4.5, image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?w=600', category: 'cars' },
];

interface Props {
  onMerchantSelect: (merchant: any) => void;
}

const CarListing: React.FC<Props> = ({ onMerchantSelect }) => {
  const [selected, setSelected] = useState<any | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const t = useTranslation();

  const openBooking = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    setSelected({ id: item.id, name: item.title, category: 'cars', image: item.image });
    setIsBookingOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="mb-8 text-center md:text-right">
        <h2 className="text-3xl font-black text-ray-black mb-2">معارض السيارات والوكلاء</h2>
        <p className="text-gray-500">أكبر تجمع لمعارض السيارات الجديدة والمستعملة في مصر</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4">
         <div className="flex-1 relative">
            <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="ابحث عن معرض أو وكيل..." className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 outline-none focus:border-red-500" />
         </div>
         <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
            <button className="px-4 py-2.5 bg-red-50 text-red-700 rounded-xl font-bold text-sm whitespace-nowrap border border-red-100">الكل</button>
            <button className="px-4 py-2.5 bg-white text-gray-600 rounded-xl font-bold text-sm whitespace-nowrap border border-gray-200 hover:bg-gray-50">وكيل معتمد</button>
            <button className="px-4 py-2.5 bg-white text-gray-600 rounded-xl font-bold text-sm whitespace-nowrap border border-gray-200 hover:bg-gray-50">مستعمل</button>
         </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dealerships.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onMerchantSelect({
                id: item.id,
                name: item.title,
                type: item.type,
                location: item.location,
                rating: item.rating,
                reviews: 120, // Mock
                image: item.image,
                category: 'cars'
            })}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
          >
            <div className="h-52 relative overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
                {item.type}
              </div>
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-gray-800 flex items-center gap-1 shadow-sm">
                 <ShieldCheck className="w-3 h-3 text-green-600" /> موثق
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                 <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition">{item.title}</h3>
                 <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star className="w-3 h-3 fill-current" />
                    {item.rating}
                 </div>
              </div>
              
              <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                 <MapPin className="w-4 h-4" /> {item.location}
              </p>

              <div className="bg-gray-50 p-3 rounded-xl mb-4 flex items-center justify-between border border-gray-100">
                 <span className="text-sm font-bold text-gray-600">المخزون المتاح</span>
                 <span className="text-lg font-black text-red-600">{item.activeListings} سيارة</span>
              </div>

                <div className="mt-auto flex gap-2">
                  <button onClick={(e) => { e.stopPropagation(); onMerchantSelect({ id: item.id, name: item.title, category: 'cars' }); }} className="flex-1 py-2 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition">عرض السيارات</button>
                  <button onClick={(e) => openBooking(e, item)} className="px-4 py-2 bg-ray-gold text-ray-blue rounded-lg font-bold">{t.book || 'احجز'}</button>
                  <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition">
                    <Phone className="w-5 h-5" />
                  </button>
                </div>
            </div>
          </div>
        ))}
      </div>
          {selected && <BookingModal open={isBookingOpen} onClose={() => setIsBookingOpen(false)} listing={selected} />}
    </div>
  );
};

export default CarListing;
