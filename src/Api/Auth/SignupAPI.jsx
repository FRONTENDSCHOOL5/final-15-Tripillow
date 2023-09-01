import URL from 'Api/URL';

const SignupAPI = async (userInfo) => {
  try {
    const response = await fetch(`${URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userInfo }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API 응답에 실패하였습니다.', error);
  }
};

export default SignupAPI;
