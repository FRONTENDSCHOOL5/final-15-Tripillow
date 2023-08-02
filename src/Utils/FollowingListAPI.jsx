import React from 'react';
import URL from './URL';
import { useRecoilValue } from 'recoil';
import userToken from '../Recoil/userToken/userToken';

const FollowingListAPI = (accountname) => {
  const token = useRecoilValue(userToken);

  const fetchFollowing = async () => {
    try {
      const response = await fetch(`${URL}/profile/${accountname}/following`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('FollowingAPI가 응답하지 않습니다', error);
    }
  };

  return { fetchFollowing };
};

export default FollowingListAPI;
