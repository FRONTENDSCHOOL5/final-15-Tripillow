import URL from 'Api/URL';

const ImageUploadAPI = async (files) => {
  const formData = new FormData();
  let endpoint;

  if (Array.isArray(files) && files.length > 1) {
    files.forEach((file, index) => {
      formData.append(`image${index}`, file);
    });
    endpoint = '/image/uploadfiles';
  } else {
    formData.append('image', files[0] || files);
    endpoint = '/image/uploadfile';
  }

  try {
    const response = await fetch(URL + endpoint, {
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
