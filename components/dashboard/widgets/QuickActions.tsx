
import React from 'react';
import { Search } from 'lucide-react';
import { DashboardConfig } from '../config';

interface QuickActionsProps {
  actions: DashboardConfig['quickActions'];
  theme: any;
  themeColor: string;
  onActionClick?: (action: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions, theme, themeColor, onActionClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
       {actions.map((action, idx) => (
         <button 
            key={idx} 
            onClick={() => onActionClick && onActionClick(action.action)}
            className={`group flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 
              hover:shadow-md hover:border-${themeColor}-300 dark:hover:border-${themeColor}-500 
              active:scale-95 active:shadow-inner transition-all duration-200 gap-3 h-24 md:h-28 relative overflow-hidden`}
         >
            <div className={`absolute inset-0 bg-${themeColor}-50 dark:bg-${themeColor}-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-lg z-10
              ${theme.lightBtn} dark:bg-gray-700 dark:text-${themeColor}-400
            `}>
              <action.icon className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <span className="font-bold text-gray-700 dark:text-gray-200 text-[10px] md:text-xs sm:text-sm text-center z-10 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
              {action.label}
            </span>
         </button>
       ))}
    </div>
  );
};

export default QuickActions;
