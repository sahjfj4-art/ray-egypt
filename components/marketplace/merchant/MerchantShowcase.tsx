
import React, { useState } from 'react';
import { Image as ImageIcon, MapPin, DollarSign, Gauge, Fuel, Car, Bed, Bath, Ruler, Home, X, CheckCircle, Scale } from 'lucide-react';
import ContactSellerModal from '../modals/ContactSellerModal';
import SmartCompareModal from '../modals/SmartCompareModal';

interface MerchantShowcaseProps {
  galleryImages: string[];
  merchantType: string; // 'realestate' | 'cars'
}

// Mock data for specific inventories
const carInventory = [
  { id: 1, title: 'Kia Sportage TopLine', year: '2024', price: '1,850,000', image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=500', specs: { km: '0 كم', trans: 'أوتوماتيك', engine: '1600cc Turbo' }, desc: 'سيارة كيا سبورتاج موديل 2024 فئة توب لاين، لون أبيض، فرش جلد، فتحة سقف بانوراما.' },
  { id: 2, title: 'Mercedes C180', year: '2023', price: '3,200,000', image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=500', specs: { km: '15,000 كم', trans: 'أوتوماتيك', engine: '1500cc Turbo' }, desc: 'مرسيدس C180 حالة الزيرو، صيانة توكيل، رخصة سارية.' },
  { id: 3, title: 'Hyundai Tucson', year: '2024', price: '1,950,000', image: 'https://images.unsplash.com/photo-1633509729057-9397c72df23c?w=500', specs: { km: '0 كم', trans: 'أوتوماتيك', engine: '1600cc Turbo' }, desc: 'توسان 2024 الفئة الرابعة، استلام فوري، ألوان متعددة.' },
  { id: 4, title: 'BMW 320i', year: '2024', price: '4,100,000', image: 'https://images.unsplash.com/photo-1555215695-3004980adade?w=500', specs: { km: '5,000 كم', trans: 'أوتوماتيك', engine: '2000cc TwinPower' }, desc: 'BMW 320i M Sport package, like new condition.' },
];

const realEstateInventory = [
  { id: 1, title: 'شقة 180م بحديقة', type: 'بيع', price: '3,500,000', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500', specs: { area: '180م', rooms: 3, bath: 2 }, desc: 'شقة أرضي بحديقة 50 متر، تشطيب سوبر لوكس، استلام فوري في كمبوند متكامل الخدمات.' },
  { id: 2, title: 'فيلا مستقلة', type: 'بيع', price: '12,000,000', image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500', specs: { area: '450م', rooms: 5, bath: 4 }, desc: 'فيلا مستقلة في موقع متميز، فيو مفتوح، حمام سباحة خاص.' },
  { id: 3, title: 'شالية أرضي', type: 'بيع', price: '4,200,000', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500', specs: { area: '120م', rooms: 2, bath: 1 }, desc: 'شالية صف أول على البحر، تشطيب كامل بالفرش والأجهزة.' },
  { id: 4, title: 'مكتب إداري', type: 'إيجار', price: '45,000/شهر', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500', specs: { area: '90م', rooms: 2, bath: 1 }, desc: 'مقر إداري مرخص، تشطيب مكتب، تكييف مركزي، انترنت فايبر.' },
];

const MerchantShowcase: React.FC<MerchantShowcaseProps> = ({ galleryImages, merchantType }) => {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  // Comparison State
  const [compareList, setCompareList] = useState<any[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  
  const isRealEstate = merchantType === 'realestate';
  const items = isRealEstate ? realEstateInventory : carInventory;

  const description = isRealEstate
    ? "نقدم لكم مجموعة متميزة من الوحدات السكنية والتجارية في أرقى المناطق. نتميز بالمصداقية في التعامل والالتزام بمواعيد التسليم، مع توفير أنظمة سداد مرنة تناسب الجميع."
    : "أحدث موديلات السيارات الزيرو والمستعملة بحالة الزيرو. نقدم أفضل الأسعار في السوق مع إمكانية التقسيط البنكي والمباشر. جميع سياراتنا مفحوصة ومضمونة.";

  const toggleCompare = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    setCompareList(prev => {
      if (prev.find(i => i.id === item.id)) {
        return prev.filter(i => i.id !== item.id);
      }
      if (prev.length >= 2) {
        // Replace the first one if already 2
        return [prev[1], item];
      }
      return [...prev, item];
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 relative pb-20">
      
      {/* Main Description */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-lg text-gray-900 mb-4">عن الشركة</h3>
        <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
      </div>

      {/* Inventory Grid */}
      <div>
        <h3 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2">
          {isRealEstate ? <Home className="w-6 h-6 text-green-600" /> : <Car className="w-6 h-6 text-red-600" />}
          {isRealEstate ? 'الوحدات المتاحة' : 'السيارات المعروضة'}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((item: any) => {
            const isSelectedForCompare = compareList.find(i => i.id === item.id);
            return (
              <div 
                key={item.id} 
                onClick={() => setSelectedItem(item)}
                className={`group bg-white rounded-2xl border overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer relative
                  ${isSelectedForCompare ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2' : 'border-gray-100'}
                `}
              >
                <div className="h-48 relative overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={item.title} />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white text-xs px-2 py-1 rounded-lg font-bold">
                    {isRealEstate ? item.type : item.year}
                  </div>
                  
                  {/* Compare Checkbox */}
                  <button 
                    onClick={(e) => toggleCompare(e, item)}
                    className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-md transition-all
                      ${isSelectedForCompare ? 'bg-blue-600 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'}
                    `}
                    title="أضف للمقارنة"
                  >
                    <Scale className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">{item.title}</h4>
                  <p className="font-black text-ray-blue text-lg mb-3">{item.price} <span className="text-xs text-gray-500 font-normal">ج.م</span></p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-gray-50 pt-3">
                    {isRealEstate ? (
                      <>
                        <span className="flex items-center gap-1"><Ruler className="w-3 h-3" /> {item.specs.area}</span>
                        <span className="flex items-center gap-1"><Bed className="w-3 h-3" /> {item.specs.rooms} غرف</span>
                      </>
                    ) : (
                      <>
                        <span className="flex items-center gap-1"><Gauge className="w-3 h-3" /> {item.specs.km}</span>
                        <span className="flex items-center gap-1"><Car className="w-3 h-3" /> {item.specs.trans}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Compare Floating Button */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-in slide-in-from-bottom-10 fade-in">
           <div className="bg-gray-900 text-white p-2 pr-6 rounded-full shadow-2xl flex items-center gap-4 border border-gray-700">
              <span className="font-bold text-sm">
                 {compareList.length} عناصر للمقارنة
              </span>
              <div className="flex gap-1">
                {compareList.map(i => (
                   <img key={i.id} src={i.image} className="w-8 h-8 rounded-full object-cover border-2 border-gray-700" />
                ))}
              </div>
              <button 
                onClick={() => setIsCompareModalOpen(true)}
                disabled={compareList.length < 2}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-xs font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                 قارن الآن
              </button>
              <button 
                onClick={() => setCompareList([])}
                className="p-2 hover:bg-gray-800 rounded-full text-gray-400"
              >
                 <X className="w-4 h-4" />
              </button>
           </div>
        </div>
      )}

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setSelectedItem(null)}></div>
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="relative h-64 shrink-0">
              <img src={selectedItem.image} className="w-full h-full object-cover" alt={selectedItem.title} />
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 right-4 bg-ray-blue text-white px-4 py-1.5 rounded-xl font-black shadow-lg text-lg">
                {selectedItem.price} ج.م
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <h2 className="text-2xl font-black text-gray-900 mb-2">{selectedItem.title}</h2>
              <div className="flex gap-2 mb-4">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs font-bold">
                  {isRealEstate ? selectedItem.type : selectedItem.year}
                </span>
                {isRealEstate && <span className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-xs font-bold">مميز</span>}
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                {selectedItem.desc}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {isRealEstate ? (
                  <>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <span className="block text-xs text-gray-500 mb-1">المساحة</span>
                      <span className="font-bold text-gray-800 flex items-center gap-2"><Ruler className="w-4 h-4 text-green-600" /> {selectedItem.specs.area}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <span className="block text-xs text-gray-500 mb-1">الغرف</span>
                      <span className="font-bold text-gray-800 flex items-center gap-2"><Bed className="w-4 h-4 text-green-600" /> {selectedItem.specs.rooms}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <span className="block text-xs text-gray-500 mb-1">الحمامات</span>
                      <span className="font-bold text-gray-800 flex items-center gap-2"><Bath className="w-4 h-4 text-green-600" /> {selectedItem.specs.bath}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <span className="block text-xs text-gray-500 mb-1">المسافة</span>
                      <span className="font-bold text-gray-800 flex items-center gap-2"><Gauge className="w-4 h-4 text-red-600" /> {selectedItem.specs.km}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <span className="block text-xs text-gray-500 mb-1">ناقل الحركة</span>
                      <span className="font-bold text-gray-800 flex items-center gap-2"><Car className="w-4 h-4 text-red-600" /> {selectedItem.specs.trans}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <span className="block text-xs text-gray-500 mb-1">المحرك</span>
                      <span className="font-bold text-gray-800 flex items-center gap-2"><Fuel className="w-4 h-4 text-red-600" /> {selectedItem.specs.engine}</span>
                    </div>
                  </>
                )}
              </div>

              <button 
                onClick={() => setIsContactOpen(true)}
                className="w-full bg-ray-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition shadow-lg flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                أنا مهتم
              </button>
            </div>
          </div>
        </div>
      )}

      <ContactSellerModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
        itemName={selectedItem?.title}
      />

      <SmartCompareModal 
        isOpen={isCompareModalOpen} 
        onClose={() => setIsCompareModalOpen(false)} 
        items={compareList}
        type={merchantType}
        onContact={(item) => { setIsCompareModalOpen(false); setSelectedItem(item); setIsContactOpen(true); }}
      />

    </div>
  );
};

export default MerchantShowcase;
