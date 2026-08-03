import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Link as LinkIcon, X, CheckCircle } from 'lucide-react';

export const ImageDropzone = ({ value, onChange, label = "이미지 등록 (URL 입력 또는 드래그 앤 드롭)" }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [mode, setMode] = useState('drop'); // 'drop' | 'url'
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일(.jpg, .png, .webp, .gif)만 업로드할 수 있습니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      onChange(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
          {label}
        </label>
        
        {/* Toggle Mode */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-sm font-bold">
          <button
            type="button"
            onClick={() => setMode('drop')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              mode === 'drop'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            드래그/파일
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              mode === 'url'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            URL 직접입력
          </button>
        </div>
      </div>

      {/* Image Preview if value exists */}
      {value ? (
        <div className="relative group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 max-h-48 flex items-center justify-center p-2">
          <img
            src={value}
            alt="미리보기"
            className="max-h-44 object-contain rounded-xl shadow-md"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-3 right-3 p-2 bg-slate-600 text-white rounded-full opacity-90 group-hover:opacity-100 transition-opacity shadow-lg"
            title="이미지 삭제/재선택"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-3 bg-emerald-600/90 text-white text-sm font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md">
            <CheckCircle className="w-3 h-3" />
            <span>이미지 탑재 완료</span>
          </div>
        </div>
      ) : (
        <>
          {mode === 'drop' ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-6 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center space-y-2 ${
                isDragging
                  ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 scale-[1.01]'
                  : 'border-slate-300 dark:border-slate-700 hover:border-blue-400 bg-slate-50/50 dark:bg-slate-900/50'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden"
              />
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-inner">
                <UploadCloud className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                  이미지 파일(.jpg, .png, .webp)을 이 영역으로 드래그하거나 클릭하여 선택하세요
                </p>
                <p className="text-sm text-slate-400 mt-0.5">
                  마우스 드래그 앤 드롭 지원
                </p>
              </div>
            </div>
          ) : (
            <div className="relative">
              <LinkIcon className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
