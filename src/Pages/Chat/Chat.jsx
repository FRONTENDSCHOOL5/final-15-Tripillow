import React from 'react';
import { useRecoilValue } from 'recoil';
import ChatList from 'Components/Chat/ChatList';
import PCChat from 'Components/Chat/PCChat';
import isDesktop from 'Recoil/isDesktop/isDesktop';
import isTab from 'Recoil/isTab/isTab';
import TabNavBar from 'Components/TabNav/TabNavBar';

const Chat = () => {
  const isPCScreen = useRecoilValue(isDesktop);
  const isTabScreen = useRecoilValue(isTab);

  return (
    <>
      {isTabScreen && <TabNavBar />}
      {isPCScreen || isTabScreen ? <PCChat /> : <ChatList />}
    </>
  );
};

export default Chat;
