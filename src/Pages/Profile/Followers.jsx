import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import FollowUser from 'Components/common/FollowUser';
import BasicHeader from 'Components/common/Header/BasicHeader';
import Navbar from 'Components/common/Navbar';
import { LayoutStyle } from 'Styles/Layout';
import FollowerListAPI from 'Api/Profile/FollowerListAPI';
import FollowingListAPI from 'Api/Profile/FollowingListAPI';
import isDesktop from 'Recoil/isDesktop/isDesktop';
import MyPillowings from 'Components/Home/MyPillowings';
import useIsWideView from 'Components/PCNav/useIsWideView';

const Followers = () => {
  const location = useLocation();
  const isPCScreen = useRecoilValue(isDesktop);
  const isWideView = useIsWideView();
  const pathIdentifier = location.pathname.split('/');
  const last = pathIdentifier.length - 1;
  const accountname = location.state?.accountname;
  const [followerData, setFollowerData] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const [pageTitle, setPageTitle] = useState('Followers');
  const { fetchFollower } = FollowerListAPI(accountname);
  const { fetchFollowing } = FollowingListAPI(accountname);
  const regex = /^\/profile\/.+\/followers$/;

  useEffect(() => {
    const handleFetch = async () => {
      if (location.pathname.endsWith('followers')) {
        const follower = await fetchFollower();
        if (follower) {
          setFollowerData(follower);
          setPageTitle('Pillowers');
        }
      } else if (location.pathname.endsWith('followings')) {
        const following = await fetchFollowing();
        if (following) {
          setFollowingData(following);
          setPageTitle('Pillowings');
        }
      }
    };

    handleFetch();
  }, [accountname, location.pathname, fetchFollower, fetchFollowing]);

  return (
    <Layout>
      {!isWideView && (
        <>
          {pageTitle === 'Pillowers' && <BasicHeader empty>Pillowers</BasicHeader>}
          {pageTitle === 'Pillowings' && <BasicHeader empty>Pillowings</BasicHeader>}
        </>
      )}

      <main>
        {pathIdentifier[last] === 'followers'
          ? followerData.map((follower, index) => (
              <FollowUser followers key={index} user={follower} pathIdentifier={pathIdentifier} margin='24px 0 0 0' />
            ))
          : followingData.map((following, index) => (
              <FollowUser followers key={index} user={following} pathIdentifier={pathIdentifier} margin='24px 0 0 0' />
            ))}
      </main>
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
