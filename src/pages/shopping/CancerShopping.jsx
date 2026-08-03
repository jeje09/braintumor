import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, ExternalLink, ShieldCheck, Heart, Info, Check } from 'lucide-react';

export const CancerShopping = () => {
  const { products } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '편안한 휴식', '바른 영양', '안전한 이동', '뷰티·위생', '생활 편의'];

  const categoryDescriptions = {
    '전체': '항암 치료와 요양 생활의 질을 높여주는 맞춤형 필수품들입니다.',
    '편안한 휴식': '가구 및 침구류 — 안정적인 상체 거치 및 편안한 수면 자세 유지용',
    '바른 영양': '식사 대용 및 영양 보충식 — 기력 저하 시 균형 잡힌 영양 공급 및 식사 대용',
    '안전한 이동': '거동 및 실내외 보행 보조 — 낙상 사고 예방 및 안전한 일상 이동 보조',
    '뷰티·위생': '항암 케어 및 위생 용품 — 항암 치료기 두피 보호 및 민감해진 피부 위생 관리용',
    '생활 편의': '병동 및 재택 요양 꿀템 — 환자와 보호자의 수고를 덜어주는 일상적인 필수 편의 용품'
  };

  const filteredProducts = selectedCategory === '전체'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header */}
      <section className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 text-sm font-bold">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>환우 & 보호자 동행 쇼핑</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          항암 케어 필수품 & 엄선 웰니스 용품
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
          항암 구역감 완화 생강 캔디부터 부드러운 항암 두건, 오메가-3, 특수 체온 가이드까지. 환자의 편안함과 영양을 돕는 필수 케어 제품입니다.
        </p>
      </section>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-base font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30 scale-105'
                : 'glass-card text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Selected Category Description */}
      <div className="bg-sky-50/50 dark:bg-sky-900/10 border border-sky-100 dark:border-sky-800/50 rounded-2xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
        <p className="text-base font-medium text-slate-700 dark:text-slate-300">
          {categoryDescriptions[selectedCategory]}
        </p>
      </div>

      {/* Legal Notice */}
      <div className="w-full text-center py-3 px-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        <p className="text-sm md:text-base font-bold text-sky-500 dark:text-sky-400">
          이 게시물은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
              <div className="w-[120px] h-[240px] bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 text-sm text-center p-4">
                상품 준비 중
              </div>
            )}
            <span className="mt-4 text-sm font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30 px-3 py-1 rounded-full uppercase tracking-wider block">
              {prod.category}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};
