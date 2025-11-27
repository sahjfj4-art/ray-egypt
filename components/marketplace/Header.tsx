
import React, { useState } from 'react';
import { 
  Search, MapPin, Heart, ShoppingCart, Bell, Menu, X,
  Briefcase, Store, ChevronDown
} from 'lucide-react';
import { allCategories } from './data';

interface HeaderProps {
  onMerchantClick: () => void;
  goHome: () => void;
  activeSystem: string | null;
  onCategorySelect: (categoryId: string) => void;
  onNavigate: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onMerchantClick, goHome, activeSystem, onCategorySelect, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('search');
  };

  return (
    <>
      <div className="bg-gradient-to-r from-ray-blue to-blue-900 text-white py-2 px-4 text-center text-sm font-medium relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-white/5 animate-pulse"></div>
        <p className="relative z-10 flex justify-center items-center gap-2">
          <span className="bg-ray-gold text-ray-blue px-2 py-0.5 rounded text-xs font-bold">جديد</span>
          🎯 عروض اليوم - خصم يصل إلى 50% على المطاعم والمحلات!
        </p>
      </div>

      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row: Logo, Search, Actions */}
          <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
            
            {/* Logo */}
            <div onClick={goHome} className="flex items-center gap-2 shrink-0 cursor-pointer group">
              <div className="w-10 h-10 bg-gradient-to-br from-ray-gold to-yellow-600 rounded-xl flex items-center justify-center shadow-lg text-ray-blue font-black text-2xl group-hover:rotate-12 transition duration-300">
                R
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-black tracking-tight text-ray-blue group-hover:text-yellow-600 transition">RAY</h1>
                <p className="text-[10px] text-gray-500 font-bold -mt-1">نور طريق نجاحك</p>
              </div>
            </div>

            {/* Location (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 text-gray-600 hover:text-ray-blue cursor-pointer bg-gray-100 px-4 py-2 rounded-full transition">
              <MapPin className="w-4 h-4 text-ray-blue" />
              <span className="text-sm font-bold">القاهرة، المعادي</span>
              <span className="text-xs text-gray-400">تغيير</span>
            </div>

            {/* Search Bar */}
            {!activeSystem && (
              <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-2xl relative group">
                <input 
                  type="text" 
                  placeholder="ابحث عن مطعم، عقار، سيارة، أو خدمة..." 
                  className="w-full bg-gray-100 border-2 border-transparent text-gray-900 rounded-full py-2.5 px-6 pl-12 focus:outline-none focus:bg-white focus:border-ray-blue transition-all duration-300 placeholder-gray-400 font-medium"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button type="submit" className="absolute left-2 top-1.5 bg-ray-blue text-white p-1.5 rounded-full hover:bg-blue-800 transition">
                  <Search className="w-4 h-4" />
                </button>
              </form>
            )}
            
            {activeSystem && <div className="flex-1 hidden md:block"></div>}

            {/* Actions */}
            <div className="flex items-center gap-3">
               <button onClick={() => onNavigate('notifications')} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative transition group">
                 <Bell className="w-6 h-6 group-hover:text-ray-blue" />
                 <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse"></span>
               </button>
               
               <button onClick={() => onNavigate('favorites')} className="hidden sm:block p-2 text-gray-600 hover:bg-gray-100 rounded-full relative transition group">
                 <Heart className="w-6 h-6 group-hover:text-red-500 transition-colors" />
               </button>
               
               <button onClick={() => onNavigate('cart')} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative transition flex items-center gap-2 group">
                 <div className="relative">
                    <ShoppingCart className="w-6 h-6 group-hover:text-ray-blue" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-ray-gold text-ray-blue text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
                 </div>
                 <span className="hidden lg:block text-sm font-bold group-hover:text-ray-blue">450 ج</span>
               </button>
               
               <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>
               
               <button onClick={() => onNavigate('profile')} className="hidden sm:flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-ray-blue transition group">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-ray-blue group-hover:bg-ray-blue group-hover:text-white transition">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <span>حسابي</span>
               </button>

               <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-700">
                 {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
               </button>
            </div>
          </div>

          {/* Secondary Navigation */}
          <div className="hidden md:flex items-center justify-between border-t border-gray-100 py-1 relative">
            <ul className="flex gap-1 overflow-visible h-12 items-center">
              <li>
                <button onClick={goHome} className={`text-sm font-black hover:text-ray-gold transition px-4 py-3 ${activeSystem ? 'text-gray-600' : 'text-ray-blue'}`}>الرئيسية</button>
              </li>
              
              {allCategories.map((category) => (
                <li key={category.id} className="group relative h-full flex items-center">
                  <button 
                    onClick={() => onCategorySelect(category.id)}
                    className="text-sm font-medium text-gray-600 hover:text-ray-blue hover:bg-gray-50 px-3 py-2 rounded-lg transition flex items-center gap-1"
                  >
                    <category.icon className="w-4 h-4" />
                    <span>{category.name}</span>
                    <ChevronDown className="w-3 h-3 mt-0.5 opacity-50 group-hover:opacity-100 transition" />
                  </button>
                  <div className="absolute top-full right-0 w-64 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center gap-2">
                       <category.icon className="w-5 h-5 text-ray-blue" />
                       <span className="font-bold text-ray-blue">{category.name}</span>
                    </div>
                    <div className="p-2">
                      {category.sub.map((sub) => (
                        <button 
                          key={sub.id} 
                          onClick={() => onCategorySelect(category.id)}
                          className="block w-full text-right px-4 py-2.5 text-sm text-gray-600 hover:bg-ray-blue hover:text-white rounded-lg transition-colors"
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            <button 
                onClick={onMerchantClick}
                className="ml-4 text-xs font-bold bg-ray-black text-white px-4 py-2 rounded-lg hover:bg-ray-gold hover:text-ray-black transition flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Store className="w-4 h-4" />
              سجّل نشاطك (تجار)
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute top-full w-full left-0 shadow-2xl py-4 px-4 flex flex-col gap-4 max-h-[80vh] overflow-y-auto z-50 animate-in slide-in-from-top-5">
            <input 
              type="text" 
              placeholder="بحث..." 
              className="w-full bg-gray-100 rounded-lg py-3 px-4 font-medium focus:outline-none focus:ring-2 focus:ring-ray-blue"
              onKeyDown={(e) => { if(e.key === 'Enter') { onNavigate('search'); setIsMenuOpen(false); }}}
            />
            <button onClick={goHome} className="text-right font-bold text-ray-blue py-2">الرئيسية</button>
            <button onClick={() => { onNavigate('profile'); setIsMenuOpen(false); }} className="text-right font-medium text-gray-700 py-2 border-b border-gray-50">حسابي</button>
            <button onClick={() => { onNavigate('cart'); setIsMenuOpen(false); }} className="text-right font-medium text-gray-700 py-2 border-b border-gray-50">سلة المشتريات</button>
            <button onClick={() => { onNavigate('favorites'); setIsMenuOpen(false); }} className="text-right font-medium text-gray-700 py-2 border-b border-gray-50">المفضلة</button>
            
            <div className="space-y-2 mt-2">
              <p className="text-xs font-bold text-gray-400 mb-2">الأقسام</p>
              {allCategories.map(cat => (
                <details key={cat.id} className="group bg-gray-50 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-3 cursor-pointer list-none font-bold text-gray-700 hover:bg-gray-100">
                    <div className="flex items-center gap-2">
                       <cat.icon className="w-5 h-5 text-ray-blue" />
                       {cat.name}
                    </div>
                    <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-3 pb-3 pt-1 space-y-1 border-t border-gray-200/50">
                    <button 
                      onClick={() => {
                        onCategorySelect(cat.id);
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-right p-2 text-sm font-bold text-ray-blue bg-blue-50 rounded-lg mb-2"
                    >
                      عرض الكل في {cat.name}
                    </button>
                    {cat.sub.map(sub => (
                       <button 
                         key={sub.id} 
                         onClick={() => {
                           onCategorySelect(cat.id);
                           setIsMenuOpen(false);
                         }}
                         className="block w-full text-right p-2 text-sm text-gray-600 hover:bg-white rounded-lg hover:text-ray-blue transition-colors"
                       >
                         {sub.name}
                       </button>
                    ))}
                  </div>
                </details>
              ))}
            </div>
            <button onClick={onMerchantClick} className="bg-ray-blue text-white py-3 rounded-xl font-bold mt-2 shadow-lg">
              الدخول كتاجر / تسجيل نشاط
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
