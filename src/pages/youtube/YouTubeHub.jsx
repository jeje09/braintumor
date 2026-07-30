import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Youtube, ExternalLink, Play, Eye, Calendar, Tag } from 'lucide-react';

export const YouTubeHub = () => {
  const { youtubeVideos } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '의학 정보', '치료 정보', '수술 정보', '영양·식단', '희망 이야기', '보호자 지원', '임상시험'];

  const filteredVideos = selectedCategory === '전체'
    ? youtubeVideos
    : youtubeVideos.filter(v => v.category === selectedCategory);

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header */}
      <section className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 text-xs font-bold">
          <Youtube className="w-3.5 h-3.5" />
          <span>의료진 검증 영상</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          추천 유튜브 명의 특강 & 투병 영상
        </h1>
        <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
          근거 없는 민간요법 영상 대신, 대학병원 신경외과 전문의 특강과 검증된 투병 수기 영상을 한 곳에 모았습니다.
        </p>
      </section>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 scale-105'
                : 'glass-card text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <article
            key={video.id}
            className="glass-card rounded-3xl overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-0.5 fill-white" />
                  </div>
                </div>

                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-bold">
                  {video.duration}
                </span>

                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-rose-600 text-white text-[10px] font-bold shadow-md">
                  {video.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <span>{video.channelIcon} {video.channel}</span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors line-clamp-2 leading-snug">
                  {video.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {video.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {video.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Link footer */}
            <div className="p-5 pt-0">
              <a
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/60 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Youtube className="w-4 h-4 text-rose-600" />
                <span>유튜브에서 시청하기</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
