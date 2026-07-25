import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  HeartPulse, 
  Utensils, 
  Compass, 
  Sparkles, 
  ShoppingBag, 
  ShieldCheck, 
  ExternalLink, 
  Sun, 
  Moon,
  Menu,
  X
} from 'lucide-react';

export const Navbar = () => {
  const { activeTab, setActiveTab, quickLinks, darkMode, setDarkMode } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'health', label: '건강이야기', icon: HeartPulse, color: 'text-emerald-500' },
    { id: 'calories', label: '음식칼로리', icon: Utensils, color: 'text-amber-500' },
    { id: 'travel', label: '힐링여행지', icon: Compass, color: 'text-teal-500' },
    { id: 'perfume', label: '향수이야기', icon: Sparkles, color: 'text-purple-500' },
    { id: 'shopping', label: '쇼핑몰', icon: ShoppingBag, color: 'text-pink-500' },
    { id: 'admin', label: '관리자', icon: ShieldCheck, color: 'text-blue-500' },
  ];

  return (
    <header className="sticky top-0 z-40 glass-nav">
      {/* Top Banner / Quick Links Bar */}
      <div className="bg-emerald-600 dark:bg-emerald-950 text-white text-xs py-1.5 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="font-medium tracking-wide flex items-center gap-1.5">
            <span className="inline-block animate-pulse">🌿</span>
            <span>자연치유 & 웰니스 라이프 - 쭈니의 건강 이야기</span>
          </span>
          
          <div className="flex items-center gap-2">
            <a
              href={quickLinks.coupang}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-0.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-sm text-[11px]"
            >
              <span>쿠팡 파트너스</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={quickLinks.inpock}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white px-2.5 py-0.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-sm text-[11px]"
            >
              <span>인포크링크</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <button 
            onClick={() => setActiveTab('health')}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <span className="text-xl">🌿</span>
            </div>
            <div>
              <h1 className="font-extrabold text-lg sm:text-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent tracking-tight">
                쭈니의 건강 이야기
              </h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 tracking-wider">
                NATUROPATHY & HEALING LIFE
              </p>
            </div>
          </button>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25 scale-105'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.color}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Utilities */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg px-4 pt-2 pb-4 space-y-1.5 shadow-2xl animate-in slide-in-from-top duration-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : tab.color}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
