import React from 'react';
import { Layout } from '../../Styles/Layout';
import BasicHeader from '../../Components/common/Header/BasicHeader';
import Navbar from '../../Components/common/Navbar';
import ChatUser from './ChatUser';
import ChatLists from './ChatLists';

const Chat = () => {
  return (
    <Layout>
      <BasicHeader></BasicHeader>
      {ChatLists.chatLists.map((chatItem) => (
        <ChatUser key={chatItem.id} username={chatItem.username} content={chatItem.content} date={chatItem.date} />
      ))}
      <Navbar />
    </Layout>
  );
};

export default Chat;
