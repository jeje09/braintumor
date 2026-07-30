import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Heart, ThumbsUp, Plus, CheckCircle2, ShieldCheck, X } from 'lucide-react';

export const Stories = () => {
  const { stories, addStory, likeStory } = useApp();
  const [selectedStory, setSelectedStory] = useState(null);
  const [isWriteOpen, setIsWriteOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    role: 'GBM 환자',
    category: '장기 생존',
    summary: '',
    content: '',
    tags: 'GBM, 희망, 투병'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;
    addStory({
      ...formData,
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80",
      tags: formData.tags.split(',').map(t => t.trim())
    });
    setIsWriteOpen(false);
    setFormData({ title: '', author: '', role: 'GBM 환자', category: '장기 생존', summary: '', content: '', tags: 'GBM, 희망' });
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header */}
      <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-xs font-bold">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>서로에게 힘이 되는 이야기</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            희망 이야기 & 투병 수기
          </h1>
          <p className="text-xs text-slate-500 max-w-xl">
            교모세포종 7년 장기 생존자부터 환자 곁을 지키는 보호자 이야기까지. 혼자가 아님을 확인하세요.
          </p>
        </div>

        <button
          onClick={() => setIsWriteOpen(true)}
          className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>희망 이야기 나누기</span>
        </button>
      </section>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.map((st) => (
          <article
            key={st.id}
            onClick={() => setSelectedStory(st)}
            className="glass-card p-6 rounded-3xl cursor-pointer hover:shadow-2xl border border-amber-100 dark:border-slate-800 transition-all duration-300 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  {st.category}
                </span>
                <span className="text-xs text-slate-400">{st.date}</span>
              </div>

              <h3 className="text-lg font-black text-slate-900 dark:text-white leading-snug hover:text-amber-600 transition-colors">
                {st.title}
              </h3>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span>{st.author}</span>
                <span>•</span>
                <span className="text-violet-600 dark:text-violet-400 font-bold">{st.role}</span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                "{st.summary}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={(e) => { e.stopPropagation(); likeStory(st.id); }}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-rose-500 transition-colors"
              >
                <ThumbsUp className="w-4 h-4 text-rose-500" />
                <span>희망 공감 {st.likes || 0}</span>
              </button>

              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                자세히 읽기 →
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Story Detail Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-scale-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 space-y-5 border border-slate-200 dark:border-slate-800 relative shadow-2xl">
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                {selectedStory.category}
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-snug">
                {selectedStory.title}
              </h2>
              <p className="text-xs text-slate-400">
                {selectedStory.author} ({selectedStory.role}) · {selectedStory.date}
              </p>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-900/50 text-xs font-medium text-amber-900 dark:text-amber-200 leading-relaxed">
              💡 "{selectedStory.summary}"
            </div>

            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line space-y-3">
              {selectedStory.content}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedStory(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Write Story Modal */}
      {isWriteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-scale-in">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl p-6 sm:p-8 space-y-4 border border-slate-200 dark:border-slate-800 relative shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">희망 이야기 등록</h3>
              <button type="button" onClick={() => setIsWriteOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">제목</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="예: 교모세포종 진단 후 3년, 일상을 되찾은 이야기"
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">작성자 (익명 가능)</label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    placeholder="예: 이○○ (50대)"
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">구분</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-900 dark:text-white"
                  >
                    <option value="GBM 환자">GBM 환자</option>
                    <option value="뇌종양 환자">뇌종양 환자</option>
                    <option value="보호자">보호자</option>
                    <option value="의료진/전문의">의료진/전문의</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">한 줄 요약</label>
                <input
                  type="text"
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({...formData, summary: e.target.value})}
                  placeholder="이야기의 핵심 요약을 작성해 주세요."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">상세 이야기</label>
                <textarea
                  required
                  rows={5}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="비슷한 길을 걷는 환우와 보호자들에게 전하고 싶은 용기와 정보를 적어주세요."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsWriteOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold shadow-md"
              >
                등록하기
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
