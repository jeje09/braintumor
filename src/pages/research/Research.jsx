import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ExternalLink, ShieldCheck, Tag } from 'lucide-react';
import newsData from '../../data/news.json';

export const Research = () => {
  const { research } = useApp();

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header */}
      <section className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>최신 연구 & 임상시험</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          뇌종양 치료의 최전선: 최신 연구 & 임상 소식
        </h1>
        <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
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
                <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 mb-6 flex-1 font-medium">
                  {news.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/50">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">{news.source || 'LIVING WITH'}</span>
                    <span className="text-[11px] text-slate-400 font-medium">{news.pubDate}</span>
                  </div>
                  <span className="flex items-center gap-1 text-[12px] font-black text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {research.map((item) => (
          <article
            key={item.id}
            className="glass-card p-6 rounded-3xl space-y-4 border border-amber-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-extrabold px-3 py-1 rounded-full text-white ${item.badgeColor}`}>
                  {item.badge}
                </span>
                <span className="text-xs text-slate-400 font-medium">{item.date}</span>
              </div>

              <h2 className="text-lg font-black text-slate-900 dark:text-white leading-snug">
                {item.title}
              </h2>

              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
                <span>{item.source}</span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400">
                분류: {item.category}
              </span>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
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
