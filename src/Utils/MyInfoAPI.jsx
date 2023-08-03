import React, { useEffect, useState } from 'react';
import URL from './URL';
import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';

const MyInfoAPI = (updateData, updateMyInfo) => {
  const token = useRecoilValue(userToken);

  const getUserData = async () => {
    try {
      const response = await fetch(`${URL}/user/myinfo`, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (updateData || updateMyInfo) {
        updateData ? updateData(data.user) : updateMyInfo(data.user);
      }
      return data.user;
    } catch (error) {
      console.error('API 응답에 실패하였습니다.', error);
      return null;
    }
  };

  return { getUserData };
};

export default MyInfoAPI;
