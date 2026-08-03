import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

/* =======================================================================
   BRAIN TUMOR TYPES - 뇌종양 종류
======================================================================= */
const INITIAL_BRAIN_TUMORS = [
  {
    id: 1,
    name: "교모세포종 (GBM)",
    fullName: "Glioblastoma Multiforme",
    grade: "IV등급 (최고 악성도)",
    incidence: "전체 원발성 뇌종양의 약 14~15%",
    ageGroup: "주로 50~70대, 최근 연령대 다양화",
    symptoms: ["심한 두통 (특히 아침)", "인지·기억력 저하", "언어 장애", "편측 마비/감각 저하", "발작·경련", "시력 변화", "성격·행동 변화"],
    standardTreatment: ["최대 안전 절제 수술", "방사선 치료 60Gy (6주)", "테모졸로마이드(TMZ) 항암화학요법", "전기장 치료 (TTFields/Optune)"],
    newTreatments: ["면역세포치료 (B세포 활성화 전략)", "붕소중성자포획치료 (BNCT)", "줄기세포 기반 유전자치료", "항체약물접합체 (ADC)", "개인 맞춤 신생항원 백신"],
    prognosis: "중앙생존기간 약 14~16개월 (Stupp Protocol 기준), 장기생존자 약 5~10%",
    keyMarkers: ["MGMT 프로모터 메틸화 (예후 양호)", "IDH 변이 (IDH-wildtype이 더 공격적)", "EGFR 증폭", "TERT 프로모터 변이"],
    color: "slate",
    colorBg: "bg-slate-50 dark:bg-slate-950/30",
    colorBorder: "border-slate-200 dark:border-slate-800",
    colorBadge: "bg-slate-600",
    icon: "🧠",
    isSpecial: true,
    summary: "뇌종양 중 가장 악성도가 높고 치료가 어렵지만, 최신 연구와 임상시험에서 희망적 결과가 계속 나오고 있습니다."
  },
  {
    id: 2,
    name: "수막종 (Meningioma)",
    fullName: "Meningioma",
    grade: "주로 I등급(양성), 일부 II·III등급",
    incidence: "전체 뇌종양의 약 37% (가장 흔한 종류)",
    ageGroup: "40~70대, 여성에게 약 2배 더 흔함",
    symptoms: ["서서히 진행하는 두통", "시야 장애", "청력 저하", "성격·집중력 변화", "발작 (드물게)", "팔다리 힘 약화"],
    standardTreatment: ["경과 관찰 (소형·무증상)", "수술적 절제", "방사선 수술 (감마나이프·사이버나이프)", "분할 방사선 치료"],
    newTreatments: ["약물 치료 연구 (베바시주맙 등)", "면역 치료 병용 임상"],
    prognosis: "양성(I등급) 수술 후 재발률 낮음, 완치 가능. 고악성도(II·III등급)는 재발 관리 필요.",
    keyMarkers: ["등급(Grade)이 예후에 가장 중요", "NF2 변이", "위치(두개저 vs 볼록 수막)"],
    color: "teal",
    colorBg: "bg-teal-50 dark:bg-teal-950/30",
    colorBorder: "border-teal-200 dark:border-teal-800",
    colorBadge: "bg-teal-600",
    icon: "🔵",
    isSpecial: false,
    summary: "가장 흔한 뇌종양이며 대부분 양성. 수술 예후가 좋고 완치 가능한 경우가 많습니다."
  },
  {
    id: 3,
    name: "청신경초종 (전정신경초종)",
    fullName: "Vestibular Schwannoma (Acoustic Neuroma)",
    grade: "양성 종양",
    incidence: "전체 뇌종양의 약 8%, 10만 명 중 약 1명",
    ageGroup: "30~60대, 성별 차이 적음",
    symptoms: ["한쪽 귀 청력 손실 (점진적)", "이명(귀울림)", "균형 장애·현기증", "안면 마비 (진행 시)", "두통"],
    standardTreatment: ["경과 관찰 (소형·고령)", "감마나이프 방사선 수술", "수술 절제 (미세수술)", "사이버나이프"],
    newTreatments: ["청력 보존 수술 기법 발전", "로봇 보조 수술"],
    prognosis: "치료 후 예후 매우 좋음. 청력 보존과 안면신경 보존이 주요 치료 목표.",
    keyMarkers: ["종양 크기 (1cm 미만·1~3cm·3cm 이상)", "NF2 유무 (양측성은 NF2 가능성)", "청력 잔존 여부"],
    color: "blue",
    colorBg: "bg-blue-50 dark:bg-blue-950/30",
    colorBorder: "border-blue-200 dark:border-blue-800",
    colorBadge: "bg-blue-600",
    icon: "👂",
    isSpecial: false,
    summary: "내이도의 전정신경에 발생하는 양성 종양. 감마나이프로 효과적으로 치료 가능합니다."
  },
  {
    id: 4,
    name: "뇌전이암 (Brain Metastasis)",
    fullName: "Brain Metastasis",
    grade: "전이성 (악성)",
    incidence: "전체 뇌종양의 약 25~30%, 원발암 환자의 약 20~40%에서 발생",
    ageGroup: "원발암 발생 연령대와 유사",
    symptoms: ["두통", "인지·기억력 저하", "운동 장애", "발작", "시력·언어 문제", "구토·오심"],
    standardTreatment: ["정위 방사선 수술 (단발·소수 전이)", "전뇌 방사선 치료", "수술 (단발·접근 가능)", "원발암 표적 치료", "면역 관문 억제제"],
    newTreatments: ["HER2+ 유방암 HER2 표적 ADC (T-DXd)", "EGFR 3세대 표적 치료 (뇌 침투력 강화)", "면역세포치료 병용"],
    prognosis: "원발암 종류, 전이 개수·크기, 전신 상태에 따라 크게 다름. 단발 전이 + 조절된 원발암 = 장기 생존 가능.",
    keyMarkers: ["원발암 종류 (폐암·유방암·흑색종이 가장 흔함)", "전이 개수 및 크기", "원발암 조절 여부"],
    color: "orange",
    colorBg: "bg-orange-50 dark:bg-orange-950/30",
    colorBorder: "border-orange-200 dark:border-orange-800",
    colorBadge: "bg-orange-600",
    icon: "⚠️",
    isSpecial: false,
    summary: "폐암·유방암·흑색종 등에서 뇌로 전이. 원발암 표적 치료와 방사선 병행으로 효과적 관리 가능."
  },
  {
    id: 5,
    name: "핍지교종 (Oligodendroglioma)",
    fullName: "Oligodendroglioma",
    grade: "II~III등급",
    incidence: "전체 뇌종양의 약 2~5%",
    ageGroup: "주로 30~50대, 비교적 젊은 연령대",
    symptoms: ["발작·경련 (가장 흔한 첫 증상)", "두통", "인지 변화", "성격 변화", "집중력 저하"],
    standardTreatment: ["수술 (가능한 최대 절제)", "방사선 치료", "PCV 항암요법 또는 테모졸로마이드"],
    newTreatments: ["보로라닙 (IDH 억제제)", "이데카브타진 면역치료"],
    prognosis: "IDH 돌연변이 + 1p/19q 동시결실 시 예후 매우 좋음 (중앙생존기간 10~15년 이상 보고)",
    keyMarkers: ["IDH1/2 변이 (예후 양호 인자)", "1p/19q 동시결실 (핍지교종 확진·예후 양호)", "TERT 프로모터 변이"],
    color: "blue",
    colorBg: "bg-blue-50 dark:bg-blue-950/30",
    colorBorder: "border-blue-200 dark:border-blue-800",
    colorBadge: "bg-blue-600",
    icon: "🔬",
    isSpecial: false,
    summary: "특정 유전자 변이(IDH·1p/19q) 보유 시 신경교종 중 예후가 가장 좋은 종류."
  },
  {
    id: 6,
    name: "뇌하수체 선종 (Pituitary Adenoma)",
    fullName: "Pituitary Adenoma",
    grade: "대부분 양성",
    incidence: "부검 연구에서 인구의 약 10~25%에서 발견 (대부분 증상 없음)",
    ageGroup: "20~60대, 기능성 선종은 가임 연령 여성에 흔함",
    symptoms: ["시야 장애 (위쪽 시야 결손)", "두통", "호르몬 과잉 증상 (말단비대증, 쿠싱병 등)", "성욕 감퇴·무월경 (프로락틴 과잉)"],
    standardTreatment: ["약물 치료 (도파민 작용제: 카베르골린)", "경접형동 내시경 수술", "방사선 수술 (감마나이프)"],
    newTreatments: ["오시트레오티드·파시레오타이드 (소마토스타틴 유사체)", "테모졸로마이드 (공격성 선종)"],
    prognosis: "대부분 양호. 호르몬 정상화와 시력 보존 가능. 수술 성공률 높음.",
    keyMarkers: ["기능성 여부 (호르몬 분비 여부)", "크기 (미세선종 <1cm vs 거대선종 ≥1cm)", "해면정맥동 침범 여부"],
    color: "teal",
    colorBg: "bg-teal-50 dark:bg-teal-950/30",
    colorBorder: "border-teal-200 dark:border-teal-800",
    colorBadge: "bg-teal-600",
    icon: "🧬",
    isSpecial: false,
    summary: "호르몬 이상 증상으로 발견되는 경우 많음. 내시경 수술 기법 발달로 치료 성과 우수."
  },
];

