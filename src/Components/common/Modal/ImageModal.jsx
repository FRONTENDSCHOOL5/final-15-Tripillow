import React from 'react';
import styled, { css } from 'styled-components';
import useIsWideView from 'Components/SideNav/useIsWideView';

const ImageModal = ({ setIsModalOn, imgSrc }) => {
  const isWideView = useIsWideView();
  const closeModal = () => {
    setIsModalOn(false);
  };
  return (
    <ModalBackground onClick={closeModal} $isWideView={isWideView}>
      <Modal src={imgSrc} $isWideView={isWideView} alt='이미지 원본 모달창' />
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${(props) => (props.$isWideView ? '100%' : '390px')};
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  ${(props) =>
    props.$isWideView ||
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
  width: ${(props) => (props.$isWideView ? '50%' : '100%')};
  margin: auto;
`;

export default ImageModal;
