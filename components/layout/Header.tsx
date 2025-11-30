import React from 'react';
import { ArrowLeft, Menu, X } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title = 'Ray Egypt',
  showBackButton = false,
  onBackClick
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <div className="flex items-center">
            {showBackButton && onBackClick && (
              <button
                onClick={onBackClick}
                className="ml-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              الرئيسية
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              الأنظمة
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              الأسعار
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              الدعم
            </a>
          </nav>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors py-2">
                الرئيسية
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors py-2">
                الأنظمة
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors py-2">
                الأسعار
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors py-2">
                الدعم
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
