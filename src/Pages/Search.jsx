import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import userToken from '../Recoil/userToken/userToken';
import { Layout } from '../Styles/Layout';
import URL from '../Utils/URL';
import SearchHeader from '../Components/common/Header/SearchHeader';
import Navbar from '../Components/common/Navbar';
import User from '../Components/common/User';
import UserSkeleton from '../Components/common/Skeleton/UserSkeleton';
import isDesktop from '../Recoil/isDesktop/isDesktop';

const Search = () => {
  const token = useRecoilValue(userToken);
  const isPCScreen = useRecoilValue(isDesktop);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false);

  const handleSearchKeyword = (e) => {
    const { value } = e.target;
    setSearchKeyword(value);
  };

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

  const debounceValue = useDebounceValue(searchKeyword, 750);

  const searchUser = async () => {
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
  };

  useEffect(() => {
    if (debounceValue === '') {
      setSearchData([]);
      return;
    }

    searchUser();
  }, [debounceValue]);

  const handleAllResults = () => {
    setShowAllResults(true);
  };

  return (
    <Layout>
      <SearchHeader value={searchKeyword} onChange={handleSearchKeyword} />
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
                  />
                </SearchedUser>
              ))}
          {showAllResults ||
            (searchData.length > 10 && <ShowAllButton onClick={handleAllResults}>결과 모두 보기</ShowAllButton>)}
        </ul>
      </SearchContentLayout>
      {isPCScreen || <Navbar />}
    </Layout>
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

export default Search;
