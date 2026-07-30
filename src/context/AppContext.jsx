import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const INITIAL_QUICK_LINKS = {
  coupang: 'https://partners.coupang.com',
  inpock: 'https://inpock.link',
};

const INITIAL_HEALTH_STORIES = [
  {
    id: 1,
    title: "자연치유학이란? 내 몸의 자생력을 높이는 5가지 황금 습관",
    category: "자연치유",
    date: "2026.07.25",
    readTime: "5분 읽기",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    summary: "약물에만 의존하지 않고 햇빛, 깨끗한 물, 자연식품, 적절한 수면으로 면역력을 극대화하는 자연치유의 핵심 철학을 소개합니다.",
    content: "자연치유(Naturopathy)는 인체가 가진 고유의 자생력(Healing Power of Nature)을 극대화하여 질병을 예방하고 건강을 회복하는 웰니스 라이프 스타일입니다.\n\n첫 번째 황금 습관은 '아침 햇빛 노출'입니다. 기상 후 30분 이내에 15~20분간 야외 햇빛을 맞으면 세로토닌과 비타민 D가 활성화되어 수면-각성 리듬이 정상화됩니다.\n\n두 번째는 '미네랄 풍부한 순수 물 마시기'입니다. 하루 2.5L 이상의 알칼리성 미네랄 워터 섭취로 세포 해독과 신진대사를 촉진합니다.\n\n세 번째는 '식물성 색소 다양화'입니다. 매 끼니 5가지 이상의 다양한 색깔 채소를 섭취하면 폴리페놀과 항산화 파이토케미컬이 활성산소를 중화합니다.\n\n네 번째는 '저항 수면 전략'입니다. 취침 2시간 전 전자기기를 차단하고 편백 디퓨저를 사용하면 코르티솔이 낮아지고 멜라토닌이 활성화됩니다.\n\n다섯 번째는 '자연 속 걷기 명상'입니다. 맨발로 흙이나 잔디를 밟는 어싱(Earthing)은 전자기적 스트레스를 해방하고 부교감 신경을 우세하게 만들어줍니다."
  },
  {
    id: 2,
    title: "아침 공복 따뜻한 레몬수의 신체 정화 작용과 7가지 효능",
    category: "건강습관",
    date: "2026.07.24",
    readTime: "3분 읽기",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    summary: "매일 아침 따뜻한 물에 생레몬을 즙내어 마시는 습관이 신장과 간 디톡스에 미치는 긍정적 영향.",
    content: "레몬수는 비타민 C가 풍부할 뿐만 아니라 체내 알칼리성 환경을 형성하는 데 도움을 주어 아침 대사 활성화에 탁월합니다.\n\n1. 간 해독 촉진: 레몬의 리모넨 성분이 간의 해독 효소를 활성화합니다.\n2. 소화계 자극: 따뜻한 물이 소화관을 자극하여 장 연동운동을 활성화합니다.\n3. 항산화 비타민 C: 활성산소 제거로 면역력을 높입니다.\n4. 알칼리화: 산성 체질 개선에 도움을 줍니다.\n5. 피부 미용: 콜라겐 합성을 돕고 피부 광채를 높입니다.\n6. 체중 관리: 펙틴 성분이 포만감을 오래 유지합니다.\n7. 신장 건강: 구연산이 신장 결석 예방에 효과적입니다.\n\n매일 아침 기상 직후, 유기농 레몬 반 개를 짜서 35~40도 온수 250ml에 희석하여 마시는 것이 가장 효과적입니다."
  },
  {
    id: 3,
    title: "현대인의 스트레스성 불면증을 없애는 천연 아로마 요법 완전 가이드",
    category: "수면건강",
    date: "2026.07.20",
    readTime: "4분 읽기",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
    summary: "라벤더와 카모마일 에센셜 오일을 활용하여 수면의 질을 200% 높이는 아로마 테라피 시크릿.",
    content: "부교감 신경을 활성화하는 천연 에센셜 오일의 디퓨징 기법과 베개 딥슬립 스프레이 활용법을 공개합니다.\n\n아로마테라피는 후각 신경을 통해 변연계(limbic system)에 직접 작용하여 스트레스 호르몬인 코르티솔을 억제합니다.\n\n【딥슬립 필수 오일 조합】\n- 프렌치 라벤더 4방울 + 로마 카모마일 2방울 + 샌달우드 2방울\n\n【활용법】\n① 취침 1시간 전: 위 블렌드를 디퓨저에 넣고 30분 가동\n② 베개 스프레이: 오일을 증류수에 희석하여 베개에 가볍게 분사\n③ 손목과 관자놀이에 미량 도포 (캐리어 오일 혼합 필수)\n\n임상 연구에 따르면 라벤더 아로마는 수면의 깊이를 20%, 수면 만족도를 45% 향상시키는 효과가 입증되었습니다."
  },
  {
    id: 4,
    title: "장 건강이 면역력의 70%를 지배한다 - 마이크로바이옴 혁명",
    category: "자연치유",
    date: "2026.07.18",
    readTime: "6분 읽기",
    image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=800&q=80",
    summary: "장내 미생물 생태계(마이크로바이옴)의 균형이 면역 반응, 기분, 피부 건강까지 결정하는 최신 연구.",
    content: "장은 '제2의 뇌'라 불리며, 체내 면역세포의 70% 이상이 장 점막에 분포합니다. 장 건강을 지키는 것이 전신 건강의 핵심입니다.\n\n【프리바이오틱스 vs 프로바이오틱스】\n- 프리바이오틱스: 유익균의 먹이가 되는 식이섬유 (마늘, 양파, 바나나, 아스파라거스)\n- 프로바이오틱스: 유익균 자체 (발효식품 - 김치, 된장, 청국장, 그릭요거트)\n\n【장 건강 파괴 습관】\n① 항생제 남용\n② 초가공식품과 당분 과다 섭취\n③ 스트레스 호르몬 코르티솔 만성 분비\n④ 수면 부족\n\n매일 발효식품 한 가지 이상과 다양한 식이섬유를 섭취하면 장내 미생물 다양성이 극대화됩니다."
  },
  {
    id: 5,
    title: "해독 디톡스 다이어트 - 사이드 이펙트 없는 자연치유 클렌즈",
    category: "건강습관",
    date: "2026.07.15",
    readTime: "5분 읽기",
    image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=800&q=80",
    summary: "강렬한 단식 없이 자연식품으로 간, 신장, 림프를 동시 해독하는 7일 그린 클렌즈 프로그램.",
    content: "몸이 무겁고 피부가 칙칙하며 만성 피로가 지속된다면, 체내 독소 누적 신호일 수 있습니다. 극단적인 단식 대신 영양소가 풍부한 그린 클렌즈로 서서히 정화하는 방법을 소개합니다.\n\n【7일 그린 클렌즈 프로토콜】\n\n1일차: 과일+채소 주스 위주 (사과, 오이, 셀러리, 생강, 레몬)\n2~3일차: 유기농 채소 위주 식단 + 클로렐라 보충\n4~5일차: 현미밥 + 나물 + 된장국 위주 식단\n6~7일차: 서서히 일반 식단 복귀\n\n【해독에 도움이 되는 음식】\n- 브로콜리: 설포라판 성분이 간 효소 활성화\n- 비트: 베타인 성분이 간 지방 분해 촉진\n- 강황: 커큐민이 염증 억제 및 담즙 분비 촉진\n- 녹차: 카테킨이 중금속 흡착 및 배출\n\n하루 2L 이상의 수분 섭취와 가벼운 운동을 병행하면 효과가 극대화됩니다."
  },
  {
    id: 6,
    title: "비타민 D 결핍이 부르는 12가지 건강 위협 - 햇빛 충전의 과학",
    category: "자연치유",
    date: "2026.07.12",
    readTime: "4분 읽기",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    summary: "현대인의 75%가 결핍 상태인 비타민 D. 뼈 건강부터 면역력, 우울증 예방까지 총망라한 햇빛 비타민 완전 분석.",
    content: "비타민 D는 실제로 스테로이드 호르몬의 일종으로, 체내에서 300개 이상의 유전자 발현을 조절합니다. 실내 생활이 많은 현대인에게 가장 흔한 영양 결핍 중 하나입니다.\n\n【비타민 D 결핍 징후】\n① 뼈와 관절 통증\n② 만성 피로 및 무기력\n③ 잦은 감기와 감염\n④ 우울감과 무드 스윙\n⑤ 머리카락 탈락\n⑥ 근육 약화\n\n【천연 비타민 D 충전법】\n- 오전 10시~오후 2시 사이 팔, 다리 노출하여 20분 햇빛 쬐기\n- 연어, 고등어, 청어 등 지방이 풍부한 생선 섭취\n- 표고버섯을 햇빛에 건조하면 비타민 D2 대폭 증가\n- 달걀 노른자와 간 섭취\n\n혈중 비타민 D 수치는 최적 농도인 60~80ng/mL를 유지하는 것이 좋습니다."
  },
];

