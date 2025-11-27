
import React from 'react';
import { Settings, LogOut, LayoutGrid } from 'lucide-react';
import { DashboardConfig, BusinessType } from '../config';

interface SidebarProps {
  config: DashboardConfig;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  currentBusinessType: BusinessType;
}

const Sidebar: React.FC<SidebarProps> = ({ config, activeTab, setActiveTab, onLogout, currentBusinessType }) => {
  const getBusinessLabel = (type: BusinessType) => {
     const labels: Record<BusinessType, string> = {
       general: 'المركز الرئيسي',
       restaurant: 'للمطاعم',
       retail: 'للمحلات',
       realestate: 'للعقارات',
       cars: 'للسيارات',
       clinic: 'للعيادات',
       gym: 'للجيم',
       services: 'للخدمات',
       laundry: 'للمغاسل',
       clothing: 'لمحلات الملابس',
       salon: 'للصالونات',
       pharmacy: 'للصيدليات',
       contracting: 'للمقاولات',
       plumbing: 'للمواسير',
       painting: 'للدهانات',
       hardware: 'للأدوات',
       electrical: 'للكهرباء',
       construction: 'لمشاريع البناء',
       carwash: 'لغسيل السيارات',
       logistics: 'للشحن واللوجستيات',
       agriculture: 'للمزارع والزراعة',
       mobileLaundry: 'للغسيل المتنقل',
       subscriptions: 'لإدارة الاشتراكات',
       nursery: 'للحضانات',
       academy: 'للأكاديميات',
       medical: 'للمجمعات الطبية',
       legal: 'لمكاتب المحاماة',
       consulting: 'للشركات الاستشارية',
       resorts: 'للمنتجعات',
       cleaning: 'لشركات التنظيف',
       maintenance: 'لشركات الصيانة',
       delivery: 'لخدمات التوصيل',
       dryCleaning: 'للدراي كلين',
       homeServices: 'للخدمات المنزلية',
       pos: 'لنقاط البيع',
       inventory: 'لإدارة المخزون',
       salesAccounting: 'للمبيعات والمحاسبة',
       workshop: 'للورش',
       admin: 'للإدارة'
     };
     return labels[type] || 'عام';
  };

  return (
    <aside className="w-64 bg-ray-blue dark:bg-gray-900 text-white hidden md:flex flex-col shadow-xl z-30 transition-colors">
      <div className="p-6 border-b border-blue-800 dark:border-gray-800 flex items-center gap-3">
         <div className="w-10 h-10 bg-gradient-to-br from-ray-gold to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-ray-blue font-black text-xl">R</span>
         </div>
         <div>
           <h1 className="font-bold text-xl tracking-wide">RAY Panel</h1>
           <p className="text-[10px] text-gray-300">إدارة ذكية {getBusinessLabel(currentBusinessType)}</p>
         </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {config.navItems.map((item) => (
          <SidebarItem 
            key={item.id} 
            icon={item.icon} 
            label={item.label} 
            active={activeTab === item.id} 
            onClick={() => setActiveTab(item.id)} 
          />
        ))}
        
        <div className="my-4 border-t border-blue-800 dark:border-gray-800 opacity-50"></div>
        
        <SidebarItem 
            icon={Settings} 
            label="الإعدادات" 
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')} 
        />
      </nav>

      <div className="p-4 border-t border-blue-800 dark:border-gray-800 bg-blue-950/30 dark:bg-black/30">
        <button onClick={onLogout} className="flex items-center gap-3 text-red-300 hover:text-red-100 transition w-full p-2 rounded-lg hover:bg-blue-800 dark:hover:bg-gray-800 active:scale-95">
          <LogOut className="w-5 h-5" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
};

const SidebarItem: React.FC<{ icon: any, label: string, active?: boolean, onClick: () => void }> = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative overflow-hidden
      ${active 
        ? 'bg-white/10 text-ray-gold font-bold shadow-inner' 
        : 'text-gray-300 hover:bg-white/5 hover:text-white'}
    `}
  >
    {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-ray-gold rounded-r-full"></div>}
    <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${active ? 'text-ray-gold' : 'text-current'}`} />
    <span>{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-ray-gold shadow-[0_0_10px_#FDB813]"></div>}
  </button>
);

export default Sidebar;
