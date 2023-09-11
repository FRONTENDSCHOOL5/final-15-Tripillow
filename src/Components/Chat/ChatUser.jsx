import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import profileSm from 'Assets/profile-sm.png';
import chatLists from 'Mock/chatLists';

const ChatUser = ({ username, userImg, account, ...props }) => {
  const navigate = useNavigate();
  const [randomMessage, setRandomMessage] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * chatLists.length);
    const selectedMessage = chatLists[randomIndex];
    setRandomMessage(selectedMessage);
  }, []);

  const handleMobileChat = () => {
    navigate(`/chat/${username}`, {
      state: { username, randomMessage, userImg, account },
    });
  };

  return (
    <UserLayout onClick={handleMobileChat}>
      <UserImg src={userImg || profileSm} alt={username} />
      <UserContentsLayout>
        <div>
          <UserTitle>{username}</UserTitle>
          <UserContent>{props.content} </UserContent>
        </div>
        <ChatDate>{props.date}</ChatDate>
      </UserContentsLayout>
    </UserLayout>
  );
};

const UserLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  margin: 20px 16px 0 16px;
`;

const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const UserTitle = styled.h3`
  font-size: var(--sm);
  margin-bottom: 2px;
`;

const UserContent = styled.span`
  font-size: var(--xs);
  color: var(--dark-gray);
`;

const UserContentsLayout = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ChatDate = styled.span`
  color: var(--light-gray);
  font-size: 10px;
  margin-top: auto;
`;

export default ChatUser;
