import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import URL from './URL';

const PostCommentAPI = (postId, userInput) => {
  console.log(postId, '  ', userInput);
  const token = useRecoilValue(userToken);

  const PostComment = async () => {
    try {
      const response = await fetch(`${URL}/post/${postId}/comments`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ ...userInput }),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('PostCommentAPI 응답에 문제가 있습니다.', error);
    }
  };

  return PostComment;
};
export default PostCommentAPI;
