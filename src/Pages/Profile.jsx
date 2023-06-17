import React from 'react';
import UserProfile from '../Components/Profile/UserProfile';
import BasicHeader from '../Components/common/Header/BasicHeader';
import HomePostLayout from '../Components/HomePost/HomePostLayout';
import { Layout } from '../Styles/Layout';
import Navbar from '../Components/common/Navbar';
import UserInfoAPI from '../Utils/UserInfoAPI';

const Profile = () => {
  const userData = UserInfoAPI();
  return (
    <Layout>
      <header>
        <BasicHeader />
      </header>
      <main>
        <UserProfile user={userData} />
        <HomePostLayout />
      </main>
      <footer>
        <Navbar />
      </footer>
    </Layout>
  );
};

export default Profile;
