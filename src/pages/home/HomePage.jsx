import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ChevronRight, ArrowRight, HeartPulse, Building2, MessagesSquare, MessageCircle, ChevronUp, Download
} from 'lucide-react';

export const HomePage = () => {
  const { setActiveTab, brainTumors, research, hospitals, stories } = useApp();
  const gbmInfo = brainTumors.find(t => t.isSpecial);

  return (
    <div className="relative w-full bg-slate-50 dark:bg-slate-950 pb-20">
      
      {/* 1. Full-width Hero Banner (MEDI25 Style) */}
      <section className="relative w-full overflow-hidden bg-gradient-to-r from-teal-300 via-cyan-400 to-emerald-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-[380px] md:h-[460px] flex items-center justify-between">
          
          {/* Left Text */}
          <div className="z-10 text-white space-y-4 pt-10">
            <h1 className="text-4xl md:text-5xl lg:text-[54px] font-black leading-tight tracking-tight drop-shadow-md">
              <span className="text-teal-900 font-extrabold text-[40px] md:text-[50px]">수많은 환우들이 선택한</span><br />
              국내 1위 뇌종양·교모세포종 플랫폼
            </h1>
            <p className="text-lg md:text-xl font-bold opacity-90 drop-shadow-sm mt-4">
              최신 임상 정보부터 희망을 나누는 동행 이야기까지
            </p>
            
            {/* Paging UI */}
            <div className="absolute bottom-8 left-4 sm:left-6 lg:left-8 flex items-center gap-2">
              <div className="bg-black/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-bold text-white flex items-center gap-2">
                <span>1 / 3</span>
                <span className="cursor-pointer hover:text-teal-200">+</span>
              </div>
            </div>
          </div>

          {/* Right Badge / Image */}
          <div className="hidden md:block z-10 mr-10 relative">
             <div className="w-64 h-72 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-b-[40px] border-[6px] border-amber-400 p-6 flex flex-col items-center justify-center text-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform cursor-pointer shadow-indigo-900/50">
                <span className="text-amber-400 font-black text-xl mb-2">2026 CSBA</span>
                <span className="text-white text-sm font-bold opacity-80">환우 만족도 1위</span>
                <h3 className="text-white text-2xl font-black mt-2 leading-tight">신뢰받는<br/>정보 플랫폼<br/>대상 1위</h3>
             </div>
          </div>
          
          {/* Background Graphic Elements */}
          <div className="absolute right-0 bottom-0 opacity-20">
             <svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 400L600 200V400H0Z" fill="white"/>
                <path d="M100 400L600 100V400H100Z" fill="white" fillOpacity="0.5"/>
             </svg>
          </div>
        </div>
      </section>

      {/* 2. Stats & News Row (White Background Container) */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100">
            
            {/* Stat 1 */}
            <div className="flex-1 py-8 px-4 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-2">
                누적 함께하는 환우 <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-400 cursor-pointer">자세히</span>
              </div>
              <div className="text-4xl font-black text-slate-900">
                2,450<span className="text-xl font-bold ml-1 text-slate-600">명</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 font-medium">교모세포종 1,200명 / 기타 뇌종양 1,250명</p>
            </div>

            {/* Stat 2 */}
            <div className="flex-1 py-8 px-4 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-2">
                누적 공유된 희망 이야기 <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-400 cursor-pointer">자세히</span>
              </div>
              <div className="text-4xl font-black text-slate-900">
                6,111<span className="text-xl font-bold ml-1 text-slate-600">건</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 font-medium">치료후기 5,774건 / 식단정보 337건</p>
            </div>

            {/* News List */}
            <div className="flex-1 py-6 px-8 flex flex-col justify-center">
              <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-rose-500 text-sm">News</span> 플랫폼 최신 소식
              </h3>
              <div className="space-y-4">
                {research.slice(0, 2).map((item) => (
                  <div key={item.id} className="flex gap-3 cursor-pointer group" onClick={() => setActiveTab('research')}>
                    <div className="w-16 h-12 bg-slate-100 rounded-md overflow-hidden flex-shrink-0">
                       <div className="w-full h-full bg-emerald-100 flex items-center justify-center text-emerald-500 text-xs font-bold">News</div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700 group-hover:text-emerald-600 transition-colors line-clamp-1">{item.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        
        {/* Section Title */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-slate-900">맞춤형 정보 큐레이션</h2>
          <p className="text-slate-500 font-medium">진단부터 수술, 재활까지 꼭 필요한 정보를 확인하세요.</p>
        </div>

        {/* Categories (Flat Design) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {[
            { id: 'gbm', title: '교모세포종(GBM)', sub: '최고 악성도 가이드', icon: HeartPulse, color: 'text-rose-500 bg-rose-50' },
            { id: 'hospital', title: '병원 및 전문의', sub: '전국 명의 리스트', icon: Building2, color: 'text-cyan-600 bg-cyan-50' },
            { id: 'stories', title: '희망 이야기', sub: '장기 생존자 후기', icon: MessagesSquare, color: 'text-emerald-500 bg-emerald-50' },
            { id: 'research', title: '연구/임상시험', sub: '최신 신약 정보', icon: Search, color: 'text-blue-600 bg-blue-50' }
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <div 
                key={cat.id} 
                onClick={() => setActiveTab(cat.id)}
                className="bg-white border border-slate-200 hover:border-emerald-400 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:shadow-lg group"
              >
                <div className={`w-14 h-14 rounded-full ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                   <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-800">{cat.title}</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">{cat.sub}</p>
              </div>
            )
          })}
        </div>

        {/* Banner ad style */}
        <div 
          onClick={() => setActiveTab('hospital')}
          className="w-full bg-slate-800 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between cursor-pointer hover:bg-slate-900 transition-colors"
        >
           <div className="text-white space-y-2 text-center md:text-left">
              <h2 className="text-2xl font-black">나에게 맞는 뇌종양 전문 병원 찾기</h2>
              <p className="text-slate-300 text-sm">전국 주요 대학병원의 신경외과 명의 정보를 한눈에 비교하고 확인하세요.</p>
           </div>
           <button className="mt-6 md:mt-0 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-xl flex items-center gap-2 transition-colors">
              병원 정보 보기 <ArrowRight className="w-4 h-4" />
           </button>
        </div>
      </div>

      {/* 4. Floating Right Sidebar */}
      <div className="fixed right-6 bottom-10 z-40 hidden xl:flex flex-col gap-3">
         <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden w-20 flex flex-col items-center py-3">
            <span className="text-[10px] font-bold text-slate-400 mb-2 border-b border-slate-100 pb-2 w-full text-center">Quick</span>
            
            <button className="flex flex-col items-center gap-1 p-2 hover:bg-slate-50 w-full group">
               <MessageCircle className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
               <span className="text-[10px] text-slate-600 font-medium tracking-tighter">카톡문의</span>
            </button>
            
            <button className="flex flex-col items-center gap-1 p-2 hover:bg-slate-50 w-full group border-t border-slate-50 mt-1">
               <Download className="w-5 h-5 text-teal-500 group-hover:scale-110 transition-transform" />
               <span className="text-[10px] text-slate-600 font-medium tracking-tighter">앱 설치</span>
            </button>
         </div>

         <button 
           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
           className="w-20 h-10 bg-white rounded-xl shadow-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-teal-600 hover:bg-slate-50 transition-colors"
         >
           <ChevronUp className="w-5 h-5" />
           <span className="text-xs font-bold ml-1">TOP</span>
         </button>
      </div>

    </div>
  );
};
