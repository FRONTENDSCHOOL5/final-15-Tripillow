import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import userToken from '../../../Recoil/userToken/userToken';
import isLogin from '../../../Recoil/isLogin/isLogin';
import accountName from '../../../Recoil/accountName/accountName';
import { isKorea, isOverseas } from '../../../Recoil/whichCountry/whichCountry';
import { isList, isAlbum } from '../../../Recoil/whichView/whichView';

export default function PCNavbarModal(props) {
  const navigate = useNavigate();
  const closeModal = (e) => {
    props.setIsModalOn(false);
  };

  const clickSetting = () => {
    navigate('/profile/setting');
  };

  const clickLogout = (e) => {
    e.stopPropagation();
    props.setIsModalOn(false);
    props.setIsAlertModalOn(true);
  };

  return (
    <ModalBackground onClick={closeModal}>
      <ModalLayout>
        <Button type='button' onClick={clickSetting}>
          설정 및 개인정보
        </Button>
        <Button type='button' onClick={clickLogout}>
          로그아웃
        </Button>
      </ModalLayout>
    </ModalBackground>
  );
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: auto;
`;

const ModalLayout = styled.div`
  position: fixed;
  bottom: 70px;
  left: 30px;
  width: 330px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 0 8px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  font-size: var(--md);
  margin: 0 5px;

  &:hover {
    width: 95%;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:first-child {
    margin: 5px 5px 0 5px;
  }
  &:last-child {
    margin: 0 5px 5px 5px;
  }
`;
