import React, { useState } from 'react';
import { 
  X, Sparkles, Send, Bot, User, Loader2, ShieldCheck, 
  Wrench, HelpCircle, CheckCircle2 
} from 'lucide-react';
import { Language } from '../types';

interface AiAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export const AiAdvisorModal: React.FC<AiAdvisorModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  if (!isOpen) return null;

  const isAr = language === 'ar';

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: isAr
        ? 'أهلاً بك في مستشار SOLIMAN - MEGA SYSTEM الذكي! ⚡ يسعدني إجابة أي استفسار حول ترشيح أفضل آيفون/ماك لميزانيتك، أو تشخيص أعطال الصيانة وأسعار الشاشات والبطاريات.'
        : 'Welcome to SOLIMAN - MEGA SYSTEM AI Assistant! Ask me anything about Apple device recommendations, trade-in values, or repair diagnostics.'
    }
  ]);

  const handleSendPrompt = async (promptToSend?: string) => {
    const text = promptToSend || inputPrompt;
    if (!text.trim() || loading) return;

    // Append user message
    const updatedMessages = [...messages, { sender: 'user' as const, text }];
    setMessages(updatedMessages);
    if (!promptToSend) setInputPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text })
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: data.reply || (isAr ? 'نعتذر عن حدوث مؤقت في المعالجة. يرجى التواصل عبر واتساب الفرع.' : 'Sorry, could not fetch AI response.')
        }
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: isAr ? 'يسعدنا مساعدتك! يمكنك الاستفسار أيضاً مباشرة بالفرع أو عبر واتساب خدمة العملاء.' : 'Error connecting to AI advisor.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sampleQuestions = [
    isAr ? 'ما أفضل آيفون مستعمل بميزانية 40 ألف؟' : 'Best used iPhone under 40k EGP?',
    isAr ? 'كم تكلفة تغيير شاشة آيفون 15 برو أصلية؟' : 'Cost of original iPhone 15 Pro screen?',
    isAr ? 'كيف أحافظ على صحة بطارية الآيفون فوق 95%؟' : 'How to keep battery health above 95%?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 text-white rounded-3xl max-w-2xl w-full h-[600px] flex flex-col justify-between shadow-2xl border border-emerald-500/30 relative font-sans">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950 to-slate-900 border-b border-emerald-800/60 rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-800 rounded-xl text-amber-300 shadow-md">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                <span>{isAr ? 'مستشار آي تك الذكي (Gemini AI)' : 'iTech AI Advisor'}</span>
                <span className="text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full font-black">
                  PRO
                </span>
              </h3>
              <p className="text-[11px] text-slate-300">
                {isAr ? 'مساعدك الذكي للشراء والتثمين وشرح أساليب الصيانة' : 'Instant smart device & repair assistant'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 text-xs leading-relaxed ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-emerald-800 text-amber-300 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl max-w-[85%] ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white font-semibold rounded-tr-none'
                    : 'bg-slate-800/90 text-slate-100 border border-slate-700 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-amber-400 bg-slate-800/60 p-3 rounded-2xl w-fit border border-slate-700">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{isAr ? 'جاري تحليل سؤالك بذكاء جيميناي...' : 'AI thinking...'}</span>
            </div>
          )}
        </div>

        {/* Quick Sample Chips & Input Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 rounded-b-3xl space-y-3">
          {messages.length < 3 && (
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
              {sampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendPrompt(q)}
                  className="whitespace-nowrap text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-emerald-300 px-3 py-1.5 rounded-full border border-slate-700 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
              placeholder={isAr ? 'اسأل المساعد الذكي عن أي جهاز أو صيانة...' : 'Ask AI advisor anything...'}
              className="flex-1 bg-slate-900 border border-slate-700 focus:border-emerald-500 text-white text-xs rounded-xl p-3 focus:outline-none"
            />
            <button
              onClick={() => handleSendPrompt()}
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-xl transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
