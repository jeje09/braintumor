import React from 'react';
import { BarChart3, Users, PieChart, TrendingUp } from 'lucide-react';

export const StatisticsView = () => {
  // 예시용 하드코딩 데이터 (나중에는 실제 수집된 익명 데이터 사용)
  const stats = {
    disease: "교모세포종 (Glioblastoma)",
    patientCount: 324,
    avgTotalAmount: 25000000,
    avgPatientBurden: 2800000,
    avgNonCovered: 5200000,
    medianPatientBurden: 2400000,
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('ko-KR').format(num) + '원';
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mt-8">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            익명 의료비 통계
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            환자들이 제공한 영수증 데이터를 기반으로 산출된 평균적인 의료비 흐름입니다.
          </p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-lg flex items-center gap-2 font-bold text-sm">
          <Users className="w-4 h-4" />
          누적 데이터: {stats.patientCount}명
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-4 border-b-2 border-indigo-500 inline-block pb-1">
          {stats.disease} 수술 및 입원 비용 (기준: 2026년)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <PieChart className="w-4 h-4 text-slate-400" />
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">평균 총 진료비</p>
            </div>
            <p className="text-2xl font-black text-slate-800 dark:text-slate-100">{formatCurrency(stats.avgTotalAmount)}</p>
          </div>
          
          <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <p className="text-emerald-800 dark:text-emerald-300 text-sm font-medium">평균 본인부담금 (급여)</p>
            </div>
            <p className="text-2xl font-black text-emerald-900 dark:text-emerald-100">{formatCurrency(stats.avgPatientBurden)}</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">건강보험 산정특례 5% 적용 시</p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-100 dark:border-amber-900/50">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-amber-600" />
              <p className="text-amber-800 dark:text-amber-300 text-sm font-medium">평균 비급여 비용</p>
            </div>
            <p className="text-2xl font-black text-amber-900 dark:text-amber-100">{formatCurrency(stats.avgNonCovered)}</p>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">1인실, 선택진료, 비급여재료 등</p>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-indigo-600" />
              <p className="text-indigo-800 dark:text-indigo-300 text-sm font-medium">환자 부담액 중앙값</p>
            </div>
            <p className="text-2xl font-black text-indigo-900 dark:text-indigo-100">{formatCurrency(stats.medianPatientBurden)}</p>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">비급여 제외 순수 부담액 기준</p>
          </div>
        </div>

        <div className="mt-8 bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4">비급여 주요 항목 (빈도순)</h4>
          <div className="space-y-3">
            {[
              { name: "형광유도 약제비 (5-ALA 등)", percent: 85, desc: "종양과 정상 뇌조직의 경계를 명확히 하기 위해 수술 전 복용" },
              { name: "상급병실료 (1-2인실 차액)", percent: 72, desc: "중환자실 퇴실 후 안정 목적으로 입원" },
              { name: "일부 유전자 검사 (NGS 등)", percent: 65, desc: "표적치료제 및 면역항암제 반응성 예측" },
              { name: "최신 의료재료대", percent: 45, desc: "수술 중 사용되는 지혈제, 유착방지제 등" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-16 text-right font-bold text-indigo-600 dark:text-indigo-400 shrink-0">{item.percent}%</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-slate-700 dark:text-slate-200">{item.name}</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                    <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${item.percent}%` }}></div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
