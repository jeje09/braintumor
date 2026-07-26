import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ImageDropzone } from '../../components/ImageDropzone';
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
  Lock, 
  KeyRound, 
  LogOut, 
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Rocket,
  ShoppingBag as NaverIcon
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
    // 7 Panel Data & CRUD
    products, addProduct, updateProduct, deleteProduct,
    coupangProducts, addCoupangProduct, updateCoupangProduct, deleteCoupangProduct,
    naverProducts, addNaverProduct, updateNaverProduct, deleteNaverProduct,
    healthStories, addHealthStory, updateHealthStory, deleteHealthStory,
    foodCalories, addFoodCalorie, updateFoodCalorie, deleteFoodCalorie,
    healingTravel, addHealingTravel, updateHealingTravel, deleteHealingTravel,
    perfumeStories, addPerfumeStory, updatePerfumeStory, deletePerfumeStory
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

  // Admin Active Panel Tab
  const [activeAdminSubTab, setActiveAdminSubTab] = useState('shopping');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Edit Mode State (holds item ID if editing, else null)
  const [editingId, setEditingId] = useState(null);

  // 1. Quick Links Form State
  const [coupangUrl, setCoupangUrl] = useState(quickLinks.coupang);
  const [inpockUrl, setInpockUrl] = useState(quickLinks.inpock);

  // 2. Shopping Product Form State
  const [prodTitle, setProdTitle] = useState('');
  const [prodCategory, setProdCategory] = useState('아로마/치유');
  const [prodPrice, setProdPrice] = useState('');
  const [prodOrigPrice, setProdOrigPrice] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodPaytap, setProdPaytap] = useState('');
  const [prodKcp, setProdKcp] = useState('');
  const [prodBest, setProdBest] = useState(false);

  // 3. Coupang Shopping Form State
  const [coupangTitle, setCoupangTitle] = useState('');
  const [coupangCategory, setCoupangCategory] = useState('건강기능식품');
  const [coupangPrice, setCoupangPrice] = useState('');
  const [coupangOrigPrice, setCoupangOrigPrice] = useState('');
  const [coupangImage, setCoupangImage] = useState('');
  const [coupangLink, setCoupangLink] = useState('');
  const [coupangDesc, setCoupangDesc] = useState('');
  const [coupangBest, setCoupangBest] = useState(false);

  // 4. Naver Shopping Form State
  const [naverTitle, setNaverTitle] = useState('');
  const [naverCategory, setNaverCategory] = useState('뷰티/힐링');
  const [naverPrice, setNaverPrice] = useState('');
  const [naverOrigPrice, setNaverOrigPrice] = useState('');
  const [naverImage, setNaverImage] = useState('');
  const [naverLink, setNaverLink] = useState('');
  const [naverDesc, setNaverDesc] = useState('');
  const [naverBest, setNaverBest] = useState(false);

  // 5. Health Story Form State
  const [healthTitle, setHealthTitle] = useState('');
  const [healthCategory, setHealthCategory] = useState('자연치유');
  const [healthReadTime, setHealthReadTime] = useState('5분 읽기');
  const [healthImage, setHealthImage] = useState('');
  const [healthSummary, setHealthSummary] = useState('');
  const [healthContent, setHealthContent] = useState('');

  // 6. Food Calorie Form State
  const [foodName, setFoodName] = useState('');
  const [foodCaloriesVal, setFoodCaloriesVal] = useState('');
  const [foodProtein, setFoodProtein] = useState('');
  const [foodCarbs, setFoodCarbs] = useState('');
  const [foodFat, setFoodFat] = useState('');
  const [foodCategory, setFoodCategory] = useState('주식');
  const [foodIcon, setFoodIcon] = useState('🍚');
  const [foodTip, setFoodTip] = useState('');

  // 7. Healing Travel Form State
  const [travelName, setTravelName] = useState('');
  const [travelLocation, setTravelLocation] = useState('');
  const [travelTag, setTravelTag] = useState('');
  const [travelImage, setTravelImage] = useState('');
  const [travelDesc, setTravelDesc] = useState('');
  const [travelSeason, setTravelSeason] = useState('사계절');

  // 8. Perfume Story Form State
  const [perfumeName, setPerfumeName] = useState('');
  const [perfumeNotes, setPerfumeNotes] = useState('');
  const [perfumeMood, setPerfumeMood] = useState('');
  const [perfumeImage, setPerfumeImage] = useState('');
  const [perfumeDesc, setPerfumeDesc] = useState('');

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

  const showMsg = (msg) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  // Edit Loaders
  const startEditProduct = (prod) => {
    setEditingId(prod.id); setProdTitle(prod.title); setProdCategory(prod.category); setProdPrice(prod.price); setProdOrigPrice(prod.originalPrice || ''); setProdImage(prod.image || ''); setProdDesc(prod.description || ''); setProdPaytap(prod.paytapLink || ''); setProdKcp(prod.kcpLink || ''); setProdBest(prod.isBest || false);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const startEditCoupang = (prod) => {
    setEditingId(prod.id); setCoupangTitle(prod.title); setCoupangCategory(prod.category); setCoupangPrice(prod.price); setCoupangOrigPrice(prod.originalPrice || ''); setCoupangImage(prod.image || ''); setCoupangLink(prod.coupangLink || ''); setCoupangDesc(prod.description || ''); setCoupangBest(prod.isBest || false);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const startEditNaver = (prod) => {
    setEditingId(prod.id); setNaverTitle(prod.title); setNaverCategory(prod.category); setNaverPrice(prod.price); setNaverOrigPrice(prod.originalPrice || ''); setNaverImage(prod.image || ''); setNaverLink(prod.naverLink || ''); setNaverDesc(prod.description || ''); setNaverBest(prod.isBest || false);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const startEditHealth = (story) => {
    setEditingId(story.id); setHealthTitle(story.title); setHealthCategory(story.category); setHealthReadTime(story.readTime || '5분 읽기'); setHealthImage(story.image || ''); setHealthSummary(story.summary || ''); setHealthContent(story.content || '');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const startEditFood = (food) => {
    setEditingId(food.id); setFoodName(food.name); setFoodCaloriesVal(food.calories); setFoodProtein(food.protein || ''); setFoodCarbs(food.carbs || ''); setFoodFat(food.fat || ''); setFoodCategory(food.category); setFoodIcon(food.icon || '🍚'); setFoodTip(food.healthTip || '');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const startEditTravel = (spot) => {
    setEditingId(spot.id); setTravelName(spot.name); setTravelLocation(spot.location); setTravelTag(spot.tag || ''); setTravelImage(spot.image || ''); setTravelDesc(spot.description || ''); setTravelSeason(spot.bestSeason || '사계절');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const startEditPerfume = (perfume) => {
    setEditingId(perfume.id); setPerfumeName(perfume.name); setPerfumeNotes(perfume.notes || ''); setPerfumeMood(perfume.mood || ''); setPerfumeImage(perfume.image || ''); setPerfumeDesc(perfume.description || '');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setProdTitle(''); setProdPrice(''); setProdOrigPrice(''); setProdImage(''); setProdDesc(''); setProdPaytap(''); setProdKcp(''); setProdBest(false);
    setCoupangTitle(''); setCoupangPrice(''); setCoupangOrigPrice(''); setCoupangImage(''); setCoupangLink(''); setCoupangDesc(''); setCoupangBest(false);
    setNaverTitle(''); setNaverPrice(''); setNaverOrigPrice(''); setNaverImage(''); setNaverLink(''); setNaverDesc(''); setNaverBest(false);
    setHealthTitle(''); setHealthSummary(''); setHealthContent(''); setHealthImage('');
    setFoodName(''); setFoodCaloriesVal(''); setFoodProtein(''); setFoodCarbs(''); setFoodFat(''); setFoodTip('');
    setTravelName(''); setTravelLocation(''); setTravelTag(''); setTravelDesc(''); setTravelImage('');
    setPerfumeName(''); setPerfumeNotes(''); setPerfumeMood(''); setPerfumeDesc(''); setPerfumeImage('');
  };

  // Submit Handlers
  const handleAddProductSubmit = (e) => {
    e.preventDefault(); if (!prodTitle || !prodPrice) return;
    const payload = { title: prodTitle, category: prodCategory, price: parseInt(prodPrice, 10), originalPrice: prodOrigPrice ? parseInt(prodOrigPrice, 10) : null, image: prodImage || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', description: prodDesc, paytapLink: prodPaytap || 'https://payapp.kr/paytap_demo', kcpLink: prodKcp || 'https://kcp.co.kr/kcp_checkout_demo', isBest: prodBest };
    if (editingId) { updateProduct(editingId, payload); showMsg('웰니스 쇼핑 상품이 수정되었습니다!'); } else { addProduct(payload); showMsg('웰니스 쇼핑 상품이 추가되었습니다!'); }
    cancelEdit();
  };

  const handleAddCoupangSubmit = (e) => {
    e.preventDefault(); if (!coupangTitle || !coupangPrice) return;
    const payload = { title: coupangTitle, category: coupangCategory, price: parseInt(coupangPrice, 10), originalPrice: coupangOrigPrice ? parseInt(coupangOrigPrice, 10) : null, image: coupangImage || 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=800&q=80', coupangLink: coupangLink || 'https://partners.coupang.com', description: coupangDesc, isBest: coupangBest };
    if (editingId) { updateCoupangProduct(editingId, payload); showMsg('쿠팡 파트너스 상품이 수정되었습니다!'); } else { addCoupangProduct(payload); showMsg('쿠팡 파트너스 상품이 추가되었습니다!'); }
    cancelEdit();
  };

  const handleAddNaverSubmit = (e) => {
    e.preventDefault(); if (!naverTitle || !naverPrice) return;
    const payload = { title: naverTitle, category: naverCategory, price: parseInt(naverPrice, 10), originalPrice: naverOrigPrice ? parseInt(naverOrigPrice, 10) : null, image: naverImage || 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80', naverLink: naverLink || 'https://brandconnect.naver.com', description: naverDesc, isBest: naverBest };
    if (editingId) { updateNaverProduct(editingId, payload); showMsg('네이버 브랜드커넥트 상품이 수정되었습니다!'); } else { addNaverProduct(payload); showMsg('네이버 브랜드커넥트 상품이 추가되었습니다!'); }
    cancelEdit();
  };

  const handleAddHealthSubmit = (e) => {
    e.preventDefault(); if (!healthTitle) return;
    const payload = { title: healthTitle, category: healthCategory, readTime: healthReadTime || '5분 읽기', date: new Date().toLocaleDateString('ko-KR'), image: healthImage || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80', summary: healthSummary, content: healthContent };
    if (editingId) { updateHealthStory(editingId, payload); showMsg('건강이야기 아티클이 수정되었습니다!'); } else { addHealthStory(payload); showMsg('건강이야기 아티클이 추가되었습니다!'); }
    cancelEdit();
  };

  const handleAddFoodSubmit = (e) => {
    e.preventDefault(); if (!foodName || !foodCaloriesVal) return;
    const payload = { name: foodName, calories: parseInt(foodCaloriesVal, 10), protein: parseFloat(foodProtein) || 0, carbs: parseFloat(foodCarbs) || 0, fat: parseFloat(foodFat) || 0, category: foodCategory, icon: foodIcon || '🥗', healthTip: foodTip || '균형 잡힌 영양 식품' };
    if (editingId) { updateFoodCalorie(editingId, payload); showMsg('음식 칼로리 정보가 수정되었습니다!'); } else { addFoodCalorie(payload); showMsg('음식 칼로리가 추가되었습니다!'); }
    cancelEdit();
  };

  const handleAddTravelSubmit = (e) => {
    e.preventDefault(); if (!travelName || !travelLocation) return;
    const payload = { name: travelName, location: travelLocation, tag: travelTag || '청정 피톤치드 코스', image: travelImage || 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80', description: travelDesc, bestSeason: travelSeason };
    if (editingId) { updateHealingTravel(editingId, payload); showMsg('힐링 여행지가 수정되었습니다!'); } else { addHealingTravel(payload); showMsg('힐링 여행지가 추가되었습니다!'); }
    cancelEdit();
  };

  const handleAddPerfumeSubmit = (e) => {
    e.preventDefault(); if (!perfumeName) return;
    const payload = { name: perfumeName, notes: perfumeNotes || '시더우드, 라벤더', mood: perfumeMood || '심신 안정이 필요할 때', image: perfumeImage || 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80', description: perfumeDesc };
    if (editingId) { updatePerfumeStory(editingId, payload); showMsg('아로마 향수가 수정되었습니다!'); } else { addPerfumeStory(payload); showMsg('천연 아로마 향수가 추가되었습니다!'); }
    cancelEdit();
  };

  const handleSaveQuickLinks = (e) => {
    e.preventDefault(); updateQuickLinks({ coupang: coupangUrl, inpock: inpockUrl }); showMsg('바로가기 URL이 업데이트되었습니다!');
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
  /* AUTHENTICATED: Full Admin Control Dashboard                               */
  /* ========================================================================= */
  return (
    <div className="space-y-8 pb-16">
      {/* Top Header Bar */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 text-blue-400 flex items-center justify-center text-2xl shadow-inner">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  어드민 7대 패널 통합 제어 센터
                </h2>
                <span className="bg-emerald-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  쿠팡/네이버 제어 지원
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                쿠팡 파트너스 및 네이버 브랜드커넥트 전용 패널을 포함한 7대 쇼핑/콘텐츠 패널의 데이터 및 이미지를 추가·수정·삭제합니다.
              </p>
            </div>
          </div>

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
              <span>잠금/로그아웃</span>
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
            <button onClick={() => setShowChangePwdModal(false)} className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors">✕</button>

            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold text-lg">
              <KeyRound className="w-5 h-5" />
              <span>관리자 비밀번호 변경</span>
            </div>

            <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">현재 비밀번호</label>
                <input type="password" required placeholder="현재 비밀번호 입력" value={currPasswordInput} onChange={(e) => setCurrPasswordInput(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">새 비밀번호</label>
                <input type="password" required placeholder="새로 설정할 비밀번호" value={newPasswordInput} onChange={(e) => setNewPasswordInput(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">새 비밀번호 재확인</label>
                <input type="password" required placeholder="새 비밀번호 다시 입력" value={confirmPasswordInput} onChange={(e) => setConfirmPasswordInput(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              {changePwdError && (
                <div className="flex items-center gap-1.5 text-xs text-rose-500 font-bold bg-rose-50 dark:bg-rose-950/50 p-2.5 rounded-xl">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{changePwdError}</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowChangePwdModal(false)} className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs">취소</button>
                <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md">비밀번호 변경 저장</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Sub Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 dark:border-slate-800 pb-2 scrollbar-none">
        <button onClick={() => { setActiveAdminSubTab('shopping'); cancelEdit(); }} className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all whitespace-nowrap ${activeAdminSubTab === 'shopping' ? 'bg-pink-600 text-white shadow-md' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'}`}>
          <ShoppingBag className="w-4 h-4" /> <span>웰니스쇼핑 ({products.length})</span>
        </button>

        <button onClick={() => { setActiveAdminSubTab('coupang'); cancelEdit(); }} className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all whitespace-nowrap ${activeAdminSubTab === 'coupang' ? 'bg-amber-600 text-white shadow-md' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'}`}>
          <Rocket className="w-4 h-4" /> <span>쿠팡쇼핑 ({coupangProducts.length})</span>
        </button>

        <button onClick={() => { setActiveAdminSubTab('naver'); cancelEdit(); }} className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all whitespace-nowrap ${activeAdminSubTab === 'naver' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'}`}>
          <NaverIcon className="w-4 h-4" /> <span>네이버쇼핑 ({naverProducts.length})</span>
        </button>

        <button onClick={() => { setActiveAdminSubTab('health'); cancelEdit(); }} className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all whitespace-nowrap ${activeAdminSubTab === 'health' ? 'bg-teal-600 text-white shadow-md' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'}`}>
          <HeartPulse className="w-4 h-4" /> <span>건강이야기 ({healthStories.length})</span>
        </button>

        <button onClick={() => { setActiveAdminSubTab('calories'); cancelEdit(); }} className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all whitespace-nowrap ${activeAdminSubTab === 'calories' ? 'bg-amber-700 text-white shadow-md' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'}`}>
          <Utensils className="w-4 h-4" /> <span>음식칼로리 ({foodCalories.length})</span>
        </button>

        <button onClick={() => { setActiveAdminSubTab('travel'); cancelEdit(); }} className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all whitespace-nowrap ${activeAdminSubTab === 'travel' ? 'bg-cyan-600 text-white shadow-md' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'}`}>
          <Compass className="w-4 h-4" /> <span>힐링여행지 ({healingTravel.length})</span>
        </button>

        <button onClick={() => { setActiveAdminSubTab('perfume'); cancelEdit(); }} className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all whitespace-nowrap ${activeAdminSubTab === 'perfume' ? 'bg-purple-600 text-white shadow-md' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'}`}>
          <Sparkles className="w-4 h-4" /> <span>향수이야기 ({perfumeStories.length})</span>
        </button>

        <button onClick={() => { setActiveAdminSubTab('quicklinks'); cancelEdit(); }} className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all whitespace-nowrap ${activeAdminSubTab === 'quicklinks' ? 'bg-blue-600 text-white shadow-md' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'}`}>
          <ExternalLink className="w-4 h-4" /> <span>쿠팡/인포크 퀵링크</span>
        </button>
      </div>

      {/* =================================================================== */}
      {/* 1. 쿠팡쇼핑 패널 관리자 (NEW)                                       */}
      {/* =================================================================== */}
      {activeAdminSubTab === 'coupang' && (
        <div className="space-y-8">
          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border-2 border-amber-200 dark:border-amber-900/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold text-lg">
                {editingId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                <span>{editingId ? '쿠팡 파트너스 상품 수정' : '신규 쿠팡 파트너스 상품 등록'}</span>
              </div>
              {editingId && (
                <button type="button" onClick={cancelEdit} className="text-xs font-bold text-slate-500 underline">수정 취소</button>
              )}
            </div>

            <form onSubmit={handleAddCoupangSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">상품명</label>
                <input type="text" required placeholder="예: 유기농 새싹보리 파우더" value={coupangTitle} onChange={(e) => setCoupangTitle(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">카테고리</label>
                <select value={coupangCategory} onChange={(e) => setCoupangCategory(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="건강기능식품">건강기능식품</option>
                  <option value="아로마테라피">아로마테라피</option>
                  <option value="웰니스푸드">웰니스푸드</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">판매 가격 (원)</label>
                <input type="number" required placeholder="19800" value={coupangPrice} onChange={(e) => setCoupangPrice(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">원가 (할인 전)</label>
                <input type="number" placeholder="25000" value={coupangOrigPrice} onChange={(e) => setCoupangOrigPrice(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>

              <div className="sm:col-span-2">
                <ImageDropzone value={coupangImage} onChange={setCoupangImage} label="쿠팡 상품 이미지 (URL 입력 또는 컴퓨터 드래그 앤 드롭)" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">쿠팡 파트너스 제휴 바로가기 링크 (coupangLink)</label>
                <input type="url" required placeholder="https://link.coupang.com/a/..." value={coupangLink} onChange={(e) => setCoupangLink(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">상세 설명</label>
                <textarea rows="2" placeholder="쿠팡 추천 이유와 상품 효능을 입력하세요." value={coupangDesc} onChange={(e) => setCoupangDesc(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>

              <div className="sm:col-span-2 flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                  <input type="checkbox" checked={coupangBest} onChange={(e) => setCoupangBest(e.target.checked)} className="w-4 h-4 rounded text-amber-600" />
                  <span>로켓추천 배지 표시</span>
                </label>
                <button type="submit" className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-2xl shadow-md transition-all flex items-center gap-1.5 text-xs">
                  <Save className="w-4 h-4" /> <span>{editingId ? '쿠팡 상품 수정 저장' : '쿠팡 상품 등록하기'}</span>
                </button>
              </div>
            </form>
          </div>

          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4">
            <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-100">등록된 쿠팡 파트너스 상품 목록 ({coupangProducts.length}개)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coupangProducts.map(prod => (
                <div key={prod.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={prod.image} alt={prod.title} className="w-14 h-14 rounded-xl object-cover" />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded">{prod.category}</span>
                      <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate mt-0.5">{prod.title}</h4>
                      <p className="text-xs font-black text-amber-600 dark:text-amber-400 mt-0.5">{prod.price.toLocaleString()}원</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => startEditCoupang(prod)} className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors" title="수정"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => deleteCoupangProduct(prod.id)} className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors" title="삭제"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. 네이버쇼핑 패널 관리자 (NEW)                                       */}
      {/* =================================================================== */}
      {activeAdminSubTab === 'naver' && (
        <div className="space-y-8">
          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border-2 border-emerald-200 dark:border-emerald-900/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold text-lg">
                {editingId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                <span>{editingId ? '네이버 브랜드 커넥트 상품 수정' : '신규 네이버 브랜드 커넥트 상품 등록'}</span>
              </div>
              {editingId && (
                <button type="button" onClick={cancelEdit} className="text-xs font-bold text-slate-500 underline">수정 취소</button>
              )}
            </div>

            <form onSubmit={handleAddNaverSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">상품명</label>
                <input type="text" required placeholder="예: 유기농 편백 림프 마사지 오일" value={naverTitle} onChange={(e) => setNaverTitle(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">카테고리</label>
                <select value={naverCategory} onChange={(e) => setNaverCategory(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="뷰티/힐링">뷰티/힐링</option>
                  <option value="건강식품">건강식품</option>
                  <option value="건강차">건강차</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">판매 가격 (원)</label>
                <input type="number" required placeholder="34000" value={naverPrice} onChange={(e) => setNaverPrice(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">원가 (할인 전)</label>
                <input type="number" placeholder="42000" value={naverOrigPrice} onChange={(e) => setNaverOrigPrice(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>

              <div className="sm:col-span-2">
                <ImageDropzone value={naverImage} onChange={setNaverImage} label="네이버 상품 이미지 (URL 입력 또는 컴퓨터 드래그 앤 드롭)" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">네이버 브랜드 커넥트 제휴 바로가기 링크 (naverLink)</label>
                <input type="url" required placeholder="https://brandconnect.naver.com/..." value={naverLink} onChange={(e) => setNaverLink(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">상세 설명</label>
                <textarea rows="2" placeholder="네이버 스토어 추천 이유와 설명을 입력하세요." value={naverDesc} onChange={(e) => setNaverDesc(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>

              <div className="sm:col-span-2 flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                  <input type="checkbox" checked={naverBest} onChange={(e) => setNaverBest(e.target.checked)} className="w-4 h-4 rounded text-emerald-600" />
                  <span>네이버추천 배지 표시</span>
                </label>
                <button type="submit" className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-md transition-all flex items-center gap-1.5 text-xs">
                  <Save className="w-4 h-4" /> <span>{editingId ? '네이버 상품 수정 저장' : '네이버 상품 등록하기'}</span>
                </button>
              </div>
            </form>
          </div>

          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4">
            <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-100">등록된 네이버 브랜드 커넥트 상품 목록 ({naverProducts.length}개)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {naverProducts.map(prod => (
                <div key={prod.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={prod.image} alt={prod.title} className="w-14 h-14 rounded-xl object-cover" />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">{prod.category}</span>
                      <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate mt-0.5">{prod.title}</h4>
                      <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 mt-0.5">{prod.price.toLocaleString()}원</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => startEditNaver(prod)} className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors" title="수정"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => deleteNaverProduct(prod.id)} className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors" title="삭제"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. 웰니스 쇼핑몰 패널 관리자                                        */}
      {/* =================================================================== */}
      {activeAdminSubTab === 'shopping' && (
        <div className="space-y-8">
          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border-2 border-pink-200 dark:border-pink-900/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400 font-extrabold text-lg">
                {editingId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                <span>{editingId ? '상품 정보 수정하기' : '신규 웰니스 쇼핑몰 상품 올리기'}</span>
              </div>
              {editingId && (
                <button type="button" onClick={cancelEdit} className="text-xs font-bold text-slate-500 underline">수정 취소</button>
              )}
            </div>

            <form onSubmit={handleAddProductSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">상품명</label>
                <input type="text" required placeholder="예: 유기농 편백 오일" value={prodTitle} onChange={(e) => setProdTitle(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">카테고리</label>
                <select value={prodCategory} onChange={(e) => setProdCategory(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500">
                  <option value="아로마/치유">아로마/치유</option>
                  <option value="건강식품">건강식품</option>
                  <option value="건강차">건강차</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">판매 가격 (원)</label>
                <input type="number" required placeholder="38000" value={prodPrice} onChange={(e) => setProdPrice(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">원가 (할인 전)</label>
                <input type="number" placeholder="45000" value={prodOrigPrice} onChange={(e) => setProdOrigPrice(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>

              <div className="sm:col-span-2">
                <ImageDropzone value={prodImage} onChange={setProdImage} label="상품 이미지 (URL 입력 또는 컴퓨터 드래그 앤 드롭)" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">상세 설명</label>
                <textarea rows="2" placeholder="상품 효능 및 설명을 입력하세요." value={prodDesc} onChange={(e) => setProdDesc(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Paytap (페이앱) 결제 URL</label>
                <input type="text" placeholder="https://payapp.kr/..." value={prodPaytap} onChange={(e) => setProdPaytap(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">NHN KCP 결제 URL</label>
                <input type="text" placeholder="https://kcp.co.kr/..." value={prodKcp} onChange={(e) => setProdKcp(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>

              <div className="sm:col-span-2 flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                  <input type="checkbox" checked={prodBest} onChange={(e) => setProdBest(e.target.checked)} className="w-4 h-4 rounded text-pink-600" />
                  <span>베스트 추천 배지</span>
                </label>
                <button type="submit" className="px-6 py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-extrabold rounded-2xl shadow-md transition-all flex items-center gap-1.5 text-xs">
                  <Save className="w-4 h-4" /> <span>{editingId ? '상품 수정 저장' : '상품 신규 등록하기'}</span>
                </button>
              </div>
            </form>
          </div>

          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4">
            <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-100">등록된 웰니스 쇼핑 상품 목록 ({products.length}개)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map(prod => (
                <div key={prod.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={prod.image} alt={prod.title} className="w-14 h-14 rounded-xl object-cover" />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-950 px-2 py-0.5 rounded">{prod.category}</span>
                      <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate mt-0.5">{prod.title}</h4>
                      <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 mt-0.5">{prod.price.toLocaleString()}원</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => startEditProduct(prod)} className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors" title="수정"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => deleteProduct(prod.id)} className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors" title="삭제"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 4. 건강이야기 패널 관리자                                           */}
      {/* =================================================================== */}
      {activeAdminSubTab === 'health' && (
        <div className="space-y-8">
          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border-2 border-teal-200 dark:border-teal-900/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-extrabold text-lg">
                {editingId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                <span>{editingId ? '건강이야기 아티클 수정' : '신규 건강이야기 아티클 올리기'}</span>
              </div>
              {editingId && <button type="button" onClick={cancelEdit} className="text-xs font-bold text-slate-500 underline">수정 취소</button>}
            </div>

            <form onSubmit={handleAddHealthSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">아티클 제목</label>
                <input type="text" required placeholder="예: 레몬수의 신체 디톡스 효과" value={healthTitle} onChange={(e) => setHealthTitle(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">카테고리</label>
                <select value={healthCategory} onChange={(e) => setHealthCategory(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option value="자연치유">자연치유</option>
                  <option value="건강습관">건강습관</option>
                  <option value="수면건강">수면건강</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">소요 시간</label>
                <input type="text" placeholder="5분 읽기" value={healthReadTime} onChange={(e) => setHealthReadTime(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>

              <div className="sm:col-span-2">
                <ImageDropzone value={healthImage} onChange={setHealthImage} label="아티클 이미지 (URL 입력 또는 컴퓨터 드래그 앤 드롭)" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">요약 설명</label>
                <textarea rows="2" placeholder="핵심 요약을 입력하세요." value={healthSummary} onChange={(e) => setHealthSummary(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">본문 내용</label>
                <textarea rows="4" placeholder="본문을 입력하세요." value={healthContent} onChange={(e) => setHealthContent(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>

              <div className="sm:col-span-2 flex justify-end">
                <button type="submit" className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-2xl shadow-md transition-all flex items-center gap-1.5 text-xs">
                  <Save className="w-4 h-4" /> <span>{editingId ? '아티클 수정 저장' : '아티클 등록하기'}</span>
                </button>
              </div>
            </form>
          </div>

          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4">
            <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-100">등록된 건강이야기 목록 ({healthStories.length}개)</h3>
            <div className="space-y-3">
              {healthStories.map(story => (
                <div key={story.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={story.image} alt={story.title} className="w-14 h-14 rounded-xl object-cover" />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-950 px-2 py-0.5 rounded">{story.category}</span>
                      <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate mt-0.5">{story.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{story.summary}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => startEditHealth(story)} className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors" title="수정"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => deleteHealthStory(story.id)} className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors" title="삭제"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 5. 음식칼로리 패널 관리자                                           */}
      {/* =================================================================== */}
      {activeAdminSubTab === 'calories' && (
        <div className="space-y-8">
          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border-2 border-amber-200 dark:border-amber-900/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold text-lg">
                {editingId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                <span>{editingId ? '음식 칼로리 수정' : '신규 음식 칼로리 올리기'}</span>
              </div>
              {editingId && <button type="button" onClick={cancelEdit} className="text-xs font-bold text-slate-500 underline">수정 취소</button>}
            </div>

            <form onSubmit={handleAddFoodSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">음식 이름</label>
                <input type="text" required placeholder="현미밥 (1공기 210g)" value={foodName} onChange={(e) => setFoodName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">열량 (kcal)</label>
                <input type="number" required placeholder="305" value={foodCaloriesVal} onChange={(e) => setFoodCaloriesVal(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">카테고리</label>
                <select value={foodCategory} onChange={(e) => setFoodCategory(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="주식">주식</option> <option value="단백질">단백질</option> <option value="과일">과일</option> <option value="유제품">유제품</option> <option value="지방/과일">지방/과일</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">단백질 (g)</label>
                <input type="number" step="0.1" placeholder="6.2" value={foodProtein} onChange={(e) => setFoodProtein(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">탄수화물 (g)</label>
                <input type="number" step="0.1" placeholder="65.0" value={foodCarbs} onChange={(e) => setFoodCarbs(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">지방 (g)</label>
                <input type="number" step="0.1" placeholder="2.1" value={foodFat} onChange={(e) => setFoodFat(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">이모지 아이콘</label>
                <input type="text" placeholder="🍚" value={foodIcon} onChange={(e) => setFoodIcon(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">건강 식이 팁</label>
                <input type="text" placeholder="혈당 조절에 좋은 식이섬유 풍부" value={foodTip} onChange={(e) => setFoodTip(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>

              <div className="sm:col-span-3 flex justify-end pt-2">
                <button type="submit" className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-2xl shadow-md transition-all flex items-center gap-1.5 text-xs">
                  <Save className="w-4 h-4" /> <span>{editingId ? '음식 수정 저장' : '음식 등록하기'}</span>
                </button>
              </div>
            </form>
          </div>

          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4">
            <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-100">등록된 음식 칼로리 목록 ({foodCalories.length}개)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {foodCalories.map(food => (
                <div key={food.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-2xl">{food.icon}</span>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 truncate">{food.name}</h4>
                      <p className="text-[11px] font-black text-amber-600 dark:text-amber-400">{food.calories} kcal</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => startEditFood(food)} className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors" title="수정"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => deleteFoodCalorie(food.id)} className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors" title="삭제"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 6. 힐링여행지 패널 관리자                                           */}
      {/* =================================================================== */}
      {activeAdminSubTab === 'travel' && (
        <div className="space-y-8">
          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border-2 border-cyan-200 dark:border-cyan-900/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-extrabold text-lg">
                {editingId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                <span>{editingId ? '힐링 여행지 수정' : '신규 힐링 여행지 올리기'}</span>
              </div>
              {editingId && <button type="button" onClick={cancelEdit} className="text-xs font-bold text-slate-500 underline">수정 취소</button>}
            </div>

            <form onSubmit={handleAddTravelSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">여행지 명칭</label>
                <input type="text" required placeholder="한라산 편백나무 숲길" value={travelName} onChange={(e) => setTravelName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">위치 (지역)</label>
                <input type="text" required placeholder="제주 서귀포시" value={travelLocation} onChange={(e) => setTravelLocation(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">힐링 태그</label>
                <input type="text" placeholder="피톤치드 숲속 산책" value={travelTag} onChange={(e) => setTravelTag(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">추천 방문 계절</label>
                <input type="text" placeholder="봄, 가을 / 사계절" value={travelSeason} onChange={(e) => setTravelSeason(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>

              <div className="sm:col-span-2">
                <ImageDropzone value={travelImage} onChange={setTravelImage} label="여행지 대표 사진 (URL 입력 또는 컴퓨터 드래그 앤 드롭)" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">상세 설명</label>
                <textarea rows="3" placeholder="치유 효과와 코스를 설명하세요." value={travelDesc} onChange={(e) => setTravelDesc(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>

              <div className="sm:col-span-2 flex justify-end">
                <button type="submit" className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold rounded-2xl shadow-md transition-all flex items-center gap-1.5 text-xs">
                  <Save className="w-4 h-4" /> <span>{editingId ? '여행지 수정 저장' : '여행지 등록하기'}</span>
                </button>
              </div>
            </form>
          </div>

          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4">
            <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-100">등록된 힐링여행지 목록 ({healingTravel.length}개)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {healingTravel.map(spot => (
                <div key={spot.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={spot.image} alt={spot.name} className="w-14 h-14 rounded-xl object-cover" />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950 px-2 py-0.5 rounded">{spot.location}</span>
                      <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate mt-0.5">{spot.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{spot.tag}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => startEditTravel(spot)} className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors" title="수정"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => deleteHealingTravel(spot.id)} className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors" title="삭제"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 7. 향수이야기 패널 관리자                                           */}
      {/* =================================================================== */}
      {activeAdminSubTab === 'perfume' && (
        <div className="space-y-8">
          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border-2 border-purple-200 dark:border-purple-900/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-extrabold text-lg">
                {editingId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                <span>{editingId ? '아로마 향수 수정' : '신규 천연 아로마 향수 올리기'}</span>
              </div>
              {editingId && <button type="button" onClick={cancelEdit} className="text-xs font-bold text-slate-500 underline">수정 취소</button>}
            </div>

            <form onSubmit={handleAddPerfumeSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">향수/아로마 명칭</label>
                <input type="text" required placeholder="포레스트 디바인 아로마" value={perfumeName} onChange={(e) => setPerfumeName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">대표 향 노트</label>
                <input type="text" placeholder="시더우드, 라벤더" value={perfumeNotes} onChange={(e) => setPerfumeNotes(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">추천 힐링 무드</label>
                <input type="text" placeholder="깊은 숲속 명상 & 신경 안정" value={perfumeMood} onChange={(e) => setPerfumeMood(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>

              <div className="sm:col-span-2">
                <ImageDropzone value={perfumeImage} onChange={setPerfumeImage} label="향수 사진 (URL 입력 또는 컴퓨터 드래그 앤 드롭)" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">상세 설명</label>
                <textarea rows="3" placeholder="오일 구성과 테라피 효과를 설명하세요." value={perfumeDesc} onChange={(e) => setPerfumeDesc(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>

              <div className="sm:col-span-2 flex justify-end">
                <button type="submit" className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-2xl shadow-md transition-all flex items-center gap-1.5 text-xs">
                  <Save className="w-4 h-4" /> <span>{editingId ? '향수 수정 저장' : '향수 등록하기'}</span>
                </button>
              </div>
            </form>
          </div>

          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4">
            <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-100">등록된 향수이야기 목록 ({perfumeStories.length}개)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {perfumeStories.map(perfume => (
                <div key={perfume.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={perfume.image} alt={perfume.name} className="w-14 h-14 rounded-xl object-cover" />
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate">{perfume.name}</h4>
                      <p className="text-xs text-purple-600 dark:text-purple-400 font-medium truncate mt-0.5">{perfume.notes}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => startEditPerfume(perfume)} className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors" title="수정"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => deletePerfumeStory(perfume.id)} className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors" title="삭제"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 8. 쿠팡/인포크 퀵링크 관리자                                       */}
      {/* =================================================================== */}
      {activeAdminSubTab === 'quicklinks' && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-extrabold text-lg">
            <ExternalLink className="w-5 h-5" />
            <span>쿠팡 파트너스 & 인포크링크 URL 바로가기 관리자</span>
          </div>

          <form onSubmit={handleSaveQuickLinks} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                쿠팡 파트너스 바로가기 URL
              </label>
              <input type="url" required value={coupangUrl} onChange={(e) => setCoupangUrl(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                인포크링크 (Inpock Link) 바로가기 URL
              </label>
              <input type="url" required value={inpockUrl} onChange={(e) => setInpockUrl(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <button type="submit" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 text-xs">
              <Save className="w-4 h-4" /> <span>바로가기 URL 저장하기</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