const INITIAL_FOOD_CALORIES = [
  { id: 1, name: "현미밥 (1공기 210g)", calories: 305, protein: 6.2, carbs: 65, fat: 2.1, category: "주식", icon: "🍚", healthTip: "혈당 조절에 좋은 식이섬유 풍부" },
  { id: 2, name: "닭가슴살 구이 (100g)", calories: 165, protein: 31.0, carbs: 0, fat: 3.6, category: "단백질", icon: "🍗", healthTip: "고단백 저지방 필수 식이" },
  { id: 3, name: "아보카도 (1개 150g)", calories: 240, protein: 3.0, carbs: 12, fat: 22.0, category: "지방/과일", icon: "🥑", healthTip: "불포화지방산 오메가-9 풍부" },
  { id: 4, name: "블루베리 (100g)", calories: 57, protein: 0.7, carbs: 14, fat: 0.3, category: "과일", icon: "🫐", healthTip: "강력한 안토시아닌 항산화제" },
  { id: 5, name: "연어 구이 (150g)", calories: 310, protein: 34.0, carbs: 0, fat: 18.0, category: "단백질", icon: "🐟", healthTip: "오메가-3 혈관 건강 강화" },
  { id: 6, name: "그릭 요거트 (150g)", calories: 130, protein: 15.0, carbs: 6, fat: 4.0, category: "유제품", icon: "🥣", healthTip: "장 건강 유산균 고함량" },
  { id: 7, name: "브로콜리 (100g)", calories: 34, protein: 2.8, carbs: 7, fat: 0.4, category: "채소", icon: "🥦", healthTip: "설포라판으로 간 해독 극대화" },
  { id: 8, name: "아몬드 (30g, 약 23알)", calories: 173, protein: 6.3, carbs: 6, fat: 15.0, category: "견과류", icon: "🌰", healthTip: "비타민 E와 마그네슘 보충" },
  { id: 9, name: "삶은 달걀 (1개 50g)", calories: 78, protein: 6.5, carbs: 0.6, fat: 5.5, category: "단백질", icon: "🥚", healthTip: "완전 단백질 및 콜린 공급" },
  { id: 10, name: "고구마 (1개 130g)", calories: 112, protein: 2.0, carbs: 26, fat: 0.1, category: "주식", icon: "🍠", healthTip: "베타카로틴 항산화 & 식이섬유" },
  { id: 11, name: "두부 (100g)", calories: 76, protein: 8.0, carbs: 1.9, fat: 4.2, category: "단백질", icon: "⬜", healthTip: "식물성 단백질 및 이소플라본" },
  { id: 12, name: "바나나 (1개 120g)", calories: 107, protein: 1.3, carbs: 27, fat: 0.4, category: "과일", icon: "🍌", healthTip: "칼륨 풍부, 운동 후 회복 최적" },
  { id: 13, name: "귀리 (50g 건조중량)", calories: 190, protein: 6.8, carbs: 34, fat: 3.2, category: "주식", icon: "🌾", healthTip: "베타글루칸으로 콜레스테롤 저하" },
  { id: 14, name: "시금치 (100g)", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, category: "채소", icon: "🥬", healthTip: "철분과 엽산, 루테인 풍부" },
  { id: 15, name: "올리브오일 (1큰술 15ml)", calories: 120, protein: 0, carbs: 0, fat: 14.0, category: "지방/과일", icon: "🫒", healthTip: "단일불포화지방산 심장 건강" },
];

