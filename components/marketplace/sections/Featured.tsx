
import React, { useState } from 'react';
import { Heart, Store, Star, ShoppingCart } from 'lucide-react';
import { featuredOffers } from '../data';
import OfferModal from '../modals/OfferModal';

const Featured: React.FC = () => {
  const [selectedOffer, setSelectedOffer] = useState<any | null>(null);

  return (
    <section className="bg-white dark:bg-gray-900 py-16 border-y border-gray-100 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
           <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">🔥 عروض مميزة وحصرية</h2>
           <div className="flex gap-2">
             <button className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition">←</button>
             <button className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition">→</button>
           </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredOffers.map((offer) => (
            <div 
              key={offer.id} 
              onClick={() => setSelectedOffer(offer)}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={offer.image} alt={offer.title} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/60 backdrop-blur-sm p-2 rounded-full shadow-sm hover:text-red-500 transition z-10 text-gray-600 dark:text-gray-300">
                  <Heart className="w-4 h-4" />
                </div>
                {offer.tag && (
                  <div className="absolute top-3 left-3 bg-ray-gold text-ray-black text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
                    {offer.tag}
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-bold flex items-center gap-1">
                    <Store className="w-3 h-3" />
                    {offer.shop}
                  </span>
                  <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/30 px-1.5 py-0.5 rounded text-yellow-700 dark:text-yellow-400 text-xs font-bold">
                    <Star className="w-3 h-3 fill-current mr-1" />
                    {offer.rating}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-ray-blue dark:group-hover:text-ray-gold transition">{offer.title}</h3>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50 dark:border-gray-700">
                  <div className="flex flex-col">
                    <span className="text-lg font-black text-ray-blue dark:text-ray-gold">{offer.price}</span>
                    {offer.oldPrice && <span className="text-xs text-gray-400 line-through decoration-red-400">{offer.oldPrice}</span>}
                  </div>
                  <button className="bg-ray-black dark:bg-white text-white dark:text-ray-black p-2.5 rounded-xl hover:bg-ray-gold dark:hover:bg-ray-gold hover:text-ray-black transition shadow-md">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <OfferModal 
        isOpen={!!selectedOffer} 
        onClose={() => setSelectedOffer(null)} 
        offer={selectedOffer} 
      />
    </section>
  );
};

export default Featured;