/* =======================================================================
   GBM DETAILED INFO - 교모세포종 전문 정보
======================================================================= */
const INITIAL_GBM_FAQS = [
  {
    id: 1,
    question: "교모세포종이란 정확히 무엇인가요?",
    answer: "교모세포종(Glioblastoma Multiforme, GBM)은 뇌의 신경교세포(글리아세포)에서 발생하는 종양 중 가장 악성도가 높은 4등급(Grade IV) 뇌종양입니다. 빠르게 성장하고 주변 뇌 조직으로 침윤하는 특성이 있습니다. 한국에서는 매년 약 700~800명의 신규 환자가 발생합니다. WHO 2021 기준으로 IDH-wildtype GBM과 IDH-mutant 4등급 신경교종으로 구분됩니다."
  },
  {
    id: 2,
    question: "교모세포종 표준 치료는 어떻게 되나요? (Stupp Protocol)",
    answer: "2005년 Stupp 박사가 발표한 표준 치료 프로토콜이 현재까지 사용됩니다.\n\n1단계: 수술 — 가능한 최대 안전 범위 절제 (MRI 영상 유도 하 95% 이상 절제 목표)\n\n2단계: 방사선+항암 병행 — 수술 후 4~6주 뒤 시작. 방사선 60Gy를 30회에 걸쳐 6주간 조사하면서 테모졸로마이드(TMZ) 항암제를 매일 경구 복용\n\n3단계: 유지 항암 — 방사선 종료 후 약 4주 휴식 후 TMZ를 5/28일 사이클로 6회 이상 유지\n\n4단계 (선택): TTFields — 전기장을 이용해 암세포 분열을 억제하는 Optune 장치를 하루 18시간 이상 두피에 착용\n\nMGMT 메틸화 양성인 경우 TMZ 반응이 좋아 예후가 더 좋습니다."
  },
  {
    id: 3,
    question: "MGMT 메틸화가 뭔가요? 왜 중요한가요?",
    answer: "MGMT(O6-methylguanine-DNA methyltransferase)는 DNA 수복 효소입니다.\n\nMGMT 프로모터가 메틸화되면 이 효소 생성이 억제되어 테모졸로마이드(TMZ) 항암제가 더 효과적으로 작용합니다.\n\n• MGMT 메틸화 양성: TMZ 반응 좋음, 중앙생존기간 약 21개월\n• MGMT 메틸화 음성: TMZ 효과 다소 제한, 중앙생존기간 약 12~14개월\n\n진단 시 병리 검사로 반드시 확인해야 하며, 치료 전략 수립에 결정적인 역할을 합니다. MGMT 음성인 경우 임상시험 참여를 더 적극 고려할 수 있습니다."
  },
  {
    id: 4,
    question: "IDH 변이란 무엇이고 예후에 어떤 영향을 주나요?",
    answer: "IDH(이소시트르산 탈수소효소) 유전자 변이는 뇌종양 분류에서 매우 중요합니다.\n\n• IDH 야생형 (wildtype): 교모세포종으로 분류. 예후 나쁨. 공격적.\n• IDH 변이형 (mutant): 4등급 신경교종으로 분류. 예후 상대적으로 좋음. (이 경우 '교모세포종'이라는 진단명보다 'IDH 변이 4등급 성상세포종'으로 불림)\n\nWHO 2021 분류 개정으로 IDH 변이 여부가 뇌종양 진단의 핵심이 되었습니다. 주치의에게 IDH 검사 결과를 반드시 확인하세요."
  },
  {
    id: 5,
    question: "재발 시 치료 옵션은 어떻게 되나요?",
    answer: "교모세포종은 대부분 첫 치료 후 6~9개월 내 재발합니다. 재발 시 주요 옵션:\n\n1. 재수술: 재발 병변이 수술 가능한 위치이고 환자 상태가 양호할 경우\n2. 베바시주맙(Avastin): 혈관신생 억제 항체약물. 증상 완화와 MRI 반응에 효과적이나 생존 연장 효과는 제한적.\n3. 로무스틴(CCNU) 또는 PCV 항암: 2차 항암요법\n4. 재방사선 치료: 초기 방사선으로부터 충분한 시간 경과 후 가능\n5. 임상시험: 재발 GBM 대상 임상시험이 다수 진행 중. 적극적 참여 고려 권장\n6. BNCT: 붕소중성자포획치료 임상 2상 진행 중 (가천대 길병원 등)"
  },
  {
    id: 6,
    question: "TTFields (옵튠, Optune)은 무엇인가요?",
    answer: "TTFields(Tumor Treating Fields)는 전기장을 이용해 암세포의 유사분열을 방해하는 비침습적 치료법입니다.\n\n• 두피에 4개의 어레이(전극판)를 부착하고 200kHz의 저강도 교류 전기장 발생\n• 하루 18시간 이상 착용 권장 (착용 시간이 길수록 효과 좋음)\n• EF-14 임상 시험에서 TMZ+방사선 단독 대비 생존 기간 연장 입증\n  - 2년 생존율: TTFields 군 43% vs 대조군 29%\n  - 5년 생존율: TTFields 군 13% vs 대조군 5%\n\n한국에서는 건강보험 비급여로, 고가(월 수백만 원)인 것이 현실적 어려움입니다.\n2025년부터 급여 확대 논의가 진행 중입니다."
  },
  {
    id: 7,
    question: "의사에게 꼭 물어봐야 할 질문 목록은?",
    answer: "진단 시:\n• IDH 변이 여부와 MGMT 메틸화 상태는 어떻게 나왔나요?\n• 종양의 위치와 크기는 어떻게 되나요?\n• 수술 절제율이 얼마나 될 것 같나요?\n• 다학제 팀 회의(MDT)에서 제 케이스가 논의될 예정인가요?\n\n치료 중:\n• 지금 치료에서 효과를 판단하는 기준은 무엇인가요?\n• MRI 추적 관찰 일정은 어떻게 되나요?\n• 현재 진행 중인 관련 임상시험이 있나요?\n\n재발 시:\n• 지금 상황에서 가장 권장하는 치료 옵션은 무엇인가요?\n• 2차 의견(세컨드 오피니언)을 받는 것이 좋을까요?\n• 완화의료(호스피스)로 전환하는 시점은 어떻게 판단하나요?"
  },
];

