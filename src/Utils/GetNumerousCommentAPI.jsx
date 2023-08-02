import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import URL from './URL';
import userToken from '../Recoil/userToken/userToken';

const GetNumerousCommentAPI = (postId, updateComments) => {
  const token = useRecoilValue(userToken);

  const getNumerousComment = async () => {
    try {
      const response = await fetch(`${URL}/post/${postId}/comments/?limit=Number&skip=Number`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();
      updateComments(data.comments);
    } catch (error) {
      console.error('[ERROR] on GetComment');
    }
  };

  return getNumerousComment;
};

export default GetNumerousCommentAPI;
