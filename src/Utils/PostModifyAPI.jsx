import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import URL from '../Utils/URL';

const PostModifyAPI = (postId, postInput, isLeftToggle) => {
  const token = useRecoilValue(userToken);

  const postModify = async () => {
    try {
      await fetch(`${URL}/post/${postId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          ...postInput,
          post: {
            ...postInput.post,
            content: isLeftToggle ? `[K]${postInput.post.content}` : `[G]${postInput.post.content}`,
          },
        }),
      });
    } catch (error) {
      console.error('api 오류!!!', error);
    }
  };

  return { postModify };
};

export default PostModifyAPI;