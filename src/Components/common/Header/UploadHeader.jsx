import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HeaderLayout from 'Styles/HeaderLayout';
import prev from 'Assets/icons/icon-arrow-back.svg';
import Button from 'Components/common/Button';

const UploadHeader = (props) => {
  const navigate = useNavigate();

  return (
    <HeaderLayout>
      <PrevButton onClick={() => navigate(-1)} aria-label='뒤로 가기' />
      <Button {...props} aria-label='업로드' width='90px' fontSize='14px' padding='7.75px'>
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
