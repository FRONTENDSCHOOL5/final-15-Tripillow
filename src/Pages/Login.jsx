import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import LoginFunc from '../Utils/Login/LoginFunc';
import isDesktop from '../Recoil/isDesktop/isDesktop';
import PCLogin from '../Components/Login/PCLogin';
import LoginForm from '../Components/Login/LoginForm';

const Login = () => {
  const navigate = useNavigate();
  const isPCScreen = useRecoilValue(isDesktop);
  const { isLoginState } = LoginFunc();

  useEffect(() => {
    if (isLoginState) navigate('/home');
    //eslint-disable-next-line
  }, []);

  return isPCScreen ? <PCLogin /> : <LoginForm />;
};

export default Login;
