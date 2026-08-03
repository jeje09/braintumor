import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TUMOR_DEEP_DATA } from '../../data/TumorDeepData';
import { Brain, HelpCircle, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

export const TumorDeepPage = () => {
  const { setActiveTab, selectedDeepTumorId } = useApp();
  const [openFaq, setOpenFaq] = useState(1); // default open first FAQ if exists

  const tumorData = TUMOR_DEEP_DATA[selectedDeepTumorId] || TUMOR_DEEP_DATA[1];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Header */}
      <section className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${tumorData.heroGradient} text-white p-8 sm:p-12 shadow-2xl border border-slate-800/50`}>
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-600/80 text-white text-base font-black uppercase tracking-wider">
            <Brain className="w-4 h-4" />
            <span>{tumorData.heroTag}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight">
            {tumorData.heroTitle} <br />
            <span className="text-slate-400">{tumorData.heroSubtitle}</span>
          </h1>
          <p className="text-slate-300 text-lg sm:text-base leading-relaxed">
            {tumorData.heroDesc}
          </p>
        </div>
      </section>

      {/* Quick Summary Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tumorData.stats.map((stat, idx) => (
          <div key={idx} className={`glass-card p-5 rounded-2xl border border-${stat.color}-200 dark:border-${stat.color}-900/40 space-y-2`}>
            <span className={`text-base font-bold text-${stat.color}-600 uppercase`}>{stat.label}</span>
            <p className="text-lg font-black text-slate-800 dark:text-white">{stat.value}</p>
            <p className="text-base text-slate-500">{stat.desc}</p>
          </div>
        ))}
      </section>

      {/* Protocol Section */}
      <section className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 text-base font-bold mb-2">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>글로벌 정통 가이드라인</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {tumorData.protocolTitle}
          </h2>
          <p className="text-base text-slate-500 mt-1 leading-relaxed">
            {tumorData.protocolDesc}
          </p>
        </div>

        <div className="space-y-3">
          {tumorData.protocolSteps.map((s, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-sky-600 text-white font-black text-base flex items-center justify-center flex-shrink-0">
                  0{idx + 1}
                </span>
                <div>
                  <h4 className="font-extrabold text-lg text-slate-900 dark:text-white">
                    {s.step}: {s.title}
                  </h4>
                  <p className="text-base text-slate-600 dark:text-slate-400 mt-0.5">{s.desc}</p>
                </div>
              </div>
              <span className="text-base font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950 px-3 py-1 rounded-lg whitespace-nowrap">
                기간: {s.duration}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions (Accordion) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-slate-500" />
            <span>환자와 보호자가 가장 많이 묻는 FAQ</span>
          </h2>
          <p className="text-base text-slate-500">궁금한 항목을 클릭하여 자세한 답변을 확인하세요.</p>
        </div>

        <div className="space-y-3">
          {tumorData.faqs.map((faq, idx) => {
            const faqId = idx + 1;
            const isOpen = openFaq === faqId;
            return (
              <div
                key={faqId}
                className="glass-card rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : faqId)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-lg text-slate-800 dark:text-slate-100 hover:text-slate-600 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-slate-500 font-black">Q.</span>
                    <span>{faq.question}</span>
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 text-base text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Action CTA */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-600 to-sky-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <h3 className="font-extrabold text-base">최신 임상시험 및 병원 정보가 필요하신가요?</h3>
          <p className="text-base text-slate-100 mt-1">국내 전문 병원 안내 및 임상시험 현황</p>
        </div>
        <button
          onClick={() => setActiveTab('hospital')}
          className="px-5 py-3 rounded-2xl bg-white text-slate-700 font-extrabold text-base shadow-md hover:bg-slate-50 transition-all whitespace-nowrap"
        >
          전문의 & 병원 찾기
        </button>
      </div>
    </div>
  );
};
