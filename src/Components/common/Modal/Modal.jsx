import React from 'react';
import styled from 'styled-components';

const Modal = ({ btn1, btn2, handleMorebutton, handleLogoutbutton, bottom, handleCancel, ...props }) => {
  return (
    <ModalBackground onClick={handleCancel}>
      <ModalLayout bottom={bottom}>
        <SlideBar></SlideBar>
        <button type='buton' {...props} onClick={props.handleProductModify || props.goSetting}>
          {btn1}
        </button>
        <button type='button' onClick={handleLogoutbutton} {...props}>
          {btn2}
        </button>
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
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 16px 0;
  background-color: #fff;
  box-shadow: 0px -2px 2px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 10px 10px 0 0;
  animation: fadeInModal 0.5s ease;

  @keyframes fadeInModal {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

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

export default Modal;
