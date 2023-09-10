import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HeaderLayout from 'Styles/HeaderLayout';
import prev from 'Assets/icons/icon-arrow-back.svg';
import Button from 'Components/common/Button';

const UploadHeader = (props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const paths = {
    '/post': '게시물 업로드 페이지',
    '/modifypost': '게시물 수정 페이지',
    '/addproduct': '상품 업로드 페이지',
    '/modifyproduct': '상품 수정 페이지',
    '/profile/edit': '프로필 수정 페이지',
  };

  return (
    <HeaderLayout>
      <h1 className='a11y-hidden'>{paths[pathname]}</h1>
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
