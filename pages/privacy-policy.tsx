import React from 'react';
import { Shield, Eye, Lock, Database, UserCheck, AlertCircle } from 'lucide-react';
import SystemsHeader from '../components/marketplace/systems/SystemsHeader';
import SystemsFooter from '../components/marketplace/systems/SystemsFooter';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SystemsHeader />
      
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Shield className="w-16 h-16 text-yellow-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              سياسة الخصوصية
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نحن نأخذ خصوصيتك على محمل الجد. تعرف على كيفية جمع واستخدام وحماية بياناتك.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              آخر تحديث: 20 نوفمبر 2024
            </p>
          </div>

          {/* Quick Summary */}
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-8 text-white mb-12">
            <h2 className="text-2xl font-bold mb-4">ملخص سريع</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Eye className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">الشفافية</h3>
                  <p className="text-sm">نوضح بالتفصيل ما نجمعه ولماذا</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lock className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">الأمان</h3>
                  <p className="text-sm">نستخدم أحدث تقنيات الحماية</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Database className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">التحكم</h3>
                  <p className="text-sm">لديك كامل التحكم في بياناتك</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <UserCheck className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">الاحترام</h3>
                  <p className="text-sm">نحترم خصوصيتك دائماً</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-12">
            {/* Section 1 */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">1. البيانات التي نجمعها</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">بيانات الحساب</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>الاسم والبريد الإلكتروني ورقم الهاتف</li>
                    <li>عنوان النشاط التجاري</li>
                    <li>معلومات الدفع والفواتير</li>
                    <li>بيانات تسجيل الدخول والنشاط</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">بيانات العمل</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>معلومات العملاء والموردين</li>
                    <li>بيانات المبيعات والمخزون</li>
                    <li>سجلات المعاملات المالية</li>
                    <li>التقارير والتحليلات</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">بيانات الاستخدام</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>سجلات الزيارات والصفحات</li>
                    <li>بيانات الأداء والاستخدام</li>
                    <li>معلومات الجهاز والمتصفح</li>
                    <li>بيانات الموقع الجغرافي</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">2. كيف نستخدم بياناتك</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-600 font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">تقديم الخدمات</h3>
                      <p className="text-gray-600 text-sm">لتمكينك من استخدام جميع وظائف المنصة</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-600 font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">تحسين الخدمة</h3>
                      <p className="text-gray-600 text-sm">لتطوير وتحسين تجربة المستخدم</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-600 font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">التواصل معك</h3>
                      <p className="text-gray-600 text-sm">لإرسال إشعارات هامة ودعم فني</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-600 font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">الأمان والوقاية</h3>
                      <p className="text-gray-600 text-sm">لحماية حسابك ومنع الاحتيال</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-600 font-bold">5</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">التسويق</h3>
                      <p className="text-gray-600 text-sm">لإرسال عروض ومنتجات ذات صلة</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-600 font-bold">6</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">الامتثال القانوني</h3>
                      <p className="text-gray-600 text-sm">للوفاء بالالتزامات القانونية</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">3. حماية بياناتك</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    التشفير والأمان
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-blue-800">
                    <li>تشفير جميع البيانات أثناء النقل والتخزين</li>
                    <li>استخدام بروتوكولات HTTPS آمنة</li>
                    <li>جدران حماية متقدمة وأنظمة كشف التسلل</li>
                    <li>تحديثات أمنية منتظمة</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center gap-2">
                    <UserCheck className="w-5 h-5" />
                    الوصول والتحكم
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-green-800">
                    <li>الوصول المحدود للموظفين المعتمدين فقط</li>
                    <li>تسجيل جميع عمليات الوصول والتعديل</li>
                    <li>تدريب منتظم للموظفين على الأمان</li>
                    <li>اتفاقيات سرية مع جميع الموظفين</li>
                  </ul>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3 flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    النسخ الاحتياطي والاستعادة
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-purple-800">
                    <li>نسخ احتياطي يومي للبيانات</li>
                    <li>تخزين في مواقع متعددة</li>
                    <li>خطة استعادة سريعة في حالات الطوارئ</li>
                    <li>اختبارات منتظمة للاستعادة</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">4. حقوقك</h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">الوصول إلى بياناتك</h3>
                  <p className="text-gray-600">يمكنك طلب نسخة من جميع بياناتك الشخصية التي نحتفظ بها في أي وقت.</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">تصحيح البيانات</h3>
                  <p className="text-gray-600">يمكنك تحديث أو تصحيح أي معلومات شخصية غير دقيقة.</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">حذف البيانات</h3>
                  <p className="text-gray-600">يمكنك طلب حذف بياناتك الشخصية، مع بعض الاستثناءات القانونية.</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">تقييد المعالجة</h3>
                  <p className="text-gray-600">يمكنك طلب تقييد معالجة بياناتك في ظروف معينة.</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">نقل البيانات</h3>
                  <p className="text-gray-600">يمكنك طلب نقل بياناتك إلى خدمة أخرى في تنسيق قابل للقراءة الآلية.</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">5. ملفات تعريف الارتباط (Cookies)</h2>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتقديم خدمات أفضل. يمكنك التحكم في ملفات تعريف الارتباط من إعدادات متصفحك.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700"><strong>الضرورية:</strong> لتشغيل الموقع بشكل صحيح</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-700"><strong>الأداء:</strong> لتحسين سرعة واستقرار الموقع</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700"><strong>التحليل:</strong> لفهم كيفية استخدام الموقع</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700"><strong>التسويق:</strong> لعروض مخصصة وملائمة</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">6. طرف ثالث</h2>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  نشارك البيانات مع أطراف ثالثة محدودة فقط لتقديم خدمات أفضل:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">مزودو الخدمة</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• استضافة الخوادم</li>
                      <li>• معالجة الدفعات</li>
                      <li>• خدمات البريد الإلكتروني</li>
                    </ul>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">شركاء التكامل</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• بوابات الدفع</li>
                      <li>• خدمات الشحن</li>
                      <li>• أنظمة المحاسبة</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>ملاحظة:</strong> جميع الأطراف الثالثة ملزمون باتفاقيات سرية صارمة وحماية البيانات.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">7. الاحتفاظ بالبيانات</h2>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  نحتفظ بالبيانات للمدة اللازمة لتقديم الخدمات والامتثال القانوني:
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">بيانات الحساب النشط</span>
                    <span className="text-gray-500">طوال فترة الاشتراك</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">البيانات المالية</span>
                    <span className="text-gray-500">7 سنوات (لأغراض ضريبية)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">سجلات النشاط</span>
                    <span className="text-gray-500">سنتان</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">بيانات الحساب المحذوف</span>
                    <span className="text-gray-500">30 يوما للفترة التجريبية</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-yellow-500" />
                لديك أسئلة أو استفسارات؟
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">تواصل معنا</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>📧 info@ray-eg.com</p>
                    <p>📞 01012345678</p>
                    <p>📍 القاهرة، مصر</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">أمين الخصوصية</h3>
                  <p className="text-gray-600 mb-4">
                    إذا كانت لديك مخاوف حول خصوصية بياناتك، يمكنك التواصل مباشرة مع أمين الخصوصية:
                  </p>
                  <p className="text-gray-600">
                    📧 privacy@ray-eg.com
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <SystemsFooter />
    </div>
  );
};

export default PrivacyPolicy;
