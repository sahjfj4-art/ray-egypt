
import React, { useState } from 'react';
import GeminiAssistant from './common/GeminiAssistant';
import Header from './marketplace/layout/Header';
import Footer from './marketplace/layout/Footer';
import Hero from './marketplace/sections/Hero';
import Featured from './marketplace/sections/Featured';
import OffersAndDeals from './marketplace/sections/OffersAndDeals';
import SystemLandingPage from './marketplace/systems/SystemLandingPage';
import AllSystemsShowcase from './marketplace/systems/AllSystemsShowcase'; 
import MerchantRegisterView from './marketplace/views/MerchantRegisterView';
import { systemsData } from './marketplace/data';


// Listings
import RestaurantListing from './marketplace/listings/RestaurantListing';
import RealEstateListing from './marketplace/listings/RealEstateListing';
import CarListing from './marketplace/listings/CarListing';
import ShoppingListing from './marketplace/listings/ShoppingListing';
import ServiceListing from './marketplace/listings/ServiceListing';
import HealthBeautyListing from './marketplace/listings/HealthBeautyListing';
import EventListing from './marketplace/listings/EventListing';


// Views
import MerchantPublicView from './marketplace/views/MerchantPublicView';
import UserProfileView from './marketplace/views/consumer/UserProfileView';
import CartView from './marketplace/views/consumer/CartView';
import CheckoutView from './marketplace/views/consumer/CheckoutView';
import FavoritesView from './marketplace/views/consumer/FavoritesView';
import NotificationsView from './marketplace/views/consumer/NotificationsView';
import SearchResultsView from './marketplace/views/SearchResultsView';
import OrderTrackingView from './marketplace/views/OrderTrackingView';
import AuthModal from './common/AuthModal';


// Static Views
import AboutView from './marketplace/views/static/AboutView';
import ContactView from './marketplace/views/static/ContactView';
import HelpCenterView from './marketplace/views/static/HelpCenterView';
import LegalView from './marketplace/views/static/LegalView';


interface MarketplaceProps {
  onMerchantClick?: (type?: string) => void;
  onAdminLogin?: () => void;
  onPageNavigation?: (view: string) => void;
}


