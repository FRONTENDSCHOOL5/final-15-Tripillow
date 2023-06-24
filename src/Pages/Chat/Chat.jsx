import React, { useEffect, useState } from 'react';
import { Layout } from '../../Styles/Layout';
import BasicHeader from '../../Components/common/Header/BasicHeader';
import Navbar from '../../Components/common/Navbar';
import ChatUser from './ChatUser';
import ChatLists from './chatLists';
import FollowingListAPI from '../../Utils/FollowingListAPI';
import accountName from '../../Recoil/accountName/accountName';
import { useRecoilValue } from 'recoil';

const Chat = () => {
  const accountname = useRecoilValue(accountName);
  const { fetchFollowing } = FollowingListAPI({ accountname });
  const [followingData, setFollowingData] = useState([]);

  useEffect(() => {
    const handleFetch = async () => {
      const data = await fetchFollowing();
      if (data) setFollowingData(data);
      console.log(data);
    };

    handleFetch();
  }, []);

  return (
    <Layout>
      <BasicHeader></BasicHeader>
      {followingData &&
        followingData.map((item, index) => (
          <ChatUser key={index} userImg={item.image} username={item.username} content={item.intro} />
        ))}
      <Navbar />
    </Layout>
  );
};

export default Chat;
