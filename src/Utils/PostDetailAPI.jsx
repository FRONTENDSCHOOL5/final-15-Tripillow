import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import URL from './URL';
import userToken from '../Recoil/userToken/userToken';

const PostDetailAPI = (postId, setPostDetail) => {
  const token = useRecoilValue(userToken);

  const getPostDetail = async () => {
    try {
      const response = await fetch(URL + `/post/${postId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data.post);
      setPostDetail(data.post);
      // console.log(data);
    } catch (error) {
      console.error('[ERROR] on PostDetail');
    }
  };

  return getPostDetail;
};

export default PostDetailAPI;
