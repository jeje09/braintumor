import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ExternalLink, ShieldCheck, Tag } from 'lucide-react';

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

      {/* Grid */}
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
                <ShieldCheck className="w-3.5 h-3.5 text-violet-500" />
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
                className="inline-flex items-center gap-1 text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline"
              >
                <span>관련 기관/원문 확인</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
