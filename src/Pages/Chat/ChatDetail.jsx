import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import MyInfoAPI from '../../Utils/MyInfoAPI';
import { LayoutStyle } from '../../Styles/Layout';
import BasicHeader from '../../Components/common/Header/BasicHeader';
import profileSm from '../../Assets/profile-sm.png';
import { useRecoilValue } from 'recoil';
import isDesktop from '../../Recoil/isDesktop/isDesktop';

const ChatDetail = () => {
  const location = useLocation();
  const username = location.state?.username;
  const randomMessage = location.state?.randomMessage;
  const userImg = location.state?.userImg;
  const account = location.state?.account;
  const navigate = useNavigate();
  const isPCScreen = useRecoilValue(isDesktop);
  const [inputValue, setInputValue] = useState('');
  const [chatValue, setChatValue] = useState([]);
  const [myInfo, setMyInfo] = useState({});
  const updateMyInfo = (data) => {
    setMyInfo(data);
  };
  const { getUserData } = MyInfoAPI(null, updateMyInfo);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (isPCScreen) {
      navigate('/chat', { state: { username, randomMessage, userImg, account } });
    }
  }, [isPCScreen]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

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
    <ChatLayout $isPCScreen={isPCScreen}>
      {!isPCScreen && (
        <BasicHeader btn1='신고하기' btn2='로그아웃' txt='정말 로그아웃 하시겠습니까?' rightbtn='확인'>
          {username}
        </BasicHeader>
      )}
      <ChatContentLayout>
        <UserImageLayout to={`/profile/${account}`}>
          <UserImage src={userImg} alt='location.state.username' />
        </UserImageLayout>
        <ChatContent $bgColor='white' radius='0 22px 22px 22px'>
          {randomMessage}
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
      <ChatInputBar $isPCScreen={isPCScreen}>
        <UserImageLayout to={`/profile`}>
          <UserImage src={myInfo.image || profileSm} alt='프로필 이미지' />
        </UserImageLayout>
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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: ${(props) => (props.$isPCScreen ? '#f2f2f2' : '#f2f2f2')};
  padding-left: 16px;
  padding-right: 16px;

  ${(props) =>
    props.$isPCScreen &&
    css`
      max-width: 100%;
      padding: 0px 16px 100px;
    `}
`;

const ChatContentLayout = styled.div`
  display: flex;
  margin-bottom: 20px;
  margin-left: ${(props) => props.marginLeft};
`;

const UserImageLayout = styled(Link)`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
`;

const UserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ChatContent = styled.p`
  max-width: 240px;
  border: 1px solid #c4c4c4;
  padding: 12px;
  box-sizing: border-box;
  background-color: ${(props) => props.$bgColor || 'var(--primary)'};
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
  min-height: 60px;
  box-sizing: border-box;
  margin: auto;
  padding: 13px 16px 30px;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: white;
  border: 1px solid var(--light-gray);
  border-top: 0.5px solid var(--light-gray);

  ${(props) =>
    props.$isPCScreen &&
    css`
      width: 100%;
      position: absolute;
      bottom: 0;
      border: none;
      padding: 13px 16px 40px;
    `}
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
