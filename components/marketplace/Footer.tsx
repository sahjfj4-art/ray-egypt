
import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, Youtube,
  Store, Utensils, Wrench, Shirt, Stethoscope, Pill, Dumbbell, Home, Car, 
  ArrowLeft, ShoppingBag, Building2, Briefcase, HeartPulse, Scissors, ArrowRight, Lock, User
} from 'lucide-react';

interface FooterProps {
  handleSystemSelect: (systemId: string) => void;
  onMerchantSignup?: () => void;
}

const Footer: React.FC<FooterProps> = ({ handleSystemSelect, onMerchantSignup }) => {
  const [showMerchantForm, setShowMerchantForm] = useState(false);
  const [merchantFormData, setMerchantFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    businessType: 'restaurant'
  });
  
  // Grouped Systems Configuration
  const sectors = [
    {
      id: 'commercial',
      title: 'قطاع التجارة والمطاعم',
      icon: Store,
      color: 'blue',
      description: 'حلول ذكية لإدارة المبيعات والمخزون ونقاط البيع.',
      systems: [
        { id: 'retail', label: 'نظام محلات التجزئة', icon: ShoppingBag },
        { id: 'clothing', label: 'نظام محلات الملابس', icon: Shirt },
        { id: 'restaurant', label: 'نظام المطاعم والكافيهات', icon: Utensils },
      ]
    },
    {
      id: 'services',
      title: 'قطاع الخدمات والتشغيل',
      icon: Briefcase,
      color: 'cyan',
      description: 'إدارة العمليات الميدانية، الصيانة، ودورة الغسيل.',
      systems: [
        { id: 'laundry', label: 'نظام المغاسل والدراي كلين', icon: Shirt },
        { id: 'services', label: 'نظام شركات الصيانة', icon: Wrench },
        { id: 'salon', label: 'نظام الصالونات والتجميل', icon: Scissors },
      ]
    },
    {
      id: 'health',
      title: 'قطاع الصحة واللياقة',
      icon: HeartPulse,
      color: 'teal',
      description: 'رعاية متكاملة للمرضى والعملاء وإدارة الملفات.',
      systems: [
        { id: 'clinic', label: 'نظام إدارة العيادات', icon: Stethoscope },
        { id: 'pharmacy', label: 'نظام إدارة الصيدليات', icon: Pill },
        { id: 'gym', label: 'نظام الجيم والصالات', icon: Dumbbell },
      ]
    },
    {
      id: 'assets',
      title: 'قطاع الأصول والعقارات',
      icon: Building2,
      color: 'green',
      description: 'تسويق وإدارة الأصول عالية القيمة بكفاءة.',
      systems: [
        { id: 'realestate', label: 'نظام إدارة العقارات', icon: Home },
        { id: 'cars', label: 'نظام معارض السيارات', icon: Car },
      ]
    }
  ];

  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200',
    cyan: 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100 border-cyan-200',
    teal: 'bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-200',
    green: 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200',
  };

  const handleMerchantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Merchant signup:', merchantFormData);
    alert('شكراً لتسجيلك! سيتم التواصل معك قريباً');
    setShowMerchantForm(false);
    setMerchantFormData({
      businessName: '',
      ownerName: '',
      email: '',
      phone: '',
      businessType: 'restaurant'
    });
    onMerchantSignup?.();
  };

  return (
    <footer className="bg-gray-100 pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-4">أنظمة راي المتخصصة</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">اختر النظام المناسب لنشاطك التجاري وابدأ في إدارة أعمالك باحترافية</p>
        </div>

        {/* Main Solution Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {sectors.map((sector) => (
            <div key={sector.id} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
               <div className="flex items-start gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colors[sector.color].split(' ')[0]} ${colors[sector.color].split(' ')[1]}`}>
                    <sector.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{sector.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{sector.description}</p>
                  </div>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sector.systems.map((system) => (
                    <button 
                      key={system.id}
                      onClick={() => handleSystemSelect(system.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all group text-right ${colors[sector.color]}`}
                    >
                      <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition">
                         <system.icon className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-sm flex-1">{system.label}</span>
                      <ArrowLeft className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
               </div>
            </div>
          ))}
        </div>

        {/* Merchant Registration CTA Section */}
        <div className="mb-16 bg-gradient-to-r from-ray-gold/10 to-yellow-100 rounded-3xl p-8 md:p-12 border-2 border-ray-gold/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-right">
              <div className="inline-flex items-center gap-2 bg-ray-gold/20 px-4 py-2 rounded-full text-sm font-bold text-ray-gold mb-4 border border-ray-gold/30">
                <Store className="w-4 h-4" />
                للتجار والمتاجر
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-ray-black mb-3">هل تمتلك متجراً أو محلاً تجارياً؟</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                انضم إلى آلاف التجار الناجحين على منصة راي واستفد من أنظمتنا المتقدمة لإدارة أعمالك بكفاءة عالية.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-ray-gold font-bold">✓</span>
                  <span>إدارة متكاملة للمبيعات والمخزون</span>
                </li>
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-ray-gold font-bold">✓</span>
                  <span>تقارير مفصلة وتحليلات فورية</span>
                </li>
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-ray-gold font-bold">✓</span>
                  <span>دعم فني 24/7 وتدريب مجاني</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => setShowMerchantForm(true)}
              className="bg-ray-gold text-ray-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-400 transition shadow-lg flex items-center gap-2 group w-full md:w-auto justify-center whitespace-nowrap"
            >
              <Store className="w-5 h-5" />
              تسجيل متجري
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Merchant Registration Modal */}
        {showMerchantForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
              {/* Close Button */}
              <button 
                onClick={() => setShowMerchantForm(false)}
                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition text-gray-500"
              >
                ✕
              </button>

              {/* Header */}
              <div className="px-8 pt-8 pb-6 text-center bg-gradient-to-b from-yellow-50 to-white">
                <div className="w-12 h-12 bg-gradient-to-br from-ray-gold to-yellow-600 rounded-xl flex items-center justify-center shadow-lg text-ray-black font-black text-2xl mx-auto mb-4">
                  S
                </div>
                <h2 className="text-2xl font-black text-ray-black mb-1">تسجيل متجرك</h2>
                <p className="text-gray-500 text-sm">انضم إلى منصة راي وابدأ رحلة النجاح</p>
              </div>

              {/* Form */}
              <form onSubmit={handleMerchantSubmit} className="px-8 pb-8 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">اسم المتجر</label>
                  <div className="relative">
                    <Store className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      required
                      value={merchantFormData.businessName}
                      onChange={(e) => setMerchantFormData({...merchantFormData, businessName: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-ray-gold focus:ring-1 focus:ring-ray-gold transition"
                      placeholder="اسم متجرك"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">اسم المالك</label>
                  <div className="relative">
                    <User className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      required
                      value={merchantFormData.ownerName}
                      onChange={(e) => setMerchantFormData({...merchantFormData, ownerName: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-ray-gold focus:ring-1 focus:ring-ray-gold transition"
                      placeholder="اسمك الكامل"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">البريد الإلكتروني</label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    <input 
                      type="email" 
                      required
                      value={merchantFormData.email}
                      onChange={(e) => setMerchantFormData({...merchantFormData, email: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-ray-gold focus:ring-1 focus:ring-ray-gold transition"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">رقم الهاتف</label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    <input 
                      type="tel" 
                      required
                      value={merchantFormData.phone}
                      onChange={(e) => setMerchantFormData({...merchantFormData, phone: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-ray-gold focus:ring-1 focus:ring-ray-gold transition"
                      placeholder="01234567890"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">نوع النشاط</label>
                  <select 
                    value={merchantFormData.businessType}
                    onChange={(e) => setMerchantFormData({...merchantFormData, businessType: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 focus:outline-none focus:border-ray-gold focus:ring-1 focus:ring-ray-gold transition"
                  >
                    <option value="restaurant">مطعم / كافيه</option>
                    <option value="retail">متجر تجزئة</option>
                    <option value="clothing">محل ملابس</option>
                    <option value="clinic">عيادة</option>
                    <option value="pharmacy">صيدلية</option>
                    <option value="gym">نادي رياضي</option>
                    <option value="salon">صالون تجميل</option>
                    <option value="services">خدمات صيانة</option>
                    <option value="laundry">مغسلة</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-ray-gold text-ray-black py-3.5 rounded-xl font-bold text-lg shadow-lg hover:bg-yellow-400 transition-all flex items-center justify-center gap-2"
                >
                  <Store className="w-5 h-5" />
                  تسجيل متجري الآن
                </button>

                <p className="text-xs text-gray-500 text-center">
                  بالتسجيل، أنت توافق على شروط الخدمة وسياسة الخصوصية
                </p>
              </form>
            </div>
          </div>
        )}

        {/* Traditional Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 pt-12 border-t border-gray-200">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-ray-blue text-ray-gold rounded-lg flex items-center justify-center font-black text-xl shadow-md">R</div>
              <span className="text-2xl font-black text-ray-blue">RAY</span>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm">
              راي هي المنصة الرقمية الشاملة التي تهدف لتمكين التجار وتسهيل حياة العملاء في مصر.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, idx) => (
                <a key={idx} href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:bg-ray-blue hover:text-white transition shadow-sm border border-gray-100">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-bold text-ray-black mb-4">عن راي</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-ray-blue transition">من نحن</a></li>
              <li><a href="#" className="hover:text-ray-blue transition">الوظائف</a></li>
              <li><a href="#" className="hover:text-ray-blue transition">المدونة</a></li>
              <li><a href="#" className="hover:text-ray-blue transition">شركاء النجاح</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-bold text-ray-black mb-4">الدعم والمساعدة</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-ray-blue transition">مركز المساعدة</a></li>
              <li><a href="#" className="hover:text-ray-blue transition">الشروط والأحكام</a></li>
              <li><a href="#" className="hover:text-ray-blue transition">سياسة الخصوصية</a></li>
              <li><a href="#" className="hover:text-ray-blue transition">تواصل معنا</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-bold text-ray-black mb-4">اتصل بنا</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-ray-gold" />
                <span className="font-bold dir-ltr">16XXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-ray-gold" />
                <span>info@ray.app</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-ray-gold" />
                <span>القاهرة، التجمع الخامس</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">© 2025 RAY. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4 text-xs text-gray-400 font-mono">
             v2.5.0 (Beta)
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
