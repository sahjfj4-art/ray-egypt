
import React, { useState } from 'react';
import { 
  LayoutDashboard, Droplet, Calendar, Users, Settings, FileText, 
  LogOut, ClipboardList, Zap
} from 'lucide-react';
import { BusinessType, dashboardConfigs, colorClasses } from '../config';
import Header from '../layout/Header';
import UniversalDataView from '../views/UniversalDataView';
import InvoiceBuilder from '../finance/InvoiceBuilder';
import SettingsView from '../views/SettingsView';
import NotificationsView from '../views/NotificationsView';
import ProfileView from '../views/ProfileView';
import CalendarView from '../views/CalendarView';

interface Props {
  onLogout: () => void;
  onSwitchType: (type: BusinessType) => void;
}

const CarwashDashboard: React.FC<Props> = ({ onLogout, onSwitchType }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const config = dashboardConfigs['carwash'] || dashboardConfigs['services'];
  const theme = colorClasses['cyan'];

  const Sidebar = () => (
    <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col shadow-xl z-30">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
         <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
            <Droplet className="text-white w-6 h-6" />
         </div>
         <div>
           <h1 className="font-bold text-xl tracking-wide">RAY Wash</h1>
           <p className="text-[10px] text-cyan-300">إدارة غسيل السيارات</p>
         </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <SidebarItem icon={LayoutDashboard} label="الرئيسية" id="overview" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Calendar} label="الحجوزات" id="bookings" active={activeTab} setTab={setActiveTab} highlight />
        <SidebarItem icon={Zap} label="الخدمات" id="services" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Users} label="الموظفين" id="staff" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={ClipboardList} label="الطلبات" id="orders" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Settings} label="برنامج الولاء" id="loyalty" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={FileText} label="الفواتير" id="invoices" active={activeTab} setTab={setActiveTab} />
      </nav>

      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <button onClick={onLogout} className="flex items-center gap-3 text-gray-400 hover:text-white transition w-full p-2 rounded-lg hover:bg-slate-800">
          <LogOut className="w-5 h-5" />
          <span>خروج</span>
        </button>
      </div>
    </aside>
  );

  const CarwashOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="الحجوزات اليوم" value="24" icon={Calendar} color="cyan" />
        <StatCard title="الموظفين" value="8" icon={Users} color="blue" />
        <StatCard title="الخدمات" value="6" icon={Zap} color="yellow" />
        <StatCard title="الإيرادات" value="2,450 ج" icon={FileText} color="green" />
      </div>
      
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4">الحجوزات القادمة</h2>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div>
                <p className="font-bold">سيارة #{i} - غسيل كامل</p>
                <p className="text-sm text-gray-500">الساعة: {10 + i}:00 صباحاً</p>
              </div>
              <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-bold">مؤكد</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'bookings':
        return <CalendarView type="carwash" theme={theme} />;
      case 'services':
        return <UniversalDataView type="services" theme={theme} />;
      case 'staff':
        return <UniversalDataView type="staff" theme={theme} />;
      case 'orders':
        return <UniversalDataView type="orders" theme={theme} />;
      case 'loyalty':
        return <UniversalDataView type="loyalty" theme={theme} />;
      case 'invoices':
        return <InvoiceBuilder />;
      case 'settings':
        return <SettingsView />;
      case 'notifications':
        return <NotificationsView />;
      case 'profile':
        return <ProfileView />;
      case 'overview':
      default:
        return <CarwashOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/30 flex font-sans">
      <Sidebar />
      <main className="flex-1 overflow-y-auto h-screen flex flex-col">
        <Header 
          config={config} 
          currentBusinessType="carwash" 
          setCurrentBusinessType={onSwitchType} 
          theme={theme}
          onNavigate={setActiveTab}
        />
        <div className="p-6 max-w-7xl mx-auto flex-1 w-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, id, active, setTab, highlight }: any) => (
  <button 
    onClick={() => setTab(id)}
    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 
      ${active === id 
        ? 'bg-cyan-600 text-white font-bold shadow-lg' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
      ${highlight && active !== id ? 'text-cyan-400' : ''}
    `}
  >
    <Icon className={`w-5 h-5`} />
    <span>{label}</span>
  </button>
);

const StatCard = ({ title, value, icon: Icon, color }: any) => {
  const colorMap: any = {
    cyan: 'bg-cyan-100 text-cyan-600',
    blue: 'bg-blue-100 text-blue-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    green: 'bg-green-100 text-green-600'
  };
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
          <Icon className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
};

export default CarwashDashboard;
