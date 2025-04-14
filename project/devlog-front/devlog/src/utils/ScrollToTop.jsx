import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 페이지 이동 시 스크롤을 페이지 상단으로 자동 이동시키는 컴포넌트
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;