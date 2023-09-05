import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import home from 'Assets/icons/icon-home.svg';
import post from 'Assets/icons/icon-edit.svg';
import user from 'Assets/icons/icon-user.svg';
import chat from 'Assets/icons/icon-message-circle.svg';
import shop from 'Assets/icons/icon-shop.svg';
// 클릭 시 아이콘
import userfill from 'Assets/icons/icon-user-fill.svg';
import homefill from 'Assets/icons/icon-home-fill.svg';
import shopfill from 'Assets/icons/icon-shop-fill.svg';
import chatfill from 'Assets/icons/icon-message-circle-fill.svg';
import postfill from 'Assets/icons/icon-edit-fill.svg';
import navbarIcon from 'Recoil/navbarIcon/navbarIcon';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const Navbar = (props) => {
  const navigate = useNavigate();
  const [iconState, setIconState] = useRecoilState(navbarIcon);

  const icons = [
    { name: 'Home', image: home, fillImage: homefill, path: ['/home'] },
    { name: 'Chat', image: chat, fillImage: chatfill, path: ['/chat'] },
    { name: 'Product', image: shop, fillImage: shopfill, path: ['/product', '/addproduct'] },
    { name: 'Add Post', image: post, fillImage: postfill, path: ['/post'] },
    { name: 'Profile', image: user, fillImage: userfill, path: ['/profile'] },
  ];

  return (
    <NavbarLayout margin={props.margin}>
      {icons.map((el, i) => (
        <IconLayout
          key={i}
          onClick={() => {
            setIconState(el.name);

            navigate(el.path[0]);
          }}
          aria-label={el.name}
        >
          <IconImg src={iconState === el.name ? el.fillImage : el.image} alt={el.name} />
          <IconInfo setColor={iconState === el.name}>{el.name}</IconInfo>
        </IconLayout>
      ))}
    </NavbarLayout>
  );
};

const NavbarLayout = styled.footer`
  display: flex;
  gap: 20px;
  width: 390px;
  justify-content: space-between;
  margin: 0 auto;
  padding: 15px 25px;
  box-sizing: border-box;
  border-top: 0.5px solid var(--light-gray);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  margin: ${(props) => props.margin};
`;

const IconLayout = styled.button`
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

export default Navbar;
