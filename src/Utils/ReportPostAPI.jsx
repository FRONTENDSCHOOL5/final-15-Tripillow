import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import URL from './URL';

const ReportPostAPI = (postId) => {
  const token = useRecoilValue(userToken);

  const reportPost = async () => {
    try {
      const response = await fetch(`${URL}/post/${postId}/report`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('[ERROR on ReportPostAPI]');
    }
  };

  return reportPost;
};

export default ReportPostAPI;
