# 👨‍💻 دليل المطور - Ray Admin Dashboard

## 🚀 البدء السريع

### التثبيت:
```bash
npm install
```

### تشغيل خادم التطوير:
```bash
npm run dev
```

### بناء للإنتاج:
```bash
npm run build
```

---

## 📚 الهيكل الأساسي

### استخدام GlobalSettings في أي مكون:

```typescript
import { useGlobalSettings, useTranslation, useResponsive, useThemeColors } from '../../common/GlobalSettings';

const MyComponent: React.FC = () => {
  // الحصول على الإعدادات العالمية
  const { currentLanguage, isDarkMode, deviceType } = useGlobalSettings();
  
  // الحصول على الترجمات
  const t = useTranslation();
  
  // الحصول على معلومات الجهاز
  const { isMobile, isTablet, isDesktop } = useResponsive();
  
  // الحصول على الألوان الديناميكية
  const colors = useThemeColors();
  
  return (
    <div className={colors.background}>
      <h1>{t.dashboard}</h1>
      {isMobile && <p>أنت على موبايل</p>}
    </div>
  );
};
```

---

## 🌍 إضافة ترجمات جديدة

### في `components/common/GlobalSettings.tsx`:

```typescript
export const translations = {
  ar: {
    // أضف الترجمة الجديدة هنا
    myNewKey: 'النص العربي',
    // ...
  },
  en: {
    // أضف الترجمة الجديدة هنا
    myNewKey: 'English text',
    // ...
  }
};
```

### الاستخدام في المكون:

```typescript
const t = useTranslation();
<button>{t.myNewKey}</button>
```

---

## 📱 التصميم المتجاوب

### استخدام معلومات الجهاز:

```typescript
const { isMobile, isTablet, isDesktop } = useResponsive();

return (
  <div>
    {isMobile && <MobileLayout />}
    {isTablet && <TabletLayout />}
    {isDesktop && <DesktopLayout />}
  </div>
);
```

### استخدام Tailwind للتصميم المتجاوب:

```typescript
<div className="
  grid 
  grid-cols-1      // موبايل: عمود واحد
  md:grid-cols-2   // تابلت: عمودان
  lg:grid-cols-3   // كمبيوتر: ثلاثة أعمدة
  gap-4
  p-4 md:p-6 lg:p-8
">
  {/* المحتوى */}
</div>
```

---

## 🌙 الوضع الليلي

### الألوان الديناميكية:

```typescript
const colors = useThemeColors();

return (
  <div className={colors.background}>
    <p className={colors.text}>النص</p>
    <button className={colors.primary}>زر</button>
  </div>
);
```

### استخدام Tailwind مع Dark Mode:

```typescript
<div className="
  bg-white dark:bg-gray-900
  text-gray-900 dark:text-white
  border-gray-200 dark:border-gray-700
">
  {/* المحتوى */}
</div>
```

---

## 🎨 إضافة مكون جديد

### 1. إنشاء الملف:
```typescript
// components/dashboard/admin/MyNewComponent.tsx

import React from 'react';
import { useGlobalSettings, useTranslation, useResponsive, useThemeColors } from '../../common/GlobalSettings';

interface Props {
  // خصائص المكون
}

const MyNewComponent: React.FC<Props> = () => {
  const { currentLanguage, isDarkMode, deviceType } = useGlobalSettings();
  const t = useTranslation();
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const colors = useThemeColors();
  
  return (
    <div className={colors.background}>
      <h1>{t.dashboard}</h1>
    </div>
  );
};

export default MyNewComponent;
```

### 2. إضافة الترجمات:
```typescript
// في GlobalSettings.tsx
export const translations = {
  ar: {
    myNewComponent: 'مكوني الجديد',
  },
  en: {
    myNewComponent: 'My New Component',
  }
};
```

### 3. إضافة المكون إلى AdminDashboard:
```typescript
import MyNewComponent from './MyNewComponent';

// في renderContent():
case 'myNewComponent':
  return <MyNewComponent />;
```

### 4. إضافة عنصر القائمة:
```typescript
const menuItems = [
  // ...
  { id: 'myNewComponent', icon: MyIcon, label: t.myNewComponent, section: 'قسمي' },
];
```

---

## 🔧 الدوال المساعدة

### تبديل اللغة:
```typescript
const { toggleLanguage } = useGlobalSettings();
<button onClick={toggleLanguage}>تبديل اللغة</button>
```

### تبديل الوضع الليلي:
```typescript
const { toggleDarkMode } = useGlobalSettings();
<button onClick={toggleDarkMode}>تبديل الوضع الليلي</button>
```

### تبديل قائمة الموبايل:
```typescript
const { toggleMobileMenu } = useGlobalSettings();
<button onClick={toggleMobileMenu}>فتح القائمة</button>
```

---

## 📊 البيانات الوهمية

### إضافة بيانات وهمية:

```typescript
const initialData = [
  {
    id: '1',
    name: 'اسم البيان',
    // ... خصائص أخرى
  },
  // ...
];

const MyComponent: React.FC = () => {
  const [data, setData] = useState(initialData);
  
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};
```

---

## 🎯 أفضل الممارسات

### 1. استخدم الترجمات دائماً:
```typescript
// ✅ صحيح
<button>{t.save}</button>

// ❌ خطأ
<button>حفظ</button>
```

### 2. استخدم التصميم المتجاوب:
```typescript
// ✅ صحيح
<div className="p-4 md:p-6 lg:p-8">

// ❌ خطأ
<div className="p-8">
```

### 3. استخدم الألوان الديناميكية:
```typescript
// ✅ صحيح
<div className={colors.background}>

// ❌ خطأ
<div className="bg-white">
```

### 4. استخدم TypeScript:
```typescript
// ✅ صحيح
interface User {
  id: string;
  name: string;
}

// ❌ خطأ
const user = { id: '1', name: 'أحمد' };
```

---

## 🐛 استكشاف الأخطاء

### التحقق من أخطاء TypeScript:
```bash
npx tsc --noEmit --skipLibCheck
```

### تنظيف الـ Cache:
```bash
rm -rf node_modules/.cache
rm -f .tsbuildinfo
npm run dev
```

### التحقق من الترجمات:
```typescript
// في المتصفح
console.log(useTranslation());
```

---

## 📈 الأداء

### تحسين الأداء:
1. استخدم `React.memo` للمكونات الثقيلة
2. استخدم `useCallback` للدوال المكررة
3. تجنب الـ re-renders غير الضرورية
4. استخدم Lazy Loading للمكونات الكبيرة

### مثال:
```typescript
const MyComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});
```

---

## 🚀 النشر

### النشر على Netlify:
```bash
npm run build
# ثم رفع المجلد dist
```

### متغيرات البيئة:
```bash
# .env
VITE_API_URL=https://api.example.com
```

---

## 📞 الدعم

### للمزيد من المعلومات:
- اطلع على `IMPLEMENTATION_REVIEW.md`
- اطلع على `TEST_CHECKLIST.md`
- تحقق من الملفات الموجودة كأمثلة

---

**تم إنشاء هذا الدليل لمساعدتك على البدء السريع والتطوير بكفاءة! 🚀**
