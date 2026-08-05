import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { MessageSquare, Heart, ThumbsUp, Plus, X, Search, ShieldCheck, User, Send } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const DISEASES = [
  '교모세포종', '성상세포종', '뇌수막종', '신경초종', '뇌하수체선종',
  '수모세포종', '배아세포종', '두개인두종', '뇌실막종', '희소돌기교세포종',
  '전이성 뇌종양', '그외 뇌종양'
];

const BOARDS = [
  { id: '우리들의 이야기', icon: <MessageSquare className="w-4 h-4" /> },
  { id: '질의응답', icon: <Search className="w-4 h-4" /> },
  { id: '정보나눔', icon: <Heart className="w-4 h-4" /> },
  { id: '응원합니다', icon: <ThumbsUp className="w-4 h-4" /> }
];

const QUILL_MODULES = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
};

export const Stories = () => {
  const { user, profile } = useAuth();
  const [activeBoard, setActiveBoard] = useState('우리들의 이야기');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modals
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  
  // Comments
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Write Form
  const [formData, setFormData] = useState({
    category: DISEASES[0],
    title: '',
    content: ''
  });

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:author_id (nickname, role)
        `)
        .eq('board_type', activeBoard)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [activeBoard]);

  useEffect(() => {
    if (selectedPost) {
      fetchComments(selectedPost.id);
    } else {
      setComments([]);
      setNewComment('');
    }
  }, [selectedPost]);

  const fetchComments = async (postId) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          profiles:author_id (nickname, role)
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (e) {
      console.error('댓글을 불러오지 못했습니다.', e);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (!newComment.trim()) return;

    setIsSubmittingComment(true);
    try {
      const { error } = await supabase.from('comments').insert({
        post_id: selectedPost.id,
        author_id: user.id,
        content: newComment.trim()
      });

      if (error) throw error;
      setNewComment('');
      fetchComments(selectedPost.id);
    } catch (e) {
      console.error(e);
      alert('댓글 등록에 실패했습니다.');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !profile) {
      alert("로그인 및 프로필 설정이 필요합니다.");
      return;
    }

    const isCategoryRequired = ['우리들의 이야기', '질의응답'].includes(activeBoard);
    
    try {
      const { error } = await supabase.from('posts').insert({
        board_type: activeBoard,
        category: isCategoryRequired ? formData.category : null,
        title: formData.title,
        content: formData.content,
        author_id: user.id
      });

      if (error) throw error;
      
      setIsWriteOpen(false);
      setFormData({ category: DISEASES[0], title: '', content: '' });
      fetchPosts(); // Refresh list
    } catch (e) {
      console.error(e);
      alert('게시글 등록에 실패했습니다.');
    }
  };

  const handleLike = async (postId, currentLikes) => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    // 간단한 좋아요 증가 (실제로는 likes 테이블을 별도로 관리하는 것이 좋음)
    const { error } = await supabase
      .from('posts')
      .update({ likes_count: (currentLikes || 0) + 1 })
      .eq('id', postId);
      
    if (!error) {
      setPosts(posts.map(p => p.id === postId ? { ...p, likes_count: (p.likes_count || 0) + 1 } : p));
      if (selectedPost && selectedPost.id === postId) {
        setSelectedPost({ ...selectedPost, likes_count: (selectedPost.likes_count || 0) + 1 });
      }
    }
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 text-sm font-bold">
            <Heart className="w-3.5 h-3.5" />
            <span>함께 나누는 희망과 정보</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            통합 커뮤니티
          </h1>
          <p className="text-sm text-slate-500 max-w-xl">
            환자와 보호자가 함께 모여 아픔을 나누고, 소중한 정보와 응원을 공유하는 공간입니다.
          </p>
        </div>

        <button
          onClick={() => {
            if (!user || !profile) {
              alert("먼저 로그인 및 역할을 설정해주세요.");
              return;
            }
            setIsWriteOpen(true);
          }}
          className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>{activeBoard}에 글쓰기</span>
        </button>
      </section>

      {/* Board Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
        {BOARDS.map(board => (
          <button
            key={board.id}
            onClick={() => setActiveBoard(board.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
              activeBoard === board.id 
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md' 
                : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {board.icon}
            {board.id}
          </button>
        ))}
      </div>

      {/* Post List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex justify-center text-slate-400">로딩 중...</div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            아직 등록된 게시글이 없습니다. 첫 번째 글을 남겨주세요!
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {posts.map(post => (
              <div 
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="p-5 sm:p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors flex flex-col sm:flex-row gap-4 sm:items-center justify-between group"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    {post.category && (
                      <span className="px-2.5 py-1 text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 rounded-md">
                        {post.category}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {post.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-1" dangerouslySetInnerHTML={{ __html: (post.content || '').replace(/<[^>]+>/g, '') }}></p>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-slate-500 sm:text-right shrink-0">
                  <div className="flex items-center gap-1.5 font-medium bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                    {post.profiles?.role === '환자' ? <User className="w-3.5 h-3.5 text-blue-500" /> : <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />}
                    <span className="text-slate-700 dark:text-slate-300">{post.profiles?.nickname || '익명'}</span>
                    <span className="text-xs text-slate-400 ml-1">({post.profiles?.role})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" /> {post.likes_count || 0}</span>
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Write Modal */}
      {isWriteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-scale-in">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-5 border border-slate-200 dark:border-slate-800 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-500" /> {activeBoard} 글쓰기
              </h3>
              <button type="button" onClick={() => setIsWriteOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {['우리들의 이야기', '질의응답'].includes(activeBoard) && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">말머리 (질환 선택)</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    {DISEASES.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">제목</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="제목을 입력하세요"
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">내용</label>
                <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 h-[300px] sm:h-[400px]">
                  <ReactQuill 
                    theme="snow"
                    modules={QUILL_MODULES}
                    value={formData.content}
                    onChange={(val) => setFormData({...formData, content: val})}
                    className="h-full pb-10 text-slate-900 dark:text-white"
                    placeholder="사진과 동영상(유튜브 링크)을 자유롭게 첨부하여 따뜻한 이야기를 공유해주세요."
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsWriteOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-bold"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-black shadow-md"
              >
                등록하기
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-scale-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-200 dark:border-slate-800 relative shadow-2xl">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3 pr-12 border-b border-slate-100 dark:border-slate-800 pb-6">
              {selectedPost.category && (
                <span className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold">
                  {selectedPost.category}
                </span>
              )}
              <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-snug">
                {selectedPost.title}
              </h2>
              
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                  {selectedPost.profiles?.role === '환자' ? <User className="w-4 h-4 text-blue-500" /> : <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                  {selectedPost.profiles?.nickname || '익명'} 
                  <span className="text-slate-400 font-medium">({selectedPost.profiles?.role})</span>
                </div>
                <span className="text-slate-300 dark:text-slate-600">|</span>
                <span className="text-slate-500">{formatDate(selectedPost.created_at)}</span>
              </div>
            </div>

            <div 
              className="text-base text-slate-700 dark:text-slate-300 leading-relaxed min-h-[200px] ql-editor px-0"
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            />

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => handleLike(selectedPost.id, selectedPost.likes_count)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-50 text-pink-600 hover:bg-pink-100 dark:bg-pink-900/20 dark:hover:bg-pink-900/40 transition-colors font-bold text-sm border border-pink-100 dark:border-pink-900/50"
              >
                <Heart className="w-4 h-4" /> 공감 {selectedPost.likes_count || 0}
              </button>

              <button
                onClick={() => setSelectedPost(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold hover:bg-slate-200 transition-colors"
              >
                목록으로
              </button>
            </div>

            {/* Comments Section */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">댓글 {comments.length}개</h3>
              
              <div className="space-y-4 mb-6">
                {comments.map(comment => (
                  <div key={comment.id} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-sm text-slate-700 dark:text-slate-300">
                        {comment.profiles?.role === '환자' ? <User className="w-3.5 h-3.5 text-blue-500" /> : <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />}
                        {comment.profiles?.nickname || '익명'}
                      </div>
                      <span className="text-xs text-slate-400">{formatDate(comment.created_at)}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap">{comment.content}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleCommentSubmit} className="flex gap-2">
                <input
                  type="text"
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={user ? "따뜻한 댓글을 남겨보세요..." : "로그인 후 댓글을 작성할 수 있습니다."}
                  disabled={!user || isSubmittingComment}
                  className="flex-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!user || isSubmittingComment || !newComment.trim()}
                  className="px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 text-white transition-colors flex items-center justify-center shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
