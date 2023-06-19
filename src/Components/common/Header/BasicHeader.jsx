import React, { useState } from 'react';
import prev from '../../../Assets/icons/icon-arrow-back.svg';
import more from '../../../Assets/icons/icon-more-vertical.svg';
import styled from 'styled-components';
import HeaderLayout from '../../../Styles/HeaderLayout';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import { useRecoilState } from 'recoil';
import userToken from '../../../Recoil/userToken/userToken';
import isLogin from '../../../Recoil/isLogin/isLogin';
import accountName from '../../../Recoil/accountName/accountName';
import AlertModal from '../AlertModal';

const BasicHeader = (props) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [token, setToken] = useRecoilState(userToken);
  const [login, setLogin] = useRecoilState(isLogin);
  const [name, setName] = useRecoilState(accountName);

  const handleMorebutton = () => {
    setModal(!modal);
  };

  const handleLogoutbutton = () => {
    setAlertModal(!alertModal);
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
  };

  return (
    <HeaderLayout>
      <ContentLayout>
        <PrevButton
          onClick={() => {
            navigate(-1);
          }}
        />
        {props.children && <div>{props.children}</div>}
      </ContentLayout>
      <MoreButton onClick={handleMorebutton} />
      {modal && (
        <Modal
          btn1='설정 및 개인정보'
          btn2='로그아웃'
          handleMorebutton={handleMorebutton}
          handleLogoutbutton={handleLogoutbutton}
        />
      )}

      {alertModal && (
        <AlertModal
          txt='정말 로그아웃 하시겠습니까?'
          rightbtn='로그아웃'
          logout={handleLogout}
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
