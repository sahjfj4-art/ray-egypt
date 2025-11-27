import React, { useState } from 'react';
import { 
  Globe, ArrowRight, CheckCircle, Users, TrendingUp, 
  Shield, Zap, BarChart3, Calendar, ShoppingCart, 
  Wrench, Heart, Car, Home, Store, Briefcase,
  Search, Filter, Star, Clock, MapPin, Phone
} from 'lucide-react';
import { systemsData } from '../data';
import SystemsHeader from './SystemsHeader';
import SystemsFooter from './SystemsFooter';

// تقسيم الأنظمة حسب وظيفتها
const systemCategories = [
  {
    id: 'bookings',
    title: 'أنظمة الحجوزات والمواعيد',
    description: 'أنظمة متخصصة لإدارة الحجوزات والمواعيد للعملاء',
    icon: Calendar,
    color: 'from-blue-500 to-cyan-500',
    systems: ['salon', 'clinic', 'gym', 'restaurant']
  },
  {
    id: 'sales',
    title: 'أنظمة المبيعات والمتاجر',
    description: 'حلول متكاملة للمبيعات والمخزون ونقاط البيع',
    icon: ShoppingCart,
    color: 'from-green-500 to-emerald-500',
    systems: ['retail', 'clothing', 'cars', 'restaurant']
  },
  {
    id: 'services',
    title: 'أنظمة الخدمات والصيانة',
    description: 'إدارة الخدمات الميدانية والصيانة والفنيين',
    icon: Wrench,
    color: 'from-orange-500 to-red-500',
    systems: ['services', 'plumbing', 'electrical', 'painting']
  },
  {
    id: 'rentals',
    title: 'أنظمة الإيجارات والعقارات',
    description: 'حلول ذكية لإدارة العقارات والوحدات السكنية',
    icon: Home,
    color: 'from-purple-500 to-pink-500',
    systems: ['realestate', 'contracting']
  },
  {
    id: 'logistics',
    title: 'أنظمة الخدمات اللوجستية',
    description: 'إدارة الشحن والتوصيل والخدمات المتنقلة',
    icon: Car,
    color: 'from-indigo-500 to-blue-500',
    systems: ['logistics', 'laundry', 'mobileLaundry']
  },
  {
    id: 'professional',
    title: 'أنظمة المهن والحرف',
    description: 'حلول متخصصة للمهن والحرف المختلفة',
    icon: Briefcase,
    color: 'from-yellow-500 to-orange-500',
    systems: ['hardware', 'agriculture', 'construction']
  }
];

interface AllSystemsShowcaseProps {
  onSystemSelect: (systemId: string) => void;
}

const AllSystemsShowcase: React.FC<AllSystemsShowcaseProps> = ({ onSystemSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // تصفية الأنظمة حسب البحث والتصنيف
  const getFilteredSystems = (categorySystems: string[]) => {
    return categorySystems.filter(systemId => {
      const system = systemsData[systemId];
      if (!system) return false;
      
      const matchesSearch = system.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           system.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  };

  const handleSystemClick = (systemId: string) => {
    onSystemSelect(systemId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors flex flex-col">
      {/* Header */}
      <SystemsHeader onNavigateHome={() => window.location.reload()} />
      
      {/* Main Content */}
      <div className="flex-1">
        
        {/* Hero Section - Introduction to Ray */}
        <div className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold mb-6 border border-white/30">
              <Globe className="w-4 h-4" />
              منصة راي المتكاملة
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              حلول ذكية لـ <span className="text-yellow-300">كل نشاط تجاري</span>
            </h1>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed">
              منصة راي تساعد أصحاب الأنشطة التجارية على إدارة أعمالهم بسهولة وفعالية. 
              من خلال أنظمة متخصصة مصممة خصيصاً لكل نوع من الأعمال، نوفر لك الأدوات اللازمة للنجاح.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Shield className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">آمن وموثوق</h3>
                <p className="text-blue-100">بياناتك محمية مع خوادم آمنة 24/7</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Zap className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">سريع وسهل</h3>
                <p className="text-blue-100">تثبيت فوري وواجهة بسيطة لا تحتاج تدريب</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Users className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">دعم فني كامل</h3>
                <p className="text-blue-100">فريق مصري جاهز لمساعدتك في أي وقت</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm font-bold">
              <span className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-400/30">
                <CheckCircle className="w-4 h-4" />
                بدون رسوم اشتراك
              </span>
              <span className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full border border-blue-400/30">
                <CheckCircle className="w-4 h-4" />
                يعمل بدون إنترنت
              </span>
              <span className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full border border-purple-400/30">
                <CheckCircle className="w-4 h-4" />
                تحديثات مجانية مدى الحياة
              </span>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="sticky top-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 z-30 py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ابحث عن نظامك..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-xl font-bold transition ${
                  !selectedCategory 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                الكل
              </button>
              {systemCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl font-bold transition ${
                    selectedCategory === cat.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Categories and Systems */}
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-16">
            {systemCategories
              .filter(cat => !selectedCategory || cat.id === selectedCategory)
              .map(category => {
                const filteredSystems = getFilteredSystems(category.systems);
                
                if (filteredSystems.length === 0) return null;

                return (
                  <div key={category.id} className="space-y-8">
                    {/* Category Header */}
                    <div className="text-center">
                      <div className={`inline-flex items-center gap-3 bg-gradient-to-r ${category.color} text-white px-6 py-3 rounded-2xl font-bold text-lg mb-4`}>
                        <category.icon className="w-6 h-6" />
                        {category.title}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {category.description}
                      </p>
                    </div>

                    {/* Systems Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredSystems.map(systemId => {
                        const system = systemsData[systemId];
                        if (!system) return null;

                        return (
                          <div
                            key={systemId}
                            onClick={() => handleSystemClick(systemId)}
                            className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-2xl hover:border-blue-500 transition-all duration-300 cursor-pointer transform hover:scale-105"
                          >
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${system.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition`}>
                              <system.icon className="w-8 h-8" />
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                              {system.title}
                            </h3>
                            
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                              {system.description}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm text-gray-500">(4.8)</span>
                              </div>
                              
                              <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm group-hover:gap-3 transition">
                                ابدأ الآن
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-black text-white mb-6">لم تجد نظامك؟</h2>
            <p className="text-xl text-blue-100 mb-8">
              يمكننا تصميم نظام مخصص لعملك. تواصل معنا الآن!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                اتصل بنا
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                <MapPin className="w-5 h-5" />
                زيارة المكتب
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <SystemsFooter />
    </div>
  );
};

export default AllSystemsShowcase;
