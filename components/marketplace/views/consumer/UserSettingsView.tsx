
import React, { useState } from 'react';
import { User, Lock, Bell, Save, Smartphone, Mail } from 'lucide-react';

const UserSettingsView: React.FC = () => {
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    security: true
  });

  return (
    <div className="space-y-8 animate-in fade-in">
      <h3 className="text-2xl font-bold text-ray-black flex items-center gap-2">
        <User className="w-6 h-6 text-ray-blue" />
        إعدادات الحساب
      </h3>

      {/* Personal Info */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h4 className="text-lg font-bold text-gray-800 mb-4">البيانات الشخصية</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-600">الاسم بالكامل</label>
            <div className="relative">
              <User className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
              <input type="text" defaultValue="أحمد علي" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-ray-blue" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-600">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
              <input type="email" defaultValue="ahmed@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-ray-blue" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-600">رقم الهاتف</label>
            <div className="relative">
              <Smartphone className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
              <input type="tel" defaultValue="01012345678" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-ray-blue dir-ltr text-right" />
            </div>
          </div>
        </div>
        <div className="mt-6 text-left">
          <button className="bg-ray-blue text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-800 transition flex items-center gap-2 mr-auto">
            <Save className="w-4 h-4" />
            حفظ التغييرات
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-ray-gold" />
          تفضيلات الإشعارات
        </h4>
        <div className="space-y-4 divide-y divide-gray-50">
          <div className="flex justify-between items-center pt-4 first:pt-0">
            <div>
              <p className="font-bold text-gray-700 text-sm">تحديثات الطلبات</p>
              <p className="text-xs text-gray-500">إشعارات فورية بحالة طلباتك والمندوب</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notifications.orderUpdates} onChange={() => setNotifications({...notifications, orderUpdates: !notifications.orderUpdates})} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>
          <div className="flex justify-between items-center pt-4">
            <div>
              <p className="font-bold text-gray-700 text-sm">العروض والخصومات</p>
              <p className="text-xs text-gray-500">تنبيهات بأحدث الكوبونات والعروض الحصرية</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notifications.promotions} onChange={() => setNotifications({...notifications, promotions: !notifications.promotions})} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5 text-gray-500" />
          الأمان
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-bold text-sm text-gray-700">كلمة المرور</p>
              <p className="text-xs text-gray-500">تم التغيير منذ 3 أشهر</p>
            </div>
            <button className="text-sm font-bold text-ray-blue hover:underline">تغيير</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsView;
