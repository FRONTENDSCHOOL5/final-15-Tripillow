import React from 'react';
import styled from 'styled-components';
import ChatList from 'Components/Chat/ChatList';
import { LayoutStyle } from 'Styles/Layout';
import { useRecoilValue } from 'recoil';
import isDesktop from 'Recoil/isDesktop/isDesktop';
import ChatContent from 'Components/Chat/ChatContent';

const PCChat = () => {
  const isPCScreen = useRecoilValue(isDesktop);

  return (
    <PCChatLayout isPCScreen={isPCScreen}>
      <ChatList />
      <ChatDetailLayout>
        <ChatContent />
      </ChatDetailLayout>
    </PCChatLayout>
  );
};

const PCChatLayout = styled.main`
  ${LayoutStyle}
  max-width: 100%;
  display: flex;
  gap: 4px;
  padding: 0 0 0 10px;
  margin: ${(props) => (props.isPCScreen ? '0 0 0 335px' : '0 0 0 80px')};
`;

const ChatDetailLayout = styled.div`
  flex-grow: 1;
`;

export default PCChat;
