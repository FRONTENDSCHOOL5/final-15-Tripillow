import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { isList, isAlbum } from '../../Recoil/whichView/whichView';
import listOn from '../../Assets/icons/icon-post-list-on.svg';
import listOff from '../../Assets/icons/icon-post-list-off.svg';
import AlbumOn from '../../Assets/icons/icon-post-album-on.svg';
import AlbumOff from '../../Assets/icons/icon-post-album-off.svg';

const ProfileView = () => {
  const [listView, setListView] = useRecoilState(isList);
  const [albumView, setAlbumView] = useRecoilState(isAlbum);

  const handleListView = () => {
    setListView(true);
    setAlbumView(false);
  };

  const handleAlbumView = () => {
    setListView(false);
    setAlbumView(true);
  };
  return (
    <ViewLayout>
      <ViewButton bgImg={listView ? listOn : listOff} onClick={handleListView}></ViewButton>
      <ViewButton bgImg={albumView ? AlbumOn : AlbumOff} onClick={handleAlbumView}></ViewButton>
    </ViewLayout>
  );
};

const ViewLayout = styled.div`
  padding: 9px 21px;
  background-color: #fff;
  display: flex;
  justify-content: flex-end;

  button {
    display: block;
  }

  button:first-child {
    margin-right: 13px;
  }
`;

const ViewButton = styled.button`
  width: 26px;
  height: 26px;
  background: ${(props) => `url(${props.bgImg}) no-repeat center center`};
`;

export default ProfileView;
