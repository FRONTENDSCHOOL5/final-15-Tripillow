import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import isLogin from 'Recoil/isLogin/isLogin';
import PCSign from 'Components/Sign/PCSign.jsx';
import LoginForm from 'Components/Sign/LoginForm';
import useIsWideView from 'Components/SideNav/useIsWideView';
import MetaTag from 'Components/common/MetaTag';

const Login = () => {
  const navigate = useNavigate();
  const isWideView = useIsWideView();
  const isLoginState = useRecoilValue(isLogin);

  useEffect(() => {
    if (isLoginState) navigate('/home');
  }, [isLoginState, navigate]);

  return (
    <>
      <MetaTag
        title='Tripillow 로그인'
        description='Tripillow에 로그인 하고 다양한 사람들의 여행 기록을 보고 공유하고 여행 관련 중고 물품을 거래해보세요'
        url='https://tripillow.netlify.app/login'
      />
      {isWideView ? <PCSign /> : <LoginForm />}
    </>
  );
};

export default Login;
