import React, { useState } from 'react';
import { Lock, KeyRound, ShieldCheck, X, ArrowRight, AlertCircle } from 'lucide-react';
import { Language } from '../types';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
  language: Language;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticated,
  language
}) => {
  const isAr = language === 'ar';
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === '1234' || pin.trim().toLowerCase() === 'admin') {
      setError('');
      setPin('');
      onAuthenticated();
    } else {
      setError(isAr ? 'رمز المرور غير صحيح! الرمز الافتراضي هو 1234' : 'Invalid PIN! Default PIN is 1234');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-slate-100 font-sans">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-900 flex items-center justify-center mx-auto text-amber-300 shadow-lg shadow-emerald-900/40">
            <Lock className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight">
            {isAr ? 'تسجيل دخول لوحة الإدارة' : 'Admin Panel Login'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isAr 
              ? 'لوحة التحكم خفصة ومحمية بالكامل للإدارة فقط. يرجى إدخال رمز المرور للوصول.' 
              : 'The dashboard is strictly restricted for store administrators. Enter your PIN to continue.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'رمز مرور المدير (PIN)' : 'Admin PIN'}</span>
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => { setPin(e.target.value); setError(''); }}
              placeholder={isAr ? 'أدخل الرمز (مثال: 1234)' : 'Enter PIN (e.g. 1234)'}
              autoFocus
              className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:bg-slate-800/90 text-white rounded-xl py-3 px-4 text-center font-mono tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all placeholder:text-slate-500 placeholder:text-xs placeholder:tracking-normal"
            />
          </div>

          {error && (
            <div className="bg-rose-950/80 border border-rose-500/40 p-3 rounded-xl flex items-center gap-2 text-rose-300 text-xs font-semibold animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black py-3.5 rounded-xl shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            <ShieldCheck className="w-5 h-5 text-amber-300" />
            <span>{isAr ? 'تأكيد ودخول الإدارة' : 'Authenticate & Open'}</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-500 font-mono">
            {isAr ? 'الرمز الافتراضي للتجربة: 1234' : 'Default PIN for demo: 1234'}
          </p>
        </div>
      </div>
    </div>
  );
};
