import URL from 'Api/URL';
import { useInfiniteQuery } from 'react-query';
import userToken from 'Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

const usePostInfinity = (accountName) => {
  const token = useRecoilValue(userToken);
  const [newPostList, setNewPostList] = useState([]);

  const getPostList = async (pageParam = 0) => {
    try {
      const response = await fetch(`${URL}/post/${accountName}/userpost?limit=5&skip=${pageParam.pageParam * 5}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data.post;
    } catch (error) {
      console.error('PostList API응답에 실패하였습니다.');
    }
  };

  const {
    isLoading: postLoading,
    refetch: postRefetch,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(['postList', { accountName }], ({ pageParam = 0 }) => getPostList({ pageParam }), {
    onSuccess: (postList) => setNewPostList(postList.pages.flat()),
    getNextPageParam: (lastPage, allPages) => (lastPage.length === 5 ? allPages.length : undefined),
    onError: (error) => console.error('Post Fetch Error가 발생했습니다.', error),
    retry: false,
    refetchOnWindowFocus: false,
    notifyOnChangeProps: 'tracked',
  });

  return {
    newPostList,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    postLoading,
    postRefetch,
  };
};

export default usePostInfinity;
