import React, { useState, useEffect, useMemo } from 'react';
import { BarChart3, Users, PieChart, TrendingUp, Loader2, AlertCircle } from 'lucide-react';
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

  const stats = useMemo(() => {
    if (receipts.length === 0) return null;

    let totalAmountSum = 0;
    let patientBurdenSum = 0;
    let nonCoveredSum = 0;
    let validBurdenCount = 0;

    receipts.forEach(r => {
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

    const count = receipts.length;
    const countWithItems = validBurdenCount || 1;

    return {
      patientCount: count,
      avgTotalAmount: Math.round(totalAmountSum / count),
      avgPatientBurden: Math.round(patientBurdenSum / countWithItems),
      avgNonCovered: Math.round(nonCoveredSum / countWithItems),
      // 중앙값 대신 임시로 평균으로 대체
      medianPatientBurden: Math.round(patientBurdenSum / countWithItems), 
    };
  }, [receipts]);

  const formatCurrency = (num) => {
    if (isNaN(num)) return '0원';
    return new Intl.NumberFormat('ko-KR').format(num) + '원';
  };

  // 분석된 내 진료비 총액 계산 (비교용)
  const myTotalAmount = analyzedReceipt ? Number(analyzedReceipt.basicInfo?.진료비총액?.replace(/,/g, '')) || 0 : 0;
  
  const renderComparison = () => {
    if (!myTotalAmount || !stats) return null;
    
    const diff = myTotalAmount - stats.avgTotalAmount;
    const diffPercent = Math.round((Math.abs(diff) / stats.avgTotalAmount) * 100);
    
    if (diff > 0) {
      return (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-900 font-bold">내 진료비 비교 분석</p>
            <p className="text-amber-800 text-sm mt-1">
              등록하신 진료비({formatCurrency(myTotalAmount)})는 전체 평균 대비 <strong>약 {diffPercent}% ({formatCurrency(diff)}) 더 높습니다.</strong>
              비급여 항목(MRI, 상급병실료 등)의 비중이 높은지 상세 내역을 확인해보세요.
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-emerald-900 font-bold">내 진료비 비교 분석</p>
            <p className="text-emerald-800 text-sm mt-1">
              등록하신 진료비({formatCurrency(myTotalAmount)})는 전체 평균 대비 <strong>약 {diffPercent}% ({formatCurrency(Math.abs(diff))}) 더 낮습니다.</strong>
              급여 항목 위주의 효율적인 진료가 이루어졌거나, 진료 기간이 상대적으로 짧을 수 있습니다.
            </p>
          </div>
        </div>
      );
    }
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
            환자들이 제공한 영수증 데이터를 기반으로 실시간 산출된 의료비 흐름입니다.
          </p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-lg flex items-center gap-2 font-bold text-sm">
          <Users className="w-4 h-4" />
          누적 데이터: {stats ? stats.patientCount : 0}건
        </div>
      </div>

      <div className="p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-indigo-500" />
            <p>데이터베이스에서 실시간 통계를 불러오는 중...</p>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg text-center">{error}</div>
        ) : !stats ? (
          <div className="p-12 text-center text-slate-500 bg-slate-50 rounded-xl">
            아직 수집된 영수증 데이터가 없습니다. 첫 영수증을 등록해주세요!
          </div>
        ) : (
          <>
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-4 border-b-2 border-indigo-500 inline-block pb-1">
              전체 뇌종양 수술 및 입원 비용 평균
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
              <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <PieChart className="w-4 h-4 text-slate-400" />
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">평균 총 진료비</p>
                </div>
                <p className="text-2xl font-black text-slate-800 dark:text-slate-100">{formatCurrency(stats.avgTotalAmount)}</p>
              </div>
              
              <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <p className="text-emerald-800 dark:text-emerald-300 text-sm font-medium">평균 본인부담금 (급여)</p>
                </div>
                <p className="text-2xl font-black text-emerald-900 dark:text-emerald-100">{formatCurrency(stats.avgPatientBurden)}</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">건강보험 산정특례 5% 적용</p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-100 dark:border-amber-900/50">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-amber-600" />
                  <p className="text-amber-800 dark:text-amber-300 text-sm font-medium">평균 비급여 비용</p>
                </div>
                <p className="text-2xl font-black text-amber-900 dark:text-amber-100">{formatCurrency(stats.avgNonCovered)}</p>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">1인실, 선택진료, 비급여재료 등</p>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <p className="text-indigo-800 dark:text-indigo-300 text-sm font-medium">실제 환자 부담액 평균</p>
                </div>
                <p className="text-2xl font-black text-indigo-900 dark:text-indigo-100">{formatCurrency(stats.avgPatientBurden + stats.avgNonCovered)}</p>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">본인부담금 + 비급여 합산</p>
              </div>
            </div>

            {renderComparison()}

            <div className="mt-8 bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4">비급여 주요 항목 (빈도순 - 예시)</h4>
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
