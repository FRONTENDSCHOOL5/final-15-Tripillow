import React from 'react';
import logo from '../Assets/logo-gray.png';
import Button from '../Components/common/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const DefaultFeed = () => {
  const navigate = useNavigate();
  return (
    <>
      <DefaultFeedLayout>
        <LogoImg src={logo} alt='로고' />
        <DefaultFeedContent>유저를 검색해 팔로우 해보세요!</DefaultFeedContent>
        <Button
          onClick={() => {
            navigate('/search');
          }}
          fontSize='14px'
          border='none'
          padding='12.75px 0px'
        >
          검색하기
        </Button>
      </DefaultFeedLayout>
    </>
  );
};

const DefaultFeedLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LogoImg = styled.img`
  width: 97.41px;
  height: 99.22px;
`;

const DefaultFeedContent = styled.p`
  text-align: center;
  color: var(--dark-gray);
`;
export default DefaultFeed;
