import { useRecoilValue } from 'recoil';
import URL from 'Api/URL';
import userToken from 'Recoil/userToken/userToken';

const UserInfoAPI = (accountName) => {
  const token = useRecoilValue(userToken);

  const getUserInfo = async () => {
    try {
      const response = await fetch(`${URL}/profile/${accountName}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data.profile;
    } catch (error) {
      console.error('API 응답에 실패하였습니다.', error);
    }
  };

  return { getUserInfo };
};

export default UserInfoAPI;
