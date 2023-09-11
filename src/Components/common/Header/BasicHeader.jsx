import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import userToken from 'Recoil/userToken/userToken';
import isLogin from 'Recoil/isLogin/isLogin';
import accountName from 'Recoil/accountName/accountName';
import { isKorea, isOverseas } from 'Recoil/whichCountry/whichCountry';
import { isList, isAlbum } from 'Recoil/whichView/whichView';
import ProductDeleteAPI from 'Api/Product/ProductDeleteAPI';
import Modal from 'Components/common/Modal/Modal';
import HeaderLayout from 'Styles/HeaderLayout';
import AlertModal from 'Components/common/Modal/AlertModal';
import prev from 'Assets/icons/icon-arrow-back.svg';
import more from 'Assets/icons/icon-more-vertical.svg';
import navbarIcon from 'Recoil/navbarIcon/navbarIcon';

const BasicHeader = (props) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const setToken = useSetRecoilState(userToken);
  const setLogin = useSetRecoilState(isLogin);
  const setName = useSetRecoilState(accountName);
  const setKorea = useSetRecoilState(isKorea);
  const setOverseas = useSetRecoilState(isOverseas);
  const setListView = useSetRecoilState(isList);
  const setAlbumView = useSetRecoilState(isAlbum);
  const setNavbarIcon = useSetRecoilState(navbarIcon);

  const { pathname } = useLocation();
  const currentPath = pathname.split('/');

  const paths = {
    '/chat': '채팅 페이지',
    '/product': '상품 페이지',
    '/profile/followers': '팔로우 페이지',
    '/profile': '프로필 페이지',
    '/profile/setting': '설정 및 개인정보',

    /**
     * '/product/detail/:id'
     * '/post/:id'
     * '/profile/:accountname/followers'
     * '/chat/:username'
     */
  };

  const userId = props.userId;

  const [isDeleted, setIsDeleted] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    setModal(false);
  }, []);

  const handleMorebutton = () => {
    setModal(!modal);
  };

  const handleLogoutbutton = (e) => {
    e.stopPropagation();
    queryClient.clear();
    setModal(false);
    setAlertModal(true);
  };

  const handleCancel = () => {
    setAlertModal(false);
    setModal(false);
  };

  const handleLogout = () => {
    setToken('');
    setLogin(false);
    setName('');
    navigate('/');
    setKorea(true);
    setOverseas(false);
    setListView(true);
    setAlbumView(false);
    setNavbarIcon('Home');
  };

  const handleProductDelete = ProductDeleteAPI(userId);

  const handleDelete = async () => {
    await handleProductDelete();
    setIsDeleted(true);
  };

  useEffect(() => {
    if (isDeleted) navigate('/profile', { state: { isDeleted } });
  }, [isDeleted, navigate]);

  const handleModify = () => {
    navigate('/modifyproduct', { state: userId });
  };

  const goSetting = () => {
    navigate('/profile/setting');
  };

  return (
    <HeaderLayout>
      <h1 className='a11y-hidden'>{props.subject ? props.subject : paths[pathname]}</h1>
      <ContentLayout>
        <PrevButton
          onClick={() => {
            props.isChat ? navigate('/chat') : navigate(-1);
          }}
          aria-label='뒤로 가기'
        />
        {props.children && <HeaderContent>{props.children}</HeaderContent>}
      </ContentLayout>
      {props.empty || currentPath[currentPath.length - 1] === 'setting' ? null : (
        <MoreButton onClick={handleMorebutton} aria-label='더 보기' />
      )}
      {modal && (
        <Modal
          btn1={props.btn1}
          btn2={props.btn2}
          handleMorebutton={handleMorebutton}
          handleLogoutbutton={handleLogoutbutton}
          bottom={props.isPost && '60px'}
          handleProductModify={userId ? handleModify : null}
          goSetting={goSetting}
          handleCancel={handleCancel}
        />
      )}
      {alertModal && (
        <AlertModal
          txt={props.txt}
          rightbtn={props.rightbtn}
          logout={userId ? handleDelete : handleLogout}
          handleCancel={handleCancel}
        />
      )}
    </HeaderLayout>
  );
};

const ContentLayout = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderContent = styled.div`
  height: 22px;
  line-height: 1.6;
`;

const PrevButton = styled.button`
  width: 22px;
  height: 22px;
  margin-right: 8px;
  background-image: url(${prev});
`;

const MoreButton = styled.button`
  width: 24px;
  height: 24px;
  background-image: url(${more});
`;

export default BasicHeader;
