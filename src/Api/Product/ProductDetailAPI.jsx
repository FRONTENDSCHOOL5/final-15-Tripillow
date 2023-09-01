import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import URL from 'Api/URL';
import userToken from 'Recoil/userToken/userToken';

const ProductDetailAPI = (productId) => {
  const token = useRecoilValue(userToken);
  const [productDetail, setProductDetail] = useState([]);
  const getProductDetail = async () => {
    try {
      const response = await fetch(URL + `/product/detail/${productId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();
      setProductDetail(data.product);
    } catch (error) {
      console.error('API 응답에 실패하였습니다.', error);
    }
  };
  useEffect(() => {
    getProductDetail();
    //eslint-disable-next-line
  }, []);

  return productDetail;
};

export default ProductDetailAPI;
