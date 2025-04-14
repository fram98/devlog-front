import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { 
  vscDarkPlus, 
  vs 
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

const PostContent = ({ content, isDarkMode }) => {
  // 커스텀 코드 하이라이팅 스타일
  const customCodeStyle = {
    light: {
      ...vs,
      'pre[class*="language-"]': {
        ...vs['pre[class*="language-"]'],
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Andale Mono', monospace",
        fontSize: '0.95rem',
        lineHeight: '1.5',
        padding: '1.25rem',
        borderRadius: '0.5rem',
        background: '#F8FAFC',
      },
      'code[class*="language-"]': {
        ...vs['code[class*="language-"]'],
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Andale Mono', monospace",
        fontSize: '0.95rem',
        lineHeight: '1.5',
      },
      'comment': {
        ...vs['comment'],
        color: '#65748B',
      },
      'keyword': {
        ...vs['keyword'],
        color: '#7C3AED',
      },
      'string': {
        ...vs['string'],
        color: '#059669',
      },
    },
    dark: {
      ...vscDarkPlus,
      'pre[class*="language-"]': {
        ...vscDarkPlus['pre[class*="language-"]'],
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Andale Mono', monospace",
        fontSize: '0.95rem',
        lineHeight: '1.5',
        padding: '1.25rem',
        borderRadius: '0.5rem',
        background: '#1E293B',
      },
      'code[class*="language-"]': {
        ...vscDarkPlus['code[class*="language-"]'],
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Andale Mono', monospace",
        fontSize: '0.95rem',
        lineHeight: '1.5',
      },
      'comment': {
        ...vscDarkPlus['comment'],
        color: '#94A3B8',
      }
    }
  };
  
  // 화면 크기에 따른 폰트 사이즈 설정을 위한 함수
  const getResponsiveFontSize = () => {
    // window 객체가 있는지 확인 (SSR 호환성)
    if (typeof window === 'undefined') return '0.95rem';
    
    if (window.innerWidth < 640) {
      return '0.85rem'; // 모바일 화면
    } else if (window.innerWidth < 768) {
      return '0.9rem'; // 태블릿(소형)
    } else {
      return '0.95rem'; // 데스크탑
    }
  };
  
  // 반응형 스타일 초기화
  const [fontSize, setFontSize] = React.useState('0.95rem');
  const [lineNumbersVisible, setLineNumbersVisible] = React.useState(true);
  
  // 화면 크기 변화 감지
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setFontSize(getResponsiveFontSize());
      setLineNumbersVisible(window.innerWidth >= 640); // 모바일에서는 줄 번호 숨김
    };
    
    // 초기 설정
    handleResize();
    
    // 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);
    
    // 클린업
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // react-markdown 컴포넌트의 renderers를 정의하여 코드 블록 커스터마이징
  const renderers = {
    // 코드 블록 렌더러
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      const code = String(children).replace(/\n$/, '');
      
      if (!inline && language) {
        return (
          <div className="my-8 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-200 hover:shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center overflow-hidden">
                <div className="hidden sm:flex space-x-1.5 mr-3">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                  <span className="w-3 h-3 rounded-full bg-green-400"></span>
                </div>
                
                {language && (
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full truncate">
                    {language}
                  </span>
                )}
              </div>
              
              <CopyButton code={code} />
            </div>
            
            {/* Code Content */}
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
              <SyntaxHighlighter
                language={language}
                style={isDarkMode ? customCodeStyle.dark : customCodeStyle.light}
                showLineNumbers={lineNumbersVisible}
                wrapLines={true}
                customStyle={{
                  margin: 0,
                  borderRadius: 0,
                  background: isDarkMode ? '#1E293B' : '#F8FAFC',
                  fontSize: fontSize,
                  padding: window.innerWidth < 640 ? '1rem' : '1.25rem',
                }}
                lineNumberStyle={{
                  minWidth: '2.25em',
                  paddingRight: '0.75em',
                  paddingLeft: '0.5em',
                  marginRight: '0.75em',
                  borderRight: isDarkMode ? '1px solid #334155' : '1px solid #E2E8F0',
                  textAlign: 'right',
                  userSelect: 'none',
                  color: isDarkMode ? '#64748B' : '#94A3B8',
                }}
                codeTagProps={{
                  style: {
                    fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Andale Mono', monospace",
                    lineHeight: '1.5',
                    fontSize: fontSize,
                  }
                }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
        );
      }
      
      if (inline) {
        return (
          <code className="px-1.5 py-0.5 mx-0.5 rounded font-mono text-sm text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30" {...props}>
            {children}
          </code>
        );
      }
      
      return (
        <div className="my-6 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
          <SyntaxHighlighter
            language="text"
            style={isDarkMode ? customCodeStyle.dark : customCodeStyle.light}
            customStyle={{
              borderRadius: '0.5rem',
              margin: 0,
              fontSize: fontSize,
              padding: window.innerWidth < 640 ? '1rem' : '1.25rem',
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      );
    },
    // 헤딩 태그에 ID 추가 (목차 링크용)
    h1: ({ node, ...props }) => (
      <h1 
        id={props.children.toString().toLowerCase().replace(/\s+/g, '-')} 
        className="text-2xl sm:text-3xl font-bold mt-8 sm:mt-10 mb-3 sm:mb-4 text-gray-900 dark:text-white"
        {...props} 
      />
    ),
    h2: ({ node, ...props }) => (
      <h2 
        id={props.children.toString().toLowerCase().replace(/\s+/g, '-')} 
        className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-2 sm:mb-3 text-gray-800 dark:text-gray-100"
        {...props} 
      />
    ),
    h3: ({ node, ...props }) => (
      <h3 
        id={props.children.toString().toLowerCase().replace(/\s+/g, '-')} 
        className="text-lg sm:text-xl font-bold mt-4 sm:mt-6 mb-2 text-gray-800 dark:text-gray-200"
        {...props} 
      />
    ),
    // 단락
    p: ({ node, ...props }) => (
      <p className="my-4 text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg" {...props} />
    ),
    // 리스트
    ul: ({ node, ...props }) => (
      <ul className="my-4 pl-5 sm:pl-6 list-disc text-gray-700 dark:text-gray-300 text-base sm:text-lg" {...props} />
    ),
    ol: ({ node, ...props }) => (
      <ol className="my-4 pl-5 sm:pl-6 list-decimal text-gray-700 dark:text-gray-300 text-base sm:text-lg" {...props} />
    ),
    li: ({ node, ...props }) => (
      <li className="my-1" {...props} />
    ),
    // 인용구
    blockquote: ({ node, ...props }) => (
      <blockquote 
        className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400 text-gray-700 dark:text-gray-300 italic"
        {...props} 
      />
    ),
    // 강조
    strong: ({ node, ...props }) => (
      <strong className="font-bold text-gray-900 dark:text-white" {...props} />
    ),
    // 링크
    a: ({ node, ...props }) => (
      <a 
        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    )
  };
  
  return (
    <div className="prose prose-base sm:prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-blue-600">
      <ReactMarkdown components={renderers}>{content}</ReactMarkdown>
    </div>
  );
};

// 코드 복사 버튼 컴포넌트
const CopyButton = ({ code }) => {
  const [copied, setCopied] = React.useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
      title="코드 복사"
      aria-label="코드 복사"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );
};

export default PostContent;