# 📁 هيكل المكونات الجديد

## 🗂️ تنظيم المجلدات

```
components/
├── layout/                    # مكونات التصميم الموحدة
│   ├── PageLayout.tsx         # تصميم الصفحة الموحد
│   ├── Header.tsx             # الهيدر الموحد
│   └── Footer.tsx             # الفوتر الموحد
├── pages/
│   ├── static/                # الصفحات الثابتة (سياسات، شروط)
│   │   └── PrivacyPolicyView.tsx
│   ├── interactive/           # الصفحات التفاعلية (مدونة، مساعدة)
│   │   ├── BlogView.tsx
│   │   ├── FAQView.tsx
│   │   ├── HelpView.tsx
│   │   └── CareersView.tsx
│   └── systems/               # صفحات الأنظمة المتخصصة
│       └── RestaurantView.tsx
├── shared/                    # مكونات وأنواع مشتركة
│   ├── types/                 # تعريفات TypeScript
│   ├── constants/             # ثوابت التطبيق
│   └── components/            # مكونات مشتركة
│       ├── LoadingSpinner.tsx
│       └── ErrorMessage.tsx
└── [المجلدات الأخرى الموجودة]
```

## 🎯 الفوائد

### ✅ سهولة الصيانة
- **PageLayout موحد**: تعديل واحد يطبق على جميع الصفحات
- **أنواع مشتركة**: منع التكرار وتوحيد التعريفات
- **ثوابت مركزية**: سهولة تعديل الروابط والبيانات

### ✅ تنظيم أفضل
- **فصل المسؤوليات**: صفحات ثابتة vs تفاعلية vs أنظمة
- **هيكل واضح**: سهولة العثور على المكونات
- **توسع مستقبلي**: إضافة صفحات جديدة سهلة

### ✅ أداء محسن
- **تقليل الاعتمادية**: مكونات مستقلة
- **تحسين التحميل**: تقسيم أفضل للكود
- **إعادة الاستخدام**: مكونات مشتركة قابلة لإعادة الاستخدام

## 🔄 كيفية إضافة صفحة جديدة

### 1. صفحة ثابتة (Static Page)
```typescript
// components/pages/static/AboutView.tsx
import React from 'react';
import PageLayout from '../../layout/PageLayout';
import { BasePageProps } from '../../shared/types';

const AboutView: React.FC<BasePageProps> = ({ onPageNavigation }) => {
  return (
    <PageLayout onPageNavigation={onPageNavigation}>
      {/* محتوى الصفحة */}
    </PageLayout>
  );
};

export default AboutView;
```

### 2. صفحة تفاعلية (Interactive Page)
```typescript
// components/pages/interactive/NewView.tsx
import React from 'react';
import PageLayout from '../../layout/PageLayout';
import { BasePageProps } from '../../shared/types';

const NewView: React.FC<BasePageProps> = ({ onPageNavigation }) => {
  const [state, setState] = React.useState();

  return (
    <PageLayout onPageNavigation={onPageNavigation}>
      {/* محتوى تفاعلي */}
    </PageLayout>
  );
};

export default NewView;
```

## 🛠️ المكونات المشتركة

### PageLayout
```typescript
<PageLayout 
  onPageNavigation={handleNavigation}
  showHeader={true}
  showFooter={true}
  className="custom-class"
>
  {children}
</PageLayout>
```

### الأنواع المشتركة
```typescript
import { BasePageProps, PageView } from '../../shared/types';

interface MyPageProps extends BasePageProps {
  customProp?: string;
}
```

### الثوابت
```typescript
import { FAQ_CATEGORIES, SOCIAL_LINKS } from '../../shared/constants';
```

## 📝 قواعد التطوير

1. **استخدم PageLayout** دائماً للصفحات الجديدة
2. **ارث من BasePageProps** للصفحات
3. **ضع الأنواع الجديدة** في `shared/types/`
4. **استخدم الثوابت** من `shared/constants/`
5. **حافظ على الهيكل** ولا تخلط المجلدات

## 🔄 الترحيل من الهيكل القديم

### تم الترحيل:
- ✅ BlogView → pages/interactive/
- ✅ FAQView → pages/interactive/
- ✅ HelpView → pages/interactive/
- ✅ CareersView → pages/interactive/
- ✅ PrivacyPolicyView → pages/static/

### المتبقي:
- 🔄 تحديث باقي الصفحات القديمة
- 🔄 إضافة صفحات ثابتة أخرى (Terms, About)
- 🔄 تحسين المكونات المشتركة
