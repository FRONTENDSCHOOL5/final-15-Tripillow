import { useEffect, useState } from 'react';
import URL from './URL';
import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';

const GetPostAPI = (props) => {
  const token = useRecoilValue(userToken);
  const accountname = props?.myAccount;

  const getPostData = async () => {
    try {
      const response = await fetch(`${URL}/post/${accountname}/userpost`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      props.setPostData(data.post);
    } catch (error) {
      console.error('API 응답에 문제가 있습니다.', error);
    }
  };

  return { getPostData };
};

export default GetPostAPI;
