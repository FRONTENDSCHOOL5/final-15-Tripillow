import React from 'react';
import { useRecoilValue } from 'recoil';
import isDesktop from 'Recoil/isDesktop/isDesktop';
import PCChat from 'Components/Chat/PCChat';
import ChatContent from 'Components/Chat/ChatContent';

const ChatDetail = () => {
  const isPCScreen = useRecoilValue(isDesktop);

  return isPCScreen ? <PCChat /> : <ChatContent />;
};

export default ChatDetail;
