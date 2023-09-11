import { useRecoilValue } from 'recoil';
import URL from 'Api/URL';
import userToken from 'Recoil/userToken/userToken';

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
      return data;
    } catch (error) {
      console.error('API 응답에 실패하였습니다.', error);
    }
  };

  return heartPost;
};

export default HeartPostAPI;
