import React from 'react';
import URL from './URL';
import { useRecoilValue } from 'recoil';
import userToken from '../Recoil/userToken/userToken';

const UserInfoAPI = (props) => {
  const token = useRecoilValue(userToken);

  const getUserInfo = async () => {
    try {
      const response = await fetch(`${URL}/profile/${props.userAccountname}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      props.setUserInfo(data.profile);
    } catch (error) {
      console.error('UserInfoAPI 응답에 문제가 있습니다.', error);
    }
  };

  return { getUserInfo };
};

export default UserInfoAPI;
