import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExternalLink, Star, Sparkles, ShieldCheck, AlertCircle } from 'lucide-react';

export const CoupangShopping = () => {
  const { coupangProducts } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '건강기능식품', '아로마테라피', '웰니스푸드'];

  const filteredProducts = selectedCategory === '전체'
    ? coupangProducts
    : coupangProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4 relative overflow-hidden bg-gradient-to-r from-amber-900/10 via-orange-900/10 to-red-900/10 border border-amber-200 dark:border-amber-900/50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center text-2xl shadow-sm font-black">
            🚀
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              쿠팡 파트너스 웰니스 쇼핑 갤러리
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              쿠팡 로켓배송 최저가로 만나는 엄선된 건강 자이언트 유기농 상품 라인업.
            </p>
          </div>
        </div>

        {/* MANDATORY AFFILIATE NOTICE BANNER */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</span>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-amber-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Container Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="glass-card rounded-3xl overflow-hidden group hover:shadow-2xl hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              {/* Image & Badge */}
              <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-amber-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  {product.category}
                </div>
                {product.isBest && (
                  <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md">
                    <Star className="w-3 h-3 fill-current" />
                    <span>로켓추천</span>
                  </div>
                )}
              </div>

              {/* Product Content */}
              <div className="p-5 space-y-3">
                <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Price Display */}
                <div className="pt-2 flex items-baseline gap-2">
                  <span className="text-xl font-black text-amber-600 dark:text-amber-400">
                    {product.price.toLocaleString()}원
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      {product.originalPrice.toLocaleString()}원
                    </span>
                  )}
                </div>

                {/* Micro Notice */}
                <p className="text-[10px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-slate-800 p-1.5 rounded-lg font-medium">
                  ※ 쿠팡 파트너스 활동 수수료 지급 대상 상품
                </p>
              </div>
            </div>

            {/* Coupang Outlink Button */}
            <div className="p-5 pt-0">
              <a
                href={product.coupangLink || 'https://partners.coupang.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-extrabold rounded-2xl shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 transform active:scale-95"
              >
                <span>쿠팡에서 최저가 구매하기</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Mandatory Notice */}
      <div className="text-center py-6 text-xs text-amber-800 dark:text-amber-300 font-bold bg-amber-50 dark:bg-slate-900/60 rounded-2xl border border-amber-200 dark:border-slate-800">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </div>
    </div>
  );
};
