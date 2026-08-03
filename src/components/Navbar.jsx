import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './auth/AuthModal';
import { Search, Bell, Menu, X, Globe, Smartphone, User, LogOut, Lock, Sun, Moon, HeartPulse } from 'lucide-react';

export const Navbar = () => {
  const { activeTab, setActiveTab, darkMode, setDarkMode } = useApp();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // 메인 네비게이션 항목 (아이콘 제거, 텍스트 중심)
  const mainNavItems = [
    { id: 'tumors', label: '뇌종양 백과' },
    { id: 'research', label: '연구·임상' },
    { id: 'nutrition', label: '면역력 식단' },
    { id: 'shopping', label: '맞춤 쇼핑' },
    { id: 'hospital', label: '병원·전문의' },
    { id: 'support', label: '의료비 지원' },
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
        <div className="border-b border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-end text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-4">

              <span className="hidden sm:inline-block cursor-pointer hover:text-blue-700 transition-colors">고객센터</span>
              <div className="w-px h-3 bg-slate-200 dark:bg-slate-700"></div>
              
              {isAdmin && (
                <>
                  <button onClick={() => handleNavClick('admin')} className="text-slate-600 font-bold flex items-center gap-1 hover:underline">
                    <Lock className="w-3 h-3" /> 관리자페이지
                  </button>
                  <div className="w-px h-3 bg-slate-200 dark:bg-slate-700"></div>
                </>
              )}
              {user ? (
                <>
                  <span className="cursor-pointer hover:text-blue-700 transition-colors">마이페이지</span>
                  <div className="w-px h-3 bg-slate-200 dark:bg-slate-700"></div>
                  <button onClick={() => signOut()} className="hover:text-blue-700 transition-colors flex items-center gap-1">
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setIsAuthModalOpen(true)} className="hover:text-blue-700 transition-colors">
                    마이페이지
                  </button>
                  <div className="w-px h-3 bg-slate-200 dark:bg-slate-700"></div>
                  <button onClick={() => setIsAuthModalOpen(true)} className="hover:text-blue-700 transition-colors">
                    로그인
                  </button>
                </>
              )}
              
              <div className="w-px h-3 bg-slate-200 dark:bg-slate-700"></div>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="hover:text-blue-700 transition-colors flex items-center gap-1"
              >
                {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
              <div className="w-px h-3 bg-slate-200 dark:bg-slate-700"></div>
              <span className="flex items-center gap-1 cursor-pointer border border-slate-200 rounded px-1.5 py-0.5">
                <Globe className="w-3 h-3" /> KO
              </span>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            
            {/* Logo Area */}
            <div
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <img src="/logo.png" alt="logo" className="w-12 h-12 object-contain rounded-md" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[22px] font-black tracking-tight text-[#1E3A8A] dark:text-white leading-none">
                  Living with
                </span>
                <span className="text-[22px] font-black tracking-tight text-[#1E3A8A] dark:text-white leading-tight mt-1">
                  Brain Tumor
                </span>
              </div>
            </div>

            {/* Desktop Navigation (Text Only) */}
            <nav className="hidden lg:flex flex-1 items-center justify-end gap-3 xl:gap-6 ml-6 whitespace-nowrap">
              {mainNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-[15px] font-bold transition-colors hover:text-blue-700 ${
                      isActive ? 'text-blue-700' : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Icons Removed per user request */}

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
                  className={`px-6 py-4 text-left text-base font-bold border-b border-slate-50 dark:border-slate-900 ${
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
