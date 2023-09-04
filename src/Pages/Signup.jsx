import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import isDesktop from 'Recoil/isDesktop/isDesktop';
import isLogin from 'Recoil/isLogin/isLogin';
import SignupForm from 'Components/Sign/SignupForm';
import PCSign from 'Components/Sign/PCSign';
import useIsWideView from 'Components/SideNav/useIsWideView';

const Signup = () => {
  const navigate = useNavigate();
  const isWideView = useIsWideView();
  const isLoginState = useRecoilValue(isLogin);

  useEffect(() => {
    isLoginState && navigate('/home');
  }, [isLoginState, navigate]);

  return isWideView ? <PCSign /> : <SignupForm />;
};

export default Signup;
