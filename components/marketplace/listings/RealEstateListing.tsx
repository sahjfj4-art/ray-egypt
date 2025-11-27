
import React, { useState } from 'react';
import BookingModal from '../modals/BookingModal';
import { useTranslation } from '../../common/GlobalSettings';
import { Building2, MapPin, Search, Filter, Star, Home, Users } from 'lucide-react';

const companies = [
  { id: 1, title: 'إعمار مصر', type: 'مطور عقاري', location: 'المقطم، القاهرة', activeListings: 45, rating: 4.9, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600', category: 'realestate' },
  { id: 2, title: 'سوديك العقارية', type: 'مطور عقاري', location: 'الشيخ زايد', activeListings: 32, rating: 4.8, image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=600', category: 'realestate' },
  { id: 3, title: 'ريماكس (RE/MAX)', type: 'وسيط عقاري', location: 'المعادي', activeListings: 120, rating: 4.7, image: 'https://images.unsplash.com/photo-1560518883-3d1312f9c1be?w=600', category: 'realestate' },
  { id: 4, title: 'كولدويل بانكر', type: 'وسيط عقاري', location: 'التجمع الخامس', activeListings: 85, rating: 4.6, image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600', category: 'realestate' },
  { id: 5, title: 'المراسم الدولية', type: 'مطور عقاري', location: 'العاصمة الإدارية', activeListings: 25, rating: 4.9, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600', category: 'realestate' },
  { id: 6, title: 'البروج مصر', type: 'تسويق عقاري', location: 'الشروق', activeListings: 60, rating: 4.5, image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600', category: 'realestate' },
];

interface Props {
  onMerchantSelect: (merchant: any) => void;
}

const RealEstateListing: React.FC<Props> = ({ onMerchantSelect }) => {
   const [selected, setSelected] = useState<any | null>(null);
   const [isBookingOpen, setIsBookingOpen] = useState(false);
   const t = useTranslation();

   const openBooking = (e: React.MouseEvent, item: any) => {
      e.stopPropagation();
      const payload = {
         id: item.id,
         name: item.title,
         type: item.type,
         location: item.location,
         rating: item.rating,
         reviews: 150,
         image: item.image,
         category: 'realestate'
      };
      setSelected(payload);
      setIsBookingOpen(true);
   };

   return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="mb-8 text-center md:text-right">
        <h2 className="text-3xl font-black text-ray-black mb-2">شركات العقارات والمطورين</h2>
        <p className="text-gray-500">تصفح أفضل شركات التطوير والوساطة العقارية في مصر</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4">
         <div className="flex-1 relative">
            <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="ابحث عن شركة أو مطور..." className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 outline-none focus:border-green-500" />
         </div>
         <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
            <button className="px-4 py-2.5 bg-green-50 text-green-700 rounded-xl font-bold text-sm whitespace-nowrap border border-green-100">الكل</button>
            <button className="px-4 py-2.5 bg-white text-gray-600 rounded-xl font-bold text-sm whitespace-nowrap border border-gray-200 hover:bg-gray-50">مطور عقاري</button>
            <button className="px-4 py-2.5 bg-white text-gray-600 rounded-xl font-bold text-sm whitespace-nowrap border border-gray-200 hover:bg-gray-50">وسيط عقاري</button>
         </div>
         <button className="px-4 py-2.5 bg-white text-gray-700 rounded-xl font-bold text-sm border border-gray-200 hover:bg-gray-50 flex items-center gap-2">
            <Filter className="w-4 h-4" /> فلتر
         </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {companies.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onMerchantSelect({
                id: item.id,
                name: item.title,
                type: item.type,
                location: item.location,
                rating: item.rating,
                reviews: 150, // Mock
                image: item.image,
                category: 'realestate'
            })}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
          >
            <div className="h-48 relative overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 right-4 text-white">
                 <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                 <p className="text-xs opacity-90 flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.location}</p>
              </div>
              <div className="absolute top-4 left-4 bg-white text-green-700 px-3 py-1 rounded-lg text-xs font-bold shadow-md">
                {item.type}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                       <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-xs text-gray-500 font-bold">مشاريع نشطة</p>
                       <p className="font-bold text-gray-900">5 مشاريع</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                       <Home className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-xs text-gray-500 font-bold">وحدات متاحة</p>
                       <p className="font-bold text-gray-900">{item.activeListings} وحدة</p>
                    </div>
                 </div>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                 <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                    <Star className="w-4 h-4 fill-current" />
                    {item.rating}
                 </div>
                         <div className="flex items-center gap-2">
                            <button onClick={(e) => { e.stopPropagation(); onMerchantSelect({ id: item.id, name: item.title, category: 'realestate' }); }} className="text-sm font-bold text-green-700 bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100 transition">تصفح الوحدات</button>
                            <button onClick={(e) => openBooking(e, item)} className="text-sm font-bold text-white bg-ray-blue px-4 py-2 rounded-lg hover:opacity-90">{t.book || 'احجز'}</button>
                         </div>
              </div>
            </div>
          </div>
        ))}
      </div>
         {selected && <BookingModal open={isBookingOpen} onClose={() => setIsBookingOpen(false)} listing={selected} />}
    </div>
  );
};

export default RealEstateListing;
