import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Github, Twitter, Linkedin, Mail, Terminal, Code, BookOpen, Coffee } from 'lucide-react';

const AboutPage = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow">
        {/* 헤더 섹션 - 프로필 */}
        <section className="pt-28 pb-20 relative overflow-hidden">
          {/* 배경 그라데이션 및 패턴 */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 -z-10"></div>
          <div className="absolute inset-0 opacity-30 dark:opacity-10 -z-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="small-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5"/>
                </pattern>
                <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <rect width="100" height="100" fill="url(#small-grid)"/>
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
                {/* 프로필 이미지 */}
                <div className="relative">
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                    <img 
                      src="/api/placeholder/200/200"
                      alt="개발자 프로필" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-3 -right-2 bg-blue-600 text-white p-2 rounded-full shadow-lg">
                    <Code className="w-5 h-5" />
                  </div>
                </div>
                
                {/* 소개 텍스트 */}
                <div className="text-center md:text-left flex-1">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
                    안녕하세요, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">김개발</span>입니다
                  </h1>
                  <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    백엔드 개발자로서 제 경험과 지식을 공유하는 DEVlog를 운영하고 있습니다. 
                    8년차 개발자로 시스템 아키텍처, 분산 시스템, 데이터베이스 최적화에 관심이 많습니다.
                  </p>
                  
                  {/* 소셜 링크 */}
                  <div className="flex space-x-4 justify-center md:justify-start">
                    <a 
                      href="https://github.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-3 rounded-full bg-white dark:bg-gray-800 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 shadow-sm border border-gray-100 dark:border-gray-700/50 transition-colors hover:shadow-md"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a 
                      href="https://twitter.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-3 rounded-full bg-white dark:bg-gray-800 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 shadow-sm border border-gray-100 dark:border-gray-700/50 transition-colors hover:shadow-md"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-3 rounded-full bg-white dark:bg-gray-800 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 shadow-sm border border-gray-100 dark:border-gray-700/50 transition-colors hover:shadow-md"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a 
                      href="mailto:contact@devlog.com" 
                      className="p-3 rounded-full bg-white dark:bg-gray-800 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 shadow-sm border border-gray-100 dark:border-gray-700/50 transition-colors hover:shadow-md"
                      aria-label="Email"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* 소개 및 기술 스택 */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* 소개 */}
                <div>
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
                    <Terminal className="w-4 h-4 mr-2" />
                    About Me
                  </div>
                  <h2 className="text-2xl font-bold mb-6 dark:text-white">DEVlog를 시작한 이유</h2>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <p>
                      개발 여정에서 배운 소중한 교훈과 발견한 해결책을 기록하고 공유하고자 이 블로그를 시작했습니다. 
                      복잡한 기술적 개념을 명확하게 설명하고, 실용적인 지식을 제공하는 것이 제 목표입니다.
                    </p>
                    <p>
                      특히 백엔드 개발에 초점을 맞춰, 시스템 아키텍처, 데이터베이스 최적화, 
                      클라우드 인프라 등에 관한 심층적인 콘텐츠를 제공합니다.
                    </p>
                    <p>
                      항상 배움을 추구하며, 기술 커뮤니티에 기여하는 것을 중요하게 생각합니다. 
                      이 블로그가 다른 개발자들에게 영감과 도움이 되길 바랍니다.
                    </p>
                  </div>
                </div>
                
                {/* 기술 스택 */}
                <div>
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4">
                    <Code className="w-4 h-4 mr-2" />
                    Tech Stack
                  </div>
                  <h2 className="text-2xl font-bold mb-6 dark:text-white">저의 전문 기술</h2>
                  
                  <div className="space-y-5">
                    <div className="relative">
                      <div className="flex items-center mb-2">
                        <span className="font-medium text-gray-800 dark:text-gray-200">백엔드 개발</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">Java</span>
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">Spring Boot</span>
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">Node.js</span>
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">GraphQL</span>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="flex items-center mb-2">
                        <span className="font-medium text-gray-800 dark:text-gray-200">데이터베이스</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">PostgreSQL</span>
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">MongoDB</span>
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">Redis</span>
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">ElasticSearch</span>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="flex items-center mb-2">
                        <span className="font-medium text-gray-800 dark:text-gray-200">DevOps</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">Docker</span>
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">Kubernetes</span>
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">AWS</span>
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">CI/CD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* 블로그 핵심 가치 */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium mb-4">
                  <BookOpen className="w-4 h-4 mr-2" />
                  블로그 철학
                </div>
                <h2 className="text-3xl font-bold mb-4 dark:text-white">DEVlog의 핵심 가치</h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  이 블로그를 운영하면서 항상 염두에 두는 핵심 가치들입니다
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
                  <div className="w-14 h-14 flex items-center justify-center bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full mb-5">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 dark:text-white">심층적인 기술 분석</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    표면적인 내용이 아닌, 핵심 원리와 실제 적용 사례를 담은 깊이 있는 기술 콘텐츠를 제공합니다.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
                  <div className="w-14 h-14 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-full mb-5">
                    <Code className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 dark:text-white">실용적인 코드 예제</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    실제 프로젝트에 바로 적용할 수 있는 코드와 패턴을 제공하여 이론과 실무의 간극을 좁힙니다.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
                  <div className="w-14 h-14 flex items-center justify-center bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full mb-5">
                    <Coffee className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 dark:text-white">개발자 관점의 솔직함</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    성공 사례뿐만 아니라 실패와 도전 과정도 공유하여 진정성 있는 개발 이야기를 전달합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* 연락처 & CTA */}
        <section className="py-20 relative overflow-hidden">
          {/* 배경 그라데이션 */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white dark:from-blue-950/30 dark:via-indigo-900/20 dark:to-gray-900 -z-10"></div>
          
          {/* 배경 유리 모프이즘 원형 */}
          <div className="absolute left-1/4 -top-20 w-64 h-64 rounded-full bg-blue-400/10 dark:bg-blue-500/10 backdrop-blur-3xl -z-10"></div>
          <div className="absolute right-1/3 bottom-10 w-80 h-80 rounded-full bg-indigo-400/10 dark:bg-indigo-500/10 backdrop-blur-3xl -z-10"></div>
          
          {/* 배경 패턴 */}
          <div className="absolute inset-0 opacity-20 dark:opacity-10 -z-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-500/30 dark:text-blue-400/30" />
                </pattern>
                <pattern id="waveGrid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <rect width="100" height="100" fill="url(#smallGrid)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#waveGrid)" />
            </svg>
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-xl border border-white/20 dark:border-gray-700/20">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                    함께 이야기해요
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    질문, 피드백 또는 협업 제안이 있으시면 언제든지 연락 주세요. 
                    항상 새로운 아이디어와 의견을 환영합니다!
                  </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href="mailto:contact@devlog.com" 
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all flex items-center"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    이메일로 연락하기
                  </a>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-6 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-600 flex items-center"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    GitHub에서 만나기
                  </a>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700/50 text-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    업무일 기준 24시간 이내에 답변 드리겠습니다 😊
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;