import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, ExternalLink, ShieldCheck, Heart, Info, Check } from 'lucide-react';

export const CancerShopping = () => {
  const { products } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '항구역 케어', '케어 용품', '영양 보충', '도서·마음'];

  const filteredProducts = selectedCategory === '전체'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header */}
      <section className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300 text-xs font-bold">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>환우 & 보호자 동행 쇼핑</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          항암 케어 필수품 & 엄선 웰니스 용품
        </h1>
        <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
          항암 구역감 완화 생강 캔디부터 부드러운 항암 두건, 오메가-3, 특수 체온 가이드까지. 환자의 편안함과 영양을 돕는 필수 케어 제품입니다.
        </p>
      </section>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30 scale-105'
                : 'glass-card text-slate-600 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="glass-card rounded-3xl overflow-hidden group border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-2xl transition-all duration-300"
          >
            <div>
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 text-3xl p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-md">
                  {prod.icon}
                </span>

                <span className="absolute top-3 right-3 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-violet-600 text-white shadow-md">
                  {prod.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider block">
                    {prod.category}
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white mt-0.5 line-clamp-1">
                    {prod.title}
                  </h3>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-rose-600 dark:text-rose-400">
                    {prod.price.toLocaleString()}원
                  </span>
                  {prod.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      {prod.originalPrice.toLocaleString()}원
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {prod.description}
                </p>

                {/* Doctor Note */}
                <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900/40 text-[11px] text-violet-800 dark:text-violet-300 font-medium">
                  💡 {prod.doctorNote}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="p-5 pt-0">
              <a
                href={prod.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-violet-600/30"
              >
                <span>최저가 구매 링크 이동</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
