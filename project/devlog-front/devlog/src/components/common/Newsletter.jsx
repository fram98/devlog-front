import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setMessage({ type: 'error', text: '이메일을 입력해주세요.' });
      return;
    }
    
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });
    
    try {
      // API 연동 부분 (실제 서버 구현 시 연결)
      // const response = await fetch('/api/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      
      // if (!response.ok) throw new Error('구독 처리 중 오류가 발생했습니다.');
      
      // 성공 시나리오 (API 연결 전 모의 처리)
      setTimeout(() => {
        setMessage({ type: 'success', text: '성공적으로 구독되었습니다! 최신 개발 소식을 받아보세요.' });
        setEmail('');
        setIsSubmitting(false);
      }, 800);
      
    } catch (error) {
      setMessage({ type: 'error', text: error.message || '구독 처리 중 오류가 발생했습니다.' });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-900 dark:via-blue-800 dark:to-indigo-900 rounded-2xl overflow-hidden">
      <div className="px-8 py-12 md:p-12 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 md:p-6 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 shrink-0">
            <Mail className="w-10 h-10 text-white" />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">최신 개발 소식을 받아보세요</h3>
            <p className="text-blue-100 mb-6 text-lg">
              백엔드 개발 트렌드, 튜토리얼, 팁을 정기적으로 받아보세요.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-0 md:flex md:gap-3 max-w-lg mx-auto md:mx-0">
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="이메일 주소"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-5 pr-12 py-4 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-blue-100 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                  disabled={isSubmitting}
                />
                <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-100" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center whitespace-nowrap px-6 py-4 bg-white text-blue-700 dark:text-blue-600 font-medium rounded-xl hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors disabled:opacity-70 w-full md:w-auto"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    처리 중...
                  </span>
                ) : (
                  <span className="flex items-center">
                    구독하기
                    <Send className="ml-2 w-4 h-4" />
                  </span>
                )}
              </button>
            </form>
            
            {message.text && (
              <div className={`mt-4 flex items-center ${message.type === 'error' ? 'text-red-200' : 'text-green-200'}`}>
                {message.type === 'error' ? (
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                ) : (
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                )}
                <span>{message.text}</span>
              </div>
            )}
            
            <p className="text-blue-200/80 text-sm mt-4">
              언제든지 구독을 취소할 수 있습니다. 스팸 메일은 보내지 않습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;