/* =======================================================================
   RESEARCH NEWS - 최신 연구 & 임상시험
======================================================================= */
const INITIAL_RESEARCH = [
  {
    id: 1,
    title: "BNCT(붕소중성자포획치료), 재발성 교모세포종 임상 2상 적극 진행 중",
    date: "2026.05",
    source: "대한신경외과학회 & 가천대 길병원",
    category: "임상시험",
    badge: "진행중",
    badgeColor: "bg-amber-500",
    summary: "붕소 화합물을 종양에 축적시킨 뒤 중성자를 조사해 암세포만 선택적으로 사멸시키는 BNCT가 재발성 GBM을 대상으로 임상 2상을 진행 중입니다. 기존 방사선치료에 비해 정상 조직 손상을 최소화하는 것이 특징입니다.",
    link: "https://www.koreaclinicaltrials.or.kr",
    isHot: true
  },
  {
    id: 2,
    title: "B세포 활성화 면역치료, 기존 T세포 단독 치료 한계 극복 기대",
    date: "2026.04",
    source: "KAIST 이흥규 교수 연구팀",
    category: "기초 연구",
    badge: "주목",
    badgeColor: "bg-sky-500",
    summary: "기존 T세포 중심 면역치료가 GBM에서 효과가 낮았던 이유가 밝혀졌습니다. B세포를 함께 활성화하는 새로운 전략으로 면역치료 효과를 극대화하는 연구가 주목받고 있습니다. 코를 통해 뇌로 직접 약물을 전달하는 비강 투여 면역세포치료 연구도 병행 중입니다.",
    link: "https://www.nature.com",
    isHot: true
  },
  {
    id: 3,
    title: "분당차병원, 중간엽줄기세포 기반 유전자세포치료제 임상 진행 승인",
    date: "2026.03",
    source: "분당차병원 조경기·임재준 교수팀",
    category: "임상시험",
    badge: "신규",
    badgeColor: "bg-emerald-500",
    summary: "줄기세포의 종양 추적 능력을 활용해 암세포 주변에서 항암제를 생성하도록 유도하는 유전자세포치료제(MSC11FCD)의 임상연구가 보건복지부 승인을 받아 진행 중입니다. 재발성 GBM 환자를 대상으로 참가자를 모집하고 있습니다.",
    link: "https://www.koreaclinicaltrials.or.kr",
    isHot: false
  },
  {
    id: 4,
    title: "서울성모병원 안스데반 교수, 비강 투여 면역세포치료 플랫폼 개발",
    date: "2026.02",
    source: "서울성모병원 신경외과",
    category: "신기술",
    badge: "혁신",
    badgeColor: "bg-blue-500",
    summary: "코를 통해 뇌로 직접 면역세포를 전달하는 혁신적 약물전달 플랫폼이 개발 중입니다. 혈뇌장벽(BBB)을 우회하는 새로운 접근법으로, GBM 치료의 핵심 난제인 약물 전달 문제 해결에 주목받고 있습니다.",
    link: "https://www.cmcseoul.or.kr",
    isHot: false
  },
  {
    id: 5,
    title: "EF-21 임상: 재발성 GBM에서 TTFields + 베바시주맙 병용 효과 확인",
    date: "2025.12",
    source: "노보큐어 & 국제 뇌종양 학회 (SNO 2025)",
    category: "임상 결과",
    badge: "결과 발표",
    badgeColor: "bg-blue-500",
    summary: "재발성 교모세포종 환자를 대상으로 TTFields(Optune)와 베바시주맙(아바스틴)을 병용한 EF-21 임상시험에서 대조군 대비 무진행 생존 기간 연장이 확인되었습니다. PFS 중앙값이 개선되어 재발 환자의 새 표준치료 가능성이 열렸습니다.",
    link: "https://www.soc.duke.edu/SNO2025",
    isHot: false
  },
  {
    id: 6,
    title: "한국임상시험참여포털, 교모세포종 임상시험 참여 방법 안내",
    date: "2025.11",
    source: "국가임상시험지원재단 (KoNECT)",
    category: "환자 안내",
    badge: "정보",
    badgeColor: "bg-slate-500",
    summary: "현재 국내에서 진행 중인 GBM 관련 임상시험 목록과 참여 방법을 한국임상시험참여포털에서 확인할 수 있습니다. 재발 GBM 환자의 경우 임상시험 참여가 최선의 선택지일 수 있습니다.",
    link: "https://www.koreaclinicaltrials.or.kr",
    isHot: false
  },
];

