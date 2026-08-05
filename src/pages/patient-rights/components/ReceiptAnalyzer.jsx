import React, { useState, useRef } from 'react';
import { Upload, FileImage, FileText, Loader2, Save, MessageCircle, PlusCircle, Trash2, CheckCircle2 } from 'lucide-react';
import { analyzeMedicalReceipt } from '../../../lib/gemini';
import { supabase } from '../../../lib/supabase';

// 빈 항목 템플릿
const emptyItemTemplate = {
  name: '',
  본인부담금: '',
  공단부담금: '',
  전액본인부담금: '',
  비급여: ''
};

const initialFormState = {
  basicInfo: {
    병원명: '',
    병명: '',
    입원기간: '',
    진료비총액: '',
    본인부담금총액: '',
    공단부담금총액: '',
    전액본인부담금총액: '',
    비급여총액: ''
  },
  items: []
};

export const ReceiptAnalyzer = ({ onAnalysisComplete }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // 폼 상태
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(initialFormState)));
  const [analysisSummary, setAnalysisSummary] = useState('');
  
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
      setError('');
      setSaveSuccess(false);
    }
  };

  const parseNumberOrEmpty = (val) => {
    if (val === null || val === undefined || val === '') return '';
    return String(val);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setError('');
    setSaveSuccess(false);
    if (onAnalysisComplete) onAnalysisComplete(null);
    
    try {
      const result = await analyzeMedicalReceipt(selectedFile);
      if (result.error) {
        setError(result.error);
      } else {
        const newForm = JSON.parse(JSON.stringify(initialFormState));
        
        if (result.basicInfo) {
          Object.keys(newForm.basicInfo).forEach(key => {
            if (result.basicInfo[key] !== undefined) {
              newForm.basicInfo[key] = parseNumberOrEmpty(result.basicInfo[key]);
            }
          });
        }

        if (result.items && Array.isArray(result.items)) {
          newForm.items = result.items.map(item => ({
            name: item.name || '',
            본인부담금: parseNumberOrEmpty(item.본인부담금),
            공단부담금: parseNumberOrEmpty(item.공단부담금),
            전액본인부담금: parseNumberOrEmpty(item.전액본인부담금),
            비급여: parseNumberOrEmpty(item.비급여)
          }));
        }

        setFormData(newForm);
        setAnalysisSummary(result.analysisSummary || '');
      }
    } catch (err) {
      setError(err.message || '영수증 분석 중 오류가 발생했습니다.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBasicInfoChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, [key]: value }
    }));
    setSaveSuccess(false);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData(prev => ({ ...prev, items: newItems }));
    setSaveSuccess(false);
  };

  const addItemRow = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { ...emptyItemTemplate }]
    }));
  };

  const removeItemRow = (index) => {
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError('');
    setSaveSuccess(false);
    try {
      // 빈 항목 제거 (이름이 없거나 모든 금액이 없는 경우)
      const cleanData = JSON.parse(JSON.stringify(formData));
      cleanData.items = cleanData.items.filter(item => 
        item.name.trim() !== '' || item.본인부담금 || item.공단부담금 || item.전액본인부담금 || item.비급여
      );
      
      const { data, error: dbError } = await supabase
        .from('receipts')
        .insert([{
          hospital_name: cleanData.basicInfo.병원명,
          disease_name: cleanData.basicInfo.병명,
          period: cleanData.basicInfo.입원기간,
          total_amount: Number(String(cleanData.basicInfo.진료비총액 || '').replace(/,/g, '')) || null,
          raw_data: cleanData
        }]);

      if (dbError) throw dbError;
      
      setSaveSuccess(true);
      // 부모 컴포넌트에 데이터 전달 (통계용)
      if (onAnalysisComplete) {
        onAnalysisComplete(cleanData);
      }
    } catch (err) {
      console.error(err);
      setError('데이터베이스 저장에 실패했습니다: ' + (err.message || '알 수 없는 오류'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-3">
          <FileText className="w-7 h-7 text-blue-600" />
          입원진료비 청구서 분석
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2 font-medium">
          영수증 사진을 업로드하면 필요한 항목만 요약하여 기록합니다. 비어있는 칸은 제외되며, 잘못된 부분은 직접 수정하고 저장할 수 있습니다.
        </p>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Left Column: Upload */}
          <div className="xl:col-span-4 flex flex-col gap-4">
            {!selectedFile ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-blue-300 dark:border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-800/50 transition-colors h-72 group"
              >
                <div className="w-16 h-16 bg-blue-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-slate-700 dark:text-slate-300 font-bold text-lg">영수증 이미지 업로드</p>
                <p className="text-sm text-slate-500 mt-1">클릭하여 파일을 선택하세요</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 relative group h-72 shadow-inner">
                <img src={previewUrl} alt="영수증 미리보기" className="w-full h-full object-contain" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl('');
                      setFormData(JSON.parse(JSON.stringify(initialFormState)));
                      setAnalysisSummary('');
                      if (onAnalysisComplete) onAnalysisComplete(null);
                    }}
                    className="bg-white text-slate-900 px-5 py-2.5 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-lg"
                  >
                    다른 사진 올리기
                  </button>
                </div>
              </div>
            )}

            {selectedFile && (
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> AI 분석 진행 중...</>
                ) : (
                  <><FileImage className="w-5 h-5" /> 영수증 내용 추출하기</>
                )}
              </button>
            )}

            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-200 font-medium">
                {error}
              </div>
            )}
            
            {saveSuccess && (
              <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl text-sm border border-emerald-200 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                데이터베이스 저장 완료! 아래 통계에 반영됩니다.
              </div>
            )}
            
            {analysisSummary && (
              <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-xl text-sm text-indigo-900 flex flex-col gap-3 shadow-inner">
                <div className="flex items-center gap-2 font-black text-indigo-700">
                  <MessageCircle className="w-5 h-5 shrink-0" /> AI 분석 결과 요약
                </div>
                <p className="leading-relaxed font-medium">{analysisSummary}</p>
              </div>
            )}
          </div>

          {/* Right Column: Simple Record Form */}
          <div className="xl:col-span-8 flex flex-col gap-6">
            
            {/* 기본 정보 및 총액 카드 */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
                기초 정보 및 총액 요약
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">병원명</label>
                  <input type="text" value={formData.basicInfo.병원명} onChange={(e) => handleBasicInfoChange('병원명', e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="예: 서울대학교병원" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">병명 (진단명)</label>
                  <input type="text" value={formData.basicInfo.병명} onChange={(e) => handleBasicInfoChange('병명', e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="예: 뇌종양" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">입원기간</label>
                  <input type="text" value={formData.basicInfo.입원기간} onChange={(e) => handleBasicInfoChange('입원기간', e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="예: 2026.01.01 ~ 01.10" />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-black text-blue-800 dark:text-blue-300 mb-1.5">총 금액</label>
                  <input type="text" value={formData.basicInfo.진료비총액} onChange={(e) => handleBasicInfoChange('진료비총액', e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/20 font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="0" />
                </div>
                
                <div className="md:border-l md:border-slate-200 md:dark:border-slate-700 md:pl-4">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">일부본인: 본인부담금</label>
                  <input type="text" value={formData.basicInfo.본인부담금총액} onChange={(e) => handleBasicInfoChange('본인부담금총액', e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="0" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">일부본인: 공단부담금</label>
                  <input type="text" value={formData.basicInfo.공단부담금총액} onChange={(e) => handleBasicInfoChange('공단부담금총액', e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="0" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">급여: 전액본인부담</label>
                  <input type="text" value={formData.basicInfo.전액본인부담금총액} onChange={(e) => handleBasicInfoChange('전액본인부담금총액', e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="0" />
                </div>

                <div>
                  <label className="block text-xs font-black text-amber-700 dark:text-amber-500 mb-1.5">비급여 총액</label>
                  <input type="text" value={formData.basicInfo.비급여총액} onChange={(e) => handleBasicInfoChange('비급여총액', e.target.value)}
                    className="w-full p-2.5 rounded-lg border-2 border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-900/20 text-sm font-bold text-amber-900 dark:text-amber-100 focus:ring-2 focus:ring-amber-500 outline-none transition-all" placeholder="0" />
                </div>
              </div>
            </div>

            {/* 세부 진료 항목 (빈칸 제외) */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <div className="w-2 h-6 bg-indigo-500 rounded-full"></div>
                  발생한 세부 진료 내역
                </h3>
                <button onClick={addItemRow} className="text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm">
                  <PlusCircle className="w-4 h-4" /> 항목 직접 추가하기
                </button>
              </div>

              {formData.items.length === 0 ? (
                <div className="py-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900/50 text-slate-400 font-medium">
                  분석을 실행하면 금액이 발생한 항목들만 이곳에 기록됩니다.<br/>짜여진 표가 아니라 빈칸을 제외한 내용만 표시됩니다.
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.items.map((item, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col lg:flex-row lg:items-center gap-4 relative group hover:border-indigo-200 transition-colors">
                      
                      {/* 항목명 */}
                      <div className="flex-1">
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">항목명</label>
                        <input type="text" value={item.name} onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                          placeholder="예: 입원료(1인실)" className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:w-[65%]">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-500 mb-1 truncate">일부본인: 본인부담</label>
                          <input type="text" value={item.본인부담금} onChange={(e) => handleItemChange(idx, '본인부담금', e.target.value)}
                            className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="-" />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-500 mb-1 truncate">일부본인: 공단부담</label>
                          <input type="text" value={item.공단부담금} onChange={(e) => handleItemChange(idx, '공단부담금', e.target.value)}
                            className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="-" />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-500 mb-1 truncate">급여: 전액본인</label>
                          <input type="text" value={item.전액본인부담금} onChange={(e) => handleItemChange(idx, '전액본인부담금', e.target.value)}
                            className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="-" />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-amber-600 mb-1 truncate">비급여</label>
                          <input type="text" value={item.비급여} onChange={(e) => handleItemChange(idx, '비급여', e.target.value)}
                            className="w-full p-2.5 rounded-lg border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-900/20 text-sm font-bold text-amber-900 dark:text-amber-100 focus:ring-2 focus:ring-amber-500 outline-none" placeholder="-" />
                        </div>
                      </div>

                      <button onClick={() => removeItemRow(idx)} className="absolute -top-3 -right-3 lg:static lg:w-auto bg-white lg:bg-transparent lg:p-2 p-1.5 rounded-full border border-slate-200 lg:border-none text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm lg:shadow-none" title="삭제">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* 저장 버튼 */}
            <div className="flex justify-end mt-2">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-10 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-3 disabled:opacity-70 disabled:hover:scale-100"
              >
                {isSaving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                데이터베이스에 저장 및 통계 반영
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
