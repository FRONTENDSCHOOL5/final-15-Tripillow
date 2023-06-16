import React, { useEffect, useState } from 'react';
import { LayoutStyle } from '../../Styles/Layout';
import BasicHeader from '../../Components/common/Header/BasicHeader';
import profileSm from '../../Assets/profile-sm.png';
import styled from 'styled-components';

const Chat = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatValue, setChatValue] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClicked = (e) => {
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

  return (
    <ChatLayout>
      <BasicHeader>윤석짱짱123</BasicHeader>
      <ChatContentLayout>
        <UserImage src={profileSm} alt='프로필 사진' />
        <ChatContent bgColor='white' radius='0 22px 22px 22px'>
          옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여, 뿐이다. 이상의 청춘의 뼈 따뜻한 그들의 그와
          약동하다. 대고, 못할 넣는 풍부하게 뛰노는 인생의 힘있다.
        </ChatContent>
        <ChatTime>12:39</ChatTime>
      </ChatContentLayout>
      {chatValue.map((_, i) => (
        <ChatContentLayout marginLeft='auto'>
          <ChatTime>12:39</ChatTime>
          <ChatContent color='white' radius='22px 0 22px 22px'>
            {chatValue[i]}
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

export default Chat;