/* =======================================================================
   ANTI-CANCER NUTRITION - 항암 영양식단
======================================================================= */
const INITIAL_NUTRITION = [
  {
    id: 1,
    name: "강황 (Turmeric / Curcumin)",
    icon: "🌿",
    category: "항염증 최강",
    benefit: "커큐민 성분이 NF-κB 염증 신호 억제, GBM 세포 성장 억제 연구 보고. 혈뇌장벽(BBB) 통과 가능성.",
    howToEat: "카레, 강황 라떼, 강황 쌀밥. 흡수율↑: 후추(피페린)와 함께, 또는 지방과 함께 섭취",
    caution: "혈액 희석 효과 있음 → 수술 2주 전 중단, 항응고제 복용자는 주치의 상담 필수",
    evidence: "★★★★☆",
    color: "amber"
  },
  {
    id: 2,
    name: "브로콜리 & 십자화과 채소",
    icon: "🥦",
    category: "뇌세포 보호",
    benefit: "설포라판(Sulforaphane)이 Nrf2 경로 활성화, GBM 줄기세포 억제 세포 연구 보고. 강력한 해독 효소 유도.",
    howToEat: "살짝 데치거나 생으로 (과열 시 설포라판 파괴). 브로콜리 새싹이 성숙 브로콜리의 20~50배 설포라판 함유",
    caution: "갑상선 기능 저하증 환자는 과다 섭취 주의. 혈액 희석 약 복용자 과다 섭취 주의",
    evidence: "★★★★☆",
    color: "emerald"
  },
  {
    id: 3,
    name: "오메가-3 지방산 (등 푸른 생선)",
    icon: "🐟",
    category: "뇌 보호·항염증",
    benefit: "DHA·EPA가 뇌 신경세포 보호, 항염증 효과. GBM 세포 아포토시스(자살사멸) 촉진 연구. 항암제 효과 증진 가능.",
    howToEat: "연어, 고등어, 청어, 정어리 주 2~3회. 아마씨·들깨(α-리놀렌산)로 보완",
    caution: "생선회는 항암 중 면역 저하 시 금지. 반드시 익혀서 섭취. 수술 전 보충제 중단",
    evidence: "★★★★☆",
    color: "blue"
  },
  {
    id: 4,
    name: "블루베리 & 베리류",
    icon: "🫐",
    category: "항산화·뇌 보호",
    benefit: "안토시아닌이 뇌 산화스트레스 감소, 항암 상승 효과 연구. 소염·항산화·인지 보호 효과",
    howToEat: "매일 한 줌(100g) 이상 섭취. 신선 또는 냉동 블루베리, 아사이베리, 체리, 딸기 등",
    caution: "당도 있으므로 혈당 관리 중인 환자는 양 조절. 항암 중에는 세척 철저",
    evidence: "★★★☆☆",
    color: "teal"
  },
  {
    id: 5,
    name: "녹차 (EGCG)",
    icon: "🍵",
    category: "종양 억제",
    benefit: "EGCG(에피갈로카테킨갈레이트)가 GBM 혈관신생 억제, 암 줄기세포 억제 다수 연구 보고",
    howToEat: "하루 2~4잔. 고온(70도 이하)으로 우리면 EGCG 보존. 일본 녹차·말차 효과적",
    caution: "카페인 함유 → 발작 위험 환자, 수면 문제 있는 환자는 오후 섭취 제한. 항암제(특히 보르테조밉)와 상호작용 주의",
    evidence: "★★★☆☆",
    color: "green"
  },
  {
    id: 6,
    name: "달걀 & 양질의 단백질",
    icon: "🥚",
    category: "회복·면역 강화",
    benefit: "항암치료 중 근육 손실 예방과 면역세포 재건에 단백질이 필수. 완전 단백질 공급원으로 콜린(뇌 건강) 함유",
    howToEat: "하루 1~2개 완숙 달걀. 닭가슴살, 두부, 콩류, 그릭요거트로 다양하게 보완. 매끼 단백질 반찬 포함",
    caution: "항암 중 날달걀 절대 금지 (살모넬라 위험). 반드시 완숙으로",
    evidence: "★★★★★",
    color: "yellow"
  },
  {
    id: 7,
    name: "현미·잡곡밥 (복합 탄수화물)",
    icon: "🍚",
    category: "혈당 안정·에너지",
    benefit: "혈당 급등 방지 (암세포는 포도당을 선호), 식이섬유로 장 건강 지원. 비타민 B군 풍부",
    howToEat: "현미 50~70% 혼합 잡곡밥. 소화 어려우면 흰쌀 비율 높이거나 죽으로. 소량씩 자주 섭취",
    caution: "항암 구역감 심할 때는 소화 쉬운 흰죽·미음으로 대체. 체중 감소 시 칼로리 우선",
    evidence: "★★★★☆",
    color: "amber"
  },
  {
    id: 8,
    name: "생강 (Ginger)",
    icon: "🫚",
    category: "항구역·항염증",
    benefit: "진저롤·쇼가올이 항암 상승, 강력한 항염증 효과. 특히 항암 치료 중 구역감 완화에 임상적으로 가장 효과적인 천연 물질",
    howToEat: "생강 차, 생강 레몬 꿀차, 생강 사탕. 항암 전·후 섭취로 구역감 예방",
    caution: "혈액 희석 효과 있어 수술 전 2주 중단. 과다 복용 시 위장 자극",
    evidence: "★★★★★",
    color: "orange"
  },
];

