import URL from 'Api/URL';

const EmailValidAPI = async (userEmail) => {
  try {
    const response = await fetch(`${URL}/user/emailvalid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userEmail }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API 응답에 실패하였습니다.', error);
  }
};

export default EmailValidAPI;
