
import React, { useState } from 'react';
import { 
  LayoutDashboard, Truck, Map, Users, Settings, FileText, 
  LogOut, Package, AlertCircle
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

const LogisticsDashboard: React.FC<Props> = ({ onLogout, onSwitchType }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const config = dashboardConfigs['logistics'] || dashboardConfigs['services'];
  const theme = colorClasses['green'];

  const Sidebar = () => (
    <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col shadow-xl z-30">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
         <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center shadow-lg">
            <Truck className="text-white w-6 h-6" />
         </div>
         <div>
           <h1 className="font-bold text-xl tracking-wide">RAY Logistics</h1>
           <p className="text-[10px] text-green-300">إدارة الشحن والتوصيل</p>
         </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <SidebarItem icon={LayoutDashboard} label="الرئيسية" id="overview" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Package} label="الشحنات" id="shipments" active={activeTab} setTab={setActiveTab} highlight />
        <SidebarItem icon={Truck} label="الأسطول" id="fleet" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Map} label="التتبع" id="tracking" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Users} label="السائقين" id="drivers" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={AlertCircle} label="المشاكل" id="issues" active={activeTab} setTab={setActiveTab} />
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

  const LogisticsOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="الشحنات النشطة" value="156" icon={Package} color="green" />
        <StatCard title="السيارات" value="24" icon={Truck} color="blue" />
        <StatCard title="السائقين" value="32" icon={Users} color="purple" />
        <StatCard title="التأخيرات" value="2" icon={AlertCircle} color="red" />
      </div>
      
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4">الشحنات الجارية</h2>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div>
                <p className="font-bold">شحنة #{1000 + i}</p>
                <p className="text-sm text-gray-500">من القاهرة إلى الإسكندرية</p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">قيد التوصيل</span>
                <p className="text-xs text-gray-500 mt-1">{60 + i * 10}% مكتمل</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'shipments':
        return <UniversalDataView type="shipments" theme={theme} />;
      case 'fleet':
        return <UniversalDataView type="fleet" theme={theme} />;
      case 'tracking':
        return <UniversalDataView type="tracking" theme={theme} />;
      case 'drivers':
        return <UniversalDataView type="drivers" theme={theme} />;
      case 'issues':
        return <UniversalDataView type="issues" theme={theme} />;
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
        return <LogisticsOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/30 flex font-sans">
      <Sidebar />
      <main className="flex-1 overflow-y-auto h-screen flex flex-col">
        <Header 
          config={config} 
          currentBusinessType="logistics" 
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
        ? 'bg-green-600 text-white font-bold shadow-lg' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
      ${highlight && active !== id ? 'text-green-400' : ''}
    `}
  >
    <Icon className={`w-5 h-5`} />
    <span>{label}</span>
  </button>
);

const StatCard = ({ title, value, icon: Icon, color }: any) => {
  const colorMap: any = {
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    red: 'bg-red-100 text-red-600'
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

export default LogisticsDashboard;
