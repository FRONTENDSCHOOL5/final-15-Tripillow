import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import URL from '../Utils/URL';

const ReportCommentAPI = (postId, commentId) => {
  const token = useRecoilValue(userToken);

  const reportComment = async () => {
    try {
      const response = await fetch(`${URL}/posts/${postId}/comments/${commentId}/report`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('[ERROR on ReportsCommentAPI]');
    }
  };

  return reportComment;
};

export default ReportCommentAPI;
