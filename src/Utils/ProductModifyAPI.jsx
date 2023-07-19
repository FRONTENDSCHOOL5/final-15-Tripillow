import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import URL from '../Utils/URL';

const ProductModifyAPI = ({ productId, productInputs, isLeftToggle }) => {
  const token = useRecoilValue(userToken);

  const handleProductModify = async () => {
    try {
      const response = await fetch(`${URL}/product/${productId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ 
          product: {
            ...productInputs.product, //기존의 값 유지(복사)
            itemName: isLeftToggle ? `[P]${productInputs.product.itemName}` : `[M]${productInputs.product.itemName}`,
          },}),
      });

      const result = response.json();
    } catch (error) {
      console.error('api 오류!!!', error);
    }
  };

  return { handleProductModify };
};

export default ProductModifyAPI;
