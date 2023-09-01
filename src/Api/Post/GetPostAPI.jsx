import URL from 'Api/URL';
import { useRecoilValue } from 'recoil';
import userToken from 'Recoil/userToken/userToken';

const GetPostAPI = (accountName) => {
  const token = useRecoilValue(userToken);

  const getPostData = async () => {
    try {
      const response = await fetch(`${URL}/post/${accountName}/userpost?limit=50`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data.post;
    } catch (error) {
      console.error('API 응답에 실패하였습니다.', error);
    }
  };

  return { getPostData };
};

export default GetPostAPI;
