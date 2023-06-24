import { useRecoilValue } from 'recoil';
import URL from './URL';
import userToken from '../Recoil/userToken/userToken';

const UnheartPostAPI = (postId) => {
  const token = useRecoilValue(userToken);

  const unheartPost = async () => {
    try {
      const response = await fetch(`${URL}/post/${postId}/unheart`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();
      // console.log('In Unheart: ', data);
      return data;
    } catch (error) {
      console.error('[ERROR] on UnheartPostAPI');
    }
  };

  return unheartPost;
};

export default UnheartPostAPI;
