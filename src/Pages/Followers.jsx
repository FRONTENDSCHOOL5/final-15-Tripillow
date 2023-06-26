import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import FollowUser from '../Components/common/FollowUser';
import BasicHeader from '../Components/common/Header/BasicHeader';
import UserProfile from '../Components/Profile/UserProfile';
import Navbar from '../Components/common/Navbar';
import FollowingListAPI from '../Utils/FollowingListAPI';
import FollowerListAPI from '../Utils/FollowerListAPI';

const Followers = () => {
  const location = useLocation();
  const pathIdentifier = location.pathname.split('/');
  const last = pathIdentifier.length - 1;
  const accountname = location.state?.accountname;
  const [current, setCurrent] = useState('followers');
  const [followerData, setFollowerData] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const [pageTitle, setPageTitle] = useState('Followers');
  const { fetchFollower } = FollowerListAPI({ accountname });
  const { fetchFollowing } = FollowingListAPI({ accountname });

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
      <BasicHeader empty>{pageTitle}</BasicHeader>
      <main>
        {pathIdentifier[last] === 'followers'
          ? followerData.map((follower, index) => (
              <FollowUser followers key={index} user={follower} pathIdentifier={pathIdentifier} margin='24px 0 0 0' />
            ))
          : followingData.map((following, index) => (
              <FollowUser followers key={index} user={following} pathIdentifier={pathIdentifier} margin='24px 0 0 0' />
            ))}
      </main>
      <footer>
        <Navbar />
      </footer>
    </Layout>
  );
};

const Layout = styled.div`
  max-width: 390px;
  min-height: 100%;
  margin: 0 auto;
  padding: 48px 12px 73px 16px;
  border: 0.5px solid var(--light-gray);
  box-sizing: border-box;

  footer {
    margin-top: 24px;
  }
`;

export default Followers;
