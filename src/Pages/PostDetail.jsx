import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import PostDetailAPI from '../Utils/PostDetailAPI';
import GetCommentAPI from '../Utils/GetCommentAPI';
import HomePostLayout from '../Components/HomePost/HomePostLayout';

export default function PostDetail() {
  const { id } = useParams();
  const [postDetail, setPostDetail] = useState({});
  const [comments, setComments] = useState([]);
  const ft_postDetail = PostDetailAPI(id, setPostDetail);
  const ft_getComment = GetCommentAPI(id, setComments);
  useEffect(() => {
    const handle = async () => {
      await ft_postDetail();
      await ft_getComment();
    };
    handle();
    // console.log(postDetail);
    // console.log(comments);
  }, []);

  return (
    <Layout>
      <BasicHeader></BasicHeader>
      {Object.keys(postDetail).length ? <HomePostLayout post={postDetail}></HomePostLayout> : <></>}
      {/* <CommentLayout> */}
      {comments.length !== 0 && comments.map((el, i) => <Comment comment={el}></Comment>)}
      {/* </CommentLayout> */}
      {<PostComment postId={postDetail.id}></PostComment>}
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
