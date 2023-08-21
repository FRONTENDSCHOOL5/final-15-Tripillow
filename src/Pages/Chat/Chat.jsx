import React from 'react';
import ChatList from '../../Components/Chat/ChatList';
import PCChat from '../../Components/Chat/PCChat';
import isDesktop from '../../Recoil/isDesktop/isDesktop';
import { useRecoilValue } from 'recoil';

const Chat = () => {
  const isPCScreen = useRecoilValue(isDesktop);

  return isPCScreen ? <PCChat /> : <ChatList />;
};

export default Chat;
