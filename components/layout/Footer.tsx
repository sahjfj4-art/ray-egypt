import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onPageNavigation?: (view: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onPageNavigation }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Ray Egypt</h3>
            <p className="text-gray-300 mb-4">
              منصة متكاملة لإدارة جميع أنواع الأنشطة التجارية. نقدم حلولاً ذكية مخصصة لكل عمل مع 37 نظام مختلف يغطي جميع القطاعات التجارية.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onPageNavigation?.('about')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  عن الشركة
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onPageNavigation?.('systems')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  الأنظمة
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onPageNavigation?.('pricing')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  الأسعار
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onPageNavigation?.('blog')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  المدونة
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">الدعم</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onPageNavigation?.('help')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  مركز المساعدة
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onPageNavigation?.('faq')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  الأسئلة الشائعة
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onPageNavigation?.('contact')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  اتصل بنا
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onPageNavigation?.('privacy')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  سياسة الخصوصية
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@ray-egypt.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+20 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>القاهرة، مصر</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-gray-400 text-sm">
              © {currentYear} Ray Egypt. جميع الحقوق محفوظة.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
