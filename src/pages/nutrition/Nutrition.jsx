import React from 'react';
import { useApp } from '../../context/AppContext';
import { Activity, ShieldAlert, CheckCircle, Info } from 'lucide-react';

export const Nutrition = () => {
  const { nutrition } = useApp();

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header */}
      <section className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold">
          <Activity className="w-3.5 h-3.5" />
          <span>항암 영양 가이드</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          항암 영양 식단 & 식품 백과
        </h1>
        <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
          항암 치료 중에는 특정 '기적의 식품'보다 균형 잡힌 영양 섭취와 구역감 관리가 가장 중요합니다. 뇌 보호와 항염증에 도움되는 식품 가이드입니다.
        </p>
      </section>

      {/* Critical Rules Banner */}
      <section className="p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-3">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-extrabold text-sm">
          <ShieldAlert className="w-5 h-5 text-amber-600" />
          <span>항암 치료 중 필수 섭취 원칙 3가지</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-amber-900 dark:text-amber-200">
          <div className="p-3 bg-white/70 dark:bg-slate-900/70 rounded-xl border border-amber-100 dark:border-amber-900/30">
            <strong className="block text-amber-700 dark:text-amber-400 mb-1">1. 날음식 완전 금지</strong>
            항암 중 면역세포 감소로 날생선, 날고기, 날달걀은 감염 위험. 반드시 완전 익혀서 섭취.
          </div>
          <div className="p-3 bg-white/70 dark:bg-slate-900/70 rounded-xl border border-amber-100 dark:border-amber-900/30">
            <strong className="block text-amber-700 dark:text-amber-400 mb-1">2. 엑기스·농축액 주의</strong>
            홍삼, 즙, 건강보조제 농축액은 간 수치를 높여 항암제 투여가 중단될 수 있음. 의사 상담 필수.
          </div>
          <div className="p-3 bg-white/70 dark:bg-slate-900/70 rounded-xl border border-amber-100 dark:border-amber-900/30">
            <strong className="block text-amber-700 dark:text-amber-400 mb-1">3. 소량씩 자주 섭취</strong>
            구역감이 심할 때는 무리하게 대량 식사보다 하루 6~8회 소량 섭취가 유리.
          </div>
        </div>
      </section>

      {/* Food Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {nutrition.map((item) => (
          <div
            key={item.id}
            className="glass-card p-6 rounded-3xl space-y-4 border border-emerald-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-4xl p-2 bg-emerald-50 dark:bg-emerald-950 rounded-2xl">{item.icon}</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
                  의학 증거: {item.evidence}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {item.category}
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                  {item.name}
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <strong className="text-emerald-600 dark:text-emerald-400 block mb-0.5">효능 & 작용</strong>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{item.benefit}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <strong className="text-indigo-600 dark:text-indigo-400 block mb-0.5">섭취 팁</strong>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{item.howToEat}</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-rose-600 dark:text-rose-400 font-medium">
              ⚠️ 주의사항: {item.caution}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
