import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Save, 
  ShoppingBag, 
  HeartPulse, 
  Utensils, 
  Compass, 
  Sparkles,
  CheckCircle
} from 'lucide-react';

export const Admin = () => {
  const { 
    quickLinks, 
    updateQuickLinks, 
    products, 
    addProduct, 
    deleteProduct,
    healthStories,
    setHealthStories,
    foodCalories,
    setFoodCalories,
    healingTravel,
    setHealingTravel,
    perfumeStories,
    setPerfumeStories
  } = useApp();

  const [activeAdminSubTab, setActiveAdminSubTab] = useState('products'); // 'products', 'quicklinks', 'health'
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Quick Links Form State
  const [coupangUrl, setCoupangUrl] = useState(quickLinks.coupang);
  const [inpockUrl, setInpockUrl] = useState(quickLinks.inpock);

  // New Product Form State
  const [newProdTitle, setNewProdTitle] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('아로마/치유');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdOrigPrice, setNewProdOrigPrice] = useState('');
  const [newProdImage, setNewProdImage] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdPaytap, setNewProdPaytap] = useState('');
  const [newProdKcp, setNewProdKcp] = useState('');
  const [newProdBest, setNewProdBest] = useState(false);

  const handleSaveQuickLinks = (e) => {
    e.preventDefault();
    updateQuickLinks({
      coupang: coupangUrl,
      inpock: inpockUrl
    });
    showMsg('쿠팡 파트너스 및 인포크링크 URL이 업데이트되었습니다!');
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProdTitle || !newProdPrice) return;

    addProduct({
      title: newProdTitle,
      category: newProdCategory,
      price: parseInt(newProdPrice, 10),
      originalPrice: newProdOrigPrice ? parseInt(newProdOrigPrice, 10) : null,
      image: newProdImage || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      description: newProdDesc,
      paytapLink: newProdPaytap || 'https://payapp.kr/paytap_demo',
      kcpLink: newProdKcp || 'https://kcp.co.kr/kcp_checkout_demo',
      isBest: newProdBest
    });

    // Reset Form
    setNewProdTitle('');
    setNewProdPrice('');
    setNewProdOrigPrice('');
    setNewProdImage('');
    setNewProdDesc('');
    setNewProdPaytap('');
    setNewProdKcp('');
    setNewProdBest(false);

    showMsg('신규 상품이 컨테이너 형식으로 등록되었습니다!');
  };

  const showMsg = (msg) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-3 bg-gradient-to-r from-slate-900 to-indigo-950 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 text-blue-400 flex items-center justify-center text-2xl">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                쭈니의 건강 이야기 - 관리자 어드민 센터
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                패널 콘텐츠, 퀵링크 바로가기 및 쇼핑 상품 컨테이너를 통합 관리합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="p-4 bg-emerald-500 text-white rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg animate-in slide-in-from-top duration-200">
          <CheckCircle className="w-5 h-5" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Admin Sub Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveAdminSubTab('products')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
            activeAdminSubTab === 'products'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>상품 컨테이너 관리자</span>
        </button>

        <button
          onClick={() => setActiveAdminSubTab('quicklinks')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
            activeAdminSubTab === 'quicklinks'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <ExternalLink className="w-4 h-4" />
          <span>쿠팡/인포크 퀵링크 관리자</span>
        </button>
      </div>

      {/* SubTab 1: Product Container Manager */}
      {activeAdminSubTab === 'products' && (
        <div className="space-y-8">
          {/* Add Product Container Form */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-extrabold text-lg">
              <Plus className="w-5 h-5" />
              <span>신규 상품 컨테이너 올리기</span>
            </div>

            <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  상품명 (Title)
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 유기농 편백 피톤치드 오일"
                  value={newProdTitle}
                  onChange={(e) => setNewProdTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  카테고리
                </label>
                <select
                  value={newProdCategory}
                  onChange={(e) => setNewProdCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="아로마/치유">아로마/치유</option>
                  <option value="건강식품">건강식품</option>
                  <option value="건강차">건강차</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  판매 가격 (원)
                </label>
                <input
                  type="number"
                  required
                  placeholder="38000"
                  value={newProdPrice}
                  onChange={(e) => setNewProdPrice(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  할인 전 원가 (선택)
                </label>
                <input
                  type="number"
                  placeholder="45000"
                  value={newProdOrigPrice}
                  onChange={(e) => setNewProdOrigPrice(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  상품 이미지 URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newProdImage}
                  onChange={(e) => setNewProdImage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  상품 상세 설명
                </label>
                <textarea
                  rows="2"
                  placeholder="상품에 대한 핵심 자연치유 효능과 설명을 적어주세요."
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Paytap (페이앱) 결제 URL
                </label>
                <input
                  type="text"
                  placeholder="https://payapp.kr/..."
                  value={newProdPaytap}
                  onChange={(e) => setNewProdPaytap(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  NHN KCP 결제 URL
                </label>
                <input
                  type="text"
                  placeholder="https://kcp.co.kr/..."
                  value={newProdKcp}
                  onChange={(e) => setNewProdKcp(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2 flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={newProdBest}
                    onChange={(e) => setNewProdBest(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                  <span>베스트 추천 상품 배지 표시</span>
                </label>

                <button
                  type="submit"
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>상품 컨테이너 등록하기</span>
                </button>
              </div>
            </form>
          </div>

          {/* Registered Products List Container */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4">
            <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-100">
              등록된 상품 컨테이너 목록 ({products.length}개)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950 px-2 py-0.5 rounded">
                        {prod.category}
                      </span>
                      <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate mt-0.5">
                        {prod.title}
                      </h4>
                      <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                        {prod.price.toLocaleString()}원
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteProduct(prod.id)}
                    className="p-2.5 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                    title="상품 삭제"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SubTab 2: Quick Links Manager */}
      {activeAdminSubTab === 'quicklinks' && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-extrabold text-lg">
            <ExternalLink className="w-5 h-5" />
            <span>쿠팡 파트너스 & 인포크링크 URL 관리자</span>
          </div>

          <form onSubmit={handleSaveQuickLinks} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                쿠팡 파트너스 바로가기 URL
              </label>
              <input
                type="url"
                required
                value={coupangUrl}
                onChange={(e) => setCoupangUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                인포크링크 (Inpock Link) 바로가기 URL
              </label>
              <input
                type="url"
                required
                value={inpockUrl}
                onChange={(e) => setInpockUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-2xl shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>바로가기 URL 저장하기</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
