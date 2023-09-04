import React from 'react';
import styled from 'styled-components';

const PostAlertModal = ({ isMine, isComment, setIsModalOn, handleDelete, closeModal, handleReport }) => {
  const name = isComment ? '댓글' : '게시글';
  return (
    <ModalBackground onClick={closeModal}>
      <ModalLayout>
        <ModalTxt>{isMine ? `${name}을 삭제할까요?` : `${name}을 신고할까요?`}</ModalTxt>
        <ModalButtonLayout>
          <ModalButton onClick={closeModal}>취소</ModalButton>
          {isMine ? (
            <ModalButton onClick={handleDelete} color='var(--primary)'>
              삭제
            </ModalButton>
          ) : (
            <ModalButton onClick={handleReport} color='var(--primary)'>
              신고
            </ModalButton>
          )}
        </ModalButtonLayout>
      </ModalLayout>
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 390px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalLayout = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 252px;
  height: 110px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
`;

const ModalTxt = styled.p`
  font-size: var(--md);
  text-align: center;
  padding: 22px 0;
`;

const ModalButtonLayout = styled.div`
  display: flex;
  height: 50px;

  button + button {
    border-left: 1px solid #dbdbdb;
    border-bottom-left-radius: 0;
  }
`;
const ModalButton = styled.button`
  width: 126px;
  padding: 14px 0;
  height: 100%;
  font-size: var(--sm);
  color: ${(props) => props.color || 'black'};
  border-radius: 0 0 10px 10px;
  border-top: 1px solid #dbdbdb;
  border-color: ${(props) => (props.border ? 'transparent' : '#dbdbdb')};
  box-sizing: border-box;
`;

export default PostAlertModal;
