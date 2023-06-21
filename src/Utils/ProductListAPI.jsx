import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import userToken from '../Recoil/userToken/userToken';
import URL from './URL';

const ProductListAPI = (props) => {
  const token = useRecoilValue(userToken);
  const accountname = props?.myAccount;

  const getProductList = async () => {
    try {
      const res = await fetch(`${URL}/product/${accountname}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('네트워크 응답에 문제가 있습니다.');
      }

      const data = await res.json();
      props.setProductList(data);
    } catch (error) {
      console.error('API 응답에 문제가 있습니다.', error);
    }
  };

  return { getProductList };
};

export default ProductListAPI;
