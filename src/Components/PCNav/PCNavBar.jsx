import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';

import logo from '../../Assets/logo.png';
import home from '../../Assets/icons/icon-home.svg';
import post from '../../Assets/icons/icon-edit.svg';
import profile from '../../Assets/icons/icon-user.svg';
import chat from '../../Assets/icons/icon-message-circle.svg';
import product from '../../Assets/icons/icon-shop.svg';
import search from '../../Assets/icons/icon-search.svg';
import menu from '../../Assets/icons/menu.svg';
import character from '../../Assets/character.svg';
// 클릭 시 아이콘
import profilefill from '../../Assets/icons/icon-user-fill.svg';
import homefill from '../../Assets/icons/icon-home-fill.svg';
import productfill from '../../Assets/icons/icon-shop-fill.svg';
import chatfill from '../../Assets/icons/icon-message-circle-fill.svg';
import postfill from '../../Assets/icons/icon-edit-fill.svg';
import searchfill from '../../Assets/icons/icon-search-fill.svg';
import PCNavbarModal from '../common/Modal/PCNavbarModal';
import PCNavbarAlertModal from '../common/Modal/PCNavbarAlertModal';

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
  const [isModalOn, setIsModalOn] = useState(false);
  const [isAlertModalOn, setIsAlertModalOn] = useState(false);
  const $Root = document.getElementById('root');

  const handleMoreClick = () => {
    setIsModalOn((prev) => !prev);
  };

  useEffect(() => {
    const icon = icons.find((el) => el.path === location.pathname);
    icon && setIsClicked(icon.name);
  }, [location]);

  return (
    <>
      <Layout>
        <MainButton onClick={() => navigate('/home')}>
          <img src={logo} alt='logo' style={{ width: '80%' }} />
        </MainButton>
        {icons.map((el, i) => {
          return (
            <Button
              key={i}
              onClick={() => {
                setIsClicked(el.name);
                if (el.path) navigate(el.path);
              }}
            >
              <Icon src={isClicked === el.name ? el.imgfill : el.img} />
              <IconInfo setColor={isClicked === el.name}>{el.name}</IconInfo>
            </Button>
          );
        })}
        <MoreLayout>
          <More onClick={handleMoreClick} id='PCNavModal'>
            <img src={menu} alt='menu' /> 더보기
          </More>
        </MoreLayout>
      </Layout>
      {isModalOn &&
        createPortal(
          <PCNavbarModal setIsModalOn={setIsModalOn} setIsAlertModalOn={setIsAlertModalOn}></PCNavbarModal>,
          $Root,
        )}
      {isAlertModalOn &&
        createPortal(
          <PCNavbarAlertModal
            setIsAlertModalOn={setIsAlertModalOn}
            txt='정말 로그아웃 하시겠습니까?'
            rightbtn='로그아웃'
          ></PCNavbarAlertModal>,
          $Root,
        )}
    </>
  );
};

const Layout = styled.div`
  width: 335px;
  height: 100%;
  padding-top: 46px;
  position: absolute;
  background-color: #fff;
  box-shadow: 2px 0px 8px 0px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  position: fixed;
  overflow: auto;
`;

const MainButton = styled.button`
  display: flex;
  width: 221px;
  margin: 0 auto 30px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  width: 280px;
  height: 50px;
  padding: 10px 30px;
  margin: 0 auto 10px;

  &:last-of-type {
    margin: 0 auto 70px;
  }

  &:hover {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:active {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 39px;
`;

const IconInfo = styled.span`
  color: ${(props) => (props.setColor ? 'var(--primary)' : 'var(--dark-gray)')};
  text-align: center;
  font-size: var(--md);
`;

const MoreLayout = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: inherit;
  height: 50px;
  padding: 5px 0 20px;
  background-color: #fff;
`;

const More = styled.button`
  display: flex;
  color: ${(props) => (props.setColor ? 'var(--primary)' : 'var(--dark-gray)')};
  align-items: center;
  gap: 35px;
  width: 280px;
  height: 50px;
  margin: 0 auto;
  padding: 0 30px;
  background-color: #fff;
  font-size: var(--md);
  cursor: pointer;
  img {
    width: 30px;
  }

  &:hover {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:active {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export default PCNavBar;
