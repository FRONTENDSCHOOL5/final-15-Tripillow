import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import isLogin from '../../Recoil/isLogin/isLogin';

const ProtectedRoute = ({ children }) => {
  const isUser = useRecoilValue(isLogin);
  const navigate = useNavigate();
  const errorMessage = '로그인을 해주세요!';

  useEffect(() => {
    if (!isUser) {
      navigate('/', { state: errorMessage });
    }
  }, []);

  if (!isUser) {
    return null; // 로그인하지 않은 경우 컴포넌트를 렌더링하지 않음
  }

  return children; // 로그인 상태인 경우 자식 컴포넌트를 반환
};

export default ProtectedRoute;