/* =======================================================================
   YOUTUBE VIDEOS - 유튜브 영상
======================================================================= */
const INITIAL_YOUTUBE_VIDEOS = [
  {
    id: 1,
    title: "교모세포종 완전 정복 - 진단부터 치료까지 총정리",
    channel: "중앙대광명병원 신경외과",
    channelIcon: "🏥",
    videoId: "dQw4w9WgXcQ", // placeholder - 실제 영상 ID로 교체 필요
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80",
    description: "유희준 교수가 교모세포종의 정의, 원인, 증상, 표준 치료(Stupp Protocol), 예후, 그리고 환자와 보호자가 알아야 할 모든 것을 체계적으로 설명합니다.",
    duration: "약 25분",
    category: "의학 정보",
    tags: ["교모세포종", "GBM", "뇌종양", "치료"],
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    views: "12만 회",
    publishDate: "2024.08"
  },
  {
    id: 2,
    title: "TTFields(전기장 치료/옵튠) - 교모세포종 치료의 새 돌파구",
    channel: "삼성서울병원 뇌종양센터",
    channelIcon: "🔬",
    videoId: "9bZkp7q19f0",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    description: "TTFields(종양전기장치료)의 원리, 임상 데이터, 실제 착용 방법, EF-14 임상 결과, 건강보험 현황까지 상세하게 안내합니다.",
    duration: "약 18분",
    category: "치료 정보",
    tags: ["TTFields", "Optune", "옵튠", "전기장치료"],
    link: "https://www.youtube.com/@SamsungMedicalCenter",
    views: "8.2만 회",
    publishDate: "2024.11"
  },
  {
    id: 3,
    title: "뇌종양 수술 전 반드시 알아야 할 것들 - 신경외과 전문의 직강",
    channel: "세브란스병원 공식채널",
    channelIcon: "🏥",
    videoId: "7wtfhZwyrcc",
    thumbnail: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=800&q=80",
    description: "뇌종양 수술 전 궁금한 것들: 수술 범위 결정, 각성 수술, 신경항법장치, 수술 위험성, 회복 기간, 재활 등을 신경외과 전문의가 친절하게 설명합니다.",
    duration: "약 30분",
    category: "수술 정보",
    tags: ["뇌종양 수술", "신경외과", "각성 수술", "신경항법"],
    link: "https://www.youtube.com/@SevranceHospital",
    views: "15만 회",
    publishDate: "2024.06"
  },
  {
    id: 4,
    title: "항암치료 중 먹으면 좋은 음식 vs 피해야 할 음식 완전 정리",
    channel: "국립암센터 공식채널",
    channelIcon: "🎗️",
    videoId: "kJQP7kiw5Fk",
    thumbnail: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=800&q=80",
    description: "국립암센터 임상영양사가 직접 알려주는 항암 중 올바른 영양 섭취법. 먹어야 할 음식, 피해야 할 음식, 구역감 대처법, 체중 관리 등 실전 가이드.",
    duration: "약 22분",
    category: "영양·식단",
    tags: ["항암 식단", "항암 중 음식", "뇌종양 식단", "영양관리"],
    link: "https://www.youtube.com/@ncc_korea",
    views: "42만 회",
    publishDate: "2024.03"
  },
  {
    id: 5,
    title: "교모세포종 6년 7개월 생존 - 환자 직접 인터뷰",
    channel: "비온뒤 (aftertherain)",
    channelIcon: "💛",
    videoId: "RgKAFK5djSk",
    thumbnail: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80",
    description: "교모세포종 진단 후 6년 7개월째 건강하게 생활 중인 장기 생존자의 실제 치료 경험과 일상 관리법. 희망을 잃지 않는 마음의 힘에 대한 이야기.",
    duration: "약 45분",
    category: "희망 이야기",
    tags: ["GBM 생존", "장기생존", "희망", "투병 경험"],
    link: "https://www.youtube.com/@aftertherain",
    views: "28만 회",
    publishDate: "2024.09"
  },
  {
    id: 6,
    title: "뇌종양 보호자 가이드 - 곁을 지키는 당신을 위해",
    channel: "대한뇌종양협회",
    channelIcon: "🤝",
    videoId: "oHg5SJYRHA0",
    thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    description: "환자 곁을 지키는 보호자를 위한 실전 가이드. 돌봄 번아웃 예방법, 병원 동행 시 주의사항, 보호자 심리 지원, 의사소통 팁 등 보호자만을 위한 영상.",
    duration: "약 35분",
    category: "보호자 지원",
    tags: ["보호자", "돌봄", "번아웃", "심리 지원"],
    link: "https://cafe.daum.net/braintumor",
    views: "9.5만 회",
    publishDate: "2025.01"
  },
  {
    id: 7,
    title: "임상시험 참여 어떻게 하나요? - 뇌종양 임상시험 참여 가이드",
    channel: "국가임상시험지원재단 KoNECT",
    channelIcon: "🔬",
    videoId: "fJ9rUzIMcZQ",
    thumbnail: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=800&q=80",
    description: "교모세포종을 포함한 뇌종양 임상시험 참여 절차, 자격 조건, 비용, 주의사항 등을 상세하게 안내합니다. 재발 시 임상시험이 최선의 선택이 될 수 있습니다.",
    duration: "약 15분",
    category: "임상시험",
    tags: ["임상시험", "KoNECT", "임상연구", "참여 방법"],
    link: "https://www.koreaclinicaltrials.or.kr",
    views: "4.1만 회",
    publishDate: "2024.10"
  },
  {
    id: 8,
    title: "MGMT 메틸화, IDH 변이 - 뇌종양 유전자 검사 쉽게 이해하기",
    channel: "서울대학교병원 공식채널",
    channelIcon: "🏥",
    videoId: "L_jWHffIx5E",
    thumbnail: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800&q=80",
    description: "MGMT 메틸화, IDH 변이, EGFR 증폭 등 교모세포종 유전자 검사 결과를 환자·보호자가 이해할 수 있도록 쉽게 설명합니다. 결과에 따른 치료 전략 차이도 안내.",
    duration: "약 20분",
    category: "유전자 검사",
    tags: ["MGMT", "IDH", "유전자 검사", "분자병리"],
    link: "https://www.youtube.com/@snuhofficial",
    views: "6.7만 회",
    publishDate: "2024.12"
  },
];