const INITIAL_HEALING_TRAVEL = [
  {
    id: 1,
    name: "제주 한라산 천연 편백나무 숲길",
    location: "제주 서귀포시",
    tag: "피톤치드 숲속 산책",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    description: "밀도 높은 편백나무 숲에서 음이온과 피톤치드를 듬뿍 마시며 지친 순환계와 신경계를 자연 치유하는 명상 코스. 특히 새벽 6시에 입장하면 인적이 드물어 깊은 명상과 포레스트 배싱(Forest Bathing)이 가능합니다.",
    bestSeason: "봄, 가을"
  },
  {
    id: 2,
    name: "평창 대관령 자연치유 힐링 숲",
    location: "강원 평창군",
    tag: "고원 청정 힐링",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    description: "해발 700m 청정 고원에서 펼쳐지는 숲치유 프로그램과 자작나무 숲속 야외 요가 존. 도심보다 기온이 5~7도 낮아 여름 피서와 힐링을 동시에 즐길 수 있습니다.",
    bestSeason: "사계절"
  },
  {
    id: 3,
    name: "울진 백암 온천 천연 염분 스파",
    location: "경북 울진군",
    tag: "온천 다이어트 스파",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    description: "자연 천연 알칼리 온천수로 관절염 해소와 혈액순환 개선을 돕는 보양 온천 여행지. pH 8.3의 알칼리 중탄산나트륨 온천수는 피부 각질 연화와 근육 이완에 탁월합니다.",
    bestSeason: "겨울, 환절기"
  },
  {
    id: 4,
    name: "완도 명사십리 청정 해수 족욕 산책로",
    location: "전남 완도군",
    tag: "해수 미네랄 힐링",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    description: "서해안에서 청정도 1등급을 자랑하는 완도 해수에 발을 담그고 해풍을 맞으며 걷는 해양 테라피 코스. 해조류가 풍부한 청정 공기와 음이온이 스트레스 호르몬 수치를 낮춰줍니다.",
    bestSeason: "여름, 가을"
  },
  {
    id: 5,
    name: "지리산 뱀사골 계곡 냉수욕 명상 코스",
    location: "전남 구례군",
    tag: "계곡 냉수욕 면역",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    description: "지리산 1,915m 봉우리에서 발원한 순수 계곡수에 10~15분 냉수욕으로 교감·부교감 신경 밸런스를 회복하는 수(水)치유 코스. 냉수욕 후 온욕을 반복하면 혈관 탄성도가 향상됩니다.",
    bestSeason: "여름"
  },
];

