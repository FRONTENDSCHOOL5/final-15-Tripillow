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
    <ButtonToTop onClick={scrollToTop}>
      <img src={topbutton} alt='최상단 이동 버튼' />
    </ButtonToTop>
  );
};

const ButtonToTop = styled.button`
  width: 33px;
  height: 33px;
  position: fixed;
  right: 22px;
  bottom: 95px;
  border: none;
`;

export default TopButton;
