import React from 'react';
import styled from 'styled-components';
import topbutton from 'Assets/icons/topbutton.svg';
import useIsWideView from 'Components/SideNav/useIsWideView';

const TopButton = () => {
  const isWideView = useIsWideView();
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <TopButtonLayout $isWideView={isWideView}>
      <ButtonToTop onClick={scrollToTop} $isWideView={isWideView}>
        <img src={topbutton} alt='최상단 이동 버튼' />
      </ButtonToTop>
    </TopButtonLayout>
  );
};

const TopButtonLayout = styled.div`
  position: fixed;
  width: ${(props) => (props.$isWideView ? '480px' : '390px')};
  height: 48px;
  bottom: 85px;
`;

const ButtonToTop = styled.button`
  display: block;
  position: relative;
  margin: 0 0 0 auto;
  border: none;
  right: ${(props) => (props.$isWideView ? '-20%' : '20px')};

  img {
    width: ${(props) => (props.$isWideView ? '45px' : '33px')};
    height: ${(props) => (props.$isWideView ? '45px' : '33px')};
  }
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
