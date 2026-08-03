import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, AlertCircle, CheckCircle2, ChevronRight, Filter } from 'lucide-react';

export const BrainTumors = () => {
  const { brainTumors, setActiveTab, setSelectedDeepTumorId } = useApp();
  const [selectedTumor, setSelectedTumor] = useState(brainTumors[0]);

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header */}
      <section className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 text-base font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>의학 정보 백과</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          뇌종양 종류별 백과사전
        </h1>
        <p className="text-base text-slate-500 max-w-2xl leading-relaxed">
          교모세포종, 수막종, 청신경초종, 뇌전이암, 핍지교종, 뇌하수체선종 등 6대 대표 뇌종양의 정의, 증상, 치료법 및 예후 정보입니다.
        </p>
      </section>

      {/* Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {brainTumors.map((t) => {
          const isSelected = selectedTumor.id === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setSelectedTumor(t)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[7.5rem] h-auto gap-2 ${
                isSelected
                  ? 'bg-sky-600 text-white border-sky-600 shadow-lg shadow-sky-600/30 scale-105'
                  : 'glass-card border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-sky-300'
              }`}
            >
              <span className="text-2xl">{t.icon}</span>
              <div>
                <span className={`text-xs font-bold block leading-snug mb-1 ${isSelected ? 'text-sky-200' : 'text-slate-400'}`}>
                  {t.grade}
                </span>
                <h3 className="font-extrabold text-base leading-tight">{t.name}</h3>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Detail View */}
      {selectedTumor && (
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-sky-100 dark:border-slate-800 space-y-8 animate-fade-in-up">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-4xl p-3 bg-sky-50 dark:bg-sky-950 rounded-2xl">{selectedTumor.icon}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-base font-bold px-2.5 py-0.5 rounded-full text-white ${selectedTumor.colorBadge}`}>
                    {selectedTumor.grade}
                  </span>
                  <span className="text-base text-slate-400 font-medium">{selectedTumor.fullName}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  {selectedTumor.name}
                </h2>
              </div>
            </div>

            {/* Deep Encyclopedia Button for ALL tumors */}
            <button
              onClick={() => {
                setSelectedDeepTumorId(selectedTumor.id);
                setActiveTab('tumor-deep');
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-600 hover:bg-slate-700 text-white font-bold text-base transition-all flex items-center gap-1.5 shadow-md shadow-slate-600/30"
            >
              <span>{selectedTumor.name} 심층 백과로 이동</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Overview */}
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            💡 {selectedTumor.summary}
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Symptoms */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
              <h4 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-slate-500" />
                <span>주요 증상</span>
              </h4>
              <ul className="grid grid-cols-2 gap-2">
                {selectedTumor.symptoms.map((sym, idx) => (
                  <li key={idx} className="text-base text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    <span>{sym}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Standard Treatment */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
              <h4 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>표준 치료법</span>
              </h4>
              <ul className="space-y-1.5">
                {selectedTumor.standardTreatment.map((tr, idx) => (
                  <li key={idx} className="text-base text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{tr}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prognosis & Key Markers */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="font-extrabold text-lg text-slate-900 dark:text-white">예후 및 치료 반응</h4>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedTumor.prognosis}
              </p>
            </div>

            {/* Key Markers */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="font-extrabold text-lg text-slate-900 dark:text-white">핵심 진단·유전자 인자</h4>
              <ul className="space-y-1">
                {selectedTumor.keyMarkers.map((km, idx) => (
                  <li key={idx} className="text-base text-slate-600 dark:text-slate-400">
                    • {km}
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
