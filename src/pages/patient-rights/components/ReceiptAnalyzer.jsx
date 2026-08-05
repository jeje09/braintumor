import React, { useState, useRef } from 'react';
import { Upload, FileImage, FileText, Loader2, Save, MessageCircle, PlusCircle, Trash2 } from 'lucide-react';
import { analyzeMedicalReceipt } from '../../../lib/gemini';
import { supabase } from '../../../lib/supabase';

// 빈 항목 템플릿
const emptyItemTemplate = {
  group: '기타항목',
  name: '',
  본인부담금: '',
  공단부담금: '',
  전액본인부담금: '',
  비급여: ''
};

const initialFormState = {
  basicInfo: {
    병원명: '',
    진료과목: '',
    병명: '',
    입원기간: '',
    진료비총액: '',
    공단부담총액: '',
    본인부담총액: ''
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
            group: item.group || '기타항목',
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
      // 빈 항목 제거 및 숫자 클렌징
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
          total_amount: Number(cleanData.basicInfo.진료비총액) || null,
          raw_data: cleanData
        }]);

      if (dbError) throw dbError;
      
      setSaveSuccess(true);
      // 부모 컴포넌트에 분석/저장된 데이터 전달 (통계용)
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

  // 그룹별 렌더링 지원 (첫 항목인지 체크)
  let lastRenderedGroup = null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          입원진료비 청구서 입력 및 분석
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          영수증 사진을 업로드하면 실제 기재된 항목만 동적으로 표에 채워집니다. 빈칸을 강제하지 않으며, 필요시 직접 항목을 추가/수정할 수 있습니다.
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Left Column: Upload */}
          <div className="xl:col-span-3 flex flex-col gap-4">
            {!selectedFile ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors h-64"
              >
                <Upload className="w-10 h-10 text-slate-400 mb-4" />
                <p className="text-slate-600 dark:text-slate-300 font-medium">영수증 이미지 업로드 (클릭)</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 relative group h-[300px]">
                <img src={previewUrl} alt="영수증 미리보기" className="w-full h-full object-contain" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl('');
                      setFormData(JSON.parse(JSON.stringify(initialFormState)));
                      setAnalysisSummary('');
                      if (onAnalysisComplete) onAnalysisComplete(null);
                    }}
                    className="bg-white text-slate-800 px-4 py-2 rounded-lg font-medium text-sm"
                  >
                    다시 올리기
                  </button>
                </div>
              </div>
            )}

            {selectedFile && (
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2 disabled:opacity-70"
              >
                {isAnalyzing ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> AI 자동 입력 중...</>
                ) : (
                  <><FileImage className="w-5 h-5" /> 영수증 AI 자동 입력</>
                )}
              </button>
            )}

            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                {error}
              </div>
            )}
            
            {saveSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg text-sm border border-emerald-200 font-medium">
                ✅ 데이터베이스에 성공적으로 저장되었습니다. 아래 통계에 즉시 반영됩니다.
              </div>
            )}
            
            {analysisSummary && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 flex flex-col gap-2">
                <div className="flex items-center gap-2 font-bold"><MessageCircle className="w-4 h-4 shrink-0" /> AI 분석 요약</div>
                <p className="leading-relaxed">{analysisSummary}</p>
              </div>
            )}
          </div>

          {/* Right Column: Editable Table */}
          <div className="xl:col-span-9 overflow-x-auto pb-4">
            <div className="min-w-[900px] border border-slate-900 bg-white">
              
              {/* Table Header Row 1 */}
              <div className="flex border-b border-slate-900">
                <div className="w-1/2 flex items-center justify-center font-bold text-xl p-4 border-r border-slate-900 bg-slate-50">
                  입원진료비 청구서 업로드
                </div>
                <div className="w-1/2 flex flex-col text-sm">
                  <div className="text-center font-bold border-b border-slate-900 py-1.5 bg-slate-100 tracking-widest">기초자료</div>
                  
                  {['병원명', '진료과목', '병명', '입원기간', '진료비총액', '공단부담총액', '본인부담총액'].map((field, idx) => (
                    <div key={field} className={`flex ${idx < 6 ? 'border-b border-slate-900' : ''} h-8`}>
                      <div className="w-1/3 bg-slate-50 border-r border-slate-900 flex items-center justify-center font-bold text-slate-800 text-xs">
                        {field}
                      </div>
                      <div className="w-2/3">
                        <input 
                          type="text" 
                          value={formData.basicInfo[field]} 
                          onChange={(e) => handleBasicInfoChange(field, e.target.value)}
                          className="w-full h-full border-none px-2 py-0 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-transparent"
                          placeholder=""
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spacer Row */}
              <div className="h-4 border-b border-slate-900 bg-slate-200"></div>

              {/* Table Header Row 2 (Columns) */}
              <div className="flex border-b border-slate-900 bg-slate-100 font-bold text-sm text-center">
                <div className="w-[8%] p-2 border-r border-slate-900 flex items-center justify-center tracking-widest">구분</div>
                <div className="w-[18%] p-2 border-r border-slate-900 flex items-center justify-center">항목명(세부내역)</div>
                <div className="w-[50%] flex flex-col border-r border-slate-900">
                  <div className="py-1 border-b border-slate-900">급여</div>
                  <div className="flex flex-1">
                    <div className="w-1/3 py-1 border-r border-slate-900 flex items-center justify-center text-xs">본인부담금</div>
                    <div className="w-1/3 py-1 border-r border-slate-900 flex items-center justify-center text-xs">공단부담금</div>
                    <div className="w-1/3 py-1 flex items-center justify-center text-xs">전액본인부담금</div>
                  </div>
                </div>
                <div className="w-[18%] p-2 border-r border-slate-900 flex items-center justify-center">비급여</div>
                <div className="w-[6%] p-2 flex items-center justify-center text-xs text-slate-500">관리</div>
              </div>

              {/* Dynamic Data Rows */}
              {formData.items.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-50 italic">
                  영수증 이미지를 업로드하고 분석하면 여기에 항목이 표시됩니다.
                </div>
              ) : (
                formData.items.map((item, idx) => {
                  const isNewGroup = lastRenderedGroup !== item.group;
                  lastRenderedGroup = item.group;
                  
                  return (
                    <div key={idx} className="flex border-b border-slate-900 hover:bg-slate-50 transition-colors group h-10">
                      {/* 그룹명 */}
                      <div className="w-[8%] border-r border-slate-900 bg-slate-50 flex items-center justify-center">
                        <input type="text" value={item.group} onChange={(e) => handleItemChange(idx, 'group', e.target.value)}
                           className="w-full h-full border-none px-1 py-0 text-[11px] font-bold text-center tracking-tighter focus:outline-none bg-transparent" />
                      </div>

                      {/* 항목명 */}
                      <div className="w-[18%] border-r border-slate-900 text-xs font-medium flex items-center">
                        <input type="text" value={item.name} onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                           placeholder="예: 입원료(1인실)" className="w-full h-full border-none px-2 py-0 text-xs focus:bg-blue-50 focus:outline-none group-hover:bg-transparent" />
                      </div>
                      
                      {/* 급여 (본인/공단/전액) */}
                      <div className="w-[50%] flex border-r border-slate-900">
                        <div className="w-1/3 border-r border-slate-900">
                          <input type="text" value={item.본인부담금} onChange={(e) => handleItemChange(idx, '본인부담금', e.target.value)}
                            className="w-full h-full border-none px-2 py-0 text-sm text-right focus:bg-blue-50 focus:outline-none group-hover:bg-transparent font-mono" />
                        </div>
                        <div className="w-1/3 border-r border-slate-900">
                          <input type="text" value={item.공단부담금} onChange={(e) => handleItemChange(idx, '공단부담금', e.target.value)}
                            className="w-full h-full border-none px-2 py-0 text-sm text-right focus:bg-blue-50 focus:outline-none group-hover:bg-transparent font-mono" />
                        </div>
                        <div className="w-1/3">
                          <input type="text" value={item.전액본인부담금} onChange={(e) => handleItemChange(idx, '전액본인부담금', e.target.value)}
                            className="w-full h-full border-none px-2 py-0 text-sm text-right focus:bg-blue-50 focus:outline-none group-hover:bg-transparent font-mono" />
                        </div>
                      </div>
                      
                      {/* 비급여 */}
                      <div className="w-[18%] border-r border-slate-900">
                        <input type="text" value={item.비급여} onChange={(e) => handleItemChange(idx, '비급여', e.target.value)}
                          className="w-full h-full border-none px-2 py-0 text-sm text-right focus:bg-blue-50 focus:outline-none group-hover:bg-transparent font-mono text-amber-700" />
                      </div>

                      {/* 삭제 버튼 */}
                      <div className="w-[6%] flex items-center justify-center">
                        <button onClick={() => removeItemRow(idx)} className="p-1 text-slate-300 hover:text-red-500 transition-colors" title="이 항목 삭제">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
              
              {/* 추가 버튼 */}
              <div className="flex">
                  <div className="w-full p-2 bg-slate-50 text-center border-t-0">
                    <button onClick={addItemRow} className="text-xs text-blue-600 font-bold hover:underline py-2 px-4 flex items-center justify-center gap-1 mx-auto">
                      <PlusCircle className="w-4 h-4" />
                      항목 수동 추가하기
                    </button>
                  </div>
              </div>
              
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg shadow transition-colors flex items-center gap-2 disabled:opacity-70"
              >
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                데이터베이스에 저장 및 통계 반영
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
