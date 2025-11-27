
import React, { useState } from 'react';
import { 
  Printer, Upload, Layout, Type, Palette, 
  FileText, Receipt, Check, RefreshCcw, Smartphone
} from 'lucide-react';
import FileUploader from '../../common/FileUploader';

const DocumentTemplateView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'receipt' | 'invoice'>('receipt');
  
  const [config, setConfig] = useState({
    logo: null,
    showLogo: true,
    businessName: 'مطعم النور للمأكولات',
    address: 'شارع 9، المعادي، القاهرة',
    phone: '01234567890',
    taxId: '999-888-777',
    footerMessage: 'شكراً لزيارتكم! نتمنى رؤيتكم قريباً',
    showQr: true,
    accentColor: 'black' // black, blue, green, etc.
  });

  const colors = [
    { id: 'black', bg: 'bg-gray-900', text: 'text-gray-900', border: 'border-gray-900' },
    { id: 'blue', bg: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-600' },
    { id: 'green', bg: 'bg-green-600', text: 'text-green-600', border: 'border-green-600' },
    { id: 'red', bg: 'bg-red-600', text: 'text-red-600', border: 'border-red-600' },
    { id: 'orange', bg: 'bg-orange-600', text: 'text-orange-600', border: 'border-orange-600' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full animate-in fade-in slide-in-from-bottom-4">
      
      {/* Left: Editor Controls */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pb-20">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
             <Layout className="w-5 h-5 text-ray-blue" />
             نوع القالب
           </h2>
           <div className="flex p-1 bg-gray-100 rounded-xl">
             <button 
               onClick={() => setActiveTab('receipt')}
               className={`flex-1 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition ${activeTab === 'receipt' ? 'bg-white text-ray-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
             >
               <Receipt className="w-4 h-4" />
               إيصال حراري (Thermal)
             </button>
             <button 
               onClick={() => setActiveTab('invoice')}
               className={`flex-1 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition ${activeTab === 'invoice' ? 'bg-white text-ray-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
             >
               <FileText className="w-4 h-4" />
               فاتورة رسمية (A4)
             </button>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
           <div>
             <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
               <Type className="w-5 h-5 text-ray-blue" />
               بيانات النشاط
             </h3>
             <div className="space-y-4">
               <div>
                 <label className="text-xs font-bold text-gray-500 mb-1 block">اسم النشاط (في الفاتورة)</label>
                 <input 
                   type="text" 
                   value={config.businessName}
                   onChange={(e) => setConfig({...config, businessName: e.target.value})}
                   className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:border-ray-blue outline-none"
                 />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="text-xs font-bold text-gray-500 mb-1 block">رقم الهاتف</label>
                   <input 
                     type="text" 
                     value={config.phone}
                     onChange={(e) => setConfig({...config, phone: e.target.value})}
                     className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:border-ray-blue outline-none"
                   />
                 </div>
                 <div>
                   <label className="text-xs font-bold text-gray-500 mb-1 block">السجل الضريبي</label>
                   <input 
                     type="text" 
                     value={config.taxId}
                     onChange={(e) => setConfig({...config, taxId: e.target.value})}
                     className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:border-ray-blue outline-none"
                   />
                 </div>
               </div>
               <div>
                 <label className="text-xs font-bold text-gray-500 mb-1 block">العنوان</label>
                 <input 
                   type="text" 
                   value={config.address}
                   onChange={(e) => setConfig({...config, address: e.target.value})}
                   className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:border-ray-blue outline-none"
                 />
               </div>
               <div>
                 <label className="text-xs font-bold text-gray-500 mb-1 block">رسالة التذييل (Footer)</label>
                 <textarea 
                   value={config.footerMessage}
                   onChange={(e) => setConfig({...config, footerMessage: e.target.value})}
                   className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:border-ray-blue outline-none h-20 resize-none"
                 />
               </div>
             </div>
           </div>

           <div className="border-t border-gray-100 pt-6">
             <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
               <Palette className="w-5 h-5 text-ray-blue" />
               المظهر والتخصيص
             </h3>
             
             <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <span className="text-sm font-medium text-gray-700">إظهار اللوجو</span>
                 <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={config.showLogo} onChange={(e) => setConfig({...config, showLogo: e.target.checked})} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ray-blue"></div>
                 </label>
               </div>
               
               <div className="flex items-center justify-between">
                 <span className="text-sm font-medium text-gray-700">إظهار QR Code للفاتورة الإلكترونية</span>
                 <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={config.showQr} onChange={(e) => setConfig({...config, showQr: e.target.checked})} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ray-blue"></div>
                 </label>
               </div>

               <div>
                 <span className="text-sm font-medium text-gray-700 block mb-2">لون العلامة التجارية (للفواتير A4)</span>
                 <div className="flex gap-2">
                   {colors.map(c => (
                     <button
                       key={c.id}
                       onClick={() => setConfig({...config, accentColor: c.id})}
                       className={`w-8 h-8 rounded-full ${c.bg} transition-transform ${config.accentColor === c.id ? 'scale-125 ring-2 ring-offset-2 ring-gray-300' : 'hover:scale-110'}`}
                     />
                   ))}
                 </div>
               </div>
             </div>
           </div>
        </div>
        
        <button className="w-full bg-ray-black text-white py-4 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition flex items-center justify-center gap-2 sticky bottom-0">
           <Check className="w-5 h-5" />
           حفظ وتطبيق القالب
        </button>
      </div>

      {/* Right: Live Preview */}
      <div className="flex-1 lg:flex-[1.2] bg-gray-100 rounded-3xl p-8 flex items-center justify-center relative overflow-hidden border border-gray-200">
         <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-600 flex items-center gap-2 shadow-sm">
            <RefreshCcw className="w-3 h-3" />
            معاينة حية
         </div>

         {activeTab === 'receipt' ? (
           // Thermal Receipt Preview
           <div className="bg-white w-[320px] shadow-xl text-center p-4 text-gray-900 font-mono text-sm relative">
              {/* Tear Effect Top */}
              <div className="absolute -top-2 left-0 w-full h-4 bg-gray-100" style={{clipPath: 'polygon(0% 100%, 5% 0%, 10% 100%, 15% 0%, 20% 100%, 25% 0%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 100%, 55% 0%, 60% 100%, 65% 0%, 70% 100%, 75% 0%, 80% 100%, 85% 0%, 90% 100%, 95% 0%, 100% 100%)'}}></div>
              
              <div className="space-y-1 mb-4 mt-2">
                 {config.showLogo && (
                   <div className="w-16 h-16 bg-gray-900 text-white rounded-lg flex items-center justify-center mx-auto mb-2 text-2xl font-black">R</div>
                 )}
                 <h2 className="text-xl font-bold">{config.businessName}</h2>
                 <p className="text-xs text-gray-500">{config.address}</p>
                 <p className="text-xs text-gray-500">{config.phone}</p>
                 <p className="text-xs text-gray-500">ضريبي: {config.taxId}</p>
              </div>

              <div className="border-b-2 border-dashed border-gray-300 my-4"></div>

              <div className="flex justify-between text-xs mb-2">
                 <span>التاريخ: 2025-11-22</span>
                 <span>الوقت: 10:30 PM</span>
              </div>
              <div className="flex justify-between text-xs mb-4">
                 <span>رقم الفاتورة: #10024</span>
                 <span>الكاشير: أحمد</span>
              </div>

              <div className="border-b-2 border-dashed border-gray-300 my-4"></div>

              <div className="space-y-2 text-left">
                 <div className="flex justify-between font-bold">
                    <span>1x برجر كلاسيك</span>
                    <span>120.00</span>
                 </div>
                 <div className="flex justify-between font-bold">
                    <span>2x بيبسي</span>
                    <span>60.00</span>
                 </div>
                 <div className="flex justify-between font-bold">
                    <span>1x بطاطس</span>
                    <span>40.00</span>
                 </div>
              </div>

              <div className="border-b-2 border-dashed border-gray-300 my-4"></div>

              <div className="space-y-1">
                 <div className="flex justify-between text-xs">
                    <span>المجموع</span>
                    <span>220.00</span>
                 </div>
                 <div className="flex justify-between text-xs">
                    <span>الضريبة (14%)</span>
                    <span>30.80</span>
                 </div>
                 <div className="flex justify-between text-lg font-bold mt-2">
                    <span>الإجمالي</span>
                    <span>250.80 ج.م</span>
                 </div>
              </div>

              <div className="border-b-2 border-dashed border-gray-300 my-4"></div>

              {config.showQr && (
                 <div className="flex justify-center my-4">
                    <div className="w-24 h-24 bg-gray-900 text-white flex items-center justify-center text-xs">QR CODE</div>
                 </div>
              )}

              <p className="text-xs font-bold text-center mt-4">{config.footerMessage}</p>
              <p className="text-[10px] text-center text-gray-400 mt-2">Powered by RAY</p>

              {/* Tear Effect Bottom */}
              <div className="absolute -bottom-2 left-0 w-full h-4 bg-gray-100" style={{clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)'}}></div>
           </div>
         ) : (
           // A4 Invoice Preview
           <div className="bg-white w-[450px] h-[600px] shadow-2xl p-8 text-gray-800 text-xs relative flex flex-col scale-90 origin-center">
              {/* Header */}
              <div className="flex justify-between items-start border-b pb-6 mb-6" style={{borderColor: config.accentColor}}>
                 <div className="flex gap-4">
                    {config.showLogo && (
                      <div className={`w-16 h-16 ${colors.find(c => c.id === config.accentColor)?.bg || 'bg-gray-900'} text-white rounded-lg flex items-center justify-center font-black text-2xl`}>R</div>
                    )}
                    <div>
                       <h1 className="text-xl font-bold mb-1">{config.businessName}</h1>
                       <p className="text-gray-500">{config.address}</p>
                       <p className="text-gray-500">{config.phone}</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <h2 className={`text-2xl font-black mb-1 ${colors.find(c => c.id === config.accentColor)?.text || 'text-gray-900'}`}>INVOICE</h2>
                    <p className="font-bold">#INV-2025-001</p>
                    <p className="text-gray-500">22 Nov, 2025</p>
                 </div>
              </div>

              {/* Client Info */}
              <div className="flex justify-between mb-8">
                 <div>
                    <p className="font-bold text-gray-400 uppercase mb-1">فاتورة إلى:</p>
                    <p className="font-bold text-lg">شركة الأمل للتجارة</p>
                    <p className="text-gray-500">15 شارع التسعين، التجمع</p>
                 </div>
              </div>

              {/* Table */}
              <div className="flex-1">
                 <table className="w-full text-right">
                    <thead className={`text-white ${colors.find(c => c.id === config.accentColor)?.bg || 'bg-gray-900'}`}>
                       <tr>
                          <th className="p-2 rounded-tr-lg">البند</th>
                          <th className="p-2 text-center">الكمية</th>
                          <th className="p-2 text-center">السعر</th>
                          <th className="p-2 rounded-tl-lg text-left pl-4">الإجمالي</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                       <tr><td className="p-2">خدمة تصميم</td><td className="p-2 text-center">1</td><td className="p-2 text-center">5000</td><td className="p-2 text-left pl-4">5000</td></tr>
                       <tr><td className="p-2">استضافة ويب</td><td className="p-2 text-center">1</td><td className="p-2 text-center">1200</td><td className="p-2 text-left pl-4">1200</td></tr>
                       <tr><td className="p-2">دعم فني</td><td className="p-2 text-center">5</td><td className="p-2 text-center">200</td><td className="p-2 text-left pl-4">1000</td></tr>
                    </tbody>
                 </table>
              </div>

              {/* Footer */}
              <div className="border-t pt-4 mt-auto">
                 <div className="flex justify-end mb-6">
                    <div className="w-40 space-y-1">
                       <div className="flex justify-between"><span>المجموع</span><span>7200.00</span></div>
                       <div className="flex justify-between"><span>الضريبة</span><span>1008.00</span></div>
                       <div className={`flex justify-between text-lg font-black ${colors.find(c => c.id === config.accentColor)?.text || 'text-gray-900'}`}><span>الإجمالي</span><span>8208.00</span></div>
                    </div>
                 </div>
                 
                 <div className="flex justify-between items-end">
                    <div className="text-gray-500 w-2/3">
                       <p className="font-bold mb-1">ملاحظات:</p>
                       <p>{config.footerMessage}</p>
                    </div>
                    {config.showQr && (
                       <div className="w-16 h-16 bg-gray-900 text-white flex items-center justify-center text-[8px]">QR CODE</div>
                    )}
                 </div>
              </div>
           </div>
         )}
      </div>
    </div>
  );
};

export default DocumentTemplateView;
