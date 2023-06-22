import React, { useEffect } from 'react';
import styled from 'styled-components';
import DeleteCommentAPI from '../Utils/DeleteCommentAPI';
import ReportCommentAPI from '../Utils/ReportCommentAPI';
import accountname from '../Recoil/accountName/accountName';
import { useRecoilValue } from 'recoil';

const CommentModal = ({ postId, commentInfo }) => {
  const accName = useRecoilValue(accountname);
  const isMyComment = commentInfo.author.accountname === accName;
  const deleteComment = DeleteCommentAPI(postId, commentInfo.id);
  const reportComment = ReportCommentAPI(postId, commentInfo.id);
  // console.log(postId, commentInfo.id);

  const handleDelete = async () => {
    // setCommentModalClicked('D');
    deleteComment();
    console.log('Delete');
  };

  const handleReport = async () => {
    // setCommentModalClicked('R');
    reportComment();
    console.log('Report');
  };
  return (
    <ModalLayout>
      <SlideBar></SlideBar>
      {isMyComment ? (
        <button type='button' onClick={handleDelete}>
          삭제
        </button>
      ) : (
        <button type='button' onClick={handleReport}>
          신고하기
        </button>
      )}
    </ModalLayout>
  );
};

const ModalLayout = styled.div`
  position: fixed;
  left: 50%;
  bottom: 60px;
  transform: translate(-50%);
  width: 389px;
  height: 92px;
  padding: 16px 0;
  background-color: #fff;
  box-shadow: 0px -2px 2px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 10px 10px 0 0;
  z-index: 9999;

  button {
    display: block;
    width: 100%;
    text-align: left;
    font-size: var(--sm);
    padding: 14px 26px;
    box-sizing: border-box;

    :hover {
      background-color: rgba(0, 0, 0, 0.03);
    }
  }
`;

const SlideBar = styled.div`
  margin: ${(props) => props.margin || `0 auto 14px`};
  width: 50px;
  height: 4px;
  border-radius: 10px;
  background-color: var(--light-gray);
`;

export default CommentModal;
