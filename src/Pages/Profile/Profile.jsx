import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useLocation, useParams } from 'react-router-dom';
import MyInfoAPI from '../../Utils/MyInfoAPI';
import GetPostAPI from '../../Utils/GetPostAPI';
import UserInfoAPI from '../../Utils/UserInfoAPI';
import ProductListAPI from '../../Utils/ProductListAPI';
import accountName from '../../Recoil/accountName/accountName';
import { isList, isAlbum } from '../../Recoil/whichView/whichView';
import UserProfile from '../../Components/UserProfile';
import BasicHeader from '../../Components/common/Header/BasicHeader';
import HomePostLayout from '../../Components/HomePost/HomePostLayout';
import Navbar from '../../Components/common/Navbar';
import ProductItem from '../../Components/common/ProductItem';
import ViewImage from '../../Components/HomePost/ViewImage';
import ProductItemSkeleton from '../../Components/common/Skeleton/ProductItemSkeleton';
import { LayoutStyle } from '../../Styles/Layout';
import SkeletonItem from '../../Styles/SkeletonItem';
import HomePostSkeleton from '../../Components/common/Skeleton/HomePostSkeleton';
import AlertTop from '../../Components/common/Modal/AlertTop';

import listOn from '../../Assets/icons/icon-post-list-on.svg';
import listOff from '../../Assets/icons/icon-post-list-off.svg';
import AlbumOn from '../../Assets/icons/icon-post-album-on.svg';
import AlbumOff from '../../Assets/icons/icon-post-album-off.svg';

const Profile = () => {
  const params = useParams();
  const location = useLocation();
  const userAccountname = params.accountname;
  const myAccount = useRecoilValue(accountName);
  const [listView, setListView] = useRecoilState(isList);
  const [albumView, setAlbumView] = useRecoilState(isAlbum);

  const [myInfo, setMyInfo] = useState({});
  const updateMyInfo = (data) => {
    setMyInfo(data);
  };
  const [userInfo, setUserInfo] = useState({});
  const [postData, setPostData] = useState([]);
  const [productList, setProductList] = useState([]);
  const [followCount, setFollowCount] = useState(0);
  const [followerURL, setFollowerURL] = useState('');
  const [followingURL, setFollowingURL] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { getUserData } = MyInfoAPI({ updateMyInfo });
  const { getUserInfo } = UserInfoAPI({ setUserInfo, userAccountname });
  const { getPostData } = GetPostAPI({
    myAccount: userAccountname ? userAccountname : myAccount,
    setPostData,
  });
  const { getProductList } = ProductListAPI({
    myAccount: userAccountname ? userAccountname : myAccount,
    setProductList,
  });
  const isDeleted = location.state?.isDeleted;
  const isModified = location.state?.isModified;

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    const handleFetch = () => {
      getUserInfo();
      getUserData();
      getPostData();
      getProductList();

      setTimeout(() => setIsLoading(false), 500);
    };

    handleFetch();
  }, [userAccountname, followCount]);

  useEffect(() => {
    const handleUserFetch = () => {
      getUserInfo();
    };

    handleUserFetch();
  }, [followCount]);

  useEffect(() => {
    if (userAccountname === myAccount || !userAccountname) {
      setFollowerURL('/profile/followers');
      setFollowingURL('/profile/followings');
    } else if (userAccountname !== myAccount) {
      setFollowerURL(`/profile/${userAccountname}/followers`);
      setFollowingURL(`/profile/${userAccountname}/followings`);
    }
  }, []);

  const handleListView = () => {
    setListView(true);
    setAlbumView(false);
  };

  const handleAlbumView = () => {
    setListView(false);
    setAlbumView(true);
  };

  return (
    <Layout>
      <BasicHeader btn1='설정 및 개인정보' btn2='로그아웃' txt='정말 로그아웃 하시겠습니까?' rightbtn='로그아웃' />
      {(isModified || isDeleted) && <AlertTop>{isModified ? '수정되었습니다.' : '삭제되었습니다.'}</AlertTop>}

      <main>
        {isLoading ? (
          <>
            <ProfileSkeletonLayout>
              <ProfileSkeleton mb='6px' />
              <ProfileTextSkeleton mb='6px' />
              <ProfileTextSkeleton mb='16px' />
              <ProfileTextSkeleton mb='24px' />
              {!userAccountname ? (
                <>
                  <ProfileButtonSkeleton />
                  <ProfileButtonSkeleton />
                </>
              ) : (
                <ProfileButtonSkeleton />
              )}
            </ProfileSkeletonLayout>
            <UserProductLayout>
              <h2>판매 중인 상품</h2>
              <ProductItemSkeleton />
            </UserProductLayout>
            <ViewLayout>
              <ViewButton bgImg={listView ? listOn : listOff} onClick={handleListView}></ViewButton>
              <ViewButton bgImg={albumView ? AlbumOn : AlbumOff} onClick={handleAlbumView}></ViewButton>
            </ViewLayout>
            <article>
              <HomePostSkeleton />
            </article>
          </>
        ) : (
          <>
            <UserProfile
              user={userAccountname ? userInfo : myInfo}
              followCount={followCount}
              setFollowCount={setFollowCount}
              followerURL={followerURL}
              followingURL={followingURL}
            />
            <UserProductLayout>
              <h2>판매 중인 상품</h2>
              <ProductListLayout>
                {productList.data > 0 ? (
                  productList.product.map((product, index) => <ProductItem key={index} product={product} />)
                ) : (
                  <NoProduct>상품을 등록해주세요!</NoProduct>
                )}
              </ProductListLayout>
            </UserProductLayout>
            <ViewLayout>
              <ViewButton bgImg={listView ? listOn : listOff} onClick={handleListView}></ViewButton>
              <ViewButton bgImg={albumView ? AlbumOn : AlbumOff} onClick={handleAlbumView}></ViewButton>
            </ViewLayout>
            <section>
              {postData?.length > 0 ? (
                <>
                  {listView ? (
                    postData.map((post, index) => <HomePostLayout key={index} post={post} />)
                  ) : (
                    <ImageLayoutBackground>
                      <ImageLayout>
                        {postData
                          .filter((post) => post.image?.length > 0)
                          .map((post, index) => (
                            <ViewImage key={index} post={post} />
                          ))}
                      </ImageLayout>
                    </ImageLayoutBackground>
                  )}
                </>
              ) : (
                <NoContent>게시물이 없습니다.</NoContent>
              )}
            </section>
          </>
        )}
      </main>
      <Navbar />
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

const NoProduct = styled(NoContent)`
  margin-top: 5px;
  font-size: var(--xs);
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

const ImageLayoutBackground = styled.div`
  min-height: 420px;
  background-color: #fff;
`;

const ImageLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(114px, 1fr));
  gap: 8px;
  padding: 14px 12px 20px 16px;
  padding-bottom: ${(props) => props.pb || '20px'};
`;

const ProfileSkeletonLayout = styled.div`
  margin: 0 auto;
  padding: 30px 0 26px;
  text-align: center;
  background-color: #fff;
`;

const ProfileSkeleton = styled(SkeletonItem)`
  margin: 0 auto;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 16px;
`;

const ProfileTextSkeleton = styled(SkeletonItem)`
  margin: 0 auto;
  width: 120px;
  height: 12px;
  border-radius: 20px;
  margin-bottom: ${(props) => props.mb || '16px'};
`;

const ProfileButtonSkeleton = styled(SkeletonItem)`
  display: inline-block;
  margin: 0 auto;
  width: 100px;
  height: 36px;
  border-radius: 44px;
`;

export default Profile;
