import { useRecoilValue } from 'recoil';
import userToken from 'Recoil/userToken/userToken';
import URL from 'Api/URL';

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
      console.error('API 응답에 실패하였습니다.', error);
    }
  };

  return reportComment;
};

export default ReportCommentAPI;
