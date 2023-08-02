import { useRecoilValue } from 'recoil';
import URL from './URL';
import userToken from '../Recoil/userToken/userToken';

const PostDetailAPI = (postId, updatePostInfo) => {
  const token = useRecoilValue(userToken);

  const getPostDetail = async () => {
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
      console.error('[ERROR] on PostDetail');
    }
  };

  return getPostDetail;
};

export default PostDetailAPI;
