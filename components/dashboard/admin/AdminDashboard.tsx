import React, { useState, useEffect } from 'react';
import { 
  Shield, Users, FileText, Truck, MapPin, DollarSign, 
  Settings, LogOut, LayoutDashboard, Package, AlertTriangle,
  BarChart3, PieChart, TrendingUp, Clock, CheckCircle, Store,
  ShoppingCart, CheckSquare, UserCircle, Menu, X, Sun, Moon,
  Globe, Smartphone, Monitor, Home, Building, UserCheck, CreditCard
} from 'lucide-react';
import { RAY_DESIGN_SYSTEM } from '../../common/DesignSystem';

// استيراد المكونات
import AdminOverview from './AdminOverview';
import UsersManager from './UsersManager';
import ReportsManager from './ReportsManager';
import ShippingManager from './ShippingManager';
import DeliveryManager from './DeliveryManager';
import SystemSettings from './SystemSettings';
import AuditLogs from './AuditLogs';
import ApprovalManager from './ApprovalManager';
import BusinessManager from './BusinessManager';
import CustomersManager from './CustomersManager';
import OrdersManager from './OrdersManager';
import PendingBusinessesManager from './PendingBusinessesManager';
import PaymentsManager from './PaymentsManager';
import SubscriptionsManager from './SubscriptionsManager';

interface Props {
  onLogout: () => void;
  onSwitchType?: (type: string) => void;
}

