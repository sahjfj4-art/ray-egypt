
import React, { useState } from 'react';
import { Sparkles, RefreshCw, ChevronRight, Lightbulb } from 'lucide-react';
import { getGeminiResponse } from '../../../services/geminiService';

interface SmartInsightsWidgetProps {
  dataContext: string; // A string summary of the current dashboard stats
}

const SmartInsightsWidget: React.FC<SmartInsightsWidgetProps> = ({ dataContext }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateInsight = async () => {
    setIsLoading(true);
    try {
      const prompt = `بناءً على هذه البيانات لنشاط تجاري: ${dataContext}
      قم بتقديم نصيحة إدارية أو تسويقية واحدة ذكية ومختصرة جداً (سطرين كحد أقصى) باللغة العربية وباللهجة المصرية المحترفة. 
      ركز على فرص النمو أو تحسين الكفاءة. لا تذكر الأرقام بالتفصيل، بل اذكر الاستنتاج.`;
      
      const response = await getGeminiResponse(prompt, 'merchant');
      setInsight(response);
    } catch (error) {
      console.error("Failed to generate insight", error);
      setInsight("عذراً، حدث خطأ أثناء تحليل البيانات. حاول مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
          <Sparkles className="w-8 h-8 text-yellow-400" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            تحليل راي الذكي
            {isLoading && <RefreshCw className="w-4 h-4 animate-spin opacity-70" />}
          </h3>
          
          {insight ? (
            <p className="text-indigo-100 leading-relaxed text-sm animate-in fade-in">
              {insight}
            </p>
          ) : (
            <p className="text-indigo-200 text-sm">
              اضغط على الزر للحصول على تحليل فوري لأداء عملك ونصائح للنمو.
            </p>
          )}
        </div>

        <button 
          onClick={generateInsight}
          disabled={isLoading}
          className="bg-white text-indigo-900 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-50 transition shadow-md flex items-center gap-2 disabled:opacity-70 whitespace-nowrap"
        >
          {insight ? 'تحديث التحليل' : 'حلل أدائي'}
          {!insight && <Lightbulb className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default SmartInsightsWidget;
    