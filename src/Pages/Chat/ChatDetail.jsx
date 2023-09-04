import React from 'react';
import PCChat from 'Components/Chat/PCChat';
import ChatContent from 'Components/Chat/ChatContent';
import useIsWideView from 'Components/PCNav/useIsWideView';

const ChatDetail = () => {
  const isWideView = useIsWideView();

  return isWideView ? <PCChat /> : <ChatContent />;
};

export default ChatDetail;
