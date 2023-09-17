import { useRecoilValue } from 'recoil';
import userToken from 'Recoil/userToken/userToken';
import URL from 'Api/URL';

const PostModifyAPI = (postId, postInput, isLeftToggle, imgURL) => {
  const token = useRecoilValue(userToken);
  const images = imgURL.join(', ');

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
            image: images,
          },
        }),
      });
    } catch (error) {
      console.error('API 응답에 실패하였습니다.', error);
    }
  };

  return { postModify };
};

export default PostModifyAPI;
