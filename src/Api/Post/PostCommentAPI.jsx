import { useRecoilValue } from 'recoil';
import URL from 'Api/URL';
import userToken from 'Recoil/userToken/userToken';

const PostCommentAPI = (postId, userInput) => {
  const token = useRecoilValue(userToken);

  const PostComment = async () => {
    try {
      const response = await fetch(`${URL}/post/${postId}/comments`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          comment: {
            content: userInput,
          },
        }),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('API 응답에 실패하였습니다.', error);
    }
  };

  return PostComment;
};
export default PostCommentAPI;
