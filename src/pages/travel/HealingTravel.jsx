import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, MapPin, Calendar, Sparkles, ChevronRight } from 'lucide-react';

export const HealingTravel = () => {
  const { healingTravel } = useApp();
  const [selectedSpot, setSelectedSpot] = useState(null);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center text-2xl shadow-sm">
            🏞️
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              전국 힐링 여행지 & 청정 숲
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              피톤치드와 자연의 정기로 심신의 스트레스를 해소하는 프리미엄 웰니스 여행 추천.
            </p>
          </div>
        </div>
      </div>

      {/* Travel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {healingTravel.map((spot) => (
          <div
            key={spot.id}
            onClick={() => setSelectedSpot(spot)}
            className="glass-card rounded-3xl overflow-hidden group cursor-pointer hover:shadow-2xl hover:border-teal-300 dark:hover:border-teal-600 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-52 overflow-hidden">
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-teal-600/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                  {spot.tag}
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{spot.bestSeason} 추천</span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-1.5 text-xs text-teal-600 dark:text-teal-400 font-bold">
                  <MapPin className="w-4 h-4" />
                  <span>{spot.location}</span>
                </div>
                <h3 className="font-extrabold text-xl text-slate-800 dark:text-slate-100 group-hover:text-teal-600 transition-colors">
                  {spot.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {spot.description}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-bold text-teal-600 dark:text-teal-400 border-t border-slate-100 dark:border-slate-800">
              <span>코스 상세 보기</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Spot Modal */}
      {selectedSpot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl shadow-2xl border border-teal-100 dark:border-slate-800 p-6 sm:p-8 space-y-5 relative">
            <button
              onClick={() => setSelectedSpot(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-teal-600 bg-teal-50 dark:bg-teal-950 px-3 py-1 rounded-full w-fit">
              <MapPin className="w-3.5 h-3.5" />
              <span>{selectedSpot.location}</span>
            </div>

            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {selectedSpot.name}
            </h2>

            <img
              src={selectedSpot.image}
              alt={selectedSpot.name}
              className="w-full h-64 object-cover rounded-2xl shadow-md"
            />

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {selectedSpot.description}
            </p>

            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
              <span>권장 방문 시기: {selectedSpot.bestSeason}</span>
              <span className="text-teal-600 dark:text-teal-400"># 피톤치드 100% 힐링</span>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedSpot(null)}
                className="px-6 py-2.5 bg-teal-600 text-white font-bold rounded-xl shadow-md hover:bg-teal-700 transition-all"
              >
                확인 및 닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
