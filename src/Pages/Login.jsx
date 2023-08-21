import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import useLogin from '../Hooks/Sign/useLogin';
import isDesktop from '../Recoil/isDesktop/isDesktop';
import PCLogin from '../Components/Login/PCLogin';
import LoginForm from '../Components/Login/LoginForm';

const Login = () => {
  const navigate = useNavigate();
  const isPCScreen = useRecoilValue(isDesktop);
  const { isLoginState } = useLogin();

  useEffect(() => {
    if (isLoginState) navigate('/home');
    //eslint-disable-next-line
  }, []);

  return isPCScreen ? <PCLogin /> : <LoginForm />;
};

export default Login;
