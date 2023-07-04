import React from 'react';
import styled from 'styled-components';
import topbutton from '../../Assets/icons/topbutton.svg';

const TopButton = () => {
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <TopButtonLayout>
      <ButtonToTop onClick={scrollToTop}>
        <img src={topbutton} alt='최상단 이동 버튼' />
      </ButtonToTop>
    </TopButtonLayout>
  );
};

const TopButtonLayout = styled.div`
  position: fixed;
  width: 360px;
  height: 48px;
  bottom: 85px;
`;

const ButtonToTop = styled.button`
  display: block;
  position: relative;
  margin: 0 0 0 auto;
  width: 33px;
  height: 33px;
  border: none;

  &:hover {
    animation: floatAnimation 1s ease-in-out infinite;

    @keyframes floatAnimation {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-5px);
      }
      100% {
        transform: translateY(0);
      }
    }
  }
`;

export default TopButton;
