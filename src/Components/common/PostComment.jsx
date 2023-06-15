import React from 'react';
import styled from 'styled-components';
import profileImg from '../../Assets/profile-sm.png';

export default function PostComment() {
  return (
    <FooterLayout>
      <InputLayout>
        <ProfileImg src={profileImg}></ProfileImg>
        <InputStyle type={'text'} placeholder={'댓글 입력하기'} />
      </InputLayout>
      <PostButton type={'submit'}>게시</PostButton>
    </FooterLayout>
  );
}

const FooterLayout = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 390px;
  height: 60px;
  padding: 13px 15px;
  box-sizing: border-box;
  border-top: 0.5px solid #dbdbdb;
`;

const InputLayout = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  margin: 0 18px 0 0;
`;

const InputStyle = styled.input`
  font-size: var(--sm);
  min-width: 270px;

  &::placeholder {
    color: var(--gray);
  }
`;

const PostButton = styled.button`
  color: var(--primary);
`;
