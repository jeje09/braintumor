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
      <section className="relative overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col md:flex-row items-center border border-emerald-100/60">
        {/* Text Content */}
        <div className="relative z-10 p-8 sm:p-14 space-y-6 md:w-1/2">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-xs font-bold text-emerald-700 border border-emerald-200 shadow-sm animate-fade-in-up">
            <span className="animate-float text-base flex items-center">🧠<span className="-ml-1">🌱</span></span>
            <span>희망과 생명, 전문적인 의료 네트워크</span>
          </div>

          {/* Headline */}
          <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-slate-900">
              혼자가 아닙니다.<br />
              <span className="text-emerald-600">최선의 치료, 함께 걷는 희망</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed opacity-95 max-w-xl font-medium mt-2">
              가장 치열한 교모세포종(GBM)부터 다양한 뇌종양까지. 
              최신 치료 연구, 신뢰받는 병원 및 의료진 정보, 검증된 투병 가이드를 통해 희망을 찾으세요.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 pt-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={() => setActiveTab('gbm')}
              className="btn-sweep px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-xl shadow-emerald-900/20 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 text-sm"
            >
              <Brain className="w-4 h-4" />
              <span>🧠 교모세포종(GBM) 심층 정보</span>
            </button>
            <button
              onClick={() => setActiveTab('hospital')}
              className="px-6 py-3.5 bg-white hover:bg-slate-50 text-emerald-700 font-bold rounded-2xl border border-emerald-200 shadow-sm transition-all text-sm flex items-center gap-2 group"
            >
              <Hospital className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
              <span>전국 뇌종양 전문 병원·의사</span>
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2 h-72 md:h-full w-full relative overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
           <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent z-10 md:block hidden"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent z-10 md:hidden block"></div>
           <img src="/hero-image.png" alt="희망을 전하는 의료진과 환자" className="w-full h-full object-cover object-center scale-105 animate-pulse-soft" style={{ animationDuration: '6s', minHeight: '400px' }} />
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { id: 'gbm', title: '교모세포종 백과', desc: 'Stupp 프로토콜·유전자 검사', icon: Brain, color: 'bg-emerald-500' },
          { id: 'research', title: '최신 연구 & 임상', desc: 'BNCT·면역세포치료·Optune', icon: Sparkles, color: 'bg-teal-500' },
          { id: 'hospital', title: '병원 및 전문의', desc: '서울대·삼성·세브란스 등', icon: Hospital, color: 'bg-cyan-600' },
          { id: 'stories', title: '희망 이야기', desc: '7년 장기생존자 투병기', icon: MessageSquare, color: 'bg-green-500' },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="glass-card p-5 rounded-2xl cursor-pointer hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 group border border-emerald-50 dark:border-slate-800 bg-white/90 animate-fade-in-up"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <div className={`w-10 h-10 rounded-xl ${item.color} text-white flex items-center justify-center mb-3 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform animate-float`} style={{ animationDelay: `${0.2 * i}s` }}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-white group-hover:text-emerald-600 transition-colors">
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
        <section className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-100 dark:border-emerald-900/60 bg-gradient-to-r from-emerald-50/50 via-white to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20 space-y-6 shadow-lg shadow-emerald-900/5 animate-fade-in-up">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-emerald-600/30 animate-float relative">
                🧠
                <span className="absolute -top-1 -right-1 text-base">🌱</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                    핵심 특화
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
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
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/20 group"
            >
              <span>상세 백과 읽기</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {gbmInfo.summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 hover:-translate-y-1 hover:shadow-md transition-all">
              <span className="text-xs font-extrabold text-emerald-600 block mb-1">표준 치료</span>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                수술 + 방사선 60Gy + 테모졸로마이드(TMZ) + Optune(TTFields)
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-teal-100 dark:border-teal-900/40 hover:-translate-y-1 hover:shadow-md transition-all">
              <span className="text-xs font-extrabold text-teal-600 block mb-1">핵심 유전자</span>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                MGMT 프로모터 메틸화 (TMZ 반응성), IDH1/2 변이 유무
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-cyan-100 dark:border-cyan-900/40 hover:-translate-y-1 hover:shadow-md transition-all">
              <span className="text-xs font-extrabold text-cyan-600 block mb-1">최신 임상</span>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                BNCT (붕소중성자치료), B세포 면역치료, 줄기세포 유전자치료
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Latest Research & Clinical Trials */}
      <section className="space-y-4 animate-fade-in-up">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-500 animate-pulse-soft" />
              <span>최신 연구 & 임상시험 소식</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">희망을 여는 최신 의학 연구 뉴스</p>
          </div>
          <button
            onClick={() => setActiveTab('research')}
            className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 group"
          >
            <span>전체보기</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {research.slice(0, 4).map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab('research')}
              className="glass-card bg-white p-5 rounded-2xl cursor-pointer border border-emerald-50 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-lg hover:shadow-teal-500/10 transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full text-white ${item.badgeColor.replace('violet', 'teal').replace('amber', 'emerald').replace('rose', 'cyan')}`}>
                  {item.badge}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">{item.date}</span>
              </div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-teal-700 transition-colors">
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
      <section className="glass-card p-6 sm:p-8 rounded-3xl space-y-4 border border-emerald-100 bg-white/80 shadow-md animate-fade-in-up">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center text-xl shadow-md shadow-cyan-600/20 animate-float">
              🏥
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                국내 뇌종양 다학제 전문 병원 & 의료진
              </h2>
              <p className="text-xs text-slate-500 font-medium">서울대·삼성·세브란스·서울성모 등 8개 명의 팀</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('hospital')}
            className="text-xs font-bold text-cyan-700 dark:text-cyan-400 hover:underline flex items-center gap-1 group"
          >
            <span>전체 병원 보기</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {hospitals.slice(0, 4).map((hosp) => (
            <div 
              key={hosp.id}
              onClick={() => setActiveTab('hospital')}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 hover:border-cyan-300 dark:hover:border-cyan-700 cursor-pointer transition-all space-y-1 hover:shadow-md hover:-translate-y-0.5"
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
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-500 to-green-500 text-white space-y-4 shadow-xl animate-fade-in-up">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-float">🧠🌱</span>
            <h2 className="text-xl font-black">실제 희망 이야기</h2>
          </div>
          <button
            onClick={() => setActiveTab('stories')}
            className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md hover:bg-white/30 text-white text-xs font-bold transition-all hover:scale-105"
          >
            이야기 더보기
          </button>
        </div>

        {stories[0] && (
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl space-y-2 border border-white/20 hover:bg-white/20 transition-colors cursor-pointer" onClick={() => setActiveTab('stories')}>
            <div className="flex items-center gap-2 text-xs font-bold text-green-100">
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
