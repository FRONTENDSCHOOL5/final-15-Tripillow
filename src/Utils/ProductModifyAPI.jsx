import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import URL from '../Utils/URL';

const ProductModifyAPI = (productId, productInputs, isLeftToggle) => {
  const token = useRecoilValue(userToken);

  const handleProductModify = async () => {
    try {
      await fetch(`${URL}/product/${productId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          product: {
            ...productInputs.product,
            itemName: isLeftToggle ? `[P]${productInputs.product.itemName}` : `[M]${productInputs.product.itemName}`,
          },
        }),
      });
    } catch (error) {
      console.error('API 응답에 실패하였습니다.', error);
    }
  };

  return { handleProductModify };
};

export default ProductModifyAPI;
