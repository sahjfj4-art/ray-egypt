
import React from 'react';
import { Settings, LogOut, LayoutGrid } from 'lucide-react';
import { DashboardConfig, BusinessType } from './config';

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
       admin: 'للإدارة'
     };
     return labels[type] || 'عام';
  };

  return (
    <aside className="w-64 bg-ray-blue text-white hidden md:flex flex-col shadow-xl z-30">
      <div className="p-6 border-b border-blue-800 flex items-center gap-3">
         <div className="w-10 h-10 bg-gradient-to-br from-ray-gold to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-ray-blue font-black text-xl">R</span>
         </div>
         <div>
           <h1 className="font-bold text-xl tracking-wide">RAY Panel</h1>
           <p className="text-[10px] text-gray-300">إدارة ذكية {getBusinessLabel(currentBusinessType)}</p>
         </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {/* Show navigation to General Overview if not currently on it (though this component is mostly for generic fallbacks, specialized dashboards have their own sidebars) */}
        {currentBusinessType !== 'general' && (
           <div className="mb-4 pb-4 border-b border-blue-800">
              {/* Note: In a real app, navigation would be handled via routing context, here we rely on prop drilling or parent state which might need a dedicated callback for 'go home' in this specific generic Sidebar component. 
                  However, since specialized dashboards have their OWN sidebar components (e.g. RestaurantDashboard.tsx has its own Sidebar), this generic Sidebar is mostly used for the General Overview or fallbacks. 
              */}
           </div>
        )}

        {config.navItems.map((item) => (
          <SidebarItem 
            key={item.id} 
            icon={item.icon} 
            label={item.label} 
            active={activeTab === item.id} 
            onClick={() => setActiveTab(item.id)} 
          />
        ))}
        
        <div className="my-4 border-t border-blue-800 opacity-50"></div>
        
        <SidebarItem 
            icon={Settings} 
            label="الإعدادات" 
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')} 
        />
      </nav>

      <div className="p-4 border-t border-blue-800 bg-blue-950/30">
        <button onClick={onLogout} className="flex items-center gap-3 text-red-300 hover:text-red-100 transition w-full p-2 rounded-lg hover:bg-blue-800">
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
    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${active ? 'bg-white/10 text-ray-gold font-bold shadow-inner' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
  >
    <Icon className={`w-5 h-5 ${active ? 'text-ray-gold' : 'text-current'}`} />
    <span>{label}</span>
    {active && <div className="mr-auto w-1.5 h-1.5 rounded-full bg-ray-gold shadow-[0_0_10px_#FDB813]"></div>}
  </button>
);

export default Sidebar;
