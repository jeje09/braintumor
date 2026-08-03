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
당신은 한국의 의료비 영수증을 분석하는 환자 권리 데이터센터의 AI 어시스턴트입니다.
업로드된 이미지는 환자의 진료비 계산서/영수증입니다.
이 영수증의 내용을 분석하여 아래의 구조화된 JSON 포맷으로 데이터를 추출해주세요.
개인정보(환자명, 주민번호 등)가 보인다면 그 부분은 무시하고 추출하지 마세요.

분석을 원하는 필수 항목:
- totalAmount: 총 진료비 (숫자만, 단위 제외)
- patientBurden: 환자 본인 부담금 총액 (숫자만)
- insuranceCovered: 건강보험 적용 항목 총액 (숫자만)
- nonCovered: 비급여 항목 총액 (숫자만)
- majorTreatments: 영수증에 나타난 주요 처치/검사/약제 항목들의 배열 (예: ["MRI 검사", "선택진료비", "입원료", "수술료(형광유도 등)"])
- analysisSummary: 환자가 이해하기 쉬운 1-2문장의 영수증 요약 분석. (예: "비급여 항목인 형광유도 약제비 비중이 높은 영수증입니다.")

반드시 순수한 JSON 문자열만 반환하세요 (마크다운 코드 블록 제거).
형식:
{
  "totalAmount": 15000000,
  "patientBurden": 1500000,
  "insuranceCovered": 13500000,
  "nonCovered": 3000000,
  "majorTreatments": ["MRI", "입원료", "마취료"],
  "analysisSummary": "이 영수증은 비급여 비중이 높은 편입니다."
}
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
