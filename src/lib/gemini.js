import { GoogleGenAI } from "@google/genai";

// API 키를 환경 변수에서 가져옵니다.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

let ai = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

// 사용할 모델들의 우선순위 목록 (새로운 키와 구형 키 모두 호환 가능하도록)
const MODELS_TO_TRY = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-1.5-flash"
];

/**
 * File 객체를 Base64 데이터와 MIME 타입으로 변환
 */
async function fileToInlineData(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: {
      data: await base64EncodedDataPromise,
      mimeType: file.type
    }
  };
}

/**
 * 여러 모델을 순차적으로 시도하는 헬퍼 함수
 */
async function generateWithFallback(generateFn) {
  let lastError = null;
  
  for (const modelName of MODELS_TO_TRY) {
    try {
      return await generateFn(modelName);
    } catch (error) {
      console.warn(`[Gemini SDK] ${modelName} 호출 실패. 다음 모델 시도 중...`, error.message);
      lastError = error;
      // 429 Quota Exceeded 에러일 경우 무료 한도가 완전히 막힌 것이므로 빠르게 실패
      if (error.message && error.message.includes('Quota exceeded') && error.message.includes('limit: 0')) {
        throw new Error("해당 구글 계정의 무료 한도(Free Tier)가 제한되어 있습니다. 다른 구글 계정으로 새 API 키를 발급받거나 결제를 연동해주세요.");
      }
    }
  }
  
  console.error("모든 Gemini 모델 호출에 실패했습니다:", lastError);
  throw new Error("API 키 권한 문제이거나 지원되는 모델이 없습니다. API 키를 다시 확인해주세요.");
}

/**
 * 영수증 이미지를 분석하는 함수
 * @param {File} imageFile 
 * @returns {Promise<Object>} 분석 결과 객체
 */
