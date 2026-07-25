import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const INITIAL_QUICK_LINKS = {
  coupang: 'https://partners.coupang.com',
  inpock: 'https://inpock.link',
};

const INITIAL_HEALTH_STORIES = [
  {
    id: 1,
    title: "자연치유학이란? 내 몸의 자생력을 높이는 5가지 습관",
    category: "자연치유",
    date: "2026.07.25",
    readTime: "5분 읽기",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    summary: "약물에만 의존하지 않고 햇빛, 깨끗한 물, 자연식품, 적절한 수면으로 면역력을 극대화하는 자연치유의 핵심 철학을 소개합니다.",
    content: "자연치유(Naturopathy)는 인체가 가진 고유의 자생력(Healing Power of Nature)을 극대화하여 질병을 예방하고 건강을 회복하는 웰니스 라이프 스타일입니다..."
  },
  {
    id: 2,
    title: "아침 공복 따뜻한 레몬수의 신체 정화 작용과 효능",
    category: "건강습관",
    date: "2026.07.24",
    readTime: "3분 읽기",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    summary: "매일 아침 따뜻한 물에 생레몬을 즙내어 마시는 습관이 신장과 간 디톡스에 미치는 긍정적 영향.",
    content: "레몬수는 비타민 C가 풍부할 뿐만 아니라 체내 알칼리성 환경을 형성하는 데 도움을 주어 아침 대사 활성화에 탁월합니다..."
  },
  {
    id: 3,
    title: "현대인의 스트레스성 불면증을 없애는 천연 아로마 요법",
    category: "수면건강",
    date: "2026.07.20",
    readTime: "4분 읽기",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
    summary: "라벤더와 카모마일 에센셜 오일을 활용하여 수면의 질을 200% 높이는 아로마 테라피 시크릿.",
    content: "부교감 신경을 활성화하는 천연 에센셜 오일의 디퓨징 기법과 베개 딥슬립 스프레이 활용법을 공개합니다..."
  }
];

const INITIAL_FOOD_CALORIES = [
  { id: 1, name: "현미밥 (1공기 210g)", calories: 305, protein: 6.2, carbs: 65, fat: 2.1, category: "주식", icon: "🍚", healthTip: "혈당 조절에 좋은 식이섬유 풍부" },
  { id: 2, name: "닭가슴살 구이 (100g)", calories: 165, protein: 31.0, carbs: 0, fat: 3.6, category: "단백질", icon: "🍗", healthTip: "고단백 저지방 필수 식이" },
  { id: 3, name: "아보카도 (1개 150g)", calories: 240, protein: 3.0, carbs: 12, fat: 22.0, category: "지방/과일", icon: "🥑", healthTip: "불포화지방산 오메가-9 풍부" },
  { id: 4, name: "블루베리 (100g)", calories: 57, protein: 0.7, carbs: 14, fat: 0.3, category: "과일", icon: "🫐", healthTip: "강력한 안토시아닌 항산화제" },
  { id: 5, name: "연어 구이 (150g)", calories: 310, protein: 34.0, carbs: 0, fat: 18.0, category: "단백질", icon: "🐟", healthTip: "오메가-3 혈관 건강 강화" },
  { id: 6, name: "그릭 요거트 (150g)", calories: 130, protein: 15.0, carbs: 6, fat: 4.0, category: "유제품", icon: "🥣", healthTip: "장 건강 유산균 고함량" }
];

const INITIAL_HEALING_TRAVEL = [
  {
    id: 1,
    name: "제주 한라산 천연 편백나무 숲길",
    location: "제주 서귀포시",
    tag: "피톤치드 숲속 산책",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    description: "밀도 높은 편백나무 숲에서 음이온과 피톤치드를 듬뿍 마시며 지친 순환계와 신경계를 자연 치유하는 명상 코스.",
    bestSeason: "봄, 가을"
  },
  {
    id: 2,
    name: "평창 대관령 자연치유 힐링 숲",
    location: "강원 평창군",
    tag: "고원 청정 힐링",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    description: "해발 700m 청정 고원에서 펼쳐지는 숲치유 프로그램과 자작나무 숲속 야외 요가 존.",
    bestSeason: "사계절"
  },
  {
    id: 3,
    name: "울진 백암 온천 천연 염분 스파",
    location: "경북 울진군",
    tag: "온천 다이어트 스파",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    description: "자연 천연 알칼리 온천수로 관절염 해소와 혈액순환 개선을 돕는 보양 온천 여행지.",
    bestSeason: "겨울, 환절기"
  }
];

