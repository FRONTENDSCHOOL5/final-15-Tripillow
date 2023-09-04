import React, { useState, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import profileImg from 'Assets/profile-sm.png';
import isDesktop from 'Recoil/isDesktop/isDesktop';
import PostCommentAPI from 'Api/Post/PostCommentAPI';
import useIsWideView from 'Components/PCNav/useIsWideView';

export default function PostComment({ postId, setIsNewComment, userImg }) {
  const [userInput, setUserInput] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);
  const input = useRef();
  const isPCScreen = useRecoilValue(isDesktop);
  const isWideView = useIsWideView();
  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);
  };
  const handlePostComment = PostCommentAPI(postId, userInput);

  const handleClick = async (e) => {
    e.preventDefault();

    if (userInput === '' || isPostingComment) {
      return;
    }
    setIsPostingComment(true);
    try {
      console.log(e);
      await handlePostComment();
      setIsNewComment(true);
      input.current.value = '';
      setUserInput('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsPostingComment(false);
    }
  };

  return (
    <FooterFormLayout $isWideView={isWideView}>
      <InputLayout>
        <ProfileImg src={userImg || profileImg}></ProfileImg>
        <InputStyle type='text' placeholder='댓글 입력하기' ref={input} onChange={handleInputChange} />
      </InputLayout>
      <PostButton type='submit' disabled={isPostingComment} onClick={handleClick}>
        게시
      </PostButton>
    </FooterFormLayout>
  );
}

const FooterFormLayout = styled.form`
  display: flex;
  justify-content: space-between;
  /* min-width: 388px; */
  width: ${(props) => (props.$isWideView ? '480px' : '390px')};
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
  border-radius: 50%;
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
