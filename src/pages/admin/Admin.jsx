import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Save, 
  ShoppingBag, 
  Lock, 
  KeyRound, 
  LogOut, 
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';

export const Admin = () => {
  const { 
    adminPassword,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    updateAdminPassword,
    quickLinks, 
    updateQuickLinks, 
    products, 
    addProduct, 
    deleteProduct
  } = useApp();

  const [inputPassword, setInputPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  // Admin Change Password Modal State
  const [showChangePwdModal, setShowChangePwdModal] = useState(false);
  const [currPasswordInput, setCurrPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [changePwdError, setChangePwdError] = useState('');

  // Admin Dashboard Tabs
  const [activeAdminSubTab, setActiveAdminSubTab] = useState('products');
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

  // Login Handler
  const handleLogin = (e) => {
    e.preventDefault();
    const success = loginAdmin(inputPassword);
    if (!success) {
      setLoginError('비밀번호가 올바르지 않습니다. (기본 비밀번호: 1234!)');
    } else {
      setLoginError('');
      setInputPassword('');
    }
  };

  // Change Password Handler
  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    if (currPasswordInput !== adminPassword) {
      setChangePwdError('현재 비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!newPasswordInput || newPasswordInput.length < 3) {
      setChangePwdError('새 비밀번호는 최소 3자 이상 입력해주세요.');
      return;
    }
    if (newPasswordInput !== confirmPasswordInput) {
      setChangePwdError('새 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    updateAdminPassword(newPasswordInput);
    setShowChangePwdModal(false);
    setCurrPasswordInput('');
    setNewPasswordInput('');
    setConfirmPasswordInput('');
    setChangePwdError('');
    showMsg('관리자 비밀번호가 성공적으로 변경되었습니다!');
  };

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

  /* ========================================================================= */
  /* UNAUTHENTICATED: Show Admin Password Lock Screen                          */
  /* ========================================================================= */
  if (!isAdminAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-16 px-4">
        <div className="glass-card p-8 rounded-3xl space-y-6 shadow-2xl border border-blue-100 dark:border-slate-800 text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto text-3xl shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
              관리자 어드민 접속 인증
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              보호된 관리자 대시보드입니다. 비밀번호를 입력해주세요.<br />
              <span className="text-blue-600 font-bold">(초기 비밀번호: 1234!)</span>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                관리자 비밀번호
              </label>
              <div className="relative">
                <input
                  type={showPasswordInput ? 'text' : 'password'}
                  required
                  placeholder="비밀번호 입력 (초기값: 1234!)"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordInput(!showPasswordInput)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showPasswordInput ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="flex items-center gap-1.5 text-xs text-rose-500 font-bold bg-rose-50 dark:bg-rose-950/50 p-2.5 rounded-xl border border-rose-200 dark:border-rose-900">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl shadow-lg shadow-blue-600/30 transition-all active:scale-95"
            >
              관리자 대시보드 로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ========================================================================= */
  /* AUTHENTICATED: Full Admin Dashboard                                       */
  /* ========================================================================= */
  return (
    <div className="space-y-8 pb-16">
      {/* Header Bar with Logout & Change Password */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 text-blue-400 flex items-center justify-center text-2xl shadow-inner">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  어드민 관리자 센터
                </h2>
                <span className="bg-emerald-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  인증됨
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                패널 콘텐츠, 퀵링크 바로가기 및 쇼핑 상품 컨테이너를 통합 관리합니다.
              </p>
            </div>
          </div>

          {/* Admin Utility Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowChangePwdModal(true)}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 border border-white/10"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>비밀번호 변경</span>
            </button>
            <button
              onClick={logoutAdmin}
              className="px-3.5 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold transition-all flex items-center gap-1.5 border border-rose-500/30"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>어드민 잠금</span>
            </button>
          </div>
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="p-4 bg-emerald-500 text-white rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg animate-in slide-in-from-top duration-200">
          <CheckCircle className="w-5 h-5" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePwdModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-5 relative">
            <button
              onClick={() => setShowChangePwdModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold text-lg">
              <KeyRound className="w-5 h-5" />
              <span>관리자 비밀번호 변경</span>
            </div>

            <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  현재 비밀번호
                </label>
                <input
                  type="password"
                  required
                  placeholder="현재 비밀번호 입력"
                  value={currPasswordInput}
                  onChange={(e) => setCurrPasswordInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  새 비밀번호
                </label>
                <input
                  type="password"
                  required
                  placeholder="새로 설정할 비밀번호"
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  새 비밀번호 재확인
                </label>
                <input
                  type="password"
                  required
                  placeholder="새 비밀번호 다시 입력"
                  value={confirmPasswordInput}
                  onChange={(e) => setConfirmPasswordInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {changePwdError && (
                <div className="flex items-center gap-1.5 text-xs text-rose-500 font-bold bg-rose-50 dark:bg-rose-950/50 p-2.5 rounded-xl">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{changePwdError}</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowChangePwdModal(false)}
                  className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  비밀번호 변경 저장
                </button>
              </div>
            </form>
          </div>
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