const Marketplace: React.FC<MarketplaceProps> = ({ onMerchantClick, onAdminLogin, onPageNavigation }) => {
  // Navigation States
  const [activeSystem, setActiveSystem] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMerchant, setSelectedMerchant] = useState<any | null>(null);
  const [currentView, setCurrentView] = useState<string>('home');
  const [viewParams, setViewParams] = useState<any>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authType, setAuthType] = useState<'customer' | 'merchant' | 'admin'>('customer');


  const handleAuthOpen = (mode: 'login' | 'signup' = 'login', type: 'customer' | 'merchant' | 'admin' = 'customer') => {
    setAuthMode(mode);
    setAuthType(type);
    setIsAuthOpen(true);
  };


  const handleAuthSuccess = () => {
    setIsAuthOpen(false);
    if (authType === 'admin') {
      onAdminLogin?.();
    } else if (authType === 'merchant') {
      onMerchantClick?.();
    }
  };


  const handleSystemSelect = (systemId: string) => {
    setActiveSystem(systemId);
    setSelectedCategory(null);
    setSelectedMerchant(null);
    setCurrentView('system-landing'); // Distinct view for system landing
    window.scrollTo(0, 0);
  };


  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveSystem(null);
    setSelectedMerchant(null);
    setCurrentView('home');
    window.scrollTo(0, 0);
  };


  const handleMerchantSelect = (merchantData: any) => {
    setSelectedMerchant(merchantData);
    window.scrollTo(0, 0);
  };


  const goHome = () => {
    setActiveSystem(null);
    setSelectedCategory(null);
    setSelectedMerchant(null);
    setCurrentView('home');
    setViewParams(null);
    window.scrollTo(0, 0);
  };


  const handleNavigate = (view: string, params?: any) => {
    setCurrentView(view);
    if (params) setViewParams(params);
    
    // Reset other states if leaving home context, unless it's a sub-view or systems hub
    if (!['search', 'order-tracking', 'checkout', 'systems-hub', 'merchant-register'].includes(view)) {
        setActiveSystem(null);
        setSelectedCategory(null);
        setSelectedMerchant(null);
    }
    window.scrollTo(0, 0);
  };


  const renderListing = () => {
    switch (selectedCategory) {
      case 'food':
        return <RestaurantListing onMerchantSelect={handleMerchantSelect} />;
      case 'realestate':
        return <RealEstateListing onMerchantSelect={handleMerchantSelect} />;
      case 'cars':
        return <CarListing onMerchantSelect={handleMerchantSelect} />;
      case 'shopping':
        return <ShoppingListing onMerchantSelect={handleMerchantSelect} />;
      case 'services':
        return <ServiceListing onMerchantSelect={handleMerchantSelect} />;
      case 'beauty':
        return <HealthBeautyListing category="beauty" onMerchantSelect={handleMerchantSelect} />;
      case 'health':
        return <HealthBeautyListing category="health" onMerchantSelect={handleMerchantSelect} />;
      case 'education':
        return <EventListing category="education" onMerchantSelect={handleMerchantSelect} />;
      case 'entertainment':
        return <EventListing category="entertainment" onMerchantSelect={handleMerchantSelect} />;
      default:
        return <RestaurantListing onMerchantSelect={handleMerchantSelect} title="المحلات والخدمات" />;
    }
  };


  const renderCurrentView = () => {
    switch(currentView) {
      case 'all-systems': return <AllSystemsShowcase onSystemSelect={handleSystemSelect} />;
      case 'merchant-register': return <MerchantRegisterView systemId={viewParams?.systemId} onComplete={onMerchantClick} onBack={() => handleNavigate('all-systems')} />;
      case 'system-landing': 
        return activeSystem && systemsData[activeSystem] 
          ? <SystemLandingPage 
              systemId={activeSystem}
              onBack={() => handleNavigate('all-systems')}
              onStartDashboard={(systemId) => handleNavigate('merchant-register', { systemId })} 
            />
          : null;
      case 'profile': return <UserProfileView onNavigate={handleNavigate} />;
      case 'cart': return <CartView onNavigate={handleNavigate} />;
      case 'checkout': return <CheckoutView onBack={() => handleNavigate('cart')} onComplete={(id) => handleNavigate('order-tracking', {id})} />;
      case 'favorites': return <FavoritesView />;
      case 'notifications': return <NotificationsView />;
      case 'search': return <SearchResultsView />;
      case 'order-tracking': return <OrderTrackingView onBack={() => handleNavigate('profile')} />;
      
      // Static Pages
      case 'about': return <AboutView />;
      case 'contact': return <ContactView />;
      case 'help': return <HelpCenterView onNavigate={handleNavigate} />;
      case 'terms': return <LegalView type="terms" onBack={() => handleNavigate('home')} />;
      case 'privacy': return <LegalView type="privacy" onBack={() => handleNavigate('home')} />;
      
      default: return null;
    }
  };


  if (selectedMerchant) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 font-sans text-ray-black dark:text-white dir-rtl">
        <MerchantPublicView 
          merchant={selectedMerchant} 
          onBack={() => setSelectedMerchant(null)} 
        />
        <GeminiAssistant context="customer" />
      </div>
    );
  }


  // If registering, show full screen without header/footer distraction (optional, but keeping layout for consistency)
  if (currentView === 'merchant-register') {
     return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans text-ray-black dark:text-white dir-rtl">
           {renderCurrentView()}
        </div>
     );
  }


  // For system views, use separate layout without marketing header/footer
  if (currentView === 'all-systems' || currentView === 'system-landing') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans text-ray-black dark:text-white dir-rtl transition-colors">
        {renderCurrentView()}
        <GeminiAssistant context="customer" />
        <AuthModal 
          isOpen={isAuthOpen} 
          onClose={() => setIsAuthOpen(false)} 
          initialMode={authMode}
          initialType={authType}
          onAdminLogin={onAdminLogin}
        />
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans text-ray-black dark:text-white dir-rtl transition-colors">
      
      <Header 
        onMerchantClick={() => handleNavigate('systems-hub')}
        goHome={goHome} 
        activeSystem={activeSystem}
        onCategorySelect={handleCategorySelect}
        onNavigate={handleNavigate}
        onAuth={() => handleAuthOpen('login', 'admin')}
      />


      {currentView !== 'home' ? (
        renderCurrentView()
      ) : selectedCategory ? (
        renderListing()
      ) : (
        <>
          <Hero />
          <OffersAndDeals onMerchantSelect={handleMerchantSelect} />
        </>
      )}


      <Footer 
        handleSystemSelect={handleSystemSelect} 
        onNavigate={handleNavigate}
      />


      <GeminiAssistant context="customer" />
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialMode={authMode}
        initialType={authType}
        onAdminLogin={onAdminLogin}
      />
    </div>
  );
};


export default Marketplace;
