
import React, { useState, useEffect } from 'react';
import { 
  Megaphone, Tag, Plus, TrendingUp, Users, BarChart3, 
  Calendar, Send, Copy, Trash2, CheckCircle, Percent, X, Save, Sparkles, Loader2, Share2, 
  ThumbsUp, MessageCircle, Wand2, RefreshCw, Hash
} from 'lucide-react';
import StatCard from '../../common/cards/StatCard';
import { getGeminiResponse } from '../../../services/geminiService';

const initialCampaigns = [
  { id: 1, title: 'عروض الجمعة البيضاء', type: 'SMS', status: 'active', reach: 1500, clicks: 450, date: '2025-11-20' },
  { id: 2, title: 'خصم خاص للعملاء الجدد', type: 'Social', status: 'scheduled', reach: 5000, clicks: 0, date: '2025-12-01' },
  { id: 3, title: 'تصفية الشتاء', type: 'Email', status: 'ended', reach: 3200, clicks: 890, date: '2025-10-15' },
];

const initialCoupons = [
  { id: 1, code: 'WELCOME20', discount: '20%', usage: '15/100', status: 'active', expiry: '2025-12-31', limitPerUser: 1 },
  { id: 2, code: 'FREESHIP', discount: 'شحن مجاني', usage: '45/50', status: 'active', expiry: '2025-11-30', limitPerUser: 1 },
  { id: 3, code: 'FLASH50', discount: '50 ج.م', usage: '100/100', status: 'expired', expiry: '2025-11-01', limitPerUser: 2 },
];

const MarketingManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'coupons' | 'ai_creator'>('campaigns');
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [coupons, setCoupons] = useState(initialCoupons);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // AI Creator State
  const [adParams, setAdParams] = useState({
    goal: 'زيادة المبيعات',
    platform: 'Facebook',
    tone: 'حماسي',
    offer: ''
  });
  const [generatedAd, setGeneratedAd] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Coupon Form State
  const [couponForm, setCouponForm] = useState({
    code: '',
    discount: '',
    expiry: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0], // Default next month
    totalLimit: '100',
    limitPerUser: '1',
    isAutoGenerate: false,
    autoPrefix: 'SALE',
    autoLength: 8
  });

  // Campaign Form State
  const [campaignTitle, setCampaignTitle] = useState('');

  // Auto Generate Logic
  useEffect(() => {
    if (couponForm.isAutoGenerate) {
      generateRandomCode();
    }
  }, [couponForm.autoPrefix, couponForm.autoLength, couponForm.isAutoGenerate]);

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = Math.max(4, couponForm.autoLength - couponForm.autoPrefix.length);
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCouponForm(prev => ({ ...prev, code: (prev.autoPrefix + result).toUpperCase() }));
  };

  const handleCreate = (e: React.FormEvent) => {
      e.preventDefault();
      if (activeTab === 'coupons') {
          const newCoupon = {
              id: Date.now(),
              code: couponForm.code,
              discount: couponForm.discount,
              usage: `0/${couponForm.totalLimit}`,
              status: 'active',
              expiry: couponForm.expiry,
              limitPerUser: Number(couponForm.limitPerUser)
          };
          setCoupons([newCoupon, ...coupons]);
          // Reset Form
          setCouponForm({
            code: '',
            discount: '',
            expiry: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
            totalLimit: '100',
            limitPerUser: '1',
            isAutoGenerate: false,
            autoPrefix: 'SALE',
            autoLength: 8
          });
      } else {
          const newCamp = {
              id: Date.now(),
              title: campaignTitle || 'حملة جديدة',
              type: 'SMS',
              status: 'scheduled',
              reach: 0,
              clicks: 0,
              date: new Date().toISOString().split('T')[0]
          };
          setCampaigns([newCamp, ...campaigns]);
          setCampaignTitle('');
      }
      setIsModalOpen(false);
  };

  const generateAd = async () => {
    if (!adParams.offer) return;
    setIsGenerating(true);
    try {
        const prompt = `اكتب نص إعلاني جذاب لمنصة ${adParams.platform}، الهدف منه ${adParams.goal}، بأسلوب ${adParams.tone}. العرض هو: ${adParams.offer}. أضف هاشتاجات ورموز تعبيرية مناسبة. اجعل النص بالعامية المصرية المحببة.`;
        const result = await getGeminiResponse(prompt, 'merchant');
        setGeneratedAd(result);
    } catch (e) {
        console.error(e);
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 relative">
      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="الحملات النشطة" value="3" sub="حملات جارية" icon={Megaphone} color="blue" />
        <StatCard title="إجمالي الوصول" value="12.5K" sub="عميل مستهدف" icon={Users} color="purple" />
        <StatCard title="الكوبونات المستخدمة" value="154" sub="كوبون" icon={Tag} color="green" />
        <StatCard title="معدل التحويل" value="4.2%" sub="+1.5% تحسن" icon={TrendingUp} color="orange" />
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
        {/* Tabs */}
        <div className="border-b border-gray-100 p-4 flex flex-col sm:flex-row justify-between items-center bg-gray-50 gap-4">
          <div className="flex gap-2 overflow-x-auto max-w-full pb-1">
            <button 
              onClick={() => setActiveTab('campaigns')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${activeTab === 'campaigns' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:bg-gray-200'}`}
            >
              <Megaphone className="w-4 h-4" /> الحملات الإعلانية
            </button>
            <button 
              onClick={() => setActiveTab('coupons')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${activeTab === 'coupons' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:bg-gray-200'}`}
            >
              <Tag className="w-4 h-4" /> الكوبونات
            </button>
            <button 
              onClick={() => setActiveTab('ai_creator')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${activeTab === 'ai_creator' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-500 hover:bg-gray-200'}`}
            >
              <Sparkles className="w-4 h-4" /> صانع الإعلانات (AI)
            </button>
          </div>
          
          {activeTab !== 'ai_creator' && (
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-md whitespace-nowrap"
            >
                <Plus className="w-4 h-4" />
                {activeTab === 'campaigns' ? 'حملة جديدة' : 'كوبون جديد'}
            </button>
          )}
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          {activeTab === 'campaigns' && (
            <div className="space-y-4">
              {campaigns.map((camp) => (
                <div key={camp.id} className="flex flex-col md:flex-row items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:shadow-md transition group bg-white">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-sm
                    ${camp.type === 'SMS' ? 'bg-green-500' : camp.type === 'Social' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                    {camp.type.charAt(0)}
                  </div>
                  <div className="flex-1 w-full text-center md:text-right">
                    <h4 className="font-bold text-gray-900">{camp.title}</h4>
                    <div className="flex items-center justify-center md:justify-start gap-3 text-xs text-gray-500 mt-1">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {camp.date}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        camp.status === 'active' ? 'bg-green-100 text-green-700' : 
                        camp.status === 'scheduled' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {camp.status === 'active' ? 'نشط' : camp.status === 'scheduled' ? 'مجدول' : 'منتهي'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-8 w-full md:w-auto justify-center border-t md:border-t-0 pt-3 md:pt-0 border-gray-50">
                    <div className="text-center">
                      <p className="text-xs text-gray-400 font-bold mb-1">الوصول</p>
                      <p className="font-black text-gray-800">{camp.reach}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400 font-bold mb-1">النقرات</p>
                      <p className="font-black text-gray-800">{camp.clicks}</p>
                    </div>
                  </div>

                  <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-blue-600 transition">
                    <BarChart3 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'coupons' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {coupons.map((coupon) => (
                <div key={coupon.id} className="border-2 border-dashed border-gray-200 rounded-2xl p-5 hover:border-blue-200 transition group bg-gray-50/50">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <Percent className="w-6 h-6 text-blue-600" />
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-black text-gray-800 tracking-wider">{coupon.code}</h3>
                    <p className="text-sm font-bold text-blue-600 mt-1">{coupon.discount} خصم</p>
                    <p className="text-[10px] text-gray-400 mt-1">الحد: {coupon.limitPerUser} لكل عميل</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>الاستخدام</span>
                      <span className="font-bold">{coupon.usage}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${coupon.status === 'expired' ? 'bg-gray-400' : 'bg-blue-500'}`} 
                        style={{ width: `${(parseInt(coupon.usage.split('/')[0]) / parseInt(coupon.usage.split('/')[1])) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-200">
                      <span className="text-[10px] text-gray-400">ينتهي: {coupon.expiry}</span>
                      <button className="text-xs font-bold flex items-center gap-1 text-gray-600 hover:text-blue-600 transition">
                        <Copy className="w-3 h-3" /> نسخ
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ai_creator' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
               {/* Editor Side */}
               <div className="space-y-6">
                  <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                     <h3 className="font-bold text-purple-900 mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        إعدادات الإعلان
                     </h3>
                     <div className="space-y-4">
                        <div className="space-y-1">
                           <label className="text-sm font-bold text-gray-600">تفاصيل العرض / المنتج</label>
                           <textarea 
                             className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:border-purple-500 outline-none h-24 resize-none"
                             placeholder="مثال: خصم 20% على جميع الوجبات بمناسبة الافتتاح..."
                             value={adParams.offer}
                             onChange={e => setAdParams({...adParams, offer: e.target.value})}
                           ></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-1">
                              <label className="text-sm font-bold text-gray-600">المنصة</label>
                              <select 
                                className="w-full bg-white border border-gray-200 rounded-xl p-2.5 focus:border-purple-500 outline-none"
                                value={adParams.platform}
                                onChange={e => setAdParams({...adParams, platform: e.target.value})}
                              >
                                 <option>Facebook</option>
                                 <option>Instagram</option>
                                 <option>Twitter / X</option>
                                 <option>SMS</option>
                              </select>
                           </div>
                           <div className="space-y-1">
                              <label className="text-sm font-bold text-gray-600">الأسلوب</label>
                              <select 
                                className="w-full bg-white border border-gray-200 rounded-xl p-2.5 focus:border-purple-500 outline-none"
                                value={adParams.tone}
                                onChange={e => setAdParams({...adParams, tone: e.target.value})}
                              >
                                 <option>حماسي</option>
                                 <option>رسمي</option>
                                 <option>فكاهي</option>
                                 <option>عاجل</option>
                              </select>
                           </div>
                        </div>
                        <div className="space-y-1">
                           <label className="text-sm font-bold text-gray-600">الهدف</label>
                           <select 
                             className="w-full bg-white border border-gray-200 rounded-xl p-2.5 focus:border-purple-500 outline-none"
                             value={adParams.goal}
                             onChange={e => setAdParams({...adParams, goal: e.target.value})}
                           >
                              <option>زيادة المبيعات</option>
                              <option>الوعي بالعلامة التجارية</option>
                              <option>تفاعل ومشاركة</option>
                           </select>
                        </div>
                     </div>
                     <button 
                       onClick={generateAd}
                       disabled={!adParams.offer || isGenerating}
                       className="w-full mt-6 bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                     >
                        {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                        {isGenerating ? 'جاري الكتابة...' : 'توليد النص الإعلاني'}
                     </button>
                  </div>
               </div>

               {/* Preview Side */}
               <div className="flex flex-col">
                  <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                     معاينة المنشور
                     <span className="text-xs font-normal bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Social Media Preview</span>
                  </h3>
                  
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-4 max-w-sm mx-auto w-full">
                     {/* Social Post Header */}
                     <div className="p-3 flex items-center gap-3 border-b border-gray-50">
                        <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">R</div>
                        <div>
                           <p className="text-sm font-bold text-gray-900">اسم المتجر</p>
                           <p className="text-xs text-gray-500">ممول • منذ دقيقة</p>
                        </div>
                     </div>
                     
                     {/* Post Content */}
                     <div className="p-3">
                        {generatedAd ? (
                           <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap dir-rtl">
                              {generatedAd}
                           </p>
                        ) : (
                           <div className="space-y-2 animate-pulse">
                              <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                              <div className="h-3 bg-gray-100 rounded w-full"></div>
                              <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                           </div>
                        )}
                     </div>

                     {/* Post Image Placeholder */}
                     <div className="bg-gray-100 h-48 w-full flex items-center justify-center text-gray-400">
                        <div className="text-center">
                           <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
                           <span className="text-xs">صورة الإعلان</span>
                        </div>
                     </div>

                     {/* Post Actions */}
                     <div className="p-3 border-t border-gray-100 flex justify-between text-gray-500 text-sm">
                        <button className="flex items-center gap-1 hover:text-blue-600 transition"><ThumbsUp className="w-4 h-4" /> أعجبني</button>
                        <button className="flex items-center gap-1 hover:text-blue-600 transition"><MessageCircle className="w-4 h-4" /> تعليق</button>
                        <button className="flex items-center gap-1 hover:text-blue-600 transition"><Share2 className="w-4 h-4" /> مشاركة</button>
                     </div>
                  </div>

                  {generatedAd && (
                     <div className="flex gap-3">
                        <button 
                           onClick={() => navigator.clipboard.writeText(generatedAd)}
                           className="flex-1 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition flex items-center justify-center gap-2"
                        >
                           <Copy className="w-4 h-4" /> نسخ النص
                        </button>
                        <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-md">
                           <Share2 className="w-4 h-4" /> نشر الآن
                        </button>
                     </div>
                  )}
               </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Create */}
      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 p-6 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg">{activeTab === 'coupons' ? 'إضافة كوبون جديد' : 'إنشاء حملة إعلانية'}</h3>
                      <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-gray-500" /></button>
                  </div>
                  <form onSubmit={handleCreate} className="space-y-4">
                      {activeTab === 'coupons' ? (
                        <>
                          <div>
                             <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-bold text-gray-600">كود الكوبون</label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <span className="text-xs text-purple-600 font-bold">توليد تلقائي</span>
                                  <input 
                                    type="checkbox" 
                                    className="w-4 h-4 accent-purple-600"
                                    checked={couponForm.isAutoGenerate}
                                    onChange={e => setCouponForm({...couponForm, isAutoGenerate: e.target.checked})}
                                  />
                                </label>
                             </div>
                             
                             {couponForm.isAutoGenerate ? (
                                <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 space-y-3">
                                   <div className="grid grid-cols-2 gap-2">
                                      <div>
                                         <label className="text-[10px] font-bold text-gray-500 mb-1 block">البادئة (Prefix)</label>
                                         <input 
                                           type="text" 
                                           className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm uppercase"
                                           placeholder="SALE"
                                           maxLength={4}
                                           value={couponForm.autoPrefix}
                                           onChange={e => setCouponForm({...couponForm, autoPrefix: e.target.value.toUpperCase()})}
                                         />
                                      </div>
                                      <div>
                                         <label className="text-[10px] font-bold text-gray-500 mb-1 block">الطول الكلي</label>
                                         <input 
                                           type="number" 
                                           min="6" max="12"
                                           className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm"
                                           value={couponForm.autoLength}
                                           onChange={e => setCouponForm({...couponForm, autoLength: Number(e.target.value)})}
                                         />
                                      </div>
                                   </div>
                                   <div className="flex items-center gap-2 mt-2 pt-2 border-t border-purple-200">
                                      <span className="text-xs font-bold text-purple-700">الكود المقترح:</span>
                                      <span className="font-mono font-black text-lg tracking-wider">{couponForm.code || '---'}</span>
                                      <button 
                                        type="button" 
                                        onClick={generateRandomCode}
                                        className="mr-auto p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100 text-purple-600"
                                      >
                                         <RefreshCw className="w-4 h-4" />
                                      </button>
                                   </div>
                                </div>
                             ) : (
                                <input 
                                  type="text" 
                                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:border-blue-500 outline-none uppercase"
                                  placeholder="مثال: SALE50"
                                  value={couponForm.code}
                                  onChange={e => setCouponForm({...couponForm, code: e.target.value.toUpperCase()})}
                                  required={!couponForm.isAutoGenerate}
                                />
                             )}
                          </div>

                          <div>
                            <label className="text-xs font-bold text-gray-600 mb-1 block">قيمة الخصم</label>
                            <input 
                                type="text" 
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:border-blue-500 outline-none"
                                placeholder="مثال: 20% أو 50 جنيه"
                                value={couponForm.discount}
                                onChange={e => setCouponForm({...couponForm, discount: e.target.value})}
                                required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="text-xs font-bold text-gray-600 mb-1 block">تاريخ الانتهاء</label>
                                <div className="relative">
                                  <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                                  <input 
                                    type="date"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 pr-9 text-sm focus:border-blue-500 outline-none"
                                    value={couponForm.expiry}
                                    onChange={e => setCouponForm({...couponForm, expiry: e.target.value})}
                                    required
                                  />
                                </div>
                             </div>
                             <div>
                                <label className="text-xs font-bold text-gray-600 mb-1 block">الحد الأقصى للاستخدام</label>
                                <div className="relative">
                                  <Hash className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                                  <input 
                                    type="number"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 pr-9 text-sm focus:border-blue-500 outline-none"
                                    placeholder="100"
                                    value={couponForm.totalLimit}
                                    onChange={e => setCouponForm({...couponForm, totalLimit: e.target.value})}
                                  />
                                </div>
                             </div>
                          </div>

                          <div>
                              <label className="text-xs font-bold text-gray-600 mb-1 block">حد الاستخدام للعميل الواحد</label>
                              <div className="relative">
                                <Users className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                                <input 
                                  type="number"
                                  min="1"
                                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 pr-9 text-sm focus:border-blue-500 outline-none"
                                  placeholder="1"
                                  value={couponForm.limitPerUser}
                                  onChange={e => setCouponForm({...couponForm, limitPerUser: e.target.value})}
                                />
                              </div>
                              <p className="text-[10px] text-gray-400 mt-1">عدد المرات التي يمكن لنفس العميل استخدام الكوبون فيها.</p>
                          </div>
                        </>
                      ) : (
                        <div>
                            <label className="text-xs font-bold text-gray-600 mb-1 block">اسم الحملة</label>
                            <input 
                              type="text" 
                              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:border-blue-500 outline-none"
                              placeholder="مثال: عروض الصيف"
                              value={campaignTitle}
                              onChange={e => setCampaignTitle(e.target.value)}
                              required
                            />
                        </div>
                      )}
                      
                      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                          <Save className="w-4 h-4" /> حفظ
                      </button>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};

export default MarketingManager;
