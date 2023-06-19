import React from 'react';
import styled from 'styled-components';

const AlertModal = ({ logout, handleCancel, ...props }) => {
  return (
    <ModalBackground>
      <ModalLayout>
        <ModalTxt>{props.txt}</ModalTxt>
        <ModalButtonLayout>
          <ModalButton onClick={handleCancel} {...props}>
            {props.leftbtn || '취소'}
          </ModalButton>
          <ModalButton onClick={logout} color='var(--primary)' {...props}>
            {props.rightbtn || '삭제'}
          </ModalButton>
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

  button + button {
    border-left: 1px solid #dbdbdb;
    border-bottom-left-radius: 0;
  }
`;
const ModalButton = styled.button`
  width: 126px;
  padding: 14px 0;
  /* height: 46px; */
  font-size: var(--sm);
  /* color: ${(props) => (props.color ? 'var(--primary)' : 'black')}; */
  color: ${(props) => props.color || 'black'};
  border-radius: 0 0 10px 10px;
  border-top: 1px solid #dbdbdb;
  border-color: ${(props) => (props.border ? 'transparent' : '#dbdbdb')};
  box-sizing: border-box;
`;

export default AlertModal;
