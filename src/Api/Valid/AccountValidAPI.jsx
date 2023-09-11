import { useRecoilValue } from 'recoil';
import URL from 'Api/URL';
import userToken from 'Recoil/userToken/userToken';

const AccountValidAPI = (account, updateErrorMessage) => {
  const token = useRecoilValue(userToken);

  const getAccountValidAPI = async () => {
    try {
      const response = await fetch(`${URL}/user/accountnamevalid`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(account),
      });
      const result = await response.json();
      updateErrorMessage(result.message);
    } catch (error) {
      console.error('API 응답에 실패하였습니다.', error);
    }
  };

  return getAccountValidAPI;
};

export default AccountValidAPI;
