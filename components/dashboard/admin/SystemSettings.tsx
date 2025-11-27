import React, { useState } from 'react';
import { 
  Settings, Shield, Database, Bell, Globe, Palette, Users, Key,
  Save, RefreshCw, CheckCircle, AlertTriangle, Info
} from 'lucide-react';

interface Setting {
  id: string;
  category: string;
  name: string;
  description: string;
  type: 'toggle' | 'text' | 'number' | 'select' | 'email' | 'password';
  value: any;
  options?: string[];
  required?: boolean;
}

const initialSettings: Setting[] = [
  // الإعدادات العامة
  {
    id: 'site_name',
    category: 'general',
    name: 'اسم المنصة',
    description: 'اسم النظام الذي يظهر في الواجهة',
    type: 'text',
    value: 'نظام راي المتكامل',
    required: true
  },
  {
    id: 'site_description',
    category: 'general',
    name: 'وصف المنصة',
    description: 'وصف قصير للنظام',
    type: 'text',
    value: 'منصة متكاملة لإدارة الأعمال'
  },
  {
    id: 'default_language',
    category: 'general',
    name: 'اللغة الافتراضية',
    description: 'لغة الواجهة الافتراضية',
    type: 'select',
    value: 'ar',
    options: ['ar', 'en']
  },
  {
    id: 'timezone',
    category: 'general',
    name: 'المنطقة الزمنية',
    description: 'المنطقة الزمنية للنظام',
    type: 'select',
    value: 'Africa/Cairo',
    options: ['Africa/Cairo', 'Asia/Riyadh', 'Europe/London']
  },

  // إعدادات الأمان
  {
    id: 'force_2fa',
    category: 'security',
    name: 'فرض المصادقة الثنائية',
    description: 'إجبار جميع المستخدمين على استخدام المصادقة الثنائية',
    type: 'toggle',
    value: false
  },
  {
    id: 'session_timeout',
    category: 'security',
    name: 'مدة الجلسة (دقائق)',
    description: 'مدة صلاحية جلسة المستخدم قبل انتهائها',
    type: 'number',
    value: 120
  },
  {
    id: 'max_login_attempts',
    category: 'security',
    name: 'محاولات الدخول القصوى',
    description: 'عدد محاولات الدخول الفاشلة قبل قفل الحساب',
    type: 'number',
    value: 5
  },
  {
    id: 'password_min_length',
    category: 'security',
    name: 'طول كلمة المرور الأدنى',
    description: 'الحد الأدنى لطول كلمة المرور',
    type: 'number',
    value: 8
  },

  // إعدادات الإشعارات
  {
    id: 'email_notifications',
    category: 'notifications',
    name: 'إشعارات البريد الإلكتروني',
    description: 'تفعيل الإشعارات عبر البريد الإلكتروني',
    type: 'toggle',
    value: true
  },
  {
    id: 'sms_notifications',
    category: 'notifications',
    name: 'إشعارات الرسائل النصية',
    description: 'تفعيل الإشعارات عبر الرسائل النصية',
    type: 'toggle',
    value: false
  },
  {
    id: 'push_notifications',
    category: 'notifications',
    name: 'الإشعارات الفورية',
    description: 'تفعيل الإشعارات الفورية في المتصفح',
    type: 'toggle',
    value: true
  },

  // إعدادات قاعدة البيانات
  {
    id: 'backup_frequency',
    category: 'database',
    name: 'تكرار النسخ الاحتياطي',
    description: 'مدة تكرار النسخ الاحتياطي التلقائي',
    type: 'select',
    value: 'daily',
    options: ['hourly', 'daily', 'weekly', 'monthly']
  },
  {
    id: 'backup_retention',
    category: 'database',
    name: 'فترة الاحتفاظ بالنسخ (أيام)',
    description: 'عدد الأيام للاحتفاظ بنسخ قاعدة البيانات',
    type: 'number',
    value: 30
  },
  {
    id: 'auto_cleanup',
    category: 'database',
    name: 'التنظيف التلقائي',
    description: 'حذف البيانات القديمة تلقائياً',
    type: 'toggle',
    value: true
  }
];

const SystemSettings: React.FC<{ view?: string }> = ({ view = 'settings' }) => {
  const [settings, setSettings] = useState(initialSettings);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const categories = [
    { id: 'general', name: 'الإعدادات العامة', icon: Settings },
    { id: 'security', name: 'الأمان والخصوصية', icon: Shield },
    { id: 'notifications', name: 'الإشعارات', icon: Bell },
    { id: 'database', name: 'قاعدة البيانات', icon: Database }
  ];

  const filteredSettings = settings.filter(setting => setting.category === selectedCategory);

  const handleSettingChange = (id: string, value: any) => {
    setSettings(prev => prev.map(setting => 
      setting.id === id ? { ...setting, value } : setting
    ));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // محاكاة حفظ الإعدادات
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setHasChanges(false);
  };

  const handleReset = () => {
    setSettings(initialSettings);
    setHasChanges(false);
  };

  const renderSettingInput = (setting: Setting) => {
    switch (setting.type) {
      case 'toggle':
        return (
          <button
            onClick={() => handleSettingChange(setting.id, !setting.value)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              setting.value ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              setting.value ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        );
      
      case 'text':
      case 'email':
      case 'password':
        return (
          <input
            type={setting.type}
            value={setting.value}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            required={setting.required}
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={setting.value}
            onChange={(e) => handleSettingChange(setting.id, parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            required={setting.required}
          />
        );
      
      case 'select':
        return (
          <select
            value={setting.value}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            {setting.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Settings className="w-6 h-6 text-gray-600" />
              {view === 'alerts' ? 'التنبيهات والإنذارات' : 'إعدادات النظام'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {view === 'alerts' ? 'إدارة التنبيهات والإنذارات النظام' : 'تكوين إعدادات النظام المختلفة'}
            </p>
          </div>
          
          <div className="flex gap-2">
            {hasChanges && (
              <>
                <button 
                  onClick={handleReset}
                  className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  إعادة تعيين
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Categories Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-4">
          <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4">الفئات</h3>
          <div className="space-y-2">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                    ${selectedCategory === category.id 
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white font-bold' 
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
          <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-6">
            {categories.find(c => c.id === selectedCategory)?.name}
          </h3>
          
          <div className="space-y-6">
            {filteredSettings.map(setting => (
              <div key={setting.id} className="border-b border-gray-100 dark:border-gray-700 pb-6 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                      {setting.name}
                      {setting.required && <span className="text-red-500 text-xs">*</span>}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{setting.description}</p>
                  </div>
                </div>
                
                <div className="mt-3 max-w-md">
                  {renderSettingInput(setting)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {hasChanges && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          <div>
            <p className="text-sm font-bold text-yellow-800 dark:text-yellow-300">لديك تغييرات غير محفوظة</p>
            <p className="text-xs text-yellow-600 dark:text-yellow-400">تأكد من حفظ التغييرات قبل مغادرة الصفحة</p>
          </div>
        </div>
      )}

      {!hasChanges && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <div>
            <p className="text-sm font-bold text-green-800 dark:text-green-300">جميع الإعدادات محفوظة</p>
            <p className="text-xs text-green-600 dark:text-green-400">آخر تحديث: منذ 5 دقائق</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemSettings;
