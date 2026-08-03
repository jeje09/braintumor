import React from 'react';
import { ShieldAlert, HeartHandshake, CheckCircle2, AlertTriangle, FileText, Landmark, Activity, Heart, Stethoscope } from 'lucide-react';

export const Support = () => {
  return (
    <div className="space-y-12 pb-16 max-w-5xl mx-auto">
      
      {/* Header */}
      <section className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 text-xs font-bold">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>의료비 지원 가이드</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          뇌종양 환자 국가·지자체 의료비 지원
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
          뇌종양과 같은 중증 질환은 치료 과정에서 막대한 비용이 발생할 수 있습니다. 환자와 보호자의 부담을 덜어주는 핵심 지원 제도를 정리했습니다.
        </p>
      </section>

      {/* Critical Warning about Private Insurance */}
      <section className="p-6 rounded-3xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 space-y-4">
        <div className="flex items-center gap-2 text-red-800 dark:text-red-300 font-extrabold text-lg">
          <ShieldAlert className="w-6 h-6 text-red-600" />
          <span>사설 실손의료보험(실비) 중복 보상 불가 안내</span>
        </div>
        <p className="text-sm text-red-700 dark:text-red-200 leading-relaxed font-medium">
          <strong>매우 주의하세요:</strong> '재난적 의료비 지원' 및 '보건소 암환자 의료비 지원' 등 대다수의 국가/지자체 현금 지원 제도는 개인적으로 가입한 <strong>사설 실손보험금(실비)과 중복으로 지급되지 않습니다.</strong>
        </p>
        <div className="p-4 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-red-100 dark:border-red-900/30 text-sm text-slate-700 dark:text-slate-300 space-y-3">
          <p>• 사설 보험에서 이미 보상받은 금액은 국가 지원금 산정 시 <strong>전액 차감</strong>됩니다.</p>
          <p>• 사설 보험 보장 한도가 남아있음에도 불구하고 국가 지원을 먼저 받은 경우, 추후 보험사에서 해당 금액만큼 공제하고 지급하거나 환수를 요구할 수 있습니다.</p>
          <p className="font-bold text-red-600 dark:text-red-400">결론: 본인의 실손보험 보장 범위와 한도를 먼저 정확히 파악한 후, 한도를 초과하거나 보장되지 않는 비급여 항목에 대해서만 국가 지원(재난적 의료비 등)을 신청하는 것이 올바른 순서입니다.</p>
        </div>
      </section>

      {/* Support Programs */}
      <div className="space-y-8">
        
        {/* 1. 산정특례 */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl shrink-0">
              <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="space-y-4 flex-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">1. 중증질환자 산정특례 제도</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                진료비 부담이 큰 중증질환(암, 뇌혈관질환 등)에 대해 환자가 부담하는 진료비(급여 항목)를 대폭 낮춰주는 건강보험공단의 핵심 제도입니다. 뇌종양 확진 시 병원에서 즉시 등록을 도와줍니다.
              </p>
              
              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      <th className="p-4 border-b border-r border-slate-200 dark:border-slate-700 font-bold w-1/4">구분</th>
                      <th className="p-4 border-b border-slate-200 dark:border-slate-700 font-bold">내용</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4 border-b border-r border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 font-medium">대상</td>
                      <td className="p-4 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">뇌종양을 포함한 악성 신생물(암) 확진 환자</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-r border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 font-medium">지원 내용</td>
                      <td className="p-4 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                        <strong className="text-blue-600 dark:text-blue-400 block mb-1">건강보험 적용 급여 항목의 본인부담률 5%로 경감</strong>
                        (단, 비급여 항목, 전액 본인부담 항목은 지원 제외)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border-r border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 font-medium">적용 기간</td>
                      <td className="p-4 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">등록일로부터 5년간 (재발, 전이 시 연장 가능)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* 2. 본인부담상한제 */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl shrink-0">
              <Landmark className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="space-y-4 flex-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">2. 본인부담상한제</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                과도한 의료비로 인한 가계의 경제적 부담을 덜어주기 위해 1년간(1월 1일 ~ 12월 31일) 환자가 부담한 건강보험 본인부담금이 개인별 상한액을 초과하는 경우, 그 초과 금액을 국민건강보험공단에서 부담(환급)하는 제도입니다.
              </p>
              
              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      <th className="p-4 border-b border-r border-slate-200 dark:border-slate-700 font-bold w-1/3">소득 분위</th>
                      <th className="p-4 border-b border-slate-200 dark:border-slate-700 font-bold">본인부담상한액 (예시, 매년 변동)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4 border-b border-r border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium">소득 하위 1분위</td>
                      <td className="p-4 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">약 87만 원 (요양병원 120일 초과 시 약 134만 원)</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-r border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium">소득 중위 5분위</td>
                      <td className="p-4 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">약 170만 원</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-r border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium">소득 상위 10분위</td>
                      <td className="p-4 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">약 780만 원</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                * 위 금액은 예시이며 매년 건강보험료 정산에 따라 확정됩니다. 비급여, 선별급여, 2~3인실 입원료 등은 상한액 계산에서 제외됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* 3. 재난적 의료비 */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-rose-50 dark:bg-rose-900/30 rounded-2xl shrink-0">
              <AlertTriangle className="w-6 h-6 text-rose-600 dark:text-rose-400" />
            </div>
            <div className="space-y-4 flex-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">3. 재난적 의료비 지원사업</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                소득수준 대비 과도한 의료비(비급여 등)가 발생한 가구의 경제적 파탄을 막기 위해 <strong>비급여를 포함한 의료비</strong>의 일부를 국가가 지원합니다. (국민건강보험공단 지사 신청)
              </p>
              
              <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 space-y-2 ml-2">
                <li><strong>지원 대상:</strong> 기준중위소득 100% 이하 및 의료비 부담이 연소득의 일정 비율을 초과한 자</li>
                <li><strong>지원 내용:</strong> 소득 구간에 따라 본인부담 의료비(건강보험 적용 제외 비급여 등)의 50~80% 지원</li>
                <li><strong>지원 한도:</strong> 연간 최대 5천만 원 한도 (필요시 개별 심사를 거쳐 추가 지원 가능)</li>
                <li className="text-rose-600 dark:text-rose-400 font-bold">주의사항: 실손보험 등 민간 보험에서 수령(예정)인 금액은 전액 공제 후 지원됩니다.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. 보건소 암환자 의료비 */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-2xl shrink-0">
              <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="space-y-4 flex-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">4. 보건소 암환자 의료비 지원</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                저소득층 암환자가 치료를 포기하지 않도록 주민등록지 관할 보건소에서 의료비를 지원하는 제도입니다.
              </p>
              
              <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 space-y-2 ml-2">
                <li><strong>의료급여수급자 및 차상위계층:</strong> 연간 최대 300만 원 한도로 연속 최장 3년 지원 (급여/비급여 구분 없이 지원)</li>
                <li><strong>건강보험가입자:</strong> 2021년 7월 1일 기준 변경. 기준 충족 시 일부 예외적 한시 지원. (상세 내역은 관할 보건소 문의 필수)</li>
                <li><strong>신청 방법:</strong> 환자 주민등록지 관할 보건소 직접 방문 상담 및 신청</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 5. 성인 암 환자 의료비 지원사업 */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-teal-50 dark:bg-teal-900/30 rounded-2xl shrink-0">
              <Stethoscope className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <div className="space-y-4 flex-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">5. 성인 암 환자 의료비 지원사업 (보건복지부)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                만 18세 이상의 저소득층 암 환자를 대상으로 의료급여수급자 및 차상위 본인부담경감대상자에게 의료비를 지원하는 국가 사업입니다.
              </p>
              
              <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 space-y-2 ml-2">
                <li><strong>지원 대상:</strong> 의료급여수급자 및 차상위 본인부담경감대상자 중 만 18세 이상 암환자 (당연 선정)</li>
                <li><strong>지원 암종:</strong> 뇌종양을 포함한 전체 암종</li>
                <li><strong>지원 금액 및 기간:</strong> 급여·비급여 구분 없이, <strong>연간 최대 300만 원</strong> (3년간 연속 지원)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 6. 경기도형 긴급복지지원 */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl shrink-0">
              <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="space-y-4 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">6. 경기도형 긴급복지지원 (의료비 및 간병비)</h3>
                <a href="https://housing.gg.go.kr/html/24404.do" target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">상세보기 ↗</a>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                갑작스러운 위기 상황(중한 질병 등)으로 생계 유지가 곤란한 경기도민을 위해 의료비와 간병비를 신속하게 지원하는 제도입니다.
              </p>
              
              <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 space-y-2 ml-2">
                <li><strong>지원 대상:</strong> 중한 질병 또는 부상으로 발생한 의료비를 감당하기 어려운 위기 가구 (소득 및 재산 기준 충족 시)</li>
                <li><strong>의료비 지원:</strong> 각종 검사, 치료 등 당장 필요한 의료 서비스 비용 지원 (통상 최대 300만 원 범위 내)</li>
                <li><strong>간병비 지원:</strong> 간병이 필수적이나 비용 부담으로 간병인을 구하지 못하는 경우 일부 간병 비용 지원</li>
                <li><strong>신청 방법:</strong> 관할 시·군·구청 또는 읍·면·동 행정복지센터 방문 신청</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 7. 경기도 간병 SOS 프로젝트 */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-pink-50 dark:bg-pink-900/30 rounded-2xl shrink-0">
              <Heart className="w-6 h-6 text-pink-600 dark:text-pink-400" />
            </div>
            <div className="space-y-4 flex-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">7. 경기도 간병 SOS 프로젝트</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                저소득층 어르신의 간병비 부담을 덜어주는 경기도의 대표적인 간병인 지원 사업입니다. (2026년 기준 16개 시·군 시행 중)
              </p>
              
              <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 space-y-2 ml-2">
                <li><strong>지원 대상:</strong> 경기도 내 참여 16개 시·군에 주민등록이 된 만 65세 이상 저소득 어르신</li>
                <li><strong>소득 기준:</strong> 기초생활수급자(생계·주거·의료급여) 및 차상위계층(장애인, 본인부담경감 등)</li>
                <li><strong>지원 금액:</strong> 1인당 <strong>연간 최대 120만 원</strong> (횟수 제한 없음)</li>
                <li><strong>입원 요건:</strong> 상해 또는 질병으로 병원급 의료기관 이상에 입원하여 간병 서비스를 받은 경우</li>
                <li><strong>신청 방법:</strong> 매년 1월 ~ 12월, 거주지 관할 읍·면·동 행정복지센터(주민센터) 접수</li>
              </ul>
              <p className="text-xs text-pink-600 dark:text-pink-400 mt-2 font-medium">
                * 세부 해당 지역 및 참여 시·군은 관할 지자체나 경기도청 공고문 확인이 필요합니다.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
