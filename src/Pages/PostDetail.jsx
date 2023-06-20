import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { LayoutStyle } from '../Styles/Layout';
import Comment from '../Components/Comment';
import PostComment from '../Components/common/PostComment';
import BasicHeader from '../Components/common/Header/BasicHeader';
import User from '../Components/common/User';
import Profile from '../Assets/profile-sm.png';
import arrowRight from '../Assets/icons/icon-arrow-right.svg';
import arrowLeft from '../Assets/icons/icon-arrow-left.svg';
import iconHeart from '../Assets/icons/icon-heart.svg';
import iconChat from '../Assets/icons/icon-message-circle-1.svg';
import URL from '../Utils/URL';

export default function PostDetail() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { state } = useLocation();
  // console.log('state: ', state);
  const props = state.props;
  const post = props.post;

  const userImg = post.author.image;
  // console.log('userImg', userImg);
  const pictures = post.image.split(', ');
  // console.log('img', pictures);
  const createdAt =
    post.createdAt.slice(0, 4) + '년 ' + post.createdAt.slice(5, 7) + '월 ' + post.createdAt.slice(8, 10) + '일 ';

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? pictures.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === pictures.length - 1 ? 0 : prev + 1));
  };

  return (
    <Layout>
      <BasicHeader></BasicHeader>
      <PostLayout>
        <User
          accountname={post.author.accountname}
          userImg={userImg || Profile}
          username={post.author.username}
          content={'@' + post.author.accountname}
          moreBtn
        >
          애월읍 위니브
        </User>
        <ImageLayout>
          {pictures.length > 1 && <ArrowButton onClick={handlePrev} bgImage={arrowLeft} left='16px'></ArrowButton>}
          <img src={URL + '/' + pictures[currentIndex]} alt='' />
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
        <Content>{post.content}</Content>
        <span>{createdAt}</span>
      </PostLayout>
      {/* <CommentLayout>
        <Comment author={{ username: 'dasom' }} content='댓글임'></Comment>
        <Comment author={{ username: 'dasom' }} content='댓글임'></Comment>
      </CommentLayout> */}
      <PostComment postId={post.id}></PostComment>
    </Layout>
  );
}

const Layout = styled.div`
  ${LayoutStyle};
  /* padding-bottom: ${(props) => props.pb || '20px'}; */
  background-color: #fff;
`;

const PostLayout = styled.div`
  padding: 14px 12px 20px 16px;
`;

// const CommentLayout = styled.section`
//   border-top: 1px solid var(--light-gray);
//   padding-top: 20px;
// `;

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

  & + span {
    font-size: 10px;
    color: var(--dark-gray);
  }
`;
