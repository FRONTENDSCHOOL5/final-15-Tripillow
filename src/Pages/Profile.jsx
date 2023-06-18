import React from 'react';
import UserProfile from '../Components/Profile/UserProfile';
import BasicHeader from '../Components/common/Header/BasicHeader';
import HomePostLayout from '../Components/HomePost/HomePostLayout';
import { Layout } from '../Styles/Layout';
import Navbar from '../Components/common/Navbar';
import UserInfoAPI from '../Utils/UserInfoAPI';
import GetPostAPI from '../Utils/GetPostAPI';

const Profile = () => {
  const userData = UserInfoAPI();

  const postData = GetPostAPI();
  console.log(postData);

  return (
    <Layout>
      <header>
        <BasicHeader />
      </header>
      <main>
        <UserProfile user={userData} />
        {postData &&
          postData.map((post, index) => {
            return <HomePostLayout key={index} post={post} />;
          })}
      </main>
      <footer>
        <Navbar />
      </footer>
    </Layout>
  );
};

export default Profile;
