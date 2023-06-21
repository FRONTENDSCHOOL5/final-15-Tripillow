import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import URL from '../Utils/URL';

const ProductDeleteAPI = (userId) => {
  const token = useRecoilValue(userToken);

  const handleProductDelete = async () => {
    try {
      const response = await fetch(`${URL}/product/${userId}`, {
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

  return  handleProductDelete ;
};

export default ProductDeleteAPI;
