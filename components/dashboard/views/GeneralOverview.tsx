
import React from 'react';
import { 
  LayoutDashboard, DollarSign, Users, ShoppingBag, 
  Activity, Store, Wallet, ArrowLeft,
  Plus, FileText, Settings, Globe, Shield
} from 'lucide-react';
import { BusinessType, dashboardConfigs } from '../config';
import StatCard from '../../common/cards/StatCard';
import SmartInsightsWidget from '../widgets/SmartInsightsWidget';
import QuickActions from '../widgets/QuickActions';
import BusinessHealthWidget from '../widgets/BusinessHealthWidget';

interface GeneralOverviewProps {
  onSwitchType: (type: BusinessType) => void;
}

const GeneralOverview: React.FC<GeneralOverviewProps> = ({ onSwitchType }) => {
  
  // Aggregate stats
  const globalStats = [
    { title: 'إجمالي الدخل', value: '1.25M', sub: 'هذا الشهر', icon: Wallet, color: 'blue' as const },
    { title: 'الطلبات النشطة', value: '342', sub: 'عبر كل الفروع', icon: ShoppingBag, color: 'orange' as const },
    { title: 'العملاء الجدد', value: '1,205', sub: '+12% نمو', icon: Users, color: 'green' as const },
    { title: 'أداء النظام', value: '99.9%', sub: 'وقت التشغيل', icon: Activity, color: 'purple' as const },
  ];

  // Global Actions
  const globalActions = [
    { label: 'إضافة فرع/نشاط', icon: Plus, action: 'new_branch' },
    { label: 'إدارة المستخدمين', icon: Users, action: 'users' },
    { label: 'التقارير المجمعة', icon: FileText, action: 'reports' },
    { label: 'إعدادات المنصة', icon: Settings, action: 'settings' },
    { label: 'سجل النشاطات', icon: Globe, action: 'audit_log' },
    { label: 'الصلاحيات', icon: Shield, action: 'permissions' },
  ];

  // Context string for AI
  const statsContext = "الدخل: 1.25 مليون (ممتاز)، الطلبات: 342 (نشط)، العملاء الجدد: 1205 (نمو 12%)، النظام مستقر.";

  // Exclude 'general' from apps list
  const apps = Object.entries(dashboardConfigs).filter(([key]) => key !== 'general');

  const handleGlobalAction = (action: string) => {
    console.log("Global Action Triggered:", action);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 p-4 md:p-6 pb-20">
      
      {/* Welcome Section & Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden flex flex-col justify-center min-h-[200px]">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-ray-gold mb-4 border border-white/10">
              <LayoutDashboard className="w-3 h-3" />
              لوحة التحكم الرئيسية
            </div>
            <h1 className="text-2xl md:text-3xl font-black mb-2">مركز القيادة الموحد (RAY Hub)</h1>
            <p className="text-slate-300 max-w-2xl text-sm md:text-lg">
              مرحباً بك. هنا يمكنك متابعة أداء جميع أنشطتك التجارية، إدارة الفروع، والتحكم الكامل في النظام.
            </p>
          </div>
        </div>
        <div className="lg:col-span-1">
           <SmartInsightsWidget dataContext={statsContext} />
        </div>
        <div className="lg:col-span-1">
           <BusinessHealthWidget score={88} />
        </div>
      </div>

      {/* Global Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-slate-500" />
          إجراءات إدارية سريعة
        </h2>
        <QuickActions 
          actions={globalActions} 
          theme={{ lightBtn: 'bg-slate-100 text-slate-600 hover:bg-slate-200', text: 'text-slate-700' }} 
          themeColor="slate"
          onActionClick={handleGlobalAction}
        />
      </div>

      {/* Global Stats */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-slate-500" />
          نظرة عامة على الأداء
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {globalStats.map((stat, idx) => (
            <StatCard 
              key={idx}
              title={stat.title} 
              value={stat.value} 
              sub={stat.sub} 
              icon={stat.icon} 
              color={stat.color} 
            />
          ))}
        </div>
      </div>

      {/* Apps Grid (Launchpad) */}
      <div>
        <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2 border-r-4 border-ray-gold pr-3">
          <Store className="w-6 h-6 text-slate-800" />
          تطبيقات الأعمال والأنظمة
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {apps.map(([key, config]) => {
            const themeColor = config.themeColor || 'blue';
            return (
              <div 
                key={key}
                className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-transparent transition-all duration-300 flex flex-col h-64 relative overflow-hidden"
              >
                {/* Colored Header Bar */}
                <div className={`h-2 w-full bg-${themeColor}-500`}></div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl bg-${themeColor}-50 text-${themeColor}-600 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                      <Store className="w-8 h-8" /> 
                    </div>
                    <div className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></div>
                      نشط
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-ray-blue transition-colors">{config.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    نظام متكامل لإدارة {key === 'restaurant' ? 'المطاعم والكافيهات' : key === 'retail' ? 'محلات التجزئة والمخزون' : 'النشاط التجاري'}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-50">
                    <button 
                      onClick={() => onSwitchType(key as BusinessType)}
                      className={`w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all
                        bg-${themeColor}-600 text-white hover:bg-${themeColor}-700 shadow-md group-hover:shadow-lg transform group-hover:-translate-y-1
                      `}
                    >
                      دخول النظام
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GeneralOverview;
