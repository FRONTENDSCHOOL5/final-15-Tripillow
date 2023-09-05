import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import URL from 'Api/URL';
import userToken from 'Recoil/userToken/userToken';

const PostDetailAPI = (postId, updatePostInfo) => {
  const token = useRecoilValue(userToken);

  const getPostDetail = useCallback(async () => {
    try {
      const response = await fetch(`${URL}/post/${postId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();
      updatePostInfo({ ...data });
    } catch (error) {
      console.error('API 응답에 실패하였습니다.', error);
    }
  }, [postId, updatePostInfo, token]);

  return getPostDetail;
};

export default PostDetailAPI;