const INITIAL_PERFUME_STORIES = [
  {
    id: 1,
    name: "포레스트 디바인 (Forest Divine) 천연 아로마",
    notes: "시더우드, 사이프러스, 유칼립투스",
    mood: "깊은 숲속 명상 & 신경 안정이 필요할 때",
    image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
    description: "100% 천연 편백과 시더우드 에센셜 오일을 블렌딩하여 스트레스 호르몬 코르티솔 수치를 낮추는 메디컬 아로마 수제 향수. 피톤치드 주성분인 테르핀이 바이러스와 세균을 억제하며, 맑고 서늘한 숲속의 깊이감을 선사합니다."
  },
  {
    id: 2,
    name: "라벤더 블루밍 드림 (Lavender Blooming Dream)",
    notes: "프렌치 라벤더, 베르가못, 일랑일랑",
    mood: "숙면 유도 & 안락한 휴식 공간",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    description: "남프랑스 최고급 유기농 라벤더 꽃잎에서 추출한 천연 순수 아로마로 밤 사이 깊은 림프 순환을 돕는 나이트 향수. 임상 연구에서 라벤더 아로마는 수면 질을 45% 향상시키고 코르티솔 분비를 25% 감소시키는 효과가 입증되었습니다."
  },
  {
    id: 3,
    name: "시트러스 썬샤인 보타닉 (Citrus Sunshine Botanic)",
    notes: "스위트 오렌지, 자몽, 네롤리",
    mood: "활력 증진 & 긍정 에너지 유도",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
    description: "상큼한 세빌리아 오렌지와 자몽 피필이 선사하는 비타민 에너지로 나른한 오후의 집중력을 돋우는 스파클링 향수. 시트러스 계열 아로마는 도파민 분비를 자극하여 기분 전환과 에너지 활성화에 즉각적인 효과를 발휘합니다."
  },
  {
    id: 4,
    name: "민트 오션 클리어 (Mint Ocean Clear) 해양 아로마",
    notes: "페퍼민트, 유칼립투스, 로즈마리, 바다소금",
    mood: "두통 완화 & 집중력 극대화",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80",
    description: "시원한 페퍼민트와 유칼립투스의 청량감이 두통과 편두통을 완화하고 집중력을 극대화하는 퍼포먼스 아로마. 시험, 업무, 창작 활동 중에 특히 효과적이며 머리를 맑고 투명하게 해줍니다."
  },
  {
    id: 5,
    name: "로즈 쿼츠 메디테이션 (Rose Quartz Meditation)",
    notes: "다마스크 로즈, 팔마로사, 게라늄",
    mood: "자존감 회복 & 내면 치유 명상",
    image: "https://images.unsplash.com/photo-1597305877032-0668b3c6413a?auto=format&fit=crop&w=800&q=80",
    description: "불가리아산 최고급 다마스크 로즈 에센셜 오일을 중심으로 팔마로사와 게라늄을 블렌딩한 프리미엄 명상 향수. 호르몬 밸런스 조절과 자율신경 이완에 효과적이며, 자존감과 내면의 아름다움을 회복하는 여성 웰니스에 특화되어 있습니다."
  },
];

