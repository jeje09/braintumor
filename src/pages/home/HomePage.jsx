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

        {/* Poem Section */}
        <div className="w-full bg-white rounded-[32px] p-10 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center text-center mt-12 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-slate-50 rounded-br-full z-0"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-slate-50 rounded-tl-full z-0"></div>
          
          <h2 className="relative z-10 text-2xl md:text-3xl font-black text-slate-800 mb-12 tracking-tight">
            암 때문에 죽는 것이 아니라, <br className="md:hidden" />암과 함께 살아가는 길을 찾습니다.
          </h2>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 text-left max-w-4xl w-full">
            {/* Left Column */}
            <div className="space-y-6 text-slate-600 font-medium leading-loose break-keep text-[15px]">
              <p>
                모든 암세포를 하나도 남김없이 찾아내 없앨 수 있다면 가장 좋겠습니다.<br />
                그러나 그것이 언제나 가능한 것은 아닙니다.
              </p>
              <p>
                그래서 우리는 또 다른 길을 선택합니다.<br />
                암과 끝없는 전쟁만 하는 것이 아니라,<br />
                몸과 마음을 지키며 오늘을 살아가는 길입니다.
              </p>
              <p>
                때로는 어르고, 때로는 달래며,<br />
                조용히 공존할 수 있다면 그것 또한 삶의 지혜입니다.
              </p>
            </div>

            {/* Right Column */}
            <div className="space-y-6 text-slate-600 font-medium leading-loose break-keep text-[15px]">
              <p>
                암은 내 삶의 전부가 아닙니다.<br />
                암은 내 이름도, 내 꿈도, 내 사랑도 될 수 없습니다.
              </p>
              <p>
                오늘도 웃을 이유를 찾고,<br />
                사랑하는 사람과 함께하며,<br />
                희망을 잃지 않는다면 우리는 이미 잘 살아가고 있는 것입니다.
              </p>
              <div className="pt-6 border-t border-slate-200 mt-2">
                <p className="font-extrabold text-slate-800 text-base leading-relaxed">
                  절망하지 마십시오.<br />
                  우리는 암과 싸우기만 하는 사람들이 아니라,<br />
                  암과 함께도 끝까지 삶을 살아내는 사람들입니다.
                </p>
              </div>
            </div>
          </div>
        </div>

    </div>
  );
};
