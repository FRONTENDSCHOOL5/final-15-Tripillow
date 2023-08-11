import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import isDesktop from '../../../Recoil/isDesktop/isDesktop';

const ImageModal = ({ setModalOn, imgSrc }) => {
  const isPCScreen = useRecoilValue(isDesktop);
  const closeModal = () => {
    setModalOn(false);
  };
  return (
    <ModalBackground onClick={closeModal} $isPCScreen={isPCScreen}>
      <Modal src={imgSrc} $isPCScreen={isPCScreen} />
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  /* top: 50%; */
  top: 0;
  /* left: 50%; */
  left: ${(props) => (props.$isPCScreen ? '335px' : '0')};
  /* transform: translate(-50%, -50%); */
  /* width: 390px; */
  width: ${(props) => (props.$isPCScreen ? 'calc(100% - 335px)' : '390px')};
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  ${(props) =>
    props.$isPCScreen ||
    css`
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `}
`;

const Modal = styled.img`
  position: absolute;
  /* position: absolute; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => (props.$isPCScreen ? '50%' : '100%')};
  margin: auto;
`;

export default ImageModal;
