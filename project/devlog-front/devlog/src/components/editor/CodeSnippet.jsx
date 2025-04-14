import { useState } from "react";
import { Check, Copy } from "lucide-react";

const CodeSnippet = ({ code, language, title }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="rounded-xl overflow-hidden shadow-md border border-gray-100 mb-6 transition-all duration-200 hover:shadow-lg">
      {title && (
        <div className="bg-gradient-to-r from-blue-50 to-white px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-100 flex justify-between">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-red-400 mr-1.5"></span>
            <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 mr-1.5"></span>
            <span className="inline-block w-3 h-3 rounded-full bg-green-400 mr-3"></span>
            {title}
          </div>
          <span className="text-xs font-normal text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{language}</span>
        </div>
      )}
      
      <div className="relative bg-gray-50 overflow-x-auto">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
          title="코드 복사"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
        
        <pre className="p-4 text-sm text-gray-800 overflow-x-auto font-mono leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeSnippet;