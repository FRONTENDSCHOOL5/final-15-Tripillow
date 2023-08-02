import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import URL from '../Utils/URL';

const UploadPostAPI = (imgURL, inputValue, isLeftToggle) => {
  const token = useRecoilValue(userToken);
  const images = imgURL.join(', ');

  const uploadPost = async () => {
    try {
      await fetch(`${URL}/post`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          post: {
            content: isLeftToggle ? `[K]${inputValue}` : `[G]${inputValue}`,
            image: images,
          },
        }),
      });
    } catch (error) {
      console.error('api 오류!!!', error);
    }
  };
  return uploadPost;
};

export default UploadPostAPI;
