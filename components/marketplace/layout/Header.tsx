
import React, { useState } from 'react';
import { 
  Search, MapPin, Heart, ShoppingCart, Bell, Menu, X,
  Briefcase, Store, ChevronDown, User, Moon, Sun
} from 'lucide-react';
import { allCategories } from '../data';
import { useTheme } from '../../common/ThemeContext';

interface HeaderProps {
  onMerchantClick: () => void;
  goHome: () => void;
  activeSystem: string | null;
  onCategorySelect: (categoryId: string) => void;
  onNavigate: (view: string) => void;
  onAuth: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMerchantClick, goHome, activeSystem, onCategorySelect, onNavigate, onAuth }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const { isDarkMode, toggleTheme } = useTheme();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('search');
  };

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-ray-blue to-blue-900 dark:from-gray-900 dark:to-gray-800 text-white py-2 px-4 text-center text-xs md:text-sm font-medium relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-white/5 animate-pulse"></div>
        <p className="relative z-10 flex justify-center items-center gap-2">
          <span className="bg-ray-gold text-ray-black px-2 py-0.5 rounded text-[10px] md:text-xs font-bold">جديد</span>
          <span className="truncate">🎯 عروض اليوم - خصم يصل إلى 50% على المطاعم والمحلات!</span>
        </p>
      </div>

      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-40 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row: Logo, Search, Actions */}
          <div className="flex items-center justify-between h-16 md:h-20 gap-2 lg:gap-8">
            
            {/* Logo */}
            <div onClick={goHome} className="flex items-center gap-2 shrink-0 cursor-pointer group">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-ray-gold to-yellow-600 rounded-xl flex items-center justify-center shadow-lg text-ray-blue font-black text-xl md:text-2xl group-hover:rotate-12 transition duration-300">
                R
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-black tracking-tight text-ray-blue dark:text-white group-hover:text-yellow-600 transition">RAY</h1>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold -mt-1">نور طريق نجاحك</p>
              </div>
            </div>

            {/* Location (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-ray-blue dark:hover:text-ray-gold cursor-pointer bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full transition">
              <MapPin className="w-4 h-4 text-ray-blue dark:text-ray-gold" />
              <span className="text-sm font-bold">القاهرة، المعادي</span>
              <span className="text-xs text-gray-400">تغيير</span>
            </div>

            {/* Search Bar */}
            {!activeSystem && (
              <form onSubmit={handleSearchSubmit} className="flex flex-1 max-w-2xl relative group mx-2 md:mx-0">
                <input 
                  type="text" 
                  placeholder="بحث..." 
                  className="w-full bg-gray-100 dark:bg-gray-800 border-2 border-transparent dark:border-gray-700 text-gray-900 dark:text-white rounded-full py-2 md:py-2.5 px-4 md:px-6 pl-10 md:pl-12 text-sm focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:border-ray-blue dark:focus:border-ray-gold transition-all duration-300 placeholder-gray-400 font-medium"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button type="submit" className="absolute left-2 top-1 md:top-1.5 bg-ray-blue dark:bg-ray-gold dark:text-gray-900 text-white p-1 md:p-1.5 rounded-full hover:bg-blue-800 dark:hover:bg-yellow-400 transition">
                  <Search className="w-3 h-3 md:w-4 md:h-4" />
                </button>
              </form>
            )}
            
            {activeSystem && <div className="flex-1 hidden md:block"></div>}

            {/* Actions */}
            <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
               {/* Theme Toggle */}
               <button 
                 onClick={toggleTheme}
                 className="p-1.5 md:p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
               >
                 {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
               </button>

               <button onClick={() => onNavigate('notifications')} className="p-1.5 md:p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full relative transition group">
                 <Bell className="w-5 h-5 md:w-6 md:h-6 group-hover:text-ray-blue dark:group-hover:text-ray-gold" />
                 <span className="absolute top-1 md:top-1.5 right-1.5 md:right-2 w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full border border-white dark:border-gray-900 animate-pulse"></span>
               </button>
               
               <button onClick={() => onNavigate('favorites')} className="hidden sm:block p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full relative transition group">
                 <Heart className="w-6 h-6 group-hover:text-red-500 transition-colors" />
               </button>
               
               <button onClick={() => onNavigate('cart')} className="p-1.5 md:p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full relative transition flex items-center gap-2 group">
                 <div className="relative">
                    <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 group-hover:text-ray-blue dark:group-hover:text-ray-gold" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-ray-gold text-ray-blue text-[8px] md:text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
                 </div>
                 <span className="hidden lg:block text-sm font-bold group-hover:text-ray-blue dark:group-hover:text-white">450 ج</span>
               </button>
               
               <div className="h-6 md:h-8 w-px bg-gray-200 dark:bg-gray-700 mx-1 hidden sm:block"></div>
               
               {/* Profile / Login */}
               <button 
                 onClick={onAuth} 
                 className="hidden sm:flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-200 hover:text-ray-blue dark:hover:text-ray-gold transition group"
               >
                  <div className="w-8 h-8 bg-blue-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-ray-blue dark:text-ray-gold group-hover:bg-ray-blue group-hover:text-white transition">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="hidden lg:inline">تسجيل الدخول</span>
               </button>

               <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                 {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
               </button>
            </div>
          </div>

          {/* Secondary Navigation */}
          <div className="hidden md:flex items-center justify-between border-t border-gray-100 dark:border-gray-800 py-1 relative">
            <ul className="flex gap-1 overflow-visible h-12 items-center">
              <li>
                <button onClick={goHome} className={`text-sm font-black hover:text-ray-gold transition px-4 py-3 ${activeSystem ? 'text-gray-600 dark:text-gray-400' : 'text-ray-blue dark:text-white'}`}>الرئيسية</button>
              </li>
              
              {allCategories.map((category) => (
                <li key={category.id} className="group relative h-full flex items-center">
                  <button 
                    onClick={() => onCategorySelect(category.id)}
                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-ray-blue dark:hover:text-ray-gold hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 rounded-lg transition flex items-center gap-1"
                  >
                    <category.icon className="w-4 h-4" />
                    <span>{category.name}</span>
                    <ChevronDown className="w-3 h-3 mt-0.5 opacity-50 group-hover:opacity-100 transition" />
                  </button>
                  <div className="absolute top-full right-0 w-64 bg-white dark:bg-gray-900 shadow-xl rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
                       <category.icon className="w-5 h-5 text-ray-blue dark:text-ray-gold" />
                       <span className="font-bold text-ray-blue dark:text-white">{category.name}</span>
                    </div>
                    <div className="p-2">
                      {category.sub.map((sub) => (
                        <button 
                          key={sub.id} 
                          onClick={() => onCategorySelect(category.id)}
                          className="block w-full text-right px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-ray-blue hover:text-white dark:hover:bg-ray-gold dark:hover:text-ray-black rounded-lg transition-colors"
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
                  onClick={() => onNavigate('all-systems')}
                  className="text-xs font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Briefcase className="w-4 h-4" />
                جميع الأنظمة
              </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 fixed top-[88px] md:top-[96px] w-full left-0 shadow-2xl py-4 px-4 flex flex-col gap-4 max-h-[70vh] overflow-y-auto z-[60] animate-in slide-in-from-top-5">
            <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-xl">
               <MapPin className="w-4 h-4 text-ray-blue dark:text-ray-gold" />
               <span className="text-sm font-bold text-gray-700 dark:text-gray-200">القاهرة، المعادي</span>
               <button className="text-xs text-blue-600 dark:text-blue-400 font-bold mr-auto">تغيير</button>
            </div>
            <button onClick={goHome} className="text-right font-bold text-ray-blue dark:text-white py-2">الرئيسية</button>
            <button onClick={() => { onAuth(); setIsMenuOpen(false); }} className="text-right font-medium text-gray-700 dark:text-gray-300 py-2 border-b border-gray-50 dark:border-gray-800">تسجيل الدخول / حسابي</button>
            <button onClick={() => { onNavigate('cart'); setIsMenuOpen(false); }} className="text-right font-medium text-gray-700 dark:text-gray-300 py-2 border-b border-gray-50 dark:border-gray-800">سلة المشتريات</button>
            <button onClick={() => { onNavigate('favorites'); setIsMenuOpen(false); }} className="text-right font-medium text-gray-700 dark:text-gray-300 py-2 border-b border-gray-50 dark:border-gray-800">المفضلة</button>
            
            <div className="space-y-2 mt-2">
              <p className="text-xs font-bold text-gray-400 mb-2">الأقسام</p>
              {allCategories.map(cat => (
                <div key={cat.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => toggleCategory(cat.id)}
                    className="flex items-center justify-between p-3 cursor-pointer font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                  >
                    <div className="flex items-center gap-2">
                       <cat.icon className="w-5 h-5 text-ray-blue dark:text-ray-gold" />
                       {cat.name}
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedCategories.has(cat.id) ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedCategories.has(cat.id) && (
                    <div className="px-3 pb-3 pt-1 space-y-1 border-t border-gray-200/50 dark:border-gray-700">
                      <button 
                        onClick={() => {
                          onCategorySelect(cat.id);
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-right p-2 text-sm font-bold text-ray-blue dark:text-ray-gold bg-blue-50 dark:bg-gray-700 rounded-lg mb-2"
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
                           className="block w-full text-right p-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-600 rounded-lg hover:text-ray-blue transition-colors"
                         >
                           {sub.name}
                         </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button onClick={onMerchantClick} className="bg-ray-blue dark:bg-ray-gold text-white dark:text-black py-3 rounded-xl font-bold mt-2 shadow-lg flex items-center justify-center gap-2">
              <Store className="w-4 h-4" />
              الدخول كتاجر / تسجيل نشاط
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
