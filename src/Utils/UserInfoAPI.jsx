import React, { useEffect, useState } from 'react';
import URL from './URL';
import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';

const UserInfoAPI = (props) => {
  const token = useRecoilValue(userToken);
  const reqPath = `/user/myinfo`;
  // const [userData, setUserData] = useState({});

  const getUserData = async () => {
    try {
      const response = await fetch(URL + reqPath, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      // setUserData(data.user);
      props.setData ? props?.setData(data.user) : props?.setUserInfo(data.user);
      console.log(data.user);
    } catch (error) {
      console.error('API 응답에 문제가 있습니다.', error);
    }
  };

  // useEffect(() => {
  //   getUserData();
  // }, []);

  return { getUserData };
};

export default UserInfoAPI;
