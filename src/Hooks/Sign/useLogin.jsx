import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import userToken from 'Recoil/userToken/userToken';
import isLogin from 'Recoil/isLogin/isLogin';
import accountName from 'Recoil/accountName/accountName';
import LoginAPI from 'Api/Auth/LoginAPI';

const useLogin = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [userErrorMessage, setUserErrorMessage] = useState('');
  const [userInput, setUserInput] = useState({
    user: {
      email: 'sudo@sudo.com',
      password: '123123',
    },
  });

  const setToken = useSetRecoilState(userToken);
  const [isLoginState, setIsLoginState] = useRecoilState(isLogin);
  const setName = useSetRecoilState(accountName);

  const handleError = (e) => {
    const user = userInput.user;
    if (!user.email && !user.password) {
      setErrorMsg('아이디를 입력해주세요.');
    } else if (user.email && !user.password) {
      setErrorMsg('비밀번호를 입력해주세요.');
    } else {
      setErrorMsg('');
    }
  };

  const setErrorMessage = (message) => {
    setUserErrorMessage(message);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
    setErrorMsg('');
    setUserErrorMessage('');
  };

  const handleLogin = async () => {
    const res = await LoginAPI(userInput, setErrorMessage);
    if (res && Object.prototype.hasOwnProperty.call(res, 'user')) {
      navigate('/home');
      setToken(res.user.token);
      setIsLoginState(true);
      setName(res.user.accountname);
    } else if (res && !Object.prototype.hasOwnProperty.call(res, 'user')) {
      setUserErrorMessage(res.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleLogin();
  };

  return {
    isLoginState,
    userInput,
    handleError,
    handleInputChange,
    handleFormSubmit,
    errorMsg,
    userErrorMessage,
  };
};

export default useLogin;
