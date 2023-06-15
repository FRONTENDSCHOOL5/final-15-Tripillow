import React from 'react';
import prev from '../../Assets/icons/icon-arrow-back.svg';
import more from '../../Assets/icons/icon-more-vertical.svg';
import styled from 'styled-components';
import HeaderLayout from '../../Styles/HeaderLayout';

const BasicHeader = (props) => {
  return (
    <HeaderLayout>
      <ContentLayout>
        <PrevButton />
        <div>{props.children}</div>
      </ContentLayout>
      <MoreButton />
    </HeaderLayout>
  );
};

const ContentLayout = styled.div`
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

export default BasicHeader;
