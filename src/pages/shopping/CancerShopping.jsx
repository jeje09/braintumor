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
            className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300"
          >
            {prod.iframeCode ? (
              <div 
                className="w-full flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: prod.iframeCode }} 
              />
            ) : (
              <div className="w-[120px] h-[240px] bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 text-xs text-center p-4">
                상품 준비 중
              </div>
            )}
            <span className="mt-4 text-[11px] font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30 px-3 py-1 rounded-full uppercase tracking-wider block">
              {prod.category}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};
