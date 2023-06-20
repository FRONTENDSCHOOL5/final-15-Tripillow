import { useEffect, useState } from 'react';
import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import URL from '../Utils/URL';

const ProductDeleteAPI = () => {
  const token = useRecoilValue(userToken);

  const handleProductDelete = async ({ deleteId }) => {
    try {
      console.log(token);
      console.log(deleteId);
      console.log(`${URL}/product/${deleteId}`);
      const response = await fetch(`${URL}/product/${deleteId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('api 에러!!', error);
    }
  };

  return { handleProductDelete };
};

export default ProductDeleteAPI;
