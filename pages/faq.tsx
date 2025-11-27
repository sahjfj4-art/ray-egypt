import React from 'react';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';
import SystemsHeader from '../components/marketplace/systems/SystemsHeader';
import SystemsFooter from '../components/marketplace/systems/SystemsFooter';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [expandedItems, setExpandedItems] = React.useState<number[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const faqData: FAQItem[] = [
    {
      question: "ما هي منصة راي؟",
      answer: "منصة راي هي منصة متكاملة لإدارة جميع أنواع الأنشطة التجارية. توفر حلولاً ذكية مخصصة لكل عمل مع 37 نظام مختلف يغطي جميع القطاعات التجارية.",
      category: "عن المنصة"
    },
    {
      question: "كم عدد الأنظمة المتوفرة في منصة راي؟",
      answer: "منصة راي توفر 37 نظام متكامل يغطي جميع أنواع الأنشطة التجارية من المطاعم والمتاجر إلى العيادات والورش.",
      category: "عن المنصة"
    },
    {
      question: "كيف يمكنني البدء في استخدام منصة راي؟",
      answer: "يمكنك البدء بسهولة من خلال التسجيل في المنصة واختيار النظام المناسب لنشاطك التجاري. نقدم فترة تجريبية مجانية لجميع الأنظمة.",
      category: "البدء"
    },
    {
      question: "هل هناك تكلفة للاشتراك في الأنظمة؟",
      answer: "نعم، نقدم خطط اشتراك مختلفة تناسب جميع الأحجام والأعمال. يمكنك الاطلاع على خطط التسعير من صفحة الأنظمة.",
      category: "التسعير"
    },
    {
      question: "هل يمكنني تجربة الأنظمة قبل الاشتراك؟",
      answer: "نعم، نقدم فترة تجريبية مجانية لمدة 14 يوم لجميع الأنظمة الجديدة.",
      category: "التسعير"
    },
    {
      question: "هل تدعم المنصة اللغة العربية؟",
      answer: "نعم، منصة راي بالكامل باللغة العربية مع دعم كامل لواجهة المستخدم والتقارير والدعم الفني.",
      category: "الدعم الفني"
    },
    {
      question: "كيف يمكنني الحصول على الدعم الفني؟",
      answer: "يمكنك التواصل مع فريق الدعم الفني عبر الهاتف أو البريد الإلكتروني أو من خلال مركز المساعدة في المنصة. نقدم دعماً على مدار الساعة.",
      category: "الدعم الفني"
    },
    {
      question: "هل البيانات آمنة في منصة راي؟",
      answer: "نعم، نستخدم أحدث تقنيات التشفير والأمان لحماية بياناتك. جميع البيانات مخزنة في خوادم آمنة ومتوفرة 24/7.",
      category: "الأمان"
    },
    {
      question: "هل يمكنني تصدير بياناتي؟",
      answer: "نعم، يمكنك تصدير جميع بياناتك في أي وقت بتنسيقات مختلفة مثل Excel و PDF.",
      category: "البيانات"
    },
    {
      question: "هل هناك تطبيق موبايل للمنصة؟",
      answer: "نعم، نقدم تطبيقات موبايل لنظامي iOS و Android لإدارة أعمالك من أي مكان.",
      category: "المميزات"
    }
  ];

  const categories = ['all', ...new Set(faqData.map(item => item.category))];

  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SystemsHeader />
      
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <HelpCircle className="w-16 h-16 text-yellow-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              الأسئلة الشائعة
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              إجابات على الأسئلة الأكثر شيوعاً حول منصة راي وخدماتنا
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن سؤال..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-3.5 text-gray-400">
                <HelpCircle className="w-5 h-5" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    selectedCategory === category
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category === 'all' ? 'الكل' : category}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleExpanded(index)}
                  className="w-full px-6 py-4 text-right flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{item.question}</span>
                  {expandedItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 mr-3" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 mr-3" />
                  )}
                </button>
                {expandedItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                    <div className="mt-3">
                      <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                        {item.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">لم يتم العثور على إجابات لبحثك</p>
              <p className="text-gray-400 mt-2">جرب تغيير كلمات البحث أو الاتصال بفريق الدعم</p>
            </div>
          )}

          {/* Contact Support */}
          <div className="mt-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">لم تجد إجابة سؤالك؟</h2>
            <p className="mb-6">فريق الدعم متاح لمساعدتك في أي وقت</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="flex items-center justify-center gap-2 bg-white text-orange-500 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                <Phone className="w-5 h-5" />
                اتصل بنا
              </button>
              <button className="flex items-center justify-center gap-2 bg-white text-orange-500 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                <Mail className="w-5 h-5" />
                راسلنا
              </button>
              <button className="flex items-center justify-center gap-2 bg-white text-orange-500 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                <MessageCircle className="w-5 h-5" />
                محادثة مباشرة
              </button>
            </div>
          </div>
        </div>
      </main>

      <SystemsFooter />
    </div>
  );
};

export default FAQ;
