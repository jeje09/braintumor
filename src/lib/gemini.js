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
당신은 한국의 진료비 계산서/영수증을 분석하여 지정된 폼(Form) 양식에 맞게 데이터를 추출하는 전문 AI입니다.
업로드된 이미지는 환자의 입원(또는 외래) 진료비 영수증입니다.
이 영수증의 내용을 분석하여 아래의 구조화된 JSON 포맷으로 정확히 추출해주세요.
개인정보(환자 성명, 주민번호 등)가 보인다면 무시하세요.

[매우 중요한 OCR 판독 규칙]
1. 금액이 표의 가로선(테두리 선)에 걸쳐서 인쇄되어 있는 경우가 자주 발생합니다.
2. 만약 어떤 금액 숫자가 위쪽 항목칸과 아래쪽 항목칸을 나누는 선에 걸쳐 있다면, 무조건 **그 선의 아래쪽 항목**에 해당하는 금액으로 판단하고 매칭해야 합니다. 
3. 빈칸(금액이 없는 항목)은 절대 0이나 임의의 숫자를 넣지 말고 null 로 처리하세요.

분석을 원하는 필수 항목 스키마 (반드시 이 구조를 지킬 것):
{
  "basicInfo": {
    "병원명": "...",
    "진료과목": "...",
    "병명": "...", 
    "입원기간": "...",
    "진료비총액": null, // 숫자 또는 null
    "공단부담총액": null,
    "본인부담총액": null
  },
  "items": {
    "진찰료": { "본인부담금": null, "공단부담금": null, "전액본인부담금": null, "비급여": null },
    "입원료_1인실": { "본인부담금": null, "공단부담금": null, "전액본인부담금": null, "비급여": null },
    "입원료_2인실": { "본인부담금": null, "공단부담금": null, "전액본인부담금": null, "비급여": null },
    "입원료_4인실이상": { "본인부담금": null, "공단부담금": null, "전액본인부담금": null, "비급여": null },
    "식대": { "본인부담금": null, "공단부담금": null, "전액본인부담금": null, "비급여": null },
    "투약및조제료": { "본인부담금": null, "공단부담금": null, "전액본인부담금": null, "비급여": null },
    "주사료": { "본인부담금": null, "공단부담금": null, "전액본인부담금": null, "비급여": null },
    "마취료": { "본인부담금": null, "공단부담금": null, "전액본인부담금": null, "비급여": null },
    "처치및수술료": { "본인부담금": null, "공단부담금": null, "전액본인부담금": null, "비급여": null },
    "검사료": { "본인부담금": null, "공단부담금": null, "전액본인부담금": null, "비급여": null },
    "영상진단료": { "본인부담금": null, "공단부담금": null, "전액본인부담금": null, "비급여": null },
    "방사선치료료": { "본인부담금": null, "공단부담금": null, "전액본인부담금": null, "비급여": null },
    "치료재료대": { "본인부담금": null, "공단부담금": null, "전액본인부담금": null, "비급여": null },
    "재활및물리치료료": { "본인부담금": null, "공단부담금": null, "전액본인부담금": null, "비급여": null },
    "정신요법료": { "본인부담금": null, "공단부담금": null, "전액본인부담금": null, "비급여": null },
    "전혈및혈액성분제제료": { "본인부담금": null, "공단부담금": null, "전액본인부담금": null, "비급여": null },
    "CT진단료": { "본인부담금": null, "공단부담금": null, "전액본인부담금": null, "비급여": null },
    "MRI진단료": { "본인부담금": null, "공단부담금": null, "전액본인부담금": null, "비급여": null },
    "PET진단료": { "본인부담금": null, "공단부담금": null, "전액본인부담금": null, "비급여": null },
    "초음파진단료": { "본인부담금": null, "공단부담금": null, "전액본인부담금": null, "비급여": null },
    "보철교정료": { "본인부담금": null, "공단부담금": null, "전액본인부담금": null, "비급여": null },
    "선택진료료": { "본인부담금": null, "공단부담금": null, "전액본인부담금": null, "비급여": null },
    "선택진료료이외": { "본인부담금": null, "공단부담금": null, "전액본인부담금": null, "비급여": null }
  },
  "extraItems": [
    // 위에 명시되지 않은 기타 항목이 있다면 이 배열에 추가하세요.
    // 형식: { "name": "기타항목명", "본인부담금": 1000, "공단부담금": null, "전액본인부담금": null, "비급여": null }
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
