import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HeaderLayout from 'Styles/HeaderLayout';
import prev from 'Assets/icons/icon-arrow-back.svg';

const SearchHeader = ({ value, onChange, header, isSearch }) => {
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    if (isSearch) {
      inputRef?.current?.focus();
    }
  }, [isSearch]);

  return header ? (
    <HeaderLayout>
      <h1 className='a11y-hidden'>검색 페이지</h1>
      <PrevButton
        aria-label='뒤로 가기 버튼'
        onClick={() => {
          navigate(-1);
        }}
      />
      <SearchInput
        type='text'
        placeholder='계정 검색'
        value={value}
        onChange={onChange}
        aria-label='계정 검색'
        ref={inputRef}
      />
    </HeaderLayout>
  ) : (
    <SearchInput
      type='text'
      placeholder='계정 검색'
      value={value}
      onChange={onChange}
      aria-label='계정 검색'
      ref={inputRef}
    />
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
