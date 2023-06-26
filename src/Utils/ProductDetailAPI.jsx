import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';

import URL from '../Utils/URL';
import userToken from '../Recoil/userToken/userToken';

const ProductDetailAPI = (id) => {
  const token = useRecoilValue(userToken);
  const [productDetail, setProductDetail] = useState([]);
  const productId = id;
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
      console.error('api 응답 실패!!!!!!!!', error);
    }
  };
  useEffect(() => {
    getProductDetail();
  }, []);

  return productDetail;
};

export default ProductDetailAPI;
