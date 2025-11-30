import React from 'react';
import { 
  BootstrapCard, 
  BootstrapAlert, 
  BootstrapTable, 
  BootstrapForm,
  BootstrapModal,
  BootstrapAccordion
} from '../../components';

const BootstrapExample: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);

  // Sample data for table
  const tableColumns = [
    { key: 'id', label: 'الرقم' },
    { key: 'name', label: 'الاسم' },
    { key: 'email', label: 'البريد الإلكتروني' },
    { key: 'status', label: 'الحالة' }
  ];

  const tableData = [
    { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', status: 'نشط' },
    { id: 2, name: 'فاطمة علي', email: 'fatima@example.com', status: 'غير نشط' },
    { id: 3, name: 'محمد سالم', email: 'mohammed@example.com', status: 'نشط' }
  ];

  // Sample form fields
  const formFields = [
    { name: 'name', label: 'الاسم', type: 'text' as const, placeholder: 'أدخل اسمك', required: true },
    { name: 'email', label: 'البريد الإلكتروني', type: 'email' as const, placeholder: 'أدخل بريدك', required: true },
    { name: 'message', label: 'الرسالة', type: 'textarea' as const, placeholder: 'اكتب رسالتك هنا' },
    { name: 'category', label: 'الفئة', type: 'select' as const, placeholder: 'اختر الفئة', 
      options: [
        { value: 'support', label: 'دعم فني' },
        { value: 'sales', label: 'مبيعات' },
        { value: 'general', label: 'عام' }
      ]
    }
  ];

  // Sample accordion items
  const accordionItems = [
    {
      id: '1',
      title: 'ما هو Bootstrap؟',
      content: 'Bootstrap هو إطار عمل شهير لتطوير واجهات الويب سريعة الاستجابة.',
      defaultActive: true
    },
    {
      id: '2',
      title: 'لماذا نستخدم Bootstrap؟',
      content: 'لأنه يوفر مكونات جاهزة، تصميم متجاوب، وسهولة الاستخدام.'
    },
    {
      id: '3',
      title: 'كيف يتم التكامل مع React؟',
      content: 'من خلال مكتبة React-Bootstrap التي توفر مكونات React جاهزة.'
    }
  ];

  const handleFormSubmit = (data: any) => {
    console.log('Form submitted:', data);
    alert('تم إرسال النموذج بنجاح!');
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-5">أمثلة Bootstrap Components</h1>

      {/* Alert Examples */}
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="h4 mb-3">Alerts</h2>
          <div className="d-flex flex-column gap-2">
            <BootstrapAlert variant="success" heading="نجاح!">
              تم حفظ البيانات بنجاح.
            </BootstrapAlert>
            <BootstrapAlert variant="danger" heading="خطأ!">
              حدث خطأ أثناء حفظ البيانات.
            </BootstrapAlert>
            <BootstrapAlert variant="warning">
              يرجى التحقق من البيانات المدخلة.
            </BootstrapAlert>
          </div>
        </div>
      </div>

      {/* Card Examples */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <BootstrapCard
            title="بطاقة أساسية"
            text="هذه بطاقة أساسية باستخدام Bootstrap مع React."
            badges={["جديد", "مميز"]}
            buttonText="اضغط هنا"
            onButtonClick={() => alert('تم الضغط على البطاقة!')}
          />
        </div>
        <div className="col-md-4 mb-3">
          <BootstrapCard
            title="بطاقة مع صورة"
            text="بطاقة تحتوي على صورة وشارات."
            image="https://via.placeholder.com/300x200"
            badges={["صورة", "مثال"]}
          />
        </div>
        <div className="col-md-4 mb-3">
          <BootstrapCard
            title="بطاقة بسيطة"
            text="بطاقة بسيطة بدون أزرار أو شارات."
          />
        </div>
      </div>

      {/* Table Example */}
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="h4 mb-3">جدول البيانات</h2>
          <BootstrapTable
            columns={tableColumns}
            data={tableData}
            striped
            bordered
            hover
            responsive
            onRowClick={(row) => console.log('Row clicked:', row)}
          />
        </div>
      </div>

      {/* Form Example */}
      <div className="row mb-4">
        <div className="col-md-6">
          <h2 className="h4 mb-3">نموذج التسجيل</h2>
          <BootstrapForm
            fields={formFields}
            onSubmit={handleFormSubmit}
            submitText="إرسال النموذج"
          />
        </div>
        <div className="col-md-6">
          <h2 className="h4 mb-3">الأكورديون</h2>
          <BootstrapAccordion
            items={accordionItems}
            defaultActiveKey="1"
            flush
          />
        </div>
      </div>

      {/* Modal Trigger */}
      <div className="row">
        <div className="col-12 text-center">
          <button 
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            افتح النافذة المنبثقة
          </button>
        </div>
      </div>

      {/* Modal */}
      <BootstrapModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title="نافذة منبثقة"
        size="lg"
        centered
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
              إغلاق
            </button>
            <button className="btn btn-primary" onClick={() => setShowModal(false)}>
              حفظ
            </button>
          </>
        }
      >
        <p>هذا محتوى النافذة المنبثقة. يمكنك وضع أي محتوى هنا.</p>
        <p>Bootstrap Modal مع React-Bootstrap سهل جداً في الاستخدام!</p>
      </BootstrapModal>
    </div>
  );
};

export default BootstrapExample;
