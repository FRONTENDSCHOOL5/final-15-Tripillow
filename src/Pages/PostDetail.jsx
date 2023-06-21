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
  const [newComment, setNewComment] = useState(false);
  useEffect(() => {
    const sync = async () => {
      await ft_postDetail();
      await ft_getComment();
      setComments((prev) => prev.reverse());
    };
    sync();
  }, [newComment]);

  return (
    <Layout>
      <BasicHeader
        btn1='설정 및 개인정보'
        btn2='로그아웃'
        txt='정말 로그아웃 하시겠습니까?'
        rightbtn='로그아웃'
      ></BasicHeader>
      {Object.keys(postDetail).length ? <HomePostLayout post={postDetail}></HomePostLayout> : <></>}
      {comments.length !== 0 && comments.map((el, i) => <Comment comment={el}></Comment>)}
      {<PostComment setNewComment={setNewComment} postId={postDetail.id}></PostComment>}
    </Layout>
  );
}

const Layout = styled.div`
  ${LayoutStyle};
  background-color: #fff;
`;
