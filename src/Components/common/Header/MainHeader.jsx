import React from 'react';
import HeaderLayout from '../../../Styles/HeaderLayout';
import logo from '../../../Assets/logo.png';
import search from '../../../Assets/icons/icon-search.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MainHeader = () => {
  const navigate = useNavigate();
  return (
    <HeaderLayout>
      <LogoLayout>
        <img src={logo} alt='로고' />
      </LogoLayout>
      <SearchButton
        onClick={() => {
          navigate('/search');
        }}
      />
    </HeaderLayout>
  );
};

const SearchButton = styled.button`
  width: 24px;
  height: 24px;
  background-image: url(${search});
`;

const LogoLayout = styled.div`
  width: 130px;
  height: 25px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default MainHeader;
