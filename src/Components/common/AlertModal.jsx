import React from 'react';
import styled from 'styled-components';

export default function AlertModal(props) {
  return (
    <Layout>
      <ModalTxt>{props.txt}</ModalTxt>
      <ModalButtonLayout>
        <ModalButton>{props.leftbtn || '삭제'}</ModalButton>
        <ModalButton color>{props.rightbtn}</ModalButton>
      </ModalButtonLayout>
    </Layout>
  );
}

const Layout = styled.div`
  width: 252px;
  height: 110px;
  border-radius: 10px;
  background-color: #eff6e3;
`;
const ModalTxt = styled.div`
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
  color: ${(props) => (props.color ? 'var(--primary)' : 'black')};
  border-radius: 0 0 10px 10px;
  border-top: 1px solid #dbdbdb;
  border-color: ${(props) => (props.border ? 'transparent' : '#dbdbdb')};
  box-sizing: border-box;
`;
