
import React, { useState } from 'react';
import { Ticket, GraduationCap, MapPin, Calendar, Search, Music, Video } from 'lucide-react';

const events = [
  { id: 1, name: 'Vox Cinemas', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500', type: 'سينما', details: 'أحدث الأفلام العالمية', location: 'مول مصر', price: 'من 120 ج' },
  { id: 2, name: 'Dream Park', image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=500', type: 'ملاهي', details: 'مدينة ألعاب ترفيهية', location: '6 أكتوبر', price: 'تذكرة 250 ج' },
  { id: 3, name: 'حفل عمر خيرت', image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500', type: 'حفلات', details: 'دار الأوبرا المصرية', location: 'الزمالك', price: 'من 500 ج', date: '25 نوفمبر' },
  { id: 4, name: 'AUC Courses', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500', type: 'تعليم', details: 'كورسات إنجليزي وإدارة', location: 'التحرير / التجمع', price: 'حسب الكورس' },
  { id: 5, name: 'متحف الحضارة', image: 'https://images.unsplash.com/photo-1565060169686-c72985d7b641?w=500', type: 'سياحة', details: 'جولة تاريخية', location: 'الفسطاط', price: '60 ج' },
  { id: 6, name: 'أكاديمية الموسيقى', image: 'https://images.unsplash.com/photo-1514320291940-7c95122b6254?w=500', type: 'تدريب', details: 'تعليم بيانو وجيتار', location: 'المعادي', price: 'اشتراك شهري' },
];

import BookingModal from '../modals/BookingModal';

interface Props {
  onMerchantSelect: (merchant: any) => void;
  category?: 'education' | 'entertainment';
}

const EventListing: React.FC<Props> = ({ onMerchantSelect, category = 'entertainment' }) => {
  const [selected, setSelected] = useState<any | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const isEdu = category === 'education';
  const filteredItems = isEdu ? events.filter(e => ['تعليم', 'تدريب'].includes(e.type)) : events.filter(e => !['تعليم', 'تدريب'].includes(e.type));
  
  const title = isEdu ? 'التعليم والتدريب' : 'الترفيه والسياحة';
  const subTitle = isEdu ? 'طوّر مهاراتك مع أفضل المراكز التعليمية' : 'استمتع بأفضل الأوقات والفعاليات';
  const themeColor = isEdu ? 'text-indigo-600' : 'text-purple-600';

  const openBooking = (item: any) => {
    setSelected(item);
    setIsBookingOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-ray-black flex items-center gap-2">
            {isEdu ? <GraduationCap className={`w-8 h-8 ${themeColor}`} /> : <Ticket className={`w-8 h-8 ${themeColor}`} />}
            {title}
          </h2>
          <p className="text-gray-500 mt-1">{subTitle}</p>
        </div>
        
        <div className="relative w-full md:w-72">
           <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
           <input type="text" placeholder={isEdu ? "ابحث عن كورس أو مركز..." : "ابحث عن فعالية أو مكان..."} className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 text-sm focus:outline-none focus:border-ray-blue" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onMerchantSelect({ ...item, category: isEdu ? 'education' : 'entertainment' })}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
          >
            <div className="h-48 relative overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold shadow-sm">
                {item.type === 'سينما' ? <Video className="w-3 h-3" /> : item.type === 'حفلات' ? <Music className="w-3 h-3" /> : <Ticket className="w-3 h-3" />}
                {item.type}
              </div>
              {item.date && (
                <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1 backdrop-blur-md">
                   <Calendar className="w-3 h-3" /> {item.date}
                </div>
              )}
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className={`text-lg font-bold text-gray-900 group-hover:${isEdu ? 'text-indigo-600' : 'text-purple-600'} transition`}>{item.name}</h3>
              </div>
              
              <p className="text-sm text-gray-500 mb-4">{item.details}</p>
              
                <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <MapPin className="w-3 h-3" />
                  {item.location}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">{item.price}</span>
                  <button onClick={(e) => { e.stopPropagation(); openBooking(item); }} className="px-3 py-1 rounded-lg bg-ray-blue text-white text-sm hover:opacity-90">احجز</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
        {selected && (
          <BookingModal open={isBookingOpen} onClose={() => setIsBookingOpen(false)} listing={selected} />
        )}
    </div>
  );
};

export default EventListing;
