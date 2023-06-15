import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import home from '../../Assets/icons/icon-home.svg';
import post from '../../Assets/icons/icon-edit.svg';
import user from '../../Assets/icons/icon-user.svg';
import chat from '../../Assets/icons/icon-message-circle.svg';
import shop from '../../Assets/icons/icon-shop.svg';
// 클릭 시 아이콘
import userfill from '../../Assets/icons/icon-user-fill.svg';
import homefill from '../../Assets/icons/icon-home-fill.svg';
import shopfill from '../../Assets/icons/icon-shop-fill.svg';
import chatfill from '../../Assets/icons/icon-message-circle-fill.svg';
import postfill from '../../Assets/icons/icon-edit-fill.svg';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const [buttonId, setButtonId] = useState(0);

  const icons = [
    { name: '홈', image: home, fillImage: homefill, path: '/' },
    { name: '채팅', image: chat, fillImage: chatfill, path: '/chat' },
    { name: '상품', image: shop, fillImage: shopfill, path: '/product' },
    { name: '게시물 작성', image: post, fillImage: postfill, path: '/post' },
    { name: '프로필', image: user, fillImage: userfill, path: '/profile' },
  ];

  useEffect(() => {
    const path = location.pathname;
    const buttonIndex = icons.findIndex((icon) => icon.path === path);
    setButtonId(buttonIndex !== -1 ? buttonIndex : 0);
  }, [location]);

  return (
    <FooterContainer>
      {icons.map((el, i) => (
        <IconContainer
          key={i}
          onClick={() => {
            setButtonId(i);
            navigate(el.path);
          }}
        >
          <IconImg src={buttonId === i ? el.fillImage : el.image} />
          <IconInfo setColor={buttonId === i}>{el.name}</IconInfo>
        </IconContainer>
      ))}
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 390px;
  justify-content: space-around;
  justify-content: space-between;
  padding: 15px 25px;
  box-sizing: border-box;
  border-top: 0.5px solid #dbdbdb;
  position: fixed;
  bottom: 0;
  background-color: #fff;

`;

const IconContainer = styled.button`
  display: flex;
  width: 49px;
  flex-direction: column;
  align-items: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const IconImg = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: 7px;
`;

const IconInfo = styled.span`
  font-size: 10px;
  color: ${(props) => (props.setColor ? 'var(--primary)' : '#767676')};
`;
