import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

// 포스트 프리뷰 컴포넌트 - PostContent의 간소화 버전
const PostPreview = ({ content, isDarkMode }) => {
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
    }
  };

  // 마크다운 렌더링을 위한 컴포넌트 정의
  const renderers = {
    // 코드 블록 렌더링
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      const code = String(children).replace(/\n$/, '');
      
      if (!inline && language) {
        return (
          <div className="my-8 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="flex space-x-1.5 mr-3">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                  <span className="w-3 h-3 rounded-full bg-green-400"></span>
                </div>
                
                {language && (
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                    {language}
                  </span>
                )}
              </div>
            </div>
            
            {/* Code Content */}
            <div className="overflow-x-auto">
              <SyntaxHighlighter
                language={language}
                style={isDarkMode ? customCodeStyle.dark : customCodeStyle.light}
                showLineNumbers={true}
                wrapLines={true}
                customStyle={{
                  margin: 0,
                  borderRadius: 0,
                  background: isDarkMode ? '#1E293B' : '#F8FAFC',
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
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      );
    },
    
    // 헤딩 태그
    h1: ({ node, ...props }) => (
      <h1 className="text-3xl font-bold mt-10 mb-4 text-gray-900 dark:text-white" {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-800 dark:text-gray-100" {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="text-xl font-bold mt-6 mb-2 text-gray-800 dark:text-gray-200" {...props} />
    ),
    
    // 단락
    p: ({ node, ...props }) => (
      <p className="my-4 text-gray-700 dark:text-gray-300 leading-relaxed" {...props} />
    ),
    
    // 리스트
    ul: ({ node, ...props }) => (
      <ul className="my-4 pl-6 list-disc text-gray-700 dark:text-gray-300" {...props} />
    ),
    ol: ({ node, ...props }) => (
      <ol className="my-4 pl-6 list-decimal text-gray-700 dark:text-gray-300" {...props} />
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
        {...props}
      />
    ),
    
    // 이미지
    img: ({ node, ...props }) => (
      <img 
        className="max-w-full my-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
        alt={props.alt || ''}
        {...props}
      />
    ),
  };
  
  // 내용이 없는 경우 안내 메시지 표시
  if (!content || content.trim() === '') {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 italic">
        미리보기할 내용이 없습니다. 왼쪽에서 마크다운 형식으로 글을 작성해보세요.
      </div>
    );
  }
  
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-blue-600">
      <ReactMarkdown components={renderers}>{content}</ReactMarkdown>
    </div>
  );
};

export default PostPreview;