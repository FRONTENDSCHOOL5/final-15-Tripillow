import React, { useEffect, useState } from 'react';
import URL from './URL';
import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';

const MyInfoAPI = (props) => {
  const token = useRecoilValue(userToken);
  const reqPath = `/user/myinfo`;

  const getUserData = async () => {
    try {
      const response = await fetch(URL + reqPath, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      props.setData ? props?.setData(data.user) : props?.setMyInfo(data.user);
    } catch (error) {
      console.error('API 응답에 문제가 있습니다.', error);
    }
  };

  return { getUserData };
};

export default MyInfoAPI;
