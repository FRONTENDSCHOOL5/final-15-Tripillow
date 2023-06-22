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
import PostModal from '../Components/PostModal';
import CommentModal from '../Components/CommentModal';
import accountName from '../Recoil/accountName/accountName';
import DeleteCommentAPI from '../Utils/DeleteCommentAPI';
import ReportCommentAPI from '../Utils/ReportCommentAPI';

export default function PostDetail() {
  const accName = useRecoilValue(accountName);
  const { id } = useParams();
  // const [isPostModalOn, setIsPostModalOn] = useState(false);
  // const [nthCommentModal, setNthCommentModal] = useState(null);
  const [postInfo, setPostInfo] = useState({});
  const [comments, setComments] = useState([]);
  const ft_postDetail = PostDetailAPI(id, setPostInfo);
  const ft_getComment = GetCommentAPI(id, setComments);
  const [newComment, setNewComment] = useState(false);
  // const [commentModalClicked, setCommentModalClicked] = useState(null);

  // const handleDelete = async () => {
  //   const deleteComment = DeleteCommentAPI(id, comments[nthCommentModal]);
  //   await deleteComment();
  //   setNthCommentModal(null);
  // };

  // const handleModify = async () => {
  //   // const modifyComment = ModifyCommentAPI(id, comments[nthCommentModal]);
  //   // await modifyComment();
  //   setNthCommentModal(null);
  // };

  // const handleReport = async () => {
  //   const reportComment = ReportCommentAPI(id, comments[nthCommentModal]);
  //   await reportComment();
  //   setNthCommentModal(null);
  // };

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

  // useEffect(() => {
  //   if (commentModalClicked === null) {
  //     return;
  //   }
  //   switch (commentModalClicked) {
  //     case 'D':
  //       handleDelete();
  //       break;
  //     case 'M':
  //       handleModify();
  //       break;
  //     case 'R':
  //       handleReport();
  //       break;
  //     default:
  //       break;
  //   }
  // }, [commentModalClicked]);

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
        comments.map((el, i) => <Comment key={i} idx={i} postId={id} commentInfo={el}></Comment>)}
      <PostComment setNewComment={setNewComment} postId={postInfo.id}></PostComment>
      {/* {isPostModalOn && <PostModal isMyPost={accName === postInfo.author.accountname} postId={id}></PostModal>}
      {nthCommentModal !== null && (
        <CommentModal
          isMyComment={accName === comments[nthCommentModal].author.accountname}
          postId={id}
          comment={comments[nthCommentModal]}
          setCommentModalClicked={setCommentModalClicked}
        ></CommentModal>
      )} */}
    </Layout>
  );
}

const Layout = styled.div`
  ${LayoutStyle};
  background-color: #fff;
`;
