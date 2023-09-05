import { useRecoilValue } from 'recoil';
import { useCallback } from 'react';
import URL from 'Api/URL';
import userToken from 'Recoil/userToken/userToken';

const ProductDetailAPI = (productId) => {
  const token = useRecoilValue(userToken);

  const getProductDetail = useCallback(async () => {
    try {
      const response = await fetch(URL + `/product/detail/${productId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('API 응답에 실패하였습니다.', error);
    }
  }, [productId, token]);

  return getProductDetail;
};

export default ProductDetailAPI;
