import React from 'react';
import { Calendar, Clock, User, ArrowLeft, Search, Tag, TrendingUp } from 'lucide-react';
import PageLayout from '../../layout/PageLayout';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  image: string;
}

interface BlogViewProps {
  onPageNavigation?: (view: any) => void;
}

const BlogView: React.FC<BlogViewProps> = ({ onPageNavigation }) => {
  const [selectedPost, setSelectedPost] = React.useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'كيف تدير مطعمك بكفاءة باستخدام نظام راي',
      excerpt: 'تعرف على أفضل الممارسات لإدارة مطعمك باستخدام نظام متكامل يوفر الوقت والجهد.',
      content: `
        <h2>مقدمة</h2>
        <p>إدارة المطاعم تتطلب تنظيماً دقيقاً وكفاءة عالية. مع نظام راي للمطاعم، يمكنك تحقيق أفضل النتائج بأقل جهد.</p>
        
        <h2>المميزات الرئيسية</h2>
        <ul>
          <li>إدارة الطلبات بشكل فوري</li>
          <li>تتبع المخزون تلقائياً</li>
          <li>تقارير مفصلة عن الأداء</li>
          <li>نظام حجز متقدم</li>
        </ul>
        
        <h2>النتائج المتوقعة</h2>
        <p>مع استخدام نظام راي، يمكن للمطاعم زيادة كفاءتها بنسبة تصل إلى 40% وتحسين تجربة العملاء بشكل ملحوظ.</p>
      `,
      author: 'أحمد محمد',
      date: '2024-11-20',
      readTime: '5 دقائق',
      category: 'المطاعم',
      tags: ['إدارة', 'كفاءة', 'تقنية'],
      featured: true,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '2',
      title: 'أهمية نظام إدارة المخزون للمتاجر',
      excerpt: 'لماذا تحتاج متاجرك لنظام إدارة مخزون متطور وكيف يوفر عليك التكاليف.',
      content: `
        <h2>لماذا إدارة المخزون مهمة؟</h2>
        <p>إدارة المخزون الفعالة هي أساس نجاح أي متجر تجزئة. تساعد في تقليل الهدر وتحسين التدفق النقدي.</p>
        
        <h2>مميزات نظام راي للمخزون</h2>
        <ul>
          <li>تتبع دقيق للمخزون</li>
          <li>تنبيهات للنواقص</li>
          <li>تقارير المبيعات</li>
          <li>تكامل مع نقاط البيع</li>
        </ul>
      `,
      author: 'سارة أحمد',
      date: '2024-11-18',
      readTime: '3 دقائق',
      category: 'التجزئة',
      tags: ['مخزون', 'إدارة', 'توفير'],
      featured: false,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const categories = ['all', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedPost) {
    return (
      <PageLayout onPageNavigation={onPageNavigation}>
        <div className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSelectedPost(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              العودة للمدونة
            </button>

            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title}
                className="w-full h-64 object-cover"
              />
              
              <div className="p-8">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {selectedPost.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedPost.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedPost.readTime}
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {selectedPost.title}
                </h1>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedPost.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div 
                  className="prose prose-lg max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
              </div>
            </article>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout onPageNavigation={onPageNavigation}>
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              مدونة راي
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              مقالات ونصائح حول إدارة الأعمال والتحول الرقمي
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="ابحث في المقالات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-3.5 text-gray-400">
                <Search className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Category Filter */}
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
                {category === 'all' ? 'الكل' : category}
              </button>
            ))}
          </div>

          {/* All Posts */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {searchTerm || selectedCategory !== 'all' ? 'نتائج البحث' : 'جميع المقالات'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{post.author}</span>
                      <span className="text-yellow-500 hover:text-yellow-600">
                        اقرأ المزيد →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">لم يتم العثور على مقالات</p>
              <p className="text-gray-400 mt-2">جرب تغيير كلمات البحث أو الفئة</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default BlogView;
