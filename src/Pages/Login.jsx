import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutStyle } from '../Styles/Layout';
import { useRecoilState } from 'recoil';
import userToken from '../Recoil/userToken/userToken';
import isLogin from '../Recoil/isLogin/isLogin';
import accountName from '../Recoil/accountName/accountName';
import styled from 'styled-components';
import LoginAPI from '../Utils/LoginAPI';
import Button from '../Components/common/Button';
import Input from '../Components/common/Input';

const Login = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [userErrorMessage, setUserErrorMessage] = useState('');
  const [userInput, setUserInput] = useState({
    user: {
      email: '',
      password: '',
    },
  });

  const [token, setToken] = useRecoilState(userToken);
  const [isLoginState, setIsLoginState] = useRecoilState(isLogin);
  const [name, setName] = useRecoilState(accountName);

  useEffect(() => {
    if (isLoginState) navigate('/home');
  }, []);

  const handleError = (e) => {
    const user = userInput.user;
    if (!user.email && !user.password) {
      setErrorMsg('아이디를 입력해주세요.');
    } else if (user.email && !user.password) {
      setErrorMsg('비밀번호를 입력해주세요.');
    } else {
      setErrorMsg('');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
    setErrorMsg('');
    setUserErrorMessage('');
  };

  const handleLogin = async () => {
    const res = await LoginAPI(userInput);
    if (res && res.hasOwnProperty('user')) {
      navigate('/home');
      setToken(res.user.token);
      setIsLoginState(true);
      setName(res.user.accountname);
    } else if (res && !res.hasOwnProperty('user')) {
      setUserErrorMessage(res.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleLogin();
  };

  return (
    <Layout onSubmit={handleFormSubmit}>
      <h1>로그인</h1>
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
    </Layout>
  );
};

const Layout = styled.form`
  ${LayoutStyle}
  padding: 30px 34px;
  display: flex;
  flex-direction: column;

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
`;

const IdErrorStyle = styled.p`
  margin: -10px 0 16px;
  color: var(--error);
`;

const ErrorStyle = styled.p`
  margin: 6px 0 0 0;
  color: var(--error);
`;

export default Login;
