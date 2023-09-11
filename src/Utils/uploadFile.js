import URL from 'Api/URL';
import ImageUploadAPI from 'Api/Upload/ImageUploadAPI';
import imageCompression from 'browser-image-compression';

const handleDataForm = async (dataURL) => {
  try {
    const byteString = atob(dataURL.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ia], {
      type: 'image/jpeg',
    });

    const file = new File([blob], 'image.jpg');

    const data = await ImageUploadAPI(file);

    if (data) {
      const imageUrl = data.filename;

      return URL + '/' + imageUrl;
    }
  } catch (error) {
    console.error(error);
  }
};

const getBase64Data = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const uploadFile = async (e, onUploadSuccess) => {
  const file = e.target.files[0];
  if (!file) return;

  const options = {
    maxSizeMB: 0.9,
    maxWidthOrHeight: 490,
    useWebWorker: true,
  };

  try {
    // 이미지 압축
    const compressedFile = await imageCompression(file, options);

    // base64 데이터로 변환
    const base64data = await getBase64Data(compressedFile);

    // 데이터 폼 처리 및 업로드
    const imageUrl = await handleDataForm(base64data);

    if (imageUrl) onUploadSuccess(imageUrl);
  } catch (error) {
    console.error(error);
  }
};