const INITIAL_PRODUCTS = [
  {
    id: 101,
    title: "유기농 프리미엄 편백 피톤치드 오일 (30ml)",
    price: 38000,
    originalPrice: 45000,
    category: "아로마/치유",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
    description: "국내산 100% 순수 편백나무 수증기 증류 추출 천연 오일. 수면 유도 및 실내 미세먼지 디톡스.",
    paytapLink: "https://payapp.kr/paytap_demo_01",
    kcpLink: "https://kcp.co.kr/kcp_checkout_demo_01",
    isBest: true
  },
  {
    id: 102,
    title: "자연치유 저당 식이 유기농 현미 곡물 쉐이크",
    price: 29500,
    originalPrice: 35000,
    category: "건강식품",
    image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=800&q=80",
    description: "혈당 건강을 고려한 식물성 고단백 12가지 천연 곡물 한끼 대용 선식.",
    paytapLink: "https://payapp.kr/paytap_demo_02",
    kcpLink: "https://kcp.co.kr/kcp_checkout_demo_02",
    isBest: true
  },
  {
    id: 103,
    title: "유기농 카모마일 딥슬립 허브 티 (30티백)",
    price: 18000,
    originalPrice: 22000,
    category: "건강차",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80",
    description: "독일산 유기농 카모마일 꽃잎 100% 함유. 취침 30분 전 음용으로 수면의 질을 높여주는 힐링 허브티.",
    paytapLink: "https://payapp.kr/paytap_demo_03",
    kcpLink: "https://kcp.co.kr/kcp_checkout_demo_03",
    isBest: false
  },
  {
    id: 104,
    title: "천연 라벤더 & 로즈마리 림프 마사지 바 (60g)",
    price: 24000,
    originalPrice: 30000,
    category: "아로마/치유",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80",
    description: "냉압착 코코넛 오일 베이스에 천연 라벤더 에센셜 오일을 담은 고체 마사지 바. 림프절 마사지로 노폐물 배출 촉진.",
    paytapLink: "https://payapp.kr/paytap_demo_04",
    kcpLink: "https://kcp.co.kr/kcp_checkout_demo_04",
    isBest: true
  },
];

const INITIAL_COUPANG_PRODUCTS = [
  {
    id: 201,
    title: "쿠팡 로켓배송 프리미엄 오가닉 유기농 새싹보리 파우더",
    price: 19800,
    originalPrice: 25000,
    category: "건강기능식품",
    image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=800&q=80",
    description: "쿠팡 파트너스 추천 상품! 100% 국산 유기농 어린 새싹보리 착즙 분말.",
    coupangLink: "https://link.coupang.com/a/bC12345",
    isBest: true
  },
  {
    id: 202,
    title: "쿠팡 최저가 딥슬립 라벤더 웰니스 디퓨저 세트",
    price: 24500,
    originalPrice: 31000,
    category: "아로마테라피",
    image: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80",
    description: "쿠팡 로켓와우 직송. 남프랑스 유기농 라벤더 오일로 완성하는 안락한 수면 힐링.",
    coupangLink: "https://link.coupang.com/a/bC67890",
    isBest: true
  },
  {
    id: 203,
    title: "쿠팡 로켓 고용량 비타민 D3 + K2 복합 영양제 (180정)",
    price: 23900,
    originalPrice: 35000,
    category: "건강기능식품",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=800&q=80",
    description: "뼈 건강과 면역력 지원을 위한 고용량 비타민 D3 5000IU + 비타민 K2 100mcg 복합 설계.",
    coupangLink: "https://link.coupang.com/a/bC11111",
    isBest: false
  },
];

