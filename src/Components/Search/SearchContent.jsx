import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import UserSkeleton from 'Components/common/Skeleton/UserSkeleton';
import User from 'Components/common/User';
import URL from 'Api/URL';
import userToken from 'Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import SearchHeader from 'Components/common/Header/SearchHeader';

const SearchContent = ({ header, setIsSearch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const token = useRecoilValue(userToken);

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
    const { value } = e.target;
    setSearchKeyword(value);
  };

  const debounceValue = useDebounceValue(searchKeyword, 750);

  const searchUser = useCallback(async () => {
    setSearchData([]);
    setShowAllResults(false);
    setIsLoading(true);
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
      <SearchContentLayout>
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
            ? searchData.map((user) => (
                <SearchedUser key={user._id}>
                  <User
                    search
                    keyword={debounceValue}
                    userImg={user.image}
                    username={user.username}
                    content={'@' + user.accountname}
                    accountname={user.accountname}
                    setIsSearch={setIsSearch}
                  />
                </SearchedUser>
              ))
            : searchData.slice(0, 9).map((user) => (
                <SearchedUser key={user._id}>
                  <User
                    search
                    keyword={debounceValue}
                    userImg={user.image}
                    username={user.username}
                    content={'@' + user.accountname}
                    accountname={user.accountname}
                    setIsSearch={setIsSearch}
                  />
                </SearchedUser>
              ))}
          {showAllResults ||
            (searchData.length > 10 && (
              <ShowAllButton onClick={handleAllResults} aria-label='결과 모두 보기'>
                결과 모두 보기
              </ShowAllButton>
            ))}
        </ul>
      </SearchContentLayout>
    </>
  );
};

const SearchContentLayout = styled.div`
  padding: 20px 16px;
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
