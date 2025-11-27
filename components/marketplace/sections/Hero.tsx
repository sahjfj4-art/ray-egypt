
import React from 'react';
import { ShoppingBag } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-ray-blue overflow-hidden">
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
       {/* Abstract Shapes */}
       <div className="absolute top-0 right-0 w-96 h-96 bg-ray-gold/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
       <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
         <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
           
           <div className="text-center md:text-right max-w-2xl space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-tight">
                راي - <span className="text-ray-gold inline-block transform hover:scale-110 transition duration-300 cursor-default">نوّر</span> طريق نجاحك
              </h2>
              <p className="text-base md:text-xl text-blue-100 leading-relaxed font-medium">
                المنصة الرقمية المتكاملة الأولى في مصر. اطلب أكلك، اشتري لبسك، احجز ملعبك، وجدد شقتك.. كله في مكان واحد وبضغطة زر.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                <button className="px-8 py-4 bg-ray-gold text-ray-black font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(253,184,19,0.3)] hover:shadow-[0_0_30px_rgba(253,184,19,0.5)] hover:-translate-y-1 transition duration-300 w-full sm:w-auto">
                  ابدأ التسوق الآن
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold text-lg rounded-xl hover:bg-white hover:text-ray-blue transition duration-300 w-full sm:w-auto">
                  اكتشف العروض
                </button>
              </div>
           </div>

           {/* Hero Image Composition */}
           <div className="relative hidden md:block w-[450px]">
             <div className="absolute inset-0 bg-gradient-to-t from-ray-blue via-transparent to-transparent z-20"></div>
             <img 
               src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80" 
               alt="App Experience" 
               className="rounded-3xl shadow-2xl border-4 border-white/10 transform rotate-[-6deg] hover:rotate-0 transition duration-700 z-10 relative"
             />
             <div className="absolute -bottom-10 -left-10 bg-white p-4 rounded-2xl shadow-xl z-30 animate-bounce-slow">
               <div className="flex items-center gap-3">
                 <div className="bg-green-100 p-2 rounded-full">
                   <ShoppingBag className="w-6 h-6 text-green-600" />
                 </div>
                 <div>
                   <p className="text-xs text-gray-500 font-bold">طلب جديد</p>
                   <p className="text-sm font-bold text-gray-900">تم التوصيل بنجاح ✅</p>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
    </section>
  );
};

export default Hero;
