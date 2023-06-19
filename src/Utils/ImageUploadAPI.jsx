import URL from './URL';

const ImageUploadAPI = async (e) => {
  console.log(e)
  const formData = new FormData();
  formData.append('image', e.target.files[0]);

  try {
    const response = await fetch(URL + '/image/uploadfile', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    // props.setImageLink(URL + '/' + data.filename);
    console.log(data);
    return data;
  } catch (error) {
    console.error('에러발생!!!');
  }
};

export default ImageUploadAPI;
