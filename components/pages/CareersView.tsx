import React from 'react';
import { ArrowRight, Users, Target, Award, MapPin, Clock } from 'lucide-react';
import { ViewState } from '../../types';

interface CareersViewProps {
  onPageNavigation: (view: ViewState) => void;
}

const CareersView: React.FC<CareersViewProps> = ({ onPageNavigation }) => {
  const opportunities = [
    {
      title: 'Frontend Developer',
      department: 'التقنية',
      location: 'القاهرة',
      type: 'دوام كامل',
      experience: '3-5 سنوات',
      description: 'نبحث عن مطور Frontend محترف للانضمام لفريقنا التقني'
    },
    {
      title: 'UX/UI Designer',
      department: 'التصميم',
      location: 'الرياض',
      type: 'دوام كامل',
      experience: '2-4 سنوات',
      description: 'مصمم مبدع لتطوير تجربة المستخدم في منصتنا'
    },
    {
      title: 'Product Manager',
      department: 'الإدارة',
      location: 'دبي',
      type: 'دوام كامل',
      experience: '5+ سنوات',
      description: 'مدير منتجات خبرة لإدارة وتطوير منتجاتنا'
    }
  ];

  const benefits = [
    { icon: Users, title: 'فريق عمل محترف', description: 'انضم لفريق من أفضل المواهب' },
    { icon: Target, title: 'تطوير مهني', description: 'برامج تدريبية وتطوير مستمر' },
    { icon: Award, title: 'مزايا تنافسية', description: 'راتب مميز + حوافز وعلاوات' },
    { icon: MapPin, title: 'مرونة المكان', description: 'إمكانية العمل من أي فرع' },
    { icon: Clock, title: 'توازن العمل', description: 'ساعات عمل مرنة وإجازات سنوية' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">وظائف راي</h1>
          <p className="text-xl mb-8">انضم لفريقنا وكن جزءاً من مستقبل إدارة الأعمال</p>
          <button className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition">
            استكشف الفرص المتاحة
          </button>
        </div>
      </div>

      {/* Opportunities Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">الفرص المتاحة</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((opp, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">{opp.title}</h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">القسم:</span>
                  <span>{opp.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">الموقع:</span>
                  <span>{opp.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">نوع العمل:</span>
                  <span>{opp.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">الخبرة:</span>
                  <span>{opp.experience}</span>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-200 mb-4">{opp.description}</p>
              <button className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition flex items-center justify-center gap-2">
                التقديم الآن
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">لماذا تعمل معنا؟</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 dark:bg-gray-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">هل أنت مستعد للانضمام إلينا؟</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">أرسل سيرتك الذاتية وكن جزءاً من رحلتنا</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              إرسال السيرة الذاتية
            </button>
            <button 
              onClick={() => onPageNavigation(ViewState.HELP)}
              className="bg-white dark:bg-gray-800 text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-700 transition"
            >
              تواصل معنا
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersView;
