import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import isDesktop from 'Recoil/isDesktop/isDesktop';
import isLogin from 'Recoil/isLogin/isLogin';
import PCSign from 'Components/Sign/PCSign.jsx';
import LoginForm from 'Components/Sign/LoginForm';

const Login = () => {
  const navigate = useNavigate();
  const isPCScreen = useRecoilValue(isDesktop);
  const isLoginState = useRecoilValue(isLogin);

  useEffect(() => {
    if (isLoginState) navigate('/home');
    //eslint-disable-next-line
  }, []);

  return isPCScreen ? <PCSign /> : <LoginForm />;
};

export default Login;
