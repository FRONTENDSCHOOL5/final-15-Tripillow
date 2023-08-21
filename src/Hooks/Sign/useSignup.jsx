import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import URL from '../../Utils/URL';
import SignupAPI from '../../Utils/SignupAPI';
import EmailValidAPI from '../../Utils/EmailValidAPI';
import ImageUploadAPI from '../../Utils/ImageUploadAPI';

const UseSignup = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [imgURL, setImgURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailPwCheck, setEmailPwCheck] = useState(false);
  const [userInfo, setUserInfo] = useState({
    user: {
      username: '',
      email: '',
      password: '',
      accountname: '',
      intro: '',
      image: '',
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
    setErrorMessage('');
  };

  const handleEmailValid = async (e) => {
    const res = await EmailValidAPI({ user: { email: userInfo.user.email } });

    if (res) {
      setEmailError(res.message);
    }
  };

  const handleOnBlur = async () => {
    await handleEmailValid();
  };

  const handlePasswordValid = () => {
    if (userInfo.user.password.length < 6) {
      setPasswordError('비밀번호는 6자 이상이어야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  const goNext = (e) => {
    e.preventDefault();
    if (userInfo.user.email && userInfo.user.password && !passwordError) {
      if (emailError == '사용 가능한 이메일 입니다.') {
        setEmailPwCheck(true);
      }
    }
  };

  const handleImageInput = async (e) => {
    const file = e.target.files[0];
    const res = await ImageUploadAPI(file);
    setImgURL(URL + '/' + res.filename);
    setUserInfo({ ...userInfo, user: { ...userInfo.user, image: URL + '/' + res.filename } });
  };

  const handleSign = async () => {
    const res = await SignupAPI(userInfo);

    if (res) {
      setErrorMessage(res.message);

      if (res.message === '회원가입 성공') {
        navigate('/login');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSign();
  };

  return {
    imgURL,
    userInfo,
    goNext,
    emailPwCheck,
    errorMessage,
    emailError,
    passwordError,
    handleSubmit,
    handleInputChange,
    handleImageInput,
    handlePasswordValid,
    handleOnBlur,
  };
};

export default UseSignup;
