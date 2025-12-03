import React from 'react';
import { Book, Video, FileText, Download, MessageCircle, Phone, Mail, Search, ExternalLink, HeadphonesIcon } from 'lucide-react';
import PageLayout from '../../layout/PageLayout';
import { HelpCategory, HelpArticle, BasePageProps } from '../../../types';

interface HelpViewProps extends BasePageProps {}

const HelpView: React.FC<HelpViewProps> = ({ onPageNavigation }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [searchTerm, setSearchTerm] = React.useState('');

  const helpCategories: HelpCategory[] = [
    {
      id: 'getting-started',
      name: 'getting-started',
      title: 'البدء',
      icon: Book,
      description: 'دليل البدء السريع وإعداد حسابك',
      color: 'bg-blue-500',
      articles: []
    },
    {
      id: 'systems',
      name: 'systems',
      title: 'الأنظمة',
      icon: Video,
      description: 'شرح جميع الأنظمة وكيفية استخدامها',
      color: 'bg-green-500',
      articles: []
    },
    {
      id: 'billing',
      name: 'billing',
      title: 'الفواتير والدفع',
      icon: FileText,
      description: 'كيفية إدارة الفواتير والاشتراكات',
      color: 'bg-purple-500',
      articles: []
    },
    {
      id: 'technical',
      name: 'technical',
      title: 'دعم فني',
      icon: HeadphonesIcon,
      description: 'حل المشاكل التقنية والأسئلة الشائعة',
      color: 'bg-red-500',
      articles: []
    }
  ];

  const helpArticles: HelpArticle[] = [
    {
      id: '1',
      title: 'كيف تنشئ حساب جديد في منصة راي؟',
      category: 'getting-started',
      excerpt: 'خطوات بسيطة لإنشاء حسابك الأول والبدء في استخدام المنصة',
      content: 'محتوى مفصل حول كيفية إنشاء حساب جديد...',
      difficulty: 'beginner',
      readTime: 3,
      hasVideo: true,
      hasDownload: false
    },
    {
      id: '2',
      title: 'إعداد نظام المطعم الخاص بك',
      category: 'systems',
      excerpt: 'دليل متكامل لإعداد نظام إدارة المطاعم من الألف إلى الياء',
      content: 'محتوى مفصل حول إعداد نظام المطعم...',
      difficulty: 'intermediate',
      readTime: 10,
      hasVideo: true,
      hasDownload: true
    },
    {
      id: '3',
      title: 'حل مشاكل تسجيل الدخول',
      category: 'technical',
      excerpt: 'المشاكل الشائعة في تسجيل الدخول وكيفية حلها',
      content: 'محتوى مفصل حول حل مشاكل تسجيل الدخول...',
      difficulty: 'beginner',
      readTime: 2,
      hasVideo: false,
      hasDownload: false
    }
  ];

  const categories = ['all', ...new Set(helpArticles.map(article => article.category))];

  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'مبتدئ': return 'bg-green-100 text-green-800';
      case 'متوسط': return 'bg-yellow-100 text-yellow-800';
      case 'متقدم': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageLayout onPageNavigation={onPageNavigation}>
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <HeadphonesIcon className="w-16 h-16 text-yellow-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              مركز المساعدة
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              كل ما تحتاج لمعرفته حول منصة راي. أدلة، فيديوهات، ودعم فني متكامل
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="ابحث عن مساعدة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-3.5 text-gray-400">
                <Search className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <MessageCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">محادثة مباشرة</h3>
              <p className="text-gray-600 mb-4">تواصل مع فريق الدعم مباشرة</p>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                ابدأ محادثة
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <Phone className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">اتصل بنا</h3>
              <p className="text-gray-600 mb-4">01012345678 - متواصل 24/7</p>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                اتصل الآن
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <Mail className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">راسلنا</h3>
              <p className="text-gray-600 mb-4">info@ray-eg.com</p>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                إرسال بريد
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">تصفح حسب الفئة</h2>
            <div className="flex flex-wrap gap-2 justify-center mb-8">
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
                  {category === 'all' ? 'الكل' : helpCategories.find(c => c.id === category)?.title || category}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpCategories.map(category => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{category.title}</h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{category.articles.length} مقال</span>
                      <span className="text-yellow-500 hover:text-yellow-600">
                        استكشف →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Articles */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {searchTerm || selectedCategory !== 'all' ? 'نتائج البحث' : 'المقالات الشائعة'}
            </h2>
            <div className="space-y-4">
              {filteredArticles.map(article => (
                <div key={article.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(article.difficulty)}`}>
                          {article.difficulty}
                        </span>
                        <span className="text-sm text-gray-500">{article.readTime}</span>
                        {article.hasVideo && (
                          <span className="flex items-center gap-1 text-sm text-blue-500">
                            <Video className="w-4 h-4" />
                            فيديو
                          </span>
                        )}
                        {article.hasDownload && (
                          <span className="flex items-center gap-1 text-sm text-green-500">
                            <Download className="w-4 h-4" />
                            تحميل
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-yellow-500 cursor-pointer">
                        {article.title}
                      </h3>
                      <p className="text-gray-600">{article.excerpt}</p>
                    </div>
                    <button className="mr-4 text-yellow-500 hover:text-yellow-600">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* No Results */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">لم يتم العثور على مساعدة</p>
              <p className="text-gray-400 mt-2">جرب تغيير كلمات البحث أو الفئة</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default HelpView;
