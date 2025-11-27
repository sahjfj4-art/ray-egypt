
import React from 'react';
import { Heart, Store, Star, ShoppingCart } from 'lucide-react';
import { featuredOffers } from './data';

const Featured: React.FC = () => {
  return (
    <section className="bg-white py-16 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
           <h2 className="text-2xl md:text-3xl font-bold text-gray-900">🔥 عروض مميزة وحصرية</h2>
           <div className="flex gap-2">
             <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">←</button>
             <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">→</button>
           </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredOffers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img src={offer.image} alt={offer.title} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:text-red-500 transition z-10">
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
                  <span className="text-xs text-gray-500 font-bold flex items-center gap-1">
                    <Store className="w-3 h-3" />
                    {offer.shop}
                  </span>
                  <div className="flex items-center bg-yellow-50 px-1.5 py-0.5 rounded text-yellow-700 text-xs font-bold">
                    <Star className="w-3 h-3 fill-current mr-1" />
                    {offer.rating}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-ray-blue transition">{offer.title}</h3>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-lg font-black text-ray-blue">{offer.price}</span>
                    {offer.oldPrice && <span className="text-xs text-gray-400 line-through decoration-red-400">{offer.oldPrice}</span>}
                  </div>
                  <button className="bg-ray-black text-white p-2.5 rounded-xl hover:bg-ray-gold hover:text-ray-black transition shadow-md">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
