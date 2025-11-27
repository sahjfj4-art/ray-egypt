import React, { useState } from 'react';
import { 
  ArrowRight, CheckCircle, Sparkles, Users, TrendingUp, 
  Shield, Zap, BarChart3, ArrowLeft, Play, Image as ImageIcon
} from 'lucide-react';
import { systemsData } from '../data';
import SystemsHeader from './SystemsHeader';
import SystemsFooter from './SystemsFooter';

interface SystemLandingPageProps {
  systemId: string;
  onBack: () => void;
  onStartDashboard: (systemId: string) => void;
}

const SystemLandingPage: React.FC<SystemLandingPageProps> = ({ 
  systemId, 
  onBack, 
  onStartDashboard 
}) => {
  const system = systemsData[systemId];
  const [activeTab, setActiveTab] = useState('overview');

  if (!system) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">النظام غير موجود</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
      {/* Header */}
      <SystemsHeader onNavigateHome={onBack} />

      {/* Main Content */}
      <div className="flex-1">
        {/* Hero Section */}
        <div className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-6xl mx-auto">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold mb-8 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              العودة للأنظمة
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Side - Info */}
              <div>
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 bg-gradient-to-br ${system.color} text-white shadow-lg`}>
                  <system.icon className="w-10 h-10" />
                </div>
                
                <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
                  {system.title}
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  {system.description}
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <button 
                    onClick={() => onStartDashboard(systemId)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                  >
                    <Sparkles className="w-5 h-5" />
                    ابدأ الآن مجاناً
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  
                  <button className="border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-900 transition">
                    <Play className="w-5 h-5" />
                    شاهد الفيديو
                  </button>
                </div>

                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-3xl font-black text-blue-600 dark:text-blue-400">100%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">مجاني</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-green-600 dark:text-green-400">24/7</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">دعم فني</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-purple-600 dark:text-purple-400">∞</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">إمكانيات</div>
                  </div>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="relative">
                <div className={`w-full h-96 rounded-3xl bg-gradient-to-br ${system.color} opacity-10 absolute inset-0`}></div>
                <img 
                  src={system.image} 
                  alt={system.title}
                  className="w-full h-96 object-cover rounded-3xl shadow-2xl relative z-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-800 sticky top-16 bg-white dark:bg-gray-950 z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8">
              {[
                { id: 'overview', label: 'نظرة عامة' },
                { id: 'features', label: 'المميزات' },
                { id: 'benefits', label: 'الفوائد' },
                { id: 'pricing', label: 'الأسعار' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 font-bold border-b-2 transition ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {activeTab === 'overview' && (
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">عن هذا النظام</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {system.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {system.benefits.map((benefit, idx) => (
                  <div key={idx} className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-12">المميزات الرئيسية</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {system.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                        <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-12">الفوائد</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {system.benefits.map((benefit, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-2xl border border-blue-200 dark:border-blue-800">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{benefit.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="text-center py-12">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">التسعير</h2>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-12 rounded-3xl border-2 border-green-200 dark:border-green-800 max-w-2xl mx-auto">
                <div className="text-6xl font-black text-green-600 dark:text-green-400 mb-4">مجاني</div>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                  استمتع بجميع المميزات بدون أي رسوم
                </p>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    جميع المميزات مفتوحة
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    بدون حد أقصى للمستخدمين
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    دعم فني 24/7
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    تحديثات مستمرة
                  </li>
                </ul>
                <button 
                  onClick={() => onStartDashboard(systemId)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  ابدأ الآن
                </button>
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-black text-white mb-6">جاهز للبدء؟</h2>
            <p className="text-xl text-blue-100 mb-8">
              احصل على لوحة تحكم كاملة الآن بدون أي رسوم
            </p>
            <button 
              onClick={() => onStartDashboard(systemId)}
              className="bg-white hover:bg-gray-100 text-blue-600 px-10 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <Sparkles className="w-6 h-6" />
              ابدأ الآن مجاناً
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <SystemsFooter />
    </div>
  );
};

export default SystemLandingPage;
