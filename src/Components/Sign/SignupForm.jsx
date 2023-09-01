import React from 'react';
import styled, { css } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { LayoutStyle } from 'Styles/Layout';
import Button from 'Components/common/Button';
import Input from 'Components/common/Input';
import ErrorMSG from 'Styles/ErrorMSG';
import useSignup from 'Hooks/Sign/useSignup';
import isDesktop from 'Recoil/isDesktop/isDesktop';
import { formFadeIn } from 'Styles/SignAnimation';
import { uploadFile } from 'Utils/uploadFile';

import profileImg from 'Assets/profile-lg.png';
import uploadfile from 'Assets/icons/upload-file.svg';

const Signup = () => {
  const isPCScreen = useRecoilValue(isDesktop);
  const {
    emailPwCheck,
    handleSubmit,
    imgURL,
    setImgURL,
    errorMessage,
    userInfo,
    setUserInfo,
    handleInputChange,
    handleOnBlur,
    goNext,
    emailError,
    passwordError,
    handlePasswordValid,
  } = useSignup();

  return (
    <>
      {emailPwCheck ? (
        <UserSettingLayout $isPCScreen={isPCScreen}>
          <Title>프로필 설정</Title>
          <Inform>나중에 언제든지 변경할 수 있습니다.</Inform>
          <Form action='post' onSubmit={handleSubmit}>
            <ImageLayout>
              <ImgLabel htmlFor='file-input'>
                <ProfileImg src={imgURL ? imgURL : profileImg} />
              </ImgLabel>
              <input
                id='file-input'
                className='a11y-hidden'
                type='file'
                onChange={(e) => uploadFile(e, setImgURL, userInfo, setUserInfo)}
              />
            </ImageLayout>
            <Input
              label='사용자 이름'
              type='text'
              forId='name'
              placeholder='2~10자 이내여야 합니다.'
              mb={errorMessage ? '6px' : '16px'}
              value={userInfo.user.username}
              name='username'
              onChange={handleInputChange}
              autoFocus
            ></Input>
            <Input
              label='계정 ID'
              type='text'
              forId='user-id'
              placeholder='영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.'
              mb={errorMessage ? '6px' : '16px'}
              value={userInfo.user.accountname}
              name='accountname'
              onChange={handleInputChange}
            ></Input>
            {errorMessage === '영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.' && userInfo.user.accountname && (
              <ErrorMSG errorColor={errorMessage !== '사용 가능한 이메일 입니다.'}>{errorMessage}</ErrorMSG>
            )}
            {errorMessage === '이미 사용중인 계정 ID입니다.' && userInfo.user.accountname && (
              <ErrorMSG errorColor={errorMessage !== '사용 가능한 이메일 입니다.'}>{errorMessage}</ErrorMSG>
            )}
            <Input
              label='소개'
              type='text'
              forId='describe'
              placeholder='자신과 판매할 상품에 대해 소개해 주세요!'
              mb={errorMessage ? '6px' : '16px'}
              value={userInfo.user.intro}
              name='intro'
              onChange={handleInputChange}
            ></Input>
            {errorMessage === '이미 가입된 이메일 주소 입니다.' && (
              <ErrorMSG errorColor={errorMessage === '이미 가입된 이메일 주소 입니다.'}>{errorMessage}</ErrorMSG>
            )}
            <Button
              type='submit'
              width='322px'
              fontSize='14px'
              margin='10px 0 0 0'
              padding='13px 0'
              disabled={!userInfo.user.username || !userInfo.user.accountname || !userInfo.user.intro}
            >
              Tripillow 시작하기
            </Button>
          </Form>
        </UserSettingLayout>
      ) : (
        <SignupLayout $isPCScreen={isPCScreen}>
          <Title>이메일로 회원가입</Title>
          <Form onSubmit={goNext}>
            <Input
              label='이메일'
              type='email'
              forId='email-input'
              placeholder='이메일 주소를 입력해 주세요.'
              autoComplete='off'
              mb={emailError ? '6px' : '16px'}
              value={userInfo.user.email}
              name='email'
              onBlur={handleOnBlur}
              onChange={handleInputChange}
              autoFocus
            ></Input>
            {emailError && <ErrorMSG errorColor={emailError !== '사용 가능한 이메일 입니다.'}>{emailError}</ErrorMSG>}
            <Input
              label='비밀번호'
              type='password'
              forId='pw-input'
              placeholder='비밀번호를 설정해 주세요.'
              mb={passwordError ? '6px' : '30px'}
              autoComplete='off'
              value={userInfo.user.password}
              name='password'
              onBlur={handlePasswordValid}
              onChange={handleInputChange}
            ></Input>
            {passwordError && <ErrorMSG errorColor>{passwordError}</ErrorMSG>}
            <Button
              type='submit'
              width='322px'
              fontSize='var(--sm)'
              padding='13px 0'
              disabled={
                !userInfo.user.email ||
                !userInfo.user.password ||
                emailError !== '사용 가능한 이메일 입니다.' ||
                passwordError
              }
            >
              다음
            </Button>
          </Form>
        </SignupLayout>
      )}
    </>
  );
};

const SignupLayout = styled.div`
  ${LayoutStyle}
  padding: 30px 34px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;

  ${({ $isPCScreen }) =>
    $isPCScreen &&
    css`
      height: 740px;
      padding: 54px 34px;
      animation: ${formFadeIn} 0.5s forwards;
    `}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin-bottom: 40px;
  font-size: var(--xxl);
`;

// 프로필 설정 styled-component
const UserSettingLayout = styled.div`
  ${LayoutStyle}
  padding: 30px 34px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;

  ${({ $isPCScreen }) =>
    $isPCScreen &&
    css`
      height: 740px;
      padding: 54px 34px;
      animation: ${formFadeIn} 0.5s forwards;
    `}
`;

const Inform = styled.p`
  color: var(--dark-gray);
  font-size: var(--sm);
  margin-bottom: 30px;
`;

const ImageLayout = styled.div`
  width: 110px;
  height: 110px;
  margin: 0 auto 30px;
  position: relative;
`;

const ImgLabel = styled.label`
  display: block;
  position: relative;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  cursor: pointer;

  ::after {
    content: '';
    position: absolute;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    background: url(${uploadfile}) 0 0 / cover;
  }
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;

  width: ${(props) => props.width || '700px'};
`;

export default Signup;
