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

const Comment = ({ commentInfo, postId, setNewComment }) => {
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
  console.log(commentInfo);

  const handleModal = () => {
    setIsModalOn(!isModalOn);
  };

  const closeModal = () => {
    setIsModalOn(false);
    setIsAlertModalOn(false);
  };

  const handleDelete = async () => {
    const response = await deleteComment();
    closeModal();
    setNewComment(true);
  };

  const handleReport = async () => {
    const response = await reportComment();
    closeModal();
  };

  useEffect(() => {
    setIsModalOn(false);
    setIsAlertModalOn(false);
  }, []);

  return (
    <CommentLayout>
      <Profile>
        <ProfileImg src={commentInfo.author.image || profileImg} alt='프로필 이미지'></ProfileImg>
        <UserName>{commentInfo.author.username || '더미유저'}</UserName>
        <Time>{createdAt}</Time>
        <MoreBtn onClick={handleModal}></MoreBtn>
      </Profile>
      <Text>{commentInfo.content || '더미코멘트'}</Text>
      <ModalOn>
        {isModalOn && (
          <CommentModal isMine={isMine} commentInfo={commentInfo} setIsAlertModalOn={setIsAlertModalOn}></CommentModal>
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
      </ModalOn>
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

const ModalOn = styled.div`
  position: relative;
  z-index: 9999;
`;

export default Comment;
