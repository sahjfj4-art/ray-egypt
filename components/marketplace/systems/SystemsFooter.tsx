import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { ViewState } from '../../../types';

interface SystemsFooterProps {
  onPageNavigation?: (view: ViewState) => void;
}

const SystemsFooter: React.FC<SystemsFooterProps> = ({ onPageNavigation }) => {
  const [currentYear] = useState(new Date().getFullYear());

  const handleSystemClick = (systemId: string) => {
    console.log('Navigating to system:', systemId);
    if (onPageNavigation) {
      const systemMap: Record<string, ViewState> = {
        'restaurant': ViewState.RESTAURANT,
        'retail': ViewState.RETAIL,
        'clothing': ViewState.CLOTHING,
        'pos': ViewState.POS_SYSTEM,
        'inventory': ViewState.INVENTORY,
        'logistics': ViewState.LOGISTICS,
        'mobileLaundry': ViewState.MOBILE_LAUNDRY,
        'homeServices': ViewState.HOME_SERVICES,
        'dryCleaning': ViewState.DRY_CLEANING,
        'delivery': ViewState.DELIVERY,
        'maintenance': ViewState.MAINTENANCE,
        'cleaning': ViewState.CLEANING,
        'subscriptions': ViewState.SUBSCRIPTIONS,
        'salon': ViewState.SALON,
        'nursery': ViewState.NURSERY,
        'academy': ViewState.ACADEMY,
        'legal': ViewState.LEGAL,
        'resorts': ViewState.RESORTS
      };
      
      const targetView = systemMap[systemId];
      if (targetView) {
        onPageNavigation(targetView);
      } else {
        // Fallback to marketplace if system page not found
        onPageNavigation(ViewState.MARKETPLACE);
      }
    }
  };

  const handlePageClick = (page: string) => {
    console.log('Navigating to page:', page);
    if (onPageNavigation) {
      const viewMap: Record<string, ViewState> = {
        'faq': ViewState.FAQ,
        'blog': ViewState.BLOG,
        'help': ViewState.HELP,
        'privacy-policy': ViewState.PRIVACY_POLICY,
        'terms': ViewState.TERMS,
        'usage-policy': ViewState.USAGE_POLICY,
        'careers': ViewState.CAREERS,
        'partners': ViewState.PARTNERS,
        'development': ViewState.DEVELOPMENT,
        'join-team': ViewState.JOIN_TEAM,
        'training': ViewState.TRAINING,
        'market': ViewState.MARKET,
        'refund-policy': ViewState.REFUND_POLICY
      };
      
      const targetView = viewMap[page];
      if (targetView) {
        onPageNavigation(targetView);
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-yellow-400">منصة راي</h3>
            <p className="text-gray-300 text-sm">
              منصة متكاملة لإدارة جميع أنواع الأنشطة التجارية. حلول ذكية مخصصة لكل عمل.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Support & Help */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-yellow-400">الدعم والمساعدة</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handlePageClick('faq')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full">الأسئلة الشائعة</button></li>
              <li><button onClick={() => handlePageClick('blog')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full">المدونة</button></li>
              <li><button onClick={() => handlePageClick('help')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full">مركز المساعدة</button></li>
              <li><button onClick={() => handlePageClick('market')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full">عين السوق</button></li>
              <li><button onClick={() => handlePageClick('refund-policy')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full">سياسة استرداد الأموال</button></li>
            </ul>
          </div>

          {/* Career & Partners */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-yellow-400">وظائف وشراكات</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handlePageClick('careers')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full">وظائف راي</button></li>
              <li><button onClick={() => handlePageClick('partners')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full">برنامج شركاء راي</button></li>
              <li><button onClick={() => handlePageClick('development')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full">فرص التطوير</button></li>
              <li><button onClick={() => handlePageClick('join-team')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full">الانضمام كفريق</button></li>
              <li><button onClick={() => handlePageClick('training')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full">برنامج التدريب</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-yellow-400">تواصل معنا</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">01012345678</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">info@ray-eg.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">القاهرة، مصر</span>
              </div>
            </div>
          </div>
        </div>

        {/* Systems Showcase - Like Rakaz */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Booking Systems */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-yellow-400">أنظمة الحجوزات</h4>
              <ul className="space-y-2">
                <li><button onClick={() => handleSystemClick('subscriptions')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة الحجوزات</button></li>
                <li><button onClick={() => handleSystemClick('salon')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة صوالين التجميل والحلاقة</button></li>
                <li><button onClick={() => handleSystemClick('nursery')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة الحضانات</button></li>
                <li><button onClick={() => handleSystemClick('carwash')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة مغاسل السيارات</button></li>
                <li><button onClick={() => handleSystemClick('academy')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة الأكاديميات والأندية الرياضية</button></li>
                <li><button onClick={() => handleSystemClick('restaurant')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة حجوزات المطاعم</button></li>
                <li><button onClick={() => handleSystemClick('medical')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة المجمعات الطبية</button></li>
                <li><button onClick={() => handleSystemClick('legal')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة مكاتب المحاماة</button></li>
                <li><button onClick={() => handleSystemClick('consulting')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة الشركات الإستشارية</button></li>
                <li><button onClick={() => handleSystemClick('resorts')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام ادارة حجوزات الشاليهات و المنتجعات</button></li>
              </ul>
            </div>

            {/* Service Systems */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-yellow-400">أنظمة الخدمات</h4>
              <ul className="space-y-2">
                <li><button onClick={() => handleSystemClick('cleaning')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة خدمات التنظيف</button></li>
                <li><button onClick={() => handleSystemClick('maintenance')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة الصيانة</button></li>
                <li><button onClick={() => handleSystemClick('delivery')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة خدمات التوصيل</button></li>
                <li><button onClick={() => handleSystemClick('dryCleaning')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة المغاسل والدراي كلين</button></li>
                <li><button onClick={() => handleSystemClick('homeServices')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة الخدمات المنزلية</button></li>
                <li><button onClick={() => handleSystemClick('mobileLaundry')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام الغسيل المتنقل</button></li>
                <li><button onClick={() => handleSystemClick('logistics')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة الخدمات اللوجستية</button></li>
              </ul>
            </div>

            {/* Sales & Retail Systems */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-yellow-400">أنظمة المبيعات</h4>
              <ul className="space-y-2">
                <li><button onClick={() => handleSystemClick('retail')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة محلات التجزئة</button></li>
                <li><button onClick={() => handleSystemClick('restaurant')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة المطاعم</button></li>
                <li><button onClick={() => handleSystemClick('clothing')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة محلات الملابس</button></li>
                <li><button onClick={() => handleSystemClick('cars')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة السيارات</button></li>
                <li><button onClick={() => handleSystemClick('subscriptions')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة الاشتراكات</button></li>
                <li><button onClick={() => handleSystemClick('pos')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة نقاط البيع</button></li>
                <li><button onClick={() => handleSystemClick('inventory')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة المخزون</button></li>
                <li><button onClick={() => handleSystemClick('salesAccounting')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة المبيعات والمحاسبة</button></li>
              </ul>
            </div>

            {/* Professional & Other Systems */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-yellow-400">أنظمة المهن</h4>
              <ul className="space-y-2">
                <li><button onClick={() => handleSystemClick('clinic')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة العيادات</button></li>
                <li><button onClick={() => handleSystemClick('salon')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة الصالونات</button></li>
                <li><button onClick={() => handleSystemClick('gym')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة الأندية الرياضية</button></li>
                <li><button onClick={() => handleSystemClick('realestate')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة العقارات</button></li>
                <li><button onClick={() => handleSystemClick('contracting')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة المقاولات</button></li>
                <li><button onClick={() => handleSystemClick('agriculture')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة الزراعة</button></li>
                <li><button onClick={() => handleSystemClick('construction')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة الإنشاءات</button></li>
                <li><button onClick={() => handleSystemClick('workshop')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة الورش والمصانع</button></li>
                <li><button onClick={() => handleSystemClick('electrical')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة شركات الكهرباء</button></li>
                <li><button onClick={() => handleSystemClick('painting')} className="text-gray-300 hover:text-yellow-400 transition text-right w-full text-sm">نظام إدارة شركات الدهانات</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            {currentYear} منصة راي. جميع الحقوق محفوظة.
          </p>
          <div className="flex space-x-6 space-x-reverse mt-4 md:mt-0">
            <button onClick={() => handlePageClick('privacy-policy')} className="text-gray-400 hover:text-yellow-400 transition text-sm">سياسة الخصوصية</button>
            <button onClick={() => handlePageClick('terms')} className="text-gray-400 hover:text-yellow-400 transition text-sm">الشروط والأحكام</button>
            <button onClick={() => handlePageClick('usage-policy')} className="text-gray-400 hover:text-yellow-400 transition text-sm">سياسة الاستخدام</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SystemsFooter;
 