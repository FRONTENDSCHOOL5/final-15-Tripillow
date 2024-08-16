import URL from 'Api/URL';
import { useRecoilValue } from 'recoil';
import userToken from 'Recoil/userToken/userToken';

const CheckTokenAPI = () => {
  const token = useRecoilValue(userToken);

  const checkValidToken = async () => {
    try {
      const response = await fetch(URL + '/user/checktoken', {
        method: 'GET',
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
  return checkValidToken;
};

export default CheckTokenAPI;
