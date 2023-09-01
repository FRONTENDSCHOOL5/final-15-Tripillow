import React from 'react';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import isDesktop from '../../../Recoil/isDesktop/isDesktop';

const ImageModal = ({ setIsModalOn, imgSrc }) => {
  const isPCScreen = useRecoilValue(isDesktop);
  const closeModal = () => {
    setIsModalOn(false);
  };
  return (
    <ModalBackground onClick={closeModal} $isPCScreen={isPCScreen}>
      <Modal src={imgSrc} $isPCScreen={isPCScreen} />
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: ${(props) => (props.$isPCScreen ? '335px' : '0')};
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => (props.$isPCScreen ? '50%' : '100%')};
  margin: auto;
`;

export default ImageModal;
