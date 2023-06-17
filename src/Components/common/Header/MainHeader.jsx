import React from 'react';
import HeaderLayout from '../../../Styles/HeaderLayout';
import logo from '../../../Assets/logo-Alphabet.svg';
import search from '../../../Assets/icons/icon-search.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MainHeader = () => {
  const navigate = useNavigate();
  return (
    <HeaderLayout>
      <img src={logo} alt='로고' />
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

export default MainHeader;
