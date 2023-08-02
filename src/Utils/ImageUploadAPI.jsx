import URL from './URL';

const ImageUploadAPI = async (e) => {
  const formData = new FormData();
  formData.append('image', e.target.files[0]);

  try {
    const response = await fetch(URL + '/image/uploadfile', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API 응답에 실패하였습니다.', error);
  }
};

export default ImageUploadAPI;
