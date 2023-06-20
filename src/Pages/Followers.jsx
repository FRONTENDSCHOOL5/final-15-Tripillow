import React from 'react';
import styled from 'styled-components';
import User from '../Components/common/User';
import BasicHeader from '../Components/common/Header/BasicHeader';
import UserProfile from '../Components/Profile/UserProfile';
import Navbar from '../Components/common/Navbar';
export default function Followers() {
  return (
    <Layout>
      <BasicHeader empty>Followers</BasicHeader>
      <User followers margin='24px 0 0 0' />
      <Navbar />
    </Layout>
  );
}

const Layout = styled.div`
  max-width: 390px;
  min-height: 100%;
  margin: 0 auto;
  padding: 48px 12px 73px 16px;
  border: 0.5px solid var(--light-gray);
  box-sizing: border-box;
`;
