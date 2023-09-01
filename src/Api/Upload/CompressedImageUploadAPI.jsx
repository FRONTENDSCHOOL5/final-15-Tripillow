import URL from 'Api/URL';

const CompressedImageUploadAPI = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`${URL}/image/uploadfile`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API 응답에 실패하였습니다.', error);
  }
};

export default CompressedImageUploadAPI;
