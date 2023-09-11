import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import isLogin from 'Recoil/isLogin/isLogin';
import SignupForm from 'Components/Sign/SignupForm';
import PCSign from 'Components/Sign/PCSign';
import useIsWideView from 'Components/SideNav/useIsWideView';
import MetaTag from 'Components/common/MetaTag';

const Signup = () => {
  const navigate = useNavigate();
  const isWideView = useIsWideView();
  const isLoginState = useRecoilValue(isLogin);

  useEffect(() => {
    isLoginState && navigate('/home');
  }, [isLoginState, navigate]);

  return (
    <>
      <MetaTag
        title='Tripillow 회원가입'
        description='Tripillow에 회원가입 하고 다양한 사람들의 여행 기록을 보고 공유하고 여행 관련 중고 물품을 거래해보세요'
        url='https://tripillow.netlify.app/signup'
      />
      {isWideView ? <PCSign /> : <SignupForm />}
    </>
  );
};

export default Signup;
