import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LoginAPI from '../Utils/LoginAPI';
import Button from '../Components/common/Button';
import Input from '../Components/common/Input';

// 테스트 아이디 비번
// suritest@test.com / suritest

const Login = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    user: {
      email: '',
      password: '',
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
  };

  const handleLogin = async () => {
    const res = await LoginAPI(userInput);
    if (res) {
      console.log(res);
      navigate('/');
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
      />
      <Input
        type='password'
        label='비밀번호'
        placeholder='비밀번호를 입력해주세요'
        name='password'
        value={userInput.user.password}
        onChange={handleInputChange}
        autoComplete='off'
      />
      <Button type='submit' margin='30px auto 20px' width='322px'>
        로그인
      </Button>
      <Link to='/signup'>이메일로 회원가입</Link>
    </Layout>
  );
};

const Layout = styled.form`
  max-width: 390px;
  margin: 0 auto;
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
export default Login;
