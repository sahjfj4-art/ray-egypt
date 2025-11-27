
import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { DashboardConfig, BusinessType, colorClasses } from './config';

interface HeaderProps {
  config: DashboardConfig;
  currentBusinessType: BusinessType;
  setCurrentBusinessType: (type: BusinessType) => void;
  theme: any;
  onNavigate?: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ config, currentBusinessType, setCurrentBusinessType, theme, onNavigate }) => {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{config.title}</h2>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${theme.btn}`}></span>
            متصل الآن
          </p>
        </div>
      </div>

      {/* Business Type Switcher (For Demo Purposes) */}
      <div className="hidden lg:flex items-center gap-3 bg-gray-50 p-1 rounded-lg border border-gray-200">
        <span className="text-xs font-bold text-gray-500 px-2">جرب الأنظمة:</span>
        <select 
          value={currentBusinessType}
          onChange={(e) => setCurrentBusinessType(e.target.value as BusinessType)}
          className="bg-white border-none text-sm font-bold text-ray-blue focus:ring-0 rounded cursor-pointer py-1 outline-none px-2"
        >
           <option value="retail">🛒 التجزئة</option>
           <option value="restaurant">🍔 المطاعم</option>
           <option value="realestate">🏘️ العقارات</option>
           <option value="cars">🚗 السيارات</option>
           <option value="clinic">🏥 العيادات</option>
           <option value="gym">🏋️ الجيم</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => onNavigate && onNavigate('notifications')}
          className="p-2 hover:bg-gray-100 rounded-full relative transition group"
        >
           <Bell className="w-5 h-5 text-gray-600 group-hover:text-ray-blue" />
           <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <div 
          onClick={() => onNavigate && onNavigate('profile')}
          className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-ray-gold cursor-pointer hover:shadow-md transition"
        >
           <img src={`https://ui-avatars.com/api/?name=${config.title}&background=random`} alt="User" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
};

export default Header;