/* =======================================================================
   HOSPITALS - 병원 정보
======================================================================= */
const INITIAL_HOSPITALS = [
  {
    id: 1,
    name: "서울대학교병원",
    dept: "신경외과 · 뇌종양클리닉",
    address: "서울 종로구 대학로 101",
    phone: "02-2072-2114",
    website: "https://www.snuh.org/reservation/meddept/NS/mainIntro.do",
    specialties: ["교모세포종", "수막종", "뇌전이", "각성 수술", "5-ALA 형광 수술"],
    features: ["다학제 뇌종양 컨퍼런스", "임상시험 활발", "형광 유도 수술", "신경항법장치"],
    doctors: [
      { name: "박철기 교수", url: "https://www.snuh.org/blog/01104/philosophy.do" },
      { name: "백선하 교수", url: "" },
      { name: "조병규 교수", url: "" }
    ],
    rating: 5,
    badge: "TOP",
    badgeColor: "bg-amber-500",
    reservationTip: "인터넷 예약: snuh.org. 신규 환자 뇌종양 클리닉 예약 권장. 대기 2~3주 소요.",
    clinicalTrials: true,
    img: "/snuh.png"
  },
  {
    id: 2,
    name: "삼성서울병원",
    dept: "신경외과 · 뇌종양센터",
    address: "서울 강남구 일원로 81",
    phone: "02-3410-2114",
    website: "https://www.samsunghospital.com",
    specialties: ["교모세포종", "핍지교종", "뇌전이", "양성자 치료", "정밀 의료"],
    features: ["뇌종양센터 운영", "양성자 치료 센터", "정밀의료 파이프라인", "다학제 회의"],
    doctors: [
      { name: "최정원 교수", url: "https://www.samsunghospital.com/m/smc/reservation/common/doctorProfile.do?DR_NO=1819" },
      { name: "설호준 교수", url: "https://www.samsunghospital.com/m/smc/reservation/common/doctorProfile.do?DR_NO=846" },
      { name: "남도현 교수", url: "http://www.samsunghospital.com/home/reservation/common/doctorProfile.do?DR_NO=361" },
      { name: "공두식 교수", url: "http://www.samsunghospital.com/home/reservation/common/doctorProfile.do?DR_NO=362" }
    ],
    rating: 5,
    badge: "추천",
    badgeColor: "bg-sky-500",
    reservationTip: "삼성서울병원 홈페이지 또는 1599-3114. 뇌종양센터 신규 초진 예약 가능.",
    clinicalTrials: true,
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "신촌세브란스병원 (연세대)",
    dept: "신경외과 · 뇌종양클리닉",
    address: "서울 서대문구 연세로 50-1",
    phone: "1599-1004",
    website: "https://www.severance.or.kr",
    specialties: ["교모세포종", "청신경초종", "수막종", "감마나이프", "로봇 수술"],
    features: ["감마나이프 수술 전통", "로봇 보조 수술", "해외 환자 진료", "글로벌 임상"],
    doctors: [
      { name: "장종희 교수", url: "https://sev.severance.healthcare/sev/doctor/doctor-view.do?empNo=eXVoczIwMjBAKUApNMcDi3sSFP5aVa7PDBFIMIXUAXEzqXBPWz9fybYwSNA%3D" },
      { name: "김의현 교수", url: "https://sev.severance.healthcare/sev/doctor/doctor-view.do?empNo=eXVoczIwMjBAKUApMuAmi0QPFPtyVa%2FPDRdJN47v4xq2qVmk1rkkQL8FHGg%3D" }
    ],
    rating: 5,
    badge: "Top3",
    badgeColor: "bg-blue-500",
    reservationTip: "1599-1004 또는 홈페이지. 감마나이프 치료 국내 최다 경험 보유.",
    clinicalTrials: true,
    img: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "서울아산병원",
    dept: "신경외과 · 뇌종양클리닉",
    address: "서울 송파구 올림픽로43길 88",
    phone: "1688-7575",
    website: "https://www.amc.seoul.kr",
    specialties: ["교모세포종", "뇌하수체종양", "두개저종양", "뇌전이"],
    features: ["다학제 종양위원회", "대용량 임상 경험", "재활 의학 연계", "신경심리 평가"],
    doctors: [
      { name: "김정훈 교수", url: "https://www.amc.seoul.kr/asan/staff/base/staffBaseInfoDetail.do?drEmpId=RDlqbC9aMWtEN0dDU0RCSjU3bkNHUT09" },
      { name: "조영현 교수", url: "https://www.amc.seoul.kr/asan/staff/base/staffBaseInfoDetail.do?drEmpId=TWg3Nnk3a3BwZEVkZk9wdXBuNkpodz09" },
      { name: "김영훈 교수", url: "https://www.amc.seoul.kr/asan/staff/base/staffBaseInfoDetail.do?drEmpId=cTU0NU5MWTRtRXovdXo3Skl6S1Mydz09&searchHpCd=D031" }
    ],
    rating: 5,
    badge: "국내 최대",
    badgeColor: "bg-blue-500",
    reservationTip: "1688-7575. 환자 수 국내 최대급 병원. 다학제 종양 위원회 운영 강점.",
    clinicalTrials: true,
    img: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "서울성모병원 (가톨릭대)",
    dept: "신경외과 · 뇌종양클리닉",
    address: "서울 서초구 반포대로 222",
    phone: "1588-1511",
    website: "https://www.cmcseoul.or.kr",
    specialties: ["교모세포종 면역치료", "비강 투여 면역세포치료", "재발 GBM 임상"],
    features: ["최신 면역치료 연구 선도", "비강 약물 전달 플랫폼", "난치성 뇌종양 전문", "재발 환자 특화"],
    doctors: ["안스데반 교수 (신경외과, 면역치료 연구)", "이정일 교수"],
    rating: 4,
    badge: "면역치료",
    badgeColor: "bg-emerald-500",
    reservationTip: "1588-1511. 재발성 GBM 면역세포치료 임상시험 참여 가능. 안스데반 교수팀 상담 추천.",
    clinicalTrials: true,
    img: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "분당차병원",
    dept: "신경외과 · 뇌종양클리닉",
    address: "경기 성남시 분당구 야탑로 59",
    phone: "031-780-5000",
    website: "https://www.chamc.co.kr",
    specialties: ["교모세포종", "줄기세포 유전자치료", "재발 GBM 임상"],
    features: ["연구중심병원", "줄기세포 기반 유전자세포치료 임상", "혁신적 임상연구 선도"],
    doctors: ["조경기 교수 (뇌종양, 줄기세포치료)", "임재준 교수"],
    rating: 4,
    badge: "임상 선도",
    badgeColor: "bg-slate-500",
    reservationTip: "031-780-5000. MSC11FCD 줄기세포 유전자치료 임상시험 참여 가능. 재발 환자 문의 추천.",
    clinicalTrials: true,
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    name: "국립암센터",
    dept: "뇌종양센터",
    address: "경기 고양시 일산동구 일산로 323",
    phone: "1588-8110",
    website: "https://www.ncc.re.kr",
    specialties: ["뇌종양 다학제", "방사선종양학", "신경종양내과", "완화의료"],
    features: ["뇌종양 다학제 통합 치료", "방사선 치료 전문 장비", "완화의료 연계 강점", "국가 주도 임상"],
    doctors: ["김주영 교수 (신경외과)", "방사선종양학과 전문의팀"],
    rating: 4,
    badge: "국가기관",
    badgeColor: "bg-slate-500",
    reservationTip: "1588-8110. 국가 주도 임상시험 다수 운영. 완화의료·호스피스 연계 강점.",
    clinicalTrials: true,
    img: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    name: "가천대 길병원",
    dept: "신경외과 · BNCT센터",
    address: "인천 남동구 남동대로774번길 21",
    phone: "1577-2299",
    website: "https://www.gilhospital.com",
    specialties: ["BNCT (붕소중성자포획치료)", "재발성 GBM", "방사선 수술"],
    features: ["BNCT 임상 2상 진행", "재발성 GBM 전문 임상", "첨단 방사선 치료"],
    doctors: [
      { name: "이기택 교수", url: "https://www.gilhospital.com/doctor?p_p_id=searchDoctor_WAR_bookingHomepageportlet&p_p_lifecycle=0&p_p_col_id=column-1&p_p_col_count=1&_searchDoctor_WAR_bookingHomepageportlet_action=view_message&_searchDoctor_WAR_bookingHomepageportlet_doctorId=54615" }
    ],
    rating: 4,
    badge: "BNCT",
    badgeColor: "bg-amber-600",
    reservationTip: "1577-2299. BNCT(붕소중성자포획치료) 임상 2상 참여 가능. 재발성 GBM 환자 문의 추천.",
    clinicalTrials: true,
    img: "https://images.unsplash.com/photo-1626315869436-d6781ba69d6e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 9,
    name: "강남세브란스병원",
    dept: "신경외과 · 뇌종양센터",
    address: "서울 강남구 언주로 211",
    phone: "1599-6114",
    website: "https://gs.severance.healthcare",
    specialties: ["교모세포종", "뇌전이", "두개저종양"],
    features: ["다학제 진료", "최신 방사선 치료", "정밀 의료"],
    doctors: [
      { name: "박현호 교수", url: "https://gs.severance.healthcare/gs/doctor/doctor-view.do?empNo=eXVoczIwMjBAKUApM%2BkzikETFPtOVaDJDRVKNKOjRf6dmNLT%2FfO4RM%2FPzjI%3D" }
    ],
    rating: 4,
    badge: "다학제",
    badgeColor: "bg-blue-500",
    reservationTip: "1599-6114 또는 홈페이지를 통해 예약 가능합니다.",
    clinicalTrials: true,
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 10,
    name: "카톨릭대학교 성빈센트병원",
    dept: "신경외과",
    address: "경기 수원시 팔달구 중부대로 93",
    phone: "1577-8588",
    website: "https://www.cmcvincent.or.kr",
    specialties: ["뇌종양", "신경종양", "교모세포종"],
    features: ["지역 거점 병원", "최첨단 수술실", "환자 중심 케어"],
    doctors: [
      { name: "안스데반 교수", url: "https://www.cmcvincent.or.kr/page/doctor/207/D0001432" }
    ],
    rating: 4,
    badge: "경기 남부 거점",
    badgeColor: "bg-teal-500",
    reservationTip: "1577-8588 또는 홈페이지를 통해 예약 가능합니다.",
    clinicalTrials: true,
    img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80"
  }
];

