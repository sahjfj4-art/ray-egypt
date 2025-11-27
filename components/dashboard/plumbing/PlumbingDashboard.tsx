import React, { useState } from 'react';
import { 
  Wrench, Package, Truck, Users, ShoppingBag, FileText, 
  Calendar, Settings, LogOut, LayoutDashboard, Clipboard
} from 'lucide-react';
import { BusinessType, dashboardConfigs, colorClasses } from '../config';
import Header from '../layout/Header';
import PlumbingOverview from './PlumbingOverview';
import ProductsManager from './ProductsManager';
import UniversalDataView from '../views/UniversalDataView';
import SupplierManager from '../retail/SupplierManager';
import ExpensesManager from '../finance/ExpensesManager';
import SettingsView from '../views/SettingsView';

interface Props {
  onLogout: () => void;
  onSwitchType: (type: BusinessType) => void;
}

const PlumbingDashboard: React.FC<Props> = ({ onLogout, onSwitchType }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const config = dashboardConfigs['plumbing'];
  const theme = colorClasses['blue'];

  const Sidebar = () => (
    <aside className="w-64 bg-gray-900 dark:bg-black text-white hidden md:flex flex-col shadow-xl z-30 transition-colors">
      <div className="p-6 border-b border-gray-800 flex items-center gap-3">
         <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <Wrench className="text-white w-6 h-6" />
         </div>
         <div>
           <h1 className="font-bold text-xl tracking-wide">المواسير الذهبية</h1>
           <p className="text-gray-400 text-[10px]">للمواسير والأدوات الصحية</p>
         </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <SidebarItem icon={LayoutDashboard} label="لوحة التحكم" id="overview" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Package} label="المنتجات" id="products" active={activeTab} setTab={setActiveTab} highlight />
        <SidebarItem icon={Clipboard} label="المخزون" id="inventory" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Truck} label="الموردين" id="suppliers" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Users} label="العملاء" id="customers" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={ShoppingBag} label="الطلبات والتوصيل" id="orders" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={FileText} label="الفواتير" id="invoices" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Wrench} label="تركيبات" id="installations" active={activeTab} setTab={setActiveTab} />
        
        <div className="my-4 border-t border-gray-800 opacity-50"></div>
        <SidebarItem icon={Settings} label="الإعدادات" id="settings" active={activeTab} setTab={setActiveTab} />
      </nav>

      <div className="p-4 border-t border-gray-800 bg-gray-900 dark:bg-black">
        <button onClick={onLogout} className="flex items-center gap-3 text-gray-400 hover:text-white transition w-full p-2 rounded-lg hover:bg-gray-800">
          <LogOut className="w-5 h-5" />
          <span>خروج</span>
        </button>
      </div>
    </aside>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductsManager businessType="plumbing" />;
      case 'inventory':
        return <UniversalDataView type="inventory" theme={theme} />;
      case 'suppliers':
        return <SupplierManager />;
      case 'customers':
        return <UniversalDataView type="customers" theme={theme} />;
      case 'orders':
        return <UniversalDataView type="orders" theme={theme} />;
      case 'invoices':
        return <ExpensesManager />;
      case 'installations':
        return <UniversalDataView type="installations" theme={theme} />;
      case 'settings':
        return <SettingsView />;
      case 'overview':
      default:
        return <PlumbingOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-blue-50/30 dark:bg-gray-900 flex font-sans transition-colors">
      <Sidebar />
      <main className="flex-1 overflow-y-auto h-screen flex flex-col">
        <Header 
          config={config} 
          currentBusinessType="plumbing" 
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
        : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
      ${highlight && active !== id ? 'text-blue-400' : ''}
    `}
  >
    <Icon className={`w-5 h-5`} />
    <span>{label}</span>
  </button>
);

export default PlumbingDashboard;
