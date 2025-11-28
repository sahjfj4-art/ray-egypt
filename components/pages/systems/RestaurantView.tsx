import React from 'react';
import { Utensils, Users, Clock, Star, TrendingUp, Shield, Smartphone, BarChart3 } from 'lucide-react';
import { ViewState } from '../../../types';

interface RestaurantViewProps {
  onPageNavigation: (view: ViewState) => void;
}

const RestaurantView: React.FC<RestaurantViewProps> = ({ onPageNavigation }) => {
  const features = [
    {
      icon: Utensils,
      title: 'إدارة القوائم',
      description: 'إدارة كاملة للقوائم والأسعار والوصفات'
    },
    {
      icon: Users,
      title: 'نظام الحجوزات',
      description: 'حجز الطاولات وإدارة الطلبات عبر الإنترنت'
    },
    {
      icon: Clock,
      title: 'تتبع الطلبات',
      description: 'تتبع حالة الطلبات في الوقت الفعلي'
    },
    {
      icon: Star,
      title: 'تقييم العملاء',
      description: 'نظام تقييمات وتقييمات العملاء المتكامل'
    },
    {
      icon: TrendingUp,
      title: 'تحليلات المبيعات',
      description: 'تقارير مفصلة عن المبيعات والأداء'
    },
    {
      icon: Shield,
      title: 'أمان البيانات',
      description: 'حماية كاملة لبيانات العملاء والمبيعات'
    }
  ];

  const modules = [
    { name: 'نظام نقاط البيع', price: '2,500 ج.م' },
    { name: 'إدارة المخزون', price: '1,800 ج.م' },
    { name: 'نظام الحجوزات', price: '1,200 ج.م' },
    { name: 'تطبيق العميل', price: '3,000 ج.م' },
    { name: 'نظام التوصيل', price: '1,500 ج.م' },
    { name: 'تحليلات وتقارير', price: '800 ج.م' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Utensils className="w-12 h-12" />
            <h1 className="text-4xl font-bold">نظام إدارة المطاعم</h1>
          </div>
          <p className="text-xl mb-8">حل متكامل لإدارة مطعمك من الألف للياء</p>
          <div className="flex gap-4">
            <button className="bg-yellow-400 text-orange-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition">
              اطلب الآن
            </button>
            <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition">
              تجربة مجانية
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">500+</div>
              <div className="text-gray-600">مطعم يستخدم النظام</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-gray-600">رضا العملاء</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">دعم فني</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">15%</div>
              <div className="text-gray-600">زيادة في المبيعات</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">مميزات النظام</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modules Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">وحدات النظام</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-lg transition">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">{module.name}</h4>
                  <span className="text-orange-600 font-bold">{module.price}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-2">السعر الكامل: 10,800 ج.م</div>
            <p className="text-gray-600 mb-4">خصم 20% للدفع السنوي</p>
            <button className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition">
              اطلب النظام الكامل
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">جرب النظام اليوم</h2>
          <p className="text-xl text-gray-600 mb-8">14 يوماً تجربة مجانية بدون التزام</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition">
              ابدأ التجربة المجانية
            </button>
            <button 
              onClick={() => onPageNavigation(ViewState.CONTACT)}
              className="bg-white text-orange-600 border-2 border-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition"
            >
              تواصل مع المبيعات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantView;
