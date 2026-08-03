import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExternalLink, Star, Sparkles, AlertCircle } from 'lucide-react';

export const NaverShopping = () => {
  const { naverProducts } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '뷰티/힐링', '건강식품', '건강차'];

  const filteredProducts = selectedCategory === '전체'
    ? naverProducts
    : naverProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-8 pb-16">
      {/* 🚨 VERY TOP MANDATORY AFFILIATE NOTICE BANNER - 2X FONT SIZE 🚨 */}
      <div className="p-4 sm:p-6 rounded-3xl bg-emerald-500/15 dark:bg-emerald-950/80 border-2 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100 font-black text-base sm:text-lg lg:text-xl flex items-center justify-center gap-3 text-center shadow-xl animate-pulse">
        <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span>이 포스팅은 네이버 브랜드 커넥트 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</span>
      </div>

      {/* Main Header */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4 relative overflow-hidden bg-gradient-to-r from-emerald-900/10 via-teal-900/10 to-green-900/10 border border-emerald-200 dark:border-emerald-900/50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-2xl shadow-sm font-black">
            N
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              네이버 브랜드 커넥트 웰니스 쇼핑 갤러리
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-0.5">
              네이버 스마트스토어 및 브랜드 커넥트 공식 셀렉션 라이브 스토어.
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-emerald-50'
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
            className="glass-card rounded-3xl overflow-hidden group hover:shadow-2xl hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              {/* Image & Badge */}
              <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-emerald-600/90 backdrop-blur-md text-white text-sm font-bold px-2.5 py-1 rounded-lg">
                  {product.category}
                </div>
                {product.isBest && (
                  <div className="absolute top-3 right-3 bg-emerald-500 text-white text-sm font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md">
                    <Star className="w-3 h-3 fill-current" />
                    <span>네이버추천</span>
                  </div>
                )}
              </div>

              {/* Product Content */}
              <div className="p-5 space-y-3">
                <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Price Display */}
                <div className="pt-2 flex items-baseline gap-2">
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                    {product.price.toLocaleString()}원
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      {product.originalPrice.toLocaleString()}원
                    </span>
                  )}
                </div>

                {/* Micro Notice */}
                <p className="text-sm text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-slate-800 p-1.5 rounded-lg font-medium">
                  ※ 네이버 브랜드 커넥트 수수료 지급 대상 상품
                </p>
              </div>
            </div>

            {/* Naver Outlink Button */}
            <div className="p-5 pt-0">
              <a
                href={product.naverLink || 'https://brandconnect.naver.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-extrabold rounded-2xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 transform active:scale-95"
              >
                <span>네이버에서 공식 구매하기</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Notice */}
      <div className="text-center py-6 text-sm sm:text-base text-emerald-900 dark:text-emerald-300 font-black bg-emerald-50 dark:bg-slate-900/60 rounded-2xl border border-emerald-200 dark:border-slate-800">
        이 포스팅은 네이버 브랜드 커넥트 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </div>
    </div>
  );
};
