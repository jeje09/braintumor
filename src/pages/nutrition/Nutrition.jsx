import React from 'react';
import { useApp } from '../../context/AppContext';
import { Activity, ShieldAlert, CheckCircle, Info } from 'lucide-react';

export const Nutrition = () => {
  const { nutrition } = useApp();

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-base font-bold">
          <Activity className="w-4 h-4" />
          <span>면역력 식단 가이드</span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          면역력 영양 식단 & 식품 백과
        </h1>
        <p className="text-base text-slate-500 max-w-2xl leading-relaxed font-medium whitespace-pre-wrap">
          치료 중에는 특정 음식 하나가 병을 낫게 하는 것은 아닙니다. 가장 중요한 것은 균형 잡힌 영양을 충분히 섭취하여 체력을 유지하고, 면역 기능을 돕고, 치료를 잘 견딜 수 있는 몸 상태를 만드는 것입니다.

이 식품 백과는 치료 중 자주 권장되는 식품들의 영양학적 특징과 섭취 방법을 소개합니다. 각 식품이 제공하는 단백질, 비타민, 미네랄, 식이섬유, 건강한 지방 등을 이해하고 자신의 몸 상태에 맞는 식단을 계획하는 데 도움이 되도록 구성했습니다.

식사는 몸을 회복시키는 가장 기본적인 치료입니다. 다양한 식품을 골고루 섭취하고, 충분한 수분과 단백질을 함께 보충하는 것이 건강한 회복의 첫걸음입니다.
        </p>
      </section>

      {/* Critical Rules Banner */}
      <section className="p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-4">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-extrabold text-base">
          <ShieldAlert className="w-6 h-6 text-amber-600" />
          <span>면역력 저하 시 필수 섭취 원칙 3가지</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-base text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
          <div className="p-4 bg-white/70 dark:bg-slate-900/70 rounded-2xl border border-amber-100 dark:border-amber-900/30">
            <strong className="block text-amber-700 dark:text-amber-400 mb-2 text-base">1. 날음식 완전 금지</strong>
            면역세포 감소로 날생선, 날고기, 날달걀은 감염 위험. 반드시 완전 익혀서 섭취.
          </div>
          <div className="p-4 bg-white/70 dark:bg-slate-900/70 rounded-2xl border border-amber-100 dark:border-amber-900/30">
            <strong className="block text-amber-700 dark:text-amber-400 mb-2 text-base">2. 엑기스·농축액 주의</strong>
            홍삼, 즙, 건강보조제 농축액은 간 수치를 높여 건강에 무리가 갈 수 있음. 전문의 상담 필수.
          </div>
          <div className="p-4 bg-white/70 dark:bg-slate-900/70 rounded-2xl border border-amber-100 dark:border-amber-900/30">
            <strong className="block text-amber-700 dark:text-amber-400 mb-2 text-base">3. 소량씩 자주 섭취</strong>
            구역감이 심할 때는 무리하게 대량 식사보다 하루 6~8회 소량 섭취가 유리.
          </div>
        </div>
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
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">건강한 식재료, 로켓배송으로 빠르고 신선하게!</h3>
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

      {/* Food Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {nutrition.map((item) => (
          <div
            key={item.id}
            className="glass-card p-6 rounded-3xl space-y-4 border border-emerald-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-5xl p-3 bg-emerald-50 dark:bg-emerald-950 rounded-2xl">{item.icon}</span>
                <span className="text-base font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded-full">
                  의학 증거: {item.evidence}
                </span>
              </div>

              <div>
                <span className="text-base font-bold text-slate-400 uppercase tracking-wider block">
                  {item.category}
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  {item.name}
                </h3>
              </div>

              <div className="space-y-3 text-base">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <strong className="text-emerald-600 dark:text-emerald-400 block mb-1 text-base">효능 & 작용</strong>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{item.benefit}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <strong className="text-blue-600 dark:text-blue-400 block mb-1 text-base">섭취 팁</strong>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{item.howToEat}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 text-base text-slate-600 dark:text-slate-400 font-bold leading-relaxed">
              ⚠️ 주의사항: {item.caution}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
