import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQueries } from 'react-query';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import accountName from 'Recoil/accountName/accountName';
import MyInfoAPI from 'Api/Profile/MyInfoAPI';
import UserInfoAPI from 'Api/Profile/UserInfoAPI';
import ProductListAPI from 'Api/Product/ProductListAPI';
import ProfileSkeleton from 'Components/common/Skeleton/ProfileSkeleton';
import UserProfile from 'Components/Profile/UserProfile';
import ProductItem from 'Components/common/ProductItem';
import ProfileView from 'Components/Profile/ProfileView';
import HomePostLayout from 'Components/HomePost/HomePostLayout';
import { isList } from 'Recoil/whichView/whichView';
import { followerURL, followingURL } from 'Recoil/followPath/followPath';
import ViewImage from 'Components/HomePost/ViewImage';
import usePostInfinity from 'Hooks/usePostInfinity';
import Spinner from 'Components/common/Spinner';

const ProfileMain = ({ setIsDeleted, setIsModified }) => {
  const params = useParams();
  const userAccountname = params.accountname;
  const myAccount = useRecoilValue(accountName);
  const listView = useRecoilValue(isList);
  const account = userAccountname ? userAccountname : myAccount;
  const setFollowerPath = useSetRecoilState(followerURL);
  const setFollowingPath = useSetRecoilState(followingURL);

  const { newPostList, fetchNextPage, isFetchingNextPage, hasNextPage, postLoading } = usePostInfinity(account);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const queries = useQueries([
    {
      queryKey: ['myData', { account }],
      queryFn: MyInfoAPI().getUserData,
      notifyOnChangeProps: 'tracked',
      enabled: !userAccountname,
      myAccount,
      account,
    },
    {
      queryKey: ['userData', { account }],
      queryFn: UserInfoAPI(userAccountname).getUserInfo,
      notifyOnChangeProps: 'tracked',
      enabled: !!userAccountname,
    },
    {
      queryKey: ['productData', { account }],
      notifyOnChangeProps: 'tracked',
      queryFn: ProductListAPI(account).getProductList,
      enabled: !!account,
    },
  ]);

  const [myDataQuery, userDataQuery, productDataQuery] = queries;
  const isLoading = myDataQuery.isLoading || userDataQuery.isLoading || productDataQuery.isLoading || postLoading;

  const updatePost = (isDeleteUpdate) => {
    if (isDeleteUpdate) {
      setIsDeleted(true);
    } else {
      setIsModified(true);
    }
  };

  useEffect(() => {
    if (userAccountname === myAccount || !userAccountname) {
      setFollowerPath('/profile/followers');
      setFollowingPath('/profile/followings');
    } else if (userAccountname !== myAccount) {
      setFollowerPath(`/profile/${userAccountname}/followers`);
      setFollowingPath(`/profile/${userAccountname}/followings`);
    }
  }, [myAccount, setFollowerPath, setFollowingPath, userAccountname]);

  return (
    <main>
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <>
          <UserProfile
            user={account === myAccount ? myDataQuery.data : userDataQuery.data}
            profileLoading={myDataQuery.isLoading}
            userProfileLoading={userDataQuery.isLoading}
          />
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
            {!postLoading && newPostList?.length > 0 ? (
              <>
                {listView ? (
                  <>
                    {newPostList.map((post) => {
                      return <HomePostLayout key={post.id} post={post} updatePost={updatePost} />;
                    })}
                    {isFetchingNextPage ? <Spinner /> : <div ref={ref} style={{ height: '20px' }}></div>}
                  </>
                ) : (
                  <ImageLayoutBackground>
                    <ImageLayout>
                      {newPostList
                        .filter((post) => post.image?.length > 0)
                        .map((post, index) => (
                          <ViewImage key={index} post={post} />
                        ))}
                    </ImageLayout>
                  </ImageLayoutBackground>
                )}
              </>
            ) : (
              !postLoading && <NoContent>게시물이 없습니다.</NoContent>
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
