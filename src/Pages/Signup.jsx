import React from 'react';
import styled from 'styled-components';
import Button from '../Components/common/Button';
import Input from '../Components/common/Input';

const Signup = () => {
  return (
    <SignupLayout>
      <Title>이메일로 회원가입</Title>
      <Form>
        <Input label='이메일' type='email' placeholder='이메일 주소를 입력해 주세요.' mb='16px'></Input>
        <Input label='비밀번호' type='password' placeholder='비밀번호를 설정해 주세요.' mb='30px'></Input>
        <Button
          width='322px'
          fontSize='14px'
          bgColor='var(--secondary)'
          border='none'
          margin='10px 0 0 0'
          padding='13px 0'
          disabled
        >
          다음
        </Button>
      </Form>
    </SignupLayout>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const SignupLayout = styled.div`
  min-width: 390px;
  padding: 30px 34px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  margin-bottom: 40px;
  font-size: var(--xxl);
`;

export default Signup;