const INITIAL_NAVER_PRODUCTS = [
  {
    id: 301,
    title: "네이버 브랜드커넥트 100% 유기농 편백 림프 괄사 마사지 오일",
    price: 34000,
    originalPrice: 42000,
    category: "뷰티/힐링",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
    description: "네이버 브랜드 커넥트 공식 셀렉션! 림프 순환과 피부 디톡스를 돕는 오가닉 마사지 오일.",
    naverLink: "https://brandconnect.naver.com/product/10001",
    isBest: true
  },
  {
    id: 302,
    title: "네이버 스마트스토어 무카페인 천연 카모마일 티백 파우치",
    price: 22000,
    originalPrice: 26000,
    category: "건강차",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80",
    description: "네이버 쇼핑 메인 추천. 100% 독일산 유기농 카모마일 꽃잎을 한가득 담은 순수 힐링 티.",
    naverLink: "https://brandconnect.naver.com/product/10002",
    isBest: false
  },
  {
    id: 303,
    title: "네이버 브랜드커넥트 천연 히말라야 핑크솔트 배스솔트 (500g)",
    price: 28000,
    originalPrice: 34000,
    category: "뷰티/힐링",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    description: "히말라야 천연 핑크 소금과 라벤더 오일을 블렌딩한 림프 디톡스 배스솔트. 입욕 20분으로 하루 피로 해소.",
    naverLink: "https://brandconnect.naver.com/product/10003",
    isBest: true
  },
];

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('health');
  
  // Admin Password Security State (Default: '1234!')
  const [adminPassword, setAdminPassword] = useState(() => {
    return localStorage.getItem('jjuni_admin_password') || '1234!';
  });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const [quickLinks, setQuickLinks] = useState(() => {
    const saved = localStorage.getItem('jjuni_quick_links');
    return saved ? JSON.parse(saved) : INITIAL_QUICK_LINKS;
  });

  const [healthStories, setHealthStories] = useState(() => {
    const saved = localStorage.getItem('jjuni_health_stories');
    return saved ? JSON.parse(saved) : INITIAL_HEALTH_STORIES;
  });

  const [foodCalories, setFoodCalories] = useState(() => {
    const saved = localStorage.getItem('jjuni_food_calories');
    return saved ? JSON.parse(saved) : INITIAL_FOOD_CALORIES;
  });

  const [healingTravel, setHealingTravel] = useState(() => {
    const saved = localStorage.getItem('jjuni_healing_travel');
    return saved ? JSON.parse(saved) : INITIAL_HEALING_TRAVEL;
  });

  const [perfumeStories, setPerfumeStories] = useState(() => {
    const saved = localStorage.getItem('jjuni_perfume_stories');
    return saved ? JSON.parse(saved) : INITIAL_PERFUME_STORIES;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('jjuni_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // NEW: Coupang & Naver Products State
  const [coupangProducts, setCoupangProducts] = useState(() => {
    const saved = localStorage.getItem('jjuni_coupang_products');
    return saved ? JSON.parse(saved) : INITIAL_COUPANG_PRODUCTS;
  });

  const [naverProducts, setNaverProducts] = useState(() => {
    const saved = localStorage.getItem('jjuni_naver_products');
    return saved ? JSON.parse(saved) : INITIAL_NAVER_PRODUCTS;
  });

  const [paymentModal, setPaymentModal] = useState({
    isOpen: false,
    product: null,
    gateway: 'paytap'
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('jjuni_theme') === 'dark';
  });

  // LocalStorage Effects
  useEffect(() => {
    localStorage.setItem('jjuni_admin_password', adminPassword);
  }, [adminPassword]);

  useEffect(() => {
    localStorage.setItem('jjuni_quick_links', JSON.stringify(quickLinks));
  }, [quickLinks]);

  useEffect(() => {
    localStorage.setItem('jjuni_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('jjuni_coupang_products', JSON.stringify(coupangProducts));
  }, [coupangProducts]);

  useEffect(() => {
    localStorage.setItem('jjuni_naver_products', JSON.stringify(naverProducts));
  }, [naverProducts]);

  useEffect(() => {
    localStorage.setItem('jjuni_health_stories', JSON.stringify(healthStories));
  }, [healthStories]);

  useEffect(() => {
    localStorage.setItem('jjuni_food_calories', JSON.stringify(foodCalories));
  }, [foodCalories]);

  useEffect(() => {
    localStorage.setItem('jjuni_healing_travel', JSON.stringify(healingTravel));
  }, [healingTravel]);

  useEffect(() => {
    localStorage.setItem('jjuni_perfume_stories', JSON.stringify(perfumeStories));
  }, [perfumeStories]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('jjuni_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('jjuni_theme', 'light');
    }
  }, [darkMode]);

  // Admin Actions
  const loginAdmin = (inputPassword) => {
    if (inputPassword === adminPassword) {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
  };

  const updateAdminPassword = (newPassword) => {
    setAdminPassword(newPassword);
    localStorage.setItem('jjuni_admin_password', newPassword);
  };

  const updateQuickLinks = (newLinks) => {
    setQuickLinks(newLinks);
  };

  // CRUD Handlers
  const addHealthStory = (item) => setHealthStories(prev => [{ ...item, id: Date.now() }, ...prev]);
  const updateHealthStory = (id, item) => setHealthStories(prev => prev.map(s => s.id === id ? { ...s, ...item } : s));
  const deleteHealthStory = (id) => setHealthStories(prev => prev.filter(s => s.id !== id));

  const addFoodCalorie = (item) => setFoodCalories(prev => [{ ...item, id: Date.now() }, ...prev]);
  const updateFoodCalorie = (id, item) => setFoodCalories(prev => prev.map(f => f.id === id ? { ...f, ...item } : f));
  const deleteFoodCalorie = (id) => setFoodCalories(prev => prev.filter(f => f.id !== id));

  const addHealingTravel = (item) => setHealingTravel(prev => [{ ...item, id: Date.now() }, ...prev]);
  const updateHealingTravel = (id, item) => setHealingTravel(prev => prev.map(t => t.id === id ? { ...t, ...item } : t));
  const deleteHealingTravel = (id) => setHealingTravel(prev => prev.filter(t => t.id !== id));

  const addPerfumeStory = (item) => setPerfumeStories(prev => [{ ...item, id: Date.now() }, ...prev]);
  const updatePerfumeStory = (id, item) => setPerfumeStories(prev => prev.map(p => p.id === id ? { ...p, ...item } : p));
  const deletePerfumeStory = (id) => setPerfumeStories(prev => prev.filter(p => p.id !== id));

  const addProduct = (newProduct) => setProducts(prev => [{ ...newProduct, id: Date.now() }, ...prev]);
  const updateProduct = (id, updatedProduct) => setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  const deleteProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id));

  // NEW: Coupang Products CRUD
  const addCoupangProduct = (item) => setCoupangProducts(prev => [{ ...item, id: Date.now() }, ...prev]);
  const updateCoupangProduct = (id, item) => setCoupangProducts(prev => prev.map(p => p.id === id ? { ...p, ...item } : p));
  const deleteCoupangProduct = (id) => setCoupangProducts(prev => prev.filter(p => p.id !== id));

  // NEW: Naver Products CRUD
  const addNaverProduct = (item) => setNaverProducts(prev => [{ ...item, id: Date.now() }, ...prev]);
  const updateNaverProduct = (id, item) => setNaverProducts(prev => prev.map(p => p.id === id ? { ...p, ...item } : p));
  const deleteNaverProduct = (id) => setNaverProducts(prev => prev.filter(p => p.id !== id));

  const openCheckout = (product, gateway = 'paytap') => {
    setPaymentModal({ isOpen: true, product, gateway });
  };

  const closeCheckout = () => {
    setPaymentModal({ isOpen: false, product: null, gateway: 'paytap' });
  };

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      adminPassword,
      isAdminAuthenticated,
      loginAdmin,
      logoutAdmin,
      updateAdminPassword,
      quickLinks,
      updateQuickLinks,
      healthStories, addHealthStory, updateHealthStory, deleteHealthStory,
      foodCalories, addFoodCalorie, updateFoodCalorie, deleteFoodCalorie,
      healingTravel, addHealingTravel, updateHealingTravel, deleteHealingTravel,
      perfumeStories, addPerfumeStory, updatePerfumeStory, deletePerfumeStory,
      products, addProduct, updateProduct, deleteProduct,
      coupangProducts, addCoupangProduct, updateCoupangProduct, deleteCoupangProduct,
      naverProducts, addNaverProduct, updateNaverProduct, deleteNaverProduct,
      paymentModal,
      openCheckout,
      closeCheckout,
      darkMode,
      setDarkMode
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
