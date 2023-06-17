import React from 'react';
import { Layout } from '../../Styles/Layout';
import BasicHeader from '../../Components/common/Header/BasicHeader';
import Navbar from '../../Components/common/Navbar';
import User from '../../Components/common/User';

const ChatList = () => {
  return (
    <Layout>
      <BasicHeader />
      <User username='123' content='123213' chat='1' date='2023.06.17' />
      <Navbar />
    </Layout>
  );
};

export default ChatList;
