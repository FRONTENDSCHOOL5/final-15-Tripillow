import React from 'react';
import styled from 'styled-components';

const PCModal = ({ handleAlertModal, setIsModalOn, handleReport, handleModify, closeModal, isMine, isComment }) => {
  const handleDelete = (e) => {
    setIsModalOn(false);
    handleAlertModal(e);
  };

  return (
    <ModalBackground onClick={closeModal}>
      <ModalLayout>
        {isMine ? (
          isComment ? (
            <Button color='var(--error)' onClick={handleDelete}>
              삭제
            </Button>
          ) : (
            <>
              <Button onClick={handleModify}>수정</Button>
              <Button color='var(--error)' onClick={handleDelete}>
                삭제
              </Button>
            </>
          )
        ) : (
          <Button color='var(--error)' onClick={handleReport}>
            신고
          </Button>
        )}
      </ModalLayout>
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalLayout = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  padding: 20px 0;
  text-align: center;
  color: ${(props) => (props.color ? props.color : 'black')};
  &:not(:last-of-type) {
    border-bottom: 1px solid var(--light-gray);
  }
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
    border-left: 1px solid var(--light-gray);
    border-bottom-left-radius: 0;
  }
`;
const ModalButton = styled.button`
  width: 126px;
  padding: 14px 0;
  height: 100%;
  font-size: var(--sm);
  /* color: ${(props) => (props.color ? 'var(--primary)' : 'black')}; */
  color: ${(props) => props.color || 'black'};
  border-radius: 0 0 10px 10px;
  border-top: 1px solid var(--light-gray);
  border-color: ${(props) => (props.border ? 'transparent' : 'var(--light-gray)')};
  box-sizing: border-box;
`;

export default PCModal;
