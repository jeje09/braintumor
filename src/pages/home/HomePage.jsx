import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ChevronRight, ArrowRight, HeartPulse, Building2, MessagesSquare, MessageCircle, ChevronUp, Download, Search, Bell
} from 'lucide-react';

export const HomePage = () => {
  const { setActiveTab, brainTumors, research, hospitals, stories } = useApp();
  const gbmInfo = brainTumors.find(t => t.isSpecial);

  return (
    <div className="relative w-full bg-slate-50 dark:bg-slate-950 pb-20">
      
      {/* 1. Full-width Hero Banner (MEDI25 Style) */}
      <section className="relative w-full bg-[#e8f0fe] dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-[420px] flex items-center justify-center text-center">
          
          <div className="z-10 space-y-6 pb-20">
            <h1 className="text-4xl md:text-5xl lg:text-[54px] font-black leading-tight tracking-tight text-[#1E3A8A] dark:text-white">
              건강한 생활,<br />
              리빙위드 헬스케어와 함께!
            </h1>
            <p className="text-lg md:text-xl font-bold text-slate-600 dark:text-slate-300">
              리빙위드의 다양한 헬스케어 서비스를 경험해보세요
            </p>
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 flex items-end justify-center gap-4 opacity-95">
             <div className="w-1/3 max-w-[200px] h-[80%] bg-white rounded-t-3xl shadow-xl border border-b-0 border-slate-200 flex flex-col items-center p-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full mb-3 flex items-center justify-center"><HeartPulse className="w-8 h-8 text-blue-500" /></div>
                <div className="w-full h-2 bg-slate-100 rounded-full mb-2"></div>
                <div className="w-2/3 h-2 bg-slate-100 rounded-full"></div>
             </div>
             <div className="w-1/3 max-w-[240px] h-full bg-white rounded-t-3xl shadow-2xl border border-b-0 border-slate-200 flex flex-col items-center p-4 z-10 relative">
                <div className="absolute -top-6 w-[80%] bg-slate-800 text-white text-xs py-2 px-3 rounded-xl shadow-lg">복용약 알림 설정 완료!</div>
                <div className="w-20 h-2 bg-slate-200 rounded-full mb-6 mt-2"></div>
                <div className="w-full h-16 bg-blue-50 rounded-2xl border border-blue-100 mb-4 flex items-center justify-center"><Bell className="w-6 h-6 text-blue-400" /></div>
                <div className="w-full h-12 bg-slate-50 rounded-xl"></div>
             </div>
             <div className="w-1/3 max-w-[200px] h-[80%] bg-white rounded-t-3xl shadow-xl border border-b-0 border-slate-200 flex flex-col items-center p-4">
                <div className="w-16 h-16 bg-rose-100 rounded-full mb-3 flex items-center justify-center"><Building2 className="w-8 h-8 text-rose-500" /></div>
                <div className="w-full h-2 bg-slate-100 rounded-full mb-2"></div>
                <div className="w-2/3 h-2 bg-slate-100 rounded-full"></div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-12">
        
        {/* Categories (Flat Design Grid like MEDI25) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {[
            { id: 'gbm', title: '교모세포종(GBM)', sub: '간편인증으로 내 의료기록 확인', icon: HeartPulse, color: 'text-rose-500 bg-rose-50' },
            { id: 'research', title: '임상시험 AI 매칭', sub: '건강검진 결과 통한 임상시험 자동 매칭', icon: Search, color: 'text-slate-600 bg-slate-100' },
            { id: 'stories', title: '나의 건강나이', sub: '회원님의 건강나이가 궁금하신가요?', icon: MessagesSquare, color: 'text-emerald-500 bg-emerald-50' },
            { id: 'nutrition', title: '복용약 알림', sub: '약 챙겨먹도록 알림 설정', icon: Bell, color: 'text-indigo-500 bg-indigo-50' },
            { id: 'hospital', title: '병원/약국 찾기', sub: '내 주변 병원, 약국 한 눈에 보기', icon: Building2, color: 'text-cyan-600 bg-cyan-50' },
            { id: 'tumors', title: 'FAQ', sub: '헬스케어 서비스가 궁금하신가요?', icon: MessageCircle, color: 'text-blue-600 bg-blue-50' }
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <div 
                key={cat.id} 
                onClick={() => setActiveTab(cat.id)}
                className="bg-white border border-slate-100 rounded-[28px] p-8 flex items-center justify-between cursor-pointer transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] group"
              >
                <div className="flex flex-col text-left space-y-1 pr-4">
                  <h3 className="text-[22px] font-black text-slate-800 group-hover:text-blue-600 transition-colors">{cat.title}</h3>
                  <p className="text-[13px] text-slate-500 font-medium leading-tight">{cat.sub}</p>
                </div>
                <div className={`w-16 h-16 flex-shrink-0 rounded-full ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                   <Icon className="w-8 h-8" />
                </div>
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
      <div className="fixed right-6 bottom-10 z-40 hidden xl:flex flex-col w-[90px]">
         <div className="bg-white shadow-[0_4px_20px_rgb(0,0,0,0.08)] border border-slate-200 flex flex-col text-center divide-y divide-slate-100 rounded-t-xl">
            <div className="py-4 bg-white rounded-t-xl">
              <span className="text-[11px] font-bold text-slate-600 block mb-1">최근 본 공고</span>
              <span className="text-[10px] text-slate-400 block mt-3">로그인<br/>해주세요.</span>
            </div>
            
            <div className="py-4 flex flex-col items-center bg-white">
              <span className="text-[10px] text-slate-500 font-bold mb-1">고객센터</span>
              <span className="text-sm font-black text-slate-800 leading-none">1644-3511</span>
              <span className="text-[9px] text-slate-400 mt-1">8:00~20:00</span>
            </div>
            
            <button className="flex flex-col items-center justify-center gap-1 py-3.5 bg-[#FEE500] hover:bg-[#F4DC00] transition-colors">
               <MessageCircle className="w-4 h-4 text-slate-900 fill-slate-900" />
               <span className="text-[11px] text-slate-900 font-bold">카톡문의</span>
            </button>
            
            <button className="flex flex-col items-center justify-center gap-1 py-3.5 bg-white hover:bg-slate-50 transition-colors">
               <Building2 className="w-4 h-4 text-slate-600" />
               <span className="text-[11px] text-slate-600 font-bold">제휴/의뢰</span>
            </button>
            
            <button className="flex flex-col items-center justify-center gap-1 py-3.5 bg-[#4aa8d8] hover:bg-blue-500 text-white transition-colors">
               <Download className="w-4 h-4" />
               <span className="text-[11px] font-bold">앱 다운로드</span>
            </button>
         </div>

         <button 
           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
           className="w-full mt-2 py-2 bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors rounded-b-xl"
         >
           <span className="text-xs font-bold mr-1">TOP</span>
           <ChevronUp className="w-4 h-4" />
         </button>
      </div>

    </div>
  );
};
