import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Brain, HelpCircle, ChevronDown, ChevronUp, ShieldAlert, Sparkles, ExternalLink, Activity, BookOpen, CheckCircle } from 'lucide-react';

export const GBMPage = () => {
  const { brainTumors, gbmFaqs, setActiveTab } = useApp();
  const [openFaq, setOpenFaq] = useState(1);

  const gbm = brainTumors.find(t => t.isSpecial) || brainTumors[0];

  const stuppSteps = [
    { step: "1단계", title: "최대 안전 절제 수술", desc: "신경항법 및 형광 유도(5-ALA) 하에 언어·운동 신경 보존하며 종양 최대 절제", duration: "1일 (수술 후 1~2주 입원)" },
    { step: "2단계", title: "동시 방사선 + 항암 치료 (CCRT)", desc: "국소 방사선 60Gy (30회 분할) + 테모졸로마이드(TMZ) 항암제 매일 복용", duration: "6주 (월~금 병원 방문)" },
    { step: "3단계", title: "휴식기", desc: "뇌 부종 완화 및 골수 기능 회복을 위한 휴식. 뇌 MRI 촬영으로 초기 반응 확인", duration: "4주" },
    { step: "4단계", title: "유지 항암 치료 (Adjuvant TMZ)", desc: "TMZ를 28일 주기 중 5일간 고용량 복용 (6~12주기 진행)", duration: "6개월 ~ 1년" },
    { step: "선택/추가", title: "전기장 치료 (Optune / TTFields)", desc: "두피에 4개의 전극 패드를 착용하고 하루 18시간 이상 200kHz 전기장 자극", duration: "2년 이상 권장" },
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 text-white p-8 sm:p-12 shadow-2xl border border-slate-800/50">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-600/80 text-white text-base font-black uppercase tracking-wider">
            <Brain className="w-4 h-4" />
            <span>WHO Grade IV · 가장 정교한 의학 백과</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight">
            교모세포종 (GBM) <br />
            <span className="text-slate-400">완전 가이드 & 치료 전략</span>
          </h1>
          <p className="text-slate-300 text-lg sm:text-base leading-relaxed">
            교모세포종은 악성도가 높은 뇌종양이지만, 과학적이고 검증된 표준 치료와 최신 면역치료, 임상시험으로 희망을 만들어갈 수 있습니다.
          </p>
        </div>
      </section>

      {/* Quick Summary Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-900/40 space-y-2">
          <span className="text-base font-bold text-slate-600 uppercase">발생 비율</span>
          <p className="text-lg font-black text-slate-800 dark:text-white">{gbm.incidence}</p>
          <p className="text-base text-slate-500">원발성 뇌종양 중 가장 흔한 악성 종양</p>
        </div>
        <div className="glass-card p-5 rounded-2xl border border-sky-200 dark:border-sky-900/40 space-y-2">
          <span className="text-base font-bold text-sky-600 uppercase">표준 치료법</span>
          <p className="text-lg font-black text-slate-800 dark:text-white">Stupp Protocol</p>
          <p className="text-base text-slate-500">수술 + 방사선 + 테모졸로마이드 + Optune</p>
        </div>
        <div className="glass-card p-5 rounded-2xl border border-amber-200 dark:border-amber-900/40 space-y-2">
          <span className="text-base font-bold text-amber-600 uppercase">핵심 바이오마커</span>
          <p className="text-lg font-black text-slate-800 dark:text-white">MGMT / IDH</p>
          <p className="text-base text-slate-500">MGMT 메틸화 시 항암 반응 대폭 상승</p>
        </div>
        <div className="glass-card p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 space-y-2">
          <span className="text-base font-bold text-emerald-600 uppercase">최신 유망 치료</span>
          <p className="text-lg font-black text-slate-800 dark:text-white">BNCT / 면역치료</p>
          <p className="text-base text-slate-500">붕소중성자포획치료 및 B세포 면역치료</p>
        </div>
      </section>

      {/* Stupp Protocol Section */}
      <section className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 text-base font-bold mb-2">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>글로벌 정통 가이드라인</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            표준 치료: 억불(Stupp) 프로토콜 (Stupp Protocol)
          </h2>
          <p className="text-base text-slate-500 mt-1">
            2005년 스위스 억불 박사가 확립한 국제 표준 교모세포종 치료 순서입니다.
          </p>
        </div>

        <div className="space-y-3">
          {stuppSteps.map((s, idx) => (
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
          {gbmFaqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="glass-card rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
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
          <p className="text-base text-slate-100 mt-1">서울대, 삼성서울, 세브란스, 서울성모, 분당차 등 8대 전문 병원 안내</p>
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
