import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HeartPulse, BookOpen, Clock, Tag, ChevronRight, Sparkles, ExternalLink } from 'lucide-react';

export const HealthStory = () => {
  const { healthStories, quickLinks, setActiveTab } = useApp();
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '자연치유', '건강습관', '수면건강'];

  const filteredStories = selectedCategory === '전체'
    ? healthStories
    : healthStories.filter(s => s.category === selectedCategory);

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white p-8 sm:p-12 shadow-2xl shadow-emerald-600/20">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-emerald-100">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>쭈니의 자연치유 컬렉션</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            몸과 마음의 자생력을 높이는<br />
            <span className="text-amber-300">자연치유 힐링 이야기</span>
          </h2>
          <p className="text-emerald-50 text-sm sm:text-base leading-relaxed opacity-90">
            의약품에만 의존하지 않는 건강한 습관, 천연 음식과 면역력 테라피로 삶의 균형을 되찾으세요.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActiveTab('shopping')}
              className="px-6 py-3 bg-white text-emerald-800 font-extrabold rounded-2xl shadow-lg hover:bg-emerald-50 transition-all transform hover:-translate-y-0.5"
            >
              힐링 쇼핑몰 가기
            </button>
            <a
              href={quickLinks.coupang}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-2xl shadow-md transition-all"
            >
              <span>쿠팡 파트너스 추천</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-emerald-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story) => (
          <article
            key={story.id}
            onClick={() => setSelectedStory(story)}
            className="glass-card rounded-3xl overflow-hidden group cursor-pointer hover:shadow-2xl hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                {story.category}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {story.readTime}
                  </span>
                  <span>•</span>
                  <span>{story.date}</span>
                </div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                  {story.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {story.summary}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>자세히 읽기</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Article Detail Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-emerald-100 dark:border-slate-800 p-6 sm:p-8 space-y-6 relative">
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
            >
              ✕
            </button>

            <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-full">
              {selectedStory.category}
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 leading-snug">
              {selectedStory.title}
            </h2>

            <div className="flex items-center gap-4 text-xs text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-4">
              <span>작성일: {selectedStory.date}</span>
              <span>•</span>
              <span>{selectedStory.readTime}</span>
            </div>

            <img
              src={selectedStory.image}
              alt={selectedStory.title}
              className="w-full h-64 object-cover rounded-2xl shadow-md"
            />

            <div className="prose dark:prose-invert text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line space-y-4">
              <p className="font-semibold text-base text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-slate-800/80 p-4 rounded-xl border border-emerald-100 dark:border-slate-700">
                "{selectedStory.summary}"
              </p>
              <p>{selectedStory.content}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedStory(null)}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
