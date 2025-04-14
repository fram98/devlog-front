import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

// ======= 컴포넌트 영역: 별도 파일로 추출 가능 =======

// CodeBlock.jsx
const CodeBlock = ({ code, language, title, showLineNumbers = true }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const codeLines = code.split('\n');
  
  return (
    <div className="my-8 rounded-xl overflow-hidden shadow-lg border border-gray-100 bg-white transition-all duration-200 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-blue-50 to-white border-b border-gray-100">
        <div className="flex items-center">
          <div className="flex space-x-1.5 mr-3">
            <span className="w-3 h-3 rounded-full bg-red-400"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="w-3 h-3 rounded-full bg-green-400"></span>
          </div>
          
          {title && (
            <span className="text-sm font-medium text-gray-700">
              {title}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {language && (
            <div className="px-2 py-1 text-xs font-mono rounded-full bg-blue-100 text-blue-700">
              {language}
            </div>
          )}
          
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            title="코드 복사"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-500" />}
          </button>
        </div>
      </div>
      
      {/* Code Content */}
      <div className="overflow-x-auto">
        <pre className="p-0 m-0 bg-gray-50">
          <div className="flex">
            {/* Line Numbers */}
            {showLineNumbers && (
              <div className="py-4 pl-4 pr-3 text-right select-none bg-gray-100 border-r border-gray-200">
                {codeLines.map((_, index) => (
                  <div key={index} className="text-xs font-mono text-gray-500">
                    {index + 1}
                  </div>
                ))}
              </div>
            )}
            
            {/* Code */}
            <code className="p-4 text-sm font-mono text-gray-800 flex-1">
              {codeLines.map((line, index) => (
                <div key={index} className="whitespace-pre">
                  {line || ' '}
                </div>
              ))}
            </code>
          </div>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;