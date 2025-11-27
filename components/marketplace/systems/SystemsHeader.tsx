import React, { useState } from 'react';
import { Menu, X, LayoutGrid, LogOut } from 'lucide-react';

interface SystemsHeaderProps {
  onNavigateHome?: () => void;
  onLogout?: () => void;
  title?: string;
}

const SystemsHeader: React.FC<SystemsHeaderProps> = ({ 
  onNavigateHome, 
  onLogout,
  title = 'منصة راي'
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            onClick={onNavigateHome}
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-ray-blue to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-xl">R</span>
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-900 dark:text-white">{title}</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">أنظمة إدارة متكاملة</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-ray-blue dark:hover:text-ray-gold transition font-medium">
              الأنظمة
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-ray-blue dark:hover:text-ray-gold transition font-medium">
              المميزات
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-ray-blue dark:hover:text-ray-gold transition font-medium">
              الأسعار
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-ray-blue dark:hover:text-ray-gold transition font-medium">
              عن راي
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onNavigateHome}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-ray-blue dark:text-ray-gold hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition font-medium"
            >
              <LayoutGrid className="w-5 h-5" />
              <span>الرئيسية</span>
            </button>
            
            {onLogout && (
              <button 
                onClick={onLogout}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition font-medium"
              >
                <LogOut className="w-5 h-5" />
                <span>خروج</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-800">
            <nav className="flex flex-col gap-3 mt-4">
              <a href="#" className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-ray-blue dark:hover:text-ray-gold transition font-medium">
                الأنظمة
              </a>
              <a href="#" className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-ray-blue dark:hover:text-ray-gold transition font-medium">
                المميزات
              </a>
              <a href="#" className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-ray-blue dark:hover:text-ray-gold transition font-medium">
                الأسعار
              </a>
              <a href="#" className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-ray-blue dark:hover:text-ray-gold transition font-medium">
                عن راي
              </a>
              <button 
                onClick={onNavigateHome}
                className="px-4 py-2 text-ray-blue dark:text-ray-gold hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition font-medium text-right"
              >
                الرئيسية
              </button>
              {onLogout && (
                <button 
                  onClick={onLogout}
                  className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition font-medium text-right"
                >
                  خروج
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default SystemsHeader;
