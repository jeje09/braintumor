import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './auth/AuthModal';
import { Search, Bell, Menu, X, Globe, Smartphone, User, LogOut, Lock, Sun, Moon } from 'lucide-react';

export const Navbar = () => {
  const { activeTab, setActiveTab, darkMode, setDarkMode } = useApp();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // 메인 네비게이션 항목 (아이콘 제거, 텍스트 중심)
  const mainNavItems = [
    { id: 'gbm', label: '교모세포종(GBM)' },
    { id: 'tumors', label: '뇌종양 백과' },
    { id: 'research', label: '연구·임상' },
    { id: 'nutrition', label: '항암 식단' },
    { id: 'hospital', label: '병원·전문의' },
    { id: 'stories', label: '희망 이야기' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  const isAdmin = user && (user.email === 'jeje09@gmail.com' || user.email === 'admin@test.com' || user.email?.includes('admin'));

  return (
    <>
      <header className="w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        
        {/* Top Utility Bar (아주 얇은 상단 바) */}
        <div className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 cursor-pointer hover:text-emerald-600 transition-colors">
                <Smartphone className="w-3.5 h-3.5" /> 앱 다운로드
              </span>
              <span className="hidden sm:inline-block cursor-pointer hover:text-emerald-600 transition-colors">
                고객센터
              </span>
            </div>
            <div className="flex items-center gap-4">
              {isAdmin && (
                <button onClick={() => handleNavClick('admin')} className="text-rose-600 font-bold flex items-center gap-1 hover:underline">
                  <Lock className="w-3 h-3" /> 관리자페이지
                </button>
              )}
              {user ? (
                <>
                  <span className="text-slate-800 dark:text-slate-200 font-bold">
                    {user.email?.split('@')[0]}님
                  </span>
                  <button onClick={() => signOut()} className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setIsAuthModalOpen(true)} className="hover:text-emerald-600 transition-colors">
                    로그인
                  </button>
                  <button onClick={() => setIsAuthModalOpen(true)} className="hover:text-emerald-600 transition-colors">
                    회원가입
                  </button>
                </>
              )}
              
              <div className="w-px h-3 bg-slate-300 dark:bg-slate-700"></div>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="hover:text-emerald-600 transition-colors flex items-center gap-1"
              >
                {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline-block">{darkMode ? '라이트모드' : '다크모드'}</span>
              </button>
              <div className="w-px h-3 bg-slate-300 dark:bg-slate-700"></div>
              <span className="flex items-center gap-1 cursor-pointer">
                <Globe className="w-3.5 h-3.5" /> KO
              </span>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Area */}
            <div
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                <span className="text-xl">🌱</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                  Living <span className="text-emerald-600">With</span>
                </span>
                <span className="text-[10px] text-slate-500 font-bold tracking-widest mt-0.5">
                  뇌종양 정보 플랫폼
                </span>
              </div>
            </div>

            {/* Desktop Navigation (Text Only) */}
            <nav className="hidden lg:flex items-center gap-8 ml-10">
              {mainNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-[15px] font-bold transition-colors hover:text-emerald-600 ${
                      isActive ? 'text-emerald-600' : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Icons (Search & Notice) */}
            <div className="hidden lg:flex items-center gap-5 ml-auto">
              <button className="text-slate-400 hover:text-emerald-600 transition-colors">
                <Search className="w-6 h-6" />
              </button>
              <button className="text-slate-400 hover:text-emerald-600 transition-colors relative">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border border-white dark:border-slate-950"></span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 ml-auto"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 absolute w-full left-0 shadow-lg">
            <div className="flex flex-col py-2">
              {mainNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-6 py-4 text-left text-sm font-bold border-b border-slate-50 dark:border-slate-900 ${
                    activeTab === item.id ? 'text-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};
