# 🅱️ Bootstrap لمنصة Ray Egypt

## 📦 ما تم تثبيته

```bash
npm install bootstrap react-bootstrap @types/bootstrap sass
```

## 🎯 المكونات الجاهزة

### 1. **البطاقات المحسنة**
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

### 2. **النماذج المحسنة**
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

### 3. **الجداول الاحترافية**
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
/>
```

### 4. **النوافذ المنبثقة**
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

### 5. **التنبيهات**
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

## 🎨 الألوان الخاصة بـ Ray Egypt

```scss
$ray-yellow: #ffc107;  // اللون الأساسي للعلامة التجارية
$ray-blue: #0d6efd;    // الأزرق الاحترافي
$ray-orange: #fd7e14;  // البرتقالي النشط
$ray-green: #198754;   // الأخضر للنجاح
$ray-red: #dc3545;     // الأحمر للأخطاء
```

## 🎯 كلاسات CSS مخصصة

### الألوان
```html
<div class="ray-bg-yellow">خلفية صفراء</div>
<div class="ray-text-blue">نص أزرق</div>
```

### التدرجات
```html
<div class="ray-gradient-brand">تدرج العلامة التجارية</div>
<div class="ray-gradient-primary">تدرج أساسي</div>
```

### الظلال
```html
<div class="ray-shadow-lg">ظل كبير</div>
<div class="ray-shadow-xl">ظل أكبر</div>
```

### الحواف
```html
<div class="ray-rounded-lg">حواف كبيرة</div>
<div class="ray-rounded-full">دائري</div>
```

### التأثيرات الحركية
```html
<div class="ray-hover-lift">رفع عند التمرير</div>
<div class="ray-hover-scale">تكبير عند التمرير</div>
<div class="ray-animate-pulse">نبضة حركية</div>
```

## 📱 الأزرار المحسنة

```html
<button class="btn btn-ray-primary">زر أساسي</button>
<button class="btn btn-ray-success">زر نجاح</button>
<button class="btn btn-ray-warning">زر تحذير</button>
<button class="btn btn-ray-danger">زر خطر</button>
<button class="btn btn-ray-brand">زر العلامة التجارية</button>
```

## 🃏 البطاقات المحسنة

```html
<div class="card card-ray">
  <div class="card-ray-header">العنوان</div>
  <div class="card-ray-body">المحتوى</div>
  <div class="card-ray-footer">التذييل</div>
</div>

<div class="card card-ray-featured">
  بطاقة مميزة
</div>

<div class="card card-ray-dark">
  بطاقة داكنة
</div>
```

## 📝 النماذج المحسنة

```html
<div class="form-ray">
  <div class="form-ray-group">
    <label class="form-ray-label">
      الاسم <span class="required">*</span>
    </label>
    <input type="text" class="form-ray-control" />
    <div class="form-ray-feedback invalid-feedback">
      هذا الحقل مطلوب
    </div>
  </div>
</div>
```

## 📊 الجداول المحسنة

```html
<table class="table table-ray">
  <thead>
    <tr>
      <th>الرقم</th>
      <th>الاسم</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>أحمد</td>
    </tr>
  </tbody>
</table>
```

## 🔔 التنبيهات المحسنة

```html
<div class="alert alert-ray-success">
  <div class="alert-ray-heading">نجاح!</div>
  تم حفظ البيانات بنجاح
</div>

<div class="alert alert-ray-danger">
  <div class="alert-ray-heading">خطأ!</div>
  حدث خطأ ما
</div>
```

## 🧭 شريط التنقل المحسن

```html
<nav class="navbar navbar-ray">
  <div class="container">
    <a class="navbar-ray-brand" href="#">Ray Egypt</a>
    <div class="navbar-ray-nav">
      <a class="nav-ray-link active" href="#">الرئيسية</a>
      <a class="nav-ray-link" href="#">الأنظمة</a>
    </div>
  </div>
</nav>
```

## 🎯 الشارات المحسنة

```html
<span class="badge badge-ray-primary">أساسي</span>
<span class="badge badge-ray-success">نجاح</span>
<span class="badge badge-ray-warning">تحذير</span>
<span class="badge badge-ray-brand">العلامة التجارية</span>
```

## 📊 أشرطة التقدم المحسنة

```html
<div class="progress progress-ray">
  <div class="progress-ray-bar progress-ray-primary" style="width: 75%">
    75%
  </div>
</div>
```

## 🎨 الأقسام الخاصة

### القسم البطل
```html
<section class="ray-hero">
  <h1>مرحباً بك في Ray Egypt</h1>
  <p>منصة متكاملة لإدارة الأعمال</p>
</section>
```

### قسم المميزات
```html
<section class="ray-features">
  <div class="feature-card">
    <div class="feature-icon">🚀</div>
    <h3>سرعة</h3>
    <p>أداء فائق السرعة</p>
  </div>
</section>
```

### قسم الإحصائيات
```html
<section class="ray-stats">
  <div class="stat-item">
    <div class="stat-number">1000+</div>
    <div class="stat-label">عميل</div>
  </div>
</section>
```

## 🌐 دعم RTL

جميع المكونات تدعم اللغة العربية بشكل كامل:

```html
<html dir="rtl">
  <!-- المكونات تعمل بشكل صحيح مع RTL -->
</html>
```

## 🌙 دعم الوضع الليلي

```css
@media (prefers-color-scheme: dark) {
  /* الألوان تتكيف تلقائياً */
}
```

## 📱 التصميم المتجاوب

```html
<div class="ray-hidden-sm">مخفي على الشاشات الصغيرة</div>
<div class="ray-block-md">ظاهر على الشاشات المتوسطة فما فوق</div>
```

## 🎯 أفضل الممارسات

1. **استخدم الكلاسات المخصصة** بدلاً من Bootstrap الأساسي
2. **حافظ على التناسق** في الألوان والأحجام
3. **استخدم التدرجات** للعلامة التجارية
4. **تجاوب مع الأحداث** بشكل مناسب
5. **استخدم التحقق** في النماذج
6. **حافظ على الأداء** مع المكونات الكبيرة

## 🔄 التكامل مع Tailwind CSS

```html
<div class="card card-ray shadow-lg hover-scale">
  <!-- Bootstrap + Tailwind معاً -->
</div>
```

## 🎨 التخصيص

يمكن تعديل الألوان والثوابت في `_variables.scss`:

```scss
$ray-yellow: #your-color;
$ray-blue: #your-color;
```

## 📚 أمثلة عملية

شاهد `BootstrapExample.tsx` لأمثلة عملية لجميع المكونات.

## 🔗 روابط مفيدة

- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [React-Bootstrap Documentation](https://react-bootstrap.github.io/)
- [Sass Documentation](https://sass-lang.com/)

## 🚀 البدء السريع

1. استورد المكونات:
```typescript
import { BootstrapCard, BootstrapForm } from './components/shared/components';
```

2. استخدمها في تطبيقك:
```typescript
<BootstrapCard title="مرحباً" text="هذا مثال" />
```

3. استمتع بالتصميم الاحترافي! 🎉
