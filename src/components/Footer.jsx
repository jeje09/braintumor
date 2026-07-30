import React from 'react';
import { useApp } from '../context/AppContext';
import { ExternalLink, Heart, ShieldAlert } from 'lucide-react';

export const Footer = () => {
  const { communityLinks } = useApp();

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎗️</span>
              <span className="font-black text-lg text-slate-900 dark:text-white">
                뇌종양 <span className="text-violet-600 dark:text-violet-400">동행</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              교모세포종(GBM) 및 뇌종양 환우와 보호자들을 위한 검증된 의학 정보, 최신 임상연구, 항암 영양 가이드, 그리고 서로의 희망을 나누는 동행 공간입니다.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
              주요 환우 커뮤니티 & 관련 기관
            </h4>
            <ul className="space-y-2">
              {communityLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  >
                    <span>• {link.name}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Medical Disclaimer */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-bold">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>의학적 법적 고지</span>
            </div>
            <p className="text-[11px] text-amber-800 dark:text-amber-300/80 leading-relaxed">
              본 웹사이트에서 제공하는 정보는 학술적 참고 및 정보 제공 목적으로 작성되었으며, 전문 의료진의 진단 및 치료를 대체할 수 없습니다. 모든 치료 결정은 반드시 담당 전문의와 상의하십시오.
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 뇌종양 동행 (Brain Tumor Companion). All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>누나와 모든 환우분들의 쾌유를 진심으로 기원합니다.</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>

      </div>
    </footer>
  );
};
