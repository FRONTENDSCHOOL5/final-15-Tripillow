import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Components/common/Button';
import Input from '../Components/common/Input';
import styled from 'styled-components';

const Login = () => {
  return (
    <Layout>
      <h1>로그인</h1>
      <Input type='email' placeholder='아이디를 입력해주세요'label='이메일' />
      <Input  type='password' label='비밀번호' placeholder='비밀번호를 입력해주세요'/>
      <Button margin='30px auto 20px' width='322px'>
        로그인입니다
      </Button>
      <Link to='/signup'>이메일로 회원가입</Link>
    </Layout>
  );
};

const Layout = styled.form`
  min-width: 390px;
  padding: 30px 34px;
  display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: 40px;
    text-align: center;
  }
  a {
    text-align: center;
    font-size: var(--xs);
    color: var(--dark-gray);
  }
`;
export default Login;
