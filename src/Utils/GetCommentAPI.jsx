import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import URL from '../Utils/URL';
import userToken from '../Recoil/userToken/userToken';

const GetCommentAPI = (postId, setComments) => {
  const token = useRecoilValue(userToken);

  const getComment = async () => {
    try {
      // TODO 10개 이상일때
      console.log(postId);
      console.log(`${URL}/post/${postId}/comments`);

      const response = await fetch(`${URL}/post/${postId}/comments`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data.comments);
      setComments(data.comments);
    } catch (error) {
      console.error('[ERROR] on GetComment');
    }
  };

  return getComment;
};

export default GetCommentAPI;
