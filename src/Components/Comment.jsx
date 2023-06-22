import React, { useState } from 'react';
import profileImg from '../Assets/profile-sm.png';
import styled from 'styled-components';
import more from '../Assets/icons/icon-more-vertical.svg';
import CommentModal from './CommentModal';
import { useEffect } from 'react';
import PostAlertModal from './common/PostAlertModal';
import accountname from '../Recoil/accountName/accountName';
import { useRecoilValue } from 'recoil';
import DeleteCommentAPI from '../Utils/DeleteCommentAPI';
import ReportCommentAPI from '../Utils/ReportCommentAPI';

const Comment = ({ commentInfo, postId, idx, setNewComment }) => {
  const name = useRecoilValue(accountname);
  const [isModalOn, setIsModalOn] = useState(false);
  const [isAlertModalOn, setIsAlertModalOn] = useState(false);
  const createdAt =
    commentInfo.createdAt.slice(0, 4) +
    '년 ' +
    commentInfo.createdAt.slice(5, 7) +
    '월 ' +
    commentInfo.createdAt.slice(8, 10) +
    '일 ';
  const isMine = name === commentInfo.author.accountname;
  const deleteComment = DeleteCommentAPI(postId, commentInfo.id);
  const reportComment = ReportCommentAPI(postId, commentInfo.id);

  const handleModal = () => {
    setIsModalOn(!isModalOn);
    // console.log('clicked');
  };

  const closeModal = () => {
    setIsModalOn(false);
    setIsAlertModalOn(false);
  };

  const handleDelete = async () => {
    const response = await deleteComment();
    console.log(response);
    closeModal();
    setNewComment(true);
  };

  const handleReport = async () => {
    const response = await reportComment();
    console.log(response);
    closeModal();
  };

  useEffect(() => {
    setIsModalOn(false);
    setIsAlertModalOn(false);
  }, []);

  return (
    <CommentLayout>
      <Profile>
        <ProfileImg src={commentInfo.image || profileImg} alt='프로필 이미지'></ProfileImg>
        <UserName>{commentInfo.author.username || '더미유저'}</UserName>
        <Time>{createdAt}</Time>
        <MoreBtn onClick={handleModal}></MoreBtn>
      </Profile>
      <Text>{commentInfo.content || '더미코멘트'}</Text>
      {isModalOn && (
        <CommentModal postId={postId} commentInfo={commentInfo} setIsAlertModalOn={setIsAlertModalOn}></CommentModal>
      )}
      {isAlertModalOn && (
        <PostAlertModal
          isMine={isMine}
          isComment={true}
          setIsModalOn={setIsModalOn}
          handleDelete={handleDelete}
          handleReport={handleReport}
          closeModal={closeModal}
        ></PostAlertModal>
      )}
    </CommentLayout>
  );
};

const CommentLayout = styled.div`
  margin: 0 12px 16px 16px;
`;

const Profile = styled.div`
  position: relative;
  display: flex;
  gap: 15px;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const UserName = styled.span`
  font-size: var('--sm');
  font-weight: 500;
`;

const Time = styled.span`
  color: var(--dark-gray);
  font-size: 10px;
`;

const MoreBtn = styled.button`
  position: absolute;
  width: 20px;
  height: 20px;
  right: 0;
  background-image: url(${more});
`;

const Text = styled.p`
  margin: 0 0 0 51px;
  box-shadow: solid 1px 0 0;
  font-size: var(--sm);
`;

export default Comment;
