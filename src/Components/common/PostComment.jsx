import React, { useState } from 'react';
import styled from 'styled-components';
import profileImg from '../../Assets/profile-sm.png';

export default function PostComment(props) {
  // TODO 기능 추가
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    return;
  };

  return (
    <FooterLayout>
      <InputLayout>
        <ProfileImg src={profileImg}></ProfileImg>
        <InputStyle type='text' placeholder='댓글 입력하기' onChange={handleInputChange} />
      </InputLayout>
      <PostButton type='submit' onSubmit={handleSubmit}>
        게시
      </PostButton>
    </FooterLayout>
  );
}

const FooterLayout = styled.form`
  display: flex;
  justify-content: space-between;
  min-width: 390px;
  height: 60px;
  padding: 13px 15px;
  box-sizing: border-box;
  border-top: 0.5px solid #dbdbdb;
  position: fixed;
  bottom: 0;
  background-color: #fff;
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
