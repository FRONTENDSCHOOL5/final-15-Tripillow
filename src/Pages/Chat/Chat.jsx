import React from 'react';
import ChatList from 'Components/Chat/ChatList';
import PCChat from 'Components/Chat/PCChat';
import useIsWideView from 'Components/SideNav/useIsWideView';

const Chat = () => {
  const isWideView = useIsWideView();

  return <>{isWideView ? <PCChat /> : <ChatList />}</>;
};

export default Chat;
