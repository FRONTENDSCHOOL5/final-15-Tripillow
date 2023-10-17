import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import accountName from 'Recoil/accountName/accountName';
import User from 'Components/common/User';
import Profile from 'Assets/profile-sm.png';
import iconUnheart from 'Assets/icons/icon-heart.svg';
import iconHeart from 'Assets/icons/icon-heart-fill.svg';
import iconChat from 'Assets/icons/icon-message-circle-1.svg';
import PostModal from 'Components/PostModal';
import PostAlertModal from 'Components/common/Modal/PostAlertModal';
import ReportPostAPI from 'Api/Post/ReportPostAPI';
import HeartPostAPI from 'Api/Post/HeartPostAPI';
import UnheartPostAPI from 'Api/Post/UnheartPostAPI';
import PostImage from 'Components/common/PostImage';
import AlertTop from 'Components/common/Modal/AlertTop';
import PCModal from 'Components/common/Modal/PCModal';
import PCAlertModal from 'Components/common/Modal/PCAlertModal';
import DeletePostAPI from 'Api/Post/DeletePostAPI';
import useIsWideView from 'Components/SideNav/useIsWideView';
import usePostInfinity from 'Hooks/usePostInfinity';

const HomePostLayout = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isWideView = useIsWideView();
  const pathname = location.pathname;
  const inDetail = !['/home', '/profile'].some((path) => pathname.startsWith(path));
  const name = useRecoilValue(accountName);
  const [isTopModalOn, setIsTopModalOn] = useState(false);
  const [isModalOn, setIsModalOn] = useState(false);
  const [isAlertModalOn, setIsAlertModalOn] = useState(false);
  const post = props.post;
  const isMine = post.author.accountname === name;
  const userImg = post.author.image;
  const pictures = post.image?.split(', ');
  const createdAt =
    post.createdAt.slice(0, 4) + '년 ' + post.createdAt.slice(5, 7) + '월 ' + post.createdAt.slice(8, 10) + '일 ';
  const [isHearted, setIsHearted] = useState(post.hearted);
  const [heartCount, setHeartCount] = useState(post.heartCount);

  const handlePostClick = () => {
    if (inDetail) {
      return;
    }
    navigate(`/post/${post.id}`);
  };

  const closeModal = () => {
    setIsModalOn(false);
    setIsAlertModalOn(false);
  };

  const handleAlertModal = (e) => {
    e.stopPropagation();
    setIsAlertModalOn(true);
  };

  const deletePost = DeletePostAPI(post.id);
  const reportPost = ReportPostAPI(post.id);
  const heartPost = HeartPostAPI(post.id);
  const unheartPost = UnheartPostAPI(post.id);

  const { removePostCacheData } = usePostInfinity();

  const handleDelete = async () => {
    await deletePost();
    removePostCacheData();
    window.location.reload();
    closeModal();
    if (location.pathname === '/profile') {
      props.updatePost(true);
    } else {
      navigate('/profile', { state: { isDeleted: true } });
    }
  };

  const handleModify = () => {
    navigate('/modifypost', { state: post.id });
  };

  const handleReport = async () => {
    await reportPost();
    setIsTopModalOn(true);
    closeModal();
    setTimeout(() => setIsTopModalOn(false), 2300);
  };

  const handleHeart = async () => {
    const response = isHearted ? await unheartPost() : await heartPost();
    setIsHearted(response.post.hearted);
    setHeartCount(response.post.heartCount);
  };

  const trimContent = (content) => {
    const match = content?.match(/^\[(K|G)\]/);
    if (match) {
      return content.slice(3);
    }
    return content;
  };

  return (
    <Layout>
      {isTopModalOn && (
        <AlertTop isWideView={isWideView} isError={true}>
          게시글이 신고되었습니다.
        </AlertTop>
      )}
      <User
        accountname={post.author.accountname}
        userImg={userImg || Profile}
        username={post.author.username}
        content={'@' + post.author.accountname}
        margin={'0 0 10px 0'}
        moreBtn
        setIsModalOn={setIsModalOn}
        productId={post.id}
      >
        애월읍 위니브
      </User>
      {pictures !== undefined && pictures[0] !== '' ? (
        <>
          <PostImage post={post}></PostImage>
          <IconLayout>
            <IconButton onClick={handleHeart} aria-label='좋아요 누르기'>
              <img src={isHearted ? iconHeart : iconUnheart} alt='하트 아이콘' />
              <span>{heartCount}</span>
            </IconButton>
            <IconButton onClick={handlePostClick} aria-label={inDetail ? '댓글 개수' : '게시글 상세 페이지로 이동'}>
              <img src={iconChat} alt='채팅 아이콘' />
              <span>{props.comments?.length || post.commentCount}</span>
            </IconButton>
          </IconLayout>
          <Content onClick={handlePostClick} inDetail={inDetail}>
            {trimContent(post.content)}
          </Content>
        </>
      ) : (
        <>
          <Content onClick={handlePostClick} inDetail={inDetail}>
            {trimContent(post.content)}
          </Content>
          <IconLayout>
            <IconButton onClick={handleHeart} aria-label='좋아요 누르기'>
              <img src={isHearted ? iconHeart : iconUnheart} alt='하트 아이콘' />
              <span>{heartCount}</span>
            </IconButton>
            <IconButton onClick={handlePostClick} aria-label={inDetail ? '댓글 개수' : '게시글 상세 페이지로 이동'}>
              <img src={iconChat} alt='채팅 아이콘' />
              <span>{props.commets?.length || post.commentCount}</span>
            </IconButton>
          </IconLayout>
        </>
      )}
      <span style={{ fontSize: '10px', color: 'var(--dark-gray)' }}>{createdAt}</span>
      <OnModal id='OnModal'>
        {isModalOn &&
          (isWideView ? (
            <PCModal
              handleAlertModal={handleAlertModal}
              setIsModalOn={setIsModalOn}
              handleReport={handleReport}
              handleModify={handleModify}
              closeModal={closeModal}
              isMine={isMine}
              isComment={false}
            ></PCModal>
          ) : (
            <PostModal
              isMine={isMine}
              postId={post.id}
              handleAlertModal={handleAlertModal}
              handleModify={handleModify}
              handleReport={handleReport}
              closeModal={closeModal}
            ></PostModal>
          ))}
        {isAlertModalOn &&
          (isWideView ? (
            <PCAlertModal
              setIsAlertModalOn={setIsAlertModalOn}
              rightClick={handleDelete}
              txt='게시글을 삭제할까요?'
            ></PCAlertModal>
          ) : (
            <PostAlertModal
              isMine={isMine}
              setIsModalOn={setIsModalOn}
              handleDelete={handleDelete}
              handleReport={handleReport}
              closeModal={closeModal}
            ></PostAlertModal>
          ))}
      </OnModal>
    </Layout>
  );
};

const Layout = styled.div`
  padding: 14px 12px 20px 16px;
  padding-bottom: ${(props) => props.pb || '20px'};
  background-color: #fff;
`;

const IconLayout = styled.div`
  display: flex;
  gap: 19px;
  margin: 12px 0 12px 0;
`;

const IconButton = styled.button`
  width: 39px;
  color: var(--gray);
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 15px;
    height: 15px;
  }

  span {
    font-size: var(--xs);
    color: var(--dark-gray);
  }
`;

const Content = styled.p`
  font-size: var(--sm);
  margin-bottom: 13px;
  line-height: 1.4;
  cursor: ${(props) => (props.inDetail === true ? 'auto' : 'pointer')};
  word-break: break-all;
  white-space: pre-wrap;

  & + span {
    font-size: 10px;
    color: var(--dark-gray);
  }

  ${(props) =>
    !props.inDetail &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    `}
`;

const OnModal = styled.div`
  position: relative;
  z-index: 9999;
`;

export default HomePostLayout;
