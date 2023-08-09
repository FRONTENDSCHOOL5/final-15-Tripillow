import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import FollowUser from '../../Components/common/FollowUser';
import BasicHeader from '../../Components/common/Header/BasicHeader';
import Navbar from '../../Components/common/Navbar';
import { LayoutStyle } from '../../Styles/Layout';
import FollowingListAPI from '../../Utils/FollowingListAPI';
import FollowerListAPI from '../../Utils/FollowerListAPI';
import { useRecoilValue } from 'recoil';
import isDesktop from '../../Recoil/isDesktop/isDesktop';

const Followers = () => {
  const location = useLocation();
  const isPCScreen = useRecoilValue(isDesktop);
  const pathIdentifier = location.pathname.split('/');
  const last = pathIdentifier.length - 1;
  const accountname = location.state?.accountname;
  const [current, setCurrent] = useState('followers');
  const [followerData, setFollowerData] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const [pageTitle, setPageTitle] = useState('Followers');
  const { fetchFollower } = FollowerListAPI(accountname);
  const { fetchFollowing } = FollowingListAPI(accountname);

  useEffect(() => {
    if (pathIdentifier) {
      setCurrent(pathIdentifier[last]);
    }
  }, [accountname]);

  useEffect(() => {
    const handleFetch = async () => {
      if (pathIdentifier[last] === 'followers') {
        const follower = await fetchFollower();
        if (follower) {
          setFollowerData(follower);
          setPageTitle('Pillowers');
        }
      } else if (pathIdentifier[last] === 'followings') {
        const following = await fetchFollowing();
        if (following) {
          setFollowingData(following);
          setPageTitle('Pillowings');
        }
      }
    };

    handleFetch();
  }, [accountname]);

  return (
    <Layout>
      {pageTitle === 'Pillowers' && <BasicHeader empty>Pillowers</BasicHeader>}
      {pageTitle === 'Pillowings' && <BasicHeader empty>Pillowings</BasicHeader>}
      <main>
        {pathIdentifier[last] === 'followers'
          ? followerData.map((follower, index) => (
              <FollowUser followers key={index} user={follower} pathIdentifier={pathIdentifier} margin='24px 0 0 0' />
            ))
          : followingData.map((following, index) => (
              <FollowUser followers key={index} user={following} pathIdentifier={pathIdentifier} margin='24px 0 0 0' />
            ))}
      </main>
      {isPCScreen || <Navbar />}
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
