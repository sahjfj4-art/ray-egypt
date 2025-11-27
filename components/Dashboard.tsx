import React, { useState, useEffect } from 'react';
import GeminiAssistant from './common/GeminiAssistant';
import Header from './dashboard/layout/Header';
import Sidebar from './dashboard/layout/Sidebar';
import MobileSidebar from './dashboard/layout/MobileSidebar';
import { BusinessType, colorClasses, dashboardConfigs } from './dashboard/config';

// Import Specific Dashboards
import RestaurantDashboard from './dashboard/restaurant/RestaurantDashboard';
import RetailDashboard from './dashboard/retail/RetailDashboard';
import RealEstateDashboard from './dashboard/realestate/RealEstateDashboard';
import CarsDashboard from './dashboard/cars/CarsDashboard';
import ClinicDashboard from './dashboard/clinic/ClinicDashboard';
import GymDashboard from './dashboard/gym/GymDashboard';
import ServicesDashboard from './dashboard/services/ServicesDashboard';
import LaundryDashboard from './dashboard/laundry/LaundryDashboard';
import ClothingDashboard from './dashboard/clothing/ClothingDashboard';
import SalonDashboard from './dashboard/salon/SalonDashboard';
import ContractingDashboard from './dashboard/contracting/ContractingDashboard';
import PlumbingDashboard from './dashboard/plumbing/PlumbingDashboard';
import PaintingDashboard from './dashboard/painting/PaintingDashboard';
import HardwareDashboard from './dashboard/hardware/HardwareDashboard';
import ElectricalDashboard from './dashboard/electrical/ElectricalDashboard';
import ConstructionDashboard from './dashboard/construction/ConstructionDashboard';
import CarwashDashboard from './dashboard/carwash/CarwashDashboard';
import LogisticsDashboard from './dashboard/logistics/LogisticsDashboard';
import AgricultureDashboard from './dashboard/agriculture/AgricultureDashboard';
import MobileLaundryDashboard from './dashboard/mobileLaundry/MobileLaundryDashboard';
import AdminDashboard from './dashboard/admin/AdminDashboard';
import GeneralOverview from './dashboard/views/GeneralOverview';

// Fallback for generic
import Overview from './dashboard/views/Overview';

interface DashboardProps {
  onLogout: () => void;
  initialType: BusinessType;
  isAdmin?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, initialType, isAdmin = false }) => {
  const [currentBusinessType, setCurrentBusinessType] = useState<BusinessType>(isAdmin ? 'admin' : initialType);
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Ensure if initialType changes, we update
  useEffect(() => {
    if (initialType) {
      setCurrentBusinessType(initialType);
    }
  }, [initialType]);

  const renderGenericDashboard = () => {
    const config = dashboardConfigs[currentBusinessType] || dashboardConfigs['restaurant'];
    const theme = colorClasses[config.themeColor] || colorClasses['blue'];
    
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex font-sans transition-colors">
        <Sidebar 
          config={config} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLogout={onLogout} 
          currentBusinessType={currentBusinessType}
        />
        <MobileSidebar 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          config={config}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={onLogout}
        />
        <main className="flex-1 overflow-y-auto h-screen flex flex-col">
          <Header 
            config={config} 
            currentBusinessType={currentBusinessType} 
            setCurrentBusinessType={setCurrentBusinessType} 
            theme={theme}
            onMenuClick={() => setIsMobileMenuOpen(true)}
            onNavigate={setActiveTab}
          />
          <div className="p-6 max-w-7xl mx-auto flex-1 w-full">
            <Overview 
              config={config} 
              currentBusinessType={currentBusinessType} 
              theme={theme} 
              onNavigate={setActiveTab}
            />
          </div>
        </main>
      </div>
    );
  };

  const renderGeneralHub = () => {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans transition-colors">
        <Sidebar 
          config={dashboardConfigs['general']} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLogout={onLogout} 
          currentBusinessType={'general'}
        />
        <MobileSidebar 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          config={dashboardConfigs['general']}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={onLogout}
        />
        <main className="flex-1 overflow-y-auto h-screen flex flex-col">
          <Header 
            config={dashboardConfigs['general']} 
            currentBusinessType={'general'} 
            setCurrentBusinessType={setCurrentBusinessType} 
            theme={colorClasses['slate']}
            onMenuClick={() => setIsMobileMenuOpen(true)}
            onNavigate={setActiveTab}
          />
          <div className="flex-1 w-full max-w-7xl mx-auto">
             <GeneralOverview onSwitchType={setCurrentBusinessType} />
          </div>
        </main>
      </div>
    );
  };

  const renderDashboard = () => {
    switch (currentBusinessType) {
      case 'general':
        return renderGeneralHub();
      case 'restaurant':
        return <RestaurantDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'retail':
        return <RetailDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} type="retail" />;
      case 'pharmacy':
        return <RetailDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} type="pharmacy" />;
      case 'realestate':
        return <RealEstateDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'cars':
        return <CarsDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'clinic':
        return <ClinicDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'gym':
        return <GymDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'services':
        return <ServicesDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'laundry':
        return <LaundryDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'clothing':
        return <ClothingDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'salon':
        return <SalonDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'contracting':
        return <ContractingDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'plumbing':
        return <PlumbingDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'painting':
        return <PaintingDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'hardware':
        return <HardwareDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'electrical':
        return <ElectricalDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'construction':
        return <ConstructionDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'carwash':
        return <CarwashDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'logistics':
        return <LogisticsDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'agriculture':
        return <AgricultureDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'mobileLaundry':
        return <MobileLaundryDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'subscriptions':
      case 'nursery':
            case 'academy':
      case 'medical':
      case 'legal':
      case 'consulting':
      case 'resorts':
      case 'cleaning':
      case 'maintenance':
      case 'delivery':
      case 'dryCleaning':
      case 'homeServices':
      case 'pos':
      case 'inventory':
      case 'salesAccounting':
      case 'workshop':
        // Use ServicesDashboard as base for new systems
        return <ServicesDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} type={currentBusinessType} />;
      case 'admin':
        return <AdminDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      default:
        return renderGenericDashboard();
    }
  };

  return (
    <>
      {renderDashboard()}
      <GeminiAssistant context="merchant" />
    </>
  );
};

export default Dashboard;