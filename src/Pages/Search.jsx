import React from 'react';
import { Layout } from '../Styles/Layout';
import SearchHeader from '../Components/common/Header/SearchHeader';
import Navbar from '../Components/common/Navbar';
import User from '../Components/common/User';
import styled from 'styled-components';

const Search = () => {
  return (
    <Layout>
      <SearchHeader />
      <SearchContentLayout>
        <User username='애월읍 위니브 감귤농장' content='@weniv_Mandarin' />
      </SearchContentLayout>
      <Navbar />
    </Layout>
  );
};

const SearchContentLayout = styled.div`
  padding: 20px 16px;
`;

export default Search;
