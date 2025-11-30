import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
  onPageNavigation?: (view: any) => void;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  className = '',
  onPageNavigation
}) => {
  // Simple Header inline
  const Header = () => (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-bold text-gray-900">Ray Egypt</h1>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900">الرئيسية</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">الأنظمة</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">الدعم</a>
          </nav>
        </div>
      </div>
    </header>
  );

  // Simple Footer inline
  const Footer = ({ onPageNavigation }: { onPageNavigation?: (view: any) => void }) => (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Ray Egypt</h3>
          <p className="text-gray-400 mb-4">منصة متكاملة لإدارة الأعمال</p>
          <div className="flex justify-center space-x-6 mb-4">
            <button 
              onClick={() => onPageNavigation?.('about')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              عن الشركة
            </button>
            <button 
              onClick={() => onPageNavigation?.('help')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              الدعم
            </button>
            <button 
              onClick={() => onPageNavigation?.('privacy')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              الخصوصية
            </button>
          </div>
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Ray Egypt. جميع الحقوق محفوظة.
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {showHeader && <Header />}
      <main>{children}</main>
      {showFooter && <Footer onPageNavigation={onPageNavigation} />}
    </div>
  );
};

export default PageLayout;
