import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import profileImg from '../../Assets/profile-sm.png';
import PostCommentAPI from '../../Utils/PostCommentAPI';

export default function PostComment({ postId, setIsNewComment }) {
  const [userInput, setUserInput] = useState('');
  const input = useRef();
  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);
  };

  const handlePostComment = PostCommentAPI(postId, {
    comment: {
      content: userInput,
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await handlePostComment();
    setIsNewComment((prev) => !prev);
    input.current.value = '';
    return;
  };

  return (
    <FooterFormLayout>
      <InputLayout>
        <ProfileImg src={profileImg}></ProfileImg>
        <InputStyle type='text' placeholder='댓글 입력하기' ref={input} onChange={handleInputChange} />
      </InputLayout>
      <PostButton type='submit' onClick={handleClick}>
        게시
      </PostButton>
    </FooterFormLayout>
  );
}

const FooterFormLayout = styled.form`
  display: flex;
  justify-content: space-between;
  min-width: 388px;
  min-height: 60px;
  padding: 13px 18px 30px;
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
