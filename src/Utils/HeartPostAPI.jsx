import { useRecoilValue } from 'recoil';
import URL from './URL';
import userToken from '../Recoil/userToken/userToken';

const HeartPostAPI = (postId) => {
  const token = useRecoilValue(userToken);

  const heartPost = async () => {
    try {
      const response = await fetch(`${URL}/post/${postId}/heart`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();
      // console.log('In Heart: ', data);
      return data;
    } catch (error) {
      console.error('[ERROR] on HeartPostAPI');
    }
  };

  return heartPost;
};

export default HeartPostAPI;
