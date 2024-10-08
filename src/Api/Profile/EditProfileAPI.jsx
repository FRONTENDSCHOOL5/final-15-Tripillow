import { useRecoilValue, useSetRecoilState } from 'recoil';
import userToken from 'Recoil/userToken/userToken';
import accountName from 'Recoil/accountName/accountName';
import URL from 'Api/URL';

const EditProfileAPI = (userInfo) => {
  const token = useRecoilValue(userToken);
  const setName = useSetRecoilState(accountName);

  const handleEditProfileAPI = async () => {
    try {
      const res = await fetch(URL + '/user', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
      const data = await res.json();
      setName(data.user.accountname);
      return data;
    } catch (error) {
      console.error('API 응답에 실패하였습니다.', error);
    }
  };

  return { handleEditProfileAPI };
};

export default EditProfileAPI;
