
import React, { useState } from 'react';
import { 
  Smartphone, Palette, Layout, Link as LinkIcon, Plus, Trash2, 
  Eye, EyeOff, Move, Save, CheckCircle, Share2, QrCode, Copy, ExternalLink, Download
} from 'lucide-react';
import FileUploader from '../../common/FileUploader';
import MerchantHero from '../../marketplace/merchant/MerchantHero';

interface LinkButton {
  id: string;
  label: string;
  url: string;
  icon: string;
}

const StorefrontBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'design' | 'content' | 'contact' | 'launch'>('design');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [config, setConfig] = useState({
    // Design
    primaryColor: 'blue',
    coverImage: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&q=80',
    logo: 'https://ui-avatars.com/api/?name=AL&background=random',
    
    // Content
    name: 'مطعم النور للمأكولات',
    description: 'نقدم لكم أشهى المأكولات الشرقية والغربية بأفضل جودة',
    
    // Visibility
    showReviews: true,
    showAbout: true,
    showLocation: true,
    
    // Buttons
    showPhone: true,
    showWhatsapp: true,
    customButtons: [] as LinkButton[]
  });

  const [newLink, setNewLink] = useState({ label: '', url: '' });
  const [qrColor, setQrColor] = useState('#000000'); // QR Color State

  const storeLink = `https://ray.app/store/${config.name.replace(/\s+/g, '-').toLowerCase()}`;

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleLogoUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setConfig(prev => ({ ...prev, logo: e.target!.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setConfig(prev => ({ ...prev, coverImage: e.target!.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addCustomButton = () => {
    if (!newLink.label || !newLink.url) return;
    const btn: LinkButton = {
      id: Date.now().toString(),
      label: newLink.label,
      url: newLink.url,
      icon: 'link'
    };
    setConfig(prev => ({ ...prev, customButtons: [...prev.customButtons, btn] }));
    setNewLink({ label: '', url: '' });
  };

  const removeCustomButton = (id: string) => {
    setConfig(prev => ({ ...prev, customButtons: prev.customButtons.filter(b => b.id !== id) }));
  };

  const colors = [
    { id: 'blue', bg: 'bg-blue-600', class: 'text-blue-600' },
    { id: 'green', bg: 'bg-green-600', class: 'text-green-600' },
    { id: 'red', bg: 'bg-red-600', class: 'text-red-600' },
    { id: 'orange', bg: 'bg-orange-600', class: 'text-orange-600' },
    { id: 'purple', bg: 'bg-purple-600', class: 'text-purple-600' },
    { id: 'black', bg: 'bg-gray-900', class: 'text-gray-900' },
  ];

  const previewMerchant = {
    name: config.name,
    type: 'مطعم',
    location: 'القاهرة',
    rating: 4.8,
    reviews: 120,
    image: config.logo,
    cover: config.coverImage
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(storeLink);
    alert('تم نسخ الرابط');
  };

  const handleDownloadQR = () => {
      // Simulation of downloading
      alert('جاري تحميل صورة QR Code...');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full animate-in fade-in slide-in-from-bottom-4">
      
      {/* Controls Column */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pb-20 lg:max-w-md">
        
        {/* Tabs */}
        <div className="bg-white p-1 rounded-xl border border-gray-100 flex shadow-sm overflow-x-auto">
          {['design', 'content', 'contact', 'launch'].map(tab => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition capitalize whitespace-nowrap ${activeTab === tab ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
             >
               {tab === 'design' ? 'التصميم' : tab === 'content' ? 'المحتوى' : tab === 'contact' ? 'الأزرار' : 'نشر'}
             </button>
          ))}
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          
          {/* --- Design Tab --- */}
          {activeTab === 'design' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">لون العلامة التجارية</label>
                <div className="flex gap-3">
                  {colors.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setConfig({...config, primaryColor: c.id})}
                      className={`w-8 h-8 rounded-full ${c.bg} transition-transform ${config.primaryColor === c.id ? 'scale-125 ring-2 ring-offset-2 ring-gray-300' : 'hover:scale-110'}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">شعار المتجر (Logo)</label>
                <FileUploader label="رفع اللوجو" onUpload={handleLogoUpload} />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">صورة الغلاف (Cover)</label>
                <FileUploader label="رفع الغلاف" onUpload={handleCoverUpload} />
              </div>
            </div>
          )}

          {/* --- Content Tab --- */}
          {activeTab === 'content' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">اسم المتجر</label>
                <input 
                  type="text" 
                  value={config.name}
                  onChange={e => setConfig({...config, name: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:border-blue-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">نبذة عن المتجر (الوصف)</label>
                <textarea 
                  value={config.description}
                  onChange={e => setConfig({...config, description: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:border-blue-500 outline-none h-24 resize-none"
                />
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3">
                <h4 className="font-bold text-gray-800 text-sm">إظهار الأقسام</h4>
                
                <label className="flex items-center justify-between p-3 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-50">
                  <span className="text-sm text-gray-600">معلومات عن المتجر (About)</span>
                  <input type="checkbox" checked={config.showAbout} onChange={e => setConfig({...config, showAbout: e.target.checked})} className="w-5 h-5 accent-blue-600" />
                </label>
                
                <label className="flex items-center justify-between p-3 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-50">
                  <span className="text-sm text-gray-600">آراء العملاء (Reviews)</span>
                  <input type="checkbox" checked={config.showReviews} onChange={e => setConfig({...config, showReviews: e.target.checked})} className="w-5 h-5 accent-blue-600" />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-50">
                  <span className="text-sm text-gray-600">العنوان والخريطة</span>
                  <input type="checkbox" checked={config.showLocation} onChange={e => setConfig({...config, showLocation: e.target.checked})} className="w-5 h-5 accent-blue-600" />
                </label>
              </div>
            </div>
          )}

          {/* --- Contact/Buttons Tab --- */}
          {activeTab === 'contact' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="space-y-3">
                <h4 className="font-bold text-gray-800 text-sm">أزرار التواصل الأساسية</h4>
                <label className="flex items-center justify-between p-3 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-50">
                  <span className="text-sm text-gray-600">زر الاتصال (الهاتف)</span>
                  <input type="checkbox" checked={config.showPhone} onChange={e => setConfig({...config, showPhone: e.target.checked})} className="w-5 h-5 accent-blue-600" />
                </label>
                <label className="flex items-center justify-between p-3 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-50">
                  <span className="text-sm text-gray-600">زر واتساب</span>
                  <input type="checkbox" checked={config.showWhatsapp} onChange={e => setConfig({...config, showWhatsapp: e.target.checked})} className="w-5 h-5 accent-blue-600" />
                </label>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-bold text-gray-800 text-sm mb-3">أزرار مخصصة (روابط)</h4>
                
                {config.customButtons.map((btn) => (
                  <div key={btn.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl mb-2 border border-gray-200">
                    <span className="text-sm font-bold text-gray-700">{btn.label}</span>
                    <button onClick={() => removeCustomButton(btn.id)} className="text-red-500 hover:bg-red-50 p-1 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <div className="flex gap-2 mt-3">
                  <input 
                    type="text" 
                    placeholder="اسم الزر (مثال: المنيو PDF)" 
                    className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
                    value={newLink.label}
                    onChange={e => setNewLink({...newLink, label: e.target.value})}
                  />
                  <input 
                    type="text" 
                    placeholder="الرابط URL" 
                    className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none text-left dir-ltr"
                    value={newLink.url}
                    onChange={e => setNewLink({...newLink, url: e.target.value})}
                  />
                  <button 
                    onClick={addCustomButton}
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* --- Launch Tab --- */}
          {activeTab === 'launch' && (
             <div className="space-y-6 animate-in fade-in">
                <div className="text-center bg-gray-50 p-6 rounded-2xl border border-gray-200">
                   <h3 className="font-bold text-lg text-gray-800 mb-2">رابط متجرك جاهز!</h3>
                   <p className="text-sm text-gray-500 mb-4">شارك الرابط مع عملائك وابدأ في استقبال الطلبات</p>
                   
                   <div className="flex items-center gap-2 bg-white border border-gray-200 p-3 rounded-xl mb-4">
                      <LinkIcon className="w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        value={storeLink}
                        readOnly
                        className="flex-1 text-sm text-gray-600 outline-none dir-ltr bg-transparent"
                      />
                      <button onClick={handleCopyLink} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition">
                         <Copy className="w-4 h-4" />
                      </button>
                   </div>

                   <button className="text-sm font-bold text-blue-600 flex items-center justify-center gap-1 hover:underline">
                      <ExternalLink className="w-4 h-4" />
                      زيارة المتجر
                   </button>
                </div>

                <div>
                   <h4 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
                      <QrCode className="w-5 h-5 text-gray-500" />
                      رمز الاستجابة السريعة (QR Code)
                   </h4>
                   <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="bg-white p-3 border border-gray-200 rounded-xl shadow-sm">
                         {/* Simulated QR Code */}
                         <img 
                           src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${storeLink}&color=${qrColor.replace('#', '')}`} 
                           alt="QR Code" 
                           className="w-32 h-32 rounded-lg"
                         />
                      </div>
                      <div className="space-y-4 flex-1 w-full">
                         <div>
                            <label className="text-xs font-bold text-gray-500 mb-2 block">لون الرمز</label>
                            <div className="flex gap-2">
                               {['#000000', '#1E3A8A', '#10B981', '#F97316', '#7C3AED'].map(color => (
                                  <button 
                                    key={color}
                                    onClick={() => setQrColor(color)}
                                    className={`w-6 h-6 rounded-full border-2 ${qrColor === color ? 'border-gray-400 scale-110' : 'border-transparent'}`}
                                    style={{backgroundColor: color}}
                                  />
                               ))}
                            </div>
                         </div>
                         <div className="flex gap-2">
                            <button className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-black transition shadow-md">
                                <Share2 className="w-3 h-3" /> مشاركة
                            </button>
                            <button 
                                onClick={handleDownloadQR}
                                className="flex-1 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                            >
                                <Download className="w-3 h-3" /> تحميل
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          )}

        </div>

        <button 
          onClick={handleSave} 
          className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-black transition flex items-center justify-center gap-2 sticky bottom-0"
        >
          {saveSuccess ? <CheckCircle className="w-5 h-5" /> : <Save className="w-5 h-5" />}
          {saveSuccess ? 'تم الحفظ!' : 'حفظ التعديلات'}
        </button>
      </div>

      {/* Preview Column */}
      <div className="flex-1 bg-gray-100 rounded-3xl p-8 flex items-center justify-center border border-gray-200 relative overflow-hidden min-h-[600px]">
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-600 flex items-center gap-2 shadow-sm z-10">
           <Smartphone className="w-3 h-3" />
           معاينة حية
        </div>

        {/* Phone Frame */}
        <div className="w-[375px] h-[750px] bg-white rounded-[3rem] shadow-2xl border-[8px] border-gray-900 relative overflow-hidden flex flex-col">
           {/* Phone Notch */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-50"></div>
           
           {/* Content Container */}
           <div className="flex-1 overflow-y-auto no-scrollbar bg-gray-50">
              
              <MerchantHero 
                merchant={previewMerchant}
                onBack={() => {}}
                isFavorite={false}
                toggleFavorite={() => {}}
                handleShare={() => {}}
                showShareToast={false}
                customConfig={config} 
              />

              <div className="px-4 py-4 space-y-4 relative z-10">
                 
                 {/* Custom Action Buttons */}
                 {(config.showPhone || config.showWhatsapp || config.customButtons.length > 0) && (
                   <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                      {config.showPhone && (
                        <button className={`flex-1 min-w-[100px] py-2 rounded-xl text-xs font-bold text-white shadow-sm bg-${config.primaryColor}-600`}>
                          اتصال
                        </button>
                      )}
                      {config.showWhatsapp && (
                        <button className="flex-1 min-w-[100px] py-2 rounded-xl text-xs font-bold text-green-700 bg-green-100 shadow-sm">
                          واتساب
                        </button>
                      )}
                      {config.customButtons.map(btn => (
                        <button key={btn.id} className="flex-1 min-w-[100px] py-2 rounded-xl text-xs font-bold text-gray-700 bg-white border border-gray-200 shadow-sm whitespace-nowrap">
                          {btn.label}
                        </button>
                      ))}
                   </div>
                 )}

                 {/* About Section */}
                 {config.showAbout && (
                   <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                      <h3 className="font-bold text-sm mb-2 text-gray-800">عن المكان</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{config.description}</p>
                   </div>
                 )}

                 {/* Location Section */}
                 {config.showLocation && (
                   <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                      <h3 className="font-bold text-sm mb-2 text-gray-800">الموقع</h3>
                      <div className="h-24 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-xs">
                         خريطة جوجل
                      </div>
                   </div>
                 )}

                 {/* Placeholder for Menu/Products */}
                 <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map(i => (
                       <div key={i} className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                          <div className="h-24 bg-gray-100 rounded-lg mb-2"></div>
                          <div className="h-3 w-2/3 bg-gray-200 rounded mb-1"></div>
                          <div className="h-3 w-1/3 bg-gray-200 rounded"></div>
                       </div>
                    ))}
                 </div>

              </div>
           </div>

           {/* Phone Home Indicator */}
           <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default StorefrontBuilder;
