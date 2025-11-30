
import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Store, ArrowRight, Shield, CheckCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  initialType?: 'customer' | 'merchant' | 'admin';
  onAdminLogin?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login', initialType = 'customer', onAdminLogin }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [authType, setAuthType] = useState<'customer' | 'merchant' | 'admin'>(initialType);
  const [isLoading, setIsLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  if (!isOpen) return null;

  const handleEasterEggClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    // بعد 5 نقرات، اظهر لوحة Admin
    if (newCount >= 5) {
      setAuthType('admin');
      setShowAdminPanel(true);
      setClickCount(0);
    }
    
    // إعادة تعيين العداد بعد 2 ثانية من آخر نقرة
    setTimeout(() => {
      setClickCount(0);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Handle admin login with special credentials
      if (showAdminPanel) {
        const form = e.target as HTMLFormElement;
        const inputs = form.querySelectorAll('input');
        const email = (inputs[0] as HTMLInputElement)?.value || '';
        const password = (inputs[1] as HTMLInputElement)?.value || '';
        
        // Check for admin credentials
        if (email === 'ADMIN' && password === '1234') {
          // Create mock token for admin
          const mockToken = 'mock-admin-token-' + Date.now();
          localStorage.setItem('token', mockToken);
          
          // Call the admin login callback
          onAdminLogin?.();
          onClose();
          return;
        } else {
          // Show error for wrong credentials
          alert('بيانات المدير غير صحيحة. استخدم ADMIN / 1234');
          return;
        }
      }
      
      onClose();
    }, 1500);
  };

  // Admin Panel (Easter Egg)
  if (showAdminPanel) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
          onClick={() => {
            setShowAdminPanel(false);
            setAuthType('customer');
            setClickCount(0);
          }}
        ></div>

        {/* Admin Login Modal */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 duration-200 border border-gray-800">
          {/* Close Button */}
          <button 
            onClick={() => {
              setShowAdminPanel(false);
              setAuthType('customer');
              setClickCount(0);
            }}
            className="absolute top-4 left-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col h-full">
            {/* Header Section */}
            <div className="px-8 pt-8 pb-6 text-center bg-gradient-to-b from-red-900/20 to-transparent">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg text-white font-black text-2xl mx-auto mb-4">
                🔐
              </div>
              <h2 className="text-2xl font-black text-white mb-1">لوحة التحكم الإدارية</h2>
              <p className="text-gray-400 text-sm">تسجيل دخول المديرين والموظفين الإداريين</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-300">اسم المستخدم</label>
                <div className="relative">
                  <Shield className="absolute right-3 top-3 w-5 h-5 text-red-500" />
                  <input 
                    type="text" 
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition text-white placeholder-gray-500"
                    placeholder="ADMIN"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">استخدم: ADMIN</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-300">كلمة المرور</label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 w-5 h-5 text-red-500" />
                  <input 
                    type="password" 
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition text-white placeholder-gray-500"
                    placeholder="••••••••"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">استخدم: 1234</p>
              </div>

              <div className="bg-red-900/20 border border-red-800 rounded-xl p-3 mt-4">
                <p className="text-xs text-red-300">
                  ⚠️ هذه لوحة تحكم محمية. الوصول غير المصرح به محظور.
                </p>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg hover:from-red-700 hover:to-red-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    دخول إداري
                    <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className="px-8 pt-8 pb-6 text-center bg-gradient-to-b from-blue-50/50 to-white">
            <div 
              className="w-12 h-12 bg-gradient-to-br from-ray-gold to-yellow-600 rounded-xl flex items-center justify-center shadow-lg text-ray-blue font-black text-2xl mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform"
              onClick={handleEasterEggClick}
              title={clickCount > 0 ? `${5 - clickCount} نقرات متبقية` : ''}
            >
              R
            </div>
            <h2 className="text-2xl font-black text-ray-blue mb-1">
              {mode === 'login' ? 'أهلاً بعودتك' : 'إنشاء حساب جديد'}
            </h2>
            <p className="text-gray-500 text-sm">
              {mode === 'login' ? 'سجل الدخول لمتابعة طلباتك' : 'انضم إلينا وابدأ رحلة التسوق'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
            {mode === 'signup' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 mr-1">الاسم بالكامل</label>
                <div className="relative">
                  <User className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-ray-gold focus:ring-1 focus:ring-ray-gold transition"
                    placeholder="الاسم ثلاثي"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 mr-1">البريد الإلكتروني أو الهاتف</label>
              <div className="relative">
                <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-ray-gold focus:ring-1 focus:ring-ray-gold transition"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 mr-1">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                <input 
                  type="password" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-ray-gold focus:ring-1 focus:ring-ray-gold transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {mode === 'login' && (
              <div className="flex justify-end">
                <button type="button" className="text-xs font-bold text-ray-blue hover:underline">
                  نسيت كلمة المرور؟
                </button>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-ray-black text-white py-3.5 rounded-xl font-bold text-lg shadow-lg hover:bg-ray-gold hover:text-ray-black transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  {mode === 'login' ? 'تسجيل الدخول' : 'إنشاء الحساب'}
                  <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                </>
              )}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <div className="relative flex justify-center"><span className="bg-white px-2 text-xs text-gray-400">أو</span></div>
            </div>

            <button type="button" className="w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              المتابعة باستخدام Google
            </button>

            <div className="text-center mt-4 text-sm font-medium text-gray-600">
              {mode === 'login' ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
              <button 
                type="button"
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-ray-blue font-bold hover:underline mx-1"
              >
                {mode === 'login' ? 'أنشئ حساب جديد' : 'سجل دخولك'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
