import React from 'react';
import styled from 'styled-components';
import prev from '../assets/icon/icon-arrow-back.png';
import more from '../assets/icon/icon-more-vertical.png';

export default function Header() {
  return (
    <HeaderContainer>
      <PrevBtn />
      <MoreBtn src={more} />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 390px;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px 0 16px;
  box-sizing: border-box;
  border-bottom: 0.5px solid #dbdbdb;
  /* box-shadow: inset 4px 4px 4px green; */
`;
const PrevBtn = styled.button`
  width: 22px;
  height: 22px;
  background-image: url(${prev});
`;
const MoreBtn = styled.button`
  width: 24px;
  height: 24px;
  background-image: url(${more});
`;
