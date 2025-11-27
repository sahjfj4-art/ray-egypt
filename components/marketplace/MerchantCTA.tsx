
import React from 'react';
import { Store } from 'lucide-react';

interface MerchantCTAProps {
  onMerchantClick: () => void;
}

const MerchantCTA: React.FC<MerchantCTAProps> = ({ onMerchantClick }) => {
  return (
    <section className="bg-ray-black text-white py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gray-800 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-block p-3 bg-white/10 rounded-2xl mb-6 rotate-3">
          <Store className="w-12 h-12 text-ray-gold" />
        </div>
        <h2 className="text-3xl md:text-5xl font-black mb-6">
          عندك مشروع؟ <span className="text-ray-gold">كبّر حجم أعمالك</span> مع راي
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
          انضم لأكثر من 10,000 تاجر بيستخدموا منصة راي لإدارة محلاتهم، مطاعمهم، وشركاتهم.
          نظام كاشير، إدارة مخزون، وفواتير إلكترونية.. كل ده مجاناً!
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
           {['المطاعم والكافيهات', 'محلات التجزئة', 'الشركات والخدمات', 'العقارات والسيارات'].map((item, idx) => (
             <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl text-sm font-bold hover:bg-white/10 transition cursor-default">
               ✅ {item}
             </div>
           ))}
        </div>

        <button 
          onClick={onMerchantClick}
          className="bg-ray-gold text-ray-black px-10 py-4 rounded-xl font-bold text-xl shadow-[0_0_30px_rgba(253,184,19,0.4)] hover:scale-105 transition duration-300"
        >
          سجّل نشاطك الآن - مجاناً
        </button>
        <p className="mt-4 text-sm text-gray-400">بدون رسوم تسجيل • تفعيل فوري للحساب</p>
      </div>
    </section>
  );
};

export default MerchantCTA;
