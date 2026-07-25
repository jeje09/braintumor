import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, CreditCard, ShieldCheck, Tag, Star, Sparkles } from 'lucide-react';

export const Shopping = () => {
  const { products, openCheckout } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '아로마/치유', '건강식품', '건강차'];

  const filteredProducts = selectedCategory === '전체'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-3 relative overflow-hidden bg-gradient-to-r from-pink-900/10 via-rose-900/10 to-amber-900/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-950 text-pink-600 dark:text-pink-400 flex items-center justify-center text-2xl shadow-sm">
            🛍️
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              쭈니의 힐링 웰니스 쇼핑몰
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              관리자가 직접 선별한 검증된 100% 유기농 자연치유 제품 및 아로마 테라피 상품.
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-pink-600 text-white shadow-md shadow-pink-600/30'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-pink-50'
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
            className="glass-card rounded-3xl overflow-hidden group hover:shadow-2xl hover:border-pink-300 dark:hover:border-pink-600 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              {/* Image & Badge */}
              <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  {product.category}
                </div>
                {product.isBest && (
                  <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md">
                    <Star className="w-3 h-3 fill-current" />
                    <span>베스트</span>
                  </div>
                )}
              </div>

              {/* Product Content Container */}
              <div className="p-5 space-y-3">
                <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-100 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors leading-snug line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Price Display */}
                <div className="pt-2 flex items-baseline gap-2">
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                    {product.price.toLocaleString()}원
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      {product.originalPrice.toLocaleString()}원
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Container Buttons */}
            <div className="p-5 pt-0 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => openCheckout(product, 'paytap')}
                  className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Paytap 결제</span>
                </button>
                <button
                  onClick={() => openCheckout(product, 'kcp')}
                  className="py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>KCP 결제</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
