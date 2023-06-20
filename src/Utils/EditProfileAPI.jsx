import { useRecoilState, useRecoilValue } from 'recoil';
import userToken from '../Recoil/userToken/userToken';
import accountName from '../Recoil/accountName/accountName';
import URL from '../Utils/URL';

const EditProfileAPI = (userInfo) => {
  console.log(userInfo);
  const token = useRecoilValue(userToken);
  const [name, setName] = useRecoilState(accountName);

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
      console.log(data);
      setName(data.user.accountname);
    } catch (error) {
      console.error('API 응답에 실패하였습니다.', error);
      console.log(userInfo);
    }
  };

  return { handleEditProfileAPI };
};

export default EditProfileAPI;
