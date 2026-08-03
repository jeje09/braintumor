import fs from 'fs';

// 이 스크립트는 매일 GitHub Actions에서 실행되며,
// 네이버 뉴스 API 또는 구글 뉴스 RSS 등을 조회하여 src/data/news.json 파일을 업데이트합니다.
// (실제 프로덕션에서는 RSS 파싱 또는 Naver News API 등을 연결하여 사용합니다)

async function run() {
  console.log('Fetching latest news...');
  
  // 임시 더미 데이터 (실제 스크립트 작성 시 외부 API와 연결)
  const today = new Date().toISOString().split('T')[0];
  
  const newsList = [
    {
      "id": `news-${Date.now()}-1`,
      "title": "[최신] 국내 연구진, 뇌종양 교모세포종 발병 기전 규명",
      "description": "국내 연구진이 난치성 뇌종양인 교모세포종의 새로운 발병 기전을 밝혀내어 신약 개발에 새로운 전기를 마련했습니다.",
      "imageUrl": "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=500&auto=format&fit=crop",
      "link": "https://news.naver.com/",
      "pubDate": today,
      "source": "의학신문"
    },
    {
      "id": `news-${Date.now()}-2`,
      "title": "[신약] A병원, 교모세포종 환자 대상 혁신 신약 임상 2상 돌입",
      "description": "최근 FDA 패스트트랙으로 지정된 새로운 표적항암제가 국내 주요 병원에서 임상 2상에 돌입했습니다. 생존율을 크게 높일 것으로 기대됩니다.",
      "imageUrl": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=500&auto=format&fit=crop",
      "link": "https://news.naver.com/",
      "pubDate": today,
      "source": "메디칼타임즈"
    },
    {
      "id": `news-${Date.now()}-3`,
      "title": "뇌종양 수술 후 재활치료, 생존 기간 연장에 큰 도움",
      "description": "뇌종양 수술 후 체계적인 맞춤형 재활치료를 받은 환자군이 그렇지 않은 환자군에 비해 일상 복귀율과 장기 생존율이 유의미하게 높다는 연구 결과가 나왔습니다.",
      "imageUrl": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=500&auto=format&fit=crop",
      "link": "https://news.naver.com/",
      "pubDate": today,
      "source": "헬스조선"
    }
  ];

  const filePath = './src/data/news.json';
  fs.writeFileSync(filePath, JSON.stringify(newsList, null, 2));
  console.log('Successfully updated src/data/news.json');
}

run();
