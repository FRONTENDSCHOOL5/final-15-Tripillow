import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import accountName from '../../Recoil/accountName/accountName';
import FollowingListAPI from '../../Utils/FollowingListAPI';
import { Layout } from '../../Styles/Layout';
import BasicHeader from '../../Components/common/Header/BasicHeader';
import Navbar from '../../Components/common/Navbar';
import ChatUser from './ChatUser';

const Chat = () => {
  const accountname = useRecoilValue(accountName);
  const { fetchFollowing } = FollowingListAPI(accountname);
  const [followingData, setFollowingData] = useState([]);

  useEffect(() => {
    const handleFetch = async () => {
      const data = await fetchFollowing();
      if (data) setFollowingData(data);
    };

    handleFetch();
  }, []);

  return (
    <Layout>
      <BasicHeader
        btn1='설정 및 개인정보'
        btn2='로그아웃'
        txt='정말 로그아웃 하시겠습니까?'
        rightbtn='확인'
      ></BasicHeader>
      {followingData &&
        followingData.map((item, index) => (
          <ChatUser
            key={index}
            userImg={item.image}
            username={item.username}
            content={item.intro}
            account={item.accountname}
          />
        ))}
      <Navbar />
    </Layout>
  );
};

export default Chat;
