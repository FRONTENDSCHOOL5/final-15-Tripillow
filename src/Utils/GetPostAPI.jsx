import { useEffect, useState } from 'react';
import URL from './URL';
import userToken from '../Recoil/userToken/userToken';
import accountName from '../Recoil/accountName/accountName';
import { useRecoilValue } from 'recoil';

const GetPostAPI = () => {
  const token = useRecoilValue(userToken);
  const accountname = useRecoilValue(accountName);
  const reqPath = `/post/${accountname}/userpost`;
  const [postData, setPostData] = useState([]);

  const getPostData = async () => {
    try {
      const response = await fetch(URL + reqPath, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setPostData(data.post);
    } catch (error) {
      console.error('API 응답에 문제가 있습니다.', error);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  return postData;
};

export default GetPostAPI;
