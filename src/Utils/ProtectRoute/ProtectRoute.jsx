import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import isLogin from 'Recoil/isLogin/isLogin';

const ProtectedRoute = ({ children }) => {
  const isUser = useRecoilValue(isLogin);
  const navigate = useNavigate();
  const errorMessage = '로그인을 해주세요!';

  useEffect(() => {
    if (!isUser) {
      navigate('/login', { state: errorMessage });
    }
  }, [navigate, isUser]);

  if (!isUser) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
