import { useRecoilValue } from 'recoil';
import URL from './URL';
import userToken from '../Recoil/userToken/userToken';

const UnFollowAPI = ({ account }) => {
  const token = useRecoilValue(userToken);

  const unFollowUser = async () => {
    try {
      const response = await fetch(`${URL}/profile/${account}/unfollow`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('UnFollowAPI 응답이 없습니다.', error);
    }
  };

  return { unFollowUser };
};

export default UnFollowAPI;
