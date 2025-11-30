# 🅱️ Bootstrap Components Guide

## 📦 التثبيت

تم تثبيت Bootstrap و React-Bootstrap بالفعل في المشروع:

```bash
npm install bootstrap react-bootstrap @types/bootstrap
```

## 🎯 المكونات المتاحة

### 1. **BootstrapCard**
بطاقات Bootstrap قابلة للتخصيص

```typescript
<BootstrapCard
  title="عنوان البطاقة"
  text="نص البطاقة"
  image="path/to/image.jpg"
  badges=["جديد", "مميز"]
  buttonText="اضغط هنا"
  onButtonClick={handleClick}
/>
```

### 2. **BootstrapModal**
نوافذ منبثقة احترافية

```typescript
<BootstrapModal
  show={showModal}
  onHide={() => setShowModal(false)}
  title="عنوان النافذة"
  size="lg"
  centered
>
  <p>المحتوى هنا</p>
</BootstrapModal>
```

### 3. **BootstrapAlert**
رسائل التنبيه بأنواعها

```typescript
<BootstrapAlert
  variant="success"
  heading="نجاح!"
  dismissible
  onClose={handleClose}
>
  تم حفظ البيانات بنجاح
</BootstrapAlert>
```

### 4. **BootstrapTable**
جداول احترافية مع تفاعل

```typescript
<BootstrapTable
  columns={[
    { key: 'id', label: 'الرقم' },
    { key: 'name', label: 'الاسم', sortable: true }
  ]}
  data={tableData}
  striped
  bordered
  hover
  onRowClick={handleRowClick}
/>
```

### 5. **BootstrapForm**
نماذج ديناميكية مع التحقق

```typescript
<BootstrapForm
  fields={[
    { name: 'name', label: 'الاسم', type: 'text', required: true },
    { name: 'email', label: 'البريد', type: 'email', required: true }
  ]}
  onSubmit={handleSubmit}
  submitText="إرسال"
/>
```

### 6. **BootstrapNavbar**
شريط تنقل متجاوب

```typescript
<BootstrapNavbar
  brand="Ray Egypt"
  links={[
    { label: 'الرئيسية', href: '#home', active: true },
    { label: 'الأنظمة', href: '#systems' }
  ]}
  dropdown={{
    title: 'المزيد',
    items: [{ label: 'الدعم', href: '#support' }]
  }}
  buttons={[
    { label: 'تسجيل الدخول', variant: 'primary', onClick: handleLogin }
  ]}
/>
```

### 7. **BootstrapCarousel**
عارض الصور المنزلق

```typescript
<BootstrapCarousel
  items={[
    { image: 'slide1.jpg', caption: 'وصف الشريحة الأولى', title: 'العنوان' }
  ]}
  interval={5000}
  controls
  indicators
/>
```

### 8. **BootstrapPagination**
ترقيم الصفحات

```typescript
<BootstrapPagination
  currentPage={2}
  totalPages={10}
  onPageChange={handlePageChange}
  showFirstLast
  maxButtons={5}
/>
```

### 9. **BootstrapProgress**
شريط التقدم

```typescript
<BootstrapProgress
  value={75}
  max={100}
  label="تحميل الملفات"
  variant="success"
  striped
  animated
  showPercentage
/>
```

### 10. **BootstrapToast**
الإشعارات المنبثقة

```typescript
<BootstrapToast
  toasts={[
    { id: '1', title: 'نجاح', message: 'تم الحفظ', variant: 'success' }
  ]}
  onClose={handleClose}
  position="top-end"
/>
```

### 11. **BootstrapAccordion**
قائمة قابلة للطي

```typescript
<BootstrapAccordion
  items={[
    { id: '1', title: 'السؤال الأول', content: 'الإجابة الأولى' }
  ]}
  defaultActiveKey="1"
  flush
/>
```

## 🎨 التخصيص

### الألوان المخصصة
```css
:root {
  --bs-primary: #your-color;
  --bs-secondary: #your-color;
}
```

### الأحجام
- `sm`: صغير
- `md`: متوسط (افتراضي)
- `lg`: كبير
- `xl`: كبير جداً

### المتغيرات
- `variant`: لون المكون
- `size`: حجم المكون
- `className`: كلاسات CSS إضافية
- `disabled`: تعطيل المكون

## 🔄 التكامل مع Tailwind

يمكن استخدام Bootstrap مع Tailwind CSS معاً:

```typescript
<div className="bootstrap-component tailwind-utility">
  <BootstrapCard className="shadow-lg" />
</div>
```

## 📱 التصميم المتجاوب

جميع المكونات متجاوبة بشكل افتراضي:
- **Mobile First**: تعمل أولاً على الموبايل
- **Breakpoints**: xs, sm, md, lg, xl, xxl
- **Utilities**: كلاسات مساعدة للتحكم في الظهور

## 🎯 أفضل الممارسات

1. **استخدم المكونات الجاهزة** بدلاً من إعادة بنائها
2. **حافظ على التناسق** في الألوان والأحجام
3. **تجاوب مع الأحداث** بشكل مناسب
4. **استخدم التحقق** في النماذج
5. **حافظ على الأداء** مع المكونات الكبيرة

## 🔗 روابط مفيدة

- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [React-Bootstrap Documentation](https://react-bootstrap.github.io/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Bootstrap Themes](https://themes.getbootstrap.com/)

## 🚀 أمثلة عملية

شاهد `BootstrapExample.tsx` لأمثلة عملية لجميع المكونات.
