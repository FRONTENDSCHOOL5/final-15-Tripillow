import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';
import userToken from 'Recoil/userToken/userToken';
import isLogin from 'Recoil/isLogin/isLogin';
import accountName from 'Recoil/accountName/accountName';
import { isKorea, isOverseas } from 'Recoil/whichCountry/whichCountry';
import { isList, isAlbum } from 'Recoil/whichView/whichView';

const PCAlertModal = (props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setToken = useSetRecoilState(userToken);
  const setLogin = useSetRecoilState(isLogin);
  const setName = useSetRecoilState(accountName);
  const setKorea = useSetRecoilState(isKorea);
  const setOverseas = useSetRecoilState(isOverseas);
  const setListView = useSetRecoilState(isList);
  const setAlbumView = useSetRecoilState(isAlbum);

  const closeModal = (e) => {
    props.setIsAlertModalOn(false);
  };

  const clickLogout = (e) => {
    props.setIsAlertModalOn(false);
    queryClient.clear();
    setToken('');
    setLogin(false);
    setName('');
    navigate('/');
    setKorea(true);
    setOverseas(false);
    setListView(true);
    setAlbumView(false);
  };

  return (
    <ModalBackground onClick={closeModal}>
      <ModalLayout>
        <ModalTxt>{props.txt}</ModalTxt>
        <ModalButtonLayout>
          <ModalButton onClick={props.leftClick ? props.leftClick : closeModal} {...props}>
            {props.leftbtn || '취소'}
          </ModalButton>
          <ModalButton onClick={props.rightClick ? props.rightClick : clickLogout} color='var(--primary)' {...props}>
            {props.rightbtn || '확인'}
          </ModalButton>
        </ModalButtonLayout>
      </ModalLayout>
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalLayout = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  border-radius: 10px;
  background-color: #fff;
`;

const ModalTxt = styled.p`
  font-size: var(--md);
  text-align: center;
  padding: 27px 0;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 40%;
    width: 300px;
    height: 1px;
    background-color: #dbdbdb;
  }

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0%;
    width: 1px;
    height: 40%;
    background-color: #dbdbdb;
  }
`;

const ModalButtonLayout = styled.div`
  display: flex;
  height: 50px;
`;

const ModalButton = styled.button`
  width: 50%;
  font-size: var(--sm);
  color: ${(props) => props.color || 'black'};
  border-radius: 0 0 10px 10px;
  background-color: #fff;
  border-color: ${(props) => (props.border ? 'transparent' : '#dbdbdb')};
  box-sizing: border-box;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export default PCAlertModal;
