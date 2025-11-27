
import React, { useState } from 'react';
import { 
  LayoutDashboard, Wrench, Calendar, Users, Settings, FileText, 
  LogOut, ClipboardList
} from 'lucide-react';
import { BusinessType, dashboardConfigs, colorClasses } from '../config';
import Header from '../layout/Header';
import ServiceRequestsView from './ServiceRequestsView';
import ServicesOverview from './ServicesOverview';
import JobOrderManager from './JobOrderManager';
import TechnicianTeam from './TechnicianTeam'; // Updated Import
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

const ServicesDashboard: React.FC<Props> = ({ onLogout, onSwitchType }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const config = dashboardConfigs['services'];
  const theme = colorClasses['blue'];

  const Sidebar = () => (
    <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col shadow-xl z-30">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
         <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <Wrench className="text-white w-6 h-6" />
         </div>
         <div>
           <h1 className="font-bold text-xl tracking-wide">RAY Fix</h1>
           <p className="text-[10px] text-blue-300">إدارة الصيانة والخدمات</p>
         </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <SidebarItem icon={LayoutDashboard} label="الرئيسية" id="overview" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={ClipboardList} label="أوامر الشغل" id="jobs" active={activeTab} setTab={setActiveTab} highlight />
        <SidebarItem icon={Wrench} label="الطلبات الواردة" id="requests" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Calendar} label="جدول الفنيين" id="schedule" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Users} label="فريق العمل" id="technicians" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Settings} label="قطع الغيار" id="spare_parts" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={FileText} label="الفواتير والضمان" id="invoices" active={activeTab} setTab={setActiveTab} />
      </nav>

      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <button onClick={onLogout} className="flex items-center gap-3 text-gray-400 hover:text-white transition w-full p-2 rounded-lg hover:bg-slate-800">
          <LogOut className="w-5 h-5" />
          <span>خروج</span>
        </button>
      </div>
    </aside>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'jobs':
        return <JobOrderManager />;
      case 'requests':
        return <ServiceRequestsView />;
      case 'schedule':
        return <CalendarView type="services" theme={theme} />;
      case 'technicians':
        return <TechnicianTeam />;
      case 'spare_parts':
        return <UniversalDataView type="spare_parts" theme={theme} />;
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
        return <ServicesOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/30 flex font-sans">
      <Sidebar />
      <main className="flex-1 overflow-y-auto h-screen flex flex-col">
        <Header 
          config={config} 
          currentBusinessType="services" 
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
        ? 'bg-blue-600 text-white font-bold shadow-lg' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
      ${highlight && active !== id ? 'text-blue-400' : ''}
    `}
  >
    <Icon className={`w-5 h-5`} />
    <span>{label}</span>
  </button>
);

export default ServicesDashboard;
