import styled, { css } from 'styled-components';
import email from '../Assets/icons/email.svg';
import kakao from '../Assets/icons/kakao.svg';
import google from '../Assets/icons/google.svg';
import facebook from '../Assets/icons/facebook.svg';

const LoginMethod = () => {
  return (
    <Div>
      <ButtonListsLayout>
        <Button email>이메일로 로그인</Button>
        <Button kakao>카카오톡 계정으로 로그인</Button>
        <Button google>구글계정으로 로그인</Button>
        <Button facebook mb='21px'>
          페이스북 계정으로 로그인
        </Button>
        <Button signup mb='18px'>
          회원가입
        </Button>
      </ButtonListsLayout>
    </Div>
  );
};

const ButtonListsLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 390px;
  padding-top: 20px;
  background-color: white;
  border-radius: 20px 20px 0 0;
  margin: 0 auto;
`;

const Div = styled.div`
  background-color: var(--primary);
`;
const Button = styled.button`
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
