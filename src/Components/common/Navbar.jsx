import React, { useState } from 'react';
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

export default function Navbar() {
  const [buttonId, setButtonId] = useState(0);

  const icons = [
    { name: '홈', image: home, fillImage: homefill },
    { name: '채팅', image: chat, fillImage: chatfill },
    { name: '상품', image: shop, fillImage: shopfill },
    { name: '게시물 작성', image: post, fillImage: postfill },
    { name: '프로필', image: user, fillImage: userfill },
  ];

  return (
    <FooterContainer>
      {icons.map((el, i) => (
        <IconContainer
          key={i}
          onClick={() => {
            setButtonId(i);
          }}
        >
          <IconImg src={buttonId === i ? el.fillImage : el.image} />
          <IconInfo color={buttonId === i}>{el.name}</IconInfo>
        </IconContainer>
      ))}
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 390px;
  /* height: 60px; */
  padding: 15px 36px 15px 39px;
  box-sizing: border-box;
  border-top: 0.5px solid #dbdbdb;
  position: fixed;
  bottom: 0;
`;

const IconContainer = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 15px 0; */
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
  color: ${(props) => (props.color ? 'var(--primary)' : '#767676')};
`;
