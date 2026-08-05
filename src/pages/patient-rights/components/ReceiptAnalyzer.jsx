import React, { useState, useRef } from 'react';
import { Upload, FileImage, FileText, Loader2, Save, MessageCircle } from 'lucide-react';
import { analyzeMedicalReceipt } from '../../../lib/gemini';
import { supabase } from '../../../lib/supabase';

// 폼 초기 상태 정의
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
  items: {
    진찰료: { 본인부담금: '', 공단부담금: '', 전액본인부담금: '', 비급여: '' },
    입원료_1인실: { 본인부담금: '', 공단부담금: '', 전액본인부담금: '', 비급여: '' },
    입원료_2인실: { 본인부담금: '', 공단부담금: '', 전액본인부담금: '', 비급여: '' },
    입원료_4인실이상: { 본인부담금: '', 공단부담금: '', 전액본인부담금: '', 비급여: '' },
    식대: { 본인부담금: '', 공단부담금: '', 전액본인부담금: '', 비급여: '' },
    투약및조제료: { 본인부담금: '', 공단부담금: '', 전액본인부담금: '', 비급여: '' },
    주사료: { 본인부담금: '', 공단부담금: '', 전액본인부담금: '', 비급여: '' },
    마취료: { 본인부담금: '', 공단부담금: '', 전액본인부담금: '', 비급여: '' },
    처치및수술료: { 본인부담금: '', 공단부담금: '', 전액본인부담금: '', 비급여: '' },
    검사료: { 본인부담금: '', 공단부담금: '', 전액본인부담금: '', 비급여: '' },
    영상진단료: { 본인부담금: '', 공단부담금: '', 전액본인부담금: '', 비급여: '' },
    방사선치료료: { 본인부담금: '', 공단부담금: '', 전액본인부담금: '', 비급여: '' },
    치료재료대: { 본인부담금: '', 공단부담금: '', 전액본인부담금: '', 비급여: '' },
    재활및물리치료료: { 본인부담금: '', 공단부담금: '', 전액본인부담금: '', 비급여: '' },
    정신요법료: { 본인부담금: '', 공단부담금: '', 전액본인부담금: '', 비급여: '' },
    전혈및혈액성분제제료: { 본인부담금: '', 공단부담금: '', 전액본인부담금: '', 비급여: '' },
    CT진단료: { 본인부담금: '', 공단부담금: '', 전액본인부담금: '', 비급여: '' },
    MRI진단료: { 본인부담금: '', 공단부담금: '', 전액본인부담금: '', 비급여: '' },
    PET진단료: { 본인부담금: '', 공단부담금: '', 전액본인부담금: '', 비급여: '' },
    초음파진단료: { 본인부담금: '', 공단부담금: '', 전액본인부담금: '', 비급여: '' },
    보철교정료: { 본인부담금: '', 공단부담금: '', 전액본인부담금: '', 비급여: '' },
    선택진료료: { 본인부담금: '', 공단부담금: '', 전액본인부담금: '', 비급여: '' },
    선택진료료이외: { 본인부담금: '', 공단부담금: '', 전액본인부담금: '', 비급여: '' }
  },
  extraItems: []
};

// 표 렌더링용 순서 정의
const baseItemKeys = [
  { key: '진찰료', label: '진찰료', group: '기본항목' },
  { key: '입원료_1인실', label: '입원료 1인실', group: '기본항목' },
  { key: '입원료_2인실', label: '입원료 2인실', group: '기본항목' },
  { key: '입원료_4인실이상', label: '입원료 4인실 이상', group: '기본항목' },
  { key: '식대', label: '식대', group: '기본항목' },
  { key: '투약및조제료', label: '투약 및 조제료', group: '기본항목' },
  { key: '주사료', label: '주사료', group: '기본항목' },
  { key: '마취료', label: '마취료', group: '기본항목' },
  { key: '처치및수술료', label: '처치 및 수술료', group: '기본항목' },
  { key: '검사료', label: '검사료', group: '기본항목' },
  { key: '영상진단료', label: '영상진단료', group: '기본항목' },
  { key: '방사선치료료', label: '방사선치료료', group: '기본항목' },
  { key: '치료재료대', label: '치료재료대', group: '기본항목' },
  { key: '재활및물리치료료', label: '재활 및 물리치료료', group: '기본항목' },
  { key: '정신요법료', label: '정신요법료', group: '기본항목' },
  { key: '전혈및혈액성분제제료', label: '전혈 및 혈액성분제제료', group: '기본항목' },
  { key: 'CT진단료', label: 'CT 진단료', group: '선택항목' },
  { key: 'MRI진단료', label: 'MRI 진단료', group: '선택항목' },
  { key: 'PET진단료', label: 'PET 진단료', group: '선택항목' },
  { key: '초음파진단료', label: '초음파 진단료', group: '선택항목' },
  { key: '보철교정료', label: '보철/교정료', group: '선택항목' },
  { key: '선택진료료', label: '선택진료료', group: '선택항목' },
  { key: '선택진료료이외', label: '선택진료료 이외', group: '선택항목' }
];

