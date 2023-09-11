import React, { useState, useRef, useEffect } from 'react';
import { Layout } from 'Styles/Layout';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { useInView } from 'react-intersection-observer';
import userToken from 'Recoil/userToken/userToken';
import { isKorea } from 'Recoil/whichCountry/whichCountry';
import MainHeader from 'Components/common/Header/MainHeader';
import Toggle from 'Components/common/Toggle';
import HomePost from 'Components/HomePost/HomePostLayout';
import TopButton from 'Components/common/Topbutton';
import Navbar from 'Components/common/Navbar';
import URL from 'Api/URL';
import HomePostSkeleton from 'Components/common/Skeleton/HomePostSkeleton';
import Spinner from 'Components/common/Spinner';
import Empty from 'Components/common/Empty';
import logo from 'Assets/logo-gray.png';
import MyPillowings from 'Components/Home/MyPillowings';
import useIsWideView from 'Components/SideNav/useIsWideView';
import isDesktop from 'Recoil/isDesktop/isDesktop';
import MetaTag from 'Components/common/MetaTag';

const Home = () => {
  const isPCScreen = useRecoilValue(isDesktop);
  const isWideView = useIsWideView();
  const token = useRecoilValue(userToken);
  const queryClient = useQueryClient();

  const feedCount = useRef(0);
  const [globalPosts, setGlobalPosts] = useState([]);
  const [koreaPosts, setKoreaPosts] = useState([]);
  const [isLeftToggle, setIsLeftToggle] = useRecoilState(isKorea);
  const [ref, inView] = useInView();

  const setCategory = (cachedData, followedFeed) => {
    const updatedKoreaPosts = [];
    const updatedGlobalPosts = [];

    if (cachedData) {
      for (let i = 0; i < cachedData.pages.length; i++) {
        cachedData?.pages[i]?.forEach((post) => {
          const match = post.content.match(/^\[(K|G)\]/);
          if (match === null || match[1] !== 'G') {
            updatedKoreaPosts.push(post);
          } else {
            updatedGlobalPosts.push(post);
          }
        });
      }
    } else {
      followedFeed?.pages[feedCount.current]?.forEach((post) => {
        const match = post.content.match(/^\[(K|G)\]/);
        if (match === null || match[1] !== 'G') {
          updatedKoreaPosts.push(post);
        } else {
          updatedGlobalPosts.push(post);
        }
      });
    }

    setKoreaPosts((prev) => [...prev, ...updatedKoreaPosts]);
    setGlobalPosts((prev) => [...prev, ...updatedGlobalPosts]);
  };

  const fetchFollowedFeed = async ({ pageParam = 0 }) => {
    feedCount.current = pageParam;
    const response = await fetch(`${URL}/post/feed/?limit=20&skip=${pageParam * 20}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.posts;
  };

  const {
    data: followedFeed,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(['followedFeed'], ({ pageParam }) => fetchFollowedFeed({ pageParam }), {
    getNextPageParam: (lastPage, allPages) => (lastPage.length === 20 ? allPages.length : undefined),
    onError: (error) => {
      console.error('Error fetching data:', error);
    },

    onSuccess: (followedFeed) => setCategory(null, followedFeed),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    const cachedData = queryClient.getQueryData('followedFeed');
    if (cachedData) {
      setCategory(cachedData);
    } else {
      fetchNextPage();
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    //eslint-disable-next-line
  }, [inView]);

  return (
    <>
      <Layout $isWideView={isWideView}>
        <MetaTag
          title='Tripillow 홈페이지'
          description='Tripillow에서 내가 팔로잉하는 게시물을 국내와 해외 카테고리로 볼 수 있습니다'
          url='https://tripillow.netlify.app/home'
        />
        {!isWideView && <MainHeader />}
        <main style={{ paddingBottom: 90 }}>
          <Toggle
            margin='25px 0 0 16px'
            leftButton='국내'
            rightButton='해외'
            setIsLeftToggle={setIsLeftToggle}
            rightOn={!isLeftToggle}
          />
          {isLoading ? (
            <>
              <HomePostSkeleton />
              <HomePostSkeleton />
            </>
          ) : followedFeed?.pages[0].length > 0 ? (
            isLeftToggle ? (
              koreaPosts.map((post) => <HomePost key={post.id} post={post} />)
            ) : (
              globalPosts.map((post) => <HomePost key={post.id} post={post} />)
            )
          ) : (
            !isLoading && (
              <Empty image={logo} alt='로고' navigate='/search' buttonName='검색하기'>
                유저를 검색해 팔로우 해보세요!
              </Empty>
            )
          )}
          <div ref={ref}> {isFetchingNextPage && <Spinner />}</div>
        </main>
        <TopButton />
        {isWideView || <Navbar />}
        {isPCScreen && <MyPillowings $on={isPCScreen} />}
      </Layout>
    </>
  );
};

export default Home;
