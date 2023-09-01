import { useRecoilValue } from 'recoil';
import userToken from 'Recoil/userToken/userToken';
import URL from 'Api/URL';

const ProductListAPI = (accountName) => {
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
      return data.product;
    } catch (error) {
      console.error('API 응답에 실패하였습니다.', error);
    }
  };

  return { getProductList };
};

export default ProductListAPI;
