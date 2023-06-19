import URL from '../Utils/URL';
import { useRecoilValue } from 'recoil';
import userToken from '../Recoil/userToken/userToken';
import React, { useEffect, useState } from 'react';

const ProductDetailAPI = (id) => {
  const token = useRecoilValue(userToken);
  const [productDetail, setProductDetail] = useState([]);
  const productId = id
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
      console.log(data.product);
      setProductDetail(data.product);
      // return data; productdetail return하면 되니까 이거 필요없음.
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
