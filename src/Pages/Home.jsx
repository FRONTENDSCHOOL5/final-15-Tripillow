import React, { useState, useEffect } from 'react';
import { Layout } from '../Styles/Layout';
import { useRecoilValue } from 'recoil';
import userToken from '../Recoil/userToken/userToken';
import MainHeader from '../Components/common/Header/MainHeader';
import Toggle from '../Components/common/Toggle';
import HomePost from '../Components/HomePost/HomePostLayout';
import TopButton from '../Components/common/Topbutton';
import Navbar from '../Components/common/Navbar';
import URL from '../Utils/URL';
import HomePostSkeleton from '../Components/common/Skeleton/HomePostSkeleton';
import Spinner from '../Components/common/Spinner';
import Empty from '../Components/common/Empty';
import logo from '../Assets/logo-gray.png';
import isDesktop from '../Recoil/isDesktop/isDesktop';

const Home = () => {
  const isPCScreen = useRecoilValue(isDesktop);
  const token = useRecoilValue(userToken);
  const [feedCount, setFeedCount] = useState(0);
  const [followedFeed, setFollowedFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [isLeftToggle, setIsLeftToggle] = useState(true);
  const [globalPosts, setGlobalPosts] = useState([]);
  const [koreaPosts, setKoreaPosts] = useState([]);

  useEffect(() => {
    const setCategory = () => {
      const updatedKoreaPosts = [];
      const updatedGlobalPosts = [];

      followedFeed.forEach((post) => {
        const match = post.content.match(/^\[(K|G)\]/);
        if (match === null || match[1] !== 'G') {
          updatedKoreaPosts.push(post);
        } else {
          updatedGlobalPosts.push(post);
        }
      });
      setKoreaPosts(updatedKoreaPosts);
      setGlobalPosts(updatedGlobalPosts);
    };

    setCategory();
  }, [followedFeed]);

  useEffect(() => {
    const getFeedFollowed = async () => {
      try {
        const response = await fetch(`${URL}/post/feed/?limit=50&skip=${feedCount * 50}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
          setFollowedFeed((prevFeed) => [...prevFeed, ...data.posts]);
          setTimeout(() => setIsLoading(false), 500);
        }
      } catch (error) {
        console.error('에러', error);
      }
    };
    getFeedFollowed();
  }, [feedCount]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight && !showSpinner) {
      setShowSpinner(true);
      setTimeout(() => {
        setFeedCount((prevCount) => prevCount + 1);
        setShowSpinner(false);
        window.scrollTo(0, scrollTop - 55);
      }, 1000);
    }
    if (scrollTop >= clientHeight) {
      setShowTopButton(true);
    } else setShowTopButton(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Layout $isPCScreen={isPCScreen}>
      <MainHeader />
      <main style={{ paddingBottom: 90 }}>
        <Toggle margin='25px 0 0 16px' leftButton='국내' rightButton='해외' setIsLeftToggle={setIsLeftToggle} />
        {isLoading ? (
          <>
            <HomePostSkeleton />
            <HomePostSkeleton />
          </>
        ) : followedFeed.length > 0 ? (
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
      </main>
      {showSpinner && <Spinner />}
      {showTopButton && <TopButton />}
      {isPCScreen || <Navbar />}
    </Layout>
  );
};

export default Home;
