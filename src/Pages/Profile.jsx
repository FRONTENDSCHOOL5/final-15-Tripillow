import React from 'react';
import styled from 'styled-components';
import UserProfile from '../Components/Profile/UserProfile';
import BasicHeader from '../Components/common/Header/BasicHeader';
import HomePostLayout from '../Components/HomePost/HomePostLayout';
import { LayoutStyle } from '../Styles/Layout';
import Navbar from '../Components/common/Navbar';
import ProductItem from '../Components/common/ProductItem';
import UserInfoAPI from '../Utils/UserInfoAPI';
import GetPostAPI from '../Utils/GetPostAPI';
import ProductListAPI from '../Utils/ProductListAPI';
import { useRecoilValue } from 'recoil';
import accountName from '../Recoil/accountName/accountName';

const Profile = () => {
  const name = useRecoilValue(accountName);
  const userData = UserInfoAPI();
  const postData = GetPostAPI();
  const productData = ProductListAPI(name);
  const productList = productData.product;
  console.log(productList);

  return (
    <Layout>
      <header>
        <BasicHeader />
      </header>
      <main>
        <UserProfile user={userData} />
        <UserProductLayout>
          <h2>판매 중인 상품</h2>
          <ProductListLayout>
            {productList && productList.map((product, index) => <ProductItem key={index} product={product} />)}
            <ProductItem />
          </ProductListLayout>
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

const ProductListLayout = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default Profile;
