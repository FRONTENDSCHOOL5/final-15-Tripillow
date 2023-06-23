import React, { useState, useEffect } from 'react';
import accountName from '../../Recoil/accountName/accountName';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import URL from '../../Utils/URL';
import User from '../common/User';
import Profile from '../../Assets/profile-sm.png';
import arrowRight from '../../Assets/icons/icon-arrow-right.svg';
import arrowLeft from '../../Assets/icons/icon-arrow-left.svg';
import iconHeart from '../../Assets/icons/icon-heart.svg';
import iconChat from '../../Assets/icons/icon-message-circle-1.svg';
import defaultImg from '../../Assets/defaultImg.png';
import PostModal from '../PostModal';
import { useLocation, useNavigate } from 'react-router-dom';
import PostAlertModal from '../common/PostAlertModal';
import DeletePostAPI from '../../Utils/DeletePostAPI';
import ReportPostAPI from '../../Utils/ReportPostAPI';

const HomePostLayout = (props) => {
  const name = useRecoilValue(accountName);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOn, setIsModalOn] = useState(false);
  const [isAlertModalOn, setIsAlerModalOn] = useState(false);
  const post = props.post;
  const isMine = post.author.accountname === name;
  const userImg = post.author.image;
  const pictures = post.image.split(', ');
  const createdAt =
    post.createdAt.slice(0, 4) + '년 ' + post.createdAt.slice(5, 7) + '월 ' + post.createdAt.slice(8, 10) + '일 ';
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsModalOn(false);
    setIsAlerModalOn(false);
  }, []);

  const handlePostClick = () => {
    // Navigate to the post detail page with the postId
    navigate(`/post/${post.id}`);
  };
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? pictures.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === pictures.length - 1 ? 0 : prev + 1));
  };

  const handleError = (e) => {
    e.target.src = defaultImg;
  };

  const closeModal = () => {
    setIsModalOn(false);
    setIsAlerModalOn(false);
  };

  const handleAlertModal = () => {
    setIsAlerModalOn(!isAlertModalOn);
  };

  const deletePost = DeletePostAPI(post.id);
  const reportPost = ReportPostAPI(post.id);

  const handleDelete = async () => {
    const response = await deletePost();
    closeModal();
    if (location.pathname === '/profile') {
      window.location.reload();
    } else {
      navigate('/profile');
    }
  };

  const handleModify = () => {
    navigate('/modifypost', { state: post.id });
  };

  const handleReport = async () => {
    const response = await reportPost();
    closeModal();
    // TODO 리포트 되었다는 모달 띄우기
  };

  return (
    <Layout>
      <User
        accountname={post.author.accountname}
        userImg={userImg || Profile}
        username={post.author.username}
        content={'@' + post.author.accountname}
        moreBtn
        setIsModalOn={setIsModalOn}
        productId={post.id}
      >
        애월읍 위니브
      </User>
      <ImageLayout>
        {pictures.length > 1 && <ArrowButton onClick={handlePrev} bgImage={arrowLeft} left='16px'></ArrowButton>}
        <img src={URL + '/' + pictures[currentIndex]} onError={handleError} alt='' />
        {pictures.length > 1 && <ArrowButton onClick={handleNext} bgImage={arrowRight} right='16px'></ArrowButton>}
        <IndicatorLayout>
          {pictures.length > 1 &&
            pictures.map((_, index) => {
              return <Indicator key={index} indicator={index === currentIndex}></Indicator>;
            })}
        </IndicatorLayout>
      </ImageLayout>
      <IconLayout>
        <IconButton>
          <img src={iconHeart} alt='하트 아이콘' />
          <span>{post.heartCount}</span>
        </IconButton>
        <IconButton>
          <img src={iconChat} alt='채팅 아이콘' />
          <span>{post.commentCount}</span>
        </IconButton>
      </IconLayout>
      <Content onClick={handlePostClick}>{post.content}</Content>
      <span>{createdAt}</span>
      {isModalOn && (
        <PostModal
          isMine={isMine}
          postId={post.id}
          handleAlertModal={handleAlertModal}
          handleModify={handleModify}
          handleReport={handleReport}
        ></PostModal>
      )}
      {isAlertModalOn && (
        <PostAlertModal
          isMine={isMine}
          setIsModalOn={setIsModalOn}
          handleDelete={handleDelete}
          handleReport={handleReport}
          closeModal={closeModal}
        ></PostAlertModal>
      )}
    </Layout>
  );
};

const Layout = styled.div`
  padding: 14px 12px 20px 16px;
  padding-bottom: ${(props) => props.pb || '20px'};
  background-color: #fff;
`;

const ImageLayout = styled.div`
  position: relative;
  width: calc(100% + 28px);
  height: 270px;
  margin: 4px -12px 6px -16px;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  width: 25px;
  height: 25px;
  top: ${(props) => props.top || '50%'};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  background: ${(props) => `url(${props.bgImage})`} no-repeat center;
`;

const IndicatorLayout = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Indicator = styled.div`
  width: 6px;
  height: 6px;
  background-color: ${(props) => (props.indicator ? '#fff' : 'var(--gray)')};
  border-radius: 50%;
`;

const IconLayout = styled.div`
  display: flex;
  gap: 19px;
  margin: 12px 0 12px 0;
`;

const IconButton = styled.button`
  width: 39px;
  color: var(--gary);
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
  cursor: pointer;

  & + span {
    font-size: 10px;
    color: var(--dark-gray);
  }
`;

export default HomePostLayout;
