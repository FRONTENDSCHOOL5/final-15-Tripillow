import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import profileImg from '../../Assets/profile-sm.png';
import styled from 'styled-components';
import more from '../../Assets/icons/icon-more-vertical.svg';
import CommentModal from './CommentModal';
import PostAlertModal from '../common/Modal/PostAlertModal';
import accountname from '../../Recoil/accountName/accountName';
import DeleteCommentAPI from '../../Utils/DeleteCommentAPI';
import ReportCommentAPI from '../../Utils/ReportCommentAPI';
import AlertTop from '../common/Modal/AlertTop';
import isDesktop from '../../Recoil/isDesktop/isDesktop';
import PCModal from '../common/Modal/PCModal';
import PCAlertModal from '../common/Modal/PCAlertModal';

const Comment = ({ commentInfo, postId, setIsNewComment }) => {
  const name = useRecoilValue(accountname);
  const isPCScreen = useRecoilValue(isDesktop);
  const [isTopModalOn, setIsTopModalOn] = useState(false);
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
  };

  const closeModal = () => {
    setIsModalOn(false);
    setIsAlertModalOn(false);
  };

  const handleDelete = async () => {
    const response = await deleteComment();
    closeModal();
    setIsNewComment((prev) => !prev);
  };

  const handleReport = async () => {
    await reportComment();
    setIsTopModalOn(true);
    closeModal();
    setTimeout(() => setIsTopModalOn(false), 2300);
  };

  const handleAlertModal = (e) => {
    e.stopPropagation();
    setIsAlertModalOn(true);
  };

  useEffect(() => {
    setIsModalOn(false);
    setIsAlertModalOn(false);
  }, []);

  return (
    <CommentLayout>
      {isTopModalOn && (
        <AlertTop isPCScreen={isPCScreen} isError={true}>
          댓글이 신고되었습니다.
        </AlertTop>
      )}
      <Profile>
        <ProfileLink
          to={commentInfo.author.accountname === name ? `/profile` : `/profile/${commentInfo.author.accountname}`}
        >
          <ProfileImg src={commentInfo.author.image || profileImg} alt='프로필 이미지'></ProfileImg>
        </ProfileLink>
        <UserName>{commentInfo.author.username}</UserName>
        <Time>{createdAt}</Time>
        <MoreBtn onClick={handleModal}></MoreBtn>
      </Profile>
      <Text>{commentInfo.content}</Text>
      <ModalOn>
        {isModalOn &&
          (isPCScreen ? (
            <PCModal
              handleAlertModal={handleAlertModal}
              setIsModalOn={setIsModalOn}
              handleReport={handleReport}
              closeModal={closeModal}
              isMine={isMine}
              isComment={true}
            ></PCModal>
          ) : (
            <CommentModal
              isMine={isMine}
              commentInfo={commentInfo}
              setIsAlertModalOn={setIsAlertModalOn}
              closeModal={closeModal}
            ></CommentModal>
          ))}
        {isAlertModalOn &&
          (isPCScreen ? (
            <PCAlertModal
              setIsAlertModalOn={setIsAlertModalOn}
              rightClick={handleDelete}
              txt='댓글을 삭제할까요?'
            ></PCAlertModal>
          ) : (
            <PostAlertModal
              isMine={isMine}
              isComment={true}
              setIsModalOn={setIsModalOn}
              handleDelete={handleDelete}
              handleReport={handleReport}
              closeModal={closeModal}
            ></PostAlertModal>
          ))}
      </ModalOn>
    </CommentLayout>
  );
};

const CommentLayout = styled.div`
  margin: 0 12px 14px 16px;
`;

const Profile = styled.div`
  position: relative;
  display: flex;
  gap: 15px;
  align-items: center;
`;

const ProfileLink = styled(Link)`
  display: block;
  width: 36px;
  height: 36px;
  /* border-radius: 50%; */
  /* overflow: hidden; */
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  margin: 8px 0 -15px 0;
`;

const UserName = styled.span`
  font-size: var(--sm);
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
  width: 80%;
  margin: 0 0 0 51px;
  box-shadow: solid 1px 0 0;
  font-size: var(--sm);
  word-break: break-all;
  line-height: 1.4;
`;

const ModalOn = styled.div`
  position: relative;
  z-index: 9999;
`;

export default Comment;
