import React from 'react';
import styled from 'styled-components';
import HeaderLayout from '../../../Styles/HeaderLayout';
import prev from '../../../Assets/icons/icon-arrow-back.svg';
import { useNavigate } from 'react-router-dom';

const SearchHeader = ({ value, onChange }) => {
  const navigate = useNavigate();
  return (
    <HeaderLayout>
      <PrevButton
        onClick={() => {
          navigate(-1);
        }}
      />
      <SearchInput type='text' placeholder='계정 검색' value={value} onChange={onChange} />
    </HeaderLayout>
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
