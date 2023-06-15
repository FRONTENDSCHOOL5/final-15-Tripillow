import React from 'react';
import HeaderLayout from '../../../Styles/HeaderLayout';
import prev from '../../../Assets/icons/icon-arrow-back.svg';
import Button from '../Button';
import styled from 'styled-components';

const UploadHeader = (props) => {
  return (
    <HeaderLayout>
      <PrevButton />
      <Button disabled={props.disabled} width='90px' fontSize='14px' padding='7.75px'>
        {props.children}
      </Button>
    </HeaderLayout>
  );
};

const PrevButton = styled.button`
  width: 22px;
  height: 22px;
  margin-right: 8px;
  background-image: url(${prev});
`;
export default UploadHeader;
