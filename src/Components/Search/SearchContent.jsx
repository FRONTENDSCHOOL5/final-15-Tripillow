import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import UserSkeleton from 'Components/common/Skeleton/UserSkeleton';
import User from 'Components/common/User';
import URL from 'Api/URL';
import userToken from 'Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import SearchHeader from 'Components/common/Header/SearchHeader';
import { useLocation } from 'react-router-dom';

const SearchContent = ({ header, isSearch, setIsSearch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [firstRun, setFirstRun] = useState(true);
  const location = useLocation();

  const ref = useRef();

  const token = useRecoilValue(userToken);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setFocusedIndex((prevIndex) => (prevIndex > 1 ? prevIndex - 1 : 1));
      }
      if (event.key === 'ArrowDown' || event.key === 'Tab') {
        event.preventDefault();
        if (firstRun) {
          setFirstRun(false);
          setFocusedIndex(1);
        }
        setFocusedIndex((prevIndex) => {
          if (
            (showAllResults && prevIndex < searchData.length) ||
            (!showAllResults && prevIndex < 10 && prevIndex < searchData.length && prevIndex < 10)
          )
            return prevIndex + 1;
          else return prevIndex;
        });
      }
      if (event.key === 'Escape' && location.pathname !== '/search') {
        setIsSearch(false);
      }
    },
    [searchData.length, showAllResults, setIsSearch, firstRun, location.pathname],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const useDebounceValue = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const handleSearchKeyword = (e) => {
    setSearchKeyword(e.target.value);
  };

  const debounceValue = useDebounceValue(searchKeyword, 300);

  const searchUser = useCallback(async () => {
    setSearchData([]);
    setShowAllResults(false);
    setIsLoading(true);
    setFocusedIndex(0);
    setFirstRun(true);
    try {
      const response = await fetch(`${URL}/user/searchuser/?keyword=${debounceValue}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setSearchData(data);
    } catch (error) {
      console.error('에러', error);
    } finally {
      setIsLoading(false);
    }
  }, [debounceValue, token]);

  useEffect(() => {
    if (debounceValue === '') {
      setSearchData([]);
      return;
    }
    searchUser();
  }, [debounceValue, searchUser]);

  useEffect(() => {
    if (focusedIndex === 10) {
      ref?.current?.focus();
    }
  }, [focusedIndex]);

  const handleAllResults = () => {
    setShowAllResults(true);
  };
  return (
    <>
      {header ? (
        <SearchHeader header value={searchKeyword} onChange={handleSearchKeyword} />
      ) : (
        <SearchHeader value={searchKeyword} onChange={handleSearchKeyword} />
      )}
      <SearchContentLayout path={location.pathname}>
        <ul>
          {isLoading && (
            <>
              <UserSkeleton />
              <UserSkeleton />
              <UserSkeleton />
              <UserSkeleton />
            </>
          )}
          {showAllResults
            ? searchData.map((user, index) => (
                <SearchedUser key={user._id}>
                  <User
                    search
                    keyword={debounceValue}
                    userImg={user.image}
                    username={user.username}
                    content={'@' + user.accountname}
                    accountname={user.accountname}
                    setIsSearch={setIsSearch}
                    isFocused={index + 1 === focusedIndex}
                  />
                </SearchedUser>
              ))
            : searchData.slice(0, 9).map((user, index) => (
                <SearchedUser key={user._id}>
                  <User
                    search
                    keyword={debounceValue}
                    userImg={user.image}
                    username={user.username}
                    content={'@' + user.accountname}
                    accountname={user.accountname}
                    setIsSearch={setIsSearch}
                    isFocused={index + 1 === focusedIndex && focusedIndex < 10}
                  />
                </SearchedUser>
              ))}
          {showAllResults ||
            (searchData.length > 10 && (
              <ShowAllButton onClick={handleAllResults} ref={ref}>
                결과 모두 보기
              </ShowAllButton>
            ))}
        </ul>
      </SearchContentLayout>
    </>
  );
};

const SearchContentLayout = styled.div`
  padding: ${(props) => (props.path === '/search' ? '20px 16px 73.5px 16px' : '20px 16px')};
`;
const SearchedUser = styled.li`
  margin-bottom: 16px;
`;
const ShowAllButton = styled.button`
  width: 100%;
  font-size: var(--sm);
  color: var(--primary);
`;

export default SearchContent;
