import React from 'react';
import ChatList from 'Components/Chat/ChatList';
import PCChat from 'Components/Chat/PCChat';
import useIsWideView from 'Components/SideNav/useIsWideView';
import MetaTag from 'Components/common/MetaTag';

const Chat = () => {
  const isWideView = useIsWideView();

  return (
    <>
      <MetaTag
        title='Tripillow 채팅'
        description='팔로잉하는 사람들과 채팅으로 여행과 여행 물품에 대해 대화해보세요'
        url='https://tripillow.netlify.app/chat'
      />
      {isWideView ? <PCChat /> : <ChatList />}
    </>
  );
};

export default Chat;