const AdminDashboard: React.FC<Props> = ({ onLogout, onSwitchType }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('ar');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  // تحديد نوع الجهاز
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // تطبيق الوضع الليلي
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // تطبيق اتجاه النص حسب اللغة
  useEffect(() => {
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'ar' ? 'en' : 'ar');
  };

  const translations = {
    ar: {
      title: 'لوحة التحكم الإدارية',
      subtitle: 'إدارة شاملة للمنصة والعمليات',
      adminControl: 'مركز التحكم الإداري',
      platformManagement: 'إدارة المنصة والعمليات',
      logout: 'خروج',
      dashboard: 'لوحة التحكم',
      businesses: 'المحلات والأنشطة',
      customers: 'العملاء الموحد',
      orders: 'الطلبات المجمعة',
      approvals: 'الموافقات والطلبات',
      users: 'المستخدمين والصلاحيات',
      roles: 'الأدوار والمجموعات',
      reports: 'التقارير المجمعة',
      analytics: 'التحليلات والإحصائيات',
      performance: 'الأداء والمؤشرات',
      shipping: 'إدارة الشحنات',
      delivery: 'التوصيل والتوزيع',
      warehouses: 'المخازن والمستودعات',
      settings: 'إعدادات النظام',
      alerts: 'التنبيهات والإنذارات',
      audit: 'سجل النشاطات',
      systemNormal: 'النظام يعمل بشكل طبيعي',
      mobile: 'موبايل',
      tablet: 'تابلت',
      desktop: 'كمبيوتر',
      light: 'نهاري',
      dark: 'ليلي',
      changeLanguage: 'تغيير اللغة'
    },
    en: {
      title: 'Admin Dashboard',
      subtitle: 'Comprehensive Platform & Operations Management',
      adminControl: 'Admin Control Center',
      platformManagement: 'Platform & Operations Management',
      logout: 'Logout',
      dashboard: 'Dashboard',
      businesses: 'Businesses',
      customers: 'Customers',
      orders: 'Orders',
      approvals: 'Approvals',
      users: 'Users & Permissions',
      roles: 'Roles & Groups',
      reports: 'Reports',
      analytics: 'Analytics',
      performance: 'Performance',
      shipping: 'Shipping',
      delivery: 'Delivery',
      warehouses: 'Warehouses',
      settings: 'System Settings',
      alerts: 'Alerts',
      audit: 'Activity Log',
      systemNormal: 'System Normal',
      mobile: 'Mobile',
      tablet: 'Tablet',
      desktop: 'Desktop',
      light: 'Light',
      dark: 'Dark',
      changeLanguage: 'Change Language'
    }
  };

  const t = translations[currentLanguage as 'ar' | 'en'];

  const menuItems = [
    // المحرك الرئيسي
    { id: 'overview', icon: LayoutDashboard, label: t.dashboard, highlight: true },
    
    // إدارة المحركات
    { id: 'businesses', icon: Store, label: t.businesses, section: '🏪 إدارة المحركات' },
    { id: 'customers', icon: UserCircle, label: t.customers, section: '🏪 إدارة المحركات' },
    { id: 'orders', icon: ShoppingCart, label: t.orders, section: '🏪 إدارة المحركات' },
    { id: 'approvals', icon: CheckSquare, label: t.approvals, section: '🏪 إدارة المحركات' },
    
    // إدارة المستخدمين والصلاحيات
    { id: 'users', icon: Users, label: t.users, section: '👥 إدارة المستخدمين' },
    { id: 'roles', icon: Shield, label: 'الأدوار والصلاحيات', section: '👥 إدارة المستخدمين' },
    
    // المالية والإيرادات
    { id: 'payments', icon: DollarSign, label: 'إدارة الدفعات', section: '💰 المالية' },
    { id: 'subscriptions', icon: CreditCard, label: 'الاشتراكات والخطط', section: '💰 المالية' },
    { id: 'invoices', icon: FileText, label: 'الفواتير والإيصالات', section: '💰 المالية' },
    
    // التقارير والتحليلات
    { id: 'reports', icon: BarChart3, label: t.reports, section: '📊 التقارير' },
    { id: 'analytics', icon: PieChart, label: t.analytics, section: '📊 التقارير' },
    { id: 'performance', icon: TrendingUp, label: t.performance, section: '📊 التقارير' },
    
    // الشحن والتوصيل
    { id: 'shipping', icon: Truck, label: t.shipping, section: '🚚 الشحن والتوصيل' },
    { id: 'delivery', icon: MapPin, label: t.delivery, section: '🚚 الشحن والتوصيل' },
    { id: 'warehouses', icon: Package, label: 'المخازن والمستودعات', section: '🚚 الشحن والتوصيل' },
    
    // التسويق والعروض
    { id: 'promotions', icon: TrendingUp, label: 'العروض والخصومات', section: '📢 التسويق' },
    { id: 'campaigns', icon: BarChart3, label: 'الحملات الإعلانية', section: '📢 التسويق' },
    
    // النظام والصيانة
    { id: 'settings', icon: Settings, label: t.settings, section: '⚙️ النظام' },
    { id: 'alerts', icon: AlertTriangle, label: 'التنبيهات والإنذارات', section: '⚙️ النظام' },
    { id: 'audit', icon: Clock, label: 'سجل النشاطات', section: '⚙️ النظام' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'businesses':
        return <BusinessManager />;
      case 'customers':
        return <CustomersManager />;
      case 'orders':
        return <OrdersManager />;
      case 'approvals':
        return <ApprovalManager />;
      case 'users':
        return <UsersManager />;
      case 'roles':
        return <UsersManager view="roles" />;
      case 'payments':
        return <PaymentsManager />;
      case 'subscriptions':
        return <SubscriptionsManager />;
      case 'invoices':
        return <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl"><h2 className="text-2xl font-bold mb-4">الفواتير والإيصالات</h2><p className="text-gray-600 dark:text-gray-400">قريباً...</p></div>;
      case 'reports':
        return <ReportsManager />;
      case 'analytics':
        return <ReportsManager view="analytics" />;
      case 'performance':
        return <ReportsManager view="performance" />;
      case 'shipping':
        return <ShippingManager />;
      case 'delivery':
        return <DeliveryManager />;
      case 'warehouses':
        return <ShippingManager view="warehouses" />;
      case 'promotions':
        return <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl"><h2 className="text-2xl font-bold mb-4">العروض والخصومات</h2><p className="text-gray-600 dark:text-gray-400">قريباً...</p></div>;
      case 'campaigns':
        return <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl"><h2 className="text-2xl font-bold mb-4">الحملات الإعلانية</h2><p className="text-gray-600 dark:text-gray-400">قريباً...</p></div>;
      case 'pending-businesses':
        return <PendingBusinessesManager />;
      case 'settings':
        return <SystemSettings />;
      case 'alerts':
        return <SystemSettings view="alerts" />;
      case 'audit':
        return <AuditLogs />;
      default:
        return <AdminOverview setActiveTab={setActiveTab} />;
    }
  };

  const SidebarItem = ({ icon: Icon, label, id, active, setTab, highlight }: any) => (
    <button 
      onClick={() => setTab(id)}
      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group
        ${active === id 
          ? 'bg-gradient-to-r from-red-600 to-red-700 text-white font-bold shadow-lg transform scale-[1.02]' 
          : 'text-gray-400 hover:bg-gray-800 hover:text-white hover:transform hover:scale-[1.01]'}
        ${highlight && active !== id ? 'text-red-400 hover:text-red-300' : ''}
      `}
    >
      <Icon className={`w-5 h-5 transition-transform group-hover:scale-110`} />
      <span className="font-medium">{label}</span>
    </button>
  );

  const Sidebar = () => (
    <aside className={`
      ${deviceType === 'mobile' ? 'fixed inset-y-0 right-0 z-50 w-64 transform transition-transform duration-300 h-screen' : 'hidden lg:flex lg:w-72 h-screen'}
      ${deviceType === 'mobile' && !isMobileMenuOpen ? 'translate-x-full' : 'translate-x-0'}
      bg-gradient-to-b from-gray-900 to-black text-white flex flex-col shadow-2xl border-l border-gray-800
    `}>
      {/* Header */}
      <div className="p-6 border-b border-gray-800 flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg">
          <Shield className="text-white w-7 h-7" />
        </div>
        <div className="flex-1">
          <h1 className="font-bold text-xl tracking-wide bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {t.adminControl}
          </h1>
          <p className="text-gray-400 text-xs mt-1">
            {t.platformManagement}
          </p>
        </div>
        {deviceType === 'mobile' && (
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="mr-auto p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
        {menuItems.map((item, index) => {
          const isNewSection = index === 0 || menuItems[index - 1].section !== item.section;
          
          return (
            <div key={index}>
              {isNewSection && item.section && (
                <div className="mt-4 mb-2 px-3 py-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {item.section}
                  </span>
                </div>
              )}
              <SidebarItem 
                icon={item.icon} 
                label={item.label} 
                id={item.id} 
                active={activeTab} 
                setTab={setActiveTab} 
                highlight={item.highlight}
              />
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 bg-gradient-to-t from-black to-transparent">
        <button 
          onClick={onLogout} 
          className="flex items-center gap-3 text-gray-400 hover:text-white hover:bg-red-600/20 transition-all duration-200 w-full p-3 rounded-xl group"
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-medium">{t.logout}</span>
        </button>
      </div>
    </aside>
  );

  return (
    <div className={`
      min-h-screen font-sans transition-colors duration-300 flex
      ${isDarkMode ? 'bg-gray-950' : 'bg-gradient-to-br from-slate-50 to-gray-100'}
      ${currentLanguage === 'ar' ? 'rtl' : 'ltr'}
    `}>
      {/* Mobile Menu Overlay */}
      {deviceType === 'mobile' && isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Sidebar />
      
      <main className={`
        flex-1 overflow-y-auto flex flex-col
        ${deviceType === 'mobile' ? 'w-full h-screen' : 'h-screen'}
        transition-all duration-300
      `}>
        {/* Top Bar */}
        <div className={`
          px-4 md:px-6 py-4 border-b shadow-sm
          ${isDarkMode 
            ? 'bg-gray-900/90 backdrop-blur border-gray-800' 
            : 'bg-white/80 backdrop-blur border-gray-200'
          }
        `}>
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
              {/* Mobile Menu Toggle */}
              {deviceType === 'mobile' && (
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 md:p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}
              
              <div className="min-w-0 flex-1">
                <h1 className="text-lg md:text-2xl font-bold flex items-center gap-2 md:gap-3 truncate"
                  style={{
                    color: isDarkMode ? '#f9fafb' : '#111827',
                    fontFamily: currentLanguage === 'ar' ? 'Cairo' : 'Inter'
                  }}>
                  <Shield className="w-6 md:w-8 h-6 md:h-8 text-red-600 flex-shrink-0" />
                  <span className="truncate">{t.title}</span>
                </h1>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                  {t.subtitle}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 md:gap-3 flex-shrink-0">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 md:gap-2 p-2 md:p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
                title={t.changeLanguage}
              >
                <Globe className="w-4 md:w-5 h-4 md:h-5 group-hover:scale-110 transition-transform" />
                <span className="hidden lg:inline text-xs md:text-sm font-bold">
                  {currentLanguage === 'ar' ? 'EN' : 'AR'}
                </span>
              </button>
              
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-1 md:gap-2 p-2 md:p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
                title={isDarkMode ? t.light : t.dark}
              >
                {isDarkMode ? (
                  <Sun className="w-4 md:w-5 h-4 md:h-5 group-hover:rotate-180 transition-transform duration-500" />
                ) : (
                  <Moon className="w-4 md:w-5 h-4 md:h-5 group-hover:scale-110 transition-transform" />
                )}
                <span className="hidden lg:inline text-xs md:text-sm font-bold">
                  {isDarkMode ? t.light : t.dark}
                </span>
              </button>
              
              {/* Device Indicator */}
              <div className="hidden sm:flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs md:text-sm text-gray-600 dark:text-gray-300">
                {deviceType === 'mobile' ? (
                  <Smartphone className="w-4 h-4" />
                ) : deviceType === 'tablet' ? (
                  <Monitor className="w-4 h-4" />
                ) : (
                  <Monitor className="w-4 h-4" />
                )}
                <span className="hidden md:inline font-medium">
                  {t[deviceType]}
                </span>
              </div>
              
              {/* Status Indicator */}
              <div className="hidden sm:flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-xs md:text-sm text-green-700 dark:text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span className="hidden md:inline font-medium">
                  {t.systemNormal}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="p-4 md:p-6 max-w-7xl mx-auto flex-1 w-full overflow-x-hidden">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
