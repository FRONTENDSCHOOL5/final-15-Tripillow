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
  const queryClient = useQueryClient();
  const [token, setToken] = useRecoilState(userToken);
  const [login, setLogin] = useRecoilState(isLogin);
  const [name, setName] = useRecoilState(accountName);
  const [korea, setKorea] = useRecoilState(isKorea);
  const [overseas, setOverseas] = useRecoilState(isOverseas);
  const [listView, setListView] = useRecoilState(isList);
  const [albumView, setAlbumView] = useRecoilState(isAlbum);
  const closeModal = (e) => {
    // e.stopPropagation();
    props.setIsModalOn(false);
  };

  const clickSetting = () => {
    navigate('/profile/setting');
  };

  const clickLogout = (e) => {
    e.stopPropagation();
    queryClient.clear();
    props.setIsModalOn(false);
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
  /* background-color: black; */
`;

const ModalLayout = styled.div`
  position: fixed;
  bottom: 60px;
  left: 50px;
  width: 300px;
  /* height: 400px; */
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 0 8px 0px rgba(0, 0, 0, 0.2);
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  font-size: var(--md);
`;
