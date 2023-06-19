import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import UserProfile from '../Components/Profile/UserProfile';
import BasicHeader from '../Components/common/Header/BasicHeader';
import HomePostLayout from '../Components/HomePost/HomePostLayout';
import { LayoutStyle } from '../Styles/Layout';
import Navbar from '../Components/common/Navbar';
import ProductItem from '../Components/common/ProductItem';
import UserInfoAPI from '../Utils/UserInfoAPI';
import GetPostAPI from '../Utils/GetPostAPI';
import ProductListAPI from '../Utils/ProductListAPI';
import accountName from '../Recoil/accountName/accountName';
import ViewImage from '../Components/HomePost/ViewImage';

import listOn from '../Assets/icons/icon-post-list-on.svg';
import listOff from '../Assets/icons/icon-post-list-off.svg';
import AlbumOn from '../Assets/icons/icon-post-album-on.svg';
import AlbumOff from '../Assets/icons/icon-post-album-off.svg';

const Profile = () => {
  const name = useRecoilValue(accountName);
  const userData = UserInfoAPI();
  const postData = GetPostAPI();
  const productData = ProductListAPI(name);
  const productList = productData.product;

  const [view, setView] = useState(false);

  const handleView = () => {
    setView(!view);
  };

  return (
    <Layout>
      <BasicHeader />
      <main>
        <UserProfile user={userData} />
        <UserProductLayout>
          <h2>판매 중인 상품</h2>
          <ProductListLayout>
            {productList && productList.map((product, index) => <ProductItem key={index} product={product} />)}
            <ProductItem />
          </ProductListLayout>
        </UserProductLayout>
        <ViewLayout>
          <ViewButton bgImg={!view ? listOn : listOff} onClick={handleView}></ViewButton>
          <ViewButton bgImg={view ? AlbumOn : AlbumOff} onClick={handleView}></ViewButton>
        </ViewLayout>
        <article>
          {postData.length > 0 ? (
            <>
              {!view ? (
                postData.map((post, index) => <HomePostLayout key={index} post={post} />)
              ) : (
                <ImageLayoutBackground>
                  <ImageLayout>
                    {postData.map((post, index) => (
                      <ViewImage key={index} post={post} />
                    ))}
                  </ImageLayout>
                </ImageLayoutBackground>
              )}
            </>
          ) : (
            <NoContent>게시물이 없습니다.</NoContent>
          )}
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
`;

const UserProductLayout = styled.article`
  padding: 20px 16px;
  background-color: #fff;
  margin: 6px 0;

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
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const NoContent = styled.p`
  margin-top: 40px;
  text-align: center;
  color: var(--dark-gray);
`;

const ViewLayout = styled.div`
  padding: 9px 21px;
  background-color: #fff;
  display: flex;
  justify-content: flex-end;

  button {
    display: block;
  }

  button:first-child {
    margin-right: 13px;
  }
`;

const ViewButton = styled.button`
  width: 26px;
  height: 26px;
  background: ${(props) => `url(${props.bgImg}) no-repeat center center`};
`;

const ImageLayoutBackground = styled.article`
  min-height: 615px;
  background-color: #fff;
`;

const ImageLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(114px, 1fr));
  gap: 8px;
  padding: 14px 12px 20px 16px;
  padding-bottom: ${(props) => props.pb || '20px'};
`;

export default Profile;
