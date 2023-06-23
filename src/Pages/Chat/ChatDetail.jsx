import React, { useState } from 'react';
import styled from 'styled-components';

import { LayoutStyle } from '../../Styles/Layout';
import BasicHeader from '../../Components/common/Header/BasicHeader';
import profileSm from '../../Assets/profile-sm.png';
import { useLocation } from 'react-router-dom';
import ChatLists from './ChatLists';

const ChatDetail = () => {
  const location = useLocation();
  console.log(location);
  const [inputValue, setInputValue] = useState('');
  const [chatValue, setChatValue] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const random = Math.floor(Math.random() * 4);
  console.log(random)
  console.log(ChatLists[random].message)

  const handleButtonClicked = () => {
    setTimeout(() => {
      const newChatValue = [...chatValue];
      inputValue !== '' && newChatValue.push(inputValue);
      setChatValue(newChatValue);
      setInputValue('');
    }, 0);
  };

  const handleKeyDown = (e) => {
    e.key === 'Enter' && handleButtonClicked();
  };

  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  return (
    <ChatLayout>
      <BasicHeader>{location.state}</BasicHeader>
      <ChatContentLayout>
        <UserImage src={profileSm} alt='프로필 이미지' />
        <ChatContent bgColor='white' radius='0 22px 22px 22px'>
        {ChatLists[random].message}
        </ChatContent>
        <ChatTime>12:39</ChatTime>
      </ChatContentLayout>

      {chatValue.map((value, i) => (
        <ChatContentLayout key={`chat-${i}`} marginLeft='auto'>
          <ChatTime>{`${hours}:${minutes}`}</ChatTime>
          <ChatContent color='white' radius='22px 0 22px 22px'>
            {value}
          </ChatContent>
        </ChatContentLayout>
      ))}

      <ChatInputBar>
        <UserImage src={profileSm} alt='프로필 이미지' />
        <ChatInput
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder='메시지 입력하기...'
        />
        <SendButton onClick={handleButtonClicked} inputValue={inputValue}>
          전송
        </SendButton>
      </ChatInputBar>
    </ChatLayout>
  );
};

const ChatLayout = styled.div`
  ${LayoutStyle}
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: #f2f2f2;
  padding-left: 16px;
  padding-right: 16px;
`;

const ChatContentLayout = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-left: ${(props) => props.marginLeft};
`;

const UserImage = styled.img`
  width: 42px;
  height: 42px;
  margin-right: 12px;
`;

const ChatContent = styled.p`
  max-width: 240px;
  border: 1px solid #c4c4c4;
  padding: 12px;
  box-sizing: border-box;
  background-color: ${(props) => props.bgColor || 'var(--primary)'};
  color: ${(props) => props.color};
  font-size: var(--sm);
  line-height: 18px;
  border-radius: ${(props) => props.radius};
  word-break: break-word;
`;

const ChatTime = styled.span`
  font-size: 10px;
  color: var(--dark-gray);
  margin-top: auto;
  padding-left: 6px;
`;

const ChatInputBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 390px;
  height: 60px;
  box-sizing: border-box;
  margin: auto;
  padding: 0 16px;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: white;
  border: 1px solid var(--light-gray);
  border-top: 0.5px solid var(--light-gray);
`;

const ChatInput = styled.input`
  border: none;
  padding-left: 6px;
  font-size: var(--sm);
  flex-grow: 1;
  &::placeholder {
    color: var(--light-gray);
  }
`;

const SendButton = styled.button`
  width: 33px;
  height: 33px;
  color: ${(props) => (props.inputValue ? 'var(--primary)' : 'var(--light-gray)')};
`;

export default ChatDetail;
