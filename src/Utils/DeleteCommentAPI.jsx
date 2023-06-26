import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import URL from '../Utils/URL';

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
      console.error('[ERROR on DeleteCommentAPI]');
    }
  };

  return handleCommentDelete;
};

export default DeleteCommentAPI;