export const ReceiptAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // 폼 상태 관리 (초기에는 빈 폼 표시)
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
    
    try {
      const result = await analyzeMedicalReceipt(selectedFile);
      if (result.error) {
        setError(result.error);
      } else {
        // AI가 추출한 결과를 폼 상태로 매핑
        const newForm = JSON.parse(JSON.stringify(initialFormState));
        
        if (result.basicInfo) {
          Object.keys(newForm.basicInfo).forEach(key => {
            if (result.basicInfo[key] !== undefined) {
              newForm.basicInfo[key] = parseNumberOrEmpty(result.basicInfo[key]);
            }
          });
        }

        if (result.items) {
          Object.keys(newForm.items).forEach(key => {
            if (result.items[key]) {
              newForm.items[key].본인부담금 = parseNumberOrEmpty(result.items[key].본인부담금);
              newForm.items[key].공단부담금 = parseNumberOrEmpty(result.items[key].공단부담금);
              newForm.items[key].전액본인부담금 = parseNumberOrEmpty(result.items[key].전액본인부담금);
              newForm.items[key].비급여 = parseNumberOrEmpty(result.items[key].비급여);
            }
          });
        }
        
        if (result.extraItems && Array.isArray(result.extraItems)) {
          newForm.extraItems = result.extraItems.map(item => ({
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

  // 폼 입력 핸들러
  const handleBasicInfoChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, [key]: value }
    }));
    setSaveSuccess(false);
  };

  const handleItemChange = (itemKey, columnKey, value) => {
    setFormData(prev => ({
      ...prev,
      items: {
        ...prev.items,
        [itemKey]: {
          ...prev.items[itemKey],
          [columnKey]: value
        }
      }
    }));
    setSaveSuccess(false);
  };
  
  const handleExtraItemChange = (index, columnKey, value) => {
    const newExtraItems = [...formData.extraItems];
    newExtraItems[index] = { ...newExtraItems[index], [columnKey]: value };
    setFormData(prev => ({ ...prev, extraItems: newExtraItems }));
    setSaveSuccess(false);
  };
  
  const addExtraItem = () => {
    setFormData(prev => ({
      ...prev,
      extraItems: [...prev.extraItems, { name: '', 본인부담금: '', 공단부담금: '', 전액본인부담금: '', 비급여: '' }]
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError('');
    setSaveSuccess(false);
    try {
      const cleanData = JSON.parse(JSON.stringify(formData));
      
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
    } catch (err) {
      console.error(err);
      setError('데이터베이스 저장에 실패했습니다: ' + (err.message || '알 수 없는 오류'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          입원진료비 청구서 입력 및 분석
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          영수증 사진을 업로드하면 AI가 아래 표에 맞춰 데이터를 자동으로 입력합니다. 잘못 입력된 부분이나 빈칸은 직접 클릭하여 언제든지 수정할 수 있습니다.
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Left Column: Upload */}
          <div className="xl:col-span-4 flex flex-col gap-4">
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
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 relative group h-[400px]">
                <img src={previewUrl} alt="영수증 미리보기" className="w-full h-full object-contain" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl('');
                      setFormData(JSON.parse(JSON.stringify(initialFormState)));
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
                ✅ 데이터베이스에 성공적으로 저장되었습니다.
              </div>
            )}
          </div>

          {/* Right Column: Editable Table */}
          <div className="xl:col-span-8 overflow-x-auto pb-4">
            <div className="min-w-[800px] border border-slate-900 bg-white">
              
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
                <div className="w-[8%] p-2 border-r border-slate-900 flex items-center justify-center tracking-widest">항목</div>
                <div className="w-[18%] p-2 border-r border-slate-900 flex items-center justify-center">세부내역</div>
                <div className="w-[54%] flex flex-col border-r border-slate-900">
                  <div className="py-1 border-b border-slate-900">급여</div>
                  <div className="flex flex-1">
                    <div className="w-1/3 py-1 border-r border-slate-900 flex items-center justify-center text-xs">본인부담금</div>
                    <div className="w-1/3 py-1 border-r border-slate-900 flex items-center justify-center text-xs">공단부담금</div>
                    <div className="w-1/3 py-1 flex items-center justify-center text-xs">전액본인부담금</div>
                  </div>
                </div>
                <div className="w-[20%] p-2 flex items-center justify-center">비급여</div>
              </div>

              {/* Data Rows */}
              {baseItemKeys.map((item, idx) => {
                const isGroupStart = idx === 0 || item.key === 'CT진단료';
                const rowSpan = item.group === '기본항목' ? 16 : 7;
                
                return (
                  <div key={item.key} className="flex border-b border-slate-900 hover:bg-slate-50 transition-colors group h-8">
                    {/* 첫 번째 열: 그룹(기본항목/선택항목) 표시 (야매 CSS 병합 대신 첫 줄에만 표시하고 나머진 비움) */}
                    <div className="w-[8%] border-r border-slate-900 bg-slate-50 flex items-center justify-center">
                       {isGroupStart && <span className="font-bold text-[10px] tracking-widest">{item.group}</span>}
                    </div>

                    {/* 두 번째 열: 항목명 */}
                    <div className="w-[18%] border-r border-slate-900 text-xs font-medium flex items-center pl-2">
                      {item.label}
                    </div>
                    
                    {/* 세 번째 열: 급여 (본인/공단/전액) */}
                    <div className="w-[54%] flex border-r border-slate-900">
                      <div className="w-1/3 border-r border-slate-900">
                        <input type="text" value={formData.items[item.key].본인부담금} onChange={(e) => handleItemChange(item.key, '본인부담금', e.target.value)}
                          className="w-full h-full border-none px-2 py-0 text-xs text-right focus:bg-blue-50 focus:outline-none group-hover:bg-transparent" />
                      </div>
                      <div className="w-1/3 border-r border-slate-900">
                        <input type="text" value={formData.items[item.key].공단부담금} onChange={(e) => handleItemChange(item.key, '공단부담금', e.target.value)}
                          className="w-full h-full border-none px-2 py-0 text-xs text-right focus:bg-blue-50 focus:outline-none group-hover:bg-transparent" />
                      </div>
                      <div className="w-1/3">
                        <input type="text" value={formData.items[item.key].전액본인부담금} onChange={(e) => handleItemChange(item.key, '전액본인부담금', e.target.value)}
                          className="w-full h-full border-none px-2 py-0 text-xs text-right focus:bg-blue-50 focus:outline-none group-hover:bg-transparent" />
                      </div>
                    </div>
                    
                    {/* 네 번째 열: 비급여 */}
                    <div className="w-[20%]">
                      <input type="text" value={formData.items[item.key].비급여} onChange={(e) => handleItemChange(item.key, '비급여', e.target.value)}
                        className="w-full h-full border-none px-2 py-0 text-xs text-right focus:bg-blue-50 focus:outline-none group-hover:bg-transparent" />
                    </div>
                  </div>
                );
              })}
              
              {/* Extra Items (기타 항목 동적 추가) */}
              {formData.extraItems.map((item, idx) => (
                <div key={`extra-${idx}`} className="flex border-b border-slate-900 hover:bg-slate-50 transition-colors h-8 group">
                  <div className="w-[8%] border-r border-slate-900 bg-slate-50 flex items-center justify-center">
                    {idx === 0 && <span className="font-bold text-[10px] tracking-widest text-slate-500">기타</span>}
                  </div>
                  <div className="w-[18%] border-r border-slate-900">
                     <input type="text" value={item.name} onChange={(e) => handleExtraItemChange(idx, 'name', e.target.value)}
                        placeholder="항목명 직접입력" className="w-full h-full border-none px-2 py-0 text-xs focus:bg-blue-50 focus:outline-none group-hover:bg-transparent" />
                  </div>
                  <div className="w-[54%] flex border-r border-slate-900">
                    <div className="w-1/3 border-r border-slate-900">
                      <input type="text" value={item.본인부담금} onChange={(e) => handleExtraItemChange(idx, '본인부담금', e.target.value)} className="w-full h-full border-none px-2 py-0 text-xs text-right focus:bg-blue-50 focus:outline-none group-hover:bg-transparent" />
                    </div>
                    <div className="w-1/3 border-r border-slate-900">
                      <input type="text" value={item.공단부담금} onChange={(e) => handleExtraItemChange(idx, '공단부담금', e.target.value)} className="w-full h-full border-none px-2 py-0 text-xs text-right focus:bg-blue-50 focus:outline-none group-hover:bg-transparent" />
                    </div>
                    <div className="w-1/3">
                      <input type="text" value={item.전액본인부담금} onChange={(e) => handleExtraItemChange(idx, '전액본인부담금', e.target.value)} className="w-full h-full border-none px-2 py-0 text-xs text-right focus:bg-blue-50 focus:outline-none group-hover:bg-transparent" />
                    </div>
                  </div>
                  <div className="w-[20%]">
                    <input type="text" value={item.비급여} onChange={(e) => handleExtraItemChange(idx, '비급여', e.target.value)} className="w-full h-full border-none px-2 py-0 text-xs text-right focus:bg-blue-50 focus:outline-none group-hover:bg-transparent" />
                  </div>
                </div>
              ))}
              
              <div className="flex">
                  <div className="w-full p-2 bg-slate-50 text-center border-t-0">
                    <button onClick={addExtraItem} className="text-xs text-blue-600 font-bold hover:underline py-1 px-4">+ 기타 항목 한 줄 추가하기</button>
                  </div>
              </div>
              
            </div>
            
            {analysisSummary && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 flex gap-3">
                <MessageCircle className="w-5 h-5 shrink-0" />
                <p>{analysisSummary}</p>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg shadow transition-colors flex items-center gap-2 disabled:opacity-70"
              >
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                데이터베이스에 저장하기
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
