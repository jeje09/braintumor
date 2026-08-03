import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Mail, Chrome, MessageCircle } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose }) => {
  const { signIn, signUp, signInWithGoogle, signInWithKakao } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      let result;
      if (isLogin) {
        result = await signIn(email, password);
      } else {
        result = await signUp(email, password);
      }
      
      if (result.error) throw result.error;
      
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setError(null);
    try {
      let result;
      if (provider === 'google') result = await signInWithGoogle();
      if (provider === 'kakao') result = await signInWithKakao();
      
      if (result?.error) throw result.error;
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
              {isLogin ? '환영합니다' : '회원가입'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              뇌종양 환우와 가족들을 위한 희망의 공간
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일 주소"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold transition-colors disabled:opacity-50"
            >
              {loading ? '처리 중...' : (isLogin ? '이메일로 로그인' : '가입하기')}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-slate-900 text-slate-500">또는</span>
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => handleSocialLogin('kakao')}
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-[#FEE500] hover:bg-[#FDD800] text-black font-bold transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              카카오로 시작하기
            </button>
            <button 
              onClick={() => handleSocialLogin('google')}
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold transition-colors"
            >
              <Chrome className="w-5 h-5" />
              구글로 시작하기
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
            {isLogin ? "계정이 없으신가요? " : "이미 계정이 있으신가요? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-sky-600 dark:text-sky-400 hover:underline"
            >
              {isLogin ? '회원가입' : '로그인'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
