import { GoogleGenerativeAI } from "@google/generative-ai";

// API 키를 환경 변수에서 가져옵니다. (Vercel 배포 시 편의를 위해 하드코딩된 폴백 추가)
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyCvQNBkF14npueVAXdd8Co4UBRabFOgVCg";

let genAI = null;

if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

/**
 * File 객체를 Base64 형식의 GenerativePart로 변환하는 헬퍼 함수
 */
async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}

/**
 * 영수증 이미지를 분석하는 함수
 * @param {File} imageFile 
 * @returns {Promise<string>} 분석 결과 (JSON 문자열 또는 텍스트)
 */
export async function analyzeMedicalReceipt(imageFile) {
  if (!genAI) {
    throw new Error("Gemini API 키가 설정되지 않았습니다. .env 파일에 VITE_GEMINI_API_KEY를 설정해주세요.");
  }

  try {
    // 가장 최신의 multimodal 모델 사용
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

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

    const imageParts = [
      await fileToGenerativePart(imageFile),
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    let text = response.text();
    
    // JSON 파싱을 위해 마크다운 백틱 제거
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error("JSON 파싱 에러. 원본 텍스트 반환", text);
      return { rawText: text, error: "JSON 파싱 실패" };
    }

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
  if (!genAI) {
    throw new Error("Gemini API 키가 설정되지 않았습니다.");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

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

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error("Error answering question:", error);
    throw error;
  }
}
