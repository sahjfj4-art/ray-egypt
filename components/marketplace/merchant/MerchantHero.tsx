
import React from 'react';
import { ArrowRight, Share2, Heart, ShieldCheck, Star, Clock, MapPin } from 'lucide-react';

interface MerchantHeroProps {
  merchant: any;
  onBack: () => void;
  isFavorite: boolean;
  toggleFavorite: () => void;
  handleShare: () => void;
  showShareToast: boolean;
  customConfig?: any; // Added for Storefront Builder Preview
}

const MerchantHero: React.FC<MerchantHeroProps> = ({ 
  merchant, onBack, isFavorite, toggleFavorite, handleShare, showShareToast, customConfig
}) => {
  // Use custom config if available (for preview), otherwise fallback to merchant data
  const heroImage = customConfig?.coverImage || "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&q=80";
  const logoImage = customConfig?.logo || merchant.image;
  const name = customConfig?.name || merchant.name;
  
  // Determine colors based on config or default
  const colorMap: Record<string, string> = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    orange: 'text-orange-600',
    purple: 'text-purple-600',
    black: 'text-gray-900',
  };
  const accentColor = customConfig ? colorMap[customConfig.primaryColor] : 'text-blue-600';

  return (
    <>
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm px-4 h-16 flex items-center justify-between transition-all">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition">
            <ArrowRight className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-gray-800 text-lg truncate max-w-[200px]">{name}</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={handleShare} className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition relative">
            <Share2 className="w-5 h-5" />
            {showShareToast && <div className="absolute top-full right-0 mt-2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap">تم النسخ</div>}
          </button>
          <button onClick={toggleFavorite} className={`p-2 rounded-full hover:bg-gray-100 transition ${isFavorite ? 'text-red-500' : 'text-gray-600'}`}>
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-white pb-6">
        <div className="h-40 md:h-60 w-full bg-gray-200 overflow-hidden">
          <img src={heroImage} className="w-full h-full object-cover opacity-90" alt="Cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        
        <div className="px-4 max-w-4xl mx-auto relative -mt-16 flex flex-col items-center text-center">
          <div className="w-28 h-28 bg-white rounded-3xl p-1.5 shadow-xl mb-3 rotate-3 hover:rotate-0 transition duration-500">
            <img src={logoImage} alt={name} className="w-full h-full rounded-2xl object-cover border border-gray-100" />
          </div>
          
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-black text-gray-900">{name}</h1>
            <div className="bg-blue-100 text-blue-700 p-1 rounded-full" title="موثق">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          
          <p className="text-gray-500 text-sm max-w-md mb-4">{merchant.type || 'نشاط تجاري'} • {merchant.location || 'القاهرة'}</p>
          
          <div className="flex items-center gap-6 text-sm bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-bold text-gray-900">{merchant.rating}</span>
              <span className="text-gray-400 text-xs">({merchant.reviews})</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-green-600" />
              <span className="font-bold text-green-600">مفتوح الآن</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-1.5">
              <MapPin className={`w-4 h-4 ${accentColor}`} />
              <span className="font-bold text-gray-600">2.5 كم</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MerchantHero;