const INITIAL_PERFUME_STORIES = [
  {
    id: 1,
    name: "포레스트 디바인 (Forest Divine) 천연 아로마",
    notes: "시더우드, 사이프러스, 유칼립투스",
    mood: "깊은 숲속 명상 & 신경 안정이 필요할 때",
    image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
    description: "100% 천연 편백과 시더우드 에센셜 오일을 블렌딩하여 스트레스 호르몬 코르티솔 수치를 낮추는 메디컬 아로마 수제 향수."
  },
  {
    id: 2,
    name: "라벤더 블루밍 드림 (Lavender Blooming Dream)",
    notes: "프렌치 라벤더, 베르가못, 일랑일랑",
    mood: "숙면 유도 & 안락한 휴식 공간",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    description: "남프랑스 최고급 유기농 라벤더 꽃잎에서 추출한 천연 순수 아로마로 밤 사이 깊은 림프 순환을 돕는 나이트 향수."
  },
  {
    id: 3,
    name: "시트러스 썬샤인 보타닉 (Citrus Sunshine Botanic)",
    notes: "스위트 오렌지, 자몽, 네롤리",
    mood: "활력 증진 & 긍정 에너지 유도",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
    description: "상큼한 세빌리아 오렌지와 자몽 피필이 선사하는 비타민 에너지로 나른한 오후의 집중력을 돋우는 스파클링 향수."
  }
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
    title: "천연 카모마일 릴렉싱 하이브리드 티 세트",
    price: 24000,
    originalPrice: 28000,
    category: "건강차",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80",
    description: "무카페인 천연 허브 꽃잎 함유. 긴장 완화 및 속편한 장 건강을 돕는 유기농 티 파우치.",
    paytapLink: "https://payapp.kr/paytap_demo_03",
    kcpLink: "https://kcp.co.kr/kcp_checkout_demo_03",
    isBest: false
  },
  {
    id: 104,
    title: "힐링 슬립 딥드림 라벤더 디퓨저 패키지",
    price: 32000,
    originalPrice: 42000,
    category: "아로마/치유",
    image: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80",
    description: "고급 인테리어와 수면 힐링을 동시에 충족하는 프리미엄 오가닉 라벤더 디퓨저 세트.",
    paytapLink: "https://payapp.kr/paytap_demo_04",
    kcpLink: "https://kcp.co.kr/kcp_checkout_demo_04",
    isBest: true
  }
];

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('health'); // 'health', 'calories', 'travel', 'perfume', 'shopping', 'admin'
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

  const [paymentModal, setPaymentModal] = useState({
    isOpen: false,
    product: null,
    gateway: 'paytap' // 'paytap' | 'kcp'
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('jjuni_theme') === 'dark';
  });

  // LocalStorage Persist Effects
  useEffect(() => {
    localStorage.setItem('jjuni_quick_links', JSON.stringify(quickLinks));
  }, [quickLinks]);

  useEffect(() => {
    localStorage.setItem('jjuni_products', JSON.stringify(products));
  }, [products]);

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
  const updateQuickLinks = (newLinks) => {
    setQuickLinks(newLinks);
  };

  const addProduct = (newProduct) => {
    setProducts(prev => [{ ...newProduct, id: Date.now() }, ...prev]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const openCheckout = (product, gateway = 'paytap') => {
    setPaymentModal({
      isOpen: true,
      product,
      gateway
    });
  };

  const closeCheckout = () => {
    setPaymentModal({
      isOpen: false,
      product: null,
      gateway: 'paytap'
    });
  };

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      quickLinks,
      updateQuickLinks,
      healthStories,
      setHealthStories,
      foodCalories,
      setFoodCalories,
      healingTravel,
      setHealingTravel,
      perfumeStories,
      setPerfumeStories,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
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
