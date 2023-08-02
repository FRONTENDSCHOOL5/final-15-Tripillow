import { useRecoilValue } from 'recoil';
import userToken from '../Recoil/userToken/userToken';
import URL from './URL';

const ProductListAPI = (accountName, updateProductList) => {
  const token = useRecoilValue(userToken);

  const getProductList = async () => {
    try {
      const response = await fetch(`${URL}/product/${accountName}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      updateProductList(data);
    } catch (error) {
      console.error('API 응답에 문제가 있습니다.', error);
    }
  };

  return { getProductList };
};

export default ProductListAPI;
