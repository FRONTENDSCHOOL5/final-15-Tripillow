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

const Navbar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [buttonId, setButtonId] = useState(0);

  const icons = [
    { name: '홈', image: home, fillImage: homefill, path: ['/home'] },
    { name: '채팅', image: chat, fillImage: chatfill, path: ['/chat'] },
    { name: '상품', image: shop, fillImage: shopfill, path: ['/product', '/addproduct'] },
    { name: '게시물 작성', image: post, fillImage: postfill, path: ['/post'] },
    { name: '프로필', image: user, fillImage: userfill, path: ['/profile'] },
  ];

  useEffect(() => {
    const path = location.pathname;
    const buttonIndex = icons.findIndex((icon) => icon.path.includes(path));
    setButtonId(buttonIndex !== -1 ? buttonIndex : '');
  }, [location]);

  return (
    <footer>
      <NavbarLayout margin={props.margin}>
        {icons.map((el, i) => (
          <IconLayout
            key={i}
            onClick={() => {
              navigate(el.path[0]);
            }}
          >
            <IconImg src={buttonId === i ? el.fillImage : el.image} />
            <IconInfo setColor={buttonId === i}>{el.name}</IconInfo>
          </IconLayout>
        ))}
      </NavbarLayout>
    </footer>
  );
};

const NavbarLayout = styled.div`
  display: flex;
  gap: 20px;
  width: 390px;
  justify-content: space-between;
  margin: 0 auto;
  padding: 15px 25px;
  box-sizing: border-box;
  border: 1px solid var(--light-gray);
  border-top: 0.5px solid #dbdbdb;
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
