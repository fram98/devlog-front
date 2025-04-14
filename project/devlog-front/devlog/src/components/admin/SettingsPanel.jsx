import React, { useState } from 'react';
import { Save, Globe, Mail, BellRing, FileText, Shield, User, Database, AlertCircle } from 'lucide-react';

const SettingsPanel = ({ showAlert }) => {
  // 세팅 카테고리
  const categories = [
    { id: 'general', name: '일반', icon: <Globe className="w-5 h-5" /> },
    { id: 'email', name: '이메일', icon: <Mail className="w-5 h-5" /> },
    { id: 'notifications', name: '알림', icon: <BellRing className="w-5 h-5" /> },
    { id: 'content', name: '콘텐츠', icon: <FileText className="w-5 h-5" /> },
    { id: 'users', name: '사용자 및 권한', icon: <Shield className="w-5 h-5" /> },
    { id: 'accounts', name: '계정', icon: <User className="w-5 h-5" /> },
    { id: 'database', name: '데이터베이스', icon: <Database className="w-5 h-5" /> },
    { id: 'logs', name: '로그', icon: <AlertCircle className="w-5 h-5" /> }
  ];

  // 현재 선택된 카테고리
  const [activeCategory, setActiveCategory] = useState('general');
  
  // 설정 데이터 (실제로는 API에서 가져옴)
  const [settings, setSettings] = useState({
    general: {
      siteTitle: 'DEVlog',
      siteDescription: '백엔드 개발의 모든 것',
      siteUrl: 'https://devlog.example.com',
      logo: '/logo.png',
      favicon: '/favicon.ico',
      language: 'ko',
      timezone: 'Asia/Seoul',
      dateFormat: 'YYYY-MM-DD',
      timeFormat: 'HH:mm',
      postsPerPage: 10,
      showAuthor: true,
      showDate: true,
      showComments: true,
      allowComments: true,
      moderateComments: true
    },
    email: {
      provider: 'smtp',
      host: 'smtp.example.com',
      port: '587',
      username: 'no-reply@example.com',
      password: '********',
      fromEmail: 'no-reply@example.com',
      fromName: 'DEVlog',
      replyToEmail: 'support@example.com',
      sendWelcomeEmail: true,
      welcomeEmailSubject: 'DEVlog에 오신 것을 환영합니다',
      welcomeEmailTemplate: '<p>안녕하세요, {{name}}님!</p><p>DEVlog에 가입해주셔서 감사합니다.</p>'
    },
    notifications: {
      adminEmail: 'admin@example.com',
      notifyOnNewComment: true,
      notifyOnNewUser: true,
      notifyOnError: true,
      digestFrequency: 'daily',
      slackWebhook: 'https://hooks.slack.com/services/xxx/yyy/zzz',
      slackChannel: '#blog-notifications',
      telegramBotToken: '',
      telegramChatId: ''
    },
    content: {
      defaultCategory: '아키텍처',
      excerptLength: 200,
      markdownEditor: true,
      wysiwyg: false,
      syntax: true,
      allowHtml: false,
      allowEmbeds: true,
      allowMedia: true,
      maxUploadSize: 5,
      allowedFileTypes: 'jpg,jpeg,png,gif,svg,pdf,zip',
      imageQuality: 85,
      resizeImages: true,
      maxImageWidth: 1200,
      useImageCdn: false
    },
    users: {
      allowRegistration: true,
      defaultRole: 'user',
      requireEmailVerification: true,
      loginAttempts: 5,
      lockoutTime: 30,
      passwordComplexity: 'medium',
      requireStrongPasswords: true,
      minimumPasswordLength: 8,
      twoFactorAuth: false,
      sessionTimeout: 120
    }
  });
  
  // 현재 편집 중인 설정
  const [editingSettings, setEditingSettings] = useState({ ...settings });
  
  // 설정 변경 핸들러
  const handleSettingChange = (category, key, value) => {
    setEditingSettings({
      ...editingSettings,
      [category]: {
        ...editingSettings[category],
        [key]: value
      }
    });
  };
  
  // 설정 저장 핸들러
  const handleSaveSettings = () => {
    // 실제로는 API 호출
    setSettings(editingSettings);
    showAlert('설정이 저장되었습니다.');
  };
  
  // 설정 리셋 핸들러
  const handleResetSettings = () => {
    setEditingSettings({ ...settings });
    showAlert('변경 사항이 취소되었습니다.');
  };

  // 토글 스위치 컴포넌트
  const ToggleSwitch = ({ checked, onChange, label }) => (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
        />
        <div className={`block w-10 h-6 rounded-full ${checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
        <div className={`absolute left-1 top-1 bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition-transform ${checked ? 'transform translate-x-4' : ''}`}></div>
      </div>
      <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">{label}</span>
    </label>
  );

  // 현재 카테고리에 따른 설정 폼 렌더링
  const renderSettingsForm = () => {
    switch (activeCategory) {
      case 'general':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">사이트 기본 정보</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    사이트 제목
                  </label>
                  <input
                    type="text"
                    value={editingSettings.general.siteTitle}
                    onChange={(e) => handleSettingChange('general', 'siteTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    사이트 설명
                  </label>
                  <textarea
                    value={editingSettings.general.siteDescription}
                    onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    사이트 URL
                  </label>
                  <input
                    type="url"
                    value={editingSettings.general.siteUrl}
                    onChange={(e) => handleSettingChange('general', 'siteUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">표시 설정</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    게시물 페이지당 표시 수
                  </label>
                  <select
                    value={editingSettings.general.postsPerPage}
                    onChange={(e) => handleSettingChange('general', 'postsPerPage', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                    <option value={30}>30</option>
                  </select>
                </div>
                
                <div className="space-y-3">
                  <ToggleSwitch 
                    checked={editingSettings.general.showAuthor} 
                    onChange={() => handleSettingChange('general', 'showAuthor', !editingSettings.general.showAuthor)}
                    label="작성자 표시"
                  />
                  <ToggleSwitch 
                    checked={editingSettings.general.showDate} 
                    onChange={() => handleSettingChange('general', 'showDate', !editingSettings.general.showDate)}
                    label="날짜 표시"
                  />
                  <ToggleSwitch 
                    checked={editingSettings.general.showComments} 
                    onChange={() => handleSettingChange('general', 'showComments', !editingSettings.general.showComments)}
                    label="댓글 수 표시"
                  />
                  <ToggleSwitch 
                    checked={editingSettings.general.allowComments} 
                    onChange={() => handleSettingChange('general', 'allowComments', !editingSettings.general.allowComments)}
                    label="댓글 허용"
                  />
                  <ToggleSwitch 
                    checked={editingSettings.general.moderateComments} 
                    onChange={() => handleSettingChange('general', 'moderateComments', !editingSettings.general.moderateComments)}
                    label="댓글 승인 후 표시"
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'content':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">콘텐츠 기본 설정</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    기본 카테고리
                  </label>
                  <select
                    value={editingSettings.content.defaultCategory}
                    onChange={(e) => handleSettingChange('content', 'defaultCategory', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="아키텍처">아키텍처</option>
                    <option value="데이터베이스">데이터베이스</option>
                    <option value="DevOps">DevOps</option>
                    <option value="API 설계">API 설계</option>
                    <option value="보안">보안</option>
                    <option value="성능 최적화">성능 최적화</option>
                    <option value="테스트">테스트</option>
                    <option value="클라우드">클라우드</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    요약 길이 (글자 수)
                  </label>
                  <input
                    type="number"
                    min={50}
                    max={500}
                    value={editingSettings.content.excerptLength}
                    onChange={(e) => handleSettingChange('content', 'excerptLength', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    에디터 유형
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={editingSettings.content.markdownEditor && !editingSettings.content.wysiwyg}
                        onChange={() => {
                          handleSettingChange('content', 'markdownEditor', true);
                          handleSettingChange('content', 'wysiwyg', false);
                        }}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">마크다운</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={!editingSettings.content.markdownEditor && editingSettings.content.wysiwyg}
                        onChange={() => {
                          handleSettingChange('content', 'markdownEditor', false);
                          handleSettingChange('content', 'wysiwyg', true);
                        }}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">WYSIWYG</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">미디어 설정</h3>
                
                <div className="space-y-3">
                  <ToggleSwitch 
                    checked={editingSettings.content.syntax} 
                    onChange={() => handleSettingChange('content', 'syntax', !editingSettings.content.syntax)}
                    label="구문 강조 표시"
                  />
                  <ToggleSwitch 
                    checked={editingSettings.content.allowHtml} 
                    onChange={() => handleSettingChange('content', 'allowHtml', !editingSettings.content.allowHtml)}
                    label="HTML 허용"
                  />
                  <ToggleSwitch 
                    checked={editingSettings.content.allowEmbeds} 
                    onChange={() => handleSettingChange('content', 'allowEmbeds', !editingSettings.content.allowEmbeds)}
                    label="임베드 허용 (YouTube, Twitter, 등)"
                  />
                  <ToggleSwitch 
                    checked={editingSettings.content.allowMedia} 
                    onChange={() => handleSettingChange('content', 'allowMedia', !editingSettings.content.allowMedia)}
                    label="미디어 업로드 허용"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    최대 업로드 크기 (MB)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={editingSettings.content.maxUploadSize}
                    onChange={(e) => handleSettingChange('content', 'maxUploadSize', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    허용된 파일 유형 (쉼표로 구분)
                  </label>
                  <input
                    type="text"
                    value={editingSettings.content.allowedFileTypes}
                    onChange={(e) => handleSettingChange('content', 'allowedFileTypes', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'users':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">사용자 관리 설정</h3>
                
                <div className="space-y-3">
                  <ToggleSwitch 
                    checked={editingSettings.users.allowRegistration} 
                    onChange={() => handleSettingChange('users', 'allowRegistration', !editingSettings.users.allowRegistration)}
                    label="회원가입 허용"
                  />
                  <ToggleSwitch 
                    checked={editingSettings.users.requireEmailVerification} 
                    onChange={() => handleSettingChange('users', 'requireEmailVerification', !editingSettings.users.requireEmailVerification)}
                    label="이메일 인증 필요"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    기본 사용자 역할
                  </label>
                  <select
                    value={editingSettings.users.defaultRole}
                    onChange={(e) => handleSettingChange('users', 'defaultRole', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="user">일반 사용자</option>
                    <option value="author">작성자</option>
                    <option value="admin">관리자</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">보안 설정</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    로그인 시도 제한
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={editingSettings.users.loginAttempts}
                    onChange={(e) => handleSettingChange('users', 'loginAttempts', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    잠금 시간 (분)
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={60}
                    value={editingSettings.users.lockoutTime}
                    onChange={(e) => handleSettingChange('users', 'lockoutTime', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    패스워드 복잡도
                  </label>
                  <select
                    value={editingSettings.users.passwordComplexity}
                    onChange={(e) => handleSettingChange('users', 'passwordComplexity', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="low">낮음 (알파벳+숫자)</option>
                    <option value="medium">중간 (대소문자+숫자)</option>
                    <option value="high">높음 (대소문자+숫자+특수문자)</option>
                  </select>
                </div>
                
                <div className="space-y-3">
                  <ToggleSwitch 
                    checked={editingSettings.users.twoFactorAuth} 
                    onChange={() => handleSettingChange('users', 'twoFactorAuth', !editingSettings.users.twoFactorAuth)}
                    label="2단계 인증 활성화"
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="flex items-center justify-center h-64 text-gray-400 dark:text-gray-500">
            <p>선택한 카테고리의 설정을 표시합니다.</p>
          </div>
        );
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">블로그 설정</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            블로그 기능과 동작 방식을 설정합니다.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <ul className="space-y-1">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                        activeCategory === category.id
                          ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 font-medium'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span className="mr-3">{category.icon}</span>
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex-grow bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            {renderSettingsForm()}
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-4">
          <button
            onClick={handleResetSettings}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            변경 취소
          </button>
          
          <button
            onClick={handleSaveSettings}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            설정 저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;