import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import URL from './URL';
import userToken from '../Recoil/userToken/userToken';

const GetNumerousCommentAPI = (postId, setComments) => {
  const token = useRecoilValue(userToken);

  const getComment = async () => {
    try {
      // TODO 10개 이상일때

      const response = await fetch(`${URL}/post/${postId}/comments/?limit=100&skip=0`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error('[ERROR] on GetComment');
    }
  };

  return getComment;
};

export default GetNumerousCommentAPI;
