import URL from './URL';

const LoginAPI = async (userInput) => {
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
      throw new Error('아이디 혹은 비밀번호가 일치하지 않습니다.');
    }
  } catch (error) {
    console.error('API 응답에 문제가 있습니다.', error);
  }
};

export default LoginAPI;
