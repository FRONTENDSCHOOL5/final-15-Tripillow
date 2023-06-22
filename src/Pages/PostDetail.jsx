import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { LayoutStyle } from '../Styles/Layout';
import Comment from '../Components/Comment';
import PostComment from '../Components/common/PostComment';
import BasicHeader from '../Components/common/Header/BasicHeader';
import { useRecoilValue } from 'recoil';
import PostDetailAPI from '../Utils/PostDetailAPI';
import GetCommentAPI from '../Utils/GetCommentAPI';
import HomePostLayout from '../Components/HomePost/HomePostLayout';
import accountName from '../Recoil/accountName/accountName';

export default function PostDetail() {
  const accName = useRecoilValue(accountName);
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState({});
  const [comments, setComments] = useState([]);
  const ft_postDetail = PostDetailAPI(id, setPostInfo);
  const ft_getComment = GetCommentAPI(id, setComments);
  const [newComment, setNewComment] = useState(false);

  useEffect(() => {
    const sync = async () => {
      await ft_postDetail();
      await ft_getComment();
      setComments((prev) => prev.reverse());
    };
    sync();
    if (newComment) {
      setNewComment(false);
    }
  }, [newComment]);

  return (
    <Layout>
      <BasicHeader
        btn1='설정 및 개인정보'
        btn2='로그아웃'
        txt='정말 로그아웃 하시겠습니까?'
        rightbtn='로그아웃'
        isPost
      ></BasicHeader>
      {Object.keys(postInfo).length ? <HomePostLayout post={postInfo}></HomePostLayout> : <></>}
      {comments.length !== 0 &&
        comments.map((el, i) => (
          <Comment key={i} idx={i} postId={id} commentInfo={el} setNewComment={setNewComment}></Comment>
        ))}
      <PostComment setNewComment={setNewComment} postId={postInfo.id}></PostComment>
    </Layout>
  );
}

const Layout = styled.div`
  ${LayoutStyle};
  background-color: #fff;
`;
