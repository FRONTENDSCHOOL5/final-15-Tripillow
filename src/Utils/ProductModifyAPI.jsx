import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import URL from '../Utils/URL';
import { useState } from 'react';

const ProductModifyAPI = ({ productId, productInputs }) => {
  const token = useRecoilValue(userToken);

  const handleProductModify = async () => {
    try {
      const response = await fetch(`${URL}/product/${productId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ ...productInputs }),
      });

      const result = response.json();
    } catch (error) {
      console.error('api 오류!!!', error);
    }
  };

  return {  handleProductModify };
};

export default ProductModifyAPI;
