import React, { useState } from 'react';
import { 
  Store, Utensils, Home, Car, Stethoscope, Dumbbell, 
  Wrench, Shirt, ShoppingBag, Scissors, Pill, Briefcase, 
  ArrowLeft, CheckCircle, LayoutDashboard, ShieldCheck,
  HardHat, ChevronRight, Sparkles, TrendingUp, Users, Zap
} from 'lucide-react';
import { systemsData } from '../data';

interface SystemsHubProps {
  onSystemSelect: (systemId: string) => void;
}

const SystemsHub: React.FC<SystemsHubProps> = ({ onSystemSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const systems = [
    {
      category: "التجارة والمطاعم",
      icon: ShoppingBag,
      items: [
        { id: 'restaurant', title: 'إدارة المطاعم (POS)', icon: Utensils, desc: 'كاشير، مطبخ، ومخزون', color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' },
        { id: 'retail', title: 'إدارة التجزئة', icon: Store, desc: 'سوبر ماركت ومحلات', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
        { id: 'clothing', title: 'محلات الملابس', icon: Shirt, desc: 'مقاسات وألوان', color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400' },
      ]
    },
    {
      category: "الصحة والجمال",
      icon: Sparkles,
      items: [
        { id: 'clinic', title: 'إدارة العيادات', icon: Stethoscope, desc: 'حجوزات وروشتات', color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400' },
        { id: 'pharmacy', title: 'إدارة الصيدليات', icon: Pill, desc: 'أدوية ونواقص', color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
        { id: 'salon', title: 'الصالونات', icon: Scissors, desc: 'مواعيد وخدمات', color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
        { id: 'gym', title: 'الجيم واللياقة', icon: Dumbbell, desc: 'اشتراكات ودخول', color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' },
      ]
    },
    {
      category: "الخدمات والأصول",
      icon: Wrench,
      items: [
        { id: 'realestate', title: 'إدارة العقارات', icon: Home, desc: 'بيع وإيجار', color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' },
        { id: 'cars', title: 'معارض السيارات', icon: Car, desc: 'بيع وصيانة', color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' },
        { id: 'services', title: 'شركات الصيانة', icon: Wrench, desc: 'أوامر شغل وفنيين', color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' },
        { id: 'laundry', title: 'المغاسل', icon: Briefcase, desc: 'استلام وتسليم', color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400' },
      ]
    }
  ];

  if (selectedCategory) {
    const category = systems.find(s => s.category === selectedCategory);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 animate-in fade-in slide-in-from-bottom-4 pb-20 transition-colors">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white py-12 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <button 
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-bold">العودة للأقسام</span>
            </button>
            <h1 className="text-3xl md:text-5xl font-black mb-4">{selectedCategory}</h1>
            <p className="text-blue-100 text-lg">اختر النشاط المحدد الذي تعمل فيه</p>
          </div>
        </div>

        {/* Systems Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category?.items.map((sys) => (
              <button 
                key={sys.id}
                onClick={() => onSystemSelect(sys.id)}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group text-right flex flex-col h-full overflow-hidden relative"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${sys.color} group-hover:scale-110 transition-transform`}>
                  <sys.icon className="w-8 h-8" />
                </div>
                
                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition line-clamp-2">{sys.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-1 line-clamp-3">{sys.desc}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">متخصص</span>
                  <div className="flex items-center gap-1 text-sm font-bold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    ابدأ <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 animate-in fade-in slide-in-from-bottom-4 pb-20 transition-colors">
      
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-black dark:via-gray-900 dark:to-black text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-ray-gold font-bold mb-6 border border-white/20">
            <Zap className="w-4 h-4" />
            منصة راي للأعمال
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            اختر نشاطك.. <span className="text-transparent bg-clip-text bg-gradient-to-r from-ray-gold via-yellow-400 to-orange-400">وابدأ الآن</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            أكثر من 15 نظام متخصص لكل أنواع الأعمال. اختر القسم الخاص بك ثم النشاط المحدد، وستحصل على لوحة تحكم كاملة مجاناً.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm font-bold">
            <span className="flex items-center gap-2 text-green-400"><CheckCircle className="w-5 h-5" /> مجاني تماماً</span>
            <span className="flex items-center gap-2 text-green-400"><CheckCircle className="w-5 h-5" /> بدون رسوم مخفية</span>
            <span className="flex items-center gap-2 text-green-400"><CheckCircle className="w-5 h-5" /> دعم فني 24/7</span>
            <span className="flex items-center gap-2 text-green-400"><CheckCircle className="w-5 h-5" /> تفعيل فوري</span>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systems.map((section, idx) => (
            <button 
              key={idx}
              onClick={() => setSelectedCategory(section.category)}
              className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group text-right flex flex-col h-full overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              
              <div className="flex items-start justify-between mb-6">
                <div className="text-3xl">📊</div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">{section.items.length} أنظمة</span>
              </div>
              
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">{section.category}</h3>
              
              <div className="flex flex-wrap gap-2 mb-6 flex-1">
                {section.items.slice(0, 3).map((item) => (
                  <span key={item.id} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-lg">
                    {item.title.split(' ')[0]}
                  </span>
                ))}
                {section.items.length > 3 && (
                  <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-lg">
                    +{section.items.length - 3}
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
                <TrendingUp className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition" />
                <div className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  استكشف <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-gray-900 py-16 px-4 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-12 text-center">لماذا تختار راي؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-100 dark:border-green-800">
              <CheckCircle className="w-8 h-8 text-green-600 mb-4" />
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">مجاني تماماً</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">بدون رسوم اشتراك أو رسوم مخفية</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
              <Zap className="w-8 h-8 text-blue-600 mb-4" />
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">تفعيل فوري</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">ابدأ في دقائق بدون معقدات</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-100 dark:border-purple-800">
              <Users className="w-8 h-8 text-purple-600 mb-4" />
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">دعم 24/7</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">فريق مصري جاهز لمساعدتك</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl border border-orange-100 dark:border-orange-800">
              <ShieldCheck className="w-8 h-8 text-orange-600 mb-4" />
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">آمان وخصوصية</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">بياناتك محمية بأعلى المعايير</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SystemsHub;