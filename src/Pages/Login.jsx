import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import isLogin from 'Recoil/isLogin/isLogin';
import PCSign from 'Components/Sign/PCSign.jsx';
import LoginForm from 'Components/Sign/LoginForm';
import useIsWideView from 'Components/SideNav/useIsWideView';

const Login = () => {
  const navigate = useNavigate();
  const isWideView = useIsWideView();
  const isLoginState = useRecoilValue(isLogin);

  useEffect(() => {
    if (isLoginState) navigate('/home');
  }, [isLoginState, navigate]);

  return isWideView ? <PCSign /> : <LoginForm />;
};

export default Login;
