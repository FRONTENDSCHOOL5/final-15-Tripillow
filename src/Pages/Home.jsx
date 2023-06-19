import React, { useState, useEffect } from 'react';
import { Layout } from '../Styles/Layout';
import MainHeader from '../Components/common/Header/MainHeader';
import Toggle from '../Components/common/Toggle';
import HomePost from '../Components/HomePost/HomePostLayout';
import TopButton from '../Components/common/Topbutton';
import Navbar from '../Components/common/Navbar';
import URL from '../Utils/URL';
import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import HomePostSkeleton from '../Components/common/Skeleton/HomePostSkeleton';

const Home = () => {
  const token = useRecoilValue(userToken);
  const [FeedCount, setFeedCount] = useState(0);
  const [FollowedFeed, setFollowedFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getFeedFollowed = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${URL}/post/feed/?limit=20&skip=${FeedCount * 20}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setFollowedFeed((prevFeed) => [...prevFeed, ...data.posts]);
      } catch (error) {
        console.error('에러', error);
      }
      setIsLoading(false);
    };
    getFeedFollowed();
  }, [FeedCount]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      setFeedCount((prevCount) => prevCount + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Layout>
      <MainHeader />
      <Toggle margin='25px 0 0 16px' leftButton='국내' rightButton='해외' />
      {isLoading && (
        <>
          <HomePostSkeleton />
          <HomePostSkeleton />
        </>
      )}
      {FollowedFeed.length && FollowedFeed.map((post) => <HomePost key={post.id} post={post} />)}
      <TopButton />
      <Navbar />
    </Layout>
  );
};

export default Home;
