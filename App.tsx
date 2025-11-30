
import React, { useState, useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Marketplace from './components/Marketplace';
import Dashboard from './components/Dashboard';
import DashboardNew from './components/dashboard/Dashboard';
import Reports from './components/reports/Reports';
import Navigation from './components/layout/Navigation';
import RayEgyptSystem from './components/ray-egypt/RayEgyptSystem';
import FAQView from './components/pages/interactive/FAQView';
import BlogView from './components/pages/interactive/BlogView';
import HelpView from './components/pages/interactive/HelpView';
import PrivacyPolicyView from './components/pages/static/PrivacyPolicyView';
import CareersView from './components/pages/interactive/CareersView';
import RestaurantView from './components/pages/systems/RestaurantView';
import { ViewState } from './types';
import { BusinessType } from './components/dashboard/config';
import { ThemeProvider } from './components/common/ThemeContext';
import { RAY_DESIGN_SYSTEM, rayUtils } from './components/common/DesignSystem';
import apiClient from './lib/api-client';

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

  const handleRayEgyptNavigation = (view: string) => {
    if (view === 'RAY_EGYPT') {
      setCurrentView(ViewState.RAY_EGYPT);
    }
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
          onPageNavigation={handleRayEgyptNavigation}
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
      {currentView === ViewState.FAQ && <FAQView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.BLOG && <BlogView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.HELP && <HelpView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.PRIVACY_POLICY && <PrivacyPolicyView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.TERMS && <PrivacyPolicyView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.USAGE_POLICY && <PrivacyPolicyView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.CAREERS && <CareersView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.PARTNERS && <FAQView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.DEVELOPMENT && <FAQView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.JOIN_TEAM && <FAQView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.TRAINING && <FAQView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.MARKET && <Marketplace onMerchantClick={handleMerchantEntry} onAdminLogin={handleAdminLogin} onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.REFUND_POLICY && <FAQView onPageNavigation={handleRayEgyptNavigation} />}
      {/* System Views */}
      {currentView === ViewState.RESTAURANT && <RestaurantView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.RETAIL && <FAQView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.CLOTHING && <FAQView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.POS_SYSTEM && <FAQView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.INVENTORY && <FAQView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.LOGISTICS && <FAQView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.MOBILE_LAUNDRY && <FAQView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.HOME_SERVICES && <FAQView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.DRY_CLEANING && <FAQView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.DELIVERY && <FAQView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.MAINTENANCE && <FAQView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.CLEANING && <FAQView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.SUBSCRIPTIONS && <FAQView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.SALON && <FAQView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.NURSERY && <FAQView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.ACADEMY && <FAQView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.LEGAL && <FAQView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.RESORTS && <FAQView onPageNavigation={handleRayEgyptNavigation} />}
      {currentView === ViewState.RAY_EGYPT && <RayEgyptSystem />}
    </ThemeProvider>
    <SpeedInsights />
  );
};

export default App;
