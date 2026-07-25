import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Heart, Wind, Flame } from 'lucide-react';

export const PerfumeStory = () => {
  const { perfumeStories } = useApp();
  const [selectedPerfume, setSelectedPerfume] = useState(null);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-3 relative overflow-hidden bg-gradient-to-r from-purple-900/10 via-pink-900/10 to-indigo-900/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center text-2xl shadow-sm">
            🌸
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              천연 아로마 & 향수 이야기
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              자연의 향기로 자율 신경계를 이완하고 마인드 밸런스를 되찾는 웰니스 향수 컬렉션.
            </p>
          </div>
        </div>
      </div>

      {/* Perfume Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {perfumeStories.map((perfume) => (
          <div
            key={perfume.id}
            onClick={() => setSelectedPerfume(perfume)}
            className="glass-card rounded-3xl overflow-hidden group cursor-pointer hover:shadow-2xl hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-56 overflow-hidden">
                <img
                  src={perfume.image}
                  alt={perfume.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-purple-600/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                  천연 에센셜 블렌딩
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 font-bold">
                  <Wind className="w-3.5 h-3.5" />
                  <span>노트: {perfume.notes}</span>
                </div>
                <h3 className="font-extrabold text-xl text-slate-800 dark:text-slate-100 group-hover:text-purple-600 transition-colors">
                  {perfume.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {perfume.description}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 bg-purple-50/40 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-extrabold text-purple-700 dark:text-purple-300 block truncate">
                💡 추천 시기: {perfume.mood}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Perfume Modal */}
      {selectedPerfume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-purple-100 dark:border-slate-800 p-6 sm:p-8 space-y-5 relative">
            <button
              onClick={() => setSelectedPerfume(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
            >
              ✕
            </button>

            <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-full">
              아로마테라피 테이스팅
            </span>

            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {selectedPerfume.name}
            </h2>

            <img
              src={selectedPerfume.image}
              alt={selectedPerfume.name}
              className="w-full h-56 object-cover rounded-2xl shadow-md"
            />

            <div className="space-y-2">
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block">
                대표 향 노트: {selectedPerfume.notes}
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {selectedPerfume.description}
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-slate-800 p-4 rounded-2xl text-xs font-bold text-purple-900 dark:text-purple-200 border border-purple-100 dark:border-slate-700">
              ✨ 추천 힐링 무드: {selectedPerfume.mood}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedPerfume(null)}
                className="px-6 py-2.5 bg-purple-600 text-white font-bold rounded-xl shadow-md hover:bg-purple-700 transition-all"
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
