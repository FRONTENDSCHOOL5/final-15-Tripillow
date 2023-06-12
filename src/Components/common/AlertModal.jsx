import React from 'react';
import styled from 'styled-components';

export default function AlertModal(props) {
  return (
    <ModalLayout>
      <ModalTxt>{props.children}</ModalTxt>
      <ModalButtonLayout>
        <ModalButton>{props.children}</ModalButton>
        <ModalButton>{props.children}</ModalButton>
      </ModalButtonLayout>
    </ModalLayout>
  );
}

const ModalLayout = styled.div`
  width: 252px;
  height: 110px;
  border-radius: 10px;
`;
const ModalTxt = styled.div`
  font-size: var(--md);
`;

const ModalButtonLayout = styled.div`
  display: flex;
`;
const ModalButton = styled.button`
  width: 126px;
  height: 46px;
  color: var(--primary);
  border-radius: 10px;
`;
