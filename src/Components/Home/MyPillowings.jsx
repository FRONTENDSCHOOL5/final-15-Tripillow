import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MyInfoAPI from 'Api/Profile/MyInfoAPI';
import FollowUser from 'Components/common/FollowUser';
import UseFollowing from 'Hooks/useFollowing';

const MyPillowings = (props) => {
  console.log('mypillowings');
  const { followingData } = UseFollowing();
  const { getUserData } = MyInfoAPI();
  const [user, setUser] = useState();

  useEffect(() => {
    const getData = async () => {
      const userData = await getUserData();
      userData && setUser(userData);
    };

    getData();
  }, [getUserData]);

  return (
    <>
      <Layout {...props}>
        <h2>My Pillowings</h2>
        <div>
          {followingData &&
            followingData
              .slice(0, 5)
              .map((user, idx) => <FollowUser followers key={idx} user={user} margin='24px 0 0 0' />)}
        </div>
        <PillowingsMore to='/profile/followings' state={user}>
          pillowers 더 보러가기
        </PillowingsMore>
      </Layout>
    </>
  );
};

export default MyPillowings;

const Layout = styled.article`
  display: ${(props) => (props.$on ? 'block' : 'none')};
  position: fixed;
  top: 46px;
  right: 130px;

  h2 {
    font-size: 22px;
    color: var(--dark-gray);
  }
`;

const PillowingsMore = styled(Link)`
  position: relative;
  display: inline-block;
  margin-top: 24px;
  font-size: 14px;
  color: var(--gray);

  &:hover {
    color: var(--primary);
  }

  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    bottom: 4.5px;
    right: -8px;
    width: 6px;
    height: 6px;
    border-right: 1px solid var(--gray);
    border-bottom: 1px solid var(--gray);
    transform: rotate(-45deg);
  }

  &:hover::after {
    border-right: 1px solid var(--primary);
    border-bottom: 1px solid var(--primary);
  }
`;
