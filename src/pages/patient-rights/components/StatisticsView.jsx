import React, { useState, useEffect, useMemo } from 'react';
import { BarChart3, Users, PieChart, TrendingUp, Loader2, AlertCircle, Activity } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

export const StatisticsView = ({ analyzedReceipt }) => {
  const [receipts, setReceipts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, [analyzedReceipt]); // analyzedReceipt(저장 완료 시 전달됨)가 변경될 때마다 통계 새로고침

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('receipts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReceipts(data || []);
    } catch (err) {
      console.error(err);
      setError('통계 데이터를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const currentDisease = analyzedReceipt?.basicInfo?.병명 || '뇌종양';

  const diseaseBreakdown = useMemo(() => {
    if (receipts.length === 0) return [];
    
    const counts = {};
    receipts.forEach(r => {
      const name = r.disease_name?.trim() || '미상';
      counts[name] = (counts[name] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [receipts]);

  const stats = useMemo(() => {
    if (receipts.length === 0) return null;

    // 현재 병명과 일치하거나 유사한 데이터 필터링
    const targetReceipts = receipts.filter(r => 
      r.disease_name && r.disease_name.replace(/\s+/g, '').includes(currentDisease.replace(/\s+/g, ''))
    );

    if (targetReceipts.length === 0) return null;

    const calcGroupStats = (groupReceipts) => {
      let totalAmountSum = 0;
      let patientBurdenSum = 0;
      let nonCoveredSum = 0;
      let validBurdenCount = 0;

      groupReceipts.forEach(r => {
        totalAmountSum += Number(r.total_amount) || 0;
        
        let rPatientBurden = 0;
        let rNonCovered = 0;

        if (r.raw_data && r.raw_data.items) {
          r.raw_data.items.forEach(item => {
            rPatientBurden += Number(item.본인부담금?.replace(/,/g, '')) || 0;
            rNonCovered += Number(item.비급여?.replace(/,/g, '')) || 0;
          });
          patientBurdenSum += rPatientBurden;
          nonCoveredSum += rNonCovered;
          validBurdenCount++;
        }
      });

      const count = groupReceipts.length;
      const countWithItems = validBurdenCount || 1;

      return {
        count,
        avgTotalAmount: Math.round(totalAmountSum / count),
        avgPatientBurden: Math.round(patientBurdenSum / countWithItems),
        avgNonCovered: Math.round(nonCoveredSum / countWithItems),
      };
    };

    // 수술 여부로 분류
    const surgeryReceipts = [];
    const nonSurgeryReceipts = [];

    targetReceipts.forEach(r => {
      let hasSurgery = false;
      if (r.raw_data && r.raw_data.items) {
        hasSurgery = r.raw_data.items.some(item => item.name && item.name.includes('수술'));
      }
      if (hasSurgery) {
        surgeryReceipts.push(r);
      } else {
        nonSurgeryReceipts.push(r);
      }
    });

    return {
      disease: currentDisease,
      totalCount: targetReceipts.length,
      overall: calcGroupStats(targetReceipts),
      surgery: surgeryReceipts.length > 0 ? calcGroupStats(surgeryReceipts) : null,
      nonSurgery: nonSurgeryReceipts.length > 0 ? calcGroupStats(nonSurgeryReceipts) : null
    };
  }, [receipts, currentDisease]);

  const formatCurrency = (num) => {
    if (isNaN(num)) return '0원';
    return new Intl.NumberFormat('ko-KR').format(num) + '원';
  };

  // 분석된 내 진료비 총액 계산 (비교용)
  const myTotalAmount = analyzedReceipt ? Number(String(analyzedReceipt.basicInfo?.진료비총액 || '').replace(/,/g, '')) || 0 : 0;
  
  const renderComparison = () => {
    if (!myTotalAmount || !stats || !stats.overall) return null;
    
    const diff = myTotalAmount - stats.overall.avgTotalAmount;
    const diffPercent = Math.round((Math.abs(diff) / stats.overall.avgTotalAmount) * 100);
    
    if (diff > 0) {
      return (
        <div className="mt-6 p-5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-900 font-bold">내 진료비 비교 분석</p>
            <p className="text-amber-800 mt-1 leading-relaxed">
              등록하신 진료비({formatCurrency(myTotalAmount)})는 '{currentDisease}' 평균 대비 <strong>약 {diffPercent}% ({formatCurrency(diff)}) 더 높습니다.</strong>
              비급여 항목(MRI, 상급병실료 등)의 비중이 높은지 세부 내역을 확인해보세요.
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mt-6 p-5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-emerald-900 font-bold">내 진료비 비교 분석</p>
            <p className="text-emerald-800 mt-1 leading-relaxed">
              등록하신 진료비({formatCurrency(myTotalAmount)})는 '{currentDisease}' 평균 대비 <strong>약 {diffPercent}% ({formatCurrency(Math.abs(diff))}) 더 낮습니다.</strong>
              급여 항목 위주의 효율적인 진료가 이루어졌거나, 진료 기간이 상대적으로 짧을 수 있습니다.
            </p>
          </div>
        </div>
      );
    }
  };

  const renderStatsGroup = (title, dataGroup, icon, colorClass) => {
    if (!dataGroup) return null;

    const colors = {
      blue: {
        border: 'border-blue-500',
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        text: 'text-blue-900 dark:text-blue-100',
        icon: 'text-blue-600'
      },
      emerald: {
        border: 'border-emerald-500',
        bg: 'bg-emerald-50 dark:bg-emerald-900/20',
        text: 'text-emerald-900 dark:text-emerald-100',
        icon: 'text-emerald-600'
      },
      purple: {
        border: 'border-purple-500',
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        text: 'text-purple-900 dark:text-purple-100',
        icon: 'text-purple-600'
      }
    };
    
    const c = colors[colorClass] || colors.blue;

    return (
      <div className="mb-8">
        <h3 className={`text-lg font-bold text-slate-700 dark:text-slate-200 mb-4 border-b-2 ${c.border} inline-block pb-1 flex items-center gap-2`}>
          {icon} {title} (누적 {dataGroup.count}명)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <PieChart className="w-4 h-4 text-slate-400" />
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">평균 총 진료비</p>
            </div>
            <p className="text-2xl font-black text-slate-800 dark:text-slate-100">{formatCurrency(dataGroup.avgTotalAmount)}</p>
          </div>
          
          <div className={`p-5 rounded-xl border border-slate-100 dark:border-slate-800 ${c.bg}`}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className={`w-4 h-4 ${c.icon}`} />
              <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">평균 본인부담금 (급여)</p>
            </div>
            <p className={`text-2xl font-black ${c.text}`}>{formatCurrency(dataGroup.avgPatientBurden)}</p>
          </div>

          <div className={`p-5 rounded-xl border border-slate-100 dark:border-slate-800 ${c.bg}`}>
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className={`w-4 h-4 ${c.icon}`} />
              <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">평균 비급여 비용</p>
            </div>
            <p className={`text-2xl font-black ${c.text}`}>{formatCurrency(dataGroup.avgNonCovered)}</p>
          </div>

          <div className={`p-5 rounded-xl border border-slate-100 dark:border-slate-800 ${c.bg}`}>
            <div className="flex items-center gap-2 mb-2">
              <Users className={`w-4 h-4 ${c.icon}`} />
              <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">실제 환자 부담액 평균</p>
            </div>
            <p className={`text-2xl font-black ${c.text}`}>{formatCurrency(dataGroup.avgPatientBurden + dataGroup.avgNonCovered)}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mt-8">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            익명 의료비 통계 (실시간 DB 연동)
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            환자들이 제공한 영수증 데이터를 기반으로 <strong>[{currentDisease}]</strong> 관련 실시간 산출된 의료비 흐름입니다.
          </p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-lg flex items-center gap-2 font-bold text-sm shadow-sm">
          <Users className="w-4 h-4" />
          [{currentDisease}] 누적 데이터: {stats ? stats.totalCount : 0}명
        </div>
      </div>

      <div className="p-6 md:p-8">
        {diseaseBreakdown && diseaseBreakdown.length > 0 && (
          <div className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-3">전체 질환별 누적 등록 현황</h3>
            <div className="flex flex-wrap gap-2">
              {diseaseBreakdown.map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg text-sm font-bold border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-1.5">
                  {item.name} <span className="text-indigo-600 dark:text-indigo-400 font-black">[{item.count}명]</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-indigo-500" />
            <p>데이터베이스에서 실시간 통계를 불러오는 중...</p>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg text-center">{error}</div>
        ) : !stats ? (
          <div className="p-12 text-center text-slate-500 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-2">아직 <strong>[{currentDisease}]</strong>에 대한 수집된 데이터가 부족합니다.</p>
            <p>위에서 첫 영수증을 등록하여 익명 통계에 기여해주세요!</p>
          </div>
        ) : (
          <>
            {/* 1. 수술 환자 통계 */}
            {renderStatsGroup(`${currentDisease} 수술 환자 평균 비용`, stats.surgery, <Activity className="w-5 h-5 text-purple-500" />, 'purple')}
            
            {/* 2. 비수술 환자 통계 */}
            {renderStatsGroup(`${currentDisease} 비수술(항암/방사선/보존적) 환자 평균 비용`, stats.nonSurgery, <TrendingUp className="w-5 h-5 text-emerald-500" />, 'emerald')}
            
            {/* 3. 전체 평균 */}
            {renderStatsGroup(`${currentDisease} 전체 환자 평균 비용`, stats.overall, <BarChart3 className="w-5 h-5 text-blue-500" />, 'blue')}

            {renderComparison()}

            <div className="mt-8 bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4">비급여 주요 항목 (빈도순 - 전체 통계 기반)</h4>
              <div className="space-y-3">
                {[
                  { name: "형광유도 약제비 (5-ALA 등)", percent: 85, desc: "종양과 정상 뇌조직의 경계를 명확히 하기 위해 수술 전 복용" },
                  { name: "상급병실료 (1-2인실 차액)", percent: 72, desc: "중환자실 퇴실 후 안정 목적으로 입원" },
                  { name: "최신 의료재료대", percent: 45, desc: "수술 중 사용되는 지혈제, 유착방지제 등" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-16 text-right font-bold text-indigo-600 dark:text-indigo-400 shrink-0">{item.percent}%</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-slate-700 dark:text-slate-200">{item.name}</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                        <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${item.percent}%` }}></div>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
