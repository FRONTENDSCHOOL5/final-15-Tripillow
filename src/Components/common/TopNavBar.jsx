import React from 'react';
import styled from 'styled-components';
import prev from '../../Assets/icons/icon-arrow-back.svg';
import more from '../../Assets/icons/icon-more-vertical.svg';
import TopNavBarLayout from '../../Styles/TopNavBarLayout';

//todo: 중간 input 박스 조건식으로 처리
export default function TopNavBarBar(props) {
  return (
    <TopNavBarLayout>
      <LeftLayout>
        <PrevButton />
        <div>{props.children}</div>
      </LeftLayout>
      <MoreButton />
    </TopNavBarLayout>
  );
}

const LeftLayout = styled.div`
  display: flex;
  align-items: center;
`;
const PrevButton = styled.button`
  width: 22px;
  height: 22px;
  margin-right: 8px;
  background-image: url(${prev});
`;

const MoreButton = styled.button`
  width: 24px;
  height: 24px;
  background-image: url(${more});
`;
