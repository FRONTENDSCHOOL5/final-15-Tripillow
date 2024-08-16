import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useQueries } from 'react-query';
import FollowUser from 'Components/common/FollowUser';
import BasicHeader from 'Components/common/Header/BasicHeader';
import Navbar from 'Components/common/Navbar';
import { LayoutStyle } from 'Styles/Layout';
import FollowerListAPI from 'Api/Profile/FollowerListAPI';
import FollowingListAPI from 'Api/Profile/FollowingListAPI';
import isDesktop from 'Recoil/isDesktop/isDesktop';
import MyPillowings from 'Components/Home/MyPillowings';
import useIsWideView from 'Components/SideNav/useIsWideView';
import accountName from 'Recoil/accountName/accountName';
import UserSkeleton from 'Components/common/Skeleton/UserSkeleton';
import Empty from 'Components/common/Empty';
import logo from 'Assets/logo-gray.png';

const Followers = () => {
  const location = useLocation();
  const isPCScreen = useRecoilValue(isDesktop);
  const myAccount = useRecoilValue(accountName);
  const isWideView = useIsWideView();
  const pathIdentifier = location.pathname.split('/');
  const last = pathIdentifier.length - 1;
  const accountname = location.state ? location.state?.accountname : myAccount;
  const [pageTitle, setPageTitle] = useState('Followers');
  const { fetchFollower } = FollowerListAPI(accountname);
  const { fetchFollowing } = FollowingListAPI(accountname);
  const regex = /^\/profile\/.+\/followers$/;
  const [isEmpty, setIsEmpty] = useState(false);

  const queries = useQueries([
    {
      queryKey: ['followerData'],
      queryFn: fetchFollower,
      enabled: location.pathname.endsWith('followers'),
    },
    {
      queryKey: ['followingData'],
      queryFn: fetchFollowing,
      enabled: location.pathname.endsWith('followings'),
    },
  ]);

  const [followerQuery, followingQuery] = queries;

  useEffect(() => {
    if (location.pathname.endsWith('followers') && followerQuery.isSuccess) {
      setPageTitle('Pillowers');
      setIsEmpty(followerQuery.data.length === 0);
    } else if (location.pathname.endsWith('followings') && followingQuery.isSuccess) {
      setPageTitle('Pillowings');
      setIsEmpty(followingQuery.data.length === 0);
    }
  }, [location.pathname, followerQuery.isSuccess, followingQuery.isSuccess]);

  return (
    <Layout>
      {!isWideView && (
        <>
          {pageTitle === 'Pillowers' && <BasicHeader empty>Pillowers</BasicHeader>}
          {pageTitle === 'Pillowings' && (
            <BasicHeader empty subject={`팔로잉 페이지`}>
              Pillowings
            </BasicHeader>
          )}
        </>
      )}
      {isEmpty ? (
        <main>
          <Empty image={logo} alt='로고' navigate='/search' buttonName='검색하기'>
            리스트가 비어있습니다.
          </Empty>
        </main>
      ) : (
        <main>
          {isEmpty ? (
            <>
              <UserSkeleton />
              <UserSkeleton />
              <UserSkeleton />
            </>
          ) : pathIdentifier[last] === 'followers' ? (
            followerQuery.data?.map((follower, index) => (
              <FollowUser followers key={index} user={follower} pathIdentifier={pathIdentifier} margin='24px 0 0 0' />
            ))
          ) : (
            followingQuery.data?.map((following, index) => (
              <FollowUser followers key={index} user={following} pathIdentifier={pathIdentifier} margin='24px 0 0 0' />
            ))
          )}
        </main>
      )}
      {isWideView || <Navbar />}
      {isPCScreen && regex.test(location.pathname) && <MyPillowings $on={isPCScreen} />}
    </Layout>
  );
};

const Layout = styled.div`
  ${LayoutStyle}
  padding: 48px 12px 73px 16px;

  footer {
    margin-top: 24px;
  }
`;

export default Followers;
