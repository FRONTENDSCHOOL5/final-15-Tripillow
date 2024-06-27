import URL from 'Api/URL';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import userToken from 'Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';

const usePostInfinity = (accountName) => {
  const token = useRecoilValue(userToken);
  const [postCount, setPostCount] = useState(0);
  const queryClient = useQueryClient();
  const [newPostList, setNewPostList] = useState([]);

  const setPostList = (cachedData, postList) => {
    let updatedPost = [];
    const existingPostIds = new Set(newPostList.map((post) => post.id));

    if (cachedData) {
      for (let i = 0; i < cachedData.pages.length; i++) {
        cachedData?.pages[i]?.forEach((post) => {
          if (!existingPostIds.has(post.id)) {
            updatedPost.push(post);
          }
        });
      }
    } else {
      postList?.pages[postCount]?.forEach((post) => {
        if (!existingPostIds.has(post.id)) {
          updatedPost.push(post);
        }
      });
    }

    setNewPostList((prev) => [...prev, ...updatedPost]);
  };

  useEffect(() => {
    setNewPostList([]);
  }, [accountName]);

  const getPostList = async (pageParam = 0) => {
    setPostCount(pageParam.pageParam);
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
  } = useInfiniteQuery(['postList', accountName], ({ pageParam = 0 }) => getPostList({ pageParam }), {
    getNextPageParam: (lastPage, allPages) => (lastPage.length === 5 ? allPages.length : undefined),
    onSuccess: (postList) => setPostList(null, postList),
    onError: (error) => console.error('Post Fetch Error가 발생했습니다.', error),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  useEffect(() => {
    const cachedData = queryClient.getQueryData(['postList', accountName]);
    if (cachedData) {
      setPostList(cachedData);
    } else {
      fetchNextPage();
    }
    // eslint-disable-next-line
  }, [queryClient, fetchNextPage, accountName]);

  const handleNewPostUpload = () => {
    // 'postList' 쿼리를 무효화하고 다시 가져오기
    queryClient.invalidateQueries(['postList', accountName]);
  };

  return {
    handleNewPostUpload,
    newPostList,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    postLoading,
    postRefetch,
  };
};

export default usePostInfinity;
