import React from 'react';
import prev from '../../../Assets/icons/icon-arrow-back.svg';
import more from '../../../Assets/icons/icon-more-vertical.svg';
import styled from 'styled-components';
import HeaderLayout from '../../../Styles/HeaderLayout';
import { useNavigate } from 'react-router-dom';

const BasicHeader = (props) => {
  const navigate = useNavigate();
  return (
    <HeaderLayout>
      <ContentLayout>
        <PrevButton
          onClick={() => {
            navigate(-1);
          }}
        />
        {props.children && <div>{props.children}</div>}
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
