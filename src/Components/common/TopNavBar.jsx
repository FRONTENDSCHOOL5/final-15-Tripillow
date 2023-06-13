import React from 'react';
import styled from 'styled-components';
import prev from '../../Assets/icons/icon-arrow-back.svg';
import more from '../../Assets/icons/icon-more-vertical.svg';

export default function TopNavBar() {
  return (
    <HeaderContainer>
      <LeftLayout>
      <PrevBtn />
      <div>하이하이</div>
      </LeftLayout>
      <MoreBtn />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  min-width: 390px;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px 0 16px;
  box-sizing: border-box;
  border-bottom: 0.5px solid #dbdbdb;
  margin-bottom: 25px;
`;

const LeftLayout = styled.div`
  display: flex;
  align-items: center;
`
const PrevBtn = styled.button`
  width: 22px;
  height: 22px;
  margin-right: 8px;
  background-image: url(${prev});
`;

const MoreBtn = styled.button`
  width: 24px;
  height: 24px;
  background-image: url(${more});
`;
