
import React from 'react';
import { X, LogOut, Settings } from 'lucide-react';
import { DashboardConfig } from '../config';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  config: DashboardConfig;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ 
  isOpen, onClose, config, activeTab, setActiveTab, onLogout 
}) => {
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Sidebar Panel */}
      <aside className="relative w-64 h-full bg-gray-900 text-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="p-5 border-b border-gray-800 flex justify-between items-center">
          <h2 className="font-bold text-lg">{config.title}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {config.navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                onClose();
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 
                ${activeTab === item.id 
                  ? `bg-${config.themeColor || 'blue'}-600 text-white font-bold shadow-md` 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
              `}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
          
          <div className="my-4 border-t border-gray-800 opacity-50"></div>
          
          <button
            onClick={() => {
              setActiveTab('settings');
              onClose();
            }}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${activeTab === 'settings' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
          >
            <Settings className="w-5 h-5" />
            <span>الإعدادات</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-800 bg-black/20">
          <button 
            onClick={onLogout} 
            className="flex items-center gap-3 text-red-400 hover:text-red-300 transition w-full p-2 rounded-lg hover:bg-gray-800"
          >
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default MobileSidebar;
