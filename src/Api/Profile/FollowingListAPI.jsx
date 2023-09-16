import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import URL from 'Api/URL';
import userToken from 'Recoil/userToken/userToken';

const FollowingListAPI = (accountname, limit = 'Number') => {
  const token = useRecoilValue(userToken);

  const fetchFollowing = useCallback(async () => {
    try {
      const response = await fetch(`${URL}/profile/${accountname}/following?limit=${limit}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API 응답에 실패하였습니다.', error);
    }
  }, [accountname, token, limit]);

  return { fetchFollowing };
};

export default FollowingListAPI;
