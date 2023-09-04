import React from 'react';
import styled, { css } from 'styled-components';
import BasicHeader from 'Components/common/Header/BasicHeader';
import Navbar from 'Components/common/Navbar';
import ChatUser from 'Components/Chat/ChatUser';
import useFollowing from 'Hooks/useFollowing';
import { LayoutStyle } from 'Styles/Layout';
import useIsWideView from 'Components/PCNav/useIsWideView';

const ChatList = () => {
  const isWideView = useIsWideView();
  const { followingData } = useFollowing();

  return (
    <ChatListLayout $isWideView={isWideView} $pc={isWideView}>
      {!isWideView && (
        <BasicHeader
          btn1='설정 및 개인정보'
          btn2='로그아웃'
          txt='정말 로그아웃 하시겠습니까?'
          rightbtn='확인'
        ></BasicHeader>
      )}
      <ChatUserLayout>
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
      </ChatUserLayout>
      {isWideView || <Navbar />}
    </ChatListLayout>
  );
};

const ChatListLayout = styled.div`
  ${LayoutStyle}
  flex-shrink: 0;
  min-width: 390px;

  ${(props) =>
    props.$pc &&
    css`
      box-shadow: 4px 0 5px rgba(0, 0, 0, 0.05);
    `}
`;

const ChatUserLayout = styled.div`
  flex-shrink: 0;
  flex-basis: 40%;
  margin: 0 auto;
`;

export default ChatList;
