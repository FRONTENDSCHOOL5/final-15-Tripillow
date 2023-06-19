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

const Home = () => {
  const token = useRecoilValue(userToken);

  const [FeedCount, setFeedCount] = useState(0);

  const [FeedFollowed, setFeedFollowed] = useState([]);

  useEffect(() => {
    const getFeedFollowed = async () => {
      try {
        const response = await fetch(`${URL}/post/feed/?limit=10&skip=${FeedCount}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log(data);
        setFeedFollowed(data.posts);
      } catch (error) {
        console.error('에러', error);
      }
    };
    getFeedFollowed();
  }, [FeedCount, token]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      setFeedCount(FeedCount + 1);
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
      {FeedFollowed.length > 0 && FeedFollowed.map((post) => <HomePost key={post.id} post={post} />)}

      <TopButton />
      <Navbar />
    </Layout>
  );
};

export default Home;
