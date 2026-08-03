import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HeartPulse, BookOpen, Clock, Tag, ChevronRight, Sparkles, ExternalLink, Leaf, Shield, Users, TrendingUp, X } from 'lucide-react';

export const HealthStory = () => {
  const { healthStories, quickLinks, setActiveTab } = useApp();
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '자연치유', '건강습관', '수면건강'];

  const filteredStories = selectedCategory === '전체'
    ? healthStories
    : healthStories.filter(s => s.category === selectedCategory);

  const categoryColors = {
    '자연치유': 'bg-emerald-600',
    '건강습관': 'bg-teal-600',
    '수면건강': 'bg-blue-600',
  };

  const stats = [
    { icon: '📖', label: '건강 아티클', value: `${healthStories.length}+`, color: 'from-emerald-500 to-teal-500' },
    { icon: '🌿', label: '자연치유 팁', value: '50+', color: 'from-teal-500 to-cyan-500' },
    { icon: '👥', label: '월간 방문자', value: '2천+', color: 'from-cyan-500 to-blue-500' },
    { icon: '⭐', label: '독자 만족도', value: '98%', color: 'from-amber-500 to-orange-500' },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl hero-gradient-animated text-white p-8 sm:p-12 shadow-2xl shadow-emerald-600/25 hero-glow">
        {/* Decorative orbs */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-8 w-48 h-48 bg-teal-300/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-1/2 left-0 -ml-8 w-32 h-32 bg-cyan-400/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-sm font-bold text-emerald-100 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>쭈니의 자연치유 컬렉션 · 2026 Edition</span>
          </div>

          {/* Headline */}
          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              몸과 마음의 자생력을 높이는<br />
              <span className="text-amber-300">자연치유 힐링 이야기</span>
            </h1>
            <p className="text-emerald-50 text-base sm:text-base leading-relaxed opacity-90 max-w-xl">
              의약품에만 의존하지 않는 건강한 습관, 천연 음식과 면역력 테라피로 삶의 균형을 되찾으세요.
              과학적으로 검증된 자연치유 정보를 매주 업데이트합니다.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActiveTab('shopping')}
              className="btn-premium px-6 py-3 bg-white text-emerald-800 font-extrabold rounded-2xl shadow-lg hover:bg-emerald-50 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              🛍️ 힐링 쇼핑몰 가기
            </button>
            <a
              href={quickLinks.coupang}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium inline-flex items-center gap-1.5 px-5 py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-2xl shadow-md transition-all"
            >
              <span>쿠팡 파트너스 추천</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white/15 backdrop-blur-md rounded-2xl p-3 text-center border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-xl font-black text-white">{stat.value}</div>
                <div className="text-sm text-emerald-100 font-semibold mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap mr-1">카테고리:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm sm:text-base font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
            {cat !== '전체' && (
              <span className="ml-1.5 text-sm opacity-70">
                ({healthStories.filter(s => s.category === cat).length})
              </span>
            )}
          </button>
        ))}
        <span className="ml-auto text-sm text-slate-400 whitespace-nowrap">
          {filteredStories.length}개 아티클
        </span>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story, idx) => (
          <article
            key={story.id}
            onClick={() => setSelectedStory(story)}
            className="glass-card rounded-3xl overflow-hidden group cursor-pointer hover:shadow-2xl hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col"
            style={{ animationDelay: `${idx * 60}ms` }}
          >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Category Badge */}
              <div className={`absolute top-3 left-3 ${categoryColors[story.category] || 'bg-emerald-600'} backdrop-blur-md text-white text-sm font-bold px-3 py-1 rounded-full shadow-md`}>
                {story.category}
              </div>

              {/* Read time */}
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-sm font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {story.readTime}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {story.date}
                  </span>
                </div>
                <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                  {story.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {story.summary}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-sm font-bold text-emerald-600 dark:text-emerald-400 border-t border-slate-100 dark:border-slate-800">
                <span>자세히 읽기</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Natural Healing Tips Banner */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-100 dark:border-slate-800 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-900/50 dark:to-slate-900/50">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-xl">
            🌟
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-100">오늘의 자연치유 핵심 팁</h3>
            <p className="text-sm text-slate-500">매일 실천 가능한 소소한 힐링 습관</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: '☀️', title: '아침 햇빛 15분', desc: '기상 후 야외 햇빛으로 세로토닌과 비타민 D를 동시에 충전하세요.' },
            { icon: '💧', title: '공복 레몬수 한 잔', desc: '따뜻한 레몬수로 간 해독을 시작하고 신진대사를 활성화하세요.' },
            { icon: '🌬️', title: '복식 호흡 5분', desc: '4-7-8 호흡법으로 부교감 신경을 활성화하여 스트레스를 해소하세요.' },
          ].map((tip, i) => (
            <div key={i} className="bg-white/70 dark:bg-slate-800/70 rounded-2xl p-4 space-y-2 border border-emerald-50 dark:border-slate-700">
              <span className="text-3xl">{tip.icon}</span>
              <h4 className="font-extrabold text-base text-slate-800 dark:text-slate-100">{tip.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Article Detail Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-scale-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl border border-emerald-100 dark:border-slate-800 relative">
            {/* Modal Header Image */}
            <div className="relative h-48 overflow-hidden rounded-t-3xl">
              <img
                src={selectedStory.image}
                alt={selectedStory.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className={`absolute bottom-4 left-4 ${categoryColors[selectedStory.category] || 'bg-emerald-600'} text-white text-sm font-bold px-3 py-1 rounded-full`}>
                {selectedStory.category}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <span>{selectedStory.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {selectedStory.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 leading-snug">
                {selectedStory.title}
              </h2>

              {/* Summary Box */}
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
                <p className="text-base font-semibold text-emerald-800 dark:text-emerald-300 leading-relaxed">
                  💡 "{selectedStory.summary}"
                </p>
              </div>

              {/* Content */}
              <div className="text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line space-y-3">
                {selectedStory.content}
              </div>

              {/* CTA */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setActiveTab('shopping')}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md transition-all text-base"
                >
                  관련 웰니스 제품 보기
                </button>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-2xl transition-all text-base"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
