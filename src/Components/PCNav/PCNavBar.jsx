import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import logo from '../../Assets/logo.png';
import home from '../../Assets/icons/icon-home.svg';
import post from '../../Assets/icons/icon-edit.svg';
import profile from '../../Assets/icons/icon-user.svg';
import chat from '../../Assets/icons/icon-message-circle.svg';
import product from '../../Assets/icons/icon-shop.svg';
import search from '../../Assets/icons/icon-search.svg';
import character from '../../Assets/character.svg';
// 클릭 시 아이콘
import profilefill from '../../Assets/icons/icon-user-fill.svg';
import homefill from '../../Assets/icons/icon-home-fill.svg';
import productfill from '../../Assets/icons/icon-shop-fill.svg';
import chatfill from '../../Assets/icons/icon-message-circle-fill.svg';
import postfill from '../../Assets/icons/icon-edit-fill.svg';
import searchfill from '../../Assets/icons/icon-search-fill.svg';

const PCNavBar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isClicked, setIsClicked] = useState('');
  const icons = [
    { name: 'Search', img: search, imgfill: searchfill },
    { name: 'Home', img: home, imgfill: homefill, path: '/home' },
    { name: 'Chat', img: chat, imgfill: chatfill, path: '/chat' },
    { name: 'Product', img: product, imgfill: productfill, path: '/product' },
    { name: 'Add Post', img: post, imgfill: postfill, path: '/post' },
    { name: 'Profile', img: profile, imgfill: profilefill, path: '/profile' },
  ];

  const handleClick = (name, path) => {
    setIsClicked(name);
  };

  // useEffect(() => {
  //   // if (isClicked !== '') {
  //   //   let selectedIcon = icons.find((icon) => icon.name === isClicked);
  //   //   navigate(selectedIcon.path);
  //   // }
  //   setIsClicked(location.pathname);
  // }, [location]);

  return (
    <Layout>
      <Button onClick={() => navigate('/home')}>
        <img src={logo} alt='logo' style={{ width: '100%' }} />
      </Button>
      {icons.map((el, i) => {
        return (
          <Button
            key={i}
            onClick={(e) => {
              handleClick(el.name);
              navigate(el.path);
            }}
          >
            {/* <div onClick={() => handleClick(el.name)}> */}
            <Icon src={isClicked === el.name ? el.imgfill : el.img} />
            <IconInfo setColor={isClicked === el.name}>{el.name}</IconInfo>
            {/* </div> */}
          </Button>
        );
      })}
    </Layout>
  );
};

const Layout = styled.div`
  width: 335px;
  height: 100%;
  padding-top: 46px;
  position: absolute;
  box-shadow: 2px 0px 8px 0px rgba(0, 0, 0, 0.05);
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  width: 221px;
  height: 50px;
  margin: 0 auto;
  margin-bottom: 60px;
`;

const Icon = styled.img`
  width: 38px;
  height: 38px;
  margin-right: 39px;
`;

const IconInfo = styled.span`
  color: ${(props) => (props.setColor ? 'var(--primary)' : '#767676')};
  text-align: center;
  font-family: Roboto;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
`;

export default PCNavBar;
