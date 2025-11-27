
import React from 'react';
import { Heart, Trash2, Utensils, Car, Home, Package, MapPin } from 'lucide-react';

const FavoritesView: React.FC = () => {
  const items = [
    { id: 1, type: 'food', name: 'مطعم النور', location: 'المعادي', rating: 4.8, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400' },
    { id: 2, type: 'car', name: 'Mercedes C180', location: 'أوتو ستار', rating: 'جديد', image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400' },
    { id: 3, type: 'realestate', name: 'فيلا بالتجمع', location: 'حي اللوتس', rating: 'للبيع', image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400' },
    { id: 4, type: 'product', name: 'ساعة Apple Watch', location: 'بي تك', rating: 4.9, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4">
      <h2 className="text-3xl font-black text-ray-black mb-8 flex items-center gap-2">
        <Heart className="w-8 h-8 text-red-500 fill-current" />
        المفضلة
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="h-48 relative">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <button className="absolute top-3 right-3 p-2 bg-white rounded-full text-red-500 hover:bg-red-50 transition shadow-sm">
                <Trash2 className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1 font-bold">
                {item.type === 'food' ? <Utensils className="w-3 h-3" /> : item.type === 'car' ? <Car className="w-3 h-3" /> : item.type === 'realestate' ? <Home className="w-3 h-3" /> : <Package className="w-3 h-3" />}
                {item.type === 'food' ? 'مطعم' : item.type === 'car' ? 'سيارة' : item.type === 'realestate' ? 'عقار' : 'منتج'}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-ray-black mb-1 text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 mb-3 font-medium">
                <MapPin className="w-3 h-3" /> {item.location}
              </p>
              <button className="w-full py-2 bg-gray-50 text-gray-700 rounded-lg font-bold text-sm hover:bg-ray-blue hover:text-white transition">
                عرض التفاصيل
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesView;
