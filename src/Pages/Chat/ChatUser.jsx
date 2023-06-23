import React from 'react';
import styled from 'styled-components';
import profileSm from '../../Assets/profile-sm.png';
import { useNavigate } from 'react-router-dom';

const ChatUser = (props) => {
  const navigate = useNavigate();
  return (
    <UserLayout
      onClick={() => {
        navigate('/ChatDetail', { state: props.username });
      }}
    >
      <UserImg src={props.userImg || profileSm} alt={props.username} />
      <UserContentsLayout>
        <div>
          <UserTitle>{props.username}</UserTitle>
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
