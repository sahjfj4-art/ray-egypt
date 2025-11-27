import React, { useState } from 'react';
import { BarChart3, Users, TrendingUp, Star, Calendar, Settings, Bell } from 'lucide-react';
import { useTranslation } from '../../common/GlobalSettings';
import { Activity } from '../../../types/activities';

interface SharedDashboardProps {
  activity: Activity;
  merchantName: string;
  onSettingsClick?: () => void;
}

/**
 * SharedDashboard - لوحة تحكم موحدة لجميع الأنشطة
 * تحتوي على:
 * - إحصائيات سريعة
 * - إدارة الحجوزات/الطلبات
 * - إدارة الخدمات/المنتجات
 * - التقييمات والتحليلات
 */

const SharedDashboard: React.FC<SharedDashboardProps> = ({ 
  activity, 
  merchantName,
  onSettingsClick 
}) => {
  const t = useTranslation();
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'services' | 'analytics'>('overview');

  const stats = [
    { 
      label: t.dashboard || 'Dashboard',
      value: '1,245', 
      change: '+12.5%',
      icon: BarChart3,
      color: 'bg-blue-500'
    },
    { 
      label: t.customers || 'العملاء',
      value: '325', 
      change: '+5.2%',
      icon: Users,
      color: 'bg-green-500'
    },
    { 
      label: t.revenue || 'الإيرادات',
      value: '15,850 ج', 
      change: '+23.1%',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    { 
      label: t.rating || 'التقييم',
      value: '4.8', 
      change: '+0.3',
      icon: Star,
      color: 'bg-yellow-500'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{merchantName}</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">{activity.nameAr} • {activity.nameEn}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
                <Bell className="w-6 h-6" />
              </button>
              <button onClick={onSettingsClick} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">{stat.change}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
          <div className="flex border-b border-gray-200 dark:border-gray-800">
            {(['overview', 'bookings', 'services', 'analytics'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 font-bold text-sm transition border-b-2 ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab === 'overview' && 'نظرة عامة'}
                {tab === 'bookings' && 'الحجوزات'}
                {tab === 'services' && 'الخدمات'}
                {tab === 'analytics' && 'التحليلات'}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">نشاطات حديثة</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">حجز جديد #{1000 + i}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">قبل ساعة تقريباً</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-gray-600 dark:text-gray-300">قيد المعالجة</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">الحجوزات والطلبات</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-right py-3 text-gray-600 dark:text-gray-400 font-bold">رقم الحجز</th>
                        <th className="text-right py-3 text-gray-600 dark:text-gray-400 font-bold">العميل</th>
                        <th className="text-right py-3 text-gray-600 dark:text-gray-400 font-bold">التاريخ</th>
                        <th className="text-right py-3 text-gray-600 dark:text-gray-400 font-bold">الحالة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3].map((i) => (
                        <tr key={i} className="border-b border-gray-200 dark:border-gray-700">
                          <td className="py-3">#{1000 + i}</td>
                          <td className="py-3">عميل {i}</td>
                          <td className="py-3">2025-11-27</td>
                          <td className="py-3"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">مؤكد</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">إدارة الخدمات والمنتجات</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">خدمة {i}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">السعر: 500 ج</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-600 dark:text-gray-300">متوفر</span>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700">تعديل</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">التحليلات والتقارير</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">أفضل خدمة</p>
                    <p className="text-xl font-black text-gray-900 dark:text-white">خدمة 1</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">145 طلب هذا الشهر</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">وقت الذروة</p>
                    <p className="text-xl font-black text-gray-900 dark:text-white">3:00 - 5:00 م</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">أعلى حركة</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedDashboard;
