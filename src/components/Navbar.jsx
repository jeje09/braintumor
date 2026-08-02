import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './auth/AuthModal';
import {
  Activity, BookOpen, ShieldAlert, Sparkles, Youtube,
  Hospital, ShoppingBag, MessageSquare, Lock, Sun, Moon, Menu, X, Brain, User, LogOut
} from 'lucide-react';

export const Navbar = () => {
  const { activeTab, setActiveTab, darkMode, setDarkMode } = useApp();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const navItems = [
    { id: 'gbm', label: '교모세포종(GBM)', icon: Brain, highlight: true },
    { id: 'tumors', label: '뇌종양 백과', icon: BookOpen },
    { id: 'research', label: '최신 연구·임상', icon: Sparkles },
    { id: 'nutrition', label: '항암 영양식단', icon: Activity },
    { id: 'youtube', label: '추천 영상', icon: Youtube },
    { id: 'hospital', label: '병원·전문의', icon: Hospital },
    { id: 'shopping', label: '동행 쇼핑', icon: ShoppingBag },
    { id: 'stories', label: '희망 이야기', icon: MessageSquare },
    { id: 'admin', label: '관리자', icon: Lock },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Tier 1: Logo & Actions */}
          <div className="flex items-center justify-between h-16 pt-2">
            
            {/* Logo */}
            <div
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
                <span className="text-xl animate-float">🌱</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                    Living <span className="text-emerald-600">With</span>
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 whitespace-nowrap hidden sm:inline-block">
                    GBM Special
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                  뇌종양 & 교모세포종 환우와 보호자를 위한 공간
                </p>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Auth Button */}
              {user ? (
                <div className="flex items-center gap-2 mr-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 hidden sm:flex">
                    <User className="w-4 h-4" />
                    <span className="text-xs font-bold truncate max-w-[100px]">
                      {user.email?.split('@')[0]}
                    </span>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="p-2 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors"
                    title="로그아웃"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="mr-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all active:scale-95"
                >
                  로그인
                </button>
              )}

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="다크 모드 전환"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Tier 2: Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-between gap-2 pb-3 pt-4 overflow-x-auto scrollbar-none w-full border-t border-slate-100 dark:border-slate-800/60 mt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex flex-col items-center justify-center gap-2 px-4 py-3 rounded-2xl transition-all min-w-[100px] hover:-translate-y-1 ${
                    isActive
                      ? item.highlight
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                        : 'bg-slate-800 dark:bg-white text-white dark:text-slate-900 shadow-lg shadow-slate-900/20'
                      : item.highlight
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-100'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? '' : item.highlight ? 'text-emerald-500' : 'text-slate-400 group-hover:text-emerald-500'}`} />
                  <span className="text-[13px] font-extrabold whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-2 animate-slide-right">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl text-xs font-bold transition-all text-center ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-1" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
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
