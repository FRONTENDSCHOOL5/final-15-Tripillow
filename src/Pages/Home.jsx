import React, { useState, useEffect } from 'react';
import { Layout } from '../Styles/Layout';
import MainHeader from '../Components/common/Header/MainHeader';
import Toggle from '../Components/common/Toggle';
import HomePost from '../Components/HomePost/HomePostLayout';
import TopButton from '../Components/common/Topbutton';
import Navbar from '../Components/common/Navbar';

const Home = () => {
  return (
    <Layout>
      <MainHeader />
      <Toggle margin='25px 0 0 16px' leftButton='국내' rightButton='해외' />
      <HomePost />
      <TopButton />
      <Navbar />
    </Layout>
  );
};

export default Home;
