import React from 'react';
import UserProfile from '../Components/Profile/UserProfile';
import BasicHeader from '../Components/common/Header/BasicHeader';
import HomePostLayout from '../Components/HomePost/HomePostLayout';
import { LayoutStyle } from '../Styles/Layout';
import Navbar from '../Components/common/Navbar';
import ProductItem from '../Components/common/ProductItem';
import UserInfoAPI from '../Utils/UserInfoAPI';
import GetPostAPI from '../Utils/GetPostAPI';
import styled from 'styled-components';

const Profile = () => {
  const userData = UserInfoAPI();
  const postData = GetPostAPI();

  return (
    <Layout>
      <header>
        <BasicHeader />
      </header>
      <main>
        <UserProfile user={userData} />
        <UserProductLayout>
          <h2>판매 중인 상품</h2>
          <div>
            <ProductItem />
          </div>
        </UserProductLayout>
        <article>
          {postData &&
            postData.map((post, index) => {
              return <HomePostLayout key={index} post={post} />;
            })}
        </article>
      </main>
      <footer>
        <Navbar />
      </footer>
    </Layout>
  );
};

const Layout = styled.div`
  ${LayoutStyle}
  background-color:#f2f2f2;

  main {
    article {
      margin-bottom: 6px;
    }
  }
`;

const UserProductLayout = styled.article`
  padding: 20px 16px;
  background-color: #fff;

  h2 {
    font-size: var(--md);
    font-weight: 700;
    margin-bottom: 16px;
  }
`;

export default Profile;
