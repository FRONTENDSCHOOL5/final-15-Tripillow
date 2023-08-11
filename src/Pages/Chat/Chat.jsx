import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import accountName from '../../Recoil/accountName/accountName';
import FollowingListAPI from '../../Utils/FollowingListAPI';
import { LayoutStyle } from '../../Styles/Layout';
import BasicHeader from '../../Components/common/Header/BasicHeader';
import Navbar from '../../Components/common/Navbar';
import ChatUser from './ChatUser';
import isDesktop from '../../Recoil/isDesktop/isDesktop';
import ChatDetail from './ChatDetail';
import { useLocation } from 'react-router-dom';

const Chat = () => {
  const isPCScreen = useRecoilValue(isDesktop);
  const accountname = useRecoilValue(accountName);
  const { fetchFollowing } = FollowingListAPI(accountname);
  const [followingData, setFollowingData] = useState([]);
  const [isChatDetail, setIsChatDetail] = useState();

  useEffect(() => {
    const handleFetch = async () => {
      const data = await fetchFollowing();
      if (data) setFollowingData(data);
    };

    handleFetch();
  }, []);

  const onChatDetail = () => {
    setIsChatDetail(true);
  };

  return (
    <ChatLayout $isPCScreen={isPCScreen}>
      {!isPCScreen && (
        <BasicHeader
          btn1='설정 및 개인정보'
          btn2='로그아웃'
          txt='정말 로그아웃 하시겠습니까?'
          rightbtn='확인'
        ></BasicHeader>
      )}
      <ChatListLayout $fullSize={!isChatDetail}>
        {followingData &&
          followingData.map((item, index) => (
            <ChatUser
              key={index}
              userImg={item.image}
              username={item.username}
              content={item.intro}
              account={item.accountname}
              onChatDetail={onChatDetail}
            />
          ))}
      </ChatListLayout>
      {isPCScreen && isChatDetail && (
        <ChatDetailLayout>
          <ChatDetail />
        </ChatDetailLayout>
      )}
      {isPCScreen || <Navbar />}
    </ChatLayout>
  );
};

const ChatLayout = styled.main`
  ${LayoutStyle}

  ${(props) =>
    props.$isPCScreen &&
    css`
      max-width: 960px;
      display: flex;
      padding: 0;
      margin: 0 auto;
    `}
`;

const ChatListLayout = styled.div`
  flex-shrink: 0;
  flex-basis: 40%;
  margin: 0 auto;
`;

const ChatDetailLayout = styled.div`
  flex-grow: 1;
`;

export default Chat;
