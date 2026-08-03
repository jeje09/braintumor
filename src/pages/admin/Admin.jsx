import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, LogOut, Plus, Trash2, ShieldCheck, Key } from 'lucide-react';

export const Admin = () => {
  const { 
    isAdminAuthenticated, loginAdmin, logoutAdmin,
    products, addProduct, deleteProduct,
    stories, deleteStory 
  } = useApp();

  const [inputPw, setInputPw] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [newProd, setNewProd] = useState({
    category: '항구역 케어', iframeCode: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginAdmin(inputPw)) {
      setErrorMsg('');
      setInputPw('');
    } else {
      setErrorMsg('비밀번호가 일치하지 않습니다. (기본: 1234!)');
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProd.iframeCode) return;
    addProduct({ ...newProd });
    setNewProd({ category: '항구역 케어', iframeCode: '' });
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-16">
        <div className="glass-card p-8 rounded-3xl space-y-6 border border-slate-200 dark:border-slate-800 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center mx-auto text-xl shadow-lg shadow-sky-600/30">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">관리자 로그인</h2>
            <p className="text-xs text-slate-500">사이트 데이터 관리를 위한 비밀번호를 입력하세요.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">비밀번호</label>
              <input
                type="password"
                required
                value={inputPw}
                onChange={(e) => setInputPw(e.target.value)}
                placeholder="비밀번호 입력 (기본: 1234!)"
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
              />
              {errorMsg && <p className="text-xs text-slate-500 mt-1">{errorMsg}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs shadow-md transition-all"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            관리자 인증됨
          </span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            대시보드 & 데이터 관리
          </h1>
        </div>

        <button
          onClick={logoutAdmin}
          className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-300 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>로그아웃</span>
        </button>
      </div>

      {/* Add Product Section */}
      <section className="glass-card p-6 rounded-3xl space-y-4 border border-sky-100 dark:border-slate-800">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <Plus className="w-4 h-4 text-sky-600" />
          <span>신규 상품 추가</span>
        </h3>

        <form onSubmit={handleAddProduct} className="grid grid-cols-1 gap-4 text-xs">
          <div>
            <label className="font-bold block mb-1 text-slate-600 dark:text-slate-400">카테고리</label>
            <select
              value={newProd.category}
              onChange={(e) => setNewProd({...newProd, category: e.target.value})}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-900 dark:text-white"
            >
              <option value="항구역 케어">항구역 케어</option>
              <option value="케어 용품">케어 용품</option>
              <option value="영양 보충">영양 보충</option>
              <option value="도서·마음">도서·마음</option>
            </select>
          </div>

          <div>
            <label className="font-bold block mb-1 text-slate-600 dark:text-slate-400">쇼핑 아이템 Iframe 코드</label>
            <textarea
              rows={4}
              required
              value={newProd.iframeCode}
              onChange={(e) => setNewProd({...newProd, iframeCode: e.target.value})}
              placeholder='예: <iframe src="https://coupa.ng/..." width="120" height="240" ...></iframe>'
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs shadow-md"
            >
              상품 등록하기
            </button>
          </div>
        </form>
      </section>

      {/* Product list management */}
      <section className="glass-card p-6 rounded-3xl space-y-4 border border-slate-200 dark:border-slate-800">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white">등록된 상품 목록 ({products.length}개)</h3>
        <div className="space-y-2">
          {products.map((prod) => (
            <div key={prod.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 dark:text-white">[{prod.category}]</span>
                <span className="text-slate-500 font-mono text-[10px] truncate max-w-[200px]">{prod.iframeCode || '빈 상품'}</span>
              </div>
              <button
                onClick={() => deleteProduct(prod.id)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors"
                title="삭제"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Story list management */}
      <section className="glass-card p-6 rounded-3xl space-y-4 border border-slate-200 dark:border-slate-800">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white">등록된 희망 이야기 목록 ({stories.length}개)</h3>
        <div className="space-y-2">
          {stories.map((st) => (
            <div key={st.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 dark:text-white line-clamp-1">{st.title}</span>
                <span className="text-slate-400">({st.author})</span>
              </div>
              <button
                onClick={() => deleteStory(st.id)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors"
                title="삭제"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
