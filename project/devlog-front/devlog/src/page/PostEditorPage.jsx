import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import MarkdownEditor from '../components/editor/MarkdownEditor';
import PostPreview from '../components/editor/PostPreview';
import { AlertCircle, Calendar, Clock, Save, Eye, Edit2, Image } from 'lucide-react';

const PostEditorPage = ({ isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('write'); // 'write' or 'preview'
  const [post, setPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    categories: [],
    tags: [],
  });
  const [newTag, setNewTag] = useState('');
  const [tagError, setTagError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 마크다운 에디터 높이
  const [editorHeight, setEditorHeight] = useState('calc(100vh - 300px)');
  
  useEffect(() => {
    // 화면 크기에 따라 에디터 높이 조정
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setEditorHeight('calc(100vh - 250px)');
      } else {
        setEditorHeight('calc(100vh - 300px)');
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // 가용 카테고리 목록 (실제로는 API에서 가져옴)
  const availableCategories = [
    '아키텍처',
    '마이크로서비스',
    'Spring Boot',
    '데이터베이스',
    'DevOps',
    'API 설계',
    '보안',
    '성능 최적화',
    '테스트',
    '클라우드',
  ];
  
  // 양식 입력 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };
  
  // 마크다운 에디터 변경 처리
  const handleContentChange = (value) => {
    setPost({ ...post, content: value });
  };
  
  // 카테고리 선택 처리
  const handleCategoryToggle = (category) => {
    if (post.categories.includes(category)) {
      setPost({
        ...post,
        categories: post.categories.filter(cat => cat !== category)
      });
    } else {
      if (post.categories.length < 3) {
        setPost({
          ...post,
          categories: [...post.categories, category]
        });
      } else {
        showAlertMessage('카테고리는 최대 3개까지 선택할 수 있습니다.');
      }
    }
  };
  
  // 태그 추가 처리
  const handleAddTag = () => {
    if (!newTag.trim()) {
      setTagError('태그를 입력해주세요.');
      return;
    }
    
    if (post.tags.includes(newTag.trim())) {
      setTagError('이미 추가된 태그입니다.');
      return;
    }
    
    if (post.tags.length >= 10) {
      setTagError('태그는 최대 10개까지 추가할 수 있습니다.');
      return;
    }
    
    if (newTag.trim().length > 20) {
      setTagError('태그는 최대 20자까지 입력할 수 있습니다.');
      return;
    }
    
    setPost({
      ...post,
      tags: [...post.tags, newTag.trim()]
    });
    setNewTag('');
    setTagError('');
  };
  
  // 태그 제거 처리
  const handleRemoveTag = (tagToRemove) => {
    setPost({
      ...post,
      tags: post.tags.filter(tag => tag !== tagToRemove)
    });
  };
  
  // 커버 이미지 업로드 처리
  const handleCoverImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // 파일 유효성 검사
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      showAlertMessage('JPG, PNG, WebP, SVG 형식의 이미지만 업로드할 수 있습니다.');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      showAlertMessage('이미지 크기는 5MB 이하여야 합니다.');
      return;
    }
    
    // 파일 미리보기 URL 생성
    const imageUrl = URL.createObjectURL(file);
    setPost({ ...post, coverImage: imageUrl });
    
    // 실제 구현에서는 이미지를 서버에 업로드하고 URL을 받아와야 함
  };
  
  // 게시글 저장 처리
  const handleSavePost = async () => {
    // 필수 입력 검증
    if (!post.title.trim()) {
      showAlertMessage('제목을 입력해주세요.');
      return;
    }
    
    if (!post.excerpt.trim()) {
      showAlertMessage('요약을 입력해주세요.');
      return;
    }
    
    if (!post.content.trim()) {
      showAlertMessage('내용을 입력해주세요.');
      return;
    }
    
    if (post.categories.length === 0) {
      showAlertMessage('최소 1개의 카테고리를 선택해주세요.');
      return;
    }
    
    if (!post.coverImage) {
      showAlertMessage('커버 이미지를 업로드해주세요.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 실제 API 연동 로직
      // const response = await fetch('/api/posts', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(post),
      // });
      
      // if (!response.ok) {
      //   throw new Error('게시글 저장에 실패했습니다.');
      // }
      
      // const data = await response.json();
      
      // 저장 성공 후 게시글 상세 페이지로 이동
      setTimeout(() => {
        navigate('/posts/1');
      }, 1500);
      
    } catch (error) {
      showAlertMessage(error.message || '게시글 저장 중 오류가 발생했습니다.');
      setIsSubmitting(false);
    }
  };
  
  // 알림 메시지 표시
  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };
  
  // 임시 저장 처리
  const handleSaveDraft = () => {
    // 로컬 스토리지에 임시 저장
    localStorage.setItem('postDraft', JSON.stringify(post));
    showAlertMessage('임시 저장되었습니다.');
  };
  
  // 임시 저장 불러오기
  const handleLoadDraft = () => {
    const draftData = localStorage.getItem('postDraft');
    if (draftData) {
      setPost(JSON.parse(draftData));
      showAlertMessage('임시 저장된 내용을 불러왔습니다.');
    } else {
      showAlertMessage('임시 저장된 내용이 없습니다.');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow pt-16">
        {/* 상단 네비게이션 */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                새 글 작성
              </h1>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveDraft}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  임시 저장
                </button>
                <button
                  onClick={handleLoadDraft}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  불러오기
                </button>
                <button
                  onClick={handleSavePost}
                  disabled={isSubmitting}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      저장 중...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      게시하기
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* 알림 메시지 */}
        {showAlert && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
            <div className="mx-4 p-4 rounded-lg bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800 shadow-md">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-red-800 dark:text-red-200">{alertMessage}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 좌측: 폼 필드 및 에디터 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 제목 입력 */}
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                  제목
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={post.title}
                  onChange={handleInputChange}
                  placeholder="제목을 입력하세요"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  maxLength={100}
                />
                <div className="mt-1 text-xs text-right text-gray-500 dark:text-gray-400">
                  {post.title.length}/100
                </div>
              </div>
              
              {/* 요약 입력 */}
              <div>
                <label htmlFor="excerpt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                  요약
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={post.excerpt}
                  onChange={handleInputChange}
                  placeholder="글의 주요 내용을 간략히 요약해주세요"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  rows={3}
                  maxLength={200}
                ></textarea>
                <div className="mt-1 text-xs text-right text-gray-500 dark:text-gray-400">
                  {post.excerpt.length}/200
                </div>
              </div>
              
              {/* 탭: 작성 / 미리보기 */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveTab('write')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 ${
                      activeTab === 'write'
                        ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <Edit2 className="w-4 h-4 inline-block mr-2" />
                    작성
                  </button>
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 ${
                      activeTab === 'preview'
                        ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <Eye className="w-4 h-4 inline-block mr-2" />
                    미리보기
                  </button>
                </div>
              </div>
              
              {/* 에디터 / 미리보기 */}
              <div className="relative" style={{ minHeight: editorHeight }}>
                {activeTab === 'write' ? (
                  <MarkdownEditor
                    value={post.content}
                    onChange={handleContentChange}
                    height={editorHeight}
                    isDarkMode={isDarkMode}
                    placeholder="마크다운으로 글을 작성해보세요..."
                  />
                ) : (
                  <div 
                    className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg overflow-auto bg-white dark:bg-gray-800"
                    style={{ height: editorHeight }}
                  >
                    <PostPreview content={post.content} isDarkMode={isDarkMode} />
                  </div>
                )}
              </div>
            </div>
            
            {/* 우측: 메타데이터 설정 */}
            <div className="space-y-6">
              {/* 커버 이미지 */}
              <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  커버 이미지
                </h3>
                
                {post.coverImage ? (
                  <div className="relative mb-4">
                    <img
                      src={post.coverImage}
                      alt="Cover Preview"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setPost({ ...post, coverImage: '' })}
                      className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="mb-4 p-8 bg-gray-100 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-center">
                    <Image className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      JPG, PNG, WebP, SVG 이미지<br />
                      최대 5MB
                    </p>
                  </div>
                )}
                
                <label className="block w-full">
                  <span className="sr-only">이미지 업로드</span>
                  <input
                    type="file"
                    className="block w-full text-sm text-gray-500 dark:text-gray-400
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-medium
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100
                      dark:file:bg-blue-900/30 dark:file:text-blue-400
                      dark:hover:file:bg-blue-900/40"
                    accept="image/jpeg, image/png, image/webp, image/svg+xml"
                    onChange={handleCoverImageUpload}
                  />
                </label>
              </div>
              
              {/* 카테고리 */}
              <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  카테고리 (최대 3개)
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  글의 주제에 맞는 카테고리를 선택해주세요.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {availableCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryToggle(category)}
                      className={`px-3 py-1.5 text-sm rounded-full ${
                        post.categories.includes(category)
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {category}
                      {post.categories.includes(category) && ' ✓'}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 태그 */}
              <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  태그 (최대 10개)
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  검색과 분류에 도움이 되는 태그를 추가해주세요.
                </p>
                
                <div className="flex items-center mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    placeholder="태그 입력"
                    className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                    maxLength={20}
                  />
                  <button
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
                  >
                    추가
                  </button>
                </div>
                
                {tagError && (
                  <p className="text-sm text-red-600 dark:text-red-400 mb-2">
                    {tagError}
                  </p>
                )}
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag) => (
                    <div
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                    >
                      <span className="mr-1">#{tag}</span>
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  
                  {post.tags.length === 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      추가된 태그가 없습니다.
                    </p>
                  )}
                </div>
              </div>
              
              {/* 추가 정보 */}
              <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    작성일: {new Date().toLocaleDateString('ko-KR')}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    예상 읽기 시간: {Math.max(1, Math.ceil(post.content.length / 800))}분
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PostEditorPage;