import { useRecoilValue } from 'recoil';
import URL from './URL';
import userToken from '../Recoil/userToken/userToken';

const FollowAPI = (account) => {
  const token = useRecoilValue(userToken);

  const followUser = async () => {
    try {
      const response = await fetch(`${URL}/profile/${account}/follow`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('API 응답에 실패하였습니다.', error);
    }
  };

  return { followUser };
};

export default FollowAPI;
