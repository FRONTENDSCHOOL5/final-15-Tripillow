import URL from './URL';

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
    console.error('에러발생!!!');
  }
};

export default CompressedImageUploadAPI;
