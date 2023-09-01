import { useRecoilValue } from 'recoil';
import userToken from 'Recoil/userToken/userToken';
import URL from 'Api/URL';

const DeleteCommentAPI = (postId, commentId) => {
  const token = useRecoilValue(userToken);

  const handleCommentDelete = async () => {
    try {
      const response = await fetch(`${URL}/post/${postId}/comments/${commentId}`, {
        method: 'DELETE',
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

  return handleCommentDelete;
};

export default DeleteCommentAPI;
