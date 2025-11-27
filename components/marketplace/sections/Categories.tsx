
import React from 'react';
import { allCategories } from '../data';

const Categories: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-ray-black dark:text-white flex items-center gap-2">
            <span className="w-2 h-8 bg-ray-gold rounded-full block"></span>
            اكتشف حسب النشاط
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm md:text-base">أكثر من 20 قسم لتلبية جميع احتياجاتك</p>
        </div>
        <a href="#" className="text-ray-blue dark:text-ray-gold font-bold hover:underline flex items-center gap-1 text-sm">عرض كل الأقسام ←</a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {allCategories.map((cat) => (
          <div key={cat.id} className="group cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:border-ray-blue/30 dark:hover:border-ray-gold/30 transition-all duration-300 flex flex-col items-center justify-center gap-4 text-center relative overflow-hidden">
            <div className={`w-16 h-16 ${cat.color} dark:bg-opacity-20 rounded-full flex items-center justify-center group-hover:scale-110 transition duration-300 z-10`}>
              <cat.icon className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-ray-blue dark:group-hover:text-ray-gold z-10">{cat.name}</h3>
            
            {/* Subtle background pattern on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-700 opacity-0 group-hover:opacity-100 transition duration-500"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
