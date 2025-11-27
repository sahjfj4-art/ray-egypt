
import React, { useState } from 'react';
import BookingModal from '../modals/BookingModal';
import { useTranslation } from '../../common/GlobalSettings';
import { Stethoscope, Scissors, MapPin, Star, Calendar, Search, HeartPulse, Dumbbell } from 'lucide-react';

const healthItems = [
  { id: 1, name: 'عيادات الشفاء التخصصية', rating: 4.9, reviews: 450, image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500', type: 'عيادات', specialty: 'باطنة، أطفال، أسنان', location: 'مدينة نصر' },
  { id: 2, name: 'صيدليات العزبي', rating: 4.7, reviews: 1200, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500', type: 'صيدلية', specialty: 'أدوية ومستحضرات تجميل', location: 'كل الفروع' },
  { id: 3, name: 'معامل المختبر', rating: 4.6, reviews: 800, image: 'https://images.unsplash.com/photo-1579165466741-7f35a4755657?w=500', type: 'معمل تحاليل', specialty: 'تحاليل طبية شاملة', location: 'المهندسين' },
];

const beautyItems = [
  { id: 4, name: 'صالون محمد الصغير', rating: 4.8, reviews: 600, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500', type: 'صالون تجميل', specialty: 'شعر وميكب', location: 'الزمالك' },
  { id: 5, name: 'Gold\'s Gym', rating: 4.7, reviews: 950, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500', type: 'جيم', specialty: 'لياقة بدنية وسبا', location: 'المعادي' },
  { id: 6, name: 'The Spa', rating: 4.9, reviews: 150, image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500', type: 'سبا', specialty: 'مساج وعناية بالبشرة', location: 'التجمع الخامس' },
];

interface Props {
  onMerchantSelect: (merchant: any) => void;
  category?: 'health' | 'beauty';
}

const HealthBeautyListing: React.FC<Props> = ({ onMerchantSelect, category = 'health' }) => {
  const isHealth = category === 'health';
  const items = isHealth ? healthItems : beautyItems;
  const title = isHealth ? 'الصحة والطب' : 'الجمال والعناية';
  const subTitle = isHealth ? 'أفضل الأطباء والمراكز الطبية' : 'تألقي مع أفضل الصالونات ومراكز التجميل';
  const themeColor = isHealth ? 'text-teal-600' : 'text-pink-600';
  const btnColor = isHealth ? 'bg-teal-600 hover:bg-teal-700' : 'bg-pink-600 hover:bg-pink-700';
  const [selected, setSelected] = useState<any | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const t = useTranslation();

  const openBooking = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    setSelected({ ...item, category: isHealth ? 'clinic' : 'gym' });
    setIsBookingOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-ray-black flex items-center gap-2">
            {isHealth ? <HeartPulse className={`w-8 h-8 ${themeColor}`} /> : <Scissors className={`w-8 h-8 ${themeColor}`} />}
            {title}
          </h2>
          <p className="text-gray-500 mt-1">{subTitle}</p>
        </div>
        
        <div className="relative w-full md:w-72">
           <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
           <input type="text" placeholder={isHealth ? "ابحث عن طبيب أو تخصص..." : "ابحث عن صالون أو خدمة..."} className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 text-sm focus:outline-none focus:border-ray-blue" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onMerchantSelect({ ...item, category: isHealth ? 'clinic' : 'gym' })}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
          >
            <div className="h-48 relative overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold shadow-sm">
                {isHealth ? <Stethoscope className="w-3 h-3 text-teal-600" /> : <Dumbbell className="w-3 h-3 text-pink-600" />}
                {item.type}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className={`text-lg font-bold text-gray-900 group-hover:${isHealth ? 'text-teal-600' : 'text-pink-600'} transition`}>{item.name}</h3>
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-bold text-gray-800">{item.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mb-4">{item.specialty}</p>
              
              <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <MapPin className="w-3 h-3" />
                  {item.location}
                </div>
                <button onClick={(e) => openBooking(e, item)} className={`text-white px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${btnColor}`}>
                  <Calendar className="w-3 h-3" />
                  {t.book || 'احجز'}
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

export default HealthBeautyListing;
