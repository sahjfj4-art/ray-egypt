
import React, { useState } from 'react';
import BookingModal from '../modals/BookingModal';
import { useTranslation } from '../../common/GlobalSettings';
import { Wrench, MapPin, Star, Clock, Search, Filter, Shirt, Zap, Droplets } from 'lucide-react';

const services = [
  { id: 1, name: 'مغسلة كلين أند واش', rating: 4.9, reviews: 210, image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb8f?w=500', type: 'دراي كلين', specialty: 'غسيل ومكوة', location: 'التجمع الخامس' },
  { id: 2, name: 'تكنو فيكس للصيانة', rating: 4.7, reviews: 150, image: 'https://images.unsplash.com/photo-1581578014828-160951805da8?w=500', type: 'صيانة أجهزة', specialty: 'تكييفات وثلاجات', location: 'المعادي' },
  { id: 3, name: 'الماسة لخدمات التنظيف', rating: 4.5, reviews: 85, image: 'https://images.unsplash.com/photo-1581578014332-82736d499329?w=500', type: 'نظافة', specialty: 'تنظيف منازل', location: 'مدينة نصر' },
  { id: 4, name: 'المهندس للكهرباء', rating: 4.8, reviews: 300, image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500', type: 'كهرباء', specialty: 'تأسيس وصيانة', location: 'أكتوبر' },
  { id: 5, name: 'سباكة مودرن', rating: 4.6, reviews: 120, image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=500', type: 'سباكة', specialty: 'صيانة صحية', location: 'الشيخ زايد' },
  { id: 6, name: 'ورشة الأسطى محمد', rating: 4.3, reviews: 90, image: 'https://images.unsplash.com/photo-1619641368086-91f437330396?w=500', type: 'نجارة', specialty: 'أثاث ومطابخ', location: 'الهرم' },
];

interface Props {
  onMerchantSelect: (merchant: any) => void;
}

const ServiceListing: React.FC<Props> = ({ onMerchantSelect }) => {
  const [selected, setSelected] = useState<any | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const t = useTranslation();

  const openBooking = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    setSelected({ ...item, category: 'services' });
    setIsBookingOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-ray-black">الخدمات والصيانة</h2>
          <p className="text-gray-500 mt-1">فنيين محترفين وشركات خدمات موثوقة</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
           <div className="relative flex-1 md:w-64">
             <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
             <input type="text" placeholder="ابحث عن سباك، كهربائي..." className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 text-sm focus:outline-none focus:border-ray-blue" />
           </div>
           <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50">
             <Filter className="w-4 h-4" />
             فلتر
           </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onMerchantSelect({ ...item, category: 'services' })}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
          >
            <div className="h-40 relative overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 right-3 text-white">
                 <div className="flex items-center gap-1 text-sm font-bold">
                    {item.type === 'دراي كلين' ? <Shirt className="w-4 h-4" /> : item.type === 'كهرباء' ? <Zap className="w-4 h-4" /> : <Wrench className="w-4 h-4" />}
                    {item.type}
                 </div>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-cyan-600 transition">{item.name}</h3>
                <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                  <Star className="w-3 h-3 fill-current" />
                  {item.rating}
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mb-4 line-clamp-1">{item.specialty}</p>
              
              <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <MapPin className="w-3 h-3" />
                  {item.location}
                </div>
                <button onClick={(e) => openBooking(e, item)} className="text-xs font-bold text-white px-3 py-1.5 rounded-lg transition bg-cyan-600 hover:bg-cyan-700">{t.book || 'احجز'}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selected && <BookingModal open={isBookingOpen} onClose={() => setIsBookingOpen(false)} listing={selected} />}
    </div>
  );
};

export default ServiceListing;
