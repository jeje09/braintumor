import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, ExternalLink, ShieldCheck, Tag, Plus, Trash2 } from 'lucide-react';
import newsData from '../../data/news.json';

export const Research = () => {
  const { research, addResearch, deleteResearch } = useApp();
  const { isSuperAdmin } = useAuth();
  
  const [newRes, setNewRes] = useState({
    title: '', source: '', category: '임상시험', badge: '신규', badgeColor: 'bg-emerald-500', summary: '', link: ''
  });

  const handleAddResearch = (e) => {
    e.preventDefault();
    if (!newRes.title || !newRes.source) return;
    addResearch({ ...newRes });
    setNewRes({ title: '', source: '', category: '임상시험', badge: '신규', badgeColor: 'bg-emerald-500', summary: '', link: '' });
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header */}
      <section className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-sm font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>최신 연구 & 임상시험</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          뇌종양 치료의 최전선: 최신 연구 & 임상 소식
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
          BNCT(붕소중성자포획치료), B세포 활성화 면역치료, 줄기세포 유전자치료 등 국내 대학병원 및 해외 학회에서 보고되는 가장 최신의 임상 소식을 모았습니다.
        </p>
      </section>

      {/* Latest Automated News Section */}
      <section className="mt-12 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-900 pb-4">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">오늘의 의료 신약 및 암 치료 뉴스</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsData.map((news) => (
            <a 
              key={news.id} 
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-full h-48 bg-slate-100 dark:bg-slate-800 relative overflow-hidden border-b border-slate-100 dark:border-slate-800">
                {news.imageUrl ? (
                  <img src={news.imageUrl} alt="news thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold bg-slate-50 dark:bg-slate-800/50">LIVING WITH NEWS</div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-[18px] font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 leading-snug mb-3">{news.title}</h3>
                <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 mb-6 flex-1 font-medium">
                  {news.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/50">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">{news.source || 'LIVING WITH'}</span>
                    <span className="text-sm text-slate-400 font-medium">{news.pubDate}</span>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-black text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                    원문보기 <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Manual Research List Grid */}
      <section className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">플랫폼 추천 주요 임상/논문 데이터</h2>
        
        {/* Admin Panel: Add Research */}
        {isSuperAdmin && (
          <div className="mb-8 glass-card p-6 rounded-3xl space-y-4 border border-emerald-200 dark:border-emerald-900 shadow-sm bg-white/50 dark:bg-slate-900/50">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>수퍼관리자: 기사/연구 데이터 등록</span>
            </h3>
            <form onSubmit={handleAddResearch} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="font-bold block mb-1 text-slate-600 dark:text-slate-400">기사/연구 제목</label>
                <input required value={newRes.title} onChange={e => setNewRes({...newRes, title: e.target.value})} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="font-bold block mb-1 text-slate-600 dark:text-slate-400">출처 (병원/학회)</label>
                <input required value={newRes.source} onChange={e => setNewRes({...newRes, source: e.target.value})} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-900 dark:text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="font-bold block mb-1 text-slate-600 dark:text-slate-400">요약 설명</label>
                <textarea required rows={2} value={newRes.summary} onChange={e => setNewRes({...newRes, summary: e.target.value})} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-900 dark:text-white" />
              </div>
              <div className="md:col-span-2 flex items-end gap-4">
                <div className="flex-1">
                  <label className="font-bold block mb-1 text-slate-600 dark:text-slate-400">원문 링크</label>
                  <input value={newRes.link} onChange={e => setNewRes({...newRes, link: e.target.value})} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-900 dark:text-white" />
                </div>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md h-[42px]">
                  기사 등록
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {research.map((item) => (
          <article
            key={item.id}
            className="glass-card p-6 rounded-3xl space-y-4 border border-amber-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative group"
          >
            {isSuperAdmin && (
              <button
                onClick={() => { if (window.confirm('정말 이 기사를 삭제하시겠습니까?')) deleteResearch(item.id); }}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                title="삭제"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-extrabold px-3 py-1 rounded-full text-white ${item.badgeColor}`}>
                  {item.badge}
                </span>
                <span className="text-sm text-slate-400 font-medium">{item.date}</span>
              </div>

              <h2 className="text-lg font-black text-slate-900 dark:text-white leading-snug">
                {item.title}
              </h2>

              <div className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
                <span>{item.source}</span>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-400">
                분류: {item.category}
              </span>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-bold text-sky-600 dark:text-sky-400 hover:underline"
              >
                <span>관련 기관/원문 확인</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>
      </section>

    </div>
  );
};
