import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import userToken from '../Recoil/userToken/userToken';
import URL from './URL';

const ProductListAPI = (accountname) => {
  const token = useRecoilValue(userToken);
  const [productList, setProductList] = useState([]);

  const getProductList = async (accountname) => {
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
      console.log(data);
      setProductList(data);
      console.log(productList)
    } catch (error) {
      console.error('API 응답에 문제가 있습니다.', error);
    }
  };

  useEffect(() => {
    getProductList(accountname);
  }, [accountname]);

  return productList;
};

export default ProductListAPI;
