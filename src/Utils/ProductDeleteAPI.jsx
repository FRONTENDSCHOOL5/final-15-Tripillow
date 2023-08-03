import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import URL from '../Utils/URL';

const ProductDeleteAPI = (userId) => {
  const token = useRecoilValue(userToken);

  const handleProductDelete = async () => {
    try {
      await fetch(`${URL}/product/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
    } catch (error) {
      console.error('API 응답에 실패하였습니다.', error);
    }
  };

  return handleProductDelete;
};

export default ProductDeleteAPI;
