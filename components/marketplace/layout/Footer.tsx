
import React from 'react';
import { 
  Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, Youtube,
  ArrowLeft, Building2, Store
} from 'lucide-react';

interface FooterProps {
  handleSystemSelect: (systemId: string) => void;
  onNavigate?: (view: string) => void;
}

const Footer: React.FC<FooterProps> = ({ handleSystemSelect, onNavigate }) => {
  
  const handleLinkClick = (view: string) => {
    if (onNavigate) {
      onNavigate(view);
    }
  };

  return (
    <footer className="bg-white dark:bg-gray-900 pt-16 border-t border-gray-200 dark:border-gray-800 transition-colors">
      
      {/* RAY Business CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gray-900 dark:bg-black rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl dark:shadow-none border border-gray-800">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="relative z-10 max-w-xl text-center md:text-right">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-ray-gold mb-4 border border-white/10">
                <Building2 className="w-4 h-4" />
                لأصحاب الأعمال والشركات
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">هل تمتلك نشاطاً تجارياً؟</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                اكتشف مجموعة أنظمة راي المتكاملة (ERP & POS) لإدارة المطاعم، المحلات، العقارات، والخدمات. انضم لأكثر من 10,000 تاجر ناجح.
              </p>
           </div>
           <div className="relative z-10">
              <button 
                onClick={() => onNavigate && onNavigate('all-systems')}
                className="bg-ray-gold text-ray-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition shadow-lg flex items-center gap-2 group w-full md:w-auto justify-center"
              >
                <Store className="w-5 h-5" />
                استكشف أنظمة راي
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </button>
           </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-950 pt-16 pb-8 border-t border-gray-200 dark:border-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 text-center md:text-right">
            
            {/* Brand Column */}
            <div className="space-y-6 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-ray-blue dark:bg-ray-gold text-ray-gold dark:text-ray-blue rounded-lg flex items-center justify-center font-black text-xl shadow-md">R</div>
                <span className="text-2xl font-black text-ray-blue dark:text-white">RAY</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                راي هي المنصة الرقمية الشاملة التي تهدف لتمكين التجار وتسهيل حياة العملاء في مصر.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, idx) => (
                  <a key={idx} href="#" className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-ray-blue dark:hover:bg-ray-gold hover:text-white dark:hover:text-ray-black transition shadow-sm border border-gray-100 dark:border-gray-700">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Column 1 */}
            <div>
              <h4 className="font-bold text-ray-black dark:text-white mb-4">عن راي</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><button onClick={() => handleLinkClick('about')} className="hover:text-ray-blue dark:hover:text-ray-gold transition text-center md:text-right w-full">من نحن</button></li>
                <li><button onClick={() => handleLinkClick('about')} className="hover:text-ray-blue dark:hover:text-ray-gold transition text-center md:text-right w-full">الوظائف</button></li>
                <li><button onClick={() => handleLinkClick('about')} className="hover:text-ray-blue dark:hover:text-ray-gold transition text-center md:text-right w-full">المدونة</button></li>
                <li><button onClick={() => handleLinkClick('about')} className="hover:text-ray-blue dark:hover:text-ray-gold transition text-center md:text-right w-full">شركاء النجاح</button></li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div>
              <h4 className="font-bold text-ray-black dark:text-white mb-4">الدعم والمساعدة</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><button onClick={() => handleLinkClick('help')} className="hover:text-ray-blue dark:hover:text-ray-gold transition text-center md:text-right w-full">مركز المساعدة</button></li>
                <li><button onClick={() => handleLinkClick('terms')} className="hover:text-ray-blue dark:hover:text-ray-gold transition text-center md:text-right w-full">الشروط والأحكام</button></li>
                <li><button onClick={() => handleLinkClick('privacy')} className="hover:text-ray-blue dark:hover:text-ray-gold transition text-center md:text-right w-full">سياسة الخصوصية</button></li>
                <li><button onClick={() => handleLinkClick('contact')} className="hover:text-ray-blue dark:hover:text-ray-gold transition text-center md:text-right w-full">تواصل معنا</button></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="font-bold text-ray-black dark:text-white mb-4">اتصل بنا</h4>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center justify-center md:justify-start gap-3">
                  <Phone className="w-4 h-4 text-ray-gold" />
                  <span className="font-bold dir-ltr">16XXX</span>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3">
                  <Mail className="w-4 h-4 text-ray-gold" />
                  <span>info@ray.app</span>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3">
                  <MapPin className="w-4 h-4 text-ray-gold" />
                  <span>القاهرة، التجمع الخامس</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 dark:text-gray-500 text-xs">© 2025 RAY. جميع الحقوق محفوظة.</p>
            <div className="flex gap-4 text-xs text-gray-400 font-mono">
               v2.5.0 (Beta)
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
