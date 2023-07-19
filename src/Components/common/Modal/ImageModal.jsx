import React, { useState } from 'react';
import styled from 'styled-components';

const ImageModal = ({ setModalOn, imgSrc }) => {
  const closeModal = () => {
    setModalOn(false);
  };
  return (
    <ModalBackground onClick={closeModal}>
      <Modal src={imgSrc} />
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
  background-color: rgba(0, 0, 0, 0.8);
`;

const Modal = styled.img`
  position: fixed;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  width: 100%;
`;

export default ImageModal;
