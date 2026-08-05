import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, User } from 'lucide-react';

export const RoleSetupModal = () => {
  const { user, profile, saveProfile } = useAuth();
  const [role, setRole] = useState('환자');
  const [nickname, setNickname] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // 로그인되어 있지만 프로필(역할)이 없는 경우에만 표시
  if (!user || profile) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nickname.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }
    
    setIsSaving(true);
    setError('');
    const { error: saveError } = await saveProfile(role, nickname.trim());
    if (saveError) {
      setError('프로필 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-scale-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
        
        <h2 className="text-2xl font-black text-center text-slate-900 dark:text-white mb-2">
          프로필 설정
        </h2>
        <p className="text-center text-slate-500 dark:text-slate-400 mb-8 text-sm">
          환자권리 데이터센터 활동을 위해 닉네임과 역할을 설정해주세요.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              역할 선택
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('환자')}
                className={`py-3 px-4 rounded-xl border-2 font-bold flex items-center justify-center gap-2 transition-all ${
                  role === '환자'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <User className="w-4 h-4" /> 환자 본인
              </button>
              <button
                type="button"
                onClick={() => setRole('보호자')}
                className={`py-3 px-4 rounded-xl border-2 font-bold flex items-center justify-center gap-2 transition-all ${
                  role === '보호자'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <ShieldCheck className="w-4 h-4" /> 보호자
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              닉네임
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="게시판에서 사용할 닉네임"
              className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black transition-colors disabled:opacity-50"
          >
            {isSaving ? '저장 중...' : '시작하기'}
          </button>
        </form>
      </div>
    </div>
  );
};
