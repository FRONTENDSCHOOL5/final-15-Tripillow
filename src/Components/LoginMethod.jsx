import styled, { css } from 'styled-components';
import email from '../Assets/icons/email.svg';
import kakao from '../Assets/icons/kakao.svg';
import google from '../Assets/icons/google.svg';
import facebook from '../Assets/icons/facebook.svg';
import { Link } from 'react-router-dom';

const LoginMethod = () => {
  return (
    <LinkListsLayout id='이게뭐야'>
      <LoginLink to='login' email>
        이메일로 로그인
      </LoginLink>
      <LoginLink kakao>카카오톡 계정으로 로그인</LoginLink>
      <LoginLink google>구글계정으로 로그인</LoginLink>
      <LoginLink facebook mb='21px'>
        페이스북 계정으로 로그인
      </LoginLink>
      <LoginLink to='/signup' signup mb='18px'>
        회원가입
      </LoginLink>
    </LinkListsLayout>
  );
};

const LinkListsLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 390px;
  padding-top: 20px;
  background-color: white;
  border-radius: 20px 20px 0 0;
  margin: 0 auto;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  animation: FadeIn 2s ease-in-out forwards;
  animation-delay: 3.5s;

  @keyframes FadeIn {
    0% {
      opacity: 0;
      transform: translateY(400px);
    }
    25% {
      opacity: 1;
      transform: translateY(0);
      height: 350px;
      padding-top: 50px;
    }

    50% {
      height: 274px;
      padding-top: 20px;
    }
    60% {
      height: 300px;
    }

    70% {
      height: 274px;
      transform: translateY(0px);
    }
    100% {
      opacity: 1;
      height: 274px;
      transform: translateY(0px);
    }
  }
`;

const LoginLink = styled(Link)`
  display: block;
  border-radius: 44px;
  font-size: var(--sm);
  color: var(--dark-gray);
  background-color: #bad6ee;
  width: 322px;
  padding: 12.75px 0;
  margin-bottom: ${(props) => props.mb || '10px'};

  ${(props) =>
    props.email &&
    css`
      border: 1px solid var(--primary);
      background: url(${email}) no-repeat 17px;
    `}
  ${(props) =>
    props.kakao &&
    css`
      border: 1px solid #f2c94c;
      background: url(${kakao}) no-repeat 17px;
    `}
  ${(props) =>
    props.google &&
    css`
      border: 1px solid var(--dark-gray);
      background: url(${google}) no-repeat 17px;
    `}
    ${(props) =>
    props.facebook &&
    css`
      border: 1px solid #2d9cdb;
      background: url(${facebook}) no-repeat 17px;
    `};
  ${(props) =>
    props.signup &&
    css`
      color: #ffffff;
      border: 1px solid var(--primary);

      background-color: var(--primary);
    `};
`;

export default LoginMethod;
