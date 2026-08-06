import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { User, ShieldCheck, FileText, Loader2, LogOut, Camera } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MyPage = () => {
  const { user, profile, signOut, updateAvatar } = useAuth();
  const { setActiveTab } = useApp();
  const [myPosts, setMyPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef(null);

  const avatarUrl = user?.user_metadata?.avatar_url;

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingAvatar(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const size = 120;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        const scale = Math.max(size / img.width, size / img.height);
        const x = (size - img.width * scale) / 2;
        const y = (size - img.height * scale) / 2;
        
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        
        try {
          await updateAvatar(dataUrl);
        } catch (err) {
          alert('아이콘 업데이트에 실패했습니다.');
        } finally {
          setIsUploadingAvatar(false);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (user) {
      fetchMyPosts();
    }
  }, [user]);

  const fetchMyPosts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('author_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setMyPosts(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <User className="w-16 h-16 text-slate-300" />
        <p className="text-xl text-slate-500 font-bold">로그인이 필요한 서비스입니다.</p>
        <button 
          onClick={() => setActiveTab('home')}
          className="px-6 py-2 mt-4 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 w-full max-w-4xl mx-auto px-4 sm:px-6">
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-6 justify-between mt-8">
        <div className="flex items-center gap-6 w-full md:w-auto">
          <div className="relative group w-20 h-20 flex-shrink-0">
            <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center overflow-hidden border-2 border-slate-200 dark:border-slate-700">
              {avatarUrl ? (
                <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                profile?.role === '환자' ? <User className="w-10 h-10 text-blue-500" /> : <ShieldCheck className="w-10 h-10 text-emerald-500" />
              )}
            </div>
            {isUploadingAvatar && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              hidden 
              accept="image/*" 
              onChange={handleImageUpload} 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingAvatar}
              className="absolute bottom-0 right-0 p-1.5 bg-slate-800 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg disabled:opacity-50"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
              반갑습니다, {profile?.nickname || '익명'}님!
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
              <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-sm">{profile?.role || '역할 미지정'}</span>
              <span>{user.email}</span>
            </p>
          </div>
        </div>
        <button 
          onClick={() => {
            signOut();
            setActiveTab('home');
          }}
          className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm transition-colors flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> 로그아웃
        </button>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-500" /> 내가 쓴 희망 이야기 ({myPosts.length})
        </h2>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          {isLoading ? (
            <div className="py-20 flex justify-center text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : myPosts.length === 0 ? (
            <div className="py-20 text-center text-slate-500">
              아직 작성한 게시글이 없습니다. 통합 커뮤니티에서 첫 번째 글을 남겨보세요!
              <div className="mt-4">
                <button 
                  onClick={() => setActiveTab('stories')}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors"
                >
                  커뮤니티 바로가기
                </button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {myPosts.map(post => (
                <div key={post.id} className="p-5 sm:p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 text-xs font-bold bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-md">
                        {post.board_type}
                      </span>
                      {post.category && (
                        <span className="px-2.5 py-1 text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 rounded-md">
                          {post.category}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-slate-400">{formatDate(post.created_at)}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {post.title}
                  </h3>
                  <div 
                    className="text-sm text-slate-500 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
