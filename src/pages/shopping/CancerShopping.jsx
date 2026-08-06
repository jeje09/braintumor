import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, ExternalLink, ShieldCheck, Heart, Info, Check, Plus, Trash2 } from 'lucide-react';

export const CancerShopping = () => {
  const { products, addProduct, deleteProduct } = useApp();
  const { isSuperAdmin } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [newProd, setNewProd] = useState({ category: '항구역 케어', iframeCode: '' });

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProd.iframeCode) return;
    addProduct({ ...newProd });
    setNewProd({ category: '항구역 케어', iframeCode: '' });
  };

  const categories = ['전체', '편안한 휴식', '바른 영양', '안전한 이동', '뷰티·위생', '생활 편의'];

  const categoryDescriptions = {
    '전체': '뇌종양 환우분들의 일상 속 편안함과 영양을 든든하게 채워주는 건강 용품들입니다.',
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
          환우 맞춤 영양 & 건강 웰니스 용품
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
          뇌종양 환우분들을 위한 프리미엄 영양식, 건강 보조제, 면역력 증진 식품 및 일상의 편안함을 돕는 맞춤형 건강 용품들을 엄선했습니다.
        </p>
      </section>

      {/* Coupang Partners Banner */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-100 dark:border-blue-900/50 flex flex-col md:flex-row items-center gap-6 justify-between hover:shadow-xl transition-all duration-300 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-6 z-10 text-center sm:text-left">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm shrink-0 flex items-center justify-center">
            <img 
              src="https://image10.coupangcdn.com/image/coupang/common/logo_coupang_w350.png" 
              alt="Coupang" 
              className="w-32 h-auto object-contain"
            />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">필요한 모든 케어 용품, 로켓배송으로 빠르고 편하게!</h3>
            <p className="text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              이곳을 통해서 쿠팡에서 물품을 구매하시면 <strong className="text-blue-600 dark:text-blue-400">사이트 운영비를 후원</strong>하실 수 있습니다. (추가 비용 없음)
            </p>
          </div>
        </div>
        
        <a 
          href="https://link.coupang.com/a/fYFHJwXmcC" 
          target="_blank" 
          rel="noopener noreferrer"
          className="shrink-0 px-8 py-4 bg-[#0073E9] hover:bg-[#005bb5] text-white font-bold rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95 w-full md:w-auto text-center z-10 flex items-center justify-center gap-2 text-lg"
        >
          <span>쿠팡에서 쇼핑하기</span>
        </a>
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

      {/* Admin Panel: Add Product */}
      {isSuperAdmin && (
        <section className="glass-card p-6 rounded-3xl space-y-4 border border-sky-200 dark:border-sky-900 shadow-sm bg-white/50 dark:bg-slate-900/50">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-600" />
            <span>수퍼관리자: 쇼핑 물품 등록</span>
          </h3>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-12 gap-4 text-sm items-end">
            <div className="md:col-span-3">
              <label className="font-bold block mb-1 text-slate-600 dark:text-slate-400">카테고리</label>
              <select
                value={newProd.category}
                onChange={(e) => setNewProd({...newProd, category: e.target.value})}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-900 dark:text-white"
              >
                {categories.filter(c => c !== '전체').map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="md:col-span-7">
              <label className="font-bold block mb-1 text-slate-600 dark:text-slate-400">Iframe 코드 입력</label>
              <input
                type="text"
                required
                value={newProd.iframeCode}
                onChange={(e) => setNewProd({...newProd, iframeCode: e.target.value})}
                placeholder='예: <iframe src="https://coupa.ng/..." width="120" height="240" ...></iframe>'
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm shadow-md"
              >
                등록
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 relative group"
          >
            {isSuperAdmin && (
              <button
                onClick={() => { if (window.confirm('정말 삭제하시겠습니까?')) deleteProduct(prod.id); }}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                title="삭제"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
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
