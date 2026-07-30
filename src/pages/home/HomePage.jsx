import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Brain, Sparkles, BookOpen, Heart, Activity, Youtube, 
  Hospital, ShoppingBag, MessageSquare, ChevronRight, ShieldAlert, ArrowRight 
} from 'lucide-react';

export const HomePage = () => {
  const { setActiveTab, brainTumors, research, youtubeVideos, hospitals, stories } = useApp();

  const gbmInfo = brainTumors.find(t => t.isSpecial);

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl hero-hope-gradient text-white p-8 sm:p-14 shadow-2xl hero-glow">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-violet-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-violet-100 border border-white/20">
            <span className="animate-ribbon text-base">🎗️</span>
            <span>뇌종양 & 교모세포종 환우와 보호자를 위하여</span>
          </div>

          {/* Headline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              혼자가 아닙니다.<br />
              <span className="text-amber-300">함께 걷는 모든 발걸음이 희망입니다</span>
            </h1>
            <p className="text-violet-100 text-sm sm:text-base leading-relaxed opacity-95 max-w-2xl">
              가장 치열하고 어려운 교모세포종(GBM)부터 다양한 뇌종양까지. 
              최신 치료 연구, 전문 병원·의료진 정보, 항암 영양 가이드, 검증된 영상과 실제 생존 이야기를 한 곳에서 확인하세요.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActiveTab('gbm')}
              className="btn-sweep px-6 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-2xl shadow-xl shadow-rose-900/30 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 text-sm"
            >
              <Brain className="w-4 h-4" />
              <span>🧠 교모세포종(GBM) 심층 정보</span>
            </button>
            <button
              onClick={() => setActiveTab('hospital')}
              className="btn-sweep px-6 py-3.5 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-bold rounded-2xl border border-white/30 transition-all text-sm flex items-center gap-2"
            >
              <Hospital className="w-4 h-4" />
              <span>전국 뇌종양 전문 병원·의사</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { id: 'gbm', title: '교모세포종 백과', desc: 'Stupp 프로토콜·유전자 검사', icon: Brain, color: 'bg-rose-500' },
          { id: 'research', title: '최신 연구 & 임상', desc: 'BNCT·면역세포치료·Optune', icon: Sparkles, color: 'bg-amber-500' },
          { id: 'hospital', title: '병원 및 전문의', desc: '서울대·삼성·세브란스 등 8곳', icon: Hospital, color: 'bg-indigo-500' },
          { id: 'stories', title: '희망 이야기', desc: '7년 장기생존자 투병기', icon: MessageSquare, color: 'bg-emerald-500' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="glass-card p-5 rounded-2xl cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-violet-100 dark:border-slate-800"
            >
              <div className={`w-10 h-10 rounded-xl ${item.color} text-white flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-white group-hover:text-violet-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {item.desc}
              </p>
            </div>
          );
        })}
      </section>

      {/* Special Spotlight: GBM (Glioblastoma) */}
      {gbmInfo && (
        <section className="glass-card rounded-3xl p-6 sm:p-8 border border-rose-200 dark:border-rose-900/60 bg-gradient-to-r from-rose-50/50 via-purple-50/30 to-violet-50/50 dark:from-rose-950/20 dark:to-violet-950/20 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-rose-600/30">
                🧠
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-600 text-white">
                    핵심 특화
                  </span>
                  <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                    Grade IV 최고 악성도
                  </span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  교모세포종 (GBM) 완전 분석
                </h2>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('gbm')}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-rose-600/20"
            >
              <span>상세 백과 읽기</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {gbmInfo.summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-rose-100 dark:border-rose-900/40">
              <span className="text-xs font-extrabold text-rose-600 block mb-1">표준 치료</span>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                수술 + 방사선 60Gy + 테모졸로마이드(TMZ) + Optune(TTFields)
              </p>
            </div>
            <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-rose-100 dark:border-rose-900/40">
              <span className="text-xs font-extrabold text-violet-600 block mb-1">핵심 유전자</span>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                MGMT 프로모터 메틸화 (TMZ 반응성), IDH1/2 변이 유무
              </p>
            </div>
            <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-rose-100 dark:border-rose-900/40">
              <span className="text-xs font-extrabold text-amber-600 block mb-1">최신 임상</span>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                BNCT (붕소중성자치료), B세포 면역치료, 줄기세포 유전자치료
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Latest Research & Clinical Trials */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>최신 연구 & 임상시험 소식</span>
            </h2>
            <p className="text-xs text-slate-500">희망을 여는 최신 의학 연구 뉴스</p>
          </div>
          <button
            onClick={() => setActiveTab('research')}
            className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1"
          >
            <span>전체보기</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {research.slice(0, 4).map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab('research')}
              className="glass-card p-5 rounded-2xl cursor-pointer hover:border-violet-300 dark:hover:border-violet-700 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full text-white ${item.badgeColor}`}>
                  {item.badge}
                </span>
                <span className="text-[11px] text-slate-400">{item.date}</span>
              </div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 line-clamp-1">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Hospitals Banner */}
      <section className="glass-card p-6 sm:p-8 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xl">
              🏥
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                국내 뇌종양 다학제 전문 병원 & 의료진
              </h2>
              <p className="text-xs text-slate-500">서울대·삼성·세브란스·서울성모 등 8개 명의 팀</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('hospital')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>전체 병원 보기</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {hospitals.slice(0, 4).map((hosp) => (
            <div 
              key={hosp.id}
              onClick={() => setActiveTab('hospital')}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 cursor-pointer transition-all space-y-1"
            >
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md text-white ${hosp.badgeColor}`}>
                {hosp.badge}
              </span>
              <h4 className="font-extrabold text-xs text-slate-800 dark:text-white mt-1">{hosp.name}</h4>
              <p className="text-[10px] text-slate-500 line-clamp-1">{hosp.doctors[0]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hope Story Highlight */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500 to-orange-500 text-white space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💛</span>
            <h2 className="text-xl font-black">실제 희망 이야기</h2>
          </div>
          <button
            onClick={() => setActiveTab('stories')}
            className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md hover:bg-white/30 text-white text-xs font-bold transition-all"
          >
            이야기 더보기
          </button>
        </div>

        {stories[0] && (
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl space-y-2 border border-white/20">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-100">
              <span>{stories[0].role}</span>
              <span>•</span>
              <span>{stories[0].category}</span>
            </div>
            <h3 className="text-lg font-bold leading-snug">{stories[0].title}</h3>
            <p className="text-xs text-white/90 leading-relaxed line-clamp-3">
              "{stories[0].summary}"
            </p>
          </div>
        )}
      </section>

    </div>
  );
};
