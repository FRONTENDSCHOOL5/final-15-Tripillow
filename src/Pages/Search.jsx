import React, { useState, useEffect } from 'react';
import { Layout } from '../Styles/Layout';
import SearchHeader from '../Components/common/Header/SearchHeader';
import Navbar from '../Components/common/Navbar';
import User from '../Components/common/User';
import styled from 'styled-components';
import URL from '../Utils/URL';
import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';

const Search = () => {
  const token = useRecoilValue(userToken);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchData, setSearchData] = useState([]);

  const handleSearchKeyword = (e) => {
    setSearchKeyword(e.target.value);
  };

  useEffect(() => {
    const searchUser = async () => {
      try {
        const response = await fetch(`${URL}/user/searchuser/?keyword=${searchKeyword}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setSearchData(data);
      } catch (error) {
        console.error('에러', error);
      }
    };
    searchKeyword !== '' && searchUser();
  }, [searchKeyword, token]);

  return (
    <Layout>
      <SearchHeader value={searchKeyword} onChange={handleSearchKeyword} />
      <SearchContentLayout>
        <ul>
          {searchData?.map((user) => (
            <SearchedUser key={user._id}>
              <User userimage={user.image} username={user.username} content={user.accountname} />
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
