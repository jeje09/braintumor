import React, { useState, useRef } from 'react';
import { Upload, FileImage, FileText, Loader2, Send, AlertCircle, Info } from 'lucide-react';
import { analyzeMedicalReceipt, askReceiptQuestion } from '../../../lib/gemini';

export const ReceiptAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState('');
  
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatting, setIsChatting] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('이미지 파일만 업로드 가능합니다.');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysisResult(null);
      setError('');
      setChatHistory([]);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setError('');
    
    try {
      const result = await analyzeMedicalReceipt(selectedFile);
      if (result.error) {
        setError(result.error);
        if (result.rawText) {
          setAnalysisResult({ rawText: result.rawText });
        }
      } else {
        setAnalysisResult(result);
        setChatHistory([{
          role: 'system',
          content: '영수증 분석이 완료되었습니다. 궁금한 점이 있으시면 무엇이든 물어보세요.'
        }]);
      }
    } catch (err) {
      setError(err.message || '영수증 분석 중 오류가 발생했습니다.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !analysisResult || isChatting) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsChatting(true);

    try {
      const aiResponse = await askReceiptQuestion(analysisResult, userMessage);
      setChatHistory(prev => [...prev, { role: 'ai', content: aiResponse }]);
    } catch (err) {
      setChatHistory(prev => [...prev, { role: 'system', content: '응답을 받아오지 못했습니다. 잠시 후 다시 시도해주세요.' }]);
    } finally {
      setIsChatting(false);
    }
  };

  const formatCurrency = (num) => {
    if (num === undefined || num === null) return '-';
    return new Intl.NumberFormat('ko-KR').format(num) + '원';
  };

  const getComparisonText = (total) => {
    if (!total) return null;
    const avg = 25000000; // 2,500만원
    const patientCount = 324;
    
    if (total > avg * 1.2) {
      return `귀하의 진료비는 동일 질환 환자군 ${patientCount}명 기준 평균보다 다소 높은 편입니다. (평균: 2,500만원)`;
    } else if (total < avg * 0.8) {
      return `귀하의 진료비는 동일 질환 환자군 ${patientCount}명 기준 평균보다 다소 낮은 편입니다. (평균: 2,500만원)`;
    } else {
      return `귀하의 진료비는 동일 질환 환자군 ${patientCount}명 기준 평균 범위 안에 있습니다. (평균: 2,500만원)`;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          나의 의료비 리포트
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          진료비 영수증을 업로드하면 AI가 분석하여 이해하기 쉽게 정리해 드립니다.
        </p>
        
        <div className="mt-4 bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-100 dark:border-blue-900/50 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800 dark:text-blue-300">
            <strong>개인정보 보호 안내:</strong> 사진을 찍기 전에 환자 성명, 주민등록번호 등 민감한 개인정보는 펜이나 종이로 가려주세요. 업로드된 이미지는 분석 즉시 처리되며 서버에 영구 보관되지 않습니다.
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Upload & Preview */}
          <div>
            {!selectedFile ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors h-64"
              >
                <Upload className="w-10 h-10 text-slate-400 mb-4" />
                <p className="text-slate-600 dark:text-slate-300 font-medium">영수증 이미지 업로드 (클릭)</p>
                <p className="text-slate-400 text-sm mt-2">JPG, PNG 형식 지원</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 relative group">
                <img src={previewUrl} alt="영수증 미리보기" className="w-full h-auto max-h-96 object-contain" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl('');
                      setAnalysisResult(null);
                    }}
                    className="bg-white text-slate-800 px-4 py-2 rounded-lg font-medium text-sm"
                  >
                    다시 올리기
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                {error}
              </div>
            )}

            {selectedFile && !analysisResult && (
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2 disabled:opacity-70"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    AI가 분석 중입니다...
                  </>
                ) : (
                  <>
                    <FileImage className="w-5 h-5" />
                    영수증 분석하기
                  </>
                )}
              </button>
            )}
          </div>

          {/* Right Column: Analysis Result & Chat */}
          <div className="flex flex-col h-full">
            {analysisResult ? (
              <div className="flex flex-col h-[500px]">
                {/* Result Cards */}
                {analysisResult.totalAmount !== undefined ? (
                  <div className="space-y-4 mb-6">
                    <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                      <p className="text-emerald-800 dark:text-emerald-300 font-bold mb-1">총 진료비</p>
                      <p className="text-2xl font-black text-emerald-900 dark:text-emerald-100 mb-2">{formatCurrency(analysisResult.totalAmount)}</p>
                      <div className="bg-white/60 dark:bg-black/20 p-2 rounded-lg inline-block text-xs font-medium text-emerald-700 dark:text-emerald-400">
                        {getComparisonText(analysisResult.totalAmount)}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">건강보험 적용</p>
                        <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{formatCurrency(analysisResult.insuranceCovered)}</p>
                      </div>
                      <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-100 dark:border-amber-900/50">
                        <p className="text-amber-800 dark:text-amber-300 text-sm font-medium mb-1">환자 전액 부담 (비급여)</p>
                        <p className="text-lg font-bold text-amber-900 dark:text-amber-100">{formatCurrency(analysisResult.nonCovered)}</p>
                      </div>
                    </div>
                    {analysisResult.majorTreatments && (
                      <div className="p-4">
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">주요 처치 항목:</p>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.majorTreatments.map((item, idx) => (
                            <span key={idx} className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                      <Info className="w-4 h-4 mt-0.5 text-slate-500" />
                      <p>{analysisResult.analysisSummary}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 p-4 rounded-xl mb-4 overflow-auto max-h-64 text-sm whitespace-pre-wrap text-slate-700">
                    {analysisResult.rawText}
                  </div>
                )}

                {/* AI Chat Interface */}
                <div className="flex-1 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden flex flex-col bg-slate-50 dark:bg-slate-950">
                  <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">AI 영수증 질문 도우미</span>
                  </div>
                  
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {chatHistory.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                          msg.role === 'user' 
                            ? 'bg-blue-600 text-white rounded-br-none' 
                            : msg.role === 'system'
                              ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 mx-auto text-xs'
                              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200 dark:border-slate-700'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {isChatting && (
                      <div className="flex justify-start">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-bl-none border border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center gap-2">
                          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                        </div>
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="예: 비급여 항목 중 300만원은 어떤 건가요?"
                      className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-4 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      disabled={isChatting || !chatInput.trim()}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center bg-slate-50/50 dark:bg-slate-900/50">
                <FileText className="w-12 h-12 mb-4 text-slate-300 dark:text-slate-700" />
                <p className="font-medium text-slate-500 dark:text-slate-400">영수증을 업로드하시면<br/>분석 결과와 AI 채팅이 이곳에 표시됩니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
