import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CreditCard, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

export const CheckoutModal = () => {
  const { paymentModal, closeCheckout } = useApp();
  const { isOpen, product, gateway } = paymentModal;

  const [selectedGateway, setSelectedGateway] = useState(gateway || 'paytap');
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !product) return null;

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setIsProcessing(false);
    closeCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-emerald-100 dark:border-slate-800 overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold bg-white/20 w-fit px-3 py-1 rounded-full mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>안전 전자결제 보안 연동</span>
          </div>
          <h2 className="text-xl font-bold">상품 주문 및 결제</h2>
          <p className="text-emerald-100 text-xs mt-1">
            {selectedGateway === 'paytap' ? 'Paytap (페이앱) 간편결제 시스템' : 'NHN KCP 신용카드 / 계좌이체 시스템'}
          </p>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">결제가 완료되었습니다!</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              [{product.title}] 주문이 정상 접수되었습니다.<br />
              지정하신 배송지로 안전하게 발송됩니다.
            </p>
            <button
              onClick={handleClose}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/30 transition-all"
            >
              확인 및 닫기
            </button>
          </div>
        ) : (
          <form onSubmit={handlePayment} className="p-6 space-y-5">
            {/* Product Info Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50/50 dark:bg-slate-800/50 border border-emerald-100 dark:border-slate-800">
              <img
                src={product.image}
                alt={product.title}
                className="w-16 h-16 rounded-xl object-cover shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-md">
                  {product.category}
                </span>
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate mt-1">
                  {product.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                    {product.price.toLocaleString()}원
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      {product.originalPrice.toLocaleString()}원
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Gateway Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                결제 대행사 (PG) 선택
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedGateway('paytap')}
                  className={`p-3.5 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    selectedGateway === 'paytap'
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 shadow-md'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <span>Paytap (페이앱)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedGateway('kcp')}
                  className={`p-3.5 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    selectedGateway === 'kcp'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 shadow-md'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>NHN KCP 결제</span>
                </button>
              </div>
            </div>

            {/* Form Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  주문자 성함
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  연락처 (핸드폰)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="010-0000-0000"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  배송지 주소
                </label>
                <input
                  type="text"
                  required
                  placeholder="배송받으실 상세 주소를 입력하세요"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-4 rounded-2xl font-bold text-white shadow-xl transition-all transform active:scale-95 ${
                selectedGateway === 'paytap'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-600/30'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-600/30'
              }`}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>결제 승인 진행 중...</span>
                </span>
              ) : (
                <span>
                  {product.price.toLocaleString()}원 {selectedGateway === 'paytap' ? 'Paytap 결제하기' : 'KCP 결제하기'}
                </span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
