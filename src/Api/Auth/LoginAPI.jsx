import URL from 'Api/URL';

const LoginAPI = async (userInput, setErrorMessage) => {
  try {
    const response = await fetch(URL + '/user/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userInput }),
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      setErrorMessage('아이디 혹은 비밀번호가 일치하지 않습니다.');
    }
  } catch (error) {
    console.error('API 응답에 실패하였습니다.', error);
  }
};

export default LoginAPI;