export async function analyzeMedicalReceipt(imageFile) {
  if (!ai) {
    throw new Error("Gemini API 키가 설정되지 않았습니다. .env 파일에 VITE_GEMINI_API_KEY를 설정해주세요.");
  }

  const prompt = `
당신은 한국의 진료비 계산서/영수증을 분석하여 지정된 JSON 양식에 맞게 데이터를 추출하는 전문 AI입니다.
업로드된 이미지는 환자의 입원(또는 외래) 진료비 영수증입니다.
이 영수증의 내용을 분석하여 아래의 구조화된 JSON 포맷으로 정확히 추출해주세요.
개인정보(환자 성명, 주민번호 등)가 보인다면 무시하세요.

[매우 중요한 판독 규칙]
1. [가장 중요] 가로줄(Row) 데이터의 절대적 일치:
   - 영수증에서 **같은 가로 선상(동일한 수평선 위)에 인쇄된 금액들은 무조건, 절대적으로 '하나의 똑같은 항목'에 속하는 데이터**입니다.
   - AI가 임의로 같은 가로줄에 있는 금액 중 일부는 위 항목(예: 방사선 치료료)에, 일부는 아래 항목(예: 치료재료비)에 **나누어서 찢어 넣는 미친 짓을 절대, 네버, 무슨 일이 있어도 하지 마세요.**
   - 인쇄가 위아래로 약간 치우쳐(오프셋) 선에 걸쳐 있더라도, **그 수평선 상에 나란히 적힌 숫자들은 통째로 한 세트**입니다. 이 한 세트의 숫자들을 그 줄에 해당하는 단 하나의 정확한 항목명(왼쪽에 적힌 이름)에 모두 밀어 넣으세요.
   - 방사선 치료료가 0원이면 0원(또는 빈칸)으로 둬야지, 그 아래 줄인 '치료재료비'의 수평선에 있는 금액을 위로 끌어다 붙이지 마세요. 제발 가로줄을 그대로 읽으세요.
2. 빈칸(금액이 전혀 없는 항목)은 절대 JSON 결과에 포함하지 마세요. (단, 금액이 0원인 항목은 빈칸이 아니므로 포함하지 마세요. 오직 유효한 금액 숫자가 있는 가로줄만 항목으로 만드세요.)
3. 명칭 통일 및 상위 항목 결합 규칙:
   - 영수증 원본 표에 '상위 항목(대분류)'과 '하위 항목(세부 분류)'이 명확히 **나뉘어져 있는 경우에만** 괄호를 사용해 결합하세요. (예: 큰 박스가 '조제 및 투약료'이고 그 안에 '행위료'가 따로 적혀있을 때만 "조제 및 투약료(행위료)"로 기재)
   - 영수증 표에 하위 분류 없이 단일 항목(예: '식대', '진찰료')으로만 덩그러니 적혀 있다면, **절대로 임의로 괄호나 '(행위료)' 등의 단어를 지어내서 붙이지 마세요.** 무조건 원본에 쓰여 있는 그대로 "식대", "진찰료" 라고만 적어야 합니다.
   - 비슷한 의미의 단어는 통일하세요 (예: "약품료", "약품대" -> "약품비", "재료대" -> "재료비")

분석을 원하는 필수 항목 스키마 (반드시 이 구조를 지킬 것):
{
  "basicInfo": {
    "병원명": "...",
    "병명": "...", 
    "입원기간": "...",
    "진료비총액": "...",
    "본인부담금총액": "...",
    "공단부담금총액": "...",
    "전액본인부담금총액": "...",
    "비급여총액": "..."
  },
  "items": [
    { 
      "name": "상위항목명(세부항목명)", 
      "group": "기본항목 또는 선택항목 (영수증에 따라 판단하여 두 가지 중 하나로 분류)",
      "본인부담금": "...",
      "공단부담금": "...", 
      "전액본인부담금": "...", 
      "비급여": "..." 
    }
  ],
  "analysisSummary": "환자가 이해하기 쉬운 1-2문장의 영수증 분석 요약"
}

반드시 순수한 JSON 문자열만 반환하세요 (마크다운 코드 블록 제거).
`;


  const inlineData = await fileToInlineData(imageFile);

  const generateFn = async (modelName) => {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            inlineData
          ]
        }
      ]
    });
    
    let text = response.text;
    if (!text) throw new Error("비어있는 응답입니다.");

    // JSON 파싱을 위해 마크다운 백틱 제거
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error("JSON 파싱 에러. 원본 텍스트 반환", text);
      return { rawText: text, error: "JSON 파싱 실패" };
    }
  };

  try {
    return await generateWithFallback(generateFn);
  } catch (error) {
    console.error("Error analyzing receipt:", error);
    throw error;
  }
}

/**
 * 분석된 영수증 컨텍스트를 바탕으로 사용자의 질문에 답하는 함수
 * @param {Object} contextData - analyzeMedicalReceipt의 결과 객체
 * @param {string} question - 사용자의 질문
 * @returns {Promise<string>} AI의 답변
 */
export async function askReceiptQuestion(contextData, question) {
  if (!ai) {
    throw new Error("Gemini API 키가 설정되지 않았습니다.");
  }

  const prompt = `
당신은 '환자권리 데이터센터'의 친절하고 전문적인 의료비 질문 도우미 AI입니다.
환자(또는 보호자)가 자신의 진료비 영수증에 대해 질문했습니다.
절대 병원을 비난하거나 "폭리"와 같은 부정적인 단어를 사용하지 마세요. 
객관적이고 투명하게 의료비의 성격과 이유를 설명하여 환자의 '알 권리'를 충족시키는 것이 목적입니다.

[분석된 환자의 영수증 데이터]
총 진료비: ${contextData.totalAmount || '정보 없음'}원
본인 부담금: ${contextData.patientBurden || '정보 없음'}원
비급여 항목: ${contextData.nonCovered || '정보 없음'}원
주요 처치 항목: ${contextData.majorTreatments ? contextData.majorTreatments.join(", ") : '정보 없음'}
분석 요약: ${contextData.analysisSummary || '정보 없음'}

[환자의 질문]
"${question}"

친절하고 알기 쉬운 말로, 객관적인 정보를 제공해주세요.
`;

  const generateFn = async (modelName) => {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt
    });
    return response.text;
  };

  try {
    return await generateWithFallback(generateFn);
  } catch (error) {
    console.error("Error answering question:", error);
    throw error;
  }
}
