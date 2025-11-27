# تكامل نظام الأنشطة الجديد (30 نشاط)

## المشكلة الحالية:
- ملفات الأنشطة الجديدة موجودة على GitHub (`types/activities.ts`)
- لكنها لم تُدمج بعد في التطبيق الفعلي
- واجهة التطبيق حالياً تستخدم 15 نشاط فقط من `config.ts`

## الملفات المنشأة:
1. `types/activities.ts` ✅ — تعريفات 30 نشاط منظمة في 7 مجموعات
2. `components/dashboard/activityMapping.ts` ✅ — mapping الأنشطة مع مكونات لوحات المعلومات

## التعديلات المطلوبة:
1. ✅ تحديث `Dashboard.tsx` ليدعم جميع 30 نشاط
2. ✅ تحديث `config.ts` لإضافة جميع الأنشطة الجديدة إلى البيانات
3. ⏳ دمج `ActivityMenu.tsx` في المحرك الرئيسي للتنقل
4. ⏳ اختبار جميع الأنشطة للتأكد من عملها بشكل صحيح

## الأنشطة الـ 30 الموزعة:

### الغذاء والمشروبات (3):
- restaurant, cafe, bakery

### الخدمات (6):
- plumbing, electrical, carpentry, cleaning, painting, construction

### التجارة والتسوق (6):
- clothing, electronics, supermarket, books, gifts, hardware

### الصحة والجمال (6):
- clinic, pharmacy, lab, salon, gym, spa

### العقارات (1):
- realestate

### السيارات (4):
- dealership, carwash, maintenance, rental

### الترفيه والتعليم (4):
- cinema, themepark, training, event

الإجمالي: 30 نشاط ✓