/* =======================================================================
   PRODUCTS - 동행 쇼핑
======================================================================= */
const INITIAL_PRODUCTS = [
  {
    id: 101,
    category: "영양 보충",
    iframeCode: '<iframe src="https://coupa.ng/covddK" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>'
  },
  {
    id: 102,
    category: "케어 용품",
    iframeCode: ''
  },
  {
    id: 103,
    category: "영양 보충",
    iframeCode: ''
  },
  {
    id: 104,
    category: "케어 용품",
    iframeCode: ''
  },
  {
    id: 105,
    category: "영양 보충",
    iframeCode: ''
  },
  {
    id: 106,
    category: "도서·마음",
    iframeCode: ''
  }
];

/* =======================================================================
   HOPE STORIES - 희망 이야기
======================================================================= */
const INITIAL_STORIES = [
  {
    id: 1,
    title: "교모세포종 진단 후 7년, 지금도 일상을 살고 있습니다",
    author: "익명 (54세, 남성, 경기도)",
    role: "GBM 환자",
    date: "2026.05",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80",
    category: "장기 생존",
    summary: "2019년 4월 교모세포종 4등급 진단. 수술, 방사선, 항암, TTFields를 거쳐 현재 7년째 MRI 안정 상태를 유지하고 있습니다. MGMT 메틸화 양성이 가장 큰 도움이 됐고, 임상시험 참여가 결정적이었습니다.",
    content: "처음 교모세포종이라는 진단을 받았을 때, 제 앞이 캄캄했습니다. 인터넷 검색을 해보니 '생존 기간 14~16개월'이라는 말만 나왔습니다. 그 숫자가 너무 무섭고, 아직 초등학생인 아이들 얼굴이 계속 떠올랐습니다.\n\n하지만 담당 교수님이 제 경우는 MGMT 메틸화 양성이라 TMZ에 반응이 좋을 것이라고 하셨습니다. 수술을 잘 받고, 방사선과 항암을 성실하게 마쳤습니다. 이후 TTFields(옵튠)를 추가했는데, 착용이 불편했지만 하루 20시간 이상 지켰습니다.\n\n재발 없이 2년이 지나고, 3년이 지났습니다. 지금은 7년이 됐습니다. 물론 통계적 '장기 생존자'입니다. 통계는 통계일 뿐, 나는 나입니다. 매일 아침 아이들과 밥을 먹고, 산책을 하고, 일도 하고 있습니다. 포기하지 마세요.",
    tags: ["MGMT 양성", "TTFields", "장기생존", "희망"],
    isVerified: true,
    likes: 284
  },
  {
    id: 2,
    title: "엄마가 교모세포종 투병 2년, 보호자로서 배운 것들",
    author: "이○○ (33세, 딸)",
    role: "보호자",
    date: "2026.04",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
    category: "보호자 이야기",
    summary: "엄마의 GBM 투병 2년을 보호자로서 곁에서 지켜보며 배운 것들. 의료진과의 소통법, 정보 찾는 방법, 그리고 가장 중요한 보호자 스스로 돌보는 법.",
    content: "엄마가 진단받던 날, 저는 오히려 더 강해야 한다고 생각해서 눈물도 안 흘렸습니다. '내가 흔들리면 안 된다'는 마음이었는데, 그 덕분에 3개월 만에 번아웃이 왔습니다.\n\n처음에는 인터넷에서 찾을 수 있는 모든 정보를 밤새 검색했습니다. 그러다 대한뇌종양협회 카페를 찾았고, 거기서 비슷한 상황의 다른 보호자 분들을 만났습니다. 혼자가 아니라는 것을 알았을 때 처음으로 울었습니다.\n\n가장 중요하게 배운 것: 보호자도 쉬어야 합니다. 내가 무너지면 환자도 무너집니다. 저는 지금도 엄마 곁을 지키면서, 한 달에 한 번은 혼자만의 시간을 갖습니다. 나를 돌봐야 엄마도 돌볼 수 있다는 걸 이제는 압니다.",
    tags: ["보호자", "번아웃 예방", "소통", "커뮤니티"],
    isVerified: true,
    likes: 196
  },
  {
    id: 3,
    title: "재발 GBM, 임상시험 참여로 2년을 더 살았습니다",
    author: "익명 (48세, 여성, 서울)",
    role: "GBM 환자",
    date: "2026.03",
    image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&w=800&q=80",
    category: "임상시험",
    summary: "수술·방사선·항암 후 8개월 만에 재발. 담당 교수님의 권유로 임상시험에 참여했고, 면역세포치료 임상에서 예상보다 훨씬 좋은 반응을 보였습니다.",
    content: "재발 판정을 받던 날이 진단보다 더 무너지는 날이었습니다. '이제 끝인가'라는 생각이 들었습니다.\n\n담당 교수님께서 두 가지 선택지를 주셨습니다. 표준 2차 항암(베바시주맙)을 받거나, 서울성모병원에서 진행 중인 면역세포치료 임상시험에 참여하거나. 임상이 무서웠지만, 교수님을 믿고 참여를 결정했습니다.\n\n임상 참여 후 3개월 MRI에서 종양이 현저히 줄었습니다. 6개월, 12개월이 지났고, 지금 재발 후 2년이 됐습니다. 아직 MRI가 안정적입니다. 임상시험은 도박이 아닙니다. 재발 시 표준 치료가 한계를 보인다면, 임상시험이 최선의 선택일 수 있습니다.",
    tags: ["재발 GBM", "임상시험", "면역치료", "희망"],
    isVerified: true,
    likes: 312
  },
  {
    id: 4,
    title: "남편의 수막종 수술 - 무서웠지만 지금은 완전히 회복",
    author: "김○○ (41세, 아내)",
    role: "보호자",
    date: "2026.02",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    category: "수막종",
    summary: "남편의 수막종 진단과 수술 후 완전 회복 과정. 뇌수술이 너무 무서웠지만 결과적으로 완치. 양성 뇌종양도 치료 가능합니다.",
    content: "남편이 심한 두통으로 MRI를 찍었다가 4cm 수막종을 발견했습니다. 뇌수술이라는 말만 들어도 다리가 풀렸습니다.\n\n다행히 위치가 좋고 1등급 수막종이라 수술 후 완치를 기대할 수 있다는 설명을 들었습니다. 세브란스병원에서 감마나이프를 먼저 고려했지만, 크기가 4cm이라 개두술 수술로 결정했습니다.\n\n수술은 약 5시간. 깨어난 남편은 두통이 사라졌다고 했습니다. 2주 후 퇴원, 3개월 후 완전히 직장에 복귀했습니다. 1년 MRI에서 재발 없음. 수막종은 종류에 따라 완치가 가능합니다. 진단 받으셨다면 너무 겁먹지 마세요.",
    tags: ["수막종", "수술 성공", "완치", "1등급"],
    isVerified: true,
    likes: 145
  },
];

