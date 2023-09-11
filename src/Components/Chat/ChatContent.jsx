import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import MyInfoAPI from 'Api/Profile/MyInfoAPI';
import { LayoutStyle } from 'Styles/Layout';
import BasicHeader from 'Components/common/Header/BasicHeader';
import profileSm from 'Assets/profile-sm.png';
import tripillow from 'Assets/logo-primary.png';
import useIsWideView from 'Components/SideNav/useIsWideView';

const ChatContent = () => {
  const location = useLocation();
  const username = location.state?.username;
  const randomMessage = location.state?.randomMessage;
  const userImg = location.state?.userImg;
  const account = location.state?.account;
  const isWideView = useIsWideView();

  const [inputValue, setInputValue] = useState('');
  const [chatValue, setChatValue] = useState([]);
  const [myInfo, setMyInfo] = useState({});
  const { getUserData } = MyInfoAPI();

  useEffect(() => {
    const fetchData = async () => {
      const myData = await getUserData();
      myData && setMyInfo(myData);
    };

    fetchData();
  }, [getUserData]);

  useEffect(() => {
    setChatValue([]);
  }, [location.pathname]);

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
    <ChatLayout $isWideView={isWideView} $index={!username}>
      {!username ? (
        <IndexLayout>
          <CharLayout>
            <img src={tripillow} alt='나무늘보 캐릭터' />
          </CharLayout>
          <p>Pillower에게 메세지를 보내주세요!</p>
        </IndexLayout>
      ) : (
        <>
          {!isWideView && (
            <BasicHeader
              btn1='신고하기'
              btn2='로그아웃'
              txt='정말 로그아웃 하시겠습니까?'
              rightbtn='확인'
              isChat
              subject={`${username}의 채팅`}
            >
              {username}
            </BasicHeader>
          )}
          <ChatContentLayout>
            <UserImageLayout to={`/profile/${account}`}>
              <UserImage src={userImg} alt='location.state.username' />
            </UserImageLayout>
            <ChatDetail $bgColor='white' radius='0 22px 22px 22px'>
              {randomMessage}
            </ChatDetail>
            <ChatTime>12:39</ChatTime>
          </ChatContentLayout>

          {chatValue.map((value, i) => (
            <ChatContentLayout key={`chat-${i}`} marginLeft='auto'>
              <ChatTime>{`${hours}:${minutes}`}</ChatTime>
              <ChatDetail color='white' radius='22px 0 22px 22px'>
                {value}
              </ChatDetail>
            </ChatContentLayout>
          ))}
          <ChatInputBar $isWideView={isWideView}>
            <UserImageLayout to={`/profile`}>
              <UserImage src={myInfo.image || profileSm} alt='프로필 이미지' />
            </UserImageLayout>
            <ChatInput
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder='메시지 입력하기...'
            />
            <SendButton onClick={handleButtonClicked} inputValue={inputValue} aria-label='전송하기'>
              전송
            </SendButton>
          </ChatInputBar>
        </>
      )}
    </ChatLayout>
  );
};

const ChatLayout = styled.div`
  ${LayoutStyle}
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: ${(props) => (props.$index ? 'white' : '#f2f2f2')};
  padding-left: 16px;
  padding-right: 16px;

  ${(props) =>
    props.$isWideView &&
    css`
      max-width: 100%;
      padding: 0px 16px 100px;
    `};
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

const ChatDetail = styled.p`
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
    props.$isWideView &&
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

const IndexLayout = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  p {
    font-size: 20px;
    font-weight: 600;
    color: var(--dark-gray);
  }
`;

const CharLayout = styled.div`
  width: 150px;
  height: 150px;

  img {
    opacity: 0.5;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default ChatContent;
