import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PCTripillow from 'Components/Landing/PCTripillow';
import LoginForm from 'Components/Sign/LoginForm';
import SignupForm from 'Components/Sign/SignupForm';

const PCLogin = () => {
  const { pathname } = useLocation();

  return (
    <PCLayout>
      <h1 className='a11y-hidden'>{pathname === '/login' ? '로그인 페이지' : '회원가입 페이지'}</h1>
      <PCTripillow />
      {pathname === '/login' ? <LoginForm /> : <SignupForm />}
    </PCLayout>
  );
};

export default PCLogin;

const PCLayout = styled.div`
  width: 780px;
  height: 740px;
  margin: 0 auto;
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: drop-shadow(20px 20px 40px rgba(37, 85, 149, 0.2));
  border-radius: 10px;
  overflow: hidden;
`;
