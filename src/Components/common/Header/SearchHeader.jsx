import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HeaderLayout from 'Styles/HeaderLayout';
import prev from 'Assets/icons/icon-arrow-back.svg';

const SearchHeader = ({ value, onChange, header }) => {
  const navigate = useNavigate();
  return header ? (
    <HeaderLayout>
      <h1 className='a11y-hidden'>검색 페이지</h1>
      <PrevButton
        onClick={() => {
          navigate(-1);
        }}
      />
      <SearchInput type='text' placeholder='계정 검색' value={value} onChange={onChange} />
    </HeaderLayout>
  ) : (
    <SearchInput type='text' placeholder='계정 검색' value={value} onChange={onChange} />
  );
};

const PrevButton = styled.button`
  width: 22px;
  height: 22px;
  margin-right: 8px;
  background-image: url(${prev});
`;
const SearchInput = styled.input`
  width: 100%;
  height: 32px;
  border: none;
  border-radius: 32px;
  background-color: #f2f2f2;
  font-size: var(--sm);
  padding-left: 16px;
  &:focus {
    outline: none;
  }
`;

export default SearchHeader;
