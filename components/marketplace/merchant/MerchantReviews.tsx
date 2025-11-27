
import React from 'react';
import { Star } from 'lucide-react';

const ReviewCard = ({ name, rating, date, text }: any) => (
  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
    <div className="flex justify-between items-start mb-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-gray-500 text-xs border">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-sm text-gray-900">{name}</h4>
          <div className="flex text-yellow-400 text-xs">
            {Array(5).fill(0).map((_, i) => <Star key={i} className={`w-3 h-3 ${i < rating ? 'fill-current' : 'text-gray-300'}`} />)}
          </div>
        </div>
      </div>
      <span className="text-[10px] text-gray-400">{date}</span>
    </div>
    <p className="text-xs text-gray-600 leading-relaxed">{text}</p>
  </div>
);

const MerchantReviews: React.FC = () => {
  return (
    <div className="space-y-4 animate-in fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">أحدث التقييمات</h3>
        <button className="text-sm text-blue-600 font-bold">عرض الكل</button>
      </div>
      <ReviewCard name="أحمد محمد" rating={5} date="منذ يومين" text="تجربة ممتازة وخدمة راقية جداً. أنصح بالتعامل معهم." />
      <ReviewCard name="سارة علي" rating={4} date="منذ أسبوع" text="المكان نظيف والأسعار معقولة، لكن الانتظار كان طويلاً قليلاً." />
      <ReviewCard name="كريم حسن" rating={5} date="منذ شهر" text="الأفضل في المنطقة بلا منازع!" />
    </div>
  );
};

export default MerchantReviews;
