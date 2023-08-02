import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import URL from '../Utils/URL';

const UploadProductAPI = (inputValue, isLeftToggle) => {
  const token = useRecoilValue(userToken);
  const { productName, price, description, imageLink } = inputValue;

  const uploadProduct = async () => {
    try {
      await fetch(`${URL}/product`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          product: {
            itemName: isLeftToggle ? `[P]${productName}` : `[M]${productName}`,
            price: parseInt(price), //1원 이상
            link: description,
            itemImage: imageLink,
          },
        }),
      });
    } catch (error) {
      console.error('api 오류!!!', error);
    }
  };
  return uploadProduct;
};

export default UploadProductAPI;
