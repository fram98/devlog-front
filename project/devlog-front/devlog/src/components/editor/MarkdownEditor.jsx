import React, { useRef, useEffect } from 'react';
import { Bold, Italic, Code, List, ListOrdered, Link, Image, Quote, Heading1, Heading2, Heading3 } from 'lucide-react';

const MarkdownEditor = ({ 
  value, 
  onChange, 
  height, 
  isDarkMode, 
  placeholder = '내용을 입력하세요...' 
}) => {
  const textareaRef = useRef(null);
  
  useEffect(() => {
    // 탭 키를 눌렀을 때 탭 문자 삽입
    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        const newValue = value.substring(0, start) + '  ' + value.substring(end);
        
        onChange(newValue);
        
        // 커서 위치 조정
        setTimeout(() => {
          e.target.selectionStart = e.target.selectionEnd = start + 2;
        }, 0);
      }
    };
    
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener('keydown', handleTabKey);
    }
    
    return () => {
      if (textarea) {
        textarea.removeEventListener('keydown', handleTabKey);
      }
    };
  }, [value, onChange]);
  
  // 마크다운 서식 적용 함수
  const applyFormat = (format) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    let newText = '';
    let newCursorPos = 0;
    
    switch (format) {
      case 'bold':
        newText = value.substring(0, start) + `**${selectedText}**` + value.substring(end);
        newCursorPos = selectedText ? end + 4 : start + 2;
        break;
        
      case 'italic':
        newText = value.substring(0, start) + `*${selectedText}*` + value.substring(end);
        newCursorPos = selectedText ? end + 2 : start + 1;
        break;
        
      case 'code':
        newText = value.substring(0, start) + `\`${selectedText}\`` + value.substring(end);
        newCursorPos = selectedText ? end + 2 : start + 1;
        break;
        
      case 'link':
        newText = value.substring(0, start) + `[${selectedText || '링크 텍스트'}](url)` + value.substring(end);
        newCursorPos = start + (selectedText ? selectedText.length + 3 : 8);
        break;
        
      case 'image':
        newText = value.substring(0, start) + `![${selectedText || '이미지 설명'}](이미지URL)` + value.substring(end);
        newCursorPos = start + (selectedText ? selectedText.length + 4 : 10);
        break;
        
      case 'ul':
        if (selectedText) {
          // 선택된 여러 줄에 각각 적용
          const lines = selectedText.split('\n');
          const formattedLines = lines.map(line => `- ${line}`).join('\n');
          newText = value.substring(0, start) + formattedLines + value.substring(end);
          newCursorPos = end + lines.length * 2;
        } else {
          newText = value.substring(0, start) + `- ` + value.substring(end);
          newCursorPos = start + 2;
        }
        break;
        
      case 'ol':
        if (selectedText) {
          // 선택된 여러 줄에 각각 적용
          const lines = selectedText.split('\n');
          const formattedLines = lines.map((line, i) => `${i + 1}. ${line}`).join('\n');
          newText = value.substring(0, start) + formattedLines + value.substring(end);
          newCursorPos = end + lines.reduce((sum, _, i) => sum + String(i + 1).length + 2, 0);
        } else {
          newText = value.substring(0, start) + `1. ` + value.substring(end);
          newCursorPos = start + 3;
        }
        break;
        
      case 'quote':
        if (selectedText) {
          // 선택된 여러 줄에 각각 적용
          const lines = selectedText.split('\n');
          const formattedLines = lines.map(line => `> ${line}`).join('\n');
          newText = value.substring(0, start) + formattedLines + value.substring(end);
          newCursorPos = end + lines.length * 2;
        } else {
          newText = value.substring(0, start) + `> ` + value.substring(end);
          newCursorPos = start + 2;
        }
        break;
        
      case 'h1':
        if (selectedText) {
          newText = value.substring(0, start) + `# ${selectedText}` + value.substring(end);
          newCursorPos = end + 2;
        } else {
          newText = value.substring(0, start) + `# ` + value.substring(end);
          newCursorPos = start + 2;
        }
        break;
        
      case 'h2':
        if (selectedText) {
          newText = value.substring(0, start) + `## ${selectedText}` + value.substring(end);
          newCursorPos = end + 3;
        } else {
          newText = value.substring(0, start) + `## ` + value.substring(end);
          newCursorPos = start + 3;
        }
        break;
        
      case 'h3':
        if (selectedText) {
          newText = value.substring(0, start) + `### ${selectedText}` + value.substring(end);
          newCursorPos = end + 4;
        } else {
          newText = value.substring(0, start) + `### ` + value.substring(end);
          newCursorPos = start + 4;
        }
        break;
        
      case 'codeblock':
        if (selectedText) {
          newText = value.substring(0, start) + '\n```\n' + selectedText + '\n```\n' + value.substring(end);
          newCursorPos = end + 8;
        } else {
          newText = value.substring(0, start) + '\n```\n\n```\n' + value.substring(end);
          newCursorPos = start + 5;
        }
        break;
        
      default:
        return;
    }
    
    onChange(newText);
    
    // 커서 위치 조정
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = newCursorPos;
    }, 0);
  };
  
  // 파일 드래그 앤 드롭 처리
  const handleDrop = (e) => {
    e.preventDefault();
    
    const files = e.dataTransfer.files;
    if (files.length === 0) return;
    
    // 이미지 파일만 처리
    const imageFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (imageFiles.length === 0) return;
    
    // 실제 구현에서는 이미지를 서버에 업로드하고 URL을 받아와야 함
    // 예시로 파일 이름만 사용
    imageFiles.forEach(file => {
      const imageText = `![${file.name}](이미지 URL을 여기에 입력하세요)`;
      const newValue = value + (value.endsWith('\n') ? '' : '\n') + imageText + '\n';
      onChange(newValue);
    });
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* 도구 모음 */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 rounded-t-lg">
        <ToolButton onClick={() => applyFormat('h1')} title="제목 1">
          <Heading1 className="w-4 h-4" />
        </ToolButton>
        <ToolButton onClick={() => applyFormat('h2')} title="제목 2">
          <Heading2 className="w-4 h-4" />
        </ToolButton>
        <ToolButton onClick={() => applyFormat('h3')} title="제목 3">
          <Heading3 className="w-4 h-4" />
        </ToolButton>
        
        <ToolDivider />
        
        <ToolButton onClick={() => applyFormat('bold')} title="굵게">
          <Bold className="w-4 h-4" />
        </ToolButton>
        <ToolButton onClick={() => applyFormat('italic')} title="기울임">
          <Italic className="w-4 h-4" />
        </ToolButton>
        <ToolButton onClick={() => applyFormat('code')} title="인라인 코드">
          <Code className="w-4 h-4" />
        </ToolButton>
        
        <ToolDivider />
        
        <ToolButton onClick={() => applyFormat('link')} title="링크">
          <Link className="w-4 h-4" />
        </ToolButton>
        <ToolButton onClick={() => applyFormat('image')} title="이미지">
          <Image className="w-4 h-4" />
        </ToolButton>
        
        <ToolDivider />
        
        <ToolButton onClick={() => applyFormat('ul')} title="글머리 기호 목록">
          <List className="w-4 h-4" />
        </ToolButton>
        <ToolButton onClick={() => applyFormat('ol')} title="번호 매기기 목록">
          <ListOrdered className="w-4 h-4" />
        </ToolButton>
        <ToolButton onClick={() => applyFormat('quote')} title="인용구">
          <Quote className="w-4 h-4" />
        </ToolButton>
        
        <ToolDivider />
        
        <ToolButton onClick={() => applyFormat('codeblock')} title="코드 블록">
          <div className="w-4 h-4 flex items-center justify-center font-mono text-xs">{ '{' }</div>
        </ToolButton>
      </div>
      
      {/* 텍스트 영역 */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`flex-grow p-4 w-full rounded-b-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 border-l border-r border-b border-gray-300 dark:border-gray-600 font-mono text-gray-800 dark:text-gray-200 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
        style={{ 
          minHeight: height, 
          lineHeight: '1.6',
          fontSize: '0.95rem',
          tabSize: 2,
        }}
        placeholder={placeholder}
        spellCheck="false"
      ></textarea>
    </div>
  );
};

// 도구 버튼 컴포넌트
const ToolButton = ({ children, onClick, title }) => (
  <button
    onClick={onClick}
    title={title}
    className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
    type="button"
  >
    {children}
  </button>
);

// 도구 구분선 컴포넌트
const ToolDivider = () => (
  <div className="h-6 mx-1 border-l border-gray-300 dark:border-gray-600"></div>
);

export default MarkdownEditor;