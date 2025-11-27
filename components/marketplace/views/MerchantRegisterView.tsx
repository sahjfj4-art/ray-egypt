
import React, { useState } from 'react';
import { Store, User, Mail, Lock, Phone, MapPin, CheckCircle, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';

interface MerchantRegisterViewProps {
  systemId?: string;
  onComplete: (type: string) => void;
  onBack: () => void;
}

const MerchantRegisterView: React.FC<MerchantRegisterViewProps> = ({ systemId, onComplete, onBack }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    category: systemId || 'restaurant',
    phone: '',
    address: '',
    ownerName: '',
    email: '',
    password: ''
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call and setup
    setTimeout(() => {
      setIsLoading(false);
      onComplete(formData.category);
    }, 2000);
  };

  const categories = [
    { id: 'restaurant', label: 'مطعم / كافيه' },
    { id: 'retail', label: 'محل تجاري' },
    { id: 'clothing', label: 'ملابس وأزياء' },
    { id: 'realestate', label: 'عقارات' },
    { id: 'cars', label: 'سيارات' },
    { id: 'clinic', label: 'عيادة' },
    { id: 'pharmacy', label: 'صيدلية' },
    { id: 'gym', label: 'جيم / نادي' },
    { id: 'salon', label: 'صالون تجميل' },
    { id: 'services', label: 'خدمات وصيانة' },
    { id: 'laundry', label: 'مغسلة' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-ray-black text-ray-gold rounded-lg flex items-center justify-center font-black text-lg">R</div>
            <span className="font-bold text-xl text-ray-black">تسجيل تاجر جديد</span>
          </div>
        </div>
        <div className="text-sm text-gray-500 hidden sm:block">
          خطوة {step} من 2
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          
          {/* Side Visual */}
          <div className="bg-ray-black text-white p-8 md:w-1/3 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-2">انضم لشركاء النجاح</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                أكثر من 10,000 نشاط تجاري يعتمدون على منصة راي لإدارة أعمالهم وتنمية مبيعاتهم.
              </p>
            </div>
            <div className="relative z-10 mt-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-ray-black">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold">لوحة تحكم شاملة</span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-ray-black">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold">متجر إلكتروني مجاني</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-ray-black">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold">دعم فني 24/7</span>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="p-8 md:w-2/3">
            {step === 1 ? (
              <form onSubmit={handleNext} className="space-y-5 animate-in slide-in-from-left duration-300">
                <h2 className="text-xl font-bold text-gray-900 mb-4">بيانات النشاط</h2>
                
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700">اسم النشاط التجاري</label>
                  <div className="relative">
                    <Store className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-ray-blue transition"
                      placeholder="مثال: مطعم النور"
                      value={formData.businessName}
                      onChange={e => setFormData({...formData, businessName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700">نوع النشاط</label>
                  <select 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 focus:outline-none focus:border-ray-blue transition appearance-none"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700">رقم هاتف العمل</label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    <input 
                      type="tel" 
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-ray-blue transition dir-ltr text-right"
                      placeholder="01xxxxxxxxx"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700">العنوان</label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-ray-blue transition"
                      placeholder="المحافظة - الحي - الشارع"
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full bg-ray-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2">
                    التالي: بيانات الحساب
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 animate-in slide-in-from-left duration-300">
                <h2 className="text-xl font-bold text-gray-900 mb-4">بيانات الحساب</h2>
                
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700">اسم المسؤول</label>
                  <div className="relative">
                    <User className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-ray-blue transition"
                      placeholder="الاسم ثلاثي"
                      value={formData.ownerName}
                      onChange={e => setFormData({...formData, ownerName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700">البريد الإلكتروني</label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    <input 
                      type="email" 
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-ray-blue transition"
                      placeholder="example@domain.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700">كلمة المرور</label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    <input 
                      type="password" 
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-ray-blue transition"
                      placeholder="********"
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition"
                  >
                    رجوع
                  </button>
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="flex-1 bg-ray-blue text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        جاري الإنشاء...
                      </>
                    ) : (
                      'إنشاء الحساب وبدء العمل'
                    )}
                  </button>
                </div>
                
                <p className="text-xs text-gray-400 text-center mt-4">
                  بتسجيلك فإنك توافق على <a href="#" className="text-ray-blue hover:underline">الشروط والأحكام</a> الخاصة بالمنصة.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantRegisterView;
