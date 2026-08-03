import React from 'react';
import { useApp } from '../context/AppContext';
import { ExternalLink, Heart, ShieldAlert } from 'lucide-react';

export const Footer = () => {
  const { communityLinks } = useApp();

  return (
    <footer className="mt-20 w-full bg-[#1c2a38] text-white">
      <div className="border-b border-slate-700">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-12 text-[13px] font-bold text-slate-300 gap-6">
            <a href="#" className="hover:text-white">개인정보처리방침</a>
            <a href="#" className="hover:text-white">이용약관</a>
            <a href="#" className="hover:text-white">이메일무단수집거부</a>
            <a href="#" className="hover:text-white">찾아오시는길</a>
         </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row justify-between gap-10">
        
        {/* Company info */}
        <div className="text-[13px] text-slate-400 space-y-1.5 leading-relaxed">
           <p className="font-bold text-slate-200 mb-4">㈜리빙위드 | 홍길동</p>
           <p>서울특별시 강남구 테헤란로 20길 20 삼정빌딩 2층</p>
           <p>사업자등록번호: 887-86-01185</p>
           <p>통신판매업 신고번호: 제 2026-서울강남-06569호</p>
           <p>직업정보제공사업 신고번호: J1200020210021</p>
           <p>E-mail: contact@livingwith.com</p>
           <p className="mt-4 pt-4">Copyright©LIVINGWITH. All rights reserved.</p>
        </div>

        {/* Customer Center */}
        <div className="flex flex-col md:items-end">
           <h3 className="text-sm font-bold text-slate-300 mb-1">고객센터</h3>
           <p className="text-[32px] font-black text-white mb-2 leading-none">1644-3511</p>
           <p className="text-[11px] text-slate-400">상담시간 08:00 - 20:00</p>
        </div>
      </div>
    </footer>
  );
};
