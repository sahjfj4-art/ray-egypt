
import React, { useState, useEffect } from 'react';
import Marketplace from './components/Marketplace';
import Dashboard from './components/Dashboard';
import FAQView from './components/pages/FAQView';
import BlogView from './components/pages/BlogView';
import HelpView from './components/pages/HelpView';
import PrivacyPolicyView from './components/pages/PrivacyPolicyView';
import CareersView from './components/pages/CareersView';
import RestaurantView from './components/pages/systems/RestaurantView';
import { ViewState } from './types';
import { BusinessType } from './components/dashboard/config';
import { ThemeProvider } from './components/common/ThemeContext';
import { RAY_DESIGN_SYSTEM, rayUtils } from './components/common/DesignSystem';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.MARKETPLACE);
  const [selectedBusinessType, setSelectedBusinessType] = useState<BusinessType>('restaurant');
  const [isAdmin, setIsAdmin] = useState(false);

  // Splash Screen Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleMerchantEntry = (type: string = 'restaurant', admin: boolean = false) => {
    setSelectedBusinessType(type as BusinessType);
    setIsAdmin(admin);
    setCurrentView(ViewState.DASHBOARD);
  };

  const handlePageNavigation = (view: ViewState) => {
    setCurrentView(view);
  };

  // Handle admin login
  const handleAdminLogin = () => {
    setIsAdmin(true);
    setSelectedBusinessType('admin');
    setCurrentView(ViewState.DASHBOARD);
  };

  if (isLoading) {
    return (
      <div 
        className="fixed inset-0 flex items-center justify-center z-50 flex-col"
        style={{ backgroundColor: RAY_DESIGN_SYSTEM.colors.primary[500] }}
      >
        <div 
          className="w-24 h-24 rounded-3xl flex items-center justify-center animate-bounce"
          style={{ 
            backgroundColor: RAY_DESIGN_SYSTEM.colors.secondary[500],
            boxShadow: RAY_DESIGN_SYSTEM.shadows.ray
          }}
        >
          <span 
            className="text-6xl font-black"
            style={{ color: RAY_DESIGN_SYSTEM.colors.primary[500] }}
          >
            R
          </span>
        </div>
        <h1 
          className="text-3xl font-black mt-6 tracking-wider animate-pulse"
          style={{ color: 'white' }}
        >
          RAY
        </h1>
        <p className="text-blue-200 mt-2 text-sm font-medium">نور طريق نجاحك</p>
      </div>
    );
  }

  return (
    <ThemeProvider>
      {currentView === ViewState.MARKETPLACE && (
        <Marketplace 
          onMerchantClick={handleMerchantEntry} 
          onAdminLogin={handleAdminLogin}
          onPageNavigation={handlePageNavigation}
        />
      )}
      {currentView === ViewState.DASHBOARD && (
        <Dashboard 
          initialType={selectedBusinessType} 
          isAdmin={isAdmin}
          onLogout={() => {
            setCurrentView(ViewState.MARKETPLACE);
            setIsAdmin(false);
          }} 
        />
      )}
      {currentView === ViewState.FAQ && <FAQView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.BLOG && <BlogView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.HELP && <HelpView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.PRIVACY_POLICY && <PrivacyPolicyView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.TERMS && <PrivacyPolicyView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.USAGE_POLICY && <PrivacyPolicyView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.CAREERS && <CareersView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.PARTNERS && <FAQView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.DEVELOPMENT && <FAQView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.JOIN_TEAM && <FAQView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.TRAINING && <FAQView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.MARKET && <Marketplace onMerchantClick={handleMerchantEntry} onAdminLogin={handleAdminLogin} onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.REFUND_POLICY && <FAQView onPageNavigation={handlePageNavigation} />}
      {/* System Views */}
      {currentView === ViewState.RESTAURANT && <RestaurantView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.RETAIL && <FAQView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.CLOTHING && <FAQView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.POS_SYSTEM && <FAQView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.INVENTORY && <FAQView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.LOGISTICS && <FAQView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.MOBILE_LAUNDRY && <FAQView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.HOME_SERVICES && <FAQView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.DRY_CLEANING && <FAQView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.DELIVERY && <FAQView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.MAINTENANCE && <FAQView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.CLEANING && <FAQView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.SUBSCRIPTIONS && <FAQView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.SALON && <FAQView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.NURSERY && <FAQView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.ACADEMY && <FAQView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.LEGAL && <FAQView onPageNavigation={handlePageNavigation} />}
      {currentView === ViewState.RESORTS && <FAQView onPageNavigation={handlePageNavigation} />}
    </ThemeProvider>
  );
};

export default App;
