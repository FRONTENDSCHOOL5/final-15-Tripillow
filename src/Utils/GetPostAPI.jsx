import { useEffect, useState } from 'react';
import URL from './URL';
import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';

const GetPostAPI = (accountName) => {
  console.log('🚀  accountName:', accountName);
  const token = useRecoilValue(userToken);

  const getPostData = async () => {
    try {
      const response = await fetch(`${URL}/post/${accountName}/userpost?limit=50`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data.post;
    } catch (error) {
      console.error('API 응답에 실패하였습니다.', error);
    }
  };

  return { getPostData };
};

export default GetPostAPI;
