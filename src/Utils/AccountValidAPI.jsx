import URL from './URL';
import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';

const AccountValidAPI = (props) => {
  const token = useRecoilValue(userToken);

  const getAccountValidAPI = async () => {
    try {
      const response = await fetch(`${URL}/user/accountnamevalid`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(props.account),
      });
      const result = await response.json();
      props.setErrorMessage(result.message);
    } catch (error) {
      console.error('AccountValidAPI 응답에 문제가 있습니다.', error);
    }
  };

  return getAccountValidAPI;
};

export default AccountValidAPI;
