import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ChevronRight, ArrowRight, HeartPulse, Building2, MessagesSquare, MessageCircle, ChevronUp, Download, Search, Bell
} from 'lucide-react';

const CAROUSEL_IMAGES = [
  {
    url: "/banner_surgery.png",
    title: "암과 함께 살아가는 삶",
    subtitle: "혁신적인 수술과 첨단 의료 기술로 새로운 희망을 찾아갑니다"
  },
  {
    url: "/banner_lab.png",
    title: "최신 치료법 연구에 대한 소식 나눔",
    subtitle: "가장 앞선 뇌종양 신약 개발과 임상시험 정보를 공유합니다"
  },
  {
    url: "/banner_patient.png",
    title: "환자와 보호자의 몸과 마음의 건강을 위하여",
    subtitle: "치료의 모든 여정을 함께하며 따뜻한 돌봄과 지지를 제공합니다"
  }
];

export const HomePage = () => {
  const { setActiveTab, brainTumors, research, hospitals, stories } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  const gbmInfo = brainTumors.find(t => t.isSpecial);

  return (
    <div className="relative w-full bg-slate-50 dark:bg-slate-950 pb-20">
      
      {/* 1. Full-width Hero Carousel */}
      <section className="relative w-full h-[420px] md:h-[500px] overflow-hidden bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        {CAROUSEL_IMAGES.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img 
              src={slide.url} 
              alt={slide.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
            
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
              <div className="space-y-4 max-w-2xl transform translate-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-[54px] font-black text-white leading-tight tracking-tight drop-shadow-lg break-keep">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl font-bold text-slate-200 drop-shadow-md break-keep">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {CAROUSEL_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 3. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-12">
        
        {/* Categories (Flat Design Grid like MEDI25) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {[
            { id: 'gbm', title: '교모세포종(GBM)', sub: '가장 악성인 뇌종양의 원인과 최신 치료법', icon: HeartPulse, color: 'text-slate-500 bg-slate-50' },
            { id: 'research', title: '최신 연구·임상시험', sub: '전 세계 최신 신약 및 임상시험 동향', icon: Search, color: 'text-slate-600 bg-slate-100' },
            { id: 'stories', title: '환우 희망 이야기', sub: '뇌종양을 이겨내는 기적 같은 이야기들', icon: MessagesSquare, color: 'text-emerald-500 bg-emerald-50' },
            { id: 'nutrition', title: '항암 맞춤 식단', sub: '치료 효과를 높이는 과학적인 영양 관리', icon: Bell, color: 'text-blue-500 bg-blue-50' },
            { id: 'hospital', title: '우수 병원·전문의 찾기', sub: '나에게 맞는 뇌종양 전문 병원 추천', icon: Building2, color: 'text-cyan-600 bg-cyan-50' },
            { id: 'tumors', title: '뇌종양 백과사전', sub: '다양한 뇌종양의 원인, 종류, 증상 정보', icon: MessageCircle, color: 'text-blue-600 bg-blue-50' }
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
