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

export default function PCNavbarAlertModal(props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [token, setToken] = useRecoilState(userToken);
  const [login, setLogin] = useRecoilState(isLogin);
  const [name, setName] = useRecoilState(accountName);
  const [korea, setKorea] = useRecoilState(isKorea);
  const [overseas, setOverseas] = useRecoilState(isOverseas);
  const [listView, setListView] = useRecoilState(isList);
  const [albumView, setAlbumView] = useRecoilState(isAlbum);

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
            {props.rightbtn || '로그아웃'}
          </ModalButton>
        </ModalButtonLayout>
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
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999999999;
`;

const ModalLayout = styled.div`
  position: fixed;
  bottom: 50%;
  left: 50%;
  width: 300px;
  /* width: 100%; */

  height: 110px;
  border-radius: 10px;
  background-color: #fff;
  padding: 10px 0;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
`;

const ModalTxt = styled.p`
  font-size: var(--md);
  text-align: center;
  padding: 27px 0;
`;

const ModalButtonLayout = styled.div`
  display: flex;
  height: 50px;

  button + button {
    border-left: 1px solid #dbdbdb;
    border-bottom-left-radius: 0;
  }
`;
const ModalButton = styled.button`
  width: 126px;
  height: 100%;
  padding: 14px 0;
  font-size: var(--sm);
  /* color: ${(props) => (props.color ? 'var(--primary)' : 'black')}; */
  color: ${(props) => props.color || 'black'};
  border-radius: 0 0 10px 10px;
  border-top: 1px solid #dbdbdb;
  border-color: ${(props) => (props.border ? 'transparent' : '#dbdbdb')};
  box-sizing: border-box;
`;
