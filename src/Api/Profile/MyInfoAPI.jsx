import { useRecoilValue } from 'recoil';
import URL from 'Api/URL';
import userToken from 'Recoil/userToken/userToken';

const MyInfoAPI = () => {
  const token = useRecoilValue(userToken);

  const getUserData = async () => {
    try {
      const response = await fetch(`${URL}/user/myinfo`, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      return data.user;
    } catch (error) {
      console.error('API 응답에 실패하였습니다.', error);
      return null;
    }
  };

  return { getUserData };
};

export default MyInfoAPI;
