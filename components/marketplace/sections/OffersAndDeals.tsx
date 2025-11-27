import React, { useState } from 'react';
import { 
  Gift, Search, Filter, Star, MapPin, Clock, Zap, TrendingUp,
  ChevronRight, Heart, Share2, ShoppingCart
} from 'lucide-react';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  originalPrice: number;
  finalPrice: number;
  businessName: string;
  businessCategory: string;
  image: string;
  rating: number;
  reviews: number;
  distance: string;
  expiresIn: string;
  badge?: string;
  businessId: string;
}

const initialOffers: Offer[] = [
  {
    id: 'OFF-001',
    title: 'برجر مشوي مع بطاطس',
    description: 'برجر لحم طازج مع بطاطس مقلية وصلصة خاصة',
    discount: 30,
    originalPrice: 120,
    finalPrice: 84,
    businessName: 'مطعم الدار الذهبية',
    businessCategory: 'مطاعم',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    rating: 4.8,
    reviews: 245,
    distance: '2.5 كم',
    expiresIn: 'ينتهي غداً',
    badge: 'مشهور',
    businessId: 'BUS-001'
  },
  {
    id: 'OFF-002',
    title: 'فستان صيفي أنيق',
    description: 'فستان قطن 100% مريح وأنيق للصيف',
    discount: 50,
    originalPrice: 500,
    finalPrice: 250,
    businessName: 'متجر الملابس الحديثة',
    businessCategory: 'ملابس',
    image: 'https://images.unsplash.com/photo-1595777707802-41d339d60280?w=400',
    rating: 4.6,
    reviews: 189,
    distance: '1.2 كم',
    expiresIn: 'ينتهي خلال 3 أيام',
    badge: 'جديد',
    businessId: 'BUS-002'
  },
  {
    id: 'OFF-003',
    title: 'جلسة تنظيف أسنان كاملة',
    description: 'تنظيف احترافي مع فحص شامل',
    discount: 40,
    originalPrice: 300,
    finalPrice: 180,
    businessName: 'عيادة الأسنان المتقدمة',
    businessCategory: 'صحة',
    image: 'https://images.unsplash.com/photo-1606811841689-23db3c3298c0?w=400',
    rating: 4.9,
    reviews: 312,
    distance: '3.8 كم',
    expiresIn: 'ينتهي خلال أسبوع',
    badge: 'موثوق',
    businessId: 'BUS-003'
  },
  {
    id: 'OFF-004',
    title: 'قهوة إسبريسو مزدوجة',
    description: 'قهوة عالية الجودة مع كريمة طازة',
    discount: 25,
    originalPrice: 80,
    finalPrice: 60,
    businessName: 'كافيه الحي الراقي',
    businessCategory: 'مقاهي',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=400',
    rating: 4.7,
    reviews: 456,
    distance: '0.8 كم',
    expiresIn: 'ينتهي اليوم',
    badge: 'عاجل',
    businessId: 'BUS-004'
  },
  {
    id: 'OFF-005',
    title: 'حقيبة جلد أصلية',
    description: 'حقيبة يد من جلد طبيعي 100%',
    discount: 35,
    originalPrice: 800,
    finalPrice: 520,
    businessName: 'متجر الحقائب الفاخرة',
    businessCategory: 'إكسسوارات',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400',
    rating: 4.5,
    reviews: 128,
    distance: '2.1 كم',
    expiresIn: 'ينتهي خلال يومين',
    businessId: 'BUS-005'
  },
  {
    id: 'OFF-006',
    title: 'جلسة تدليك استرخائية',
    description: 'تدليك كامل الجسم بزيوت طبيعية',
    discount: 45,
    originalPrice: 400,
    finalPrice: 220,
    businessName: 'منتجع الاسترخاء',
    businessCategory: 'جمال',
    image: 'https://images.unsplash.com/photo-1544161515-81205f8abecc?w=400',
    rating: 4.8,
    reviews: 267,
    distance: '4.5 كم',
    expiresIn: 'ينتهي خلال 5 أيام',
    badge: 'مميز',
    businessId: 'BUS-006'
  }
];

interface OffersAndDealsProps {
  onMerchantSelect: (merchant: any) => void;
}

const OffersAndDeals: React.FC<OffersAndDealsProps> = ({ onMerchantSelect }) => {
  const [offers, setOffers] = useState(initialOffers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = ['all', 'مطاعم', 'ملابس', 'صحة', 'مقاهي', 'إكسسوارات', 'جمال'];

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.businessName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || offer.businessCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (offerId: string) => {
    setFavorites(prev => 
      prev.includes(offerId) ? prev.filter(id => id !== offerId) : [...prev, offerId]
    );
  };

  const handleMerchantClick = (offer: Offer) => {
    onMerchantSelect({
      id: offer.businessId,
      name: offer.businessName,
      category: offer.businessCategory,
      image: offer.image,
      rating: offer.rating,
      reviews: offer.reviews
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 md:mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Gift className="w-6 md:w-8 h-6 md:h-8 text-red-600" />
              <span>العروض والخصومات</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base">اكتشف أفضل العروض من المحلات المختلفة</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm font-bold text-ray-gold">
            <TrendingUp className="w-5 h-5" />
            <span>أكثر 50 عرض</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="relative w-full">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="ابحث عن عرض أو محل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {cat === 'all' ? 'كل العروض' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredOffers.map((offer) => (
          <div
            key={offer.id}
            className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden h-40 md:h-48 bg-gray-100 dark:bg-gray-700">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              
              {/* Discount Badge */}
              <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm md:text-base font-bold shadow-lg">
                -{offer.discount}%
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs md:text-sm font-bold">
                {offer.businessCategory}
              </div>

              {/* Special Badge */}
              {offer.badge && (
                <div className="absolute bottom-3 left-3 bg-yellow-500 text-gray-900 px-2 py-1 rounded text-xs font-bold">
                  {offer.badge}
                </div>
              )}

              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(offer.id)}
                className="absolute bottom-3 right-3 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorites.includes(offer.id)
                      ? 'fill-red-600 text-red-600'
                      : 'text-gray-400'
                  }`}
                />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 md:p-5 flex flex-col flex-1">
              {/* Title */}
              <h3 className="font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 text-sm md:text-base">
                {offer.title}
              </h3>

              {/* Description */}
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {offer.description}
              </p>

              {/* Business Info */}
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100 dark:border-gray-700">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 dark:text-white text-xs md:text-sm truncate">
                    {offer.businessName}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <MapPin className="w-3 h-3" />
                    <span>{offer.distance}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded">
                  <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                  <span className="text-xs font-bold text-gray-900 dark:text-white">{offer.rating}</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-500 line-through">{offer.originalPrice} ج</p>
                  <p className="text-lg md:text-xl font-bold text-red-600">{offer.finalPrice} ج</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3" />
                    {offer.expiresIn}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleMerchantClick(offer)}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 md:py-3 rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base group/btn"
              >
                <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                <span>اطلب الآن</span>
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredOffers.length === 0 && (
        <div className="text-center py-12">
          <Gift className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg font-bold">لا توجد عروض متطابقة</p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">جرب البحث عن شيء آخر</p>
        </div>
      )}
    </section>
  );
};

export default OffersAndDeals;
