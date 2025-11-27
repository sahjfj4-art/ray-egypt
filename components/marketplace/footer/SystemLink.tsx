import React from 'react';
import { ArrowLeft, LucideIcon } from 'lucide-react';

interface SystemLinkProps {
  id: string;
  label: string;
  icon: LucideIcon;
  colorClass: string;
  onClick: (id: string) => void;
}

const SystemLink: React.FC<SystemLinkProps> = ({ id, label, icon: Icon, colorClass, onClick }) => {
  return (
    <button 
      onClick={() => onClick(id)}
      className={`flex items-center gap-3 p-3 rounded-xl border transition-all group text-right ${colorClass}`}
    >
      <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition">
         <Icon className="w-4 h-4" />
      </div>
      <span className="font-bold text-sm flex-1">{label}</span>
      <ArrowLeft className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
};

export default SystemLink;