import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQueries } from 'react-query';
import styled from 'styled-components';
import accountName from '../../Recoil/accountName/accountName';
import MyInfoAPI from '../../Utils/MyInfoAPI';
import UserInfoAPI from '../../Utils/UserInfoAPI';
import GetPostAPI from '../../Utils/GetPostAPI';
import ProductListAPI from '../../Utils/ProductListAPI';
import ProfileSkeleton from '../common/Skeleton/ProfileSkeleton';
import UserProfile from './UserProfile';
import ProductItem from '../common/ProductItem';
import ProfileView from './ProfileView';
import HomePostLayout from '../HomePost/HomePostLayout';
import { isList } from '../../Recoil/whichView/whichView';
import { followerURL, followingURL } from '../../Recoil/followPath/followPath';
import ViewImage from '../HomePost/ViewImage';

const ProfileMain = ({ setIsDeleted, setIsModified }) => {
  const params = useParams();
  const userAccountname = params.accountname;
  const myAccount = useRecoilValue(accountName);
  const listView = useRecoilValue(isList);
  const account = userAccountname ? userAccountname : myAccount;
  const setFollowerPath = useSetRecoilState(followerURL);
  const setFollowingPath = useSetRecoilState(followingURL);

  const [isLoading, setIsLoading] = useState(true);

  const queries = useQueries([
    {
      queryKey: 'myData',
      queryFn: MyInfoAPI().getUserData,
      enabled: !userAccountname,
    },
    {
      queryKey: ['userData', userAccountname],
      queryFn: UserInfoAPI(userAccountname).getUserInfo,
      enabled: !!userAccountname,
    },
    {
      queryKey: ['postData', account],
      queryFn: GetPostAPI(account).getPostData,
      enabled: !!account,
    },
    {
      queryKey: ['productData', account],
      queryFn: ProductListAPI(account).getProductList,
      enabled: !!account,
    },
  ]);

  const [myDataQuery, userDataQuery, postDataQuery, productDataQuery] = queries;
  const { refetch: refetchPostData } = postDataQuery;

  useEffect(() => {
    if (!myDataQuery.isLoading && !postDataQuery.isLoading && !productDataQuery.isLoading) {
      setIsLoading(false);
    }
  }, [myDataQuery.isLoading, postDataQuery.isLoading, productDataQuery.isLoading]);

  const updatePost = (isDeleteUpdate) => {
    if (isDeleteUpdate) {
      setIsDeleted(true);
    } else {
      setIsModified(true);
    }
    refetchPostData();
  };

  useEffect(() => {
    if (userAccountname === myAccount || !userAccountname) {
      setFollowerPath('/profile/followers');
      setFollowingPath('/profile/followings');
    } else if (userAccountname !== myAccount) {
      setFollowerPath(`/profile/${userAccountname}/followers`);
      setFollowingPath(`/profile/${userAccountname}/followings`);
    }
  }, []);

  return (
    <main>
      {isLoading ? (
        <ProfileSkeleton userAccountname={userAccountname} />
      ) : (
        <>
          <UserProfile user={userAccountname ? userDataQuery.data : myDataQuery.data} />
          <UserProductLayout>
            <h2>판매 중인 상품</h2>
            <ProductListLayout>
              {productDataQuery.data?.length > 0 ? (
                productDataQuery.data.map((product, index) => <ProductItem key={index} product={product} />)
              ) : (
                <NoProduct>상품을 등록해주세요!</NoProduct>
              )}
            </ProductListLayout>
          </UserProductLayout>
          <ProfileView />
          <section style={{ paddingBottom: 90 }}>
            {postDataQuery.data?.length > 0 ? (
              <>
                {listView ? (
                  postDataQuery.data?.map((post, index) => (
                    <HomePostLayout key={index} post={post} updatePost={updatePost} />
                  ))
                ) : (
                  <ImageLayoutBackground>
                    <ImageLayout>
                      {postDataQuery.data
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
  );
};

export const UserProductLayout = styled.article`
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

export default ProfileMain;
