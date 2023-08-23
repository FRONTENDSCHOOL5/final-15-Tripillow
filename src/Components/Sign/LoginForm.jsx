import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { LayoutStyle } from '../../Styles/Layout';
import Button from '../common/Button';
import Input from '../common/Input';
import useLogin from '../../Hooks/Sign/useLogin';
import isDesktop from '../../Recoil/isDesktop/isDesktop';
import { formFadeIn } from '../../Styles/SignAnimation';
import PCToast from '../common/Modal/PCToast';
import AlertTop from '../common/Modal/AlertTop';

import Kakao from '../../Assets/pc_kakaotalk.png';
import Google from '../../Assets/icons/google.svg';
import face from '../../Assets/icons/pc_facebook.svg';

const LoginForm = () => {
  const { handleFormSubmit, userInput, handleInputChange, errorMsg, handleError, userErrorMessage } = useLogin();
  const isPCScreen = useRecoilValue(isDesktop);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [warnMSG, setWarnMSG] = useState('');

  const handleSnackbar = () => {
    if (!!state) {
      setWarnMSG(state);
      setTimeout(() => {
        setWarnMSG('');
      }, 2500);
    }
  };

  useEffect(() => {
    handleSnackbar();

    if (!!state) {
      navigate('/login', { replace: true });
    }
  }, [state]);

  return (
    <Layout onSubmit={handleFormSubmit} $isPCScreen={isPCScreen}>
      <h1>로그인</h1>
      {warnMSG && !isPCScreen && (
        <AlertTop top='0px' newAnimation isError={warnMSG}>
          {warnMSG}
        </AlertTop>
      )}
      <Input
        type='email'
        placeholder='아이디를 입력해주세요'
        label='이메일'
        mb='16px'
        name='email'
        value={userInput.user.email}
        onChange={handleInputChange}
        autoComplete='off'
        autoFocus
      />
      {errorMsg && !userInput.user.email && !userInput.user.password && <IdErrorStyle>{errorMsg}</IdErrorStyle>}
      <Input
        type='password'
        label='비밀번호'
        placeholder='비밀번호를 입력해주세요'
        name='password'
        value={userInput.user.password}
        onChange={handleInputChange}
        autoComplete='off'
      />
      {errorMsg && userInput.user.email && !userInput.user.password && <ErrorStyle>{errorMsg}</ErrorStyle>}
      {userErrorMessage && userInput.user.email && userInput.user.password && (
        <ErrorStyle>{userErrorMessage}</ErrorStyle>
      )}
      <Button
        type='submit'
        disabled={!userInput.user.email || !userInput.user.password}
        margin='30px auto 20px'
        padding='13px 0'
        width='322px'
        fontSize='var(--sm)'
        onClick={handleError}
      >
        로그인
      </Button>
      <Link to='/signup'>이메일로 회원가입</Link>
      {isPCScreen && (
        <LoginMethodLayout>
          <img src={Kakao} style={{ width: '23px' }} alt='kakao icon' />
          <img src={Google} style={{ width: '26px' }} alt='google icon' />
          <img src={face} style={{ width: '22px' }} alt='facebook icon' />
        </LoginMethodLayout>
      )}
      {warnMSG && isPCScreen && <PCToast warnMessage={warnMSG} />}
    </Layout>
  );
};

const Layout = styled.form`
  ${LayoutStyle}
  padding: 30px 34px;
  display: flex;
  flex-direction: column;
  background-color: white;

  h1 {
    margin-bottom: 40px;
    text-align: center;
    font-weight: 500;
    font-size: var(--xxl);
  }
  a {
    text-align: center;
    font-size: var(--xs);
    color: var(--dark-gray);
  }

  ${({ $isPCScreen }) =>
    $isPCScreen &&
    css`
      height: 740px;
      padding: 54px 34px;
      animation: ${formFadeIn} 0.5s forwards;
    `}
`;

const IdErrorStyle = styled.p`
  margin: -10px 0 16px;
  color: var(--error);
`;

const ErrorStyle = styled.p`
  margin: 6px 0 0 0;
  color: var(--error);
`;

const LoginMethodLayout = styled.div`
  margin: 20px auto;
  display: flex;
  align-items: center;

  img:not(:last-child) {
    margin-right: 13px;
    cursor: pointer;
  }
`;

export default LoginForm;
