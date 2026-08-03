import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { ReceiptAnalyzer } from './components/ReceiptAnalyzer';
import { StatisticsView } from './components/StatisticsView';

export const PatientRights = () => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-fade-in pb-16">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sm font-medium mb-6 text-blue-100">
            <ShieldCheck className="w-4 h-4" />
            <span>환자 진료비에 대한 정보 제공</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
            환자권리 데이터센터
          </h1>
          
          <p className="text-lg md:text-xl text-indigo-100/90 leading-relaxed font-medium">
            환자가 자신의 치료 과정과 의료비를 명확히 이해할 수 있도록 돕는 투명성 플랫폼입니다.
          </p>
          
          <div className="mt-8 flex items-start gap-3 bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
            <Info className="w-6 h-6 text-blue-200 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-100">
              정보의 비대칭을 줄이고, 투명한 데이터를 통해 환자와 의료진 모두가 신뢰할 수 있는 좋은 의료 생태계를 만드는 것이 우리의 목표입니다.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section>
        {/* 1. 나의 의료비 리포트 & 환자 질문 도우미 */}
        <ReceiptAnalyzer />

        {/* 2. 익명 의료비 통계 */}
        <StatisticsView />
        
        {/* 3. 투명한 병원 참여 */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 border border-blue-100 dark:border-blue-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-2">투명한 의료 문화를 만드는 병원들의 참여를 환영합니다.</h3>
            <p className="text-blue-700 dark:text-blue-300">
              "우리 병원은 치료 과정과 비용을 투명하게 공개합니다."<br />
              환자와의 신뢰를 최우선으로 생각하는 의료 기관이라면, 데이터센터에 공식적으로 참여하여 환자들과 투명하게 소통할 수 있습니다.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
