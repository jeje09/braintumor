import React from 'react';
import { useApp } from '../context/AppContext';
import { ExternalLink, Heart } from 'lucide-react';

export const Footer = () => {
  const { quickLinks, setActiveTab } = useApp();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md pt-12 pb-8 text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌿</span>
              <span className="font-black text-base text-slate-800 dark:text-slate-100">
                쭈니의 건강 이야기
              </span>
            </div>
            <p className="leading-relaxed">
              몸과 마음의 면역 자생력을 높이는 올바른 자연치유 정보와 검증된 웰니스 수제 아로마 & 건강 라이프를 제시합니다.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">주요 힐링 패널</h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => setActiveTab('health')} className="hover:text-emerald-600 transition-colors">
                  건강이야기 칼럼
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calories')} className="hover:text-emerald-600 transition-colors">
                  음식 칼로리 계산기
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('travel')} className="hover:text-emerald-600 transition-colors">
                  전국 힐링 여행지
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('perfume')} className="hover:text-emerald-600 transition-colors">
                  천연 아로마 향수
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('shopping')} className="hover:text-emerald-600 transition-colors">
                  웰니스 쇼핑몰
                </button>
              </li>
            </ul>
          </div>

          {/* External Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">바로가기 채널</h4>
            <div className="flex flex-col gap-2">
              <a
                href={quickLinks.coupang}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold hover:underline"
              >
                <span>쿠팡 파트너스 추천 페이지</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={quickLinks.inpock}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-bold hover:underline"
              >
                <span>인포크링크 공식 멀티채널</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>© 2026 쭈니의 건강 이야기 (JJUNI Naturopathy). All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current inline" />
            <span>for Naturopathy & Healing</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
