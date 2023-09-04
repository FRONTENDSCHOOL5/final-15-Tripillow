import React, { useState, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';

import PCLogo from 'Assets/logo.png';
import TabLogo from 'Assets/character.svg';
import home from 'Assets/icons/icon-home.svg';
import post from 'Assets/icons/icon-edit.svg';
import profile from 'Assets/icons/icon-user.svg';
import chat from 'Assets/icons/icon-message-circle.svg';
import product from 'Assets/icons/icon-shop.svg';
import search from 'Assets/icons/icon-search.svg';
import menu from 'Assets/icons/menu.svg';
// 클릭 시 아이콘
import profilefill from 'Assets/icons/icon-user-fill.svg';
import homefill from 'Assets/icons/icon-home-fill.svg';
import productfill from 'Assets/icons/icon-shop-fill.svg';
import chatfill from 'Assets/icons/icon-message-circle-fill.svg';
import postfill from 'Assets/icons/icon-edit-fill.svg';
import searchfill from 'Assets/icons/icon-search-fill.svg';
import isDesktop from 'Recoil/isDesktop/isDesktop';
import isTab from 'Recoil/isTab/isTab';
import SideNavBarModal from 'Components/common/Modal/SideNavBarModal';
import PCAlertModal from 'Components/common/Modal/PCAlertModal';
import Search from 'Pages/Search';
import { useRecoilValue } from 'recoil';

const SideNavBar = (props) => {
  const navigate = useNavigate();
  const isPCScreen = useRecoilValue(isDesktop);
  const isTabScreen = useRecoilValue(isTab);
  const location = useLocation();
  const [isClicked, setIsClicked] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const icons = useMemo(
    () => [
      { name: 'Search', img: search, imgfill: searchfill },
      { name: 'Home', img: home, imgfill: homefill, path: '/home' },
      { name: 'Chat', img: chat, imgfill: chatfill, path: '/chat' },
      { name: 'Product', img: product, imgfill: productfill, path: '/product' },
      { name: 'Add Post', img: post, imgfill: postfill, path: '/post' },
      { name: 'Profile', img: profile, imgfill: profilefill, path: '/profile' },
    ],
    [],
  );
  const [isModalOn, setIsModalOn] = useState(false);
  const [isAlertModalOn, setIsAlertModalOn] = useState(false);
  const $Root = document.getElementById('root');

  const handleMoreClick = () => {
    setIsModalOn((prev) => !prev);
  };

  useEffect(() => {
    const icon = icons.find((el) => el.path === location.pathname);
    icon && setIsClicked(icon.name);
    setIsSearch(false);
  }, [location, icons]);

  return (
    <>
      <Layout isPCScreen={isPCScreen}>
        <MainButton
          onClick={() => {
            navigate('/home');
          }}
          isPCScreen={isPCScreen}
        >
          {isPCScreen && <img src={PCLogo} alt='logo' style={{ width: '80%' }} />}
          {isTabScreen && <img src={TabLogo} alt='logo' />}
        </MainButton>
        {icons.map((el, i) => {
          return (
            <Button
              key={i}
              onClick={() => {
                setIsClicked(el.name);
                if (el.name === 'Search') {
                  const path = location.pathname;
                  setIsSearch((prev) => !prev);
                  if (isSearch === true) setIsClicked(path.slice(1).charAt(0).toUpperCase() + path.slice(2));
                }
                if (el.path) {
                  navigate(el.path);
                }
              }}
              isPCScreen={isPCScreen}
            >
              <Icon src={isClicked === el.name ? el.imgfill : el.img} alt={el.name} isPCScreen={isPCScreen} />
              {isPCScreen && <IconInfo setColor={isClicked === el.name}>{el.name}</IconInfo>}
            </Button>
          );
        })}
        <MoreLayout>
          <More onClick={handleMoreClick} id='PCNavModal' isPCScreen={isPCScreen}>
            <img src={menu} alt='menu' /> {isPCScreen && '더보기'}
          </More>
        </MoreLayout>
      </Layout>
      {isModalOn &&
        createPortal(
          <SideNavBarModal setIsModalOn={setIsModalOn} setIsAlertModalOn={setIsAlertModalOn}></SideNavBarModal>,
          $Root,
        )}
      {isAlertModalOn &&
        createPortal(
          <PCAlertModal
            setIsAlertModalOn={setIsAlertModalOn}
            txt='정말 로그아웃 하시겠습니까?'
            rightbtn='로그아웃'
          ></PCAlertModal>,
          $Root,
        )}
      {isSearch && <Search setIsSearch={setIsSearch} setIsClicked={setIsClicked} />}
    </>
  );
};

const Layout = styled.div`
  ${(props) =>
    props.isPCScreen
      ? css`
          width: 335px;
          height: 100%;
          padding-top: 46px;
          position: absolute;
          background-color: #fff;
          box-shadow: 2px 0px 8px 0px rgba(0, 0, 0, 0.05);
          box-sizing: border-box;
          position: fixed;
          overflow: auto;
        `
      : css`
          width: 80px;
          height: 100%;
          padding-top: 46px;
          position: absolute;
          top: 0;
          left: 0;
          background-color: #fff;
          box-shadow: 2px 0px 8px 0px rgba(0, 0, 0, 0.05);
          box-sizing: border-box;
          position: fixed;
          overflow: auto;
        `}
`;

const MainButton = styled.button`
  display: flex;
  margin: 0 auto 30px;
  width: ${(props) => (props.isPCScreen ? '221px' : 'undefined')};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 10px 20px;
  margin: 0 auto 10px;

  ${(props) =>
    props.isPCScreen &&
    css`
      width: 280px;
      padding: 10px 30px;
    `}

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
  ${(props) =>
    props.isPCScreen &&
    css`
      margin-right: 39px;
    `}
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

  height: 50px;
  margin: 0 auto;
  padding: 10px 20px;
  background-color: #fff;
  font-size: var(--md);
  cursor: pointer;

  ${(props) =>
    props.isPCScreen &&
    css`
      gap: 35px;
      width: 280px;
      padding: 10px 30px;
    `}

  img {
    width: 30px;
    align-items: center;
    justify-content: center;
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

export default SideNavBar;