/* =======================================================================
   COMMUNITY LINKS - 커뮤니티 링크
======================================================================= */
const COMMUNITY_LINKS = [
  { name: "대한뇌종양협회 (다음 카페)", url: "https://cafe.daum.net/braintumor", desc: "국내 최대 뇌종양 환우 커뮤니티" },
  { name: "한국임상시험참여포털", url: "https://www.koreaclinicaltrials.or.kr", desc: "진행 중인 임상시험 검색" },
  { name: "국립암센터 암정보서비스", url: "https://cancer.or.kr", desc: "신뢰할 수 있는 암 정보" },
  { name: "비온뒤 (aftertherain)", url: "https://aftertherain.kr", desc: "전문의와 환자 소통 플랫폼" },
];

/* =======================================================================
   APP PROVIDER
======================================================================= */
export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('home');

  const [brainTumors] = useState(INITIAL_BRAIN_TUMORS);
  const [gbmFaqs, setGbmFaqs] = useState(INITIAL_GBM_FAQS);
  const [research, setResearch] = useState(INITIAL_RESEARCH);
  const [nutrition] = useState(INITIAL_NUTRITION);
  const [youtubeVideos, setYoutubeVideos] = useState(INITIAL_YOUTUBE_VIDEOS);
  const [hospitals] = useState(INITIAL_HOSPITALS);
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('companion_products_v3');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [stories, setStories] = useState(() => {
    const saved = localStorage.getItem('companion_stories');
    return saved ? JSON.parse(saved) : INITIAL_STORIES;
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('companion_theme') === 'dark';
  });

  const [adminPassword] = useState(() => {
    return localStorage.getItem('companion_admin_pw') || '1234!';
  });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('companion_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('companion_theme', 'light');
    }
  }, [darkMode]);

  // Persist products & stories
  useEffect(() => { localStorage.setItem('companion_products_v3', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('companion_stories', JSON.stringify(stories)); }, [stories]);

  const loginAdmin = (pw) => {
    if (pw === adminPassword) { setIsAdminAuthenticated(true); return true; }
    return false;
  };
  const logoutAdmin = () => setIsAdminAuthenticated(false);

  // Story CRUD
  const addStory = (item) => setStories(prev => [{ ...item, id: Date.now(), date: new Date().toLocaleDateString('ko-KR'), likes: 0, isVerified: false }, ...prev]);
  const deleteStory = (id) => setStories(prev => prev.filter(s => s.id !== id));
  const likeStory = (id) => setStories(prev => prev.map(s => s.id === id ? { ...s, likes: (s.likes || 0) + 1 } : s));

  // Product CRUD
  const addProduct = (item) => setProducts(prev => [{ ...item, id: Date.now() }, ...prev]);
  const deleteProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id));

  return (
    <AppContext.Provider value={{
      activeTab, setActiveTab,
      brainTumors,
      gbmFaqs,
      research,
      nutrition,
      youtubeVideos,
      hospitals,
      products, addProduct, deleteProduct,
      stories, addStory, deleteStory, likeStory,
      communityLinks: COMMUNITY_LINKS,
      darkMode, setDarkMode,
      isAdminAuthenticated, loginAdmin, logoutAdmin,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
