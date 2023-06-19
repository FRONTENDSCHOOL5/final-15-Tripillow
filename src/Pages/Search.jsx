import React, { useState, useEffect } from 'react';
import { Layout } from '../Styles/Layout';
import SearchHeader from '../Components/common/Header/SearchHeader';
import Navbar from '../Components/common/Navbar';
import User from '../Components/common/User';
import styled from 'styled-components';
import URL from '../Utils/URL';
import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import UserSkeleton from '../Components/common/UserSkeleton';

const Search = () => {
  const token = useRecoilValue(userToken);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
  }, [debounceValue, token]);

  return (
    <Layout>
      <SearchHeader value={searchKeyword} onChange={handleSearchKeyword} />
      <SearchContentLayout>
        <ul>
          {isLoading && (
            <>
              <UserSkeleton />
              <UserSkeleton />
            </>
          )}
          {searchData?.map((user) => (
            <SearchedUser key={user._id}>
              <User
                userImg={user.image}
                username={user.username}
                content={'@' + user.accountname}
                accountname={user.accountname}
              />
            </SearchedUser>
          ))}
        </ul>
      </SearchContentLayout>
      <Navbar />
    </Layout>
  );
};

const SearchContentLayout = styled.div`
  padding: 20px 16px;
`;

const SearchedUser = styled.li`
  margin-bottom: 16px;
`;

export default Search;
